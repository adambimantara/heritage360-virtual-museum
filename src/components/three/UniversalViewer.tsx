import {
  Component,
  Suspense,
  useEffect,
  useRef,
  type ElementRef,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
type OrbitControlsImpl = ElementRef<typeof OrbitControls>;
import { KerisModel, BLADE_LEN } from "./KerisModel";
import {
  TopengPanjiModel,
  BatikModel,
  WayangKulitModel,
  BlangkonModel,
  GebyogModel,
  LurikModel,
  PerakKotagedeModel,
  GerabahKasonganModel,
  GamelanModel,
  SurjanModel,
  JemparinganModel,
  WayangGolekModel,
  PerhiasanSumpingModel,
} from "./ArtifactModels";
import { COLLECTION_HOTSPOTS, HOTSPOTS, type HotspotId, type Hotspot } from "../../data";
import { lukOffset } from "../../lib/keris";

export type ViewerApi = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  spin: () => void;
};

const HOME = new THREE.Vector3(0.5, 0.2, 7.8);
const TARGET = new THREE.Vector3(0, 0, 0);
const MIN = 2.4;
const MAX = 14;

// Default hotspot coordinates map for each collection
const HOTSPOT_COORDS: Record<string, Record<string, [number, number, number]>> = {
  "keris-yogyakarta": {
    luk: [lukOffset(0.62) * BLADE_LEN + 0.12, 0.62 * BLADE_LEN - 1.25, 0.06],
    pamor: [lukOffset(0.32) * BLADE_LEN, 0.32 * BLADE_LEN - 1.25, 0.06],
    ganja: [-0.3, -0.04 - 1.25, 0.06],
    ukiran: [0.06, -0.62 - 1.25, 0.12],
    warangka: [1.5, 0.5 - 1.25, -0.35],
  },
  "topeng-panji": {
    alis: [0, 0.45, 0.45],
    mripat: [-0.35, 0.25, 0.45],
    grana: [0, 0.05, 0.52],
    sunggingan: [0, 1.25, 0.4],
  },
  "batik-kawung": {
    kelopak: [0, 0.4, 0.1],
    "titik-pusat": [0.35, 0.8, 0.1],
    gawangan: [0, 1.6, 0.1],
  },
  "batik-parang": {
    "parang-lereng": [0, 0.5, 0.1],
    mlinjon: [-0.4, 0.8, 0.1],
    sogan: [0.4, 0.2, 0.1],
  },
  "wayang-kulit": {
    gelung: [-0.45, 1.45, 0.1],
    kuku: [-0.95, -0.25, 0.1],
    gapit: [0, -0.8, 0.1],
  },
  "blangkon-mondolan": {
    mondolan: [0, 0.1, -0.92],
    wiron: [0, 0.25, 0.95],
    kuncir: [-0.85, -0.12, -0.2],
  },
  "blangkon-yogyakarta": {
    mondolan: [0, 0.1, -0.92],
    wiron: [0, 0.25, 0.95],
    kuncir: [-0.85, -0.12, -0.2],
  },
  "gebyog-kayu-jati": {
    "tumpang-sari": [0, 1.85, 0.2],
    "lung-lungan": [0, 2.12, 0.2],
    lawang: [-0.55, 0.55, 0.15],
  },
  "gebyog-ukiran-kayu": {
    "tumpang-sari": [0, 1.85, 0.2],
    "lung-lungan": [0, 2.12, 0.2],
    lawang: [-0.55, 0.55, 0.15],
  },
  "kain-lurik": {
    "corak-telupat": [0, 0.7, 0.5],
    "benang-pakan": [0, -0.3, 0.4],
    kelim: [1.0, -0.3, 0.4],
  },
  "kerajinan-perak-kotagede": {
    filigri: [0, 0.2, 0.95],
    cucuk: [0.9, 0.4, 0.1],
    makutha: [0, 1.42, 0.1],
  },
  "perak-kotagede": {
    filigri: [0, 0.2, 0.95],
    cucuk: [0.9, 0.4, 0.1],
    makutha: [0, 1.42, 0.1],
  },
  "gerabah-kasongan": {
    kendhi: [0, 0.1, 0.95],
    "cucuk-cerat": [0.75, 0.45, 0.1],
    lempung: [0, -0.75, 0.65],
  },
  "gamelan-jawa": {
    pencu: [0, 0.35, 0.25],
    naga: [1.5, 1.7, 0.1],
    tabuh: [1.1, -0.2, 0.2],
  },
  "gamelan-yogyakarta": {
    pencu: [0, 0.35, 0.25],
    naga: [1.5, 1.7, 0.1],
    tabuh: [1.1, -0.2, 0.2],
  },
  "surjan-pranakan": {
    kerah: [0, 1.3, 0.25],
    kancing: [0.08, 0.65, 0.55],
    "lurik-biru": [0, 0.4, 0.55],
  },
  "jemparingan-mataram": {
    gandewa: [0.42, 0, 0.1],
    kendit: [-0.05, 0, 0.1],
    jemparing: [-0.25, 0.95, 0.25],
  },
  "wayang-golek-menak": {
    jamang: [0, 1.55, 0.1],
    tuding: [-0.45, 0.35, 0.2],
    jarik: [0, -0.4, 0.4],
  },
  "perhiasan-sumping-pending": {
    "lar-sumping": [0.65, 0.3, 0.1],
    mirah: [0, -0.65, 0.15],
    pending: [0, -0.65, 0.05],
  },
  "perhiasan-sumping-mataram": {
    "lar-sumping": [0.65, 0.3, 0.1],
    mirah: [0, -0.65, 0.15],
    pending: [0, -0.65, 0.05],
  },
};

function Rig({
  apiRef,
  autoRotate,
  allowZoom,
  allowRotate,
  zoomLabel,
  angleLabel,
}: {
  apiRef?: MutableRefObject<ViewerApi | null>;
  autoRotate: boolean;
  allowZoom: boolean;
  allowRotate: boolean;
  zoomLabel?: RefObject<HTMLElement | null>;
  angleLabel?: RefObject<HTMLElement | null>;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera, size } = useThree();
  const home = useRef(size.width < 640 ? HOME.clone().setZ(10.2) : HOME).current;

  useEffect(() => {
    camera.position.copy(home);
  }, [camera, home]);

  const anim = useRef({ dist: null as number | null, reset: false, spin: 0 });
  const last = useRef({ z: -1, a: -1 });

  useEffect(() => {
    if (!apiRef) return;
    const dist = () => camera.position.distanceTo(controls.current?.target ?? TARGET);
    apiRef.current = {
      zoomIn: () => {
        anim.current.reset = false;
        anim.current.dist = THREE.MathUtils.clamp((anim.current.dist ?? dist()) * 0.75, MIN, MAX);
      },
      zoomOut: () => {
        anim.current.reset = false;
        anim.current.dist = THREE.MathUtils.clamp((anim.current.dist ?? dist()) / 0.75, MIN, MAX);
      },
      reset: () => {
        anim.current = { dist: null, reset: true, spin: 0 };
      },
      spin: () => {
        anim.current.spin = Math.PI * 2;
      },
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, camera]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    const a = anim.current;
    const k = 1 - Math.exp(-dt * 6);
    if (a.spin > 0) {
      const step = Math.min(a.spin, dt * 2.8);
      const off = camera.position
        .clone()
        .sub(c.target)
        .applyAxisAngle(THREE.Object3D.DEFAULT_UP, step);
      camera.position.copy(c.target).add(off);
      a.spin -= step;
    }
    if (a.reset) {
      camera.position.lerp(home, k);
      c.target.lerp(TARGET, k);
      if (camera.position.distanceTo(home) < 0.04) a.reset = false;
    } else if (a.dist != null) {
      const dir = camera.position.clone().sub(c.target).normalize();
      const targetPos = c.target.clone().add(dir.multiplyScalar(a.dist));
      camera.position.lerp(targetPos, k);
      if (Math.abs(camera.position.distanceTo(c.target) - a.dist) < 0.04) a.dist = null;
    }
    c.update();

    if (zoomLabel?.current) {
      const pct = Math.round((HOME.z / camera.position.distanceTo(c.target)) * 100);
      if (pct !== last.current.z) {
        last.current.z = pct;
        zoomLabel.current.textContent = `${pct}%`;
      }
    }
    if (angleLabel?.current) {
      const v = camera.position.clone().sub(c.target);
      const deg = Math.round(((Math.atan2(v.x, v.z) * 180) / Math.PI + 360) % 360);
      if (deg !== last.current.a) {
        last.current.a = deg;
        angleLabel.current.textContent = `${deg}°`;
      }
    }
  });

  return (
    <OrbitControls
      ref={controls}
      target={TARGET.toArray()}
      autoRotate={autoRotate}
      autoRotateSpeed={1.8}
      enableZoom={allowZoom}
      enableRotate={allowRotate}
      minDistance={MIN}
      maxDistance={MAX}
      maxPolarAngle={Math.PI / 1.7}
      minPolarAngle={Math.PI / 8}
      dampingFactor={0.06}
      enableDamping
    />
  );
}

function CustomGLBModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} scale={1.5} position={[0, -0.5, 0]} />;
}

function ArtifactSwitch({ id, customUrl }: { id: string; customUrl?: string }) {
  if (customUrl) {
    return (
      <Suspense fallback={null}>
        <CustomGLBModel url={customUrl} />
      </Suspense>
    );
  }

  switch (id) {
    case "topeng-panji":
      return <TopengPanjiModel />;
    case "batik-kawung":
      return <BatikModel pattern="kawung" />;
    case "batik-parang":
      return <BatikModel pattern="parang" />;
    case "wayang-kulit":
      return <WayangKulitModel />;
    case "blangkon-yogyakarta":
    case "blangkon-mondolan":
      return <BlangkonModel />;
    case "gebyog-ukiran-kayu":
    case "gebyog-kayu-jati":
      return <GebyogModel />;
    case "kain-lurik":
      return <LurikModel />;
    case "perak-kotagede":
    case "kerajinan-perak-kotagede":
      return <PerakKotagedeModel />;
    case "gerabah-kasongan":
      return <GerabahKasonganModel />;
    case "gamelan-yogyakarta":
    case "gamelan-jawa":
      return <GamelanModel />;
    case "surjan-pranakan":
      return <SurjanModel />;
    case "jemparingan-mataram":
      return <JemparinganModel />;
    case "wayang-golek-menak":
      return <WayangGolekModel />;
    case "perhiasan-sumping-mataram":
    case "perhiasan-sumping-pending":
      return <PerhiasanSumpingModel />;
    case "keris-yogyakarta":
    default:
      return (
        <group position={[0, -1.25, 0]}>
          <KerisModel />
        </group>
      );
  }
}

function Hotspots({
  collectionId,
  active,
  onSelect,
}: {
  collectionId: string;
  active?: HotspotId | null;
  onSelect?: (id: HotspotId) => void;
}) {
  const items: Hotspot[] = COLLECTION_HOTSPOTS[collectionId] || HOTSPOTS;
  const coordsMap = HOTSPOT_COORDS[collectionId] || HOTSPOT_COORDS["keris-yogyakarta"];

  return (
    <>
      {items.map((h, i) => {
        const p = coordsMap[h.id] || [0.4 * (i - 1), 0.5 * (i - 1), 0.2];
        const isSelected = active === h.id;
        return (
          <group key={h.id} position={p}>
            <Html center distanceFactor={8} zIndexRange={[10, 0]}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.(h.id);
                }}
                aria-label={`Titik anatomi ${h.label}: ${h.title}`}
                className={`group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "border-gold bg-gold text-charcoal scale-125 shadow-lg shadow-gold/40"
                    : "border-gold/80 bg-ink/90 text-ivory hover:border-gold hover:scale-115"
                }`}
              >
                <span className="font-serif text-[11px] font-bold leading-none">{i + 1}</span>
                <span
                  className={`pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[2px] border border-gold/30 bg-ink/95 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-ivory uppercase shadow-md transition-opacity duration-200 ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {h.label}
                </span>
              </button>
            </Html>
          </group>
        );
      })}
    </>
  );
}

function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

class GLBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

export function UniversalArtifactViewer({
  collectionId = "keris-yogyakarta",
  customModelUrl,
  apiRef,
  autoRotate = true,
  allowZoom = true,
  allowRotate = true,
  showHotspots = true,
  activeHotspot,
  onHotspot,
  zoomLabel,
  angleLabel,
  fallback,
}: {
  collectionId?: string;
  customModelUrl?: string;
  apiRef?: MutableRefObject<ViewerApi | null>;
  autoRotate?: boolean;
  allowZoom?: boolean;
  allowRotate?: boolean;
  showHotspots?: boolean;
  activeHotspot?: HotspotId | null;
  onHotspot?: (id: HotspotId) => void;
  zoomLabel?: RefObject<HTMLElement | null>;
  angleLabel?: RefObject<HTMLElement | null>;
  fallback?: ReactNode;
}) {
  if (!hasWebGL()) return <>{fallback}</>;

  return (
    <GLBoundary fallback={fallback}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: HOME.toArray(), fov: 36, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ touchAction: allowRotate ? "none" : "auto" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[-2, 4, 6]} intensity={1.8} color="#fff4e2" />
        <spotLight
          position={[3, 8, 5]}
          angle={0.45}
          penumbra={0.8}
          intensity={65}
          color="#fff6e8"
          castShadow
        />
        <pointLight position={[-4, 2, -3]} intensity={22} color="#b89a62" />

        <Suspense fallback={null}>
          <ArtifactSwitch id={collectionId} customUrl={customModelUrl} />
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.6}
            scale={7.5}
            blur={2.4}
            far={3.2}
            color="#000"
          />
          <Environment resolution={256}>
            <Lightformer
              intensity={2.4}
              position={[0, 4, -4]}
              scale={[10, 1.5, 1]}
              color="#fff4e2"
            />
            <Lightformer
              intensity={1.4}
              position={[-5, 1, 1]}
              rotation-y={Math.PI / 2}
              scale={[8, 2, 1]}
              color="#d8c7a0"
            />
            <Lightformer
              intensity={1.8}
              position={[5, 1, 2]}
              rotation-y={-Math.PI / 2}
              scale={[8, 1, 1]}
              color="#ffffff"
            />
            <Lightformer intensity={0.7} position={[0, -3, 3]} scale={[10, 2, 1]} color="#b89a62" />
          </Environment>
        </Suspense>

        {showHotspots && (
          <Hotspots collectionId={collectionId} active={activeHotspot} onSelect={onHotspot} />
        )}

        <Rig
          apiRef={apiRef}
          autoRotate={autoRotate}
          allowZoom={allowZoom}
          allowRotate={allowRotate}
          zoomLabel={zoomLabel}
          angleLabel={angleLabel}
        />
      </Canvas>
    </GLBoundary>
  );
}

// Re-export aliases for compatibility
export const KerisViewer = UniversalArtifactViewer;
export const UniversalViewer = UniversalArtifactViewer;
export default UniversalArtifactViewer;
