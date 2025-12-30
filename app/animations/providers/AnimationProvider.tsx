'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

interface AnimationContextType {
  isReady: boolean;
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  isReady: false,
  prefersReducedMotion: false,
  isTouchDevice: false,
});

export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);

    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Mark as ready
    setIsReady(true);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <AnimationContext.Provider value={{ isReady, prefersReducedMotion, isTouchDevice }}>
      {children}
    </AnimationContext.Provider>
  );
}
