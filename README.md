# 🔊 Silent-Ear

[![Rust](https://img.shields.io/badge/rust-1.70%2B-orange.svg)](https://www.rust-lang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-5%20passing-brightgreen.svg)]()

**Industrial Edge AI Anomaly Detection System for Predictive Maintenance**

Silent-Ear is a lightweight, high-performance agent that analyzes vibration data from industrial machinery to detect bearing faults *before* catastrophic failure occurs.

> 🏭 *"Your factory's sense of hearing."*

## ✨ Features

- **🚀 High Performance** — Processes 40M+ data points in under 1.5 seconds
- **🧠 Statistical AI** — Uses Mean + 3σ anomaly detection (no heavy ML frameworks)
- **❤️ Health Scoring** — Real-time 0-100% health score for machine degradation
- **🔌 REST API** — JSON endpoints for network integration
- **📊 Live Dashboard** — Built-in HTML5 visualization
- **🐳 Docker Ready** — One command deployment

## 📸 Screenshot

```
┌────────────────────────────────────────────────────────┐
│  SILENT-EAR v1.0.0         [MONITORING] Health: 94%   │
├────────────────────────────────────────────────────────┤
│                                                        │
│   B1 ████████████████████░░░░  0.142                  │
│   B2 █████████████████████░░░  0.156                  │
│   B3 ████████████████████░░░░  0.138                  │
│   B4 ██████████████████████████████████  0.487  ⚠️    │
│                                                        │
│   Status: WARNING - Bearing 4 showing degradation     │
│   Last Update: 2025-12-26 02:30:15                    │
└────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
docker-compose up -d
# Open http://localhost:3000
```

### Option 2: From Source

```bash
# Prerequisites: Rust 1.70+
git clone https://github.com/mrsarac/silent-ear.git
cd silent-ear

# Download NASA IMS dataset (optional, for full simulation)
# Place in data/ims/1st_test/1st_test/

# Run simulation
./run.sh
# or
cargo run --release -- --simulate
```

## 🏗️ Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Sensors   │───▶│ DSP Engine  │───▶│  Detector   │
│ (Vibration) │    │ (RMS Calc)  │    │ (3σ Rule)   │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                             │
                                    ┌────────▼────────┐
                                    │  Health Score   │
                                    │   (0-100%)      │
                                    └────────┬────────┘
                                             │
                   ┌─────────────────────────▼─────────────────────────┐
                   │                 Web Interface                     │
                   │  REST API (/api/status)  │  Dashboard (HTML5)    │
                   └───────────────────────────────────────────────────┘
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed documentation.

## 📡 API Reference

### GET /api/status

Returns current system state.

```json
{
  "current_file": "2003.10.22.12.06.24",
  "health_score": 0.94,
  "status": "WARNING",
  "latest_readings": [0.142, 0.156, 0.138, 0.487, ...],
  "is_training": false
}
```

### POST /api/control

Control the simulation.

```json
{ "action": "start" }  // or "stop", "reset"
```

### POST /api/settings

Configure detector parameters.

```json
{
  "threshold": 3.0,
  "train_limit": 500
}
```

## 📊 Dataset

This project uses the **NASA IMS Bearing Dataset** (Set No. 2):
- 4 bearings monitored continuously until failure
- 20,480 samples per reading at 20 kHz
- Bearing 4 fails at end of test (outer race defect)

[Download Dataset](https://www.nasa.gov/content/prognostics-center-of-excellence-data-set-repository)

## 🧪 Testing

```bash
cargo test
```

```
running 5 tests
test detector::tests::test_new_detector ... ok
test detector::tests::test_train_detector ... ok
test detector::tests::test_anomaly_detection ... ok
test detector::tests::test_health_score ... ok
test detector::tests::test_set_threshold ... ok

test result: ok. 5 passed; 0 failed
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Rust 🦀 |
| Async Runtime | Tokio |
| Web Framework | Axum |
| DSP | Native (RMS calculation) |
| AI | Statistical Process Control |

## 🗺️ Roadmap

- [ ] MQTT integration (industrial IoT)
- [ ] OPC-UA support (factory automation)
- [ ] Prometheus metrics export
- [ ] Raspberry Pi / ARM64 optimization
- [ ] Real hardware sensor support (ADXL345)
- [ ] Machine learning with Burn framework

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🏢 About

Part of the **NeuraByte Labs** ecosystem — Building autonomous AI systems that interact with the physical world.

---

*Built with 🦀 Rust in Germany*
