import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { skills } from '../../data/skills';

function SkillPlanet({ skill, position, onSelect }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const size = 0.3 + (skill.level / 100) * 0.3;

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        scale={hovered ? size * 1.3 : size}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect?.(skill)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {hovered && (
        <Html center distanceFactor={8}>
          <div className="glass px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none">
            <p className="font-display text-xs text-white font-semibold">{skill.name}</p>
            <p className="font-mono text-[10px] text-neon-cyan">{skill.level}%</p>
          </div>
        </Html>
      )}
      <Html position={[0, -size - 0.5, 0]} center distanceFactor={10}>
        <span className="font-mono text-[8px] whitespace-nowrap" style={{ color: skill.color }}>
          {skill.name}
        </span>
      </Html>
    </group>
  );
}

export default function SkillsOrbit({ onSkillSelect }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  const orbitSkills = skills.slice(0, 8);

  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      {orbitSkills.map((skill, i) => {
        const angle = (i / orbitSkills.length) * Math.PI * 2;
        const radius = 4;
        return (
          <SkillPlanet
            key={skill.name}
            skill={skill}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
            onSelect={onSkillSelect}
          />
        );
      })}
    </group>
  );
}
