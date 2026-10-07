# Silent-Ear claim ledger

Status: copy gate for the local Q4 experience

Evidence basis: static source inspection at commit `08e154f0cc9328d0f812470bd7fea8ad77ecdb0b`; runtime evidence must be recorded separately in `QA_REPORT.md`.

## Classification rules

- **VERIFIED:** directly supported by inspected repository source/configuration. This does not mean hardware-, performance-, safety-, or production-validated.
- **DEMONSTRATED:** true only inside the deterministic local controlled fixture/experience and must be labeled `CONTROLLED DEMO` or `SAMPLE DATA`.
- **ROADMAP:** absent or unverified current capability; may appear only in a clearly marked future-work context.
- **FORBIDDEN:** unsupported or unsafe framing that must not appear in public copy, labels, metadata, alt text, visuals, logs, screenshots, or CTA language.

Passing code tests, if later recorded, supports code behavior only. It does not upgrade any claim to industrial accuracy, real-hardware compatibility, performance, safety, or physical diagnosis.

## Approved and constrained claims

| ID | Class | Safe wording | Evidence and constraints |
|---|---|---|---|
| V-01 | VERIFIED | “Open-source Rust educational demonstrator.” | Rust package and MIT license: `Cargo.toml:1-11`, `LICENSE:1-20`. “Educational/demonstration” is the governing safety contract, not the legacy package description. |
| V-02 | VERIFIED | “File-backed input is reduced to up to eight per-file RMS-channel values.” | `src/datasource/file_source.rs:24-38`, `src/datasource/file_source.rs:50-92`. Do not imply every possible source has exactly eight valid channels. |
| V-03 | VERIFIED | “RMS is calculated as the square root of the average squared raw values in each file window.” | `src/datasource/file_source.rs:64-90`. Per-window RMS is not a raw waveform. |
| V-04 | VERIFIED | “The first configured number of demo readings establishes per-channel means and population standard deviations.” | `src/processing.rs:149-156`, `src/processing.rs:217-251`; `src/detector.rs:19-49`. Default `train_limit` is 500 (`src/config.rs:112-118`). |
| V-05 | VERIFIED | “The learned demo reference is fixed during comparison and resets only on a new training cycle.” | No update occurs in inference: `src/processing.rs:243-289`; reset reconstructs detector: `src/processing.rs:167-199`. Do not call it adaptive or online learning. |
| V-06 | VERIFIED | “A channel exceeds the demo threshold when its RMS value is strictly above mean plus `k` standard deviations.” | `src/detector.rs:57-70`; strict boundary test `src/detector.rs:263-279`. The test is upper-only. |
| V-07 | VERIFIED | “The score calculation uses the maximum absolute z-score across channels whose reference standard deviation is non-zero.” | `src/detector.rs:81-93`. This differs from the upper-only threshold rule. |
| V-08 | VERIFIED | “The legacy score is 1 at or below the selected sigma threshold, decreases linearly to 0 at 15σ, and is 0 from 15σ onward.” | `src/detector.rs:95-109`. The 15σ bound has no demonstrated physical meaning. |
| V-09 | VERIFIED | “REST status and demo controls are provided by Axum.” | Routes: `src/api.rs:35-50`; controls/settings: `src/api.rs:68-135`. These are software demo controls, not machinery controls. |
| V-10 | VERIFIED | “WebSocket broadcasts serialized state updates.” | `src/websocket.rs:35-50`, `src/websocket.rs:66-91`. Do not claim latency, durability, initial snapshot, or active connection without runtime evidence. |
| V-11 | VERIFIED | “An optional MQTT publisher is implemented.” | Enabled only by `--mqtt`: `src/main.rs:114-133`; publisher/bridge: `src/mqtt.rs:64-195`. Do not imply a configured broker or production integration. |
| V-12 | VERIFIED | “Prometheus-format metrics are exposed at `/metrics`.” | `src/metrics.rs:163-183`. Legacy metric names include unsupported public semantics; describe them as compatibility names if shown. |
| V-13 | VERIFIED | “ARM64 cross-build configuration exists.” | `Dockerfile:12-52`; `.github/workflows/ci.yml:125-163`. This is not evidence of execution on Raspberry Pi hardware. |
| V-14 | VERIFIED | “Synthetic input generation exists for development/demo use.” | `src/datasource/mock_source.rs:12-56`, `src/datasource/mock_source.rs:124-178`. It generates RMS-like channel values directly, not raw vibration samples. |
| V-15 | VERIFIED | “The existing mock sequence is non-deterministic.” | `rand::thread_rng()` and unseeded `gen_range`: `src/datasource/mock_source.rs:87-97`. It cannot be the deterministic acceptance fixture. |
| V-16 | VERIFIED | “The current API status contains ten fields.” | `SystemState`: `src/state.rs:43-75`; full serialization returned at `src/api.rs:53-65`. See `PRODUCT_TRUTH.md` for exact meanings. |
| V-17 | VERIFIED | “The API's pre-baseline numeric score is an implementation default and is not display-ready.” | Defaults/reset: `src/state.rs:77-90`, `src/state.rs:128-137`; untrained detector: `src/detector.rs:76-79`. Public UI must suppress it. |
| V-18 | VERIFIED | “Hardware sensor input is not implemented.” | `--sensor` exits with an error: `src/main.rs:169-173`. This is a negative capability statement and a required boundary. |
| D-01 | DEMONSTRATED | “This controlled scenario replays the same versioned RMS records every time.” | Must be proven by fixture source and deterministic tests. Applies only to the local experience, not `MockDataSource`. |
| D-02 | DEMONSTRATED | “Selected controlled RMS records cross the configured upper demo threshold.” | Fixture calculations must prove `x_j > mean_j + kσ`; do not attach a fault or damage interpretation. |
| D-03 | DEMONSTRATED | “Ordinary controlled variation remains below the demo threshold in this fixture.” | Fixture-specific only. Do not generalize to production noise rejection. |
| D-04 | DEMONSTRATED | “Background-noise pressure is introduced in a controlled scenario.” | Must say controlled/synthetic. It does not demonstrate production-grade filtering or false-positive performance. |
| D-05 | DEMONSTRATED | “The explanatory bearing motion is synchronized with the same fixture record as the RMS timeline and score.” | Must be wired to one fixture/state engine. Always pair with the amplified/not-reconstructed visual disclaimer. |
| D-06 | DEMONSTRATED | “The selected threshold changes this controlled comparison.” | Educational sensitivity control only. It is not a calibrated safety or maintenance setting. |
| D-07 | DEMONSTRATED | “No score is shown until the controlled reference is ready.” | Required UI behavior despite backend default `1.0`; must be covered by tests and browser evidence. |
| D-08 | DEMONSTRATED | “Approaching demo threshold.” | Allowed only as a declared pre-crossing fixture state. It is explanatory and is not early warning or prediction. |
| R-01 | ROADMAP | Real ADXL345 or other hardware sensor ingestion. | Trait comments mention a future source, but `--sensor` is unimplemented: `src/datasource/traits.rs:43-49`; `src/main.rs:169-173`. |
| R-02 | ROADMAP | Real machine pilot and Raspberry Pi optimization/testing. | Explicitly planned: `docs/ROADMAP.md:29-37`. ARM64 config does not promote these to current capability. |
| R-03 | ROADMAP | OPC-UA, Modbus, InfluxDB, and fleet-management surfaces. | `docs/ROADMAP.md:48-72`. Do not imply current support. |
| R-04 | ROADMAP | Burn/autoencoder/LSTM/predictive ML. | `README.md:207-209`; `docs/ROADMAP.md:57-63`. Must not leak into current-product copy. |
| R-05 | ROADMAP | Production deployment, certification, calibrated thresholds, and professional-condition-monitoring equivalence. | No supporting evidence; publication and production are outside the Q4 scope. |

## Forbidden claims and depictions

| ID | Class | Never say or imply | Reason / conflicting evidence |
|---|---|---|---|
| F-01 | FORBIDDEN | “Predictive-maintenance solution/system.” | Detector compares current RMS records with fixed statistics; it has no prognosis model or validated maintenance outcome. Legacy claims at `README.md:7-10` and `Cargo.toml:6-9` are not approved copy. |
| F-02 | FORBIDDEN | “Fault detector,” “bearing fault detected,” “damage detected,” or any fault class. | Output is an upper statistical threshold vector plus heuristic score, not a physical/fault label (`src/detector.rs:57-110`). |
| F-03 | FORBIDDEN | “Early warning,” “predicts failure,” “before catastrophic failure,” “failure forecast,” or “remaining useful life.” | No time-to-event, forecast horizon, trained predictor, or validation exists. |
| F-04 | FORBIDDEN | “Digital twin” or “reconstructed sensor/physical condition.” | 3D motion is explanatory only and has no inverse physical model. |
| F-05 | FORBIDDEN | “Adaptive Gaussian,” “adaptive model,” “online learning,” “continuously learning,” or “dynamic baseline.” | Baseline mean/std are fixed after training (`src/processing.rs:243-289`). |
| F-06 | FORBIDDEN | “Bearing health,” “health integrity,” “machine health percentage,” “fault probability,” “damage probability,” or “RUL score.” | The 15σ score mapping has no demonstrated physical meaning (`src/detector.rs:95-109`). |
| F-07 | FORBIDDEN | “100% healthy” before or after reference readiness. | Pre-baseline `1.0` is a default; post-baseline `1.0` only means `z_max <= k` under the heuristic. |
| F-08 | FORBIDDEN | “Production-ready,” “industrial-grade,” “safety-certified,” “failure-proof,” or “replacement for professional condition monitoring.” | Repository disclaimer limits use (`README.md:13`); no certification/validation evidence exists. |
| F-09 | FORBIDDEN | Diagnosed cracks, wear, outer-race defects, reconstructed damage, physical degradation, or critical failure in words or visuals. | Controlled RMS values do not establish physical damage. Legacy dataset/mock wording cannot be projected onto fixtures (`README.md:161-168`; `src/datasource/mock_source.rs:98-113`). |
| F-10 | FORBIDDEN | “Validated NASA solution,” “NASA-validated,” or “NASA-derived fixture” without documented provenance. | No NASA data files or transformation/provenance ledger are tracked in the audited checkout. |
| F-11 | FORBIDDEN | `LIVE` for controlled/demo playback. | Use `CONTROLLED DEMO` or `SAMPLE DATA`. API running state alone does not prove a fresh hardware connection. |
| F-12 | FORBIDDEN | “Raw waveform” for the chart or fixture timeline. | Each file becomes one RMS vector; mock supplies RMS-like vectors directly (`src/datasource/file_source.rs:50-92`; `src/datasource/mock_source.rs:87-121`). |
| F-13 | FORBIDDEN | “40M+ data points under 1.5 seconds,” sub-ms API latency, memory/binary-size figures, or any unsupported performance number. | Claims exist at `README.md:17` and `docs/ARCHITECTURE.md:124-132`, but no required reproducible benchmark ledger is present. |
| F-14 | FORBIDDEN | “Raspberry Pi ready/tested” or real sensor operation. | Only cross-build configuration is verified; device and sensor tests are absent and roadmap-listed. |
| F-15 | FORBIDDEN | “EDGE AI ANALYZER,” “BEARING HEALTH INTEGRITY,” “EMERGENCY RESET,” `v1.0.2-STABLE`, or unsupported “stable” status language. | Legacy dashboard phrases are stale, overclaiming, or imply machinery control (`static/index.html:111-120`, `static/index.html:168-206`). |
| F-16 | FORBIDDEN | “No alert proves the machine is normal/healthy.” | It means only that no fixture channel exceeded the configured upper reference boundary for that record. |
| F-17 | FORBIDDEN | “Noise rejection,” “false-positive rate,” or production robustness. | Controlled noisy data demonstrates sensitivity only; there is no validation dataset or metric. |
| F-18 | FORBIDDEN | “15σ means failure/fatal condition.” | `15.0` is a hard-coded score bound with a legacy comment, not physical evidence (`src/detector.rs:95-108`). |
| F-19 | FORBIDDEN | A score or threshold event inferred from legacy `status` alone. | Status is score-banded, while threshold events are upper-only; the backend does not expose the boolean vector (`src/processing.rs:253-289`). |
| F-20 | FORBIDDEN | Microphone, camera, geolocation, notification, file upload, or file-system permission prompts; external tracking. | Explicit experience safety boundary. Browser audio is not a validated industrial input. |

## Mandatory language and labeling

| Surface | Required language |
|---|---|
| Every score view | **Demo deviation score** plus “A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life.” |
| Before reference readiness | **Score unavailable — learning demo baseline** |
| Controlled data badge | **CONTROLLED DEMO** or **SAMPLE DATA** |
| Mechanical/3D motion | **Explanatory visualization — motion visually amplified; not reconstructed from sensor data.** |
| Evidence/CTA area | **Demonstration and educational software; not certified for safety-critical industrial use.** |
| Sequential chart | **RMS timeline**, **RMS history**, or **per-window RMS records**; never raw waveform. |
| Threshold | **Upper demo threshold: mean + kσ** or equivalent; call `k` an educational sensitivity setting. |
| Within state | “No channel is above the selected upper demo threshold for this record.” Do not say healthy, safe, or fault-free. |
| Exceeded state | “At least one controlled RMS channel is above its fixed-reference upper threshold.” Do not infer cause or damage. |

## Copy-review rejection test

Reject any candidate copy or visual if a reasonable visitor could leave believing one or more of these statements:

1. Silent-Ear knows the physical condition of a bearing.
2. The score is health, fault probability, or remaining life.
3. A threshold crossing diagnoses damage or predicts failure.
4. The 3D motion reconstructs sensor-observed mechanics.
5. The reference adapts during comparison.
6. Controlled data is a live industrial stream.
7. RMS history is a raw vibration waveform.
8. ARM64 configuration proves Raspberry Pi or sensor operation.
9. A passing code test or attractive demo validates industrial accuracy or safety.
10. A local demonstration is a production, deployment, certification, or performance claim.
