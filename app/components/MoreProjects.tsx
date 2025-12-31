'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import SectionLabel from "./SectionLabel";
import RevealText from '../animations/components/RevealText';

const MoreProjects = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects = [
        {
            image: '/genpage.png',
            title: 'Capture More Leads With 1:1 Sales Experiences',
            logo: '/gen.png',
            url: 'https://genpage.ai',
        },
        {
            image: '/oono.png',
            title: 'Fuel Your Growth with Interactive Stories',
            logo: '/oo.png',
            url: 'https://oono.ai',
        },
    ];

    return (
        <section className="w-full bg-white flex flex-col items-center py-[72px] px-6 md:py-[80px] md:px-10 lg:py-[100px] lg:px-[164px] 2xl:max-w-[1920px] 2xl:mx-auto">
            <div className="w-full flex flex-col gap-16">
                <div className="w-full pt-[15px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <SectionLabel text="/MORE PROJECTS/" className="text-[#191919]" />
                    </motion.div>
                    <RevealText
                        as="h2"
                        splitBy="words"
                        duration={0.8}
                        stagger={0.05}
                        className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[1.4em] tracking-[-0.04em] text-[#191919] align-middle w-full md:w-auto"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                        Products our team collaborated on
                    </RevealText>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.6,
                                delay: idx * 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="w-full flex flex-col gap-5"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                className="w-full relative overflow-hidden rounded-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <motion.div
                                    animate={{
                                        scale: hoveredIndex === idx ? 1.05 : 1,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="w-full h-auto"
                                >
                                    <Image 
                                        src={project.image} 
                                        alt="More Projects" 
                                        width={1000} 
                                        height={1000}
                                        className="w-full h-auto object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                            
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + idx * 0.1,
                                }}
                                className="text-[18px] md:text-[24px] font-medium leading-[1.4em] tracking-[-0.4px] text-[#191919] align-middle"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                {project.title}
                            </motion.h3>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3 + idx * 0.1,
                                }}
                                className="w-full flex items-center justify-between"
                            >
                                <motion.div
                                    animate={{
                                        opacity: hoveredIndex === idx ? 1 : 0.8,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image src={project.logo} alt="More Projects" width={100} height={32} />
                                </motion.div>
                                <motion.span
                                    whileHover={{ x: 4 }}
                                    className="inline-flex items-center gap-2 text-[14px] md:text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-[#191919] align-middle border-b-2 border-[#191919] cursor-pointer group"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                    onClick={() => window.open(project.url, '_blank')}
                                >
                                    Visit product website
                                    <motion.div
                                        animate={{
                                            x: hoveredIndex === idx ? 4 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image src="/arrow.svg" alt="More Projects" width={14} height={14} className="brightness-0" />
                                    </motion.div>
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MoreProjects;