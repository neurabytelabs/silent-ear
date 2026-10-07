import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { ConveyorLine } from "./ConveyorLine";
import { resolveQualityProfile } from "./quality";
import { createMaterialLibrary, ResourceRegistry } from "./resources";

describe("conveyor line semantic structure", () => {
  it("exposes four stable station pick targets", () => {
    const registry = new ResourceRegistry();
    const line = new ConveyorLine({
      profile: resolveQualityProfile({
        width: 390,
        devicePixelRatio: 1,
        preference: "low",
      }),
      materials: createMaterialLibrary(registry),
      registry,
    });
    line.root.updateMatrixWorld(true);
    expect(line.pickTargets.map((target) => target.userData.stationId))
      .toEqual(["B1", "B2", "B3", "B4"]);
    expect(new Set(line.pickTargets.map((target) => target.name)).size).toBe(4);
    expect(line.pickTargets.every((target) => target.layers.mask === 4)).toBe(true);
    expect((line.root.getObjectByName("station-physical-flags") as THREE.InstancedMesh).count)
      .toBe(4);
    expect((line.root.getObjectByName("station-count-bars") as THREE.InstancedMesh).count)
      .toBe(20);
    registry.dispose();
  });

  it("keeps each station proxy raycastable from an authored inspect camera", () => {
    const registry = new ResourceRegistry();
    const line = new ConveyorLine({
      profile: resolveQualityProfile({
        width: 1200,
        devicePixelRatio: 1,
        preference: "balanced",
      }),
      materials: createMaterialLibrary(registry),
      registry,
    });
    line.root.updateMatrixWorld(true);
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(2);
    for (const target of line.pickTargets) {
      const station = target.userData.stationId as string;
      const world = new THREE.Vector3();
      target.getWorldPosition(world);
      const camera = new THREE.PerspectiveCamera(34, 1.2, 0.1, 80);
      camera.position.set(
        world.x + (station === "B1" || station === "B2" ? 2.5 : -2.2),
        world.y + 2.25,
        world.z - 5.4,
      );
      camera.lookAt(world);
      camera.updateMatrixWorld(true);
      const ndc = world.clone().project(camera);
      raycaster.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), camera);
      expect(raycaster.intersectObject(target, false).length).toBeGreaterThan(0);
    }
    registry.dispose();
  });

  it("submits internal bearing detail only for the selected station", () => {
    const registry = new ResourceRegistry();
    const line = new ConveyorLine({
      profile: resolveQualityProfile({
        width: 1_440,
        devicePixelRatio: 1,
        preference: "high",
      }),
      materials: createMaterialLibrary(registry),
      registry,
    });
    const quiet = {
      response01: 0,
      pulse01: 0,
      approaching: false,
      equal: false,
      exceeded: false,
    } as const;
    const b1 = line.stations.get("B1")!;
    const b4 = line.stations.get("B4")!;
    b1.setVisualState(true, "X", quiet, false);
    b4.setVisualState(false, "X", quiet, false);
    expect(b1.explodedRoot.visible).toBe(true);
    expect(b4.explodedRoot.visible).toBe(false);
    expect(b4.capRoot.visible).toBe(true);

    b1.setVisualState(false, "X", quiet, false);
    b4.setVisualState(true, "Y", quiet, false);
    expect(b1.explodedRoot.visible).toBe(false);
    expect(b4.explodedRoot.visible).toBe(true);
    registry.dispose();
  });
});
