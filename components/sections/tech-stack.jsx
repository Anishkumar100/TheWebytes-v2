'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations';

const technologies = {
  frontend: [
    { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg', darkBg: true },
    { name: 'Vue.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  ],
  backend: [
    { name: 'Node.js',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Django',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg', darkBg: true },
    { name: 'Express',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg', darkBg: true },
    { name: 'GraphQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  ],
  mobile: [
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Flutter',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Swift',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
    { name: 'Kotlin',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    { name: 'Ionic',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg' },
  ],
  cloud: [
    { name: 'AWS',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', darkBg: true },
    { name: 'Vercel',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original-wordmark.svg', darkBg: true },
    { name: 'Azure',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    { name: 'Docker',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  ],
};

function TechCategory({ title, techs, delay = 0 }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-ink-strong text-center">{title}</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5, y: -4 }}
              className="glass px-6 py-4 rounded-2xl hover:shadow-brand-glow transition-all cursor-pointer group hover:border-line-brand"
            >
              <div className="text-center">
                <div className={`w-10 h-10 mx-auto mb-2 relative group-hover:scale-110 transition-transform ${tech.darkBg ? 'bg-white rounded-lg p-1' : ''}`}>
                  <Image src={tech.icon} alt={tech.name} width={40} height={40} className="w-full h-full object-contain" unoptimized />
                </div>
                <p className="text-sm font-medium text-ink">{tech.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export function TechStack() {
  return (
    <section className="py-20 relative overflow-hidden bg-surface-base">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
            >
              <span className="text-brand font-semibold text-sm">Technology Stack</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">
              <span className="gradient-text">Built With Modern Tech</span>
            </h2>
            <p className="text-xl text-ink-muted max-w-2xl mx-auto">
              We use cutting-edge technologies to build scalable, high-performance solutions
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <TechCategory title="Frontend"       techs={technologies.frontend} delay={0}    />
          <TechCategory title="Backend"        techs={technologies.backend}  delay={0.1}  />
          <TechCategory title="Mobile"         techs={technologies.mobile}   delay={0.2}  />
          <TechCategory title="Cloud & DevOps" techs={technologies.cloud}    delay={0.3}  />
        </div>
      </div>

      <motion.div animate={{ rotate: 360 }}  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#33D6E5]/10 rounded-full pointer-events-none" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#4F7BB8]/10 rounded-full pointer-events-none" />
    </section>
  );
}
