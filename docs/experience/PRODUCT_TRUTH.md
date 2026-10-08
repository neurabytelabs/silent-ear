# Silent-Ear product truth

Status: source-audited product contract for the local Q4 experience

Audit basis: commit `08e154f0cc9328d0f812470bd7fea8ad77ecdb0b` on `feat/silent-ear-3d-product-experience`, inspected 2026-08-26

Evidence level: static repository inspection. Runtime and browser results belong in `QA_REPORT.md`.

## Public product statement

Silent-Ear is an open-source Rust educational demonstrator that calculates up to eight RMS-channel readings from file-backed raw vibration samples, or accepts eight synthetic RMS-like demo values, and compares those readings with a fixed statistical reference.

Its public result is **Demo deviation score**. Every score view must include this adjacent explanation:

> A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life.

The experience must also state, near evidence and action surfaces:

> Demonstration and educational software; not certified for safety-critical industrial use.

The demonstrator makes a statistical comparison. It does not determine a machine's physical condition, identify a fault type, diagnose damage, predict failure, or estimate remaining useful life.

## Source-backed signal path

1. **File input:** `FileDataSource` sorts files, reads up to eight tab-separated columns, and calculates one RMS value per column per file as `sqrt(sum(x^2) / row_count)` (`src/datasource/file_source.rs:50-92`, `src/datasource/file_source.rs:98-163`). Those per-file values are RMS records, not a raw waveform.
2. **Synthetic input:** `MockDataSource` directly generates eight RMS-like demo channel values around `0.1`; it does not synthesize raw samples and then run the file RMS calculation (`src/datasource/mock_source.rs:43-56`, `src/datasource/mock_source.rs:87-121`). Public copy must call these controlled/synthetic demo values, not measured sensor data.
3. **Reference learning:** the processing engine collects the first `train_limit` reading vectors. On the next reading, it computes per-channel arithmetic means and population standard deviations (division by `N`, not `N-1`), clears the training accumulator, and immediately compares that next reading (`src/processing.rs:149-156`, `src/processing.rs:217-251`; `src/detector.rs:19-49`).
4. **Fixed reference:** after that training call, mean and standard deviation are not updated during inference. They change only after a reset/retrain. Changing the threshold changes the comparison boundary but does not adapt the learned reference (`src/processing.rs:102-104`, `src/processing.rs:167-199`, `src/processing.rs:243-256`). Therefore **adaptive**, **online learning**, and **dynamic baseline** are false descriptions.
5. **Threshold comparison:** for channel `j`, the detector marks a threshold event only when `x_j > mean_j + k * std_dev_j`. The rule is upper-only and strictly greater-than; equality is not marked, and a large negative deviation is not marked (`src/detector.rs:57-70`, with boundary and lower-bound tests at `src/detector.rs:263-290`).
6. **Legacy score calculation:** the existing `health_score` field is derived from the largest absolute per-channel z-score, skipping channels whose standard deviation is zero. It returns `1.0` at or below `kσ`, falls linearly between `kσ` and `15σ`, and returns `0.0` at or beyond `15σ` (`src/detector.rs:73-110`). This is a heuristic presentation mapping, not a probability or physical measurement.
7. **Outputs:** the current state is available through REST, is serialized unchanged for WebSocket broadcasts, can optionally feed MQTT, and updates Prometheus-format metrics (`src/api.rs:35-50`; `src/websocket.rs:35-50`; `src/mqtt.rs:166-195`; `src/metrics.rs:163-183`).

### Exact score mapping

For baseline-ready samples and non-zero reference deviations:

```text
z_j = abs(x_j - mean_j) / std_dev_j
z_max = max(z_j)

legacy health_score =
  1                                      when z_max <= k
  0                                      when z_max >= 15
  1 - ((z_max - k) / (15 - k))          otherwise

public Demo deviation score = legacy health_score * 100
```

The public name is mandated by the product contract, but the direction must be explained: under the current formula, `100` means the largest usable absolute z-score is at or below the selected threshold, while the number decreases as that maximum absolute deviation moves from the threshold toward the code's `15σ` lower bound. It must never be described as “100% healthy.”

The `15σ` constant is hard-coded even though configuration also contains an unused `fatal_limit` field (`src/detector.rs:95-108`; `src/config.rs:40-43`, `src/config.rs:120-122`). The comment calls 15σ “fatal,” but the repository contains no validation connecting it to failure, damage, probability, or physical condition. The experience may explain it only as the legacy heuristic's zero-score bound. The controlled experience should keep `k < 15`; the API itself does not validate that invariant.

### Two different deviation semantics

The threshold state and score do not use the same sign convention:

- Threshold event: maximum **positive/upper** deviation crosses `mean + kσ`.
- Score: maximum **absolute** deviation across usable channels.

Consequently, a sufficiently low reading can reduce the score without causing an upper-threshold event. Conversely, just above an upper threshold can create a threshold event while the score-derived legacy status is still `NORMAL`. The experience must compute and label threshold state separately from score and never infer one from the other.

Channels with `std_dev == 0` are ignored by the score, while the upper threshold for such a channel equals its mean. This edge case must not be used to imply robust handling of zero-variance reference data (`src/detector.rs:83-90`, `src/detector.rs:343-352`).

## Baseline readiness

The backend initializes and resets `health_score` to `1.0` while `is_training` is true (`src/state.rs:77-90`, `src/state.rs:128-137`), and the detector also returns `1.0` when untrained (`src/detector.rs:76-79`). That numeric value is a legacy implementation default, not a valid score observation.

The experience must suppress it before the reference is ready and show exactly:

> Score unavailable — learning demo baseline

No pre-baseline percentage, gauge fill, “normal,” or “healthy” conclusion is allowed. A frontend using the integrated API must gate score display on baseline readiness, at minimum `is_training == false`, rather than trusting the numeric field alone.

## Current API and state contract

`GET /api/status` returns the complete serialized `SystemState` (`src/api.rs:53-65`; `src/state.rs:43-75`):

| Field | Type | Exact source meaning | Presentation constraint |
|---|---|---|---|
| `current_file` | string | Current file name or synthetic ID such as `mock_000123`; defaults to `Ready`. | An identifier, not a freshness timestamp or proof of a live sensor. |
| `health_score` | number | Legacy `0.0..1.0` heuristic described above; initialized to `1.0`. | Rename at the UI boundary; suppress while baseline is learning. |
| `status` | string | Mutable operational/legacy score label. Observed assignments include `IDLE`, `STARTING`, `PAUSED`, `RESETTING`, `TRAINING`, `NORMAL`, `WARNING`, `CRITICAL`, and `COMPLETED`. | Do not expose legacy physical-severity language as product truth; do not use it as the threshold event. |
| `latest_readings` | number[] | Latest reading vector; initialized as eight zeros. File mode provides calculated per-file RMS; mock mode provides generated RMS-like values. | Call an RMS record/timeline, never a raw waveform. |
| `is_training` | boolean | Whether the processing engine is collecting the reference records. | Required score-availability gate. |
| `is_running` | boolean | Whether processing should advance. | Does not prove a current hardware connection. |
| `reset_requested` | boolean | Processing-loop reset flag. | Internal operational state. |
| `threshold` | number | Current sigma multiplier `k`; default `3.0`. | An educational sensitivity control, not a physical safety limit. |
| `train_limit` | integer | Target count of reference records; default `500`. | Changing it mid-run is not a supported claim of safe retraining. |
| `system_logs` | string[] | Up to 50 newest server-generated log strings with local clock times. | Legacy wording can include unsupported “health/critical” language; do not present it unfiltered as product copy. |

`POST /api/control` accepts `start`, `stop`, and `reset`; unknown actions only log a warning and still return JSON `"OK"` (`src/api.rs:68-107`). `POST /api/settings` replaces `threshold` and `train_limit` without range validation and returns JSON `"OK"` (`src/api.rs:111-135`). These endpoints are demo controls, not industrial control or emergency-stop functions.

The API does **not** expose learned means, learned standard deviations, per-channel z-scores, threshold booleans, sample index, source mode, raw samples, data timestamp, server freshness, or a baseline-ready field distinct from `is_training`. Therefore the local controlled experience needs its own versioned fixture/state engine to make the calculation inspectable. It must not fabricate those values as if received from `/api/status`.

WebSocket `/ws` broadcasts the same `SystemState` JSON on state changes, but it does not send an initial snapshot upon connection; the legacy dashboard first fetches REST and then connects WebSocket (`src/websocket.rs:35-50`, `src/websocket.rs:66-91`; `static/index.html:494-506`). “WebSocket updates exist” is verified by source; active connection, freshness, latency, and reliability require runtime evidence.

## Deterministic controlled fixture contract

The existing mock source is not deterministic: each reading creates `rand::thread_rng()` and samples unseeded noise (`src/datasource/mock_source.rs:87-97`). It also contains implementation comments and behavior framed as “degradation” and “failing bearing” (`src/datasource/mock_source.rs:98-113`). Neither wording is permitted in the public experience, and the existing mock sequence cannot be the acceptance fixture.

The experience fixture must therefore be:

- local, self-hosted, original/controlled data unless a separately documented dataset provenance proves otherwise;
- explicitly versioned and deterministic, with fixed ordering and no runtime randomness;
- composed of per-window RMS-channel records, not raw samples and not a raw waveform;
- explicit about reference-window membership, channel IDs, units (or `demo units` when no physical unit is justified), threshold multiplier, computed mean and population standard deviation, maximum absolute z-score, upper-threshold result, and baseline readiness;
- the single input to the 3D explanatory motion, RMS timeline, threshold line/state, Demo deviation score, status labels, narration, and scrubber;
- scoreless before baseline readiness;
- reversible and repeatable at every scrub position.

Required state semantics:

| Experience state | Truth condition |
|---|---|
| `not-started` | Fixture selected but no record evaluated; no score. |
| `learning-demo-baseline` | Reference records are being accumulated; no score. |
| `comparing-rms` | Fixed reference is ready and the current RMS record is being compared. |
| `within-demo-reference` | No channel is above its upper `mean + kσ` threshold. |
| `approaching-demo-threshold` | A fixture-declared, deterministic pre-crossing band below the upper threshold; it is explanatory, not a backend status or early warning. |
| `demo-threshold-exceeded` | At least one channel is strictly above its upper threshold. |
| `scenario-complete` | Playback has reached the final fixture record; no added physical conclusion. |

“Approaching” is a guided-demo comparison state, not a prediction. Its numeric band must be declared in the fixture/tests and must not be presented as an early-warning capability.

No tracked NASA IMS data files exist in this checkout at audit time; only documentation statements and demo media are present. Do not label the controlled fixture “NASA-derived,” “NASA-validated,” or representative of the IMS dataset unless provenance, transformation, and license are separately recorded. `FileDataSource` compatibility with the expected tab-separated shape is not dataset validation (`README.md:161-168`; `src/datasource/file_source.rs:50-92`).

## Verified implementation surfaces and limits

- Rust package version is `1.3.0`; the legacy dashboard's `v1.0.2-STABLE` display is stale and unsupported (`Cargo.toml:1-4`; `static/index.html:111-120`).
- Axum serves static files plus REST, WebSocket, and `/metrics` (`src/api.rs:35-50`).
- MQTT publishing is optional behind `--mqtt` and uses environment configuration; it is not evidence of a configured or reachable broker (`src/main.rs:114-133`; `src/mqtt.rs:47-60`).
- Prometheus-format metrics are implemented at `/metrics`; their legacy names retain `health` and `anomaly` language and should be presented, if at all, as source-level compatibility names (`src/metrics.rs:13-116`, `src/metrics.rs:163-183`).
- ARM64 cross-build configuration exists in Docker and CI (`Dockerfile:12-52`; `.github/workflows/ci.yml:125-163`). This does not prove execution, performance, or sensor operation on Raspberry Pi hardware.
- `--sensor` exits with “Hardware sensor not implemented” (`src/main.rs:169-173`). Real hardware ingestion is roadmap only.
- `--simulate` controls terminal output; it does not select a data source. `--mock` selects synthetic input, while the default selects file input (`src/main.rs:63-82`, `src/main.rs:146-168`).
- The repository is MIT-licensed (`LICENSE:1-20`). Dataset or third-party media licenses are not established by that code license.

## Document/code discrepancies that govern copy


| Legacy statement | Finding | Required treatment |
|---|---|---|
| Predictive maintenance, detects bearing faults before failure (`README.md:7-10`; `docs/ARCHITECTURE.md:5`) | No fault labels, prognosis, physical validation, or failure forecasting exists in the detector. | Forbidden. Describe a statistical educational demonstrator only. |
| 0–100% machine/bearing health (`README.md:17-20`; `docs/ARCHITECTURE.md:58-68`) | The code maps maximum absolute z-score through an arbitrary 15σ bound. | Public label is Demo deviation score with the mandatory caveat. |
| Adaptive Gaussian / dynamic threshold (`static/index.html:117-124`, `static/index.html:148-150`) | Learned mean/std are fixed after the first training call; only `k` can change. | Forbidden. Say fixed demo reference and configurable sigma multiplier. |
| 40M+ points under 1.5 seconds and other performance numbers (`README.md:17`; `docs/ARCHITECTURE.md:124-132`) | No reproducible benchmark ledger is present. | Do not use until the mandated benchmark metadata exists. |
| Raspberry Pi ready (`README.md:22-23`, `README.md:202-204`) | ARM64 build configuration exists, but no device result is recorded. Roadmap separately lists Pi optimization and real-machine testing as planned (`docs/ROADMAP.md:29-37`). | Say only “ARM64 build configuration exists.” |
| MQTT/Prometheus/WebSocket shown as both complete and future (`README.md:202-206`; `docs/ARCHITECTURE.md:134-139`; `docs/ROADMAP.md:48-55`, `docs/ROADMAP.md:84-88`) | Implementations exist in current source. | Source-backed implementation surfaces; do not imply configured deployment or runtime verification. |
| README example shows only five status fields (`README.md:98-110`) | `SystemState` serializes ten fields. | Use the exact table above when documenting the API. |
| Existing dashboard always renders numeric health (`static/index.html:197-207`, `static/index.html:446-454`) | Backend initializes score to `1.0` before readiness. | New experience must suppress the number while learning. |
| “REAL-TIME VIBRATION SENSORS (RMS)” and remote CDN assets (`static/index.html:7-9`, `static/index.html:213-223`) | Default demo may be controlled data; legacy page requires external Tailwind, Chart.js, and Google Fonts requests. | Use CONTROLLED DEMO/SAMPLE DATA and self-host all target-experience assets. |

## Non-negotiable public boundaries

Never present Silent-Ear as any of the following:

- a predictive-maintenance solution;
- a fault detector, damage detector, diagnostic system, or failure classifier;
- an early-warning system, failure forecast, or remaining-useful-life estimator;
- a digital twin or reconstruction of physical bearing condition;
- an adaptive, continuously learning, or online-learning model;
- a physical bearing-health, integrity, wear, or probability measurement;
- production-ready, safety-certified, failure-proof, validated for industrial operation, or a substitute for professional condition monitoring;
- a validated NASA solution or a tested Raspberry Pi/sensor deployment without matching evidence.

Never depict or name diagnosed cracks, wear, outer-race defects, reconstructed damage, physical degradation, critical failure, or “damage detected.” Do not use unsupported legacy phrases such as **adaptive Gaussian**, **EDGE AI ANALYZER**, **BEARING HEALTH INTEGRITY**, **EMERGENCY RESET**, **stable**, or unsupported performance figures.

Controlled playback must be labeled **CONTROLLED DEMO** or **SAMPLE DATA**, never **LIVE**. “Live” is allowed only for a verified current connection with a visible freshness indicator; the present API does not supply enough freshness metadata by itself. RMS history is an **RMS timeline** or **sequence of per-window RMS records**, never a raw waveform.

Any 3D vibration, deformation, cutaway, or bearing motion must display:

> Explanatory visualization — motion visually amplified; not reconstructed from sensor data.

The experience must not request microphone, camera, geolocation, notifications, file upload, or file-system access. It must not include external tracking. These constraints apply equally to WebGL and semantic HTML/2D fallback modes.
