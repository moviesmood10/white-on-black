'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';
import { easings, durations, animations } from '../utils/gsapConfig';

type AnimationType = keyof typeof animations;

interface ScrollRevealOptions {
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  scrub?: boolean | number;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const elementRef = useRef<T>(null);

  const {
    animation = 'fadeUp',
    duration = durations.normal,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    once = true,
    scrub = false,
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const animationConfig = animations[animation];

    // Get children if stagger is set
    const targets = stagger > 0 ? element.children : element;

    // Set initial state
    gsap.set(targets, animationConfig.from);

    // Create animation
    const tween = gsap.to(targets, {
      ...animationConfig.to,
      duration,
      delay,
      stagger: stagger > 0 ? { each: stagger, from: 'start' } : 0,
      ease: easings.smooth,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        scrub: scrub === true ? 1 : scrub || false,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animation, duration, delay, stagger, start, once, scrub]);

  return elementRef;
}
