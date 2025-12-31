'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Start from '../components/Start';
import { handleSmoothScroll } from '../utils/smoothScroll';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';

const projects = [
  {
    name: 'RENI AI',
    tags: '/ AI / PRODUCT DESIGN /',
    image: '/reni.png',
  },
  {
    name: 'ENVOYX',
    tags: '/ FINTECH / AI / PRODUCT DESIGN / MVP DEV / ',
    image: '/envoyx.png',
  },
  {
    name: 'ARLENZ',
    tags: '/ FINTECH / AI / PRODUCT DESIGN /',
    image: '/arlenz.png',
  },
  {
    name: 'WAGA',
    tags: '/ REAL ESTATE / PRODUCT DESIGN / MVP DEV / ',
    image: '/waga.png',
  },
];

function StickyProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Image scale animation
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1]);

  // Calculate active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Divide scroll into equal sections for each project
      const sectionSize = 1 / projects.length;
      const newIndex = Math.min(
        Math.floor(latest / sectionSize),
        projects.length - 1
      );
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Sticky Image Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative w-full h-[300px] md:h-[500px] lg:h-[700px] xl:h-[80vh] mx-6 md:mx-10 lg:mx-[164px]"
          style={{
            backgroundColor: '#F3F3F1',
            borderRadius: '17.598px',
            scale: imageScale,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={projects[activeIndex].image}
                alt={projects[activeIndex].name}
                fill
                className="object-cover rounded-[17.598px]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Project Counter */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
            <span className="text-white/70 text-[14px] md:text-[16px] font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          {/* Active Project Info Overlay */}
          <motion.div
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 text-right"
            key={`info-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3
              className="text-[24px] md:text-[32px] lg:text-[40px] text-white font-semibold"
              style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.04em' }}
            >
              {projects[activeIndex].name}
            </h3>
            <p className="text-white/60 text-[12px] md:text-[14px] mt-1">
              {projects[activeIndex].tags}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Side Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {projects.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white cursor-pointer"
            animate={{
              opacity: i === activeIndex ? 1 : 0.3,
              scale: i === activeIndex ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-white origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export default function CaseStudyPage() {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };

  return (
    <div className="w-full flex flex-col items-center mt-25">
      <ScrollProgress />

      <div className="w-full flex flex-col bg-[#191919]">
        {/* Header Section */}
        <div className="w-full py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 lg:gap-[160px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-row justify-start md:justify-center items-center pt-[15px]"
            >
              <span
                className="text-[14px] md:text-[16px] lg:text-[18px]"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  lineHeight: '1.4em',
                  letterSpacing: '-0.02em',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                /OUR PROJECTS/
              </span>
            </motion.div>

            <div className="flex flex-col justify-center flex-1">
              <div className="flex flex-col self-stretch gap-6 md:gap-8">
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[32px] md:text-[48px] lg:text-[56px] xl:text-[72px]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 600,
                      lineHeight: '1.099em',
                      letterSpacing: '-0.07em',
                      color: '#FFFFFF',
                    }}
                  >
                    Selected works
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-[16px] md:text-[18px] lg:text-[20px] w-full max-w-full lg:max-w-[580px]"
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: 400,
                    lineHeight: '1.4em',
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  A sneak peak into our collaborations with smart founders. So yours might be the next on this wall.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Scrollytelling Section */}
        <StickyProjectsSection />
      </div>

      <Start onSmoothScroll={onSmoothScroll} />
    </div>
  );
}
