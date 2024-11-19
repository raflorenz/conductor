import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { HexColorPicker } from "react-colorful";

function App() {
  const [parts, setParts] = useState({
    laces: "#ffd700",
    mesh: "#808080",
    caps: "#ff0000",
    inner: "#ff0000",
    sole: "#ff0000",
    stripes: "#ffd700",
    band: "#ff0000",
    patch: "#ffd700",
  });
  const [current, setCurrent] = useState("mesh");

  return (
    <div className="w-full h-screen">
      <h1 className="absolute top-[20px] left-[30px] text-5xl font-bold mb-4">
        Conductor
      </h1>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Product parts={parts} setCurrent={setCurrent} />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.25}
          scale={10}
          blur={1.5}
          far={0.8}
        />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <ColorPicker parts={parts} setParts={setParts} current={current} />
    </div>
  );
}

function Product({ parts, setCurrent }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("shoe.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 4) / 8,
      -0.2 - (1 + Math.sin(t / 1.5)) / 20
    );
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setCurrent(e.object.material.name);
      }}
    >
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={parts.laces}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={parts.mesh}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={parts.caps}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={parts.inner}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={parts.sole}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={parts.stripes}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={parts.band}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={parts.patch}
      />
    </group>
  );
}

function ColorPicker({ parts, setParts, current }) {
  return (
    <div className="absolute top-[50px] right-[50px]">
      <HexColorPicker
        className="!w-[150px] !h-[150px]"
        color={parts[current]}
        onChange={(color) => {
          setParts({ ...parts, [current]: color });
        }}
      />
      <h2 className="text-4xl">{current}</h2>
    </div>
  );
}

export default App;
