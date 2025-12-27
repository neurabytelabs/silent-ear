//! WebSocket module for real-time dashboard updates
//!
//! Provides WebSocket endpoint and broadcast functionality for live state updates.

use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        State,
    },
    response::IntoResponse,
};
use futures_util::{SinkExt, StreamExt};
use std::sync::Arc;
use tokio::sync::broadcast;
use tracing::{debug, error, info, warn};

use crate::state::SystemState;

/// WebSocket broadcast channel capacity
const BROADCAST_CAPACITY: usize = 16;

/// WebSocket broadcaster for sending state updates to all connected clients
#[derive(Clone)]
pub struct Broadcaster {
    tx: broadcast::Sender<String>,
}

impl Broadcaster {
    /// Create a new broadcaster
    pub fn new() -> Self {
        let (tx, _) = broadcast::channel(BROADCAST_CAPACITY);
        Self { tx }
    }

    /// Broadcast state to all connected clients
    pub fn broadcast(&self, state: &SystemState) {
        match serde_json::to_string(state) {
            Ok(json) => {
                // tx.send returns error only if no receivers, which is fine
                let _ = self.tx.send(json);
            }
            Err(e) => {
                error!(error = %e, "Failed to serialize state for broadcast");
            }
        }
    }

    /// Get a receiver for broadcast messages
    pub fn subscribe(&self) -> broadcast::Receiver<String> {
        self.tx.subscribe()
    }

    /// Get the number of active subscribers
    #[allow(dead_code)]
    pub fn subscriber_count(&self) -> usize {
        self.tx.receiver_count()
    }
}

impl Default for Broadcaster {
    fn default() -> Self {
        Self::new()
    }
}

/// WebSocket handler for upgrade requests
pub async fn ws_handler(
    ws: WebSocketUpgrade,
    State(broadcaster): State<Arc<Broadcaster>>,
) -> impl IntoResponse {
    info!("New WebSocket connection request");
    ws.on_upgrade(move |socket| handle_socket(socket, broadcaster))
}

/// Handle a single WebSocket connection
async fn handle_socket(socket: WebSocket, broadcaster: Arc<Broadcaster>) {
    let (mut sender, mut receiver) = socket.split();

    // Subscribe to broadcasts
    let mut rx = broadcaster.subscribe();

    info!("WebSocket client connected");

    // Spawn task to send broadcasts to this client
    let send_task = tokio::spawn(async move {
        while let Ok(msg) = rx.recv().await {
            if sender.send(Message::Text(msg.into())).await.is_err() {
                break;
            }
        }
    });

    // Handle incoming messages (ping/pong, close, etc.)
    let recv_task = tokio::spawn(async move {
        while let Some(result) = receiver.next().await {
            match result {
                Ok(Message::Ping(data)) => {
                    debug!("Received ping");
                    // Pong is handled automatically by axum
                    let _ = data;
                }
                Ok(Message::Close(_)) => {
                    debug!("Client sent close frame");
                    break;
                }
                Ok(Message::Text(text)) => {
                    debug!(message = %text, "Received text message");
                    // Could handle control messages here in the future
                }
                Err(e) => {
                    warn!(error = %e, "WebSocket error");
                    break;
                }
                _ => {}
            }
        }
    });

    // Wait for either task to complete
    tokio::select! {
        _ = send_task => {},
        _ = recv_task => {},
    }

    info!("WebSocket client disconnected");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_broadcaster_creation() {
        let broadcaster = Broadcaster::new();
        assert_eq!(broadcaster.subscriber_count(), 0);
    }

    #[test]
    fn test_broadcaster_subscribe() {
        let broadcaster = Broadcaster::new();
        let _rx = broadcaster.subscribe();
        assert_eq!(broadcaster.subscriber_count(), 1);
    }

    #[test]
    fn test_broadcaster_broadcast() {
        let broadcaster = Broadcaster::new();
        let mut rx = broadcaster.subscribe();

        let state = SystemState::default();
        broadcaster.broadcast(&state);

        // Should receive the message
        let msg = rx.try_recv();
        assert!(msg.is_ok());
    }
}
