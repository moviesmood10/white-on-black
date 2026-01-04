'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import MagneticButton from '../animations/components/MagneticButton';

interface OurProcessProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

export default function OurProcess({ onSmoothScroll }: OurProcessProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const steps = [
    { num: '01', title: 'Discover', desc: 'We analyze your workflows and identify where automation creates the most value for your business.', image: '/flower3.jpg' },
    { num: '02', title: 'Design', desc: 'We create intuitive interfaces and seamless user experiences tailored to your specific needs.', image: '/flower2.png' },
    { num: '03', title: 'Build', desc: 'We develop robust, scalable solutions using cutting-edge technologies and best practices.', image: '/flower.png' },
    { num: '04', title: 'Optimize', desc: 'We continuously improve and refine your product based on user feedback and performance data.', image: '/floewr1.png' },
  ];

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Disable scroll-driven animations on mobile
    if (isMobile) return;

    // Scroll-driven step activation
    steps.forEach((_, idx) => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `${(idx / steps.length) * 100}% center`,
        end: `${((idx + 1) / steps.length) * 100}% center`,
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      });
    });

    // Parallax on image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="research" className="w-full flex flex-col items-center py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto bg-white">
      <div className="w-full flex flex-col gap-2.5">
        {isMobile ? (
          <div className="w-full md:w-[272px] pt-[15px]">
            <span className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#191919]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              /OUR PROCESS/
            </span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-[272px] pt-[15px]"
          >
            <span className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#191919]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              /OUR PROCESS/
            </span>
          </motion.div>
        )}

        <div className="w-full flex justify-center items-end gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-16 w-full">
            <div className="flex flex-col items-center gap-6">
              {isMobile ? (
                <h2
                  className="text-[40px] font-bold md:text-[48px] lg:text-[56px] font-normal leading-[1.1em] tracking-[-0.06em] text-[#2B180A] text-center w-full md:w-full lg:w-[734px]"
                  style={{ fontFamily: 'Manrope, serif' }}
                >
                  A proven path from idea to impact
                </h2>
              ) : (
                <RevealText
                  as="h2"
                  // animation="slideUp"
                  splitBy="words"
                  duration={0.8}
                  stagger={0.04}
                  className="text-[40px] font-bold md:text-[48px] lg:text-[56px] font-normal leading-[1.1em] tracking-[-0.06em] text-[#2B180A] text-center w-full md:w-full"
                  style={{ fontFamily: 'Manrope, serif' }}
                >
                  A proven path from idea to impact
                </RevealText>
              )}
              {isMobile ? (
                <p
                  className="text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.4em] tracking-[-0.0356em] text-[#191919]/60 text-center w-full md:w-full lg:w-[600px]"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  From identifying opportunities to building systems and training your team—we manage the entire process while you focus on running your business.
                </p>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.4em] tracking-[-0.0356em] text-[#191919]/60 text-center w-full md:w-full lg:w-[600px]"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  From identifying opportunities to building systems and training your team—we manage the entire process while you focus on running your business.
                </motion.p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 max-w-[1070px] mx-auto">
              <div className="flex flex-col justify-center gap-4 w-full md:w-[400px] lg:w-[560px]">
                {steps.map((step, idx) => {
                  const MotionWrapper = isMobile ? 'div' : motion.div;
                  const MotionInner = isMobile ? 'div' : motion.div;
                  const MotionSpan = isMobile ? 'span' : motion.span;
                  const MotionIndicator = isMobile ? 'div' : motion.div;
                  
                  return (
                    <MotionWrapper
                      key={idx}
                      {...(isMobile ? {} : {
                        initial: { opacity: 0, x: -20 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true, amount: 0.3 },
                        transition: { duration: 0.5, delay: idx * 0.08, ease: [0.32, 0.72, 0, 1] }
                      })}
                      onClick={() => setActiveStep(idx)}
                      className={`w-full rounded-[24px] cursor-pointer transition-all duration-300 ${
                        activeStep === idx
                          ? 'bg-[#F5F5F5] p-6 shadow-sm'
                          : 'p-4 pl-4 pb-5 hover:bg-gray-50'
                      }`}
                    >
                      <MotionInner
                        className="flex items-stretch gap-3"
                        {...(isMobile ? {} : {
                          animate: {
                            scale: activeStep === idx ? 1.01 : 1,
                          },
                          transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
                        })}
                      >
                        <h4
                          className={`text-[32px] md:text-[40px] lg:text-[48px] font-normal leading-[1.283em] tracking-[-0.07em] flex-1 transition-colors duration-300 ${
                            activeStep === idx ? 'text-[#191919]' : 'text-[#191919]/60'
                          }`}
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {step.title}
                        </h4>
                        <div className="flex items-center">
                          <MotionSpan
                            {...(isMobile ? {} : {
                              animate: {
                                opacity: activeStep === idx ? 1 : 0.5,
                                scale: activeStep === idx ? 1.1 : 1,
                              }
                            })}
                            className={`text-[12px] font-normal leading-[1.5em] tracking-[-0.04em] transition-opacity transition-transform ${
                              activeStep === idx ? 'text-[#191919] opacity-100' : 'text-[#757575] opacity-50'
                            }`}
                            style={{ fontFamily: 'Geist, sans-serif' }}
                          >
                            {step.num}
                          </MotionSpan>
                        </div>
                      </MotionInner>

                      {/* Active step indicator line */}
                      {/* {activeStep === idx && (
                        <MotionIndicator
                          {...(isMobile ? {} : {
                            initial: { width: 0 },
                            animate: { width: '100%' },
                            exit: { width: 0 },
                            transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                          })}
                          className="h-0.5 bg-[#191919] mt-3 rounded-full"
                          style={isMobile ? { width: '100%' } : {}}
                        />
                      )} */}
                    </MotionWrapper>
                  );
                })}
              </div>

              {isMobile ? (
                <div className="flex flex-col justify-end gap-6 md:gap-8 w-full md:w-[320px] lg:w-[448px]">
                  <div
                    ref={imageRef}
                    className="w-full h-[250px] md:h-[280px] lg:h-[323.55px] rounded-[28px] relative overflow-hidden"
                  >
                    <img src={steps[activeStep].image} alt="process" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h5
                      className="text-[18px] md:text-[19px] lg:text-[20px] font-normal leading-[1.4em] tracking-[-0.02em] text-[#191919]"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {steps[activeStep].title}
                    </h5>
                    <p
                      className="text-[14px] md:text-[15px] lg:text-[16px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919]/60"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {steps[activeStep].desc}
                    </p>
                  </div>

                  <MagneticButton
                    as="a"
                    href="#book-call"
                    strength={0.3}
                    radius={100}
                    onClick={(e) => onSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, '#book-call')}
                    className="inline-flex items-center gap-1 text-[12px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919] group"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                   <img src="/arr.svg" alt="arrow" width={12} height={12} />
                    <span className="hover-underline">Book a free call</span>
                  </MagneticButton>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col justify-end gap-6 md:gap-8 w-full md:w-[320px] lg:w-[448px]"
                >
                  <motion.div
                    ref={imageRef}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-[250px] md:h-[280px] lg:h-[323.55px] rounded-[28px] relative overflow-hidden"
                  >
                    <img src={steps[activeStep].image} alt="process" className="w-full h-full object-cover" />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      className="flex flex-col gap-1"
                    >
                      <h5
                        className="text-[18px] md:text-[19px] lg:text-[20px] font-normal leading-[1.4em] tracking-[-0.02em] text-[#191919]"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {steps[activeStep].title}
                      </h5>
                      <p
                        className="text-[14px] md:text-[15px] lg:text-[16px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919]/60"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {steps[activeStep].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <MagneticButton
                    as="a"
                    href="#book-call"
                    strength={0.3}
                    radius={100}
                    onClick={(e) => onSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, '#book-call')}
                    className="inline-flex items-center gap-2 hover-underline text-[32px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919] group"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                   <img src="/arr.svg" alt="arrow" width={20} height={20} />
                    <span className="">Book a free discovery call</span>
                  </MagneticButton>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
