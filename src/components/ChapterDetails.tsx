import React from "react";
import DraggableScroll from "./DraggableScroll";
import { useState, useEffect } from "react";
import { Chapter } from "../types";
import Latex from "./Latex";
import Visualizer from "./Visualizers";
import PracticeQuiz from "./PracticeQuiz";
import { motion, AnimatePresence } from "motion/react";
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
  Check,
  Hourglass,
  Sparkles,
  GraduationCap,


  X,
  Maximize,
  Minimize,
} from "lucide-react";

interface ChapterDetailsProps {
  chapter: Chapter;
  onNavigateHome?: () => void;
  onSelectChapter?: (id: number) => void;
  isCompleted?: boolean;
  onToggleComplete?: (id: number, completed: boolean) => void;
  isReadingMode?: boolean;
  onToggleReadingMode?: () => void;
}

interface ContentSection {
  title: string;
  content: string;
}


function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface InnerHeader {
  level: number;
  text: string;
  id: string;
}

function extractInnerHeaders(content: string): InnerHeader[] {
  const lines = content.split('\n');
  const headers: InnerHeader[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      headers.push({
        level: match[1].length,
        text: match[2].replace(/\*/g, '').trim(),
        id: slugify(match[2].trim())
      });
    }
  }
  return headers;
}

function parseMarkdownSections(markdown: string): ContentSection[] {
  const lines = markdown.split("\n");
  const sections: ContentSection[] = [];
  let currentTitle = "Introduction";
  let currentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(###|##)\s+(.+)$/);
    if (match) {
      if (currentLines.join("").trim().length > 0) {
        sections.push({
          title: currentTitle,
          content: currentLines.join("\n").trim(),
        });
        currentLines = [];
      }
      currentTitle = match[2].replace(/\*/g, "").trim();
    } else {
      if (line.trim() === "---" && currentLines.join("").trim().length === 0) {
        continue;
      }
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0 || sections.length === 0) {
    sections.push({
      title: currentTitle,
      content: currentLines.join("\n").trim(),
    });
  }

  return sections;
}

export default function ChapterDetails({
  chapter,
  onNavigateHome,
  onSelectChapter,
  isCompleted = false,
  onToggleComplete,
  isReadingMode,
  onToggleReadingMode,
}: ChapterDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    "study" | "formulas" | "visualizer" | "quiz"
  >("study");
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [isMobileOutlineOpen, setIsMobileOutlineOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"sections" | "full">("sections");

    // Reset active section and tab whenever the chapter selection changes
  useEffect(() => {
    setActiveSectionIndex(0);
    setActiveTab("study");
    setIsMobileOutlineOpen(false);
    setViewMode("sections");
  }, [chapter.id]);

  // Scroll to top of the content container on section, tab, or viewMode changes
  useEffect(() => {
    if (viewMode === "sections") {
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: "instant" });
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeSectionIndex, activeTab, viewMode]);


  const handleSubheaderClick = (e: React.MouseEvent, idx: number, id: string) => {
    e.stopPropagation();
    setActiveSectionIndex(idx);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleSectionClick
 = (idx: number) => {
    setActiveSectionIndex(idx);
    if (viewMode === "full") {
      const element = document.getElementById(`section-${idx}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const sections = parseMarkdownSections(chapter.content);
  const activeSection = sections[activeSectionIndex] || sections[0];

  const isPublished = [1, 2, 3, 4, 5].includes(chapter.id);

  if (!isPublished) {
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
                <Calendar className="w-3.5 h-3.5" /> Unlock Education Math
                Syllabus
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

        {/* Beautiful Coming Soon Placeholder with elegant animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-md p-8 md:p-12 rounded-3xl flex flex-col items-center text-center space-y-8"
        >
          {/* Animated Mathematical Orbital Circles & Hourglass icon */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Pulsing glow background */}
            <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-2xl animate-pulse" />

            {/* Outer orbiting ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute w-36 h-36 rounded-full border border-dashed border-indigo-300 dark:border-indigo-800/60"
            />

            {/* Inner reverse orbiting ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute w-28 h-28 rounded-full border border-dashed border-violet-400/50 dark:border-violet-800/40"
            />

            {/* Glowing active orbital node */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20"
            >
              <Hourglass
                className="w-8 h-8 animate-spin"
                style={{ animationDuration: "6s" }}
              />
            </motion.div>

            {/* Mathematical particles */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                x: [-3, 3, -3],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-2 right-4 text-xs font-mono font-bold text-indigo-500/60 select-none"
            >
              $f(x)$
            </motion.div>
            <motion.div
              animate={{
                y: [4, -4, 4],
                x: [2, -2, 2],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
              className="absolute bottom-4 left-2 text-xs font-mono font-bold text-violet-500/60 select-none"
            >
              $\sum$
            </motion.div>
            <motion.div
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="absolute top-24 right-2 text-indigo-400"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Typography */}
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-200/40 dark:border-amber-900/30 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Coming Soon
            </span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              မကြာမီလာမည် (Under Construction)
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              ဤအခန်းသည် ပြင်ဆင်ရေးဆွဲနေဆဲ ဖြစ်ပါသည်။ အဆင့်မြင့် သင်ခန်းစာများ၊
              interactive graphic simulations များနှင့်
              ဉာဏ်စမ်းလေ့ကျင့်ခန်းများကို မကြာမီ အပြည့်အစုံ လေ့လာနိုင်တော့မည်
              ဖြစ်သည်။
            </p>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 leading-relaxed italic">
              This chapter is currently under development. Fully-interactive 3D
              mathematical visualization modules, step-by-step solved exercises,
              and practice quizzes will be available here soon!
            </p>
          </div>

          {/* Active Navigation/Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full justify-center max-w-md">
            <button
              onClick={() => {
                if (onSelectChapter) {
                  onSelectChapter(1);
                }
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              Chapter 1 လေ့လာရန်
            </button>
            <button
              onClick={() => {
                if (onNavigateHome) {
                  onNavigateHome();
                }
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              ပင်မစာမျက်နှာသို့ (Home)
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chapter Overview Hero Header card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-800">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-6 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 transform -translate-x-12 translate-y-6 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 font-bold">
                Chapter {chapter.id}
              </span>
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Unlock Education Math
                Syllabus
              </span>
            </div>

            <h2 className="font-display font-bold text-xl md:text-3xl text-slate-100 tracking-tight leading-tight">
              {chapter.title}
            </h2>

            <div className="text-xs md:text-sm text-slate-300/95 max-w-2xl leading-relaxed italic">
              <Latex text={chapter.tagline} />
            </div>
          </div>
          
          <div className="flex shrink-0">
            {onToggleReadingMode && (
              <button
                onClick={onToggleReadingMode}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700/50 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
              >
                {isReadingMode ? (
                  <>
                    <Minimize className="w-4 h-4" />
                    <span>Exit Reading Mode</span>
                  </>
                ) : (
                  <>
                    <Maximize className="w-4 h-4" />
                    <span>Reading Mode</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {![1, 2, 3, 4, 5].includes(chapter.id) ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 text-center animate-pulse">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 tracking-tight">
            Coming Soon
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            We are currently preparing the interactive content, visualizers, and
            exercises for{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              {chapter.title}
            </strong>
            . Please check back later!
          </p>
        </div>
      ) : (
        <>
          {/* Chapter Navigation Tabs menu */}
          <div className="print:hidden flex flex-wrap gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
            <button
              onClick={() => setActiveTab("study")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "study"
                  ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Core Concepts</span>
            </button>

            <button
              onClick={() => setActiveTab("formulas")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "formulas"
                  ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Formulas ({chapter.formulas.length})</span>
            </button>

            {chapter.visualizerType && (
              <button
                onClick={() => setActiveTab("visualizer")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "visualizer"
                    ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Interactive Tool</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "quiz"
                  ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Quiz Exercises ({chapter.quiz.length})</span>
            </button>
          </div>

          {/* Dynamic Tab Panes Content viewport */}
          <div className="space-y-4">
            {activeTab === "study" && (
              <div className="space-y-4">
                {/* View Mode Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/30">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Reading Preference
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Switch between section-by-section or scrollable
                      full-chapter view.
                    </p>
                  </div>
                  <div className="flex p-0.5 bg-slate-200/60 dark:bg-slate-950/60 rounded-xl border border-slate-200/30 dark:border-slate-800/10 shrink-0">
                    <button
                      onClick={() => setViewMode("sections")}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        viewMode === "sections"
                          ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      Sections
                    </button>
                    <button
                      onClick={() => setViewMode("full")}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        viewMode === "full"
                          ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Full Chapter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Desktop Side Table of Contents Outline */}
                  <div className="print:hidden lg:col-span-4 hidden lg:flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      {viewMode === "full"
                        ? "Jump to Section"
                        : `Sections outline (${sections.length})`}
                    </h3>
                    <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                      
                      {sections.map((section, idx) => {
                        const isActive = idx === activeSectionIndex;
                        const innerHeaders = extractInnerHeaders(section.content).filter(h => h.level === 4 || h.level === 5);
                        return (
                          <div key={idx} className="flex flex-col">
                            <button
                              onClick={() => handleSectionClick(idx)}
                              className={`w-full text-left p-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                                isActive
                                  ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800/60 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span
                                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                    isActive
                                      ? "bg-indigo-600 text-white"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                                <span className="leading-tight flex-1">
                                  <Latex text={section.title} />
                                </span>
                              </div>
                            </button>
                            {(isActive || viewMode === "full") && innerHeaders.length > 0 && (
                              <div className="flex flex-col ml-6 mt-1 mb-2 border-l-2 border-slate-100 dark:border-slate-800 pl-2 space-y-1">
                                {innerHeaders.map((header, hIdx) => (
                                  <button
                                    key={hIdx}
                                    onClick={(e) => handleSubheaderClick(e, idx, header.id)}
                                    className="text-left text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                  >
                                    <Latex text={header.text} />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  {/* Mobile Navigation Outlines (Horizontal Quick Tabs + Custom Dropdown) */}
                  <div className="print:hidden lg:hidden w-full space-y-4">
                    {/* 1. Horizontal swipeable quick section bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {viewMode === "full"
                            ? "Jump to section"
                            : `Syllabus Outline (${sections.length})`}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          Swipe left/right
                        </span>
                      </div>
                      <DraggableScroll className="flex gap-2 min-h-[40px] pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">
                        {sections.map((sec, idx) => {
                          const isActive = idx === activeSectionIndex;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                handleSectionClick(idx);
                                setIsMobileOutlineOpen(false);
                              }}
                              className={`snap-start shrink-0 text-left p-3 rounded-2xl border transition-all cursor-pointer min-w-[150px] max-w-[220px] flex flex-col justify-between min-h-[82px] h-auto ${
                                isActive
                                  ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-sm shadow-indigo-600/10"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                              }`}
                            >
                              <span
                                className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md self-start ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                }`}
                              >
                                Section {idx + 1}
                              </span>
                              <span className="text-[10px] font-semibold line-clamp-3 leading-tight mt-1.5 break-words">
                                <Latex text={sec.title} />
                              </span>
                            </button>
                          );
                        })}
                      </DraggableScroll>
                    </div>

                    {/* 2. Beautiful Custom Expandable Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setIsMobileOutlineOpen(!isMobileOutlineOpen)
                        }
                        className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                      >
                        <div className="flex items-start gap-2 min-w-0 flex-1 pr-2">
                          <List className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <div className="text-left font-semibold leading-snug break-words flex-1">
                            <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] mr-1">Section {activeSectionIndex + 1}:</span>{" "}
                            <Latex text={activeSection.title} />
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 mt-0.5 ${isMobileOutlineOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isMobileOutlineOpen && (
                        <>
                          {/* Background Overlay to close dropdown on click outside */}
                          <div
                            className="fixed inset-0 z-20 bg-transparent"
                            onClick={() => setIsMobileOutlineOpen(false)}
                          />
                          <div className="absolute left-0 right-0 mt-2 p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-xl z-30 max-h-[320px] overflow-y-auto space-y-1 divide-y divide-slate-50 dark:divide-slate-800/40">
                            
                            {sections.map((sec, idx) => {
                              const isActive = idx === activeSectionIndex;
                              const innerHeaders = extractInnerHeaders(sec.content).filter(h => h.level === 4 || h.level === 5);
                              return (
                                <div key={idx} className="flex flex-col">
                                  <button
                                    onClick={() => {
                                      handleSectionClick(idx);
                                      setIsMobileOutlineOpen(false);
                                    }}
                                    className={`w-full text-left p-2.5 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                                      isActive
                                        ? "bg-indigo-50/80 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 font-bold"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                    }`}
                                  >
                                    <div className="flex items-start gap-2.5 flex-1 min-w-0 pr-2">
                                      <span
                                        className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                                          isActive
                                            ? "bg-indigo-600 text-white"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                        }`}
                                      >
                                        {idx + 1}
                                      </span>
                                      <span className="break-words leading-snug flex-1">
                                        <Latex text={sec.title} />
                                      </span>
                                    </div>
                                    {isActive && (
                                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                    )}
                                  </button>
                                  {(isActive || viewMode === "full") && innerHeaders.length > 0 && (
                                    <div className="flex flex-col ml-8 mt-1 mb-2 border-l-2 border-slate-100 dark:border-slate-800 pl-2 space-y-1">
                                      {innerHeaders.map((header, hIdx) => (
                                        <button
                                          key={hIdx}
                                          onClick={(e) => {
                                            handleSubheaderClick(e, idx, header.id);
                                            setIsMobileOutlineOpen(false);
                                          }}
                                          className="text-left text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                          <Latex text={header.text} />
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Main Content card */}
                  <div className="lg:col-span-8 print:col-span-12 print:block space-y-4">
                                        <div className={`space-y-6 ${viewMode === "full" ? "block" : "hidden print:block"}`}>
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
                            <div className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm min-w-0 break-words ">
                              <Latex text={section.content} />
                            </div>
                          </div>
                        ))}

                        {/* Full Reading End Action cards */}
                        <div className="print:hidden bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="space-y-1 text-center sm:text-left">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                              You've completed Chapter {chapter.id}!
                            </h4>
                            <p className="text-xs text-slate-400 font-medium">
                              Ready to test your math and formula understanding?
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 shrink-0 justify-center sm:justify-start">
                            <button
                              onClick={() => onToggleComplete?.(chapter.id, !isCompleted)}
                              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-sm transition-colors ${isCompleted ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60 dark:text-emerald-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'}`}
                            >
                              <Check className="w-4 h-4" />
                              {isCompleted ? 'Completed' : 'Mark as Complete'}
                            </button>

                            <button
                              onClick={() => setActiveTab("formulas")}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer shadow-sm"
                            >
                              <Calculator className="w-4 h-4" />
                              Formulas
                            </button>
                            <button
                              onClick={() => setActiveTab("quiz")}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md"
                            >
                              <Award className="w-4 h-4" />
                              Start Quiz
                            </button>
                          </div>
                        </div>
                    </div>
                    <div className={`bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6 ${viewMode === "sections" ? "block print:hidden" : "hidden"}`}>
                        {/* Active Section title */}
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide mb-1">
                            Section {activeSectionIndex + 1} of{" "}
                            {sections.length}
                          </div>
                          <h3 className="font-display font-bold text-base md:text-xl text-slate-900 dark:text-white leading-tight">
                            <Latex text={activeSection.title} />
                          </h3>
                        </div>

                        {/* Section Content with LaTeX */}
                        <div className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm min-w-0 break-words ">
                          <Latex text={activeSection.content} />
                        </div>

                        {/* Section navigation footer */}
                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <button
                            disabled={activeSectionIndex === 0}
                            onClick={() =>
                              setActiveSectionIndex((prev) => prev - 1)
                            }
                            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              activeSectionIndex === 0
                                ? "opacity-40 cursor-not-allowed border-slate-100 text-slate-400 dark:border-slate-800"
                                : "bg-white hover:bg-slate-50 border-slate-200 dark:border-slate-800 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous Section
                          </button>

                          {activeSectionIndex < sections.length - 1 ? (
                            <button
                              onClick={() =>
                                setActiveSectionIndex((prev) => prev + 1)
                              }
                              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow"
                            >
                              Next Section
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                              <button
                                onClick={() => setActiveTab("formulas")}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                <Calculator className="w-4 h-4" />
                                View Formulas
                              </button>
                              <button
                                onClick={() => setActiveTab("quiz")}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                              >
                                <Award className="w-4 h-4" />
                                Start Quiz Practice
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            )}

            {activeTab === "formulas" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.formulas.map((f) => (
                  <div
                    key={f.id}
                    className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3 flex flex-col justify-between overflow-hidden min-w-0"
                  >
                    <div>
                      <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm">
                        {f.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <Latex text={f.description} />
                      </div>
                    </div>
                    <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl min-h-[50px] w-full flex items-center justify-center overflow-hidden">
                      <Latex block={true} text={f.latex} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "visualizer" && (
              chapter.id === 4 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center mb-2">
                    <Hourglass className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">Coming Soon</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    We are currently preparing the interactive content, visualizers, and exercises for Vector Algebra. Please check back later!
                  </p>
                </div>
              ) : chapter.visualizerType ? (
                <Visualizer type={chapter.visualizerType} />
              ) : null
            )}

            {activeTab === "quiz" && (
              chapter.id === 4 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center mb-2">
                    <Hourglass className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">Coming Soon</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    We are currently preparing the interactive content, visualizers, and exercises for Vector Algebra. Please check back later!
                  </p>
                </div>
              ) : (
                <PracticeQuiz
                  chapterId={chapter.id}
                  questions={chapter.quiz}
                  chapterTitle={chapter.title}
                  chapterContent={chapter.content}
                />
              )
            )}
          </div>
        </>
      )}

        </div>
  );
}

