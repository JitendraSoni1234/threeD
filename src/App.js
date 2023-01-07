import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "./App.css";
import { Physics, usePlane, useBox } from "@react-three/cannon";

function Box(props) {
  const [ref, api] = useBox(() => ({ mass: 1 }));
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => {
        api.velocity.set(2, 0, 0);
      }}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      <OrbitControls />
      <Stars />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <ambientLight />
      <Physics>
        <Box position={[0, 0.5, 0]} />
        <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </Physics>
    </Canvas>
  );
}
