'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Coffee, Users, Lightbulb, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal, ScaleIn } from '@/components/animations';

const whyUs = [
  { icon: Coffee,    title: 'No BS Meetings',   desc: 'We actually code',      color: 'from-[#33D6E5] to-[#1D9FB4]' },
  { icon: Zap,       title: 'Lightning Fast',   desc: 'Like, seriously quick', color: 'from-[#4F7BB8] to-[#33D6E5]' },
  { icon: Users,     title: 'Real People',      desc: 'Not bots or scripts',   color: 'from-[#1D9FB4] to-[#4F7BB8]' },
  { icon: Lightbulb, title: 'Smart Solutions',  desc: 'Your success = ours',   color: 'from-[#33D6E5] to-[#4F7BB8]' },
];
const perks = [
  'We reply to emails (usually within an hour)',
  'Your code is YOURS — forever',
  'Free revisions until you smile',
  'We explain tech in plain English',
];

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface-base">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#33D6E5]/[0.04] to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#33D6E5]/8 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F7BB8]/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="relative container mx-auto px-4">
        <ScrollReveal>
          <div className="relative tw-card rounded-3xl p-8 md:p-12 lg:p-16 max-w-6xl mx-auto border-line-brand shadow-brand-glow">
            {/* badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden md:block">
              <div className="btn-brand-gradient px-6 py-3 rounded-full shadow-brand-glow">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#1C1825] fill-[#1C1825]" />
                  <span className="text-sm font-black text-[#1C1825]">Rated 4.9/5 by real clients</span>
                  <Star className="w-4 h-4 text-[#1C1825] fill-[#1C1825]" />
                </div>
              </div>
            </div>

            <div className="text-center mb-12 mt-4">
              <ScaleIn delay={0.1}>
                <div className="inline-block mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl btn-brand-gradient flex items-center justify-center shadow-brand-glow animate-float">
                      <Sparkles className="w-10 h-10 text-[#1C1825]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#33D6E5] rounded-full border-4 border-[var(--surface)] animate-pulse" />
                  </div>
                </div>
              </ScaleIn>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-ink-strong">
                Ready to Build Something <span className="gradient-text">Epic?</span>
              </h2>
              <p className="text-lg md:text-xl text-ink-muted mb-4 max-w-2xl mx-auto leading-relaxed">
                Stop overthinking it. Let&rsquo;s turn your idea into a real product that people actually want to use.
              </p>
              <p className="text-sm text-brand font-semibold mb-8">👋 We&rsquo;re accepting new projects this month!</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/contact">
                  <Button size="xl" className="group shine">
                    <span className="relative z-10">Let&rsquo;s Talk About Your Project</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* why us */}
            <div className="mb-10">
              <h3 className="text-center text-xl font-bold mb-6 text-ink-strong">Why people love working with us 💙</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {whyUs.map((item, i) => (
                  <ScaleIn key={i} delay={0.2 + i * 0.08}>
                    <div className="group tw-card tw-card-hover p-5 rounded-2xl text-center hover:scale-105 transition-all duration-300 cursor-default">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-brand-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-bold text-sm mb-1 text-ink-strong">{item.title}</h4>
                      <p className="text-xs text-ink-muted">{item.desc}</p>
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </div>

            {/* perks */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#33D6E5]/5 rounded-2xl p-8 border-2 border-line-brand relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#33D6E5]/8 rounded-bl-full" />
                <div className="relative">
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                      <Sparkles className="w-6 h-6 text-brand" />
                      <h3 className="text-xl font-bold gradient-text">Here&rsquo;s the deal</h3>
                    </div>
                    <div className="tw-card px-4 py-2 rounded-full">
                      <span className="text-xs font-bold text-brand">No hidden fees, ever</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {perks.map((perk, i) => (
                      <ScaleIn key={i} delay={0.4 + i * 0.08}>
                        <div className="flex items-start gap-3 group p-3 rounded-xl hover:bg-[#33D6E5]/8 transition-all">
                          <CheckCircle2 className="w-5 h-5 text-brand group-hover:scale-125 transition-transform flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-ink font-medium leading-relaxed">{perk}</span>
                        </div>
                      </ScaleIn>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="text-center mt-10 space-y-3">
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-[#33D6E5] fill-[#33D6E5]" />)}
              </div>
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink-strong">&ldquo;Best decision we made for our startup&rdquo;</span> — Sarah, Tech Founder
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-line">
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <div className="w-2 h-2 bg-[#33D6E5] rounded-full animate-pulse" />
                <span className="font-medium">More Opportunities To Be Explored</span>
              </div>
              <div className="text-sm text-ink-muted font-medium">💳 Secure checkout</div>
              <div className="text-sm text-ink-muted font-medium">⚡ Start in 2 hours</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
