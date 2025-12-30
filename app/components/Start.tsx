'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import MagneticButton from '../animations/components/MagneticButton';

interface StartProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

export default function Start({ onSmoothScroll }: StartProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax effect on section
    gsap.to(sectionRef.current, {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="start"
      className="w-full flex flex-col items-center justify-center pt-[72px] px-6 md:pt-[80px] md:px-10 lg:pt-[100px] lg:px-16 2xl:max-w-[1920px] 2xl:mx-auto"
    >
      <div className="flex gap-6 w-full max-w-4xl">
        <div className="flex flex-col gap-10 w-full">
          <RevealText
            as="h2"
            // animation="slideUp"
            splitBy="words"
            duration={0.9}
            stagger={0.05}
            className="text-[48px] md:text-[72px] lg:text-[108px] font-semibold leading-[1em] tracking-[-0.07em] text-[#191919]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Want to build something better?
          </RevealText>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[24px] font-normal leading-[1.4em] tracking-[-0.04em] text-[#191919]/60 w-full md:w-full lg:w-[500px]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Our team brings together design, development, and strategic thinking to help you grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton
              as="a"
              href="#book-call"
              strength={0.35}
              radius={150}
              onClick={(e) => onSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, '#book-call')}
              className="inline-flex hover-underline items-center gap-3 pb-1 text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.4em] tracking-[-0.04em] text-[#191919] group"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <span className="">Start now</span>
              <motion.div
                className="w-4 h-4 transition-transform group-hover:translate-x-2"
                whileHover={{ x: 5 }}
              >
                <img
                  src="/arrow.svg"
                  alt="arrow"
                  width={16}
                  height={16}
                  className="w-full h-full"
                  style={{ filter: 'brightness(0)' }}
                />
              </motion.div>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
