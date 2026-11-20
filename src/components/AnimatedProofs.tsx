import React, { useState, useMemo } from 'react';
import { Play, CheckCheck, Eye } from 'lucide-react';
import Latex from './Latex';
import WhiteboardModal, { WhiteboardStep } from './WhiteboardModal';
import { ch2SectionC2024Solutions } from '../data/ch2SectionC2024Solutions';

export default function AnimatedProofs() {
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState<boolean>(false);
  const [launchState, setLaunchState] = useState<{
    visibleCount: number;
    playing: boolean;
    sessionKey: number;
  }>({ visibleCount: 1, playing: false, sessionKey: 0 });

  const question = ch2SectionC2024Solutions[selectedQuestionIdx];
  const totalLines = question.lines.length;

  const steps: WhiteboardStep[] = useMemo(
    () =>
      question.lines.map((line) => ({
        id: line.id,
        kind: line.kind,
        content: line.content,
        indent: line.indent,
      })),
    [question]
  );

  const handleSelectQuestion = (idx: number) => {
    setSelectedQuestionIdx(idx);
  };

  const handleOpenStepByStep = () => {
    setLaunchState((prev) => ({
      visibleCount: 1,
      playing: false,
      sessionKey: prev.sessionKey + 1,
    }));
    setIsWhiteboardOpen(true);
  };

  const handleOpenPlayAnimation = () => {
    setLaunchState((prev) => ({
      visibleCount: 1,
      playing: true,
      sessionKey: prev.sessionKey + 1,
    }));
    setIsWhiteboardOpen(true);
  };

  const handleOpenShowAll = () => {
    setLaunchState((prev) => ({
      visibleCount: totalLines,
      playing: false,
      sessionKey: prev.sessionKey + 1,
    }));
    setIsWhiteboardOpen(true);
  };

  const questionTabs = ch2SectionC2024Solutions.map((q, idx) => ({
    label: `Q${q.number}`,
    active: idx === selectedQuestionIdx,
    onSelect: () => {
      setSelectedQuestionIdx(idx);
      setLaunchState((prev) => ({
        visibleCount: 1,
        playing: false,
        sessionKey: prev.sessionKey + 1,
      }));
    },
  }));

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

      <WhiteboardModal
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        title={`Question ${question.number}`}
        subtitle={`${question.section} · ${question.year}`}
        problemMarkdown={question.questionText}
        steps={steps}
        initialVisibleCount={launchState.visibleCount}
        initialPlaying={launchState.playing}
        questionTabs={questionTabs}
        problemKey={`${question.number}-${launchState.sessionKey}`}
      />
    </div>
  );
}
