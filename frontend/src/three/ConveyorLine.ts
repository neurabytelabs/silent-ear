import * as THREE from "three";
import {
  CONVEYOR_CONSTANTS,
  beltPathPoseAtDistance,
  kinematicsAtTime,
} from "../domain/conveyorScene";
import { BearingStation } from "./BearingStation";
import {
  evaluateCarrierX,
} from "./kinematics";
import type { QualityProfile } from "./quality";
import type { MaterialLibrary, ResourceRegistry } from "./resources";
import {
  STATION_IDS,
  type ConveyorModelState,
  type MeasurementAxis,
  type StationId,
} from "./sceneTypes";

export interface ConveyorLineOptions {
  readonly profile: QualityProfile;
  readonly materials: MaterialLibrary;
  readonly registry: ResourceRegistry;
}

const STATION_POSITIONS = [
  new THREE.Vector3(-3.55, 0.8, -1.18),
  new THREE.Vector3(-3.55, 0.8, 1.18),
  new THREE.Vector3(3.55, 0.8, -1.18),
  new THREE.Vector3(3.55, 0.8, 1.18),
] as const;

export class ConveyorLine {
  readonly root = new THREE.Group();
  readonly frameRoot = new THREE.Group();
  readonly driveModule = new THREE.Group();
  readonly beltExplodeRoot = new THREE.Group();
  readonly stations: ReadonlyMap<StationId, BearingStation>;
  readonly pickTargets: readonly THREE.Mesh[];
  readonly instanceCount: number;

  private readonly profile: QualityProfile;
  private readonly materials: MaterialLibrary;
  private readonly registry: ResourceRegistry;
  private readonly driveDrumRoot = new THREE.Group();
  private readonly tailDrumRoot = new THREE.Group();
  private readonly motorRotorRoot = new THREE.Group();
  private readonly couplingRoot = new THREE.Group();
  private readonly idlerInstances: THREE.InstancedMesh;
  private readonly treadInstances: THREE.InstancedMesh;
  private readonly carrierInstances: THREE.InstancedMesh;
  private readonly workpieceInstances: THREE.InstancedMesh;
  private readonly stationFlagPlates: THREE.InstancedMesh;
  private readonly stationFlagMaterial: THREE.MeshStandardMaterial;
  private currentSelection: { station: StationId; axis: MeasurementAxis } = {
    station: "B1",
    axis: "X",
  };

  constructor(options: ConveyorLineOptions) {
    this.profile = options.profile;
    this.materials = options.materials;
    this.registry = options.registry;
    this.root.name = "conveyor-line";
    this.frameRoot.name = "frame-system";
    this.driveModule.name = "drive-train";
    this.beltExplodeRoot.name = "belt-system";
    this.root.add(this.frameRoot, this.driveModule, this.beltExplodeRoot);

    this.buildFrame();
    this.buildDriveTrain();
    const moving = this.buildBeltAndMovingSystems();
    this.idlerInstances = moving.idlers;
    this.treadInstances = moving.treads;
    this.carrierInstances = moving.carriers;
    this.workpieceInstances = moving.workpieces;

    const stationMap = new Map<StationId, BearingStation>();
    STATION_IDS.forEach((id, index) => {
      const station = new BearingStation({
        id,
        stationIndex: index,
        position: STATION_POSITIONS[index].clone(),
        side: index % 2 === 0 ? -1 : 1,
        profile: this.profile,
        materials: this.materials,
        registry: this.registry,
      });
      stationMap.set(id, station);
      this.root.add(station.root);
    });
    this.stations = stationMap;
    this.pickTargets = STATION_IDS.map((id) => stationMap.get(id)!.pickProxy);
    const flags = this.buildStationFlags();
    this.stationFlagPlates = flags.plates;
    this.stationFlagMaterial = flags.material;
    this.instanceCount = this.profile.treadCount +
      this.profile.carrierCount * 2 +
      this.idlerInstances.count +
      28 +
      STATION_IDS.reduce((sum) => sum + (this.profile.tier === "low" ? 8 : 10), 0);
  }

  private box(
    name: string,
    size: readonly [number, number, number],
    material: THREE.Material,
    position: readonly [number, number, number],
    parent: THREE.Object3D,
    casts = false,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(
      this.registry.geometry(new THREE.BoxGeometry(...size)),
      material,
    );
    mesh.name = name;
    mesh.position.set(...position);
    mesh.castShadow = casts && this.profile.shadows;
    mesh.receiveShadow = this.profile.shadows;
    parent.add(mesh);
    return mesh;
  }

  private cylinder(
    name: string,
    radius: number,
    length: number,
    material: THREE.Material,
    position: readonly [number, number, number],
    parent: THREE.Object3D,
    segments = this.profile.radialSegments,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(
      this.registry.geometry(new THREE.CylinderGeometry(radius, radius, length, segments)),
      material,
    );
    mesh.name = name;
    mesh.position.set(...position);
    mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = this.profile.shadows;
    mesh.receiveShadow = this.profile.shadows;
    parent.add(mesh);
    return mesh;
  }

  private buildFrame(): void {
    const railGeometry = this.registry.geometry(new THREE.BoxGeometry(8.2, 0.18, 0.2));
    const rails = new THREE.InstancedMesh(railGeometry, this.materials.frame, 2);
    rails.name = "frame-side-rails";
    const railMatrix = new THREE.Matrix4();
    rails.setMatrixAt(0, railMatrix.makeTranslation(0, 0.53, -1.08));
    rails.setMatrixAt(1, railMatrix.makeTranslation(0, 0.53, 1.08));
    rails.castShadow = this.profile.shadows;
    rails.receiveShadow = this.profile.shadows;
    rails.instanceMatrix.needsUpdate = true;
    this.frameRoot.add(rails);

    const crossGeometry = this.registry.geometry(new THREE.BoxGeometry(0.16, 0.16, 2.28));
    const crossMembers = new THREE.InstancedMesh(crossGeometry, this.materials.frame, 6);
    crossMembers.name = "frame-cross-members";
    const matrix = new THREE.Matrix4();
    for (let index = 0; index < 6; index += 1) {
      matrix.makeTranslation(-3.55 + index * 1.42, 0.52, 0);
      crossMembers.setMatrixAt(index, matrix);
    }
    crossMembers.castShadow = this.profile.shadows;
    crossMembers.receiveShadow = this.profile.shadows;
    crossMembers.instanceMatrix.needsUpdate = true;
    this.frameRoot.add(crossMembers);

    const legGeometry = this.registry.geometry(new THREE.BoxGeometry(0.2, 0.65, 0.2));
    const legs = new THREE.InstancedMesh(legGeometry, this.materials.frame, 8);
    legs.name = "frame-legs";
    let instance = 0;
    for (const x of [-3.25, -1.1, 1.1, 3.25]) {
      for (const z of [-1.08, 1.08]) {
        matrix.makeTranslation(x, 0.2, z);
        legs.setMatrixAt(instance, matrix);
        instance += 1;
      }
    }
    legs.castShadow = this.profile.shadows;
    legs.receiveShadow = this.profile.shadows;
    legs.instanceMatrix.needsUpdate = true;
    this.frameRoot.add(legs);

    const footGeometry = this.registry.geometry(new THREE.BoxGeometry(0.42, 0.07, 0.42));
    const feet = new THREE.InstancedMesh(footGeometry, this.materials.darkSteel, 8);
    feet.name = "frame-feet";
    instance = 0;
    for (const x of [-3.25, -1.1, 1.1, 3.25]) {
      for (const z of [-1.08, 1.08]) {
        matrix.makeTranslation(x, -0.15, z);
        feet.setMatrixAt(instance, matrix);
        instance += 1;
      }
    }
    feet.receiveShadow = this.profile.shadows;
    feet.instanceMatrix.needsUpdate = true;
    this.frameRoot.add(feet);

    this.box("guard-coupling", [0.9, 0.55, 0.08], this.materials.guard, [-3.55, 1.05, -1.78], this.frameRoot, true);
    const edgeGuardGeometry = this.registry.geometry(new THREE.BoxGeometry(7.45, 0.18, 0.08));
    const edgeGuards = new THREE.InstancedMesh(edgeGuardGeometry, this.materials.guard, 2);
    edgeGuards.name = "guard-belt-edges";
    const guardMatrix = new THREE.Matrix4();
    edgeGuards.setMatrixAt(0, guardMatrix.makeTranslation(0, 1.32, -0.9));
    edgeGuards.setMatrixAt(1, guardMatrix.makeTranslation(0, 1.32, 0.9));
    edgeGuards.instanceMatrix.needsUpdate = true;
    this.frameRoot.add(edgeGuards);
  }

  private buildDriveTrain(): void {
    const motorBody = this.cylinder(
      "drive-motor-body",
      0.43,
      0.88,
      this.materials.frame,
      [-3.55, 0.79, -2.62],
      this.driveModule,
    );
    motorBody.rotation.x = Math.PI / 2;
    if (this.profile.tier !== "low") {
      this.cylinder("drive-motor-endcap", 0.36, 0.12, this.materials.darkSteel, [-3.55, 0.79, -3.08], this.driveModule);
    }

    const finGeometry = this.registry.geometry(new THREE.BoxGeometry(0.055, 0.055, 0.82));
    const fins = new THREE.InstancedMesh(finGeometry, this.materials.darkSteel, 8);
    fins.name = "drive-motor-fins";
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    for (let index = 0; index < 8; index += 1) {
      const angle = index / 8 * Math.PI * 2;
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      matrix.compose(
        new THREE.Vector3(-3.55 + Math.cos(angle) * 0.43, 0.79 + Math.sin(angle) * 0.43, -2.62),
        quaternion,
        new THREE.Vector3(1, 1, 1),
      );
      fins.setMatrixAt(index, matrix);
    }
    fins.instanceMatrix.needsUpdate = true;
    this.driveModule.add(fins);

    this.motorRotorRoot.name = "drive-motor-rotor";
    if (this.profile.tier !== "low") {
      this.cylinder("drive-motor-shaft", 0.08, 0.34, this.materials.steel, [0, 0, 0], this.motorRotorRoot, 20);
    }
    this.motorRotorRoot.position.set(-3.55, 0.79, -2.02);
    this.driveModule.add(this.motorRotorRoot);

    this.cylinder("drive-reducer", 0.48, 0.38, this.materials.guard, [-3.55, 0.79, -1.78], this.driveModule);
    this.couplingRoot.name = "drive-coupling";
    this.cylinder("drive-coupling-hub-a", 0.17, 0.18, this.materials.steel, [0, 0, -0.1], this.couplingRoot, 24);
    if (this.profile.tier !== "low") {
      this.cylinder("drive-coupling-hub-b", 0.17, 0.18, this.materials.steel, [0, 0, 0.1], this.couplingRoot, 24);
    }
    this.couplingRoot.position.set(-3.55, 0.8, -1.45);
    this.driveModule.add(this.couplingRoot);
  }

  private buildBeltAndMovingSystems(): {
    idlers: THREE.InstancedMesh;
    treads: THREE.InstancedMesh;
    carriers: THREE.InstancedMesh;
    workpieces: THREE.InstancedMesh;
  } {
    this.box("belt-top-run", [7.1, 0.055, 1.58], this.materials.rubber, [0, 1.22, 0], this.beltExplodeRoot, false);
    this.box("belt-return-run", [7.1, 0.055, 1.58], this.materials.rubber, [0, 0.38, 0], this.beltExplodeRoot, false);

    for (const [name, x, root] of [
      ["drum-head", -3.55, this.driveDrumRoot],
      ["drum-tail", 3.55, this.tailDrumRoot],
    ] as const) {
      root.name = name;
      if (this.profile.tier !== "low") {
        this.cylinder(`${name}-steel`, 0.365, 1.7, this.materials.steel, [0, 0, 0], root);
      }
      this.cylinder(`${name}-rubber-collar`, 0.423, 1.52, this.materials.rubber, [0, 0, 0], root);
      this.cylinder(`${name}-shaft`, 0.105, 2.78, this.materials.darkSteel, [0, 0, 0], root, 28);
      root.position.set(x, 0.8, 0);
      this.beltExplodeRoot.add(root);
    }

    if (this.profile.tier !== "low") {
      const beltEdgeGeometry = this.registry.geometry(new THREE.TorusGeometry(
        0.42,
        0.028,
        8,
        this.profile.radialSegments,
      ));
      for (const x of [-3.55, 3.55]) {
        for (const z of [-0.77, 0.77]) {
          const edge = new THREE.Mesh(beltEdgeGeometry, this.materials.rubber);
          edge.position.set(x, 0.8, z);
          this.beltExplodeRoot.add(edge);
        }
      }
    }

    const idlerGeometry = this.registry.geometry(new THREE.CylinderGeometry(
      0.09,
      0.09,
      1.62,
      Math.max(16, Math.floor(this.profile.radialSegments / 2)),
    ));
    const idlers = new THREE.InstancedMesh(idlerGeometry, this.materials.darkSteel, 7);
    idlers.name = "support-idlers";
    idlers.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.beltExplodeRoot.add(idlers);

    const treadGeometry = this.registry.geometry(new THREE.BoxGeometry(0.16, 0.032, 1.5));
    const treads = new THREE.InstancedMesh(treadGeometry, this.materials.guard, this.profile.treadCount);
    treads.name = "belt-travel-marks";
    treads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    treads.frustumCulled = false;
    this.beltExplodeRoot.add(treads);

    const carrierGeometry = this.registry.geometry(new THREE.BoxGeometry(0.68, 0.1, 0.62));
    const carriers = new THREE.InstancedMesh(carrierGeometry, this.materials.carrier, this.profile.carrierCount);
    carriers.name = "carrier-pallets";
    carriers.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    carriers.castShadow = false;
    carriers.frustumCulled = false;
    this.beltExplodeRoot.add(carriers);

    const workpieceGeometry = this.registry.geometry(new THREE.CylinderGeometry(
      0.19,
      0.24,
      0.24,
      Math.max(16, Math.floor(this.profile.radialSegments / 2)),
    ));
    const workpieces = new THREE.InstancedMesh(workpieceGeometry, this.materials.workpiece, this.profile.carrierCount);
    workpieces.name = "carrier-workpieces";
    workpieces.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    workpieces.castShadow = false;
    workpieces.frustumCulled = false;
    this.beltExplodeRoot.add(workpieces);

    const cowlGeometry = this.registry.geometry(new THREE.BoxGeometry(0.42, 0.32, 1.82));
    const cowls = new THREE.InstancedMesh(cowlGeometry, this.materials.guard, 2);
    cowls.name = "carrier-end-cowls";
    const cowlMatrix = new THREE.Matrix4();
    cowls.setMatrixAt(0, cowlMatrix.makeTranslation(-3.69, 1.35, 0));
    cowls.setMatrixAt(1, cowlMatrix.makeTranslation(3.69, 1.35, 0));
    cowls.castShadow = this.profile.shadows;
    cowls.instanceMatrix.needsUpdate = true;
    this.frameRoot.add(cowls);

    return { idlers, treads, carriers, workpieces };
  }

  private buildStationFlags(): {
    plates: THREE.InstancedMesh;
    material: THREE.MeshStandardMaterial;
  } {
    const matrix = new THREE.Matrix4();
    const poleGeometry = this.registry.geometry(new THREE.BoxGeometry(0.055, 0.72, 0.055));
    const poles = new THREE.InstancedMesh(poleGeometry, this.materials.darkSteel, 4);
    poles.name = "station-sensor-flag-poles";

    const plateGeometry = this.registry.geometry(new THREE.BoxGeometry(0.46, 0.32, 0.09));
    const material = this.registry.material(this.materials.steel.clone());
    material.color.setHex(0xffffff);
    material.metalness = 0.52;
    material.roughness = 0.42;
    const plates = new THREE.InstancedMesh(plateGeometry, material, 4);
    plates.name = "station-physical-flags";

    const indexGeometry = this.registry.geometry(new THREE.BoxGeometry(0.055, 0.17, 0.055));
    const indexBars = new THREE.InstancedMesh(indexGeometry, this.materials.darkSteel, 20);
    indexBars.name = "station-count-bars";
    let barIndex = 0;

    STATION_POSITIONS.forEach((stationPosition, stationIndex) => {
      const side = stationIndex % 2 === 0 ? -1 : 1;
      const flagZ = stationPosition.z + side * 0.34;
      poles.setMatrixAt(
        stationIndex,
        matrix.makeTranslation(stationPosition.x, 1.54, flagZ),
      );
      plates.setMatrixAt(
        stationIndex,
        matrix.makeTranslation(stationPosition.x, 1.88, flagZ),
      );
      plates.setColorAt(stationIndex, new THREE.Color(0xbcae90));
      const count = stationIndex + 1;
      for (let local = 0; local < count; local += 1) {
        const offsetX = (local - (count - 1) / 2) * 0.09;
        for (const face of [-1, 1] as const) {
          indexBars.setMatrixAt(
            barIndex,
            matrix.makeTranslation(stationPosition.x + offsetX, 1.88, flagZ + face * 0.052),
          );
          barIndex += 1;
        }
      }
    });
    poles.instanceMatrix.needsUpdate = true;
    plates.instanceMatrix.needsUpdate = true;
    if (plates.instanceColor) plates.instanceColor.needsUpdate = true;
    indexBars.instanceMatrix.needsUpdate = true;
    this.root.add(poles, plates, indexBars);
    return { plates, material };
  }

  setModelState(state: ConveyorModelState): void {
    this.currentSelection = {
      station: state.selection.stationId,
      axis: state.selection.axis,
    };
    state.stations.forEach((stationState, stationIndex) => {
      const station = this.stations.get(stationState.id);
      if (!station) return;
      const selected = stationState.id === state.selection.stationId;
      const channel = state.selection.axis === "X" ? stationState.x : stationState.y;
      station.setVisualState(
        selected,
        state.selection.axis,
        selected ? channel : stationState.x,
        stationState.x.exceeded || stationState.y.exceeded,
      );
      const exceeded = stationState.x.exceeded || stationState.y.exceeded;
      const approaching = stationState.x.approaching || stationState.y.approaching ||
        stationState.x.equal || stationState.y.equal;
      this.stationFlagPlates.setColorAt(
        stationIndex,
        new THREE.Color(
          exceeded ? 0xa13b32 : approaching ? 0xb26b14 : selected ? 0x147d73 : 0xbcae90,
        ),
      );
    });
    if (this.stationFlagPlates.instanceColor) {
      this.stationFlagPlates.instanceColor.needsUpdate = true;
    }
    // The material remains neutral so instance colors stay literal rather than
    // being multiplied by the shared steel swatch.
    this.stationFlagMaterial.needsUpdate = false;
  }

  updateKinematics(elapsedMs: number, reducedMotion: boolean): void {
    const frame = kinematicsAtTime(elapsedMs / 1_000);
    this.driveDrumRoot.rotation.z = frame.driveAngleRadians;
    this.tailDrumRoot.rotation.z = frame.idlerAngleRadians;
    this.motorRotorRoot.rotation.z = frame.motorAngleRadians;
    this.couplingRoot.rotation.z = frame.couplingAngleRadians;

    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    const pathLength = frame.beltLoopLengthMeters;
    for (let index = 0; index < this.profile.treadCount; index += 1) {
      const pose = beltPathPoseAtDistance(
        frame.distanceMeters + index / this.profile.treadCount * pathLength,
      );
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), pose.rotationZRadians);
      matrix.compose(
        new THREE.Vector3(pose.position.x, pose.position.y, pose.position.z),
        quaternion,
        scale,
      );
      this.treadInstances.setMatrixAt(index, matrix);
    }
    this.treadInstances.instanceMatrix.needsUpdate = true;

    const idlerXs = [-2.55, -1.7, -0.85, 0, 0.85, 1.7, 2.55];
    idlerXs.forEach((x, index) => {
      quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, -frame.distanceMeters / 0.09));
      matrix.compose(new THREE.Vector3(x, 1.08, 0), quaternion, scale);
      this.idlerInstances.setMatrixAt(index, matrix);
    });
    this.idlerInstances.instanceMatrix.needsUpdate = true;

    for (let index = 0; index < this.profile.carrierCount; index += 1) {
      const x = evaluateCarrierX(
        frame.distanceMeters,
        index / this.profile.carrierCount,
        CONVEYOR_CONSTANTS.driveCenter.x,
        CONVEYOR_CONSTANTS.idlerCenter.x,
      );
      const carrierScale = x < CONVEYOR_CONSTANTS.driveCenter.x ||
        x > CONVEYOR_CONSTANTS.idlerCenter.x
        ? new THREE.Vector3(0, 0, 0)
        : scale;
      matrix.compose(new THREE.Vector3(x, 1.31, 0), new THREE.Quaternion(), carrierScale);
      this.carrierInstances.setMatrixAt(index, matrix);
      matrix.compose(new THREE.Vector3(x, 1.5, 0), new THREE.Quaternion(), carrierScale);
      this.workpieceInstances.setMatrixAt(index, matrix);
    }
    this.carrierInstances.instanceMatrix.needsUpdate = true;
    this.workpieceInstances.instanceMatrix.needsUpdate = true;

    const elapsedSeconds = elapsedMs / 1_000;
    for (const [id, station] of this.stations) {
      const angle = id === "B1" || id === "B2"
        ? frame.driveAngleRadians
        : frame.idlerAngleRadians;
      station.updateKinematics(angle, elapsedSeconds, reducedMotion);
    }
  }

  get selectedStation(): BearingStation {
    return this.stations.get(this.currentSelection.station)!;
  }
}
