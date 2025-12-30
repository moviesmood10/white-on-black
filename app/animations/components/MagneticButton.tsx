'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useAnimation } from '../providers/AnimationProvider';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div' | 'span';
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  style?: React.CSSProperties;
  'data-cursor'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 150,
  as: Component = 'button',
  onClick,
  href,
  style,
  'data-cursor': dataCursor,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { isTouchDevice } = useAnimation();

  useEffect(() => {
    if (isTouchDevice || !buttonRef.current) return;

    const button = buttonRef.current;
    const text = textRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const moveX = distanceX * strength;
        const moveY = distanceY * strength;

        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.4,
          ease: 'power3.out',
        });

        // Text moves slightly more for parallax effect
        if (text) {
          gsap.to(text, {
            x: moveX * 0.3,
            y: moveY * 0.3,
            duration: 0.4,
            ease: 'power3.out',
          });
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });

      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius, isTouchDevice]);

  // Check if className contains flex to determine display type
  const hasFlex = className.includes('flex');
  const displayClass = hasFlex ? '' : 'inline-block';
  
  // Extract gap classes from className to apply to inner span
  const gapMatch = className.match(/gap-\d+|gap-\[.*?\]/);
  const gapClass = gapMatch ? gapMatch[0] : '';
  
  // Remove gap from button className since it needs to be on the flex container (inner span)
  const buttonClassName = hasFlex && gapClass 
    ? className.replace(gapClass, '').trim() 
    : className;
  
  const props: Record<string, unknown> = {
    ref: buttonRef,
    className: `${displayClass} ${buttonClassName}`.trim(),
    onClick,
    style,
    'data-cursor': dataCursor || 'pointer',
  };

  if (Component === 'a' && href) {
    props.href = href;
  }

  const Element = Component as React.ElementType;

  // If using flex, apply gap to inner span which is the actual flex container
  if (hasFlex) {
    // Extract flex-related classes to apply to inner span
    const flexClasses = ['flex', 'items-center', 'justify-center', 'justify-between', 'justify-start', 'justify-end', 'items-start', 'items-end', 'items-stretch'];
    const spanFlexClasses = flexClasses.filter(cls => className.includes(cls)).join(' ');
    
    return (
      <Element {...props}>
        <span ref={textRef} className={`${spanFlexClasses} ${gapClass}`.trim() || 'flex items-center'}>
          {children}
        </span>
      </Element>
    );
  }

  return (
    <Element {...props}>
      <span ref={textRef} className="inline-block">
        {children}
      </span>
    </Element>
  );
}
