import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useDesign } from "../store";

function Furniture() {
  const { items } = useDesign();
  return (
    <>
      {items.map((it) => (
        <mesh key={it.id} position={[it.x/50, 0.5, it.y/50]}>
          <boxGeometry args={[it.w/50, 1, it.h/50]} />
          <meshStandardMaterial color={it.color} roughness={0.9 - it.shade} metalness={0.05 + it.shade * 0.2} />
        </mesh>
      ))}
    </>
  );
}

export default function Viewer3D() {
  return (
    <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.1} />
        <gridHelper args={[20, 20, "#a8a29e", "#e7e5e4"]} />
        <axesHelper args={[2]} />
        <Furniture />
        <OrbitControls enableDamping dampingFactor={0.08} />
      </Canvas>
      <div className="absolute px-2 py-1 text-xs rounded-lg shadow-sm pointer-events-none bottom-2 right-2 bg-white/90 text-stone-600">
        Tip: drag to orbit • wheel to zoom
      </div>
    </div>
  );
}
