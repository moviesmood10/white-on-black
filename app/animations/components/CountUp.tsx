'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapConfig';

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  triggerStart?: string;
  once?: boolean;
}

export default function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
  className = '',
  triggerStart = 'top 85%',
  once = true,
}: CountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: end,
      duration,
      ease: 'power1.inOut',
      onUpdate: () => {
        setDisplayValue(parseFloat(obj.value.toFixed(decimals)));
      },
      scrollTrigger: {
        trigger: container,
        start: triggerStart,
        once,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration, decimals, triggerStart, once]);

  const formatValue = () => {
    if (decimals > 0) {
      return displayValue.toFixed(decimals);
    }
    return Math.round(displayValue).toLocaleString();
  };

  return (
    <span ref={containerRef} className={className}>
      {prefix}{formatValue()}{suffix}
    </span>
  );
}
