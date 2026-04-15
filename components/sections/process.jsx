'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search, Lightbulb, Code2, Rocket, CheckCircle2, ArrowRight, Sparkles,
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations';

const processes = [
  {
    icon: Search, number: '01', title: 'Discovery & Research',
    description: 'We dive deep into your business goals, target audience, and competition to create a solid foundation.',
    features: ['Requirement Analysis', 'Market Research', 'Competitor Analysis', 'Goal Setting'],
    accent: 'from-[#33D6E5] to-[#1D9FB4]',
  },
  {
    icon: Lightbulb, number: '02', title: 'Design & Planning',
    description: 'Our designers create stunning mockups and interactive prototypes aligned with your brand identity.',
    features: ['Wireframing', 'UI/UX Design', 'Prototyping', 'Design System'],
    accent: 'from-[#4F7BB8] to-[#33D6E5]',
  },
  {
    icon: Code2, number: '03', title: 'Development',
    description: 'Expert developers bring your vision to life with clean, scalable, and maintainable code.',
    features: ['Frontend Development', 'Backend Development', 'API Integration', 'Testing'],
    accent: 'from-[#1D9FB4] to-[#4F7BB8]',
  },
  {
    icon: Rocket, number: '04', title: 'Launch & Deploy',
    description: 'We deploy your solution to production with comprehensive testing and quality assurance.',
    features: ['Deployment', 'Performance Optimization', 'Security Audit', 'Training'],
    accent: 'from-[#33D6E5] to-[#4F7BB8]',
  },
  {
    icon: CheckCircle2, number: '05', title: 'Support & Growth',
    description: 'Ongoing maintenance, updates, and optimization to ensure your solution stays ahead.',
    features: ['24/7 Support', 'Regular Updates', 'Performance Monitoring', 'Scaling'],
    accent: 'from-[#4F7BB8] to-[#1D9FB4]',
  },
];

export function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y    = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2   = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden bg-surface-alt">
      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
            >
              <span className="text-brand font-semibold text-sm tracking-wide uppercase">Our Process</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-ink-strong tracking-tight">
              <span className="gradient-text">From Idea to Launch</span>
            </h2>
            <p className="text-xl text-ink-muted max-w-2xl mx-auto">
              A proven 5-step process that delivers exceptional results every time
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Center line — fills with scroll progress */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="absolute inset-0 bg-line" />
            <motion.div
              style={{ height: lineProgress }}
              className="absolute top-0 inset-x-0 bg-gradient-to-b from-[#33D6E5] via-[#4F7BB8] to-[#1D9FB4] origin-top"
            />
          </div>

          <div className="space-y-20 lg:space-y-28">
            {processes.map((process, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="flex-1 lg:w-1/2 w-full">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -6 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative tw-card tw-card-hover p-8 lg:p-10 group overflow-hidden ${isEven ? 'lg:mr-10' : 'lg:ml-10'}`}
                    >
                      {/* color-graded backdrop */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${process.accent} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`} />
                      {/* corner orb */}
                      <div className={`absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br ${process.accent} opacity-15 group-hover:opacity-35 blur-2xl rounded-full transition-all duration-700 pointer-events-none`} />

                      <div className="relative z-10">
                        <div className="flex items-start gap-6 mb-6">
                          <motion.div
                            whileHover={{ rotate: -10, scale: 1.08 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                            className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${process.accent} flex items-center justify-center shadow-brand-glow relative`}
                          >
                            <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${process.accent} opacity-50 blur-md scale-110 group-hover:scale-125 transition-transform duration-500`} />
                            <process.icon className="w-8 h-8 text-white relative z-10" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-3 mb-1">
                              <div className={`text-5xl font-black bg-gradient-to-br ${process.accent} bg-clip-text text-transparent leading-none tracking-tight`}>
                                {process.number}
                              </div>
                              <span className="text-xs font-semibold text-ink-faint uppercase tracking-[0.2em]">Phase</span>
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-ink-strong leading-tight">{process.title}</h3>
                          </div>
                        </div>

                        <p className="text-ink-muted mb-6 leading-relaxed text-base lg:text-lg">{process.description}</p>

                        {/* Features grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {process.features.map((feature, fIndex) => (
                            <motion.div
                              key={fIndex}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + fIndex * 0.06 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-ink-muted group/feat"
                            >
                              <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${process.accent} flex items-center justify-center opacity-80 group-hover/feat:opacity-100 transition-opacity`}>
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </span>
                              <span className="font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom progress bar */}
                        <div className="mt-8 h-1 w-full rounded-full bg-line overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            whileInView={{ width: `${((index + 1) / processes.length) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full bg-gradient-to-r ${process.accent}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="relative w-14 h-14"
                    >
                      <span className={`absolute inset-0 rounded-full bg-gradient-to-br ${process.accent} blur-md opacity-60`} />
                      <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${process.accent} border-4 border-[var(--surface-alt)] flex items-center justify-center shadow-brand-glow`}>
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-3 h-3 rounded-full bg-white"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex-1 lg:w-1/2 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Premium CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-24 text-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl btn-brand-gradient btn-brand-gradient-hover text-[#0B0F18] font-bold text-lg shadow-[0_18px_50px_-10px_rgba(51,214,229,0.55)] hover:shadow-[0_24px_60px_-10px_rgba(51,214,229,0.75)] transition-shadow duration-500 overflow-hidden"
              >
                {/* shine sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {/* sparkle icon */}
                <span className="relative z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0B0F18]/10 group-hover:rotate-180 transition-transform duration-700">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </motion.div>
            <p className="mt-4 text-sm text-ink-faint">
              Free 30-min consultation. No pitch decks, just code &amp; strategy.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <motion.div style={{ y }}  className="absolute top-20 right-10 w-72 h-72 bg-[#33D6E5]/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10 w-96 h-96 bg-[#4F7BB8]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
