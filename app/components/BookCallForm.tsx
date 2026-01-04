'use client';

import { motion } from 'framer-motion';
import InfiniteMarquee from '../animations/components/InfiniteMarquee';
import Script from 'next/script';
import RevealText from '../animations/components/RevealText';

interface BookCallFormProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

export default function BookCallForm({ onSmoothScroll }: BookCallFormProps) {
  const logos = ['/folklore-white.svg', '/envoyx-white.svg', '/Clarus-white.svg', '/ren-white.svg', '/Cavalo-white.svg', '/arlen-white.png', '/Fab-white.svg'];

  return (
    <section id="book-call" className="w-full flex py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto flex-col items-center bg-white">
      <div className="w-full flex flex-col items-center gap-2.5">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full pt-[15px]"
        >
          <span className="text-[18px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#0C120C]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            /BOOK A CALL/
          </span>
        </motion.div>

        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-5 items-stretch min-h-[600px] md:min-h-[700px]">
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col justify-between items-center p-8 md:p-8 lg:p-10 rounded-[28px] bg-black text-white relative overflow-hidden min-h-[400px] md:min-h-auto"
          >
            <div className="absolute inset-0 opacity-99"></div>
            <RevealText
              as="p"
              animation="fadeUp"
              splitBy="words"
              duration={0.7}
              stagger={0.02}
              delay={0.3}
              className="text-[48px] font-normal leading-[56px] tracking-[-3.36px] text-white text-center"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Turn clay into gold withwob today.
            </RevealText>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center justify-center w-full mt-4"
            >
              <p className="text-[18px] font-normal opacity-50 leading-[140%] tracking-[-0.72px] text-white text-center w-[384px] h-[50px]" style={{ fontFamily: 'Geist, sans-serif' }}>
                Book a free 15-minute discovery & strategy call to help us uncover best way to serve you.
              </p>
            </motion.div>
            <div className="relative z-10 w-full flex flex-col items-center gap-2.5 mt-auto pt-10">
              {/* Logos */}
              <div className="w-full">
                <InfiniteMarquee speed={40} pauseOnHover>
                  {logos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="h-[22px] w-[100px] mx-6 flex items-center justify-center"
                    >
                      <img 
                        src={logo} 
                        alt={`Logo ${idx + 1}`} 
                        width={100} 
                        height={22} 
                        className="w-full h-full object-contain brightness-0 invert" 
                      />
                    </div>
                  ))}
                </InfiniteMarquee>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Calendly Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 flex flex-col items-center justify-center bg-transparent rounded-[28px] overflow-hidden border-2 border-[#F5F5F5]"
          >
            <div 
              className="calendly-inline-widget w-full h-full overflow-hidden" 
              data-url="https://calendly.com/whiteonblack/discovery-call-with-whiteonblack?embed_domain=localhost%3A3000&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1&back=1" 
              style={{ minWidth: '320px', height: '700px', width: '100%', scrollbarWidth: 'none' }}
            />
          </motion.div>
        </div>
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
     
    </section>
  );
}
