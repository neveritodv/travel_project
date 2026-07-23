'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Send, Bot, MessageSquare, ShieldCheck, Compass, ArrowRight, MapPin, Calendar, Compass as StyleIcon, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LuxurySelect } from './LuxuryForm';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [travelStyle, setTravelStyle] = useState('Royal Luxury & Desert Glamping');
  const [duration, setDuration] = useState('4 Days / 3 Nights');
  const [guests, setGuests] = useState('2 Guests');
  const [startingCity, setStartingCity] = useState('Marrakech');
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResultText(null);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          travelStyle,
          duration,
          guests,
          startingCity,
        }),
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setResultText(data.text);
      } else {
        setResultText('Our VIP Concierge team is processing your request. Please message our WhatsApp line directly at +212 600 000 000.');
      }
    } catch (err) {
      console.error(err);
      setResultText('Error reaching AI Concierge. Please try again or contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppWithResult = () => {
    const textToSend = encodeURIComponent(
      `Hello See Morocco Travel VIP Team! I generated a custom itinerary using your AI Concierge:\n\nStyle: ${travelStyle}\nDuration: ${duration}\nGuests: ${guests}\nStarting: ${startingCity}\nNotes: ${prompt || 'Custom trip inquiry'}\n\nPlease review and send me official pricing!`
    );
    window.open(`https://wa.me/212600000000?text=${textToSend}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Click Outside Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-[2px]"
      />

      {/* Floating Chat Panel (Bottom Right on Desktop, Bottom Sheet on Mobile) */}
      <div
        className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-28 sm:right-8 z-50 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concierge-modal-title"
      >
        <motion.div
          layoutId="ai-concierge-panel"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="pointer-events-auto flex max-h-[85vh] sm:max-h-[600px] w-full sm:w-[380px] flex-col overflow-hidden rounded-[24px] border border-slate-200/90 bg-white/95 shadow-[0_24px_50px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-teal-200/80 bg-teal-50 text-teal-600 shadow-sm">
                <Sparkles className="h-4.5 w-4.5 text-teal-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="concierge-modal-title" className="font-serif text-base font-bold text-slate-900">
                    See Morocco Concierge
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 border border-teal-200/80 px-2 py-0.5 text-[9px] font-bold text-teal-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-ping" />
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-light">
                  Bespoke Moroccan Itineraries
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Concierge Modal"
              className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-200/60 hover:text-slate-700 focus:outline-none"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {!resultText ? (
              <form onSubmit={handleGenerate} className="space-y-3.5">
                <div className="space-y-3">
                  <LuxurySelect
                    label="Starting Location"
                    icon={<MapPin className="h-3.5 w-3.5" />}
                    value={startingCity}
                    onChange={(val) => setStartingCity(val)}
                    options={[
                      { value: 'Marrakech', label: 'Marrakech Airport / Riad' },
                      { value: 'Casablanca', label: 'Casablanca Mohammed V Airport' },
                      { value: 'Fes', label: 'Fes Saïss Airport / Medina' },
                      { value: 'Tangier', label: 'Tangier Port / Airport' },
                      { value: 'Agadir', label: 'Agadir Al Massira' },
                    ]}
                  />

                  <LuxurySelect
                    label="Travel Duration"
                    icon={<Calendar className="h-3.5 w-3.5" />}
                    value={duration}
                    onChange={(val) => setDuration(val)}
                    options={[
                      { value: 'Day Excursion', label: '1 Day Private Excursion' },
                      { value: '3 Days / 2 Nights', label: '3 Days / 2 Nights (Sahara Express)' },
                      { value: '5 Days / 4 Nights', label: '5 Days / 4 Nights (Desert & Mountains)' },
                      { value: '7 Days / 6 Nights', label: '7 Days / 6 Nights (Imperial Grand Tour)' },
                      { value: '10+ Days', label: '10+ Days Bespoke Kingdom Voyage' },
                    ]}
                  />

                  <LuxurySelect
                    label="Travel Style"
                    icon={<StyleIcon className="h-3.5 w-3.5" />}
                    value={travelStyle}
                    onChange={(val) => setTravelStyle(val)}
                    options={[
                      { value: 'Royal Luxury & Desert Glamping', label: 'Royal Luxury & Desert Glamping' },
                      { value: 'Honeymoon & Romantic Escape', label: 'Honeymoon & Romantic Escape' },
                      { value: 'Family VIP Private Chauffeur', label: 'Family VIP Private Chauffeur' },
                      { value: 'Photography & Cultural Heritage', label: 'Photography & Cultural Heritage' },
                      { value: 'High Atlas Hiking & Coastal Retreat', label: 'High Atlas Hiking & Coastal Retreat' },
                    ]}
                  />

                  <LuxurySelect
                    label="Passenger Count"
                    icon={<Users className="h-3.5 w-3.5" />}
                    value={guests}
                    onChange={(val) => setGuests(val)}
                    options={[
                      { value: '1 Guest', label: '1 Guest (Executive Solo)' },
                      { value: '2 Guests', label: '2 Guests (Couple / Friends)' },
                      { value: '3 - 5 Guests', label: '3 - 5 Guests (Maybach / SUV)' },
                      { value: '6 - 12 Guests', label: '6 - 12 Guests (Sprinter VIP Lounge)' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-teal-800 mb-1">
                    Specific Requests / Interests
                  </label>
                  <textarea
                    rows={2}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Quiet luxury riads, Erg Chebbi glamping, Maybach V-Class..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500/20 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Compass className="h-4 w-4 animate-spin text-white" />
                      <span>Curating Itinerary...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-white" />
                      <span>Generate Bespoke Itinerary</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/90 p-4 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans max-h-[320px] overflow-y-auto">
                  {resultText}
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={openWhatsAppWithResult}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Send to WhatsApp for Official Quote</span>
                  </button>

                  <button
                    onClick={() => setResultText(null)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-50"
                  >
                    Modify Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


