import * as THREE from "three";
import type { ConveyorLine } from "./ConveyorLine";
import type { ModelMode, StationId } from "./sceneTypes";

interface ObjectPose {
  readonly position: THREE.Vector3;
  readonly quaternion: THREE.Quaternion;
  readonly scale: THREE.Vector3;
}

interface TransitionEntry {
  readonly object: THREE.Object3D;
  readonly from: ObjectPose;
  readonly to: ObjectPose;
}

const poseOf = (object: THREE.Object3D): ObjectPose => ({
  position: object.position.clone(),
  quaternion: object.quaternion.clone(),
  scale: object.scale.clone(),
});

const clonePose = (pose: ObjectPose): ObjectPose => ({
  position: pose.position.clone(),
  quaternion: pose.quaternion.clone(),
  scale: pose.scale.clone(),
});

export class InspectionController {
  private readonly line: ConveyorLine;
  private readonly baseDrive: ObjectPose;
  private readonly baseBelt: ObjectPose;
  private transition?: {
    readonly startedAt: number;
    readonly durationMs: number;
    readonly entries: readonly TransitionEntry[];
  };
  private mode: ModelMode = "full-assembly";
  private stationId: StationId = "B1";

  constructor(line: ConveyorLine) {
    this.line = line;
    this.baseDrive = poseOf(line.driveModule);
    this.baseBelt = poseOf(line.beltExplodeRoot);
  }

  private targets(mode: ModelMode, stationId: StationId): Map<THREE.Object3D, ObjectPose> {
    const targets = new Map<THREE.Object3D, ObjectPose>();
    targets.set(this.line.driveModule, clonePose(this.baseDrive));
    targets.set(this.line.beltExplodeRoot, clonePose(this.baseBelt));

    for (const [id, station] of this.line.stations) {
      targets.set(station.capRoot, station.getBasePose("cap"));
      targets.set(station.explodedRoot, station.getBasePose("exploded"));
      targets.set(station.sensorRoot, station.getBasePose("sensor"));
      if (id !== stationId) continue;

      if (mode === "inspect-station") {
        const cap = station.getBasePose("cap");
        cap.position.y += 0.16;
        targets.set(station.capRoot, cap);
        const sensor = station.getBasePose("sensor");
        sensor.position.y += 0.24;
        sensor.position.z += id === "B1" || id === "B3" ? -0.12 : 0.12;
        targets.set(station.sensorRoot, sensor);
      }

      if (mode === "exploded-signal") {
        const cap = station.getBasePose("cap");
        cap.position.y += 0.1;
        targets.set(station.capRoot, cap);
        const exploded = station.getBasePose("exploded");
        exploded.position.z += id === "B1" || id === "B3" ? -0.48 : 0.48;
        targets.set(station.explodedRoot, exploded);
        const sensor = station.getBasePose("sensor");
        sensor.position.y += 0.62;
        sensor.position.z += id === "B1" || id === "B3" ? -0.18 : 0.18;
        targets.set(station.sensorRoot, sensor);
      }
    }

    if (mode === "exploded-signal") {
      const drive = clonePose(this.baseDrive);
      drive.position.add(new THREE.Vector3(-0.2, 0, -0.38));
      targets.set(this.line.driveModule, drive);
      const belt = clonePose(this.baseBelt);
      belt.position.y += 0.34;
      targets.set(this.line.beltExplodeRoot, belt);
    }
    return targets;
  }

  setMode(
    mode: ModelMode,
    stationId: StationId,
    reducedMotion: boolean,
    now = performance.now(),
  ): void {
    this.mode = mode;
    this.stationId = stationId;
    const targets = this.targets(mode, stationId);
    const entries = [...targets].map(([object, target]) => ({
      object,
      from: poseOf(object),
      to: target,
    }));
    if (reducedMotion) {
      for (const entry of entries) this.applyPose(entry.object, entry.to);
      this.transition = undefined;
      return;
    }
    this.transition = {
      startedAt: now,
      durationMs: 650,
      entries,
    };
  }

  private applyPose(object: THREE.Object3D, pose: ObjectPose): void {
    object.position.copy(pose.position);
    object.quaternion.copy(pose.quaternion);
    object.scale.copy(pose.scale);
  }

  update(now: number): boolean {
    if (!this.transition) return false;
    const raw = THREE.MathUtils.clamp(
      (now - this.transition.startedAt) / this.transition.durationMs,
      0,
      1,
    );
    const amount = THREE.MathUtils.smoothstep(raw, 0, 1);
    for (const entry of this.transition.entries) {
      entry.object.position.lerpVectors(entry.from.position, entry.to.position, amount);
      entry.object.quaternion.slerpQuaternions(entry.from.quaternion, entry.to.quaternion, amount);
      entry.object.scale.lerpVectors(entry.from.scale, entry.to.scale, amount);
    }
    if (raw >= 1) {
      for (const entry of this.transition.entries) this.applyPose(entry.object, entry.to);
      this.transition = undefined;
      return false;
    }
    return true;
  }

  settle(): void {
    const targets = this.targets(this.mode, this.stationId);
    for (const [object, pose] of targets) this.applyPose(object, pose);
    this.transition = undefined;
  }

  restoreFullAssembly(): void {
    this.mode = "full-assembly";
    this.setMode("full-assembly", this.stationId, true);
  }

  get isAnimating(): boolean {
    return this.transition !== undefined;
  }

  getRestorationError(): number {
    const errors = [
      this.line.driveModule.position.distanceTo(this.baseDrive.position),
      this.line.beltExplodeRoot.position.distanceTo(this.baseBelt.position),
      ...[...this.line.stations.values()].map((station) => station.getRestorationError()),
    ];
    return Math.max(...errors.map(Math.abs));
  }
}

