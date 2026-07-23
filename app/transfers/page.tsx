'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Plane, ShieldCheck, Clock, Check, ArrowRight, Sparkles, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
} from '../../components/AnimationEngine';

export default function TransfersPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const transferRoutes = [
    {
      id: 'rak-marrakech',
      airport: 'Marrakech Menara (RAK)',
      city: 'Marrakech Medina / Palmeraie',
      vClassPrice: 85,
      sClassPrice: 160,
      maybachPrice: 280,
      duration: '20 - 30 Mins',
    },
    {
      id: 'cmn-casablanca',
      airport: 'Casablanca Mohammed V (CMN)',
      city: 'Casablanca Downtown / Anfa',
      vClassPrice: 120,
      sClassPrice: 210,
      maybachPrice: 380,
      duration: '45 - 60 Mins',
    },
    {
      id: 'cmn-marrakech',
      airport: 'Casablanca Mohammed V (CMN)',
      city: 'Marrakech Hotel / Riad',
      vClassPrice: 280,
      sClassPrice: 480,
      maybachPrice: 850,
      duration: '2.5 Hours',
    },
    {
      id: 'fez-saiss',
      airport: 'Fes Saïss Airport (FEZ)',
      city: 'Fes Old Medina / Ville Nouvelle',
      vClassPrice: 95,
      sClassPrice: 180,
      maybachPrice: 320,
      duration: '30 Mins',
    },
    {
      id: 'tng-tangier',
      airport: 'Tangier Ibn Battouta (TNG)',
      city: 'Tangier Port / Bay',
      vClassPrice: 110,
      sClassPrice: 200,
      maybachPrice: 350,
      duration: '25 Mins',
    },
  ];

  return (
    <AnimatedPageLayout className="relative min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950 pt-20 flex flex-col">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=2000"
            alt="VIP Airport Arrival"
            className="h-full w-full object-cover object-center brightness-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md">
            <Plane className="h-3.5 w-3.5 text-amber-400" />
            <span>Airport VIP Fast-Track & Terminal Transfers</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-amber-100">
            Seamless Airport Arrival Across Morocco
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-200/80 font-light leading-relaxed">
            Name-sign terminal greeting, customs fast-track, luggage assistance, and air-conditioned Maybach/Class fleet waiting at the VIP curb.
          </p>
        </div>
      </section>

      {/* Protocol Features */}
      <ScrollRevealSection variant="fadeUp" className="py-16 px-4 max-w-7xl mx-auto space-y-12">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <AnimatedCard className="p-6 space-y-3 bg-slate-900/80 border border-amber-500/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">Fast-Track Terminal Access</h3>
              <p className="text-xs text-amber-200/70 font-light leading-relaxed">
                Skip the immigration queue with our VIP tarmac lounge escort at CMN, RAK, and FEZ airports.
              </p>
            </AnimatedCard>
          </StaggerItem>

          <StaggerItem>
            <AnimatedCard className="p-6 space-y-3 bg-slate-900/80 border border-amber-500/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">Flight Delay Tracking</h3>
              <p className="text-xs text-amber-200/70 font-light leading-relaxed">
                We monitor real-time flight telemetry. Zero waiting stress even if your private jet or airline is delayed.
              </p>
            </AnimatedCard>
          </StaggerItem>

          <StaggerItem>
            <AnimatedCard className="p-6 space-y-3 bg-slate-900/80 border border-amber-500/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">In-Cabin Refreshments</h3>
              <p className="text-xs text-amber-200/70 font-light leading-relaxed">
                Cold mint tea, chilled Sidi Ali water, scented towels, and high-speed 5G Wi-Fi on board.
              </p>
            </AnimatedCard>
          </StaggerItem>
        </StaggerContainer>

        {/* Airport Rates Table */}
        <div className="rounded-3xl border border-amber-500/30 bg-slate-900/90 p-8 space-y-6 shadow-2xl overflow-x-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-amber-100">Fixed Airport Route Rates</h2>
            <span className="text-xs text-amber-400 font-bold">All Prices Include Tolls & Driver</span>
          </div>

          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-amber-500/20 text-amber-400 uppercase font-semibold">
                <th className="py-3 px-4">Airport</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">V-Class Van</th>
                <th className="py-3 px-4">S-Class Sedan</th>
                <th className="py-3 px-4">Maybach VIP</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10 text-amber-100">
              {transferRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-slate-950/60 transition">
                  <td className="py-4 px-4 font-bold">{route.airport}</td>
                  <td className="py-4 px-4 text-amber-200/80">{route.city}</td>
                  <td className="py-4 px-4 font-serif text-amber-300 font-bold">${route.vClassPrice}</td>
                  <td className="py-4 px-4 font-serif text-amber-300 font-bold">${route.sClassPrice}</td>
                  <td className="py-4 px-4 font-serif text-amber-300 font-bold">${route.maybachPrice}</td>
                  <td className="py-4 px-4">
                    <Link
                      href={`/booking?transfer=${route.id}`}
                      className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:brightness-110 transition inline-block"
                    >
                      Book
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
