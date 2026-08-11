import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// --- Constants & Data ---
const mainText = "REIMAGINE DIGITAL FUTURES";
const subtitle = "Building next-generation protocols with uncompromising performance and design excellence.";
const buttonText = "Get Started Now";

/**
 * 1. Magnetic Glow Component (The ambient reactive light)
 */
const AmbientGlow = () => {
    const ref = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Effect to handle real-time mouse movement tracking

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    // Style the glow element based on mouse position
    const style = { 
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(129, 140, 248, 0.6) 0%, transparent 35%)`,
    };

    return (
        <div ref={ref} className="fixed top-0 left-0 pointer-events-none z-[-1] w-full h-full transition-all duration-200" style={style} />
    );
};

/**
 * 2. CTA Button Component with Magnetic Pull Effect
 */
const MagneticButton = () => {
    // Framer Motion variants for the magnetic effect
    const containerVariants = {
        rest: { scale: 1, rotateX: 0, rotateY: 0 },
        hover: {
            scale: 1.05,
            boxShadow: "0 20px 40px -10px rgba(129, 140, 248, 0.7)", // Stronger glow
            rotateX: -1, // Subtle 3D tilt
            rotateY: 1,
        },
    };

    return (
        <motion.button 
            className="relative z-20 py-3 px-10 text-lg font-bold uppercase transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl tracking-widest shadow-2xl backdrop-blur-sm" 
            initial="rest" 
            whileHover="hover" 
            variants={containerVariants} 
            transition={{ type: "spring", stiffness: 400, damping: 15 }} 
        >
            {buttonText}
        </motion.button>
    );
};

/**
 * 3. Main Hero Section Component
 */
const HeroSection = () => {
    // Framer Motion Staggering for the main title (Letter by Letter animation)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.5,
            },
        },
    };

    // Animation variant for individual text elements (letter-by-letter or word by word)
    const charAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden text-white pt-24 pb-12">
            {/* Ambient Glow Effect */}
            <AmbientGlow />
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

                {/* Main Title Typography (Staggered Animation) */}
                <motion.h1 
                    className="text-7xl md:text-[8rem] lg:text-[10rem] font-extrabold leading-tight mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200" 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                >
                    {/* We map over the characters to trigger individual animations */}
                    {[...mainText].map((char, index) => (
                        <motion.span key={index} variants={charAnimation} className="inline-block mr-[0.1em]">
                            {/* Handle spaces to keep layout clean */}
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subtitle Text */}
                <motion.p 
                    className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200/80" 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 1.5, duration: 0.8 }} // Delayed after the main title animation
                >
                    {subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 2.2, duration: 0.5 }} // Delayed even longer
                >
                    <MagneticButton />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
