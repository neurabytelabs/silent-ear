import { describe, expect, it } from "vitest";
import { CONVEYOR_CONSTANTS } from "../domain/conveyorScene";
import { evaluateCarrierX, positiveModulo } from "./kinematics";

describe("renderer carrier recycling", () => {
  it("replays upright carrier positions without accumulated state", () => {
    const first = evaluateCarrierX(7.25, 0.5);
    const replay = evaluateCarrierX(7.25, 0.5);
    expect(replay).toBe(first);
    expect(first).toBeGreaterThanOrEqual(CONVEYOR_CONSTANTS.driveCenter.x - 0.42);
    expect(first).toBeLessThan(CONVEYOR_CONSTANTS.idlerCenter.x + 0.42);
  });

  it("wraps negative and positive phases into the same deterministic span", () => {
    expect(positiveModulo(-1, 8)).toBe(7);
    expect(evaluateCarrierX(2, -0.25)).toBe(evaluateCarrierX(2, 0.75));
  });
});

