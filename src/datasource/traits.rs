//! Core traits for data source abstraction

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use std::time::SystemTime;

use crate::error::Result;

/// A single sensor reading with metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SensorReading {
    /// Timestamp of the reading
    pub timestamp: SystemTime,

    /// Human-readable identifier (filename or sensor ID)
    pub source_id: String,

    /// RMS values for each channel (typically 8 channels for bearings)
    pub values: Vec<f64>,

    /// Optional raw sample count (for file-based sources)
    pub sample_count: Option<usize>,
}

impl SensorReading {
    /// Create a new sensor reading
    pub fn new(source_id: impl Into<String>, values: Vec<f64>) -> Self {
        Self {
            timestamp: SystemTime::now(),
            source_id: source_id.into(),
            values,
            sample_count: None,
        }
    }

    /// Create with sample count
    pub fn with_sample_count(mut self, count: usize) -> Self {
        self.sample_count = Some(count);
        self
    }
}

/// Async data source trait
///
/// Implement this trait for different data sources:
/// - File-based (NASA IMS simulation)
/// - Mock (testing)
/// - Hardware sensor (ADXL345)
#[allow(dead_code)]
// async_trait expands must_use twice; lint is a false positive.
#[allow(clippy::double_must_use)]
#[async_trait]
pub trait DataSource: Send + Sync {
    /// Initialize the data source
    async fn initialize(&mut self) -> Result<()>;

    /// Read the next sample
    /// Returns None when no more data is available (end of file, etc.)
    async fn read_next(&mut self) -> Result<Option<SensorReading>>;

    /// Reset to the beginning (for file-based sources)
    async fn reset(&mut self) -> Result<()>;

    /// Get the total number of samples (if known)
    fn total_samples(&self) -> Option<usize>;

    /// Get the current position (if applicable)
    fn current_position(&self) -> usize;

    /// Check if the source is ready
    fn is_ready(&self) -> bool;

    /// Get source name for logging
    fn name(&self) -> &str;

    /// Check if calibration mode is supported
    fn supports_calibration(&self) -> bool {
        false
    }

    /// Enter calibration mode (for hardware sensors)
    async fn enter_calibration_mode(&mut self) -> Result<()> {
        Ok(())
    }

    /// Exit calibration mode
    async fn exit_calibration_mode(&mut self) -> Result<()> {
        Ok(())
    }
}
