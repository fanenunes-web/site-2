import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Canvas Globe Animation
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

    const particles: {x: number, y: number, z: number, size: number}[] = [];
    const particleCount = 700;
    const globeRadius = Math.min(width, height) * 0.35;

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const x = globeRadius * Math.sin(phi) * Math.cos(theta);
        const y = globeRadius * Math.sin(phi) * Math.sin(theta);
        const z = globeRadius * Math.cos(phi);
        particles.push({ x, y, z, size: Math.random() * 1.5 + 0.5 });
    }

    let angle = 0;

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Center of screen
        const cx = width / 2;
        const cy = height / 2;

        angle += 0.002;

        // Sort particles by Z depth for simple occlusion effect
        particles.sort((a, b) => {
            const zA = a.z * Math.cos(angle) - a.x * Math.sin(angle);
            const zB = b.z * Math.cos(angle) - b.x * Math.sin(angle);
            return zA - zB;
        });

        particles.forEach(p => {
            // Rotate around Y axis
            const x1 = p.x * Math.cos(angle) - p.z * Math.sin(angle);
            const z1 = p.z * Math.cos(angle) + p.x * Math.sin(angle);
            
            // Perspective projection
            const scale = 300 / (300 + z1); // Camera distance
            const x2d = cx + x1 * scale;
            const y2d = cy + p.y * scale;

            const alpha = (z1 + globeRadius) / (2 * globeRadius); // Fade back particles

            ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.8})`; // Purple tint
            ctx.beginPath();
            ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
            ctx.fill();

            // Connections (simulate network/waves)
            particles.forEach(p2 => {
                 const dx = p.x - p2.x;
                 const dy = p.y - p2.y;
                 const dz = p.z - p2.z;
                 const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                 if (dist < globeRadius * 0.15 && Math.random() > 0.995) {
                    // Very faint lines appearing randomly
                     const x1_2 = p2.x * Math.cos(angle) - p2.z * Math.sin(angle);
                     const z1_2 = p2.z * Math.cos(angle) + p2.x * Math.sin(angle);
                     const scale2 = 300 / (300 + z1_2);
                     const x2d_2 = cx + x1_2 * scale2;
                     const y2d_2 = cy + p2.y * scale2;
                     
                     ctx.strokeStyle = `rgba(236, 72, 153, ${alpha * 0.3})`;
                     ctx.lineWidth = 0.5;
                     ctx.beginPath();
                     ctx.moveTo(x2d, y2d);
                     ctx.lineTo(x2d_2, y2d_2);
                     ctx.stroke();
                 }
            });
        });

        requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-brand-black">
      {/* Background Canvas for Globe */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

      {/* Hero Content */}
      <motion.div 
        ref={containerRef}
        style={{ y: yText, opacity: opacityText }}
        className="z-10 text-center px-4 max-w-5xl"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-6 inline-block"
        >
             <span className="px-3 py-1 border border-brand-purple/50 rounded-full text-xs font-mono text-brand-purple uppercase tracking-[0.2em] bg-brand-purple/10 backdrop-blur-sm">
                Transmissão Global
             </span>
        </motion.div>

        <h1 className="text-5xl md:text-9xl font-display font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-8">
          VOZES QUE<br/> ECOAM.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          "Ide por todo mundo e leve a mensagem."<br/>
          O estúdio de podcasts mais premiado e futurista do Brasil.
        </p>
      </motion.div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent z-10" />
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Role para Explorar</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-magenta to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;