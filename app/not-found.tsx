'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Compass, ArrowLeft } from 'lucide-react';
import { AnimatedPageLayout } from '../components/AnimatedPageLayout';
import { AnimatedCard } from '../components/AnimationEngine';

export default function NotFound() {
  return (
    <AnimatedPageLayout className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
      <AnimatedCard className="max-w-md w-full p-8 text-center space-y-6 bg-slate-900/90 border border-amber-500/30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-400 mx-auto"
        >
          <Compass className="h-8 w-8" />
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Error 404 • Lost in the Desert</span>
          <h1 className="font-serif text-3xl font-bold text-amber-100">Path Not Found</h1>
          <p className="text-xs text-amber-200/70 font-light leading-relaxed">
            The kingdom route you are attempting to inspect does not exist or has been relocated by our VIP concierge team.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-bold text-slate-950 hover:brightness-110 transition shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return To Kingdom Home</span>
          </Link>
        </motion.div>
      </AnimatedCard>
    </AnimatedPageLayout>
  );
}
