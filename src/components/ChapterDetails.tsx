import { useState, useEffect } from 'react';
import { Chapter } from '../types';
import Latex from './Latex';
import Visualizer from './Visualizers';
import PracticeQuiz from './PracticeQuiz';
import { 
  BookOpen, 
  Award, 
  Compass, 
  Calculator, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  List,
  Check
} from 'lucide-react';

interface ChapterDetailsProps {
  chapter: Chapter;
}

interface ContentSection {
  title: string;
  content: string;
}

function parseMarkdownSections(markdown: string): ContentSection[] {
  const lines = markdown.split('\n');
  const sections: ContentSection[] = [];
  let currentTitle = 'Introduction';
  let currentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(###|##)\s+(.+)$/);
    if (match) {
      if (currentLines.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentLines.join('\n').trim(),
        });
        currentLines = [];
      }
      currentTitle = match[2].replace(/\*/g, '').trim();
    } else {
      if (line.trim() === '---' && currentLines.length === 0) {
        continue;
      }
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0 || sections.length === 0) {
    sections.push({
      title: currentTitle,
      content: currentLines.join('\n').trim(),
    });
  }

  return sections;
}

export default function ChapterDetails({ chapter }: ChapterDetailsProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'formulas' | 'visualizer' | 'quiz'>('study');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [isMobileOutlineOpen, setIsMobileOutlineOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'sections' | 'full'>('sections');

  // Reset active section and tab whenever the chapter selection changes
  useEffect(() => {
    setActiveSectionIndex(0);
    setActiveTab('study');
    setIsMobileOutlineOpen(false);
    setViewMode('sections');
  }, [chapter.id]);

  const handleSectionClick = (idx: number) => {
    setActiveSectionIndex(idx);
    if (viewMode === 'full') {
      const element = document.getElementById(`section-${idx}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const sections = parseMarkdownSections(chapter.content);
  const activeSection = sections[activeSectionIndex] || sections[0];

  return (
    <div className="space-y-6">
      {/* Chapter Overview Hero Header card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-800">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-6 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 transform -translate-x-12 translate-y-6 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative space-y-3 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 font-bold">
              Chapter {chapter.id}
            </span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Grade 12 Math Syllabus
            </span>
          </div>

          <h2 className="font-display font-bold text-xl md:text-3xl text-slate-100 tracking-tight leading-tight">
            {chapter.title}
          </h2>

          <div className="text-xs md:text-sm text-slate-300/95 max-w-2xl leading-relaxed italic">
            <Latex text={chapter.tagline} />
          </div>
        </div>
      </div>

      {/* Chapter Navigation Tabs menu */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'study'
              ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Core Concepts</span>
        </button>

        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'formulas'
              ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Formulas ({chapter.formulas.length})</span>
        </button>

        {chapter.visualizerType && (
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Interactive Tool</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Quiz Exercises ({chapter.quiz.length})</span>
        </button>
      </div>

      {/* Dynamic Tab Panes Content viewport */}
      <div className="space-y-4">
        {activeTab === 'study' && (
          <div className="space-y-4">
            {/* View Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/30">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Reading Preference</h4>
                <p className="text-[10px] text-slate-400 font-medium">Switch between section-by-section or scrollable full-chapter view.</p>
              </div>
              <div className="flex p-0.5 bg-slate-200/60 dark:bg-slate-950/60 rounded-xl border border-slate-200/30 dark:border-slate-800/10 shrink-0">
                <button
                  onClick={() => setViewMode('sections')}
                  className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    viewMode === 'sections'
                      ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  Sections
                </button>
                <button
                  onClick={() => setViewMode('full')}
                  className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    viewMode === 'full'
                      ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Full Chapter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Desktop Side Table of Contents Outline */}
              <div className="lg:col-span-4 hidden lg:flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  {viewMode === 'full' ? 'Jump to Section' : `Sections outline (${sections.length})`}
                </h3>
                <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                  {sections.map((section, idx) => {
                    const isActive = idx === activeSectionIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSectionClick(idx)}
                        className={`w-full text-left p-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            isActive 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="leading-tight flex-1">
                            <Latex text={section.title} />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Navigation Outlines (Horizontal Quick Tabs + Custom Dropdown) */}
              <div className="lg:hidden w-full space-y-4">
                {/* 1. Horizontal swipeable quick section bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {viewMode === 'full' ? 'Jump to section' : `Syllabus Outline (${sections.length})`}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      Swipe left/right
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">
                    {sections.map((sec, idx) => {
                      const isActive = idx === activeSectionIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            handleSectionClick(idx);
                            setIsMobileOutlineOpen(false);
                          }}
                          className={`snap-start shrink-0 text-left p-3 rounded-2xl border transition-all cursor-pointer min-w-[130px] max-w-[180px] flex flex-col justify-between h-20 ${
                            isActive
                              ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md self-start ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}>
                            Section {idx + 1}
                          </span>
                          <span className="text-[10px] font-semibold line-clamp-2 leading-tight mt-1">
                            {sec.title.replace(/\$/g, '')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Beautiful Custom Expandable Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMobileOutlineOpen(!isMobileOutlineOpen)}
                    className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <List className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="text-left font-semibold truncate">
                        Section {activeSectionIndex + 1}: {activeSection.title.replace(/\$/g, '')}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isMobileOutlineOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMobileOutlineOpen && (
                    <>
                      {/* Background Overlay to close dropdown on click outside */}
                      <div 
                        className="fixed inset-0 z-20 bg-transparent"
                        onClick={() => setIsMobileOutlineOpen(false)}
                      />
                      <div className="absolute left-0 right-0 mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-xl z-30 max-h-[280px] overflow-y-auto space-y-1 divide-y divide-slate-50 dark:divide-slate-800/40">
                        {sections.map((sec, idx) => {
                          const isActive = idx === activeSectionIndex;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                handleSectionClick(idx);
                                setIsMobileOutlineOpen(false);
                              }}
                              className={`w-full text-left p-2.5 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                                isActive
                                  ? 'bg-indigo-50/80 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 font-bold'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                                  isActive 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                }`}>
                                  {idx + 1}
                                </span>
                                <span className="truncate">
                                  {sec.title.replace(/\$/g, '')}
                                </span>
                              </div>
                              {isActive && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Main Content card */}
              <div className="lg:col-span-8 space-y-4">
                {viewMode === 'full' ? (
                  <div className="space-y-6">
                    {sections.map((section, idx) => (
                      <div 
                        key={idx} 
                        id={`section-${idx}`}
                        className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6 scroll-mt-20"
                      >
                        {/* Section Title */}
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mb-1">
                            Section {idx + 1} of {sections.length}
                          </div>
                          <h3 className="font-display font-bold text-base md:text-xl text-slate-900 dark:text-white leading-tight">
                            <Latex text={section.title} />
                          </h3>
                        </div>

                        {/* Section Content */}
                        <div className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm">
                          <Latex text={section.content} />
                        </div>
                      </div>
                    ))}
                    
                    {/* Full Reading End Action cards */}
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">You've completed Chapter {chapter.id}!</h4>
                        <p className="text-xs text-slate-400 font-medium">Ready to test your math and formula understanding?</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setActiveTab('formulas')}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer shadow-sm"
                        >
                          <Calculator className="w-4 h-4" />
                          Formulas
                        </button>
                        <button
                          onClick={() => setActiveTab('quiz')}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
                        >
                          <Award className="w-4 h-4" />
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6">
                    {/* Active Section title */}
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mb-1">
                        Section {activeSectionIndex + 1} of {sections.length}
                      </div>
                      <h3 className="font-display font-bold text-base md:text-xl text-slate-900 dark:text-white leading-tight">
                        <Latex text={activeSection.title} />
                      </h3>
                    </div>

                    {/* Section Content with LaTeX */}
                    <div className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm">
                      <Latex text={activeSection.content} />
                    </div>

                    {/* Section navigation footer */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        disabled={activeSectionIndex === 0}
                        onClick={() => setActiveSectionIndex(prev => prev - 1)}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          activeSectionIndex === 0
                            ? 'opacity-40 cursor-not-allowed border-slate-100 text-slate-400 dark:border-slate-800'
                            : 'bg-white hover:bg-slate-50 border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous Section
                      </button>

                      {activeSectionIndex < sections.length - 1 ? (
                        <button
                          onClick={() => setActiveSectionIndex(prev => prev + 1)}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow"
                        >
                          Next Section
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => setActiveTab('formulas')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          >
                            <Calculator className="w-4 h-4" />
                            View Formulas
                          </button>
                          <button
                            onClick={() => setActiveTab('quiz')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                          >
                            <Award className="w-4 h-4" />
                            Start Quiz Practice
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formulas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.formulas.map((f) => (
              <div
                key={f.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm">
                    {f.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <Latex text={f.description} />
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-center overflow-x-auto min-h-[50px]">
                  <Latex text={`$$${f.latex}$$`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'visualizer' && chapter.visualizerType && (
          <Visualizer type={chapter.visualizerType} />
        )}

        {activeTab === 'quiz' && (
          <PracticeQuiz questions={chapter.quiz} chapterTitle={chapter.title} />
        )}
      </div>
    </div>
  );
}
