export type BeltPathSegment =
  | "top-run"
  | "idler-wrap"
  | "return-run"
  | "drive-wrap";

export interface ConveyorVector3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface BeltPathPose {
  readonly distanceMeters: number;
  readonly segment: BeltPathSegment;
  readonly position: ConveyorVector3;
  readonly tangent: ConveyorVector3;
  readonly rotationZRadians: number;
}

export interface CarrierKinematicState extends BeltPathPose {
  readonly id: "carrier-01" | "carrier-02" | "carrier-03" | "carrier-04";
  readonly phase01: number;
}

export interface ConveyorKinematicFrame {
  readonly timeSeconds: number;
  /** Cumulative travel. This remains unwrapped for exact drum/shaft phase. */
  readonly distanceMeters: number;
  /** Travel wrapped to the analytic belt-loop perimeter. */
  readonly beltPhaseMeters: number;
  readonly beltLoopLengthMeters: number;
  readonly beltSpeedMetersPerSecond: number;
  readonly driveAngleRadians: number;
  readonly idlerAngleRadians: number;
  readonly outputShaftAngleRadians: number;
  readonly couplingAngleRadians: number;
  readonly motorAngleRadians: number;
  readonly carriers: readonly [
    CarrierKinematicState,
    CarrierKinematicState,
    CarrierKinematicState,
    CarrierKinematicState,
  ];
}

const DRIVE_OMEGA_RADIANS_PER_SECOND = -1.65;
const DRUM_RADIUS_METERS = 0.42;
const DRUM_CENTER_DISTANCE_METERS = 7.1;
const BELT_LOOP_LENGTH_METERS =
  2 * DRUM_CENTER_DISTANCE_METERS + 2 * Math.PI * DRUM_RADIUS_METERS;
const BELT_SPEED_METERS_PER_SECOND =
  Math.abs(DRIVE_OMEGA_RADIANS_PER_SECOND) * DRUM_RADIUS_METERS;

export const CONVEYOR_CONSTANTS = Object.freeze({
  driveCenter: Object.freeze({ x: -3.55, y: 0.8, z: 0 }),
  idlerCenter: Object.freeze({ x: 3.55, y: 0.8, z: 0 }),
  drumRadiusMeters: DRUM_RADIUS_METERS,
  drumCenterDistanceMeters: DRUM_CENTER_DISTANCE_METERS,
  beltTopY: 1.22,
  beltReturnY: 0.38,
  beltWidthMeters: 1.58,
  stationNearZ: -1.18,
  stationFarZ: 1.18,
  driveOmegaRadiansPerSecond: DRIVE_OMEGA_RADIANS_PER_SECOND,
  idlerOmegaRadiansPerSecond: DRIVE_OMEGA_RADIANS_PER_SECOND,
  motorRatio: 6,
  motorOmegaRadiansPerSecond: DRIVE_OMEGA_RADIANS_PER_SECOND * 6,
  beltSpeedMetersPerSecond: BELT_SPEED_METERS_PER_SECOND,
  beltLoopLengthMeters: BELT_LOOP_LENGTH_METERS,
  carrierPhases: Object.freeze([0.06, 0.31, 0.56, 0.81] as const),
});

const CARRIER_IDS = [
  "carrier-01",
  "carrier-02",
  "carrier-03",
  "carrier-04",
] as const;

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

function finiteNonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

/**
 * Evaluates the retained-carrier centerline on one analytic capsule path.
 * The top run travels +X, both wraps rotate clockwise about +Z, and the
 * return run travels -X. This is deterministic explanatory kinematics,
 * not a belt-flex or load simulation.
 */
export function beltPathPoseAtDistance(distanceMeters: number): BeltPathPose {
  const distance = positiveModulo(
    Number.isFinite(distanceMeters) ? distanceMeters : 0,
    BELT_LOOP_LENGTH_METERS,
  );
  const straight = DRUM_CENTER_DISTANCE_METERS;
  const halfWrap = Math.PI * DRUM_RADIUS_METERS;

  if (distance < straight) {
    return {
      distanceMeters: distance,
      segment: "top-run",
      position: {
        x: CONVEYOR_CONSTANTS.driveCenter.x + distance,
        y: CONVEYOR_CONSTANTS.beltTopY,
        z: 0,
      },
      tangent: { x: 1, y: 0, z: 0 },
      rotationZRadians: 0,
    };
  }

  if (distance < straight + halfWrap) {
    const localDistance = distance - straight;
    const angle = Math.PI / 2 - localDistance / DRUM_RADIUS_METERS;
    const tangent = { x: Math.sin(angle), y: -Math.cos(angle), z: 0 };
    return {
      distanceMeters: distance,
      segment: "idler-wrap",
      position: {
        x: CONVEYOR_CONSTANTS.idlerCenter.x + DRUM_RADIUS_METERS * Math.cos(angle),
        y: CONVEYOR_CONSTANTS.idlerCenter.y + DRUM_RADIUS_METERS * Math.sin(angle),
        z: 0,
      },
      tangent,
      rotationZRadians: Math.atan2(tangent.y, tangent.x),
    };
  }

  if (distance < 2 * straight + halfWrap) {
    const localDistance = distance - straight - halfWrap;
    return {
      distanceMeters: distance,
      segment: "return-run",
      position: {
        x: CONVEYOR_CONSTANTS.idlerCenter.x - localDistance,
        y: CONVEYOR_CONSTANTS.beltReturnY,
        z: 0,
      },
      tangent: { x: -1, y: 0, z: 0 },
      rotationZRadians: Math.PI,
    };
  }

  const localDistance = distance - 2 * straight - halfWrap;
  const angle = -Math.PI / 2 - localDistance / DRUM_RADIUS_METERS;
  const tangent = { x: Math.sin(angle), y: -Math.cos(angle), z: 0 };
  return {
    distanceMeters: distance,
    segment: "drive-wrap",
    position: {
      x: CONVEYOR_CONSTANTS.driveCenter.x + DRUM_RADIUS_METERS * Math.cos(angle),
      y: CONVEYOR_CONSTANTS.driveCenter.y + DRUM_RADIUS_METERS * Math.sin(angle),
      z: 0,
    },
    tangent,
    rotationZRadians: Math.atan2(tangent.y, tangent.x),
  };
}

export function kinematicsAtTime(timeSeconds: number): ConveyorKinematicFrame {
  const time = finiteNonNegative(timeSeconds);
  const distance = BELT_SPEED_METERS_PER_SECOND * time;
  const beltPhase = positiveModulo(distance, BELT_LOOP_LENGTH_METERS);
  const driveAngle = DRIVE_OMEGA_RADIANS_PER_SECOND * time;
  const carriers = CONVEYOR_CONSTANTS.carrierPhases.map((phase01, index) => ({
    id: CARRIER_IDS[index],
    phase01,
    ...beltPathPoseAtDistance(beltPhase + phase01 * BELT_LOOP_LENGTH_METERS),
  })) as unknown as ConveyorKinematicFrame["carriers"];

  return {
    timeSeconds: time,
    distanceMeters: distance,
    beltPhaseMeters: beltPhase,
    beltLoopLengthMeters: BELT_LOOP_LENGTH_METERS,
    beltSpeedMetersPerSecond: BELT_SPEED_METERS_PER_SECOND,
    driveAngleRadians: driveAngle,
    idlerAngleRadians: driveAngle,
    outputShaftAngleRadians: driveAngle,
    couplingAngleRadians: driveAngle,
    motorAngleRadians: driveAngle * CONVEYOR_CONSTANTS.motorRatio,
    carriers,
  };
}

export const DRIVE_TURNS_PER_SECOND =
  Math.abs(DRIVE_OMEGA_RADIANS_PER_SECOND) / (Math.PI * 2);
