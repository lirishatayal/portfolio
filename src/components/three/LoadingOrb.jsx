import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';

export function LoadingOrb() {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.3}
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </>
  );
}
