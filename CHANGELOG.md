# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - feature/hardware-ready

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

## [1.1.0] - 2025-12-27

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

### [1.2.0] - Planned
- MQTT integration for industrial IoT
- Prometheus metrics endpoint
- WebSocket for real-time dashboard updates

### [1.3.0] - Planned
- OPC-UA protocol support
- Real hardware sensor integration (ADXL345)

### [2.0.0] - Planned
- Machine learning models with Burn framework
- Multi-machine fleet monitoring
- Cloud dashboard option
