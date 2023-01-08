import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

function FloatingGrid() {
  const diffuse = useLoader(TextureLoader, process.env.PUBLIC_URL + "texture/grid-texture.png");

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    diffuse.offset.set(0, t);
  });
  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.1, 0]}>
      <planeGeometry args={[35,35]} />
      <meshBasicMaterial color={[1,1,1]} opacity={0.15} map={diffuse} alphaMap={diffuse} transparent />
    </mesh>
  );
}

export default FloatingGrid;
