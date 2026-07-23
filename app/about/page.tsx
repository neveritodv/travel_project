'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, Award, ShieldCheck, Heart, Users, MapPin, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { CanvasParticles } from '../../components/CanvasParticles';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedTitle,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
  AnimatedImage,
} from '../../components/AnimationEngine';
import { STATS } from '../../lib/data';

export default function AboutPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const timelineEvents = [
    { year: '2012', title: 'Foundation in Marrakech', desc: 'Started with two luxury Mercedes 4x4s serving private guests seeking authentic Berber desert expeditions.' },
    { year: '2016', title: 'Maybach VIP Fleet Expansion', desc: 'Introduced custom Maybach V-Class executive vans with starlight roofs, Wi-Fi, and multilingual chauffeurs.' },
    { year: '2020', title: 'Royal Sahara Camp Launch', desc: 'Established our private 5-star glamping camp in Erg Chebbi with king tented suites and gourmet dining.' },
    { year: '2024', title: 'Sustainable & AI Hospitality', desc: 'Integrated eco-conscious desert logistics and AI travel concierge tools for instantaneous VIP service.' },
    { year: '2026', title: 'Morocco’s Premier VIP Travel Brand', desc: 'Over 12,800 guests served with 99.8% 5-star ratings across 35 luxury fleet vehicles.' },
  ];

  const values = [
    { icon: Crown, title: 'Royal Hospitality', desc: 'Every guest is treated like royalty. From ice-cold silver tray mint tea to custom seating comfort.' },
    { icon: ShieldCheck, title: 'Absolute Safety & Reliability', desc: 'Rigorous fleet maintenance, real-time GPS tracking, and experienced off-road master drivers.' },
    { icon: Heart, title: 'Authentic Cultural Heritage', desc: 'We partner directly with local Berber communities, nomadic elders, and artisan cooperatives.' },
    { icon: Sparkles, title: 'Uncompromising Elegance', desc: 'No shared buses, no rushed tour stops. Everything is 100% private and curated to your tempo.' },
  ];

  return (
    <AnimatedPageLayout className="bg-slate-50 font-sans text-slate-800 selection:bg-orange-500 selection:text-white pt-20">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header with Cinematic Video Ambient */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[65vh] min-h-[480px] w-full flex items-center justify-center overflow-hidden border-b border-teal-200"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2000"
            alt="Moroccan Riad Hospitality"
            className="h-full w-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        </div>

        <CanvasParticles mode="stars" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800 backdrop-blur-md mb-4 shadow-sm"
          >
            <Award className="h-3.5 w-3.5 text-orange-500" />
            <span>Fourteen Years of Kingdom Excellence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Crafting Unforgettable Moroccan Journeys
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            See Morocco Travel is Morocco’s premier luxury chauffeur and private expedition curator. We unlock authentic royal heritage, majestic landscapes, and serene comfort.
          </motion.p>
        </div>
      </motion.section>

      {/* Story & Philosophy */}
      <ScrollRevealSection variant="fadeUp" className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-teal-800 font-bold">
            <Compass className="h-4 w-4 text-teal-600" />
            <span>Our Heritage Story</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Where Ancient Traditions Meet Executive Luxury
          </h2>

          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Founded in Marrakech in 2012, See Morocco Travel was born from a simple passion: to share the authentic soul of Morocco with travelers who demand uncompromised comfort, discretion, and personalized care.
          </p>

          <p className="text-sm text-slate-600 font-light leading-relaxed">
            From the bustling red medinas of Marrakech and Fes to the snow peaks of the High Atlas and the silent golden dunes of Erg Chebbi, our executive Maybach fleet and expert chauffeurs serve as your trusted guardians across the kingdom.
          </p>

          <StaggerContainer className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            {STATS.map((s, i) => (
              <StaggerItem key={i}>
                <AnimatedCard className="p-4 bg-white border border-slate-200 shadow-sm">
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-orange-600">{s.value}</p>
                  <p className="text-xs uppercase text-slate-500 font-bold mt-1">{s.label}</p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="lg:col-span-6 relative">
          <AnimatedImage className="h-[420px] w-full rounded-3xl border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Moroccan Riad Courtyard"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl border border-teal-200 bg-white/95 backdrop-blur-md shadow-lg pointer-events-auto">
              <p className="font-serif text-lg italic text-slate-900">
                “In Moroccan culture, a guest is a gift from God. We honor every journey with royal warmth.”
              </p>
              <p className="text-xs text-orange-600 font-bold uppercase mt-2">— Founder & Managing Director</p>
            </div>
          </AnimatedImage>
        </div>
      </ScrollRevealSection>

      {/* Interactive Timeline */}
      <ScrollRevealSection variant="fadeUp" className="py-20 px-4 bg-teal-50/50 border-y border-teal-200">
        <div className="max-w-5xl mx-auto space-y-12">
          <AnimatedTitle
            title="Our Journey Through the Years"
            subtitle="Evolution of See Morocco Travel"
          />

          <StaggerContainer className="space-y-6">
            {timelineEvents.map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white border border-slate-200">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 font-serif text-xl font-bold text-teal-700">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-light mt-1">{item.desc}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ScrollRevealSection>

      {/* Core Values */}
      <ScrollRevealSection variant="fadeUp" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
        <AnimatedTitle
          title="Our Core Pillars of Service"
          subtitle="The standard behind every VIP experience"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <StaggerItem key={i}>
                <AnimatedCard className="p-6 space-y-3 bg-white border border-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">{v.desc}</p>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
