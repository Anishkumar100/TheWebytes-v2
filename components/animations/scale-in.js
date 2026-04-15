'use client';

import { motion } from 'framer-motion';

export function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.4,
  className = '' 
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
