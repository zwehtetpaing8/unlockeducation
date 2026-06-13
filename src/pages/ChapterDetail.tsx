import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumService } from '../services/curriculum';
import { Chapter, Lesson } from '../types';
import { motion } from 'motion/react';
import { 
  ArrowLeft, BookOpen, ChevronRight, 
  PlayCircle, FileText, CheckCircle, CheckCircle2, Bookmark, 
  Clock, Award, LayoutList, Loader2
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { cn } from '../lib/utils';

const ChapterDetail: React.FC = () => {
  const { chapterId, level } = useParams<{ chapterId: string, level: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { isCompleted, isBookmarked } = useProgress();

  useEffect(() => {
    if (chapterId) {
      fetchChapterData(chapterId);
    }
  }, [chapterId]);

  const fetchChapterData = async (id: string) => {
    setLoading(true);
    try {
      const [chapterData, lessonData] = await Promise.all([
        curriculumService.getChapterById(id),
        curriculumService.getLessonsByChapter(id)
      ]);
      
      setChapter(chapterData);
      setLessons(lessonData);
    } catch (error) {
      console.error('Error fetching chapter data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (!chapter) return <div className="p-8 text-center bg-white rounded-3xl border border-slate-100">Chapter not found</div>;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-12">
        {/* Chapter Header */}
      <header className="space-y-8">
        <Link 
          to={`/grade/${level}`} 
          className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Grade {level}
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-3xl shrink-0 shadow-lg">
              {chapter.chapter_number}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 uppercase">
              {chapter.title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
            {chapter.description}
          </p>
        </div>
      </header>

      {/* Lessons List */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
           <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
             <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
             Lesson Index
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {lessons.length === 0 ? (
            <div className="md:col-span-2 text-center py-20 bg-white border-2 border-dashed border-slate-100 rounded-3xl">
              <BookOpen className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No lessons available yet.</p>
            </div>
          ) : (
            lessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={`/grade/${level}/chapter/${chapterId}/lesson/${lesson.id}`}
                  className="group flex flex-col p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-200 hover:shadow-xl transition-all h-full active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 shadow-sm",
                      lesson.type === 'theory' ? "bg-blue-50 text-blue-600" :
                      lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600" :
                      "bg-purple-50 text-purple-600"
                    )}>
                      {lesson.type === 'theory' ? <PlayCircle size={24} /> : 
                       lesson.type === 'exercise' ? <FileText size={24} /> : 
                       <Award size={24} />}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border text-center shrink-0",
                         lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
                         lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         "bg-purple-50 text-purple-600 border-purple-100"
                       )}>{lesson.type}</span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 shrink-0">Module {idx + 1}</span>
                       {isCompleted(lesson.id) && (
                         <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                           <CheckCircle2 size={10} strokeWidth={3} />
                           Completed
                         </span>
                       )}
                       {isBookmarked(lesson.id) && (
                         <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-md shrink-0">
                           <Bookmark size={10} fill="currentColor" />
                           Saved
                         </span>
                       )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight">{lesson.title}</h3>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                     <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">
                       {isCompleted(lesson.id) ? "CONTINUE MODULE" : "START STUDY"}
                     </span>
                     <div>
                       {isCompleted(lesson.id) ? (
                         <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                           <CheckCircle className="w-4 h-4" strokeWidth={3} />
                         </div>
                       ) : (
                         <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-250 text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all flex items-center justify-center">
                           <ChevronRight className="w-4.5 h-4.5" />
                         </div>
                       )}
                     </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  </div>
  );
};

export default ChapterDetail;
