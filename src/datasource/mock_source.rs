//! Mock data source for testing and development

use async_trait::async_trait;
use rand::Rng;
use std::time::Duration;
use tokio::time::sleep;
use tracing::info;

use super::traits::{DataSource, SensorReading};
use crate::error::Result;

/// Mock data source that generates simulated sensor readings
pub struct MockDataSource {
    /// Number of channels to simulate
    num_channels: usize,

    /// Base values for each channel (healthy baseline)
    baseline: Vec<f64>,

    /// Current sample index
    current_idx: usize,

    /// Total samples to generate (None = infinite)
    total: Option<usize>,

    /// Delay between readings (simulates real sensor timing)
    read_delay: Duration,

    /// Whether to simulate degradation over time
    simulate_degradation: bool,

    /// Degradation start index
    degradation_start: usize,

    /// Whether the source is initialized
    initialized: bool,

    /// Calibration mode flag
    #[allow(dead_code)]
    in_calibration: bool,
}

impl MockDataSource {
    /// Create a new mock data source
    pub fn new(num_channels: usize) -> Self {
        Self {
            num_channels,
            baseline: vec![0.1; num_channels],
            current_idx: 0,
            total: Some(1000),
            read_delay: Duration::from_millis(10),
            simulate_degradation: true,
            degradation_start: 500,
            initialized: false,
            in_calibration: false,
        }
    }

    /// Set custom baseline values
    #[allow(dead_code)]
    pub fn with_baseline(mut self, baseline: Vec<f64>) -> Self {
        self.baseline = baseline;
        self.num_channels = self.baseline.len();
        self
    }

    /// Set total samples (None for infinite)
    pub fn with_total_samples(mut self, total: Option<usize>) -> Self {
        self.total = total;
        self
    }

    /// Set read delay
    #[allow(dead_code)]
    pub fn with_read_delay(mut self, delay: Duration) -> Self {
        self.read_delay = delay;
        self
    }

    /// Enable or disable degradation simulation
    pub fn with_degradation(mut self, enabled: bool, start_at: usize) -> Self {
        self.simulate_degradation = enabled;
        self.degradation_start = start_at;
        self
    }

    /// Generate a reading with optional degradation
    fn generate_reading(&self) -> Vec<f64> {
        let mut rng = rand::thread_rng();

        self.baseline
            .iter()
            .enumerate()
            .map(|(i, &base)| {
                // Add noise (±5%)
                let noise = rng.gen_range(-0.05..0.05) * base;

                // Calculate degradation factor
                let degradation =
                    if self.simulate_degradation && self.current_idx > self.degradation_start {
                        let progress = (self.current_idx - self.degradation_start) as f64;
                        let max_progress =
                            self.total.unwrap_or(1000) as f64 - self.degradation_start as f64;

                        // Simulate bearing 4 (channels 6,7) failing
                        if i >= 6 {
                            // Exponential degradation for failing bearing
                            let factor = (progress / max_progress * 3.0).min(3.0);
                            base * factor.exp() * 0.5
                        } else {
                            // Slight increase for other bearings
                            base * (progress / max_progress * 0.3)
                        }
                    } else {
                        0.0
                    };

                base + noise + degradation
            })
            .collect()
    }
}

#[async_trait]
impl DataSource for MockDataSource {
    async fn initialize(&mut self) -> Result<()> {
        info!(
            channels = self.num_channels,
            total = ?self.total,
            degradation = self.simulate_degradation,
            "Mock data source initialized"
        );
        self.initialized = true;
        Ok(())
    }

    async fn read_next(&mut self) -> Result<Option<SensorReading>> {
        // Check if we've reached the end
        if let Some(total) = self.total {
            if self.current_idx >= total {
                return Ok(None);
            }
        }

        // Simulate read delay
        if !self.read_delay.is_zero() {
            sleep(self.read_delay).await;
        }

        let values = self.generate_reading();
        let source_id = format!("mock_{:06}", self.current_idx);

        self.current_idx += 1;

        Ok(Some(SensorReading::new(source_id, values)))
    }

    async fn reset(&mut self) -> Result<()> {
        self.current_idx = 0;
        info!("Mock data source reset");
        Ok(())
    }

    fn total_samples(&self) -> Option<usize> {
        self.total
    }

    fn current_position(&self) -> usize {
        self.current_idx
    }

    fn is_ready(&self) -> bool {
        self.initialized
    }

    fn name(&self) -> &str {
        "MockDataSource"
    }

    fn supports_calibration(&self) -> bool {
        true
    }

    async fn enter_calibration_mode(&mut self) -> Result<()> {
        self.in_calibration = true;
        self.simulate_degradation = false;
        info!("Mock sensor entered calibration mode");
        Ok(())
    }

    async fn exit_calibration_mode(&mut self) -> Result<()> {
        self.in_calibration = false;
        self.simulate_degradation = true;
        info!("Mock sensor exited calibration mode");
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_mock_source_basic() {
        let mut source = MockDataSource::new(8)
            .with_total_samples(Some(10))
            .with_read_delay(Duration::ZERO);

        source.initialize().await.unwrap();

        assert!(source.is_ready());
        assert_eq!(source.total_samples(), Some(10));

        // Read all samples
        let mut count = 0;
        while let Some(_reading) = source.read_next().await.unwrap() {
            count += 1;
        }

        assert_eq!(count, 10);
    }

    #[tokio::test]
    async fn test_mock_source_reset() {
        let mut source = MockDataSource::new(4)
            .with_total_samples(Some(5))
            .with_read_delay(Duration::ZERO);

        source.initialize().await.unwrap();

        // Read some samples
        source.read_next().await.unwrap();
        source.read_next().await.unwrap();

        assert_eq!(source.current_position(), 2);

        // Reset
        source.reset().await.unwrap();
        assert_eq!(source.current_position(), 0);
    }

    #[tokio::test]
    async fn test_mock_source_calibration() {
        let mut source = MockDataSource::new(8);
        source.initialize().await.unwrap();

        assert!(source.supports_calibration());

        source.enter_calibration_mode().await.unwrap();
        source.exit_calibration_mode().await.unwrap();
    }
}
