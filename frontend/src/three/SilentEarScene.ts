import * as THREE from "three";
import {
  createConveyorSceneFrame,
  stationAxisForChannel,
  type ConveyorSceneFrame,
} from "../domain/conveyorScene";
import type { ScenarioSnapshot } from "../domain/scenario";
import { ConveyorLine } from "./ConveyorLine";
import { InspectionController } from "./InspectionController";
import {
  resolveQualityProfile,
  type QualityPreference,
  type QualityProfile,
} from "./quality";
import { createMaterialLibrary, ResourceRegistry } from "./resources";
import {
  modelStateFromSceneFrame,
  type MeasurementAxis,
  type ModelMode,
  type StationId,
} from "./sceneTypes";

export type CameraMode = "overview" | "signal-path" | "threshold";

export interface SilentEarSceneOptions {
  readonly snapshot: ScenarioSnapshot;
  readonly reducedMotion?: boolean;
  readonly quality?: QualityPreference | string;
  readonly modelMode?: ModelMode;
  readonly selectedStation?: StationId;
  readonly selectedAxis?: MeasurementAxis;
  readonly onStationSelect?: (stationId: StationId) => void;
  readonly onContextLost?: () => void;
}

export interface SceneMetrics {
  readonly qualityTier: QualityProfile["tier"];
  readonly devicePixelRatio: number;
  readonly drawCalls: number;
  readonly triangles: number;
  readonly points: number;
  readonly lines: number;
  readonly geometries: number;
  readonly textures: number;
  readonly programs: number;
  readonly sceneObjects: number;
  readonly instancedMeshes: number;
  readonly instances: number;
  readonly cssWidth: number;
  readonly cssHeight: number;
  readonly bufferWidth: number;
  readonly bufferHeight: number;
  readonly shadowEnabled: boolean;
  readonly activeAnimationReasons: readonly string[];
  readonly restorationError: number;
}

interface CameraPose {
  readonly position: THREE.Vector3;
  readonly target: THREE.Vector3;
}

interface CameraTween {
  readonly startedAt: number;
  readonly durationMs: number;
  readonly fromPosition: THREE.Vector3;
  readonly fromQuaternion: THREE.Quaternion;
  readonly toPosition: THREE.Vector3;
  readonly toQuaternion: THREE.Quaternion;
}

const isStationId = (value: string): value is StationId =>
  value === "B1" || value === "B2" || value === "B3" || value === "B4";

export class SilentEarScene {
  readonly renderer: THREE.WebGLRenderer;
  readonly canvas: HTMLCanvasElement;

  private readonly container: HTMLElement;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  private readonly root = new THREE.Group();
  private readonly registry = new ResourceRegistry();
  private readonly line: ConveyorLine;
  private readonly inspection: InspectionController;
  private readonly profile: QualityProfile;
  private readonly resizeObserver?: ResizeObserver;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly onContextLost?: () => void;

  private snapshot: ScenarioSnapshot;
  private modelFrame: ConveyorSceneFrame;
  private modelMode: ModelMode;
  private selectedStation: StationId;
  private selectedAxis: MeasurementAxis;
  private onStationSelect?: (stationId: StationId) => void;
  private reducedMotion: boolean;
  private playingRequested = false;
  private documentVisible = true;
  private disposed = false;
  private animationFrame: number | null = null;
  private lastAnimationNow = 0;
  private kinematicElapsedMs = 0;
  private cameraTween?: CameraTween;
  private pointerDown?: { x: number; y: number };
  private diagnosticsDirty = true;
  private lastPublishedAnimationSignature = "__unpublished__";

  constructor(container: HTMLElement, options: SilentEarSceneOptions) {
    this.container = container;
    this.snapshot = options.snapshot;
    const snapshotSelection = stationAxisForChannel(options.snapshot.selectedChannel);
    this.selectedStation = options.selectedStation ?? snapshotSelection.stationId;
    this.selectedAxis = options.selectedAxis ?? snapshotSelection.axisId;
    this.modelMode = options.modelMode ?? "full-assembly";
    this.reducedMotion = options.reducedMotion ?? false;
    this.onStationSelect = options.onStationSelect;
    this.onContextLost = options.onContextLost;
    this.raycaster.layers.set(2);
    this.profile = resolveQualityProfile({
      width: Math.max(container.clientWidth, window.innerWidth),
      devicePixelRatio: window.devicePixelRatio || 1,
      hardwareConcurrency: navigator.hardwareConcurrency,
      preference: options.quality === "low" ||
        options.quality === "balanced" ||
        options.quality === "high" ||
        options.quality === "auto"
        ? options.quality
        : "auto",
    });

    this.renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: this.profile.antialias,
      powerPreference: this.profile.tier === "low" ? "low-power" : "high-performance",
    });
    this.canvas = this.renderer.domElement;
    this.canvas.setAttribute("aria-hidden", "true");
    this.canvas.tabIndex = -1;
    this.canvas.dataset.silentEarScene = "conveyor-test-cell";
    this.canvas.addEventListener("webglcontextlost", this.handleContextLost);
    this.canvas.addEventListener("pointerdown", this.handlePointerDown);
    this.canvas.addEventListener("pointermove", this.handlePointerMove);
    this.canvas.addEventListener("pointerup", this.handlePointerUp);
    this.canvas.addEventListener("pointerleave", this.handlePointerLeave);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.profile.dprCap));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.shadowMap.enabled = this.profile.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.replaceChildren(this.canvas);

    this.scene.background = new THREE.Color(0xded9cc);
    this.root.name = "se-cell";
    this.scene.add(this.root);
    const materials = createMaterialLibrary(this.registry);
    this.line = new ConveyorLine({
      profile: this.profile,
      materials,
      registry: this.registry,
    });
    this.root.add(this.line.root);
    this.inspection = new InspectionController(this.line);
    this.buildStudio(materials.contact);
    this.addLighting();

    this.modelFrame = createConveyorSceneFrame(this.snapshot, {
      playing: false,
      reducedMotion: this.reducedMotion,
      modelMode: this.modelMode,
      selectedStation: this.selectedStation,
      selectedAxis: this.selectedAxis,
    });
    this.applyModelFrame(this.modelFrame);
    this.inspection.setMode(this.modelMode, this.selectedStation, true);
    const initialCamera = this.cameraPose();
    this.camera.position.copy(initialCamera.position);
    this.camera.lookAt(initialCamera.target);
    this.resize();

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(container);
    }
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    this.render();
  }

  private buildStudio(contactMaterial: THREE.MeshBasicMaterial): void {
    const floor = new THREE.Mesh(
      this.registry.geometry(new THREE.PlaneGeometry(24, 16)),
      this.registry.material(new THREE.MeshStandardMaterial({
        color: 0xd5d0c4,
        metalness: 0,
        roughness: 0.94,
      })),
    );
    floor.name = "env-floor";
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.19;
    floor.receiveShadow = this.profile.shadows;
    this.root.add(floor);

    if (this.profile.tier !== "low") {
      const grid = new THREE.GridHelper(18, 18, 0x8f948d, 0xb9b8ae);
      grid.name = "env-grid";
      grid.position.y = -0.185;
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
      this.registry.geometry(grid.geometry);
      for (const material of gridMaterials) {
        material.transparent = true;
        material.opacity = 0.16;
        this.registry.material(material);
      }
      this.root.add(grid);
    }

    if (!this.profile.shadows) {
      const contactGeometry = this.registry.geometry(new THREE.CircleGeometry(1, 32));
      const contacts = [
        [-3.55, -2.35, 1.2, 0.7],
        [-3.55, 0, 1.15, 1.2],
        [3.55, 0, 1.15, 1.2],
        [0, 0, 3.5, 1.2],
      ] as const;
      const contactShadows = new THREE.InstancedMesh(contactGeometry, contactMaterial, contacts.length);
      contactShadows.name = "env-contact-shadows";
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        -Math.PI / 2,
      );
      contacts.forEach(([x, z, sx, sz], index) => {
        matrix.compose(
          new THREE.Vector3(x, -0.175, z),
          quaternion,
          new THREE.Vector3(sx, sz, 1),
        );
        contactShadows.setMatrixAt(index, matrix);
      });
      contactShadows.instanceMatrix.needsUpdate = true;
      this.root.add(contactShadows);
    }
  }

  private addLighting(): void {
    this.scene.add(new THREE.HemisphereLight(0xf4efe2, 0x485154, 1.65));
    const key = new THREE.DirectionalLight(0xfff6e2, 3.8);
    key.name = "light-key";
    key.position.set(-5.5, 8.5, -6.5);
    key.castShadow = this.profile.shadows;
    if (this.profile.shadows) {
      key.shadow.mapSize.set(this.profile.shadowMapSize, this.profile.shadowMapSize);
      key.shadow.camera.left = -7;
      key.shadow.camera.right = 7;
      key.shadow.camera.top = 6;
      key.shadow.camera.bottom = -3;
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 22;
      key.shadow.bias = -0.00025;
      key.shadow.normalBias = 0.018;
    }
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xc6d9d8, 1.25);
    fill.name = "light-fill";
    fill.position.set(7, 4, -2);
    this.scene.add(fill);
    const rim = new THREE.SpotLight(0xd99a52, 18, 18, Math.PI / 5, 0.7, 1.3);
    rim.name = "light-rim";
    rim.position.set(-5, 5, 5);
    rim.target.position.set(-2.5, 0.8, 0);
    this.scene.add(rim, rim.target);
  }

  private createFrame(): ConveyorSceneFrame {
    return createConveyorSceneFrame(this.snapshot, {
      playing: this.playingRequested,
      reducedMotion: this.reducedMotion,
      modelMode: this.modelMode,
      selectedStation: this.selectedStation,
      selectedAxis: this.selectedAxis,
    });
  }

  private applyModelFrame(frame: ConveyorSceneFrame): void {
    this.modelFrame = frame;
    this.canvas.dataset.modelMode = frame.viewMode;
    this.canvas.dataset.selectedStation = frame.selection.stationId;
    this.canvas.dataset.selectedAxis = frame.selection.axisId;
    this.canvas.dataset.selectedChannel = String(frame.selection.channelIndex);
    this.canvas.dataset.fixtureFrame = String(frame.frameIndex);
    const modelState = modelStateFromSceneFrame(frame);
    this.kinematicElapsedMs = modelState.operating.elapsedMs;
    this.line.setModelState(modelState);
    this.line.updateKinematics(
      this.kinematicElapsedMs,
      this.reducedMotion,
    );
    this.diagnosticsDirty = true;
  }

  setSnapshot(snapshot: ScenarioSnapshot): void {
    this.snapshot = snapshot;
    this.applyModelFrame(this.createFrame());
    this.invalidate();
  }

  setSceneFrame(frame: ConveyorSceneFrame): void {
    this.selectedStation = frame.selection.stationId;
    this.selectedAxis = frame.selection.axisId;
    this.modelMode = frame.viewMode;
    this.playingRequested = frame.operating.playing;
    this.reducedMotion = frame.operating.reducedMotion;
    this.applyModelFrame(frame);
    this.inspection.setMode(this.modelMode, this.selectedStation, this.reducedMotion);
    this.moveCameraToAuthoredPose();
    this.invalidate();
  }

  setSelectedChannel(channel: number): void {
    const selection = stationAxisForChannel(channel);
    const stationChanged = this.selectedStation !== selection.stationId;
    this.selectedStation = selection.stationId;
    this.selectedAxis = selection.axisId;
    this.applyModelFrame(this.createFrame());
    if (stationChanged && this.modelMode !== "full-assembly") {
      this.inspection.setMode(this.modelMode, this.selectedStation, this.reducedMotion);
      this.moveCameraToAuthoredPose();
    }
    this.invalidate();
  }

  setSelectedStation(stationId: StationId, enterInspect = false): void {
    if (!isStationId(stationId)) throw new RangeError("Station must be B1, B2, B3 or B4.");
    const stationChanged = this.selectedStation !== stationId;
    this.selectedStation = stationId;
    if (enterInspect) this.modelMode = "inspect-station";
    this.applyModelFrame(this.createFrame());
    if (stationChanged || enterInspect) {
      this.inspection.setMode(this.modelMode, this.selectedStation, this.reducedMotion);
      this.moveCameraToAuthoredPose();
    }
    this.invalidate();
  }

  setSelectedAxis(axis: MeasurementAxis): void {
    this.selectedAxis = axis;
    this.applyModelFrame(this.createFrame());
    this.invalidate();
  }

  setModelMode(mode: ModelMode): void {
    if (this.modelMode === mode) return;
    this.modelMode = mode;
    this.applyModelFrame(this.createFrame());
    this.inspection.setMode(mode, this.selectedStation, this.reducedMotion);
    this.moveCameraToAuthoredPose();
    this.invalidate();
  }

  /** Compatibility for the original stage-driven component during integration. */
  setCameraMode(mode: CameraMode): void {
    if (mode === "overview") this.setModelMode("full-assembly");
    else this.setModelMode("inspect-station");
  }

  setStationSelectHandler(handler?: (stationId: StationId) => void): void {
    this.onStationSelect = handler;
  }

  resetCamera(): void {
    this.moveCameraToAuthoredPose();
    this.invalidate();
  }

  setPlaying(playing: boolean): void {
    this.playingRequested = playing;
    this.modelFrame = this.createFrame();
    this.diagnosticsDirty = true;
    if (this.shouldAnimate()) this.startLoop();
    else {
      this.stopLoop();
      this.render();
    }
  }

  setReducedMotion(reducedMotion: boolean): void {
    this.reducedMotion = reducedMotion;
    this.diagnosticsDirty = true;
    this.applyModelFrame(this.createFrame());
    if (reducedMotion) {
      this.cameraTween = undefined;
      this.inspection.settle();
      const pose = this.cameraPose();
      this.camera.position.copy(pose.position);
      this.camera.lookAt(pose.target);
      this.stopLoop();
      this.render();
    } else if (this.shouldAnimate()) {
      this.startLoop();
    }
  }

  private cameraPose(): CameraPose {
    const width = this.container.clientWidth;
    const mobile = width < 520;
    if (this.modelMode === "full-assembly") {
      return mobile
        ? {
            position: new THREE.Vector3(7.1, 4.2, -10.6),
            target: new THREE.Vector3(0, 0.82, 0),
          }
        : {
            position: new THREE.Vector3(8.6, 5.4, -11.8),
            target: new THREE.Vector3(0, 0.82, 0),
          };
    }
    const farSide = this.selectedStation === "B2" || this.selectedStation === "B4";
    const driveStation = this.selectedStation === "B1" || this.selectedStation === "B2";
    const stationX = driveStation ? -3.55 : 3.55;
    const stationZ = farSide ? 1.18 : -1.18;
    const exploded = this.modelMode === "exploded-signal";
    const cameraX = driveStation ? (exploded ? 6.2 : 5.2) : (exploded ? -6.2 : -5.2);
    const cameraZ = (farSide ? 1 : -1) * (exploded ? 10.8 : 9.4);
    return {
      position: new THREE.Vector3(
        cameraX,
        mobile ? 4.2 : exploded ? 4.9 : 4.45,
        cameraZ,
      ),
      target: new THREE.Vector3(
        stationX * (mobile ? 0.78 : 0.85),
        0.92,
        stationZ * (mobile ? 0.68 : 0.75),
      ),
    };
  }

  private moveCameraToAuthoredPose(): void {
    const pose = this.cameraPose();
    const targetCamera = this.camera.clone();
    targetCamera.position.copy(pose.position);
    targetCamera.lookAt(pose.target);
    if (this.reducedMotion) {
      this.camera.position.copy(pose.position);
      this.camera.quaternion.copy(targetCamera.quaternion);
      this.cameraTween = undefined;
      return;
    }
    this.cameraTween = {
      startedAt: performance.now(),
      durationMs: 650,
      fromPosition: this.camera.position.clone(),
      fromQuaternion: this.camera.quaternion.clone(),
      toPosition: pose.position.clone(),
      toQuaternion: targetCamera.quaternion.clone(),
    };
    this.startLoop();
  }

  private animationReasons(): string[] {
    const reasons: string[] = [];
    if (this.playingRequested && !this.reducedMotion && this.modelMode !== "exploded-signal") {
      reasons.push("playback");
    }
    if (this.cameraTween) reasons.push("camera-tween");
    if (this.inspection.isAnimating) reasons.push("model-transition");
    return reasons;
  }

  private shouldAnimate(): boolean {
    return this.documentVisible && this.animationReasons().length > 0;
  }

  private invalidate(): void {
    if (this.shouldAnimate()) this.startLoop();
    else this.render();
  }

  private startLoop(): void {
    if (this.animationFrame !== null || this.disposed || !this.documentVisible) return;
    this.lastAnimationNow = performance.now();
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  private stopLoop(): void {
    if (this.animationFrame !== null) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.lastAnimationNow = 0;
  }

  private readonly animate = (now: number): void => {
    this.animationFrame = null;
    if (this.disposed || !this.documentVisible) return;
    const deltaMs = this.lastAnimationNow === 0
      ? 0
      : Math.min(50, Math.max(0, now - this.lastAnimationNow));
    this.lastAnimationNow = now;
    if (this.playingRequested && !this.reducedMotion && this.modelMode !== "exploded-signal") {
      this.kinematicElapsedMs += deltaMs;
    }
    this.line.updateKinematics(
      this.kinematicElapsedMs,
      this.reducedMotion,
    );
    this.inspection.update(now);
    if (this.cameraTween) {
      const raw = THREE.MathUtils.clamp(
        (now - this.cameraTween.startedAt) / this.cameraTween.durationMs,
        0,
        1,
      );
      const amount = THREE.MathUtils.smoothstep(raw, 0, 1);
      this.camera.position.lerpVectors(
        this.cameraTween.fromPosition,
        this.cameraTween.toPosition,
        amount,
      );
      this.camera.quaternion.slerpQuaternions(
        this.cameraTween.fromQuaternion,
        this.cameraTween.toQuaternion,
        amount,
      );
      if (raw >= 1) {
        this.camera.position.copy(this.cameraTween.toPosition);
        this.camera.quaternion.copy(this.cameraTween.toQuaternion);
        this.cameraTween = undefined;
      }
    }
    this.render();
    if (this.shouldAnimate()) this.animationFrame = requestAnimationFrame(this.animate);
    else this.lastAnimationNow = 0;
  };

  private pickStation(event: PointerEvent): StationId | null {
    const bounds = this.canvas.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return null;
    this.pointer.set(
      (event.clientX - bounds.left) / bounds.width * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects([...this.line.pickTargets], false)[0];
    const stationId = hit?.object.userData.stationId;
    return typeof stationId === "string" && isStationId(stationId) ? stationId : null;
  }

  private readonly handlePointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    this.pointerDown = { x: event.clientX, y: event.clientY };
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    if (event.pointerType === "touch") return;
    this.canvas.style.cursor = this.pickStation(event) ? "pointer" : "default";
  };

  private readonly handlePointerUp = (event: PointerEvent): void => {
    if (event.button !== 0 || !this.pointerDown) return;
    const movement = Math.hypot(
      event.clientX - this.pointerDown.x,
      event.clientY - this.pointerDown.y,
    );
    this.pointerDown = undefined;
    if (movement > 8) return;
    const station = this.pickStation(event);
    if (!station) return;
    this.setSelectedStation(station, true);
    this.onStationSelect?.(station);
  };

  private readonly handlePointerLeave = (): void => {
    this.pointerDown = undefined;
    this.canvas.style.cursor = "default";
  };

  private readonly handleVisibilityChange = (): void => {
    this.documentVisible = document.visibilityState !== "hidden";
    if (!this.documentVisible) this.stopLoop();
    else if (this.shouldAnimate()) this.startLoop();
  };

  private readonly handleContextLost = (event: Event): void => {
    event.preventDefault();
    this.stopLoop();
    this.onContextLost?.();
  };

  resize(): void {
    if (this.disposed) return;
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight || Math.min(620, width * 0.72));
    this.camera.fov = width < 520 ? 38 : 34;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    if (!this.cameraTween) {
      const pose = this.cameraPose();
      this.camera.position.copy(pose.position);
      this.camera.lookAt(pose.target);
    }
    this.renderer.setSize(width, height, false);
    this.diagnosticsDirty = true;
    this.render();
  }

  render(): void {
    if (this.disposed) return;
    this.renderer.render(this.scene, this.camera);
    const animationSignature = this.animationReasons().join("|");
    if (this.diagnosticsDirty || animationSignature !== this.lastPublishedAnimationSignature) {
      this.publishDiagnostics();
      this.diagnosticsDirty = false;
      this.lastPublishedAnimationSignature = animationSignature;
    }
  }

  private publishDiagnostics(): void {
    const measured = this.getMetrics();
    const published = {
      tier: measured.qualityTier,
      dpr: measured.devicePixelRatio,
      drawCalls: measured.drawCalls,
      triangles: measured.triangles,
      points: measured.points,
      lines: measured.lines,
      geometries: measured.geometries,
      textures: measured.textures,
      programs: measured.programs,
      sceneObjects: measured.sceneObjects,
      instancedMeshes: measured.instancedMeshes,
      instances: measured.instances,
      cssWidth: measured.cssWidth,
      cssHeight: measured.cssHeight,
      bufferWidth: measured.bufferWidth,
      bufferHeight: measured.bufferHeight,
      shadowEnabled: measured.shadowEnabled,
      activeAnimationReasons: measured.activeAnimationReasons,
      restorationError: measured.restorationError,
    };
    const serialized = JSON.stringify(published);
    this.container.dataset.rendererMetrics = serialized;
    this.canvas.dataset.rendererMetrics = serialized;
  }

  getMetrics(): SceneMetrics {
    const info = this.renderer.info;
    const size = new THREE.Vector2();
    this.renderer.getDrawingBufferSize(size);
    let sceneObjects = 0;
    let instancedMeshes = 0;
    let instances = 0;
    this.scene.traverse((object) => {
      sceneObjects += 1;
      if (object instanceof THREE.InstancedMesh) {
        instancedMeshes += 1;
        instances += object.count;
      }
    });
    return {
      qualityTier: this.profile.tier,
      devicePixelRatio: this.renderer.getPixelRatio(),
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      points: info.render.points,
      lines: info.render.lines,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      programs: info.programs?.length ?? 0,
      sceneObjects,
      instancedMeshes,
      instances,
      cssWidth: Math.max(1, this.container.clientWidth),
      cssHeight: Math.max(1, this.container.clientHeight),
      bufferWidth: size.x,
      bufferHeight: size.y,
      shadowEnabled: this.renderer.shadowMap.enabled,
      activeAnimationReasons: this.animationReasons(),
      restorationError: this.inspection.getRestorationError(),
    };
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stopLoop();
    this.cameraTween = undefined;
    this.resizeObserver?.disconnect();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    this.canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this.canvas.removeEventListener("pointermove", this.handlePointerMove);
    this.canvas.removeEventListener("pointerup", this.handlePointerUp);
    this.canvas.removeEventListener("pointerleave", this.handlePointerLeave);
    this.onStationSelect = undefined;
    this.registry.dispose();
    this.renderer.renderLists.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    if (this.canvas.parentElement === this.container) this.container.removeChild(this.canvas);
  }
}
