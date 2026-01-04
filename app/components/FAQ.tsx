'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { gsap } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import MagneticButton from '../animations/components/MagneticButton';

interface FAQProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How are you different from a typical agency?',
    answer: 'We don’t just take briefs and deliver outputs. We work alongside founders, challenge assumptions, and stay involved from discovery through launch and optimisation.'
  },
  {
    question: 'What stage do we need to be at to work with you?',
    answer: 'You can come with a rough idea, an early concept, or an existing product that needs clarity, traction, or improvement, we help you figure out the next best move.'
  },
  {
    question: 'How does your pricing or engagement work?',
    answer: 'We tailor our work to your needs, whether it’s a short MVP sprint, ongoing product design, or full development support. We\'ve got different model to support Young_Serif.'
  },
  {
    question: 'Do you only build MVPs?',
    answer: 'No. We help validate ideas, design and build products, and then optimise them based on real user behaviour and business goals.'
  },
  {
    question: 'Can you help if I’m not technical?',
    answer: 'Absolutely. We handle the tech, the strategy, and the design, so you can focus on your vision and business goals. See us as your technical partner.'
  },
  {
    question: 'Can you help if I’m not technical?',
    answer: 'Absolutely. We handle the tech, the strategy, and the design, so you can focus on your vision and business goals. See us as your technical partner.'
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes! We can continue supporting you after launch, depending on what works best for your team and your goals.'
  },
  {
    question: 'Can you work with our existing systems and team?',
    answer: 'Absolutely. We start with a clear assessment of your current setup and adapt to fit seamlessly with your team or systems, only adding what’s needed to move things forward.'
  }
];

export default function FAQ({ onSmoothScroll }: FAQProps) {
  const router = useRouter();
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleFAQClick = (idx: number) => {
    if (openFAQIndex === idx) {
      setOpenFAQIndex(null);
    } else {
      setOpenFAQIndex(idx);
    }
  };

  return (
    <section className="w-full flex flex-col items-center bg-white py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
      <div className="w-full flex flex-col gap-2.5 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-[272px] pt-[15px]"
        >
          <span className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#0C120C]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            /FAQ/
          </span>
        </motion.div>

        <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center gap-10 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-center gap-2.5">
            <RevealText
              as="h2"
              // animation="slideUp"
              splitBy="words"
              duration={0.8}
              stagger={0.04}
              className="text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.1em] tracking-[-0.06em] text-[#191919]"
              style={{ fontFamily: 'Manrope, serif' }}
            >
              Your questions <span className='opacity-50'>answered.</span>
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onClick={(e) => { e.preventDefault(); onSmoothScroll(e as unknown as React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, '#book-call'); }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] font-normal leading-[1.4em] tracking-[-0.02em] text-[#191919]/60 text-center w-full md:w-full lg:w-[484px]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              Everything you need to know about working with us. Still have questions? Book a free call and we'll walk you through it.
            </motion.p>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:flex-wrap lg:items-start gap-4 md:gap-5">
            {faqData.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.32, 0.72, 0, 1] }}
                className={`w-full lg:w-[calc(50%-10px)] lg:self-start rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFAQIndex === idx ? 'bg-[#F5F5F5] shadow-sm' : 'bg-[#F5F5F5]'
                }`}
              >
                <motion.button
                  onClick={() => handleFAQClick(idx)}
                  whileHover={{ backgroundColor: openFAQIndex === idx ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.03)' }}
                  className="w-full p-5 md:p-6 flex items-center justify-between gap-2.5 text-left"
                  aria-expanded={openFAQIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <motion.h4
                    animate={{
                      color: openFAQIndex === idx ? '#191919' : 'rgba(25, 25, 25, 0.8)',
                    }}
                    className="text-[16px] md:text-[18px] font-normal leading-[1.5em] tracking-[-0.04em] flex-1"
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  >
                    {faq.question}
                  </motion.h4>
                  <motion.div
                    animate={{
                      rotate: openFAQIndex === idx ? 45 : 0,
                      scale: openFAQIndex === idx ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0 opacity-60"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFAQIndex === idx && (
                    <motion.div
                      ref={(el) => { contentRefs.current[idx] = el; }}
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
                        className="px-5 md:px-6 pb-5 md:pb-6 pt-0"
                      >
                        <p className="text-[14px] md:text-[16px] font-normal leading-[1.6em] tracking-[-0.04em] text-[#191919]/80" style={{ fontFamily: 'Geist, sans-serif' }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MagneticButton
              as="a"
              href="/research"
              strength={0.35}
              radius={150}
              onClick={(e) => {
                e.preventDefault();
                router.push('/research');
              }}
              className="flex border-b border-[#191919] hover-underline items-center gap-3 text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-[1.4em] tracking-[-0.04em] text-[#191919] group"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <span className="">Contact us</span>
            <img src="/arrow.svg" alt="arrow" className="w-4 h-4" style={{ filter: 'brightness(0)' }} width={12} height={12} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
