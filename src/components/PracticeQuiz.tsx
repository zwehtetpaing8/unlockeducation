import { useState, useEffect } from 'react';
import { Question } from '../types';
import Latex from './Latex';
import { Check, X, Award, RotateCcw, ArrowRight, Lightbulb, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface PracticeQuizProps {
  chapterId: number;
  questions: Question[];
  chapterTitle: string;
  chapterContent: string;
}

export default function PracticeQuiz({ chapterId, questions, chapterTitle, chapterContent }: PracticeQuizProps) {
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(questions || []);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  useEffect(() => {
    setActiveQuestions(questions || []);
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setGenerateError(null);
  }, [chapterId, questions]);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const contentExcerpt = (chapterContent || '').trim().slice(0, 3000);
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chapterTitle,
          content: contentExcerpt || chapterTitle
        })
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const msg =
          payload && typeof payload === 'object' && typeof payload.error === 'string'
            ? payload.error
            : `Unable to generate quiz right now (HTTP ${response.status}).`;
        setGenerateError(msg);
        return;
      }

      if (Array.isArray(payload) && payload.length > 0) {
        setActiveQuestions(payload);
        setCurrentQuestionIdx(0);
        setSelectedAnswerIdx(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
      } else {
        setGenerateError("No quiz questions were returned. Please try again.");
      }
    } catch {
      setGenerateError("Network error while generating quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!activeQuestions || activeQuestions.length === 0) {
    return (
      <div className="p-6 sm:p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center space-y-4 shadow-sm">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-7 h-7" />
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">No static practice quiz available.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            Generate a fresh multiple-choice quiz based on this chapter&apos;s concepts to test your understanding.
          </p>
        </div>

        {generateError && (
          <p role="alert" className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40 px-3.5 py-2 rounded-lg">
            {generateError}
          </p>
        )}

        <button
          type="button"
          onClick={handleGenerateQuiz}
          disabled={isGenerating}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Quiz...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Quiz with AI</span>
            </>
          )}
        </button>
      </div>
    );
  }

  const currentQuestion = activeQuestions[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswerIdx(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIdx(null);
    setIsAnswered(false);

    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
      try {
        const newRecord = {
          chapterId,
          chapterTitle,
          score,
          total: activeQuestions.length,
          date: new Date().toISOString()
        };
        const historyStr = localStorage.getItem('unlock_edu_recentQuizzes');
        let history = historyStr ? JSON.parse(historyStr) : [];
        history.unshift(newRecord);
        history = history.slice(0, 3);
        localStorage.setItem('unlock_edu_recentQuizzes', JSON.stringify(history));
      } catch (e) {
        console.error("Could not save quiz history", e);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const getPerformanceSummary = (percent: number) => {
    if (percent === 100) {
      return {
        title: "Outstanding — Perfect Score",
        text: "You have mastered every concept in this quiz set. Well done!",
        color: "text-emerald-600 dark:text-emerald-400"
      };
    }
    if (percent >= 70) {
      return {
        title: "Great Progress",
        text: "You have a solid grasp of the key ideas. Review any missed explanations to reach 100%.",
        color: "text-indigo-600 dark:text-indigo-400"
      };
    }
    return {
      title: "Keep Practicing",
      text: "Review the chapter notes and key formulas, then retake or generate a fresh question set.",
      color: "text-slate-700 dark:text-slate-200"
    };
  };

  const scorePercent = Math.round((score / activeQuestions.length) * 100);
  const summary = getPerformanceSummary(scorePercent);
  const progressPercent = showResults
    ? 100
    : Math.round(((currentQuestionIdx + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100);

  return (
    <div id="practice-quiz" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
      <div className="bg-slate-50/80 dark:bg-slate-950/60 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-display font-semibold text-slate-900 dark:text-slate-100 text-sm leading-tight">
            Practice Chapter Quiz
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
            {chapterTitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!showResults && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 tabular-nums">
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {currentQuestionIdx + 1}/{activeQuestions.length}
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span>Score {score}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerateQuiz}
            disabled={isGenerating}
            title="Generate a new AI practice quiz set"
            aria-label="Generate a new AI practice quiz set"
            className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-2.5 sm:px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'New Set'}</span>
          </button>
        </div>
      </div>

      {/* Quiz Progress Bar */}
      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="p-4 sm:p-6">
        {generateError && (
          <div role="alert" className="mb-4 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/40 px-3.5 py-2.5 rounded-xl">
            {generateError}
          </div>
        )}

        {showResults ? (
          <div className="text-center py-4 sm:py-6 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4">
              <Award className="w-7 h-7" />
            </div>

            <h3 className={`font-display font-bold text-lg sm:text-xl ${summary.color} mb-1.5`}>
              {summary.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {summary.text}
            </p>

            <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 flex justify-around mb-6 font-mono text-xs tabular-nums">
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">Correct Answers</div>
                <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {score} / {activeQuestions.length}
                </div>
              </div>
              <div className="border-r border-slate-200 dark:border-slate-800" />
              <div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">Success Rate</div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {scorePercent}%
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
              <button
                type="button"
                onClick={handleGenerateQuiz}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Generating...' : 'Try New AI Set'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5" key={currentQuestion.id || currentQuestionIdx}>
            <div className="p-4 sm:p-5 bg-slate-50/90 dark:bg-slate-950/70 rounded-xl border border-slate-200/70 dark:border-slate-800/70 font-medium text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              <Latex text={currentQuestion.questionText} />
            </div>

            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                const showSuccess = isAnswered && isCorrect;
                const showFailure = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full min-h-[48px] flex items-center justify-between p-3.5 sm:p-4 rounded-xl text-left border text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                      isAnswered
                        ? showSuccess
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/25 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 cursor-default'
                          : showFailure
                            ? 'bg-rose-50/90 dark:bg-rose-950/25 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200 cursor-default'
                            : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 cursor-default'
                        : 'bg-white dark:bg-slate-950/50 hover:bg-slate-50 dark:hover:bg-slate-800/70 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full pr-3 min-w-0">
                      <span
                        className={`shrink-0 font-mono text-xs uppercase w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-colors ${
                          showSuccess
                            ? 'bg-emerald-600 text-white'
                            : showFailure
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden">
                        <Latex text={option} />
                      </div>
                    </div>
                    {isAnswered && (
                      <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold">
                        {isCorrect && (
                          <>
                            <span className="hidden sm:inline text-emerald-700 dark:text-emerald-300">Correct</span>
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </>
                        )}
                        {isSelected && !isCorrect && (
                          <>
                            <span className="hidden sm:inline text-rose-700 dark:text-rose-300">Incorrect</span>
                            <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          </>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/15 border border-amber-200/70 dark:border-amber-900/40 rounded-xl space-y-1.5 overflow-x-auto">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>Mathematical Explanation</span>
                </div>
                <div className="text-xs sm:text-sm text-amber-950/90 dark:text-amber-200/90 leading-relaxed max-w-full">
                  <Latex text={currentQuestion.explanation} />
                </div>
              </div>
            )}

            {isAnswered && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                >
                  <span>
                    {currentQuestionIdx < activeQuestions.length - 1 ? 'Next Question' : 'View Results'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
