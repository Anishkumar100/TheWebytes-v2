'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, Shield, Users, TrendingUp, HeadphonesIcon, Award } from 'lucide-react';
import { ScrollReveal } from '@/components/animations';

const reasons = [
  {
    icon: Zap, title: 'Lightning Fast Delivery', stat: '2-3 Weeks', statLabel: 'Avg. delivery',
    description: 'Agile process ensures rapid development without compromising quality.',
    accent: 'from-[#33D6E5] to-[#1D9FB4]',
    glow:   'shadow-[0_0_60px_-15px_rgba(51,214,229,0.5)]',
  },
  {
    icon: Shield, title: 'Enterprise-Grade Security', stat: '100%', statLabel: 'Secure infra',
    description: 'Industry-leading security practices and regular audits built-in.',
    accent: 'from-[#4F7BB8] to-[#33D6E5]',
    glow:   'shadow-[0_0_60px_-15px_rgba(79,123,184,0.5)]',
  },
  {
    icon: Users, title: 'Expert Team', stat: '500+', statLabel: 'Projects shipped',
    description: 'Seasoned professionals who have delivered 500+ successful projects.',
    accent: 'from-[#1D9FB4] to-[#4F7BB8]',
    glow:   'shadow-[0_0_60px_-15px_rgba(29,159,180,0.5)]',
  },
  {
    icon: TrendingUp, title: 'Scalable Solutions', stat: '10×', statLabel: 'Growth headroom',
    description: 'Build for today, prepared for tomorrow. Solutions that grow with you.',
    accent: 'from-[#33D6E5] to-[#4F7BB8]',
    glow:   'shadow-[0_0_60px_-15px_rgba(51,214,229,0.5)]',
  },
  {
    icon: HeadphonesIcon, title: '24/7 Support', stat: '24/7', statLabel: 'Always-on team',
    description: 'Round-the-clock support from our dedicated team whenever you need us.',
    accent: 'from-[#4F7BB8] to-[#1D9FB4]',
    glow:   'shadow-[0_0_60px_-15px_rgba(79,123,184,0.5)]',
  },
  {
    icon: Award, title: 'Quality Guaranteed', stat: '100%', statLabel: 'Satisfaction',
    description: '100% satisfaction guarantee. Your success is our success.',
    accent: 'from-[#1D9FB4] to-[#33D6E5]',
    glow:   'shadow-[0_0_60px_-15px_rgba(29,159,180,0.5)]',
  },
];

function SpotlightCard({ reason, index }) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 200, damping: 25 });
  const sy = useSpring(my, { stiffness: 200, damping: 25 });
  const bg = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(360px circle at ${x}% ${y}%, rgba(51,214,229,0.18), transparent 60%)`
  );

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top)  / rect.height) * 100);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative tw-card p-8 h-full group overflow-hidden hover:border-line-brand transition-all duration-500 hover:${reason.glow}`}
    >
      {/* spotlight cursor follow */}
      <motion.div
        style={{ background: bg }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      {/* color-graded backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${reason.accent} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none`} />
      {/* corner orb */}
      <div className={`absolute -top-20 -right-20 w-44 h-44 bg-gradient-to-br ${reason.accent} opacity-15 group-hover:opacity-35 blur-2xl rounded-full transition-all duration-700 pointer-events-none`} />

      <div className="relative z-10">
        {/* icon + stat header row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.accent} flex items-center justify-center shadow-brand-glow relative`}
          >
            {/* halo */}
            <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${reason.accent} opacity-50 blur-md scale-110 group-hover:scale-125 transition-transform duration-500`} />
            <reason.icon className="w-7 h-7 text-white relative z-10" />
          </motion.div>

          <div className="text-right">
            <div className={`text-3xl font-black bg-gradient-to-br ${reason.accent} bg-clip-text text-transparent leading-none`}>
              {reason.stat}
            </div>
            <div className="text-[11px] text-ink-faint font-medium uppercase tracking-wider mt-1">
              {reason.statLabel}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-ink-strong mb-3 group-hover:text-brand transition-colors duration-300">
          {reason.title}
        </h3>
        <p className="text-ink-muted leading-relaxed mb-6">{reason.description}</p>

        {/* progress bar accent */}
        <div className="h-1 w-full rounded-full bg-line overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: index * 0.1 + 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full bg-gradient-to-r ${reason.accent}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-surface-base">
      <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
            >
              <span className="text-brand font-semibold text-sm tracking-wide uppercase">Why TheWebytes</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-ink-strong tracking-tight">
              <span className="gradient-text">Why Choose Us</span>
            </h2>
            <p className="text-xl text-ink-muted max-w-2xl mx-auto">
              We&rsquo;re not just developers — we&rsquo;re your partners in digital success
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <SpotlightCard reason={r} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#33D6E5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#4F7BB8]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
