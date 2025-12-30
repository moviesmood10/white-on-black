'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import MagneticButton from '../animations/components/MagneticButton';
import { useSmoothScroll } from '../animations/providers/SmoothScrollProvider';

interface NavigationProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

export default function Navigation({ onSmoothScroll }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const { stop, start } = useSmoothScroll();
  const router = useRouter();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      stop();
      document.body.style.overflow = 'hidden';
    } else {
      start();
      document.body.style.overflow = 'unset';
    }
    return () => {
      start();
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, stop, start]);

  // Hide/show on scroll
  useEffect(() => {
    // Initialize scroll position and ensure nav is visible on mount
    const initialScrollY = window.scrollY || 0;
    lastScrollY.current = initialScrollY;
    setHasScrolled(initialScrollY > 50);
    setIsHidden(false); // Always visible on initial load

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if page has scrolled at all
      setHasScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      // Only hide if scrolling down and past 100px
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY <= 100 || currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    // Use a small delay to ensure DOM is ready and prevent initial scroll events from interfering
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    onSmoothScroll(e, targetId);
    setIsMenuOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a route (starts with /), use Next.js router
    if (href.startsWith('/')) {
      e.preventDefault();
      router.push(href);
    } else {
      // If it's a hash anchor (starts with #), use smooth scroll
      onSmoothScroll(e, href);
    }
  };

  const navLinks = [
    { href: '/work', label: 'Our works' },
    { href: '/about', label: 'About' },
    { href: '/toolkit', label: 'Toolkit' },
    { href: '/research', label: 'Research' },
  ];

  return (
    <>
    <motion.nav
      ref={navRef}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`w-full flex justify-stretch items-stretch px-6 py-6 md:px-10 lg:px-16 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="w-full flex justify-between items-center gap-2.5 lg:justify-center">
        {/* Mobile & Tablet: Logo only */}
        <motion.div
          className="flex items-center gap-4 lg:hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-[62.23px] h-[20.8px]">
            <img src="/logo.svg" alt="logo" width={62.23} height={20.8} />
          </div>
          <div className="w-px h-7 bg-[#191919]"></div>
          <span className="text-[20px] font-normal leading-[1.4em] tracking-[-0.048em] text-[#191919]">Studio</span>
        </motion.div>

        {/* Desktop: Full navigation */}
        <div className="hidden lg:flex items-center gap-5 flex-1">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
              className="px-4 py-2 rounded-lg text-[12px] font-normal leading-[1.5em] tracking-[-0.04em] text-[#191919] hover:bg-gray-100 hover-underline relative"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="hidden lg:block"
        >
          <MagneticButton
            strength={0.25}
            radius={100}
            onClick={(e) => handleMenuClick(e as React.MouseEvent<HTMLButtonElement>, '#book-call')}
            className="px-4 py-2 bg-[#191919] text-[#FAF6F2] text-[12px] font-normal leading-[1.5em] tracking-[-0.04em] rounded-xl hover:opacity-90 transition-opacity"
          >
            Book a discovery call
          </MagneticButton>
        </motion.div>

        {/* Center Logo - Desktop */}
        <motion.div
          className="hidden lg:flex flex-row absolute left-1/2 transform -translate-x-1/2 items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MagneticButton
            as="a"
            href="/"
            strength={0.2}
            radius={80}
            className="flex flex-row items-center gap-4"
          >
            <div className="w-[62.23px] h-[20.8px]">
              <img src="/logo.svg" alt="logo" width={62.23} height={20.8} />
            </div>
            <div className="w-px ml-2 h-7 bg-[#191919]"></div>
            <span className="text-[20px] ml-4 font-normal leading-[1.4em] tracking-[-0.048em] text-[#191919]">Studio</span>
          </MagneticButton>
        </motion.div>

        {/* Mobile & Tablet: Hamburger menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-[43px] h-[32px] flex flex-col justify-center gap-2 z-50 relative"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <motion.div
            className="w-[40px] h-[3px] bg-[#0C120C] origin-center"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 9 : 0
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="w-[28px] h-[3px] bg-[#0C120C] ml-[12px]"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              x: isMenuOpen ? 20 : 0
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="w-[34px] h-[3px] bg-[#0C120C] ml-[6px] origin-center"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -9 : 0,
              width: isMenuOpen ? 40 : 34,
              marginLeft: isMenuOpen ? 0 : 6
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
      </div>
    </motion.nav>

      {/* Mobile & Tablet Menu Overlay - Outside nav to avoid transform containment */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-[70] lg:hidden overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-[#191919]/10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <img src="/logo.svg" alt="logo" width={50} height={17} />
                    <div className="w-px h-5 bg-[#191919]/30"></div>
                    <span className="text-[16px] font-normal tracking-[-0.04em] text-[#191919]">Studio</span>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#191919]/5 hover:bg-[#191919]/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8 overflow-y-auto">
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((item, idx) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          if (item.href.startsWith('/')) {
                            e.preventDefault();
                            router.push(item.href);
                            setIsMenuOpen(false);
                          } else {
                            handleMenuClick(e, item.href);
                          }
                        }}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          delay: 0.15 + idx * 0.08,
                          duration: 0.4,
                          ease: [0.32, 0.72, 0, 1]
                        }}
                        className="group flex items-center justify-between py-4 px-4 text-[20px] font-medium leading-[1.3em] tracking-[-0.02em] text-[#191919] hover:bg-[#191919]/5 rounded-xl transition-all duration-200"
                      >
                        <span>{item.label}</span>
                        <svg
                          className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                {/* Drawer Footer with CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="px-6 py-6 border-t border-[#191919]/10 bg-white/50"
                >
                  <button
                    onClick={(e) => handleMenuClick(e, '#book-call')}
                    className="w-full px-6 py-4 bg-[#191919] text-[#FAF6F2] text-[16px] font-medium leading-[1.5em] tracking-[-0.02em] rounded-2xl hover:bg-[#191919]/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#191919]/20"
                  >
                    Book a discovery call
                  </button>
                  <p className="text-center text-[12px] text-[#191919]/50 mt-4">
                    Let&apos;s create something amazing together
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
