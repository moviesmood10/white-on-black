'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface LazyBackgroundProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export default function LazyBackground({
  src,
  className = '',
  style = {},
  children,
  threshold = 0.1,
  rootMargin = '200px',
}: LazyBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [isInView, src]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundColor: !isLoaded ? '#e5e5e5' : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
