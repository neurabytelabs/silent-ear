//! Shared application state module
//!
//! Provides thread-safe state management for the Silent-Ear system.

use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

/// System operational state
#[allow(dead_code)]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "UPPERCASE")]
pub enum SystemStatus {
    #[default]
    Idle,
    Starting,
    Training,
    Monitoring,
    Warning,
    Critical,
    Paused,
    Resetting,
    Completed,
    Error,
}

impl std::fmt::Display for SystemStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Idle => write!(f, "IDLE"),
            Self::Starting => write!(f, "STARTING"),
            Self::Training => write!(f, "TRAINING"),
            Self::Monitoring => write!(f, "MONITORING"),
            Self::Warning => write!(f, "WARNING"),
            Self::Critical => write!(f, "CRITICAL"),
            Self::Paused => write!(f, "PAUSED"),
            Self::Resetting => write!(f, "RESETTING"),
            Self::Completed => write!(f, "COMPLETED"),
            Self::Error => write!(f, "ERROR"),
        }
    }
}

/// Shared system state for all components
#[derive(Clone, Serialize, Deserialize)]
pub struct SystemState {
    /// Current file/sample being processed
    pub current_file: String,

    /// Health score (0.0 - 1.0)
    pub health_score: f64,

    /// Current operational status
    pub status: String,

    /// Latest sensor readings (8 channels)
    pub latest_readings: Vec<f64>,

    /// Whether system is in training phase
    pub is_training: bool,

    /// Whether processing is running
    pub is_running: bool,

    /// Reset request flag
    pub reset_requested: bool,

    /// Anomaly detection threshold (sigma multiplier)
    pub threshold: f64,

    /// Number of samples to use for training
    pub train_limit: usize,

    /// System log messages (most recent first)
    pub system_logs: Vec<String>,
}

impl Default for SystemState {
    fn default() -> Self {
        Self {
            current_file: "Ready".to_string(),
            health_score: 1.0,
            status: "IDLE".to_string(),
            latest_readings: vec![0.0; 8],
            is_training: true,
            is_running: false,
            reset_requested: false,
            threshold: 3.0,
            train_limit: 500,
            system_logs: Vec::new(),
        }
    }
}

impl SystemState {
    /// Create new state with custom threshold and train limit
    pub fn with_config(threshold: f64, train_limit: usize) -> Self {
        Self {
            threshold,
            train_limit,
            ..Default::default()
        }
    }

    /// Add a log message with timestamp
    pub fn add_log(&mut self, msg: &str) {
        let timestamp = chrono::Local::now().format("%H:%M:%S").to_string();
        let log_entry = format!("[{}] {}", timestamp, msg);
        self.system_logs.insert(0, log_entry);
        if self.system_logs.len() > 50 {
            self.system_logs.pop();
        }
    }

    /// Update status based on health score
    #[allow(dead_code)]
    pub fn update_status_from_health(&mut self) {
        if self.is_training {
            self.status = "TRAINING".to_string();
        } else if self.health_score > 0.9 {
            self.status = "NORMAL".to_string();
        } else if self.health_score > 0.5 {
            self.status = "WARNING".to_string();
        } else {
            self.status = "CRITICAL".to_string();
        }
    }

    /// Reset to initial state
    pub fn reset(&mut self) {
        self.current_file = "Ready".to_string();
        self.health_score = 1.0;
        self.status = "IDLE".to_string();
        self.is_training = true;
        self.is_running = false;
        self.reset_requested = false;
        self.add_log("System reset complete.");
    }
}

/// Thread-safe shared state wrapper
pub type SharedState = Arc<Mutex<SystemState>>;

/// Create a new shared state instance
pub fn new_shared_state(threshold: f64, train_limit: usize) -> SharedState {
    Arc::new(Mutex::new(SystemState::with_config(threshold, train_limit)))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_state() {
        let state = SystemState::default();
        assert_eq!(state.health_score, 1.0);
        assert!(state.is_training);
        assert!(!state.is_running);
    }

    #[test]
    fn test_add_log() {
        let mut state = SystemState::default();
        state.add_log("Test message");
        assert_eq!(state.system_logs.len(), 1);
        assert!(state.system_logs[0].contains("Test message"));
    }

    #[test]
    fn test_log_limit() {
        let mut state = SystemState::default();
        for i in 0..60 {
            state.add_log(&format!("Message {}", i));
        }
        assert_eq!(state.system_logs.len(), 50);
    }

    #[test]
    fn test_update_status_from_health() {
        let mut state = SystemState::default();
        state.is_training = false;

        state.health_score = 0.95;
        state.update_status_from_health();
        assert_eq!(state.status, "NORMAL");

        state.health_score = 0.7;
        state.update_status_from_health();
        assert_eq!(state.status, "WARNING");

        state.health_score = 0.3;
        state.update_status_from_health();
        assert_eq!(state.status, "CRITICAL");
    }
}
