'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Plane, Clock, ShieldCheck, Sparkles, MapPin, ArrowRight, UserCheck, Luggage, Coffee } from 'lucide-react';
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

export default function AirportTransfersPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('Marrakech Menara (RAK)');
  const [passengerCount, setPassengerCount] = useState(2);

  const transferRoutes = [
    { from: 'Marrakech Menara Airport (RAK)', to: 'Marrakech City / Medina Riad', duration: '20-30 mins', rate: 45 },
    { from: 'Marrakech Menara Airport (RAK)', to: 'Agafay Desert Luxury Camp', duration: '45 mins', rate: 75 },
    { from: 'Casablanca Mohammed V Airport (CMN)', to: 'Casablanca City Hotel', duration: '35 mins', rate: 65 },
    { from: 'Casablanca Mohammed V Airport (CMN)', to: 'Marrakech City Riad', duration: '2.5 Hours', rate: 180 },
    { from: 'Casablanca Mohammed V Airport (CMN)', to: 'Rabat / Fes Medina', duration: '2-3 Hours', rate: 160 },
    { from: 'Fes Saïss Airport (FEZ)', to: 'Fes Ancient Medina Riad', duration: '25 mins', rate: 45 },
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
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000"
            alt="VIP Airport Transfer"
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
            <Plane className="h-3.5 w-3.5 text-orange-500" />
            <span>VIP Airport Arrival Protocol</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Seamless Airport Chauffeur Transfers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            Real-time flight radar tracking, personalized terminal greeting with custom iPad signage, luggage handling, and executive Maybach air-conditioned comfort.
          </motion.p>
        </div>
      </motion.section>

      {/* Greeting Protocol Workflow */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto space-y-12"
      >
        <AnimatedTitle
          title="Our 4-Step Royal Greeting Workflow"
          subtitle="Zero wait time. Zero stress."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', icon: Plane, title: 'Flight Radar Tracking', desc: 'We monitor your incoming flight number in real time. Early or delayed landing? Your chauffeur adjusts automatically.' },
            { step: '02', icon: UserCheck, title: 'Terminal Gate Welcome', desc: 'Your uniformed VIP chauffeur waits right outside customs holding an iPad with your name or corporate logo.' },
            { step: '03', icon: Luggage, title: 'Porter & Luggage Care', desc: 'Full porter assistance. Relax while your luggage is escort-loaded into your climate-controlled vehicle.' },
            { step: '04', icon: Coffee, title: 'Chilled VIP Departure', desc: 'Enjoy cold mineral water, fresh mint towels, 5G Wi-Fi, and smooth transit straight to your riad doorway.' },
          ].map((s, i) => {
            const IconComp = s.icon;
            return (
              <StaggerItem key={i}>
                <AnimatedCard className="p-6 space-y-3 relative bg-white border border-slate-200">
                  <span className="font-serif text-3xl font-bold text-slate-200 absolute top-4 right-4">{s.step}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 text-teal-600">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">{s.desc}</p>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Transfer Rate Catalog */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 space-y-6 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Fixed Rate Airport Routes</h3>
              <p className="text-xs text-slate-500 font-medium">All rates include driver, tolls, bottled water & 60 mins complimentary wait time.</p>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/booking?service=Airport%20Transfer"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-xs font-bold text-white transition shadow-md shadow-orange-500/20"
              >
                <span>Book Airport Transfer</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transferRoutes.map((route, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard className="p-5 space-y-3 flex flex-col justify-between bg-slate-50 border border-slate-200 hover:bg-white hover:border-teal-300">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                      <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                      <span>{route.from}</span>
                    </div>
                    <p className="text-xs text-slate-900 font-serif font-bold mt-2">→ {route.to}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">Est. Duration: {route.duration}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="font-serif text-xl font-bold text-orange-600">€{route.rate}</span>
                    <Link
                      href={`/booking?service=Airport%20Transfer&route=${encodeURIComponent(route.from + ' to ' + route.to)}`}
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline"
                    >
                      Select Route →
                    </Link>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
