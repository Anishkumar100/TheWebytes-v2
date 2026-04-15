'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ScrollReveal, TiltCard } from '@/components/animations';

export function ServicesGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface-base">
      {/* ambient backdrop */}
      <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
            >
              <span className="text-brand font-semibold text-sm">What We Do</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-ink-strong">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-lg text-ink-muted">Comprehensive digital solutions tailored to your business needs.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.id} delay={index * 0.08}>
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <TiltCard className="h-full" intensity={10}>
                    <div className="tw-card tw-card-hover p-8 h-full group relative overflow-hidden">
                      {/* hover glow */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#33D6E5]/0 group-hover:bg-[#33D6E5]/10 rounded-full blur-3xl transition-colors duration-500" />

                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl btn-brand-gradient flex items-center justify-center mb-6 shadow-brand-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <Icon className="w-7 h-7 text-[#1C1825]" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-3 text-[#1C1825] group-hover:text-brand transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-ink-muted text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-line">
                          <span className="text-sm font-semibold text-brand">{service.pricing}</span>
                          <ArrowRight className="w-5 h-5 text-brand group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" className="group">
                View All Services <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
