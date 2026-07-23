'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Compass,
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Calendar,
} from 'lucide-react';

interface NavbarProps {
  onOpenAIConcierge?: () => void;
  activeScreen?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIConcierge }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const destinationsList = [
    { name: 'Marrakech Red City', href: '/destination/marrakech' },
    { name: 'Sahara Desert Dunes', href: '/destination/sahara' },
    { name: 'Fes Imperial Capital', href: '/destination/fes' },
    { name: 'Chefchaouen Blue Pearl', href: '/destination/chefchaouen' },
    { name: 'Casablanca Atlantic', href: '/destination/casablanca' },
    { name: 'All Destinations', href: '/destinations' },
  ];

  const navLinks = [
    { name: 'Flights', href: '/airport-transfers' },
    { name: 'Hotels', href: '/booking' },
    { name: 'Destinations', href: '/destinations', isDropdown: true },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Blog', href: '/blog' },
  ];

  const handleBookNowClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      const bookingEl = document.getElementById('screen-6');
      if (bookingEl) {
        e.preventDefault();
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500 via-orange-400 to-amber-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-3 sm:px-4 ${
          scrolled ? 'pt-2' : 'pt-3 sm:pt-4'
        }`}
      >
      <div
        className={`mx-auto w-[94%] max-w-[1100px] flex items-center justify-between px-4 sm:px-6 rounded-full border transition-all duration-500 will-change-transform ${
          scrolled
            ? 'h-[60px] md:h-[64px] bg-white/75 border-slate-200/60 backdrop-blur-2xl shadow-lg shadow-slate-900/5'
            : 'h-[68px] md:h-[72px] lg:h-[76px] bg-white/90 border-slate-200/80 backdrop-blur-md shadow-md shadow-slate-100'
        }`}
      >
        {/* Brand Logo with Micro-Rotation on Compass */}
        <Link href="/" className="group flex items-center gap-3 focus:outline-none shrink-0 mr-2 md:mr-8" data-cursor="link">
          <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 via-teal-600 to-teal-800 p-[1.5px] shadow-md shadow-teal-600/20 shrink-0"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-teal-600 group-hover:bg-teal-700 transition">
                <Compass className="h-4.5 w-4.5 text-white group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-wide text-slate-900 group-hover:text-teal-700 transition whitespace-nowrap">
                Luxe<span className="text-teal-600">Voyages</span>
              </span>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.28em] text-orange-600 font-bold whitespace-nowrap">
                Morocco Collection
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 lg:gap-7 justify-center">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              const isDestActive = pathname === '/destinations' || pathname.startsWith('/destination');
              return (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => setDestDropdownOpen(true)}
                  onMouseLeave={() => setDestDropdownOpen(false)}
                >
                  <motion.button
                    onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                    whileHover="hover"
                    className={`flex items-center gap-1 text-[13.5px] font-medium tracking-wide transition group focus:outline-none whitespace-nowrap relative ${
                      isDestActive ? 'text-teal-700 font-semibold' : 'text-slate-700 hover:text-teal-700'
                    }`}
                  >
                    <motion.span
                      variants={{ hover: { y: -2, letterSpacing: '0.02em', color: '#0f766e' } }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {link.name}
                    </motion.span>
                    <motion.div
                      animate={{ rotate: destDropdownOpen ? 180 : 0 }}
                      variants={{ hover: { rotate: destDropdownOpen ? 180 : 8 } }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-colors duration-200 ${
                          destDropdownOpen ? 'text-teal-700' : 'text-teal-600/80 group-hover:text-teal-700'
                        }`}
                      />
                    </motion.div>
                    {isDestActive ? (
                      <motion.span
                        layoutId="navActiveUnderline"
                        className="absolute -bottom-[6px] left-0 right-0 h-[2.5px] bg-orange-500 rounded-full shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-300" />
                    )}
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {destDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-64 z-50"
                      >
                        <motion.div
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.04,
                              },
                            },
                          }}
                          className="rounded-2xl border border-slate-200 bg-white py-2 px-2 backdrop-blur-2xl shadow-xl shadow-slate-300/40 space-y-1 h-auto"
                        >
                          {destinationsList.map((dest, idx) => (
                            <motion.div
                              key={dest.href}
                              variants={{
                                hidden: { opacity: 0, x: -8 },
                                show: { opacity: 1, x: 0 },
                              }}
                            >
                              <Link
                                href={dest.href}
                                onClick={() => setDestDropdownOpen(false)}
                                className={`group/item relative flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                                  idx === destinationsList.length - 1
                                    ? 'text-orange-600 font-semibold bg-orange-50 border border-orange-200 hover:bg-orange-100 mt-1'
                                    : 'text-slate-700 hover:text-teal-700 hover:bg-teal-50'
                                }`}
                              >
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[3px] rounded-r-full bg-teal-600 transition-all duration-200 group-hover/item:h-3/4" />
                                
                                <motion.span
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.15 }}
                                  className="block pl-1"
                                >
                                  {dest.name}
                                </motion.span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-2"
                data-cursor="link"
              >
                <motion.div
                  whileHover="hover"
                  className={`relative text-[13.5px] font-medium tracking-wide transition group whitespace-nowrap ${
                    isActive ? 'text-teal-700 font-semibold' : 'text-slate-700 hover:text-teal-700'
                  }`}
                >
                  <motion.span
                    variants={{ hover: { y: -2, letterSpacing: '0.02em', color: '#0f766e' } }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    {link.name}
                  </motion.span>
                  
                  {isActive ? (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute -bottom-[6px] left-0 right-0 h-[2.5px] bg-orange-500 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-300" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Icon Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition duration-200 focus:outline-none shrink-0"
              aria-label="Search"
              title="Search Destinations & Stays"
            >
              <Search className="h-4.5 w-4.5" />
            </motion.button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-72 sm:w-80 rounded-2xl border border-slate-200 bg-white p-3 backdrop-blur-2xl shadow-2xl z-50"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
                    <Search className="h-4 w-4 text-teal-600 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search tours, cities, riads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                      autoFocus
                    />
                  </div>
                  {searchQuery.trim() && (
                    <div className="mt-2 pt-2 border-t border-slate-100 text-xs">
                      <Link
                        href={`/tours?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setSearchOpen(false)}
                        className="block rounded-lg px-2.5 py-1.5 text-teal-700 font-medium hover:bg-teal-50 transition"
                      >
                        Search for &quot;{searchQuery}&quot;
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Account Icon Button (Desktop) */}
          <div
            className="hidden lg:block relative"
            onMouseEnter={() => setAccountDropdownOpen(true)}
            onMouseLeave={() => setAccountDropdownOpen(false)}
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="p-2 rounded-full text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition duration-200 focus:outline-none"
              aria-label="Account"
              title="Account & Reservations"
            >
              <User className="h-4.5 w-4.5" />
            </motion.button>

            <AnimatePresence>
              {accountDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 backdrop-blur-2xl shadow-xl z-50"
                >
                  <Link
                    href="/booking"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50 transition"
                  >
                    <Calendar className="h-3.5 w-3.5 text-teal-600" />
                    <span>My Reservations</span>
                  </Link>
                  {onOpenAIConcierge && (
                    <button
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onOpenAIConcierge();
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50 transition text-left"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                      <span>AI Concierge</span>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* High-Contrast Primary CTA: Book Now (Desktop) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block shrink-0"
          >
            <Link
              href="/booking"
              onClick={handleBookNowClick}
              className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 focus:outline-none whitespace-nowrap"
            >
              Book Now
            </Link>
          </motion.div>

          {/* Mobile / Tablet Menu Button with morph animation (48x48 Touch Target) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition focus:outline-none shrink-0 z-50"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-orange-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Full Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40 lg:hidden"
            />

            {/* Mobile / Tablet Drawer Panel (Slide from Right) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[88%] max-w-sm bg-white p-6 shadow-2xl lg:hidden flex flex-col justify-between overflow-y-auto border-l border-slate-200"
            >
              <div className="space-y-6">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-teal-600" />
                    <span className="font-serif text-base font-bold text-slate-900">
                      Luxe<span className="text-teal-600">Voyages</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                {/* Staggered Navigation Items */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.06 },
                    },
                  }}
                  className="grid grid-cols-1 gap-2.5"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between min-h-[48px] rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-800 hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50 transition active:scale-[0.99]"
                      >
                        <span>{link.name}</span>
                        <span className="text-teal-600/60 font-serif text-xs">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3 border-t border-slate-100 pt-5 mt-6">
                <Link
                  href="/booking"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleBookNowClick(e);
                  }}
                  className="w-full min-h-[50px] flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 active:scale-[0.98] transition"
                >
                  Book Private Experience
                </Link>

                {onOpenAIConcierge && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAIConcierge();
                    }}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-teal-50 py-3 text-xs font-bold text-teal-800 hover:bg-teal-100 active:scale-[0.98] transition"
                  >
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    <span>Launch AI Concierge</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
};

export default Navbar;

