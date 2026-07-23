'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { CinematicLoader } from '../components/CinematicLoader';
import { ScrollRevealSection } from '../components/AnimationEngine';
import { Screen1Arrival } from '../components/Screen1Arrival';
import { Screen2ExploreMap } from '../components/Screen2ExploreMap';
import { Screen3Fleet } from '../components/Screen3Fleet';
import { Screen4Signature } from '../components/Screen4Signature';
import { Screen5Journey } from '../components/Screen5Journey';
import { Screen6Booking } from '../components/Screen6Booking';
import { Screen7Trust } from '../components/Screen7Trust';
import { Screen8Contact } from '../components/Screen8Contact';
import { Footer } from '../components/Footer';
import { AIConciergeModal } from '../components/AIConciergeModal';
import { FloatingAIConciergeButton } from '../components/FloatingAIConciergeButton';

export default function Home() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState(1);

  // Cross-screen preselection for Screen 6 Booking
  const [preselectedDest, setPreselectedDest] = useState('');
  const [preselectedVehicle, setPreselectedVehicle] = useState('');
  const [preselectedTour, setPreselectedTour] = useState('');

  // Scroll active section observer
  useEffect(() => {
    const handleScroll = () => {
      const screens = [1, 2, 3, 4, 5, 6, 7, 8];
      for (const num of screens) {
        const el = document.getElementById(`screen-${num}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveScreen(num);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectDestinationForBooking = (destName: string) => {
    setPreselectedDest(destName);
    const bookingEl = document.getElementById('screen-6');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVehicleForBooking = (vehicleName: string) => {
    setPreselectedVehicle(vehicleName);
    const bookingEl = document.getElementById('screen-6');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookTour = (tourTitle: string) => {
    setPreselectedTour(tourTitle);
    const bookingEl = document.getElementById('screen-6');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Cinematic Page Loader Gate */}
      <CinematicLoader />

      {/* Persistent Luxury Navigation Header */}
      <Navbar
        onOpenAIConcierge={() => setAiConciergeOpen(true)}
        activeScreen={activeScreen}
      />

      {/* Screen 1: Arrival in Morocco */}
      <Screen1Arrival onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Screen 2: Explore Morocco (Interactive Map) */}
      <ScrollRevealSection>
        <Screen2ExploreMap
          onSelectDestinationForBooking={handleSelectDestinationForBooking}
        />
      </ScrollRevealSection>

      {/* Screen 3: Luxury Fleet Showcase */}
      <ScrollRevealSection>
        <Screen3Fleet
          onSelectVehicleForBooking={handleSelectVehicleForBooking}
        />
      </ScrollRevealSection>

      {/* Screen 4: Signature Experiences Catalog */}
      <ScrollRevealSection>
        <Screen4Signature
          onBookTour={handleBookTour}
        />
      </ScrollRevealSection>

      {/* Screen 5: Journey Through Morocco (Narrative Storytelling) */}
      <ScrollRevealSection>
        <Screen5Journey />
      </ScrollRevealSection>

      {/* Screen 6: Premium Booking Experience */}
      <ScrollRevealSection>
        <Screen6Booking
          preselectedDest={preselectedDest}
          preselectedVehicle={preselectedVehicle}
          preselectedTour={preselectedTour}
        />
      </ScrollRevealSection>

      {/* Screen 7: Trust & Inspiration */}
      <ScrollRevealSection>
        <Screen7Trust />
      </ScrollRevealSection>

      {/* Screen 8: Concierge & Contact */}
      <ScrollRevealSection>
        <Screen8Contact onOpenAIConcierge={() => setAiConciergeOpen(true)} />
      </ScrollRevealSection>

      {/* Footer */}
      <Footer />

      {/* AI Travel Concierge Floating Trigger */}
      <FloatingAIConciergeButton onOpen={() => setAiConciergeOpen(true)} />

      {/* AI Travel Concierge Modal */}
      <AIConciergeModal
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
      />
    </main>
  );
}

