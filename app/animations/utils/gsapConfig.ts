'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easings
export const easings = {
  smooth: 'power3.out',
  smoothIn: 'power3.in',
  smoothInOut: 'power3.inOut',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  expo: 'expo.out',
  expoIn: 'expo.in',
  expoInOut: 'expo.inOut',
};

// Duration presets
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  verySlow: 1.2,
  ultraSlow: 1.8,
};

// Animation presets
export const animations = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  clipReveal: {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
};

// Stagger presets
export const staggerPresets = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
  verySlow: 0.12,
};

// GSAP defaults
gsap.defaults({
  ease: easings.smooth,
  duration: durations.normal,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
});

export { gsap, ScrollTrigger };
