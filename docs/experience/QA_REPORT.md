# Silent-Ear Q4 V2 QA report

Date: 2026-08-26  
Branch: `feat/silent-ear-3d-product-experience`  
Fixture: `silent-ear-explainer@1.0.0`  
Final embedded bundle: `assets/index-q700-K-U.js`

## Verdict

**Verified local artifact; all automated gates pass.** The page now presents one coherent procedural conveyor test cell with a moving belt, connected drive, four selectable bearing/sensor stations, deterministic carriers, eight channel mappings and reversible Overview, Inspect and Exploded signal modes. The product-truth boundary, semantic controls, no-WebGL equivalent and reduced-motion behavior remain intact.

All three required visual loops were run against the Axum-served production build. Loop 1 and Loop 3 each found High issues; implementation stopped, corrected them and reran the affected gate. The final machine-readable Loop 1, Loop 2 and Loop 3 files all have empty failure arrays. No Critical or High finding remains. The final adversarial review verdict is **CONDITIONAL PASS** (Critical 0, High 0, Medium 1) because cold headless/software WebGL initialization still produced long tasks. That risk, a raw-bundle advisory, an unavailable online npm audit and pre-existing Rust formatting diffs remain honestly recorded below.

No external runtime assets were used.

## Final implementation evidence

- One shared deterministic experience time drives belt, drum and carrier motion. Operating speed is fixed and is not derived from RMS.
- B1/X through B4/Y map exactly to channels 0–7.
- Four real raycast proxies and four semantic HTML station controls have matching selection outcomes. The canvas is non-focusable and `aria-hidden`.
- Scenario selection resets atomically to B1/X, Overview, paused playback and the scenario's documented start.
- Exact equality remains not exceeded; forward, backward and returned scrubbing are history-independent.
- Overview restores canonical transforms. Settled diagnostics expose empty animation reasons and restoration error 0.
- The no-WebGL schematic retains the full belt loop, drive, four carriers, four bearing/sensor buttons, all eight mappings and the five-step comparison path.
- All geometry, materials, lighting, shadows, SVG and CSS are repository-authored. The production browser requested only same-origin HTML, CSS and JavaScript.

Rust source and behavior were not changed.

## Build, analysis and automated tests

### Frontend

Final command group and output summary:

```text
npm run lint       PASS — no ESLint findings
npm run typecheck  PASS — TypeScript --noEmit
npm test           PASS — 9 files, 47/47 tests
npm run build      PASS — 50 modules transformed in 610 ms
git diff --check   PASS — no whitespace errors
```

Final Vite output:

```text
static/index.html                    0.77 kB raw /   0.44 kB gzip
static/assets/index-Ch-FakSV.css    30.35 kB raw /   6.63 kB gzip
static/assets/index-q700-K-U.js    709.46 kB raw / 192.56 kB gzip
```

Vite emitted its >500 kB raw-chunk advisory. Source maps are not emitted. `npm ci` previously completed locally with 313 packages. A later online `npm audit` (2026-10-07) reports 0 vulnerabilities in production dependencies and 1 moderate advisory in the dev-only `vitest` chain (`@vitest/mocker`, GHSA-82fw-gwwq-j7x9); it is not shipped in the build output.

The 47 tests cover fixture/product semantics, strict threshold equality, scenario resets, conveyor kinematics and carrier positions, station/axis/channel mapping, scene-frame reversibility, quality tiers, station detail selection, raycast proxy structure, inspection restoration, UI controls and fallback behavior.

### Rust

Final command output:

```text
cargo build --locked                     PASS
cargo test --locked                      PASS — 42 passed; 0 failed
cargo clippy --locked -- -D warnings      PASS
```

`cargo fmt -- --check` returns exit 1 for formatting-only diffs in existing `src/metrics.rs` import wrapping and the existing `src/mqtt.rs::mqtt_bridge` signature. Those unrelated Rust files were deliberately not edited. This is an open formatting gate, not a runtime or test failure.

## Integrated Axum runtime

The final production frontend is embedded and served by:

```text
cargo run --locked -- --mock
```

Final process log:

```text
Silent-Ear starting version="1.3.0"
Data source type source=Mock
Mock data source initialized channels=8 total=Some(1000) degradation=true
API server starting (REST + WebSocket) address=0.0.0.0:3000
```

The final process started at `2026-08-26T16:49:25.960096Z` and was left running on port 3000. Real-browser checks observed:

| Request/surface | Actual result |
|---|---|
| `/` | Production page loaded; title `Silent-Ear — Controlled RMS demonstration` |
| `/api/status` | JSON with eight readings; mock service `IDLE`, training true at observation |
| `/metrics` | HTTP success with an empty body while the mock service was idle |
| Runtime assets | `index-Ch-FakSV.css` and `index-q700-K-U.js`, same origin only |

The empty idle metrics body is reported as observed behavior, not as populated Prometheus evidence.

## Real-browser QA

Exploratory checks ran in a real browser against the Axum-served build. It confirmed the final bundle, one scene host, one canvas, B1/X semantic parity, no page overflow, same-origin resources only, and zero drained error/failure events. A real sequence B3 → Y → Exploded signal → Overview settled with B3/Y parity, empty animation reasons and restoration error 0. Durable PNG capture used the repository's Playwright 1.55.1 Chromium 140 runner; interactions, DOM/network assertions and rendered pages still targeted the Axum build.

The capture runner fails on console errors, page errors, unhandled rejections, request failures, HTTP responses at or above 400 and cross-origin requests. Final Loop 3 reported none in its required contexts.

### Loop 1 — system legibility

Initial verdict: **NO-GO**. Six High findings were recorded: desktop overflow, absent mobile first-viewport machine, 78 mobile calls, clipped B1/B4 inspect cameras, weak four-station countability and stale settled metrics.

After CSS, camera, batching, physical station-flag and diagnostics corrections, the full loop was rerun and passed. Final Loop 1 evidence showed no 1440/1280 overflow, a meaningful complete line at 390 × 844, mobile 45 calls / 5,678 triangles, contextual B1/B4 inspection, four countable flags and settled restoration diagnostics.

### Loop 2 — scenario and interaction truth

Final verdict: **PASS**; all acceptance flags true, `failures=[]`.

| B1/X fixture index | Current / upper rule | Result | Score |
|---:|---:|---|---:|
| 9 | 0.12106 / 0.12549 | Within demo reference | 100.0 |
| 10 | 0.12386 / 0.12549 | Approaching demo threshold | 100.0 |
| 11 | 0.12549 / 0.12549 | At threshold — not exceeded | 100.0 |
| 12 | 0.13110 / 0.12549 | Exceeded; B1_X identified | 90.0 |
| 17 | 0.11521 / 0.12549 | Returned within; no residue | 100.0 |

Backward 12→11 and returned 11→17 checks cleared exceeded residue. Selecting B2/Y during a global B1/X exceedance kept the selected measurement at/below while naming B1_X globally. Fresh real-canvas pointer pages selected B1, B2, B3 and B4 and entered Inspect; semantic controls exercised all eight mappings. Five remounts each retained one canvas and one host. Exploded→Overview restoration settled with no active reasons and exact restoration error 0.

### Loop 3 — resilience, accessibility and performance

Initial verdict: **NO-GO**. Warm desktop playback measured 42.2605 fps, below the 45 fps review floor. The render pass retained every station housing/cap/sensor/flag but submits internal rings/rollers only for the selected station and removes redundant small moving shadow casters; high-tier shadows remain enabled at 1024 px. The gate was fully rerun against the rebuilt Axum artifact.

Final verdict: **PASS**; every recorded acceptance flag is true and `failures=[]`.

- Desktop 1440 × 900 and 1280 × 800: no overflow; 61 calls, 19,418 triangles, 58 geometries, 1 texture, 10 programs, 122 objects, 18 instanced meshes / 173 instances, DPR 1, shadows on, no active reasons, restoration 0.
- Mobile 390 × 844 Overview: 45 calls, 5,678 triangles, 45 geometries, 0 textures, 6 programs, 109 objects, 19 instanced meshes / 137 instances, DPR 1, shadows off.
- Mobile Exploded: 42 calls, 5,270 triangles; all visible controls met the 44 × 44 px minimum; returning to Overview restored error 0.
- Desktop warm playback: 269 frames / 5,016.4 ms, **53.4248 fps**, median 16.7 ms, p95 33.3 ms, p99 33.4 ms, maximum 33.4 ms, 24 gaps above 33.3 ms and zero above 50 ms.
- Mobile warm playback: 302 frames / 5,016.4 ms, **60.0032 fps**, maximum 16.8 ms and zero gaps above 33.3 ms.
- Reduced motion matched the media query, disabled machine and journey playback, exposed direct stepping, retained all facts, had no overflow and reported no active animation reasons.
- Forced no-WebGL: zero canvases, four stations, eight mappings, eight table rows, full five-step path, B4/Y selection with truthful global B1/X exceedance, visible score caveat and no overflow.
- Context loss switched to the semantic fallback and a reload restored one canvas/host.
- The 200% check used a 640 × 450 CSS viewport at DPR 2 as a documented reflow proxy, not native browser zoom; it had no page overflow and retained visible status.
- Keyboard focus capture showed a 3 px solid blue outline on the primary action.

## Screenshot inventory

All durable PNGs and JSON evidence are under `docs/experience/screenshots-v2/`; the `.gitignore` explicitly retains this directory.

- Loop 1: 1440 × 900, 1280 × 800, 390 × 844 Overview, B1 Inspect and B4 Inspect.
- Loop 2: Overview/Inspect/Exploded/restored; five canonical B1/X model, facts and result sets; backward, returned and unselected/global stress captures.
- Loop 3: `loop3-desktop-1440x900.png`, `loop3-desktop-1280x800.png`, `loop3-mobile-390x844.png`, `loop3-mobile-exploded-390x844.png`, `loop3-reduced-motion-full.png`, `loop3-no-webgl-full.png`, `loop3-zoom-200-proxy-full.png` and `loop3-focus-state-1440x900.png`.
- Machine-readable results: `qa-loop1-results.json`, `qa-loop2-results.json`, `qa-loop3-results.json`.

Final desktop, mobile, reduced-motion, no-WebGL, mobile Exploded and zoom images were inspected at original resolution.

## Product-truth and safety boundary

The public experience consistently labels controlled synthetic RMS data, per-window RMS rather than waveform data, fixed baseline statistics, a strict upper comparison and a heuristic score. Equality is explicitly not exceeded. The machine remains intact and the presentation does not diagnose a fault, identify physical damage, predict failure, infer remaining life, claim live sensing or claim operational suitability. Motion is persistently labeled visually amplified and not reconstructed from sensor data. The educational/not-safety-critical boundary remains visible.

## Residual risks

| Severity | Residual | Honest interpretation |
|---|---|---|
| Medium | Cold headless/software WebGL produced long tasks: desktop 92/921/61 ms and mobile 70/386 ms | Warm playback passes its fps and frame-gap gates, but cold initialization has not demonstrated the ≤50 ms target on representative hardware. Profile parse/shader initialization on a physical GPU before external performance sign-off. |
| Low | `npm audit` reports a moderate advisory in dev-only `vitest` | Fix requires a breaking vitest major upgrade; production dependencies report 0 vulnerabilities. |
| Resolved | `cargo fmt -- --check` failed in two Rust files | Formatting-only; fixed in the same pull request. |
| Low | Single raw JavaScript chunk is 709.46 kB | It is 192.56 kB gzip and well below the transfer ceiling, but Vite's >500 kB advisory remains. Consider carefully staged code splitting later. |
| Low | No formal human comprehension or full screen-reader session | Scripted semantic checks passed; no moderated 60–90 second comprehension study, VoiceOver or NVDA sign-off is claimed. |
| Low | 200% evidence is a reflow proxy | Repeat with native 200% browser zoom on target desktop browsers if formal accessibility certification is required. |

