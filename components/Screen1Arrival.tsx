'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Compass, ChevronDown, Sparkles, Shield, Award, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { CanvasParticles } from './CanvasParticles';
import { MagneticInteraction } from './AnimationEngine';

interface Screen1Props {
  onOpenAIConcierge: () => void;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  fallback: string;
  particleMode: 'sand' | 'stars' | 'fog';
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'desert',
    title: 'Sahara Golden Dunes',
    subtitle: 'Erg Chebbi Private Camps',
    image: 'https://images.unsplash.com/photo-1512552288940-3a300922a275?auto=format&fit=crop&q=80&w=2500',
    fallback: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=2500',
    particleMode: 'sand',
  },
  {
    id: 'riad',
    title: 'Royal Riad Sanctuary',
    subtitle: 'Marrakech Palaces & Courtyards',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=2000',
    fallback: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=2000',
    particleMode: 'stars',
  },
  {
    id: 'atlas',
    title: 'High Atlas Horizons',
    subtitle: 'Berber Peaks & Alpine Valleys',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=2000',
    fallback: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=2000',
    particleMode: 'fog',
  },
  {
    id: 'imperial',
    title: 'Chefchaouen Blue Pearl',
    subtitle: 'Rif Mountains & Ancient Medina',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2000',
    fallback: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=2000',
    particleMode: 'sand',
  },
];

export const Screen1Arrival: React.FC<Screen1Props> = ({ onOpenAIConcierge }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  // Preload all hero slide images and fallbacks on mount to ensure instant 0ms switching
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      if (slide.fallback) {
        const fallbackImg = new Image();
        fallbackImg.src = slide.fallback;
      }
    });
  }, []);

  // Next / Previous slide handlers with manual timer reset for fluid autoplay
  const nextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Continuous Autoplay Timer (5 seconds per slide), never pauses on hover or interaction
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlideIndex]);

  const handleImageError = (slideId: string) => {
    setImgErrorMap((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section
      id="screen-1"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-slate-50 text-slate-800 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16"
    >
      {/* Hero Background Image Slider with Smooth GPU-Accelerated Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 20, ease: 'easeOut' }
            }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img
              src={imgErrorMap[currentSlide.id] ? currentSlide.fallback : currentSlide.image}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              onError={() => handleImageError(currentSlide.id)}
              className="h-full w-full object-cover object-center md:object-[center_35%] lg:object-center will-change-transform"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft White/Cream Overlay (20-35% opacity) to preserve bright vibrant hero image while ensuring text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/25 to-slate-50/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.30)_0%,rgba(254,243,199,0.15)_50%,rgba(255,255,255,0.35)_100%)] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50/60 via-slate-50/20 to-transparent pointer-events-none" />
      </div>

      {/* Particle System Layer */}
      <CanvasParticles mode={currentSlide.particleMode} className="z-1" />

      {/* Hero Content Container - Centered Alignment across all devices */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-auto flex flex-col items-center text-center w-full">
        {/* Animated Royal Crest Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 flex items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 sm:px-[18px] py-2 sm:py-[10px] max-w-[90%] text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.18em] text-teal-900 shadow-md shadow-slate-200/50 backdrop-blur-md text-center leading-normal"
        >
          <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 animate-pulse shrink-0" />
          <span>Next-Generation Moroccan Luxury Voyages</span>
        </motion.div>

        {/* Main Title / Brand Reveal with Word-by-Word Blur */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
          className="font-serif font-bold tracking-tight text-slate-900 max-w-5xl leading-[1.05] text-[clamp(40px,8.5vw,52px)] md:text-[clamp(60px,7.5vw,76px)] lg:text-[clamp(90px,8vw,108px)]"
        >
          {['SEE', 'MOROCCO'].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="inline-block mr-[2vw]"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="font-light italic text-teal-600 block sm:inline mt-1 sm:mt-0 text-[clamp(32px,7.5vw,40px)] md:text-[clamp(50px,6.5vw,62px)] lg:text-[clamp(70px,7vw,82px)] inline-block"
          >
            TRAVEL
          </motion.span>
        </motion.h1>

        {/* Hero Description with Device-Specific Width Caps */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 sm:mt-5 max-w-[320px] md:max-w-[520px] lg:max-w-[650px] text-base sm:text-lg md:text-xl text-slate-600 font-light leading-[1.7] mx-auto text-center"
        >
          An immersive private sanctuary on wheels. Discover golden Sahara dunes, secret imperial medinas, and High Atlas peaks in Maybach executive comfort.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-7 lg:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-[340px] sm:max-w-none mx-auto"
        >
          <MagneticInteraction>
            <a
              href="#screen-2"
              className="group relative w-full sm:w-auto min-h-[54px] max-w-[340px] flex items-center justify-center gap-3 rounded-full bg-orange-500 text-white px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-500 overflow-hidden shadow-[0_0_0_rgba(249,115,22,0)] hover:shadow-[0_12px_24px_rgba(249,115,22,0.4)] whitespace-nowrap will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-0.5">Begin Your Journey</span>
              <Compass className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:rotate-45 group-hover:-translate-y-0.5 group-hover:scale-110" />
            </a>
          </MagneticInteraction>

          <MagneticInteraction>
            <button
              onClick={onOpenAIConcierge}
              className="group relative w-full sm:w-auto min-h-[54px] max-w-[340px] flex items-center justify-center gap-2.5 rounded-full border border-teal-500/80 bg-white/95 px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-teal-800 shadow-md shadow-slate-200/50 backdrop-blur-md transition-all duration-500 hover:text-white hover:border-teal-400 overflow-hidden hover:shadow-[0_12px_24px_rgba(13,148,136,0.3)] whitespace-nowrap will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-700 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Sparkles className="relative z-10 h-4 w-4 text-orange-500 group-hover:text-amber-300 transition-all duration-500 group-hover:-translate-y-0.5" />
              <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-0.5">AI Concierge Planner</span>
            </button>
          </MagneticInteraction>
        </motion.div>

        {/* Interactive Atmospheric Carousel Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-7 sm:mt-8 flex flex-col items-center gap-3 w-full"
        >
          <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-white/90 p-1.5 sm:p-2 shadow-xl shadow-slate-200/50 backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar scroll-smooth">
            {/* Prev / Next Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Hero Image"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Slide Horizon Buttons */}
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all duration-300 shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
                  <span>{slide.title}</span>
                </button>
              );
            })}

            <button
              onClick={nextSlide}
              aria-label="Next Hero Image"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Active Subtitle Indicator */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-widest text-teal-800 font-bold"
            >
              Active Horizon ({activeSlideIndex + 1}/{HERO_SLIDES.length}): {currentSlide.subtitle}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick Luxury Trust Bar Footer */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full mt-6 sm:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-teal-600 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">100% Private Voyages</p>
              <p className="text-[11px] text-slate-500">Dedicated VIP Vehicle & Driver</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-teal-600 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">Maybach & Range Rover</p>
              <p className="text-[11px] text-slate-500">Executive Chauffeur Fleet</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-orange-500 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">24/7 VIP Concierge</p>
              <p className="text-[11px] text-slate-500">Multilingual Personal Support</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-teal-600 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">All Morocco Destinations</p>
              <p className="text-[11px] text-slate-500">Marrakech, Sahara, Fes, Coast</p>
            </div>
          </div>
        </div>

        <a
          href="#screen-2"
          aria-label="Scroll to map"
          className="mx-auto mt-6 flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-teal-700 transition hover:border-teal-500 hover:bg-teal-50"
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

