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
  X,
  Gauge,
} from 'lucide-react';
import Latex from './Latex';

export type WhiteboardThemeId = 'whiteboard' | 'chalkboard' | 'dark' | 'paper';

export interface WhiteboardThemeConfig {
  id: WhiteboardThemeId;
  label: string;
  isDark: boolean;
  swatchBg: string;
  swatchBorder: string;
  shellBg: string;
  canvasBg: string;
  canvasGridStyle: React.CSSProperties;
  topBarBg: string;
  bottomTrayBg: string;
  questionBoxBg: string;
  headingText: string;
  mutedText: string;
  dividerBorder: string;
  activeLineHighlight: string;
  buttonSecondary: string;
  buttonPrimary: string;
  segmentedBg: string;
  segmentedActive: string;
  progressTrack: string;
  progressFill: string;
}

export const WHITEBOARD_THEMES: WhiteboardThemeConfig[] = [
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    isDark: false,
    swatchBg: '#fcfdfe',
    swatchBorder: '#94a3b8',
    shellBg: 'bg-[#fcfdfe] text-slate-900',
    canvasBg: 'bg-[#fcfdfe]',
    canvasGridStyle: {
      backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    },
    topBarBg: 'bg-[#ffffff]/95 border-b border-slate-200/90',
    bottomTrayBg: 'bg-[#ffffff]/95 border-t border-slate-200/90',
    questionBoxBg: 'bg-[#ffffff]/95 border border-slate-200/90 shadow-2xs',
    headingText: 'text-[#1e3a5f]',
    mutedText: 'text-slate-500',
    dividerBorder: 'border-slate-200/90',
    activeLineHighlight: 'bg-sky-50/95 ring-1 ring-sky-200/90',
    buttonSecondary:
      'bg-[#ffffff] border border-slate-200 text-slate-700 hover:bg-slate-100',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs',
    segmentedBg: 'bg-slate-100',
    segmentedActive: 'bg-[#ffffff] text-indigo-600 shadow-2xs',
    progressTrack: 'bg-slate-100',
    progressFill: 'bg-indigo-600',
  },
  {
    id: 'chalkboard',
    label: 'Chalkboard',
    isDark: true,
    swatchBg: '#163026',
    swatchBorder: '#4ade80',
    shellBg: 'bg-[#163026] text-[#f3f7f1]',
    canvasBg: 'bg-[#163026]',
    canvasGridStyle: {
      backgroundImage:
        'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
      backgroundSize: '26px 26px',
    },
    topBarBg: 'bg-[#10241c]/95 border-b border-[#264b3c]',
    bottomTrayBg: 'bg-[#10241c]/95 border-t border-[#264b3c]',
    questionBoxBg: 'bg-[#1c3b2f]/90 border border-[#2d5847] shadow-2xs',
    headingText: 'text-[#a7f3d0]',
    mutedText: 'text-[#9ec2b2]',
    dividerBorder: 'border-[#264b3c]',
    activeLineHighlight: 'bg-[#ffffff]/[0.09] ring-1 ring-[#6ee7b7]/40',
    buttonSecondary:
      'bg-[#1c3b2f] border border-[#2e5a49] text-[#eef6f0] hover:bg-[#244a3b]',
    buttonPrimary: 'bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold shadow-2xs',
    segmentedBg: 'bg-[#1b382c]',
    segmentedActive: 'bg-[#2a5543] text-[#ecfdf5] shadow-2xs',
    progressTrack: 'bg-[#1c3b2f]',
    progressFill: 'bg-[#34d399]',
  },
  {
    id: 'dark',
    label: 'Dark',
    isDark: true,
    swatchBg: '#0d1117',
    swatchBorder: '#38bdf8',
    shellBg: 'bg-[#0d1117] text-slate-100',
    canvasBg: 'bg-[#0d1117]',
    canvasGridStyle: {
      backgroundImage: 'radial-gradient(#1f2937 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    },
    topBarBg: 'bg-[#111827]/95 border-b border-slate-800',
    bottomTrayBg: 'bg-[#111827]/95 border-t border-slate-800',
    questionBoxBg: 'bg-[#161e2e]/95 border border-slate-800 shadow-2xs',
    headingText: 'text-sky-400',
    mutedText: 'text-slate-400',
    dividerBorder: 'border-slate-800',
    activeLineHighlight: 'bg-sky-950/50 ring-1 ring-sky-500/40',
    buttonSecondary:
      'bg-[#161e2e] border border-slate-700 text-slate-200 hover:bg-slate-800',
    buttonPrimary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-2xs',
    segmentedBg: 'bg-slate-800/90',
    segmentedActive: 'bg-slate-900 text-sky-400 shadow-2xs',
    progressTrack: 'bg-slate-800',
    progressFill: 'bg-sky-400',
  },
  {
    id: 'paper',
    label: 'Warm Paper',
    isDark: false,
    swatchBg: '#fbf7ee',
    swatchBorder: '#b45309',
    shellBg: 'bg-[#fbf7ee] text-[#1f1a14]',
    canvasBg: 'bg-[#fbf7ee]',
    canvasGridStyle: {
      backgroundImage: 'radial-gradient(#d8ccb8 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    },
    topBarBg: 'bg-[#f6efe0]/95 border-b border-[#e5d9c3]',
    bottomTrayBg: 'bg-[#f6efe0]/95 border-t border-[#e5d9c3]',
    questionBoxBg: 'bg-[#fffdf8]/95 border border-[#e3d6be] shadow-2xs',
    headingText: 'text-[#7c2d12]',
    mutedText: 'text-[#6e604c]',
    dividerBorder: 'border-[#e5d9c3]',
    activeLineHighlight: 'bg-amber-100/75 ring-1 ring-amber-300/90',
    buttonSecondary:
      'bg-[#fffdf8] border border-[#ddd0b8] text-[#3a3024] hover:bg-[#efe6d4]',
    buttonPrimary: 'bg-[#b45309] hover:bg-[#92400e] text-white shadow-2xs',
    segmentedBg: 'bg-[#ebe1ce]',
    segmentedActive: 'bg-[#fffdf8] text-[#92400e] shadow-2xs',
    progressTrack: 'bg-[#ebe1ce]',
    progressFill: 'bg-[#b45309]',
  },
];

const WB_THEME_STORAGE_KEY = 'unlock_whiteboard_theme';
const WB_THEME_EVENT = 'unlock-whiteboard-theme-change';

export function useWhiteboardTheme(): [
  WhiteboardThemeId,
  (id: WhiteboardThemeId) => void,
  WhiteboardThemeConfig,
] {
  const [themeId, setThemeIdState] = useState<WhiteboardThemeId>(() => {
    if (typeof window === 'undefined') return 'whiteboard';
    const saved = window.localStorage.getItem(WB_THEME_STORAGE_KEY);
    if (saved && WHITEBOARD_THEMES.some((t) => t.id === saved)) {
      return saved as WhiteboardThemeId;
    }
    return 'whiteboard';
  });

  useEffect(() => {
    const onThemeChange = (e: Event) => {
      const next = (e as CustomEvent<WhiteboardThemeId>).detail;
      if (next && WHITEBOARD_THEMES.some((t) => t.id === next)) {
        setThemeIdState(next);
      }
    };
    window.addEventListener(WB_THEME_EVENT, onThemeChange);
    return () => window.removeEventListener(WB_THEME_EVENT, onThemeChange);
  }, []);

  const setThemeId = (next: WhiteboardThemeId) => {
    setThemeIdState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WB_THEME_STORAGE_KEY, next);
      window.dispatchEvent(new CustomEvent<WhiteboardThemeId>(WB_THEME_EVENT, { detail: next }));
    }
  };

  const config =
    WHITEBOARD_THEMES.find((t) => t.id === themeId) || WHITEBOARD_THEMES[0];

  return [themeId, setThemeId, config];
}

export interface WhiteboardStep {
  id: string;
  kind: 'text' | 'math' | 'subheading' | 'markdown';
  content: string;
  indent?: boolean;
}

/**
 * Splits a LaTeX \begin{aligned}...\end{aligned} body on top-level `\\` line breaks,
 * never splitting inside nested environments such as \begin{cases}, \begin{pmatrix}, etc.
 */
function splitAlignedRows(body: string): string[] {
  const rows: string[] = [];
  let current = '';
  let depth = 0;
  let i = 0;

  while (i < body.length) {
    if (body.startsWith('\\begin{', i)) {
      depth++;
      current += '\\begin{';
      i += 7;
      continue;
    }
    if (body.startsWith('\\end{', i)) {
      depth = Math.max(0, depth - 1);
      current += '\\end{';
      i += 5;
      continue;
    }
    if (depth === 0 && body[i] === '\\' && body[i + 1] === '\\') {
      // Consume optional vertical spacing argument like \\[4pt]
      let nextIdx = i + 2;
      if (body[nextIdx] === '[') {
        const closeBracket = body.indexOf(']', nextIdx);
        if (closeBracket !== -1) {
          nextIdx = closeBracket + 1;
        }
      }
      if (current.trim()) rows.push(current.trim());
      current = '';
      i = nextIdx;
      continue;
    }
    current += body[i];
    i++;
  }

  if (current.trim()) rows.push(current.trim());
  return rows;
}

/**
 * Converts a Syllabus Markdown + KaTeX solution string into progressive step-by-step
 * whiteboard items (splitting paragraphs, diagrams, and multi-row aligned derivations).
 */
export function parseMarkdownToWhiteboardSteps(markdown: string): WhiteboardStep[] {
  const steps: WhiteboardStep[] = [];
  let counter = 0;

  // Tokenize into display math blocks ($$...$$) and non-math text segments
  const tokenRegex = /\$\$([\s\S]*?)\$\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const pushTextSegment = (segment: string) => {
    const rawLines = segment.split('\n');
    let tableBuffer: string[] = [];

    const flushTable = () => {
      if (tableBuffer.length > 0) {
        steps.push({
          id: `wb-tbl-${counter++}`,
          kind: 'markdown',
          content: tableBuffer.join('\n'),
        });
        tableBuffer = [];
      }
    };

    for (const rawLine of rawLines) {
      const trimmed = rawLine.trim();
      if (!trimmed) {
        flushTable();
        continue;
      }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableBuffer.push(trimmed);
        continue;
      }
      flushTable();

      if (trimmed.startsWith('[DIAGRAM:')) {
        steps.push({
          id: `wb-diag-${counter++}`,
          kind: 'markdown',
          content: trimmed,
        });
        continue;
      }

      const isStepHeader =
        /^\*\*(?:Method|Case|Step|\(\d+\)|Check|Verification|Base Step|Inductive Step|Conclusion)\b/i.test(
          trimmed
        );

      steps.push({
        id: `wb-txt-${counter++}`,
        kind: isStepHeader && !trimmed.includes('$') ? 'subheading' : 'markdown',
        content: isStepHeader && !trimmed.includes('$') ? trimmed.replace(/\*\*/g, '') : trimmed,
      });
    }
    flushTable();
  };

  while ((match = tokenRegex.exec(markdown)) !== null) {
    if (match.index > lastIndex) {
      pushTextSegment(markdown.slice(lastIndex, match.index));
    }

    const mathBody = match[1].trim();
    const alignedMatch = mathBody.match(
      /^\\begin\{(aligned|align\*?)\}([\s\S]*?)\\end\{\1\}$/
    );

    if (alignedMatch) {
      const rows = splitAlignedRows(alignedMatch[2]);
      if (rows.length > 1) {
        rows.forEach((row, rowIdx) => {
          const cleanRow = row.trim();
          const ampMatches = cleanRow.match(/(?<!\\)&/g) || [];
          const startsWithAmp = /^&/.test(cleanRow);

          if (ampMatches.length >= 2) {
            // Multi-column aligned row — preserve aligned environment for this row
            steps.push({
              id: `wb-math-${counter++}`,
              kind: 'math',
              content: `\\begin{aligned}${cleanRow}\\end{aligned}`,
              indent: rowIdx > 0 && startsWithAmp,
            });
          } else {
            const singleRowMath = cleanRow.replace(/(?<!\\)&/g, '').trim();
            steps.push({
              id: `wb-math-${counter++}`,
              kind: 'math',
              content: singleRowMath,
              indent: rowIdx > 0 && startsWithAmp,
            });
          }
        });
      } else {
        steps.push({
          id: `wb-math-${counter++}`,
          kind: 'math',
          content: mathBody,
        });
      }
    } else if (mathBody) {
      steps.push({
        id: `wb-math-${counter++}`,
        kind: 'math',
        content: mathBody,
      });
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < markdown.length) {
    pushTextSegment(markdown.slice(lastIndex));
  }

  return steps;
}

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

export interface WhiteboardQuestionTab {
  label: string;
  active: boolean;
  onSelect: () => void;
}

interface WhiteboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  problemMarkdown?: string;
  steps: WhiteboardStep[];
  initialVisibleCount?: number;
  initialPlaying?: boolean;
  questionTabs?: WhiteboardQuestionTab[];
  /** Change this key whenever switching to a different problem while staying open */
  problemKey?: string | number;
}

export default function WhiteboardModal({
  isOpen,
  onClose,
  title,
  subtitle,
  problemMarkdown,
  steps,
  initialVisibleCount = 1,
  initialPlaying = false,
  questionTabs,
  problemKey,
}: WhiteboardModalProps) {
  const [themeId, setThemeId, theme] = useWhiteboardTheme();
  const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);
  const [speedIdx, setSpeedIdx] = useState<number>(1);

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const boardScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollModeRef = useRef<'active' | 'top'>('top');

  const totalLines = steps.length;
  const isComplete = totalLines > 0 && visibleCount >= totalLines;
  const currentSpeed = SPEED_OPTIONS[speedIdx];

  // Sync initial playback state when opening or switching problem
  useEffect(() => {
    if (!isOpen) return;
    scrollModeRef.current = 'top';
    setVisibleCount(Math.min(Math.max(initialVisibleCount, 1), Math.max(totalLines, 1)));
    setIsPlaying(initialPlaying);
  }, [isOpen, problemKey, initialVisibleCount, initialPlaying, totalLines]);

  // Lock background page scroll while full-screen whiteboard is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Keyboard shortcuts: Right/Left step, Space play/pause, Esc exit
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsPlaying(false);
        onClose();
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
  }, [isOpen, totalLines, visibleCount, onClose]);

  // Auto-advance timer when Play is active
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    if (visibleCount >= totalLines) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      scrollModeRef.current = 'active';
      setVisibleCount((prev) => Math.min(prev + 1, totalLines));
    }, currentSpeed.ms);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, visibleCount, totalLines, currentSpeed.ms]);

  // Keep newly revealed line smoothly in view inside the whiteboard canvas
  useEffect(() => {
    if (!isOpen || visibleCount <= 0) return;
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
          top: relativeBottom - container.clientHeight + 52,
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
  }, [isOpen, visibleCount, problemKey]);

  if (!isOpen || typeof document === 'undefined') return null;

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

  const handleShowAll = () => {
    scrollModeRef.current = 'top';
    setIsPlaying(false);
    setVisibleCount(totalLines);
  };

  const handleRestart = () => {
    scrollModeRef.current = 'top';
    setIsPlaying(false);
    setVisibleCount(1);
  };

  const handleCycleSpeed = () => {
    setSpeedIdx((prev) => (prev + 1) % SPEED_OPTIONS.length);
  };

  const progressRatio = totalLines > 0 ? visibleCount / totalLines : 0;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Whiteboard: ${title}`}
      data-wb-surface={theme.isDark ? 'dark' : 'light'}
      data-wb-theme={theme.id}
      className={`${theme.isDark ? 'dark' : ''} fixed inset-0 z-[100] h-dvh w-screen flex flex-col ${theme.shellBg} transition-colors duration-200`}
    >
      {/* Slim Whiteboard Top Bar */}
      <header
        className={`shrink-0 backdrop-blur-md px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 ${theme.topBarBg}`}
      >
        {/* Left: Title + Optional Question Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 overflow-x-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0">
            <span className="truncate max-w-[140px] sm:max-w-[260px]">{title}</span>
            {subtitle && (
              <>
                <span className="opacity-35 hidden md:inline" aria-hidden="true">
                  ·
                </span>
                <span className={`font-normal hidden md:inline ${theme.mutedText}`}>
                  {subtitle}
                </span>
              </>
            )}
          </div>

          {questionTabs && questionTabs.length > 0 && (
            <div className={`flex items-center gap-1 p-0.5 rounded-lg shrink-0 ${theme.segmentedBg}`}>
              {questionTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={tab.onSelect}
                  className={`px-2 py-1 rounded-md text-xs font-mono font-semibold tabular-nums transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    tab.active ? theme.segmentedActive : `${theme.mutedText} hover:opacity-100`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Board Theme Picker + Exit */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Board Surface Theme Selector */}
          <div
            role="group"
            aria-label="Whiteboard theme"
            className={`inline-flex items-center gap-1 p-1 rounded-lg ${theme.segmentedBg}`}
          >
            {WHITEBOARD_THEMES.map((t) => {
              const active = t.id === themeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeId(t.id)}
                  title={t.label}
                  aria-label={`${t.label} theme`}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active ? theme.segmentedActive : `${theme.mutedText} hover:opacity-100`
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 border"
                    style={{
                      backgroundColor: t.swatchBg,
                      borderColor: t.swatchBorder,
                    }}
                    aria-hidden="true"
                  />
                  <span className="hidden lg:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              onClose();
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] ${theme.buttonSecondary}`}
          >
            <X className="w-4 h-4 shrink-0" />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Expansive Whiteboard Writing Canvas */}
      <main
        ref={boardScrollRef}
        className={`flex-1 overflow-y-auto overscroll-y-contain ${theme.canvasBg}`}
        style={theme.canvasGridStyle}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-10 py-5 sm:py-8 space-y-6">
          {/* Problem Statement on Board */}
          {problemMarkdown && (
            <section className={`rounded-xl px-4 sm:px-6 py-4 ${theme.questionBoxBg}`}>
              <div className={`text-xs font-medium mb-1.5 ${theme.mutedText}`}>
                {subtitle ? `${title} · ${subtitle}` : title}
              </div>
              <div className="text-[15px] sm:text-base leading-relaxed overflow-x-auto">
                <Latex text={problemMarkdown} insideSolution />
              </div>
            </section>
          )}

          {/* Open Whiteboard Solution Writing Surface */}
          <section className="px-1 sm:px-2 py-1 space-y-3">
            <div className={`flex items-center justify-between gap-2 pb-2.5 border-b ${theme.dividerBorder}`}>
              <h2 className={`text-sm sm:text-base font-bold tracking-tight ${theme.headingText}`}>
                Solution
              </h2>
              <span className={`text-xs font-mono tabular-nums ${theme.mutedText}`}>
                Step {Math.min(visibleCount, totalLines)} of {totalLines}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <AnimatePresence initial={false}>
                {steps.slice(0, visibleCount).map((line, index) => {
                  const isLatest = index === visibleCount - 1;
                  return (
                    <motion.div
                      key={line.id}
                      ref={isLatest ? activeLineRef : undefined}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-lg px-3.5 py-2 transition-colors ${
                        line.indent ? 'ml-3 sm:ml-8' : ''
                      } ${isLatest ? theme.activeLineHighlight : ''}`}
                    >
                      {line.kind === 'math' ? (
                        <div className="overflow-x-auto py-0.5 text-[15px] sm:text-[17px]">
                          <Latex text={line.content} block />
                        </div>
                      ) : line.kind === 'subheading' ? (
                        <p className="text-sm sm:text-base font-bold pt-1">{line.content}</p>
                      ) : line.kind === 'markdown' ? (
                        <div className="text-[15px] sm:text-base leading-relaxed overflow-x-auto">
                          <Latex text={line.content} insideSolution />
                        </div>
                      ) : (
                        <div className="text-[15px] sm:text-base leading-relaxed">
                          <Latex text={line.content} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

          <div className="h-8" aria-hidden="true" />
        </div>
      </main>

      {/* Docked Bottom Whiteboard Control Tray */}
      <footer
        className={`shrink-0 backdrop-blur-md ${theme.bottomTrayBg}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Slim Progress Indicator */}
        <div className={`w-full h-1 overflow-hidden ${theme.progressTrack}`}>
          <div
            className={`h-full w-full origin-left transition-transform duration-200 ease-out ${theme.progressFill}`}
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
              className={`inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0 ${theme.buttonSecondary}`}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isComplete}
              className={`inline-flex items-center justify-center gap-1 px-3.5 sm:px-5 py-2 min-h-[40px] rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0 ${theme.buttonPrimary}`}
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause animation' : isComplete ? 'Replay animation' : 'Play animation'}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${theme.buttonSecondary}`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{isComplete ? 'Replay' : 'Play'}</span>
                </>
              )}
            </button>

            {isComplete ? (
              <button
                type="button"
                onClick={handleRestart}
                aria-label="Restart from step 1"
                className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${theme.buttonSecondary}`}
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Restart</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowAll}
                aria-label="Show all steps"
                className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${theme.buttonSecondary}`}
              >
                <CheckCheck className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Show All</span>
              </button>
            )}
          </div>

          {/* Speed & Step Counter */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCycleSpeed}
              title={`Speed: ${currentSpeed.label}`}
              className={`sm:hidden inline-flex items-center gap-1 px-2 py-2 min-h-[40px] rounded-lg text-xs font-mono font-semibold tabular-nums cursor-pointer whitespace-nowrap shrink-0 ${theme.segmentedBg}`}
            >
              <Gauge className="w-3.5 h-3.5 shrink-0" />
              <span>{currentSpeed.shortLabel}</span>
            </button>

            <div className={`hidden sm:inline-flex items-center rounded-lg p-0.5 ${theme.segmentedBg}`}>
              {SPEED_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSpeedIdx(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    speedIdx === idx ? theme.segmentedActive : `${theme.mutedText} hover:opacity-100`
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <span className={`text-xs font-mono font-semibold tabular-nums whitespace-nowrap shrink-0 ${theme.mutedText}`}>
              {Math.min(visibleCount, totalLines)} / {totalLines}
            </span>
          </div>
        </div>
      </footer>
    </div>,
    document.body
  );
}
