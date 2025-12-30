// Providers
export { default as SmoothScrollProvider, useSmoothScroll } from './providers/SmoothScrollProvider';
export { default as AnimationProvider, useAnimation } from './providers/AnimationProvider';

// Hooks
export { useSplitText } from './hooks/useSplitText';
export { useMagneticEffect } from './hooks/useMagneticEffect';
export { useParallax } from './hooks/useParallax';
export { useScrollReveal } from './hooks/useScrollReveal';

// Components
export { default as CustomCursor } from './components/CustomCursor';
export { default as MagneticButton } from './components/MagneticButton';
export { default as RevealText } from './components/RevealText';
export { default as AnimatedSection } from './components/AnimatedSection';
export { default as CountUp } from './components/CountUp';
export { default as InfiniteMarquee } from './components/InfiniteMarquee';

// Utils
export { gsap, ScrollTrigger, easings, durations, animations, staggerPresets } from './utils/gsapConfig';
