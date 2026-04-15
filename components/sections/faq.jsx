'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ScrollReveal } from '@/components/animations';
import Link from 'next/link';

const faqs = [
  { question: 'What services does TheWebytes offer?',          answer: 'We offer comprehensive digital solutions including Web Development, E-commerce, WordPress, UI/UX Design, Mobile Apps, Digital Marketing, Custom Software, Server Management, Deployment, and Web Hosting.' },
  { question: 'How long does a typical project take?',         answer: 'A simple website takes 2-3 weeks; complex web applications take 2-3 months. We provide detailed timelines during initial consultation.' },
  { question: 'Do you provide ongoing support after launch?',  answer: 'Yes! 24/7 support including server management, bug fixes, updates, and maintenance plus team training.' },
  { question: 'Can you help with student projects?',           answer: 'Absolutely! Final year projects, mini projects, and internship assignments with complete documentation, source code, and PPT presentations.' },
  { question: 'What is your pricing model?',                   answer: 'Flexible pricing from ₹15,000. Custom solutions quoted based on requirements with transparent pricing and no hidden costs.' },
  { question: 'Do you work with startups and enterprises?',    answer: 'Yes — from startups needing MVP development to enterprises requiring complex digital transformations. Our solutions scale with your business.' },
  { question: 'What technologies do you use?',                 answer: 'React, Next.js, Node.js, Python, Flutter, React Native, WordPress, Shopify, AWS, and more — best tech stack chosen for each project.' },
  { question: 'How do you ensure quality?',                    answer: 'Code reviews, automated testing, performance optimization, and security audits. Every project undergoes multiple testing phases before delivery.' },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal delay={index * 0.06}>
      <motion.div initial={false} className="tw-card tw-card-hover overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full p-6 text-left flex items-start justify-between gap-4 group"
          aria-expanded={open}
        >
          <h3 className="text-lg font-semibold text-ink-strong group-hover:text-brand transition-colors flex-1">
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-8 h-8 rounded-full btn-brand-gradient flex items-center justify-center shadow-brand-glow"
          >
            {open ? <Minus className="w-5 h-5 text-[#1C1825]" /> : <Plus className="w-5 h-5 text-[#1C1825]" />}
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0">
                <div className="border-t border-line pt-4">
                  <p className="text-ink-muted leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  );
}

export function FAQ() {
  return (
    <section className="py-20 relative overflow-hidden bg-surface-base">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-6"
            >
              <span className="text-brand font-semibold text-sm">FAQ</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-xl text-ink-muted max-w-2xl mx-auto">
              Everything you need to know about our services and process
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <div className="tw-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-ink-strong mb-4">Still have questions?</h3>
              <p className="text-ink-muted mb-6">Our team is here to help you find answers.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl btn-brand-gradient btn-brand-gradient-hover text-[#1C1825] font-bold hover:scale-105 transition-all shadow-brand-glow"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
