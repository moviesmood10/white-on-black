


'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import Image from 'next/image';
import { handleSmoothScroll } from '../utils/smoothScroll';
import WhoWeAre from '../components/WhoWeAre';
import Start from '../components/Start';
import FAQ from '../components/FAQ';
import BookCallForm from '../components/BookCallForm';
import SectionLabel from '../components/SectionLabel';
import ApproachCard from '../components/ApproachCard';
import OurProcess from '../components/OurProcess';

export default function WorkPage() {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax effect on scroll
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const heroContent = sectionRef.current?.querySelector('.hero-content');
          if (heroContent) {
            gsap.to(heroContent, {
              y: self.progress * 100,
              opacity: 1 - self.progress * 0.5,
              duration: 0,
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full mx-auto flex-col items-center bg-white overflow-x-hidden">
      <div className="w-full flex flex-col component-spacing mt-25">
        {/* Hero Section */}
        <section ref={sectionRef} className="w-full relative overflow-hidden bg-white py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
        {/* Hero Content */}
        <div className="hero-content w-full flex flex-col items-center">
          {/* Container - matches Figma layout_0QNMS7: column, gap: 80px */}
          <div className="w-full flex flex-col gap-20 self-stretch">
            {/* Heading Wrapper - matches Figma layout_HP7CB1 */}
            <div className="w-full self-stretch">
              <RevealText
                as="h1"
                // animation="slideUp"
                // splitBy="words"
                duration={0.9}
                stagger={0.04}
                className="text-[48px] md:text-[56px] lg:text-[72px] font-semibold leading-[1.2em] tracking-[-0.08em] text-[#191919] mb-0 font-manrope max-w-full lg:max-w-[983px]"
              >
                Excellence in designing & building software engineering since 2017.
              </RevealText>
            </div>

            {/* Image Grid - matches Figma layout_5PZ1BO: row, gap: 64px, self-stretch */}
            <div className="w-full flex flex-col lg:flex-row gap-16 self-stretch">
              {/* Image - matches Figma: 864px width, 967.16px height, borderRadius 12px, top: -80px */}
              <div className="w-full lg:w-1/2 rounded-[12px] relative overflow-hidden aspect-square lg:aspect-[864/967.16]">
                <Image
                  src="/ifun.jpg"
                  alt="Two women laughing at work"
                  fill
                  className="object-cover rounded-[12px] lg:object-[center_top] lg:translate-y-[-50px]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Stack - matches Figma layout_B60ELZ: column, justify-center, gap: 64px */}
              <div className="w-full lg:w-1/2 flex flex-col justify-start gap-16">
                {/* Frame 1707479456 - matches Figma layout_KV9A6S: column, justify-center, gap: 48px, padding: 6.889999866485596px 0px */}
                <div className="flex flex-col justify-center gap-12 self-stretch pt-[6.89px]">
                  <RevealText
                    as="p"
                    animation="fadeUp"
                    splitBy="words"
                    duration={0.7}
                    stagger={0.02}
                    delay={0.3}
                    className="text-[24px] md:text-[32px] lg:text-[40px] font-normal leading-[1.1em] tracking-[-0.084em] text-[#191919]"
                  >
                    Our one single goal at WhiteonBlack is to help our clients grow using technology. Whether is turning their ideas into market ready product, using evolving technologies to improve workflows and addressing real life problems, we collaborate to design & build lasting solutions for humankind.
                  </RevealText>
                </div>

                {/* Frame 1707479457 - matches Figma layout_DHAOUN: row, items-center, gap: 16px */}
                <div className="flex flex-row items-center gap-4">
                  {/* Profile Image - matches Figma: 100px x 100px, borderRadius 100px */}
                  <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/hero/profile-image-642499.png"
                      alt="Ifunanya Onwughalu"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-full"
                      priority
                    />
                  </div>

                  {/* Name and Title - matches Figma layout_EA5CQ1: column, gap: 2px */}
                  <div className="flex flex-col gap-0.5">
                    {/* Name - matches Figma style_I1D761: Manrope 600, 24px, line-height 1.2em, tracking -4% */}
                    <h3 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[1.2em] tracking-[-0.04em] text-[#191919] font-manrope">
                      Ifunanya Onwughalu
                    </h3>
                    {/* Title - matches Figma style_PF8EG5: Manrope 500, 20px, line-height 1.4em, tracking -2% */}
                    <p className="text-[16px] md:text-[18px] lg:text-[20px] font-medium leading-[1.4em] tracking-[-0.02em] text-[rgba(25,25,25,0.6)] font-manrope">
                      Founder @WhiteonBlack
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhoWeAre />
      <OurProcess onSmoothScroll={onSmoothScroll}/>
      <section className="w-full bg-white flex flex-col items-center py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
        <div className="w-full flex flex-col gap-16">
          <div className="w-full pt-[15px]">
            <SectionLabel text="/OUR PHILOSOPHY/" className="text-[#191919]" />
          </div>

          <div className="w-full flex flex-col md:flex-row gap-10 md:gap-16">
            <ApproachCard 
              number="01"
              title="Data driven"
              description="Every strategy, design, and build decision is guided by research and real user insights, ensuring products work effectively from the start."
            />
            <ApproachCard 
              number="02"
              title="Growth focused"
              description="Products are designed to scale, with systems and strategies built to maximise reach, adoption, and sustainable impact."
            />
            <ApproachCard 
              number="03"
              title="Innovation"
              description="Creative problem-solving and smart experimentation drive solutions that stand out and adapt in fast-changing markets."
            />
          </div>
        </div>
      </section>
      <Start onSmoothScroll={onSmoothScroll} />
      <FAQ onSmoothScroll={onSmoothScroll} />
      <BookCallForm onSmoothScroll={onSmoothScroll} />
      </div>
    </div>
  );
}