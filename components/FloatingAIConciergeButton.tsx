'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot } from 'lucide-react';

interface FloatingAIConciergeButtonProps {
  onOpen: () => void;
  className?: string;
}

export const FloatingAIConciergeButton: React.FC<FloatingAIConciergeButtonProps> = ({
  onOpen,
  className = '',
}) => {
  const [footerOverlap, setFooterOverlap] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Recalculate button offset relative to footer position to avoid covering footer controls
  const calculateOffset = useCallback(() => {
    const footer = document.getElementById('site-footer') || document.querySelector('footer');
    if (!footer) {
      setFooterOverlap(0);
      return;
    }

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const overlap = viewportHeight - footerRect.top;

    if (overlap > 0) {
      setFooterOverlap(overlap + 20);
    } else {
      setFooterOverlap(0);
    }
  }, []);

  // Handle Smart Auto-Hide on fast downward scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 10 && currentScrollY > 120) {
        setIsScrollingDown(true);
      } else if (delta < -8 || currentScrollY <= 100) {
        setIsScrollingDown(false);
      }

      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrollingDown(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const footer = document.getElementById('site-footer') || document.querySelector('footer');
    if (!footer) return;

    let animationFrameId: number;

    const handleScrollOrResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateOffset);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScrollOrResize, { passive: true });
          window.addEventListener('resize', handleScrollOrResize, { passive: true });
          calculateOffset();
        } else {
          window.removeEventListener('scroll', handleScrollOrResize);
          window.removeEventListener('resize', handleScrollOrResize);
          setFooterOverlap(0);
        }
      },
      {
        root: null,
        rootMargin: '100px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(footer);
    requestAnimationFrame(calculateOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [calculateOffset]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isScrollingDown ? 0.4 : 1,
        scale: isScrollingDown ? 0.92 : 1,
        y: -footerOverlap + (isScrollingDown ? 8 : 0),
      }}
      transition={{
        duration: 0.28,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={`fixed bottom-[24px] right-[20px] sm:bottom-8 sm:right-8 z-50 ${className}`}
    >
      {/* Gentle looping float animation container */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.button
          layoutId="ai-concierge-panel"
          onClick={onOpen}
          aria-label="Open AI Travel Concierge"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="group relative flex h-[64px] w-[64px] items-center justify-center rounded-full border-2 border-white/80 backdrop-blur-xl bg-teal-600/90 hover:bg-teal-500 text-white shadow-xl shadow-teal-900/30 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:ring-2 hover:ring-orange-400 hover:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 shrink-0 will-change-transform"
        >
          {/* Subtle Orange Accent Glow Halo */}
          <div className="absolute -inset-2 rounded-full bg-orange-400/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 pointer-events-none group-hover:scale-110" />


          {/* Live Indicator Pulse Badge in top-right */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white" />
          </span>

          {/* Icon */}
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>

          {/* Tooltip on hover (desktop) */}
          <span className="absolute right-full mr-3 hidden sm:group-hover:flex items-center rounded-xl bg-slate-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-lg whitespace-nowrap pointer-events-none border border-white/10 animate-fade-in">
            Ask AI Concierge
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


