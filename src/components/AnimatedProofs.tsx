import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCheck,
  Eye,
  X,
  Gauge,
} from 'lucide-react';
import Latex from './Latex';
import { ch2SectionC2024Solutions } from '../data/ch2SectionC2024Solutions';

type SpeedOption = {
  label: string;
  shortLabel: string;
  ms: number;
};

const SPEED_OPTIONS: SpeedOption[] = [
  { label: 'Slow', shortLabel: '0.7x', ms: 2200 },
  { label: 'Normal', shortLabel: '1x', ms: 1400 },
  { label: 'Fast', shortLabel: '1.5x', ms: 850 },
];

export default function AnimatedProofs() {
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  // Whiteboard full-screen mode opens automatically when user clicks Check Solution, Play Animation, or Show All
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedIdx, setSpeedIdx] = useState<number>(1);

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const boardScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollModeRef = useRef<'active' | 'top'>('active');

  const question = ch2SectionC2024Solutions[selectedQuestionIdx];
  const totalLines = question.lines.length;
  const isComplete = visibleCount >= totalLines;
  const currentSpeed = SPEED_OPTIONS[speedIdx];

  // Lock background page scroll while full-screen whiteboard is open
  useEffect(() => {
    if (!isWhiteboardOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isWhiteboardOpen]);

  // Keyboard shortcuts inside Full-Screen Whiteboard Mode
  useEffect(() => {
    if (!isWhiteboardOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsPlaying(false);
        setIsWhiteboardOpen(false);
        setVisibleCount(0);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollModeRef.current = 'active';
        setIsPlaying(false);
        setVisibleCount((prev) => Math.min(prev + 1, totalLines));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollModeRef.current = 'active';
        setIsPlaying(false);
        setVisibleCount((prev) => Math.max(prev - 1, 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        scrollModeRef.current = 'active';
        if (visibleCount >= totalLines) {
          scrollModeRef.current = 'top';
          setVisibleCount(1);
          setIsPlaying(true);
        } else {
          if (visibleCount < 1) setVisibleCount(1);
          setIsPlaying((playing) => !playing);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWhiteboardOpen, totalLines, visibleCount]);

  // Auto-advance lines ONLY when user explicitly presses Play
  useEffect(() => {
    if (!isWhiteboardOpen || !isPlaying) return;
    if (visibleCount >= totalLines) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      scrollModeRef.current = 'active';
      setVisibleCount((prev) => Math.min(prev + 1, totalLines));
    }, currentSpeed.ms);

    return () => clearTimeout(timer);
  }, [isWhiteboardOpen, isPlaying, visibleCount, totalLines, currentSpeed.ms]);

  // Smoothly scroll ONLY the whiteboard canvas so the newest line stays clearly visible above the bottom control tray
  useEffect(() => {
    if (!isWhiteboardOpen || visibleCount <= 0) return;
    const container = boardScrollRef.current;
    if (!container) return;

    const raf = requestAnimationFrame(() => {
      if (scrollModeRef.current === 'top') {
        container.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const activeEl = activeLineRef.current;
      if (!activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + container.scrollTop;
      const relativeBottom = relativeTop + elRect.height;

      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;

      if (relativeBottom > viewBottom - 28) {
        container.scrollTo({
          top: relativeBottom - container.clientHeight + 48,
          behavior: 'smooth',
        });
      } else if (relativeTop < viewTop + 24) {
        container.scrollTo({
          top: Math.max(0, relativeTop - 24),
          behavior: 'smooth',
        });
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [isWhiteboardOpen, visibleCount, selectedQuestionIdx]);

  // Select question from normal card view
  const handleSelectQuestion = (idx: number) => {
    setSelectedQuestionIdx(idx);
    setVisibleCount(0);
    setIsPlaying(false);
  };

  // Switch question directly inside whiteboard mode (starts at Step 1 on the board)
  const handleWhiteboardSwitchQuestion = (idx: number) => {
    scrollModeRef.current = 'top';
    setSelectedQuestionIdx(idx);
    setVisibleCount(1);
    setIsPlaying(false);
  };

  // Launch Whiteboard Mode: Step-by-Step
  const handleOpenStepByStep = () => {
    scrollModeRef.current = 'top';
    setVisibleCount(1);
    setIsPlaying(false);
    setIsWhiteboardOpen(true);
  };

  // Launch Whiteboard Mode: Play Animation
  const handleOpenPlayAnimation = () => {
    scrollModeRef.current = 'top';
    setVisibleCount(1);
    setIsPlaying(true);
    setIsWhiteboardOpen(true);
  };

  // Launch Whiteboard Mode: Show All
  const handleOpenShowAll = () => {
    scrollModeRef.current = 'top';
    setVisibleCount(totalLines);
    setIsPlaying(false);
    setIsWhiteboardOpen(true);
  };

  // Exit Whiteboard Mode back to website view
  const handleExitWhiteboard = () => {
    setIsPlaying(false);
    setIsWhiteboardOpen(false);
    setVisibleCount(0);
  };

  // Whiteboard controls
  const handleNext = () => {
    scrollModeRef.current = 'active';
    setIsPlaying(false);
    setVisibleCount((prev) => Math.min(prev + 1, totalLines));
  };

  const handlePrev = () => {
    scrollModeRef.current = 'active';
    setIsPlaying(false);
    setVisibleCount((prev) => Math.max(prev - 1, 1));
  };

  const handleTogglePlay = () => {
    scrollModeRef.current = 'active';
    if (visibleCount >= totalLines) {
      scrollModeRef.current = 'top';
      setVisibleCount(1);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleShowAllInBoard = () => {
    scrollModeRef.current = 'top';
    setIsPlaying(false);
    setVisibleCount(totalLines);
  };

  const handleResetFromLine1 = () => {
    scrollModeRef.current = 'top';
    setIsPlaying(false);
    setVisibleCount(1);
  };

  const handleCycleSpeed = () => {
    setSpeedIdx((prev) => (prev + 1) % SPEED_OPTIONS.length);
  };

  const progressRatio = totalLines > 0 ? visibleCount / totalLines : 0;

  // Full-Screen Classroom Whiteboard Overlay (Portaled to document.body to hide all website chrome)
  const whiteboardOverlay =
    isWhiteboardOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Whiteboard solution for Question ${question.number}`}
            className="fixed inset-0 z-[100] h-dvh w-screen flex flex-col bg-[#fcfdfe] dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          >
            {/* Slim Whiteboard Top Bar */}
            <header className="shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap shrink-0">
                  <span>Question {question.number}</span>
                  <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal hidden sm:inline">
                    {question.section} · {question.year}
                  </span>
                </div>

                {/* Quick Question Switcher directly on the whiteboard */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg shrink-0">
                  {ch2SectionC2024Solutions.map((q, idx) => {
                    const active = idx === selectedQuestionIdx;
                    return (
                      <button
                        key={q.number}
                        type="button"
                        onClick={() => handleWhiteboardSwitchQuestion(idx)}
                        className={`px-2 py-1 rounded-md text-xs font-mono font-semibold tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        Q{q.number}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleExitWhiteboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px]"
              >
                <X className="w-4 h-4 shrink-0" />
                <span>Exit</span>
              </button>
            </header>

            {/* Expansive Whiteboard Writing Canvas */}
            <main
              ref={boardScrollRef}
              className="flex-1 overflow-y-auto overscroll-y-contain bg-[#fcfdfe] dark:bg-slate-950 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"
            >
              <div className="max-w-4xl mx-auto px-4 sm:px-10 py-5 sm:py-8 space-y-6">
                {/* Question Statement on Board */}
                <section className="bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl px-4 sm:px-6 py-4 shadow-2xs">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Question {question.number} · {question.section} · {question.year}
                  </div>
                  <div className="text-[15px] sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed overflow-x-auto">
                    <Latex text={question.questionText} />
                  </div>
                </section>

                {/* Whiteboard Worked Solution Area — Open Whiteboard Surface */}
                <section className="px-1 sm:px-2 py-2 space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/90 dark:border-slate-800">
                    <h2 className="text-sm sm:text-base font-bold text-[#1e3a5f] dark:text-sky-400 tracking-tight">
                      Solution
                    </h2>
                    <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                      Step {visibleCount} of {totalLines}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <AnimatePresence initial={false}>
                      {question.lines.slice(0, visibleCount).map((line, index) => {
                        const isLatest = index === visibleCount - 1;
                        return (
                          <motion.div
                            key={line.id}
                            ref={isLatest ? activeLineRef : undefined}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className={`rounded-lg px-3.5 py-2 transition-colors ${
                              line.indent ? 'ml-3 sm:ml-8' : ''
                            } ${
                              isLatest
                                ? 'bg-sky-50/90 dark:bg-sky-950/40 ring-1 ring-sky-200/90 dark:ring-sky-800/70'
                                : ''
                            }`}
                          >
                            {line.kind === 'math' ? (
                              <div className="overflow-x-auto py-0.5 text-[15px] sm:text-[17px]">
                                <Latex text={line.content} block />
                              </div>
                            ) : line.kind === 'subheading' ? (
                              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-1">
                                {line.content}
                              </p>
                            ) : (
                              <div className="text-[15px] sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                                <Latex text={line.content} />
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </section>

                {/* Generous bottom breathing room so final line scrolls comfortably above tray */}
                <div className="h-8" aria-hidden="true" />
              </div>
            </main>

            {/* Docked Bottom Whiteboard Control Tray */}
            <footer
              className="shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              {/* Slim Progress Bar */}
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full w-full bg-indigo-600 dark:bg-indigo-500 origin-left transition-transform duration-200 ease-out"
                  style={{ transform: `scaleX(${progressRatio})` }}
                />
              </div>

              <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
                {/* Primary Step & Playback Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={visibleCount <= 1}
                    aria-label="Previous step"
                    className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-2 min-h-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isComplete}
                    className="inline-flex items-center justify-center gap-1 px-3.5 sm:px-5 py-2 min-h-[40px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? 'Pause animation' : isComplete ? 'Replay animation' : 'Auto play animation'}
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span className="hidden sm:inline">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span className="hidden sm:inline">{isComplete ? 'Replay' : 'Play'}</span>
                      </>
                    )}
                  </button>

                  {isComplete ? (
                    <button
                      type="button"
                      onClick={handleResetFromLine1}
                      aria-label="Restart from step 1"
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline">Restart</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleShowAllInBoard}
                      aria-label="Show all steps"
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <CheckCheck className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline">Show All</span>
                    </button>
                  )}
                </div>

                {/* Speed & Counter */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Compact speed cycle button on mobile */}
                  <button
                    type="button"
                    onClick={handleCycleSpeed}
                    title={`Speed: ${currentSpeed.label}`}
                    className="sm:hidden inline-flex items-center gap-1 px-2 py-2 min-h-[40px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-mono font-semibold tabular-nums cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Gauge className="w-3.5 h-3.5 shrink-0" />
                    <span>{currentSpeed.shortLabel}</span>
                  </button>

                  {/* Segmented speed selector on tablet/desktop */}
                  <div className="hidden sm:inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                    {SPEED_OPTIONS.map((opt, idx) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSpeedIdx(idx)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          speedIdx === idx
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-mono font-semibold tabular-nums text-slate-600 dark:text-slate-300 whitespace-nowrap shrink-0">
                    {visibleCount} / {totalLines}
                  </span>
                </div>
              </div>
            </footer>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {/* Question Selector Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 sm:px-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          2024 Section (C) — Select Question
        </span>
        <div className="flex flex-wrap gap-1.5">
          {ch2SectionC2024Solutions.map((q, idx) => {
            const active = idx === selectedQuestionIdx;
            return (
              <button
                key={q.number}
                type="button"
                onClick={() => handleSelectQuestion(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tabular-nums transition-colors cursor-pointer border whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                Q{q.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card (Solution Launches Full-Screen Classroom Whiteboard) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
        {/* Question Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Question {question.number}
            </span>
            <span className="font-mono tabular-nums">
              {question.section} · {question.year}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg p-3.5 sm:p-4 text-sm sm:text-[15px] text-slate-900 dark:text-slate-100 leading-relaxed overflow-x-auto">
            <Latex text={question.questionText} />
          </div>
        </div>

        {/* Action Prompt — Launches Full-Screen Whiteboard Teaching Mode */}
        <div className="p-5 sm:p-6 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              အရင်ဆုံး ကိုယ်တိုင်စမ်းတွက်ကြည့်ပါ
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              အဖြေတိုက်ကြည့်လိုသည့်အခါ အောက်ပါခလုတ်တစ်ခုခုကို နှိပ်၍ Full-Screen Whiteboard ပေါ်တွင် တစ်ကြောင်းချင်းစီ သို့မဟုတ် အပြည့်အစုံ ကြည့်ရှုနိုင်ပါသည်။
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleOpenStepByStep}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span>Check Solution (Step by Step)</span>
            </button>

            <button
              type="button"
              onClick={handleOpenPlayAnimation}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 shrink-0" />
              <span>Play Animation</span>
            </button>

            <button
              type="button"
              onClick={handleOpenShowAll}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <CheckCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Show All</span>
            </button>
          </div>
        </div>
      </div>

      {whiteboardOverlay}
    </div>
  );
}
