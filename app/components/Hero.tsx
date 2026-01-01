'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import MagneticButton from '../animations/components/MagneticButton';
import RevealText from '../animations/components/RevealText';

interface HeroProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

export default function Hero({ onSmoothScroll }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    // Scroll indicator animation
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1,
      ease: 'power2.inOut',
    }).to(scrollIndicatorRef.current, {
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    // Parallax effect on scroll
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const heroContent = sectionRef.current?.querySelector('.hero-content');
          if (heroContent) {
            gsap.to(heroContent, {
              y: self.progress * 100,
              opacity: 1 - self.progress * 0.5,
              duration: 0,
            });
          }
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative overflow-hidden py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[50px] lg:px-[164px]">
      {/* Hero Content */}
      <div className="hero-content w-full flex flex-col items-center gap-10 md:gap-16 lg:gap-[100px] mt-50">
        <div className="w-full flex flex-col md:flex-col lg:flex-row justify-between items-start md:items-start lg:items-end gap-10 md:gap-12 lg:gap-[50px]">
          {/* Headline with character reveal */}
          <div className="flex-1 w-full">
            <RevealText
              as="h1"
              duration={0.9}
              stagger={0.04}
              className="break-word mb-3 text-[48px] md:text-[56px] lg:text-[65px] font-semibold leading-[1.2em] tracking-[-0.08em] text-[#191919] mb-0 font-manrope"
            >
              Build the right thing. Fast.
            </RevealText>
            <span
              className="text-[40px] font-normal text-[#191919] w-full md:w-full lg:w-[517px] leading-[120%] tracking-[-0.96px] font-geist-sans"
            >
              <span className="line-through opacity-50">Not an agency;</span>{'\u00A0'}An independent software product studio .
            </span>
          </div>

          {/* Description and CTAs */}
          <div className="w-full md:w-full lg:w-[557px] flex flex-col gap-6 md:gap-8 lg:gap-10">
            <RevealText
              as="p"
              animation="fadeUp"
              splitBy="words"
              duration={0.7}
              stagger={0.02}
              delay={0.3}
              className="text-[20px] font-normal leading-[1.4em] tracking-[-0.048em] text-[#191919] w-full md:w-full lg:w-[517px]"
            >
             A product partner helping founders & businesses move from idea to market & investor-ready products—fast and deliberately.
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <MagneticButton
                strength={0.3}
                radius={120}
                onClick={(e) => { e.preventDefault(); onSmoothScroll(e as React.MouseEvent<HTMLButtonElement>, '#book-call'); }}
                className="px-5 py-2.5 bg-[#191919] text-[#FAF6F2] text-[15.9px] font-normal leading-[1.5em] tracking-[-0.04em] rounded-xl hover:opacity-90 transition-opacity"
              >
                Book a free call
              </MagneticButton>

              <MagneticButton
                strength={0.3}
                radius={120}
                onClick={(e) => { e.preventDefault(); onSmoothScroll(e as React.MouseEvent<HTMLButtonElement>, '#research'); }}
                className="px-5 py-2.5 bg-[#E6E6E6] text-[#191919] text-[15.9px] font-normal leading-[1.508em] tracking-[-0.04em] rounded-xl flex items-center justify-center gap-2 hover:bg-[#D0D0D0] transition-colors"
              >
                How we work
                <motion.img
                  src="/play.svg"
                  alt="arrow-right"
                  width={16}
                  height={16}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                />
              </MagneticButton>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
