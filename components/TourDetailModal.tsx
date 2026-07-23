'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, CheckCircle2, XCircle, Star, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { TourItem } from '../lib/data';

interface TourDetailModalProps {
  tour: TourItem | null;
  onClose: () => void;
  onBookTour: (tourTitle: string) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose, onBookTour }) => {
  if (!tour) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
        >
          {/* Header Banner */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
            <img
              src={tour.featuredImage}
              alt={tour.title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-slate-900/10" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-white/80 p-2 text-slate-800 border border-slate-200 transition hover:bg-white hover:text-slate-950"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  {tour.category}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-orange-400 border border-white/20 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-orange-400 text-orange-400" /> {tour.rating} ({tour.reviewCount} Reviews)
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
                {tour.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-light mt-1">
                {tour.subtitle}
              </p>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-800">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-center">
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold">Duration</p>
                <p className="font-bold text-slate-900 mt-0.5">{tour.duration}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold">Starting From</p>
                <p className="font-bold text-slate-900 mt-0.5">{tour.startingFrom}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-500 font-bold">Price / Person</p>
                <p className="font-bold text-orange-600 mt-0.5">€{tour.pricePerPerson}</p>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Journey Experience Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                Key Signature Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                {tour.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
                Day-by-Day Detailed Itinerary
              </h3>
              <div className="space-y-4">
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                        {day.day}
                      </span>
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        {day.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-10 font-light">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
                <h4 className="font-serif text-sm font-bold text-emerald-800 uppercase tracking-wider">
                  Included in VIP Package
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {tour.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 space-y-3">
                <h4 className="font-serif text-sm font-bold text-rose-800 uppercase tracking-wider">
                  Exclusions
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {tour.exclusions.map((exc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Sticky Footer CTA */}
          <div className="border-t border-slate-100 bg-slate-50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div>
              <p className="text-xs text-slate-500 font-medium">Guaranteed 100% Private Tour</p>
              <p className="font-serif text-xl font-bold text-slate-900">
                €{tour.pricePerPerson} <span className="text-xs font-sans text-slate-500 font-normal">/ guest</span>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onBookTour(tour.title);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 transition"
              >
                <span>Reserve This Experience</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
