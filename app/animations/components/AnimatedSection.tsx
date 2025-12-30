'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';
import { easings, durations, animations } from '../utils/gsapConfig';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'clipReveal';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  staggerChildren?: number;
  triggerStart?: string;
  once?: boolean;
  scrub?: boolean | number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fadeUp',
  duration = durations.normal,
  delay = 0,
  staggerChildren = 0,
  triggerStart = 'top 85%',
  once = true,
  scrub = false,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const config = animations[animation];

    // Determine targets
    const targets = staggerChildren > 0 ? section.children : section;

    // Set initial state
    gsap.set(targets, config.from);

    // Create animation
    const tween = gsap.to(targets, {
      ...config.to,
      duration,
      delay,
      stagger: staggerChildren > 0 ? { each: staggerChildren, from: 'start' } : 0,
      ease: easings.smooth,
      scrollTrigger: {
        trigger: section,
        start: triggerStart,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        scrub: scrub === true ? 1 : scrub || false,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animation, duration, delay, staggerChildren, triggerStart, once, scrub]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
