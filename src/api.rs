//! REST API and WebSocket module for Silent-Ear
//!
//! Provides HTTP endpoints for system control and status monitoring,
//! plus WebSocket endpoint for real-time updates.

use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::Deserialize;
use std::net::SocketAddr;
use std::sync::Arc;
use tower_http::services::ServeDir;
use tracing::{info, warn};

use crate::config::ServerConfig;
use crate::error::{Result, SilentEarError};
use crate::metrics;
use crate::state::SharedState;
use crate::websocket::{ws_handler, Broadcaster};

/// Control command payload
#[derive(Deserialize)]
pub struct ControlCommand {
    pub action: String,
}

/// Settings update payload
#[derive(Deserialize)]
pub struct SettingsCommand {
    pub threshold: f64,
    pub train_limit: usize,
}

/// Create the API router with all endpoints including WebSocket and metrics
pub fn create_router(state: SharedState, broadcaster: Arc<Broadcaster>) -> Router {
    let serve_dir = ServeDir::new("static");

    // API routes that need WebSocket state
    let api_routes = Router::new()
        .route("/api/status", get(status_handler(state.clone())))
        .route("/api/control", post(control_handler(state.clone())))
        .route("/api/settings", post(settings_handler(state.clone())))
        .route("/ws", get(ws_handler))
        .with_state(broadcaster);

    // Combine with metrics (no state needed) and static files
    api_routes
        .merge(metrics::metrics_router())
        .nest_service("/", serve_dir)
}

/// Status endpoint handler factory
fn status_handler(
    state: SharedState,
) -> impl Fn() -> std::pin::Pin<
    Box<dyn std::future::Future<Output = Json<crate::state::SystemState>> + Send>,
> + Clone {
    move || {
        let s = state.clone();
        Box::pin(async move {
            let data = s.lock().unwrap();
            Json(data.clone())
        })
    }
}

/// Control endpoint handler factory
fn control_handler(
    state: SharedState,
) -> impl Fn(
    Json<ControlCommand>,
) -> std::pin::Pin<Box<dyn std::future::Future<Output = Json<&'static str>> + Send>>
       + Clone {
    move |Json(payload): Json<ControlCommand>| {
        let s = state.clone();
        Box::pin(async move {
            let mut data = s.lock().unwrap();
            match payload.action.as_str() {
                "start" => {
                    info!("System started via API");
                    data.is_running = true;
                    // Don't overwrite COMPLETED status - let processing loop handle auto-reset
                    if data.status != "COMPLETED" {
                        data.status = "STARTING".to_string();
                    }
                    data.add_log("System started manually.");
                }
                "stop" => {
                    info!("System paused via API");
                    data.is_running = false;
                    data.status = "PAUSED".to_string();
                    data.add_log("System paused manually.");
                }
                "reset" => {
                    info!("System reset requested via API");
                    data.reset_requested = true;
                    data.is_running = false;
                    data.status = "RESETTING".to_string();
                    data.add_log("System reset requested.");
                }
                action => {
                    warn!(action = %action, "Unknown control action");
                }
            }
            Json("OK")
        })
    }
}

/// Settings endpoint handler factory
fn settings_handler(
    state: SharedState,
) -> impl Fn(
    Json<SettingsCommand>,
) -> std::pin::Pin<Box<dyn std::future::Future<Output = Json<&'static str>> + Send>>
       + Clone {
    move |Json(payload): Json<SettingsCommand>| {
        let s = state.clone();
        Box::pin(async move {
            let mut data = s.lock().unwrap();
            data.threshold = payload.threshold;
            data.train_limit = payload.train_limit;
            info!(
                threshold = payload.threshold,
                train_limit = payload.train_limit,
                "Settings updated"
            );
            data.add_log(&format!(
                "Settings updated: Threshold={}, TrainLimit={}",
                payload.threshold, payload.train_limit
            ));
            Json("OK")
        })
    }
}

/// Start the API server with WebSocket support
pub async fn run_server(
    state: SharedState,
    broadcaster: Arc<Broadcaster>,
    config: ServerConfig,
) -> Result<()> {
    let app = create_router(state, broadcaster);

    let addr: SocketAddr = format!("{}:{}", config.host, config.port)
        .parse()
        .map_err(|_| SilentEarError::Config {
            message: format!("Invalid address: {}:{}", config.host, config.port),
        })?;

    info!(address = %addr, "API server starting (REST + WebSocket)");

    let listener =
        tokio::net::TcpListener::bind(addr)
            .await
            .map_err(|e| SilentEarError::ServerBind {
                address: addr.to_string(),
                source: e,
            })?;

    axum::serve(listener, app)
        .await
        .map_err(SilentEarError::Io)?;

    Ok(())
}
