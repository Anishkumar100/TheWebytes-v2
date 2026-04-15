'use client';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Headphones, MessageCircle, Mail, Clock, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ScrollReveal, TiltCard, ScaleIn } from '@/components/animations';

const SUPPORT_OPTIONS = [
  { icon: Headphones,     title: '24/7 Live Chat',  desc: 'Get instant help from our support team',    cta: 'Start Chat',    color: 'from-[#33D6E5] to-[#1D9FB4]' },
  { icon: Mail,           title: 'Email Support',   desc: 'Detailed response within 2–4 hours',        cta: 'Send Email',    color: 'from-[#4F7BB8] to-[#33D6E5]' },
  { icon: MessageCircle,  title: 'WhatsApp',        desc: 'Quick support via WhatsApp messenger',      cta: 'Message Us',    color: 'from-[#1D9FB4] to-[#4F7BB8]' },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({ name:'', email:'', subject:'', priority:'medium', message:'' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name:'', email:'', subject:'', priority:'medium', message:'' });
      setTimeout(() => setStatus(''), 4000);
    }, 1000);
  };
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-surface-base min-h-screen">

        {/* ── Hero ── */}
        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-ink-strong">
                <span className="gradient-text">Support</span> Center
              </h1>
              <p className="text-xl text-ink-muted">
                We're here to help! Get in touch with our support team for any questions or issues.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Support channels ── */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUPPORT_OPTIONS.map((opt, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <TiltCard intensity={10}>
                  <div className="tw-card tw-card-hover p-8 text-center h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${opt.color} flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#33D6E5]/20`}>
                      <opt.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-3 text-ink-strong">{opt.title}</h3>
                    <p className="text-ink-muted text-sm mb-6">{opt.desc}</p>
                    <Button variant="outline" className="w-full">{opt.cta}</Button>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Hours ── */}
        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal delay={0.3}>
            <div className="max-w-2xl mx-auto tw-card p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center shadow-lg shadow-[#33D6E5]/20">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-ink-strong">Support Hours</h2>
              </div>
              <div className="space-y-3">
                <p className="text-ink font-semibold">24/7 Emergency Support for critical issues</p>
                <p className="text-ink-muted text-sm">General Support: Monday – Saturday, 9 AM – 8 PM IST</p>
                <p className="text-ink-muted text-sm">Average Response Time: Under 2 hours</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Ticket Form ── */}
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal delay={0.4}>
              <div className="tw-card p-8 shadow-brand-lg">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-heading font-bold mb-4 text-ink-strong">
                    Submit a <span className="gradient-text">Support Ticket</span>
                  </h2>
                  <p className="text-ink-muted">Fill out the form and our team will get back to you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="tw-input" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="tw-input" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink-strong">Subject *</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="tw-input" placeholder="Brief description of the issue" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink-strong">Priority *</label>
                    <select name="priority" value={formData.priority} onChange={handleChange} required className="tw-input">
                      <option value="low">Low — General inquiry</option>
                      <option value="medium">Medium — Need assistance</option>
                      <option value="high">High — Service issue</option>
                      <option value="urgent">Urgent — Critical issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink-strong">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="tw-input resize-none" placeholder="Please describe your issue in detail..." />
                  </div>

                  <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full group">
                    {status === 'sending' ? 'Submitting…' : 'Submit Ticket'}
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {status === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-[#33D6E5]/10 border border-line-brand rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-brand flex-shrink-0" />
                      <p className="text-ink-strong font-medium">Ticket submitted! We'll respond within 2–4 hours.</p>
                    </div>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
