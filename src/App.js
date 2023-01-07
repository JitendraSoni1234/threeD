// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";
// import "./App.css";
// import { Physics, usePlane, useBox } from "@react-three/cannon";

// function Box(props) {
//   const [ref, api] = useBox(() => ({ mass: 1 }));
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       onClick={() => {
//         api.velocity.set(2, 0, 0);
//       }}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={"orange"} />
//     </mesh>
//   );
// }

// function Plane(props) {
//   const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

//   return (
//     <mesh {...props} ref={ref}>
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//       <meshLambertMaterial attach="material" color="gray" />
//     </mesh>
//   );
// }

// export default function App() {
//   return (
//     <Canvas frameloop="demand" shadows camera={{ fov: 50 }}>
//       <OrbitControls />
//       <Stars />
//       <ambientLight />
//       <Physics>
//         <Box position={[0, 0.5, 0]} />
//         <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
//       </Physics>
//     </Canvas>
//   );
// }

// import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import "./App.css";
import Controls from "./Controls";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props
  }));
  const color = props.color ? props.color : "hotpink";
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      shadowMap
      sRGB
      gl={{ alpha: false }}
      camera={{ position: [-1, 1, 5], fov: 50 }}
    >
      <color attach="background" args={["lightblue"]} />
      <Physics>
        <Controls />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <Plane />
        <Cube />
        <Cube position={[0, 10, -2]} color="rebeccapurple" />
        <Cube position={[0, 20, -2]} color="darkseagreen" />
      </Physics>
    </Canvas>
  );
}

export default App;
