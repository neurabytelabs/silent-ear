//! Silent-Ear: Industrial Edge AI Anomaly Detection System
//!
//! A predictive maintenance system that uses statistical anomaly detection
//! to monitor industrial equipment health in real-time.

use std::env;
use std::sync::Arc;
use tracing::{error, info, Level};
use tracing_subscriber::EnvFilter;

mod api;
mod config;
mod datasource;
mod detector;
mod error;
mod processing;
mod state;
mod websocket;

use config::AppConfig;
use datasource::{DataSourceType, FileDataSource, MockDataSource};
use error::Result;
use processing::ProcessingEngine;
use state::new_shared_state;
use websocket::Broadcaster;

/// Initialize tracing/logging
fn init_tracing(config: &AppConfig) {
    let level = match config.logging.level.to_lowercase().as_str() {
        "trace" => Level::TRACE,
        "debug" => Level::DEBUG,
        "info" => Level::INFO,
        "warn" => Level::WARN,
        "error" => Level::ERROR,
        _ => Level::INFO,
    };

    let filter = EnvFilter::from_default_env().add_directive(level.into());

    if config.logging.json {
        tracing_subscriber::fmt()
            .with_env_filter(filter)
            .json()
            .init();
    } else {
        tracing_subscriber::fmt()
            .with_env_filter(filter)
            .with_target(true)
            .with_thread_ids(false)
            .init();
    }
}

/// Parse command line arguments
fn parse_args() -> (bool, DataSourceType) {
    let args: Vec<String> = env::args().collect();

    let simulate_mode = args.contains(&"--simulate".to_string());

    let source_type = if args.contains(&"--mock".to_string()) {
        DataSourceType::Mock
    } else if args.contains(&"--sensor".to_string()) {
        DataSourceType::Sensor
    } else {
        DataSourceType::File
    };

    (simulate_mode, source_type)
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load configuration
    let config = AppConfig::load().unwrap_or_else(|e| {
        eprintln!("Config warning: {}. Using defaults.", e);
        AppConfig::default()
    });

    // Initialize tracing
    init_tracing(&config);

    info!(version = env!("CARGO_PKG_VERSION"), "Silent-Ear starting");

    // Parse command line arguments
    let (simulate_mode, source_type) = parse_args();

    if simulate_mode {
        info!("Running in simulation mode");
    }

    info!(source = ?source_type, "Data source type");

    // Create shared state
    let state = new_shared_state(config.detector.threshold, config.detector.train_limit);

    // Create WebSocket broadcaster for real-time updates
    let broadcaster = Arc::new(Broadcaster::new());
    info!("WebSocket broadcaster initialized");

    // Spawn API server with WebSocket support
    let api_state = state.clone();
    let api_broadcaster = broadcaster.clone();
    let server_config = config.server.clone();

    tokio::spawn(async move {
        if let Err(e) = api::run_server(api_state, api_broadcaster, server_config).await {
            error!(error = %e, "API server failed");
        }
    });

    // Create processing engine with broadcaster
    let mut engine = ProcessingEngine::new(
        config.detector.threshold,
        simulate_mode,
        config.data.clone(),
        broadcaster,
    );

    // Run with appropriate data source
    let process_state = state.clone();
    let data_config = config.data.clone();

    match source_type {
        DataSourceType::File => {
            let mut source = FileDataSource::new(&data_config.directory);
            run_with_source(&mut engine, &mut source, process_state).await?;
        }
        DataSourceType::Mock => {
            let mut source = MockDataSource::new(8)
                .with_total_samples(Some(1000))
                .with_degradation(true, 500);
            run_with_source(&mut engine, &mut source, process_state).await?;
        }
        DataSourceType::Sensor => {
            // TODO: Implement hardware sensor source
            error!("Hardware sensor not yet implemented");
            return Err(anyhow::anyhow!("Hardware sensor not implemented"));
        }
    }

    Ok(())
}

/// Run the processing engine with a data source
async fn run_with_source<D: datasource::DataSource>(
    engine: &mut ProcessingEngine,
    source: &mut D,
    state: state::SharedState,
) -> Result<()> {
    engine.run(source, state).await
}
