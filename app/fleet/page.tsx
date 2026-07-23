'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Wifi, Coffee, Users, Luggage, Fuel, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedCard,
} from '../../components/AnimationEngine';
import { VEHICLES, VehicleItem } from '../../lib/data';

export default function FleetPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem>(VEHICLES[0]);

  const categories = ['All', 'VIP Van', 'SUV 4x4', 'Luxury Coach'];

  const filteredVehicles = VEHICLES.filter(
    (v) => selectedCategory === 'All' || v.category === selectedCategory
  );

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
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury VIP Vehicle Fleet"
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
            <Shield className="h-3.5 w-3.5 text-orange-500" />
            <span>Executive Royal Motorpool</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            The Kingdom’s Finest VIP Fleet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            Every vehicle in our fleet is meticulously maintained, featuring climate control, chilled refreshments, complimentary 5G Wi-Fi, and certified professional chauffeurs.
          </motion.p>
        </div>
      </motion.section>

      {/* Interactive Showcase */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto space-y-12"
      >
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-400'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Featured Vehicle Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedVehicle.id}
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                {selectedVehicle.category}
              </div>
            </div>

            {/* Thumbnail Selector */}
            <div className="grid grid-cols-4 gap-2">
              {filteredVehicles.map((v) => (
                <motion.button
                  key={v.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedVehicle(v)}
                  className={`relative h-20 rounded-xl overflow-hidden border transition ${
                    selectedVehicle.id === v.id
                      ? 'border-orange-500 ring-2 ring-orange-500/50'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVehicle.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:col-span-5 space-y-6"
            >
            <div>
              <span className="text-xs uppercase tracking-widest text-teal-800 font-bold">
                Featured Vehicle Spotlight
              </span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
                {selectedVehicle.name}
              </h2>
              <p className="text-xs text-slate-500 italic mt-1">
                “{selectedVehicle.tagline}”
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Users className="h-4 w-4 text-teal-600" />
                <span>Up to {selectedVehicle.passengers} Passengers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Luggage className="h-4 w-4 text-teal-600" />
                <span>{selectedVehicle.luggage} Large Luggage</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Wifi className="h-4 w-4 text-teal-600" />
                <span>High-Speed 5G Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Coffee className="h-4 w-4 text-teal-600" />
                <span>Chilled Refreshments</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2">
                Executive Vehicle Amenities
              </h3>
              <div className="space-y-1.5">
                {selectedVehicle.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold">Day Rate (10 Hours)</p>
                <p className="font-serif text-2xl font-bold text-orange-600">
                  €{selectedVehicle.dayRate}
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/booking?vehicle=${encodeURIComponent(selectedVehicle.name)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-xs font-bold text-white transition shadow-md shadow-orange-500/20"
                >
                  <span>Reserve Vehicle</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
