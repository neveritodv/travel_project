'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // State for different hover contexts
  const [cursorState, setCursorState] = useState<'default' | 'button' | 'card' | 'image' | 'link' | 'map'>('default');
  const [cursorText, setCursorText] = useState('');

  // Use motion values for raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Core Dot (18px) - fast response
  const dotSpringConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Follower (40px) - Lerp ~0.15 lag emulation via heavier spring
  const followerSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const followerX = useSpring(mouseX, followerSpringConfig);
  const followerY = useSpring(mouseY, followerSpringConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const button = target.closest('button, .cta-button, [role="button"]');
      const link = target.closest('a');
      const card = target.closest('.group.rounded-3xl, [data-cursor="card"]');
      const image = target.closest('img, .overflow-hidden > .will-change-transform, [data-cursor="image"]');
      const map = target.closest('svg, [data-cursor="map"]');
      
      const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      setCursorText(customText || '');

      if (customText) {
        setCursorState('button');
      } else if (map) {
        setCursorState('map');
      } else if (image) {
        setCursorState('image');
      } else if (card) {
        setCursorState('card');
      } else if (button) {
        setCursorState('button');
      } else if (link) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide native cursor for the luxury feel
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  // Variants for the follower
  const followerVariants = {
    default: {
      width: 40,
      height: 40,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      border: "1px solid rgba(13, 148, 136, 0.4)", // Luxury teal
      backgroundColor: "rgba(13, 148, 136, 0.05)",
      backdropFilter: "blur(2px)",
      scale: 1,
    },
    button: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      border: "1px solid rgba(13, 148, 136, 0.8)",
      backgroundColor: "rgba(13, 148, 136, 0.15)",
      backdropFilter: "blur(4px)",
      scale: 1.1,
    },
    link: {
      width: 24,
      height: 24,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      border: "1px solid rgba(13, 148, 136, 0.6)",
      backgroundColor: "transparent",
      backdropFilter: "blur(0px)",
      scale: 0.8,
    },
    card: {
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
      borderRadius: "16px",
      border: "1px solid rgba(13, 148, 136, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(4px)",
      scale: 1.05,
    },
    image: {
      width: 90,
      height: 90,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(6px)",
      scale: 1,
    },
    map: {
      width: 56,
      height: 56,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      border: "1px solid rgba(13, 148, 136, 0.6)",
      backgroundColor: "rgba(13, 148, 136, 0.1)",
      backdropFilter: "blur(3px)",
      scale: 1.1,
    }
  };

  // Variants for the dot
  const dotVariants = {
    default: { opacity: 1, scale: 1 },
    button: { opacity: 0, scale: 0 },
    link: { opacity: 1, scale: 0.5 },
    card: { opacity: 0, scale: 0 },
    image: { opacity: 0, scale: 0 },
    map: { opacity: 0, scale: 0 },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block mix-blend-difference">
      {/* Follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center will-change-transform"
        style={{ x: followerX, y: followerY }}
        variants={followerVariants}
        animate={cursorState}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      >
        {/* Content based on state */}
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-teal-300 uppercase text-center px-1 mix-blend-normal">
            {cursorText}
          </span>
        )}
        {!cursorText && cursorState === 'image' && (
          <span className="text-[10px] font-bold tracking-widest text-white uppercase text-center px-1 mix-blend-normal">
            EXPLORE
          </span>
        )}
        {!cursorText && cursorState === 'map' && (
          <svg className="w-5 h-5 text-teal-300 mix-blend-normal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )}
      </motion.div>

      {/* Center Dot (18px) */}
      <motion.div
        className="fixed top-0 left-0 w-[18px] h-[18px] -ml-[9px] -mt-[9px] rounded-full border border-teal-400 bg-teal-500/80 shadow-[0_0_10px_rgba(13,148,136,0.6)] backdrop-blur-[1px] will-change-transform"
        style={{ x: dotX, y: dotY }}
        variants={dotVariants}
        animate={cursorState}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      />
    </div>
  );
};
