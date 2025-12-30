'use client';

import { useRef, useEffect, ReactNode } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';
import { easings, durations, staggerPresets } from '../utils/gsapConfig';

type AnimationType = 'fadeUp' | 'slideUp' | 'fadeIn' | 'wave' | 'scramble';
type SplitBy = 'chars' | 'words' | 'lines';

interface RevealTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
  animation?: AnimationType;
  splitBy?: SplitBy;
  duration?: number;
  stagger?: number;
  delay?: number;
  triggerStart?: string;
  once?: boolean;
  scrub?: boolean | number;
}

export default function RevealText({
  children,
  as: Component = 'div',
  className = '',
  style,
  animation = 'fadeUp',
  splitBy = 'chars',
  duration = durations.normal,
  stagger = staggerPresets.fast,
  delay = 0,
  triggerStart = 'top 85%',
  once = true,
  scrub = false,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Split text
    splitRef.current = new SplitType(container, {
      types: splitBy,
      tagName: 'span',
    });

    const elements = splitBy === 'chars'
      ? splitRef.current.chars
      : splitBy === 'words'
      ? splitRef.current.words
      : splitRef.current.lines;

    if (!elements || elements.length === 0) return;

    // Create timeline
    const tl = gsap.timeline({
      paused: true,
      delay,
    });

    // Animation configurations
    switch (animation) {
      case 'fadeUp':
        gsap.set(elements, { y: '100%', opacity: 0 });
        tl.to(elements, {
          y: '0%',
          opacity: 1,
          duration,
          stagger,
          ease: easings.smooth,
        });
        break;

      case 'slideUp':
        // Add overflow hidden to parent
        elements.forEach((el) => {
          const wrapper = document.createElement('span');
          wrapper.style.overflow = 'hidden';
          wrapper.style.display = 'inline-block';
          el.parentNode?.insertBefore(wrapper, el);
          wrapper.appendChild(el);
        });
        gsap.set(elements, { y: '110%' });
        tl.to(elements, {
          y: '0%',
          duration,
          stagger,
          ease: easings.expo,
        });
        break;

      case 'fadeIn':
        gsap.set(elements, { opacity: 0 });
        tl.to(elements, {
          opacity: 1,
          duration,
          stagger,
          ease: easings.smooth,
        });
        break;

      case 'wave':
        gsap.set(elements, { y: 30, opacity: 0, rotateX: -90 });
        tl.to(elements, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: duration * 1.2,
          stagger: { each: stagger, from: 'start' },
          ease: easings.smooth,
        });
        break;

      case 'scramble':
        gsap.set(elements, { opacity: 0 });
        tl.to(elements, {
          opacity: 1,
          duration: duration * 0.5,
          stagger,
          ease: 'none',
        });
        break;
    }

    timelineRef.current = tl;

    // ScrollTrigger
    if (scrub) {
      ScrollTrigger.create({
        trigger: container,
        start: triggerStart,
        end: 'bottom top',
        scrub: scrub === true ? 1 : scrub,
        animation: tl,
      });
    } else {
      ScrollTrigger.create({
        trigger: container,
        start: triggerStart,
        onEnter: () => tl.play(),
        onLeaveBack: once ? undefined : () => tl.reverse(),
        once,
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [animation, splitBy, duration, stagger, delay, triggerStart, once, scrub]);

  const Element = Component as React.ElementType;

  return (
    <Element ref={containerRef} className={className} style={style}>
      {children}
    </Element>
  );
}
