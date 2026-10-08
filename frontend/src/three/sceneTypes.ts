import {
  STATION_IDS,
  type AxisId,
  type ConveyorSceneFrame,
  type ModelMode as DomainModelMode,
  type StationId as DomainStationId,
} from "../domain/conveyorScene";

export type StationId = DomainStationId;
export type MeasurementAxis = AxisId;
export type ModelMode = DomainModelMode;

export { STATION_IDS };

export interface ChannelRenderState {
  readonly response01: number;
  readonly pulse01: number;
  readonly approaching: boolean;
  readonly equal: boolean;
  readonly exceeded: boolean;
}

export interface StationRenderState {
  readonly id: StationId;
  readonly x: ChannelRenderState;
  readonly y: ChannelRenderState;
}

/**
 * Structural renderer input. A3's pure domain adapter can be passed directly as
 * long as it exposes these presentation fields; Three.js never derives detector
 * decisions from rounded display values.
 */
export interface ConveyorModelState {
  readonly fixtureKey: string;
  readonly frameIndex: number;
  readonly operating: {
    readonly elapsedMs: number;
    readonly beltSpeedMetersPerSecond: number;
  };
  readonly selection: {
    readonly stationId: StationId;
    readonly axis: MeasurementAxis;
    readonly channelIndex: number;
  };
  readonly baselineReady: boolean;
  readonly stations: readonly StationRenderState[];
}

export function modelStateFromSceneFrame(frame: ConveyorSceneFrame): ConveyorModelState {
  return {
    fixtureKey: frame.fixtureKey,
    frameIndex: frame.frameIndex,
    operating: {
      elapsedMs: frame.operating.timeSeconds * 1_000,
      beltSpeedMetersPerSecond: frame.operating.beltSpeedMetersPerSecond,
    },
    selection: {
      stationId: frame.selection.stationId,
      axis: frame.selection.axisId,
      channelIndex: frame.selection.channelIndex,
    },
    baselineReady: frame.baseline.ready,
    stations: frame.stations.map((station) => {
      const channel = (axis: "x" | "y"): ChannelRenderState => {
        const state = station[axis];
        return {
          response01: state.response01,
          pulse01: state.pulse01,
          approaching: state.comparisonGlyph === "approaching",
          equal: state.comparisonGlyph === "equal",
          exceeded: state.exceeded,
        };
      };
      return {
        id: station.id,
        x: channel("x"),
        y: channel("y"),
      };
    }),
  };
}
