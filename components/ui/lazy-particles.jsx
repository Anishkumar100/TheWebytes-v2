'use client';

import { useEffect, useRef, useState } from 'react';
import { FloatingParticles } from './floating-particles';

export function LazyParticles({ count, color, speed, size }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {isVisible && (
        <FloatingParticles 
          count={count} 
          color={color} 
          speed={speed} 
          size={size} 
        />
      )}
    </div>
  );
}
