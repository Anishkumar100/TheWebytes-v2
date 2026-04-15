'use client';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Target, Eye, Heart, Users, Award, Zap, Rocket, Shield, Clock, Star,
  Sparkles, CheckCircle2, Trophy, TrendingUp, Code2, Smartphone,
  Database, Cloud, Lock, HeartHandshake, BarChart3, ArrowRight, Layers
} from 'lucide-react';
import { ScrollReveal, TiltCard } from '@/components/animations';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MILESTONES = [
  { year: '2024', title: 'Founded', description: '3 developers, 1 shared desk, unlimited ambition', icon: Rocket },
  { year: '2024', title: 'First Clients', description: 'Onboarded first 10 clients, delivered 30+ projects', icon: TrendingUp },
  { year: '2024', title: 'Team Growth', description: 'Expanded to a 10-person team, hit 100+ projects', icon: Users },
  { year: '2024', title: 'Recognition', description: 'Earned top client ratings and referrals across sectors', icon: Trophy },
  { year: '2025', title: 'Scale Up', description: '200+ projects delivered, growing client base globally', icon: Award },
  { year: '2026', title: 'Present Day', description: '270+ completed projects, trusted by clients worldwide', icon: Star },
];

const VALUES = [
  { icon: Target, title: 'Quality First', description: 'We prioritize sustainable, maintainable solutions over quick fixes.', gradient: 'from-[#33D6E5] to-[#4F7BB8]' },
  { icon: Users, title: 'Client Partnership', description: 'Your goals become our goals. We succeed when you succeed.', gradient: 'from-[#4F7BB8] to-[#1D9FB4]' },
  { icon: Zap, title: 'Technical Excellence', description: 'Staying current with technology while applying proven best practices.', gradient: 'from-[#1D9FB4] to-[#33D6E5]' },
  { icon: Heart, title: 'Honest Communication', description: 'Clear timelines, transparent pricing, no hidden surprises.', gradient: 'from-[#33D6E5] to-[#1D9FB4]' },
];

const WHY_US = [
  { icon: Shield, title: 'Proven Track Record', description: 'Consistent project delivery across diverse industries since day one.' },
  { icon: HeartHandshake, title: 'Dedicated Support', description: 'Direct access to senior developers throughout the entire lifecycle.' },
  { icon: BarChart3, title: 'Measurable Results', description: 'We focus on metrics that matter — engagement, conversion, growth.' },
  { icon: Lock, title: 'Security First', description: 'Built-in security best practices and compliance from day one.' },
];

const PROCESS_STEPS = [
  { number: '01', title: 'Discovery', description: 'Understanding your business goals, user needs, and technical requirements.', duration: '2-4 days' },
  { number: '02', title: 'Planning', description: 'Detailed project roadmap, architecture design, and resource allocation.', duration: '2-3 days' },
  { number: '03', title: 'Development', description: 'Agile development with regular updates, demos, and feedback cycles.', duration: 'Variable' },
  { number: '04', title: 'Quality Assurance', description: 'Comprehensive testing across devices, browsers, and use cases.', duration: '3-5 days' },
  { number: '05', title: 'Deployment', description: 'Smooth launch with monitoring, optimization, and performance tuning.', duration: '1-2 days' },
  { number: '06', title: 'Support', description: 'Ongoing maintenance, updates, and technical support as needed.', duration: 'Ongoing' },
];

const TECH_STACK = [
  { category: 'Frontend', tools: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'], icon: Code2 },
  { category: 'Backend', tools: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'], icon: Database },
  { category: 'Mobile', tools: ['React Native', 'Flutter', 'iOS', 'Android'], icon: Smartphone },
  { category: 'Cloud', tools: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Docker', 'cPanel', 'VPS'], icon: Cloud },
];

// Industries now with Unsplash photos
const INDUSTRIES = [
  { name: 'E-commerce', projects: '70+', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop' },
  { name: 'Healthcare', projects: '40+', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop' },
  { name: 'Fintech', projects: '35+', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop' },
  { name: 'Education', projects: '50+', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200&h=200&fit=crop' },
  { name: 'SaaS', projects: '45+', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop' },
  { name: 'Real Estate', projects: '30+', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop' },
];

const TESTIMONIALS = [
  { quote: "Working with TheWebytes has been a game-changer. Their technical expertise and clear communication made a complex project feel manageable.", author: "Sarah Chen", role: "CEO, TechFlow Solutions", img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { quote: "What impressed me most was their ability to understand our business needs and translate them into technical solutions.", author: "Michael Rodriguez", role: "CTO, DataVerse Inc", img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
  { quote: "The team delivered our mobile app ahead of schedule without compromising on quality. Exceptional post-launch support.", author: "Aisha Patel", role: "Founder, EduSpace", img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face' },
];

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const steps = 60, inc = target / steps, sd = 2000 / steps;
        let cur = 0;
        const t = setInterval(() => { cur += inc; if (cur >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(cur)); }, sd);
      }
    }, { threshold: .3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 overflow-hidden bg-surface-base">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-surface-base" />
        </div>

        {/* ── Hero ─────────────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#33D6E5]/10 border border-[#33D6E5]/25 text-sm font-medium text-[#33D6E5]">
                  <Sparkles className="w-4 h-4" /> About Us
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-ink-strong leading-tight">
                Building digital products{' '}
                <span className="gradient-text">since 2024</span>
              </h1>
              <div className="space-y-6">
                <p className="text-2xl text-ink-muted leading-relaxed">
                  TheWebytes is a software development agency based in Chennai, India. We specialize in web applications, mobile apps, and digital transformation for businesses worldwide.
                </p>
                <p className="text-lg text-ink-soft leading-relaxed">
                  What started as three developers working from a shared office has grown into a results-driven team serving clients across multiple sectors.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Metrics ─────────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <div className="hidden lg:block relative max-w-5xl mx-auto h-[500px]">
            <div className="flex items-center justify-center h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#33D6E5] via-[#4F7BB8] to-[#1D9FB4] shadow-2xl shadow-[#33D6E5]/30 flex items-center justify-center">
                  <div className="text-center text-white"><div className="text-3xl font-bold">2+</div><div className="text-sm">Years</div></div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-2 border-dashed border-[#33D6E5]/20" />
              {[
                { value: 270, label: 'Projects', icon: CheckCircle2, suffix: '+' },
                { value: 200, label: 'Clients', icon: Users, suffix: '+' },
                { value: 50, label: 'Team', icon: Award, suffix: '+' },
                { value: 98, label: 'Retention', icon: Star, suffix: '%' },
              ].map((stat, i) => {
                const angle = (i * 360) / 4;
                const r = 200;
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * r;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * r;
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="absolute top-1/2 left-1/2 z-10" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
                      <div className="tw-card tw-card-hover p-6 min-w-[160px] text-center">
                        <stat.icon className="w-10 h-10 text-[#33D6E5] mb-3 mx-auto" />
                        <div className="text-4xl font-bold gradient-text mb-1"><Counter target={stat.value} suffix={stat.suffix} /></div>
                        <div className="text-sm text-ink-muted">{stat.label}</div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
          {/* mobile */}
          <div className="lg:hidden grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { value: 270, label: 'Projects', icon: CheckCircle2, suffix: '+' },
              { value: 200, label: 'Clients', icon: Users, suffix: '+' },
              { value: 50, label: 'Team', icon: Award, suffix: '+' },
              { value: 98, label: 'Retention', icon: Star, suffix: '%' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="tw-card tw-card-hover p-6 text-center">
                  <stat.icon className="w-10 h-10 text-[#33D6E5] mb-3 mx-auto" />
                  <div className="text-4xl font-bold gradient-text mb-1"><Counter target={stat.value} suffix={stat.suffix} /></div>
                  <div className="text-sm text-ink-muted">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Why Work With Us ──────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">Why Work With Us</h2>
              <p className="text-xl text-ink-muted max-w-3xl mx-auto">We combine technical expertise with business understanding</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_US.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="tw-card tw-card-hover p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center mb-4 shadow-lg shadow-[#33D6E5]/20">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-ink-strong">{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Journey Timeline ──────────────────────── */}
        <section className="container mx-auto px-4 mb-40 bg-surface-alt rounded-3xl py-16">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">Our Journey</h2>
              <p className="text-xl text-ink-muted">Key milestones in our company's growth</p>
            </div>
          </ScrollReveal>
          {/* desktop circular */}
          <div className="hidden lg:block relative h-[900px] max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] shadow-2xl shadow-[#33D6E5]/30 flex items-center justify-center">
                  <div className="text-center"><Rocket className="w-12 h-12 text-white mx-auto mb-1" /><div className="text-xs text-white font-bold">Timeline</div></div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-2 border-dashed border-[#33D6E5]/18" />
              {MILESTONES.map((m, i) => {
                const angle = (i * 360 / MILESTONES.length) - 90;
                const r = 330;
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="absolute top-1/2 left-1/2 z-10" style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
                      <div className="tw-card tw-card-hover p-6 w-56">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center flex-shrink-0">
                            <m.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-lg font-bold text-[#33D6E5]">{m.year}</span>
                        </div>
                        <h3 className="text-base font-bold mb-2 text-ink-strong">{m.title}</h3>
                        <p className="text-xs text-ink-muted leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
          {/* mobile vertical */}
          <div className="lg:hidden space-y-8 max-w-2xl mx-auto">
            {MILESTONES.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center shadow-lg shadow-[#33D6E5]/20">
                    <m.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#33D6E5] mb-1">{m.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-ink-strong">{m.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Process ──────────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <ScrollReveal><div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">How We Work</h2>
            <p className="text-xl text-ink-muted">A structured, transparent approach</p>
          </div></ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="tw-card tw-card-hover p-6 relative">
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-lg bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#33D6E5]/20">{step.number}</div>
                  <h3 className="text-lg font-bold mb-2 text-ink-strong">{step.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-4">{step.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs text-brand font-semibold">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Industries ───────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <ScrollReveal><div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">Industries We Serve</h2>
            <p className="text-xl text-ink-muted">Experience across diverse sectors</p>
          </div></ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="tw-card tw-card-hover overflow-hidden text-center group aspect-square flex flex-col">
                  <div className="relative flex-1 overflow-hidden">
                    <Image src={ind.img} alt={ind.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-3 bg-surface">
                    <h3 className="text-xs font-bold text-ink-strong">{ind.name}</h3>
                    <p className="text-xs text-brand font-semibold">{ind.projects}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <ScrollReveal><div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">Technology Stack</h2>
            <p className="text-xl text-ink-muted">Modern tools we use to build scalable solutions</p>
          </div></ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {TECH_STACK.map((stack, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="tw-card tw-card-hover p-6 h-full">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center mb-4 shadow-lg shadow-[#33D6E5]/20">
                    <stack.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-strong mb-4">{stack.category}</h3>
                  <div className="space-y-2">
                    {stack.tools.map((tool, j) => (
                      <div key={j} className="flex items-center gap-2 group/tool">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#33D6E5]" />
                        <span className="text-sm text-ink-muted group-hover/tool:text-brand transition-colors">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Mission & Vision ─────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="tw-card p-10 relative overflow-hidden group bg-gradient-to-br from-[#33D6E5]/8 to-[#4F7BB8]/5 dark:from-[#33D6E5]/6 dark:to-[#4F7BB8]/4 border-[#33D6E5]/25">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#33D6E5]/8 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#33D6E5] to-[#4F7BB8] flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-ink-strong">Our Mission</h3>
                  <p className="text-lg text-ink leading-relaxed">To deliver high-quality software solutions that solve real business problems and provide measurable ROI through innovation, expertise, and dedication.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="tw-card p-10 relative overflow-hidden group bg-gradient-to-br from-[#4F7BB8]/8 to-[#1D9FB4]/5 dark:from-[#4F7BB8]/6 dark:to-[#1D9FB4]/4 border-[#4F7BB8]/25">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4F7BB8]/8 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4F7BB8] to-[#1D9FB4] flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-ink-strong">Our Vision</h3>
                  <p className="text-lg text-ink leading-relaxed">To be recognized globally as a trusted technology partner that consistently delivers excellence in software development and digital transformation.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Core Values ──────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <ScrollReveal><div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">Our Core Values</h2>
            <p className="text-xl text-ink-muted">Principles guiding every decision</p>
          </div></ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {VALUES.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="tw-card tw-card-hover p-8">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-ink-strong">{v.title}</h3>
                  <p className="text-ink-muted leading-relaxed">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────── */}
        <section className="container mx-auto px-4 mb-40">
          <ScrollReveal><div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink-strong">What Our Clients Say</h2>
            <p className="text-xl text-ink-muted">Real feedback from businesses we've helped</p>
          </div></ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="tw-card tw-card-hover p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                  </div>
                  <blockquote className="text-ink-muted mb-6 leading-relaxed text-sm">"{t.quote}"</blockquote>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#33D6E5]/40">
                      <Image src={t.img} alt={t.author} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <div className="font-bold text-ink-strong">{t.author}</div>
                      <div className="text-sm text-ink-faint">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="container mx-auto px-4">
          <ScrollReveal>
            <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-[#33D6E5] via-[#1D9FB4] to-[#4F7BB8] rounded-3xl p-16 text-center shadow-2xl shadow-[#33D6E5]/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-8">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-5xl font-bold mb-6 text-white">Let's Build Something Great</h2>
                <p className="text-2xl mb-10 text-white/80 max-w-2xl mx-auto">Schedule a free consultation to discuss your project</p>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-xl bg-[#1C1825] text-[#33D6E5] font-bold text-lg hover:shadow-2xl hover:scale-105 hover:bg-surface hover:text-[#1D9FB4] transition-all">
                  Start a Project <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
