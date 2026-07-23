'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Compass, Clock, Users, Star, ArrowLeft, ArrowRight, Check, X, Shield, Calendar, MapPin, Sparkles, Phone, MessageSquare } from 'lucide-react';
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
import { TOURS, TourItem } from '../../../lib/data';

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number>(1);

  // Find tour by id or slug
  const tour = TOURS.find((t) => t.id === slug || t.id === 'merzouga-desert-luxury') || TOURS[0];

  return (
    <AnimatedPageLayout className="relative min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950 pt-20 flex flex-col">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header */}
      <section className="relative h-[65vh] min-h-[480px] w-full flex items-end pb-16 overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.featuredImage}
            alt={tour.title}
            className="h-full w-full object-cover object-center brightness-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-950/80 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md hover:bg-amber-500 hover:text-slate-950 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back To Experiences Catalog</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
              {tour.category} Private Expedition
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/20">
              <Clock className="h-3.5 w-3.5" /> {tour.duration}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/20">
              <Star className="h-3.5 w-3.5 fill-amber-400" /> {tour.rating} ({tour.reviewCount} VIP Reviews)
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-amber-100 max-w-4xl">
            {tour.title}
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-amber-200/80 font-light leading-relaxed">
            {tour.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <ScrollRevealSection variant="fadeUp" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Itinerary & Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Overview */}
          <AnimatedCard className="p-8 space-y-6 bg-slate-900/90 border border-amber-500/20">
            <h2 className="font-serif text-2xl font-bold text-amber-100">Expedition Philosophy & Overview</h2>
            <p className="text-sm text-amber-200/80 font-light leading-relaxed">
              {tour.description}
            </p>

            <div className="pt-4 border-t border-amber-500/15">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Key Highlights</h3>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((h, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/10 bg-slate-950 p-3 text-xs text-amber-100 font-medium">
                      <Check className="h-4 w-4 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </AnimatedCard>

          {/* Day-by-Day Itinerary */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-amber-100">Day-by-Day Private Itinerary</h2>
              <span className="text-xs text-amber-400 font-bold">{tour.itinerary.length} Days Program</span>
            </div>

            <div className="space-y-4">
              {tour.itinerary.map((day) => (
                <div
                  key={day.day}
                  className={`rounded-2xl border transition ${
                    activeDay === day.day
                      ? 'border-amber-400 bg-slate-900 p-6 shadow-xl'
                      : 'border-amber-500/15 bg-slate-950/60 p-5 hover:border-amber-500/40'
                  }`}
                >
                  <button
                    onClick={() => setActiveDay(day.day)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 font-serif font-bold text-sm border border-amber-400/30">
                        0{day.day}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-amber-100">{day.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-amber-400">{activeDay === day.day ? 'Collapse' : 'Expand'}</span>
                  </button>

                  {activeDay === day.day && (
                    <p className="mt-4 text-xs sm:text-sm text-amber-200/80 font-light leading-relaxed border-t border-amber-500/10 pt-4">
                      {day.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Showcase */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-amber-100">Expedition Gallery</h2>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tour.gallery.map((img, i) => (
                <StaggerItem key={i}>
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-amber-500/20">
                    <img src={img} alt={`${tour.title} Gallery ${i}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Inclusions & Exclusions */}
          <AnimatedCard className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 bg-slate-900/90 border border-amber-500/20">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-emerald-400 flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span>VIP Inclusions</span>
              </h3>
              <ul className="space-y-2 text-xs text-amber-200/80 font-light">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-rose-400 flex items-center gap-2">
                <X className="h-5 w-5 text-rose-400" />
                <span>Exclusions & Notes</span>
              </h3>
              <ul className="space-y-2 text-xs text-amber-200/80 font-light">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        </div>

        {/* Right Sticky Booking Box */}
        <div className="lg:col-span-4 space-y-6">
          <AnimatedCard className="sticky top-28 p-8 space-y-6 bg-slate-900/95 border border-amber-500/30 backdrop-blur-2xl">
            <div className="border-b border-amber-500/15 pb-4 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-amber-400/80 font-semibold">Private All-Inclusive Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-amber-300">${tour.pricePerPerson}</span>
                <span className="text-xs text-amber-200/60 font-light">/ guest</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-amber-200/80">
              <div className="flex items-center justify-between">
                <span>Min Guests:</span>
                <span className="font-bold text-amber-100">1 Guest (Private)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vehicle Fleet:</span>
                <span className="font-bold text-amber-100">Mercedes-Benz V-Class / 4x4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cancellation:</span>
                <span className="font-bold text-emerald-400">Free up to 72h before</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={`/booking?tour=${tour.id}`}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-xs font-bold text-slate-950 shadow-xl hover:brightness-110 transition"
              >
                <span>Reserve This Expedition</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={`https://wa.me/212600000000?text=Hello!%20I%20want%20to%20inquire%20about%20${encodeURIComponent(tour.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-950/60 transition"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp VIP Concierge</span>
              </a>
            </div>

            <div className="pt-2 border-t border-amber-500/15 text-[11px] text-amber-300/70 text-center flex items-center justify-center gap-1">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Official Tourism Ministry Guaranteed</span>
            </div>
          </AnimatedCard>
        </div>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
