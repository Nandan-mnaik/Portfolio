
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Torus, 
  Cylinder, 
  Stars, 
  Environment, 
  Box, 
  Points, 
  PointMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.2;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.9}
        distort={0.4}
        speed={2}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
       ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[3, 0.02, 32, 200]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.8} transparent opacity={0.4} />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#4F46E5" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <QuantumParticle position={[0, 0, 0]} color="#C5A059" scale={1.2} />
          <MacroscopicWave />
        </Float>
        
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
           <QuantumParticle position={[-4, 2, -2]} color="#4F46E5" scale={0.5} />
           <QuantumParticle position={[5, -1, -4]} color="#9333EA" scale={0.6} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={6} saturation={0} fade speed={2} />
      </Canvas>
    </div>
  );
};

const ParticleSwarm = ({ count = 3000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 8;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.2, 0.1);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -mouse.x * 0.2, 0.1);
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for(let i=0; i<count; i++) {
          const idx = i*3;
          positions[idx+1] += Math.sin(state.clock.elapsedTime + positions[idx]) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C5A059"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export const NeuralSwarmScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
           <Sphere args={[1.5, 64, 64]}>
             <meshStandardMaterial color="#1C1917" metalness={1} roughness={0} wireframe opacity={0.05} transparent />
           </Sphere>
           <Sphere args={[0.3, 32, 32]}>
              <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={3} metalness={1} />
           </Sphere>
        </Float>
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

const GlobeInner = () => {
  const ref = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.2, 0.05);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -mouse.x * 0.2, 0.05);
    }
  });

  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 2000);
      const theta = Math.sqrt(2000 * Math.PI) * phi;
      p[i * 3] = 2 * Math.cos(theta) * Math.sin(phi);
      p[i * 3 + 1] = 2 * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = 2 * Math.cos(phi);
    }
    return p;
  }, []);

  return (
    <group ref={ref}>
      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color="#C5A059"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Sphere args={[1.98, 32, 32]}>
        <meshStandardMaterial color="#1C1917" transparent opacity={0.1} />
      </Sphere>
      <Torus args={[2.5, 0.01, 16, 100]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color="#C5A059" transparent opacity={0.2} />
      </Torus>
    </group>
  );
}

export const GlobeScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#C5A059" />
        <GlobeInner />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={5} color="#C5A059" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4F46E5" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.6} floatIntensity={0.4} speed={2}>
          <group rotation={[0.2, 0.2, 0]}>
            <Cylinder args={[1.5, 1.5, 0.1, 64]} position={[0, 1.5, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.05} />
            </Cylinder>
            
            <Cylinder args={[1.2, 1.2, 0.1, 64]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.05} />
            </Cylinder>
            
            <Cylinder args={[0.8, 0.8, 0.1, 64]} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.05} />
            </Cylinder>

            {[[-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]].map(([x, z], i) => (
               <Cylinder key={i} args={[0.04, 0.04, 2.5, 16]} position={[x, 0.5, z]}>
                  <meshStandardMaterial color="#E7E5E0" metalness={0.9} roughness={0.1} />
               </Cylinder>
            ))}

            <Box args={[0.4, 0.4, 0.4]} position={[0, -1.2, 0]}>
               <meshStandardMaterial color="#292524" metalness={1} roughness={0.2} />
               <pointLight intensity={3} color="#C5A059" distance={3} />
            </Box>

            <Torus args={[1.1, 0.02, 16, 100]} position={[0, -1.2, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={1} transparent opacity={0.8} />
            </Torus>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
