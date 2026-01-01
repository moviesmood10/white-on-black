'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import CountUp from '../animations/components/CountUp';
import InfiniteMarquee from '../animations/components/InfiniteMarquee';
import MagneticButton from '../animations/components/MagneticButton';
import Image from 'next/image';

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    // Parallax effect on gradient box
    gsap.to(gradientRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: gradientRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const stats = [
    { value: 9.7, prefix: '$', suffix: 'm', label: "Raised by founders we've collaborated with" },
    { value: 8, suffix: ' weeks', label: 'Delivery timeline for your GTM ready product' },
    { value: 20, suffix: '+', label: 'Collaboration with founders & startups across the globe' },
  ];

  const logos = ['/folklore.svg', '/envoyx.svg', '/clarus.svg', '/reni.svg', '/cavalo.svg', '/arlenz.svg', '/fab.svg'];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full flex flex-col items-center bg-white overflow-hidden py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto"
    >
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full pt-[15px]"
        >
          <span
            className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#0C120C]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            /WHO WE ARE/
          </span>
        </motion.div>

        <div className="w-full pl-0 md:pl-6 lg:pl-10 flex flex-col items-center gap-10 md:gap-14 lg:gap-20 max-w-[1070px]">
          <div className="w-full flex flex-col md:flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-[100px]">
            <RevealText
              as="h2"
              // animation="slideUp"
              // splitBy="lines"
              duration={0.8}
              stagger={0.1}
              className="text-[40px] md:text-[48px] lg:text-[56px] font-normal leading-[1.1em] tracking-[-0.06em] text-[#191919] w-full md:w-full lg:w-[501px]"
              style={{ fontFamily: 'Manrope, serif' }}
            >
              We're not your <span className='opacity-50'>typical</span> digital agency.
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-normal leading-[1.4em] tracking-[-0.02em] text-[#191919] flex-1 w-full"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              We do what most agencies won't do for you. We don't just design or build but collaborate with your from discovery, optimising your ideas through getting a tested market ready product. Run by builder who has failed more than they've succeeded.
            </motion.p>
          </div>

          {/* Stats Section */}
          <div className="w-full flex flex-col gap-10 md:gap-12 lg:gap-16">
            <motion.div
              ref={gradientRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-auto md:h-auto lg:h-[389px] relative rounded-[28px] overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/who.png)' }}
            >
              <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 p-6 md:p-10 lg:p-16">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="flex-1 flex flex-col gap-4 p-6 bg-white/32 backdrop-blur-[24px] rounded-[28px] w-full md:w-auto transition-shadow hover:shadow-xl items-center"
                  >
                    <h3
                      className="text-[48px] md:text-[56px] lg:text-[70px] font-normal leading-[1.1em] tracking-[-0.07em] text-white text-center"
                      style={{ fontFamily: 'Halant, serif' }}
                    >
                      <CountUp
                        end={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2}
                        decimals={stat.prefix === '$' ? 1 : 0}
                      />
                    </h3>
                    <p
                      className="max-w-[200px] text-sm font-normal leading-[1.4em] tracking-[-0.02em] text-white/90 text-center mx-auto"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Logo Marquee */}
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[14px] min-w-[185px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919] w-full md:w-[185px] flex-shrink-0"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                Trusted by fast rising founders and startups across the globe
              </motion.p>

              <div className="w-full overflow-hidden">
                <InfiniteMarquee speed={40} pauseOnHover>
                  {logos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="h-[32px] w-[100px] md:w-[120px] mx-4 md:mx-6 rounded-lg flex items-center justify-center font-medium transition-colors"
                    >
                      <Image src={logo} alt={`Logo ${idx + 1}`} width={120} height={32} />
                    </div>
                  ))}
                </InfiniteMarquee>
              </div>
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="w-full bg-[#E6E6E6] rounded-[28px] p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex-1 flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4
                    className="text-[20px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919]"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                    Join our builder residency program
                  </h4>
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-2.5 py-1 text-[#191919] bg-white text-[12px] font-normal leading-[1.5em] tracking-[-0.04em] rounded-lg"
                  >
                    Coming soon
                  </motion.span>
                </div>
                <p
                  className="text-[14px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919]/60 w-full md:w-[605px]"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  An unconventional program where we support professionals from zero idea to a ready to market within 8-weeks all the support you need from our amazing networks.
                </p>
              </div>
              <MagneticButton
                strength={0.3}
                radius={100}
                className="px-4 py-2 bg-[#191919] text-white text-[14px] font-normal leading-[1.5em] tracking-[-0.04em] rounded-xl hover:opacity-90 w-full md:w-auto transition-opacity"
              >
                Get Notified
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
