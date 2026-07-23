'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, MapPin, Tag, Check, ArrowRight, Flame } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedCard,
  AnimatedButton,
} from '../../components/AnimationEngine';
import { ACTIVITIES, ActivityItem } from '../../lib/data';

export default function ActivitiesPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Adventure', 'Cultural', 'Luxury', 'Culinary'];

  const filteredActivities = ACTIVITIES.filter(
    (act) => activeCategory === 'All' || act.category === activeCategory
  );

  return (
    <AnimatedPageLayout className="bg-slate-50 font-sans text-slate-800 selection:bg-orange-500 selection:text-white pt-20">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[55vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden border-b border-teal-200"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
            alt="Activities in Morocco"
            className="h-full w-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800 backdrop-blur-md mb-4 shadow-sm"
          >
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span>Unrivaled Kingdom Experiences</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Exclusive Moroccan Activities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            From sunrise hot air balloon flights above the High Atlas to high-speed dune buggy safaris and private royal cooking masterclasses.
          </motion.p>
        </div>
      </motion.section>

      {/* Activities Grid */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto space-y-12"
      >
        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-400'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((act) => (
              <motion.div
                key={act.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 hover:border-teal-400 hover:shadow-2xl transition duration-300"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90" />

                    <span className="absolute top-4 left-4 rounded-full bg-teal-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {act.category}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-medium text-slate-200">
                      <span className="flex items-center gap-1 font-bold">
                        <MapPin className="h-3.5 w-3.5 text-orange-400" /> {act.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold">
                        <Clock className="h-3.5 w-3.5 text-orange-400" /> {act.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-teal-700 transition">
                      {act.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 font-light leading-relaxed">
                      {act.fullDesc}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                      {act.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <Check className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Price per Person</p>
                    <p className="font-serif text-2xl font-bold text-orange-600">
                      €{act.price}
                    </p>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/booking?service=Activity&title=${encodeURIComponent(act.title)}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2.5 text-xs font-bold text-white transition shadow-md shadow-orange-500/20"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
