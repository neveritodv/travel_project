'use client';

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'motion/react';

// Easing presets
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

// ==========================================
// 1. AnimatedSection / ScrollRevealSection
// ==========================================
export type SectionVariant =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleIn'
  | 'maskReveal'
  | 'parallax';

interface ScrollRevealSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: SectionVariant;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

const variantMap: Record<SectionVariant, { initial: any; animate: any }> = {
  fadeUp: {
    initial: { opacity: 0, y: 40, scale: 0.97, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' },
  },
  fadeDown: {
    initial: { opacity: 0, y: -40, scale: 0.97, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -40, scale: 0.97, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, scale: 1.0, filter: 'blur(0px)' },
  },
  fadeRight: {
    initial: { opacity: 0, x: 40, scale: 0.97, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, scale: 1.0, filter: 'blur(0px)' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
    animate: { opacity: 1, scale: 1.0, filter: 'blur(0px)' },
  },
  maskReveal: {
    initial: { opacity: 0, scale: 0.97, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1.0, filter: 'blur(0px)' },
  },
  parallax: {
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
  },
};

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className = '',
  id,
  ...props
}) => {
  const config = variantMap[variant] || variantMap.fadeUp;

  return (
    <motion.div
      id={id}
      initial={config.initial}
      whileInView={config.animate}
      viewport={{ once: true, margin: '-12%' }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedSection = ScrollRevealSection;

// ==========================================
// 2. AnimatedHero Component
// ==========================================
interface AnimatedHeroProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 3. AnimatedTitle / AnimatedText
// ==========================================
interface AnimatedTitleProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  badge?: React.ReactNode;
  cta?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  badgeClassName?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
  subtitle,
  description,
  badge,
  cta,
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  badgeClassName = '',
}) => {
  const alignClass =
    align === 'center'
      ? 'text-center mx-auto'
      : align === 'right'
      ? 'text-right ml-auto'
      : 'text-left';

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
          },
        },
      }}
      className={`max-w-4xl space-y-3 ${alignClass} ${className}`}
    >
      {badge && (
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 10 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.5, ease: LUXURY_EASE },
            },
          }}
          className={`inline-block ${badgeClassName}`}
        >
          {badge}
        </motion.div>
      )}

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: LUXURY_EASE },
            },
          }}
          className={`text-xs font-bold uppercase tracking-widest text-teal-700 ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20, letterSpacing: '0.02em', filter: 'blur(8px)' },
          show: {
            opacity: 1,
            y: 0,
            letterSpacing: '0em',
            filter: 'blur(0px)',
            transition: { duration: 0.7, ease: LUXURY_EASE },
          },
        }}
        className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: LUXURY_EASE },
            },
          }}
          className={`text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${descriptionClassName}`}
        >
          {description}
        </motion.p>
      )}

      {cta && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: LUXURY_EASE },
            },
          }}
          className="pt-2"
        >
          {cta}
        </motion.div>
      )}
    </motion.div>
  );
};

// ==========================================
// 4. StaggerContainer & StaggerItem
// ==========================================
interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  id?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  className = '',
  id,
  ...props
}) => {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  yOffset = 24,
  ...props
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: LUXURY_EASE,
          },
        },
      }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 5. AnimatedCard / InteractiveItem
// ==========================================
interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  liftAmount?: number;
  scaleAmount?: number;
  glow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  id?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  liftAmount = -8,
  scaleAmount = 1.02,
  glow = true,
  onClick,
  className = '',
  id,
  ...props
}) => {
  return (
    <motion.div
      id={id}
      onClick={onClick}
      whileHover={{
        y: liftAmount,
        scale: scaleAmount,
        transition: { duration: 0.4, ease: LUXURY_EASE },
      }}
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.15 },
      }}
      className={`group relative rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:border-teal-400/80 will-change-transform ${
        glow
          ? 'hover:shadow-[0_20px_45px_rgba(15,23,42,0.12),0_0_25px_rgba(13,148,136,0.15)]'
          : 'hover:shadow-2xl'
      } ${className}`}
      {...props}
    >
      {/* Glow Overlay on Hover */}
      {glow && (
        <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-teal-500/5 via-transparent to-amber-500/5 pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
};

export const InteractiveItem = AnimatedCard;

// ==========================================
// 6. AnimatedImage / HoverImageZoom
// ==========================================
interface AnimatedImageProps {
  children: React.ReactNode;
  className?: string;
  zoomScale?: number;
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  children,
  className = '',
  zoomScale = 1.08,
}) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        whileHover={{ scale: zoomScale }}
        transition={{ duration: 0.6, ease: SMOOTH_EASE }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const HoverImageZoom = AnimatedImage;

// ==========================================
// 7. AnimatedButton Component
// ==========================================
interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'teal';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 border border-orange-400/30 hover:shadow-[0_8px_20px_rgba(249,115,22,0.3)]',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-md border border-slate-700/50 hover:shadow-[0_8px_20px_rgba(15,23,42,0.3)]',
    outline:
      'border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]',
    teal:
      'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 border border-teal-500/30 hover:shadow-[0_8px_20px_rgba(13,148,136,0.3)]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease: LUXURY_EASE }}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 will-change-transform ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ==========================================
// 8. Magnetic Interaction Wrapper
// ==========================================
import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export const MagneticInteraction: React.FC<{ children: React.ReactNode, maxDistance?: number, className?: string }> = ({ children, maxDistance = 8, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring config for a premium, heavy luxury feel
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center, clamped to maxDistance
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Scale down movement for subtle magnetic effect
    x.set((distanceX / (width / 2)) * maxDistance);
    y.set((distanceY / (height / 2)) * maxDistance);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 8. Direct Variant Wrappers
// ==========================================
export const FadeUp: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection variant="fadeUp" {...props} />
);

export const FadeDown: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection variant="fadeDown" {...props} />
);

export const FadeLeft: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection variant="fadeLeft" {...props} />
);

export const FadeRight: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection variant="fadeRight" {...props} />
);

export const ScaleReveal: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection variant="scaleIn" {...props} />
);

export const MaskReveal: React.FC<ScrollRevealSectionProps> = (props) => (
  <ScrollRevealSection variant="maskReveal" {...props} />
);
