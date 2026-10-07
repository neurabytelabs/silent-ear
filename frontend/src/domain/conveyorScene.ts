import { CHANNEL_IDS, SCENARIO_FIXTURES, type ScenarioId } from "../fixtures/scenarios";
import type { ChannelStatistics, ScenarioSnapshot } from "./scenario";
import {
  CONVEYOR_CONSTANTS,
  beltPathPoseAtDistance,
  kinematicsAtTime,
  type ConveyorKinematicFrame,
} from "./conveyorKinematics";

export {
  CONVEYOR_CONSTANTS,
  beltPathPoseAtDistance,
  kinematicsAtTime,
};
export type {
  BeltPathPose,
  BeltPathSegment,
  CarrierKinematicState,
  ConveyorKinematicFrame,
  ConveyorVector3,
} from "./conveyorKinematics";

export const STATION_IDS = ["B1", "B2", "B3", "B4"] as const;
export const AXIS_IDS = ["X", "Y"] as const;
export const MODEL_MODES = [
  "full-assembly",
  "inspect-station",
  "exploded-signal",
] as const;

export type StationId = (typeof STATION_IDS)[number];
export type AxisId = (typeof AXIS_IDS)[number];
export type ModelMode = (typeof MODEL_MODES)[number];
export type ChannelIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ChannelId = (typeof CHANNEL_IDS)[number];
export type ComparisonGlyph =
  | "unavailable"
  | "within"
  | "approaching"
  | "equal"
  | "exceeded";

export interface StationAxisSelection {
  readonly stationId: StationId;
  readonly axisId: AxisId;
  readonly channelIndex: ChannelIndex;
  readonly channelId: ChannelId;
}

export interface ChannelSceneState {
  readonly channelIndex: ChannelIndex;
  readonly channelId: ChannelId;
  readonly axisId: AxisId;
  readonly selected: boolean;
  readonly response01: number;
  readonly pulse01: number;
  readonly exceeded: boolean;
  readonly comparisonGlyph: ComparisonGlyph;
}

export interface StationSceneState {
  readonly id: StationId;
  readonly selected: boolean;
  readonly selectedAxis: AxisId | null;
  readonly anyAxisExceeded: boolean;
  readonly x: ChannelSceneState;
  readonly y: ChannelSceneState;
}

export interface ConveyorSceneFrame {
  readonly fixtureKey: string;
  readonly fixtureContract: ScenarioSnapshot["fixtureContract"];
  readonly scenarioId: ScenarioSnapshot["scenarioId"];
  readonly frameIndex: number;
  readonly stage: ScenarioSnapshot["stage"];
  readonly source: "CONTROLLED DEMO";
  readonly operating: ConveyorKinematicFrame & {
    readonly playing: boolean;
    readonly reducedMotion: boolean;
    readonly driveOmegaRadiansPerSecond: number;
    readonly idlerOmegaRadiansPerSecond: number;
    readonly motorOmegaRadiansPerSecond: number;
  };
  readonly selection: StationAxisSelection;
  readonly baseline: {
    readonly ready: boolean;
    readonly progress01: number;
  };
  readonly viewMode: ModelMode;
  readonly stations: readonly [
    StationSceneState,
    StationSceneState,
    StationSceneState,
    StationSceneState,
  ];
  readonly exceededChannelIndices: readonly ChannelIndex[];
  readonly disclosure: "EXPLANATORY_AMPLIFIED_MOTION_NOT_RECONSTRUCTED";
}

export interface ConveyorSceneFrameOptions {
  readonly playing: boolean;
  readonly reducedMotion: boolean;
  readonly modelMode: ModelMode;
  readonly selectedStation: StationId;
  readonly selectedAxis: AxisId;
  /** Defaults to the fixture-relative canonical time for exact paused scrubbing. */
  readonly operatingTimeSeconds?: number;
}

export interface ScenarioResetState {
  readonly scenarioId: ScenarioId;
  readonly progress: 0;
  readonly hasStarted: false;
  readonly complete: false;
  readonly thresholdSigma: number;
  readonly playing: false;
  readonly selectedStation: "B1";
  readonly selectedAxis: "X";
  readonly selectedChannel: 0;
  readonly modelMode: "full-assembly";
  readonly operatingTimeSeconds: 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function assertChannelIndex(channelIndex: number): asserts channelIndex is ChannelIndex {
  if (!Number.isInteger(channelIndex) || channelIndex < 0 || channelIndex > 7) {
    throw new RangeError("RMS channel index must be an integer from 0 through 7.");
  }
}

export function channelIndexFor(stationId: StationId, axisId: AxisId): ChannelIndex {
  const stationIndex = STATION_IDS.indexOf(stationId);
  const axisIndex = AXIS_IDS.indexOf(axisId);
  if (stationIndex < 0 || axisIndex < 0) {
    throw new RangeError("Station and axis must use the canonical B1–B4 and X/Y values.");
  }
  return (stationIndex * 2 + axisIndex) as ChannelIndex;
}

export function stationAxisForChannel(channelIndex: number): StationAxisSelection {
  assertChannelIndex(channelIndex);
  const stationId = STATION_IDS[Math.floor(channelIndex / 2)];
  const axisId = AXIS_IDS[channelIndex % 2];
  return {
    stationId,
    axisId,
    channelIndex,
    channelId: CHANNEL_IDS[channelIndex],
  };
}

export function channelsForStation(
  stationId: StationId,
): readonly [ChannelIndex, ChannelIndex] {
  return [channelIndexFor(stationId, "X"), channelIndexFor(stationId, "Y")];
}

export function comparisonGlyphFor(
  channel: ChannelStatistics,
  baselineReady: boolean,
  thresholdSigma: number,
): ComparisonGlyph {
  if (
    !baselineReady ||
    channel.signedZScore === null ||
    channel.upperThreshold === null
  ) {
    return "unavailable";
  }
  if (channel.upperThresholdExceeded) return "exceeded";
  // The controlled equality fixture is derived from the same immutable
  // reference arithmetic as this threshold; do not broaden strict equality
  // with a display-rounding epsilon.
  if (channel.rms === channel.upperThreshold) return "equal";
  if (channel.signedZScore >= thresholdSigma * 0.8) return "approaching";
  return "within";
}

function responseFor(channel: ChannelStatistics, thresholdSigma: number): number {
  if (channel.signedZScore === null) return 0;
  return clamp(Math.max(0, channel.signedZScore) / Math.max(thresholdSigma, 0.000001), 0, 1);
}

function pulseFor(glyph: ComparisonGlyph, response01: number, selected: boolean): number {
  if (!selected || glyph === "unavailable") return 0;
  if (glyph === "exceeded") return 1;
  if (glyph === "equal") return 0.82;
  if (glyph === "approaching") return 0.62 + response01 * 0.18;
  return 0.12 + response01 * 0.28;
}

function channelSceneState(
  snapshot: ScenarioSnapshot,
  channelIndex: ChannelIndex,
  selectedChannel: ChannelIndex,
): ChannelSceneState {
  const channel = snapshot.channels[channelIndex];
  const selection = stationAxisForChannel(channelIndex);
  const glyph = comparisonGlyphFor(
    channel,
    snapshot.baseline.ready,
    snapshot.thresholdSigma,
  );
  const response01 = snapshot.baseline.ready
    ? responseFor(channel, snapshot.thresholdSigma)
    : 0;
  const selected = channelIndex === selectedChannel;
  return Object.freeze({
    channelIndex,
    channelId: selection.channelId,
    axisId: selection.axisId,
    selected,
    response01,
    pulse01: pulseFor(glyph, response01, selected),
    exceeded: glyph === "exceeded",
    comparisonGlyph: glyph,
  });
}

function stationSceneState(
  snapshot: ScenarioSnapshot,
  stationId: StationId,
  selectedStation: StationId,
  selectedChannel: ChannelIndex,
): StationSceneState {
  const [xIndex, yIndex] = channelsForStation(stationId);
  const x = channelSceneState(snapshot, xIndex, selectedChannel);
  const y = channelSceneState(snapshot, yIndex, selectedChannel);
  const selected = stationId === selectedStation;
  return Object.freeze({
    id: stationId,
    selected,
    selectedAxis: selected ? stationAxisForChannel(selectedChannel).axisId : null,
    anyAxisExceeded: x.exceeded || y.exceeded,
    x,
    y,
  });
}

export function canonicalKinematicTime(snapshot: ScenarioSnapshot): number {
  return snapshot.currentReadingAvailable ? snapshot.scrubber.elapsedMs / 1_000 : 0;
}

export function createScenarioResetState(scenarioId: ScenarioId): ScenarioResetState {
  return Object.freeze({
    scenarioId,
    progress: 0,
    hasStarted: false,
    complete: false,
    thresholdSigma: SCENARIO_FIXTURES[scenarioId].defaultThresholdSigma,
    playing: false,
    selectedStation: "B1",
    selectedAxis: "X",
    selectedChannel: 0,
    modelMode: "full-assembly",
    operatingTimeSeconds: 0,
  });
}

export function createConveyorSceneFrame(
  snapshot: ScenarioSnapshot,
  options: ConveyorSceneFrameOptions,
): ConveyorSceneFrame {
  const selection = stationAxisForChannel(
    channelIndexFor(options.selectedStation, options.selectedAxis),
  );
  const timeSeconds = options.operatingTimeSeconds === undefined
    ? canonicalKinematicTime(snapshot)
    : Math.max(0, Number.isFinite(options.operatingTimeSeconds) ? options.operatingTimeSeconds : 0);
  const kinematics = kinematicsAtTime(timeSeconds);
  const stations = STATION_IDS.map((stationId) => stationSceneState(
    snapshot,
    stationId,
    options.selectedStation,
    selection.channelIndex,
  )) as unknown as ConveyorSceneFrame["stations"];
  const exceededChannelIndices = Object.freeze(
    snapshot.thresholdExceededChannels.map((channelIndex) => {
      assertChannelIndex(channelIndex);
      return channelIndex;
    }),
  );

  return Object.freeze({
    fixtureKey: `${snapshot.fixtureContract}:${snapshot.scenarioId}:${snapshot.scrubber.frameIndex}`,
    fixtureContract: snapshot.fixtureContract,
    scenarioId: snapshot.scenarioId,
    frameIndex: snapshot.scrubber.frameIndex,
    stage: snapshot.stage,
    source: "CONTROLLED DEMO",
    operating: Object.freeze({
      ...kinematics,
      playing: options.modelMode === "exploded-signal" ? false : options.playing,
      reducedMotion: options.reducedMotion,
      driveOmegaRadiansPerSecond: CONVEYOR_CONSTANTS.driveOmegaRadiansPerSecond,
      idlerOmegaRadiansPerSecond: CONVEYOR_CONSTANTS.idlerOmegaRadiansPerSecond,
      motorOmegaRadiansPerSecond: CONVEYOR_CONSTANTS.motorOmegaRadiansPerSecond,
    }),
    selection: Object.freeze(selection),
    baseline: Object.freeze({
      ready: snapshot.baseline.ready,
      progress01: clamp(
        snapshot.baseline.samplesSeen / Math.max(1, snapshot.baseline.samplesRequired),
        0,
        1,
      ),
    }),
    viewMode: options.modelMode,
    stations: Object.freeze(stations),
    exceededChannelIndices,
    disclosure: "EXPLANATORY_AMPLIFIED_MOTION_NOT_RECONSTRUCTED",
  });
}
