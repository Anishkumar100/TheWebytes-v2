'use client';

import { useEffect, useRef } from 'react';

export function FloatingParticles({ count = 20, color = 'cyan', speed = 0.3, size = 'small' }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true, willReadFrequently: false });

    // ── Brand palette colors ──────────────────────────────────
    const colors = {
      cyan:   ['rgba(51,214,229,0.40)','rgba(51,214,229,0.60)','rgba(51,214,229,0.80)'],
      blue:   ['rgba(79,123,184,0.40)','rgba(79,123,184,0.60)','rgba(79,123,184,0.80)'],
      purple: ['rgba(29,159,180,0.40)','rgba(29,159,180,0.60)','rgba(29,159,180,0.80)'],
      mixed:  ['rgba(51,214,229,0.50)','rgba(79,123,184,0.50)','rgba(141,240,250,0.45)'],
    };
    const particleColors = colors[color] || colors.cyan;
    const sizeRange = { small:{min:1,max:3}, medium:{min:2,max:5}, large:{min:3,max:7} }[size] || {min:1,max:3};

    let particles = [];

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.style.width  = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x:      Math.random() * canvas.offsetWidth,
        y:      Math.random() * canvas.offsetHeight,
        size:   Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        color:  particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    let lastTime = 0;
    const fpsInterval = 1000 / 20;

    const animate = (now) => {
      if (now - lastTime > fpsInterval) {
        lastTime = now - ((now - lastTime) % fpsInterval);
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        particles.forEach((p) => {
          p.x += p.speedX; p.y += p.speedY;
          if (p.x < 0) p.x = canvas.offsetWidth;
          if (p.x > canvas.offsetWidth)  p.x = 0;
          if (p.y < 0) p.y = canvas.offsetHeight;
          if (p.y > canvas.offsetHeight) p.y = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle   = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate(0);
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, color, speed, size]);

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      style={{ zIndex: 1 }}
    />
  );
}
