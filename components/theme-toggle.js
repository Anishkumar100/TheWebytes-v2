'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-surface-sunken border border-line" aria-hidden="true" />;
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="relative w-10 h-10 rounded-xl bg-surface-sunken border border-line hover:border-line-brand flex items-center justify-center overflow-hidden group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Glow on hover */}
      <span className="absolute inset-0 bg-gradient-to-br from-[#33D6E5]/0 via-[#33D6E5]/15 to-[#4F7BB8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1 }}
            exit={{    rotate: 90,  opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-[#8DF0FA]" strokeWidth={2.2} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90,  opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1 }}
            exit={{    rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-[#1D9FB4]" strokeWidth={2.2} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
