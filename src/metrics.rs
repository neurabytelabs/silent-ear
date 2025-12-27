//! Prometheus metrics module for observability
//!
//! Exposes system metrics in Prometheus format at `/metrics` endpoint
//! for integration with Grafana, AlertManager, and other monitoring tools.

use axum::{response::IntoResponse, routing::get, Router};
use lazy_static::lazy_static;
use prometheus::{
    register_counter, register_gauge, register_histogram, register_int_counter,
    Counter, Encoder, Gauge, Histogram, IntCounter, TextEncoder,
};

lazy_static! {
    // Health metrics
    pub static ref HEALTH_SCORE: Gauge = register_gauge!(
        "silent_ear_health_score",
        "Current health score (0.0 to 1.0)"
    ).unwrap();

    pub static ref HEALTH_PERCENT: Gauge = register_gauge!(
        "silent_ear_health_percent",
        "Current health score as percentage (0 to 100)"
    ).unwrap();

    // Processing metrics
    pub static ref SAMPLES_PROCESSED: IntCounter = register_int_counter!(
        "silent_ear_samples_processed_total",
        "Total number of samples processed"
    ).unwrap();

    pub static ref TRAINING_SAMPLES: Gauge = register_gauge!(
        "silent_ear_training_samples",
        "Number of samples in training set"
    ).unwrap();

    // Anomaly metrics
    pub static ref ANOMALIES_DETECTED: IntCounter = register_int_counter!(
        "silent_ear_anomalies_detected_total",
        "Total number of anomalies detected"
    ).unwrap();

    pub static ref CRITICAL_ALERTS: IntCounter = register_int_counter!(
        "silent_ear_critical_alerts_total",
        "Total number of critical alerts raised"
    ).unwrap();

    // Sensor readings (per channel)
    pub static ref SENSOR_READING_B1_X: Gauge = register_gauge!(
        "silent_ear_sensor_b1_x",
        "Current sensor reading for Bearing 1 X-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B1_Y: Gauge = register_gauge!(
        "silent_ear_sensor_b1_y",
        "Current sensor reading for Bearing 1 Y-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B2_X: Gauge = register_gauge!(
        "silent_ear_sensor_b2_x",
        "Current sensor reading for Bearing 2 X-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B2_Y: Gauge = register_gauge!(
        "silent_ear_sensor_b2_y",
        "Current sensor reading for Bearing 2 Y-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B3_X: Gauge = register_gauge!(
        "silent_ear_sensor_b3_x",
        "Current sensor reading for Bearing 3 X-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B3_Y: Gauge = register_gauge!(
        "silent_ear_sensor_b3_y",
        "Current sensor reading for Bearing 3 Y-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B4_X: Gauge = register_gauge!(
        "silent_ear_sensor_b4_x",
        "Current sensor reading for Bearing 4 X-axis"
    ).unwrap();

    pub static ref SENSOR_READING_B4_Y: Gauge = register_gauge!(
        "silent_ear_sensor_b4_y",
        "Current sensor reading for Bearing 4 Y-axis"
    ).unwrap();

    // Processing time histogram
    pub static ref PROCESSING_TIME: Histogram = register_histogram!(
        "silent_ear_processing_duration_seconds",
        "Time spent processing each sample",
        vec![0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0]
    ).unwrap();

    // WebSocket metrics
    pub static ref WEBSOCKET_CONNECTIONS: Gauge = register_gauge!(
        "silent_ear_websocket_connections",
        "Current number of WebSocket connections"
    ).unwrap();

    pub static ref WEBSOCKET_MESSAGES_SENT: Counter = register_counter!(
        "silent_ear_websocket_messages_sent_total",
        "Total WebSocket messages sent"
    ).unwrap();

    // System status
    pub static ref SYSTEM_RUNNING: Gauge = register_gauge!(
        "silent_ear_system_running",
        "Whether the system is currently running (1) or stopped (0)"
    ).unwrap();

    pub static ref SYSTEM_TRAINING: Gauge = register_gauge!(
        "silent_ear_system_training",
        "Whether the system is in training mode (1) or inference (0)"
    ).unwrap();
}

/// Update metrics from system state
pub fn update_from_state(state: &crate::state::SystemState) {
    HEALTH_SCORE.set(state.health_score);
    HEALTH_PERCENT.set(state.health_score * 100.0);
    SYSTEM_RUNNING.set(if state.is_running { 1.0 } else { 0.0 });
    SYSTEM_TRAINING.set(if state.is_training { 1.0 } else { 0.0 });

    // Update sensor readings if available
    if state.latest_readings.len() >= 8 {
        SENSOR_READING_B1_X.set(state.latest_readings[0]);
        SENSOR_READING_B1_Y.set(state.latest_readings[1]);
        SENSOR_READING_B2_X.set(state.latest_readings[2]);
        SENSOR_READING_B2_Y.set(state.latest_readings[3]);
        SENSOR_READING_B3_X.set(state.latest_readings[4]);
        SENSOR_READING_B3_Y.set(state.latest_readings[5]);
        SENSOR_READING_B4_X.set(state.latest_readings[6]);
        SENSOR_READING_B4_Y.set(state.latest_readings[7]);
    }

    // Track anomalies
    if state.status == "CRITICAL" {
        CRITICAL_ALERTS.inc();
    }
}

/// Record a sample being processed
pub fn record_sample_processed() {
    SAMPLES_PROCESSED.inc();
}

/// Record an anomaly detection
pub fn record_anomaly() {
    ANOMALIES_DETECTED.inc();
}

/// Set training sample count
pub fn set_training_samples(count: usize) {
    TRAINING_SAMPLES.set(count as f64);
}

/// Record processing time
pub fn record_processing_time(duration_secs: f64) {
    PROCESSING_TIME.observe(duration_secs);
}

/// Metrics endpoint handler
async fn metrics_handler() -> impl IntoResponse {
    let encoder = TextEncoder::new();
    let metric_families = prometheus::gather();
    let mut buffer = Vec::new();

    encoder.encode(&metric_families, &mut buffer).unwrap();

    (
        [(
            axum::http::header::CONTENT_TYPE,
            "text/plain; version=0.0.4; charset=utf-8",
        )],
        buffer,
    )
}

/// Create metrics router
pub fn metrics_router() -> Router {
    Router::new().route("/metrics", get(metrics_handler))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_health_score_metric() {
        HEALTH_SCORE.set(0.95);
        assert!((HEALTH_SCORE.get() - 0.95).abs() < 0.001);
    }

    #[test]
    fn test_samples_counter() {
        let initial = SAMPLES_PROCESSED.get();
        record_sample_processed();
        assert_eq!(SAMPLES_PROCESSED.get(), initial + 1);
    }

    #[test]
    fn test_anomaly_counter() {
        let initial = ANOMALIES_DETECTED.get();
        record_anomaly();
        assert_eq!(ANOMALIES_DETECTED.get(), initial + 1);
    }
}
