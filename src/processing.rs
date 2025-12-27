//! Processing engine module
//!
//! Handles the main DSP processing loop using the DataSource abstraction.

use csv::Writer;
use std::fs::OpenOptions;
use std::io::Write;
use std::sync::Arc;
use std::time::Instant;
use tracing::{debug, info, warn};

use crate::config::DataConfig;
use crate::datasource::{DataSource, SensorReading};
use crate::detector::AnomalyDetector;
use crate::error::Result;
use crate::metrics;
use crate::state::SharedState;
use crate::websocket::Broadcaster;

/// CSV column headers for output
const HEADERS: [&str; 9] = [
    "Timestamp",
    "B1_X",
    "B1_Y",
    "B2_X",
    "B2_Y",
    "B3_X",
    "B3_Y",
    "B4_X",
    "B4_Y",
];

/// Processing engine that runs the anomaly detection loop
pub struct ProcessingEngine {
    /// Anomaly detector instance
    detector: AnomalyDetector,

    /// Training data accumulator
    training_data: Vec<Vec<f64>>,

    /// Number of samples processed in current run
    samples_processed: usize,

    /// Whether simulation mode (console output) is enabled
    simulate_mode: bool,

    /// Data configuration
    config: DataConfig,

    /// WebSocket broadcaster for real-time updates
    broadcaster: Arc<Broadcaster>,
}

impl ProcessingEngine {
    /// Create a new processing engine
    pub fn new(
        threshold: f64,
        simulate_mode: bool,
        config: DataConfig,
        broadcaster: Arc<Broadcaster>,
    ) -> Self {
        Self {
            detector: AnomalyDetector::new(threshold),
            training_data: Vec::new(),
            samples_processed: 0,
            simulate_mode,
            config,
            broadcaster,
        }
    }

    /// Run the processing loop with the given data source
    pub async fn run<D: DataSource>(&mut self, source: &mut D, state: SharedState) -> Result<()> {
        // Initialize data source
        source.initialize().await?;
        info!(source = source.name(), "Data source initialized");

        // Create CSV writer
        let mut wtr = Writer::from_path(&self.config.output_file)?;
        wtr.write_record(HEADERS)?;
        wtr.flush()?;

        loop {
            // Check state flags
            let (is_running, reset_req, threshold, train_limit) = {
                let s = state.lock().unwrap();
                (s.is_running, s.reset_requested, s.threshold, s.train_limit)
            };

            // Handle reset request
            if reset_req {
                self.handle_reset(source, &state).await?;
                continue;
            }

            // Wait if not running
            if !is_running {
                tokio::time::sleep(tokio::time::Duration::from_millis(200)).await;
                continue;
            }

            // Update threshold if changed
            self.detector.set_threshold(threshold);

            // Read next sample
            let reading = match source.read_next().await? {
                Some(r) => r,
                None => {
                    // Check if we're already completed or this is first completion
                    let current_status = {
                        let s = state.lock().unwrap();
                        s.status.clone()
                    };

                    if current_status == "COMPLETED" {
                        // User restarted from COMPLETED state - auto-reset and continue
                        info!("Auto-resetting from COMPLETED state");
                        self.handle_reset(source, &state).await?;
                        // Re-enable running since user explicitly started
                        {
                            let mut s = state.lock().unwrap();
                            s.is_running = true;
                            s.add_log("Auto-reset complete. Restarting simulation.");
                            self.broadcaster.broadcast(&s);
                        }
                        continue;
                    }

                    // End of data - first completion
                    info!("Processing completed");
                    {
                        let mut s = state.lock().unwrap();
                        s.is_running = false;
                        s.status = "COMPLETED".to_string();
                        s.add_log("Processing finished.");
                        self.broadcaster.broadcast(&s);
                    }
                    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
                    continue;
                }
            };

            // Write to CSV
            self.write_csv_record(&mut wtr, &reading)?;

            // Process reading with timing
            let start = Instant::now();

            if self.samples_processed < train_limit {
                self.process_training(&reading, self.samples_processed, &state);
            } else if self.samples_processed == train_limit {
                self.finish_training(&state);
                self.process_inference(&reading, &state)?;
            } else {
                self.process_inference(&reading, &state)?;
            }

            // Record metrics
            let duration = start.elapsed().as_secs_f64();
            metrics::record_processing_time(duration);
            metrics::record_sample_processed();

            self.samples_processed += 1;
        }
    }

    /// Handle reset request
    async fn handle_reset<D: DataSource>(
        &mut self,
        source: &mut D,
        state: &SharedState,
    ) -> Result<()> {
        info!("Resetting simulation");

        // Reset source
        source.reset().await?;

        // Reset training data and sample counter
        self.training_data.clear();
        self.samples_processed = 0;

        // Get new threshold from state
        let threshold = {
            let s = state.lock().unwrap();
            s.threshold
        };

        // Reset detector
        self.detector = AnomalyDetector::new(threshold);

        // Reset state
        {
            let mut s = state.lock().unwrap();
            s.reset();
            self.broadcaster.broadcast(&s);
        }

        tokio::time::sleep(tokio::time::Duration::from_millis(500)).await;
        Ok(())
    }

    /// Write a reading to CSV
    fn write_csv_record(
        &self,
        wtr: &mut Writer<std::fs::File>,
        reading: &SensorReading,
    ) -> Result<()> {
        let mut record = vec![reading.source_id.clone()];
        for val in &reading.values {
            record.push(format!("{:.6}", val));
        }
        wtr.write_record(&record)?;
        wtr.flush()?;
        Ok(())
    }

    /// Process a training sample
    fn process_training(&mut self, reading: &SensorReading, idx: usize, state: &SharedState) {
        self.training_data.push(reading.values.clone());
        debug!(file = %reading.source_id, idx = idx, "Training sample");

        // Update training sample count metric
        metrics::set_training_samples(self.training_data.len());

        {
            let mut s = state.lock().unwrap();
            s.current_file = reading.source_id.clone();
            s.status = "TRAINING".to_string();
            s.is_training = true;
            s.latest_readings = reading.values.clone();

            // Update metrics from state
            metrics::update_from_state(&s);

            self.broadcaster.broadcast(&s);
        }

        if self.simulate_mode {
            print_live_status(&reading.source_id, 1.0, true);
        }
    }

    /// Finish training phase
    fn finish_training(&mut self, state: &SharedState) {
        info!(samples = self.training_data.len(), "Training complete");
        self.detector.train(&self.training_data);
        self.training_data.clear();

        let mut s = state.lock().unwrap();
        s.add_log("Training complete. Switching to monitoring mode.");
    }

    /// Process an inference sample
    fn process_inference(&self, reading: &SensorReading, state: &SharedState) -> Result<()> {
        let anomalies = self.detector.is_anomaly(&reading.values);
        let health_score = self.detector.calculate_health_score(&reading.values);
        let is_critical = anomalies.iter().any(|&x| x);

        // Record anomaly if any channel detected
        if anomalies.iter().any(|&x| x) {
            metrics::record_anomaly();
        }

        let status_str = if health_score > 0.9 {
            "NORMAL"
        } else if health_score > 0.5 {
            "WARNING"
        } else {
            "CRITICAL"
        };

        {
            let mut s = state.lock().unwrap();
            s.current_file = reading.source_id.clone();
            s.health_score = health_score;
            s.status = status_str.to_string();
            s.latest_readings = reading.values.clone();
            s.is_training = false;

            if is_critical {
                let msg = format!("CRITICAL: Health {:.1}%", health_score * 100.0);
                s.add_log(&msg);
            }

            // Update metrics from state
            metrics::update_from_state(&s);

            self.broadcaster.broadcast(&s);
        }

        if self.simulate_mode {
            print_live_status(&reading.source_id, health_score, false);
        }

        // Log critical alarms to file
        if is_critical {
            self.log_alarm(reading, &anomalies, health_score)?;
        }

        Ok(())
    }

    /// Log an alarm to the alarm file
    fn log_alarm(
        &self,
        reading: &SensorReading,
        anomalies: &[bool],
        health_score: f64,
    ) -> Result<()> {
        warn!(
            timestamp = %reading.source_id,
            health = health_score * 100.0,
            "Critical anomaly detected"
        );

        let mut msg = format!(
            "[CRITICAL ALARM] Timestamp: {} -> Health: {:.1}% -> ",
            reading.source_id,
            health_score * 100.0
        );

        let mut detected = false;
        for (i, &is_anom) in anomalies.iter().enumerate() {
            if is_anom {
                if detected {
                    msg.push_str(", ");
                }
                msg.push_str(&format!(
                    "{} (Val: {:.4})",
                    HEADERS[i + 1],
                    reading.values[i]
                ));
                detected = true;
            }
        }

        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&self.config.alarm_file)?;
        writeln!(file, "{}", msg)?;

        Ok(())
    }
}

/// Print live status to terminal (simulation mode)
fn print_live_status(timestamp: &str, health: f64, training: bool) {
    let bar_len = 20;
    let filled = (health * bar_len as f64).round() as usize;
    let empty = bar_len - filled;
    let bar = format!("{}{}", "█".repeat(filled), "░".repeat(empty));

    let status = if training {
        "TRAINING"
    } else if health > 0.9 {
        "NORMAL  "
    } else if health > 0.5 {
        "WARNING "
    } else {
        "CRITICAL"
    };

    let color = if training {
        "\x1b[34m"
    } else if health > 0.9 {
        "\x1b[32m"
    } else if health > 0.5 {
        "\x1b[33m"
    } else {
        "\x1b[31m"
    };

    print!(
        "\r{} [{}] {}% | {} | {}",
        color,
        bar,
        (health * 100.0) as u32,
        status,
        timestamp
    );
    std::io::stdout().flush().unwrap();
    print!("\x1b[0m");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_headers() {
        assert_eq!(HEADERS.len(), 9);
        assert_eq!(HEADERS[0], "Timestamp");
    }

    #[test]
    fn test_processing_engine_creation() {
        let config = DataConfig {
            directory: "test".to_string(),
            output_file: "test.csv".to_string(),
            alarm_file: "test_alarm.log".to_string(),
        };
        let broadcaster = Arc::new(Broadcaster::new());
        let engine = ProcessingEngine::new(3.0, false, config, broadcaster);
        assert!(engine.training_data.is_empty());
        assert_eq!(engine.samples_processed, 0);
    }
}
