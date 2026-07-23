'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Users, Briefcase, Wifi, Coffee, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Car, MapPin } from 'lucide-react';
import { FLEET, VehicleItem } from '../lib/data';
import { LuxurySelect } from './LuxuryForm';
import { AnimatedTitle, StaggerContainer, StaggerItem, AnimatedCard, MagneticInteraction, LUXURY_EASE } from './AnimationEngine';

interface Screen3Props {
  onSelectVehicleForBooking: (vehicleName: string) => void;
}

export const Screen3Fleet: React.FC<Screen3Props> = ({ onSelectVehicleForBooking }) => {
  const [activeVehicle, setActiveVehicle] = useState<VehicleItem>(FLEET[0]);

  // Quick estimator calculator state
  const [pickupLocation, setPickupLocation] = useState('Marrakech Menara Airport');
  const [dropLocation, setDropLocation] = useState('Palmeraie / Hivernage Riad');
  const [passengers, setPassengers] = useState(2);

  const estimatedCost = Math.round(
    activeVehicle.transferRate * (dropLocation.includes('Agafay') ? 1.8 : dropLocation.includes('Essaouira') ? 2.5 : 1.0)
  );

  return (
    <section id="screen-3" className="relative min-h-screen w-full bg-slate-100 px-4 py-[64px] md:py-[88px] lg:py-[120px] text-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedTitle
          title="Sanctuaries on Four Wheels"
          badge={<><Crown className="h-3.5 w-3.5 text-teal-600" /><span>Executive Private Fleet</span></>}
          description="Every vehicle in our royal fleet is meticulously configured for peak comfort, high-speed connectivity, climate control, and supreme safety across Moroccan landscapes."
          badgeClassName="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800"
          className="mb-12"
        />

        {/* Vehicle Selector Tabs */}
        <StaggerContainer className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-3">
          {FLEET.map((v) => (
            <StaggerItem key={v.id}>
              <MagneticInteraction maxDistance={4}>
                <button
                  onClick={() => setActiveVehicle(v)}
                  className={`group flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 will-change-transform active:scale-95 ${
                    activeVehicle.id === v.id
                      ? 'border-teal-500 bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-700 hover:shadow-md'
                  }`}
                >
                  <Car className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${activeVehicle.id === v.id ? 'text-white' : 'text-slate-400'}`} />
                  <span>{v.name.split(' ')[0]} {v.name.split(' ')[1]}</span>
                </button>
              </MagneticInteraction>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Fleet Main Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVehicle.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)', scale: 0.98 }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="group/card grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-900/10 will-change-transform"
          >
            {/* Vehicle Image & Key Badges (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100" data-cursor="image">
                <img
                  src={activeVehicle.image}
                  alt={activeVehicle.name}
                  className="h-full w-full object-cover object-center transition-transform duration-[800ms] ease-[0.22,1,0.36,1] group-hover/card:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 rounded-full border border-teal-200 bg-white/90 px-3.5 py-1 text-xs font-bold text-teal-800 backdrop-blur-md">
                  {activeVehicle.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                  <div className="flex items-center gap-3 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/20">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-orange-400" /> {activeVehicle.passengers} Seats</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-orange-400" /> {activeVehicle.luggage} Cases</span>
                  </div>
                  <span className="text-orange-400 font-serif text-sm font-bold">
                    From €{activeVehicle.transferRate} / Transfer
                  </span>
                </div>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-teal-800 font-bold">Engine & Powertrain</p>
                  <p className="text-slate-800 font-semibold mt-0.5">{activeVehicle.specs.engine}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-teal-800 font-bold">Chauffeur Standard</p>
                  <p className="text-slate-800 font-semibold mt-0.5">{activeVehicle.specs.chauffeur}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Details & Specs (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                  {activeVehicle.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-teal-700 font-bold mt-1">
                  {activeVehicle.tagline}
                </p>

                {/* Features List */}
                <div className="mt-6 space-y-2.5">
                  <p className="text-xs uppercase tracking-wider text-teal-800 font-bold">
                    Executive Amenities Included:
                  </p>
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
                    }}
                    className="space-y-2.5"
                  >
                    {activeVehicle.features.map((feat, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -10, filter: 'blur(4px)' },
                          show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: LUXURY_EASE } }
                        }}
                        className="flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Instant Chauffeur Estimator Widget */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Instant Chauffeur Rate Estimator
                  </span>
                  <span className="text-xs font-bold text-orange-600">
                    Est. €{estimatedCost}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <LuxurySelect
                    label="Pick-up Location"
                    icon={<MapPin className="h-3.5 w-3.5" />}
                    value={pickupLocation}
                    onChange={(val) => setPickupLocation(val)}
                    options={[
                      { value: 'Marrakech Menara Airport', label: 'Marrakech Menara Airport (RAK)' },
                      { value: 'Casablanca Airport', label: 'Casablanca Airport (CMN)' },
                      { value: 'Marrakech Hotel / Riad', label: 'Marrakech Hotel / Riad' },
                    ]}
                  />

                  <LuxurySelect
                    label="Destination"
                    icon={<MapPin className="h-3.5 w-3.5" />}
                    value={dropLocation}
                    onChange={(val) => setDropLocation(val)}
                    options={[
                      { value: 'Palmeraie / Hivernage Riad', label: 'Palmeraie / Hivernage Riad' },
                      { value: 'Agafay Desert Luxury Camp', label: 'Agafay Desert Luxury Camp' },
                      { value: 'Essaouira Coast', label: 'Essaouira Coast' },
                    ]}
                  />
                </div>

                <MagneticInteraction className="w-full mt-4">
                  <button
                    onClick={() => onSelectVehicleForBooking(activeVehicle.name)}
                    className="group/btn w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)] active:scale-95 will-change-transform"
                  >
                    <span className="transition-transform duration-300 group-hover/btn:-translate-x-1">Book {activeVehicle.name}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </MagneticInteraction>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
