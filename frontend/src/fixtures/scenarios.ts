export const FIXTURE_CONTRACT = "silent-ear-explainer@1.0.0" as const;

export type ScenarioId =
  | "within-reference-v1"
  | "controlled-deviation-v1"
  | "noisy-pressure-v1";

export type RmsVector = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export const CHANNEL_IDS = [
  "B1_X", "B1_Y", "B2_X", "B2_Y", "B3_X", "B3_Y", "B4_X", "B4_Y",
] as const;

export type FixtureCheckpoint =
  | "baseline"
  | "comparing"
  | "within"
  | "approach"
  | "at-threshold"
  | "exceeded"
  | "returned";

export interface FixtureFrame {
  readonly stepId: string;
  readonly elapsedMs: number;
  readonly baselineMember: boolean;
  readonly checkpoint: FixtureCheckpoint;
  /** Eight per-window RMS values. These records are not raw waveforms. */
  readonly rms: RmsVector;
}

export interface ScenarioFixture {
  readonly contract: typeof FIXTURE_CONTRACT;
  readonly id: ScenarioId;
  readonly title: string;
  readonly description: string;
  readonly channelIds: typeof CHANNEL_IDS;
  readonly units: "demo units";
  readonly baselineSampleCount: number;
  readonly defaultThresholdSigma: number;
  readonly frames: readonly FixtureFrame[];
}

const CHANNEL_BASE: RmsVector = [
  0.112, 0.121, 0.108, 0.116, 0.104, 0.119, 0.111, 0.107,
];

const CHANNEL_SCALE: RmsVector = [
  0.006, 0.005, 0.0048, 0.0055, 0.0042, 0.0052, 0.0046, 0.0044,
];

// Fixed, deterministic variation used by the first six records in every fixture.
// This establishes the same reference for all three controlled scenarios.
const BASELINE_OFFSETS = [-1.25, -0.45, 0.2, 1.15, 0.65, -0.3] as const;

function rmsAtZ(zByChannel: readonly number[]): RmsVector {
  return CHANNEL_BASE.map((base, channel) =>
    Number((base + CHANNEL_SCALE[channel] * (zByChannel[channel] ?? 0)).toFixed(6)),
  ) as unknown as RmsVector;
}

function baselineFrames(id: ScenarioId): FixtureFrame[] {
  return BASELINE_OFFSETS.map((offset, index) => ({
    stepId: `${id}:t+${String(index).padStart(2, "0")}`,
    elapsedMs: index * 1_000,
    baselineMember: true,
    checkpoint: "baseline" as const,
    rms: Object.freeze(rmsAtZ(
      CHANNEL_BASE.map((_, channel) =>
        offset * (channel % 2 === 0 ? 1 : -0.82) + (channel - 3.5) * 0.025,
      ),
    )) as RmsVector,
  }));
}

function referenceFrom(frames: readonly FixtureFrame[]): {
  mean: RmsVector;
  standardDeviation: RmsVector;
} {
  const mean = CHANNEL_BASE.map((_, channel) =>
    frames.reduce((sum, frame) => sum + frame.rms[channel], 0) / frames.length,
  ) as unknown as RmsVector;
  const standardDeviation = CHANNEL_BASE.map((_, channel) =>
    Math.sqrt(
      frames.reduce((sum, frame) => {
        const difference = frame.rms[channel] - mean[channel];
        return sum + difference * difference;
      }, 0) / frames.length,
    ),
  ) as unknown as RmsVector;
  return { mean, standardDeviation };
}

function buildFixture(
  id: ScenarioId,
  title: string,
  description: string,
  inferenceZ: readonly (readonly number[])[],
): ScenarioFixture {
  const baseline = baselineFrames(id);
  const reference = referenceFrom(baseline);
  let hasExceeded = false;
  const frames: FixtureFrame[] = [
    ...baseline,
    ...inferenceZ.map((zByChannel, index) => {
      const leadingZ = zByChannel[0] ?? 0;
      const checkpoint: FixtureCheckpoint = index === 0
        ? "comparing"
        : leadingZ === 3
          ? "at-threshold"
          : leadingZ > 3
            ? "exceeded"
            : hasExceeded
              ? "returned"
              : leadingZ >= 2.4
                ? "approach"
                : "within";
      if (leadingZ > 3) hasExceeded = true;
      const rms = reference.mean.map((mean, channel) =>
        mean + reference.standardDeviation[channel] * (zByChannel[channel] ?? 0),
      ) as unknown as RmsVector;
      const frameIndex = BASELINE_OFFSETS.length + index;
      return Object.freeze({
        stepId: `${id}:t+${String(frameIndex).padStart(2, "0")}`,
        elapsedMs: frameIndex * 1_000,
        baselineMember: false,
        checkpoint,
        rms: Object.freeze(rms) as RmsVector,
      });
    }),
  ];

  return Object.freeze({
    contract: FIXTURE_CONTRACT,
    id,
    title,
    description,
    channelIds: CHANNEL_IDS,
    units: "demo units",
    baselineSampleCount: BASELINE_OFFSETS.length,
    defaultThresholdSigma: 3,
    frames: Object.freeze(frames),
  });
}

const WITHIN_REFERENCE = buildFixture(
  "within-reference-v1",
  "Within demo reference",
  "Ordinary controlled RMS variation remains below the selected upper threshold.",
  [
    [0.15, -0.2, 0.05, 0.1, -0.1, 0.2, 0.0, -0.15],
    [0.55, -0.45, 0.3, 0.2, -0.35, 0.4, 0.25, -0.2],
    [0.85, 0.25, -0.35, 0.65, 0.15, -0.4, 0.5, 0.1],
    [1.05, 0.4, 0.2, 0.75, -0.2, 0.55, 0.3, -0.15],
    [0.65, -0.25, 0.45, 0.35, 0.1, -0.3, 0.6, 0.25],
    [0.3, 0.1, -0.2, 0.5, 0.35, 0.2, -0.1, 0.4],
    [0.45, 0.3, 0.15, 0.25, -0.1, 0.5, 0.35, 0.2],
    [0.2, -0.1, 0.35, 0.45, 0.2, 0.3, 0.1, 0.25],
  ],
);

const CONTROLLED_DEVIATION = buildFixture(
  "controlled-deviation-v1",
  "Controlled synthetic RMS deviation",
  "Selected synthetic RMS channels rise through the fixed statistical reference.",
  [
    [0.1, 0.0, 0.15, -0.1, 0.05, 0.1, -0.1, 0.0],
    [0.65, 0.1, 0.3, 0.05, 0.2, 0.15, 0.0, -0.1],
    [1.25, 0.25, 0.6, 0.15, 0.35, 0.2, 0.1, 0.0],
    [2.05, 0.35, 1.0, 0.3, 0.45, 0.25, 0.15, 0.1],
    [2.65, 0.45, 1.35, 0.4, 0.55, 0.35, 0.2, 0.15],
    [3.0, 0.5, 1.65, 0.5, 0.65, 0.4, 0.25, 0.2],
    [4.2, 0.6, 2.1, 0.55, 0.8, 0.5, 0.35, 0.25],
    [5.4, 0.65, 2.55, 0.65, 0.9, 0.55, 0.4, 0.3],
    [6.8, 0.75, 3.2, 0.7, 1.0, 0.6, 0.45, 0.35],
    [8.1, 0.8, 3.8, 0.75, 1.1, 0.7, 0.5, 0.4],
    [2.0, 0.45, 1.1, 0.35, 0.5, 0.3, 0.2, 0.1],
    [0.8, 0.25, 0.45, 0.2, 0.25, 0.15, 0.1, 0.05],
  ],
);

const NOISY_ENVIRONMENT = buildFixture(
  "noisy-pressure-v1",
  "Noisy environment / false-positive pressure",
  "Controlled background variation tests sensitivity without claiming production-grade noise rejection.",
  [
    [0.2, -0.3, 0.4, -0.2, 0.15, -0.1, 0.25, -0.15],
    [1.35, -1.05, 0.8, -0.9, 1.1, -0.7, 0.65, -0.5],
    [-1.55, 1.4, -1.15, 1.2, -0.85, 0.95, -1.05, 0.75],
    [2.1, -1.7, 1.35, -1.1, 1.65, -1.25, 1.4, -0.8],
    [-2.25, 1.9, -1.7, 1.45, -1.5, 1.35, -1.25, 1.1],
    [2.5, -2.15, 1.8, -1.65, 2.0, -1.45, 1.75, -1.25],
    [2.75, -2.25, 2.1, -1.8, 2.2, -1.6, 1.9, -1.4],
    [2.8, -1.9, 2.3, -1.5, 2.45, -1.35, 2.1, -1.1],
    [2.9, -1.4, 2.55, -1.2, 2.7, -1.0, 2.25, -0.9],
    [2.75, -1.1, 2.8, -0.9, 2.9, -0.75, 2.4, -0.6],
  ],
);

export const SCENARIO_FIXTURES: Readonly<Record<ScenarioId, ScenarioFixture>> =
  Object.freeze({
    "within-reference-v1": WITHIN_REFERENCE,
    "controlled-deviation-v1": CONTROLLED_DEVIATION,
    "noisy-pressure-v1": NOISY_ENVIRONMENT,
  });

export const SCENARIO_ORDER: readonly ScenarioId[] = [
  "within-reference-v1",
  "controlled-deviation-v1",
  "noisy-pressure-v1",
];
