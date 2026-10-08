import type { KeyboardEvent } from "react";
import type { FixtureFrame } from "../fixtures/scenarios";

interface TimelineProps {
  readonly frames: readonly FixtureFrame[];
  readonly visibleFrames: readonly FixtureFrame[];
  readonly frameIndex: number;
  readonly selectedChannel: number;
  readonly channelLabel: string;
  readonly upperThreshold: number | null;
  readonly onFrameChange: (index: number) => void;
}

function pointsFor(frames: readonly FixtureFrame[], channel: number, totalCount: number): string {
  const values = frames.map((frame) => frame.rms[channel]);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const span = Math.max(maximum - minimum, 0.000001);
  return values
    .map((value, index) => {
      const x = totalCount === 1 ? 0 : (index / (totalCount - 1)) * 100;
      const y = 88 - ((value - minimum) / span) * 72;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function Timeline({
  frames,
  visibleFrames,
  frameIndex,
  selectedChannel,
  channelLabel,
  upperThreshold,
  onFrameChange,
}: TimelineProps) {
  const lastIndex = frames.length - 1;
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const direction = event.key === "PageUp" ? 1 : -1;
      onFrameChange(Math.min(lastIndex, Math.max(0, frameIndex + direction * 5)));
    }
  };

  return (
    <section className="timeline-card" aria-labelledby="timeline-title">
      <div className="timeline-heading">
        <div>
          <p className="section-kicker">Deterministic history</p>
          <h2 id="timeline-title">RMS timeline · per-window values</h2>
        </div>
        <p className="step-count" aria-live="polite">
          Step {frameIndex + 1} of {frames.length}
        </p>
      </div>

      {visibleFrames.length === 0 ? (
        <div className="timeline-plot timeline-empty">
          <p>No RMS record selected. Run the controlled demo or choose a fixture window.</p>
        </div>
      ) : (
        <div className="timeline-plot" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" x2="100" y1="88" y2="88" className="plot-baseline" />
            <polyline points={pointsFor(visibleFrames, selectedChannel, frames.length)} className="plot-line" />
            <line
              x1={(frameIndex / Math.max(1, lastIndex)) * 100}
              x2={(frameIndex / Math.max(1, lastIndex)) * 100}
              y1="8"
              y2="92"
              className="plot-cursor"
            />
          </svg>
        </div>
      )}

      <label htmlFor="timeline-range" className="range-label">
        {visibleFrames.length === 0
          ? `Choose the first fixture window for ${channelLabel}`
          : `Inspect ${channelLabel}, fixture window ${frameIndex + 1}`}
      </label>
      <input
        id="timeline-range"
        type="range"
        min={0}
        max={lastIndex}
        step={1}
        value={frameIndex}
        onChange={(event) => onFrameChange(Number(event.currentTarget.value))}
        onKeyDown={handleKeyDown}
      />
      <div className="step-controls">
        <button type="button" onClick={() => onFrameChange(Math.max(0, frameIndex - 1))} disabled={frameIndex === 0}>
          Previous window
        </button>
        <button type="button" onClick={() => onFrameChange(Math.min(lastIndex, frameIndex + 1))} disabled={frameIndex === lastIndex}>
          Next window
        </button>
      </div>
      <p className="definition-copy">
        Each point is a per-window RMS value, not a raw vibration waveform.
        {upperThreshold === null
          ? " The upper comparison becomes available after baseline readiness."
          : ` The selected upper threshold is ${upperThreshold.toFixed(5)} demo units.`}
      </p>
    </section>
  );
}
