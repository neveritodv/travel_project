'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface CinematicRouteLoaderProps {
  children: React.ReactNode;
}

export const CinematicRouteLoader: React.FC<CinematicRouteLoaderProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const duration = 1000; // 1s smooth transition on route load
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (!isMounted) return;
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 200);
      }
    }, 25);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key={`route-loader-${pathname}`}
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white px-6 py-12 text-slate-900 overflow-hidden select-none pointer-events-auto"
          >
            {/* Ambient Radial Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-[100px] pointer-events-none"
            />

            {/* Top Brand Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-teal-700 font-bold"
            >
              <Sparkles className="h-3 w-3 text-orange-500 animate-pulse" />
              <span>See Morocco Travel</span>
            </motion.div>

            {/* Central Compass Icon & Brand */}
            <div className="flex flex-col items-center justify-center text-center my-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 180 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 p-[1.5px] shadow-lg shadow-teal-600/20 mb-4"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <Compass className="h-8 w-8 text-teal-600" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
              >
                See<span className="text-teal-600 font-normal"> Morocco Travel</span>
              </motion.h2>

              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-orange-600 font-semibold">
                Executive Chauffeur & Luxury
              </span>
            </div>

            {/* Progress Counter & Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xs flex flex-col items-center gap-2"
            >
              <div className="w-full flex items-center justify-between text-[10px] tracking-widest text-slate-500 font-mono">
                <span className="uppercase text-[8px] text-teal-700 font-bold tracking-[0.2em]">Navigating</span>
                <span className="text-orange-600 font-bold">{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-[2.5px] rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 via-orange-500 to-teal-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default CinematicRouteLoader;
