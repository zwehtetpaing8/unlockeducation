import { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
  Play,
  Eye,
  CheckCheck,
} from 'lucide-react';
import Latex from './Latex';
import {
  pastQuestions,
  PastQuestion,
  SECTION_META,
  getQuestionYears,
} from '../data/pastQuestions';
import { ch2SectionC2024Solutions } from '../data/ch2SectionC2024Solutions';
import { ch2SectionC2025Solutions } from '../data/ch2SectionC2025Solutions';
import { ch2SectionC2026Solutions } from '../data/ch2SectionC2026Solutions';
import WhiteboardModal, {
  parseMarkdownToWhiteboardSteps,
  WhiteboardStep,
  WhiteboardQuestionTab,
} from './WhiteboardModal';

type SectionKey = 'A' | 'B' | 'C' | 'D';
type DisplayMode = 'questions-only' | 'practice';

const SECTION_ORDER: SectionKey[] = ['A', 'B', 'C', 'D'];
const ch2SectionCSolutions = [
  ...ch2SectionC2024Solutions,
  ...ch2SectionC2025Solutions,
  ...ch2SectionC2026Solutions,
];

interface ActiveWhiteboard {
  groupQuestions: PastQuestion[];
  currentIndex: number;
  initialVisibleCount: number;
  initialPlaying: boolean;
}

function getAnimatedProof(q: PastQuestion) {
  if (q.chapterId === 2 && q.animatedProofNumber) {
    return ch2SectionCSolutions.find((p) => p.number === q.animatedProofNumber) || null;
  }
  return null;
}

function hasWorkedSolution(q: PastQuestion): boolean {
  return Boolean(q.solution || getAnimatedProof(q));
}

function getWhiteboardStepsForQuestion(q: PastQuestion): WhiteboardStep[] {
  const animatedProof = getAnimatedProof(q);
  if (animatedProof) {
    return animatedProof.lines.map((line) => ({
      id: line.id,
      kind: line.kind,
      content: line.content,
      indent: line.indent,
    }));
  }
  if (q.solution) {
    return parseMarkdownToWhiteboardSteps(q.solution);
  }
  return [];
}

export default function PastQuestions() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('questions-only');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSection, setSelectedSection] = useState<SectionKey | 'all'>('all');

  // Track selected options for MCQ practice mode: { [questionId]: optionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Track inline expanded solutions: { [questionId]: boolean }
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  // Active full-screen Classroom Whiteboard modal
  const [whiteboard, setWhiteboard] = useState<ActiveWhiteboard | null>(null);

  // Base pool depends on mode: Questions Only = all 128 questions; With Solutions = verified worked solutions
  const modePool = useMemo(() => {
    if (displayMode === 'practice') {
      return pastQuestions.filter(hasWorkedSolution);
    }
    return pastQuestions;
  }, [displayMode]);

  const totalSolvedCount = useMemo(
    () => pastQuestions.filter(hasWorkedSolution).length,
    []
  );

  const availableChapters = useMemo(() => {
    const map = new Map<number, { id: number; title: string; count: number }>();
    for (const q of pastQuestions) {
      if (!map.has(q.chapterId)) {
        map.set(q.chapterId, { id: q.chapterId, title: q.chapterTitle, count: 0 });
      }
    }
    for (const q of modePool) {
      const entry = map.get(q.chapterId);
      if (entry) entry.count += 1;
    }
    return Array.from(map.values()).sort((a, b) => a.id - b.id);
  }, [modePool]);

  const availableYears = useMemo(() => {
    const set = new Set<number>();
    for (const q of pastQuestions) {
      for (const y of getQuestionYears(q)) set.add(y);
    }
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  // Section counts scoped to active modePool + selected Chapter + Year
  const sectionCounts = useMemo(() => {
    const counts: Record<SectionKey, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const q of modePool) {
      if (selectedChapter !== 'all' && q.chapterId !== selectedChapter) continue;
      if (selectedYear !== 'all' && !getQuestionYears(q).includes(selectedYear)) continue;
      counts[q.section] += 1;
    }
    return counts;
  }, [modePool, selectedChapter, selectedYear]);

  const matchesCurrentFilters = (q: PastQuestion) => {
    if (selectedChapter !== 'all' && q.chapterId !== selectedChapter) return false;
    const qYears = getQuestionYears(q);
    if (selectedYear !== 'all' && !qYears.includes(selectedYear)) return false;
    if (selectedSection !== 'all' && q.section !== selectedSection) return false;
    const qLower = searchQuery.trim().toLowerCase();
    if (qLower) {
      const hay = `${q.questionText} ${q.chapterTitle} chapter ${q.chapterId} section ${q.section} ${qYears.join(' ')}`.toLowerCase();
      if (!hay.includes(qLower)) return false;
    }
    return true;
  };

  const filteredQuestions = useMemo(
    () => modePool.filter(matchesCurrentFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modePool, searchQuery, selectedChapter, selectedYear, selectedSection]
  );

  // Count matching questions in Questions-Only mode (useful when With Solutions has 0 for an unsolved section)
  const matchingQuestionsOnlyCount = useMemo(() => {
    if (displayMode !== 'practice' || filteredQuestions.length > 0) return 0;
    return pastQuestions.filter(matchesCurrentFilters).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMode, filteredQuestions.length, searchQuery, selectedChapter, selectedYear, selectedSection]);

  // Group filtered questions cleanly by Chapter -> Section
  const groupedSections = useMemo(() => {
    const groups: Array<{
      key: string;
      chapterId: number;
      chapterTitle: string;
      section: SectionKey;
      questions: PastQuestion[];
    }> = [];

    const map = new Map<string, (typeof groups)[number]>();
    for (const q of filteredQuestions) {
      const key = `${q.chapterId}-${q.section}`;
      let group = map.get(key);
      if (!group) {
        group = {
          key,
          chapterId: q.chapterId,
          chapterTitle: q.chapterTitle,
          section: q.section,
          questions: [],
        };
        map.set(key, group);
        groups.push(group);
      }
      group.questions.push(q);
    }

    groups.sort((a, b) => {
      if (a.chapterId !== b.chapterId) return a.chapterId - b.chapterId;
      return SECTION_ORDER.indexOf(a.section) - SECTION_ORDER.indexOf(b.section);
    });

    for (const g of groups) {
      g.questions.sort((a, b) => a.questionNumber - b.questionNumber);
    }

    return groups;
  }, [filteredQuestions]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleSolution = (questionId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setRevealedSolutions({});
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedChapter('all');
    setSelectedYear('all');
    setSelectedSection('all');
  };

  const launchWhiteboard = (
    groupQuestions: PastQuestion[],
    questionId: string,
    mode: 'step' | 'play' | 'all'
  ) => {
    const solvedInGroup = groupQuestions.filter(hasWorkedSolution);
    const idx = Math.max(0, solvedInGroup.findIndex((q) => q.id === questionId));
    const target = solvedInGroup[idx];
    if (!target) return;

    const totalSteps = getWhiteboardStepsForQuestion(target).length;
    setWhiteboard({
      groupQuestions: solvedInGroup,
      currentIndex: idx,
      initialVisibleCount: mode === 'all' ? Math.max(totalSteps, 1) : 1,
      initialPlaying: mode === 'play',
    });
  };

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = pastQuestions.find((item) => item.id === qId);
    if (q && q.correctAnswerIndex === ansIdx) return acc + 1;
    return acc;
  }, 0);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedChapter !== 'all' ||
    selectedYear !== 'all' ||
    selectedSection !== 'all';

  // Active Whiteboard derived props
  const activeWbQuestion =
    whiteboard ? whiteboard.groupQuestions[whiteboard.currentIndex] || null : null;
  const activeWbSteps = activeWbQuestion
    ? getWhiteboardStepsForQuestion(activeWbQuestion)
    : [];
  const activeWbTabs: WhiteboardQuestionTab[] | undefined =
    whiteboard && whiteboard.groupQuestions.length > 1
      ? whiteboard.groupQuestions.map((q, idx) => ({
          label: `Q${q.questionNumber}`,
          active: idx === whiteboard.currentIndex,
          onSelect: () =>
            setWhiteboard((prev) =>
              prev
                ? {
                    ...prev,
                    currentIndex: idx,
                    initialVisibleCount: 1,
                    initialPlaying: false,
                  }
                : null
            ),
        }))
      : undefined;

  return (
    <div className="space-y-5">
      {/* Control Panel: Mode Switcher + Search + Chapter / Section / Year Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Row 1: Display Mode Switcher & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <div className="text-sm font-display font-bold text-slate-900 dark:text-white">
              Board Exam Past Papers (2024 – 2026)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              Showing{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {filteredQuestions.length}
              </span>{' '}
              of {modePool.length}{' '}
              {displayMode === 'practice' ? 'worked solutions' : 'questions'}
              {displayMode === 'practice' && answeredCount > 0 && (
                <span>
                  {' '}· MCQ Score:{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {correctCount}/{answeredCount}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Questions Only vs With Solutions Mode Switcher */}
          <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 rounded-xl w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setDisplayMode('questions-only')}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                displayMode === 'questions-only'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>Questions Only ({pastQuestions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('practice')}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                displayMode === 'practice'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>With Solutions ({totalSolvedCount})</span>
            </button>
          </div>
        </div>

        {/* Row 2: Search Bar + Reset */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions, formulas, chapter, or year (e.g. divisible, trigonometric, 2026)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition-all"
            />
          </div>

          {displayMode === 'practice' && answeredCount > 0 && (
            <button
              type="button"
              onClick={resetQuiz}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Answers
            </button>
          )}
        </div>

        {/* Row 3: Chapter Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 shrink-0">
            Chapter
          </span>
          <button
            type="button"
            onClick={() => setSelectedChapter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border tabular-nums ${
              selectedChapter === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            All Chapters ({modePool.length})
          </button>
          {availableChapters.map((ch) => {
            const isSelected = selectedChapter === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChapter(ch.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border tabular-nums ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                Ch {ch.id}: {ch.title} ({ch.count})
              </button>
            );
          })}
        </div>

        {/* Row 4: Section & Year Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Section Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl overflow-x-auto max-w-full scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedSection('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedSection === 'all'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All Sections
            </button>
            {SECTION_ORDER.map((sec) => {
              const count = sectionCounts[sec];
              const isSelected = selectedSection === sec;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSelectedSection(sec)}
                  disabled={count === 0 && !isSelected}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums disabled:opacity-40 disabled:cursor-not-allowed ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Sec {sec} ({count})
                </button>
              );
            })}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedYear('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedYear === 'all'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All Years
            </button>
            {availableYears.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                  selectedYear === yr
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer whitespace-nowrap shrink-0 ml-auto"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Questions Content */}
      {groupedSections.length > 0 ? (
        <div className="space-y-6">
          {groupedSections.map((group) => {
            const meta = SECTION_META[group.section];

            // ===============================================================
            // MODE 1: QUESTIONS ONLY — Clean Exam Paper Sheet View
            // ===============================================================
            if (displayMode === 'questions-only') {
              return (
                <section
                  key={group.key}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-hidden"
                >
                  {/* Exam Section Header */}
                  <div className="px-5 sm:px-6 py-4 bg-slate-50/90 dark:bg-slate-950/60 border-b border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        Chapter {group.chapterId}: {group.chapterTitle}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {meta.label} — {meta.subtitle}
                      </h3>
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
                      {meta.marks} · {group.questions.length}{' '}
                      {group.questions.length === 1 ? 'question' : 'questions'}
                    </div>
                  </div>

                  {meta.instruction && (
                    <div className="px-5 sm:px-6 py-2.5 text-xs text-slate-600 dark:text-slate-400 italic border-b border-slate-100 dark:border-slate-800/70 bg-slate-50/40 dark:bg-slate-900/40">
                      {meta.instruction}
                    </div>
                  )}

                  {/* Clean Numbered Questions List (No Solutions / No Spoilers) */}
                  <ol className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {group.questions.map((q) => {
                      const qYears = getQuestionYears(q);
                      return (
                        <li key={q.id} className="px-5 sm:px-6 py-4 sm:py-5">
                          <div className="flex items-start gap-3">
                            <span className="font-mono font-bold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 tabular-nums pt-0.5 min-w-[26px] shrink-0">
                              {q.questionNumber}.
                            </span>
                            <div className="flex-1 min-w-0 space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div className="text-sm sm:text-[15px] text-slate-800 dark:text-slate-100 leading-relaxed min-w-0 overflow-x-auto">
                                  <Latex text={q.questionText} />
                                </div>
                                <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 tabular-nums shrink-0 sm:pt-0.5">
                                  ({qYears.join(', ')})
                                </span>
                              </div>

                              {/* Clean non-spoiler MCQ choices in Questions-Only sheet */}
                              {q.options && q.options.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2 pt-0.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                  {q.options.map((opt, idx) => (
                                    <div key={idx} className="flex items-baseline gap-1.5 min-w-0">
                                      <span className="font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
                                        {String.fromCharCode(65 + idx)}.
                                      </span>
                                      <span className="min-w-0">
                                        <Latex text={opt} />
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            }

            // ===============================================================
            // MODE 2: WITH SOLUTIONS — Interactive MCQs + Classroom Whiteboard Animations
            // ===============================================================
            return (
              <section key={group.key} className="space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 px-1">
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Chapter {group.chapterId}: {group.chapterTitle} · {meta.label}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    {meta.marks} · {group.questions.length}{' '}
                    {group.questions.length === 1 ? 'solution' : 'solutions'}
                  </span>
                </div>

                <div className="space-y-4">
                  {group.questions.map((q) => {
                    const qYears = getQuestionYears(q);
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const selectedOpt = userAnswers[q.id];
                    const isCorrect = isAnswered && selectedOpt === q.correctAnswerIndex;
                    const isSolutionOpen = revealedSolutions[q.id] || false;
                    const animatedProof = getAnimatedProof(q);

                    return (
                      <div
                        key={q.id}
                        className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-2xs space-y-4"
                      >
                        {/* Clean Unboxed Metadata Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/70 text-xs tabular-nums">
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                              Q{q.questionNumber}
                            </span>
                            <span>·</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {qYears.join(' / ')} Exam
                            </span>
                            <span>·</span>
                            <span>Section {q.section}</span>
                          </div>

                          <span className="text-slate-400 dark:text-slate-500">
                            Chapter {q.chapterId}: {q.chapterTitle}
                          </span>
                        </div>

                        {/* Question Text */}
                        <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed overflow-x-auto">
                          <Latex text={q.questionText} />
                        </div>

                        {/* Interactive Options List for Section A (MCQs) */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {q.options.map((optionText, optIdx) => {
                              const optionLabel = String.fromCharCode(65 + optIdx);
                              const isSelected = selectedOpt === optIdx;
                              const isThisCorrect = q.correctAnswerIndex === optIdx;

                              let btnStyle =
                                'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700';

                              if (isAnswered) {
                                if (isThisCorrect) {
                                  btnStyle =
                                    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500/20';
                                } else if (isSelected && !isThisCorrect) {
                                  btnStyle =
                                    'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 font-semibold';
                                } else {
                                  btnStyle =
                                    'bg-slate-50 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 opacity-60';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleSelectOption(q.id, optIdx)}
                                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-xs sm:text-sm cursor-pointer ${btnStyle}`}
                                >
                                  <span
                                    className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-mono font-bold shrink-0 ${
                                      isAnswered && isThisCorrect
                                        ? 'bg-emerald-500 text-white'
                                        : isAnswered && isSelected && !isThisCorrect
                                        ? 'bg-rose-500 text-white'
                                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                                    }`}
                                  >
                                    {optionLabel}
                                  </span>
                                  <span className="flex-1 min-w-0">
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

                        {/* Whiteboard Teaching Controls + Quick Inline Preview */}
                        <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100 dark:border-slate-800/80">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => launchWhiteboard(group.questions, q.id, 'step')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Check Solution
                            </button>

                            <button
                              type="button"
                              onClick={() => launchWhiteboard(group.questions, q.id, 'play')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              Play Animation
                            </button>

                            <button
                              type="button"
                              onClick={() => launchWhiteboard(group.questions, q.id, 'all')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                              Show All
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleSolution(q.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                            >
                              <span>{isSolutionOpen ? 'Hide' : 'Inline'}</span>
                              {isSolutionOpen ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {isAnswered && (
                            <span
                              className={`text-xs font-mono font-medium flex items-center gap-1 ${
                                isCorrect
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              {isCorrect
                                ? 'Correct Answer!'
                                : `Correct Option: ${String.fromCharCode(65 + (q.correctAnswerIndex ?? 0))}`}
                            </span>
                          )}
                        </div>

                        {/* Inline Expanded Solution Box */}
                        {isSolutionOpen && (
                          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-2.5">
                            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                              <BookOpen className="w-3.5 h-3.5" />
                              Solution
                            </div>
                            {animatedProof ? (
                              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                                {animatedProof.lines.map((line) => (
                                  <div
                                    key={line.id}
                                    className={`${line.indent ? 'pl-4 sm:pl-6' : ''} ${
                                      line.kind === 'subheading'
                                        ? 'font-bold text-slate-900 dark:text-white pt-2'
                                        : ''
                                    }`}
                                  >
                                    <Latex
                                      text={
                                        line.kind === 'math'
                                          ? `$$${line.content}$$`
                                          : line.content
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : q.solution ? (
                              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                                <Latex text={q.solution} />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-14 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800 space-y-2.5">
          <BookOpen className="w-9 h-9 text-slate-300 dark:text-slate-600 mx-auto" />
          {displayMode === 'practice' && matchingQuestionsOnlyCount > 0 ? (
            <>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Worked solutions for this filter are coming soon
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {matchingQuestionsOnlyCount} past paper{' '}
                {matchingQuestionsOnlyCount === 1 ? 'question is' : 'questions are'} available to practice in Questions Only mode.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDisplayMode('questions-only')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Questions Only ({matchingQuestionsOnlyCount})
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Show All Available Solutions ({totalSolvedCount})
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No questions match your current filters
              </p>
              <p className="text-xs text-slate-400">
                Try switching section, chapter, or clearing your search.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Full-Screen Classroom Whiteboard Modal for Worked Past Paper Solutions */}
      {whiteboard && activeWbQuestion && (
        <WhiteboardModal
          isOpen={true}
          onClose={() => setWhiteboard(null)}
          title={`Question ${activeWbQuestion.questionNumber}`}
          subtitle={`Chapter ${activeWbQuestion.chapterId}: ${activeWbQuestion.chapterTitle} · Section (${activeWbQuestion.section}) · ${getQuestionYears(activeWbQuestion).join(' / ')}`}
          problemMarkdown={activeWbQuestion.questionText}
          steps={activeWbSteps}
          initialVisibleCount={whiteboard.initialVisibleCount}
          initialPlaying={whiteboard.initialPlaying}
          questionTabs={activeWbTabs}
          problemKey={`${activeWbQuestion.id}-${whiteboard.initialVisibleCount}-${whiteboard.initialPlaying}`}
        />
      )}
    </div>
  );
}
