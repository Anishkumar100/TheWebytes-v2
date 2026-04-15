'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { SERVICES } from '@/lib/constants';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export function ServicesTree() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const servicePositions = useMemo(() => [
    { x: 50, y: 6  }, { x: 20, y: 28 }, { x: 80, y: 28 },
    { x: 6,  y: 52 }, { x: 32, y: 54 }, { x: 68, y: 54 }, { x: 94, y: 54 },
    { x: 20, y: 84 }, { x: 50, y: 84 }, { x: 80, y: 84 },
  ], []);

  const connections = useMemo(() => [
    [0,1],[0,2],[1,3],[1,4],[2,5],[2,6],
    [3,7],[4,7],[4,8],[5,8],[5,9],[6,9],[7,8],[8,9],
  ], []);

  const connectionPaths = useMemo(() =>
    connections.map(([startIdx, endIdx]) => ({
      start: servicePositions[startIdx], end: servicePositions[endIdx], startIdx, endIdx,
    })), [connections, servicePositions]);

  const handleMouseEnter = useCallback((i) => setHoveredIndex(i), []);
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  // Animated canvas — connections with subtle moving dashes when hovered
  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const container = containerRef.current;
    const isDark = (resolvedTheme || 'dark') === 'dark';

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width  = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
    };

    let dashOffset = 0;
    let raf;
    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      connectionPaths.forEach(({ start, end, startIdx, endIdx }) => {
        const x1 = (start.x / 100) * w, y1 = (start.y / 100) * h;
        const x2 = (end.x   / 100) * w, y2 = (end.y   / 100) * h;
        const isHovered = hoveredIndex === startIdx || hoveredIndex === endIdx;

        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1+x2)/2, (y1+y2)/2 - 30, x2, y2);

        if (isHovered) {
          const g = ctx.createLinearGradient(x1, y1, x2, y2);
          g.addColorStop(0, 'rgba(51,214,229,0.95)');
          g.addColorStop(1, 'rgba(79,123,184,0.95)');
          ctx.strokeStyle = g;
          ctx.lineWidth   = 2.5;
          ctx.setLineDash([10, 8]);
          ctx.lineDashOffset = -dashOffset;
        } else {
          ctx.strokeStyle = isDark ? 'rgba(51,214,229,0.18)' : 'rgba(29,159,180,0.20)';
          ctx.lineWidth   = 1.5;
          ctx.setLineDash([]);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);

      if (hoveredIndex !== null) {
        dashOffset = (dashOffset + 0.6) % 18;
        raf = requestAnimationFrame(draw);
      }
    };

    resizeCanvas();
    draw();

    if (hoveredIndex !== null) raf = requestAnimationFrame(draw);

    const onResize = () => { resizeCanvas(); draw(); };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hoveredIndex, mounted, resolvedTheme, connectionPaths]);

  if (!mounted) return null;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden hidden lg:block bg-surface-base">
      {/* ambient backdrop */}
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-brand font-semibold text-sm tracking-wide uppercase">Our Ecosystem</span>
            <Sparkles className="w-4 h-4 text-brand" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-bold mb-6 text-ink-strong tracking-tight"
          >
            <span className="gradient-text">Connected Services Network</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed"
          >
            All our services work together seamlessly like a symphony
          </motion.p>
        </div>

        <div ref={containerRef} className="relative h-[920px]">
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />

          {SERVICES.map((service, index) => {
            const pos = servicePositions[index];
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={service.slug}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%,-50%)',
                  zIndex: isHovered ? 30 : 10,
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.06, y: -4 }}
                >
                  <Link href={`/services/${service.slug}`}>
                    <div className="relative">
                      {/* number badge — floats OUTSIDE the card top-left, no overlap */}
                      <motion.div
                        animate={isHovered ? { rotate: -10, scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute -top-3 -left-3 z-30 w-9 h-9 rounded-full btn-brand-gradient border-2 border-[var(--surface-base)] flex items-center justify-center shadow-brand-glow"
                      >
                        <span className="text-[11px] font-black text-[#0B0F18]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </motion.div>

                      {/* hover ripple ring */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0.6 }}
                            animate={{ scale: 1.3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity }}
                            className="absolute inset-0 rounded-3xl border-2 border-[#33D6E5] pointer-events-none"
                          />
                        )}
                      </AnimatePresence>

                      {/* CARD */}
                      <div className="relative p-6 pt-7 rounded-3xl w-60 cursor-pointer group overflow-hidden border border-line bg-surface shadow-brand-md hover:shadow-brand-glow hover:border-line-brand transition-all duration-500">
                        {/* hover wash */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#33D6E5]/0 via-transparent to-[#4F7BB8]/0 group-hover:from-[#33D6E5]/8 group-hover:to-[#4F7BB8]/8 transition-all duration-500" />

                        <div className="relative z-10">
                          <div className="w-14 h-14 rounded-xl btn-brand-gradient flex items-center justify-center mb-4 shadow-brand-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <service.icon className="w-7 h-7 text-[#0B0F18]" />
                          </div>
                          <h3 className="font-bold text-ink-strong mb-2 text-base leading-tight">
                            {service.title}
                          </h3>
                          <div className="flex items-center text-xs text-brand font-semibold gap-1 group-hover:gap-2 transition-all">
                            View Details
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* tip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-line-brand">
            <Zap className="w-4 h-4 text-brand" />
            <p className="text-ink-muted text-sm font-medium">
              Hover over any service to see connections illuminate
            </p>
          </div>
        </motion.div>
      </div>

      {/* deep ambient glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] conic-glow rounded-full blur-2xl pointer-events-none -z-10 opacity-50"
      />
    </section>
  );
}
