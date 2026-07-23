'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Check, ArrowRight, ArrowLeft, Calendar, Users, MapPin, Car, Phone, Mail, CheckCircle2, MessageSquare } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { FloatingAIConciergeButton } from '../../components/FloatingAIConciergeButton';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  AnimatedCard,
} from '../../components/AnimationEngine';
import { VEHICLES, TOURS } from '../../lib/data';
import { LuxuryInput, LuxurySelect, LuxuryDatePicker } from '../../components/LuxuryForm';

function BookingContent() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('Tour');
  const [selectedTour, setSelectedTour] = useState(searchParams.get('tour') || TOURS[0].title);
  const [selectedVehicle, setSelectedVehicle] = useState(searchParams.get('vehicle') || VEHICLES[0].name);
  const [pickupLocation, setPickupLocation] = useState('Marrakech Airport / Medina Riad');
  const [dropoffLocation, setDropoffLocation] = useState('Marrakech Medina Riad');
  const [pickupDate, setPickupDate] = useState('2026-08-15');
  const [passengers, setPassengers] = useState(2);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // VIP Addons
  const [addons, setAddons] = useState({
    champagne: false,
    childSeat: false,
    photographer: false,
    simCard: true,
  });

  const handleAddonToggle = (key: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const pickupOptions = locationOptions.some(opt => opt.value === pickupLocation) 
    ? locationOptions 
    : [...locationOptions, { value: pickupLocation, label: pickupLocation }];

  const calculateTotal = () => {
    let base = 350;
    const tourObj = TOURS.find((t) => t.title === selectedTour);
    if (tourObj) base = tourObj.pricePerPerson * passengers;

    if (addons.champagne) base += 90;
    if (addons.photographer) base += 150;
    return base;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatedPageLayout className="relative min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-orange-500 selection:text-white pt-20 flex flex-col">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Header */}
      <ScrollRevealSection variant="fadeUp" className="py-12 px-4 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800">
          <Sparkles className="h-3.5 w-3.5 text-orange-500" />
          <span>Royal Travel Reservation</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">
          Book Your Private Experience
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl mx-auto">
          Complete your details below for instant confirmation and dedicated VIP concierge dispatch. No upfront charge required.
        </p>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 pt-6 max-w-full overflow-x-auto no-scrollbar px-2">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Vehicle' },
            { num: 3, label: 'Contact' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => step > s.num && setStep(s.num)}
                className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl text-xs font-bold transition shrink-0 ${
                  step === s.num
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-400 ring-offset-2'
                    : step > s.num
                    ? 'bg-teal-50 text-teal-800 border border-teal-300'
                    : 'bg-white border border-slate-200 text-slate-400'
                }`}
              >
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </button>
              <span className={`text-xs font-medium hidden xs:inline sm:inline ${step === s.num ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {s.label}
              </span>
              {s.num < 3 && <div className={`h-0.5 w-6 sm:w-12 ${step > s.num ? 'bg-teal-500' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      </ScrollRevealSection>

      {/* Booking Form Card */}
      <ScrollRevealSection variant="fadeUp" className="px-4 max-w-3xl mx-auto">
        {!isSubmitted ? (
          <AnimatedCard className="p-6 sm:p-10 space-y-8 bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Step 1: Service & Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Car className="h-5 w-5 text-teal-600" />
                  <span>1. Choose Service & Details</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Tour', 'Chauffeur', 'Airport Transfer', 'Activity'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setServiceType(s)}
                      className={`rounded-2xl border p-3 text-xs font-bold uppercase transition ${
                        serviceType === s
                          ? 'border-teal-500 bg-teal-50 text-teal-800'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {serviceType === 'Tour' && (
                  <LuxurySelect
                    label="Select Signature Tour"
                    value={selectedTour}
                    onChange={(val) => setSelectedTour(val)}
                    options={TOURS.map((t) => ({
                      value: t.title,
                      label: `${t.title} (€${t.pricePerPerson}/guest)`,
                    }))}
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LuxurySelect
                    label="Pickup Location"
                    icon={<MapPin className="h-4 w-4" />}
                    value={pickupLocation}
                    onChange={(val) => setPickupLocation(val)}
                    options={pickupOptions}
                  />

                  <LuxuryDatePicker
                    label="Travel Date"
                    selectedDate={pickupDate}
                    onChange={(d) => setPickupDate(d)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20"
                  >
                    <span>Next: Vehicle & Add-ons</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle & Add-ons */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  <span>2. Select Vehicle & VIP Amenities</span>
                </h2>

                <div className="space-y-2">
                  <label className="text-xs text-teal-800 font-bold uppercase tracking-wider">Preferred Vehicle</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VEHICLES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVehicle(v.name)}
                        className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                          selectedVehicle === v.name
                            ? 'border-teal-500 bg-teal-50 text-slate-900'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-300'
                        }`}
                      >
                        <img src={v.image} alt={v.name} className="h-12 w-16 object-cover rounded-lg" />
                        <div>
                          <p className="text-xs font-bold font-serif text-slate-900">{v.name}</p>
                          <p className="text-[10px] text-slate-500">{v.category} • {v.passengers} Seats</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs text-teal-800 font-bold uppercase tracking-wider">VIP Add-on Upgrades</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddonToggle('champagne')}
                      className={`flex items-center justify-between rounded-xl border p-3 text-xs font-medium transition ${
                        addons.champagne ? 'border-teal-500 bg-teal-50 text-slate-900' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span>Champagne Minibar (+€90)</span>
                      {addons.champagne && <Check className="h-4 w-4 text-teal-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddonToggle('photographer')}
                      className={`flex items-center justify-between rounded-xl border p-3 text-xs font-medium transition ${
                        addons.photographer ? 'border-teal-500 bg-teal-50 text-slate-900' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span>Private Expedition Photographer (+€150)</span>
                      {addons.photographer && <Check className="h-4 w-4 text-teal-600" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-1.5 text-xs text-teal-700 hover:underline font-bold"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20"
                  >
                    <span>Next: Guest Information</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details & Submit */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span>3. Guest Contact & Dispatch</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LuxuryInput
                    label="Full Name *"
                    icon={<Users className="h-4 w-4" />}
                    value={clientName}
                    onChange={(e) => setClientName(typeof e === 'string' ? e : e.target.value)}
                    required
                  />

                  <LuxuryInput
                    label="Email Address *"
                    type="email"
                    icon={<Mail className="h-4 w-4" />}
                    value={clientEmail}
                    onChange={(e) => setClientEmail(typeof e === 'string' ? e : e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LuxuryInput
                    label="WhatsApp Phone Number *"
                    type="tel"
                    icon={<Phone className="h-4 w-4" />}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(typeof e === 'string' ? e : e.target.value)}
                    required
                  />

                  <LuxurySelect
                    label="Number of Guests"
                    icon={<Users className="h-4 w-4" />}
                    value={String(passengers)}
                    onChange={(val) => setPassengers(Number(val.split(' ')[0]) || 2)}
                    options={[
                      { value: '1 Guest', label: '1 Executive Guest' },
                      { value: '2 Guests', label: '2 Guests' },
                      { value: '3 Guests', label: '3 Guests' },
                      { value: '4 Guests', label: '4 Guests' },
                      { value: '5 Guests', label: '5 Guests' },
                      { value: '6 Guests', label: '6 Guests (VIP Sprinter)' },
                      { value: '8 Guests', label: '8 Guests' },
                      { value: '12 Guests', label: '12 Guests' },
                    ]}
                  />
                </div>

                {/* Summary Quote Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span>Estimated Total:</span>
                    <span className="font-serif text-xl font-bold text-orange-600">€{calculateTotal()}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Includes private vehicle, chauffeur, water, taxes & 24/7 concierge support.</p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-1.5 text-xs text-teal-700 hover:underline font-bold"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-8 py-3.5 text-xs font-bold text-white shadow-md shadow-orange-500/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirm VIP Booking</span>
                  </button>
                </div>
              </form>
            )}
          </AnimatedCard>
        ) : (
          /* Confirmation State */
          <AnimatedCard className="p-8 text-center space-y-6 bg-white border border-teal-200 shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 border border-teal-200 text-teal-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Reservation Voucher Confirmed!
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-teal-800">{clientName}</strong>. Your private booking request for <strong className="text-teal-800">{selectedTour}</strong> ({selectedVehicle}) on {pickupDate} has been dispatched to our VIP Concierge team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={`https://wa.me/212600000000?text=Hello!%20My%20name%20is%20${encodeURIComponent(clientName)}.%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(selectedTour)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message VIP Chauffeur on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-teal-700 font-bold hover:underline"
              >
                Book Another Service
              </button>
            </div>
          </AnimatedCard>
        )}
      </ScrollRevealSection>

      <FloatingAIConciergeButton onOpen={() => setAiConciergeOpen(true)} />
      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-300 font-serif">Loading Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}

