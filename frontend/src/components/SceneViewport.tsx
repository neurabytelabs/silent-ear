import { useEffect, useRef, useState } from "react";
import type { ScenarioSnapshot } from "../domain/scenario";
import { SilentEarScene } from "../three";
import { ConveyorSchematic } from "./ConveyorSchematic";
import type { MeasurementAxis, ModelMode, StationId } from "./MachineControls";

export interface SceneMetrics {
  readonly tier: string;
  readonly dpr: number;
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

interface SceneViewportProps {
  readonly snapshot: ScenarioSnapshot;
  readonly selectedChannel: number;
  readonly playing: boolean;
  readonly reducedMotion: boolean;
  readonly forceFallback: boolean;
  readonly modelMode?: ModelMode;
  readonly selectedStation?: StationId;
  readonly selectedAxis?: MeasurementAxis;
  readonly cameraResetKey?: number;
  readonly onStationSelect?: (station: StationId) => void;
  readonly onFallback: () => void;
  readonly onMetrics: (metrics: SceneMetrics | null) => void;
}

type ExtendedSilentEarScene = SilentEarScene & {
  setSelectedStation?: (station: StationId) => void;
  setSelectedAxis?: (axis: MeasurementAxis) => void;
  setModelMode?: (mode: ModelMode) => void;
  resetCamera?: () => void;
};

function publishMetrics(
  scene: SilentEarScene,
  host: HTMLDivElement | null,
  onMetrics: (metrics: SceneMetrics | null) => void,
): void {
  const measured = scene.getMetrics();
  const metrics: SceneMetrics = {
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
  if (host) host.dataset.rendererMetrics = JSON.stringify(metrics);
  onMetrics(metrics);
}

function cameraFor(snapshot: ScenarioSnapshot): "overview" | "signal-path" | "threshold" {
  if (snapshot.stage === "learning-demo-baseline" || snapshot.stage === "comparing-rms") {
    return "signal-path";
  }
  if (
    snapshot.stage === "approaching-demo-threshold" ||
    snapshot.stage === "demo-threshold-exceeded"
  ) {
    return "threshold";
  }
  return "overview";
}

export function SceneViewport({
  snapshot,
  selectedChannel,
  playing,
  reducedMotion,
  forceFallback,
  modelMode,
  selectedStation,
  selectedAxis,
  cameraResetKey = 0,
  onStationSelect,
  onFallback,
  onMetrics,
}: SceneViewportProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SilentEarScene | null>(null);
  const stationSelectRef = useRef(onStationSelect);
  const previousCameraResetKey = useRef(cameraResetKey);
  const [failed, setFailed] = useState(false);
  const station = selectedStation ?? (["B1", "B2", "B3", "B4"] as const)[Math.floor(selectedChannel / 2)] ?? "B1";
  const axis = selectedAxis ?? (selectedChannel % 2 === 0 ? "X" : "Y");
  const mode = modelMode ?? "full-assembly";

  stationSelectRef.current = onStationSelect;

  useEffect(() => {
    if (forceFallback || !hostRef.current) return undefined;

    try {
      const sceneOptions = {
        snapshot,
        reducedMotion,
        quality: "auto",
        onContextLost: onFallback,
        onStationSelect: (nextStation: StationId) => stationSelectRef.current?.(nextStation),
      };
      const scene = new SilentEarScene(hostRef.current, sceneOptions);
      sceneRef.current = scene;
      scene.setSelectedChannel(selectedChannel);
      scene.setPlaying(playing);
      const extendedScene = scene as ExtendedSilentEarScene;
      extendedScene.setSelectedStation?.(station);
      extendedScene.setSelectedAxis?.(axis);
      if (modelMode) extendedScene.setModelMode?.(modelMode);
      else scene.setCameraMode(cameraFor(snapshot));
      scene.render();
      publishMetrics(scene, hostRef.current, onMetrics);
    } catch {
      setFailed(true);
      onFallback();
      onMetrics(null);
    }

    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [forceFallback]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.setSnapshot(snapshot);
    scene.setSelectedChannel(selectedChannel);
    scene.setPlaying(playing);
    scene.setReducedMotion(reducedMotion);
    const extendedScene = scene as ExtendedSilentEarScene;
    extendedScene.setSelectedStation?.(station);
    extendedScene.setSelectedAxis?.(axis);
    if (modelMode) extendedScene.setModelMode?.(modelMode);
    else scene.setCameraMode(cameraFor(snapshot));
    scene.render();
    publishMetrics(scene, hostRef.current, onMetrics);
  }, [axis, modelMode, onMetrics, playing, reducedMotion, selectedChannel, snapshot, station]);

  useEffect(() => {
    if (previousCameraResetKey.current === cameraResetKey) return;
    previousCameraResetKey.current = cameraResetKey;
    (sceneRef.current as ExtendedSilentEarScene | null)?.resetCamera?.();
  }, [cameraResetKey]);

  if (forceFallback || failed) {
    return (
      <div className="fallback-panel" data-testid="webgl-fallback">
        <p className="fallback-title">3D view unavailable — the complete controlled demo remains available below.</p>
        <p className="fallback-support">The schematic preserves the same conveyor stations and RMS-channel selection.</p>
        <ConveyorSchematic
          mode={mode}
          station={station}
          axis={axis}
          onStationSelect={onStationSelect}
        />
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className="scene-host"
      data-testid="scene-host"
      aria-label={`Explanatory conveyor test cell in ${mode.replaceAll("-", " ")} mode; Bearing ${station.slice(1)}, ${axis} direction selected`}
      role="img"
    />
  );
}
