export type QualityPreference = "auto" | "low" | "balanced" | "high";
export type QualityTier = Exclude<QualityPreference, "auto">;

export interface QualityProfile {
  readonly tier: QualityTier;
  readonly dprCap: number;
  readonly radialSegments: number;
  readonly rollerSegments: number;
  readonly treadCount: number;
  readonly carrierCount: number;
  readonly fastenerDetail: boolean;
  readonly shadows: boolean;
  readonly shadowMapSize: number;
  readonly antialias: boolean;
}

export interface QualityInputs {
  readonly width: number;
  readonly devicePixelRatio: number;
  readonly hardwareConcurrency?: number;
  readonly preference?: QualityPreference;
}

const PROFILES: Readonly<Record<QualityTier, QualityProfile>> = {
  low: {
    tier: "low",
    dprCap: 1,
    radialSegments: 24,
    rollerSegments: 8,
    treadCount: 24,
    carrierCount: 3,
    fastenerDetail: false,
    shadows: false,
    shadowMapSize: 0,
    antialias: false,
  },
  balanced: {
    tier: "balanced",
    dprCap: 1.5,
    radialSegments: 36,
    rollerSegments: 12,
    treadCount: 36,
    carrierCount: 4,
    fastenerDetail: false,
    shadows: true,
    shadowMapSize: 1024,
    antialias: true,
  },
  high: {
    tier: "high",
    dprCap: 2,
    radialSegments: 52,
    rollerSegments: 16,
    treadCount: 52,
    carrierCount: 5,
    fastenerDetail: true,
    shadows: true,
    shadowMapSize: 1024,
    antialias: true,
  },
};

export function resolveQualityProfile(inputs: QualityInputs): QualityProfile {
  if (inputs.preference && inputs.preference !== "auto") {
    return PROFILES[inputs.preference];
  }

  const cores = inputs.hardwareConcurrency ?? 4;
  if (inputs.width < 520 || cores <= 4 || inputs.devicePixelRatio > 2.5) {
    return PROFILES.low;
  }
  if (inputs.width < 1_100 || cores <= 8) {
    return PROFILES.balanced;
  }
  return PROFILES.high;
}
