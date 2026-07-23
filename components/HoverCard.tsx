'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  onClick,
  id,
}) => {
  return (
    <motion.div
      id={id}
      onClick={onClick}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-900/80 backdrop-blur-md transition-colors duration-300 hover:border-amber-400/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.2)] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;
