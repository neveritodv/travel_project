'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Crown,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Linkedin,
  Compass,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="site-footer" className="relative z-20 bg-gradient-to-b from-teal-900 via-teal-950 to-slate-950 text-white pt-16 pb-12 overflow-hidden border-t border-teal-800/60">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 relative z-10">
        {/* Top Section: Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 text-center sm:text-left">
          {/* Column 1: Brand & Overview (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-6 flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-800/80 border border-teal-600/50 shadow-md group-hover:border-orange-400/80 transition duration-300">
                <Crown className="h-6 w-6 text-orange-400 group-hover:scale-110 transition duration-300" />
              </div>
              <div className="text-left">
                <span className="font-serif text-xl font-bold tracking-wider text-white uppercase block">
                  See Morocco Travel
                </span>
                <span className="text-[10px] text-teal-300/80 font-medium uppercase tracking-widest block">
                  Executive Chauffeur & VIP Expeditions
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-teal-100/80 font-light leading-relaxed max-w-md text-center sm:text-left">
              Moroccan premier luxury chauffeur and bespoke private travel curator since 2012. We deliver uncompromised discretion, royal heritage hospitality, and Mercedes-Maybach elegance across the entire Kingdom.
            </p>

            {/* Newsletter Dispatch Box */}
            <div className="pt-2 w-full max-w-md flex flex-col items-center sm:items-start">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                <span>Kingdom Travel Dispatch</span>
              </p>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full rounded-xl border border-teal-700/60 bg-teal-900/60 px-4 py-2.5 text-xs text-white placeholder-teal-300/50 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition"
                  >
                    <span>Join</span>
                    <Send className="h-3.5 w-3.5" />
                  </motion.button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-teal-500/40 bg-teal-900/80 p-3 text-xs text-teal-200 w-full">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Welcome to our private inner circle! Confirmation sent.</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-orange-300 border-b border-teal-800/80 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-teal-100/90 font-light">
              <li>
                <Link href="/" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <span className="text-orange-400/60">›</span> Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <span className="text-orange-400/60">›</span> Our Heritage & Team
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <span className="text-orange-400/60">›</span> Signature Tours
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <span className="text-orange-400/60">›</span> Maybach Fleet
                </Link>
              </li>
              <li>
                <Link href="/airport-transfers" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <span className="text-orange-400/60">›</span> Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/chauffeur" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <span className="text-orange-400/60">›</span> Executive Chauffeur
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations & Experiences */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-orange-300 border-b border-teal-800/80 pb-2">
              Kingdom Destinations
            </h3>
            <ul className="space-y-2.5 text-xs text-teal-100/90 font-light">
              <li>
                <Link href="/destinations" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-teal-400" /> Marrakech Medina
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-teal-400" /> Sahara Desert Glamping
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-teal-400" /> Imperial Fes & Meknes
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-teal-400" /> Blue Chefchaouen
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-teal-400" /> High Atlas Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-orange-300 transition duration-200 flex items-center gap-1.5">
                  <Compass className="h-3 w-3 text-orange-400" /> Bespoke Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & VIP Concierge */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-orange-300 border-b border-teal-800/80 pb-2">
              VIP Desk & Portal
            </h3>
            <div className="space-y-3 text-xs text-teal-100/90 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Hivernage Executive District, Marrakech, Kingdom of Morocco</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-orange-400 shrink-0" />
                <span>WhatsApp: +212 600 000 000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-orange-400 shrink-0" />
                <span>vip@seemoroccotravel.com</span>
              </div>

              <div className="pt-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-800/90 border border-teal-600/80 px-3.5 py-2 text-xs font-bold text-orange-300 hover:bg-teal-700 hover:text-white transition shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  <span>Admin & Client Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-teal-800/80 my-8" />

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-teal-200/80">
          <p className="text-center md:text-left font-light">
            © {new Date().getFullYear()} <strong className="text-white font-semibold">See Morocco Travel</strong> & Executive Chauffeur Services. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map((s, idx) => {
                const IconComp = s.icon;
                return (
                  <motion.a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-900/80 border border-teal-700/60 text-teal-200 hover:text-orange-400 hover:border-orange-400 transition"
                  >
                    <IconComp className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px] text-teal-300/70 border-l border-teal-800/80 pl-6">
              <Link href="/about" className="hover:text-orange-300 transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="/about" className="hover:text-orange-300 transition">Terms of Service</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-orange-300 transition">VIP Protocol</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
