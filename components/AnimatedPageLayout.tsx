'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from './Footer';

interface AnimatedPageLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

export const AnimatedPageLayout: React.FC<AnimatedPageLayoutProps> = ({
  children,
  showFooter = true,
  className = '',
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1.0 }}
        exit={{ opacity: 0, y: -16, scale: 0.99 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`min-h-screen flex flex-col ${className}`}
      >
        <div className="flex-1 flex flex-col">{children}</div>
        {showFooter && <Footer />}
      </motion.div>
    </AnimatePresence>
  );
};
