'use client';

import React, { useEffect, useRef } from 'react';

interface CanvasParticlesProps {
  mode?: 'sand' | 'stars' | 'fog';
  className?: string;
}

export const CanvasParticles: React.FC<CanvasParticlesProps> = ({ mode = 'sand', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = mode === 'stars' ? 120 : mode === 'fog' ? 40 : 80;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: mode === 'fog' ? Math.random() * 40 + 20 : Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * (mode === 'sand' ? 0.8 : 0.2),
      vy: mode === 'sand' ? -Math.random() * 0.6 - 0.1 : (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        if (mode === 'sand') {
          // Warm golden sand shimmer
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(0.8, p.alpha))})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(229, 193, 88, 0.4)';
        } else if (mode === 'stars') {
          // Night sky glittering stars
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, Math.min(0.9, p.alpha))})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
        } else {
          // Soft atmospheric fog
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          gradient.addColorStop(0, `rgba(212, 175, 55, ${p.alpha * 0.15})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 z-0 ${className}`} />;
};
