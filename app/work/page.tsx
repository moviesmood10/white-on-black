'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Start from '../components/Start';
import { handleSmoothScroll } from '../utils/smoothScroll';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

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

// Shimmer loading skeleton component
function AnimationSkeleton() {
  return (
    <div className="w-full aspect-video bg-gradient-to-r from-[#2a2a2a] via-[#3a3a3a] to-[#2a2a2a] animate-shimmer bg-[length:200%_100%] rounded-lg" />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-white origin-left z-50 will-change-transform"
      style={{ scaleX }}
    />
  );
}

// Individual project card with lazy loading
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lazy load animation when in view
  useEffect(() => {
    if (isInView && !animationData) {
      fetch(project.animation)
        .then(res => res.json())
        .then(data => {
          setAnimationData(data);
          setIsLoaded(true);
        })
        .catch(err => console.error(`Failed to load ${project.name}:`, err));
    }
  }, [isInView, animationData, project.animation, project.name]);

  // Pause/play based on visibility for performance
  useEffect(() => {
    if (lottieRef.current && animationData) {
      if (isInView) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [isInView, animationData]);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: smoothEase,
      }
    }
  };

  const imageContainerVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.4,
        ease: smoothEase,
      }
    }
  };

  const innerContentVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15 + 0.3,
        ease: smoothEase,
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="w-full flex flex-col gap-5 gpu-accelerated"
    >
      {/* Project Animation Container */}
      <motion.div
        variants={imageContainerVariants}
        initial="rest"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ backgroundImage: `url(/wood.jpg)` }}
        className="w-full h-[265.12px] md:h-[500px] lg:h-[946.85px] p-8 bg-[#F3F3F1] relative overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat will-change-transform"
      >
        <motion.div
          variants={innerContentVariants}
          className="absolute inset-0 p-10 will-change-transform"
        >
          {isLoaded && animationData ? (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={isInView}
                className="w-full h-full"
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                  progressiveLoad: true,
                }}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full">
              <AnimationSkeleton />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Project Info */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full flex flex-row justify-between items-center gap-2 flex-wrap"
      >
        <motion.h3
          className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.4em] tracking-[-0.078em] md:tracking-[-0.047em] text-white"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {project.name}
        </motion.h3>
        {/* Tags - Desktop */}
        <motion.span
          className="hidden md:inline text-[16px] lg:text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/40"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          whileHover={{ color: 'rgba(255, 255, 255, 0.7)' }}
          transition={{ duration: 0.3 }}
        >
          {project.tags}
        </motion.span>
        {/* Mobile tag pill */}
        <div className="md:hidden flex items-center gap-3">
          <motion.span
            className="px-[14.67px] py-[7.33px] bg-[#404040] rounded-[14.67px] text-[12px] font-medium text-white"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            whileHover={{ scale: 1.05, backgroundColor: '#505050' }}
            transition={{ duration: 0.2 }}
          >
            {project.tags.split('/').filter(t => t.trim())[0]?.trim()}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Define ease as const tuple for TypeScript
const smoothEaseGlobal = [0.22, 1, 0.36, 1] as const;

export default function CaseStudyPage() {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };

  // Header animation variants
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: smoothEaseGlobal,
      }
    }
  };

  const titleVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: 1,
        ease: smoothEaseGlobal,
      }
    }
  };

  const descVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: smoothEaseGlobal,
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-25">
      <ScrollProgress />

      <div className="w-full flex flex-col bg-[#191919]">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="w-full py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto"
        >
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 lg:gap-[160px]">
            <motion.div
              variants={tagVariants}
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
                    variants={titleVariants}
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
                  variants={descVariants}
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
        </motion.div>

        {/* Projects Grid */}
        <div className="w-full flex flex-col gap-8 md:gap-10 lg:gap-12 py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
          {projects.map((project, idx) => (
            <ProjectCard key={project.name} project={project} index={idx} />
          ))}
        </div>
      </div>

      <div className='pb-20'>
        <Start onSmoothScroll={onSmoothScroll} />
      </div>
    </div>
  );
}
