import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text3D, Center } from '@react-three/drei';

function RotatingCube({ position, color, speed = 1 }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.5;
      ref.current.rotation.y += delta * speed * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={ref}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          metalness={0.8}
          roughness={0.2}
          wireframe={hovered}
        />
      </mesh>
    </Float>
  );
}

function RotatingSphere({ position, color }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          distort={0.3}
          speed={2}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot({ position, color }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  return (
    <>
      <RotatingCube position={[-3, 1, -2]} color="#00f0ff" speed={0.8} />
      <RotatingSphere position={[3, -0.5, -3]} color="#a855f7" />
      <TorusKnot position={[0, 2, -4]} color="#ec4899" />
      <RotatingCube position={[4, 2, -5]} color="#3b82f6" speed={1.2} />
    </>
  );
}

export function HeroText3D() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <Center>
        <Text3D
          font={`${import.meta.env.BASE_URL}fonts/helvetiker_bold.typeface.json`}
          size={0.5}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelSegments={5}
        >
          LT
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}
