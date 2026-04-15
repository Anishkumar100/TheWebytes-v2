'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SERVICES, NAVIGATION, COMPANY_INFO } from '@/lib/constants';

export function Footer() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thanks for subscribing!');
    setEmail('');
    setTimeout(() => setStatus(''), 3000);
  };
  const year = new Date().getFullYear();

  const colVar = {
    hidden: { opacity: 0, y: 24 },
    show:   (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <footer className="relative bg-surface-alt border-t border-line overflow-hidden">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#33D6E5]/50 to-transparent" />

      {/* Grid backdrop */}
      <div className="absolute inset-0 space-grid opacity-30 pointer-events-none" />

      {/* Ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#33D6E5]/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F7BB8]/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* ── BRAND ── */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={colVar}
            className="space-y-6"
          >
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/noBg-logo-3.png"
                alt="TheWebytes Logo"
                width={200}
                height={60}
                className="object-contain w-auto h-12 sm:h-14 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm text-ink-muted leading-relaxed">
              {COMPANY_INFO.tagline}. We transform ideas into powerful digital experiences.
            </p>
            <div className="space-y-3">
              <Link
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center space-x-3 text-sm text-ink-muted hover:text-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#33D6E5]/10 border border-line-brand flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Mail className="w-4 h-4 text-brand" />
                </div>
                <span>{COMPANY_INFO.email}</span>
              </Link>
              <Link
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center space-x-3 text-sm text-ink-muted hover:text-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#33D6E5]/10 border border-line-brand flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Phone className="w-4 h-4 text-brand" />
                </div>
                <span>{COMPANY_INFO.phone}</span>
              </Link>
              <div className="flex items-center space-x-3 text-sm text-ink-muted">
                <div className="w-8 h-8 rounded-lg bg-[#33D6E5]/10 border border-line-brand flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand" />
                </div>
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </motion.div>

          {/* ── SERVICES ── */}
          <motion.div custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} variants={colVar}>
            <h3 className="text-lg font-heading font-semibold mb-6 text-ink-strong relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-[#33D6E5] to-[#4F7BB8] rounded-full" />
            </h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map(s => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-brand transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── PAGES ── */}
          <motion.div custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} variants={colVar}>
            <h3 className="text-lg font-heading font-semibold mb-6 text-ink-strong relative inline-block">
              Pages
              <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-[#33D6E5] to-[#4F7BB8] rounded-full" />
            </h3>
            <ul className="space-y-3">
              {NAVIGATION.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-brand transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── NEWSLETTER ── */}
          <motion.div custom={3} initial="hidden" whileInView="show" viewport={{ once: true }} variants={colVar}>
            <h3 className="text-lg font-heading font-semibold mb-6 text-ink-strong relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 h-0.5 w-8 bg-gradient-to-r from-[#33D6E5] to-[#4F7BB8] rounded-full" />
            </h3>
            <p className="text-sm text-ink-muted mb-4">Subscribe for updates and insights from TheWebytes.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="tw-input"
              />
              <Button type="submit" className="w-full group shine">
                <span className="relative z-10">Subscribe</span>
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
              {status && <p className="text-xs text-brand animate-fade-in">{status}</p>}
            </form>
            <div className="flex items-center space-x-3 mt-6">
              {[
                { icon: Twitter,   href: COMPANY_INFO.social.twitter,   label: 'Twitter' },
                { icon: Linkedin,  href: COMPANY_INFO.social.linkedin,  label: 'LinkedIn' },
                { icon: Github,    href: COMPANY_INFO.social.github,    label: 'GitHub' },
                { icon: Instagram, href: COMPANY_INFO.social.instagram, label: 'Instagram' },
              ].map(({ icon: Icon, href, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-10 h-10 rounded-lg bg-surface-sunken border border-line flex items-center justify-center text-ink-soft hover:bg-[#33D6E5]/10 hover:text-brand hover:border-line-brand transition-all duration-300 group overflow-hidden"
                    aria-label={label}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-[#33D6E5]/0 to-[#4F7BB8]/0 group-hover:from-[#33D6E5]/15 group-hover:to-[#4F7BB8]/15 transition-all duration-500" />
                    <Icon className="w-4 h-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── CTA BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative tw-card p-6 md:p-8 mb-8 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/5 via-[#4F7BB8]/5 to-[#1D9FB4]/5" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#33D6E5]/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-ink-strong mb-1">Have a project in mind?</h4>
              <p className="text-sm text-ink-muted">Let&rsquo;s build something extraordinary together.</p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="group/btn shine whitespace-nowrap">
                <span className="relative z-10">Start a Project</span>
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative z-10" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-8 border-t border-line">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-ink-faint">© {year} {COMPANY_INFO.name}. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm text-ink-faint hover:text-brand transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-ink-faint hover:text-brand transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
