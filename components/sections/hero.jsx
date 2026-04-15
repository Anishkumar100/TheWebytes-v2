'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

/**
 * Word-by-word stagger reveal helper.
 */
function StaggerWords({ text, className = '', delay = 0, gradient = false }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${gradient ? 'gradient-text' : ''}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Magnetic CTA wrapper — buttons drift toward cursor on hover.
 */
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className="inline-block">
      {children}
    </motion.div>
  );
}

export function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const yBg      = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Mouse-parallax for foreground orbs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / 40);
      my.set((e.clientY - cy) / 40);
    };
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }
  }, [mx, my]);

  // Particle network
  useEffect(() => {
    if (!mounted || !canvasRef.current || typeof window === 'undefined' || window.innerWidth < 1024) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const isDark = (resolvedTheme || 'dark') === 'dark';

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = isDark
      ? ['rgba(51,214,229,', 'rgba(141,240,250,', 'rgba(29,159,180,']
      : ['rgba(29,159,180,', 'rgba(79,123,184,', 'rgba(51,214,229,'];

    class P {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r = Math.random() * 2.5 + 0.8;
        this.c = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.c + (isDark ? '0.7)' : '0.55)');
        ctx.fill();
      }
    }
    for (let i = 0; i < 65; i++) particles.push(new P());

    let raf;
    const lineAlpha = isDark ? 0.32 : 0.22;
    const lineColor = isDark ? '51,214,229' : '29,159,180';
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineColor},${lineAlpha * (1 - d / 160)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted, resolvedTheme]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-b from-[#F7FAFB] via-[#EEF4F7] to-[#F7FAFB]
                 dark:from-[#1C1825] dark:via-[#1a2235] dark:to-[#1C1825]"
    >
      {/* parallax mesh + grid */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 mesh-gradient pointer-events-none" />
      <motion.div style={{ y: yBg }} className="absolute inset-0 space-grid opacity-50 pointer-events-none" />

      {/* particle canvas */}
      {mounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
          style={{ zIndex: 1 }}
        />
      )}

      {/* mouse-parallax orbs */}
      <motion.div
        style={{ x: smx, y: smy }}
        className="absolute top-20 -left-20 w-[26rem] h-[26rem] rounded-full pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-[#33D6E5]/15 dark:bg-[#33D6E5]/14 rounded-full blur-3xl"
        />
      </motion.div>
      <motion.div
        style={{ x: smx, y: smy }}
        className="absolute -bottom-20 -right-20 w-[26rem] h-[26rem] rounded-full pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="w-full h-full bg-[#4F7BB8]/12 rounded-full blur-3xl"
        />
      </motion.div>

      {/* corner accents */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute top-32 right-16 w-32 h-32 hidden lg:block pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div className="w-full h-full conic-glow rounded-full opacity-40 blur-md" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        style={{ y: yContent, opacity, scale }}
        className="relative container mx-auto px-4 py-32 z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong group hover:scale-105 transition-transform duration-300 shadow-brand-md">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Sparkles className="w-4 h-4 text-brand" />
              </motion.span>
              <span className="text-sm font-semibold text-brand tracking-wide">
                Premium Software Development Agency
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
            </div>
          </motion.div>

          {/* HEADING */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold mb-8 leading-[1.02] tracking-tight text-ink-strong">
            <StaggerWords text="We Build" delay={0.15} />{' '}
            <StaggerWords text="Digital Products" delay={0.35} gradient />
            <br />
            <span className="inline-block mt-2">
              <StaggerWords text="That People Love" delay={0.6} className="gradient-text-deep" />
            </span>
          </h1>

          {/* SUBHEADING */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-ink-muted mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your ideas into powerful web &amp; mobile applications. Scalable, high-performance solutions that drive real business results.
          </motion.p>

          {/* CTAs — magnetic + premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Magnetic strength={0.25}>
              <Link href="/contact">
                <button className="group relative h-14 px-9 rounded-2xl btn-brand-gradient btn-brand-gradient-hover text-[#0B0F18] font-bold text-base overflow-hidden shadow-[0_18px_50px_-10px_rgba(51,214,229,0.55)] hover:shadow-[0_24px_60px_-10px_rgba(51,214,229,0.7)] transition-shadow duration-500">
                  {/* shine */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Link href="/about">
                <button className="group relative h-14 px-8 rounded-2xl bg-transparent border-2 border-line-brand text-ink-strong font-semibold text-base overflow-hidden hover:border-[#33D6E5] transition-all duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/0 via-[#33D6E5]/15 to-[#4F7BB8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#33D6E5]/15 group-hover:bg-[#33D6E5]/30 flex items-center justify-center transition-colors">
                      <Play className="w-3 h-3 text-brand fill-brand ml-0.5" />
                    </span>
                    Who Are We?
                  </span>
                </button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* TRUST STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#33D6E5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#33D6E5]" />
              </span>
              <span className="font-medium">Accepting projects</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-line" />
            <div className="flex items-center gap-1.5 text-sm text-ink-muted">
              <Zap className="w-4 h-4 text-brand" />
              <span><strong className="text-ink-strong">270+</strong> projects shipped</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-line" />
            <div className="flex items-center gap-1.5 text-sm text-ink-muted">
              <span className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#33D6E5] fill-[#33D6E5]" />)}
              </span>
              <span><strong className="text-ink-strong">4.9</strong> / 5 rating</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-ink-faint font-semibold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-line-brand to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-[#33D6E5] to-transparent"
          />
        </div>
      </motion.div>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--surface-base)] pointer-events-none z-[2]" />
    </section>
  );
}
