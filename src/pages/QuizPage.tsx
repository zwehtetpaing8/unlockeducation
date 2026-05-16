import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Quiz, Question } from '../types';
import { 
  Timer, CheckCircle2, XCircle, 
  ArrowRight, Brain, Trophy,
  ChevronLeft, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
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
    const { data: quizData } = await supabase.from('quizzes').select('*').eq('id', quizId).single();
    const { data: qData } = await supabase.from('questions').select('*').eq('quiz_id', quizId);
    
    if (quizData) {
      setQuiz(quizData);
      setTimeLeft(quizData.time_limit_minutes * 60);
    }
    if (qData) setQuestions(qData);
    setLoading(false);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentIdx].correct_option_index) {
      setScore(prev => prev + 1);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;
  if (!quiz || questions.length === 0) return <div className="text-center py-20">Quiz content not found.</div>;

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Brain size={20} />
                </div>
                <div>
                  <h2 className="font-bold">{quiz.title}</h2>
                  <p className="text-xs text-neutral-400">Question {currentIdx + 1} of {questions.length}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold",
                timeLeft < 60 ? "bg-red-50 text-red-600 animate-pulse" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              )}>
                <Timer size={18} />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 rounded-[2rem] shadow-sm">
              <h3 className="text-lg sm:text-2xl font-bold mb-8 leading-relaxed">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {currentQuestion.question_text}
                </ReactMarkdown>
              </h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={cn(
                      "w-full p-5 rounded-2xl border text-left font-medium transition-all flex items-center justify-between group",
                      selectedOption === i 
                        ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 ring-2 ring-blue-600/10" 
                        : "border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700"
                    )}
                  >
                    <span>
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {option}
                      </ReactMarkdown>
                    </span>
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      selectedOption === i ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-200 dark:border-neutral-700"
                    )}>
                      {selectedOption === i && <CheckCircle2 size={14} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
               <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-neutral-400 font-bold hover:text-neutral-600"
               >
                 <ChevronLeft size={18} /> Exit Quiz
               </button>
               <button
                 disabled={selectedOption === null}
                 onClick={handleNext}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center gap-2 disabled:opacity-50"
               >
                 {currentIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                 <ArrowRight size={20} />
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-12 rounded-[3rem] shadow-xl">
              <div className="w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-8">
                <Trophy size={48} />
              </div>
              <h2 className="text-4xl font-black mb-2">Quiz Completed!</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-8">Here is how you performed in {quiz.title}</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl">
                  <p className="text-3xl font-black text-blue-600">{score}/{questions.length}</p>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">Score</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl">
                  <p className="text-3xl font-black text-emerald-600">
                    {Math.round((score / questions.length) * 100)}%
                  </p>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">Accuracy</p>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all"
                >
                  Retry Quiz
                </button>
                <button 
                  onClick={() => navigate(-1)}
                  className="w-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold py-4 rounded-2xl transition-all"
                >
                  Return to Chapter
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
