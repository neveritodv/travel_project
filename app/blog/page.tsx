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

export default function BlogPage() {
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <AnimatedPageLayout className="bg-slate-50 font-sans text-slate-800 selection:bg-orange-500 selection:text-white pt-20">
      <Navbar onOpenAIConcierge={() => setAiConciergeOpen(true)} />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[55vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden border-b border-teal-200"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=2000"
            alt="Moroccan Luxury Journal"
            className="h-full w-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-800 backdrop-blur-md mb-4 shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5 text-orange-500" />
            <span>Kingdom Journal & Travel Magazine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            Stories of Royal Moroccan Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-100 font-light leading-relaxed drop-shadow"
          >
            In-depth guides, artisan cultural insights, desert glamping comparisons, and insider travel advice directly from our VIP concierge team.
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
              <AnimatedCard className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 hover:border-teal-400 hover:shadow-2xl">
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90" />

                    <span className="absolute top-4 left-4 rounded-full bg-teal-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {post.category}
                    </span>

                    <span className="absolute bottom-3 right-4 flex items-center gap-1 text-[11px] text-slate-200 font-medium">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-teal-700 font-bold uppercase tracking-wider mb-2">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </div>

                    <h2 className="font-serif text-xl font-bold text-slate-900 group-hover:text-teal-700 transition">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-600" />
                    <span className="text-xs font-bold text-slate-800">{post.author}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2 text-xs font-bold text-teal-800 hover:bg-teal-600 hover:text-white transition"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">
                {selectedPost.category}
              </span>

              <h2 className="font-serif text-3xl font-bold text-slate-900">{selectedPost.title}</h2>

              <div className="flex items-center gap-4 text-xs text-slate-600 border-y border-slate-200 py-3 font-medium">
                <span>By {selectedPost.author} ({selectedPost.authorRole})</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-200">
                <img src={selectedPost.image} alt={selectedPost.title} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-light">
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
