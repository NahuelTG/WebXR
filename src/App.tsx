import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Componente de esfera animada
function AnimatedSphere({ position, color }: { position: [number, number, number]; color: string }) {
   const meshRef = useRef<THREE.Mesh>(null!);

   useFrame(({ clock }) => {
      // Crear movimiento en onda
      const time = clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time + position[0] * 0.5 + position[2] * 0.5) * 0.5;
   });

   return (
      <mesh ref={meshRef} position={position}>
         <sphereGeometry args={[0.3, 32, 32]} />
         <meshStandardMaterial color={color} />
      </mesh>
   );
}

// Componente de cuadrícula de esferas
function SphereGrid() {
   const gridSize = 5;
   const colors = ["#E1CF22", "#fffff", "#90ee90", "#1e90ff", "#da70d6"]; // Colores variados

   // Crear un array de esferas en una cuadrícula
   const spheres = [];
   for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
         const color = colors[Math.floor(Math.random() * colors.length)];
         spheres.push(<AnimatedSphere key={`${x}-${z}`} position={[x, 0, z]} color={color} />);
      }
   }

   return <>{spheres}</>;
}

const App: React.FC = () => {
   return (
      <div className="canvas-container">
         <Canvas camera={{ position: [0, 10, 10], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <SphereGrid />
            <OrbitControls />
         </Canvas>{" "}
      </div>
   );
};

export default App;
