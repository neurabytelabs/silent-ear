import { describe, expect, it } from "vitest";
import { CHANNEL_IDS, SCENARIO_ORDER } from "../fixtures/scenarios";
import { createScenarioSnapshot } from "./scenario";
import {
  AXIS_IDS,
  CONVEYOR_CONSTANTS,
  MODEL_MODES,
  STATION_IDS,
  beltPathPoseAtDistance,
  canonicalKinematicTime,
  channelIndexFor,
  channelsForStation,
  createConveyorSceneFrame,
  createScenarioResetState,
  kinematicsAtTime,
  stationAxisForChannel,
  type AxisId,
  type ModelMode,
  type StationId,
} from "./conveyorScene";

const FRAME_OPTIONS = {
  playing: false,
  reducedMotion: false,
  modelMode: "full-assembly" as ModelMode,
  selectedStation: "B1" as StationId,
  selectedAxis: "X" as AxisId,
};

describe("conveyor station/channel mapping", () => {
  it("round-trips all eight canonical station/axis channels", () => {
    let expectedIndex = 0;
    for (const stationId of STATION_IDS) {
      for (const axisId of AXIS_IDS) {
        const channelIndex = channelIndexFor(stationId, axisId);
        expect(channelIndex).toBe(expectedIndex);
        expect(stationAxisForChannel(channelIndex)).toEqual({
          stationId,
          axisId,
          channelIndex,
          channelId: CHANNEL_IDS[channelIndex],
        });
        expectedIndex += 1;
      }
    }
    expect(expectedIndex).toBe(8);
  });

  it("returns exact channel pairs and rejects invalid channel indices", () => {
    expect(channelsForStation("B1")).toEqual([0, 1]);
    expect(channelsForStation("B2")).toEqual([2, 3]);
    expect(channelsForStation("B3")).toEqual([4, 5]);
    expect(channelsForStation("B4")).toEqual([6, 7]);
    expect(() => stationAxisForChannel(-1)).toThrow(RangeError);
    expect(() => stationAxisForChannel(8)).toThrow(RangeError);
    expect(() => stationAxisForChannel(1.5)).toThrow(RangeError);
  });
});

describe("analytic conveyor kinematics", () => {
  it("uses the binding authored constants and exact no-slip relation", () => {
    expect(CONVEYOR_CONSTANTS.driveCenter).toEqual({ x: -3.55, y: 0.8, z: 0 });
    expect(CONVEYOR_CONSTANTS.idlerCenter).toEqual({ x: 3.55, y: 0.8, z: 0 });
    expect(CONVEYOR_CONSTANTS.drumRadiusMeters).toBe(0.42);
    expect(CONVEYOR_CONSTANTS.beltSpeedMetersPerSecond).toBeCloseTo(0.693, 12);
    expect(CONVEYOR_CONSTANTS.motorRatio).toBe(6);

    const start = kinematicsAtTime(0);
    const afterTenSeconds = kinematicsAtTime(10);
    const travel = afterTenSeconds.distanceMeters - start.distanceMeters;
    const driveSurfaceTravel = Math.abs(
      afterTenSeconds.driveAngleRadians - start.driveAngleRadians,
    ) * CONVEYOR_CONSTANTS.drumRadiusMeters;
    expect(travel).toBeCloseTo(6.93, 12);
    expect(driveSurfaceTravel).toBeCloseTo(travel, 12);
    expect(afterTenSeconds.idlerAngleRadians).toBe(afterTenSeconds.driveAngleRadians);
    expect(afterTenSeconds.couplingAngleRadians).toBe(afterTenSeconds.driveAngleRadians);
    expect(afterTenSeconds.motorAngleRadians).toBeCloseTo(
      afterTenSeconds.driveAngleRadians * 6,
      12,
    );
  });

  it("evaluates a continuous capsule path at every segment boundary", () => {
    const straight = CONVEYOR_CONSTANTS.drumCenterDistanceMeters;
    const halfWrap = Math.PI * CONVEYOR_CONSTANTS.drumRadiusMeters;
    const epsilon = 1e-9;
    const boundaries = [0, straight, straight + halfWrap, 2 * straight + halfWrap];

    for (const boundary of boundaries) {
      const before = beltPathPoseAtDistance(boundary - epsilon);
      const at = beltPathPoseAtDistance(boundary);
      expect(Number.isFinite(at.position.x)).toBe(true);
      expect(Number.isFinite(at.position.y)).toBe(true);
      if (boundary > 0) {
        expect(before.position.x).toBeCloseTo(at.position.x, 7);
        expect(before.position.y).toBeCloseTo(at.position.y, 7);
      }
    }
  });

  it("keeps fixed carrier phases and produces history-independent poses", () => {
    const first = kinematicsAtTime(7.25);
    kinematicsAtTime(100);
    const repeated = kinematicsAtTime(7.25);
    expect(repeated).toEqual(first);
    expect(first.carriers.map((carrier) => carrier.phase01)).toEqual([0.06, 0.31, 0.56, 0.81]);

    const loop = CONVEYOR_CONSTANTS.beltLoopLengthMeters;
    for (let index = 1; index < first.carriers.length; index += 1) {
      const phaseDistance = (
        first.carriers[index].distanceMeters - first.carriers[index - 1].distanceMeters + loop
      ) % loop;
      expect(phaseDistance).toBeCloseTo(0.25 * loop, 10);
    }
  });
});

describe("pure scenario-to-conveyor scene mapping", () => {
  it("emits unavailable glyphs and zero responses before baseline readiness", () => {
    const ready = createScenarioSnapshot("controlled-deviation-v1", 0, {
      hasStarted: false,
      selectedChannel: 0,
    });
    const frame = createConveyorSceneFrame(ready, FRAME_OPTIONS);
    expect(frame.baseline).toEqual({ ready: false, progress01: 0 });
    expect(frame.operating.timeSeconds).toBe(0);
    expect(frame.stations.flatMap((station) => [station.x, station.y]).every(
      (channel) => channel.comparisonGlyph === "unavailable" &&
        channel.response01 === 0 && channel.pulse01 === 0,
    )).toBe(true);
  });

  it("distinguishes approach, exact equality and strict exceedance", () => {
    const approaching = createScenarioSnapshot("controlled-deviation-v1", 10 / 17, {
      selectedChannel: 0,
    });
    const equal = createScenarioSnapshot("controlled-deviation-v1", 11 / 17, {
      selectedChannel: 0,
    });
    const exceeded = createScenarioSnapshot("controlled-deviation-v1", 12 / 17, {
      selectedChannel: 0,
    });

    expect(createConveyorSceneFrame(approaching, FRAME_OPTIONS).stations[0].x.comparisonGlyph)
      .toBe("approaching");
    const equalityFrame = createConveyorSceneFrame(equal, FRAME_OPTIONS);
    expect(equalityFrame.stations[0].x.comparisonGlyph).toBe("equal");
    expect(equalityFrame.stations[0].x.exceeded).toBe(false);
    const exceededFrame = createConveyorSceneFrame(exceeded, FRAME_OPTIONS);
    expect(exceededFrame.stations[0].x.comparisonGlyph).toBe("exceeded");
    expect(exceededFrame.exceededChannelIndices).toContain(0);
  });

  it("keeps global exceedance local when another channel remains selected", () => {
    const snapshot = createScenarioSnapshot("controlled-deviation-v1", 12 / 17, {
      selectedChannel: 3,
    });
    const frame = createConveyorSceneFrame(snapshot, {
      ...FRAME_OPTIONS,
      selectedStation: "B2",
      selectedAxis: "Y",
    });
    expect(frame.selection).toMatchObject({
      stationId: "B2",
      axisId: "Y",
      channelIndex: 3,
      channelId: "B2_Y",
    });
    expect(frame.stations[1].y.selected).toBe(true);
    expect(frame.stations[1].y.exceeded).toBe(false);
    expect(frame.stations[0].x.exceeded).toBe(true);
    expect(frame.stations[0].anyAxisExceeded).toBe(true);
    expect(frame.exceededChannelIndices).toContain(0);
  });

  it("keeps operating speed and phase independent from RMS and selection", () => {
    const within = createScenarioSnapshot("within-reference-v1", 1, { selectedChannel: 0 });
    const exceeded = createScenarioSnapshot("controlled-deviation-v1", 12 / 17, {
      selectedChannel: 7,
    });
    const withinFrame = createConveyorSceneFrame(within, {
      ...FRAME_OPTIONS,
      operatingTimeSeconds: 9.5,
    });
    const exceededFrame = createConveyorSceneFrame(exceeded, {
      ...FRAME_OPTIONS,
      selectedStation: "B4",
      selectedAxis: "Y",
      operatingTimeSeconds: 9.5,
    });
    expect(exceededFrame.operating).toEqual(withinFrame.operating);
    expect(exceeded.motion.rotorTurnsPerSecond).toBe(within.motion.rotorTurnsPerSecond);
  });

  it("uses fixture-relative canonical time for deterministic direct scrubbing", () => {
    const snapshot = createScenarioSnapshot("controlled-deviation-v1", 12 / 17);
    const canonical = canonicalKinematicTime(snapshot);
    expect(canonical).toBe(snapshot.scrubber.elapsedMs / 1_000);
    const first = createConveyorSceneFrame(snapshot, FRAME_OPTIONS);
    createConveyorSceneFrame(
      createScenarioSnapshot("controlled-deviation-v1", 1),
      { ...FRAME_OPTIONS, modelMode: "exploded-signal" },
    );
    expect(createConveyorSceneFrame(snapshot, FRAME_OPTIONS)).toEqual(first);
  });

  it("forces exploded mechanics paused without mutating deterministic phase", () => {
    const snapshot = createScenarioSnapshot("controlled-deviation-v1", 10 / 17);
    const full = createConveyorSceneFrame(snapshot, {
      ...FRAME_OPTIONS,
      playing: true,
      operatingTimeSeconds: 4.25,
    });
    const exploded = createConveyorSceneFrame(snapshot, {
      ...FRAME_OPTIONS,
      playing: true,
      modelMode: "exploded-signal",
      operatingTimeSeconds: 4.25,
    });
    expect(full.operating.playing).toBe(true);
    expect(exploded.operating.playing).toBe(false);
    expect(exploded.operating.timeSeconds).toBe(full.operating.timeSeconds);
    expect(exploded.operating.distanceMeters).toBe(full.operating.distanceMeters);
  });

  it("re-derives returned frames without exceeded pulse or material residue", () => {
    const exceeded = createScenarioSnapshot("controlled-deviation-v1", 12 / 17, {
      selectedChannel: 0,
    });
    const returned = createScenarioSnapshot("controlled-deviation-v1", 1, {
      selectedChannel: 0,
    });
    const exceededFrame = createConveyorSceneFrame(exceeded, FRAME_OPTIONS);
    const returnedFrame = createConveyorSceneFrame(returned, FRAME_OPTIONS);
    expect(exceededFrame.stations[0].x).toMatchObject({
      comparisonGlyph: "exceeded",
      exceeded: true,
      pulse01: 1,
    });
    expect(returnedFrame.stations[0].x.exceeded).toBe(false);
    expect(returnedFrame.stations[0].x.comparisonGlyph).toBe("within");
    expect(returnedFrame.stations.every((station) => !station.anyAxisExceeded)).toBe(true);
    expect(returnedFrame.exceededChannelIndices).toEqual([]);
    expect(createConveyorSceneFrame(returned, FRAME_OPTIONS)).toEqual(returnedFrame);
  });

  it("creates one complete atomic reset state for every scenario", () => {
    for (const scenarioId of SCENARIO_ORDER) {
      expect(createScenarioResetState(scenarioId)).toEqual({
        scenarioId,
        progress: 0,
        hasStarted: false,
        complete: false,
        thresholdSigma: 3,
        playing: false,
        selectedStation: "B1",
        selectedAxis: "X",
        selectedChannel: 0,
        modelMode: "full-assembly",
        operatingTimeSeconds: 0,
      });
    }
    expect(MODEL_MODES).toEqual([
      "full-assembly",
      "inspect-station",
      "exploded-signal",
    ]);
  });
});
