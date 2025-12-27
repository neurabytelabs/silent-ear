//! MQTT module for industrial IoT integration
//!
//! Publishes system state updates to an MQTT broker for integration
//! with industrial automation systems and SCADA platforms.

use rumqttc::{AsyncClient, Event, MqttOptions, Packet, QoS};
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::broadcast;
use tracing::{debug, error, info, warn};

use crate::state::SystemState;

/// Default MQTT broker configuration
const DEFAULT_BROKER_HOST: &str = "localhost";
const DEFAULT_BROKER_PORT: u16 = 1883;
const DEFAULT_CLIENT_ID: &str = "silent-ear";

/// MQTT topic structure
#[allow(dead_code)]
const TOPIC_STATUS: &str = "silent-ear/status";
const TOPIC_HEALTH: &str = "silent-ear/health";
const TOPIC_ALERTS: &str = "silent-ear/alerts";

/// MQTT configuration
#[derive(Clone, Debug)]
pub struct MqttConfig {
    pub host: String,
    pub port: u16,
    pub client_id: String,
    pub username: Option<String>,
    pub password: Option<String>,
}

impl Default for MqttConfig {
    fn default() -> Self {
        Self {
            host: DEFAULT_BROKER_HOST.to_string(),
            port: DEFAULT_BROKER_PORT,
            client_id: DEFAULT_CLIENT_ID.to_string(),
            username: None,
            password: None,
        }
    }
}

impl MqttConfig {
    /// Create config from environment variables
    pub fn from_env() -> Self {
        Self {
            host: std::env::var("MQTT_HOST").unwrap_or_else(|_| DEFAULT_BROKER_HOST.to_string()),
            port: std::env::var("MQTT_PORT")
                .ok()
                .and_then(|p| p.parse().ok())
                .unwrap_or(DEFAULT_BROKER_PORT),
            client_id: std::env::var("MQTT_CLIENT_ID")
                .unwrap_or_else(|_| DEFAULT_CLIENT_ID.to_string()),
            username: std::env::var("MQTT_USERNAME").ok(),
            password: std::env::var("MQTT_PASSWORD").ok(),
        }
    }
}

/// MQTT publisher for broadcasting state updates
pub struct MqttPublisher {
    client: AsyncClient,
    config: MqttConfig,
}

impl MqttPublisher {
    /// Create a new MQTT publisher and connect to broker
    pub async fn new(config: MqttConfig) -> Result<(Self, tokio::task::JoinHandle<()>), String> {
        let mut mqttoptions = MqttOptions::new(&config.client_id, &config.host, config.port);
        mqttoptions.set_keep_alive(Duration::from_secs(30));

        // Set credentials if provided
        if let (Some(user), Some(pass)) = (&config.username, &config.password) {
            mqttoptions.set_credentials(user, pass);
        }

        let (client, mut eventloop) = AsyncClient::new(mqttoptions, 10);

        info!(
            host = %config.host,
            port = config.port,
            client_id = %config.client_id,
            "MQTT client created"
        );

        // Spawn event loop handler
        let handle = tokio::spawn(async move {
            loop {
                match eventloop.poll().await {
                    Ok(Event::Incoming(Packet::ConnAck(_))) => {
                        info!("MQTT connected to broker");
                    }
                    Ok(Event::Incoming(Packet::PubAck(_))) => {
                        debug!("MQTT message acknowledged");
                    }
                    Ok(_) => {}
                    Err(e) => {
                        warn!(error = %e, "MQTT connection error, will retry");
                        tokio::time::sleep(Duration::from_secs(5)).await;
                    }
                }
            }
        });

        Ok((Self { client, config }, handle))
    }

    /// Publish full system state
    #[allow(dead_code)]
    pub async fn publish_state(&self, state: &SystemState) -> Result<(), String> {
        let payload = serde_json::to_string(state).map_err(|e| e.to_string())?;

        self.client
            .publish(TOPIC_STATUS, QoS::AtLeastOnce, false, payload)
            .await
            .map_err(|e| e.to_string())?;

        debug!("Published state to MQTT");
        Ok(())
    }

    /// Publish health score only (lightweight update)
    pub async fn publish_health(&self, health_score: f64, status: &str) -> Result<(), String> {
        let payload = serde_json::json!({
            "health_score": health_score,
            "status": status,
            "timestamp": chrono::Utc::now().to_rfc3339()
        });

        self.client
            .publish(TOPIC_HEALTH, QoS::AtMostOnce, false, payload.to_string())
            .await
            .map_err(|e| e.to_string())?;

        Ok(())
    }

    /// Publish alert when critical condition detected
    pub async fn publish_alert(&self, message: &str, health_score: f64) -> Result<(), String> {
        let payload = serde_json::json!({
            "alert": "CRITICAL",
            "message": message,
            "health_score": health_score,
            "timestamp": chrono::Utc::now().to_rfc3339()
        });

        self.client
            .publish(TOPIC_ALERTS, QoS::AtLeastOnce, true, payload.to_string())
            .await
            .map_err(|e| e.to_string())?;

        warn!(message = %message, health = health_score, "Published MQTT alert");
        Ok(())
    }

    /// Get broker address for logging
    pub fn broker_address(&self) -> String {
        format!("{}:{}", self.config.host, self.config.port)
    }
}

/// Bridge between WebSocket broadcaster and MQTT publisher
pub async fn mqtt_bridge(
    mut rx: broadcast::Receiver<String>,
    publisher: Arc<MqttPublisher>,
) {
    info!("MQTT bridge started");

    while let Ok(json) = rx.recv().await {
        if let Ok(state) = serde_json::from_str::<SystemState>(&json) {
            // Publish health update
            if let Err(e) = publisher
                .publish_health(state.health_score, &state.status)
                .await
            {
                error!(error = %e, "Failed to publish health to MQTT");
            }

            // Publish alert if critical
            if state.status == "CRITICAL" {
                let msg = format!(
                    "Health degraded to {:.1}% on {}",
                    state.health_score * 100.0,
                    state.current_file
                );
                if let Err(e) = publisher.publish_alert(&msg, state.health_score).await {
                    error!(error = %e, "Failed to publish alert to MQTT");
                }
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mqtt_config_default() {
        let config = MqttConfig::default();
        assert_eq!(config.host, "localhost");
        assert_eq!(config.port, 1883);
        assert_eq!(config.client_id, "silent-ear");
    }

    #[test]
    fn test_mqtt_topics() {
        assert_eq!(TOPIC_STATUS, "silent-ear/status");
        assert_eq!(TOPIC_HEALTH, "silent-ear/health");
        assert_eq!(TOPIC_ALERTS, "silent-ear/alerts");
    }
}
