import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { InspectionController } from "./InspectionController";

function pose() {
  return {
    position: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    scale: new THREE.Vector3(1, 1, 1),
  };
}

function fakeStation() {
  const capRoot = new THREE.Group();
  const explodedRoot = new THREE.Group();
  const sensorRoot = new THREE.Group();
  const poses = { cap: pose(), exploded: pose(), sensor: pose() };
  return {
    capRoot,
    explodedRoot,
    sensorRoot,
    getBasePose: (kind: keyof typeof poses) => ({
      position: poses[kind].position.clone(),
      quaternion: poses[kind].quaternion.clone(),
      scale: poses[kind].scale.clone(),
    }),
    getRestorationError: () => Math.max(
      capRoot.position.length(),
      explodedRoot.position.length(),
      sensorRoot.position.length(),
    ),
  };
}

describe("inspection transform restoration", () => {
  it("restores every semantic root from immutable bases", () => {
    const stations = new Map([
      ["B1", fakeStation()],
      ["B2", fakeStation()],
      ["B3", fakeStation()],
      ["B4", fakeStation()],
    ]);
    const line = {
      driveModule: new THREE.Group(),
      beltExplodeRoot: new THREE.Group(),
      stations,
    };
    const controller = new InspectionController(line as never);
    for (let cycle = 0; cycle < 25; cycle += 1) {
      controller.setMode("inspect-station", "B1", true);
      controller.setMode("exploded-signal", "B4", true);
      controller.restoreFullAssembly();
    }
    expect(controller.getRestorationError()).toBeLessThanOrEqual(1e-10);
  });
});

