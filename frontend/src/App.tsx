import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChannelTable } from "./components/ChannelTable";
import { MachineControls } from "./components/MachineControls";
import { ResultCard } from "./components/ResultCard";
import { ScenarioControls } from "./components/ScenarioControls";
import { SceneViewport, type SceneMetrics } from "./components/SceneViewport";
import { SignalChain } from "./components/SignalChain";
import { Timeline } from "./components/Timeline";
import { useReducedMotion } from "./components/useReducedMotion";
import {
  channelIndexFor,
  comparisonGlyphFor,
  createScenarioResetState,
  stationAxisForChannel,
  type AxisId,
  type ChannelIndex,
  type ModelMode,
  type StationId,
} from "./domain/conveyorScene";
import { createScenarioSnapshot } from "./domain/scenario";
import { CHANNEL_IDS, SCENARIO_FIXTURES, SCENARIO_ORDER, type ScenarioId } from "./fixtures/scenarios";

interface InitialState {
  readonly scenario: ScenarioId;
  readonly progress: number;
  readonly started: boolean;
  readonly forceFallback: boolean;
}

function queryState(): InitialState {
  const params = new URLSearchParams(window.location.search);
  const requestedScenario = params.get("scenario");
  const scenario = SCENARIO_ORDER.includes(requestedScenario as ScenarioId)
    ? requestedScenario as ScenarioId
    : "within-reference-v1";
  const requestedProgress = Number(params.get("step"));
  const hasStep = params.has("step") && Number.isFinite(requestedProgress);
  return {
    scenario,
    progress: hasStep ? Math.min(1, Math.max(0, requestedProgress)) : 0,
    started: hasStep || params.has("scenario"),
    forceFallback: params.get("webgl") === "off",
  };
}

function afterPaint(callback: () => void): void {
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(callback);
  } else {
    window.setTimeout(callback, 0);
  }
}

export function App() {
  const initial = useMemo(queryState, []);
  const reducedMotion = useReducedMotion();
  const [scenarioId, setScenarioId] = useState<ScenarioId>(initial.scenario);
  const [progress, setProgress] = useState(initial.progress);
  const [hasStarted, setHasStarted] = useState(initial.started);
  const [playing, setPlaying] = useState(false);
  const [guided, setGuided] = useState(true);
  const [complete, setComplete] = useState(false);
  const [thresholdSigma, setThresholdSigma] = useState(3);
  const initialSelection = stationAxisForChannel(0);
  const [selectedStation, setSelectedStation] = useState<StationId>(initialSelection.stationId);
  const [selectedAxis, setSelectedAxis] = useState<AxisId>(initialSelection.axisId);
  const [selectedChannel, setSelectedChannel] = useState<ChannelIndex>(0);
  const [modelMode, setModelMode] = useState<ModelMode>("full-assembly");
  const [cameraResetKey, setCameraResetKey] = useState(0);
  const [forceFallback, setForceFallback] = useState(initial.forceFallback);
  const [sceneMetrics, setSceneMetrics] = useState<SceneMetrics | null>(null);
  const scenarioHeadingRef = useRef<HTMLHeadingElement>(null);
  const labRef = useRef<HTMLElement>(null);

  const fixture = SCENARIO_FIXTURES[scenarioId];
  const lastFrame = fixture.frames.length - 1;
  const frameIndex = Math.round(progress * lastFrame);
  const snapshot = useMemo(
    () => createScenarioSnapshot(scenarioId, progress, { thresholdSigma, hasStarted, complete, selectedChannel }),
    [complete, hasStarted, progress, scenarioId, selectedChannel, thresholdSigma],
  );
  const selected = snapshot.channels[selectedChannel] ?? snapshot.channels[snapshot.selectedChannel];

  const setFrame = useCallback((index: number) => {
    setHasStarted(true);
    setComplete(false);
    setPlaying(false);
    setGuided(false);
    setProgress(Math.min(lastFrame, Math.max(0, index)) / Math.max(1, lastFrame));
  }, [lastFrame]);

  const runDemo = () => {
    setScenarioId("controlled-deviation-v1");
    setThresholdSigma(3);
    setSelectedChannel(0);
    setSelectedStation("B1");
    setSelectedAxis("X");
    setModelMode("full-assembly");
    setProgress(0);
    setHasStarted(true);
    setComplete(false);
    setGuided(true);
    setPlaying(!reducedMotion);
    afterPaint(() => labRef.current?.scrollIntoView?.({ behavior: "auto", block: "start" }));
  };

  const togglePlayback = () => {
    if (reducedMotion) return;
    if (playing) {
      setPlaying(false);
      return;
    }
    if (frameIndex >= lastFrame) setProgress(0);
    setHasStarted(true);
    setComplete(false);
    setPlaying(true);
  };

  const skipJourney = () => {
    const nextFixture = SCENARIO_FIXTURES["controlled-deviation-v1"];
    setScenarioId("controlled-deviation-v1");
    setProgress(nextFixture.baselineSampleCount / (nextFixture.frames.length - 1));
    setHasStarted(true);
    setComplete(false);
    setPlaying(false);
    setGuided(false);
    setSelectedChannel(0);
    setSelectedStation("B1");
    setSelectedAxis("X");
    setModelMode("full-assembly");
    afterPaint(() => {
      labRef.current?.scrollIntoView?.({ behavior: "auto", block: "start" });
      scenarioHeadingRef.current?.focus({ preventScroll: true });
    });
  };

  const selectScenario = (id: ScenarioId) => {
    const reset = createScenarioResetState(id);
    setScenarioId(reset.scenarioId);
    setThresholdSigma(reset.thresholdSigma);
    setProgress(reset.progress);
    setHasStarted(reset.hasStarted);
    setComplete(reset.complete);
    setPlaying(reset.playing);
    setGuided(false);
    setSelectedChannel(reset.selectedChannel);
    setSelectedStation(reset.selectedStation);
    setSelectedAxis(reset.selectedAxis);
    setModelMode(reset.modelMode);
    setCameraResetKey((key) => key + 1);
  };

  const selectStation = (station: StationId) => {
    setSelectedStation(station);
    setSelectedChannel(channelIndexFor(station, selectedAxis));
    setModelMode("inspect-station");
  };

  const selectAxis = (axis: AxisId) => {
    setSelectedAxis(axis);
    setSelectedChannel(channelIndexFor(selectedStation, axis));
  };

  const selectChannel = (channel: number) => {
    const selection = stationAxisForChannel(channel);
    setSelectedChannel(selection.channelIndex);
    setSelectedStation(selection.stationId);
    setSelectedAxis(selection.axisId);
  };

  const selectModelMode = (mode: ModelMode) => {
    setModelMode(mode);
    if (mode === "exploded-signal") setPlaying(false);
  };

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (!playing) return undefined;
    const timeout = window.setTimeout(() => {
      setProgress((current) => {
        const currentIndex = Math.round(current * lastFrame);
        if (currentIndex + 1 >= lastFrame) {
          setPlaying(false);
          setComplete(true);
          setGuided(false);
          return 1;
        }
        return (currentIndex + 1) / lastFrame;
      });
    }, guided ? 76_000 / Math.max(1, lastFrame) : 1_250);
    return () => window.clearTimeout(timeout);
  }, [guided, lastFrame, playing, progress]);

  const comparisonGlyph = comparisonGlyphFor(selected, snapshot.baseline.ready, thresholdSigma);
  const comparisonLabel = comparisonGlyph === "unavailable"
    ? "Reference not ready"
    : comparisonGlyph === "equal"
      ? "At threshold — not exceeded"
      : comparisonGlyph === "exceeded"
        ? "Above upper demo threshold"
        : comparisonGlyph === "approaching"
          ? "Approaching upper demo threshold"
          : "At or below upper demo threshold";

  const handleMetrics = useCallback((metrics: SceneMetrics | null) => setSceneMetrics(metrics), []);
  const handleFallback = useCallback(() => setForceFallback(true), []);

  return (
    <>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Silent-Ear home">
          <span className="wordmark-mark" aria-hidden="true">SE</span>
          <span>SILENT-EAR</span>
        </a>
        <nav aria-label="Page sections">
          <a href="#scenario-lab">Scenario lab</a>
          <a href="#technical-flow">Technical flow</a>
        </nav>
        <a className="lab-link" href="../">← Bearing lab (main demo)</a>
      </header>

      <main id="main-content">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="act-label">Act I · The invisible signal change</p>
            <p className="eyebrow">SILENT-EAR · CONTROLLED DEMO</p>
            <h1 id="hero-title">See a statistical deviation, step by step.</h1>
            <p className="hero-support">
              Follow eight vibration-derived RMS values through a fixed demo reference and an inspectable upper-threshold rule.
            </p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={runDemo}>Run the controlled demo</button>
              <a className="secondary-action" href="#technical-flow">Inspect the technical flow</a>
            </div>
            <div className="source-row">
              <span className="source-chip">CONTROLLED DEMO · {snapshot.fixtureContract}</span>
              <span>{snapshot.scenarioTitle}</span>
            </div>
            <p className="safety-line">
              Demonstration and educational software; not certified for safety-critical industrial use.
            </p>
          </div>

          <div className="hero-machine">
            <figure className="scene-figure">
              <SceneViewport
                snapshot={snapshot}
                selectedChannel={selectedChannel}
                playing={playing}
                reducedMotion={reducedMotion}
                forceFallback={forceFallback}
                modelMode={modelMode}
                selectedStation={selectedStation}
                selectedAxis={selectedAxis}
                cameraResetKey={cameraResetKey}
                onStationSelect={selectStation}
                onFallback={handleFallback}
                onMetrics={handleMetrics}
              />
              <figcaption>{snapshot.visualizationLabel}</figcaption>
            </figure>
            <MachineControls
              mode={modelMode}
              station={selectedStation}
              axis={selectedAxis}
              playing={playing}
              reducedMotion={reducedMotion}
              measurement={{
                channelId: CHANNEL_IDS[selectedChannel],
                channelLabel: selected.label,
                currentRms: snapshot.currentReadingAvailable ? selected.rms : null,
                fixedMean: selected.mean,
                standardDeviation: selected.standardDeviation,
                upperThreshold: selected.upperThreshold,
                comparisonLabel,
                comparisonGlyph,
                units: "demo units",
              }}
              exceededChannels={snapshot.thresholdExceededChannels.map((channel) => CHANNEL_IDS[channel])}
              onModeChange={selectModelMode}
              onStationChange={selectStation}
              onAxisChange={selectAxis}
              onResetCamera={() => setCameraResetKey((key) => key + 1)}
              onTogglePlayback={togglePlayback}
            />
          </div>
        </section>

        <section className="mechanism-strip" aria-labelledby="mechanism-title">
          <p className="act-label">Act II · How Silent-Ear listens</p>
          <h2 id="mechanism-title">RMS input → fixed reference → upper comparison → inspectable result</h2>
          <p>RMS values, not a raw waveform. Each point summarizes one controlled fixture window.</p>
        </section>

        <section id="scenario-lab" ref={labRef} className="lab" aria-label="Controlled scenario laboratory">
          <div className="lab-status">
            <ResultCard snapshot={snapshot} />
            <div className="playback-card" aria-label="Guided journey controls">
              <div>
                <p className="section-kicker">Guided journey</p>
                <p>{guided ? "76-second paced explanation" : "Direct inspection mode"}</p>
              </div>
              <div className="playback-actions">
                <button type="button" onClick={togglePlayback} disabled={reducedMotion}>
                  {reducedMotion ? "Playback paused" : playing ? "Pause journey" : "Play journey"}
                </button>
                <button type="button" onClick={skipJourney}>Skip guided journey</button>
              </div>
              {reducedMotion && <p className="mode-note">Reduced motion is active. Playback starts paused; use the window controls for direct steps.</p>}
            </div>
          </div>

          <Timeline
            frames={fixture.frames}
            visibleFrames={snapshot.rmsTimeline}
            frameIndex={frameIndex}
            selectedChannel={selectedChannel}
            channelLabel={selected.label}
            upperThreshold={selected.upperThreshold}
            onFrameChange={setFrame}
          />

          <div className="lab-controls-grid">
            <ScenarioControls
              scenarios={SCENARIO_ORDER.map((id) => SCENARIO_FIXTURES[id])}
              selected={scenarioId}
              onSelect={selectScenario}
              headingRef={scenarioHeadingRef}
            />
            <section className="sensitivity-card" aria-labelledby="sensitivity-title">
              <p className="section-kicker">Educational control</p>
              <h2 id="sensitivity-title">Demo threshold sensitivity (kσ)</h2>
              <label htmlFor="threshold-range">Selected multiplier: {thresholdSigma.toFixed(2)}σ</label>
              <input
                id="threshold-range"
                type="range"
                min="1"
                max="6"
                step="0.25"
                value={thresholdSigma}
                onChange={(event) => {
                  setThresholdSigma(Number(event.currentTarget.value));
                  setPlaying(false);
                  setComplete(false);
                }}
              />
              <p>Changes the educational comparison rule for this fixture; the fixed reference and RMS values do not change.</p>
              <dl className="selected-facts">
                <div><dt>Selected channel</dt><dd>{selected.label}</dd></div>
                <div><dt>Current RMS</dt><dd>{snapshot.currentReadingAvailable ? `${selected.rms.toFixed(5)} demo units` : "Not started"}</dd></div>
                <div><dt>Fixed mean</dt><dd>{selected.mean?.toFixed(5) ?? "Not ready"}</dd></div>
                <div><dt>Upper rule</dt><dd>{selected.upperThreshold?.toFixed(5) ?? "Not ready"}</dd></div>
              </dl>
            </section>
          </div>

          <ChannelTable snapshot={snapshot} selectedChannel={selectedChannel} onSelectChannel={selectChannel} />
        </section>

        <section id="technical-flow" className="technical-flow" aria-labelledby="technical-title">
          <p className="act-label">Act IV · Evidence and next step</p>
          <h2 id="technical-title">Inspect the technical flow</h2>
          <p className="technical-intro">
            One deterministic fixture drives the explanatory motion, RMS timeline, fixed statistics, upper threshold, status, score and scrubber.
          </p>
          <SignalChain />

          <div className="evidence-grid">
            <article>
              <p className="section-kicker">Source-backed surfaces</p>
              <h3>Local Rust service</h3>
              <p>REST status, WebSocket updates, optional MQTT publishing, Prometheus-format metrics and ARM64 build configuration are implementation surfaces—not device validation.</p>
            </article>
            <article>
              <p className="section-kicker">Renderer evidence</p>
              <h3>Measured in this view</h3>
              {sceneMetrics ? (
                <dl className="renderer-metrics" data-testid="renderer-metrics">
                  <div><dt>Quality tier</dt><dd>{sceneMetrics.tier}</dd></div>
                  <div><dt>Capped DPR</dt><dd>{sceneMetrics.dpr.toFixed(2)}</dd></div>
                  <div><dt>Draw calls</dt><dd>{sceneMetrics.drawCalls}</dd></div>
                  <div><dt>Triangles</dt><dd>{sceneMetrics.triangles.toLocaleString()}</dd></div>
                </dl>
              ) : (
                <p>3D renderer metrics are unavailable in the complete 2D mode.</p>
              )}
            </article>
            <article>
              <p className="section-kicker">Boundary</p>
              <h3>Statistical comparison only</h3>
              <p>This demonstration does not identify a physical cause, forecast future behavior, or measure machine condition.</p>
            </article>
          </div>

          <aside className="final-boundary" aria-label="Safety and next step">
            <p>Demonstration and educational software; not certified for safety-critical industrial use.</p>
            <p>Review the controlled states and technical boundary locally before discussing any pilot evaluation.</p>
          </aside>
        </section>
      </main>

      <footer>
        <span>Silent-Ear · 3D test cell</span>
        <a href="../">← Main demo: listen to a bearing fail</a>
        <span>{snapshot.fixtureContract} · SAMPLE DATA</span>
      </footer>
    </>
  );
}
