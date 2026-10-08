import { describe, expect, it } from "vitest";
import { createConveyorSceneFrame } from "../domain/conveyorScene";
import { createScenarioSnapshot } from "../domain/scenario";
import { SCENARIO_FIXTURES } from "../fixtures/scenarios";
import { modelStateFromSceneFrame } from "./sceneTypes";

describe("domain-to-renderer frame conversion", () => {
  it("preserves A3 station, axis and strict comparison glyphs", () => {
    const fixture = SCENARIO_FIXTURES["controlled-deviation-v1"];
    const equalityIndex = fixture.frames.findIndex((frame) => frame.checkpoint === "at-threshold");
    const snapshot = createScenarioSnapshot(
      fixture.id,
      equalityIndex / (fixture.frames.length - 1),
      { selectedChannel: 0 },
    );
    const frame = createConveyorSceneFrame(snapshot, {
      playing: false,
      reducedMotion: false,
      modelMode: "inspect-station",
      selectedStation: "B1",
      selectedAxis: "X",
    });
    const renderState = modelStateFromSceneFrame(frame);
    expect(renderState.selection).toMatchObject({
      stationId: "B1",
      axis: "X",
      channelIndex: 0,
    });
    expect(renderState.stations[0].x.equal).toBe(true);
    expect(renderState.stations[0].x.exceeded).toBe(false);
  });
});

