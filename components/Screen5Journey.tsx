'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Volume2, Quote, ArrowRight, Heart } from 'lucide-react';
import { AnimatedTitle, StaggerContainer, StaggerItem, AnimatedCard, MagneticInteraction, LUXURY_EASE } from './AnimationEngine';

export const Screen5Journey: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: 'The Crimson Pulse of Marrakech',
      subtitle: 'Chapter I • Imperial Oasis',
      quote: '“In Marrakech, time folds into terracotta walls, almond blossoms, and the haunting melody of the evening call to prayer.”',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1600',
      story: 'Enter through the ancient Bab Agnaou into a world where private courtyards conceal marble fountains, orange blossom trees, and zellige tilework. Here, our private chauffeurs usher you effortlessly through spice souks and secret royal gardens.',
      highlights: ['Secret Riad Courtyards', 'Sunset Rooftop Mint Tea', 'Botanical Majorelle Haven']
    },
    {
      title: 'The Silent Majesty of the High Atlas',
      subtitle: 'Chapter II • Mountain Highlands',
      quote: '“Where snow meets walnut valleys, Berber elders welcome you with mountain honey and centuries-old stories.”',
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1600',
      story: 'Winding through the Tizi n’Tichka pass in your Range Rover Autobiography, the landscape shifts from crimson soil to towering 4,000-meter peaks. Relax on cliffside terraces in Imlil, breathing crisp mountain air beside roaring waterfalls.',
      highlights: ['Kasbah Tamadot Vistas', 'Berber Stone Villages', 'Organic Altitude Dining']
    },
    {
      title: 'The Golden Silence of the Sahara',
      subtitle: 'Chapter III • Erg Chebbi Dunes',
      quote: '“When the desert sun dips below 150-meter golden waves, the sky explodes into millions of unhindered constellations.”',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1600',
      story: 'Cross into Erg Chebbi by private 4x4 or camel caravan. Your Royal Sahara Camp awaits with king-sized feather beds, handwoven Berber carpets, candlelit Tagine feasts, and Gnaoua drums under the starlit canopy.',
      highlights: ['Royal Tented Suites', 'Nomad Sunset Camel Trek', 'Starlight Fireside Music']
    },
    {
      title: 'The Atlantic Breeze of Essaouira',
      subtitle: 'Chapter IV • Mogador Ramparts',
      quote: '“Where Atlantic waves crash against 18th-century Portuguese bronze cannons, and Thuya wood artisans carve poetry.”',
      image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1600',
      story: 'Descend to the breezy Atlantic coast. Blue wooden fishing skiffs bring in fresh sea bass and oysters, while bohemian art galleries line stone alleys framed by whitewashed walls and thuya wood workshops.',
      highlights: ['Mogador Ramparts', 'Fresh Harbor Seafood', 'Bohemian Art Scene']
    }
  ];

  const current = chapters[activeChapter];

  return (
    <section id="screen-5" className="relative min-h-screen w-full bg-slate-100 px-4 py-[64px] md:py-[88px] lg:py-[120px] text-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedTitle
          title="Journey Through Morocco"
          badge={<><Compass className="h-3.5 w-3.5 text-teal-600" /><span>Cinematic Narrative Storytelling</span></>}
          description="A continuous sensory voyage connecting the Imperial Red City, snow-capped mountain peaks, golden Sahara sands, and Atlantic ocean waves."
          badgeClassName="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800"
          className="mb-12"
        />

        {/* Chapter Navigation Tabs */}
        <StaggerContainer className="mt-8 flex flex-wrap items-center justify-center gap-2 mb-12">
          {chapters.map((ch, idx) => (
            <StaggerItem key={idx}>
              <MagneticInteraction maxDistance={4}>
                <button
                  onClick={() => setActiveChapter(idx)}
                  className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 will-change-transform active:scale-95 ${
                    activeChapter === idx
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-800 hover:shadow-sm'
                  }`}
                >
                  {ch.subtitle.split(' • ')[1]}
                </button>
              </MagneticInteraction>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Narrative Chapter Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)', scale: 0.98 }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="group/chapter grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50 overflow-hidden relative will-change-transform"
          >
            {/* Image (7 cols) */}
            <div className="lg:col-span-7 relative h-72 sm:h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200" data-cursor="image">
              <img
                src={current.image}
                alt={current.title}
                className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-[0.22,1,0.36,1] scale-105 group-hover/chapter:scale-100 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

              <div className="absolute top-4 left-4 rounded-full border border-teal-200 bg-white/90 px-4 py-1.5 text-xs font-bold text-teal-800 backdrop-blur-md">
                {current.subtitle}
              </div>
            </div>

            {/* Narrative Editorial (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <Quote className="h-8 w-8 text-teal-600/40 mb-2" />
                <p className="font-serif text-lg sm:text-xl italic text-slate-800 font-light leading-snug">
                  {current.quote}
                </p>

                <h3 className="mt-6 font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  {current.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {current.story}
                </p>

                {/* Key Chapter Highlights */}
                <div className="mt-6 space-y-2">
                  <p className="text-xs uppercase tracking-wider text-teal-800 font-bold">
                    Chapter Moments:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 font-medium"
                      >
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress dots & Next Chapter trigger */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs relative">
                {/* Drawn line under dots */}
                <div className="absolute top-1/2 left-0 w-24 h-0.5 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: LUXURY_EASE }}
                  />
                </div>
                
                <div className="flex items-center gap-2 relative z-10">
                  {chapters.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveChapter(i)}
                      className={`h-2 rounded-full transition-all duration-500 outline-none focus:outline-none ${
                        activeChapter === i ? 'w-8 bg-teal-600 shadow-[0_0_8px_rgba(13,148,136,0.5)]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <MagneticInteraction maxDistance={4}>
                  <button
                    onClick={() => setActiveChapter((activeChapter + 1) % chapters.length)}
                    className="group/next flex items-center gap-2 text-teal-700 font-bold hover:text-teal-900 transition-colors focus:outline-none"
                  >
                    <span className="transition-transform duration-300 group-hover/next:-translate-x-1">Next Chapter</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/next:translate-x-1" />
                  </button>
                </MagneticInteraction>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
