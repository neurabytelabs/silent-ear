import { describe, expect, it } from "vitest";
import { SCENARIO_FIXTURES, SCENARIO_ORDER } from "../fixtures/scenarios";
import { createScenarioSnapshot } from "./scenario";

describe("deterministic scenario engine", () => {
  it("uses one fixed versioned fixture contract for every scenario", () => {
    for (const scenarioId of SCENARIO_ORDER) {
      expect(SCENARIO_FIXTURES[scenarioId].contract).toBe(
        "silent-ear-explainer@1.0.0",
      );
      expect(SCENARIO_FIXTURES[scenarioId].frames).toHaveLength(
        SCENARIO_FIXTURES[scenarioId].baselineSampleCount +
          (scenarioId === "within-reference-v1" ? 8 : scenarioId === "controlled-deviation-v1" ? 12 : 10),
      );
    }
  });

  it("returns the same snapshot for the same inputs", () => {
    const first = createScenarioSnapshot("controlled-deviation-v1", 0.72, {
      thresholdSigma: 3,
    });
    const second = createScenarioSnapshot("controlled-deviation-v1", 0.72, {
      thresholdSigma: 3,
    });
    expect(second).toEqual(first);
  });

  it("shows neither baseline statistics nor a score before readiness", () => {
    const learning = createScenarioSnapshot("controlled-deviation-v1", 0.2);
    expect(learning.stage).toBe("learning-demo-baseline");
    expect(learning.baseline.ready).toBe(false);
    expect(learning.baseline.mean).toBeNull();
    expect(learning.demoDeviationScore).toBeNull();
    expect(learning.channels.every((channel) => channel.signedZScore === null)).toBe(true);
  });

  it("represents the explicit not-started state without manufacturing a score", () => {
    const ready = createScenarioSnapshot("within-reference-v1", 0, {
      hasStarted: false,
    });
    expect(ready.stage).toBe("not-started");
    expect(ready.baseline.samplesSeen).toBe(0);
    expect(ready.demoDeviationScore).toBeNull();
    expect(ready.currentReadingAvailable).toBe(false);
    expect(ready.rmsTimeline).toEqual([]);
  });

  it("keeps the within-reference fixture below the upper threshold", () => {
    const final = createScenarioSnapshot("within-reference-v1", 1);
    expect(final.stage).toBe("within-demo-reference");
    expect(final.thresholdExceededChannels).toEqual([]);
    expect(final.demoDeviationScore).toBe(100);
  });

  it("synchronizes crossing, score, label, scrubber and motion from one frame", () => {
    const before = createScenarioSnapshot("controlled-deviation-v1", 10 / 17);
    const crossed = createScenarioSnapshot("controlled-deviation-v1", 12 / 17);

    expect(before.stage).toBe("approaching-demo-threshold");
    expect(before.thresholdExceededChannels).toEqual([]);
    expect(crossed.stage).toBe("demo-threshold-exceeded");
    expect(crossed.thresholdExceededChannels).toContain(0);
    expect(crossed.demoDeviationScore).not.toBeNull();
    expect(crossed.demoDeviationScore!).toBeLessThan(100);
    expect(crossed.motion.materialResponse).toBeGreaterThan(before.motion.materialResponse);
    expect(crossed.rmsTimeline).toHaveLength(crossed.scrubber.frameIndex + 1);
    expect(crossed.statusLabel).toBe("Demo threshold exceeded");
  });

  it("keeps the nominal approach band inclusive of equality and crossing upper-only", () => {
    const within = createScenarioSnapshot("controlled-deviation-v1", 9 / 17);
    const approaching = createScenarioSnapshot("controlled-deviation-v1", 10 / 17);
    const equal = createScenarioSnapshot("controlled-deviation-v1", 11 / 17);
    const exceeded = createScenarioSnapshot("controlled-deviation-v1", 12 / 17);

    expect(within.channels[0].signedZScore).toBeCloseTo(2.05, 10);
    expect(within.stage).toBe("within-demo-reference");
    expect(approaching.channels[0].signedZScore).toBeCloseTo(2.65, 10);
    expect(approaching.stage).toBe("approaching-demo-threshold");
    expect(equal.channels[0].signedZScore).toBeCloseTo(3, 10);
    expect(equal.channels[0].upperThresholdExceeded).toBe(false);
    expect(equal.stage).toBe("approaching-demo-threshold");
    expect(equal.explanation).toContain("At the demo threshold — not exceeded.");
    expect(equal.explanation).toContain("strictly above");
    expect(exceeded.channels[0].signedZScore).toBeCloseTo(4.2, 10);
    expect(exceeded.stage).toBe("demo-threshold-exceeded");
  });

  it("uses the selected channel for approach while retaining global strict exceedance", () => {
    const selectedApproach = createScenarioSnapshot("controlled-deviation-v1", 10 / 17, {
      selectedChannel: 0,
    });
    const selectedWithin = createScenarioSnapshot("controlled-deviation-v1", 10 / 17, {
      selectedChannel: 1,
    });
    const globalExceeded = createScenarioSnapshot("controlled-deviation-v1", 12 / 17, {
      selectedChannel: 1,
    });

    expect(selectedApproach.stage).toBe("approaching-demo-threshold");
    expect(selectedWithin.channels[1].signedZScore).toBeCloseTo(0.45, 10);
    expect(selectedWithin.stage).toBe("within-demo-reference");
    expect(globalExceeded.thresholdExceededChannels).toContain(0);
    expect(globalExceeded.stage).toBe("demo-threshold-exceeded");
  });

  it("uses an upper-only threshold while the score uses absolute z-score", () => {
    const noisy = createScenarioSnapshot("noisy-pressure-v1", 0.72, {
      thresholdSigma: 2,
    });
    const negativeChannel = noisy.channels.find(
      (channel) => (channel.signedZScore ?? 0) < -2,
    );
    expect(negativeChannel).toBeDefined();
    expect(negativeChannel!.upperThresholdExceeded).toBe(false);
    expect(noisy.maxAbsoluteZScore).toBeGreaterThan(2);
    expect(noisy.demoDeviationScore).toBeLessThan(100);
  });

  it("recomputes threshold and crossing deterministically for sensitivity changes", () => {
    const sensitive = createScenarioSnapshot("controlled-deviation-v1", 10 / 17, {
      thresholdSigma: 2,
    });
    const lessSensitive = createScenarioSnapshot("controlled-deviation-v1", 10 / 17, {
      thresholdSigma: 4,
    });
    expect(sensitive.thresholdExceededChannels.length).toBeGreaterThan(0);
    expect(lessSensitive.thresholdExceededChannels).toEqual([]);
    expect(sensitive.channels[0].upperThreshold).toBeLessThan(
      lessSensitive.channels[0].upperThreshold!,
    );
  });

  it("returns below the upper rule and keeps noisy pressure below nominal k", () => {
    const returned = createScenarioSnapshot("controlled-deviation-v1", 1);
    const noisy = createScenarioSnapshot("noisy-pressure-v1", 1);
    expect(returned.stage).toBe("within-demo-reference");
    expect(returned.thresholdExceededChannels).toEqual([]);
    expect(noisy.thresholdExceededChannels).toEqual([]);
    expect(noisy.stage).toBe("approaching-demo-threshold");
  });

  it("records immutable explicit fixture semantics", () => {
    const fixture = SCENARIO_FIXTURES["controlled-deviation-v1"];
    expect(fixture.channelIds).toEqual([
      "B1_X", "B1_Y", "B2_X", "B2_Y", "B3_X", "B3_Y", "B4_X", "B4_Y",
    ]);
    expect(fixture.units).toBe("demo units");
    expect(fixture.frames[0]).toMatchObject({ baselineMember: true, checkpoint: "baseline" });
    expect(fixture.frames[12]).toMatchObject({ baselineMember: false, checkpoint: "exceeded" });
    expect(fixture.frames.at(-1)).toMatchObject({ checkpoint: "returned" });
    expect(Object.isFrozen(fixture.frames[0].rms)).toBe(true);
  });

  it("clamps progress and supports an explicit completion state", () => {
    const below = createScenarioSnapshot("within-reference-v1", -10);
    const above = createScenarioSnapshot("within-reference-v1", 10, { complete: true });
    expect(below.scrubber.value).toBe(0);
    expect(above.scrubber.value).toBe(1);
    expect(above.stage).toBe("scenario-complete");
  });
});
