import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumService } from '../services/curriculum';
import { Chapter } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, ChevronRight, Loader2, Sparkles, X, LayoutList, Target, Award, ArrowRight, GraduationCap } from 'lucide-react';

const GradeDetail: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="max-w-7xl mx-auto space-y-12 relative">
      {/* Mobile Floating Chapter Menu Button */}
      {chapters.length > 0 && (
        <div className="fixed bottom-24 right-6 z-40 lg:hidden">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            title="Chapter Menu"
          >
            <BookOpen size={24} />
          </button>
        </div>
      )}

      {/* Mobile Chapter Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed inset-x-0 bottom-0 bg-white dark:bg-neutral-900 rounded-t-[2.5rem] z-[70] p-8 lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">Chapter Menu</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {chapters.map((ch) => (
                  <a 
                    key={ch.id}
                    href={`#ch-${ch.chapter_number}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {ch.chapter_number}
                    </div>
                    <span className="font-bold text-sm">{ch.title}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar / Quick Menu (Sticky on Desktop) */}
        <aside className="lg:w-64 shrink-0 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-600 mb-2 transition-colors text-sm font-bold group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                <LayoutList size={12} className="text-blue-600" />
                Jump to Chapter
              </h4>
              <nav className="space-y-1">
                {chapters.map((ch) => (
                  <a 
                    key={ch.id}
                    href={`#ch-${ch.chapter_number}`}
                    className="block px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-all truncate font-medium"
                  >
                    {ch.chapter_number}. {ch.title}
                  </a>
                ))}
              </nav>
            </div>

            {level === '12' && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 dark:shadow-none">
                <Target size={24} className="mb-4 opacity-50" />
                <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">Matric Tip</p>
                <p className="text-sm font-bold leading-relaxed mb-4">
                  Master "Method of Integration" techniques early to breeze through Application chapters.
                </p>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white w-1/3" />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-10">
          <header className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
                <Sparkles size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">Grade {level} <br className="md:hidden" /> Mathematics</h1>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl leading-relaxed font-medium">
              Explore the full curriculum for Grade {level}. Each chapter includes theory,
              worked examples, practice exercises, and quizzes.
            </p>
          </header>

          {chapters.length === 0 ? (
            <div className="bg-neutral-50 dark:bg-neutral-900 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-[3rem] p-16 text-center">
              <BookOpen className="mx-auto text-neutral-300 mb-6" size={64} />
              <h3 className="text-2xl font-black mb-2">Curriculum Loading...</h3>
              <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">We're currently uploading high-quality lesson materials for this grade. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {chapters.map((chapter, idx) => (
                <motion.div
                  key={chapter.id}
                  id={`ch-${chapter.chapter_number}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="scroll-mt-24"
                >
                  <Link 
                    to={`/grade/${level}/chapter/${chapter.id}`}
                    className="group block bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all hover:border-blue-300 dark:hover:border-blue-900 overflow-hidden relative"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                      <div className="w-20 h-20 shrink-0 rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center font-black text-3xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                        {chapter.chapter_number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Core Curriculum</span>
                           <span className="w-1 h-1 rounded-full bg-neutral-200" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Section {chapter.chapter_number}</span>
                        </div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600 transition-colors leading-tight">{chapter.title}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium line-clamp-2 max-w-2xl">{chapter.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/20 dark:bg-blue-900/5 rounded-bl-full -translate-y-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {level === '12' && (
            <section className="bg-neutral-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden mt-20 group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-16">
                <div className="max-w-xl">
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
      </div>
    </div>
  );
};

export default GradeDetail;
