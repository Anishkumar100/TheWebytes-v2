'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 flex items-center relative overflow-hidden bg-surface-base">
        <div className="absolute inset-0 space-grid opacity-40 pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#33D6E5]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4F7BB8]/8 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#33D6E5]/10 border border-line-brand mb-8 animate-bounce">
              <SearchX className="w-16 h-16 text-brand" />
            </div>
            <div className="text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none mb-8 gradient-text">404</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ink-strong">Page Not Found</h1>
            <p className="text-xl md:text-2xl text-ink-muted mb-12 leading-relaxed">
              Oops! The page you&rsquo;re looking for doesn&rsquo;t exist. It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="group gap-2 shine">
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Go Home
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => router.back()} className="group gap-2">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
            </div>
            <div className="mt-16 pt-8 border-t border-line">
              <p className="text-sm text-ink-muted mb-4">Here are some helpful links instead:</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                {[
                  { href: '/services', label: 'Services' },
                  { href: '/about',    label: 'About Us' },
                  { href: '/contact',  label: 'Contact'  },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-brand hover:underline font-medium">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
