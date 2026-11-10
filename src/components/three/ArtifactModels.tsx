import { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural 3D Model: Topeng Panji Yogyakarta
 * Serene sculpted white lacquer mask with golden prada jamang crown and almond eyes.
 */
export function TopengPanjiModel() {
  const { face, jamang, eyeL, eyeR, lip, strap } = useMemo(() => {
    // Face mask: curved half-ellipsoid
    const faceGeo = new THREE.SphereGeometry(1.2, 32, 24, 0, Math.PI, 0, Math.PI);
    faceGeo.scale(0.85, 1.25, 0.45);
    faceGeo.rotateY(Math.PI / 2);

    // Golden Jamang crown on top of forehead
    const crownShape = new THREE.Shape();
    crownShape.moveTo(-0.85, 0.9);
    crownShape.quadraticCurveTo(-0.4, 1.45, 0, 1.6);
    crownShape.quadraticCurveTo(0.4, 1.45, 0.85, 0.9);
    crownShape.quadraticCurveTo(0, 1.15, -0.85, 0.9);
    const jamangGeo = new THREE.ExtrudeGeometry(crownShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
    });
    jamangGeo.translate(0, 0, 0.35);

    // Slanted eyes (mripat liyep)
    const eyeShape = new THREE.Shape();
    eyeShape.moveTo(-0.25, 0);
    eyeShape.quadraticCurveTo(0, 0.09, 0.25, 0);
    eyeShape.quadraticCurveTo(0, -0.06, -0.25, 0);
    const eyeLGeo = new THREE.ExtrudeGeometry(eyeShape, { depth: 0.02 });
    eyeLGeo.translate(-0.35, 0.25, 0.42);
    eyeLGeo.rotateZ(0.08);

    const eyeRGeo = new THREE.ExtrudeGeometry(eyeShape, { depth: 0.02 });
    eyeRGeo.translate(0.35, 0.25, 0.42);
    eyeRGeo.rotateZ(-0.08);

    // Stylized serene lips
    const lipShape = new THREE.Shape();
    lipShape.moveTo(-0.26, -0.45);
    lipShape.quadraticCurveTo(0, -0.38, 0.26, -0.45);
    lipShape.quadraticCurveTo(0, -0.52, -0.26, -0.45);
    const lipGeo = new THREE.ExtrudeGeometry(lipShape, { depth: 0.03 });
    lipGeo.translate(0, 0, 0.4);

    // Leather strap behind the mask
    const strapCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, 0.2, 0),
      new THREE.Vector3(-0.6, 0.2, -0.8),
      new THREE.Vector3(0, 0.2, -1.0),
      new THREE.Vector3(0.6, 0.2, -0.8),
      new THREE.Vector3(0.8, 0.2, 0),
    ]);
    const strapGeo = new THREE.TubeGeometry(strapCurve, 20, 0.03, 8, false);

    return {
      face: faceGeo,
      jamang: jamangGeo,
      eyeL: eyeLGeo,
      eyeR: eyeRGeo,
      lip: lipGeo,
      strap: strapGeo,
    };
  }, []);

  return (
    <group position={[0, -0.1, 0]}>
      {/* Porcelain-white mask face with warm ivory lacquer */}
      <mesh geometry={face}>
        <meshStandardMaterial
          color="#f7f3e8"
          roughness={0.35}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Nose bridge */}
      <mesh position={[0, 0.05, 0.46]} rotation={[0.2, 0, 0]}>
        <coneGeometry args={[0.09, 0.48, 16]} />
        <meshStandardMaterial color="#efe9dc" roughness={0.4} />
      </mesh>
      {/* Golden Jamang Crown */}
      <mesh geometry={jamang}>
        <meshStandardMaterial color="#c8a85c" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Left and Right Eyes */}
      <mesh geometry={eyeL}>
        <meshStandardMaterial color="#22201e" roughness={0.6} />
      </mesh>
      <mesh geometry={eyeR}>
        <meshStandardMaterial color="#22201e" roughness={0.6} />
      </mesh>
      {/* Lips with soft cinnabar red tone */}
      <mesh geometry={lip}>
        <meshStandardMaterial color="#8e3328" roughness={0.45} />
      </mesh>
      {/* Leather tie strap */}
      <mesh geometry={strap}>
        <meshStandardMaterial color="#3a2e22" roughness={0.9} />
      </mesh>
      {/* Red bindi / forehead accent */}
      <mesh position={[0, 0.65, 0.42]}>
        <circleGeometry args={[0.07, 16]} />
        <meshStandardMaterial color="#9b2d20" roughness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Batik Fabric Hanging on Carved Teak Gawangan Stand
 */
export function BatikModel({ pattern = "kawung" }: { pattern?: "kawung" | "parang" }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    if (pattern === "kawung") {
      ctx.fillStyle = "#2a1c12"; // Deep soga brown
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = "#c8a85c";
      ctx.lineWidth = 2.5;
      const step = 64;
      for (let x = 0; x <= 512; x += step) {
        for (let y = 0; y <= 512; y += step) {
          // 4-petal Kawung lotus
          ctx.beginPath();
          ctx.arc(x, y, 24, 0, Math.PI * 2);
          ctx.fillStyle = "#3d2a1b";
          ctx.fill();
          ctx.stroke();
          // central dots
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#e8dfcc";
          ctx.fill();
          // corner cross
          ctx.fillStyle = "#b89a62";
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }
    } else {
      // Parang pattern (45 degree diagonal waves)
      ctx.fillStyle = "#231a13";
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = "#c8a85c";
      ctx.lineWidth = 4;
      for (let i = -512; i < 1024; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 512, 512);
        ctx.stroke();
        // Mlinjon diamond accents
        ctx.fillStyle = "#eedcbb";
        for (let j = 0; j < 512; j += 40) {
          ctx.fillRect(i + j - 4, j - 4, 8, 8);
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 3);
    return tex;
  }, [pattern]);

  return (
    <group position={[0, -0.3, 0]}>
      {/* Teak Wood Gawangan Frame */}
      {/* Top horizontal beam */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 2.6, 16]} />
        <meshStandardMaterial color="#4a2e1b" roughness={0.7} />
      </mesh>
      {/* Finials at beam ends */}
      <mesh position={[-1.35, 1.6, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#8f5d30" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[1.35, 1.6, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#8f5d30" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Vertical pillars */}
      <mesh position={[-1.15, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 16]} />
        <meshStandardMaterial color="#4a2e1b" roughness={0.7} />
      </mesh>
      <mesh position={[1.15, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2.4, 16]} />
        <meshStandardMaterial color="#4a2e1b" roughness={0.7} />
      </mesh>
      {/* Feet stands */}
      <mesh position={[-1.15, -0.8, 0]}>
        <boxGeometry args={[0.16, 0.08, 0.8]} />
        <meshStandardMaterial color="#382213" roughness={0.8} />
      </mesh>
      <mesh position={[1.15, -0.8, 0]}>
        <boxGeometry args={[0.16, 0.08, 0.8]} />
        <meshStandardMaterial color="#382213" roughness={0.8} />
      </mesh>

      {/* Draped Batik Cloth */}
      <mesh position={[0, 0.4, 0.02]}>
        <planeGeometry args={[1.9, 2.3, 24, 24]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.65}
          metalness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Back fold of fabric */}
      <mesh position={[0, 0.9, -0.02]}>
        <planeGeometry args={[1.9, 1.3, 16, 16]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.75}
          color="#aa9580"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Procedural Wayang Kulit Puppet (Werkudara/Bima)
 */
export function WayangKulitModel() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Central buffalo horn rod (Gapit) */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 3.2, 16]} />
        <meshStandardMaterial color="#1a1816" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Pointed lower stem of gapit */}
      <mesh position={[0, -1.6, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.035, 0.5, 16]} />
        <meshStandardMaterial color="#141210" roughness={0.3} />
      </mesh>

      {/* Torso & Head of Werkudara (Parchment Flat Figure with Extruded Thickness) */}
      {/* Main Body */}
      <mesh position={[-0.05, 0.4, 0.02]}>
        <boxGeometry args={[0.9, 1.5, 0.025]} />
        <meshStandardMaterial color="#181716" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Head with Gelung Supit Urang */}
      <mesh position={[-0.2, 1.25, 0.02]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.3, 0.22, 0.55, 16]} />
        <meshStandardMaterial color="#221e1a" roughness={0.6} />
      </mesh>
      {/* Gelung curl */}
      <mesh position={[-0.45, 1.45, 0.02]}>
        <torusGeometry args={[0.22, 0.07, 12, 24, Math.PI * 1.3]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Golden Face Profile & Eye */}
      <mesh position={[-0.05, 1.22, 0.035]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#d4b568" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Arm Rods (Cempurit / Tuding) */}
      <mesh position={[-0.65, 0.1, 0.04]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.012, 0.012, 1.3, 12]} />
        <meshStandardMaterial color="#2d2218" roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.2, 0.04]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.012, 0.012, 1.3, 12]} />
        <meshStandardMaterial color="#2d2218" roughness={0.4} />
      </mesh>

      {/* Pancanaka Claw */}
      <mesh position={[-0.95, -0.25, 0.04]} rotation={[0, 0, 0.8]}>
        <coneGeometry args={[0.04, 0.32, 12]} />
        <meshStandardMaterial color="#d8c593" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Poleng Checkered Skirt / Kain Poleng */}
      <mesh position={[-0.05, -0.4, 0.03]}>
        <boxGeometry args={[0.75, 0.75, 0.02]} />
        <meshStandardMaterial color="#423b32" roughness={0.8} />
      </mesh>
      {/* Prada Gold Trimmings */}
      <mesh position={[-0.05, 0.05, 0.035]}>
        <boxGeometry args={[0.8, 0.08, 0.015]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Blangkon Mondolan Yogyakarta
 */
export function BlangkonModel() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Head base hemisphere */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.95, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#241a12" roughness={0.8} />
      </mesh>

      {/* Wiron ridges (pleated folds of fabric) */}
      {[-0.15, -0.05, 0.05, 0.15, 0.25].map((y, i) => (
        <mesh key={i} position={[0, 0.1 + y, 0]} rotation={[0.08, 0, 0]}>
          <torusGeometry args={[0.96 - i * 0.02, 0.045, 12, 36, Math.PI * 1.8]} />
          <meshStandardMaterial color={i % 2 ? "#352317" : "#513622"} roughness={0.7} />
        </mesh>
      ))}

      {/* Distinctive rear sphere bulge: Mondolan */}
      <mesh position={[0, 0.1, -0.92]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#20150e" roughness={0.65} />
      </mesh>

      {/* Front peaked forehead edge (Capil) */}
      <mesh position={[0, 0.05, 0.94]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.18, 0.14, 16]} />
        <meshStandardMaterial color="#442a1a" roughness={0.7} />
      </mesh>

      {/* Side tassels (Kemada) */}
      <mesh position={[-0.85, -0.12, -0.2]}>
        <cylinderGeometry args={[0.02, 0.01, 0.35, 12]} />
        <meshStandardMaterial color="#1a120c" roughness={0.8} />
      </mesh>
      <mesh position={[0.85, -0.12, -0.2]}>
        <cylinderGeometry args={[0.02, 0.01, 0.35, 12]} />
        <meshStandardMaterial color="#1a120c" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Gebyog Ukiran Jati Mataram
 */
export function GebyogModel() {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Outer Teak Frame */}
      {/* Left Pillar */}
      <mesh position={[-1.25, 0.6, 0]}>
        <boxGeometry args={[0.22, 2.5, 0.22]} />
        <meshStandardMaterial color="#4b2f18" roughness={0.7} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[1.25, 0.6, 0]}>
        <boxGeometry args={[0.22, 2.5, 0.22]} />
        <meshStandardMaterial color="#4b2f18" roughness={0.7} />
      </mesh>
      {/* Top Lintel Arch (Tumpang Sari) */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[2.8, 0.3, 0.25]} />
        <meshStandardMaterial color="#5a381d" roughness={0.65} />
      </mesh>
      {/* Carved Crown Apex */}
      <mesh position={[0, 2.12, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.5, 0.35, 4]} />
        <meshStandardMaterial color="#6a4423" roughness={0.6} />
      </mesh>

      {/* Left Door Panel */}
      <mesh position={[-0.55, 0.55, 0]}>
        <boxGeometry args={[1.05, 2.15, 0.08]} />
        <meshStandardMaterial color="#3f2714" roughness={0.8} />
      </mesh>
      {/* Right Door Panel */}
      <mesh position={[0.55, 0.55, 0]}>
        <boxGeometry args={[1.05, 2.15, 0.08]} />
        <meshStandardMaterial color="#3f2714" roughness={0.8} />
      </mesh>

      {/* Openwork Krawangan Relief Carving Panels */}
      {[-0.55, 0.55].map((x, i) => (
        <group key={i} position={[x, 0.9, 0.05]}>
          <mesh>
            <boxGeometry args={[0.75, 0.85, 0.03]} />
            <meshStandardMaterial color="#643e20" roughness={0.6} />
          </mesh>
          {/* Ornate lattice bars */}
          {[-0.25, 0, 0.25].map((bx, bi) => (
            <mesh key={bi} position={[bx, 0, 0.02]}>
              <cylinderGeometry args={[0.02, 0.02, 0.8, 12]} />
              <meshStandardMaterial color="#84542d" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Antique Brass Handles */}
      <mesh position={[-0.12, 0.45, 0.08]}>
        <torusGeometry args={[0.065, 0.018, 12, 24]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.45, 0.08]}>
        <torusGeometry args={[0.065, 0.018, 12, 24]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Lurik Fabric Roll (Kain Lurik Prasojo)
 */
export function LurikModel() {
  const lurikTex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#161d2b"; // Dark indigo
    ctx.fillRect(0, 0, 256, 256);
    // Vertical striped pattern
    const colors = ["#2d3f5e", "#c4b59d", "#101622", "#8b7e6b"];
    for (let x = 0; x < 256; x += 16) {
      ctx.fillStyle = colors[(x / 16) % colors.length];
      ctx.fillRect(x, 0, 8, 256);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 2);
    return tex;
  }, []);

  return (
    <group position={[0, -0.1, 0]}>
      {/* Wooden Spool Roll (Gelondong) */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 2.2, 32]} />
        <meshStandardMaterial map={lurikTex} roughness={0.75} />
      </mesh>
      {/* Wooden inner core axle */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2.6, 16]} />
        <meshStandardMaterial color="#5a3d24" roughness={0.7} />
      </mesh>
      {/* Wooden End Flanges */}
      <mesh position={[-1.15, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
        <meshStandardMaterial color="#3c2616" roughness={0.8} />
      </mesh>
      <mesh position={[1.15, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
        <meshStandardMaterial color="#3c2616" roughness={0.8} />
      </mesh>

      {/* Flowing Drape of Woven Lurik Cloth */}
      <mesh position={[0, -0.3, 0.35]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[2.0, 1.8, 16, 16]} />
        <meshStandardMaterial map={lurikTex} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Kerajinan Perak Kotagede (Filigree Silver Teapot)
 */
export function PerakKotagedeModel() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Teapot Body (Bulbous Filigree Spherical Urn) */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.9, 32, 24]} />
        <meshStandardMaterial color="#e8ecf0" metalness={0.95} roughness={0.14} />
      </mesh>
      {/* Base Ring Foot */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.16, 32]} />
        <meshStandardMaterial color="#d4dbe2" metalness={0.92} roughness={0.18} />
      </mesh>
      {/* Neck Collar */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.42, 0.55, 0.32, 32]} />
        <meshStandardMaterial color="#e0e6ed" metalness={0.94} roughness={0.15} />
      </mesh>
      {/* Domed Lid */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.43, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#edf1f5" metalness={0.95} roughness={0.12} />
      </mesh>
      {/* Lotus Bud Lid Finial */}
      <mesh position={[0, 1.42, 0]}>
        <coneGeometry args={[0.08, 0.2, 16]} />
        <meshStandardMaterial color="#f4f7fa" metalness={0.98} roughness={0.08} />
      </mesh>

      {/* S-curved Pouring Spout (Cucuk Teko) */}
      <mesh position={[0.9, 0.4, 0]} rotation={[0, 0, -0.65]}>
        <cylinderGeometry args={[0.07, 0.14, 0.9, 16]} />
        <meshStandardMaterial color="#edf1f5" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Ornate Handle (Gagang Ukir Sulur) */}
      <mesh position={[-0.92, 0.3, 0]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.48, 0.065, 16, 32, Math.PI * 1.3]} />
        <meshStandardMaterial color="#d8e0e8" metalness={0.92} roughness={0.2} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Gerabah Kasongan Bantul (Terracotta Jug / Kendhi)
 */
export function GerabahKasonganModel() {
  return (
    <group position={[0, -0.25, 0]}>
      {/* Bulbous Earthenware Clay Body */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.95, 32, 24]} />
        <meshStandardMaterial color="#9c482c" roughness={0.85} />
      </mesh>
      {/* Narrow Flared Neck */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.32, 0.45, 0.65, 24]} />
        <meshStandardMaterial color="#a54d30" roughness={0.88} />
      </mesh>
      {/* Lip Rim */}
      <mesh position={[0, 1.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.07, 16, 32]} />
        <meshStandardMaterial color="#873e24" roughness={0.82} />
      </mesh>
      {/* Base Foot */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.55, 0.62, 0.2, 24]} />
        <meshStandardMaterial color="#7a361e" roughness={0.9} />
      </mesh>
      {/* Traditional Side Drinking Spout (Cerat Kendhi) */}
      <mesh position={[0.75, 0.45, 0]} rotation={[0, 0, -0.85]}>
        <coneGeometry args={[0.16, 0.55, 16]} />
        <meshStandardMaterial color="#94452a" roughness={0.85} />
      </mesh>
      {/* Twin Ear Handles */}
      <mesh position={[-0.88, 0.2, 0]}>
        <torusGeometry args={[0.22, 0.05, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#833c22" roughness={0.88} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Gamelan Jawa (Gong Ageng & Gayor Naga Stand)
 */
export function GamelanModel() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Wooden Gayor Stand Frame */}
      {/* Crossbar */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[2.9, 0.18, 0.2]} />
        <meshStandardMaterial color="#4d2f19" roughness={0.7} />
      </mesh>
      {/* Twin Dragon (Naga) Finials at ends */}
      <mesh position={[-1.5, 1.7, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.18, 0.45, 8]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.5, 1.7, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.18, 0.45, 8]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Side Pillars */}
      <mesh position={[-1.25, 0.35, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.4, 16]} />
        <meshStandardMaterial color="#4d2f19" roughness={0.7} />
      </mesh>
      <mesh position={[1.25, 0.35, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.4, 16]} />
        <meshStandardMaterial color="#4d2f19" roughness={0.7} />
      </mesh>
      {/* Stand Feet */}
      <mesh position={[-1.25, -0.85, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#382110" roughness={0.8} />
      </mesh>
      <mesh position={[1.25, -0.85, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#382110" roughness={0.8} />
      </mesh>

      {/* Hanging Bronze Gong Ageng */}
      <group position={[0, 0.35, 0]}>
        {/* Outer Gong Dish */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 1.0, 0.22, 40]} />
          <meshStandardMaterial color="#b38a42" metalness={0.88} roughness={0.28} />
        </mesh>
        {/* Curved Rim Lip */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.98, 0.06, 16, 40]} />
          <meshStandardMaterial color="#8f6a2b" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Center Protruding Boss (Pencu) */}
        <mesh position={[0, 0, 0.14]}>
          <sphereGeometry args={[0.26, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#d4a84e" metalness={0.92} roughness={0.2} />
        </mesh>
      </group>

      {/* Hanging Braided Ropes */}
      <mesh position={[-0.35, 1.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#a89274" roughness={0.9} />
      </mesh>
      <mesh position={[0.35, 1.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#a89274" roughness={0.9} />
      </mesh>

      {/* Padded Mallet (Tabuh) resting on side */}
      <group position={[1.1, -0.2, 0.2]} rotation={[0.2, 0.3, -0.3]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 12]} />
          <meshStandardMaterial color="#5e391b" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#7a1f18" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Procedural Surjan Pranakan Abdi Dalem
 */
export function SurjanModel() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Museum Display Bust Torso */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 1.4, 24]} />
        <meshStandardMaterial color="#192233" roughness={0.7} />
      </mesh>
      {/* Shoulder Slope */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.28, 0.72, 0.35, 24]} />
        <meshStandardMaterial color="#161f2e" roughness={0.75} />
      </mesh>
      {/* High Mandarin Collar (Sikepan) */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.24, 0.25, 0.18, 24]} />
        <meshStandardMaterial color="#111824" roughness={0.7} />
      </mesh>

      {/* Signature Front Buttons (Kancing Semut) */}
      {[0.85, 0.65, 0.45, 0.25, 0.05].map((y, i) => (
        <mesh key={i} position={[0.08, y, 0.52]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Wood Pedestal Stand */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 16]} />
        <meshStandardMaterial color="#3c2616" roughness={0.8} />
      </mesh>
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.08, 24]} />
        <meshStandardMaterial color="#2d1c0f" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Jemparingan Mataram (Traditional Archery Set)
 */
export function JemparinganModel() {
  const bowCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.05, -1.4, 0),
      new THREE.Vector3(0.35, -0.7, 0),
      new THREE.Vector3(0.42, 0, 0),
      new THREE.Vector3(0.35, 0.7, 0),
      new THREE.Vector3(-0.05, 1.4, 0),
    ]);
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Wooden Bow Limb (Gandewa) */}
      <mesh>
        <tubeGeometry args={[bowCurve, 32, 0.035, 12, false]} />
        <meshStandardMaterial color="#422917" roughness={0.6} />
      </mesh>
      {/* Leather Bow Grip at Center */}
      <mesh position={[0.42, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.28, 16]} />
        <meshStandardMaterial color="#784e2d" roughness={0.8} />
      </mesh>
      {/* Taut Bowstring (Kendit) */}
      <mesh position={[-0.05, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 2.8, 8]} />
        <meshStandardMaterial color="#e2d6c2" roughness={0.5} />
      </mesh>

      {/* Three Bamboo Arrows (Jemparing) */}
      {[-0.06, 0, 0.06].map((x, i) => (
        <group key={i} position={[x - 0.25, 0, 0.2 + i * 0.04]} rotation={[0, 0, 0.15]}>
          {/* Bamboo Shaft */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1.8, 8]} />
            <meshStandardMaterial color="#c2a67a" roughness={0.65} />
          </mesh>
          {/* Steel Arrowhead */}
          <mesh position={[0, 0.95, 0]}>
            <coneGeometry args={[0.022, 0.14, 8]} />
            <meshStandardMaterial color="#adb5bd" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Feather Fletching at tail */}
          <mesh position={[0, -0.85, 0]}>
            <boxGeometry args={[0.07, 0.18, 0.008]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Procedural Wayang Golek Menak Yogyakarta
 */
export function WayangGolekModel() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Sculpted Wooden Head */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.22, 0.2, 0.45, 16]} />
        <meshStandardMaterial color="#f0e2cd" roughness={0.4} />
      </mesh>
      {/* Crown / Jamang */}
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.24, 0.35, 16]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Facial Features */}
      <mesh position={[0, 1.22, 0.2]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.04, 0.16, 12]} />
        <meshStandardMaterial color="#e5d4bb" roughness={0.4} />
      </mesh>

      {/* Torso & Velvet Embroidered Vest */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.85, 20]} />
        <meshStandardMaterial color="#1a1f38" roughness={0.7} />
      </mesh>
      {/* Gold Trim Sash */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.12, 20]} />
        <meshStandardMaterial color="#c8a85c" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Flowing Batik Skirt (Jarik) */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.39, 0.65, 1.1, 24]} />
        <meshStandardMaterial color="#422a18" roughness={0.8} />
      </mesh>

      {/* Central Operating Wooden Rod (Gandar) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2.2, 12]} />
        <meshStandardMaterial color="#2b1a0e" roughness={0.8} />
      </mesh>

      {/* Thin Hand Control Rods */}
      <mesh position={[-0.45, 0.35, 0.15]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.008, 0.008, 0.9, 8]} />
        <meshStandardMaterial color="#382618" roughness={0.6} />
      </mesh>
      <mesh position={[0.45, 0.35, 0.15]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.008, 0.008, 0.9, 8]} />
        <meshStandardMaterial color="#382618" roughness={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Procedural Perhiasan Sumping & Pending Gagrak Yogyakarta
 */
export function PerhiasanSumpingModel() {
  return (
    <group position={[0, 0, 0]}>
      {/* Sumping (Left Wing Ear Ornament) */}
      <group position={[-0.65, 0.3, 0]}>
        {/* Curved Garuda Wing Feather */}
        <mesh rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.28, 1.1, 4]} />
          <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Ruby Gem Cabochon */}
        <mesh position={[0, -0.15, 0.12]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#9e1b26" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* Sumping (Right Wing Ear Ornament) */}
      <group position={[0.65, 0.3, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.28, 1.1, 4]} />
          <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[0, -0.15, 0.12]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#9e1b26" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* Royal Belt Buckle (Pending Emas) */}
      <group position={[0, -0.65, 0]}>
        {/* Main Oval Gold Plate */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.08, 36]} />
          <meshStandardMaterial color="#d4af37" metalness={0.94} roughness={0.15} />
        </mesh>
        {/* Embossed Floral Border Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.88, 0.05, 16, 36]} />
          <meshStandardMaterial color="#f0cb54" metalness={0.95} roughness={0.12} />
        </mesh>
        {/* Center Oval Ruby Stone */}
        <mesh position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.22, 20, 16]} />
          <meshStandardMaterial color="#9e1b26" roughness={0.15} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
