# Silent-Ear Controlled Scenario Matrix

Status: deterministic content and state contract  
Default source label: `CONTROLLED DEMO`  
Nominal fixture contract: `silent-ear-explainer@1.0.0`

## Shared scenario contract

All scenarios use one versioned, local fixture schema and one pure derived-state function. The fixture step—not elapsed render time—drives the explanatory assembly response, eight RMS values, selected-channel timeline, baseline statistics, upper threshold, public state, narration, score readiness/value, and scrubber position.

The matrix defines public semantics. Engineering may add fields, but it must not create parallel values in canvas or UI code.

```text
fixture id + version
  → scenario id
  → ordered step
  → 8 RMS-channel values
  → baseline readiness and fixed mean/σ
  → selected k multiplier
  → upper thresholds
  → exceeded channels
  → max absolute z-score
  → score availability/value
  → public label + narration + motion emphasis
```

The default multiplier is `k = 3.0`. The detector’s public comparison is strict and upper-sided for each channel:

```text
upper threshold[i] = fixed mean[i] + k × fixed σ[i]
demo threshold exceeded[i] = RMS[i] > upper threshold[i]
```

Equality is not an exceedance. The public score mirrors the current repository heuristic only after baseline readiness: it remains 100 while the maximum absolute z-score is at or below `k`, then decreases linearly toward its implementation lower bound. It is displayed as a unitless value out of 100, never a percentage or capacity gauge. The lower bound has no demonstrated physical meaning and is not a scenario endpoint.

Every numeric score has this adjacent sentence:

> **A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life.**

Every 3D scenario has this persistent sentence:

> **Explanatory visualization — motion visually amplified; not reconstructed from sensor data.**

Every RMS plot has this visible sentence:

> **Each point is a per-window RMS value, not a raw vibration waveform.**

## Canonical public states

| Internal state | Exact public label | Score behavior | Entry rule | Exit rule |
|---|---|---|---|---|
| `not-started` | **Controlled demo ready** | No score | Fixture loaded at step 0 before baseline playback | User starts, scrubs or selects a post-start step |
| `learning-demo-baseline` | **Learning demo baseline** | **Score unavailable — learning demo baseline** | Baseline step and accumulated count `< N` | Accumulated count reaches `N` and fixed statistics exist |
| `comparing-rms` | **Comparing RMS values** | Available only after baseline readiness | A short transition step after readiness, before the scenario’s classified result | Derived comparison resolves within/approaching/exceeded |
| `within-demo-reference` | **Within demo reference** | Numeric score plus full caveat | All channels `≤` upper threshold and selected positive upper z-ratio is below approach band | Selected upper z-ratio enters approach band or any channel exceeds |
| `approaching-demo-threshold` | **Approaching demo threshold** | Numeric score plus full caveat; normally 100 at `k = 3` | No channel exceeds and selected channel’s upper z-score is `≥ 0.8k` and `≤ k` | Ratio falls below `0.8k` or any channel is strictly above its upper threshold |
| `demo-threshold-exceeded` | **Demo threshold exceeded** | Numeric score plus full caveat | Any channel is strictly above its upper threshold | All channels return to or below their upper thresholds |
| `scenario-complete` | **Scenario complete — inspect or replay** | Last post-readiness score remains visible with caveat | Cursor reaches final step and playback ends | Replay, scenario change or scrub |

The approach band is an explanatory UI substate, not a separate detector capability. It must be labeled as proximity to the configured demo rule, not as advance warning. For negative deviations, the upper comparison state remains within unless an upper threshold is exceeded; the score can still reflect the maximum absolute z-score. The controlled fixtures should avoid making that asymmetry the primary story, while the technical explanation must state it.

## Deterministic fixture requirements

- Use exactly eight ordered channel ids: `B1_X`, `B1_Y`, `B2_X`, `B2_Y`, `B3_X`, `B3_Y`, `B4_X`, `B4_Y`, unless Product Truth replaces them with another verified API order.
- Store explicit finite decimal RMS values; never generate runtime randomness.
- Store or deterministically derive the baseline count, mean and population standard deviation from the same opening readings.
- Carry a semantic fixture version in the source badge, accessible summary and test snapshots.
- Use an invariant integer step id and a display-relative step count. Replaying a scenario produces byte-for-byte equivalent derived domain states.
- Use no wall-clock-dependent values in the scenario result. Time labels are fixture-relative (`T+00`, `T+01`, …), not claims about collection cadence.
- Keep the assembly intact. Visual emphasis is a non-physical mapping of statistical distance and cannot introduce cracks, wear, defect labels, hot spots presented as measured locations, debris or failure animation.
- A threshold-sensitivity change derives new thresholds and states from the same RMS values. It does not rewrite the fixed reference or the fixture.
- `CONTROLLED DEMO` remains visible for all fixture steps, including pause and scenario completion.

## Scenario-level matrix

| Scenario / fixture id | Learning segment | Comparison progression | Expected public states | Score presentation | Explanatory 3D and chart behavior | Primary lesson | Safety-language emphasis |
|---|---|---|---|---|---|---|---|
| **A. Within demo reference** / `within-reference-v1` | Opening N fixture readings populate the reference; all score fields are absent | Post-readiness values remain below each fixed upper threshold; include one ordinary upward fluctuation that remains below the `0.8k` approach band | ready → learning → comparing → within → complete | Unavailable during learning; 100/100 after readiness at nominal k, with adjacent caveat | Calm, constant explanatory rotation; low-amplitude selected-channel response; RMS markers remain below upper line; no celebratory state | A non-exceedance is still an inspectable result: the displayed window stays below this configured upper rule | Never interpret “within” as physical condition, reliability or future behavior |
| **B. Controlled synthetic RMS deviation** / `controlled-deviation-v1` | Same deterministic reference-building sequence or an explicitly shared reference block | Selected positive RMS values rise from within, through `≥ 0.8k`, to exact equality, then strictly above; include a reversible return step | ready → learning → comparing → within → approaching → approaching at equality → exceeded → within → complete | Unavailable during learning; 100/100 through equality; decreases only after max absolute z exceeds k; full caveat always adjacent | Selected rail thickens; timeline cursor and current marker approach/cross line; one restrained non-flashing emphasis pulse occurs only on strict crossing; amplified mechanical response remains visually intact | The state changes on a deterministic statistical comparison, and the exact transition can be scrubbed | Call it a controlled RMS deviation only; do not attach a physical cause, fault class, damage or forecast |
| **C. Noisy environment / threshold pressure** / `noisy-pressure-v1` | Deterministic baseline includes modest ordinary variation; reference freezes at N | Multiple channels vary in a fixed pattern below the upper rule; one optional late step reaches approach band without exceeding at nominal k; sensitivity control can reveal how k changes the rule | ready → learning → comparing → within ↔ approaching → complete at nominal k; exceeded is allowed only if exact fixture/control math produces it and is labeled plainly | Unavailable during learning; normally 100/100 at nominal k; recomputed from the same fixture values when k changes | Several channel rails vary, but only the selected one is emphasized; pattern/noise texture never suggests data randomness; reference band never breathes after readiness | Ordinary fixture variation can put pressure on a simple threshold. This demo exposes sensitivity; it does not establish production-grade noise rejection | Explicitly say this is a controlled noise pattern and an educational sensitivity control, not validation |

## Step-level acceptance matrix

The exact RMS decimals belong in the fixture and its unit snapshots. The following named checkpoints are mandatory in that fixture. `z+` means the selected channel’s signed upper z-score `(value - mean) / σ`; `zabs-max` is the maximum absolute z-score across channels.

| Checkpoint id | Required deterministic relationship at nominal `k = 3.0` | Exact public state | Score | Scene / timeline / table assertions |
|---|---|---|---|---|
| `ready` | No samples consumed; no fixed statistics | **Controlled demo ready** | Not rendered | Assembly at a fixed context frame; table identifies future fixture channels without inventing readings |
| `baseline-1` | Accumulated baseline count `1 < N` | **Learning demo baseline** | **Score unavailable — learning demo baseline** | First per-window RMS values appear in table/timeline; reference progress is text; no numeric score in DOM |
| `baseline-n-minus-1` | Accumulated count `N−1` | **Learning demo baseline** | **Score unavailable — learning demo baseline** | Reference remains explicitly unfinished; threshold must not be presented as ready |
| `baseline-ready` | Count `N`; mean/σ fixed from baseline readings | **Comparing RMS values** | Numeric score may appear only after the comparison step resolves | “Fixed after baseline readiness” appears; all eight reference statistics accessible |
| `within` | All channels `≤ upper`; selected `z+ < 2.4` | **Within demo reference** | 100/100 if `zabs-max ≤ 3` | Selected marker clearly below upper line; motion remains restrained |
| `approach` | All channels `≤ upper`; selected `2.4 ≤ z+ < 3.0` | **Approaching demo threshold** | 100/100 if `zabs-max ≤ 3` | Pattern and text change together; no urgency animation |
| `at-threshold` | Selected RMS equals `mean + 3σ` within the fixture’s exact decimal contract | **Approaching demo threshold** | 100/100 | Marker aligns with line; state must not read exceeded because comparison is strict `>` |
| `exceeded` | At least one selected positive RMS value `> mean + 3σ`; required fixture target `z+ > 3` | **Demo threshold exceeded** | Below 100/100 according to fixture z-score; never percent | Marker strictly above line; exact exceeded channels named; one semantic emphasis pulse maximum |
| `returned` | All channels again `≤ upper` | **Within demo reference** | Recomputed from current values | Scrubbing backward/forward reproduces identical states without accumulating visual state |
| `complete` | Final ordered step reached | **Scenario complete — inspect or replay** | Last post-ready score retained | Motion idles; controls remain operable; source remains `CONTROLLED DEMO` |

## Exact narration and result copy by condition

| Condition | Status sentence | Supporting sentence |
|---|---|---|
| Ready | **Controlled demo ready.** | “Run the fixture or choose a scenario to inspect each RMS window.” |
| Baseline unavailable | **Learning demo baseline.** | “The first N demo readings are establishing per-channel mean and standard deviation. Score unavailable until the reference is ready.” |
| Comparing | **Comparing RMS values.** | “This window is being checked against the fixed upper threshold for each channel.” |
| Within | **Within demo reference.** | “All current channel values are at or below the configured upper demo threshold.” |
| Approaching | **Approaching demo threshold.** | “The selected RMS value is near, but not above, its configured upper demo threshold.” |
| At equality | **At the demo threshold — not exceeded.** | “The detector’s upper comparison changes state only when a value is greater than the threshold.” |
| Exceeded | **Demo threshold exceeded.** | “At least one current RMS-channel value is above its configured upper demo threshold.” |
| Complete | **Scenario complete — inspect or replay.** | “Scrub any step to review the same deterministic values and result.” |

## Scenario detail and interaction expectations

### A — Within demo reference

- Default landing checkpoint after baseline explanation: `within`.
- Keep selected channel and all other channels below their upper thresholds.
- Do not characterize the rotation as a statement about physical condition. Use **calm explanatory motion** only as an art-direction instruction, not as public data interpretation.
- Explain the useful negative result precisely: **“This fixture window does not exceed the configured upper rule.”**
- Replaying or scrubbing never changes any number.

### B — Controlled synthetic RMS deviation

- This is the hero transition and screenshot sequence: within → approaching → equality → exceeded.
- The default selected channel must be named, but the experience must not claim it identifies a physical location or source.
- The same selected channel value places the timeline marker, determines the rule comparison, controls the explanatory motion intensity and contributes to `zabs-max` for the score.
- The crossing is reversible. Backward scrub from exceeded to equality returns to **At the demo threshold — not exceeded** with no lingering red material, pulse or result state.
- The fixture does not use physical-cause terms in its ids, labels, narration, metadata or alt text.

### C — Noisy environment / threshold pressure

- Variation is a prerecorded deterministic pattern. It is not runtime noise generation.
- At nominal k, include enough variation to make the threshold legible without automatically manufacturing an exceedance.
- The sensitivity control may expose a documented bounded range. Its label is **Demo threshold sensitivity (kσ)** and its help text is **“Changes the educational comparison rule for this fixture; the fixed reference and RMS values do not change.”**
- When sensitivity changes, announce the new k value and derived state in a polite live region. Do not auto-play.
- The narrative conclusion is: **“A simple rule can be sensitive to background variation. This controlled example is not evidence of production-grade rejection or accuracy.”**

## Transport availability states

These states are orthogonal to the scenarios. They describe the optional local Rust-service connection, not the controlled fixture. They never replace the scenario label, fixture version or result state.

| Condition | Exact label | Experience behavior | Prohibited inference |
|---|---|---|---|
| Service was never reached | **Local service unavailable — controlled demo remains available.** | Keep fixture, scenario controls, table, timeline and score semantics fully operable; technical service panel offers Retry | Do not mark fixture data stale/offline or imply a machine connection failed |
| Previously reached, freshness window elapsed | **Service update delayed — last received [relative time].** | Freeze only service-backed fields, retain last-received time, expose Retry; controlled fixture continues independently | Do not call the last value current, do not merge it into controlled-demo fields |
| Service restored | **Local service connected.** | Update service-only technical panel and clear delayed status | Do not label controlled data as live |

If the implementation contains no optional service-status panel, omit these transport states entirely. Do not add ornamental offline/stale badges to a self-contained fixture experience.

## 2D / no-WebGL parity matrix

| Critical concept | 3D-enhanced presentation | Always-available HTML / 2D equivalent |
|---|---|---|
| Mechanical context | Intact bearing-and-motor assembly and measurement point | Labeled “Explanatory machine context” card and measurement-point step |
| Eight inputs | Eight scene rails | Eight-row captioned RMS table |
| Sequential windows | Moving rail pulses | RMS timeline and current step text |
| Baseline learning | Reference band builds then locks | Progress text, mean/σ cells, “Fixed after baseline readiness” |
| Upper comparison | Threshold plane and marker | Formula, exact selected RMS and upper-threshold values |
| Current state | Scene material/pattern response | Visible heading, icon and polite live region |
| Demo deviation score | Result rail | Unitless value or exact unavailable copy plus full adjacent explanation |
| Motion meaning | Amplified response | Persistent amplified explanatory-motion sentence |

No-WebGL mode starts with: **“3D view unavailable — the complete controlled demo remains available below.”** All scenarios, exact transitions, keyboard controls and fixture values remain accessible.

## Screenshot checkpoints

The QA artifact set should capture these deterministic states from the actual integrated local app:

| Artifact name intent | Scenario / checkpoint | Required visible proof |
|---|---|---|
| Desktop hero | A / `ready` or first guided frame | H1, source badge, primary CTA, safety line, scene and motion disclaimer |
| Mobile 390 × 844 | B / `within` | Intentional mobile order, state/result, scene, scrubber and no horizontal overflow |
| Within reference | A / `within` | Marker below rule, exact status, table and score caveat |
| Approaching threshold | B / `approach` | Near-rule marker, label, pattern/icon and score caveat |
| Threshold exceeded | B / `exceeded` | Strictly above-rule marker, exceeded channel, score and caveat |
| Baseline unready | Any / `baseline-n-minus-1` | Exact unavailable copy and absence of numeric score |
| Service unavailable/delayed | Orthogonal transport state, only if implemented | Fixture remains usable and source remains `CONTROLLED DEMO` |
| Reduced motion | B / `approach` | Fixed frame, controls and all facts; no animation-dependent meaning |
| No WebGL | B / `exceeded` | Full 2D chain, table, threshold, state and score context |
| Focus state | B / selected scenario or scrubber | 3 px visible focus ring and unambiguous selected/current state |
| 200% zoom | B / `exceeded` | Reflowed content without overlap, clipping or page-level horizontal scroll |

## Scenario acceptance checks

- Every scenario visibly identifies its fixture version and `CONTROLLED DEMO` source.
- At least one automated test compares repeated replay outputs for deep equality.
- At least one automated test proves equality is not exceeded and the next strictly larger fixture step is exceeded.
- Baseline-unready DOM contains no score value, score gauge or percent.
- All post-ready score renders include the full adjacent explanation.
- Threshold changes do not mutate RMS values, fixed reference statistics or fixture order.
- The RMS timeline is never titled or announced as a raw waveform.
- Explanatory assembly motion has the visible amplified/not-reconstructed sentence in desktop, mobile, reduced-motion and fallback modes.
- Scenario B never contains a named physical fault, damage depiction, forecast or physical-location conclusion.
- Scenario C never claims validated noise handling, accuracy, robustness or production suitability.
- Scenario state can be understood from text and icon/pattern without color or motion.
- Scrubbing backward clears all forward-only visual residue and reproduces the canonical checkpoint exactly.
- A service connection failure cannot disable the controlled fixture or relabel it.
