'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Users,
  MapPin,
  Sparkles,
  Send,
  User,
  Mail,
  Phone,
  RotateCcw,
} from 'lucide-react';

// ==========================================
// 1. LuxuryFormGroup Layout Wrapper
// ==========================================
interface LuxuryFormGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const LuxuryFormGroup: React.FC<LuxuryFormGroupProps> = ({
  label,
  error,
  helperText,
  required,
  children,
  className = '',
}) => {
  return (
    <div className={`relative my-2 w-full ${className}`}>
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-teal-800 mb-1.5 pl-1">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 pl-1 text-[11px] font-medium text-red-500"
        >
          {error}
        </motion.p>
      )}
      {!error && helperText && (
        <p className="mt-1 pl-1 text-[10px] text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

// ==========================================
// 2. Animated Floating Label Input (`<LuxuryInput />`)
// ==========================================
interface LuxuryInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  isValid?: boolean;
  error?: string;
}

export const LuxuryInput: React.FC<LuxuryInputProps> = ({
  label,
  icon,
  value,
  onChange,
  isValid = true,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value !== undefined && value !== null && String(value).trim().length > 0;
  const isFloating = isFocused || isFilled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="relative my-2 w-full">
      <motion.div
        animate={error ? { x: [-5, 5, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`relative flex items-center rounded-2xl border bg-slate-50 px-4 py-3.5 backdrop-blur-md transition-all duration-300 ${
          isFocused
            ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md shadow-teal-500/10'
            : isFilled
            ? 'border-slate-300'
            : 'border-slate-200 hover:border-slate-300'
        } ${error ? 'border-red-500 ring-1 ring-red-500/20' : ''}`}
      >
        {icon && <div className="mr-3 shrink-0 text-teal-600">{icon}</div>}

        <div className="relative flex-1">
          {/* Animated Floating Label */}
          <motion.label
            initial={false}
            animate={{
              y: isFloating ? -10 : 0,
              scale: isFloating ? 0.75 : 1,
              color: isFocused ? '#0d9488' : isFilled ? '#0f766e' : '#64748b',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none origin-top-left text-sm tracking-wide font-medium"
          >
            {label}
          </motion.label>

          <input
            {...props}
            value={value}
            onChange={handleChange}
            onFocus={(e) => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            className={`w-full bg-transparent text-sm font-medium text-slate-900 placeholder-transparent focus:outline-none ${
              isFloating ? 'pt-3 pb-0.5' : 'py-0'
            }`}
          />
        </div>

        {/* Micro-interaction: Animated Checkmark Icon on Valid Input */}
        <AnimatePresence>
          {isFilled && isValid && !error && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="ml-2 shrink-0 text-teal-600"
            >
              <CheckCircle2 className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <p className="mt-1 pl-1 text-[11px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export const AnimatedInput = LuxuryInput;

// ==========================================
// 3. Universal Luxury Select (`<LuxurySelect />`)
// ==========================================
export interface LuxurySelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface LuxurySelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<LuxurySelectOption | string>;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const LuxurySelect: React.FC<LuxurySelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  icon,
  disabled = false,
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to objects
  const normalizedOptions: LuxurySelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const isUp = spaceBelow < 250 && spaceAbove > spaceBelow;
      
      setOpenUpward(isUp);
      setDropdownStyle({
        position: 'fixed',
        top: isUp ? undefined : rect.bottom + 8,
        bottom: isUp ? window.innerHeight - rect.top + 8 : undefined,
        left: rect.left,
        width: rect.width,
      });
    }
    setIsOpen(!isOpen);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative my-2 w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-teal-800 mb-1.5 pl-1">
          {label}
        </label>
      )}

      {/* Trigger Box */}
      <motion.div
        animate={error ? { x: [-5, 5, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={toggleDropdown}
        className={`relative flex items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3.5 backdrop-blur-md cursor-pointer transition-all duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          isOpen
            ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md shadow-teal-500/10'
            : value
            ? 'border-slate-300'
            : 'border-slate-200 hover:border-slate-300'
        } ${error ? 'border-red-500 ring-1 ring-red-500/20' : ''}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {icon ? (
            <div className="text-teal-600 shrink-0">{icon}</div>
          ) : selectedOption?.icon ? (
            <div className="text-teal-600 shrink-0">{selectedOption.icon}</div>
          ) : null}

          <div className="flex flex-col truncate">
            <span
              className={`text-sm font-medium truncate ${
                selectedOption ? 'text-slate-900' : 'text-slate-400'
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
        </div>

        {/* Animated Rotating Chevron Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2 shrink-0 text-teal-600"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* Dropdown Floating List via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={dropdownStyle}
              initial={{ opacity: 0, y: openUpward ? 10 : -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openUpward ? 8 : -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`z-[9999] rounded-[18px] border border-slate-200 bg-white p-1.5 backdrop-blur-2xl shadow-[0_16px_40px_rgba(15,23,42,0.1)] max-h-[320px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#0d9488_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-teal-600/30 [&::-webkit-scrollbar-thumb]:rounded-full`}
            >
              <div className="flex flex-col gap-1">
                {normalizedOptions.map((opt) => {
                  const isSelected = selectedOption?.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(opt.value);
                        setIsOpen(false);
                      }}
                      className={`group/item flex items-center gap-3 rounded-[12px] px-4 py-3 text-left transition-colors duration-200 cursor-pointer outline-none focus:bg-slate-50 ${
                        isSelected
                          ? 'bg-teal-50/80 text-teal-900 font-medium'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {opt.icon && <div className={`${isSelected ? 'text-teal-600' : 'text-slate-400 group-hover/item:text-slate-600 transition-colors'}`}>{opt.icon}</div>}
                      <span className="flex-1 text-sm">{opt.label}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {error && (
        <p className="mt-1 pl-1 text-[11px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

// ==========================================
// 4. Custom Interactive Luxury Date Picker (`<LuxuryDatePicker />`)
// ==========================================
interface LuxuryDatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
}

export const LuxuryDatePicker: React.FC<LuxuryDatePickerProps> = ({
  selectedDate,
  onChange,
  label = 'Select Travel Date',
  placeholder = 'MM / DD / YYYY',
  icon,
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(initialDateObj.getFullYear(), initialDateObj.getMonth(), 1));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const toggleDatePicker = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const isUp = spaceBelow < 360 && spaceAbove > spaceBelow;

      setOpenUpward(isUp);
      
      const isMobile = window.innerWidth < 640;
      setDropdownStyle({
        position: 'fixed',
        top: isUp ? undefined : rect.bottom + 8,
        bottom: isUp ? window.innerHeight - rect.top + 8 : undefined,
        left: isMobile ? 16 : rect.left,
        width: isMobile ? window.innerWidth - 32 : rect.width,
        zIndex: 9999,
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        // Also ensure they aren't clicking inside the portal
        const isPortalClick = (e.target as Element).closest('.luxury-date-picker-portal');
        if (!isPortalClick) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const handleToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    onChange(formatted);
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setIsOpen(false);
  };

  const formattedDisplay = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : placeholder;

  return (
    <div className={`relative my-2 w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-teal-800 mb-1.5 pl-1">
          {label}
        </label>
      )}

      {/* Trigger Box */}
      <motion.div
        animate={error ? { x: [-5, 5, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={toggleDatePicker}
        className={`relative flex items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3.5 backdrop-blur-md cursor-pointer transition-all duration-300 ${
          isOpen
            ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md shadow-teal-500/10'
            : selectedDate
            ? 'border-slate-300'
            : 'border-slate-200 hover:border-slate-300'
        } ${error ? 'border-red-500 ring-1 ring-red-500/20' : ''}`}
      >
        <div className="flex items-center gap-3">
          {icon ? (
            <div className="text-teal-600 shrink-0">{icon}</div>
          ) : (
            <Calendar className="h-4 w-4 text-teal-600 shrink-0" />
          )}
          <span
            className={`text-sm font-medium ${
              selectedDate ? 'text-slate-900 font-semibold' : 'text-slate-400'
            }`}
          >
            {formattedDisplay}
          </span>
        </div>
        <Sparkles className="h-4 w-4 text-orange-500 shrink-0" />
      </motion.div>

      {/* Calendar Modal Popover via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={dropdownStyle}
              initial={{ opacity: 0, y: openUpward ? 10 : -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openUpward ? 8 : -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`luxury-date-picker-portal rounded-[18px] border border-slate-200 bg-white p-4 backdrop-blur-2xl shadow-[0_16px_40px_rgba(15,23,42,0.1)]`}
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-serif font-bold text-slate-800">
                  {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <span key={d} className="text-[10px] font-bold uppercase text-slate-400">
                    {d}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 w-full" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDate === dateStr;
                  const isPast = new Date(dateStr) < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={isPast}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(dateStr);
                        setIsOpen(false);
                      }}
                      className={`h-10 w-full rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                          : isPast
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-teal-50 hover:text-teal-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Footer Quick Controls: Today & Clear */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[10px] font-semibold tracking-wider">
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1 text-slate-500 hover:text-teal-700 transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Clear</span>
                </button>

                <button
                  type="button"
                  onClick={handleToday}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-widest transition"
                >
                  <span>Today</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {error && (
        <p className="mt-1 pl-1 text-[11px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

// ==========================================
// 5. Complete Animated Luxury Form Container (`<LuxuryBookingForm />`)
// ==========================================
export const LuxuryForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('Sahara Desert Luxury Expedition');
  const [travelDate, setTravelDate] = useState('2026-10-18');
  const [guests, setGuests] = useState('2 Guests');
  const [submitted, setSubmitted] = useState(false);

  const destinationOptions = [
    { value: 'Sahara Desert Luxury Expedition', label: 'Sahara Desert Dunes & Luxury Camp' },
    { value: 'Marrakech Red City VIP Riad', label: 'Marrakech Red City & Private Riad' },
    { value: 'Fes Imperial Capital Tour', label: 'Fes Imperial Capital & Cultural Tour' },
    { value: 'Chefchaouen Blue Pearl Getaway', label: 'Chefchaouen Blue Pearl Retreat' },
    { value: 'Casablanca Atlantic Coastal Voyage', label: 'Casablanca Atlantic Luxury Transfer' },
  ];

  const guestOptions = [
    { value: '1 Guest', label: '1 Executive Guest' },
    { value: '2 Guests', label: '2 Guests (Couple / Private)' },
    { value: '3-5 Guests', label: '3 - 5 Guests (Maybach / SUV)' },
    { value: '6-12 Guests', label: '6 - 12 Guests (Sprinter VIP Lounge)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-slate-200/50">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2">
        <Sparkles className="h-4 w-4 text-orange-500" />
        <span>Inquire & Reserve</span>
      </div>

      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">
        Bespoke Private Itinerary Request
      </h3>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center text-center py-10 space-y-3"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 border border-teal-200 text-teal-600 shadow-md">
            <CheckCircle2 className="h-8 w-8 text-teal-600" />
          </div>
          <h4 className="font-serif text-xl font-bold text-slate-900">
            Reservation Request Received
          </h4>
          <p className="text-xs text-slate-600 max-w-sm">
            Our Senior VIP Concierge will tailor your bespoke itinerary and reach out within 2 hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <LuxuryInput
            label="Full Name"
            icon={<User className="h-4 w-4" />}
            value={fullName}
            onChange={(e) => setFullName(typeof e === 'string' ? e : e.target.value)}
            required
          />

          <LuxuryInput
            label="Email Address"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(typeof e === 'string' ? e : e.target.value)}
            required
          />

          <LuxuryInput
            label="Phone / WhatsApp"
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            value={phone}
            onChange={(e) => setPhone(typeof e === 'string' ? e : e.target.value)}
          />

          <LuxurySelect
            label="Desired Destination / Tour"
            icon={<MapPin className="h-4 w-4" />}
            value={destination}
            onChange={(val) => setDestination(val)}
            options={destinationOptions}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LuxuryDatePicker
              selectedDate={travelDate}
              onChange={(d) => setTravelDate(d)}
              label="Travel Date"
            />

            <LuxurySelect
              label="Guest Count"
              icon={<Users className="h-4 w-4" />}
              value={guests}
              onChange={(val) => setGuests(val)}
              options={guestOptions}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-orange-500/20 transition-all"
          >
            <Send className="h-4 w-4" />
            <span>Confirm Reservation</span>
          </motion.button>
        </form>
      )}
    </div>
  );
};

export const LuxuryBookingForm = LuxuryForm;
export default LuxuryForm;
