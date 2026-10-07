import { describe, expect, it } from "vitest";
import { resolveQualityProfile } from "./quality";

describe("renderer quality selection", () => {
  it("caps mobile and weak-device DPR at one", () => {
    expect(
      resolveQualityProfile({ width: 390, devicePixelRatio: 3, hardwareConcurrency: 8 }),
    ).toMatchObject({
      tier: "low",
      dprCap: 1,
      shadows: false,
      carrierCount: 3,
      treadCount: 24,
    });
  });

  it("uses a balanced profile below desktop width", () => {
    expect(
      resolveQualityProfile({ width: 900, devicePixelRatio: 2, hardwareConcurrency: 8 }),
    ).toMatchObject({
      tier: "balanced",
      dprCap: 1.5,
      shadows: true,
      shadowMapSize: 1024,
    });
  });

  it("allows explicit quality selection without exceeding the high DPR cap", () => {
    expect(
      resolveQualityProfile({
        width: 390,
        devicePixelRatio: 3,
        hardwareConcurrency: 2,
        preference: "high",
      }),
    ).toMatchObject({ tier: "high", dprCap: 2 });
    expect(
      resolveQualityProfile({
        width: 1_440,
        devicePixelRatio: 1,
        hardwareConcurrency: 12,
        preference: "high",
      }),
    ).toMatchObject({ shadows: true, shadowMapSize: 1024 });
  });
});
