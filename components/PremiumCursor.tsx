'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

export const PremiumCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const [cursorState, setCursorState] = useState<'default' | 'button' | 'link' | 'image' | 'card' | 'map' | 'concierge' | 'text' | 'input'>('default');
  
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  // Raw mouse values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot physics - Instant (or very fast spring)
  const dotSpringConfig = { stiffness: 1000, damping: 40, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Follower physics - smooth luxury Apple feel
  // stiffness: 260, damping: 24, mass: 0.6 per requirements
  const followerSpringConfig = { stiffness: 260, damping: 24, mass: 0.6 };
  const followerX = useSpring(mouseX, followerSpringConfig);
  const followerY = useSpring(mouseY, followerSpringConfig);

  // Scroll tracking for stretch effect
  const scrollStretchY = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Media query checks
    const checkMedia = setTimeout(() => {
      if (typeof window !== 'undefined') {
        lastScrollY.current = window.scrollY;
      }
    }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Reset idle timer
      setIsIdle(false);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => setIsIdle(true), 200);

      // Handle hover states via event delegation
      const target = e.target as HTMLElement;
      if (!target) return;

      const button = target.closest('button, .cta-button, [role="button"]');
      const link = target.closest('a');
      const image = target.closest('img, .overflow-hidden > .will-change-transform, [data-cursor="image"]');
      const card = target.closest('.group.rounded-3xl, [data-cursor="card"]');
      const map = target.closest('svg, [data-cursor="map"]');
      const text = target.closest('p, h1, h2, h3, h4, h5, h6, span');
      const input = target.closest('input, textarea');
      const concierge = target.closest('.ai-concierge-trigger, [data-cursor="concierge"]');

      if (concierge) setCursorState('concierge');
      else if (map) setCursorState('map');
      else if (image) setCursorState('image');
      else if (card) setCursorState('card');
      else if (button) setCursorState('button');
      else if (link) setCursorState('link');
      else if (input) setCursorState('input');
      else if (text) setCursorState('text');
      else setCursorState('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleScroll = () => {
      setIsScrolling(true);
      scrollStretchY.set(1.08); // Stretch vertically by 8%

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        scrollStretchY.set(1);
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.cursor = 'auto';
      clearTimeout(checkMedia);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mouseX, mouseY, scrollStretchY]);

  if (!isVisible) return null;

  // Base transforms for centering
  // We use fixed containers of 100x100 (follower) and 20x20 (dot) and scale them
  // This avoids animating width/height layout properties.

  const scaleMap = {
    default: 0.36,   // 36px
    button: 0.58,    // 58px
    link: 0.28,      // 28px
    image: 0.8,      // 80px
    card: 1,         // 100px (rounded rect)
    map: 0.5,        // 50px
    concierge: 0.8,  // 80px
    text: 0,         // hidden
    input: 0.4,      // 40px (I-beam morph)
  };

  const getFollowerScale = () => {
    let scale = scaleMap[cursorState] || 0.36;
    if (isClicking) scale *= 0.92;
    return scale;
  };

  const getDotScale = () => {
    let scale = cursorState === 'text' ? 1 : 
                cursorState === 'link' ? 1.3 : 
                cursorState === 'input' ? 0 : 1;
    if (isClicking) scale *= 0.7;
    return scale;
  };

  const activeScale = getFollowerScale();
  const activeDotScale = getDotScale();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* ---------------- FOLLOWER LAYER ---------------- */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center will-change-transform"
        style={{
          x: followerX,
          y: followerY,
          scaleX: 1,
          scaleY: scrollStretchY,
          translateX: '-50%',
          translateY: '-50%',
          width: 100,
          height: 100,
        }}
        initial={false}
        animate={{
          scale: activeScale,
          filter: isScrolling ? 'blur(1px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Default / Button / Link / Image Ring */}
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center border-2 bg-teal-900/10 backdrop-blur-sm shadow-xl"
          animate={{
            opacity: ['card', 'input', 'text'].includes(cursorState) ? 0 : 1,
            borderColor: cursorState === 'button' ? 'rgba(255, 106, 0, 0.8)' : 
                         cursorState === 'link' ? 'rgba(13, 148, 136, 0.9)' : 
                         cursorState === 'image' ? 'rgba(255, 255, 255, 0.6)' : 
                         'rgba(13, 148, 136, 0.4)',
            backgroundColor: cursorState === 'button' ? 'rgba(255, 106, 0, 0.1)' : 
                             cursorState === 'image' ? 'rgba(255, 255, 255, 0.1)' : 
                             'rgba(13, 148, 136, 0.05)',
            boxShadow: cursorState === 'button' ? '0 0 20px rgba(255, 106, 0, 0.2)' : 
                       cursorState === 'image' ? '0 0 20px rgba(255, 255, 255, 0.2)' : 
                       '0 0 10px rgba(13, 148, 136, 0.1)',
            scale: (isIdle && cursorState === 'default') ? [1, 1.05, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: (isIdle && cursorState === 'default') ? 4 : 0.3, repeat: (isIdle && cursorState === 'default') ? Infinity : 0, ease: "easeInOut" },
            default: { duration: 0.3 }
          }}
        >
          {/* View Text for Image Hover */}
          <AnimatePresence>
            {cursorState === 'image' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.25 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="font-serif text-[10px] font-bold text-white tracking-widest mix-blend-normal"
              >
                VIEW
              </motion.span>
            )}
          </AnimatePresence>

          {/* Map Compass */}
          <AnimatePresence>
            {cursorState === 'map' && (
              <motion.div
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                className="mix-blend-normal"
              >
                <Compass className="h-10 w-10 text-teal-300" strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Concierge Orb */}
          <AnimatePresence>
            {cursorState === 'concierge' && (
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 180 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { duration: 10, repeat: Infinity, ease: 'linear' } }}
                className="absolute inset-0 border-[3px] border-dashed border-teal-300 rounded-full flex items-center justify-center mix-blend-normal"
              >
                <Sparkles className="h-8 w-8 text-orange-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Card Hover (Rounded Rectangle Morph) */}
        <motion.div
          className="absolute inset-0 rounded-[20px] border border-teal-500/40 bg-gradient-to-br from-teal-500/5 to-amber-500/5 backdrop-blur-md shadow-2xl"
          animate={{
            opacity: cursorState === 'card' ? 1 : 0,
            scale: cursorState === 'card' ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Input Text (I-Beam Morph) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[60%] bg-orange-500 rounded-full"
          animate={{
            opacity: cursorState === 'input' ? 1 : 0,
            scaleY: cursorState === 'input' ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* ---------------- CLICK RIPPLE ---------------- */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 rounded-full border border-orange-500 will-change-transform"
            style={{ x: followerX, y: followerY, translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* ---------------- DOT LAYER ---------------- */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center will-change-transform pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
        }}
        animate={{ scale: activeDotScale }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="w-full h-full bg-[#FF6A00] rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.5)]" />
      </motion.div>
    </div>
  );
};
