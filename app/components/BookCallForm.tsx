'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import InfiniteMarquee from '../animations/components/InfiniteMarquee';
import { ArrowUpRight } from 'lucide-react';

interface BookCallFormProps {
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => void;
}

interface FormData {
  name: string;
  email: string;
  service: string[];
  message: string;
}

export default function BookCallForm({ onSmoothScroll }: BookCallFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: [],
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const logos = ['/folklore-white.svg', '/envoyx-white.svg', '/Clarus-white.svg', '/ren-white.svg', '/Cavalo-white.svg', '/arlen-white.png', '/Fab-white.svg'];

  const services = [
    'Product Design',
    'MVP Development',
    'AI Automations',
    'I Want to Outsource Design',
    'I want to Outsource Engineering',
    'Landing Page Design and Development',
    'I do not know yet'
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.service || formData.service.length === 0) {
      errors.service = 'Please select at least one service';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    // Simulate API call
    try {
      // Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        service: [],
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setFormErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-5 items-stretch">
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col justify-between items-center p-8 md:p-8 lg:p-10 rounded-[28px] bg-black text-white relative overflow-hidden min-h-[400px] md:min-h-auto"
          >
            <div className="absolute inset-0 opacity-99"></div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center gap-5 flex-1 justify-center w-full"
            >
              <p className="text-[12px] font-normal leading-[1.5em] tracking-[-0.04em] text-white" style={{ fontFamily: 'Geist, sans-serif' }}>
                Helped over 20+ founders & businesses
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 flex flex-col items-center gap-5 flex-1 justify-center w-full"
            >
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-normal leading-[1.167em] tracking-[-0.07em] text-white text-center w-full md:w-full lg:w-[409px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Turn clay into gold with wob today.
              </h2>
              <p className="text-[16px] md:text-[17px] lg:text-[18px] font-normal leading-[1.5em] tracking-[-0.04em] text-white/80 text-center w-full md:w-full lg:w-[384px]" style={{ fontFamily: 'Geist, sans-serif' }}>
                Book a free 30-minute assessment and we'll show you exactly where AI can save you time and money.
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

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 flex flex-col p-6 md:p-8 bg-[#F5F5F5] rounded-[28px]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 md:gap-8">
              <div className="w-full flex flex-col gap-4 md:gap-5">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-full"
                >
                  <input
                    type="text"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-5 py-4 md:py-[19px] bg-[#E6E6E6] rounded-xl text-[16px] font-normal leading-[1.24em] tracking-[-0.04em] placeholder:text-[#191919]/30 ${
                      formErrors.name ? 'border-2 border-red-500' : 'border-2 border-transparent'
                    } ${formData.name ? 'text-[#191919]' : 'text-[#191919]/30'}`}
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  />
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[12px] text-red-500 mt-1 px-1" style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="w-full"
                >
                  <input
                    type="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-5 py-4 md:py-[19px] bg-[#E6E6E6] rounded-xl text-[16px] font-normal leading-[1.24em] tracking-[-0.04em] placeholder:text-[#191919]/30 ${
                      formErrors.email ? 'border-2 border-red-500' : 'border-2 border-transparent'
                    } ${formData.email ? 'text-[#191919]' : 'text-[#191919]/30'}`}
                    style={{ fontFamily: 'Geist, sans-serif' }}
                  />
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[12px] text-red-500 mt-1 px-1" style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {formErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="w-full flex flex-col gap-4"
              >
                <label className="text-[16px] md:text-[17.9px] font-normal leading-[1.508em] tracking-[-0.04em] text-[#606060]" style={{ fontFamily: 'Geist, sans-serif' }}>
                  What services are you interested in?
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service, idx) => (
                    <motion.label 
                      key={idx} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2.5 px-3 md:px-4 py-2 md:py-3 rounded-xl cursor-pointer transition-colors bg-[#E6E6E6] text-[#191919] hover:bg-[#D0D0D0]`}>
                      <input 
                        type="checkbox" 
                        name="service" 
                        value={service}
                        checked={formData.service.includes(service)}
                        onChange={(e) => {
                          const serviceValue = e.target.value;
                          if (e.target.checked) {
                            setFormData({ ...formData, service: [...formData.service, serviceValue] });
                          } else {
                            setFormData({ ...formData, service: formData.service.filter(s => s !== serviceValue) });
                          }
                        }}
                        className="custom-checkbox-dot"
                      />
                      <span className="text-[12px] font-normal leading-[1.5em] tracking-[-0.04em]" style={{ fontFamily: 'Geist, sans-serif' }}>
                        {service}
                      </span>
                    </motion.label>
                  ))}
                </div>
                {formErrors.service && (
                  <p className="text-[12px] text-red-500 px-1" style={{ fontFamily: 'Geist, sans-serif' }}>
                    {formErrors.service}
                  </p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="w-full"
              >
                <textarea
                  placeholder="Tell us about your idea..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-5 py-5 bg-[#E6E6E6] rounded-xl text-[16px] font-normal leading-[1.2em] tracking-[-0.04em] placeholder:text-[#191919]/30 resize-none border-2 border-transparent ${
                    formData.message ? 'text-[#191919]' : 'text-[#191919]/30'
                  }`}
                  style={{ fontFamily: 'Geist, sans-serif' }}
                />
              </motion.div>

              <AnimatePresence>
                {formErrors.submit && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full p-3 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-[14px] text-red-600 text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
                      {formErrors.submit}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full p-3 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <p className="text-[14px] text-green-600 text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
                      Thank you! We've received your request and will get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="w-full flex flex-col items-center gap-6"
              >
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-[30px] py-4 md:py-5 bg-[#191919] text-white text-[16px] md:text-[17.9px] font-normal leading-[1.508em] tracking-[-0.04em] rounded-[50px] transition-opacity ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                   <img src="/arr.svg" alt="arrow" className="" style={{ filter: 'brightness(0) invert(1)' }} width={12} height={12} />
                   {isSubmitting ? 'Submitting...' : 'Book a call'}
                </motion.button>
                <p className="text-[12px] font-normal leading-[1.4em] tracking-[-0.02em] text-[#191919]/60 text-center" style={{ fontFamily: 'Geist, sans-serif' }}>
                  By submitting, you agree to our{' '}
                  <a href="#terms" onClick={(e) => onSmoothScroll(e, '#terms')} className="text-[#191919] underline">terms of service.</a>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
