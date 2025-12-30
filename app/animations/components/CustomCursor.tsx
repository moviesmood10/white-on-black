'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapConfig';
import { useAnimation } from '../providers/AnimationProvider';

interface CursorState {
  isHovering: boolean;
  text: string;
  blend: boolean;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const { isTouchDevice, isReady } = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    text: '',
    blend: false,
  });

  // Ensure component only renders after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isTouchDevice || !isReady) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // GSAP quickSetters for performance
    const xSetter = gsap.quickSetter(cursor, 'x', 'px');
    const ySetter = gsap.quickSetter(cursor, 'y', 'px');
    const xDotSetter = gsap.quickSetter(cursorDot, 'x', 'px');
    const yDotSetter = gsap.quickSetter(cursorDot, 'y', 'px');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth cursor following with different speeds
    const updateCursor = () => {
      // Outer circle - slower follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      xSetter(cursorX);
      ySetter(cursorY);

      // Inner dot - faster follow
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      xDotSetter(dotX);
      yDotSetter(dotY);

      requestAnimationFrame(updateCursor);
    };

    // Handle cursor interactions
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorType = target.dataset.cursor;

      if (cursorType === 'view') {
        setCursorState({ isHovering: true, text: 'View', blend: true });
      } else if (cursorType === 'pointer') {
        setCursorState({ isHovering: true, text: '', blend: false });
      } else if (cursorType === 'drag') {
        setCursorState({ isHovering: true, text: 'Drag', blend: true });
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorState({ isHovering: true, text: '', blend: false });
      }
    };

    const handleMouseLeave = () => {
      setCursorState({ isHovering: false, text: '', blend: false });
    };

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove);
    updateCursor();

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.style.cursor = 'auto';
    };
  }, [isTouchDevice, isReady]);

  // Update cursor appearance based on state
  useEffect(() => {
    if (!cursorRef.current) return;

    if (cursorState.isHovering) {
      gsap.to(cursorRef.current, {
        width: cursorState.text ? 80 : 50,
        height: cursorState.text ? 80 : 50,
        duration: 0.3,
        ease: 'power3.out',
      });
    } else {
      gsap.to(cursorRef.current, {
        width: 40,
        height: 40,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  }, [cursorState]);

  // Don't render on touch devices, during SSR, or before mount
  if (!mounted || isTouchDevice || !isReady) return null;

  return (
    <>
      {/* Outer circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: cursorState.blend ? 'none' : '1px solid rgba(0, 0, 0, 0.3)',
          backgroundColor: cursorState.text ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
          mixBlendMode: cursorState.blend ? 'difference' : 'normal',
          transition: 'background-color 0.3s, border 0.3s',
        }}
      >
        {cursorState.text && (
          <span
            className="text-white text-xs font-medium"
            style={{ mixBlendMode: 'difference' }}
          >
            {cursorState.text}
          </span>
        )}
      </div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: cursorState.isHovering ? 'transparent' : '#000',
          transition: 'background-color 0.3s, transform 0.3s',
        }}
      />
    </>
  );
}
