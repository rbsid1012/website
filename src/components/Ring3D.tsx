import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Shield, MapPin, AlertTriangle } from "lucide-react";

const ringFeatures = [
  { 
    label: "NFC Payments", 
    description: "Tap to pay anywhere",
    icon: CreditCard
  },
  { 
    label: "Biometric Lock", 
    description: "Fingerprint secured",
    icon: Shield
  },
  { 
    label: "Geofencing", 
    description: "Location-aware safety",
    icon: MapPin
  },
  { 
    label: "Emergency SOS", 
    description: "One-tap distress signal",
    icon: AlertTriangle
  },
];

interface RingMeshProps {
  pulseIntensity: number;
}

const RingMesh = ({ pulseIntensity }: RingMeshProps) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      // Gentle auto-rotation
      ringRef.current.rotation.y += 0.003;
      
      // Subtle pulse during feature transitions
      const scale = 1 + pulseIntensity * 0.02;
      ringRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.9, 0.28, 64, 128]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.95}
        roughness={0.15}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const Ring3D = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  // Auto-cycle features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger pulse animation
      setPulseIntensity(1);
      setTimeout(() => setPulseIntensity(0), 300);
      
      setCurrentFeatureIndex((prev) => (prev + 1) % ringFeatures.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentFeature = ringFeatures[currentFeatureIndex];
  const IconComponent = currentFeature.icon;

  return (
    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] touch-none">
      {/* Feature Label - Centered inside the ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeatureIndex}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1]
            }}
            className="flex flex-col items-center text-center px-4"
          >
            {/* Glassmorphic container */}
            <div 
              className="px-4 py-3 sm:px-6 sm:py-4 rounded-2xl backdrop-blur-xl border border-white/20"
              style={{
                background: "hsla(0, 0%, 8%, 0.7)",
                boxShadow: "0 8px 32px -8px hsla(0, 0%, 0%, 0.5), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)"
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-crimson" />
                <p className="text-sm sm:text-base font-medium text-foreground">
                  {currentFeature.label}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {currentFeature.description}
              </p>
            </div>
            
            {/* Progress dots */}
            <div className="flex gap-1.5 mt-3">
              {ringFeatures.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{
                    backgroundColor: index === currentFeatureIndex 
                      ? "hsl(var(--crimson))" 
                      : "hsla(0, 0%, 100%, 0.3)",
                    scale: index === currentFeatureIndex ? 1.2 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.15}
            penumbra={1}
            intensity={0.5}
          />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#dc2626" />

          <RingMesh pulseIntensity={pulseIntensity} />

          <Environment preset="city" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(Math.PI * 3) / 4}
            rotateSpeed={0.5}
            dampingFactor={0.05}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Ring3D;
