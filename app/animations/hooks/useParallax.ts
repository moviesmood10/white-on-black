'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

interface ParallaxOptions {
  speed?: number;
  direction?: 'y' | 'x';
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
  const elementRef = useRef<T>(null);

  const {
    speed = 0.5,
    direction = 'y',
    scrub = true,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const movement = speed * 100;

    const animation = gsap.fromTo(
      element,
      {
        [direction]: -movement,
      },
      {
        [direction]: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: scrub === true ? 1 : scrub,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [speed, direction, scrub, start, end]);

  return elementRef;
}
