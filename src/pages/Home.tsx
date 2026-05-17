import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, BookOpen, CheckCircle2, 
  PlayCircle, Award, Target, Zap, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  const grades = [
    { 
      level: 10, 
      title: 'Grade 10', 
      chapters: 10, 
      description: 'Foundational concepts in Algebra, Geometry, and Trigonometry.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    { 
      level: 11, 
      title: 'Grade 11', 
      chapters: 11, 
      description: 'Advanced functions, Coordinate Geometry, and Calculus basics.',
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    { 
      level: 12, 
      title: 'Grade 12', 
      chapters: 11, 
      description: 'Matriculation exam focus with Complex Numbers, Integrals, and more.',
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    }
  ];

  const features = [
    { icon: <BookOpen />, title: 'Chapter-wise Study', desc: 'Detailed lessons with formulas and examples.' },
    { icon: <Zap />, title: 'Exam Mastery', desc: 'Practice with mock exams and past matriculation papers.' },
    { icon: <Target />, title: 'Interactive Quizzes', desc: 'Test your knowledge with instant feedback MCQs.' },
    { icon: <Award />, title: 'Progress Tracking', desc: 'Stay motivated by tracking your learning journey.' },
  ];

  return (
    <div className="space-y-24 md:space-y-40 pb-20">
      {/* Hero Section */}
      <section className="relative pt-4 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest mx-auto lg:mx-0">
              <Sparkles size={14} />
              <span>Made for Myanmar Students</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-slate-900 uppercase">
              Unlock <br />
              <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">Education</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              A world-class mathematics learning platform designed specifically for the Myanmar curriculum. 
              Interactive lessons, matriculation mastery, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link 
                to="/grade/12"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-center shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group active:scale-95 btn-premium"
              >
                START LEARNING
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/past-papers"
                className="bg-white border border-slate-200 hover:border-blue-200 px-10 py-5 rounded-2xl font-black text-center transition-all shadow-sm active:scale-95 btn-premium"
              >
                MATRICULATION
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-[3rem] bg-white border border-slate-100 shadow-2xl p-6 overflow-hidden">
               {/* UI Mockup Content */}
               <div className="h-full w-full rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-8">
                     <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
                           <BookOpen size={28} className="text-white" />
                        </div>
                        <div className="bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-100">
                           Module 01
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-3 w-24 bg-blue-100 rounded-full" />
                        <h3 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Complex Numbers</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">Fundamental concepts and the imaginary unit $i$ explanation...</p>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <PlayCircle size={24} />
                     </div>
                     <div className="flex-1">
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full w-2/3 bg-blue-600" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mt-2">65% Chapter Progress</p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grades Overview */}
      <section className="space-y-16">
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">Learning Path</h2>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
            Structured curriculum designed by expert educators. Select your grade to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.map((grade, idx) => (
            <motion.div
              key={grade.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={`/grade/${grade.level}`}
                className="group relative block p-8 bg-white border border-slate-100 rounded-[2.5rem] h-full transition-all hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
              >
                <div className={cn(
                  "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 font-black text-3xl",
                  grade.color
                )}>
                  {grade.level}
                </div>
                <div className="space-y-4 text-left">
                  <h3 className="text-2xl font-black text-slate-900 uppercase group-hover:text-blue-600 transition-colors">{grade.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{grade.description}</p>
                </div>
                <div className="mt-12 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{grade.chapters} Full Chapters</span>
                  <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features - Premium Dark Bento */}
      <section className="bg-slate-900 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 text-white overflow-hidden relative border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent)]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
          <div className="space-y-12 text-left">
             <div className="space-y-6">
                <h2 className="text-4xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">
                  Built for <br />
                  <span className="text-blue-500">Excellence</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  We've distilled decades of textbook excellence into a modern, mobile-friendly platform.
                </p>
             </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {features.map((feature, i) => (
                <div key={i} className="group space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-black/20">
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 22 })}
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="aspect-[16/10] bg-slate-800/50 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
              <div className="text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all shadow-[0_0_50px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer">
                  <PlayCircle size={44} className="ml-1" />
                </div>
                <p className="font-black uppercase tracking-[0.3em] text-[10px] text-blue-400">Watch Intro</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
            </div>
            {/* Small float card */}
            <motion.div 
               animate={{ y: [0, -12, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-3xl shadow-2xl text-left hidden md:block border border-slate-100"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                     <Target size={24} />
                  </div>
                  <div>
                     <p className="text-xl font-black text-slate-900 tracking-tighter leading-none mb-1">10k+ Solved</p>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Matriculation DB</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
