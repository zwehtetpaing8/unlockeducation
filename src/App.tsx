import { useState, useEffect } from 'react';
import { chapters } from './data/chapters';
import ChapterDetails from './components/ChapterDetails';
import FormulaSheet from './components/FormulaSheet';
import HomeView from './components/HomeView';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PastQuestions from './components/PastQuestions';
import PdfLibrary from './components/PdfLibrary';
import VideoLessons from './components/VideoLessons';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calculator, Search, Menu, X, GraduationCap, ChevronRight, Hash, Home, Facebook, Send, Bug, Youtube, Mail, Copy, Check, ExternalLink, ShieldCheck, FileText, Download, PlayCircle } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

type ActiveView = 'home' | 'syllabus' | 'videos' | 'formulas' | 'past-questions' | 'pdfs' | 'analytics';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    const pathname = window.location.pathname;
    if (pathname === '/admin' || pathname === '/admin/') return 'analytics';
    if (pathname === '/pdfs' || pathname.startsWith('/pdfs/')) return 'pdfs';
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') || params.has('dashboard') || params.has('owner') || params.has('secret') || params.has('key')) return 'analytics';
    const view = params.get('view');
    if (params.has('pdf') || view === 'pdfs') return 'pdfs';
    if (view === 'exams') return 'past-questions';
    if (view === 'home' || view === 'syllabus' || view === 'videos' || view === 'formulas' || view === 'past-questions' || view === 'analytics') return view;

    const saved = localStorage.getItem('unlock_edu_activeView');
    return (saved as ActiveView) || 'home';
  });
  const [lastExamsView, setLastExamsView] = useState<'past-questions' | 'pdfs'>(() => {
    const saved = localStorage.getItem('unlock_edu_lastExamsView');
    return saved === 'pdfs' ? 'pdfs' : 'past-questions';
  });
  const [videoNavTarget, setVideoNavTarget] = useState<{ playlistId?: string; videoId?: string }>({});
  const [selectedChapterId, setSelectedChapterId] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const chapter = params.get('chapter');
    if (chapter) return parseInt(chapter, 10);

    const saved = localStorage.getItem('unlock_edu_selectedChapterId');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    const saved = localStorage.getItem('unlock_edu_completedChapters');
    return saved ? JSON.parse(saved) : [];
  });
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isBugModalOpen, setIsBugModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  
  const handleToggleComplete = (id: number, completed: boolean) => {
    setCompletedChapters(prev => {
      let updated;
      if (completed) {
        updated = prev.includes(id) ? prev : [...prev, id];
      } else {
        updated = prev.filter(c => c !== id);
      }
      localStorage.setItem('unlock_edu_completedChapters', JSON.stringify(updated));
      return updated;
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('unlockeducation@icloud.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sync state to URL and localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;
    let targetPath = pathname;
    let changed = false;

    if (activeView === 'pdfs') {
      // Keep clean /pdfs/:id URL if already on one, otherwise keep ?view=pdfs
      if (!pathname.startsWith('/pdfs')) {
        if (params.get('view') !== 'pdfs') {
          params.set('view', 'pdfs');
          changed = true;
        }
      }
      if (params.has('chapter')) {
        params.delete('chapter');
        changed = true;
      }
    } else {
      if (pathname.startsWith('/pdfs')) {
        targetPath = '/';
        changed = true;
      }
      if (params.get('view') !== activeView) {
        params.set('view', activeView);
        changed = true;
      }
      if (activeView === 'syllabus') {
        if (params.get('chapter') !== selectedChapterId.toString()) {
          params.set('chapter', selectedChapterId.toString());
          changed = true;
        }
        if (params.has('pdf')) {
          params.delete('pdf');
          changed = true;
        }
      } else {
        if (params.has('chapter')) {
          params.delete('chapter');
          changed = true;
        }
        if (params.has('pdf')) {
          params.delete('pdf');
          changed = true;
        }
      }
    }

    if (params.has('key')) {
      params.delete('key');
      changed = true;
    }
    if (params.has('secret')) {
      params.delete('secret');
      changed = true;
    }

    if (changed) {
      const qs = params.toString();
      const newUrl = `${targetPath}${qs ? `?${qs}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
    }

    localStorage.setItem('unlock_edu_activeView', activeView);
    localStorage.setItem('unlock_edu_selectedChapterId', selectedChapterId.toString());
    if (activeView === 'past-questions' || activeView === 'pdfs') {
      setLastExamsView(activeView);
      localStorage.setItem('unlock_edu_lastExamsView', activeView);
    }
  }, [activeView, selectedChapterId]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (pathname === '/admin' || pathname === '/admin/' || params.has('admin') || params.has('dashboard') || params.has('owner') || params.has('secret') || params.has('key')) {
        setActiveView('analytics');
      } else if (pathname === '/pdfs' || pathname.startsWith('/pdfs/') || params.has('pdf') || view === 'pdfs') {
        setActiveView('pdfs');
      } else if (view === 'exams') {
        setActiveView('past-questions');
      } else if (view === 'home' || view === 'syllabus' || view === 'videos' || view === 'formulas' || view === 'past-questions' || view === 'analytics') {
        setActiveView(view as ActiveView);
      } else {
        setActiveView('home');
      }
      
      const chapter = params.get('chapter');
      if (chapter) {
        setSelectedChapterId(parseInt(chapter, 10));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatic visitor pageview recording
  useEffect(() => {
    if (activeView !== 'analytics') {
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: window.location.pathname + window.location.search }),
      }).catch(() => {});
    }
  }, [activeView, selectedChapterId]);

  // Scroll main container to top when view or chapter changes
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView, selectedChapterId]);

  // Dismiss drawer or bug modal on Escape key
  useEffect(() => {
    if (!mobileMenuOpen && !isBugModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isBugModalOpen) setIsBugModalOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, isBugModalOpen]);

  // Filter chapters based on search query
  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    ch.tagline.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    ch.id.toString().includes(sidebarSearch)
  );

  const selectedChapter = chapters.find((ch) => ch.id === selectedChapterId) || chapters[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 print:bg-white print:text-black font-sans text-slate-800 dark:text-slate-200 antialiased flex flex-col pb-20 md:pb-0 transition-colors duration-200">
      {/* Top Main Navigation Header */}
      {!isReadingMode && (
      <header className="print:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 md:px-8 h-14 md:h-16 flex items-center justify-between shadow-2xs">
        <button 
          type="button"
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2.5 text-left cursor-pointer group rounded-xl py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 transition-all"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform duration-200 bg-transparent flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Unlock Education Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-sm md:text-base tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              Unlock Education
            </h1>
            <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
              Grade 12 Mathematics
            </p>
          </div>
        </button>

        {/* Desktop Controls (Tabs & Theme Selector) */}
        <div className="hidden md:flex items-center gap-3">
          {/* View selection tabs */}
          <nav aria-label="Primary navigation" className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveView('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                activeView === 'home'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </button>
            <button
              type="button"
              onClick={() => setActiveView('syllabus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                activeView === 'syllabus'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Syllabus
            </button>
            <button
              type="button"
              onClick={() => {
                setVideoNavTarget({});
                setActiveView('videos');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                activeView === 'videos'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Videos
            </button>
            <button
              type="button"
              onClick={() => setActiveView('formulas')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                activeView === 'formulas'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Formulas
            </button>
            <button
              type="button"
              onClick={() => setActiveView(lastExamsView)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                activeView === 'past-questions' || activeView === 'pdfs'
                  ? 'bg-white dark:bg-slate-800 shadow-2xs text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Exams
            </button>
          </nav>

          {activeView === 'syllabus' && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/60 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              title="Open Chapter Menu"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Chapters</span>
            </button>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile menu triggers & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {activeView === 'syllabus' && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-h-[38px] px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl cursor-pointer flex items-center gap-1.5 font-semibold text-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              title="Open Chapter Menu"
            >
              <Menu className="w-4 h-4" />
              <span>Chapters</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>
      )}

      {/* Main Grid Workspace */}
      <div className={`flex-1 flex flex-col w-full mx-auto items-stretch ${isReadingMode ? 'max-w-5xl' : activeView === 'syllabus' ? 'max-w-[1440px]' : 'max-w-7xl'}`}>
        
        {/* Main Content Panel */}
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeView === 'home' ? (
              <motion.div
                key="home-dashboard-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <HomeView 
                  onSelectChapter={(id) => {
                    setSelectedChapterId(id);
                    setActiveView('syllabus');
                  }}
                  onNavigateToFormulas={() => setActiveView('formulas')}
                  onNavigateToVideos={(playlistId, videoId) => {
                    setVideoNavTarget({ playlistId, videoId });
                    setActiveView('videos');
                  }}
                />
              </motion.div>
            ) : activeView === 'syllabus' ? (
              <motion.div
                key={`chapter-${selectedChapterId}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ChapterDetails 
                  chapter={selectedChapter}
                  onNavigateHome={() => setActiveView('home')}
                  onSelectChapter={(id) => {
                    setSelectedChapterId(id);
                    setActiveView('syllabus');
                  }}
                  isCompleted={completedChapters.includes(selectedChapterId)}
                  onToggleComplete={handleToggleComplete}
                  isReadingMode={isReadingMode}
                  onToggleReadingMode={() => setIsReadingMode(!isReadingMode)}
                  onOpenChapterMenu={() => setMobileMenuOpen(true)}
                  onNavigateToVideos={() => {
                    setVideoNavTarget({});
                    setActiveView('videos');
                  }}
                />
              </motion.div>
            ) : activeView === 'videos' ? (
              <motion.div
                key="video-lessons-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <VideoLessons
                  initialPlaylistId={videoNavTarget.playlistId}
                  initialVideoId={videoNavTarget.videoId}
                  onSelectChapter={(id) => {
                    setSelectedChapterId(id);
                    setActiveView('syllabus');
                  }}
                />
              </motion.div>
            ) : activeView === 'analytics' ? (
              <motion.div
                key="analytics-dashboard-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <AnalyticsDashboard
                  onNavigateHome={() => setActiveView('home')}
                />
              </motion.div>
            ) : activeView === 'formulas' ? (
              <motion.div
                key="formula-sheet-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-6 space-y-1">
                  <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight">
                    Unlock Education Formulas
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Master formula registry cheat sheet with copyable LaTeX sources.
                  </p>
                </div>
                <FormulaSheet />
              </motion.div>
            ) : activeView === 'past-questions' || activeView === 'pdfs' ? (
              <motion.div
                key="exams-hub-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-5"
              >
                {/* Unified Exams Hub Sub-Navigation */}
                <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200/70 dark:border-slate-800/70">
                  <div>
                    <h2 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white tracking-tight">
                      Exams & Past Papers
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Interactive past questions and downloadable PDF solution sets.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-xl w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveView('past-questions')}
                      className={`inline-flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-[34px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                        activeView === 'past-questions'
                          ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span>Past Questions</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView('pdfs')}
                      className={`inline-flex items-center justify-center gap-1.5 min-h-[40px] sm:min-h-[34px] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                        activeView === 'pdfs'
                          ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>PDF Files</span>
                    </button>
                  </div>
                </div>

                {activeView === 'past-questions' ? <PastQuestions /> : <PdfLibrary />}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </div>

      {/* Chapter Selector Slide-over Drawer (Desktop & Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950 backdrop-blur-[1px] z-50"
            />
            {/* Slide menu panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Course Syllabus Chapters"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-950 z-50 p-5 shadow-2xl flex flex-col space-y-4 border-r border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    Course Syllabus
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">11 Mathematics Chapters</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                  aria-label="Close chapter menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 pb-1">
                <div className="flex items-center justify-between tabular-nums">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {completedChapters.length} of 11 Completed
                  </p>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{Math.round((completedChapters.length / 11) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedChapters.length / 11) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full"
                  />
                </div>
              </div>

              {/* Quick Finder Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full min-h-[40px] pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
                {sidebarSearch && (
                  <button
                    type="button"
                    onClick={() => setSidebarSearch('')}
                    aria-label="Clear chapter search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Scrolling List */}
              <nav aria-label="Chapter list" className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {filteredChapters.length > 0 ? (
                  filteredChapters.map((ch) => {
                    const isSelected = selectedChapterId === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => {
                          setSelectedChapterId(ch.id);
                          setActiveView('syllabus');
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full min-h-[44px] flex items-start gap-3 p-3 rounded-xl text-left border transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                          isSelected && activeView === 'syllabus'
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold'
                            : 'bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md self-start tabular-nums ${
                          isSelected && activeView === 'syllabus'
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                        }`}>
                          {ch.id}
                        </span>
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="text-xs font-semibold leading-tight flex items-center justify-between gap-2">
                            <span className="truncate">{ch.title}</span>
                            {completedChapters.includes(ch.id) && (
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1">
                            {ch.tagline.replace(/\$/g, '')}
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Hash className="w-5 h-5 mx-auto mb-1 text-slate-300" />
                    <p className="text-[11px] font-medium">No chapters matched</p>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Branding line */}
      <footer className="print:hidden py-6 bg-white dark:bg-slate-950/30 border-t border-slate-200/50 dark:border-slate-800/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-[10px] text-slate-400 font-medium text-center md:text-left">
            © 2026 Unlock Education. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="https://www.facebook.com/UnlockEducation25" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#1877F2] transition-colors flex items-center gap-1.5"
            >
              <Facebook className="w-4 h-4" />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-wide">Facebook</span>
            </a>
            <a 
              href="https://www.youtube.com/@unlockedu25" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#FF0000] transition-colors flex items-center gap-1.5"
            >
              <Youtube className="w-4 h-4" />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-wide">YouTube</span>
            </a>
            <a 
              href="https://t.me/UnlockEducation25" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#229ED9] transition-colors flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-wide">Channel</span>
            </a>
            <button
              type="button"
              onClick={() => setIsBugModalOpen(true)}
              className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5 ml-2 cursor-pointer rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            >
              <Bug className="w-4 h-4" />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-wide">Report Bug</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Bug Report Modal */}
      <AnimatePresence>
        {isBugModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBugModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 cursor-pointer"
            />
            {/* Modal Box */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Report a Bug or Feedback"
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 relative overflow-hidden pointer-events-auto"
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                      <Bug className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        Report a Bug / Feedback
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Help us improve Unlock Education
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Close feedback modal"
                    onClick={() => setIsBugModalOpen(false)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="py-5 space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    သင့်ရဲ့ အကြံပြုချက်တွေနဲ့ အမှားပြင်ဆင်ချက်တွေကို အောက်ပါနည်းလမ်း နှစ်မျိုးဖြင့် တိုက်ရိုက် ပေးပို့နိုင်ပါတယ်။
                  </p>

                  <div className="space-y-3">
                    {/* Telegram Option */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-xl flex items-start gap-3.5 hover:border-indigo-100 dark:hover:border-indigo-950/50 transition-colors">
                      <div className="p-2 bg-[#229ED9]/10 text-[#229ED9] rounded-xl shrink-0 mt-0.5">
                        <Send className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            Telegram Direct Support
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            တိုက်ရိုက်စကားပြောဆိုပြီး ပုံများဖြင့် ပြသရန်
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            @UnlockEdu25
                          </span>
                          <a
                            href="https://t.me/UnlockEdu25"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-[#229ED9] hover:underline flex items-center gap-0.5"
                          >
                            Open Telegram <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Email Option */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-xl flex items-start gap-3.5 hover:border-indigo-100 dark:hover:border-indigo-950/50 transition-colors">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            Official Email Support
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            အသေးစိတ်စာဖြင့် ပေးပို့တင်ပြရန်
                          </p>
                        </div>
                        <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded break-all select-all">
                          unlockeducation@icloud.com
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href="mailto:unlockeducation@icloud.com?subject=Unlock%20Education%20-%20Bug%20Report%20%26%20Feedback"
                            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                          >
                            Send Mail <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                          <button
                            onClick={copyEmail}
                            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-bold">Copied!</span>
                              </>
                              ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Email</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer of modal */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsBugModalOpen(false)}
                    className="min-h-[40px] px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Floating Action Button for Formulas - Removed in favor of bottom nav */}
      <AnimatePresence>
        {false && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('formulas')}
            className="print:hidden md:hidden fixed bottom-24 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center"
            title="Formulas sheet"
          >
            <Calculator className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar - Minimalist Sliding Pill (5 Clean Tabs) */}
      <div className="print:hidden md:hidden fixed bottom-3 inset-x-3 z-50 max-w-[420px] mx-auto" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <nav aria-label="Mobile navigation" className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(15,23,42,0.10)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)] rounded-2xl p-1.5 flex items-center justify-between">
          
          <button
            type="button"
            onClick={() => setActiveView('home')}
            className={`relative z-10 flex flex-col items-center justify-center w-1/5 min-h-[46px] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              activeView === 'home' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {activeView === 'home' && (
              <motion.div layoutId="navPill" className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl -z-10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <Home className="w-[18px] h-[18px] mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Home</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveView('syllabus')}
            className={`relative z-10 flex flex-col items-center justify-center w-1/5 min-h-[46px] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              activeView === 'syllabus' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {activeView === 'syllabus' && (
              <motion.div layoutId="navPill" className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl -z-10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <BookOpen className="w-[18px] h-[18px] mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Learn</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setVideoNavTarget({});
              setActiveView('videos');
            }}
            className={`relative z-10 flex flex-col items-center justify-center w-1/5 min-h-[46px] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              activeView === 'videos' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {activeView === 'videos' && (
              <motion.div layoutId="navPill" className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl -z-10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <PlayCircle className="w-[18px] h-[18px] mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Videos</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveView('formulas')}
            className={`relative z-10 flex flex-col items-center justify-center w-1/5 min-h-[46px] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              activeView === 'formulas' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {activeView === 'formulas' && (
              <motion.div layoutId="navPill" className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl -z-10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <Calculator className="w-[18px] h-[18px] mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Formulas</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveView(lastExamsView)}
            className={`relative z-10 flex flex-col items-center justify-center w-1/5 min-h-[46px] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              activeView === 'past-questions' || activeView === 'pdfs' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {(activeView === 'past-questions' || activeView === 'pdfs') && (
              <motion.div layoutId="navPill" className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl -z-10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
            )}
            <FileText className="w-[18px] h-[18px] mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Exams</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
