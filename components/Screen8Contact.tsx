'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Mail, Phone, MapPin, MessageSquare, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { CanvasParticles } from './CanvasParticles';

interface Screen8Props {
  onOpenAIConcierge: () => void;
}

export const Screen8Contact: React.FC<Screen8Props> = ({ onOpenAIConcierge }) => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="screen-8" className="relative w-full bg-slate-50 px-4 py-20 text-slate-800 flex flex-col justify-center overflow-hidden">
      {/* Background Subtle Sand/Sky Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=2000"
          alt="Sahara Sunset"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-slate-50/40" />
      </div>

      <CanvasParticles mode="stars" />

      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-700">
            <Crown className="h-3.5 w-3.5 text-orange-500" />
            <span>24/7 Royal Concierge Desk</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Your Kingdom Voyage Awaits
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 font-light">
            Contact our dedicated VIP travel managers for personal itinerary curation, immediate Maybach transfers, or bespoke luxury glamping reservations.
          </p>
        </div>

        {/* Contact Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl space-y-6">
              <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                VIP Direct Channels
              </h3>

              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 transition hover:bg-emerald-100/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold shrink-0">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase text-emerald-700 font-bold">WhatsApp Direct Desk</p>
                  <p className="font-serif text-lg font-bold text-slate-900">+212 600 000 000</p>
                  <p className="text-[11px] text-emerald-800/80">Instant 24/7 VIP Response</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 border border-teal-200 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-teal-700 font-bold">VIP Email Concierge</p>
                  <p className="text-sm font-bold text-slate-900">vip@seemoroccotravel.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 border border-teal-200 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-teal-700 font-bold">Marrakech Royal Headquarters</p>
                  <p className="text-xs text-slate-600 font-light mt-0.5">
                    Boulevard Mohamed VI, Hivernage District, Marrakech, Morocco
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAIConcierge}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-teal-600/20 transition"
              >
                <Sparkles className="h-4 w-4 text-orange-300" />
                <span>Launch AI Travel Concierge</span>
              </button>
            </div>
          </div>

          {/* Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Send a Royal Inquiry
              </h3>
              <p className="text-xs text-slate-500 font-light mb-6">
                Fill in your travel dates or requests, and our Senior Travel Manager will respond within 2 hours.
              </p>

              {!formSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-teal-800 font-bold mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Lord Harrington"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-teal-800 font-bold mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vip@domain.com"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-teal-800 font-bold mb-1.5">
                      Message / Travel Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your travel dates, passenger count, preferred vehicles, or dream destinations..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-orange-500/20 transition"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Royal Inquiry</span>
                  </button>
                </form>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-2xl font-bold text-slate-900">
                    Inquiry Received with Royal Care
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {name || 'valued guest'}. Your private travel advisor has been assigned and will reply to {email || 'your email'} shortly.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-4 rounded-xl border border-emerald-300 bg-white px-6 py-2.5 text-xs text-emerald-800 font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
