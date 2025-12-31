'use client';

import { motion } from 'framer-motion';
import Start from '../components/Start';
import { handleSmoothScroll } from '../utils/smoothScroll';
import Image from 'next/image';

const projects = [
  {
    name: 'RENI AI',
    tags: '/ AI / PRODUCT DESIGN /',
    image: '/bottle.jpg',
  },
  {
    name: 'ENVOYX',
    tags: '/ FINTECH / AI / PRODUCT DESIGN / MVP DEV / ',
    image: '/bottle.jpg',
  },
  {
    name: 'ARLENZ',
    tags: '/ FINTECH / AI / PRODUCT DESIGN /',
    image: '/bottle.jpg',
  },
  {
    name: 'WAGA',
    tags: '/ REAL ESTATE / PRODUCT DESIGN / MVP DEV / ',
    image: '/bottle.jpg',
  },
];
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

export default function CaseStudyPage() {
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[40px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.2em] tracking-[-0.08em] text-[#191919]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Invoice financing infrastructure for SMEs
            </motion.h1>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-5"
            >
              {['Product Design', 'MVP Development', 'Landing Page'].map((tag, idx) => (
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
            {/* Image Container */}
            <div className="w-full flex flex-col gap-5 justify-center">
              <div className="w-full h-[300px] md:h-[500px] lg:h-[700px] xl:h-[946.85px] relative overflow-hidden">
                <Image
                  src="/envoyx.png"
                  alt="Project image"
                  fill
                  className="object-contain rounded-[17.598px]"
                />
              </div>
            </div>

            {/* Heading Wrapper */}
            <div className="w-full flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-[200px]">
              {/* Left Column */}
              <div className="w-full md:w-auto lg:w-[300px] flex flex-row pt-[15px]">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span
                      className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.4em] tracking-[-0.02em]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      Discover
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col justify-center gap-8 md:gap-12 lg:gap-16">
                {/* Heading */}
                <div className="flex flex-col">
                  <h2
                    className="text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] mt-4 md:mt-6 lg:mt-10 leading-[1.2em] tracking-[-0.04167em]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    Understanding the Needs of Today's Online Shoppers
                  </h2>
                </div>

                {/* Description */}
                <div className="w-full max-w-full lg:max-w-[660px] flex flex-col">
                  <p
                    className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4em] tracking-[-0.02em]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    Dive into our diverse collection of innovative projects, where creativity meets cutting-edge technology to solve real-world challenges.
                  </p>
                </div>

                {/* All Projects Link */}
                <div className="flex flex-row items-center gap-2 pb-1 relative">
                  <span
                    className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4em] tracking-[-0.02em]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      color: '#FFFFFF'
                    }}
                  >
                    All projects
                  </span>
                  <div className="w-4 h-4 md:w-5 md:h-5">
                    <Image src="/arrow.svg" alt="arrow" width={14} height={14} />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full md:w-[129px] h-[1px] bg-white"></div>
                </div>

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
                          Arlenz
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
                          Fintech
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
                          2025
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
                          Product Design
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full lg:w-[900px] h-[1px] border-b border-[rgba(151,151,151,0.2)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="w-full flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-[200px]">
            {/* Heading Wrapper */}
            <div className="w-full flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-[200px]">
              {/* Left Column */}
              <div className="w-full md:w-auto lg:w-[300px] flex flex-row pt-[15px]">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span
                      className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.4em] tracking-[-0.02em]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      Section Title
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col justify-center gap-8 md:gap-12 lg:gap-16 w-full ">
                {/* Heading */}
                <div className="flex flex-col">
                  <h2
                    className="text-[28px] md:text-[36px] lg:text-[42px] xl:text-[48px] leading-[1.2em] tracking-[-0.04167em]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    Whether it's a website, an app, or a complete brand identity - we create work that works.
                  </h2>
                </div>

                {/* Description */}
                <div className="w-full flex flex-col">
                  <p
                    className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4em] tracking-[-0.02em]"
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}
                  >
                    Dive into our diverse collection of innovative projects, where creativity meets cutting-edge technology to solve real-world challenges.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="w-full flex flex-col sm:flex-row justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-24">
                  {/* Stat 1 */}
                  <div className="w-full sm:w-auto sm:min-w-[180px] md:w-[200px] lg:w-[236px] flex flex-col gap-2 md:gap-[11px]">
                    <div className="flex flex-row items-center gap-1">
                      <span
                        className="text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.2em] tracking-[-0.024em]"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        95
                      </span>
                      <span
                        className="text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.2em] tracking-[-0.024em]"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        %
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.4em] tracking-[-0.02em]"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        Client retention
                      </span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="w-full sm:w-auto sm:min-w-[180px] md:w-[200px] lg:w-[236px] flex flex-col gap-2 md:gap-[11px]">
                    <div className="flex flex-row items-center gap-1">
                      <span
                        className="text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.2em] tracking-[-0.024em]"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        95
                      </span>
                      <span
                        className="text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.2em] tracking-[-0.024em]"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        %
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.4em] tracking-[-0.02em]"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        Client retention
                      </span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="w-full sm:w-auto sm:min-w-[180px] md:w-[200px] lg:w-[236px] flex flex-col gap-2 md:gap-[11px]">
                    <div className="flex flex-row items-center gap-1">
                      <span
                        className="text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.2em] tracking-[-0.024em]"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        95
                      </span>
                      <span
                        className="text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.2em] tracking-[-0.024em]"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          color: '#FFFFFF'
                        }}
                      >
                        %
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.4em] tracking-[-0.02em]"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          color: 'rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        Client retention
                      </span>
                    </div>
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
