# Silent-Ear (Conatus Agent #37)
**Industrial Edge AI Anomaly Detection System**

Silent-Ear is a lightweight, high-performance predictive maintenance agent built in Rust. It analyzes high-frequency vibration data from industrial machinery to detect bearing faults before catastrophic failure occurs.

Designed according to the **Conatus** philosophy: Self-contained, efficient, and resilient.

## Features

- **🚀 High Performance:** Processes 40M+ data points in under 1.5 seconds on commodity hardware.
- **🧠 Statistical AI:** Uses a statistical anomaly detector (Mean + 3σ) to learn "normal" behavior without heavy ML frameworks.
- **❤️ Health Scoring:** Calculates a real-time Health Score (0-100%) quantifying machine degradation.
- **🔌 Microservice Architecture:** Exposes a REST API (`/api/status`) for network integration.
- **📊 Real-time Dashboard:** Includes a built-in web dashboard for live visualization of sensor data and alerts.

## Architecture

The system consists of three main components running concurrently:

1.  **DSP Engine (Thread A):** Reads raw sensor data (IMS format), calculates RMS (Root Mean Square) values, and feeds the detector.
2.  **The Brain (Detector):** Learns baseline statistics during a "Calibration Phase" and then monitors deviations (Z-Scores) to trigger alarms.
3.  **The Interface (Thread B):** An `Axum` web server that hosts the JSON API and the HTML5 Dashboard.

## Quick Start

### Prerequisites
- Rust (Cargo)
- Modern Web Browser

### Running the Simulation
To see the agent in action using the NASA IMS Bearing Dataset:

```bash
./run.sh
```

This script will:
1.  Compile the project in release mode.
2.  Start the agent with the `--simulate` flag.
3.  The dashboard will be available at **http://localhost:3000**.

### Manual Build

```bash
cd projects/silent-ear
cargo build --release
./target/release/silent-ear --simulate
```

## API Reference

**GET /api/status**

Returns the current system state in JSON format.

```json
{
  "current_file": "2003.10.22.12.06.24",
  "health_score": 0.98,
  "status": "NORMAL",
  "latest_readings": [0.12, 0.11, 0.13, ...],
  "is_training": false
}
```

## Dataset

This project uses the **NASA IMS Bearing Data (Set No. 2)**.
- **Sensor 1:** Bearing 1 (Healthy)
- **Sensor 2:** Bearing 2 (Healthy)
- **Sensor 3:** Bearing 3 (Healthy)
- **Sensor 4:** Bearing 4 (Fails at end of test)

## License

Internal Conatus Agent - MIT License.
