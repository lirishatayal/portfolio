import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp } from '../../utils/helpers';

export default function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree();
  const targetZ = useRef(5);

  useFrame(() => {
    const z = lerp(5, -30, scrollProgress);
    targetZ.current = z;
    camera.position.z = lerp(camera.position.z, targetZ.current, 0.05);
    camera.position.y = lerp(camera.position.y, Math.sin(scrollProgress * Math.PI) * 2, 0.05);
    camera.lookAt(0, 0, scrollProgress * -20);
  });

  return null;
}
