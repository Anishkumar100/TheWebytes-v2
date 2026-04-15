'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Zap } from 'lucide-react';

const stats = [
  { icon: Briefcase,  number: 270, suffix: '+',     label: 'Projects Delivered' },
  { icon: Users,      number: 30,  suffix: '+',     label: 'Happy Clients' },
  { icon: TrendingUp, number: 98,  suffix: '%',     label: 'Success Rate' },
  { icon: Zap,        number: 2,   suffix: ' Years', label: 'Experience' },
];

export function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        stats.forEach((stat, index) => {
          const steps = 60;
          const inc = stat.number / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= stat.number) {
              cur = stat.number;
              clearInterval(timer);
            }
            setCounts(prev => {
              const n = [...prev];
              n[index] = Math.floor(cur);
              return n;
            });
          }, 2000 / steps);
        });
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-surface-base">
      {/* tinted band */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/[0.05] via-transparent to-[#4F7BB8]/[0.05] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="tw-card tw-card-hover p-8 text-center group hover-lift"
            >
              <div className="w-14 h-14 rounded-xl btn-brand-gradient flex items-center justify-center mx-auto mb-4 shadow-brand-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <stat.icon className="w-7 h-7 text-[#1C1825]" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 tracking-tight">
                {counts[index]}{stat.suffix}
              </div>
              <div className="text-sm text-ink-muted font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
