const fs = require('fs');

const component = `import { useState, useEffect } from 'react';
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
  }, [chapterId, questions]);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chapterTitle,
          content: chapterContent
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }
      
      const newQuestions = await response.json();
      if (newQuestions && newQuestions.length > 0) {
        setActiveQuestions(newQuestions);
        setCurrentQuestionIdx(0);
        setSelectedAnswerIdx(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
      } else {
        throw new Error("Received empty quiz");
      }
    } catch (e) {
      console.error(e);
      setGenerateError("Failed to generate practice quiz. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!activeQuestions || activeQuestions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-2">
          <Sparkles className="w-8 h-8" />
        </div>
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-300">No static practice quiz available.</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Generate a dynamic multiple-choice quiz based on the chapter content to test your understanding.</p>
        </div>
        
        {generateError && (
          <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-3 py-2 rounded-md">{generateError}</p>
        )}
        
        <button 
          onClick={handleGenerateQuiz}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Quiz with AI
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

  const getPerformanceSummary = (scorePercent: number) => {
    if (scorePercent === 100) return { title: "Outstanding! Perfect Score 🏆", text: "You have fully mastered this chapter's mathematical concepts. Excellent job!", color: "text-emerald-600" };
    if (scorePercent >= 70) return { title: "Great Work! 👍", text: "You have a solid understanding of the concepts. Just a bit more practice to reach perfection!", color: "text-indigo-600" };
    return { title: "Keep Practicing! 💪", text: "We recommend reviewing the notes and key formulas of this chapter, then trying again.", color: "text-slate-600" };
  };

  const scorePercent = Math.round((score / activeQuestions.length) * 100);
  const summary = getPerformanceSummary(scorePercent);

  return (
    <div id="practice-quiz" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden transition-all duration-300">
      <div className="bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-950 dark:to-slate-900/20 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="font-display font-medium text-slate-800 dark:text-slate-200 text-sm">
            Practice Chapter Quiz
          </h4>
          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px] md:max-w-none">
            {chapterTitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!showResults && (
            <div className="text-[10px] font-mono px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-bold">
              Question {currentQuestionIdx + 1} of {activeQuestions.length}
            </div>
          )}
          
          <button 
            onClick={handleGenerateQuiz}
            disabled={isGenerating}
            title="Generate a new set of questions"
            className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={\`w-3.5 h-3.5 \${isGenerating ? 'animate-spin' : ''}\`} />
          </button>
        </div>
      </div>

      <div className="p-6">
        {showResults ? (
          <div className="text-center py-6 max-w-md mx-auto animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h3 className={\`font-display font-bold text-lg \${summary.color} mb-1\`}>
              {summary.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {summary.text}
            </p>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-around mb-6 font-mono text-xs">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Correct Answers</div>
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  {score} / {activeQuestions.length}
                </div>
              </div>
              <div className="border-r border-slate-200 dark:border-slate-800" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Success Rate</div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {scorePercent}%
                </div>
              </div>
            </div>

            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in" key={currentQuestion.id || currentQuestionIdx}>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/60 font-medium text-slate-800 dark:text-slate-200">
              <Latex text={currentQuestion.questionText} />
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                const isCorrect = idx === currentQuestion.correctAnswerIndex;
                const showSuccess = isAnswered && isCorrect;
                const showFailure = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={\`w-full flex items-center justify-between p-4 rounded-xl text-left border text-xs font-medium transition-all \${
                      isAnswered
                        ? showSuccess
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                          : showFailure
                            ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 text-rose-800 dark:text-rose-300'
                            : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800 text-slate-400'
                        : 'bg-white dark:bg-slate-950/50 hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }\`}
                  >
                    <div className="flex items-center gap-3 w-full pr-4">
                      <span className="shrink-0 font-mono text-[10px] uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 w-5 h-5 rounded flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 overflow-x-auto overflow-y-hidden">
                        <Latex text={option} />
                      </div>
                    </div>
                    {isAnswered && (
                      <div className="shrink-0">
                        {isCorrect && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                        {isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-4 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-xl space-y-2 animate-fade-in overflow-x-auto">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400">
                  <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                  <span>Mathematical Explanation:</span>
                </div>
                <div className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed max-w-full">
                  <Latex text={currentQuestion.explanation} />
                </div>
              </div>
            )}

            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition"
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
`;

fs.writeFileSync('src/components/PracticeQuiz.tsx', component);
