use config::{Config, Environment, File};
use serde::Deserialize;
use std::path::Path;

use crate::error::{Result, SilentEarError};

/// Application configuration
#[derive(Debug, Deserialize, Clone)]
pub struct AppConfig {
    #[serde(default = "default_server")]
    pub server: ServerConfig,

    #[serde(default = "default_detector")]
    pub detector: DetectorConfig,

    #[serde(default = "default_data")]
    pub data: DataConfig,

    #[serde(default = "default_logging")]
    pub logging: LoggingConfig,
}

#[derive(Debug, Deserialize, Clone)]
pub struct ServerConfig {
    #[serde(default = "default_host")]
    pub host: String,

    #[serde(default = "default_port")]
    pub port: u16,
}

#[derive(Debug, Deserialize, Clone)]
pub struct DetectorConfig {
    #[serde(default = "default_threshold")]
    pub threshold: f64,

    #[serde(default = "default_train_limit")]
    pub train_limit: usize,

    /// Z-score limit for 0% health (reserved for future use)
    #[allow(dead_code)]
    #[serde(default = "default_fatal_limit")]
    pub fatal_limit: f64,
}

#[derive(Debug, Deserialize, Clone)]
pub struct DataConfig {
    #[serde(default = "default_data_dir")]
    pub directory: String,

    #[serde(default = "default_output_file")]
    pub output_file: String,

    #[serde(default = "default_alarm_file")]
    pub alarm_file: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct LoggingConfig {
    #[serde(default = "default_log_level")]
    pub level: String,

    #[serde(default)]
    pub json: bool,

    /// Optional log file path (reserved for future use)
    #[allow(dead_code)]
    #[serde(default = "default_log_file")]
    pub file: Option<String>,
}

// Default value functions
fn default_server() -> ServerConfig {
    ServerConfig {
        host: default_host(),
        port: default_port(),
    }
}

fn default_detector() -> DetectorConfig {
    DetectorConfig {
        threshold: default_threshold(),
        train_limit: default_train_limit(),
        fatal_limit: default_fatal_limit(),
    }
}

fn default_data() -> DataConfig {
    DataConfig {
        directory: default_data_dir(),
        output_file: default_output_file(),
        alarm_file: default_alarm_file(),
    }
}

fn default_logging() -> LoggingConfig {
    LoggingConfig {
        level: default_log_level(),
        json: false,
        file: default_log_file(),
    }
}

fn default_host() -> String {
    "0.0.0.0".to_string()
}

fn default_port() -> u16 {
    3000
}

fn default_threshold() -> f64 {
    3.0
}

fn default_train_limit() -> usize {
    500
}

fn default_fatal_limit() -> f64 {
    15.0
}

fn default_data_dir() -> String {
    "data/ims/1st_test/1st_test".to_string()
}

fn default_output_file() -> String {
    "bearing_rms_results.csv".to_string()
}

fn default_alarm_file() -> String {
    "alarms.log".to_string()
}

fn default_log_level() -> String {
    "info".to_string()
}

fn default_log_file() -> Option<String> {
    None
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            server: default_server(),
            detector: default_detector(),
            data: default_data(),
            logging: default_logging(),
        }
    }
}

impl AppConfig {
    /// Load configuration from file and environment variables
    ///
    /// Priority (highest to lowest):
    /// 1. Environment variables (SILENT_EAR_*)
    /// 2. Config file (config.toml or specified path)
    /// 3. Default values
    pub fn load() -> Result<Self> {
        Self::load_from("config.toml")
    }

    pub fn load_from<P: AsRef<Path>>(config_path: P) -> Result<Self> {
        let mut builder = Config::builder();

        // Add config file if it exists
        let path = config_path.as_ref();
        if path.exists() {
            builder = builder.add_source(File::from(path));
        }

        // Add environment variables with SILENT_EAR_ prefix
        builder = builder.add_source(
            Environment::with_prefix("SILENT_EAR")
                .separator("__")
                .try_parsing(true),
        );

        let config = builder
            .build()
            .map_err(|e| SilentEarError::Config {
                message: e.to_string(),
            })?;

        config.try_deserialize().map_err(|e| SilentEarError::Config {
            message: e.to_string(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_config() {
        let config = AppConfig::default();
        assert_eq!(config.server.port, 3000);
        assert_eq!(config.detector.threshold, 3.0);
        assert_eq!(config.detector.train_limit, 500);
    }

    #[test]
    fn test_load_missing_file_uses_defaults() {
        let config = AppConfig::load_from("nonexistent.toml").unwrap();
        assert_eq!(config.server.port, 3000);
    }
}
