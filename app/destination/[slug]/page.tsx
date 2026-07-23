'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, MapPin, Sun, Clock, Camera, ArrowLeft, ArrowRight, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { AIConciergeModal } from '../../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
} from '../../../components/AnimationEngine';
import { DESTINATIONS, DestinationHotspot, TOURS } from '../../../lib/data';

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const dest = DESTINATIONS.find((d) => d.id === slug || d.id === 'marrakech') || DESTINATIONS[0];
  const relatedTours = TOURS.filter((t) => t.highlights.some((h) => h.toLowerCase().includes(dest.name.toLowerCase())) || t.description.toLowerCase().includes(dest.name.toLowerCase()));

  return (
    <AnimatedPageLayout className="relative min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950 pt-20 flex flex-col">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header */}
      <section className="relative h-[65vh] min-h-[480px] w-full flex items-end pb-16 overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 z-0">
          <img
            src={dest.image}
            alt={dest.name}
            className="h-full w-full object-cover object-center brightness-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-950/80 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md hover:bg-amber-500 hover:text-slate-950 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back To Moroccan Map</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
              {dest.category} Region
            </span>
            <span className="text-xs font-bold text-amber-400 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/20">
              Arabic: {dest.arabicName}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-amber-100">
            {dest.name}
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-amber-200/80 font-light leading-relaxed">
            {dest.shortTag}
          </p>
        </div>
      </section>

      {/* Destination Overview Grid */}
      <ScrollRevealSection variant="fadeUp" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <AnimatedCard className="p-8 space-y-6 bg-slate-900/90 border border-amber-500/20">
              <h2 className="font-serif text-2xl font-bold text-amber-100">Hotspot Description</h2>
              <p className="text-sm text-amber-200/80 font-light leading-relaxed">
                {dest.description}
              </p>

              <div className="pt-4 border-t border-amber-500/15">
                <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Must-See Highlights</h3>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dest.mustSee.map((ms, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/10 bg-slate-950 p-3 text-xs text-amber-100 font-medium">
                        <Camera className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>{ms}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </AnimatedCard>

            {/* Related Private Tours */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-amber-100">Private Expeditions Visiting {dest.name}</h2>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(relatedTours.length > 0 ? relatedTours : TOURS.slice(0, 2)).map((tour) => (
                  <StaggerItem key={tour.id}>
                    <AnimatedCard className="p-5 space-y-3 bg-slate-900 border border-amber-500/20">
                      <h3 className="font-serif text-lg font-bold text-amber-100">{tour.title}</h3>
                      <p className="text-xs text-amber-200/70 font-light line-clamp-2">{tour.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif text-amber-300 font-bold">${tour.pricePerPerson}</span>
                        <Link href={`/experience/${tour.id}`} className="text-xs font-bold text-amber-400 hover:underline">
                          View Itinerary &rarr;
                        </Link>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <AnimatedCard className="p-8 space-y-6 bg-slate-900/90 border border-amber-500/30">
              <h3 className="font-serif text-xl font-bold text-amber-100">Travel Protocol</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
                  <span className="text-amber-400/80 uppercase font-semibold">Drive From Marrakech:</span>
                  <span className="font-bold text-amber-100">{dest.driveFromMarrakech}</span>
                </div>
                <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
                  <span className="text-amber-400/80 uppercase font-semibold">Recommended Stay:</span>
                  <span className="font-bold text-amber-100">{dest.recommendedDuration}</span>
                </div>
                <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
                  <span className="text-amber-400/80 uppercase font-semibold">Region:</span>
                  <span className="font-bold text-amber-100">{dest.region}</span>
                </div>
              </div>

              <Link
                href={`/booking?destination=${dest.id}`}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-xs font-bold text-slate-950 shadow-xl hover:brightness-110 transition"
              >
                <span>Book Custom Route to {dest.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedCard>
          </div>
        </div>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
