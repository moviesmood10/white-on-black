'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useRef } from 'react';
import Start from '../components/Start';
import { handleSmoothScroll } from '../utils/smoothScroll';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

const projects = [
  {
    name: 'RENI AI',
    tags: '/ AI / PRODUCT DESIGN /',
    image: '/reni.png',
    animation: '/RENI-COVER.json',
    client: 'RENI AI',
    industry: 'AI',
    year: '2025',
    services: 'Product Design',
    overview: 'AI agent builder for hospitality industry',
    tagList: ['Fintech'],
    discoverLabel: 'Discover',
    heading: '',
    description: '',
    linkText: ''
  },
  {
    name: 'ENVOYX',
    tags: '/ FINTECH / AI / PRODUCT DESIGN / MVP DEV / ',
    image: '/envoyx.png',
    animation: '/ENVOYX-COVER.json',
    client: 'ENVOYX',
    industry: 'Fintech',
    year: '2025',
    services: 'Product Design MVP Dev',
    overview: 'Invoice financing infrastructure for SMEs',
    tagList: ['Fintech', 'AI', 'Insuretech'],
    discoverLabel: 'Explore',
    heading: 'Unlocking Liquidity Trapped in Receivables',
    description: 'We began by building an AI-powered claims verification system to help insurers reduce the heavy manual work behind health insurance claims cutting repayment delays that stretched up to 45 days. As we learned more about the ecosystem, a bigger bottleneck became clear: SMEs were struggling with cash flow while waiting on unpaid invoices. That insight led to a pivot toward an alternative payment and financing platform that enables businesses to convert pending receivables into working capital within 24–48 hours.',
    linkText: 'View all projects'
  },
  {
    name: 'ARLENZ',
    tags: '/ FINTECH / AI / PRODUCT DESIGN /',
    image: '/arlenz.png',
    animation: '/ARLENZ-COVER.json',
    client: 'ARLENZ',
    industry: 'Fintech',
    year: '2025',
    services: 'Product Design',
    overview: 'Personal finance & portfolio management',
    tagList: ['Fintech'],
    discoverLabel: 'Explore',
    heading: '',
    description: '',
    linkText: ''
  },
  {
    name: 'WAGA',
    tags: '/ REAL ESTATE / PRODUCT DESIGN / MVP DEV / ',
    image: '/waga.png',
    animation: '/WAGA-COVER.json',
    client: 'WAGA',
    industry: 'Real Estate',
    year: '2025',
    services: 'Product Design',
    overview: 'AI-powered financial intelligence platform',
    tagList: ['Real Estate', 'Product Design', 'MVP Development'],
    discoverLabel: 'Discover',
    heading: '',
    description: '',
    linkText: ''
    },
];

// Shimmer loading skeleton component
function AnimationSkeleton() {
  return (
    <motion.div 
      className="w-full h-full bg-[#2a2a2a] rounded-lg flex items-center justify-center"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="text-gray-400 text-sm"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
}
const services = [
  { title: 'Product Design' },
  { title: 'Development' },
  { title: 'Strategy' },
  { title: 'Branding' },
];

const stats = [
  { value: '95', suffix: '%', label: 'Client retention' },
  { value: '95', suffix: '%', label: 'Client retention' },
  { value: '95', suffix: '%', label: 'Client retention' },
];

function CaseStudyContent() {
  const searchParams = useSearchParams();
  const [selectedProject, setSelectedProject] = useState(projects.find(p => p.name === 'ENVOYX') || projects[0]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const projectParam = searchParams.get('project');
    if (projectParam) {
      // Normalize the project parameter to match project names
      const normalizedParam = projectParam.toLowerCase();
      
      // Map URL parameters to project names
      const projectMap: { [key: string]: string } = {
        'envoyx': 'ENVOYX',
        'reni-ai': 'RENI AI',
        'reni': 'RENI AI',
        'arlenz': 'ARLENZ',
        'waga': 'WAGA',
      };

      const projectName = projectMap[normalizedParam] || normalizedParam.toUpperCase();
      
      const foundProject = projects.find(
        (p) => p.name.toLowerCase() === projectName.toLowerCase()
      );
      if (foundProject) {
        setSelectedProject(foundProject);
        // Reset animation state when project changes
        setAnimationData(null);
        setIsLoaded(false);
      }
    }
  }, [searchParams]);

  // Load animation data when project changes
  useEffect(() => {
    if (selectedProject.animation && !isLoaded) {
      fetch(selectedProject.animation)
        .then(res => res.json())
        .then(data => {
          setAnimationData(data);
          setIsLoaded(true);
        })
        .catch(err => console.error(`Failed to load animation for ${selectedProject.name}:`, err));
    }
  }, [selectedProject, isLoaded]);

  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };

  return (
    <div className="w-full flex flex-col items-center component-spacing mt-25">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-5 py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.4em] tracking-[-0.048em] text-[#191919]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            /Case Study/
          </motion.span>

          <div className="flex flex-col gap-5">
            <motion.h1
              key={selectedProject.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[40px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.2em] tracking-[-0.08em] text-[#191919]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {selectedProject.overview}
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-5"
            >
              {selectedProject.tagList.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-[14.67px] py-[7.33px] bg-[#E6E6E6] rounded-[14.67px] text-[12px] md:text-[14px] font-medium text-[#191919]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
        
        <section className="w-full px-6 md:px-10 lg:px-[164px] py-[72px] md:py-[80px] lg:py-[100px] 2xl:max-w-[1920px] 2xl:mx-auto bg-[#191919]">
        <div className="w-full flex flex-col gap-12 md:gap-16 lg:gap-20 xl:gap-[100px]">
          {/* First Section */}
          <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10">
            {/* Animation Container */}
            <div className="w-full flex flex-col gap-5 justify-center">
              <div className="w-full h-[300px] md:h-[500px] lg:h-[700px] xl:h-[946.85px] relative overflow-hidden">
                {isLoaded && animationData ? (
                  <motion.div
                    key={selectedProject.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    <Lottie
                      lottieRef={lottieRef}
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full rounded-[17.598px]"
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
              </div>
            </div>

            {/* Heading Wrapper */}
            <div className="w-full flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-[200px]">
              {/* Left Column */}
              <div className="w-full md:w-auto lg:w-[300px] flex flex-row pt-[15px]">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <motion.span
                      key={`discover-${selectedProject.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.4em] tracking-[-0.02em]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      {selectedProject.discoverLabel}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col justify-center gap-8 md:gap-12 lg:gap-16">
                {/* Heading */}
             { selectedProject.heading && (
               <div className="flex flex-col">
                  <motion.h2
                    key={`heading-${selectedProject.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] mt-4 md:mt-6 lg:mt-10 leading-[1.2em] tracking-[-0.04167em]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    {selectedProject.heading}
                  </motion.h2>
                  </div>
               )
             }

                {/* Description */}
                { selectedProject.description && (
                    <div className="w-full max-w-full lg:max-w-[660px] flex flex-col">
                  <motion.p
                    key={`description-${selectedProject.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4em] tracking-[-0.02em]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    {selectedProject.description}
                  </motion.p>
                </div>
                )
              }
                {/* All Projects Link */}
            { selectedProject.linkText && (
                <motion.div
                  key={`link-${selectedProject.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-row items-center gap-2 pb-1 relative"
                >
                  <span
                    className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4em] tracking-[-0.02em]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    {selectedProject.linkText}
                  </span>
                  <div className="w-4 h-4 md:w-5 md:h-5">
                    <Image src="/arrow.svg" alt="arrow" width={14} height={14} />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full md:w-[129px] h-[1px] bg-white"></div>
                </motion.div>
              )
            }
                {/* Services Wrapper */}
                <div className="flex flex-col">
                  {/* Client */}
                  <div className="flex flex-col py-4 md:py-5 lg:py-6 relative">
                    <div className="flex flex-row justify-between items-center gap-4 md:gap-8 lg:gap-[140px]">
                      <div className="w-auto md:w-[120px] lg:w-[140px] flex flex-col justify-center flex-shrink-0">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.09375em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: '#FFFFFF'
                          }}
                        >
                          Client
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.0625em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {selectedProject.client}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full lg:w-[900px] h-[1px] border-b border-[rgba(151,151,151,0.2)]"></div>
                  </div>

                  {/* Industry */}
                  <div className="flex flex-col py-4 md:py-5 lg:py-6 relative">
                    <div className="flex flex-row justify-between items-center gap-4 md:gap-8 lg:gap-[140px]">
                      <div className="w-auto md:w-[120px] lg:w-[140px] flex flex-col justify-center flex-shrink-0">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.09375em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: '#FFFFFF'
                          }}
                        >
                          Industry
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.0625em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {selectedProject.industry}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full lg:w-[900px] h-[1px] border-b border-[rgba(151,151,151,0.2)]"></div>
                  </div>

                  {/* Year */}
                  <div className="flex flex-col py-4 md:py-5 lg:py-6 relative">
                    <div className="flex flex-row justify-between items-center gap-4 md:gap-8 lg:gap-[140px]">
                      <div className="w-auto md:w-[120px] lg:w-[140px] flex flex-col justify-center flex-shrink-0">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.09375em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: '#FFFFFF'
                          }}
                        >
                          Year
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.0625em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {selectedProject.year}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full lg:w-[900px] h-[1px] border-b border-[rgba(151,151,151,0.2)]"></div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-col py-4 md:py-5 lg:py-6 relative">
                    <div className="flex flex-row justify-between items-center gap-4 md:gap-8 lg:gap-[140px]">
                      <div className="w-auto md:w-[120px] lg:w-[140px] flex flex-col justify-center flex-shrink-0">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.09375em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: '#FFFFFF'
                          }}
                        >
                          Services
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.0625em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {selectedProject.services}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full lg:w-[900px] h-[1px] border-b border-[rgba(151,151,151,0.2)]"></div>
                  </div>
                      <div className="flex flex-col gap-4 jutify-end items-end mt-10">
                        <span
                          className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.4em] tracking-[-0.0625em]"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          Project still WIP
                        </span>
                        <Image src="/stoll.svg" alt="info" width={60} height={60} />
                      </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
      </div>
      <div className='mb-25'>
      <Start onSmoothScroll={onSmoothScroll} />
      </div>
    </div>
  );
}

export default function CaseStudyPage() {
  return (
    <Suspense fallback={
      <div className="w-full flex flex-col items-center component-spacing mt-25 min-h-screen justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <CaseStudyContent />
    </Suspense>
  );
}
