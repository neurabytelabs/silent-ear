import * as THREE from "three";

export class ResourceRegistry {
  private readonly geometries = new Set<THREE.BufferGeometry>();
  private readonly materials = new Set<THREE.Material>();
  private readonly textures = new Set<THREE.Texture>();

  geometry<T extends THREE.BufferGeometry>(geometry: T): T {
    this.geometries.add(geometry);
    return geometry;
  }

  material<T extends THREE.Material>(material: T): T {
    this.materials.add(material);
    return material;
  }

  texture<T extends THREE.Texture>(texture: T): T {
    this.textures.add(texture);
    return texture;
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
    for (const texture of this.textures) texture.dispose();
    this.geometries.clear();
    this.materials.clear();
    this.textures.clear();
  }
}

export interface MaterialLibrary {
  readonly frame: THREE.MeshStandardMaterial;
  readonly guard: THREE.MeshStandardMaterial;
  readonly steel: THREE.MeshStandardMaterial;
  readonly darkSteel: THREE.MeshStandardMaterial;
  readonly rubber: THREE.MeshStandardMaterial;
  readonly carrier: THREE.MeshStandardMaterial;
  readonly workpiece: THREE.MeshStandardMaterial;
  readonly sensor: THREE.MeshStandardMaterial;
  readonly selected: THREE.MeshStandardMaterial;
  readonly approach: THREE.MeshStandardMaterial;
  readonly exceeded: THREE.MeshStandardMaterial;
  readonly contact: THREE.MeshBasicMaterial;
  readonly pick: THREE.MeshBasicMaterial;
}

export function createMaterialLibrary(registry: ResourceRegistry): MaterialLibrary {
  const standard = (
    color: number,
    metalness: number,
    roughness: number,
    extra: THREE.MeshStandardMaterialParameters = {},
  ) => registry.material(new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    ...extra,
  }));

  return {
    frame: standard(0x252d2e, 0.46, 0.52),
    guard: standard(0x4b5250, 0.3, 0.58),
    steel: standard(0x8c989a, 0.88, 0.3),
    darkSteel: standard(0x303a3b, 0.72, 0.4),
    rubber: standard(0x171b1b, 0.02, 0.86),
    carrier: standard(0x596365, 0.55, 0.48),
    workpiece: standard(0x8f8778, 0.2, 0.64),
    sensor: standard(0xb97821, 0.27, 0.43, {
      emissive: 0x5d2a06,
      emissiveIntensity: 0.16,
    }),
    selected: standard(0x147d73, 0.36, 0.37, {
      emissive: 0x073d39,
      emissiveIntensity: 0.2,
    }),
    approach: standard(0xb26b14, 0.28, 0.42, {
      emissive: 0x593005,
      emissiveIntensity: 0.2,
    }),
    exceeded: standard(0xa13b32, 0.3, 0.39, {
      emissive: 0x56140e,
      emissiveIntensity: 0.27,
    }),
    contact: registry.material(new THREE.MeshBasicMaterial({
      color: 0x252a29,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    })),
    pick: registry.material(new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      colorWrite: false,
    })),
  };
}
