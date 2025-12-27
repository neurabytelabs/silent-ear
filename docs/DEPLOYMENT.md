# Silent-Ear Deployment Guide

## Quick Start with Docker

```bash
# Run with mock data (demo mode)
docker run -p 3000:3000 ghcr.io/mrsarac/silent-ear:latest

# Run with real NASA IMS dataset
docker run -p 3000:3000 \
  -v /path/to/data:/app/data:ro \
  ghcr.io/mrsarac/silent-ear:latest \
  ./silent-ear --simulate
```

## Coolify Deployment

Silent-Ear can be deployed to Coolify with these settings:

### 1. Create New Resource
- Type: **Dockerfile**
- Repository: `https://github.com/mrsarac/silent-ear`
- Branch: `master`

### 2. Build Configuration
- Dockerfile: `Dockerfile`
- Build context: `.`

### 3. Environment Variables
```env
RUST_LOG=info
```

### 4. Port Configuration
- Container port: `3000`
- Expose on: Your desired domain (e.g., `silent-ear.neurabytelabs.com`)

### 5. Health Check
Already configured in Dockerfile:
- Endpoint: `/api/status`
- Interval: 30s
- Timeout: 3s

## MQTT Integration

To enable MQTT publishing, add these environment variables:

```env
MQTT_HOST=your-mqtt-broker.local
MQTT_PORT=1883
MQTT_CLIENT_ID=silent-ear-demo
```

And change the command to:
```
./silent-ear --mock --mqtt
```

## Prometheus Monitoring

Metrics are available at `/metrics` endpoint. Add to your Prometheus config:

```yaml
scrape_configs:
  - job_name: 'silent-ear'
    static_configs:
      - targets: ['silent-ear.neurabytelabs.com:443']
    scheme: https
```

### Available Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `silent_ear_health_score` | Gauge | Current health (0.0-1.0) |
| `silent_ear_health_percent` | Gauge | Health as percentage |
| `silent_ear_samples_processed_total` | Counter | Total samples |
| `silent_ear_anomalies_detected_total` | Counter | Anomalies found |
| `silent_ear_critical_alerts_total` | Counter | Critical alerts |
| `silent_ear_processing_duration_seconds` | Histogram | Processing time |
| `silent_ear_sensor_b*_*` | Gauge | Per-channel readings |

## Grafana Dashboard

Import the following dashboard for visualization:

```json
{
  "panels": [
    {
      "title": "Health Score",
      "type": "gauge",
      "targets": [{"expr": "silent_ear_health_percent"}]
    },
    {
      "title": "Samples Processed",
      "type": "stat",
      "targets": [{"expr": "silent_ear_samples_processed_total"}]
    },
    {
      "title": "Processing Time",
      "type": "graph",
      "targets": [{"expr": "rate(silent_ear_processing_duration_seconds_sum[1m])"}]
    }
  ]
}
```

## Traefik Configuration (Manual)

If deploying outside Coolify, add to Traefik dynamic config:

```yaml
http:
  routers:
    silent-ear:
      rule: "Host(`silent-ear.neurabytelabs.com`)"
      service: silent-ear
      tls:
        certResolver: letsencrypt

  services:
    silent-ear:
      loadBalancer:
        servers:
          - url: "http://silent-ear:3000"
```

## Resource Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| CPU | 0.5 core | 1 core |
| Memory | 128 MB | 256 MB |
| Disk | 50 MB | 100 MB |

## Security Notes

- Container runs as non-root user `silentear`
- No persistent data required (stateless)
- Health endpoint is public (no auth)
- Metrics endpoint is public (consider restricting in production)

## Troubleshooting

### Container exits immediately
Check logs: `docker logs silent-ear`
Common issue: Missing data files in simulate mode. Use `--mock` for demo.

### WebSocket not connecting
Ensure your reverse proxy supports WebSocket upgrades.
Traefik/Coolify handle this automatically.

### Metrics not updating
Check if processing is running: `curl http://localhost:3000/api/status`
Look for `is_running: true` in response.
