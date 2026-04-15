import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check, Zap, Star, Rocket } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal, TiltCard, ScaleIn } from '@/components/animations';

export const metadata = { title: 'Pricing - TheWebytes', description: 'Transparent pricing for all our services.' };

const TIERS = [
  { name:'Starter', icon:Zap, price:'₹25,000', period:'one-time', description:'Perfect for small businesses and startups', popular:false, cta:'Get Started',
    features:['5 Page Website','Responsive Design','Basic SEO Setup','Contact Form','1 Month Support','Social Media Integration'],
    not:['Custom Features','E-commerce Integration','Advanced Analytics'] },
  { name:'Professional', icon:Star, price:'₹75,000', period:'one-time', description:'Ideal for growing businesses', popular:true, cta:'Get Started',
    features:['Up to 15 Pages','Custom Design','Advanced SEO','E-commerce Integration','3 Months Support','Analytics Dashboard','Payment Gateway Setup','CMS','Mobile App (Basic)'],
    not:[] },
  { name:'Enterprise', icon:Rocket, price:'Custom', period:'quote', description:'For large-scale projects', popular:false, cta:'Contact Sales',
    features:['Unlimited Pages','Premium Custom Design','Enterprise SEO','Advanced E-commerce','12 Months Support','Advanced Analytics','API Integrations','Custom Features','Mobile Apps (iOS & Android)','Dedicated Account Manager','Priority Support'],
    not:[] },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-surface-base min-h-screen">

        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-ink-strong">
                Simple, Transparent <span className="glow-text text-[#33D6E5]">Pricing</span>
              </h1>
              <p className="text-xl text-ink-muted">Choose the perfect plan. All plans include core features and dedicated support.</p>
            </div>
          </ScrollReveal>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {TIERS.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <TiltCard intensity={tier.popular ? 10 : 6}>
                    <div className={`tw-card p-8 relative h-full flex flex-col ${tier.popular ? 'border-2 border-[#33D6E5] shadow-lg shadow-[#33D6E5]/20 md:scale-105' : ''}`}>
                      {tier.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#33D6E5] to-[#4F7BB8] rounded-full text-white text-sm font-black shadow-lg shadow-[#33D6E5]/30">
                          Most Popular
                        </div>
                      )}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center mb-6 shadow-lg shadow-[#33D6E5]/20">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-2 text-ink-strong">{tier.name}</h3>
                      <p className="text-sm text-ink-muted mb-6">{tier.description}</p>
                      <div className="mb-6">
                        <span className="text-4xl font-heading font-bold glow-text text-[#33D6E5]">{tier.price}</span>
                        {tier.period !== 'quote' && <span className="text-ink-faint ml-2">/ {tier.period}</span>}
                      </div>
                      <Link href="/contact" className="block mb-8">
                        <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>{tier.cta}</Button>
                      </Link>
                      <div className="space-y-3 flex-1">
                        {tier.features.map((f, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-[#33D6E5] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-ink">{f}</span>
                          </div>
                        ))}
                        {tier.not.map((f, idx) => (
                          <div key={idx} className="flex items-start space-x-3 opacity-40">
                            <Check className="w-5 h-5 text-ink-faint flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-ink-faint line-through">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4">
          <ScrollReveal delay={0.4}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-8 text-center text-ink-strong">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q:'Can I upgrade my plan later?', a:"Yes, you can upgrade at any time. We'll adjust pricing based on your current usage." },
                  { q:'What payment methods do you accept?', a:'All major credit/debit cards, UPI, net banking, and bank transfers.' },
                  { q:'Do you offer refunds?', a:"Yes — 30-day money-back guarantee if you're not satisfied." },
                  { q:'Is there a setup fee?', a:'No hidden fees whatsoever. The price you see is what you pay.' },
                ].map((faq, i) => (
                  <ScaleIn key={i} delay={0.5 + i * 0.1}>
                    <div className="tw-card p-6 hover:border-[#33D6E5]/40 transition-all">
                      <h3 className="font-heading font-semibold mb-2 text-ink-strong">{faq.q}</h3>
                      <p className="text-sm text-ink-muted">{faq.a}</p>
                    </div>
                  </ScaleIn>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
