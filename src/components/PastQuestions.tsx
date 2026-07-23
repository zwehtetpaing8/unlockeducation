import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle,
  Filter,
  Check,
  RefreshCw,
  Award
} from 'lucide-react';
import Latex from './Latex';
import { pastQuestions, PastQuestion } from '../data/pastQuestions';

export default function PastQuestions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSection, setSelectedSection] = useState<'A' | 'B' | 'all'>('all');
  
  // Track selected options for quiz mode: { [questionId]: optionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Track revealed solutions: { [questionId]: boolean }
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const years = Array.from(new Set(pastQuestions.map(q => q.year))).sort((a, b) => b - a);

  const filteredQuestions = pastQuestions.filter(q => {
    const matchesSearch = 
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.year.toString().includes(searchQuery);
    
    const matchesYear = selectedYear === 'all' || q.year === selectedYear;
    const matchesSection = selectedSection === 'all' || q.section === selectedSection;

    return matchesSearch && matchesYear && matchesSection;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    // Auto reveal solution when answered
    setRevealedSolutions(prev => ({ ...prev, [questionId]: true }));
  };

  const toggleSolution = (questionId: string) => {
    setRevealedSolutions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setRevealedSolutions({});
  };

  // Calculate score for answered questions
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = pastQuestions.find(item => item.id === qId);
    if (q && q.correctAnswerIndex === ansIdx) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-medium border border-indigo-400/20">
              <Award className="w-3.5 h-3.5" /> Official Exam Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
              Board Exam Past Questions
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Solve actual exam questions from <strong>2025</strong> and <strong>2026</strong>. Test your knowledge with instant option verification and full step-by-step mathematical solutions.
            </p>
          </div>

          {answeredCount > 0 && (
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 min-w-[200px]">
              <div className="p-3 bg-indigo-500/30 rounded-xl text-indigo-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-indigo-200 font-medium">Practice Progress</p>
                <p className="text-xl font-bold font-mono text-white">
                  {correctCount} / {answeredCount} <span className="text-xs text-indigo-300 font-normal">Correct</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions, formulas, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Reset button if answers submitted */}
          {answeredCount > 0 && (
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Quiz
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5" /> FILTER BY:
          </span>

          {/* Year Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedYear === 'all'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Years
            </button>
            {years.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedYear === yr
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Section Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSection === 'all'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All Sections
            </button>
            <button
              onClick={() => setSelectedSection('A')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSection === 'A'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Section A (MCQ)
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const selectedOpt = userAnswers[q.id];
            const isCorrect = isAnswered && selectedOpt === q.correctAnswerIndex;
            const isSolutionOpen = revealedSolutions[q.id] || false;

            return (
              <div 
                key={q.id} 
                className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-all space-y-4"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/40">
                      Question {q.questionNumber}
                    </span>
                    <span className="text-[11px] font-mono font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 px-2.5 py-1 rounded-md border border-amber-100 dark:border-amber-900/40">
                      {q.year} Exam
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      Section {q.section}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Chapter 1: {q.chapterTitle}
                  </span>
                </div>

                {/* Question Text */}
                <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
                  <Latex text={q.questionText} />
                </div>

                {/* Options List for Section A (MCQs) */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((optionText, optIdx) => {
                      const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
                      const isSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correctAnswerIndex === optIdx;

                      let btnStyle = "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700";

                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500/20";
                        } else if (isSelected && !isThisCorrect) {
                          btnStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 font-semibold";
                        } else {
                          btnStyle = "bg-slate-50 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-xs sm:text-sm ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-mono font-bold shrink-0 ${
                            isAnswered && isThisCorrect 
                              ? 'bg-emerald-500 text-white'
                              : isAnswered && isSelected && !isThisCorrect
                              ? 'bg-rose-500 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                          }`}>
                            {optionLabel}
                          </span>
                          <span className="flex-1">
                            <Latex text={optionText} />
                          </span>

                          {isAnswered && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Solution Toggle / Explanation Footer */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isSolutionOpen ? 'Hide Step-by-Step Solution' : 'View Step-by-Step Solution'}
                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isAnswered && (
                    <span className={`text-xs font-mono font-medium flex items-center gap-1 ${
                      isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct Answer!' : `Correct Option: ${String.fromCharCode(65 + (q.correctAnswerIndex ?? 0))}`}
                    </span>
                  )}
                </div>

                {/* Expanded Solution Box */}
                {isSolutionOpen && (
                  <div className="mt-3 p-4 sm:p-5 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      Solution & Working:
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                      <Latex text={q.solution} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No questions match your filter criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the search query or selecting "All Years".</p>
          </div>
        )}
      </div>
    </div>
  );
}
