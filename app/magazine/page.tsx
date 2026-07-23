'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, User, Calendar, Tag, ArrowRight, Sparkles, Eye, X } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { AIConciergeModal } from '../../components/AIConciergeModal';
import { AnimatedPageLayout } from '../../components/AnimatedPageLayout';
import {
  ScrollRevealSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCard,
} from '../../components/AnimationEngine';
import { BLOG_POSTS, BlogPost } from '../../lib/data';

export default function MagazinePage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <AnimatedPageLayout className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950 pt-20 flex flex-col">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[55vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden border-b border-amber-500/20"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=2000"
            alt="Moroccan Luxury Journal"
            className="h-full w-full object-cover object-center brightness-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span>Kingdom Journal & Editorial Magazine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-amber-100"
          >
            Stories of Royal Moroccan Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-sm sm:text-base text-amber-200/80 font-light leading-relaxed"
          >
            In-depth guides, artisan cultural insights, desert glamping comparisons, and insider travel advice directly from our senior VIP concierge team.
          </motion.p>
        </div>
      </motion.section>

      {/* Article Grid */}
      <ScrollRevealSection
        variant="fadeUp"
        className="py-16 px-4 max-w-7xl mx-auto space-y-12"
      >
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.id}>
              <AnimatedCard className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-900/90 shadow-2xl transition duration-500 hover:border-amber-400/50">
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                    <span className="absolute top-4 left-4 rounded-full border border-amber-400/30 bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md">
                      {post.category}
                    </span>

                    <span className="absolute bottom-3 right-4 flex items-center gap-1 text-[11px] text-amber-300/80 font-medium">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-amber-400/80 font-semibold uppercase tracking-wider mb-2">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </div>

                    <h2 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-xs text-amber-200/80 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-amber-500/10 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-200">{post.author}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollRevealSection>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-10 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 rounded-full border border-amber-500/30 bg-slate-950 p-2 text-amber-200 hover:bg-amber-500 hover:text-slate-950 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                {selectedPost.category}
              </span>

              <h2 className="font-serif text-3xl font-bold text-amber-100">{selectedPost.title}</h2>

              <div className="flex items-center gap-4 text-xs text-amber-300/80 border-y border-amber-500/20 py-3">
                <span>By {selectedPost.author} ({selectedPost.authorRole})</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="relative h-64 w-full rounded-2xl overflow-hidden">
                <img src={selectedPost.image} alt={selectedPost.title} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-4 text-sm text-amber-100/90 leading-relaxed font-light">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIConciergeModal isOpen={aiConciergeOpen} onClose={() => setAiConciergeOpen(false)} />
    </AnimatedPageLayout>
  );
}
