'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete?: () => void;
  minimumDuration?: number; // duration in ms
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({
  onComplete,
  minimumDuration = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / minimumDuration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minimumDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-white px-6 py-12 text-slate-900 overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Glowing Background Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-500/20 via-orange-500/10 to-transparent blur-[120px] pointer-events-none"
          />

          {/* Top Subtle Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-teal-700 font-bold"
          >
            <Sparkles className="h-3 w-3 text-orange-500 animate-pulse" />
            <span>Exclusive Moroccan Journeys</span>
          </motion.div>

          {/* Central Logo & Brand Reveal */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            {/* Animated Compass Icon with Soft Rotation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 p-[2px] shadow-lg shadow-teal-600/20 mb-6"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                >
                  <Compass className="h-10 w-10 text-teal-600" />
                </motion.div>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
            >
              See<span className="text-teal-600 font-normal"> Morocco Travel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-2 text-xs sm:text-sm uppercase tracking-[0.35em] text-orange-600 font-semibold"
            >
              Executive Chauffeur & Luxury Experiences
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full max-w-xs sm:max-w-md flex flex-col items-center gap-3"
          >
            <div className="w-full flex items-center justify-between text-[11px] tracking-widest text-slate-500 font-mono">
              <span className="uppercase text-[9px] text-teal-700 font-bold tracking-[0.2em]">Curating Experience</span>
              <span className="text-orange-600 font-bold">{progress}%</span>
            </div>

            {/* Line Progress Bar */}
            <div className="relative w-full h-[3px] rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 via-orange-500 to-teal-600 shadow-sm"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
