'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, GitBranch, Gauge, Lock, Sparkles,
  TrendingUp, ArrowRight, CheckCircle2,
} from 'lucide-react';

const FLOWS = [
  {
    id: 'discover',
    label: 'Discover',
    icon: Layers,
    title: 'Strategy that scales with you',
    description:
      'We start with research, audits, and a roadmap that aligns engineering with business outcomes — not vanity metrics.',
    bullets: ['Stakeholder workshops', 'Competitive teardown', 'Roadmap & success metrics'],
    metric: { value: '4×', label: 'faster decision-making' },
    accent: 'from-[#33D6E5] via-[#1D9FB4] to-[#4F7BB8]',
  },
  {
    id: 'design',
    label: 'Design',
    icon: Sparkles,
    title: 'Interfaces people remember',
    description:
      'Pixel-tight UI systems built on Figma component libraries, then handed off as production-ready Tailwind primitives.',
    bullets: ['Design tokens & systems', 'Motion-spec for every state', 'Accessibility AA baseline'],
    metric: { value: '98%', label: 'Lighthouse a11y score' },
    accent: 'from-[#4F7BB8] via-[#33D6E5] to-[#8DF0FA]',
  },
  {
    id: 'build',
    label: 'Build',
    icon: GitBranch,
    title: 'Modular, reviewable, shippable',
    description:
      'Next.js + TypeScript engineered with strict typing, atomic commits, and CI gates so changes never feel risky.',
    bullets: ['Conventional commits', 'Preview env per PR', '100% type coverage on core'],
    metric: { value: '<2 hr', label: 'average PR review time' },
    accent: 'from-[#1D9FB4] via-[#4F7BB8] to-[#33D6E5]',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Gauge,
    title: 'Performance is a feature',
    description:
      'Edge caching, image pipelines, and bundle splits tuned per route so your Core Web Vitals stay green at scale.',
    bullets: ['Sub-200 KB JS budgets', 'Real-user monitoring', 'A/B testing infrastructure'],
    metric: { value: '92+', label: 'avg Lighthouse perf' },
    accent: 'from-[#8DF0FA] via-[#33D6E5] to-[#1D9FB4]',
  },
  {
    id: 'secure',
    label: 'Secure',
    icon: Lock,
    title: 'Security baked in, not bolted on',
    description:
      'OWASP-aligned auth flows, rate-limited APIs, secret-scanning CI, and quarterly dependency audits as standard.',
    bullets: ['SOC 2-friendly logging', 'WAF + CDN policies', 'Incident response runbook'],
    metric: { value: '99.99%', label: 'historical uptime' },
    accent: 'from-[#33D6E5] via-[#8DF0FA] to-[#4F7BB8]',
  },
];

export function FlowFeatures() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef(null);

  // Auto-cycle until user interacts
  useEffect(() => {
    if (!auto) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % FLOWS.length);
    }, 5500);
    return () => clearInterval(timer.current);
  }, [auto]);

  const handleSelect = (i) => {
    setAuto(false);
    setActive(i);
  };

  const current = FLOWS[active];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-surface-base">
      {/* ambient */}
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-40 top-1/3 w-[40rem] h-[40rem] conic-glow opacity-30 blur-2xl pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
          >
            <TrendingUp className="w-4 h-4 text-brand" />
            <span className="text-brand font-semibold text-sm tracking-wide uppercase">How We Operate</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-ink-strong tracking-tight"
          >
            One <span className="gradient-text">flow</span>, five disciplines
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-ink-muted"
          >
            A continuous loop — not a waterfall. Click a stage to explore how we deliver.
          </motion.p>
        </div>

        {/* Flow rail (desktop) + content panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* RAIL */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="space-y-3">
              {FLOWS.map((flow, i) => {
                const Icon = flow.icon;
                const isActive = i === active;
                return (
                  <motion.button
                    key={flow.id}
                    onClick={() => handleSelect(i)}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`relative w-full text-left rounded-2xl border-2 p-5 overflow-hidden transition-all duration-500 group
                      ${isActive
                        ? 'border-line-brand bg-surface shadow-brand-glow'
                        : 'border-line bg-surface hover:border-line-strong'
                      }`}
                  >
                    {/* progress bar — fills while auto */}
                    {isActive && auto && (
                      <motion.span
                        key={`progress-${active}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5.5, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#33D6E5] to-[#4F7BB8]"
                      />
                    )}
                    {/* gradient wash on active */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r ${flow.accent} opacity-0 group-hover:opacity-[0.06] ${isActive ? 'opacity-[0.07]' : ''} transition-opacity duration-500`}
                    />
                    <div className="relative z-10 flex items-center gap-4">
                      {/* number */}
                      <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-500
                        ${isActive
                          ? 'btn-brand-gradient text-[#0B0F18] shadow-brand-glow'
                          : 'bg-surface-sunken text-ink-faint group-hover:text-brand'
                        }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* icon */}
                      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500
                        ${isActive
                          ? 'bg-[#33D6E5]/15 text-brand'
                          : 'bg-surface-sunken text-ink-soft group-hover:text-brand'
                        }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold transition-colors ${isActive ? 'text-ink-strong' : 'text-ink-muted group-hover:text-ink-strong'}`}>
                          {flow.label}
                        </p>
                        <p className="text-xs text-ink-faint truncate">
                          {flow.title}
                        </p>
                      </div>
                      <ArrowRight
                        className={`flex-shrink-0 w-4 h-4 transition-all duration-500
                          ${isActive ? 'text-brand translate-x-1' : 'text-ink-faint opacity-0 group-hover:opacity-100'}`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* PANEL */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="relative tw-card p-8 md:p-10 lg:p-12 overflow-hidden min-h-[460px]">
              {/* corner glow */}
              <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${current.accent} opacity-20 rounded-full blur-3xl pointer-events-none transition-all duration-700`} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {/* large brand glyph */}
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${current.accent} flex items-center justify-center mb-6 shadow-brand-glow`}>
                    <current.icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#0B0F18]" />
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-[2.6rem] font-heading font-bold text-ink-strong mb-4 leading-[1.1] tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-base md:text-lg text-ink-muted mb-8 leading-relaxed max-w-xl">
                    {current.description}
                  </p>

                  {/* bullet list */}
                  <ul className="space-y-3 mb-8">
                    {current.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                        className="flex items-center gap-3 text-ink"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#33D6E5]/15 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
                        </span>
                        <span className="text-sm md:text-base font-medium">{b}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* metric pill */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-surface-sunken border border-line"
                  >
                    <div>
                      <div className={`text-2xl md:text-3xl font-black bg-gradient-to-br ${current.accent} bg-clip-text text-transparent`}>
                        {current.metric.value}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-line" />
                    <p className="text-sm text-ink-muted font-medium">{current.metric.label}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
