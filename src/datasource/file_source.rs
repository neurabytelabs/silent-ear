//! File-based data source for NASA IMS dataset simulation

use async_trait::async_trait;
use csv::ReaderBuilder;
use std::fs::{self, File};
use std::io::BufReader;
use std::path::{Path, PathBuf};
use tracing::{debug, info};

use super::traits::{DataSource, SensorReading};
use crate::error::{Result, SilentEarError};

/// File-based data source for reading sensor data from files
pub struct FileDataSource {
    /// Directory containing data files
    data_dir: PathBuf,

    /// Sorted list of data files
    files: Vec<PathBuf>,

    /// Current file index
    current_idx: usize,

    /// Number of channels to read
    num_channels: usize,

    /// Whether the source has been initialized
    initialized: bool,
}

impl FileDataSource {
    /// Create a new file data source
    pub fn new(data_dir: impl AsRef<Path>) -> Self {
        Self {
            data_dir: data_dir.as_ref().to_path_buf(),
            files: Vec::new(),
            current_idx: 0,
            num_channels: 8,
            initialized: false,
        }
    }

    /// Set the number of channels to read
    #[allow(dead_code)]
    pub fn with_channels(mut self, num_channels: usize) -> Self {
        self.num_channels = num_channels;
        self
    }

    /// Calculate RMS values from a data file
    fn calculate_rms(&self, path: &Path) -> Result<(Vec<f64>, usize)> {
        let file = File::open(path).map_err(|e| SilentEarError::DataFileRead {
            path: path.display().to_string(),
            source: e,
        })?;
        let buf_reader = BufReader::new(file);

        let mut rdr = ReaderBuilder::new()
            .delimiter(b'\t')
            .has_headers(false)
            .flexible(true)
            .from_reader(buf_reader);

        let mut sum_squares = vec![0.0; self.num_channels];
        let mut count = 0;

        for (line_num, result) in rdr.records().enumerate() {
            let record = result.map_err(|e| SilentEarError::CsvParse {
                line: line_num + 1,
                source: e,
            })?;

            for (i, sum) in sum_squares.iter_mut().enumerate() {
                if let Some(field) = record.get(i) {
                    if let Ok(val) = field.trim().parse::<f64>() {
                        *sum += val * val;
                    }
                }
            }
            count += 1;
        }

        if count == 0 {
            return Ok((vec![0.0; self.num_channels], 0));
        }

        let rms: Vec<f64> = sum_squares
            .iter()
            .map(|&sum| (sum / count as f64).sqrt())
            .collect();

        Ok((rms, count))
    }
}

#[async_trait]
impl DataSource for FileDataSource {
    async fn initialize(&mut self) -> Result<()> {
        if !self.data_dir.exists() {
            return Err(SilentEarError::DataDirNotFound {
                path: self.data_dir.display().to_string(),
            });
        }

        let mut files: Vec<PathBuf> = fs::read_dir(&self.data_dir)?
            .filter_map(|entry| entry.ok())
            .map(|entry| entry.path())
            .filter(|path| path.is_file())
            .filter(|path| {
                path.file_name()
                    .and_then(|n| n.to_str())
                    .map(|s| !s.starts_with('.'))
                    .unwrap_or(false)
            })
            .collect();

        if files.is_empty() {
            return Err(SilentEarError::NoDataFiles {
                path: self.data_dir.display().to_string(),
            });
        }

        files.sort();
        info!(
            total_files = files.len(),
            dir = %self.data_dir.display(),
            "File data source initialized"
        );

        self.files = files;
        self.current_idx = 0;
        self.initialized = true;

        Ok(())
    }

    async fn read_next(&mut self) -> Result<Option<SensorReading>> {
        if !self.initialized {
            return Err(SilentEarError::Config {
                message: "Data source not initialized".to_string(),
            });
        }

        if self.current_idx >= self.files.len() {
            return Ok(None);
        }

        let file_path = &self.files[self.current_idx];
        let filename = file_path
            .file_name()
            .and_then(|f| f.to_str())
            .unwrap_or("unknown")
            .to_string();

        debug!(file = %filename, idx = self.current_idx, "Reading file");

        let (rms_values, sample_count) = self.calculate_rms(file_path)?;

        self.current_idx += 1;

        Ok(Some(
            SensorReading::new(filename, rms_values).with_sample_count(sample_count),
        ))
    }

    async fn reset(&mut self) -> Result<()> {
        self.current_idx = 0;
        info!("File data source reset to beginning");
        Ok(())
    }

    fn total_samples(&self) -> Option<usize> {
        Some(self.files.len())
    }

    fn current_position(&self) -> usize {
        self.current_idx
    }

    fn is_ready(&self) -> bool {
        self.initialized
    }

    fn name(&self) -> &str {
        "FileDataSource"
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::tempdir;

    #[tokio::test]
    async fn test_file_source_initialization() {
        let dir = tempdir().unwrap();

        // Create test files
        for i in 0..3 {
            let path = dir.path().join(format!("test_{}.txt", i));
            let mut file = File::create(&path).unwrap();
            writeln!(file, "1.0\t2.0\t3.0\t4.0\t5.0\t6.0\t7.0\t8.0").unwrap();
        }

        let mut source = FileDataSource::new(dir.path());
        source.initialize().await.unwrap();

        assert!(source.is_ready());
        assert_eq!(source.total_samples(), Some(3));
    }

    #[tokio::test]
    async fn test_file_source_empty_dir() {
        let dir = tempdir().unwrap();
        let mut source = FileDataSource::new(dir.path());

        let result = source.initialize().await;
        assert!(result.is_err());
    }
}
