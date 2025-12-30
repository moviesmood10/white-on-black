'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useAnimation } from '../providers/AnimationProvider';

interface MagneticOptions {
  strength?: number;
  radius?: number;
  ease?: string;
  duration?: number;
}

export function useMagneticEffect<T extends HTMLElement>(options: MagneticOptions = {}) {
  const elementRef = useRef<T>(null);
  const { isTouchDevice } = useAnimation();

  const {
    strength = 0.3,
    radius = 100,
    ease = 'power3.out',
    duration = 0.5,
  } = options;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current || isTouchDevice) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const moveX = distanceX * strength;
        const moveY = distanceY * strength;

        gsap.to(elementRef.current, {
          x: moveX,
          y: moveY,
          duration,
          ease,
        });
      }
    },
    [strength, radius, ease, duration, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      duration,
      ease,
    });
  }, [ease, duration]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isTouchDevice) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, isTouchDevice]);

  return elementRef;
}
