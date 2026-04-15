'use client';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ExternalLink, Filter } from 'lucide-react';
import { ScrollReveal, TiltCard, ScaleIn } from '@/components/animations';
import Link from 'next/link';
import Image from 'next/image';

const PROJECTS = [
  { id:1, title:'E-commerce Platform',         category:'ecommerce', description:'Complete online store with payment integration and inventory management', img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=340&fit=crop', tags:['Next.js','Stripe','PostgreSQL'], link:'#' },
  { id:2, title:'SaaS Analytics Dashboard',    category:'web',       description:'Business intelligence dashboard with real-time data reporting', img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop', tags:['React','Chart.js','Node.js'], link:'#' },
  { id:3, title:'Mobile Banking App',          category:'mobile',    description:'Secure mobile banking application with biometric authentication', img:'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=340&fit=crop', tags:['React Native','Firebase'], link:'#' },
  { id:4, title:'Healthcare Portal',           category:'web',       description:'Patient management system with appointment scheduling and teleconsult', img:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=340&fit=crop', tags:['Next.js','MongoDB','AWS'], link:'#' },
  { id:5, title:'Restaurant & Ordering Site',  category:'wordpress', description:'Beautiful restaurant website with online ordering and table booking', img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=340&fit=crop', tags:['WordPress','WooCommerce'], link:'#' },
  { id:6, title:'Fitness Tracking App',        category:'mobile',    description:'Workout tracking and personalised nutrition planning mobile app', img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=340&fit=crop', tags:['Flutter','Firebase'], link:'#' },
  { id:7, title:'Real Estate Platform',        category:'web',       description:'Property listing, virtual tours and management platform', img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=340&fit=crop', tags:['Next.js','Prisma','PostgreSQL'], link:'#' },
  { id:8, title:'Learning Management System', category:'web',       description:'Online education platform with video courses and assessments', img:'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=340&fit=crop', tags:['React','Node.js','MongoDB'], link:'#' },
];

const CATEGORIES = [
  { id:'all',       label:'All Projects' },
  { id:'web',       label:'Web Development' },
  { id:'mobile',    label:'Mobile Apps' },
  { id:'ecommerce', label:'E-commerce' },
  { id:'wordpress', label:'WordPress' },
];

export default function PortfolioPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-surface-base min-h-screen">
        {/* hero band */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#1C1825] to-transparent pointer-events-none" />

        <section className="container mx-auto px-4 mb-16">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-ink-strong">
                Our <span className="glow-text text-[#33D6E5]">Portfolio</span>
              </h1>
              <p className="text-xl text-ink-muted">Explore our latest projects and see how we've helped businesses achieve their digital goals.</p>
            </div>
          </ScrollReveal>
        </section>

        {/* filter */}
        <section className="container mx-auto px-4 mb-12">
          <ScaleIn delay={0.2}>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Filter className="w-5 h-5 text-[#33D6E5]" />
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setActive(cat.id)}
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm ${
                    active === cat.id
                      ? 'bg-gradient-to-r from-[#33D6E5] to-[#4F7BB8] text-white shadow-lg shadow-[#33D6E5]/30'
                      : 'tw-card hover:border-[#33D6E5]/40 text-ink hover:text-[#33D6E5]'
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </ScaleIn>
        </section>

        {/* grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <TiltCard className="h-full" intensity={8}>
                  <div className="tw-card tw-card-hover overflow-hidden h-full group">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={project.img} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold mb-3 text-ink-strong group-hover:text-[#33D6E5] transition-colors">{project.title}</h3>
                      <p className="text-ink-muted text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-[#33D6E5]/10 text-brand text-xs font-medium border border-[#33D6E5]/20">{tag}</span>
                        ))}
                      </div>
                      <Link href={project.link} className="inline-flex items-center text-sm font-medium text-brand hover:underline">
                        View Project <ExternalLink className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
