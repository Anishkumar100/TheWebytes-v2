'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  Mail, Phone, Send, MessageCircle, Clock, CheckCircle2, Sparkles,
  Globe, Zap, Shield, ChevronDown, ArrowUpRight, MapPin,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '@/lib/constants';
import { ScrollReveal } from '@/components/animations';

const COUNTRY_CODES = [
  { code: '+1',   country: 'US/CA',      flag: '🇺🇸' }, { code: '+91',  country: 'India',      flag: '🇮🇳' },
  { code: '+44',  country: 'UK',         flag: '🇬🇧' }, { code: '+61',  country: 'Australia',  flag: '🇦🇺' },
  { code: '+971', country: 'UAE',        flag: '🇦🇪' }, { code: '+65',  country: 'Singapore',  flag: '🇸🇬' },
  { code: '+49',  country: 'Germany',    flag: '🇩🇪' }, { code: '+33',  country: 'France',     flag: '🇫🇷' },
  { code: '+81',  country: 'Japan',      flag: '🇯🇵' }, { code: '+86',  country: 'China',      flag: '🇨🇳' },
  { code: '+55',  country: 'Brazil',     flag: '🇧🇷' }, { code: '+27',  country: 'S.Africa',   flag: '🇿🇦' },
  { code: '+52',  country: 'Mexico',     flag: '🇲🇽' }, { code: '+34',  country: 'Spain',      flag: '🇪🇸' },
  { code: '+39',  country: 'Italy',      flag: '🇮🇹' }, { code: '+31',  country: 'Netherlands',flag: '🇳🇱' },
  { code: '+46',  country: 'Sweden',     flag: '🇸🇪' }, { code: '+82',  country: 'S.Korea',    flag: '🇰🇷' },
  { code: '+60',  country: 'Malaysia',   flag: '🇲🇾' }, { code: '+7',   country: 'Russia',     flag: '🇷🇺' },
];

// Premium floating-label input
function FloatingInput({ label, type = 'text', name, value, onChange, required, rows }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  const isTextarea = !!rows;
  const El = isTextarea ? 'textarea' : 'input';
  return (
    <div className="relative">
      <El
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className={`peer tw-input ${isTextarea ? 'min-h-[130px] resize-none pt-6' : 'h-14 pt-5'} text-base text-ink-strong`}
      />
      <label
        className={`absolute left-4 pointer-events-none font-medium transition-all duration-200 ease-out
          ${active
            ? 'top-2 text-[10px] uppercase tracking-wider text-brand'
            : 'top-1/2 -translate-y-1/2 text-sm text-ink-faint'}
          ${isTextarea && active ? 'top-3 -translate-y-0' : ''}
          ${isTextarea && !active ? 'top-4 -translate-y-0' : ''}`}
      >
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </label>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+91', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('');
  const [showCC, setShowCC] = useState(false);
  const [searchCC, setSearchCC] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const fullPhone = formData.phone ? `${formData.countryCode} ${formData.phone}` : '';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...formData, phone: fullPhone,
          from_name: 'TheWebytes Contact Form',
          subject: `New Contact – ${formData.service}`,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', countryCode: '+91', phone: '', service: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const filteredCC = COUNTRY_CODES.filter(
    (c) => c.code.includes(searchCC) || c.country.toLowerCase().includes(searchCC.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 bg-surface-base min-h-screen relative overflow-hidden">
        {/* Ambient */}
        <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="fixed top-20 left-10 w-72 md:w-96 h-72 md:h-96 bg-[#33D6E5]/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="fixed bottom-20 right-10 w-80 md:w-[30rem] h-80 md:h-[30rem] bg-[#4F7BB8]/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* ═══════════ HERO ═══════════ */}
        <section className="container mx-auto px-4 pt-8 md:pt-16 pb-12 md:pb-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong mb-8"
            >
              <MessageCircle className="w-4 h-4 text-brand" />
              <span className="text-sm font-semibold text-brand tracking-wide uppercase">
                Let&rsquo;s Connect
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-ink-strong leading-[1.02] tracking-tight"
            >
              Get In{' '}
              <span className="gradient-text">Touch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-ink-muted leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              Have a project in mind? Let&rsquo;s discuss how we can help bring your vision to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
            >
              {[
                { icon: Zap,    text: '24-hour response' },
                { icon: Shield, text: 'Free consultation' },
                { icon: Globe,  text: 'Remote collaboration' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 text-ink-muted px-4 py-2 rounded-full glass border border-line-brand"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#33D6E5]/15 flex items-center justify-center">
                    <b.icon className="w-3.5 h-3.5 text-brand" />
                  </div>
                  <span className="text-sm font-medium">{b.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════ MAIN GRID ═══════════ */}
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* LEFT — contact cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-5"
            >
              {[
                { icon: Mail,  title: 'Email Us',  content: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}`, desc: 'Send us an email anytime' },
                { icon: Phone, title: 'Call Us',   content: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}`,    desc: 'Mon–Fri, 8am to 6pm IST'  },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className="tw-card tw-card-hover p-6 md:p-7 group relative overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#33D6E5]/0 group-hover:bg-[#33D6E5]/15 blur-3xl rounded-full transition-all duration-700" />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                      className="w-14 h-14 rounded-2xl btn-brand-gradient flex items-center justify-center mb-4 shadow-brand-glow"
                    >
                      <item.icon className="w-7 h-7 text-[#0B0F18]" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-ink-strong">{item.title}</h3>
                    <p className="text-sm text-ink-faint mb-3">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-brand hover:gap-2 font-semibold transition-all"
                    >
                      {item.content}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}

              {/* Office hours + address */}
              <motion.div
                whileHover={{ y: -4 }}
                className="tw-card tw-card-hover p-6 md:p-7 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F7BB8] to-[#1D9FB4] flex items-center justify-center shadow-brand-md flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-ink-strong mb-1">Office Hours</h3>
                    <div className="space-y-1 text-sm text-ink-muted">
                      <p>Mon – Fri: 9:00 AM – 7:00 PM IST</p>
                      <p>Sat: 10:00 AM – 4:00 PM IST</p>
                      <p>Sun: Emergency support only</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-line flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-ink-muted">{COMPANY_INFO.address}</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative tw-card border-2 border-line-brand p-6 md:p-7 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#33D6E5]/8 via-transparent to-[#4F7BB8]/8 pointer-events-none" />
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#33D6E5]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <Sparkles className="w-8 h-8 text-brand mx-auto mb-3" />
                  <p className="text-sm text-ink-strong font-bold mb-1">Prefer a quick chat?</p>
                  <p className="text-xs text-ink-muted mb-4">Book a 30-min consultation — no pitch decks, just strategy.</p>
                  <Link href={`mailto:${COMPANY_INFO.email}`}>
                    <button className="w-full h-11 px-5 rounded-xl bg-surface border border-line-brand text-brand font-bold hover:bg-[#33D6E5]/10 transition-all group">
                      <span className="inline-flex items-center gap-2">
                        Email us
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <div className="relative tw-card p-6 sm:p-8 md:p-10 lg:p-12 shadow-brand-lg overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#33D6E5]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start sm:items-center gap-4 mb-8 flex-col sm:flex-row">
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      className="w-14 h-14 rounded-2xl btn-brand-gradient flex items-center justify-center shadow-brand-glow flex-shrink-0"
                    >
                      <Send className="w-7 h-7 text-[#0B0F18]" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-ink-strong tracking-tight">
                        Send us a message
                      </h2>
                      <p className="text-sm md:text-base text-ink-muted">
                        We&rsquo;ll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingInput label="Full Name"     type="text"  name="name"  value={formData.name}  onChange={handleChange} required />
                      <FloatingInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* phone with country code */}
                      <div>
                        <label className="block text-[10px] font-bold mb-2 text-ink-faint uppercase tracking-wider">
                          Phone Number
                        </label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCC(!showCC)}
                              className="h-14 px-3 rounded-xl bg-surface-sunken border-2 border-line hover:border-line-brand focus:border-[#33D6E5] transition-all flex items-center gap-1.5 min-w-[95px] cursor-pointer"
                            >
                              <span className="text-lg">{COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag}</span>
                              <span className="text-sm font-semibold text-ink-strong">{formData.countryCode}</span>
                              <ChevronDown className={`w-4 h-4 text-ink-faint transition-transform ${showCC ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {showCC && (
                                <motion.div
                                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full left-0 mt-2 w-72 max-h-80 bg-surface-elevated border border-line-strong rounded-xl shadow-brand-lg overflow-hidden z-50"
                                >
                                  <div className="p-3 border-b border-line">
                                    <input
                                      type="text"
                                      placeholder="Search country..."
                                      value={searchCC}
                                      onChange={(e) => setSearchCC(e.target.value)}
                                      className="w-full px-3 py-2 rounded-lg bg-surface-sunken border border-line focus:border-[#33D6E5] focus:outline-none text-sm text-ink-strong"
                                    />
                                  </div>
                                  <div className="overflow-y-auto max-h-64">
                                    {filteredCC.map((c) => (
                                      <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => { setFormData({ ...formData, countryCode: c.code }); setShowCC(false); setSearchCC(''); }}
                                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#33D6E5]/10 transition-colors text-left"
                                      >
                                        <span className="text-xl">{c.flag}</span>
                                        <span className="text-sm font-medium text-ink-strong flex-1">{c.country}</span>
                                        <span className="text-sm text-ink-faint">{c.code}</span>
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="tw-input flex-1 h-14 text-base"
                            placeholder="123 456 7890"
                          />
                        </div>
                      </div>
                      {/* service select */}
                      <div>
                        <label className="block text-[10px] font-bold mb-2 text-ink-faint uppercase tracking-wider">
                          Service Interested In <span className="text-brand">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="tw-input h-14 text-base appearance-none pr-10"
                          >
                            <option value="">Select a service</option>
                            {SERVICES.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <FloatingInput
                      label="Your Message" type="text" name="message"
                      value={formData.message} onChange={handleChange} required rows={6}
                    />

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      className="group relative w-full h-14 rounded-xl btn-brand-gradient btn-brand-gradient-hover text-[#0B0F18] font-bold text-base overflow-hidden shadow-[0_18px_50px_-10px_rgba(51,214,229,0.55)] hover:shadow-[0_24px_60px_-10px_rgba(51,214,229,0.75)] transition-shadow duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative z-10 inline-flex items-center gap-2">
                        {status === 'sending' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-[#0B0F18] border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {status === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="flex items-center gap-3 p-4 bg-[#33D6E5]/10 border border-line-brand rounded-xl"
                        >
                          <CheckCircle2 className="w-6 h-6 text-brand flex-shrink-0" />
                          <p className="text-ink-strong font-medium">
                            Message sent! We&rsquo;ll get back to you within 24 hours.
                          </p>
                        </motion.div>
                      )}
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl"
                        >
                          <p className="text-destructive font-medium">
                            Something went wrong. Please try again or email us directly.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════ TRUST BANNER ═══════════ */}
        <section className="container mx-auto px-4 mt-20 md:mt-28 relative">
          <ScrollReveal>
            <div className="relative max-w-5xl mx-auto tw-card border-2 border-line-brand p-8 md:p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#33D6E5]/8 via-transparent to-[#4F7BB8]/8 pointer-events-none" />
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-64 h-64 bg-[#33D6E5]/15 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-0 right-0 w-96 h-96 bg-[#4F7BB8]/15 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"
              />
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(51,214,229,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,214,229,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full btn-brand-gradient shadow-brand-glow mb-6 relative"
                >
                  <span className="absolute inset-0 rounded-full btn-brand-gradient blur-xl opacity-60 scale-125 animate-pulse" />
                  <Sparkles className="w-8 h-8 text-[#0B0F18] relative z-10" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-ink-strong tracking-tight">
                  Ready to start your <span className="gradient-text">project?</span>
                </h3>
                <p className="text-lg md:text-xl text-ink-muted mb-6 max-w-2xl mx-auto">
                  Join 270+ satisfied clients who trust us with their digital presence
                </p>
                <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8 text-sm text-ink-muted">
                  {['Free Consultation', 'No Obligation Quote', 'Quick Response'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-brand" />
                      <span className="font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
