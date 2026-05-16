import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, BookOpen, CheckCircle2, 
  PlayCircle, Award, Target, Zap
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
    <div className="space-y-20 md:space-y-32 pb-10">
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-16">
        {/* Background blobs for depth */}
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-8 mx-auto lg:mx-0">
              <PlayCircle size={16} />
              <span>Made for Myanmar Students</span>
            </div>
            <h1 className="text-3xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-neutral-900 uppercase">
              Master <br />
              <span className="text-blue-600">Curriculum</span>
            </h1>
            <p className="text-xl text-neutral-500 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              A premium learning experience for Grade 10-12. 
              Step-by-step theory, interactive examples, 
              and matriculation mastery.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link 
                to="/grade/12"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black text-center shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group whitespace-nowrap"
              >
                START LEARNING
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/past-papers"
                className="bg-white border-2 border-neutral-100 hover:border-blue-200 px-10 py-5 rounded-[2rem] font-black text-center transition-all shadow-md"
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
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-[3.5rem] bg-white/60 backdrop-blur-3xl p-4 border border-white shadow-2xl">
              {/* Educational Card UI simulation */}
              <div className="h-full w-full rounded-[2.5rem] bg-white/40 backdrop-blur-md p-8 flex flex-col justify-between border border-white/20">
                <div>
                   <div className="flex justify-between items-start mb-12">
                     <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center">
                       <BookOpen size={24} className="text-white" />
                     </div>
                     <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                       Chapter 01
                     </div>
                   </div>
                   <div className="space-y-6">
                     <div className="h-4 w-32 bg-neutral-100 rounded-full" />
                     <h3 className="text-4xl font-black tracking-tighter text-neutral-900 uppercase">Complex Numbers</h3>
                     <div className="space-y-2">
                       <div className="h-2 w-full bg-neutral-100/50 rounded-full" />
                       <div className="h-2 w-[80%] bg-neutral-100/50 rounded-full" />
                     </div>
                   </div>
                </div>
                <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Ready to Learn</span>
                    <Target size={20} />
                  </div>
                  <p className="text-xl font-black">24 Lessons Complete</p>
                </div>
              </div>
            </div>
            
            {/* Floating stats card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-0 bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 transition-colors">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tighter leading-none mb-1 text-neutral-900">1,000+</p>
                  <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">SOLVED PROBLEMS</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grades Overview */}
      <section className="px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 text-neutral-900 uppercase">Level UP</h2>
            <p className="text-neutral-500 text-lg font-medium">
              Select your current grade level to begin your journey. 
              Our curriculum is updated for 2024.
            </p>
          </div>
          <Link to="/grade/12" className="hidden md:flex items-center gap-2 font-black text-blue-600 uppercase tracking-widest text-sm hover:gap-4 transition-all">
            See all Grade 12 <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {grades.map((grade, idx) => (
            <motion.div
              key={grade.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/grade/${grade.level}`}
                className={cn(
                  "group block p-8 md:p-10 border rounded-[2.5rem] h-full transition-all hover:shadow-2xl hover:border-blue-300",
                  "bg-white/60 backdrop-blur-xl border-white overflow-hidden relative shadow-sm"
                )}
              >
                {/* Background Decor */}
                <div className={cn("absolute -top-12 -right-12 w-40 h-40 opacity-10 group-hover:opacity-20 transition-opacity rounded-full", grade.color.split(' ')[0])} />
                
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110", grade.color)}>
                  <span className="text-3xl font-black">{grade.level}</span>
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter group-hover:text-blue-600 transition-colors uppercase leading-none text-neutral-900 text-left">{grade.title}</h3>
                <p className="text-neutral-500 mb-10 text-lg leading-relaxed font-medium text-left">
                  {grade.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">Curriculum</span>
                    <span className="text-sm font-black text-neutral-900">
                      {grade.chapters} Full Chapters
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-neutral-900 border border-white/20 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative shadow-2xl">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="text-left">
            <div className="bg-blue-600 h-1 w-12 rounded-full mb-8" />
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-black tracking-tighter mb-12 uppercase leading-[0.9]">
              Built for <br />
              <span className="text-blue-500">Excellence</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {features.map((feature, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 24 })}
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2">{feature.title}</h4>
                  <p className="text-neutral-400 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 flex items-center justify-center shadow-3xl overflow-hidden">
              <div className="text-center group cursor-pointer relative z-10">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-xl shadow-blue-600/40">
                  <PlayCircle size={40} className="ml-1" />
                </div>
                <p className="font-black uppercase tracking-[0.3em] text-[10px] text-blue-400">Watch Preview</p>
              </div>
            </div>
            {/* Float badge */}
            <div className="absolute -top-6 -right-6 bg-white px-6 py-4 rounded-3xl shadow-2xl hidden md:block">
              <p className="text-neutral-900 font-black text-2xl tracking-tighter leading-none">Matriculation</p>
              <p className="text-neutral-500 font-bold text-[10px] uppercase">Special Coverage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
