import { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { chapters } from '../data/chapters';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  HelpCircle,
  Hash,
  Activity,
  Award,
  Zap,
  Layers,
  ChevronRight,
  Brain,
  PlayCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import TrigGrapherTool from './TrigGrapherTool';
import CommunityWorkbench from './CommunityWorkbench';

interface HomeViewProps {
  onSelectChapter: (id: number) => void;
  onNavigateToFormulas: () => void;
  onNavigateToVideos: (playlistId?: string, videoId?: string) => void;
}

export default function HomeView({ onSelectChapter, onNavigateToFormulas, onNavigateToVideos }: HomeViewProps) {
  // Retrieve last accessed chapter
  const [lastAccessedChapterId] = useState<number | null>(() => {
    const saved = localStorage.getItem('unlock_edu_selectedChapterId');
    return saved ? parseInt(saved, 10) : null;
  });

  const lastChapter = lastAccessedChapterId ? chapters.find(ch => ch.id === lastAccessedChapterId) : null;

  // Retrieve recent quizzes
  const [recentQuizzes, setRecentQuizzes] = useState<{chapterId: number, chapterTitle: string, score: number, total: number, date: string}[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('unlock_edu_recentQuizzes');
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    } catch (e) {
      return [];
    }
  });



  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-16"
    >
      {/* 1. Hero Welcoming Banner with Brand-Aligned Deep Navy, Sky & Gold Design */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] text-white p-6 md:p-10 shadow-xl shadow-slate-900/10 border border-slate-800/60"
      >
        {/* Subtle ambient light accents matching Unlock logo (Cyan & Warm Gold) */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-indigo-400/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-300">
            <span className="h-3.5 w-0.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Unlock Education · Grade 12 Mathematics</span>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-[1.12] text-white">
              Explore the Beauty of Mathematics
            </h1>
            <p className="text-sm md:text-base text-slate-200/90 leading-relaxed font-sans max-w-2xl">
              An immersive academic study guide built specifically for Unlock Education students. Master 11 core chapters with beautifully typeset LaTeX formula sheets, interactive practice quizzes, and real-time visualization tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={() => onSelectChapter(1)}
              className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 sm:px-6 min-h-[44px] rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              Start Studying Syllabus
            </button>
            <button
              type="button"
              onClick={() => onNavigateToVideos()}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-5 min-h-[44px] rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <PlayCircle className="w-4 h-4 text-amber-300 shrink-0" />
              Video Lessons
            </button>
            <button
              type="button"
              onClick={onNavigateToFormulas}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-5 min-h-[44px] rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Calculator className="w-4 h-4 shrink-0" />
              Formula Registry
            </button>
          </div>
        </div>
      </motion.div>

      {/* Continue Learning Section (Dynamic) */}
      {lastChapter && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/70 p-5 sm:p-6 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/50 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-0.5">
                Continue Learning
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">
                Chapter {lastChapter.id}: {lastChapter.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectChapter(lastChapter.id)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 min-h-[42px] rounded-xl font-bold text-xs tracking-wide transition-all shadow-xs cursor-pointer shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
          >
            <PlayCircle className="w-4 h-4 shrink-0" />
            Resume Chapter
          </button>
        </motion.div>
      )}

      {/* Recent Activity Section */}
      {recentQuizzes.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4 pt-1">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Recent Activity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tabular-nums">
              Last {recentQuizzes.length} {recentQuizzes.length === 1 ? 'quiz' : 'quizzes'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentQuizzes.map((quiz, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectChapter(quiz.chapterId)}
                className="group bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-2xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer flex flex-col justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    Chapter {quiz.chapterId}
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {quiz.chapterTitle}
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/70 w-full">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                      {quiz.score}/{quiz.total}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tabular-nums">
                    {new Date(quiz.date).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. Platform Interactive Statistics Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 sm:p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-bold font-display text-slate-950 dark:text-white tabular-nums leading-tight">11</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Core Chapters</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 sm:p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-bold font-display text-slate-950 dark:text-white tabular-nums leading-tight">100+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">LaTeX Formulas</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 sm:p-3 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-bold font-display text-slate-950 dark:text-white tabular-nums leading-tight">110+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Quiz Challenges</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-2xs flex items-center gap-3.5">
          <div className="p-2.5 sm:p-3 bg-violet-50 dark:bg-violet-950/50 rounded-xl text-violet-600 dark:text-violet-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-bold font-display text-slate-950 dark:text-white tabular-nums leading-tight">10</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Live Visualizers</div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Interactive Section: Quadratic Solver & Feature Highlight */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
      >
        {/* Left column: Feature Spotlights */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              Portal Highlights
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Why study math with this interactive portal?
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 flex gap-3.5 shadow-2xs">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center font-mono font-bold text-sm">
                i
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Beautiful Math Formula Sheets</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Every mathematical definition and proof is styled using real KaTeX code. You can copy the LaTeX text of any formula for your assignments.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 flex gap-3.5 shadow-2xs">
              <div className="bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center font-mono font-bold text-xs">
                f(x)
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Active Mathematical Visualizers</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Interactive graphs, vector coordinate additions, Argand diagram grids, and conic section plots respond directly to your variables.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 flex gap-3.5 shadow-2xs">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Interactive Assessment Quizzes</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Practice questions compiled directly from textbook chapters. Enter answers to get immediate marks, scores, and step-by-step mathematical solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Trigonometric Function Grapher */}
        <TrigGrapherTool />
      </motion.div>

      {/* 4. Complete 11 Chapter Syllabus Grid Navigator */}
      <motion.div
        variants={containerVariants}
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Core Syllabus Chapters
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Select a chapter to open study notes, interactive visualizers, formulas, and practice quizzes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((ch) => (
            <motion.button
              type="button"
              variants={itemVariants}
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="group relative bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl text-left shadow-2xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[154px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              {/* Card top elements */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    Chapter {String(ch.id).padStart(2, '0')}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm md:text-[15px] text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {ch.tagline.replace(/\$/g, '')}
                  </p>
                </div>
              </div>

              {/* Card bottom footer */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 w-full">
                <span className="font-medium flex items-center gap-1.5 tabular-nums">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  {ch.quiz.length} Quiz Questions
                </span>
                <span className="font-semibold text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                  Open
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 5. Unified YouTube & Facebook Community Workbench */}
      <motion.div variants={itemVariants}>
        <CommunityWorkbench
          onSelectChapter={onSelectChapter}
          onNavigateToVideos={onNavigateToVideos}
        />
      </motion.div>

    </motion.div>
  );
}
