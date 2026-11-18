import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCheck,
  Sparkles,
} from 'lucide-react';
import Latex from './Latex';
import { ch2SectionC2024Solutions } from '../data/ch2SectionC2024Solutions';

type SpeedOption = {
  label: string;
  ms: number;
};

const SPEED_OPTIONS: SpeedOption[] = [
  { label: 'Slow', ms: 2200 },
  { label: 'Normal', ms: 1400 },
  { label: 'Fast', ms: 850 },
];

export default function AnimatedProofs() {
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMs, setSpeedMs] = useState<number>(1400);

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const question = ch2SectionC2024Solutions[selectedQuestionIdx];
  const totalLines = question.lines.length;
  const isComplete = visibleCount >= totalLines;

  // Reset to line 1 and auto-play when switching questions
  const handleSelectQuestion = (idx: number) => {
    setSelectedQuestionIdx(idx);
    setVisibleCount(1);
    setIsPlaying(true);
  };

  // Auto-advance lines when playing
  useEffect(() => {
    if (!isPlaying) return;
    if (visibleCount >= totalLines) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 1, totalLines));
    }, speedMs);

    return () => clearTimeout(timer);
  }, [isPlaying, visibleCount, totalLines, speedMs]);

  // Keep newest revealed line smoothly visible when stepping or playing
  useEffect(() => {
    if (visibleCount > 1 && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [visibleCount]);

  const handleTogglePlay = () => {
    if (visibleCount >= totalLines) {
      setVisibleCount(1);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleNext = () => {
    setIsPlaying(false);
    setVisibleCount((prev) => Math.min(prev + 1, totalLines));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setVisibleCount((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setVisibleCount(1);
  };

  const handleShowAll = () => {
    setIsPlaying(false);
    setVisibleCount(totalLines);
  };

  const progressPct = Math.round((visibleCount / totalLines) * 100);

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {/* Question Selector Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>2024 Section (C) — Select Question:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ch2SectionC2024Solutions.map((q, idx) => {
            const active = idx === selectedQuestionIdx;
            return (
              <button
                key={q.number}
                type="button"
                onClick={() => handleSelectQuestion(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                Q{q.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question + Animated Proof Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Question Header (matches PDF Question box) */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#1e3a5f] text-white text-xs font-bold tracking-wide">
              Question {question.number}
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
              {question.section} • {question.year}
            </span>
          </div>

          <div className="bg-sky-50/80 dark:bg-slate-800/70 border border-sky-200/80 dark:border-slate-700 rounded-xl p-3.5 sm:p-4 text-sm sm:text-[15px] text-slate-900 dark:text-slate-100 leading-relaxed">
            <Latex text={question.questionText} />
          </div>
        </div>

        {/* Sticky/Top Animation Playback Controls */}
        <div className="bg-slate-50/90 dark:bg-slate-950/60 px-4 py-3 border-b border-slate-200/70 dark:border-slate-800 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{isComplete ? 'Replay' : 'Play'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrev}
                disabled={visibleCount <= 1}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isComplete}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                title="Restart from line 1"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                type="button"
                onClick={handleShowAll}
                disabled={isComplete}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Show All</span>
              </button>
            </div>

            {/* Speed & Step Counter */}
            <div className="flex items-center gap-2.5">
              <div className="inline-flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSpeedMs(opt.ms)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      speedMs === opt.ms
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 shrink-0">
                Line {visibleCount} / {totalLines}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Solution Lines Area */}
        <div className="p-4 sm:p-6 space-y-2">
          <h3 className="text-sm font-bold text-[#1e3a5f] dark:text-sky-400 tracking-wide mb-2">
            Solution
          </h3>

          <div className="space-y-1.5">
            <AnimatePresence initial={false}>
              {question.lines.slice(0, visibleCount).map((line, index) => {
                const isLatest = index === visibleCount - 1;
                return (
                  <motion.div
                    key={line.id}
                    ref={isLatest ? activeLineRef : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`rounded-xl px-3 py-1.5 transition-colors border-l-2 ${
                      line.indent ? 'ml-3 sm:ml-6' : ''
                    } ${
                      isLatest
                        ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30'
                        : 'border-transparent'
                    }`}
                  >
                    {line.kind === 'math' ? (
                      <div className="overflow-x-auto py-0.5">
                        <Latex text={line.content} block />
                      </div>
                    ) : line.kind === 'subheading' ? (
                      <p className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                        {line.content}
                      </p>
                    ) : (
                      <div className="text-sm sm:text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed">
                        <Latex text={line.content} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {!isComplete && (
            <div className="pt-3 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-dashed border-slate-200 dark:border-slate-800 mt-3">
              <span>
                {isPlaying
                  ? 'Revealing next step automatically...'
                  : 'Paused — click Play or Next to continue'}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                Reveal next line →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
