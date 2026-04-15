'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SERVICES, NAVIGATION } from '@/lib/constants.js';

export function Navbar() {
  const [isOpen, setIsOpen]                     = useState(false);
  const [scrolled, setScrolled]                 = useState(false);
  const [hidden, setHidden]                     = useState(false);
  const [mounted, setMounted]                   = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // ✅ NEW
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => { setMounted(true); }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (latest > previous && latest > 200) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {mounted && (
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#33D6E5]/70 to-transparent transition-opacity duration-500',
              scrolled ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        <div className="w-full relative z-10">
          <div
            className={cn(
              'relative w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 transition-all duration-500 backdrop-blur-2xl',
              scrolled
                ? 'py-3 bg-surface/85 border-b border-line-strong shadow-brand-md'
                : 'py-5 bg-surface/55 border-b border-line shadow-brand-sm'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/[0.03] via-[#4F7BB8]/[0.03] to-[#1D9FB4]/[0.03] opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              {/* LOGO */}
              <Link href="/" className="flex items-center group relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/0 to-[#4F7BB8]/0 group-hover:from-[#33D6E5]/30 group-hover:to-[#4F7BB8]/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                  <Image
                    src="/noBg-logo-3.png"
                    alt="TheWebytes Logo"
                    width={200}
                    height={60}
                    className="object-contain w-auto h-10 sm:h-10 md:h-12 lg:h-14 group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </motion.div>
              </Link>

              {/* DESKTOP NAV */}
              <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                {NAVIGATION.map((item, idx) => {
                  if (item.name === 'Services') {
                    return (
                      <div key={item.href} className="relative group/services">
                        <Link
                          href={item.href}
                          className={cn(
                            'relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden',
                            pathname.startsWith('/services')
                              ? 'text-brand'
                              : 'text-ink-muted hover:text-brand'
                          )}
                        >
                          {pathname.startsWith('/services') && mounted && (
                            <motion.span
                              layoutId="navActive"
                              className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/15 via-[#4F7BB8]/15 to-[#33D6E5]/15 rounded-xl"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="absolute inset-0 bg-surface-sunken/80 rounded-xl opacity-0 group-hover/services:opacity-100 transition-all duration-300 scale-90 group-hover/services:scale-100" />
                          <span className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/12 via-[#4F7BB8]/12 to-[#33D6E5]/12 rounded-xl opacity-0 group-hover/services:opacity-100 transition-all duration-300" />
                          <span className="relative z-10 group-hover/services:translate-x-0.5 transition-transform duration-200">
                            {item.name}
                          </span>
                          <ChevronRight className="relative z-10 w-3.5 h-3.5 opacity-50 group-hover/services:opacity-100 group-hover/services:rotate-90 transition-all duration-300" />
                        </Link>

                        {/* MEGA MENU */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-300 pointer-events-none group-hover/services:pointer-events-auto group-hover/services:translate-y-0 translate-y-2">
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-[#33D6E5]/60 to-transparent scale-y-0 group-hover/services:scale-y-100 transition-transform duration-300" />
                          <div className="w-[760px] bg-surface-elevated backdrop-blur-2xl border border-line-strong rounded-3xl shadow-brand-lg overflow-hidden">
                            {/* Header */}
                            <div className="relative px-8 py-6 bg-gradient-to-br from-surface-alt via-surface to-surface-alt border-b border-line overflow-hidden">
                              {mounted && (
                                <div className="absolute inset-0 opacity-25">
                                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#33D6E508_1px,transparent_1px),linear-gradient(to_bottom,#33D6E508_1px,transparent_1px)] bg-[size:24px_24px]" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#33D6E5]/10 to-transparent -translate-x-full group-hover/services:translate-x-full transition-transform duration-1000" />
                              <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    className="w-10 h-10 rounded-xl btn-brand-gradient flex items-center justify-center shadow-brand-glow"
                                  >
                                    <Sparkles className="w-5 h-5 text-[#1C1825]" />
                                  </motion.div>
                                  <div>
                                    <h3 className="text-lg font-bold text-ink-strong">Premium Services</h3>
                                    <p className="text-xs text-ink-soft">Industry-leading digital solutions</p>
                                  </div>
                                </div>
                                <div className="px-3 py-1.5 rounded-full btn-brand-gradient text-[#1C1825] text-xs font-black shadow-brand-glow">
                                  {SERVICES.length} Services
                                </div>
                              </div>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-2 gap-2 p-4 max-h-[480px] overflow-y-auto">
                              {SERVICES.map((service, index) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="group/item relative flex items-start gap-3 p-3 rounded-2xl hover:bg-surface-sunken transition-all duration-300 overflow-hidden"
                                >
                                  <span className="absolute inset-0 bg-gradient-to-br from-[#33D6E5]/10 via-transparent to-[#4F7BB8]/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#33D6E5] to-[#4F7BB8] scale-y-0 group-hover/item:scale-y-100 origin-top transition-transform duration-300 rounded-r" />
                                  <div className="relative z-10 w-10 h-10 rounded-xl btn-brand-gradient flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
                                    <service.icon className="w-5 h-5 text-[#1C1825]" />
                                  </div>
                                  <div className="relative z-10 flex-1 min-w-0">
                                    <p className="text-sm font-bold text-ink-strong group-hover/item:text-brand transition-colors truncate">
                                      {service.title}
                                    </p>
                                    <p className="text-xs text-ink-faint truncate">{service.shortDescription}</p>
                                  </div>
                                  <ArrowUpRight className="relative z-10 w-4 h-4 text-ink-faint group-hover/item:text-brand opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all duration-300 self-center flex-shrink-0" />
                                </Link>
                              ))}
                            </div>

                            {/* CTA */}
                            <div className="p-4 border-t border-line bg-surface-alt/60">
                              <Link
                                href="/services"
                                className="group/cta relative flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-brand-gradient btn-brand-gradient-hover text-[#1C1825] font-bold overflow-hidden shadow-brand-glow"
                              >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10">Explore All Services</span>
                                <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform relative z-10" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden group/nav',
                        pathname === item.href ? 'text-brand' : 'text-ink-muted hover:text-brand'
                      )}
                    >
                      {pathname === item.href && mounted && (
                        <motion.span
                          layoutId="navActive"
                          className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/15 via-[#4F7BB8]/15 to-[#33D6E5]/15 rounded-xl"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="absolute inset-0 bg-surface-sunken/80 rounded-xl opacity-0 group-hover/nav:opacity-100 transition-all duration-300 scale-90 group-hover/nav:scale-100" />
                      <span className="absolute inset-0 bg-gradient-to-r from-[#33D6E5]/10 via-[#4F7BB8]/10 to-[#33D6E5]/10 rounded-xl opacity-0 group-hover/nav:opacity-100 transition-all duration-300" />
                      <span className="relative z-10 inline-block group-hover/nav:translate-x-0.5 transition-transform duration-200">
                        {item.name}
                      </span>
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-px w-0 group-hover/nav:w-3/5 bg-gradient-to-r from-transparent via-[#33D6E5] to-transparent transition-all duration-500" />
                    </Link>
                  );
                })}
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <ThemeToggle />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="hidden md:block"
                >
                  <Link href="/contact">
                    <Button size="sm" className="gap-2 px-6 group shine">
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                    </Button>
                  </Link>
                </motion.div>

                {/* ✅ FIX 1: stopPropagation prevents backdrop from stealing the tap */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                  className="lg:hidden relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface-sunken hover:bg-[#33D6E5]/12 flex items-center justify-center transition-all duration-300 border border-line hover:border-line-brand hover:scale-105"
                  aria-label="Toggle menu"
                >
                  <div className="relative w-5 h-5">
                    <span className={cn('absolute left-0 top-1 w-5 h-0.5 bg-ink-strong rounded-full transition-all duration-300', isOpen ? 'rotate-45 translate-y-1.5 bg-brand' : '')} />
                    <span className={cn('absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-ink-strong rounded-full transition-all duration-300', isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100')} />
                    <span className={cn('absolute left-0 bottom-1 w-5 h-0.5 bg-ink-strong rounded-full transition-all duration-300', isOpen ? '-rotate-45 -translate-y-1.5 bg-brand' : '')} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-[#06070D]/40 dark:bg-[#06070D]/72 backdrop-blur-lg"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: -32, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -32, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-20 sm:top-24 right-4 left-4 bg-surface-elevated backdrop-blur-2xl border border-line-strong rounded-3xl shadow-brand-lg overflow-hidden"
            >
              <div className="px-6 py-5 bg-gradient-to-br from-[#33D6E5]/10 via-transparent to-[#4F7BB8]/10 border-b border-line relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#33D6E5]/8 to-transparent animate-shimmer" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl btn-brand-gradient flex items-center justify-center animate-pulse shadow-brand-glow">
                    <Sparkles className="w-5 h-5 text-[#1C1825]" />
                  </div>
                  <div>
                    <h3 className="font-black text-ink-strong">Menu</h3>
                    <p className="text-xs text-ink-soft">Navigate our services</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {NAVIGATION.map((item, index) => {
                  // ✅ FIX 2: Services gets its own accordion instead of a plain link
                  if (item.name === 'Services') {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        {/* Accordion trigger */}
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className={cn(
                            'w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all duration-300',
                            pathname.startsWith('/services')
                              ? 'bg-[#33D6E5]/10 text-brand'
                              : 'text-ink-muted hover:bg-surface-sunken hover:text-brand'
                          )}
                        >
                          <span>{item.name}</span>
                          <motion.span
                            animate={{ rotate: mobileServicesOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center"
                          >
                            <ChevronRight className="w-5 h-5 opacity-50" />
                          </motion.span>
                        </button>

                        {/* Accordion body — individual services */}
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-1 ml-3 space-y-0.5 pb-2">
                                {SERVICES.map((service, sIndex) => (
                                  <motion.div
                                    key={service.slug}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: sIndex * 0.02, duration: 0.14 }}
                                  >
                                    <Link
                                      href={`/services/${service.slug}`}
                                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[#33D6E5]/8 transition-all duration-200 group/mitem"
                                    >
                                      <div className="w-8 h-8 rounded-lg btn-brand-gradient flex items-center justify-center flex-shrink-0 group-hover/mitem:scale-110 transition-transform duration-200">
                                        <service.icon className="w-4 h-4 text-[#1C1825]" />
                                      </div>
                                      <span className="text-sm font-semibold text-ink-strong group-hover/mitem:text-brand transition-colors duration-200 flex-1">
                                        {service.title}
                                      </span>
                                      <ChevronRight className="w-3.5 h-3.5 text-brand opacity-0 group-hover/mitem:opacity-100 flex-shrink-0 transition-opacity duration-200" />
                                    </Link>
                                  </motion.div>
                                ))}

                                {/* View all link */}
                                <Link
                                  href="/services"
                                  className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 rounded-xl bg-[#33D6E5]/10 hover:bg-[#33D6E5]/15 text-brand text-sm font-bold transition-colors duration-200"
                                >
                                  View All Services
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02]',
                          pathname === item.href
                            ? 'bg-[#33D6E5]/10 text-brand'
                            : 'text-ink-muted hover:bg-surface-sunken hover:text-brand'
                        )}
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-5 h-5 opacity-50" />
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-4 border-t border-line">
                  <Link href="/contact" className="block">
                    <Button className="w-full gap-2 font-black py-6 text-base group shine">
                      <span className="relative z-10">Get Started Now</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}