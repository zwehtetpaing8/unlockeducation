import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Quiz, Question } from '../types';
import { 
  Timer, CheckCircle2, XCircle, 
  ArrowRight, Brain, Trophy,
  ChevronLeft, Loader2, Lightbulb, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { cn } from '../lib/utils';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  // Dynamic feedback and score tracking states
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [answersHistory, setAnswersHistory] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    if (quiz && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quiz, showResults, timeLeft]);

  const fetchQuizData = async () => {
    try {
      let quizData: any = null;
      let qData: any[] = [];

      const hasKeys = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (hasKeys) {
        try {
          const { data } = await supabase.from('quizzes').select('*').eq('id', quizId).single();
          const { data: qs } = await supabase.from('questions').select('*').eq('quiz_id', quizId);
          quizData = data;
          qData = qs || [];
        } catch (err) {
          console.warn('Supabase query error, falling back to mock quiz:', err);
        }
      }

      if (!quizData || qData.length === 0) {
        // High quality fallback mock quiz for Chapter 1
        quizData = {
          id: quizId || 'mock-quiz-1',
          chapter_id: 'chapter-c1-g12',
          title: 'Complex Numbers Diagnostic Quiz (ကိန်းထွေများ ဆန်းစစ်ချက်)',
          description: 'A comprehensive quiz testing your understanding of imaginary units, powers of i, and basic complex number calculations.',
          time_limit_minutes: 15
        };

        qData = [
          {
            id: 'q1',
            quiz_id: quizData.id,
            question_text: 'What is the value of the exponent calculation: $i^{35}$ ?',
            options: [
              'i',
              '-1',
              '-i',
              '1'
            ],
            correct_option_index: 2,
            explanation: 'Divide power index 35 by 4: $35 = 4 \\times 8 + 3$. The remainder is 3. Therefore, $i^{35} = i^3 = -i$.'
          },
          {
            id: 'q2',
            quiz_id: quizData.id,
            question_text: 'If $z = 4 - 3i$, find its complex conjugate $\\bar{z}$.',
            options: [
              '$-4 + 3i$',
              '$4 + 3i$',
              '$-4 - 3i$',
              '$4 - 3i$'
            ],
            correct_option_index: 1,
            explanation: 'To find the conjugate of a complex number $z = a + bi$, change the sign of the imaginary part: $\\bar{z} = a - bi$. Thus, conjugate of $4 - 3i$ is $4 + 3i$.'
          },
          {
            id: 'q3',
            quiz_id: quizData.id,
            question_text: 'Evaluate: $(1 + 2i)(3 - i)$',
            options: [
              '$5 + 5i$',
              '$1 + 5i$',
              '$3 - 2i$',
              '$5 - 5i$'
            ],
            correct_option_index: 0,
            explanation: 'Expand the term: $(1 + 2i)(3 - i) = 1(3) - 1(i) + 2i(3) - 2i(i) = 3 - i + 6i - 2i^2 = 3 + 5i - 2(-1) = 3 + 5i + 2 = 5 + 5i$.'
          }
        ];
      }

      setQuiz(quizData);
      setTimeLeft(quizData.time_limit_minutes * 60);
      setQuestions(qData);
    } catch (error) {
      console.error('Error in fetchQuizData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const correctIdx = questions[currentIdx].correct_option_index;
    const isCorrect = optionIndex === correctIdx;

    setAnswersHistory(prev => ({
      ...prev,
      [currentIdx]: { selected: optionIndex, isCorrect }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (!quiz || questions.length === 0) return <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8">Quiz content not found.</div>;

  const currentQuestion = questions[currentIdx];

  // Dynamic calculations for the SCORE METER
  const answeredCount = Object.keys(answersHistory).length;
  const currentAccuracy = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;

  let masteryLabel = "DIAGNOSTIC UNLOCKED ⏱️";
  if (answeredCount > 0) {
    if (currentAccuracy >= 90) masteryLabel = "GRANDMASTER 🏆";
    else if (currentAccuracy >= 75) masteryLabel = "EXPERT 🌟";
    else if (currentAccuracy >= 50) masteryLabel = "SCHOLAR 🎓";
    else masteryLabel = "LEARNER ✏️";
  }

  return (
    <div className="max-w-screen-2xl mx-auto py-4 md:py-12 pb-12 px-0 sm:px-4">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 sm:px-8 md:px-12">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shrink-0">
                  <Brain size={24} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">{quiz.title}</h2>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Assessment • Question {currentIdx + 1} of {questions.length}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-sm border transition-all justify-center sm:justify-start self-start sm:self-auto",
                timeLeft < 60 ? "bg-red-50 text-red-600 border-red-100 animate-pulse" : "bg-white text-slate-900 border-slate-100"
              )}>
                <Timer size={18} className={timeLeft < 60 ? "text-red-500" : "text-blue-600"} />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Dynamic Score Meter Panel */}
            <div className="px-4 sm:px-8 md:px-12">
              <div className="bg-slate-55/40 border border-slate-100 bg-slate-50/50 rounded-[2rem] p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-6">
                  {/* Circular Accuracy Indicator */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex items-center justify-center bg-white border border-slate-150 rounded-2xl shadow-xs shrink-0">
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className={cn(
                            answeredCount > 0
                              ? currentAccuracy >= 75 ? "text-emerald-500" : currentAccuracy >= 50 ? "text-amber-500" : "text-rose-500"
                              : "text-blue-500"
                          )}
                          strokeWidth="3"
                          strokeDasharray={`${answeredCount > 0 ? currentAccuracy : 0}, 100`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: `${answeredCount > 0 ? currentAccuracy : 0}, 100` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </svg>
                      <span className="relative text-sm font-black font-mono text-slate-800">
                        {answeredCount > 0 ? `${currentAccuracy}%` : "—"}
                      </span>
                    </div>

                    <div className="text-left space-y-0.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">LIVE PERFORMANCE METER</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black text-slate-900 font-mono">
                          Correct: {score} of {questions.length}
                        </span>
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider font-mono",
                          answeredCount > 0
                            ? currentAccuracy >= 75 ? "bg-emerald-100 text-emerald-800" : currentAccuracy >= 50 ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                            : "bg-slate-100 text-slate-400"
                        )}>
                          {masteryLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mini tally tags */}
                  <div className="flex items-center gap-4 sm:border-l sm:border-slate-250/60 sm:pl-6 text-left">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">CORRECT</span>
                      <span className="text-xs font-black text-emerald-600 font-mono flex items-center gap-1.5">
                         <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs"></span>
                         {score}
                      </span>
                    </div>
                    <div className="space-y-0.5 border-l border-slate-150 pl-4">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">INCORRECT</span>
                      <span className="text-xs font-black text-rose-500 font-mono flex items-center gap-1.5">
                         <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs"></span>
                         {answeredCount - score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Path Map Questions Progression */}
                <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
                  {questions.map((_, idx) => {
                    const isCurrent = idx === currentIdx;
                    const history = answersHistory[idx];
                    const isSolved = history !== undefined;
                    const isCorrect = history?.isCorrect;

                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                          "w-8 h-8 rounded-xl border flex flex-col items-center justify-center text-[10px] font-black font-mono transition-all duration-300 relative transform-gpu shadow-xs",
                          isCurrent 
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-500/10" 
                            : isSolved 
                              ? isCorrect 
                                ? "bg-emerald-500 border-emerald-500 text-white" 
                                : "bg-rose-500 border-rose-500 text-white"
                              : "bg-white border-slate-200 text-slate-450 hover:border-slate-350"
                        )}
                      >
                        {isSolved ? (isCorrect ? "✓" : "✗") : idx + 1}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Basic progress bar fallback line */}
            <div className="px-4 sm:px-8 md:px-12">
               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-xs">
                  <motion.div 
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
               </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border-y md:border border-slate-100 px-4 py-12 sm:p-16 lg:p-20 md:rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-5 transition-opacity">
                 <Brain size={120} />
              </div>
              
              <div className="relative z-10 text-left max-w-5xl">
                <div className="markdown-body mb-8 md:mb-12">
                   <ReactMarkdown 
                     remarkPlugins={[remarkMath]}
                     rehypePlugins={[rehypeRaw, rehypeKatex]}
                     components={{
                        p: ({children}) => <p className="text-xl md:text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight break-words">{children}</p>
                     }}
                   >
                     {currentQuestion.question_text}
                   </ReactMarkdown>
                </div>

                {/* Instant Feedback Options Container */}
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, i) => {
                    const isCorrectIndex = i === currentQuestion.correct_option_index;
                    const isSelected = selectedOption === i;
                    let optionBgBorderClass = "";
                    let indicatorIcon = null;

                    if (isAnswered) {
                      if (isCorrectIndex) {
                        // Correct option
                        optionBgBorderClass = "border-emerald-500 bg-emerald-50/40 text-emerald-800 shadow-xs ring-1 ring-emerald-500/10";
                        indicatorIcon = <CheckCircle2 size={16} className="text-emerald-600" />;
                      } else if (isSelected) {
                        // Let users see their wrong selection highlighted red
                        optionBgBorderClass = "border-rose-500 bg-rose-50/40 text-rose-800 shadow-xs ring-1 ring-rose-500/10";
                        indicatorIcon = <XCircle size={16} className="text-rose-500" />;
                      } else {
                        // Dull other unselected wrong options
                        optionBgBorderClass = "border-slate-100 bg-slate-50/10 text-slate-400 opacity-50";
                        indicatorIcon = <div className="w-5 h-5 rounded-full border border-slate-200" />;
                      }
                    } else {
                      // High dynamic selection highlighting
                      if (isSelected) {
                        optionBgBorderClass = "border-blue-600 bg-blue-50/50 text-blue-600 ring-4 ring-blue-600/5 shadow-md shadow-blue-600/5";
                        indicatorIcon = <CheckCircle2 size={14} className="text-blue-650" />;
                      } else {
                        optionBgBorderClass = "border-slate-150 bg-slate-50/30 hover:border-blue-200 hover:bg-slate-50 text-slate-800";
                        indicatorIcon = <div className="w-5 h-5 rounded-full border border-slate-205 group-hover/opt:border-blue-300" />;
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(i)}
                        className={cn(
                          "w-full p-5 sm:p-6 rounded-2xl border text-left font-black transition-all flex items-center justify-between group/opt active:scale-[0.99] uppercase tracking-tight",
                          optionBgBorderClass,
                          isAnswered ? "cursor-default" : "cursor-pointer"
                        )}
                      >
                        <span className="flex-1">
                          <ReactMarkdown 
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeKatex]}
                          >
                            {option}
                          </ReactMarkdown>
                        </span>
                        <div className="shrink-0 ml-4">
                          {indicatorIcon}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Animated Explanation Drawer */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="mt-8 p-6 sm:p-8 bg-blue-50/30 border border-blue-100 rounded-3xl text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                        <Lightbulb size={64} className="text-blue-600" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1 bg-blue-500 rounded-lg text-white">
                          <Lightbulb size={13} />
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase font-mono">EXPLANATION • ရှင်းလင်းချက်</span>
                      </div>
                      
                      <div className="text-slate-700 text-sm md:text-base font-bold leading-relaxed markdown-body max-w-full">
                         <ReactMarkdown 
                           remarkPlugins={[remarkMath]}
                           rehypePlugins={[rehypeRaw, rehypeKatex]}
                         >
                           {currentQuestion.explanation}
                         </ReactMarkdown>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 p-4 rounded-3xl border border-slate-100 gap-4">
               <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors px-4 py-2"
               >
                 <ChevronLeft size={16} /> Exit Quiz
               </button>
               <button
                 disabled={!isAnswered}
                 onClick={handleNext}
                 className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 btn-premium whitespace-nowrap"
               >
                 {currentIdx === questions.length - 1 ? 'Finish Assessment' : 'Continue Step'}
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 px-4"
          >
            <div className="bg-white border border-slate-100 p-8 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent)]" />
               
              <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto mb-8 shadow-xl shadow-amber-500/10 active:rotate-12 transition-transform">
                <Trophy size={48} />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight text-slate-900 leading-[0.9]">Assessment <br /><span className="text-blue-600 font-black">Completed</span></h2>
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-12">Performance analysis for {quiz.title}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-12">
                <div className="bg-slate-50/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-sm flex flex-col items-center">
                  <p className="text-5xl font-black text-blue-600 tracking-tighter leading-none">{score}/{questions.length}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Total Correct</p>
                </div>
                <div className="bg-slate-50/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-sm flex flex-col items-center">
                  <p className="text-5xl font-black text-emerald-600 tracking-tighter leading-none">
                    {Math.round((score / questions.length) * 100)}%
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Accuracy Level</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 uppercase tracking-widest text-xs btn-premium"
                >
                  Retry Quiz
                </button>
                <button 
                  onClick={() => navigate(-1)}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-900/10 active:scale-95 uppercase tracking-widest text-xs"
                >
                  Continue Curriculum
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
