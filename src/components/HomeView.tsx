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
  Facebook,
  Send,
  PlayCircle,
  Clock,
  Youtube
} from 'lucide-react';
import { motion } from 'motion/react';
import TrigGrapherTool from './TrigGrapherTool';
import { useYoutubeVideos, formatYoutubeDate } from '../data/youtubeVideos';

interface HomeViewProps {
  onSelectChapter: (id: number) => void;
  onNavigateToFormulas: () => void;
  onNavigateToVideos: (playlistId?: string, videoId?: string) => void;
}

export default function HomeView({ onSelectChapter, onNavigateToFormulas, onNavigateToVideos }: HomeViewProps) {
  const { library: youtubeLibrary } = useYoutubeVideos();
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

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-amber-300 border border-amber-400/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Unlock Education Learning Portal
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-tight text-white">
              Explore the Beauty of Mathematics
            </h1>
            <p className="text-sm md:text-base text-slate-200/90 leading-relaxed font-sans max-w-2xl">
              An immersive academic study guide built specifically for Unlock Education students. Master 11 core chapters with beautifully typeset LaTeX formula sheets, interactive practice quizzes, and real-time visualization tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => onSelectChapter(1)}
              className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              Start Studying Syllabus
            </button>
            <button
              onClick={() => onNavigateToVideos()}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-5 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap"
            >
              <PlayCircle className="w-4 h-4 text-amber-300" />
              Video Lessons
            </button>
            <button
              onClick={onNavigateToFormulas}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-5 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all cursor-pointer backdrop-blur-sm whitespace-nowrap"
            >
              <Calculator className="w-4 h-4" />
              Formula Registry
            </button>
          </div>
        </div>
      </motion.div>

      {/* Continue Learning Section (Dynamic) */}
      {lastChapter && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl text-indigo-600 dark:text-indigo-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                Continue Learning
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                Chapter {lastChapter.id}: {lastChapter.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => onSelectChapter(lastChapter.id)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
          >
            <PlayCircle className="w-4 h-4" />
            Resume Chapter
          </button>
        </motion.div>
      )}

      {/* Recent Activity Section */}
      {recentQuizzes.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Recent Activity
            </h2>
            <p className="text-xs text-slate-500 font-medium">Your last {recentQuizzes.length} quiz scores</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentQuizzes.map((quiz, idx) => (
              <div
                key={idx}
                onClick={() => onSelectChapter(quiz.chapterId)}
                className="group bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1 mb-4">
                  <div className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/10 w-fit">
                    MODULE {quiz.chapterId}
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {quiz.chapterTitle}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Score: {quiz.score}/{quiz.total}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    {new Date(quiz.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. Platform Interactive Statistics Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">11</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Core Chapters</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">100+</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">LaTeX Formulas</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">110+</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Quiz Challenges</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl text-violet-600 dark:text-violet-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">10</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Live Visualizers</div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Interactive Section: Quadratic Solver & Feature Highlight */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left column: Feature Spotlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              Portal Highlights
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Why study math with this interactive portal?
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900/40 p-4.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex gap-3 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-950/40 transition">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                i
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Beautiful Math Formula Sheets</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Every mathematical definition and proof is styled using real KaTeX code. You can copy the LaTeX text of any formula for your assignments!
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 p-4.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex gap-3 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-950/40 transition">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                f(x)
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Active Mathematical Visualizers</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Interactive graphs, vector coordinate additions, Argand diagram grids, and conic section plots respond directly to your variables.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 p-4.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex gap-3 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-950/40 transition">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Interactive Assessment Quizzes</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
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
            Unlock Education Learning modules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Click any core chapter card below to jump directly to its textbook, interactive visualizer, formulas, and quizzes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map((ch, idx) => (
            <motion.button
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-2xl text-left hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              {/* Card top elements */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/10">
                    MODULE {ch.id}
                  </span>
                  
                  {/* Subtle index tag or dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-500 transition-colors" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xs md:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                    {ch.title}
                  </h3>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 leading-tight">
                    {ch.tagline.replace(/\$/g, '')}
                  </p>
                </div>
              </div>

              {/* Card bottom footer */}
              <div className="pt-3 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors w-full">
                <span className="uppercase tracking-wide font-medium flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {ch.quiz.length} QUIZ QUESTIONS
                </span>
                <span className="flex items-center gap-1">
                  Learn Module
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 4.5 Latest YouTube Video Lessons (@UnlockEdu25) */}
      {youtubeLibrary.latestUploads.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Youtube className="w-5 h-5 text-[#FF0000]" />
                Video Lessons ({youtubeLibrary.channelHandle})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Auto-synced Grade 12 Mathematics playlists & latest uploads from our YouTube channel.
              </p>
            </div>
            <button
              onClick={() => onNavigateToVideos()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0"
            >
              View All Lessons
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeLibrary.latestUploads.slice(0, 3).map((video) => {
              const matchedPlaylist = video.chapterId
                ? youtubeLibrary.playlists.find((pl) => pl.chapterId === video.chapterId)
                : undefined;
              const targetPlaylistId =
                matchedPlaylist && matchedPlaylist.videos.some((v) => v.id === video.id)
                  ? matchedPlaylist.id
                  : '__latest__';

              return (
                <button
                  key={video.id}
                  onClick={() => onNavigateToVideos(targetPlaylistId, video.id)}
                  className="group bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden text-left hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-slate-950/80 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                    <h3 className="font-display font-bold text-xs md:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                      {video.chapterId ? `Chapter ${video.chapterId}` : youtubeLibrary.channelHandle}
                      {video.published ? ` · ${formatYoutubeDate(video.published)}` : ''}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 5. Community & Updates Section */}
      <motion.div
        variants={itemVariants}
        className="space-y-4 pt-4"
      >
        <div className="space-y-1">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Our Community Updates
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Stay connected with Unlock Education for the latest announcements, updates, and learning tips.
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-3xl p-6 flex justify-center shadow-xs">
          <div className="w-full max-w-[500px] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden">
            {/* Facebook Card Header Cover */}
            <div className="h-24 md:h-28 bg-gradient-to-r from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />
              <div className="absolute left-8 bottom-0 w-32 h-32 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />
            </div>
            
            {/* Facebook Card Content */}
            <div className="px-6 pb-6 pt-3 relative">
              {/* Profile Picture & Title */}
              <div className="flex flex-col items-center -mt-12 md:-mt-14 mb-4">
                <div className="w-20 h-20 md:w-22 md:h-22 bg-white dark:bg-slate-900 rounded-full p-1.5 shadow-md relative z-10 border border-slate-200 dark:border-slate-700">
                  <img src="/logo.png" alt="Unlock Education" className="w-full h-full rounded-full object-contain" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white mt-3">
                  Unlock Education
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">@UnlockEducation25</p>
              </div>
              
              <p className="text-sm text-center text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Join our Facebook community for daily study materials, tips, and live Q&A sessions for Grade 12 students.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://www.facebook.com/UnlockEducation25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-500/20"
                >
                  <Facebook className="w-4 h-4" />
                  Follow Page
                </a>
                <a 
                  href="https://t.me/UnlockEducation25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
