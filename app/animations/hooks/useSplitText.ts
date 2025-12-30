'use client';

import { useEffect, useRef, useCallback } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';
import { easings, durations, staggerPresets } from '../utils/gsapConfig';

interface SplitTextOptions {
  type?: 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines' | 'chars,words,lines';
  animation?: 'fadeUp' | 'fadeIn' | 'slideUp' | 'scramble' | 'wave';
  duration?: number;
  stagger?: number;
  delay?: number;
  scrollTrigger?: boolean;
  triggerStart?: string;
  once?: boolean;
}

export function useSplitText<T extends HTMLElement>(options: SplitTextOptions = {}) {
  const elementRef = useRef<T>(null);
  const splitRef = useRef<SplitType | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const {
    type = 'chars',
    animation = 'fadeUp',
    duration = durations.normal,
    stagger = staggerPresets.fast,
    delay = 0,
    scrollTrigger = true,
    triggerStart = 'top 85%',
    once = true,
  } = options;

  const animate = useCallback(() => {
    if (!elementRef.current || !splitRef.current) return;

    const elements = type.includes('chars')
      ? splitRef.current.chars
      : type.includes('words')
      ? splitRef.current.words
      : splitRef.current.lines;

    if (!elements) return;

    const tl = gsap.timeline({
      paused: scrollTrigger,
      delay,
    });

    switch (animation) {
      case 'fadeUp':
        tl.fromTo(
          elements,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration, stagger, ease: easings.smooth }
        );
        break;
      case 'fadeIn':
        tl.fromTo(
          elements,
          { opacity: 0 },
          { opacity: 1, duration, stagger, ease: easings.smooth }
        );
        break;
      case 'slideUp':
        // Wrap each char/word in overflow hidden container
        elements.forEach((el) => {
          if (el.parentElement) {
            el.parentElement.style.overflow = 'hidden';
          }
        });
        tl.fromTo(
          elements,
          { y: '110%' },
          { y: '0%', duration, stagger, ease: easings.expo }
        );
        break;
      case 'wave':
        tl.fromTo(
          elements,
          { y: 20, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: duration * 1.2,
            stagger: { each: stagger, from: 'start' },
            ease: easings.smooth,
          }
        );
        break;
      default:
        tl.fromTo(
          elements,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration, stagger, ease: easings.smooth }
        );
    }

    animationRef.current = tl;

    if (scrollTrigger) {
      ScrollTrigger.create({
        trigger: elementRef.current,
        start: triggerStart,
        onEnter: () => tl.play(),
        onLeaveBack: once ? undefined : () => tl.reverse(),
        once,
      });
    } else {
      tl.play();
    }
  }, [type, animation, duration, stagger, delay, scrollTrigger, triggerStart, once]);

  useEffect(() => {
    if (!elementRef.current) return;

    // Split the text
    splitRef.current = new SplitType(elementRef.current, {
      types: type as 'chars' | 'words' | 'lines',
      tagName: 'span',
    });

    // Set initial state
    const elements = type.includes('chars')
      ? splitRef.current.chars
      : type.includes('words')
      ? splitRef.current.words
      : splitRef.current.lines;

    if (elements) {
      gsap.set(elements, { opacity: 0 });
    }

    // Animate
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [type, animate]);

  return elementRef;
}
