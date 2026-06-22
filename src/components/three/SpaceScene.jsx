import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import ParticleField from './ParticleField';
import { FloatingShapes } from './FloatingShapes';
import ScrollCamera from './ScrollCamera';

const SkillsOrbit = lazy(() => import('./SkillsOrbit'));

export default function SpaceScene({ scrollProgress, showSkills = false }) {
  return (
    <div className="fixed inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />

        <ParticleField />
        <FloatingShapes />
        <ScrollCamera scrollProgress={scrollProgress} />

        {showSkills && (
          <Suspense fallback={null}>
            <SkillsOrbit />
          </Suspense>
        )}

        <Preload all />
      </Canvas>
    </div>
  );
}
