'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Star, Search, Filter, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { TourDetailModal } from '../../components/TourDetailModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedCard,
} from '../../components/AnimationEngine';
import { TOURS, TourItem } from '../../lib/data';
import { LuxurySelect } from '../../components/LuxuryForm';

export default function AllToursPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'rating'>('featured');
  const [activeModalTour, setActiveModalTour] = useState<TourItem | null>(null);

  const categories = ['All', 'Desert', 'Imperial Cities', 'Mountains', 'Coastal', 'Excursion'];

  const filteredTours = TOURS.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'priceLow') return a.pricePerPerson - b.pricePerPerson;
    if (sortBy === 'priceHigh') return b.pricePerPerson - a.pricePerPerson;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

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
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=2000"
            alt="Sahara Expedition"
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
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span>Curated Kingdom Expeditions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Signature Moroccan Private Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            Every itinerary is 100% private, featuring dedicated VIP chauffeurs, executive Maybach & 4x4 vehicles, handpicked luxury riads, and royal desert camps.
          </motion.p>
        </div>
      </motion.section>

      {/* Catalog Controls & Filters */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-12 px-4 max-w-7xl mx-auto space-y-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-400'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600" />
              <input
                type="text"
                placeholder="Search tours or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 rounded-xl border border-slate-300 bg-white pl-9 pr-4 text-xs text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-48">
              <LuxurySelect
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                options={[
                  { value: 'featured', label: 'Sort by Featured' },
                  { value: 'priceLow', label: 'Price: Low to High' },
                  { value: 'priceHigh', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Highest Rated' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Tour Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 transition duration-500 hover:border-teal-400 hover:shadow-2xl"
              >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={tour.featuredImage}
                    alt={tour.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full bg-teal-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {tour.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                    <span>{tour.rating}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-teal-300 font-bold">
                      <Clock className="h-3.5 w-3.5" /> {tour.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-teal-700 transition">
                    {tour.title}
                  </h3>
                  <p className="mt-1 text-xs text-teal-700 font-semibold line-clamp-1">
                    {tour.subtitle}
                  </p>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                    {tour.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium">
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">From</p>
                  <p className="font-serif text-lg font-bold text-orange-600">
                    €{tour.pricePerPerson} <span className="text-[10px] font-sans font-normal text-slate-500">/ guest</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveModalTour(tour)}
                    className="flex items-center gap-1 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800 transition hover:bg-teal-600 hover:text-white"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View</span>
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/booking?tour=${encodeURIComponent(tour.title)}`}
                      className="flex items-center gap-1 rounded-xl bg-orange-500 hover:bg-orange-600 px-3.5 py-2 text-xs font-bold text-white transition shadow-md shadow-orange-500/20"
                    >
                      <span>Book</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </ScrollRevealSection>

      {/* Tour Detail Modal */}
      <TourDetailModal
        tour={activeModalTour}
        onClose={() => setActiveModalTour(null)}
        onBookTour={(title) => {
          window.location.href = `/booking?tour=${encodeURIComponent(title)}`;
        }}
      />

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
