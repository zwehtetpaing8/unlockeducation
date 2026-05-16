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
    <div className="min-h-screen">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header Section */}
          <header className="space-y-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-black text-neutral-400 hover:text-blue-600 uppercase tracking-widest transition-all group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="bg-blue-600 p-4 rounded-[1.5rem] text-white shadow-2xl shadow-blue-600/30">
                  <Sparkles size={28} />
                </div>
                <h1 className="text-2xl md:text-7xl font-black tracking-tighter text-neutral-900 uppercase leading-none">
                  Grade {level}
                </h1>
              </div>
              <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed font-medium">
                Comprehensive curriculum for Grade {level} mathematics. 
                Focus on theory, practical examples, and matriculation prep.
              </p>
            </div>

            {/* Quick Stats/Filter */}
            <div className="flex flex-wrap gap-3">
              <div className="px-5 py-2.5 bg-white border border-neutral-100 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2 shadow-sm">
                <BookOpen size={14} className="text-blue-500" />
                {chapters.length} Chapters
              </div>
              <div className="px-5 py-2.5 bg-white border border-neutral-100 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2 shadow-sm">
                <Target size={14} className="text-emerald-500" />
                Updated 2024
              </div>
            </div>
          </header>

          {/* Chapters List */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 flex items-center gap-3">
                <LayoutList className="text-blue-600" />
                Chapter List
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {chapters.length === 0 ? (
                <div className="bg-white/40 backdrop-blur-md border border-dashed border-neutral-200 rounded-[3rem] p-16 text-center">
                  <BookOpen className="mx-auto text-neutral-200 mb-6" size={64} />
                  <h3 className="text-2xl font-black mb-2 text-neutral-400">Curriculum Loading...</h3>
                  <p className="text-neutral-400 max-w-sm mx-auto leading-relaxed">We're currently uploading high-quality lesson materials for this grade. Check back soon!</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {chapters.map((chapter, idx) => (
                    <motion.div
                      key={chapter.id}
                      id={`ch-${chapter.chapter_number}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link 
                        to={`/grade/${level}/chapter/${chapter.id}`}
                        className="group block bg-white/60 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all hover:border-blue-300 relative overflow-hidden"
                      >
                        <div className="flex items-center gap-6 md:gap-10 relative z-10">
                          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center font-black text-2xl md:text-3xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm text-neutral-900">
                            {chapter.chapter_number}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-2 mb-2">
                               <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Essential</span>
                               <span className="w-1 h-1 rounded-full bg-neutral-200" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Chapter {chapter.chapter_number}</span>
                            </div>
                            <h3 className="text-lg md:text-3xl font-black mb-2 group-hover:text-blue-600 transition-colors leading-tight text-neutral-900 truncate">{chapter.title}</h3>
                            <p className="text-neutral-500 leading-relaxed font-medium line-clamp-1 max-w-2xl text-sm md:text-base">{chapter.description}</p>
                          </div>
                          <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-neutral-50 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </section>

          {level === '12' && chapters.length > 0 && (
            <section className="bg-neutral-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden mt-20 group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-16">
                <div className="max-w-xl text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                     <Award size={14} /> Peak Performance
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1]">Elite Matric <br />Preparation</h2>
                  <p className="text-neutral-400 text-xl mb-12 leading-relaxed">Master the Grade 12 final exam with targeted mock tests, past paper analytics, and expert-curated solution sets.</p>
                  <Link to="/past-papers" className="bg-white text-neutral-950 px-10 py-5 rounded-[2rem] font-black hover:bg-blue-600 hover:text-white transition-all inline-flex items-center gap-4 shadow-2xl hover:-translate-y-1">
                    Enter Exam Center
                    <ArrowRight size={24} />
                  </Link>
                </div>
                <div className="shrink-0 relative hidden lg:block">
                   <div className="w-64 h-64 border-4 border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                      <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center">
                         <div className="w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20" />
                      </div>
                   </div>
                   <GraduationCap size={80} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent)] transition-opacity group-hover:opacity-50" />
            </section>
          )}
        </div>

        {/* Right Sidebar - Sticky on Desktop */}
        <div className="hidden lg:block lg:col-span-4 transition-all">
          <div className="sticky top-24 space-y-8">
            {/* Learning Goals */}
            <div className="bg-blue-600/90 backdrop-blur-2xl rounded-[2.5rem] p-10 text-white shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Target size={120} />
              </div>
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter relative z-10">Goals</h3>
              <div className="space-y-8 relative z-10 text-left">
                {[
                  { icon: BookOpen, title: "Theory Mastery", desc: "Understand all fundamental concepts." },
                  { icon: Target, title: "Problem Solving", desc: "Apply formulas to complex scenarios." },
                  { icon: Award, title: "Exam Ready", desc: "Master previous test patterns." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide mb-1 text-white">{item.title}</h4>
                      <p className="text-xs text-blue-100 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeDetail;
