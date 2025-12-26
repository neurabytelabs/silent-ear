use thiserror::Error;

/// Custom error types for Silent-Ear
#[derive(Error, Debug)]
pub enum SilentEarError {
    #[error("Data directory not found: {path}")]
    DataDirNotFound { path: String },

    #[error("No data files found in directory: {path}")]
    NoDataFiles { path: String },

    #[error("Failed to read data file: {path}")]
    DataFileRead {
        path: String,
        #[source]
        source: std::io::Error,
    },

    #[error("Failed to parse CSV record at line {line}")]
    CsvParse {
        line: usize,
        #[source]
        source: csv::Error,
    },

    #[error("Configuration error: {message}")]
    Config { message: String },

    #[error("Server binding failed on {address}")]
    ServerBind {
        address: String,
        #[source]
        source: std::io::Error,
    },

    /// Reserved for future detector validation
    #[allow(dead_code)]
    #[error("Detector not trained - cannot perform inference")]
    DetectorNotTrained,

    /// Reserved for future threshold validation
    #[allow(dead_code)]
    #[error("Invalid threshold value: {value} (must be > 0)")]
    InvalidThreshold { value: f64 },

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("CSV error: {0}")]
    Csv(#[from] csv::Error),

    #[error("Config file error: {0}")]
    ConfigFile(#[from] config::ConfigError),
}

pub type Result<T> = std::result::Result<T, SilentEarError>;
