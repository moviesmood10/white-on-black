'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../animations/utils/gsapConfig';
import RevealText from '../animations/components/RevealText';
import Image from 'next/image';

export default function ClientsReview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax effect on cards
    const cards = sectionRef.current.querySelectorAll('.testimonial-group');
    cards.forEach((card) => {
      gsap.to(card, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const group1 = {
    id: 1,
    backgroundImage: '/images/hero/hero-image-7f1dbe.png',
    testimonial: {
      quote: '"Setting new pace & attention to what truly matters in a gift when working with the WOB team. Good job guys!"',
      name: "Mathew Daly",
      title: "Ex. Head of products, TheFolklore Group",
      photo: "/testimonial.png",
    },
  };

  const group2 = {
    id: 2,
    backgroundImage: '/images/hero/hero-image-7f1dbe.png',
    testimonials: [
      {
        quote: '"Our collaboration, A true product partnership in redesigning our core experience and shape a new product line that supported our $3.2M fundraise."',
        name: "Victor Ekwealor",
        title: "Founder, Clarus",
      },
      {
        quote: '“The trust we’ve built while collaborating with Ifunanya for our US clients led us to cofounding EnvoyX together”',
        name: "Loubao Kraka",
        title: "CEO & Cofounder, EnvoyX",
      },
    ],
  };

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto bg-white"
    >
      <div className="w-full flex flex-col gap-2.5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-[272px] pt-[15px]"
        >
          <span
            className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#191919]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            /CLIENTS REVIEW/
          </span>
        </motion.div>

        <div className="w-full flex flex-col gap-10 md:gap-12 lg:gap-16">
          <RevealText
            as="h2"
            // animation="slideUp"
            splitBy="words"
            duration={0.8}
            stagger={0.04}
            className="text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.1em] tracking-[-0.06em] text-[#191919] w-full md:w-full lg:w-[912px]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            See why smart busy professionals like you collaborates with WhiteonBlack
          </RevealText>

          <div className="w-full flex flex-col md:flex-row items-stretch gap-6 md:gap-6">
            {/* Group 1: Image + Review Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="testimonial-group w-full md:w-[678px] rounded-[28px] overflow-hidden p-1.5 relative"
              style={{
                backgroundImage: `url(${group1.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="flex flex-col md:flex-row gap-1.5 h-full">
                {/* Photo Section */}
                <div className="w-full flex-1 md:w-[330px] h-[300px] md:h-[420px] rounded-[22px] overflow-hidden flex-shrink-0 relative">
                  <div className="w-full h-full rounded-[6px] relative">
                    {group1.testimonial.photo ? (
                      <Image
                        src={group1.testimonial.photo}
                        alt={group1.testimonial.name}
                        fill
                        className="object-cover rounded-[6px]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center rounded-[6px]">
                        <span className="text-gray-600 text-sm">Photo</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col gap-1.5 min-h-0">
                  {/* Quote Card */}
                  <div className="flex-1 bg-white rounded-[22px] p-6 flex flex-col justify-center min-h-0">
                    <p
                      className="text-[18px] md:text-[20px] font-normal leading-[1.3em] text-[#191919]"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {group1.testimonial.quote}
                    </p>
                  </div>

                  {/* Author Card */}
                  <div className="bg-white rounded-[22px] p-[23px] md:p-6 flex flex-col">
                    <div className="flex flex-col">
                      <h4
                        className="text-[17px] font-normal leading-[1.4em] text-[#191919]"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {group1.testimonial.name}
                      </h4>
                      <p
                        className="text-[17px] font-normal leading-[1.4em] text-[#191919]/60 mt-[-1px]"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {group1.testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Group 2: Two Review Cards Stacked */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="testimonial-group w-full md:w-[678px] rounded-[28px] overflow-hidden p-1.5 relative"
              style={{
                backgroundImage: `url(${group2.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="flex gap-1.5 h-full">
                {group2.testimonials.map((testimonial, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 flex-1">
                    {/* Quote Card */}
                    <div className="flex-1 bg-white rounded-[22px] p-6 flex flex-col justify-center min-h-0">
                      <p
                        className="text-[18px] md:text-[20px] font-normal leading-[1.3em] text-[#191919]"
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {testimonial.quote}
                      </p>
                    </div>

                    {/* Author Card */}
                    <div className="bg-white rounded-[22px] p-[23px] md:p-6 flex flex-col">
                      <div className="flex flex-col">
                        <h4
                          className="text-[17px] font-normal leading-[1.4em] text-[#191919]"
                          style={{ fontFamily: 'Geist, sans-serif' }}
                        >
                          {testimonial.name}
                        </h4>
                        <p
                          className="text-[17px] font-normal leading-[1.4em] text-[#191919]/60 mt-[-1px]"
                          style={{ fontFamily: 'Geist, sans-serif' }}
                        >
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
