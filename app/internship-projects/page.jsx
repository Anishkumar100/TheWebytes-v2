'use client';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { GraduationCap, FileText, Code, Check, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ScrollReveal, TiltCard, ScaleIn } from '@/components/animations';

const PROJECT_TYPES = [
  { icon: GraduationCap, title: 'Final Year Projects',    description: 'Complete final year project development with full documentation',
    features: ['Full Source Code','Complete Documentation','PPT Presentation','Project Report','Implementation Guide'], price: '₹8,000 – ₹25,000', color: 'from-[#33D6E5] to-[#1D9FB4]' },
  { icon: Code,          title: 'Mini Projects',          description: 'Semester mini projects for all engineering branches',
    features: ['Working Code','Basic Documentation','Presentation Slides','Demo Video','Setup Instructions'],          price: '₹3,000 – ₹10,000', color: 'from-[#4F7BB8] to-[#33D6E5]' },
  { icon: FileText,      title: 'Internship Assignments',  description: 'Complete internship project assignments on time',
    features: ['Custom Development','Assignment Report','Code Documentation','Certificate Support'],                   price: '₹5,000 – ₹15,000', color: 'from-[#1D9FB4] to-[#4F7BB8]' },
];

const DOMAINS = ['Web Development','Mobile App Development','Machine Learning','Data Science','Artificial Intelligence','IoT Projects','Blockchain','Cloud Computing','Cyber Security','E-commerce'];

export default function InternshipProjectsPage() {
  const [formData, setFormData] = useState({ name:'', email:'', phone:'', college:'', projectType:'', domain:'', deadline:'', description:'' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name:'', email:'', phone:'', college:'', projectType:'', domain:'', deadline:'', description:'' });
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
              <ScaleIn delay={0.1}>
                <div className="inline-flex items-center space-x-2 bg-[#33D6E5]/10 border border-[#33D6E5]/25 px-4 py-2 rounded-full mb-6">
                  <GraduationCap className="w-5 h-5 text-[#33D6E5]" />
                  <span className="text-sm font-medium text-[#33D6E5]">For Students</span>
                </div>
              </ScaleIn>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-ink-strong">
                Student <span className="gradient-text">Project Services</span>
              </h1>
              <p className="text-xl text-ink-muted leading-relaxed">
                We help students complete their academic projects with full source code, documentation, and presentation materials.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Notice ── */}
        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal delay={0.2}>
            <div className="max-w-3xl mx-auto tw-card p-8 border-l-4 border-amber-400 dark:border-amber-500">
              <h2 className="text-xl font-heading font-bold mb-3 text-ink-strong flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                Important Information
              </h2>
              <p className="text-ink leading-relaxed">
                We <strong className="text-ink-strong">DO NOT provide internships</strong>. We are a service that helps students by developing their academic projects — providing complete source code, documentation, and presentation materials. This is a <strong className="text-ink-strong">paid service</strong> for project completion assistance.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Offerings ── */}
        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-4 text-ink-strong">What We <span className="gradient-text">Offer</span></h2>
              <p className="text-ink-muted">Choose the service that fits your academic needs</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PROJECT_TYPES.map((type, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <TiltCard intensity={10}>
                  <div className="tw-card tw-card-hover p-8 h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-6 shadow-lg shadow-[#33D6E5]/15`}>
                      <type.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold mb-3 text-ink-strong">{type.title}</h3>
                    <p className="text-ink-muted mb-6 text-sm leading-relaxed">{type.description}</p>
                    <div className="space-y-3 mb-6">
                      {type.features.map((f, j) => (
                        <div key={j} className="flex items-center space-x-2 text-sm">
                          <Check className="w-4 h-4 text-[#33D6E5] flex-shrink-0" />
                          <span className="text-ink">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-line">
                      <span className="text-lg font-semibold text-brand">{type.price}</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Domains ── */}
        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal delay={0.3}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-4 text-ink-strong">Available <span className="gradient-text">Domains</span></h2>
              <p className="text-ink-muted">We cover a wide range of technologies and domains</p>
            </div>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {DOMAINS.map((domain, i) => (
              <ScaleIn key={i} delay={0.4 + i * 0.05}>
                <div className="tw-card tw-card-hover px-6 py-3 rounded-full text-sm text-ink font-medium hover:text-brand transition-colors cursor-default">
                  {domain}
                </div>
              </ScaleIn>
            ))}
          </div>
        </section>

        {/* ── Form ── */}
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal delay={0.5}>
              <div className="tw-card p-8 shadow-brand-lg">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-heading font-bold mb-4 text-ink-strong">
                    Request Your <span className="gradient-text">Project</span>
                  </h2>
                  <p className="text-ink-muted">We'll get back to you with a quote within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="tw-input" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="tw-input" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="tw-input" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">College / University *</label>
                      <input type="text" name="college" value={formData.college} onChange={handleChange} required className="tw-input" placeholder="Your institution" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Project Type *</label>
                      <select name="projectType" value={formData.projectType} onChange={handleChange} required className="tw-input">
                        <option value="">Select project type</option>
                        <option value="final-year">Final Year Project</option>
                        <option value="mini-project">Mini Project</option>
                        <option value="internship">Internship Assignment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink-strong">Domain *</label>
                      <select name="domain" value={formData.domain} onChange={handleChange} required className="tw-input">
                        <option value="">Select domain</option>
                        {DOMAINS.map((d, i) => <option key={i} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink-strong">Deadline *</label>
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required className="tw-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink-strong">Project Description *</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} className="tw-input resize-none" placeholder="Describe your project requirements in detail…" />
                  </div>

                  <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full group">
                    {status === 'sending' ? 'Submitting…' : 'Submit Request'}
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {status === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-[#33D6E5]/10 border border-line-brand rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-brand flex-shrink-0" />
                      <p className="text-ink-strong font-medium">Request submitted! We'll contact you within 24 hours.</p>
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
