'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Calendar, Users, MapPin, Car, Sparkles, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { FLEET, TOURS } from '../lib/data';
import { AnimatedInput, LuxuryDatePicker, LuxurySelect } from './LuxuryForm';
import { MagneticInteraction, LUXURY_EASE } from './AnimationEngine';

interface Screen6Props {
  preselectedDest?: string;
  preselectedVehicle?: string;
  preselectedTour?: string;
}

export const Screen6Booking: React.FC<Screen6Props> = ({
  preselectedDest = '',
  preselectedVehicle = '',
  preselectedTour = '',
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [serviceType, setServiceType] = useState(
    preselectedTour ? 'Multi-Day Desert Tour' : preselectedVehicle ? 'Private Chauffeur' : 'Airport Transfer'
  );
  const [pickup, setPickup] = useState('Marrakech Menara Airport (RAK)');
  const [destination, setDestination] = useState(preselectedDest || preselectedTour || 'Agafay Desert Luxury Camp');
  const [selectedVehicle, setSelectedVehicle] = useState(preselectedVehicle || 'Mercedes-Benz V-Class Maybach Edition');
  const [date, setDate] = useState('2026-10-15');
  const [passengers, setPassengers] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Camel Sunset Trek & Traditional Garb',
  ]);

  const addonOptions = [
    { name: 'Royal Sahara Glamping Tent Upgrade', price: 150 },
    { name: 'Camel Sunset Trek & Traditional Garb', price: 40 },
    { name: 'Quad Biking Dune Safari (1 Hour)', price: 65 },
    { name: 'Private Gourmet Moroccan Chef Dinner', price: 90 },
    { name: 'Professional VIP Travel Photographer', price: 180 },
    { name: 'High Atlas Mule Trek with Local Guide', price: 45 },
  ];

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const locationOptions = [
    { value: 'Marrakech Menara Airport (RAK)', label: 'Marrakech Menara Airport (RAK)' },
    { value: 'Marrakech Hotel / Medina Riad', label: 'Marrakech Hotel / Medina Riad' },
    { value: 'Casablanca Mohammed V Airport (CMN)', label: 'Casablanca Mohammed V (CMN)' },
    { value: 'Casablanca Downtown / Hotel', label: 'Casablanca Downtown / Hotel' },
    { value: 'Agafay Desert Luxury Camp', label: 'Agafay Desert Luxury Camp' },
    { value: 'Fes Saïss Airport (FEZ)', label: 'Fes Saïss Airport (FEZ)' },
    { value: 'Fes Hotel / Medina Riad', label: 'Fes Hotel / Medina Riad' },
    { value: 'Tangier Ibn Battouta Airport (TNG)', label: 'Tangier Airport (TNG)' },
    { value: 'Other Location (Specify on WhatsApp)', label: 'Other Location (Specify on WhatsApp)' },
  ];

  // Ensure pre-selected destinations that aren't in the default list still render correctly
  const pickupOptions = locationOptions.some(opt => opt.value === pickup) 
    ? locationOptions 
    : [...locationOptions, { value: pickup, label: pickup }];
    
  const destinationOptions = locationOptions.some(opt => opt.value === destination)
    ? locationOptions
    : [...locationOptions, { value: destination, label: destination }];

  const calculateEstimate = () => {
    let base = 120;
    if (serviceType.includes('Multi-Day')) base = 890;
    if (serviceType.includes('Chauffeur')) base = 450;
    if (serviceType.includes('Excursion')) base = 160;

    const addonsCost = selectedAddons.reduce((acc, curr) => {
      const match = addonOptions.find((o) => o.name === curr);
      return acc + (match ? match.price : 0);
    }, 0);

    return (base + addonsCost) * (passengers > 4 ? 1.3 : 1.0);
  };

  const generateWhatsAppURL = () => {
    const text = `Hello See Morocco Travel VIP Team! I wish to reserve a private voyage:
    
- Service: ${serviceType}
- Pickup: ${pickup}
- Destination: ${destination}
- Vehicle: ${selectedVehicle}
- Travel Date: ${date}
- Guests: ${passengers} Passengers
- VIP Add-ons: ${selectedAddons.join(', ') || 'None'}
- Estimated Value: €${Math.round(calculateEstimate())}

Please confirm availability and send payment details!`;

    return `https://wa.me/212600000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="screen-6" className="relative min-h-screen w-full bg-slate-50 px-4 py-[64px] md:py-[88px] lg:py-[120px] text-slate-800">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800">
            <Crown className="h-3.5 w-3.5 text-teal-600" />
            <span>Royal Reservation Concierge</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Design Your Private Journey
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600 font-light">
            Customise your luxury transport, vehicle choice, travel dates, and bespoke VIP experiences in 4 seamless steps.
          </p>

          {/* Premium Stepper Progress */}
          <div className="mt-12 mb-16 flex w-full max-w-2xl mx-auto justify-between relative px-2 sm:px-6">
            
            {/* Background Line */}
            <div className="absolute top-6 left-8 right-8 sm:left-12 sm:right-12 h-[2px] bg-slate-200 rounded-full z-0" />
            
            {/* Active Line Wrapper */}
            <div className="absolute top-6 left-8 right-8 sm:left-12 sm:right-12 h-[2px] z-0 overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 w-full bg-[#FF6A00] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (step - 1) / 3 }}
                transition={{ duration: 0.6, ease: LUXURY_EASE }}
              />
            </div>

            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Vehicle' },
              { num: 3, label: 'Add-ons' },
              { num: 4, label: 'Summary' },
            ].map((s) => {
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setStep(s.num)}
                    className={`group relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50 ${
                      isActive
                        ? 'bg-[#FF6A00] shadow-[0_4px_15px_rgba(255,106,0,0.15)] border-none'
                        : 'bg-white border border-[#E5E7EB] hover:border-slate-300 shadow-sm'
                    } hover:scale-[1.03]`}
                    style={{ boxSizing: 'border-box' }}
                  >
                    {isCompleted ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                        <CheckCircle2 className="h-5 w-5 text-[#FF6A00]" />
                      </motion.div>
                    ) : (
                      <span className={`${isActive ? 'text-white' : 'text-slate-600'}`}>{s.num}</span>
                    )}
                  </button>
                  <span className={`absolute top-14 whitespace-nowrap text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center transition-colors duration-300 ${
                    isActive ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Container */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50 backdrop-blur-xl relative">
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Step 1: Choose Your Preferred Travel Service
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'Airport Transfer', title: 'Airport VIP Transfer', desc: 'Door-to-door greeting & assistance' },
                    { id: 'Private Chauffeur', title: 'Daily Executive Chauffeur', desc: 'Full-day dedicated driver & Maybach' },
                    { id: 'Multi-Day Desert Tour', title: 'Multi-Day Sahara Odyssey', desc: 'All-inclusive private desert expedition' },
                    { id: 'Day Excursion', title: 'Private Day Excursion', desc: 'Atlas, Ouzoud, or Essaouira escape' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setServiceType(s.id)}
                      className={`flex flex-col text-left p-5 rounded-2xl border transition ${
                        serviceType === s.id
                          ? 'border-teal-500 bg-teal-50 text-slate-900 shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-400'
                      }`}
                    >
                      <span className="font-serif text-base font-bold text-teal-800">{s.title}</span>
                      <span className="text-xs text-slate-500 mt-1">{s.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <LuxurySelect
                    label="Pick-up Address / Airport"
                    icon={<MapPin className="h-4 w-4" />}
                    value={pickup}
                    onChange={(val) => setPickup(val)}
                    options={pickupOptions}
                  />

                  <LuxurySelect
                    label="Drop-off Destination"
                    icon={<MapPin className="h-4 w-4" />}
                    value={destination}
                    onChange={(val) => setDestination(val)}
                    options={destinationOptions}
                  />
                </div>

                <MagneticInteraction className="w-full">
                  <button
                    onClick={() => setStep(2)}
                    className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)] active:scale-95 will-change-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Continue to Vehicle Selection</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </MagneticInteraction>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Step 2: Select Your Executive Vehicle & Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FLEET.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.name)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition ${
                        selectedVehicle === v.name
                          ? 'border-teal-500 bg-teal-50 text-slate-900 shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-400'
                      }`}
                    >
                      <img src={v.image} alt={v.name} className="h-16 w-20 rounded-xl object-cover" />
                      <div>
                        <p className="font-serif text-sm font-bold text-slate-900">{v.name}</p>
                        <p className="text-[11px] text-slate-500">{v.passengers} Passengers • Wi-Fi • Refreshments</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <LuxuryDatePicker
                    selectedDate={date}
                    onChange={(d) => setDate(d)}
                    label="Travel Date"
                  />

                  <AnimatedInput
                    label="Passenger Count"
                    type="number"
                    min={1}
                    max={14}
                    icon={<Users className="h-4 w-4" />}
                    value={String(passengers)}
                    onChange={(e) => {
                      const val = typeof e === 'string' ? e : e.target.value;
                      setPassengers(parseInt(val) || 1);
                    }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border border-slate-300 bg-white py-3.5 text-xs font-bold uppercase text-slate-700 hover:bg-slate-50 transition-colors duration-300 active:scale-95 will-change-transform"
                  >
                    Back
                  </button>
                  <MagneticInteraction className="flex-1">
                    <button
                      onClick={() => setStep(3)}
                      className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)] active:scale-95 will-change-transform"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Configure VIP Add-ons</span>
                      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </MagneticInteraction>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Step 3: Select Bespoke VIP Add-ons (Optional)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addonOptions.map((opt) => {
                    const isChecked = selectedAddons.includes(opt.name);
                    return (
                      <button
                        key={opt.name}
                        onClick={() => toggleAddon(opt.name)}
                        className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs transition ${
                          isChecked
                            ? 'border-teal-500 bg-teal-50 text-slate-900'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`h-4 w-4 ${isChecked ? 'text-teal-600' : 'text-slate-400'}`} />
                          <span className="font-semibold text-slate-800">{opt.name}</span>
                        </div>
                        <span className="font-bold text-orange-600">+€{opt.price}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-xl border border-slate-300 bg-white py-3.5 text-xs font-bold uppercase text-slate-700 hover:bg-slate-50 transition-colors duration-300 active:scale-95 will-change-transform"
                  >
                    Back
                  </button>
                  <MagneticInteraction className="flex-1">
                    <button
                      onClick={() => setStep(4)}
                      className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)] active:scale-95 will-change-transform"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">View Booking Summary</span>
                      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </MagneticInteraction>
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Step 4: Your Royal Journey Summary
                    </h3>
                    <p className="text-xs text-slate-500">100% Private • Instant VIP Confirmation</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-teal-800 font-bold">Estimated Total</p>
                    <p className="font-serif text-2xl font-bold text-orange-600">
                      €{Math.round(calculateEstimate())}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <p className="text-[10px] uppercase text-teal-800 font-bold">Service & Vehicle</p>
                    <p className="font-bold text-slate-900">{serviceType}</p>
                    <p className="text-slate-600">{selectedVehicle}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <p className="text-[10px] uppercase text-teal-800 font-bold">Route & Schedule</p>
                    <p className="font-bold text-slate-900">{pickup} ➔ {destination}</p>
                    <p className="text-slate-600">Date: {date} • {passengers} Guests</p>
                  </div>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] uppercase text-teal-800 font-bold mb-2">Selected Add-ons:</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {selectedAddons.map((a, i) => (
                        <span key={i} className="rounded-lg bg-teal-50 border border-teal-200 px-2.5 py-1 text-teal-800 font-medium">
                          • {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold uppercase text-slate-700 hover:bg-slate-50 transition-colors duration-300 active:scale-95 will-change-transform"
                  >
                    Edit Details
                  </button>

                  <MagneticInteraction className="flex-1">
                    <a
                      href={generateWhatsAppURL()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-600/20 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_20px_rgba(5,150,105,0.3)] active:scale-95 will-change-transform"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-700 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <MessageSquare className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                      <span className="relative z-10">Instant Direct WhatsApp Reservation</span>
                    </a>
                  </MagneticInteraction>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
