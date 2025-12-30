'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from '../animations/components/RevealText';
import MagneticButton from '../animations/components/MagneticButton';
import { Plus } from 'lucide-react';

export default function WhatWeDo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    { num: '01', title: 'Research', desc: 'We transform complex user needs into intuitive, elegant solutions that solve real business challenges and create meaningful interactions between people and technology.' },
    { num: '02', title: 'Product Design', desc: 'We transform complex user needs into intuitive, elegant solutions that solve real business challenges and create meaningful interactions between people and technology.' },
    { num: '03', title: 'Web Development', desc: 'Our branding process goes beyond visual identity, crafting comprehensive narratives that capture your unique essence and create lasting emotional connections with your audience.' },
    { num: '04', title: 'Mobile Development', desc: 'We bring ideas to life through dynamic, engaging animations that communicate complex concepts with clarity, creativity, and visual storytelling.' },
    { num: '05', title: 'MVP Development', desc: 'Our development approach combines technical excellence with strategic thinking, building robust digital solutions that are scalable, performant, and aligned with your business objectives.' },
  ];

  return (
    <section id="toolkit" className="w-full flex flex-col items-center py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto bg-white">
      <div className="w-full flex flex-col gap-10 md:gap-14 lg:gap-20">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
          <div className="flex flex-col w-full md:w-auto">
            <RevealText
              as="h2"
              // animation="slideUp"
              splitBy="words"
              duration={0.8}
              stagger={0.04}
              className="text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.1em] tracking-[-0.06em] text-[#191919] w-full md:w-full lg:w-[703px] mb-0"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              This is how we help ambitious companies succeed.
            </RevealText>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-[272px] flex flex-col items-start md:items-end pt-[15px]"
          >
            <span className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#0C120C]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              /WHAT WE DO/
            </span>
          </motion.div>
        </div>

        <div className="w-full flex flex-col">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.06,
                ease: [0.32, 0.72, 0, 1]
              }}
              className="w-full flex flex-col py-6 border-b border-gray-200 cursor-pointer overflow-hidden"
              onMouseEnter={(e) => {
                e.preventDefault();
                setHoveredIndex(idx);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                setHoveredIndex(null);
              }}
            >
              <motion.div
                animate={{
                  x: hoveredIndex === idx ? 12 : 0,
                  backgroundColor: hoveredIndex === idx ? 'rgba(0,0,0,0.02)' : 'transparent',
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1]
                }}
                className="w-full flex flex-col gap-4 p-4 -m-4 rounded-xl"
              >
                <div className="w-full flex justify-between items-center gap-4">
                  <div className="flex items-center gap-6 md:gap-12 lg:gap-24">
                    <motion.div
                      className="w-12 md:w-16 lg:w-20 flex flex-col justify-center"
                      animate={{
                        opacity: hoveredIndex === idx ? 1 : 0.6,
                        scale: hoveredIndex === idx ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                    >
                      <span className="text-[24px] md:text-[30px] lg:text-[36px] font-medium leading-[1em] tracking-[-0.083em] text-[#191919]" style={{ fontFamily: 'Onest, sans-serif' }}>
                        {service.num}
                      </span>
                    </motion.div>
                    <h3 className="text-[32px] md:text-[40px] lg:text-[48px] font-normal leading-[1.4em] tracking-[-0.0625em] text-[#191919]" style={{ fontFamily: 'Geist, sans-serif' }}>
                      {service.title}
                    </h3>
                  </div>
                  <MagneticButton
                    strength={0.4}
                    radius={60}
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {/* <motion.svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      animate={{
                        x: hoveredIndex === idx ? 5 : 0,
                        rotate: hoveredIndex === idx ? 0 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M15 12L25 20L15 28" stroke="currentColor" strokeWidth="2" />
                    </motion.svg> */}
                    <Plus />
                  </MagneticButton>
                </div>

                {/* Expandable description */}
                <AnimatePresence mode="wait">
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1],
                        opacity: { duration: 0.25 }
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.05,
                          ease: [0.32, 0.72, 0, 1]
                        }}
                        className="text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.5em] tracking-[-0.02em] text-[#191919]/60 max-w-[600px] pl-[72px] md:pl-[112px] lg:pl-[176px]"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {service.desc}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
