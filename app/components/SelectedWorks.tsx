'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import MagneticButton from '../animations/components/MagneticButton';
import Image from 'next/image';

interface SelectedWorksProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

const projects = [
  {
    name: 'RENI AI',
    tags: '/ REAL ESTATE / DISCOVERY / PRODUCT DESIGN / PRODUCT MANAGEMENT',
    image: '/reni.png',
  },
  {
    name: 'ENVOYX',
    tags: '/ FINTECH / AI / PRODUCT DESIGN / MVP DEV /',
    image: '/envoyx.png',
  },
  {
    name: 'ARLENZ',
    tags: '/ FINTECH / AI / PRODUCT DESIGN /',
    image: '/arlenz.png',
  },
  {
    name: 'WAGA',
    tags: '/ REAL ESTATE / PRODUCT DESIGN / MVP DEV /',
    image: '/waga.png',
  },
];

export default function SelectedWorks({ onSmoothScroll }: SelectedWorksProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !progressRef.current) return;

    // Calculate progress based on current index
    const progress = ((currentIndex + 1) / projects.length) * 100;

    // Animate progress bar based on current index
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      ease: 'power2.out',
      duration: 0.5,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectName = projects[currentIndex].name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/about?project=${projectName}`);
  };

  const currentProject = projects[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="works"
      className="w-full flex flex-col items-center py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto bg-[#191919]"
    >
      <div className="w-full flex flex-col gap-10 md:gap-12 lg:gap-16">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-16 lg:gap-[160px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pt-[15px] w-full md:w-auto"
          >
            <span
              className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white opacity-40"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              /OUR PROJECTS/
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center gap-8 w-full"
          >
            <RevealText
              as="h2"
              // animation="slideUp"
              splitBy="words"
              duration={0.8}
              stagger={0.05}
              className="text-[48px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.1em] tracking-[-0.07em] text-white"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Selected works
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[20px] font-medium leading-[1.4em] tracking-[-0.02em] text-white w-full md:w-full lg:w-[660px]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              A sneak peak into our collaborations with smart founders. So yours might be the next on this wall.
            </motion.p>

            <motion.a
              href="#all-projects"
              onClick={(e) => onSmoothScroll(e, '#all-projects')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 pb-1 text-[20px] font-medium leading-[1.4em] tracking-[-0.02em] text-white group"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <span className="hover-underline">All projects</span>
              <motion.img
                src="/arrow.svg"
                alt="arrow-right"
                width={20}
                height={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>
        </div>

        <div className="w-full flex flex-col gap-5">
          {/* Progress Bar */}
          <div className="flex items-center gap-6 md:gap-8 lg:gap-12">
            <div className="flex-1 h-[3px] bg-white/25 rounded-full overflow-hidden">
              <motion.div
                ref={progressRef}
                className="h-full bg-white rounded-full"
                style={{ width: '20%' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex items-center gap-5">
              <MagneticButton
                strength={0.4}
                radius={60}
                onClick={handlePrev}
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
                  <path d="M11 1L1 11L11 21" stroke="white" strokeWidth="2" />
                </svg>
              </MagneticButton>
              <MagneticButton
                strength={0.4}
                radius={60}
                onClick={handleNext}
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
                  <path d="M1 1L11 11L1 21" stroke="white" strokeWidth="2" />
                </svg>
              </MagneticButton>
            </div>
          </div>

          {/* Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col gap-5"
          >
            <div
              ref={imageRef}
              className="w-full h-[265.12px] md:h-[500px] lg:h-[946.85px] p-8 bg-[#F3F3F1] relative overflow-hidden cursor-pointer group bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/wood.jpg)` }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handleViewClick}
              data-cursor="view"
            >
              {/* Project Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 p-10"
                  style={{
                    scale: isHovering ? 1.08 : 1,
                    transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <Image
                    src={currentProject.image}
                    alt={currentProject.name}
                    fill
                    className="object-cover px-20 py-20"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hover Overlay */}
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center z-10"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                    >
                      <span className="text-[14px] font-medium text-[#191919]">View</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0"
            >
              <h3
                className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.4em] tracking-[-0.047em] text-white"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {currentProject.name}
              </h3>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {currentProject.tags}
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
