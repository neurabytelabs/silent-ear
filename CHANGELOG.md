# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Demo deployment at silent-ear.neurabytelabs.com
- OPC-UA protocol support

---

## [1.3.0] - 2025-12-27

### Added
- **MQTT Integration** - Publish state updates to MQTT broker for industrial IoT integration
  - Topics: `silent-ear/health`, `silent-ear/alerts`
  - Environment config: `MQTT_HOST`, `MQTT_PORT`, `MQTT_CLIENT_ID`
  - CLI flag: `--mqtt` to enable
- **Prometheus Metrics** - Expose metrics at `/metrics` endpoint for observability
  - `silent_ear_health_score` - Current health score (0.0 to 1.0)
  - `silent_ear_samples_processed_total` - Total samples processed
  - `silent_ear_anomalies_detected_total` - Total anomalies detected
  - `silent_ear_critical_alerts_total` - Total critical alerts
  - `silent_ear_processing_duration_seconds` - Processing time histogram
  - Per-channel sensor readings (B1_X, B1_Y, B2_X, B2_Y, B3_X, B3_Y, B4_X, B4_Y)
- **Disclaimer** - Added safety disclaimer to README per legal review

### Changed
- Test coverage increased from 37 to 42 tests (+5 new tests)
- Dependencies: added `rumqttc`, `prometheus`, `lazy_static`

### Technical Details
- MQTT bridge subscribes to WebSocket broadcast for state updates
- Prometheus registry with lazy_static gauges, counters, and histograms
- Metrics router merged with main API router

---

## [1.2.1] - 2025-12-27

### Fixed
- **Reset Counter Bug** - `samples_processed` counter now properly resets when simulation resets
- **Auto-Restart from COMPLETED State** - Starting simulation from COMPLETED state now triggers automatic reset instead of immediate completion

### Technical Details
- Moved `samples_processed` from local variable to `ProcessingEngine` struct field
- API control handler now preserves COMPLETED status to allow processing loop to detect and auto-reset
- Added auto-reset logic in processing loop when user starts from COMPLETED state

---

## [1.2.0] - 2025-12-27

### Added
- **Modular Architecture** - main.rs refactored from 574 to 143 lines (~75% reduction)
- **DataSource Abstraction** - Trait-based data source system for hardware flexibility
- **FileDataSource** - NASA IMS dataset simulation with RMS calculation
- **MockDataSource** - Testing without data files, configurable degradation simulation
- **ProcessingEngine** - Unified processing loop with DataSource integration
- **SystemState Module** - Thread-safe state management with helper methods
- **API Module** - Separated REST endpoints for better maintainability
- **CLI Arguments** - `--mock` for MockDataSource, `--sensor` for future hardware
- **WebSocket Module** - Real-time dashboard updates via WebSocket broadcast
- **Broadcaster Pattern** - Centralized state broadcast to all connected clients

### Changed
- Test coverage increased from 23 to 37 tests (+14 new tests)
- Dependencies: added `async-trait`, `rand`, `futures-util`, `tempfile` (dev)
- Dashboard now uses WebSocket instead of 500ms polling (lower latency, reduced bandwidth)
- CI now builds multi-arch Docker images (AMD64 + ARM64)

### Technical Details
- Async DataSource trait with `async_trait` macro
- SensorReading struct for unified data format
- Calibration mode support in trait (for hardware sensors)
- Degradation simulation for bearing failure testing
- WebSocket endpoint at `/ws` for real-time updates
- Automatic WebSocket reconnection on disconnect
- Cross-compilation for ARM64 (Raspberry Pi 4/5)
- GitHub Container Registry for Docker images

---

## [1.1.0] - 2025-12-26

### Added
- **GitHub Actions CI/CD** - Automated testing, building, and Docker image creation
- **Custom Error Types** - `thiserror`-based error handling with descriptive messages
- **Structured Logging** - `tracing` integration with configurable log levels and JSON output
- **Configuration File Support** - External `config.toml` with environment variable overrides
- **Comprehensive Test Suite** - 23 unit tests covering detector, config, and edge cases

### Changed
- Test coverage increased from 5 to 23 tests
- Rust version requirement updated to 1.83+
- Improved code quality with clippy compliance (`-D warnings`)
- Documentation translated to English

### Fixed
- Docker healthcheck now works correctly (curl installed)
- All clippy warnings resolved

### Technical Details
- New dependencies: `thiserror`, `tracing`, `tracing-subscriber`, `config`, `toml`
- CI runs on every push to master: test → build → docker
- Configuration priority: ENV vars > config.toml > defaults

---

## [1.0.0] - 2025-12-26

### Added
- Initial public release
- DSP Engine with RMS calculation for 8-channel vibration data
- Statistical anomaly detection using Mean + 3σ rule
- Real-time Health Score (0-100%) calculation
- REST API endpoints (`/api/status`, `/api/control`, `/api/settings`)
- HTML5 dashboard with live visualization
- Simulation mode using NASA IMS Bearing Dataset
- Docker support with multi-stage build
- Unit tests for anomaly detector (5 tests passing)
- Comprehensive documentation (README, ARCHITECTURE, CONTRIBUTING)

### Technical Details
- Built with Rust 1.83
- Async runtime: Tokio
- Web framework: Axum 0.7
- Memory-safe, thread-safe concurrent architecture
- Processes 40M+ data points in <1.5 seconds

## [0.1.0] - 2025-12-25

### Added
- Initial proof of concept
- Basic RMS calculation
- File-based data processing

---

## Roadmap

### [1.4.0] - Planned
- OPC-UA protocol support
- Real hardware sensor integration (ADXL345)
- I2C/SPI sensor driver

### [2.0.0] - Planned
- Machine learning models with Burn framework
- Multi-machine fleet monitoring
- Cloud dashboard option
