import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Box } from "@react-three/drei";

function App() {
  return (
    <div className="w-full h-screen">
      <h1 className="text-5xl font-bold mb-4">Conductor</h1>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[7, 7, 7]} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Product />
      </Canvas>
    </div>
  );
}

function Product() {
  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.2;
  });

  return (
    <Box ref={mesh} args={[3, 1, 2]} scale={[1, 1, 1]}>
      <meshStandardMaterial color="blue" />
    </Box>
  );
}

export default App;
