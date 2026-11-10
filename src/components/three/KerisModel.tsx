import { useMemo } from "react";
import * as THREE from "three";
import { bladeOutline, lukOffset } from "../../lib/keris";

export const BLADE_LEN = 3;

function pamorTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 1024;
  const g = c.getContext("2d")!;
  g.fillStyle = "#6b675f";
  g.fillRect(0, 0, 256, 1024);
  for (let k = -9; k <= 9; k++) {
    g.beginPath();
    for (let i = 0; i <= 300; i++) {
      const t = i / 300;
      const xu =
        lukOffset(t) * BLADE_LEN + k * 0.018 * (1 - t * 0.8) + Math.sin(t * 46 + k * 1.3) * 0.006;
      const x = (xu + 0.5) * 256;
      const y = (1 - t) * 1024;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.strokeStyle = k % 2 ? "rgba(220,214,200,0.55)" : "rgba(170,164,152,0.4)";
    g.lineWidth = 1.4;
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(1, 1 / BLADE_LEN);
  tex.offset.set(0.5, 0);
  tex.anisotropy = 8;
  return tex;
}

function shapeFrom(points: [number, number][]) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  return s;
}

export function KerisModel() {
  const { blade, ganja, hilt, ladrang, gandar, pendok, pamor } = useMemo(() => {
    const blade = new THREE.ExtrudeGeometry(
      shapeFrom(bladeOutline(220).map(([x, y]) => [x * BLADE_LEN, y * BLADE_LEN])),
      {
        depth: 0.012,
        bevelEnabled: true,
        bevelThickness: 0.022,
        bevelSize: 0.01,
        bevelSegments: 4,
        curveSegments: 4,
      },
    );
    blade.translate(0, 0, -0.006);

    const gs = new THREE.Shape();
    gs.moveTo(-0.34, -0.005);
    gs.lineTo(0.24, -0.005);
    gs.quadraticCurveTo(0.33, -0.04, 0.24, -0.075);
    gs.lineTo(-0.22, -0.075);
    gs.closePath();
    const ganja = new THREE.ExtrudeGeometry(gs, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 2,
    });
    ganja.translate(0, 0, -0.025);

    const profile = [
      [0.0, 0],
      [0.06, 0],
      [0.075, -0.06],
      [0.09, -0.16],
      [0.1, -0.26],
      [0.088, -0.36],
      [0.082, -0.44],
      [0.095, -0.53],
      [0.118, -0.62],
      [0.122, -0.7],
      [0.1, -0.78],
      [0.055, -0.83],
      [0.0, -0.845],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    const hilt = new THREE.LatheGeometry(profile, 40);

    // Warangka ladrang: boat-shaped top with upturned ends
    const ls = new THREE.Shape();
    ls.moveTo(-0.62, 0.1);
    ls.quadraticCurveTo(-0.5, 0.02, -0.3, 0.04);
    ls.lineTo(0.3, 0.04);
    ls.quadraticCurveTo(0.52, 0.02, 0.6, 0.16);
    ls.quadraticCurveTo(0.56, -0.04, 0.4, -0.14);
    ls.lineTo(-0.36, -0.14);
    ls.quadraticCurveTo(-0.56, -0.08, -0.62, 0.1);
    const ladrang = new THREE.ExtrudeGeometry(ls, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 24,
    });
    ladrang.translate(0, 0, -0.06);

    const body = (w0: number, w1: number, len: number) =>
      shapeFrom([
        [-w0, 0],
        [w0, 0],
        [w1, -len],
        [w1 * 0.4, -len - 0.06],
        [-w1 * 0.4, -len - 0.06],
        [-w1, -len],
      ]);
    const gandar = new THREE.ExtrudeGeometry(body(0.13, 0.07, 2.75), {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 3,
    });
    gandar.translate(0, 0, -0.03);
    const pendok = new THREE.ExtrudeGeometry(body(0.14, 0.078, 2.5), {
      depth: 0.07,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 3,
    });
    pendok.translate(0, -0.3, -0.035);

    return { blade, ganja, hilt, ladrang, gandar, pendok, pamor: pamorTexture() };
  }, []);

  const wood = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#7d4f2c", roughness: 0.5, metalness: 0.05 }),
    [],
  );
  const gold = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d6b273", roughness: 0.3, metalness: 0.75 }),
    [],
  );

  return (
    <group>
      {/* Keris */}
      <group>
        <mesh geometry={blade} castShadow>
          <meshStandardMaterial map={pamor} color="#f2ede2" metalness={0.7} roughness={0.36} />
        </mesh>
        <mesh geometry={ganja} castShadow>
          <meshStandardMaterial color="#8a857c" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0.02, -0.11, 0]} material={gold}>
          <cylinderGeometry args={[0.072, 0.065, 0.06, 40]} />
        </mesh>
        <group position={[0.02, -0.14, 0]} rotation={[0, 0, -0.16]} scale={[1, 1, 0.78]}>
          <mesh geometry={hilt} material={wood} castShadow />
        </group>
      </group>
      {/* Warangka */}
      <group position={[1.35, 0.45, -0.5]} rotation={[0, -0.35, 0.04]} scale={0.85}>
        <mesh geometry={ladrang} material={wood} castShadow />
        <group position={[0, -0.12, 0]}>
          <mesh geometry={gandar} material={wood} />
          <mesh geometry={pendok} material={gold} />
        </group>
      </group>
    </group>
  );
}
