'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  Clock,
  Calendar,
  ArrowRight,
  Compass,
  Crown,
  Route,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import { DESTINATIONS, DestinationHotspot } from '../lib/data';

interface Screen2Props {
  onSelectDestinationForBooking: (destName: string) => void;
}

// Map configuration for non-overlapping labels and leader lines in an 800x500 SVG coordinate system
interface MapNodeConfig {
  px: number; // Pin X (0-800)
  py: number; // Pin Y (0-500)
  lx: number; // Label X (0-800)
  ly: number; // Label Y (0-500)
  align: 'left' | 'right' | 'center'; // CSS text/flex alignment of label relative to lx
  badgeTag: string;
  isHub?: boolean;
}

interface RawHotspotInput {
  id: string;
  px: number;
  py: number;
  badgeTag: string;
  isHub?: boolean;
}

const RAW_HOTSPOTS: RawHotspotInput[] = [
  { id: 'marrakech', px: 300, py: 270, badgeTag: 'ROYAL HUB', isHub: true },
  { id: 'agafay', px: 235, py: 340, badgeTag: '45m Drive' },
  { id: 'atlas', px: 375, py: 360, badgeTag: '1.5h Drive' },
  { id: 'merzouga', px: 660, py: 310, badgeTag: 'Sahara Glamping' },
  { id: 'ouzoud', px: 415, py: 205, badgeTag: 'Cascades' },
  { id: 'essaouira', px: 125, py: 270, badgeTag: 'Atlantic Port' },
  { id: 'chefchaouen', px: 435, py: 75, badgeTag: 'Blue City' },
  { id: 'fes', px: 540, py: 125, badgeTag: 'Ancient Medina' },
];

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// Axis-Aligned Bounding Box intersection with minimum gap padding
function rectIntersect(r1: Rect, r2: Rect, gapX: number, gapY: number): boolean {
  return !(
    r2.left > r1.right + gapX ||
    r2.right < r1.left - gapX ||
    r2.top > r1.bottom + gapY ||
    r2.bottom < r1.top - gapY
  );
}

/**
 * Fixed Radial Cartographic Layout Engine
 * Guarantees Apple-tier luxury visual hierarchy, a 200px exclusion zone around Marrakech,
 * and perfectly balanced sector-based spacing.
 */
function calculateMapNodes(): Record<string, MapNodeConfig> {
  // 1. Permanent Fixed Regions ensuring 140px+ horizontal and 100px+ vertical spacing.
  // Pins (px, py) sit neatly outside the 200px Marrakech radius.
  // Labels (lx, ly) sit at the map perimeter.
  return {
    marrakech: { px: 400, py: 250, lx: 400, ly: 165, align: 'center', badgeTag: 'ROYAL HUB', isHub: true },
    chefchaouen: { px: 400, py: 80, lx: 400, ly: 75, align: 'center', badgeTag: 'Blue City' },
    essaouira: { px: 219, py: 145, lx: 40, ly: 110, align: 'left', badgeTag: 'Atlantic Port' },
    fes: { px: 581, py: 145, lx: 760, ly: 110, align: 'right', badgeTag: 'Ancient Medina' },
    ouzoud: { px: 606, py: 286, lx: 800, ly: 185, align: 'right', badgeTag: 'Cascades' },
    merzouga: { px: 548, py: 398, lx: 720, ly: 420, align: 'right', badgeTag: 'Sahara Glamping' },
    atlas: { px: 400, py: 460, lx: 400, ly: 505, align: 'center', badgeTag: '1.5h Drive' },
    agafay: { px: 252, py: 398, lx: 40, ly: 420, align: 'left', badgeTag: '45m Drive' },
  };
}

export const Screen2ExploreMap: React.FC<Screen2Props> = ({ onSelectDestinationForBooking }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<DestinationHotspot>(DESTINATIONS[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<DestinationHotspot | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const mapNodes = useMemo(() => calculateMapNodes(), []);

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (filter === 'All') return true;
    return d.category === filter;
  });

  const activeDest = hoveredHotspot || selectedHotspot;

  return (
    <section id="screen-2" className="relative min-h-screen w-full bg-slate-50 px-4 py-16 sm:py-24 text-slate-800 overflow-hidden">
      {/* Background Soft Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800 shadow-sm backdrop-blur-md"
          >
            <Compass className="h-3.5 w-3.5 text-teal-600 animate-spin-slow" />
            <span>Interactive Kingdom Atlas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900"
          >
            Explore the Wonders of Morocco
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 font-light leading-relaxed"
          >
            Tap any destination on our kingdom map below to inspect luxury transfer routes, drive times, and royal itinerary highlights with zero label clutter.
          </motion.p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['All', 'Desert', 'Imperial', 'Mountains', 'Coast', 'Oasis'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-105'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:text-teal-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Map & Preview Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Canvas (7 cols) */}
          <div className="lg:col-span-7 relative rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col justify-between">
            {/* Top Map Bar */}
            <div className="relative z-20 flex items-center justify-between border-b border-slate-100 pb-3 mb-2 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-teal-800">
                <Route className="h-4 w-4 text-orange-500" />
                <span>Kingdom Transport Grid</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                <span className="hidden sm:inline">Hub: Marrakech</span>
                <span className="rounded bg-teal-50 border border-teal-200 px-2 py-0.5 text-teal-800 font-bold">
                  8 Hotspots
                </span>
              </div>
            </div>

            {/* Map Area with SVG Layer and HTML Hotspot Overlays */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[16/10] min-h-[480px] sm:min-h-[460px] rounded-2xl bg-gradient-to-br from-slate-50 via-teal-50/20 to-amber-50/30 overflow-hidden border border-slate-100 shadow-inner">
              <div className="absolute inset-5 sm:inset-7">
                {/* SVG Canvas for Map Contour, Grid, Route Lines, and Leader Lines */}
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 w-full h-full pointer-events-none select-none"
                >
                <defs>
                  {/* Route Gradient */}
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Soft Radial Glow Filter */}
                  <filter id="glow" x="-15%" y="-15%" width="130%" height="130%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle Grid Lines */}
                <g stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4">
                  <line x1="100" y1="0" x2="100" y2="500" />
                  <line x1="250" y1="0" x2="250" y2="500" />
                  <line x1="400" y1="0" x2="400" y2="500" />
                  <line x1="550" y1="0" x2="550" y2="500" />
                  <line x1="700" y1="0" x2="700" y2="500" />
                  <line x1="0" y1="100" x2="800" y2="100" />
                  <line x1="0" y1="250" x2="800" y2="250" />
                  <line x1="0" y1="400" x2="800" y2="400" />
                </g>

                {/* Stylized Morocco Geographic Silhouette */}
                <path
                  d="M 420 50 Q 320 60 220 180 T 120 320 Q 80 400 130 450 L 220 480 Q 400 490 600 450 T 780 340 Q 750 200 620 120 T 420 50 Z"
                  fill="#0d9488"
                  fillOpacity="0.04"
                  stroke="#0d9488"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />

                {/* Marrakech Exclusion Zone Circle Guide (Subtle Cartographic Ring) */}
                <circle
                  cx="300"
                  cy="270"
                  r="200"
                  fill="none"
                  stroke="#0d9488"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />

                {/* Atlas Mountains Ridge Vector Art */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d="M 240 360 Q 330 330 420 370 T 600 340"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Compass Rose */}
                <motion.g 
                  initial={{ opacity: 0, rotate: -45, x: 755, y: 30 }}
                  animate={{ opacity: 0.35, rotate: 0, x: 755, y: 30 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <circle r="22" fill="none" stroke="#0d9488" strokeWidth="1" />
                  <path d="M 0 -18 L 4 0 L 0 18 L -4 0 Z" fill="#0d9488" />
                  <path d="M -18 0 L 0 4 L 18 0 L 0 -4 Z" fill="#f97316" />
                  <text x="0" y="-22" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">N</text>
                </motion.g>

                {/* Royal Route Connecting Lines from Marrakech Hub */}
                {DESTINATIONS.map((dest) => {
                  if (dest.id === 'marrakech') return null;
                  const hub = mapNodes['marrakech'];
                  const node = mapNodes[dest.id];
                  if (!node || !hub) return null;

                  const isSelected = selectedHotspot.id === dest.id;
                  const isHovered = hoveredHotspot?.id === dest.id;
                  const isHighlight = isSelected || isHovered;

                  // Quadratic Bezier curve control point for graceful arching paths
                  const midX = (hub.px + node.px) / 2;
                  const midY = (hub.py + node.py) / 2 - 25;
                  const pathD = `M ${hub.px} ${hub.py} Q ${midX} ${midY} ${node.px} ${node.py}`;

                  return (
                    <g key={`route-${dest.id}`}>
                      {/* Base Subtle Route Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isHighlight ? 'url(#routeGradient)' : '#cbd5e1'}
                        strokeWidth={isHighlight ? 2.5 : 1.2}
                        strokeDasharray={isHighlight ? 'none' : '4 4'}
                        opacity={isHighlight ? 1 : 0.45}
                        filter={isHighlight ? 'url(#glow)' : undefined}
                      />

                      {/* Moving Energy Pulse Dot along Active Route */}
                      {isSelected && (
                        <circle r="4" fill="#f97316" filter="url(#glow)">
                          <animateMotion
                            path={pathD}
                            dur="2.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Leader Lines Connecting Pins to Radial Label Anchors */}
                {DESTINATIONS.map((dest) => {
                  const node = mapNodes[dest.id];
                  if (!node) return null;

                  const isSelected = selectedHotspot.id === dest.id;
                  const isHovered = hoveredHotspot?.id === dest.id;
                  const isActive = isSelected || isHovered;
                  const hasActive = selectedHotspot || hoveredHotspot;
                  const lineOpacity = isActive ? (isSelected ? 1 : 0.8) : 0.6;
                  const isFilteredOut = filter !== 'All' && dest.category !== filter;

                  if (node.isHub) {
                    // Short vertical leader line for Marrakech Hub
                    return (
                      <g key={`leader-${dest.id}`}>
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: isHovered ? [0, 1] : 1, 
                            opacity: isFilteredOut ? 0.1 : lineOpacity 
                          }}
                          transition={{ duration: isHovered ? 0.3 : 0.8, delay: isHovered ? 0 : 0.5, ease: "easeOut" }}
                          d={`M ${node.px} ${node.py} L ${node.lx} ${node.ly}`}
                          fill="none"
                          stroke={isSelected ? '#f97316' : '#94a3b8'}
                          strokeWidth={1}
                          strokeDasharray="3 5"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  }

                  const hub = mapNodes['marrakech'];

                  // Quadratic curve control point angled away from Marrakech hub to avoid intersections
                  const midX = (node.px + node.lx) / 2;
                  const midY = (node.py + node.ly) / 2;
                  
                  const hdx = midX - (hub?.px || 400);
                  const hdy = midY - (hub?.py || 250);
                  const hdist = Math.sqrt(hdx * hdx + hdy * hdy) || 1;
                  
                  // Generous elegant curve pulling away from center
                  const curveOffset = 35;
                  const controlX = midX + (hdx / hdist) * curveOffset;
                  const controlY = midY + (hdy / hdist) * curveOffset;

                  const curvePath = `M ${node.px} ${node.py} Q ${controlX} ${controlY} ${node.lx} ${node.ly}`;

                  return (
                    <g key={`leader-${dest.id}`}>
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: isHovered ? [0, 1] : 1, 
                          opacity: isFilteredOut ? 0.1 : lineOpacity 
                        }}
                        transition={{ duration: isHovered ? 0.3 : 1, delay: isHovered ? 0 : 0.8, ease: "easeOut" }}
                        d={curvePath}
                        fill="none"
                        stroke={isSelected ? '#f97316' : isHovered ? '#0d9488' : '#94a3b8'}
                        strokeWidth={1}
                        strokeDasharray="3 5"
                        strokeLinecap="round"
                      />
                      {/* Anchor dot at label callout termination */}
                      <motion.circle
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: isActive ? 1 : (hasActive ? 0.2 : 0.4), scale: 1 }}
                        transition={{ delay: 1 }}
                        cx={node.lx}
                        cy={node.ly}
                        r={isSelected ? 3 : 2}
                        fill={isSelected ? '#f97316' : isHovered ? '#0d9488' : '#64748b'}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Interactive Pin Markers & Label Overlay Layer */}
              {DESTINATIONS.map((dest, index) => {
                const node = mapNodes[dest.id];
                if (!node) return null;

                const isSelected = selectedHotspot.id === dest.id;
                const isHovered = hoveredHotspot?.id === dest.id;
                const isFilteredOut = filter !== 'All' && dest.category !== filter;
                const isHub = node.isHub;
                
                // Focus highlighting logic
                const hasActive = !!(selectedHotspot || hoveredHotspot);
                const isActive = isSelected || isHovered;
                const pinOpacity = isFilteredOut ? 0.2 : (hasActive && !isActive ? 0.92 : 1);
                const labelOpacity = isFilteredOut ? 0.2 : (hasActive && !isActive ? 0.95 : 1);

                // Pin coordinates in percentage for HTML positioning
                const pinLeftPercent = (node.px / 800) * 100;
                const pinTopPercent = (node.py / 500) * 100;

                // Label coordinates in percentage
                const labelLeftPercent = (node.lx / 800) * 100;
                const labelTopPercent = (node.ly / 500) * 100;

                // Horizontal translation based on node alignment config to prevent clipping on map edges
                const alignTranslateClass =
                  node.align === 'left'
                    ? 'translate-x-0'
                    : node.align === 'right'
                    ? '-translate-x-full'
                    : '-translate-x-1/2';

                return (
                  <React.Fragment key={`hotspot-${dest.id}`}>
                    {/* Map Marker Pin Button */}
                    <motion.div
                      key={`pin-${dest.id}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: pinOpacity }}
                      transition={{ delay: isHub ? 0.2 : 1.2 + (index * 0.05), type: 'spring' }}
                      style={{ left: `${pinLeftPercent}%`, top: `${pinTopPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                        isHub ? 'z-40' : 'z-20'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedHotspot(dest)}
                        onMouseEnter={() => setHoveredHotspot(dest)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        className="group relative flex items-center justify-center p-2 rounded-full focus:outline-none"
                        title={dest.name}
                      >
                        {/* Soft Radial Glow behind selected pin */}
                        <div
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none transition-all duration-300 blur-xl ${
                            isActive ? 'bg-orange-500/15 opacity-100 scale-100' : 'bg-transparent opacity-0 scale-50'
                          }`}
                        />
                        
                        {/* Outer Pulse Ring */}
                        <div
                          className={`absolute inset-0 rounded-full transition-all duration-500 ${
                            isSelected
                              ? 'bg-orange-500/15 animate-ping'
                              : isHovered && isHub
                              ? 'bg-amber-500/25 scale-[1.35]'
                              : isHovered
                              ? 'bg-teal-500/15 scale-125'
                              : 'bg-teal-500/5 animate-ping [animation-duration:7s]'
                          }`}
                        />

                        {/* Core Marker Icon Box */}
                        <motion.div
                          animate={isHub && !isSelected && !isHovered ? { scale: [1, 1.04, 1] } : {}}
                          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                          className={`relative flex items-center justify-center transition-all rounded-full border shadow-md ${
                            isActive ? 'duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]' : 'duration-250 ease-out'
                          } ${
                            isHub
                              ? isSelected
                                ? 'h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 border-2 border-amber-200 text-white shadow-lg shadow-orange-500/20 scale-110 ring-2 ring-amber-400/20 brightness-110'
                                : `h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-tr from-amber-500 to-amber-600 border-2 border-amber-300 text-white shadow-md shadow-amber-500/15 hover:scale-[1.08] ring-1 ring-amber-300/20 ${isHovered ? 'shadow-amber-500/30 ring-amber-300/40 brightness-105' : ''}`
                              : isSelected
                              ? 'h-10 w-10 bg-orange-500 border-2 border-orange-300 text-white shadow-lg shadow-orange-500/30 scale-110 brightness-110'
                              : isHovered
                              ? 'h-10 w-10 bg-teal-600 border-2 border-teal-300 text-white shadow-lg shadow-teal-500/40 scale-[1.08] brightness-105'
                              : 'h-9 w-9 bg-white border-2 border-slate-300 text-teal-700 hover:border-teal-500 hover:bg-slate-50 hover:scale-[1.08] hover:shadow-lg hover:shadow-teal-500/20'
                          }`}
                        >
                          {isHub ? (
                            <Crown className="h-6 w-6 sm:h-7 sm:w-7 text-amber-100 drop-shadow-sm animate-pulse" />
                          ) : (
                            <MapPin className="h-4.5 w-4.5" />
                          )}
                        </motion.div>
                      </button>
                    </motion.div>

                    {/* Non-Overlapping Radial Label Badge Tag with edge overflow protection */}
                    <motion.div
                      key={`label-${dest.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{
                        opacity: labelOpacity,
                        scale: isSelected ? 1.05 : 1,
                        y: 0
                      }}
                      transition={{
                        opacity: { delay: 1.5 + (index * 0.1), duration: 0.5 },
                        y: { delay: 1.5 + (index * 0.1), duration: 0.5, type: 'spring' },
                        layout: { type: 'spring', stiffness: 180, damping: 24 },
                      }}
                      style={{ left: `${labelLeftPercent}%`, top: `${labelTopPercent}%` }}
                      className={`absolute ${alignTranslateClass} -translate-y-1/2 pointer-events-auto ${
                        isHub ? 'z-50' : 'z-30'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedHotspot(dest)}
                        onMouseEnter={() => setHoveredHotspot(dest)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        className={`group flex items-center gap-2 rounded-xl border whitespace-nowrap shadow-sm backdrop-blur-md hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-300/50 ${
                          isActive ? 'transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]' : 'transition-all duration-250 ease-out'
                        } ${
                          isHub ? 'px-3.5 py-1.5' : 'px-2.5 py-1'
                        } ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-300/50 -translate-y-1'
                            : isHovered
                            ? 'border-teal-500 bg-white text-slate-900 shadow-md ring-2 ring-teal-200'
                            : isHub
                            ? 'border-amber-400 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md shadow-amber-500/30 ring-2 ring-amber-300/50'
                            : 'border-slate-200/90 bg-white/90 text-slate-800 hover:border-slate-400 hover:bg-white'
                        }`}
                      >
                        <span className={`font-serif font-bold tracking-tight ${isHub ? 'text-xs sm:text-sm text-white' : 'text-[11px] sm:text-xs'}`}>
                          {dest.name}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 font-bold uppercase tracking-wider ${
                            isSelected
                              ? 'bg-white/20 text-white text-[9px]'
                              : isHub
                              ? 'bg-white/25 text-amber-100 text-[10px] shadow-sm'
                              : 'bg-slate-100 text-slate-600 text-[9px]'
                          }`}
                        >
                          {node.badgeTag}
                        </span>
                      </button>
                    </motion.div>
                  </React.Fragment>
                );
              })}
              </div>
            </div>

            {/* Bottom Map Legend */}
            <div className="relative z-10 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-800">Primary Hub: Marrakech</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 hidden sm:inline-flex">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <span>Interactive Hotspots</span>
                </span>
              </div>
              <span className="text-[11px] text-teal-700 font-bold uppercase tracking-wider">
                Tap any region for details
              </span>
            </div>
          </div>

          {/* Hotspot Detailed Glass Spotlight Card (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-200/60 backdrop-blur-xl relative overflow-hidden"
              >
                {/* Destination Image Preview */}
                <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-slate-200 mb-6 group">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-slate-900/80 border border-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      {activeDest.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                        {activeDest.region}
                      </p>
                      <h4 className="font-serif text-2xl text-white font-bold drop-shadow-md">
                        {activeDest.name}
                      </h4>
                    </div>
                    <span className="font-serif text-xl text-white/90 font-bold">
                      {activeDest.arabicName}
                    </span>
                  </div>
                </div>

                {/* Subtitle / Short Tag */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700">
                  <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                  <span>{activeDest.shortTag}</span>
                </div>

                {/* Narrative Description */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-light">
                  {activeDest.description}
                </p>

                {/* Logistics Route Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Clock className="h-4 w-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">Drive from Marrakech</p>
                      <p className="font-bold text-slate-900">{activeDest.driveFromMarrakech}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Calendar className="h-4 w-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">Recommended Duration</p>
                      <p className="font-bold text-slate-900">{activeDest.recommendedDuration}</p>
                    </div>
                  </div>
                </div>

                {/* Signature Highlights */}
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wider text-teal-800 font-bold mb-2.5 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-teal-600" />
                    <span>Signature Luxury Highlights</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDest.mustSee.map((spot, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700 font-medium flex items-center gap-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-7 pt-2">
                  <button
                    onClick={() => onSelectDestinationForBooking(activeDest.name)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span>Book Private Transfer to {activeDest.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
