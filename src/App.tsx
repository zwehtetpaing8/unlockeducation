import { useState } from 'react';
import { chapters } from './data/chapters';
import ChapterDetails from './components/ChapterDetails';
import FormulaSheet from './components/FormulaSheet';
import HomeView from './components/HomeView';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calculator, Search, Menu, X, GraduationCap, ChevronRight, Hash, Home } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'syllabus' | 'formulas'>('home');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Filter chapters based on search query
  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    ch.tagline.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    ch.id.toString().includes(sidebarSearch)
  );

  const selectedChapter = chapters.find((ch) => ch.id === selectedChapterId) || chapters[0];

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 antialiased flex flex-col">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <button 
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 text-left cursor-pointer group focus:outline-none transition-all"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-xl text-white shadow-md shadow-indigo-500/15 group-hover:scale-105 transition-transform duration-200">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm md:text-base tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Grade 12 Mathematics
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
          <button
            onClick={() => setActiveView('formulas')}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              activeView === 'formulas'
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
            title="Formulas sheet"
          >
            <Calculator className="w-4 h-4" />
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
                key={`chapter-${selectedChapterId}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ChapterDetails chapter={selectedChapter} />
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
                    Grade 12 Mathematics Formulas
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
      <footer className="py-5 bg-white dark:bg-slate-950/30 border-t border-slate-200/50 dark:border-slate-800/40 text-center text-[10px] text-slate-400 font-medium">
        © 2026 Grade 12 Mathematics Learning Portal. Designed and organized in English.
      </footer>
    </div>
  );
}
