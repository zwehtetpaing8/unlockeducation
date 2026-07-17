import { useState, useEffect } from 'react';
import { chapters } from './data/chapters';
import ChapterDetails from './components/ChapterDetails';
import FormulaSheet from './components/FormulaSheet';
import HomeView from './components/HomeView';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calculator, Search, Menu, X, GraduationCap, ChevronRight, Hash, Home, Facebook, Send, Bug, Youtube, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'syllabus' | 'formulas'>(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'home' || view === 'syllabus' || view === 'formulas') return view;

    const saved = localStorage.getItem('unlock_edu_activeView');
    return (saved as 'home' | 'syllabus' | 'formulas') || 'home';
  });
  const [selectedChapterId, setSelectedChapterId] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const chapter = params.get('chapter');
    if (chapter) return parseInt(chapter, 10);

    const saved = localStorage.getItem('unlock_edu_selectedChapterId');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isBugModalOpen, setIsBugModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('unlockeducation@icloud.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sync state to URL and localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let changed = false;

    if (params.get('view') !== activeView) {
      params.set('view', activeView);
      changed = true;
    }
    
    if (activeView === 'syllabus') {
      if (params.get('chapter') !== selectedChapterId.toString()) {
        params.set('chapter', selectedChapterId.toString());
        changed = true;
      }
    } else {
      if (params.has('chapter')) {
        params.delete('chapter');
        changed = true;
      }
    }

    if (changed) {
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.pushState({}, '', newUrl);
    }

    localStorage.setItem('unlock_edu_activeView', activeView);
    localStorage.setItem('unlock_edu_selectedChapterId', selectedChapterId.toString());
  }, [activeView, selectedChapterId]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      if (view === 'home' || view === 'syllabus' || view === 'formulas') {
        setActiveView(view as 'home' | 'syllabus' | 'formulas');
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

  // Scroll main container to top when view changes
  useEffect(() => {
    if (activeView === 'home' || activeView === 'formulas') {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: 'instant' });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeView]);

  // Scroll to selected chapter when entering syllabus view from another view
  useEffect(() => {
    if (activeView === 'syllabus') {
      setTimeout(() => {
        const el = document.getElementById(`chapter-section-${selectedChapterId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }, 50);
    }
  }, [activeView]);

  // Filter chapters based on search query
  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    ch.tagline.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    ch.id.toString().includes(sidebarSearch)
  );

  // Scroll spy for chapters
  useEffect(() => {
    if (activeView !== 'syllabus') return;

    const observer = new IntersectionObserver((entries) => {
      let visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const topEntry = visibleEntries.reduce((prev, current) => {
          return (prev.boundingClientRect.top < current.boundingClientRect.top) ? prev : current;
        });
        const idStr = topEntry.target.id.replace('chapter-section-', '');
        const id = parseInt(idStr, 10);
        if (!isNaN(id)) {
          setSelectedChapterId(id);
        }
      }
    }, {
      root: document.querySelector('main'),
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    });

    // Give DOM time to update before observing
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('[id^="chapter-section-"]');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [activeView, filteredChapters]);

  const selectedChapter = chapters.find((ch) => ch.id === selectedChapterId) || chapters[0];

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 antialiased flex flex-col">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <button 
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 text-left cursor-pointer group focus:outline-none transition-all"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 bg-transparent flex items-center justify-center">
            <img src="/logo.png" alt="Unlock Education Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm md:text-base tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Unlock Education
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              ACADEMIC STUDY PORTAL
            </p>
          </div>
        </button>

        {/* Desktop Controls (Tabs & Theme Selector) */}
        <div className="hidden md:flex items-center gap-4">
          {/* View selection tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
            <button
              onClick={() => setActiveView('home')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeView === 'home'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </button>
            <button
              onClick={() => setActiveView('syllabus')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeView === 'syllabus'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Syllabus Modules
            </button>
            <button
              onClick={() => setActiveView('formulas')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeView === 'formulas'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Formulas
            </button>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile menu triggers & Theme Toggle */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setActiveView('home')}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              activeView === 'home'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
            title="Home dashboard"
          >
            <Home className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveView('syllabus')}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              activeView === 'syllabus'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
            title="Syllabus chapters"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          {activeView === 'syllabus' && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-lg cursor-pointer"
              title="Open Chapter Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto items-stretch">
        
        {/* Left Side Navigation bar (always visible on desktop when viewing syllabus) */}
        {activeView === 'syllabus' && (
          <aside className="hidden md:flex flex-col w-72 shrink-0 border-r border-slate-200/50 dark:border-slate-800/40 p-5 bg-white dark:bg-slate-950/20 overflow-y-auto max-h-[calc(100vh-64px)] space-y-4">
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Course syllabus
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                11 Core Learning Chapters
              </p>
            </div>

            {/* Chapter Quick Finder search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search chapters..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Chapters scrolling selection list */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
              {filteredChapters.length > 0 ? (
                filteredChapters.map((ch) => {
                  const isSelected = selectedChapterId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        setActiveView('syllabus');
                        const el = document.getElementById(`chapter-section-${ch.id}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all group cursor-pointer ${
                        isSelected && activeView === 'syllabus'
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'hover:bg-slate-100/60 dark:hover:bg-slate-900 border border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md self-start ${
                        isSelected && activeView === 'syllabus'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                      }`}>
                        {ch.id}
                      </span>
                      <div className="flex-1 space-y-0.5">
                        <div className="text-xs font-semibold leading-tight tracking-tight">
                          {ch.title}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 group-hover:text-slate-500 dark:group-hover:text-slate-400">
                          {ch.tagline.replace(/\$/g, '')}
                        </div>
                      </div>
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
          </aside>
        )}

        {/* Right Main Content Panel */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-[calc(100vh-64px)]">
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
                />
              </motion.div>
            ) : activeView === 'syllabus' ? (
              <motion.div
                key="syllabus-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-16 pb-24"
              >
                {filteredChapters.map(chapter => (
                  <div key={chapter.id} id={`chapter-section-${chapter.id}`} className="scroll-mt-8">
                    <ChapterDetails 
                      chapter={chapter} 
                      onNavigateHome={() => setActiveView('home')}
                      onSelectChapter={(id) => {
                        setSelectedChapterId(id);
                        const el = document.getElementById(`chapter-section-${id}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            ) : (
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
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Chapter Selector Slide-over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            {/* Slide menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-950 z-50 p-5 shadow-2xl flex flex-col space-y-4 md:hidden border-l border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    Syllabus Chapters
                  </h3>
                  <p className="text-[10px] text-slate-400">11 Mathematics Chapters</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Quick Finder Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find math chapters..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                />
              </div>

              {/* Scrolling List */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {filteredChapters.map((ch) => {
                  const isSelected = selectedChapterId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setSelectedChapterId(ch.id);
                        setActiveView('syllabus');
                        setMobileMenuOpen(false);
                        const el = document.getElementById(`chapter-section-${ch.id}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left border transition-all ${
                        isSelected && activeView === 'syllabus'
                          ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'bg-white dark:bg-transparent border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isSelected && activeView === 'syllabus'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          {ch.id}
                        </span>
                        <span className="text-xs font-semibold">{ch.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Branding line */}
      <footer className="py-6 bg-white dark:bg-slate-950/30 border-t border-slate-200/50 dark:border-slate-800/40">
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
              onClick={() => setIsBugModalOpen(true)}
              className="text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5 ml-2 cursor-pointer focus:outline-none"
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
                    onClick={() => setIsBugModalOpen(false)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition cursor-pointer"
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
                    onClick={() => setIsBugModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Floating Action Button for Formulas */}
      <AnimatePresence>
        {activeView !== 'formulas' && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('formulas')}
            className="md:hidden fixed bottom-24 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center"
            title="Formulas sheet"
          >
            <Calculator className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
