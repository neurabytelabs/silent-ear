import { CONVEYOR_CONSTANTS } from "../domain/conveyorScene";

export function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

/**
 * Renderer-only upright carrier path. Belt marks use A3's full analytic loop;
 * pallet/workpiece carriers recycle inside the two opaque end cowls so loose
 * workpieces never appear inverted on the return run.
 */
export function evaluateCarrierX(
  distance: number,
  phase01: number,
  driveX = CONVEYOR_CONSTANTS.driveCenter.x,
  tailX = CONVEYOR_CONSTANTS.idlerCenter.x,
): number {
  const hiddenMargin = 0.42;
  const start = driveX - hiddenMargin;
  const length = tailX - driveX + hiddenMargin * 2;
  return start + positiveModulo(distance + positiveModulo(phase01, 1) * length, length);
}

