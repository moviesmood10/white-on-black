'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '../utils/gsapConfig';

interface InfiniteMarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  children,
  className = '',
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const trackWidth = track.scrollWidth / 2;

    // Calculate duration based on speed
    const duration = trackWidth / speed;

    // Set initial position
    gsap.set(track, { x: direction === 'left' ? 0 : -trackWidth });

    // Create infinite loop animation
    animationRef.current = gsap.to(track, {
      x: direction === 'left' ? -trackWidth : 0,
      duration,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 0, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex whitespace-nowrap">
        {/* Original content */}
        <div className="flex items-center">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
}
