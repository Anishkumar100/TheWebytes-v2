'use client';

import { motion } from 'framer-motion';

export function TextStagger({ 
  text,
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  as = 'span'
}) {
  const Component = motion[as];
  
  // Get text from either prop or children
  const content = text || (typeof children === 'string' ? children : '');
  
  // If no valid text, just render children as-is
  if (!content) {
    return <Component className={className}>{children}</Component>;
  }
  
  const words = content.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay 
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}

export function CharacterStagger({ 
  text,
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.02
}) {
  // Get text from either prop or children
  const content = text || (typeof children === 'string' ? children : '');
  
  // If no valid text, just render children as-is
  if (!content) {
    return <span className={className}>{children}</span>;
  }
  
  const characters = content.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay 
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
