import { useEffect, useRef, useState } from "react";
import type {
  AxisId,
  ComparisonGlyph as SceneComparisonGlyph,
  ModelMode,
  StationId,
} from "../domain/conveyorScene";

export type { ModelMode, StationId };
export type MeasurementAxis = AxisId;
export type ComparisonGlyph = SceneComparisonGlyph;

export interface SelectedMeasurementFacts {
  readonly channelId: string;
  readonly channelLabel: string;
  readonly currentRms: number | null;
  readonly fixedMean: number | null;
  readonly standardDeviation: number | null;
  readonly upperThreshold: number | null;
  readonly comparisonLabel: string;
  readonly comparisonGlyph: ComparisonGlyph;
  readonly units?: string;
}

export interface MachineControlsProps {
  readonly mode: ModelMode;
  readonly station: StationId;
  readonly axis: MeasurementAxis;
  readonly playing: boolean;
  readonly reducedMotion?: boolean;
  readonly measurement: SelectedMeasurementFacts;
  readonly exceededChannels?: readonly string[];
  readonly onModeChange: (mode: ModelMode) => void;
  readonly onStationChange: (station: StationId) => void;
  readonly onAxisChange: (axis: MeasurementAxis) => void;
  readonly onResetCamera: () => void;
  readonly onTogglePlayback: () => void;
}

const MODES: readonly { readonly id: ModelMode; readonly label: string }[] = [
  { id: "full-assembly", label: "Overview" },
  { id: "inspect-station", label: "Inspect station" },
  { id: "exploded-signal", label: "Exploded signal" },
];

const STATIONS: readonly StationId[] = ["B1", "B2", "B3", "B4"];
const AXES: readonly MeasurementAxis[] = ["X", "Y"];

function displayValue(value: number | null, units = "demo units"): string {
  return value === null ? "Not ready" : `${value.toFixed(5)} ${units}`;
}

function modeLabel(mode: ModelMode): string {
  return MODES.find((candidate) => candidate.id === mode)?.label ?? "Overview";
}

function controlsOpenByDefault(): boolean {
  return typeof window === "undefined" ||
    typeof window.matchMedia !== "function" ||
    !window.matchMedia("(max-width: 820px)").matches;
}

export function MachineControls({
  mode,
  station,
  axis,
  playing,
  reducedMotion = false,
  measurement,
  exceededChannels = [],
  onModeChange,
  onStationChange,
  onAxisChange,
  onResetCamera,
  onTogglePlayback,
}: MachineControlsProps) {
  const announcementKey = `${station}:${axis}:${mode}:${measurement.comparisonLabel}`;
  const previousAnnouncementKey = useRef(announcementKey);
  const [announcement, setAnnouncement] = useState("");
  const [controlsOpen, setControlsOpen] = useState(controlsOpenByDefault);
  const playbackDisabled = reducedMotion || mode === "exploded-signal";

  useEffect(() => {
    if (previousAnnouncementKey.current === announcementKey) return;
    previousAnnouncementKey.current = announcementKey;
    setAnnouncement(
      `Bearing ${station.slice(1)}, ${axis} direction selected. ${modeLabel(mode)}. ${measurement.comparisonLabel}.`,
    );
  }, [announcementKey, axis, measurement.comparisonLabel, mode, station]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const compact = window.matchMedia("(max-width: 820px)");
    const update = () => setControlsOpen(!compact.matches);
    compact.addEventListener?.("change", update);
    return () => compact.removeEventListener?.("change", update);
  }, []);

  return (
    <section className="machine-controls" aria-labelledby="machine-controls-title">
      <div className="machine-control-summary">
        <div>
          <p className="section-kicker" id="machine-controls-title">Machine inspection</p>
          <p className="machine-breadcrumb" aria-label="Selected machine path">
            Test cell <span aria-hidden="true">/</span> Bearing {station.slice(1)} <span aria-hidden="true">/</span> {axis} direction
          </p>
        </div>
        <div className={`machine-state state-${measurement.comparisonGlyph}`}>
          <span className="machine-state-glyph" aria-hidden="true" />
          <span>{measurement.comparisonLabel}</span>
        </div>
      </div>

      <details
        className="machine-control-disclosure"
        open={controlsOpen}
        onToggle={(event) => setControlsOpen(event.currentTarget.open)}
      >
        <summary>
          <span>Inspect machine controls</span>
          <span className="disclosure-current">{modeLabel(mode)} · {station}/{axis}</span>
        </summary>
        <div className="machine-control-body">
          <div className="control-group control-group-modes" role="group" aria-label="Model view">
            <span className="control-group-label">Model view</span>
            <div className="segmented-control">
              {MODES.map((candidate) => (
                <button
                  key={candidate.id}
                  type="button"
                  aria-pressed={mode === candidate.id}
                  onClick={() => onModeChange(candidate.id)}
                >
                  {candidate.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group control-group-stations" role="group" aria-label="Bearing station">
            <span className="control-group-label">Bearing station</span>
            <div className="station-control-grid">
              {STATIONS.map((candidate) => (
                <button
                  key={candidate}
                  id={`station-control-${candidate}`}
                  type="button"
                  aria-pressed={station === candidate}
                  onClick={() => onStationChange(candidate)}
                >
                  <span>{candidate}</span>
                  <small>Bearing {candidate.slice(1)}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group control-group-axis" role="group" aria-label="Measurement direction">
            <span className="control-group-label">Measurement direction</span>
            <div className="axis-control">
              {AXES.map((candidate) => (
                <button
                  key={candidate}
                  type="button"
                  aria-pressed={axis === candidate}
                  onClick={() => onAxisChange(candidate)}
                >
                  <span aria-hidden="true" className={`axis-mark axis-${candidate.toLowerCase()}`} />
                  {candidate} direction
                </button>
              ))}
            </div>
          </div>

          <div className="control-group control-group-actions" role="group" aria-label="Camera and playback">
            <span className="control-group-label">Camera and playback</span>
            <div className="machine-action-row">
              <button type="button" onClick={onResetCamera}>Reset camera</button>
              <button type="button" onClick={onTogglePlayback} disabled={playbackDisabled}>
                {reducedMotion
                  ? "Machine playback paused"
                  : mode === "exploded-signal"
                    ? "Overview required to play"
                    : playing
                      ? "Pause"
                      : "Play"}
              </button>
            </div>
          </div>
        </div>
      </details>

      <article className={`measurement-bridge state-${measurement.comparisonGlyph}`} aria-labelledby="measurement-bridge-title">
        <div className="measurement-bridge-heading">
          <div>
            <p className="section-kicker">Selected measurement</p>
            <h3 id="measurement-bridge-title">{measurement.channelLabel}</h3>
          </div>
          <span className="channel-id">{measurement.channelId}</span>
        </div>
        <dl>
          <div><dt>Current RMS</dt><dd>{displayValue(measurement.currentRms, measurement.units)}</dd></div>
          <div><dt>Fixed mean</dt><dd>{displayValue(measurement.fixedMean, measurement.units)}</dd></div>
          <div><dt>σ</dt><dd>{displayValue(measurement.standardDeviation, measurement.units)}</dd></div>
          <div><dt>Upper rule</dt><dd>{displayValue(measurement.upperThreshold, measurement.units)}</dd></div>
        </dl>
        <p className="measurement-comparison">
          <span className="comparison-mark" aria-hidden="true" />
          {measurement.comparisonLabel}
        </p>
        {exceededChannels.length > 0 && (
          <p className="global-exceeded-note">
            Above upper demo threshold: <strong>{exceededChannels.join(", ")}</strong>
          </p>
        )}
      </article>

      <p className="motion-boundary">
        Explanatory visualization — motion visually amplified; not reconstructed from sensor data.
      </p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
    </section>
  );
}
