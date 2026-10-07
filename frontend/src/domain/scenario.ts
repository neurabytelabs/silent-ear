import type {
  FixtureFrame,
  RmsVector,
  ScenarioFixture,
  ScenarioId,
} from "../fixtures/scenarios";
import { SCENARIO_FIXTURES } from "../fixtures/scenarios";
import { DRIVE_TURNS_PER_SECOND } from "./conveyorKinematics";

export const CHANNEL_LABELS = [
  "Bearing 1 · X",
  "Bearing 1 · Y",
  "Bearing 2 · X",
  "Bearing 2 · Y",
  "Bearing 3 · X",
  "Bearing 3 · Y",
  "Bearing 4 · X",
  "Bearing 4 · Y",
] as const;

export type ExperienceStage =
  | "not-started"
  | "learning-demo-baseline"
  | "comparing-rms"
  | "within-demo-reference"
  | "approaching-demo-threshold"
  | "demo-threshold-exceeded"
  | "scenario-complete";

export interface ChannelStatistics {
  readonly channel: number;
  readonly label: (typeof CHANNEL_LABELS)[number];
  readonly rms: number;
  readonly mean: number | null;
  readonly standardDeviation: number | null;
  readonly upperThreshold: number | null;
  readonly signedZScore: number | null;
  readonly absoluteZScore: number | null;
  readonly upperThresholdExceeded: boolean;
}

export interface BaselineStatistics {
  readonly ready: boolean;
  readonly samplesSeen: number;
  readonly samplesRequired: number;
  readonly mean: RmsVector | null;
  readonly standardDeviation: RmsVector | null;
  readonly upperThreshold: RmsVector | null;
}

export interface ScenarioSnapshot {
  readonly fixtureContract: ScenarioFixture["contract"];
  readonly scenarioId: ScenarioId;
  readonly scenarioTitle: string;
  readonly stage: ExperienceStage;
  readonly statusLabel: string;
  readonly explanation: string;
  readonly dataLabel: "CONTROLLED DEMO";
  readonly currentReadingAvailable: boolean;
  readonly currentRms: RmsVector;
  readonly rmsTimeline: readonly FixtureFrame[];
  readonly baseline: BaselineStatistics;
  readonly channels: readonly ChannelStatistics[];
  readonly thresholdSigma: number;
  readonly thresholdExceededChannels: readonly number[];
  /** Null until the fixed demo baseline is ready. */
  readonly demoDeviationScore: number | null;
  readonly selectedChannel: number;
  readonly maxAbsoluteZScore: number | null;
  readonly scrubber: {
    readonly value: number;
    readonly min: 0;
    readonly max: 1;
    readonly step: number;
    readonly frameIndex: number;
    readonly elapsedMs: number;
    readonly durationMs: number;
  };
  readonly motion: {
    readonly rotorTurnsPerSecond: number;
    readonly vibrationAmplitude: number;
    readonly materialResponse: number;
    readonly sensorPulse: number;
  };
  readonly visualizationLabel: "Explanatory visualization — motion visually amplified; not reconstructed from sensor data.";
}

export interface SnapshotOptions {
  readonly thresholdSigma?: number;
  readonly hasStarted?: boolean;
  readonly complete?: boolean;
  readonly selectedChannel?: number;
}

interface FixedReference {
  readonly mean: RmsVector;
  readonly standardDeviation: RmsVector;
}

const VISUALIZATION_LABEL =
  "Explanatory visualization — motion visually amplified; not reconstructed from sensor data." as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function asRmsVector(values: readonly number[]): RmsVector {
  if (values.length !== CHANNEL_LABELS.length) {
    throw new Error(`Expected ${CHANNEL_LABELS.length} RMS channels, received ${values.length}.`);
  }
  return values as RmsVector;
}

function fixedReference(fixture: ScenarioFixture): FixedReference {
  const samples = fixture.frames.slice(0, fixture.baselineSampleCount);
  if (samples.length !== fixture.baselineSampleCount || samples.length === 0) {
    throw new Error(`Fixture ${fixture.id} does not contain its declared baseline window.`);
  }

  const mean = asRmsVector(
    CHANNEL_LABELS.map((_, channel) =>
      samples.reduce((sum, frame) => sum + frame.rms[channel], 0) / samples.length,
    ),
  );
  const standardDeviation = asRmsVector(
    CHANNEL_LABELS.map((_, channel) => {
      const variance =
        samples.reduce((sum, frame) => {
          const difference = frame.rms[channel] - mean[channel];
          return sum + difference * difference;
        }, 0) / samples.length;
      return Math.sqrt(variance);
    }),
  );

  return { mean, standardDeviation };
}

function scoreFromMaxAbsoluteZ(maxAbsoluteZ: number, thresholdSigma: number): number {
  if (maxAbsoluteZ <= thresholdSigma) return 100;
  if (maxAbsoluteZ >= 15) return 0;
  return clamp(100 * (1 - (maxAbsoluteZ - thresholdSigma) / (15 - thresholdSigma)), 0, 100);
}

function stageExplanation(stage: ExperienceStage, checkpoint: FixtureFrame["checkpoint"]): string {
  if (checkpoint === "at-threshold") {
    return "At the demo threshold — not exceeded. The rule changes state only when the RMS value is strictly above the upper threshold.";
  }
  switch (stage) {
    case "not-started":
      return "The controlled fixture is ready. Start or scrub to inspect its RMS records.";
    case "learning-demo-baseline":
      return "The first fixed set of controlled RMS records is building the demo reference; no score is shown yet.";
    case "comparing-rms":
      return "The first post-baseline RMS record is being compared with the fixed mean and upper threshold.";
    case "within-demo-reference":
      return "All current RMS channels remain at or below their selected upper statistical thresholds.";
    case "approaching-demo-threshold":
      return "A controlled RMS channel is nearing the selected upper statistical threshold.";
    case "demo-threshold-exceeded":
      return "At least one controlled RMS channel is above mean plus the selected sigma multiplier.";
    case "scenario-complete":
      return "The controlled timeline is complete and remains available for inspection or replay.";
  }
}

function stageLabel(stage: ExperienceStage): string {
  const labels: Record<ExperienceStage, string> = {
    "not-started": "Controlled demo ready",
    "learning-demo-baseline": "Learning demo baseline",
    "comparing-rms": "Comparing RMS values",
    "within-demo-reference": "Within demo reference",
    "approaching-demo-threshold": "Approaching demo threshold",
    "demo-threshold-exceeded": "Demo threshold exceeded",
    "scenario-complete": "Scenario complete — inspect or replay",
  };
  return labels[stage];
}

export function getFixture(id: ScenarioId): ScenarioFixture {
  return SCENARIO_FIXTURES[id];
}

export function createScenarioSnapshot(
  scenarioId: ScenarioId,
  progress: number,
  options: SnapshotOptions = {},
): ScenarioSnapshot {
  const fixture = getFixture(scenarioId);
  const boundedProgress = clamp(Number.isFinite(progress) ? progress : 0, 0, 1);
  const hasStarted = options.hasStarted ?? true;
  const thresholdSigma = clamp(
    options.thresholdSigma ?? fixture.defaultThresholdSigma,
    1,
    6,
  );
  const lastFrameIndex = fixture.frames.length - 1;
  const frameIndex = hasStarted ? Math.round(boundedProgress * lastFrameIndex) : 0;
  const frame = fixture.frames[frameIndex];
  const samplesSeen = hasStarted
    ? Math.min(frameIndex + 1, fixture.baselineSampleCount)
    : 0;
  const baselineReady = hasStarted && frameIndex >= fixture.baselineSampleCount;
  const reference = fixedReference(fixture);
  const upperThreshold = asRmsVector(
    reference.mean.map(
      (mean, channel) => mean + reference.standardDeviation[channel] * thresholdSigma,
    ),
  );

  const channels: ChannelStatistics[] = frame.rms.map((rms, channel) => {
    if (!baselineReady) {
      return {
        channel,
        label: CHANNEL_LABELS[channel],
        rms,
        mean: null,
        standardDeviation: null,
        upperThreshold: null,
        signedZScore: null,
        absoluteZScore: null,
        upperThresholdExceeded: false,
      };
    }
    const standardDeviation = reference.standardDeviation[channel];
    const signedZScore = standardDeviation === 0 ? 0 : (rms - reference.mean[channel]) / standardDeviation;
    return {
      channel,
      label: CHANNEL_LABELS[channel],
      rms,
      mean: reference.mean[channel],
      standardDeviation,
      upperThreshold: upperThreshold[channel],
      signedZScore,
      absoluteZScore: Math.abs(signedZScore),
      // This deliberately mirrors the Rust detector's upper-only threshold comparison.
      upperThresholdExceeded: rms > upperThreshold[channel],
    };
  });

  const derivedSelectedChannel = baselineReady
    ? channels.reduce((selected, channel) =>
        (channel.absoluteZScore ?? 0) > (selected.absoluteZScore ?? 0) ? channel : selected,
      ).channel
    : frame.rms.reduce(
        (selected, rms, channel) => (rms > frame.rms[selected] ? channel : selected),
        0,
      );
  const selectedChannel = options.selectedChannel !== undefined &&
      Number.isInteger(options.selectedChannel) &&
      options.selectedChannel >= 0 &&
      options.selectedChannel < CHANNEL_LABELS.length
    ? options.selectedChannel
    : derivedSelectedChannel;
  const maxAbsoluteZScore = baselineReady
    ? Math.max(...channels.map((channel) => channel.absoluteZScore ?? 0))
    : null;
  const selectedUpperZScore = baselineReady
    ? channels[selectedChannel].signedZScore ?? 0
    : null;
  const thresholdExceededChannels = channels
    .filter((channel) => channel.upperThresholdExceeded)
    .map((channel) => channel.channel);

  let stage: ExperienceStage;
  if (!hasStarted) {
    stage = "not-started";
  } else if (!baselineReady) {
    stage = "learning-demo-baseline";
  } else if (options.complete) {
    stage = "scenario-complete";
  } else if (thresholdExceededChannels.length > 0) {
    stage = "demo-threshold-exceeded";
  } else if ((selectedUpperZScore ?? 0) >= thresholdSigma * 0.8) {
    stage = "approaching-demo-threshold";
  } else if (frameIndex === fixture.baselineSampleCount) {
    stage = "comparing-rms";
  } else {
    stage = "within-demo-reference";
  }

  const response = baselineReady
    ? clamp(((selectedUpperZScore ?? 0) - 1) / Math.max(1, thresholdSigma), 0, 1)
    : 0.12 * (samplesSeen / fixture.baselineSampleCount);
  const score = maxAbsoluteZScore === null
    ? null
    : scoreFromMaxAbsoluteZ(maxAbsoluteZScore, thresholdSigma);

  return {
    fixtureContract: fixture.contract,
    scenarioId,
    scenarioTitle: fixture.title,
    stage,
    statusLabel: stageLabel(stage),
    explanation: stageExplanation(stage, frame.checkpoint),
    dataLabel: "CONTROLLED DEMO",
    currentReadingAvailable: hasStarted,
    currentRms: frame.rms,
    rmsTimeline: hasStarted ? fixture.frames.slice(0, frameIndex + 1) : [],
    baseline: {
      ready: baselineReady,
      samplesSeen,
      samplesRequired: fixture.baselineSampleCount,
      mean: baselineReady ? reference.mean : null,
      standardDeviation: baselineReady ? reference.standardDeviation : null,
      upperThreshold: baselineReady ? upperThreshold : null,
    },
    channels,
    thresholdSigma,
    thresholdExceededChannels,
    demoDeviationScore: stage === "comparing-rms" ? null : score,
    selectedChannel,
    maxAbsoluteZScore,
    scrubber: {
      value: lastFrameIndex === 0 ? 0 : frameIndex / lastFrameIndex,
      min: 0,
      max: 1,
      step: lastFrameIndex === 0 ? 1 : 1 / lastFrameIndex,
      frameIndex,
      elapsedMs: frame.elapsedMs,
      durationMs: fixture.frames[lastFrameIndex].elapsedMs,
    },
    motion: {
      // Nominal mechanics are fixed authored operating parameters. RMS may
      // affect only the explicitly amplified explanatory response below.
      rotorTurnsPerSecond: DRIVE_TURNS_PER_SECOND,
      // Display-space amplitude is intentionally amplified and always paired with VISUALIZATION_LABEL.
      vibrationAmplitude: 0.003 + response * 0.032,
      materialResponse: response,
      sensorPulse: baselineReady ? clamp((selectedUpperZScore ?? 0) / thresholdSigma, 0.08, 1) : 0.18,
    },
    visualizationLabel: VISUALIZATION_LABEL,
  };
}
