'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Sparkles, Compass, Sun, ArrowRight, Camera } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { FloatingAIConciergeButton } from '../../components/FloatingAIConciergeButton';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedCard,
} from '../../components/AnimationEngine';
import { DESTINATIONS, DestinationHotspot } from '../../lib/data';

export default function DestinationsPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<DestinationHotspot>(DESTINATIONS[0]);

  return (
    <AnimatedPageLayout className="bg-slate-50 font-sans text-slate-800 selection:bg-orange-500 selection:text-white pt-20">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[55vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden border-b border-teal-200"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=2000"
            alt="Moroccan Horizons"
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
            <Compass className="h-3.5 w-3.5 text-orange-500" />
            <span>Interactive Kingdom Geography</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Explore Morocco’s Royal Destinations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            Select any region on our kingdom map below to discover cultural treasures, optimal travel seasons, and luxury private transfer distances.
          </motion.p>
        </div>
      </motion.section>

      {/* Interactive Map & Spotlight */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Map Controls & Visual */}
          <AnimatedCard className="lg:col-span-5 p-6 space-y-6 bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Kingdom Map Hotspots
              </h2>
              <span className="text-xs text-teal-700 uppercase tracking-widest font-bold">
                8 Key Regions
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DESTINATIONS.map((d) => {
                const isSelected = selectedDest.id === d.id;
                return (
                  <motion.button
                    key={d.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDest(d)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300'
                    }`}
                  >
                    <MapPin className={`h-4 w-4 shrink-0 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-xs font-bold font-serif">{d.name}</p>
                      <p className="text-[10px] text-slate-500">{d.region}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Stylized SVG Map Representation */}
            <div className="relative h-64 w-full rounded-2xl border border-teal-200 bg-teal-50/50 p-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.15),transparent_70%)]" />
              <svg viewBox="0 0 400 300" className="h-full w-full text-teal-600/40">
                {/* Simplified Coastline / Map Contours */}
                <path
                  d="M 50,40 Q 120,30 200,60 T 350,180 Q 300,280 200,270 T 80,180 Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {/* Selected Destination Pulse Pin */}
                <circle cx={selectedDest.coordinates.x * 3.5} cy={selectedDest.coordinates.y * 2.2} r="8" fill="#f97316" className="animate-ping" />
                <circle cx={selectedDest.coordinates.x * 3.5} cy={selectedDest.coordinates.y * 2.2} r="5" fill="#f97316" />
              </svg>

              <div className="absolute bottom-3 left-3 text-[10px] text-teal-800 uppercase tracking-widest font-mono font-bold">
                Lat: {selectedDest.coordinates.y}° N | Long: {selectedDest.coordinates.x}° W
              </div>
            </div>
          </AnimatedCard>

          {/* Destination Detail Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDest.id}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 space-y-6 shadow-xl shadow-slate-200/50"
            >
            <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {selectedDest.region}
                </span>
                <h2 className="font-serif text-3xl font-bold text-white mt-2">
                  {selectedDest.name}
                </h2>
                <p className="text-xs text-slate-200 font-light mt-1">
                  {selectedDest.shortTag}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 font-light leading-relaxed">
              {selectedDest.description}
            </p>

            <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Recommended Duration</p>
                  <p className="text-xs font-bold text-slate-900">{selectedDest.recommendedDuration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Navigation className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">From Marrakech</p>
                  <p className="text-xs font-bold text-slate-900">{selectedDest.driveFromMarrakech}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-teal-800 mb-3">
                Must-See Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDest.mustSee.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                    <Camera className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/tours?search=${encodeURIComponent(selectedDest.name)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-xs font-bold text-white transition shadow-md shadow-orange-500/20"
                >
                  <span>View {selectedDest.name} Tours</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </ScrollRevealSection>

      <FloatingAIConciergeButton onOpen={() => setAiConciergeOpen(true)} />
      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
