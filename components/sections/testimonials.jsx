'use client';
import { Star } from 'lucide-react';
import { ScrollReveal } from '@/components/animations';
import Image from 'next/image';

const TESTIMONIALS = [
  { name: 'Rajesh Kumar',  role: 'CEO, TechStart India',         content: 'TheWebytes transformed our digital presence completely. Their attention to detail and technical expertise is unmatched.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Priya Sharma',  role: 'Founder, StyleHub',            content: 'The e-commerce platform they built increased our sales by 300%. Absolutely worth every penny!', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Arjun Patel',   role: 'Marketing Director, GrowFast', content: 'Best agency we have worked with. Professional, creative, and delivered beyond expectations.', rating: 5, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Sneha Reddy',   role: 'Product Manager, AppWorks',    content: "Our mobile app launch was a huge success thanks to TheWebytes's exceptional development team.", rating: 5, img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face' },
  { name: 'Vikram Singh',  role: 'CTO, DataFlow Solutions',      content: 'Their custom development solutions solved complex problems we struggled with for months.', rating: 5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Ananya Iyer',   role: 'Founder, CreativeMinds',       content: 'The UI/UX design work was phenomenal. Our users love the new interface!', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface-alt">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-ink-strong">
              What Our <span className="glow-text text-brand">Clients Say</span>
            </h2>
            <p className="text-lg text-ink-muted">Don't just take our word for it. Here's what clients say about working with us.</p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* edge fades use the section bg color to mask */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--surface-alt)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--surface-alt)] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="flex animate-marquee gap-6">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-[400px] tw-card tw-card-hover p-8 group">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#33D6E5] text-[#33D6E5]" />
        ))}
      </div>
      <p className="text-ink leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#33D6E5]/40 group-hover:ring-[#33D6E5]/70 transition-all">
          <Image src={t.img} alt={t.name} fill className="object-cover" unoptimized />
        </div>
        <div>
          <div className="font-semibold text-ink-strong">{t.name}</div>
          <div className="text-sm text-ink-faint">{t.role}</div>
        </div>
      </div>
    </div>
  );
}
