'use client';

import React, { useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ShieldCheck, Star, Award, ChevronDown, ChevronUp, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, FAQS, STATS } from '../lib/data';
import { AnimatedTitle, StaggerContainer, StaggerItem, AnimatedCard, MagneticInteraction, LUXURY_EASE } from './AnimationEngine';

const CountUp: React.FC<{ to: string }> = ({ to }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const isPlus = to.includes('+');
  const targetNum = parseInt(to.replace(/\D/g, '')) || 0;

  React.useEffect(() => {
    if (inView && ref.current && targetNum > 0) {
      const controls = animate(0, targetNum, {
        duration: 2,
        ease: LUXURY_EASE,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toString() + (isPlus ? '+' : '');
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, targetNum, isPlus]);

  return <span ref={ref}>{to}</span>;
};

export const Screen7Trust: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="screen-7" className="relative min-h-screen w-full bg-slate-100 px-4 py-[64px] md:py-[88px] lg:py-[120px] text-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl space-y-20">
        {/* Header */}
        <AnimatedTitle
          title="Trusted by World Discerning Travelers"
          badge={<><Award className="h-3.5 w-3.5 text-teal-600" /><span>Excellence & Verified Trust</span></>}
          description="Fourteen years of royal hospitality, flawless transport logistics, and lifelong memories across Morocco’s most iconic landscapes."
          badgeClassName="flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800"
        />

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <StaggerItem key={i}>
              <AnimatedCard glow={true} className="flex flex-col items-center text-center p-6 rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/50 transition-transform hover:-translate-y-2 will-change-transform">
                <span className="font-serif text-3xl sm:text-5xl font-bold text-orange-500">
                  <CountUp to={stat.value} />
                </span>
                <span className="mt-2 text-xs uppercase tracking-wider text-slate-600 font-semibold">
                  {stat.label}
                </span>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Testimonials Magazine Showcase */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Guest Stories & Reviews
            </h3>
            <p className="text-xs text-teal-800 uppercase tracking-widest mt-1 font-bold">
              Verified Royal Expeditions
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <AnimatedCard className="group/test relative flex flex-col justify-between h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10 will-change-transform">
                  <Quote className="h-8 w-8 text-teal-600/30 mb-4 transition-transform duration-500 group-hover/test:scale-110 group-hover/test:-rotate-6" />

                  <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed italic">
                    “{t.comment}”
                  </p>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-4 transition-transform duration-500 group-hover/test:translate-x-1">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover border border-teal-500/30 transition-transform duration-500 group-hover/test:scale-110"
                    />
                    <div>
                      <h4 className="font-serif text-base font-bold text-slate-900 group-hover/test:text-teal-700 transition-colors">{t.name}</h4>
                      <p className="text-[11px] text-slate-500">{t.role} • {t.location}</p>
                      <div className="flex items-center gap-1 mt-1 text-orange-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-teal-800 uppercase tracking-widest mt-1 font-bold">
              Everything you need to know before landing in Morocco
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-900 transition hover:bg-teal-50/50"
                  >
                    <span className="font-serif text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-teal-600 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-teal-600 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
