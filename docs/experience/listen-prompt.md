# Listen: the prompt behind `/listen/`

The page at `/listen/` was built from a prompt with a coding agent, in the manner of [Proof of Invention](https://proof.neurabytelabs.com/): a numbered build dare whose every sentence comes from a gene and an atlas field, plus a written contract that fixes the product decisions. This file keeps the prompt word for word, so the page can be traced back to it, and logs every follow-up prompt that was sent after the first run.

## Where the dare comes from

Proof of Invention version 1 (214,704 numbers, digest `6oyf7evfct`) has no bearing or condition-monitoring domain. The dare below was rendered by the machine's own engine from a **candidate version 2 domain**, `bearing-monitor`, appended under the machine's append-only rules (`"since": 2`, numbers `#214704` to `#217295`). With that entry appended, the machine's self-test passes on all 217,296 numbers and version 1 still matches its digest. The entry is a proposal: it is **not** in the published machine, so `#215811` does not resolve on proof.neurabytelabs.com today.

Candidate entry:

```json
{
  "id": "bearing-monitor",
  "since": 2,
  "title": "a bearing monitor",
  "kind": "invention",
  "subject": "a bearing monitor",
  "proof": "condition monitoring",
  "source": "Vibration-based Condition Monitoring (Robert Randall, 2011), then Rolling Element Bearing Diagnostics: A Tutorial (Robert Randall and Jerome Antoni, 2011)",
  "sourceNote": "Randall's book and the tutorial he wrote with Antoni walk the path every vibration analyst learns: bearing geometry gives the fault frequencies BPFO, BPFI, BSF and FTF, each strike on a defect rings a structural resonance, overall RMS, crest factor and kurtosis move first, and a band-pass filter, an envelope detector and the envelope spectrum then show which part is failing, the method the Case Western Reserve University bearing data is used to teach.",
  "prims": [{ "name": "accelerometer samples", "short": "samples" }],
  "ladder": [
    "bearing kinematics",
    "defect impacts",
    "a housing resonance",
    "the overall RMS",
    "crest factor and kurtosis",
    "a spectrum analyzer",
    "a band-pass filter",
    "an envelope detector",
    "an envelope spectrum"
  ],
  "payoff": {
    "spark": { "top": "a cracked bearing i can hear", "use": "seed a crack", "noun": "bearing" },
    "build": { "top": "a test rig whose alarm trips while the crack grows", "use": "grow the crack", "noun": "test rig" },
    "allout": { "top": "a monitor that names the failing race or ball before the bearing seizes", "use": "wear a bearing out", "noun": "monitor" }
  },
  "truth": "every sound and number must come from your {short}",
  "bans": [
    { "no": "no recorded clip pretending", "not": "not a recorded clip pretending" },
    { "no": "no setInterval clicks pretending", "not": "not setInterval clicks pretending" }
  ],
  "zooms": [
    { "from": "the {noun}", "through": "the resonance", "into": "the {short}", "flow": "each impact ring and decay" },
    { "from": "the {noun}", "through": "the balls", "into": "the {short}", "flow": "every ball strike the crack" }
  ],
  "witness": [
    "a raw scope with predicted impacts marked",
    "impact times checked against BPFO, BPFI and BSF"
  ],
  "stage": "in a bearing cutaway"
}
```

## The dare: #215811 (a bearing monitor, all out, 133 words)

> build a bearing monitor from scratch, entirely in code, starting from individual accelerometer samples. design each layer on top of the last: bearing kinematics, defect impacts, a housing resonance, the overall RMS, crest factor and kurtosis, a spectrum analyzer, a band-pass filter, an envelope detector, an envelope spectrum, and a monitor that names the failing race or ball before the bearing seizes. everything has to be real: no setInterval clicks pretending, every sound and number must come from your samples. show it in a bearing cutaway and let me wear a bearing out, then zoom from the monitor down through the resonance into the samples while it runs. beside it, keep a raw scope with predicted impacts marked. treat it like you're proving you could have invented condition monitoring yourself. go all out.

| Sentence (template) | Gene | Atlas field |
|---|---|---|
| build a bearing monitor ... starting from individual accelerometer samples. (`open.1`) | primitive | `subject`, `prims.0.name` |
| design each layer on top of the last: ... (`ladder.2`) | ladder, payoff | `ladder.0`-`ladder.8`, `payoff.allout.top` |
| everything has to be real: no setInterval clicks pretending, ... (`real.0`) | anti-fake | `bans.1.no`, `truth`, `prims.0.short` |
| show it in a bearing cutaway and let me wear a bearing out, then zoom ... (`dive.3`) | payoff, zoom | `stage`, `payoff.allout.use`, `zooms.0` |
| beside it, keep a raw scope with predicted impacts marked. (`dive.3`) | anti-fake (witness) | `witness.0` |
| treat it like you're proving you could have invented condition monitoring yourself. (`proof.0`) | proof frame | `proof` |
| go all out. (`allout.0`) | all out | - |

Feasibility (gene 8) is carried by the source: the ladder follows Randall and Antoni's tutorial order.

## The contract (sent with the dare)

```text
— CONTRACT —

The paragraph above is the spirit. Everything below is already decided: requirements, not suggestions. Don't stop to ask questions: decide, and list your decisions in the report.

WHAT IT IS
A page at /listen/ of the Silent-Ear project (this repository). Silent-Ear is an open-source Rust educational demonstrator: it reads vibration samples, computes one RMS value per channel per window, learns a fixed reference (mean and population standard deviation) from the first readings, and flags a reading that is strictly above mean + k·sigma. The existing demo at / is a 3D test cell on a fixed synthetic fixture. This new page is the experience that demo lacks: a person hears a healthy bearing and a failing one, sees why they differ, breaks one on purpose, and watches what Silent-Ear's rule does about it. The reaction it is built for: a maintenance technician says "that is exactly what a bad bearing sounds like", and an engineer checks the fault lines and finds them where the textbook says.

FILES AND LIMITS
- Create only these: frontend/public/listen/index.html, plus any plain JS/CSS files you need under frontend/public/listen/ (for example engine.js for the physics and DSP as an ES module, app.js, worklet.js), and one Vitest test file under frontend/src/listen/. Vite copies frontend/public/ into the build output unchanged, so the page is served at /listen/ next to the existing demo. Do not touch any other file: not the existing demo, not package.json, not the Rust code, not static/.
- No new npm dependencies, no CDN, no web fonts, no network requests of any kind at run time. System font stack. No microphone, camera, storage of personal data, analytics or tracking.
- It must work when served from a sub-path (relative URLs only).
- The Vitest test must pass `npm run lint`, `npm run typecheck` and `npm test` (tsconfig has strict on and allowJs off; if you import engine.js from TypeScript, ship a matching .d.ts next to it or write the test so typecheck stays clean).
- English only on the page.

PHYSICS (must be exactly right; an engineer will check it)
Bearing geometry: n rolling elements, ball diameter d, pitch diameter D, contact angle phi, shaft frequency fr = rpm / 60.
- BPFO = (n/2) · fr · (1 − (d/D)·cos phi)   outer race defect
- BPFI = (n/2) · fr · (1 + (d/D)·cos phi)   inner race defect
- FTF  = (fr/2) · (1 − (d/D)·cos phi)       cage (fundamental train)
- BSF  = (D/(2d)) · fr · (1 − ((d/D)·cos phi)²)   ball spin; a ball defect strikes both races once per spin revolution, so ball impacts repeat at 2·BSF
Default bearing: SKF 6205-2RS JEM, the drive-end bearing of the Case Western Reserve University bearing data: n = 9, d = 7.94 mm, D = 39.04 mm, phi = 0. Multiples of shaft speed must come out as BPFO 3.5848, BPFI 5.4152, FTF 0.39828, 2·BSF 4.7135 (CWRU's published "rolling element" value), within 0.1 %. At 1797 rpm: BPFO ≈ 107.4 Hz, BPFI ≈ 162.2 Hz, BSF ≈ 70.6 Hz (2·BSF ≈ 141.2 Hz), FTF ≈ 11.9 Hz. Let me edit n, d, D and phi in an advanced panel, with the formulas shown next to the live numbers.

Signal model (the samples; follow McFadden and Smith, and Randall and Antoni):
- Generate the accelerometer signal sample by sample at the AudioContext sample rate. A seeded PRNG (no Math.random) so the same settings give the same samples.
- Healthy bearing: small shaft components at 1x and 2x fr, plus broadband Gaussian noise (kurtosis ≈ 3).
- Each defect strike is an impulse that rings a structural resonance: a damped sinusoid e^(−zeta·omega_n·t)·sin(omega_d·t), default resonance around 3 kHz, zeta a few percent, so it is audible as a metallic tick.
- Impact spacing follows the fault frequency with 1–2 % random jitter (rolling elements slip; this is why envelope analysis is needed). Do not schedule impacts with timers: impact times come from integrating the kinematics inside the sample loop, so changing rpm bends the rhythm smoothly.
- Outer race (stationary, in the load zone): impacts at BPFO, steady amplitude.
- Inner race: impacts at BPFI, amplitude modulated as the defect rotates through the load zone once per shaft turn (a Stribeck-style load distribution, zero outside the load zone), giving sidebands at ±fr in the envelope spectrum.
- Ball: impacts at 2·BSF, amplitude modulated at FTF as the cage carries the ball through the load zone, giving ±FTF sidebands.
- Radial load scales impact strength and the load zone. Fault severity scales impact strength. Late-stage damage adds smeared impacts and a rising broadband floor, so kurtosis climbs early and then falls back while RMS keeps rising (this is the real behaviour and a teaching point).

HEAR
Play exactly the samples the analysis reads (one generator; the analysis consumes the same buffers that go to the speakers). Use an AudioWorklet (or an AudioBufferSourceNode queue) fed with your samples. No recorded audio, no OscillatorNode, no setInterval clicks. A master volume and a safety limiter that only affects playback, never the analysis. Audio starts only after a user gesture; say on screen that iPhone silent mode mutes web audio. A/B compare: one control flips between the healthy and the faulty bearing at the same rpm.

SEE
- A raw scope of the samples with the predicted impact times marked from the kinematics (the witness: if the sound were faked, the ticks would not line up with the marks).
- The zoom, the signature: one continuous zoom from the monitor down through the resonance into the samples while it runs. From seconds of signal, to the impacts, to one impact ringing and decaying, down to the individual samples drawn as dots. Drag, pinch, wheel and a slider, all work.
- Spectrum (your own FFT on the samples, no AnalyserNode) and envelope spectrum (band-pass around the resonance, envelope by Hilbert transform or rectify and low-pass, then FFT), with BPFO, BPFI, 2·BSF and FTF lines and their first harmonics and sidebands marked, and the strongest matching line named.
- A spectrogram (scrolling STFT).
- A bearing cutaway: inner ring turning at fr, cage at FTF, balls spinning at BSF, the defect drawn where it is; each impact flashes where it happens, in sync with the sound. Label it: "Explanatory visualization — motion visually amplified; not reconstructed from sensor data."

INTERVENE
Sliders for shaft speed (rpm), radial load and fault severity; a fault picker (none, outer race, inner race, ball); an "Inject fault" button that seeds a defect immediately; a "Run to failure" scenario: a scripted degradation in simulated time (for example four simulated hours in about 90 seconds) from healthy, to an early warning, to critical, to a simulated seizure at a fixed point, with pause, restart and a scrubbable timeline. Keyboard and touch work everywhere.

THE SYSTEM'S ANSWER (Silent-Ear's rule, implemented exactly as the Rust code does it)
- One RMS record per analysis window (in Rust, one per file). RMS = sqrt(sum(x²)/n).
- Reference: the first N records (default 20 on this page; the Rust default is 500, say so) give the mean and the population standard deviation (divide by N). The reference is then fixed; it never adapts. Changing k moves the line, not the reference.
- Threshold event: x > mean + k·sigma, strictly greater, upper only. Default k = 3.
- Score: z = |x − mean| / sigma. Score = 1 when z ≤ k, 0 when z ≥ 15, otherwise 1 − (z − k)/(15 − k). Show it as "Demo deviation score" (0–100) and always put this sentence beside it: "A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life." Before the reference is ready show exactly "Score unavailable — learning demo baseline", no number.
- Status as the Rust code assigns it: score > 0.9 NORMAL, > 0.5 WARNING, otherwise CRITICAL. Show the threshold event separately from the status; never infer one from the other.
- Beside it, the teaching indicators Silent-Ear does not compute today: crest factor (peak/RMS), kurtosis (fourth standardized moment, 3 for Gaussian noise) and the envelope-spectrum verdict. Label them plainly as "not computed by Silent-Ear today".
- In the Run to failure scenario, record and show on the timeline: when kurtosis first crossed its teaching limit, when Silent-Ear's RMS rule first fired, when the score reached CRITICAL, and the simulated failure. Then answer in one sentence: "Silent-Ear's rule fired X simulated minutes before the simulated seizure; kurtosis flagged the defect Y minutes before that." Beneath it: "Minutes from this page's scripted degradation, not field data. Real lead time depends on the machine, the fault and the sensor; Silent-Ear makes no prediction."

EXPLAIN
- For the technician: short plain-language notes beside each view, no jargon without a one-line meaning. Why the tick rhythm tells you which part is damaged (outer race: steady ticks; inner race: ticks that pulse once per shaft turn; ball: ticks that swell and fade with the cage), why RMS moves late and kurtosis early, what an envelope spectrum does ("listen to the rhythm of the knocks, not the knock itself").
- The real world: what the Rust engine does with real accelerometer files, and how the result leaves it: REST /api/status and WebSocket /ws; optional MQTT topics silent-ear/status, silent-ear/health (payload {"health_score": 0.0-1.0, "status": "...", "timestamp": "RFC 3339"}) and silent-ear/alerts (published when status is CRITICAL); Prometheus metrics at /metrics, for example silent_ear_health_score, silent_ear_health_percent and silent_ear_anomalies_detected_total. Show the payload and the metric lines Silent-Ear would emit for the current record, labelled "illustration; this page is not connected to a broker". Measured performance, only as recorded: 40.96 M values in 1.29–1.44 s, Apple M3 Pro, release build, synthetic IMS-format files, RMS stage only; not measured on real IMS files or a Raspberry Pi.
- Honest boundaries, visible near the controls: "Simulation: every sound and number on this page is computed in your browser from a physics model; it is not sensor data." and "Demonstration and educational software; not certified for safety-critical industrial use." Never call it live, never claim Silent-Ear diagnoses, predicts or names faults: the fault naming on this page belongs to the teaching layer (envelope analysis on simulated data), not to Silent-Ear.
- A link back to the main demo (../) and to the repository (https://github.com/neurabytelabs/silent-ear), and a footer line: "Built from prompt #215811 (a candidate Proof of Invention entry) with a coding agent. The prompt: docs/experience/listen-prompt.md" linking to https://github.com/neurabytelabs/silent-ear/blob/master/docs/experience/listen-prompt.md. No model or product names.

THE PAGE
- A precision instrument, not a landing page. Dark by default with a light theme that follows prefers-color-scheme. First screen: one big "Start listening" button, the cutaway and the scope; everything else one scroll away.
- Desktop and phone. At 375 px wide: no horizontal scroll, controls at least 44 px tall, canvases resize with devicePixelRatio, nothing overlaps.
- Accessible: native inputs with labels and visible values, full keyboard use, visible focus, aria-live announcements for status and threshold changes, text equivalents (live numbers) for every canvas, prefers-reduced-motion respected, WCAG AA contrast.
- Smooth: draw with requestAnimationFrame; keep FFTs off the audio thread; no main-thread task over 50 ms on a laptop; pause drawing when the tab is hidden.
- Open Graph title and description tags. Title: "Silent-Ear — Listen to a bearing fail".

ACCEPTANCE: run these and report honestly
1. A self-test at /listen/#selftest (also callable as window.listenSelfTest(), logging "LISTEN SELFTEST PASS" or "LISTEN SELFTEST FAIL: ..." to the console) that checks: the four CWRU multiples within 0.1 %; for 4 s of generated signal at 1797 rpm, the envelope spectrum's strongest fault line is BPFO for an outer race fault, BPFI (with ±fr sidebands) for an inner race fault and 2·BSF for a ball fault; kurtosis of the healthy signal within 3 ± 0.3; crest factor of a pure sine √2 within 1 %; the Silent-Ear rule on the vectors [[1],[2],[3]] gives mean 2, sigma √(2/3), no event at exactly mean + 3·sigma, an event just above it, score 0.5 at z = 9 with k = 3, score 0 at z = 15; the same seed gives identical samples.
2. The Vitest test covers the same physics and rule checks on engine.js.
3. npm run lint, npm run typecheck, npm test and npm run build pass, and static/listen/ appears in the build output. (Do not commit; I will.)
4. Report: files created, every decision you made, what you could not verify (for example audio on a real phone), and anything in this contract you think is wrong.
```

## Runs and follow-up prompts

Every prompt sent after the first one is logged here verbatim, with the reason it was needed.

### Run 1: the dare and the contract (2026-10-08, about 59 minutes)

Input: the dare above followed by the contract, as one message. Result: `frontend/public/listen/` (index.html, style.css, app.js, engine.js with engine.d.ts, analysis-worker.js, scenario.js) and `frontend/src/listen/engine.test.ts`. The agent reported lint, typecheck, 56 tests and a 17-check browser self-test passing, and chose an AudioBufferSourceNode queue over an AudioWorklet after the worklet stalled in its verification browser.

Review before the next prompt (done outside the agent): an independent scipy check of samples dumped from `engine.js` put the outer, inner and ball faults on BPFO, BPFI (±fr sidebands) and 2·BSF (±FTF sidebands), impact rates within 0.04 % of the formulas, healthy kurtosis 2.99; a probe on the audio destination measured non-zero output that rose with the fault; no console errors, no external requests, no horizontal scroll at 390 px. Seven defects were found and sent back as follow-up 1.

### Follow-up 1

```text
Review of the first build of /listen/. The physics checks out: an independent check (scipy Hilbert envelope on samples dumped from engine.js) puts the outer, inner and ball faults exactly on BPFO, BPFI (with ±fr sidebands) and 2·BSF (with ±FTF sidebands), impact rates within 0.04 % of the formulas, healthy kurtosis 2.99. Audio reaches the destination, no console errors, no external requests, no horizontal scroll at 390 px. Fix these, nothing else, same file limits as the contract:

1. Rust parity, off by one. In src/processing.rs the first train_limit readings are training readings (status TRAINING, no score); the detector is trained on the NEXT reading's arrival, and that next reading is the first one compared. In engine.js Reference.add, the N-th record currently completes the reference and is scored in the same call. Make record N a training record with no score, and score from record N+1 on. Update the self-test, the Vitest test and any copy that counts records.

2. The reference is unrealistically tight. A perfectly stationary simulation gives the healthy RMS records a sigma of about 0.5 % of the mean, so mean + 3·sigma trips on almost any extra energy; that is why the RMS rule fired 39 minutes before kurtosis in the scenario. A real machine's RMS wanders with load, speed and temperature, and the reference period captures that wander. Add seeded, slow operating variation to the generator: a smooth random walk on radial load (default about ±10 %) and a smaller one on speed (about ±1 %), on a time scale of several seconds, active in the laboratory and in the scenario, with a "Process variation" slider (0 to 25 %) and one line of copy explaining why it exists. Kurtosis and crest factor are scale-invariant, so they should barely move with it; RMS will. Then run the scenario again and report the measured order of events honestly, whatever it is. Do not tune numbers to force an order.

3. The lead-time sentence must read correctly for any order. Never print a negative number of minutes. If kurtosis crossed first: "Silent-Ear's rule fired X simulated minutes before the simulated seizure; kurtosis flagged the defect Y minutes before that." If the RMS rule crossed first, say so in plain words ("the RMS rule fired Y minutes before kurtosis crossed its teaching limit"). If one never fired, say it never fired.

4. Inject fault while the reference is still learning makes the fault part of "normal" (on a phone the baseline finished with the fault inside it, and the score then read 100 / NORMAL with the bearing knocking). Make "Inject fault" wait: if the reference is not ready, the button queues the injection, says "Fault will be seeded when the reference is ready" and seeds it at the first scored record. If the person changes the defect picker or severity by hand while the reference is learning, show one line: "The reference is still learning: whatever it hears now becomes its normal." (That is how the Rust engine behaves too; say so.)

5. Accessibility: the Master volume input has no accessible name, because its wrapping label's first labelable descendant is the <output>. Give every input an explicit label for=. Check the others the same way.

6. Acceleration spectrum: the BPFO/BPFI/2·BSF/FTF markers and their harmonics are all crammed into the first 500 Hz of a 0-8 kHz axis and the labels overprint each other. Remove the fault-line markers from this plot; instead shade 0-500 Hz with the label "fault rhythms are down here, buried: see the envelope spectrum", and mark the band-pass band around the resonance. On the envelope spectrum, stagger the marker labels so none overlap (BPFI and 2·BSF overprint at 1797 rpm).

7. When the scenario has ended, the pause button reads "Resume scenario"; disable it or relabel it until Restart.

Then rerun npm run lint, npm run typecheck, npm test, the browser self-test and the full scenario, and report the measured milestones. Do not commit. Build to a temporary outDir as before.
```

### Run 2: follow-up 1 (2026-10-08, about 18 minutes, same session)

Result: all seven items fixed in the same files (no new files). Records 1 to N are now training records with no score, and record N+1 is the first one compared, as in `src/processing.rs`. Process variation is a separate seeded stream (load ±10 %, speed ±1 %, three-second transitions) that scales the whole acceleration signal, healthy noise included. The agent reported lint, typecheck, 58 tests, the browser self-test and the full scenario passing.

Measured scenario milestones after the fix (the scenario coefficients were not tuned):

| Event | Simulated minutes |
|---|---:|
| Silent-Ear RMS rule first fired | 70.0 |
| Demo deviation score reached CRITICAL | 76.7 |
| Kurtosis crossed its teaching limit (4.5) | 77.3 |
| Simulated seizure (fixed endpoint) | 240.0 |

In this script the RMS rule fires 7.3 simulated minutes before kurtosis, not after it. The page says so in plain words instead of claiming the textbook order. Before the fix (no operating variation) the gap was 39.3 minutes.

Review after run 2 (done outside the agent): the independent scipy check still puts each fault on its line (impact rates now about 0.1 % below the nominal formulas, because the speed wanders by ±1 %); healthy kurtosis 3.00; non-zero audio at the destination on desktop and on a 390 px phone viewport; no console errors, no failed or external requests, no horizontal scroll, every input labelled, every button at least 44 px tall; `LISTEN SELFTEST PASS`; `npm run build` leaves the tracked `static/` files unchanged and adds `static/listen/`. No further follow-up was needed.

Not verified: audio on a physical phone (including iPhone silent mode), screen-reader output, and whether a technician recognizes the sound.
