'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Start from '../components/Start';
import { handleSmoothScroll } from '../utils/smoothScroll';
import Lottie from 'lottie-react';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';

const projects = [
  {
    name: 'RENI AI',
    tags: '/ AI / PRODUCT DESIGN /',
    animation: '/RENI-COVER.json',
  },
  {
    name: 'ENVOYX',
    tags: '/ FINTECH / AI / PRODUCT DESIGN / MVP DEV / ',
    animation: '/ENVOYX-COVER.json',
  },
  {
    name: 'ARLENZ',
    tags: '/ FINTECH / AI / PRODUCT DESIGN /',
    animation: '/ARLENZ-COVER.json',
  },
  {
    name: 'WAGA',
    tags: '/ REAL ESTATE / PRODUCT DESIGN / MVP DEV / ',
    animation: '/WAGA-COVER.json',
  },
];


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
  const [animations, setAnimations] = useState<Record<number, any>>({});

  // Load animation data
  useEffect(() => {
    const loadAnimations = async () => {
      const loaded: Record<number, any> = {};
      for (let i = 0; i < projects.length; i++) {
        try {
          const response = await fetch(projects[i].animation);
          const data = await response.json();
          loaded[i] = data;
        } catch (error) {
          console.error(`Failed to load animation for ${projects[i].name}:`, error);
        }
      }
      setAnimations(loaded);
    };
    loadAnimations();
  }, []);

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

        <div className="w-full flex flex-col gap-5 w-full py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="w-full flex flex-col gap-5"

              >
                {/* Project Animation - Mobile: 265.12px, Tablet: 500px, Desktop: 946.85px */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  style={{ backgroundImage: `url(/wood.jpg)` }}
                  className="w-full"
                >
                  <div className=" w-full">
                    {animations[idx] ? (
                      <Lottie
                        animationData={animations[idx]}
                        loop={true}
                        autoplay={true}
                        className="w-full"
                        style={{ height: '100%' }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-gray-400">Loading...</div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Project Info */}
                <div className="w-full flex flex-row justify-between items-center gap-2 flex-wrap">
                  {/* Mobile: 24px, Tablet: 32px, Desktop: 40px */}
                  <h3 
                    className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.4em] tracking-[-0.078em] md:tracking-[-0.047em] text-white"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {project.name}
                  </h3>
                  {/* Tags as pill on mobile, text on tablet+ */}
                  <span 
                    className="hidden md:inline text-[16px] lg:text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/40"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {project.tags}
                  </span>
                  {/* Mobile tag pill */}
                  <div className="md:hidden flex items-center gap-3">
                    <span 
                      className="px-[14.67px] py-[7.33px] bg-[#404040] rounded-[14.67px] text-[12px] font-medium text-white"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {project.tags.split('/').filter(t => t.trim())[0]?.trim()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
      <div className='pb-20 '>
        <Start onSmoothScroll={onSmoothScroll} />
      </div>
    </div>
  );
}
