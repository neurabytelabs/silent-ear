import * as THREE from "three";
import type { QualityProfile } from "./quality";
import type { MaterialLibrary, ResourceRegistry } from "./resources";
import type {
  ChannelRenderState,
  MeasurementAxis,
  StationId,
} from "./sceneTypes";

export interface BearingStationOptions {
  readonly id: StationId;
  readonly stationIndex: number;
  readonly position: THREE.Vector3;
  readonly side: -1 | 1;
  readonly profile: QualityProfile;
  readonly materials: MaterialLibrary;
  readonly registry: ResourceRegistry;
}

interface MutablePose {
  readonly position: THREE.Vector3;
  readonly quaternion: THREE.Quaternion;
  readonly scale: THREE.Vector3;
}

const copyMaterialState = (
  target: THREE.MeshStandardMaterial,
  source: THREE.MeshStandardMaterial,
): void => {
  target.color.copy(source.color);
  target.emissive.copy(source.emissive);
  target.emissiveIntensity = source.emissiveIntensity;
};

export class BearingStation {
  readonly id: StationId;
  readonly root = new THREE.Group();
  readonly capRoot = new THREE.Group();
  readonly explodedRoot = new THREE.Group();
  readonly rotatingRoot = new THREE.Group();
  readonly sensorRoot = new THREE.Group();
  readonly pickProxy: THREE.Mesh;

  private readonly side: -1 | 1;
  private readonly lowTier: boolean;
  private readonly bracket = new THREE.LineSegments();
  private readonly xAxis = new THREE.Mesh();
  private readonly yAxis = new THREE.Mesh();
  private readonly sensorResponseRoot = new THREE.Group();
  private readonly housingMaterial: THREE.MeshStandardMaterial;
  private readonly sensorMaterial: THREE.MeshStandardMaterial;
  private readonly baseCapPose: MutablePose;
  private readonly baseExplodedPose: MutablePose;
  private readonly baseSensorPose: MutablePose;
  private selected = false;
  private selectedAxis: MeasurementAxis = "X";
  private selectedResponse = 0;
  private selectedPulse = 0;

  constructor(options: BearingStationOptions) {
    this.id = options.id;
    this.side = options.side;
    this.lowTier = options.profile.tier === "low";
    this.root.name = `station-${options.id}`;
    this.root.position.copy(options.position);
    this.root.userData = {
      semanticId: `station-${options.id}`,
      stationId: options.id,
      channelIndices: [options.stationIndex * 2, options.stationIndex * 2 + 1],
    };

    this.housingMaterial = options.registry.material(options.materials.frame.clone());
    this.sensorMaterial = options.registry.material(options.materials.sensor.clone());

    const saddle = new THREE.Mesh(
      options.registry.geometry(new THREE.BoxGeometry(0.72, 0.24, 0.54)),
      this.housingMaterial,
    );
    saddle.name = `station-${options.id}-saddle`;
    saddle.position.y = -0.31;
    // Major frame/drive components carry the authored contact shadows. Keeping
    // the small station layers out of the dynamic shadow pass preserves their
    // full visible geometry while avoiding twelve redundant submissions/frame.
    saddle.castShadow = false;
    saddle.receiveShadow = options.profile.shadows;
    this.root.add(saddle);

    const housingRing = new THREE.Mesh(
      options.registry.geometry(new THREE.TorusGeometry(
        0.29,
        0.105,
        Math.max(8, Math.floor(options.profile.rollerSegments * 0.75)),
        options.profile.radialSegments,
      )),
      this.housingMaterial,
    );
    housingRing.name = `station-${options.id}-housing-ring`;
    housingRing.castShadow = false;
    this.root.add(housingRing);

    this.capRoot.name = `station-${options.id}-inspection-cap`;
    const cap = new THREE.Mesh(
      options.registry.geometry(new THREE.BoxGeometry(0.64, 0.2, 0.4)),
      this.housingMaterial,
    );
    cap.position.y = 0.3;
    cap.castShadow = false;
    this.capRoot.add(cap);
    this.root.add(this.capRoot);

    this.explodedRoot.name = `station-${options.id}-exploded-parts`;
    const outerRing = new THREE.Mesh(
      options.registry.geometry(new THREE.TorusGeometry(
        0.215,
        0.034,
        8,
        options.profile.radialSegments,
      )),
      options.materials.steel,
    );
    outerRing.position.z = this.side * 0.02;
    this.explodedRoot.add(outerRing);

    this.rotatingRoot.name = `station-${options.id}-rotating`;
    const innerRing = new THREE.Mesh(
      options.registry.geometry(new THREE.TorusGeometry(
        0.105,
        0.025,
        8,
        options.profile.radialSegments,
      )),
      options.materials.darkSteel,
    );
    this.rotatingRoot.add(innerRing);

    const rollerCount = options.profile.tier === "low" ? 8 : 10;
    const rollerGeometry = options.registry.geometry(new THREE.SphereGeometry(
      0.032,
      options.profile.rollerSegments,
      Math.max(6, options.profile.rollerSegments - 2),
    ));
    const rollers = new THREE.InstancedMesh(rollerGeometry, options.materials.steel, rollerCount);
    rollers.name = `station-${options.id}-rollers`;
    const matrix = new THREE.Matrix4();
    for (let index = 0; index < rollerCount; index += 1) {
      const angle = index / rollerCount * Math.PI * 2;
      matrix.makeTranslation(Math.cos(angle) * 0.16, Math.sin(angle) * 0.16, 0);
      rollers.setMatrixAt(index, matrix);
    }
    rollers.instanceMatrix.needsUpdate = true;
    this.rotatingRoot.add(rollers);
    this.explodedRoot.add(this.rotatingRoot);
    this.root.add(this.explodedRoot);

    this.sensorRoot.name = `sensor-${options.id}`;
    this.sensorRoot.position.set(0, 0.58, this.side * 0.16);
    this.sensorResponseRoot.name = `sensor-${options.id}-response`;
    const sensor = new THREE.Mesh(
      options.registry.geometry(new THREE.BoxGeometry(0.2, 0.17, 0.16)),
      this.sensorMaterial,
    );
    sensor.name = `sensor-${options.id}-body`;
    sensor.castShadow = false;
    this.sensorResponseRoot.add(sensor);
    if (!this.lowTier) {
      const sensorCollar = new THREE.Mesh(
        options.registry.geometry(new THREE.CylinderGeometry(
          0.055,
          0.055,
          0.04,
          Math.max(12, Math.floor(options.profile.radialSegments / 2)),
        )),
        options.materials.steel,
      );
      sensorCollar.rotation.x = Math.PI / 2;
      sensorCollar.position.z = this.side * 0.1;
      this.sensorResponseRoot.add(sensorCollar);
    }
    this.sensorRoot.add(this.sensorResponseRoot);
    this.root.add(this.sensorRoot);

    const bracketGeometry = options.registry.geometry(new THREE.EdgesGeometry(
      new THREE.BoxGeometry(0.86, 1.12, 0.72),
    ));
    const bracketMaterial = options.registry.material(new THREE.LineBasicMaterial({
      color: 0xf7f0df,
      transparent: true,
      opacity: 0.92,
    }));
    this.bracket.geometry = bracketGeometry;
    this.bracket.material = bracketMaterial;
    this.bracket.name = `selection-bracket-${options.id}`;
    this.bracket.position.y = 0.1;
    this.bracket.visible = false;
    this.root.add(this.bracket);

    const axisMaterial = options.registry.material(new THREE.MeshBasicMaterial({ color: 0xf5ead5 }));
    const xGeometry = options.registry.geometry(new THREE.BoxGeometry(0.74, 0.035, 0.035));
    const yGeometry = options.registry.geometry(new THREE.BoxGeometry(0.035, 0.74, 0.035));
    this.xAxis.geometry = xGeometry;
    this.xAxis.material = axisMaterial;
    this.xAxis.position.set(0.3, 0.5, this.side * 0.32);
    this.yAxis.geometry = yGeometry;
    this.yAxis.material = axisMaterial;
    this.yAxis.position.set(0.42, 0.28, this.side * 0.32);
    this.root.add(this.xAxis, this.yAxis);

    this.pickProxy = new THREE.Mesh(
      options.registry.geometry(new THREE.BoxGeometry(0.94, 1.2, 0.9)),
      options.materials.pick,
    );
    this.pickProxy.name = `pick-station-${options.id}`;
    this.pickProxy.position.y = 0.08;
    this.pickProxy.userData = { pickId: options.id, stationId: options.id };
    this.pickProxy.renderOrder = -1;
    // Keep the generous interaction target raycastable without submitting four
    // invisible meshes to the color pass. SilentEarScene's raycaster uses layer 2.
    this.pickProxy.layers.set(2);
    this.root.add(this.pickProxy);

    this.baseCapPose = this.capturePose(this.capRoot);
    this.baseExplodedPose = this.capturePose(this.explodedRoot);
    this.baseSensorPose = this.capturePose(this.sensorRoot);
    this.setVisualState(false, "X", {
      response01: 0,
      pulse01: 0,
      approaching: false,
      equal: false,
      exceeded: false,
    }, false);
  }

  private capturePose(object: THREE.Object3D): MutablePose {
    return {
      position: object.position.clone(),
      quaternion: object.quaternion.clone(),
      scale: object.scale.clone(),
    };
  }

  getBasePose(kind: "cap" | "exploded" | "sensor"): MutablePose {
    const pose = kind === "cap"
      ? this.baseCapPose
      : kind === "exploded"
        ? this.baseExplodedPose
        : this.baseSensorPose;
    return {
      position: pose.position.clone(),
      quaternion: pose.quaternion.clone(),
      scale: pose.scale.clone(),
    };
  }

  setVisualState(
    selected: boolean,
    axis: MeasurementAxis,
    channel: ChannelRenderState,
    anyExceeded: boolean,
  ): void {
    this.selected = selected;
    this.selectedAxis = axis;
    this.selectedResponse = selected ? channel.response01 : 0;
    this.selectedPulse = selected ? channel.pulse01 : 0;

    const visualMaterial = channel.exceeded
      ? (this.sensorMaterial as THREE.MeshStandardMaterial)
      : channel.approaching || channel.equal
        ? (this.sensorMaterial as THREE.MeshStandardMaterial)
        : this.sensorMaterial;
    const source = channel.exceeded
      ? 0xa13b32
      : channel.approaching || channel.equal
        ? 0xb26b14
        : selected
          ? 0x147d73
          : 0xb97821;
    visualMaterial.color.setHex(source);
    visualMaterial.emissive.setHex(channel.exceeded ? 0x56140e : selected ? 0x073d39 : 0x5d2a06);
    visualMaterial.emissiveIntensity = selected
      ? 0.14 + this.selectedPulse * 0.32
      : anyExceeded ? 0.2 : 0.1;

    if (selected) {
      const material = channel.exceeded
        ? this.sensorMaterial
        : channel.approaching || channel.equal
          ? this.sensorMaterial
          : this.sensorMaterial;
      copyMaterialState(this.housingMaterial, material);
      this.housingMaterial.roughness = 0.43;
    } else {
      this.housingMaterial.color.setHex(0x252d2e);
      this.housingMaterial.emissive.setHex(0x000000);
      this.housingMaterial.emissiveIntensity = 0;
      this.housingMaterial.roughness = 0.52;
    }

    this.bracket.visible = selected || anyExceeded;
    const bracketMaterial = this.bracket.material as THREE.LineBasicMaterial;
    bracketMaterial.color.setHex(
      channel.exceeded || (!selected && anyExceeded)
        ? 0xa13b32
        : channel.approaching || channel.equal
          ? 0xb26b14
          : 0xf7f0df,
    );
    this.bracket.scale.setScalar(selected ? 1 : 0.92);
    this.xAxis.visible = selected;
    this.yAxis.visible = selected;
    // Every tier preserves all four housings, caps, sensors and physical flags.
    // Internal rings/rollers are focus detail: only the selected station submits
    // them, and selection changes restore the complete detail deterministically.
    // Low power also suppresses the unselected cap while keeping its housing.
    this.explodedRoot.visible = selected;
    if (this.lowTier) {
      this.capRoot.visible = selected;
    }
    this.xAxis.scale.set(axis === "X" ? 1.25 : 0.68, 1, 1);
    this.yAxis.scale.set(1, axis === "Y" ? 1.25 : 0.68, 1);
  }

  updateKinematics(shaftAngle: number, elapsedSeconds: number, reducedMotion: boolean): void {
    this.rotatingRoot.rotation.z = shaftAngle;
    this.sensorResponseRoot.position.set(0, 0, 0);
    if (this.selected && !reducedMotion) {
      const amplitude = 0.0015 + this.selectedResponse * 0.0105;
      const offset = Math.sin(elapsedSeconds * Math.PI * 12 + this.id.charCodeAt(1)) * amplitude;
      if (this.selectedAxis === "X") this.sensorResponseRoot.position.x = offset;
      else this.sensorResponseRoot.position.y = offset;
    }
  }

  getRestorationError(): number {
    const errors = [
      this.capRoot.position.distanceTo(this.baseCapPose.position),
      this.explodedRoot.position.distanceTo(this.baseExplodedPose.position),
      this.sensorRoot.position.distanceTo(this.baseSensorPose.position),
      1 - Math.abs(this.capRoot.quaternion.dot(this.baseCapPose.quaternion)),
      1 - Math.abs(this.explodedRoot.quaternion.dot(this.baseExplodedPose.quaternion)),
      1 - Math.abs(this.sensorRoot.quaternion.dot(this.baseSensorPose.quaternion)),
    ];
    return Math.max(...errors.map(Math.abs));
  }
}
