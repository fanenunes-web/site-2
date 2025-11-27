import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Globe parameters
    const globeRadius = Math.min(width, height) * 0.25;
    const particles: { x: number; y: number; z: number; phase: number }[] = [];
    const echoes: { x: number; y: number; z: number; height: number; speed: number; opacity: number }[] = [];
    const particleCount = 1800; // Dense for realism

    // Initialize Globe Particles
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);
      particles.push({ x, y, z, phase: Math.random() * Math.PI * 2 });
    }

    let angle = 0;
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      angle += 0.005;

      // 1. Manage Echoes (Voices rising up)
      // Randomly spawn echoes from globe surface coordinates
      if (Math.random() > 0.85) {
        const sourceIdx = Math.floor(Math.random() * particles.length);
        const p = particles[sourceIdx];
        // Only spawn from "front" facing particles roughly
        const rotatedZ = p.z * Math.cos(angle) - p.x * Math.sin(angle);
        if (rotatedZ > 0) {
            echoes.push({
              x: p.x, // We store original 3D coords but will rotate them in loop
              y: p.y,
              z: p.z,
              height: 0,
              speed: 1 + Math.random() * 2,
              opacity: 1
            });
        }
      }

      // Draw Globe Particles
      particles.forEach(p => {
        // Rotate around Y axis
        const x1 = p.x * Math.cos(angle) - p.z * Math.sin(angle);
        const z1 = p.z * Math.cos(angle) + p.x * Math.sin(angle);
        
        const scale = 400 / (400 + z1);
        const x2d = cx + x1 * scale;
        const y2d = cy + p.y * scale;
        const alpha = Math.max(0, (z1 + globeRadius) / (2 * globeRadius));

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(x2d, y2d, 1.5 * scale, 1.5 * scale);
      });

      // Draw Echoes (Voices)
      for (let i = echoes.length - 1; i >= 0; i--) {
        const e = echoes[i];
        e.height += e.speed;
        e.opacity -= 0.015;

        if (e.opacity <= 0) {
          echoes.splice(i, 1);
          continue;
        }

        // Rotate echo origin to match globe rotation
        const x1 = e.x * Math.cos(angle) - e.z * Math.sin(angle);
        const z1 = e.z * Math.cos(angle) + e.x * Math.sin(angle);

        const scale = 400 / (400 + z1);
        const xBase = cx + x1 * scale;
        const yBase = cy + e.y * scale;
        const yTop = cy + (e.y - e.height) * scale;

        // Draw vertical line fading out
        const gradient = ctx.createLinearGradient(xBase, yBase, xBase, yTop);
        gradient.addColorStop(0, `rgba(139, 92, 246, 0)`); // Purple base transparent
        gradient.addColorStop(0.2, `rgba(236, 72, 153, ${e.opacity})`); // Magenta mid
        gradient.addColorStop(1, `rgba(249, 115, 22, 0)`); // Orange top fade

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(xBase, yBase);
        ctx.lineTo(xBase, yTop); // Going UP
        ctx.stroke();
      }

      // Trigger finish
      if (elapsed > 4500) { // 4.5 seconds duration
        cancelAnimationFrame(animationFrameId);
        onComplete();
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[60] bg-brand-black flex flex-col items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      <div className="z-10 text-center mix-blend-difference">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter"
        >
            PO LABS
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-brand-magenta font-mono tracking-[0.5em] text-sm mt-4 uppercase"
        >
            Iniciando Transmissão
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;