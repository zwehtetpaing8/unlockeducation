import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Calendar, 
  Filter, 
  Search, 
  Loader2, 
  AlertCircle,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PastPaper } from '../types';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

/**
 * QuestionBlock Component
 * Renders a single question and its toggleable solution.
 */
const QuestionBlock: React.FC<{ paper: PastPaper; index: number }> = ({ paper, index }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const isCorrect = selectedOption === paper.correct_answer_id;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowSolution(true); // Automatically show solution after answering
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-white border-y sm:border border-slate-100 rounded-none sm:rounded-[2rem] hover:border-blue-200 transition-all shadow-sm flex flex-col relative",
        isOptionsOpen ? "z-30 shadow-xl" : "z-0"
      )}
    >
      {/* Question Header */}
      <div className="p-4 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between bg-white border-b border-slate-50 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20 shrink-0">
            {index + 1}
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm md:text-base truncate">
              Question {index + 1}
            </h3>
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
              {paper.year} · {paper.section.toUpperCase().startsWith('SECTION') ? paper.section.toUpperCase().split(' ').slice(0, 2).join(' ') : `SECTION ${paper.section.toUpperCase()}`} · {paper.question_type} {paper.chapter && ` · CH${paper.chapter.match(/\d+/)?.[0] || ''}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
           <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
             {paper.chapter}
           </span>
           {paper.question_type === 'MCQ' && (
             <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-blue-100 whitespace-nowrap">
               Interactive MCQ
             </span>
           )}
        </div>
      </div>

      {/* Question Content */}
      <div className="px-4 py-8 md:p-10 space-y-8">
        <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-headings:text-slate-900 prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight">
          <div className="markdown-body text-lg font-medium leading-relaxed text-slate-900">
            <ReactMarkdown
               remarkPlugins={[remarkMath]}
               rehypePlugins={[[rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
            >
              {paper.content || ''}
            </ReactMarkdown>
          </div>
        </div>

        {/* MCQ Dropdown Options */}
        {paper.question_type === 'MCQ' && paper.options && (
          <div className="mt-8 space-y-3">
             <label className="text-xs font-bold text-slate-500 px-2 tracking-wide block">
                Your Answer Selection
             </label>
             <div className="relative">
                <button 
                  onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all text-left group cursor-pointer shadow-sm relative z-30",
                    selectedOption 
                      ? (isCorrect 
                          ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 hover:bg-emerald-50" 
                          : "bg-red-50/70 border-red-300 text-red-950 hover:bg-red-50")
                      : "bg-white border-slate-150 text-slate-800 hover:border-blue-300 hover:bg-slate-50/80"
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors shadow-sm",
                      selectedOption 
                        ? (isCorrect ? "bg-emerald-600 text-white" : "bg-red-600 text-white") 
                        : "bg-blue-600 text-white"
                    )}>
                      {selectedOption || '?'}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      {selectedOption ? (
                        <div className="space-y-1">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-wider block",
                            isCorrect ? "text-emerald-600" : "text-red-600"
                          )}>
                            {isCorrect ? 'Correct Option Selected' : 'Incorrect Option Selected (Click to change)'}
                          </span>
                          <div className={cn(
                            "font-bold text-sm md:text-base leading-snug truncate",
                            isCorrect ? "text-emerald-800" : "text-red-800"
                          )}>
                            <ReactMarkdown
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[[rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
                            >
                              {paper.options.find(o => o.id === selectedOption)?.text || ''}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ) : (
                        <span className="font-bold text-sm md:text-base text-slate-700 tracking-tight">
                          Select the correct option...
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={cn("transition-transform duration-300 text-slate-400 group-hover:text-slate-600 shrink-0", isOptionsOpen && "rotate-180")} size={20} />
                </button>

                <AnimatePresence>
                  {isOptionsOpen && (
                    <>
                      {/* Invisible backdrop to close dropdown on click outside */}
                      <div 
                        className="fixed inset-0 z-20 cursor-default" 
                        onClick={() => setIsOptionsOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-30 left-0 right-0 mt-3 bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden max-h-[400px] overflow-y-auto custom-scrollbar"
                      >
                        <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 bg-white z-10">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                            Select an Answer
                          </p>
                          {selectedOption && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOption(null);
                                setIsOptionsOpen(false);
                              }}
                              className="text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              Reset Selection
                            </button>
                          )}
                        </div>
                        <div className="p-2">
                          {paper.options.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const isOptionCorrect = option.id === paper.correct_answer_id;
                            return (
                              <button
                                key={option.id}
                                onClick={() => { handleOptionSelect(option.id); setIsOptionsOpen(false); }}
                                className={cn(
                                  "w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left mb-1 last:mb-0 group cursor-pointer border border-transparent",
                                  isSelected 
                                    ? (isOptionCorrect 
                                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-950" 
                                        : "bg-red-50/70 border-red-200 text-red-950")
                                    : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                                )}
                              >
                                <div className={cn(
                                  "w-10 h-10 rounded-xl border flex items-center justify-center font-black transition-all shrink-0 mt-0.5 shadow-sm",
                                  isSelected
                                    ? (isOptionCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "bg-red-500 border-red-500 text-white")
                                    : "bg-slate-50 border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 group-hover:bg-blue-50/50"
                                )}>
                                  {option.id}
                                </div>
                                <div className="flex-1 font-bold text-sm md:text-base leading-snug pt-2">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[[rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
                                  >
                                    {option.text}
                                  </ReactMarkdown>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
             </div>
          </div>
        )}


        <div className="pt-4 flex flex-col md:flex-row gap-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className={cn(
              "flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]",
              showSolution 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            )}
          >
            {showSolution ? (
              <><EyeOff size={16} /> Hide Solution</>
            ) : (
              <><Eye size={16} /> View Professional Solution</>
            )}
          </button>
          
          {selectedOption && (
            <div className={cn(
              "px-6 py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2",
              isCorrect ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}>
              {isCorrect ? "Correct Choice!" : "Incorrect Choice"}
            </div>
          )}
        </div>

        {/* Solution Content */}
        <AnimatePresence>
          {showSolution && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 border-t border-slate-100 mt-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  <Sparkles size={12} /> Expert Solution
                </div>
                
                <div className="prose prose-emerald max-w-none">
                  <div className="markdown-body text-slate-700 bg-emerald-50/30 p-6 md:p-8 rounded-3xl border border-emerald-100/50">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[[rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
                    >
                      {paper.solution_content || '*Solution not available for this record.*'}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/**
 * PastPapers Component
 * 
 * Data Handling Strategy:
 * 1. State Management: Uses React hooks (useState, useEffect) for local data storage and UI states.
 * 2. Data Fetching: Retrieves past papers from the Supabase 'past_papers' table.
 * 3. Fallback Mechanism: Provides hardcoded mock data if the database is empty or inaccessible.
 * 4. Filtering: Implements client-side filtering by year and section to ensure a snappy user experience.
 */
const PastPapers: React.FC = () => {
  // State for raw data and loading status
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for user preferences/filters
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('Section A Multiple Choice');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Constants for filter options
  const years = ['All', '2026', '2025', '2024', '2023', '2022'];
  const sections = [
    { id: 'Section A Multiple Choice', label: 'Section A' },
    { id: 'B', label: 'Section B' },
    { id: 'C', label: 'Section C' },
    { id: 'D', label: 'Section D' },
    { id: 'Full Paper', label: 'Full Paper' },
    { id: 'All', label: 'All Sections' }
  ];

  // Derive unique chapters from data
  const chapters = useMemo(() => {
    const uniqueChapters = new Set<string>();
    papers.forEach(p => {
      if (p.chapter) uniqueChapters.add(p.chapter);
    });
    return ['All', ...Array.from(uniqueChapters).sort()];
  }, [papers]);

  useEffect(() => {
    fetchPaperData();
  }, []);

  const fetchPaperData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('past_papers')
        .select('*')
        .order('year', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setPapers(data);
      } else {
        // Fallback mock data if API is empty
        setPapers(MOCK_PAPERS);
      }
    } catch (err: any) {
      console.error('Failed to fetch past papers:', err);
      // In development or error state, we still want to show something
      setPapers(MOCK_PAPERS);
      // Only set error if we really have no data
      if (MOCK_PAPERS.length === 0) setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filtered list of papers based on current state.
   * Memoized to prevent expensive re-calculations on every render.
   */
  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const matchesYear = selectedYear === 'All' || paper.year.toString() === selectedYear;
      const matchesChapter = selectedChapter === 'All' || paper.chapter === selectedChapter;
      const matchesSection = selectedSection === 'All' || paper.section === selectedSection;
      const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesChapter && matchesSection && matchesSearch;
    });
  }, [papers, selectedYear, selectedChapter, selectedSection, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* 1. Header & Title Section */}
      <section className="space-y-4 px-4 sm:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100"
        >
          <Clock size={14} /> Comprehensive Archive
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85]"
        >
          Past Papers
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed"
        >
          Access actual exam papers with professional step-by-step solutions. Optimized for the 2024 matriculation standards.
        </motion.p>
      </section>

      {/* 2. Interactive Selectors & Search Container */}
      <section className="space-y-6 px-4 sm:px-0">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Year Selector */}
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm focus-within:border-blue-300 transition-all">
                <div className="flex items-center px-4 py-2 text-xs font-bold text-slate-500 border-r border-slate-50 whitespace-nowrap">
                  <Calendar size={14} className="mr-2 text-blue-500" /> Year
                </div>
                
                <div className="flex-1 md:block">
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none hover:text-blue-600 transition-colors"
                  >
                    {years.map(y => <option key={y} value={y}>{y === 'All' ? 'Every Year' : y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Chapter Selector */}
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm focus-within:border-blue-300 transition-all">
                <div className="flex items-center px-4 py-2 text-xs font-bold text-slate-500 border-r border-slate-50 whitespace-nowrap">
                  <BookOpen size={14} className="mr-2 text-blue-500" /> Chapter
                </div>
                
                <div className="flex-1 md:block min-w-[150px]">
                  <select 
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none hover:text-blue-600 transition-colors"
                  >
                    {chapters.map(c => <option key={c} value={c}>{c === 'All' ? 'All Chapters' : c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Section Selector */}
            <div className="w-full md:w-auto">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm focus-within:border-blue-300 transition-all">
                <div className="flex items-center px-4 py-2 text-xs font-bold text-slate-500 border-r border-slate-50 whitespace-nowrap">
                  <Filter size={14} className="mr-2 text-blue-500" /> Section
                </div>
                
                <div className="flex-1 md:block min-w-[150px]">
                  <select 
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none hover:text-blue-600 transition-colors"
                  >
                    {sections.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar integrated into the row */}
          <div className="w-full md:w-72 lg:w-96 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-blue-600 shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* 3. Main Content Area / Question List */}
      <section className="min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
            >
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Archive...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-red-50 rounded-[3rem] border border-red-100"
            >
              <AlertCircle className="text-red-500" size={48} />
              <div className="space-y-1">
                <h3 className="text-xl font-black text-red-900 uppercase tracking-tight">System Outage</h3>
                <p className="text-red-600/70 font-medium">Unable to connect to the archive service.</p>
              </div>
              <button 
                onClick={fetchPaperData}
                className="px-6 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
              >
                Retry Connection
              </button>
            </motion.div>
          ) : filteredPapers.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200">
                <FileText size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase">No Matches Found</h3>
                <p className="text-slate-500 font-medium max-w-sm">Adjust your filters or try a different search term to find relevant papers.</p>
              </div>
              <button 
                onClick={() => { setSelectedYear('All'); setSelectedSection('All'); setSearchQuery(''); }}
                className="text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-8"
            >
              {filteredPapers.map((paper, idx) => (
                <QuestionBlock key={paper.id} paper={paper} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. Support Card */}
      <footer className="bg-slate-900 rounded-none sm:rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left mx-0 sm:mx-0">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
             <h4 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">Need Offline Access?</h4>
             <p className="text-slate-400 font-medium">Download the full bundle of processed past papers with annotated solutions for offline study.</p>
          </div>
          <button className="shrink-0 flex items-center gap-3 px-8 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl active:scale-95">
            <Download size={20} /> Download Complete Bundle
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </footer>
    </div>
  </div>
  );
};

// Fallback Mock Data with Realistic Questions/Solutions
const MOCK_PAPERS: PastPaper[] = [
  {
    id: '2026A_Q01',
    year: 2026,
    subject: 'General Mathematics',
    grade_level: 12,
    title: 'Complex Numbers - Division',
    pdf_url: '#',
    answer_pdf_url: null,
    section: 'Section A Multiple Choice',
    chapter: 'Chapter 1: Complex Numbers',
    question_type: 'MCQ',
    content: 'If $z_1=6-17i$, $z_2=3-bi$ and $\\frac{z_1}{z_2}= 4-3i$, then $b$ is:',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' }
    ],
    correct_answer_id: 'B',
    solution_content: 'Given: \n $z_1 = 6 - 17i$ \n $z_2 = 3 - bi$ \n $\\frac{z_1}{z_2} = 4 - 3i$ \n\n We can write the relationship as: \n $z_1 = z_2(4 - 3i)$ \n\n Substitute the values: \n $6 - 17i = (3 - bi)(4 - 3i)$ \n\n Expand the right side: \n $$ \\begin{aligned} 6 - 17i &= 3(4) - 3(3i) - (bi)(4) + (bi)(3i) \\\\ 6 - 17i &= 12 - 9i - 4bi + 3bi^2 \\\\ 6 - 17i &= 12 - 9i - 4bi - 3b \\\\ 6 - 17i &= (12 - 3b) + (-9 - 4b)i \\end{aligned} $$ \n\n Equating the real parts: \n $$ \\begin{aligned} 6 &= 12 - 3b \\\\ 3b &= 6 \\\\ b &= 2 \\end{aligned} $$ \n\n (Equating imaginary parts for verification: $-17 = -9 - 4b \\implies 4b = 8 \\implies b = 2$) \n\n Therefore, the value of $b$ is **2**. \n\n Correct Option: **(B)**'
  }
];

export default PastPapers;


