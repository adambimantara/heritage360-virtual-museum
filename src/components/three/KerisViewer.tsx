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
import { ContactShadows, Environment, Html, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
type OrbitControlsImpl = ElementRef<typeof OrbitControls>;
import { KerisModel, BLADE_LEN } from "./KerisModel";
import { HOTSPOTS, type HotspotId } from "../../data";
import { lukOffset } from "../../lib/keris";

export type ViewerApi = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  spin: () => void;
};

const HOME = new THREE.Vector3(0.7, 0.2, 8.2);
const TARGET = new THREE.Vector3(0.4, -0.2, 0);
const MIN = 2.6;
const MAX = 13;

const hotspotPos: Record<HotspotId, [number, number, number]> = {
  luk: [lukOffset(0.62) * BLADE_LEN + 0.12, 0.62 * BLADE_LEN, 0.06],
  pamor: [lukOffset(0.32) * BLADE_LEN, 0.32 * BLADE_LEN, 0.06],
  ganja: [-0.3, -0.04, 0.06],
  ukiran: [0.06, -0.62, 0.12],
  warangka: [1.5, 0.5, -0.35],
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
  // Narrow viewports frame the model from further back so the toolbar does not cover it.
  const home = useRef(size.width < 640 ? HOME.clone().setZ(10.8) : HOME).current;
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
      if (camera.position.distanceTo(home) < 0.01) a.reset = false;
    } else if (a.dist != null) {
      const off = camera.position.clone().sub(c.target);
      const len = THREE.MathUtils.lerp(off.length(), a.dist, k);
      off.setLength(len);
      camera.position.copy(c.target).add(off);
      if (Math.abs(len - a.dist) < 0.005) a.dist = null;
    }
    c.update();

    const z = Math.round((home.distanceTo(TARGET) / camera.position.distanceTo(c.target)) * 100);
    let ang = Math.round(THREE.MathUtils.radToDeg(c.getAzimuthalAngle()));
    ang = (ang + 360) % 360;
    if (zoomLabel?.current && z !== last.current.z) zoomLabel.current.textContent = `${z}%`;
    if (angleLabel?.current && ang !== last.current.a) angleLabel.current.textContent = `${ang}°`;
    last.current = { z, a: ang };
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={TARGET}
      enablePan={false}
      enableZoom={allowZoom}
      enableRotate={allowRotate}
      enableDamping
      dampingFactor={0.08}
      minDistance={MIN}
      maxDistance={MAX}
      autoRotate={autoRotate}
      autoRotateSpeed={1.4}
      onStart={() => {
        anim.current.dist = null;
        anim.current.reset = false;
      }}
    />
  );
}

function Hotspots({
  active,
  onSelect,
}: {
  active?: HotspotId | null;
  onSelect?: (id: HotspotId) => void;
}) {
  return (
    <>
      {/* Sentinel: the first drei <Html> mounted in a scene is dropped under React 19, so mount an empty one first. */}
      <Html position={[0, 0, 0]}>
        <span />
      </Html>
      {HOTSPOTS.map((h, i) => (
        <Html key={h.id} position={hotspotPos[h.id]} center zIndexRange={[20, 0]}>
          <button
            onClick={() => onSelect?.(h.id)}
            className={`group flex items-center gap-2 whitespace-nowrap cursor-pointer ${active === h.id ? "" : ""}`}
            aria-label={`Detail: ${h.title}`}
          >
            <span
              className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold transition-all duration-300 ${
                active === h.id
                  ? "border-gold bg-gold text-charcoal scale-110"
                  : "border-gold/80 bg-ink/70 text-gold backdrop-blur hover:bg-gold hover:text-charcoal"
              }`}
            >
              {i + 1}
              {active !== h.id && (
                <span className="absolute inset-0 animate-ping rounded-full border border-gold/50" />
              )}
            </span>
            <span
              className={`hidden bg-ink/80 px-2 py-1 text-[10px] font-semibold tracking-[0.16em] text-ivory uppercase backdrop-blur transition-opacity sm:block ${
                active === h.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {h.label}
            </span>
          </button>
        </Html>
      ))}
    </>
  );
}

class GLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

export default function KerisViewer({
  apiRef,
  autoRotate = false,
  allowZoom = true,
  allowRotate = true,
  showHotspots = false,
  activeHotspot,
  onHotspot,
  zoomLabel,
  angleLabel,
  fallback = null,
}: {
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
        camera={{ position: HOME.toArray(), fov: 34, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        style={{ touchAction: allowRotate ? "none" : "auto" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[-2, 3, 6]} intensity={1.6} color="#fff1dc" />
        <spotLight
          position={[3, 7, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={60}
          color="#fff4e0"
          castShadow
        />
        <pointLight position={[-4, 2, -3]} intensity={18} color="#b89a62" />
        <Suspense fallback={null}>
          <group position={[0, -1.25, 0]}>
            <KerisModel />
          </group>
          <ContactShadows
            position={[0.35, -2.25, 0]}
            opacity={0.55}
            scale={7}
            blur={2.6}
            far={3}
            color="#000"
          />
          <Environment resolution={256}>
            <Lightformer
              intensity={2.2}
              position={[0, 4, -4]}
              scale={[10, 1.5, 1]}
              color="#fff2dc"
            />
            <Lightformer
              intensity={1.2}
              position={[-5, 1, 1]}
              rotation-y={Math.PI / 2}
              scale={[8, 2, 1]}
              color="#d8c7a0"
            />
            <Lightformer
              intensity={1.6}
              position={[5, 1, 2]}
              rotation-y={-Math.PI / 2}
              scale={[8, 1, 1]}
              color="#ffffff"
            />
            <Lightformer intensity={0.6} position={[0, -3, 3]} scale={[10, 2, 1]} color="#b89a62" />
          </Environment>
        </Suspense>
        {showHotspots && (
          <group position={[0, -1.25, 0]}>
            <Hotspots active={activeHotspot} onSelect={onHotspot} />
          </group>
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
