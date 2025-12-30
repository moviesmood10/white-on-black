'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import MagneticButton from '../animations/components/MagneticButton';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Parallax effect on footer background
    gsap.to(footerRef.current, {
      backgroundPositionY: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const socialLinks = ['Twitter', 'Instagram', 'LinkedIn'];
  const navLinks = [
    { href: '/work', label: 'Our works' },
    { href: '/about', label: 'About' },
    { href: '/toolkit', label: 'Toolkit' },
    { href: '/research', label: 'Research' },
  ];
  return (
    <footer
      ref={footerRef}
      className="w-full flex flex-col items-center px-6 md:px-12 lg:px-16 pt-16 pb-4 bg-black text-white 2xl:max-w-[1920px] 2xl:mx-auto"
    >
      <div className="w-full max-w-[1433px] flex flex-col gap-16 md:gap-24 lg:gap-[199px]">
        {/* Top Section */}
        <div className="w-full flex flex-col gap-10 md:gap-16 lg:gap-[63px]">
          {/* Content and Email Row */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-0">
            {/* Left: Content Stack */}
            <div className="flex flex-col gap-8 md:gap-10 w-full lg:w-[573px]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <RevealText
                  as="h3"
                  // animation="slideUp"
                  splitBy="chars"
                  duration={0.8}
                  stagger={0.02}
                  className="text-[48px] md:text-[64px] lg:text-[72px] font-semibold leading-[1.1em] tracking-[-0.07em] text-white font-manrope"
                >
                  WhiteonBlack
                </RevealText>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[16px] md:text-[18px] lg:text-[20px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/70 font-manrope"
              >
                We help businesses succeed in the digital space by creating thoughtful solutions that combine smart design, reliable technology, and a deep understanding of what your users really need.
              </motion.p>
            </div>

            {/* Right: Email Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-1 w-full lg:w-[388px]"
            >
              <span className="text-[16px] md:text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/70 font-manrope">
                You can also email us at:
              </span>
              <MagneticButton
                as="a"
                href="mailto:wearewob@gmail.com"
                strength={0.2}
                radius={200}
                className="text-[28px] md:text-[36px] lg:text-[40px] font-semibold leading-[1.2em] tracking-[-0.07em] text-white group inline-block font-manrope py-[3.5px]"
              >
                <span className="hover-underline">wearewob@gmail.com</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Links Section: Socials and Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8"
          >
            {/* Social Links */}
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              {socialLinks.map((social, idx) => (
                <MagneticButton
                  key={idx}
                  as="a"
                  href={`#${social.toLowerCase()}`}
                  strength={0.3}
                  radius={80}
                  className="text-[16px] md:text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white group font-manrope"
                >
                  <span className="hover-underline">{social}</span>
                </MagneticButton>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              {navLinks.map((link, idx) => (
                <MagneticButton
                  key={idx}
                  as="a"
                  href={link.href}
                  strength={0.3}
                  radius={80}
                  className="text-[16px] md:text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-white group font-manrope"
                >
                  <span className="hover-underline">{link.label}</span>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 opacity-70"
        >
          <p className="text-[14px] md:text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-white font-onest">
            @2025 WhiteonBlack, All Rights Reserved
          </p>
          <div className="flex items-center gap-4 md:gap-5 flex-wrap">
            <motion.a
              whileHover={{ y: -2, opacity: 1 }}
              href="#privacy"
              className="text-[14px] md:text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-white hover-underline font-onest"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              whileHover={{ y: -2, opacity: 1 }}
              href="#terms"
              className="text-[14px] md:text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-white hover-underline font-onest"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
