import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import dynamic from 'next/dynamic';

const ServicesGrid    = dynamic(() => import('@/components/sections/services-grid').then(m => ({ default: m.ServicesGrid })));
const ServicesTree    = dynamic(() => import('@/components/sections/services-tree').then(m => ({ default: m.ServicesTree })));
const FlowFeatures    = dynamic(() => import('@/components/sections/flow-features').then(m => ({ default: m.FlowFeatures })));
const WhyChooseUs     = dynamic(() => import('@/components/sections/why-choose-us').then(m => ({ default: m.WhyChooseUs })));
const Process         = dynamic(() => import('@/components/sections/process').then(m => ({ default: m.Process })));
const TechStack       = dynamic(() => import('@/components/sections/tech-stack').then(m => ({ default: m.TechStack })));
const Testimonials    = dynamic(() => import('@/components/sections/testimonials').then(m => ({ default: m.Testimonials })));
const FAQ             = dynamic(() => import('@/components/sections/faq').then(m => ({ default: m.FAQ })));
const CTA             = dynamic(() => import('@/components/sections/cta').then(m => ({ default: m.CTA })));
const FloatingParticles = dynamic(() => import('@/components/ui/floating-particles').then(m => ({ default: m.FloatingParticles })));

export const metadata = {
  title: 'TheWebytes - Premium Software Development & Digital Agency',
  description: 'Transform your ideas into reality with cutting-edge web development, mobile apps, and digital solutions.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative">
        <div className="relative overflow-hidden">
          <FloatingParticles count={20} color="mixed" speed={0.4} size="small" />
          <Hero />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={12} color="cyan" speed={0.3} size="small" />
          <Stats />
        </div>
        <div className="lg:hidden relative overflow-hidden">
          <FloatingParticles count={10} color="blue" speed={0.3} size="small" />
          <ServicesGrid />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={6} color="cyan" speed={0.25} size="small" />
          <ServicesTree />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={10} color="mixed" speed={0.3} size="small" />
          <FlowFeatures />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={8} color="blue" speed={0.25} size="small" />
          <WhyChooseUs />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={10} color="cyan" speed={0.3} size="small" />
          <Process />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={12} color="mixed" speed={0.3} size="small" />
          <TechStack />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={8} color="purple" speed={0.25} size="small" />
          <Testimonials />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={6} color="blue" speed={0.2} size="small" />
          <FAQ />
        </div>
        <div className="relative overflow-hidden">
          <FloatingParticles count={15} color="mixed" speed={0.4} size="small" />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}
