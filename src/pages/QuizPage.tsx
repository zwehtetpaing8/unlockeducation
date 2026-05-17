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

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (!quiz || questions.length === 0) return <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8">Quiz content not found.</div>;

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto py-4 md:py-12 pb-32">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 md:px-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                  <Brain size={24} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">{quiz.title}</h2>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-sm border transition-all",
                timeLeft < 60 ? "bg-red-50 text-red-600 border-red-100 animate-pulse" : "bg-white text-slate-900 border-slate-100"
              )}>
                <Timer size={18} className={timeLeft < 60 ? "text-red-500" : "text-blue-600"} />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 md:px-0">
               <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
               </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border border-slate-100 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Brain size={120} />
              </div>
              
              <div className="relative z-10 text-left">
                <div className="markdown-body mb-10">
                   <ReactMarkdown 
                     remarkPlugins={[remarkMath]}
                     rehypePlugins={[rehypeKatex]}
                     components={{
                        p: ({children}) => <p className="text-xl md:text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight break-words">{children}</p>
                     }}
                   >
                     {currentQuestion.question_text}
                   </ReactMarkdown>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={cn(
                        "w-full p-6 rounded-2xl border text-left font-black transition-all flex items-center justify-between group/opt active:scale-[0.99] uppercase tracking-tight",
                        selectedOption === i 
                          ? "border-blue-600 bg-blue-50/50 text-blue-600 ring-4 ring-blue-600/5 shadow-lg shadow-blue-600/10" 
                          : "border-slate-100 bg-slate-50/30 hover:border-blue-200 hover:bg-slate-50"
                      )}
                    >
                      <span className="flex-1">
                        <ReactMarkdown 
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {option}
                        </ReactMarkdown>
                      </span>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4",
                        selectedOption === i ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 group-hover/opt:border-blue-300"
                      )}>
                        {selectedOption === i && <CheckCircle2 size={14} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 p-4 rounded-3xl border border-slate-100 gap-4">
               <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors px-4 py-2"
               >
                 <ChevronLeft size={16} /> Exit Quiz
               </button>
               <button
                 disabled={selectedOption === null}
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
