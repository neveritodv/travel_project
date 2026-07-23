'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Clock, Star, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { TOURS, TourItem } from '../lib/data';
import { TourDetailModal } from './TourDetailModal';
import { AnimatedTitle, StaggerContainer, StaggerItem, AnimatedCard, MagneticInteraction, LUXURY_EASE } from './AnimationEngine';

interface Screen4Props {
  onBookTour: (tourTitle: string) => void;
}

export const Screen4Signature: React.FC<Screen4Props> = ({ onBookTour }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTour, setActiveModalTour] = useState<TourItem | null>(null);

  const categories = ['All', 'Desert', 'Mountains', 'Coastal', 'Imperial Cities', 'Excursion'];

  const filteredTours = TOURS.filter((t) => {
    if (selectedCategory === 'All') return true;
    return t.category === selectedCategory;
  });

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section id="screen-4" className="relative min-h-screen w-full bg-slate-50 px-4 py-[64px] md:py-[88px] lg:py-[120px] text-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedTitle
          title="Signature Private Experiences"
          badge={<><Sparkles className="h-3.5 w-3.5 text-orange-500" /><span>Curated Kingdom Journeys</span></>}
          description="Crafted for discerning travelers. Every private expedition blends executive chauffeur travel, secret locations, handpicked 5-star riads, and royal desert camps."
          badgeClassName="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800"
          className="mb-12"
        />

          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <MagneticInteraction key={cat} maxDistance={4}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 will-change-transform active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-800 hover:shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              </MagneticInteraction>
            ))}
          </div>

        {/* Tour Catalog Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, idx) => (
            <StaggerItem key={tour.id} yOffset={40 + (idx % 3) * 15}>
              <AnimatedCard glow={true} className="group/tour flex flex-col justify-between h-full">
                {/* Tour Image Header */}
                <div>
                  <div className="relative h-56 w-full overflow-hidden" data-cursor="image">
                    <motion.img
                      style={{ y: parallaxY }}
                      src={tour.featuredImage}
                      alt={tour.title}
                      className="h-[110%] -top-[5%] absolute w-full object-cover transition-transform duration-[800ms] ease-[0.22,1,0.36,1] group-hover/tour:scale-105 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="rounded-full border border-teal-200 bg-white/90 px-3 py-1 text-[11px] font-bold text-teal-800 backdrop-blur-md transition-transform duration-500 group-hover/tour:-rotate-3 group-hover/tour:scale-105">
                        {tour.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-orange-400 backdrop-blur-md">
                      <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                      <span>{tour.rating}</span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-teal-300">
                        <Clock className="h-3.5 w-3.5" /> {tour.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 transition-transform duration-500 group-hover/tour:-translate-y-1 will-change-transform">
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover/tour:text-teal-700 transition-colors duration-300">
                      {tour.title}
                    </h3>
                    <p className="mt-1 text-xs text-teal-800 font-semibold line-clamp-1">
                      {tour.subtitle}
                    </p>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                      {tour.description}
                    </p>

                    {/* Top Highlights bullet pills */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 3).map((h, i) => (
                        <span key={i} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium">
                          • {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3 transition-transform duration-500 group-hover/tour:-translate-y-1 will-change-transform">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">From</p>
                    <p className="font-serif text-lg font-bold text-slate-900">
                      €{tour.pricePerPerson} <span className="text-[10px] font-sans font-normal text-slate-500">/ guest</span>
                    </p>
                  </div>

                  <MagneticInteraction maxDistance={5}>
                    <button
                      onClick={() => setActiveModalTour(tour)}
                      className="flex items-center gap-1.5 rounded-xl border border-teal-600/30 bg-teal-50 px-4 py-2.5 text-xs font-bold text-teal-800 transition-all duration-300 hover:bg-teal-600 hover:text-white hover:shadow-md hover:shadow-teal-600/30 active:scale-95 will-change-transform"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Itinerary</span>
                    </button>
                  </MagneticInteraction>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Tour Detail Modal */}
      <TourDetailModal
        tour={activeModalTour}
        onClose={() => setActiveModalTour(null)}
        onBookTour={onBookTour}
      />
    </section>
  );
};
