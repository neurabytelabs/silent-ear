import type { MeasurementAxis, ModelMode, StationId } from "./MachineControls";

interface ConveyorSchematicProps {
  readonly mode: ModelMode;
  readonly station: StationId;
  readonly axis: MeasurementAxis;
  readonly onStationSelect?: (station: StationId) => void;
}

const STATIONS: readonly { readonly id: StationId; readonly channels: string; readonly className: string }[] = [
  { id: "B1", channels: "B1_X · B1_Y", className: "station-b1" },
  { id: "B2", channels: "B2_X · B2_Y", className: "station-b2" },
  { id: "B3", channels: "B3_X · B3_Y", className: "station-b3" },
  { id: "B4", channels: "B4_X · B4_Y", className: "station-b4" },
];

export function ConveyorSchematic({ mode, station, axis, onStationSelect }: ConveyorSchematicProps) {
  return (
    <div className="conveyor-schematic" data-mode={mode} data-selected-station={station}>
      <div className="schematic-heading">
        <div>
          <p className="section-kicker">Complete two-dimensional machine view</p>
          <h3>Conveyor test cell</h3>
        </div>
        <span className="schematic-selection">{station} · {axis}</span>
      </div>

      <div className="schematic-stage">
        <svg viewBox="0 0 800 360" role="img" aria-labelledby="schematic-title schematic-desc">
          <title id="schematic-title">Full conveyor test cell schematic</title>
          <desc id="schematic-desc">
            Motor and coupling drive a two-drum conveyor with four bearing stations, four sensor nodes and retained carriers.
          </desc>
          <g className="schematic-floor">
            <path d="M58 304H744" />
            <path d="M118 304L152 332M270 304L294 332M526 304L502 332M686 304L652 332" />
          </g>
          <g className="schematic-frame">
            <path d="M198 246H666M224 262H640" />
            <path d="M236 262V304M374 262V304M516 262V304M628 262V304" />
          </g>
          <g className="schematic-drive">
            <rect x="62" y="190" width="92" height="76" rx="14" />
            <path d="M78 204V252M92 204V252M106 204V252M120 204V252" />
            <rect x="150" y="211" width="42" height="34" rx="8" />
            <path d="M192 228H220" />
            <text x="72" y="184">MOTOR</text>
            <text x="148" y="264">COUPLING</text>
          </g>
          <g className="schematic-belt">
            <path d="M230 125H632A85 85 0 0 1 632 295H230A85 85 0 0 1 230 125Z" />
            <path className="belt-inner" d="M230 145H632A65 65 0 0 1 632 275H230A65 65 0 0 1 230 145Z" />
            <circle cx="230" cy="210" r="64" />
            <circle cx="632" cy="210" r="64" />
            <path className="belt-direction" d="M330 134H470M450 120L470 134L450 148" />
          </g>
          <g className="schematic-carriers">
            <rect x="286" y="100" width="66" height="32" rx="7" />
            <rect x="406" y="100" width="66" height="32" rx="7" />
            <rect x="526" y="100" width="66" height="32" rx="7" />
            <rect x="360" y="278" width="66" height="26" rx="7" />
          </g>
          <g className="schematic-sensors">
            <path d="M216 166V112M244 166V86M618 166V112M646 166V86" />
            <rect x="207" y="96" width="18" height="18" rx="4" />
            <rect x="235" y="70" width="18" height="18" rx="4" />
            <rect x="609" y="96" width="18" height="18" rx="4" />
            <rect x="637" y="70" width="18" height="18" rx="4" />
          </g>
          <g className="schematic-explode-guides">
            <path d="M110 174V142M422 116V72M646 72V44" />
          </g>
        </svg>

        <div className="schematic-station-layer" aria-label="Conveyor bearing stations">
          {STATIONS.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={`${candidate.className}${candidate.id === station ? " is-selected" : ""}`}
              aria-pressed={candidate.id === station}
              aria-label={`Bearing ${candidate.id.slice(1)}; channels ${candidate.channels}`}
              onClick={() => onStationSelect?.(candidate.id)}
            >
              <strong>{candidate.id}</strong>
              <small>X · Y</small>
            </button>
          ))}
        </div>
      </div>

      <ul className="schematic-channel-map" aria-label="Bearing station to RMS channel mapping">
        {STATIONS.map((candidate) => (
          <li key={candidate.id} className={candidate.id === station ? "is-selected" : undefined}>
            <span>Bearing {candidate.id.slice(1)}</span>
            <strong>{candidate.channels}</strong>
          </li>
        ))}
      </ul>

      <ol className="schematic-signal-key" aria-label="Controlled RMS comparison path">
        <li><span>01</span>Controlled RMS fixture</li>
        <li><span>02</span>Eight per-window RMS values</li>
        <li><span>03</span>Fixed reference mean and σ</li>
        <li><span>04</span>Upper mean + kσ comparison</li>
        <li><span>05</span>Demo threshold state</li>
      </ol>

      <p className="schematic-mode-note">
        {mode === "full-assembly"
          ? "Full assembly keeps the drive, belt, stations and sensors in their working spatial relationship."
          : mode === "inspect-station"
            ? `Inspecting Bearing ${station.slice(1)} with the ${axis} measurement direction selected.`
            : `Exploded signal view separates four explanatory layers around Bearing ${station.slice(1)}; it is not a service instruction.`}
      </p>
    </div>
  );
}
