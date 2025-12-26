# Silent-Ear Architecture

## System Overview

Silent-Ear is an Industrial Edge AI system designed for predictive maintenance. It processes high-frequency vibration data locally (edge computing) without sending data to the cloud.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SILENT-EAR                                  │
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │   Sensors    │───▶│  DSP Engine  │───▶│  Anomaly Detector    │  │
│  │  (Vibration) │    │  (RMS Calc)  │    │  (Statistical AI)    │  │
│  └──────────────┘    └──────────────┘    └──────────┬───────────┘  │
│                                                      │              │
│                                          ┌───────────▼───────────┐  │
│                                          │    Health Score       │  │
│                                          │    (0-100%)           │  │
│                                          └───────────┬───────────┘  │
│                                                      │              │
│  ┌──────────────────────────────────────────────────▼───────────┐  │
│  │                      Web Interface                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │  │
│  │  │  REST API   │  │  Dashboard  │  │   Alarm System      │   │  │
│  │  │ /api/status │  │    HTML5    │  │   (Log + Alert)     │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Components

### 1. DSP Engine (Thread A)

**Purpose:** Process raw sensor data into meaningful metrics.

**Algorithm:** Root Mean Square (RMS)
```
RMS = √(Σ(x²) / n)
```

**Input:** Raw vibration data (20,480 samples per reading @ 20kHz)
**Output:** 8 RMS values (one per bearing channel)

### 2. Anomaly Detector (The Brain)

**Purpose:** Learn normal behavior and detect deviations.

**Algorithm:** Statistical Process Control (3-Sigma Rule)
```
Anomaly if: value > mean + (3 × std_dev)
```

**Phases:**
1. **Training Mode** - First 500 samples establish baseline
2. **Inference Mode** - Compare new data against baseline

### 3. Health Score Calculator

**Formula:**
```
Z-Score = |value - mean| / std_dev

Health Score:
  - Z ≤ threshold (3.0)  → 100%
  - Z ≥ fatal (15.0)     → 0%
  - Otherwise            → Linear interpolation
```

### 4. Web Interface (Thread B)

**Stack:** Axum (async Rust web framework)

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | HTML Dashboard |
| `/api/status` | GET | Current state JSON |
| `/api/control` | POST | Start/Stop/Reset |
| `/api/settings` | POST | Configure threshold |

## Data Flow

```
1. Sensor Data (Tab-separated values)
   ↓
2. File Reader (streaming)
   ↓
3. RMS Calculation (per channel)
   ↓
4. Anomaly Detection (Z-Score)
   ↓
5. Health Score Update
   ↓
6. API + Dashboard Broadcast
```

## Concurrency Model

```
┌────────────────────────────────────────┐
│              Main Thread               │
│  (Tokio async runtime)                 │
│                                        │
│  ┌──────────────┐  ┌────────────────┐  │
│  │   Thread A   │  │    Thread B    │  │
│  │ Processing   │  │   Web Server   │  │
│  │ Loop         │  │   (Axum)       │  │
│  └──────┬───────┘  └───────┬────────┘  │
│         │                  │           │
│         └──────┬───────────┘           │
│                │                       │
│       Arc<Mutex<SystemState>>          │
│       (Shared State)                   │
└────────────────────────────────────────┘
```

## Memory Safety

- **Arc<Mutex<T>>** - Thread-safe shared state
- **No unsafe blocks** - 100% safe Rust
- **Zero heap allocations in hot path** - Reused buffers

## Performance Characteristics

| Metric | Value |
|--------|-------|
| Data points processed | 40M+ |
| Processing time | <1.5 seconds |
| Memory footprint | ~10 MB |
| Binary size | ~5 MB |
| API latency | <1 ms |

## Future Extensions

1. **MQTT Integration** - Industrial IoT standard
2. **OPC-UA Support** - Factory automation protocol
3. **Prometheus Metrics** - Enterprise monitoring
4. **ML Models** - Burn framework for deep learning
5. **Edge TPU** - Hardware acceleration (Coral)
