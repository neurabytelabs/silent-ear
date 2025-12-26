# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

### [1.1.0] - Planned
- MQTT integration for industrial IoT
- Prometheus metrics endpoint
- ARM64 (Raspberry Pi) optimization

### [1.2.0] - Planned
- OPC-UA protocol support
- Real hardware sensor integration (ADXL345)

### [2.0.0] - Planned
- Machine learning models with Burn framework
- Multi-machine fleet monitoring
- Cloud dashboard option
