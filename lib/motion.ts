import { Variants, Transition } from 'motion/react';

// Standardized Luxury Easing Curves
export const luxuryEase: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const springSmooth = { type: 'spring' as const, stiffness: 260, damping: 25 };

export const transitionFast: Transition = { duration: 0.25, ease: luxuryEase };
export const transitionMedium: Transition = { duration: 0.45, ease: luxuryEase };
export const transitionSlow: Transition = { duration: 0.75, ease: luxuryEase };

export const motionPresets = {
  // Page Route Transitions
  pageTransition: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: transitionMedium,
  },

  // Scroll Viewport Reveals
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: transitionMedium,
  },

  fadeDown: {
    initial: { opacity: 0, y: -24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: transitionMedium,
  },

  fadeLeft: {
    initial: { opacity: 0, x: 24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: transitionMedium,
  },

  fadeRight: {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: transitionMedium,
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.94 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: transitionMedium,
  },

  // Stagger Container & Items for Grids
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  } as Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: transitionMedium,
    },
  } as Variants,

  // Interactive Micro-Interactions
  buttonHover: {
    whileHover: { scale: 1.03, y: -1.5 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  cardHover: {
    whileHover: { y: -6, scale: 1.01 },
    transition: { duration: 0.3, ease: luxuryEase },
  },

  iconHover: {
    whileHover: { rotate: 8, scale: 1.15 },
    whileTap: { scale: 0.9 },
    transition: { duration: 0.2 },
  },

  imageZoom: {
    initial: { scale: 1 },
    whileHover: { scale: 1.06 },
    transition: { duration: 0.6, ease: luxuryEase },
  },

  // Modals, Drawers & Overlays
  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.94, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.94, y: 16 },
    transition: transitionMedium,
  },

  // Dropdowns & Popovers
  dropdown: {
    initial: { opacity: 0, scale: 0.95, y: -8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -8 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  // Filter Grid List Items
  filterItem: {
    initial: { opacity: 0, scale: 0.92, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: -12 },
    transition: transitionFast,
  },
};
