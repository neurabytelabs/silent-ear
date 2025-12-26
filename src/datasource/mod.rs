//! Data source abstraction layer
//!
//! Provides a unified interface for reading sensor data from various sources:
//! - File-based (NASA IMS dataset simulation)
//! - Mock (for testing and development)
//! - Hardware sensor (ADXL345 via I2C) - future implementation

mod file_source;
mod mock_source;
mod traits;

pub use file_source::FileDataSource;
pub use mock_source::MockDataSource;
pub use traits::{DataSource, SensorReading};

/// Data source type enumeration for configuration
#[derive(Debug, Clone, PartialEq, Default)]
pub enum DataSourceType {
    /// Read from files (simulation mode)
    #[default]
    File,
    /// Mock data for testing
    Mock,
    /// Real hardware sensor (future)
    Sensor,
}

impl std::str::FromStr for DataSourceType {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "file" | "simulate" => Ok(Self::File),
            "mock" | "test" => Ok(Self::Mock),
            "sensor" | "hardware" | "i2c" => Ok(Self::Sensor),
            _ => Err(format!("Unknown data source type: {}", s)),
        }
    }
}
