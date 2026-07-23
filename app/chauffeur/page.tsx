'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Crown, Clock, ShieldCheck, User, Star, ArrowRight, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedTitle,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
} from '../../components/AnimationEngine';

export default function ChauffeurPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const packages = [
    { title: '4-Hour City Standby', desc: 'Ideal for Marrakech medina dining, shopping, and gallery visits.', rate: 180, includes: ['100km Fuel Included', 'Chilled Mineral Water & Mints', 'Multilingual VIP Chauffeur', 'Flexible Waiting Time'] },
    { title: 'Full Day Kingdom Disposal (10 Hours)', desc: 'Dedicated driver & vehicle for mountain excursions, meetings, or coastal drives.', rate: 350, includes: ['250km Fuel Included', '5G Wi-Fi & Charging Cables', 'Personal Logistics Assistance', 'Flexible Overtime Tiers'] },
    { title: 'Multi-Day VIP Road Trip', desc: 'Dedicated chauffeur across Marrakech, Sahara Desert, Fes & Casablanca.', rate: 450, includes: ['Unlimited Daily Distance', 'Chauffeur Accommodation Included', 'Custom Itinerary Guidance', '24/7 Concierge Hotline'] },
  ];

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
            src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=2000"
            alt="VIP Chauffeur Service"
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
            <Crown className="h-3.5 w-3.5 text-orange-500" />
            <span>Dedicated Personal Chauffeurs</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Royal Chauffeur Disposal Service
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            Travel Morocco with total peace of mind. Experienced, multilingual chauffeurs dedicated exclusively to your schedule, security, and personal comfort.
          </motion.p>
        </div>
      </motion.section>

      {/* Service Packages */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto space-y-12"
      >
        <AnimatedTitle
          title="Chauffeur Disposal Tiers"
          subtitle="Tailored to your itinerary tempo"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((p, i) => (
            <StaggerItem key={i}>
              <AnimatedCard className="p-8 flex flex-col justify-between space-y-6 bg-white border border-slate-200">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{p.desc}</p>
                  <div className="font-serif text-3xl font-bold text-orange-600">
                    €{p.rate} <span className="text-xs font-sans font-normal text-slate-500">/ rate</span>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    {p.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={`/booking?service=Private%20Chauffeur&package=${encodeURIComponent(p.title)}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-3 text-xs font-bold text-white transition shadow-md shadow-orange-500/20"
                  >
                    <span>Select {p.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
