'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Clock, ShieldCheck, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';

import {
  ScrollRevealSection,
  AnimatedCard,
} from '../../components/AnimationEngine';

export default function ContactPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2000"
            alt="VIP Concierge Desk"
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
            <Phone className="h-3.5 w-3.5 text-orange-500" />
            <span>24/7 VIP Concierge & Assistance</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Connect With Our VIP Travel Specialists
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            Have a custom travel request, delegation logistics requirement, or private helicopter query? Speak directly to our senior concierge team.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Content Grid */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatedCard className="p-8 space-y-6 bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            <h2 className="font-serif text-2xl font-bold text-slate-900">Direct VIP Channels</h2>

            <div className="space-y-4">
              <motion.a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 transition hover:bg-emerald-100/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase text-emerald-700 font-bold">WhatsApp VIP Desk</p>
                  <p className="text-sm font-bold text-slate-900">+212 600 000 000</p>
                  <p className="text-[10px] text-emerald-800/80">Instant response in &lt;5 mins</p>
                </div>
              </motion.a>

              <motion.div whileHover={{ y: -2 }} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase text-teal-700 font-bold">VIP Email Desk</p>
                  <p className="text-sm font-bold text-slate-900">vip@seemoroccotravel.com</p>
                  <p className="text-[10px] text-slate-500">Official proposals & invoicing</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase text-teal-700 font-bold">Kingdom Headquarters</p>
                  <p className="text-sm font-bold text-slate-900">Bd Mohamed VI, Hivernage, Marrakech</p>
                  <p className="text-[10px] text-slate-500">Branch: Anfa Boulevard, Casablanca</p>
                </div>
              </motion.div>
            </div>
          </AnimatedCard>
        </div>

        {/* Interactive Form */}
        <AnimatedCard className="lg:col-span-7 p-8 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Send an Executive Inquiry</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-teal-800 font-bold uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-teal-800 font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-teal-800 font-bold uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7-Day Royal Desert Expedition Inquiry"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-teal-800 font-bold uppercase tracking-wider">Message Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your preferred travel dates, vehicle preference, and guest count..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none mt-1"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-3.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition"
              >
                <Send className="h-4 w-4" />
                <span>Send VIP Message</span>
              </motion.button>
            </form>
          ) : (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center space-y-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-slate-900">Message Received</h3>
              <p className="text-xs text-slate-600">Thank you, {form.name}. A senior concierge will review your inquiry and reply within 2 hours.</p>
            </div>
          )}
        </AnimatedCard>
      </ScrollRevealSection>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
