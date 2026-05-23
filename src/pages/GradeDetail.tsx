import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumService } from '../services/curriculum';
import { Chapter } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, ChevronRight, Loader2, Sparkles, LayoutList, Target, Award, ArrowRight, GraduationCap } from 'lucide-react';

const GradeDetail: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (level) {
      fetchChapters(level);
    }
  }, [level]);

  const fetchChapters = async (gradeId: string) => {
    setLoading(true);
    try {
      const data = await curriculumService.getChaptersByGrade(gradeId);
      setChapters(data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-neutral-500 animate-pulse">Loading curriculum...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header Section */}
          <header className="space-y-6 md:space-y-10">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Navigation
            </Link>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl md:rounded-3xl shrink-0 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                  <GraduationCap size={28} />
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 uppercase">
                  Grade {level}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
                Comprehensive curriculum for Grade {level}. 
                Theory, practical examples, and matriculation preparation.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 shadow-sm">
                <BookOpen size={14} className="text-blue-500" />
                {chapters.length} Chapters
              </div>
              <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 shadow-sm">
                <Target size={14} className="text-emerald-500" />
                Updated 2024
              </div>
            </div>
          </header>

          {/* Chapters List */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                Chapter Index
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {chapters.length === 0 ? (
                <div className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center border-dashed">
                  <BookOpen className="mx-auto text-slate-200 mb-6" size={64} />
                  <h3 className="text-xl font-bold text-slate-400">Curriculum Coming Soon</h3>
                  <p className="text-slate-400 mt-2">We are currently preparing high-quality materials.</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {chapters.map((chapter, idx) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link 
                        to={`/grade/${level}/chapter/${chapter.id}`}
                        className="group flex items-center gap-4 md:gap-8 p-4 md:p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 hover:shadow-xl transition-all relative overflow-hidden"
                      >
                        <div className="w-12 h-12 md:w-20 md:h-20 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-xl md:text-4xl group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-900">
                          {chapter.chapter_number}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                             <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Active</span>
                             <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Chapter {chapter.chapter_number}</span>
                          </div>
                          <h3 className="text-lg md:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate uppercase tracking-tight leading-tight">{chapter.title}</h3>
                          <p className="text-slate-500 font-medium text-sm md:text-base line-clamp-1">{chapter.description}</p>
                        </div>
                        <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <ChevronRight size={20} />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </section>

          {level === '12' && chapters.length > 0 && (
            <section className="bg-slate-950 rounded-[3rem] p-8 md:p-20 text-white relative overflow-hidden mt-12 group shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 space-y-10">
                <div className="space-y-6 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                     <Award size={14} /> Peak Performance
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black leading-[0.9] uppercase tracking-tight">Elite Matric <br />Preparation</h2>
                  <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed italic border-l-2 border-slate-800 pl-6">"Master the final exam with targeted mock tests and expert analytics."</p>
                </div>
                <Link to="/past-papers" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all inline-flex items-center gap-4 active:scale-95 btn-premium">
                  EXAM CENTER
                  <ArrowRight size={24} />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent)]" />
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-4 transition-all">
          <div className="sticky top-28 space-y-8">
            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-70">Curriculum Goals</h3>
               <div className="space-y-10">
                 {[
                   { icon: BookOpen, title: "Theory Mastery", desc: "Understand all fundamental concepts." },
                   { icon: Target, title: "Problem Solving", desc: "Apply formulas to complex scenarios." },
                   { icon: Award, title: "Exam Ready", desc: "Master previous test patterns." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                       <item.icon size={22} />
                     </div>
                     <div className="space-y-1">
                       <h4 className="font-black text-sm uppercase tracking-tight">{item.title}</h4>
                       <p className="text-xs text-blue-100 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default GradeDetail;
