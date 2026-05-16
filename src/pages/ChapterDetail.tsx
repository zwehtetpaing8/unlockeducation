import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { curriculumService } from '../services/curriculum';
import { Chapter, Lesson } from '../types';
import { motion } from 'motion/react';
import { 
  ArrowLeft, BookOpen, ChevronRight, 
  PlayCircle, FileText, CheckCircle, 
  Clock, Award, LayoutList
} from 'lucide-react';
import { cn } from '../lib/utils';

const ChapterDetail: React.FC = () => {
  const { chapterId, level } = useParams<{ chapterId: string, level: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="flex justify-center py-20"><Clock className="animate-spin" /></div>;
  if (!chapter) return <div>Chapter not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <Link 
        to={`/grade/${level}`}
        className="inline-flex items-center gap-3 text-sm font-black text-neutral-400 hover:text-blue-600 transition-all group uppercase tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Curriculum
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Chapter Info */}
        <div className="lg:col-span-4 translate-y-0">
          <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-10 border border-neutral-100 dark:border-neutral-800 shadow-xl sticky top-24">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-600/30 flex items-center justify-center text-white font-black text-4xl mb-8">
              {chapter.chapter_number}
            </div>
            <h1 className="text-3xl font-black mb-4 text-neutral-900 dark:text-neutral-50 tracking-tighter uppercase leading-none">{chapter.title}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed font-medium">
              {chapter.description}
            </p>

            <div className="space-y-4">
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20">
                 Resume Learning
                 <PlayCircle size={18} />
               </button>
               <button className="w-full border-2 border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all">
                 Mark as Complete
               </button>
            </div>
          </div>
        </div>

        {/* Right Column: Lessons List */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-10 px-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <LayoutList size={18} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 dark:text-neutral-50">Lesson Modules</h2>
          </div>

          <div className="space-y-5">
            {lessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={`/lesson/${lesson.id}`}
                  className="group flex items-center gap-6 p-6 md:p-8 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[2rem] hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-900 transition-all relative overflow-hidden"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110",
                    lesson.type === 'theory' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
                    lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" :
                    "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                  )}>
                    {lesson.type === 'theory' ? <PlayCircle size={24} /> : 
                     lesson.type === 'exercise' ? <FileText size={24} /> : 
                     <Award size={24} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                         lesson.type === 'theory' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" :
                         lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" :
                         "bg-purple-50 text-purple-600 dark:bg-purple-900/20"
                       )}>{lesson.type}</span>
                       <span className="w-1 h-1 rounded-full bg-neutral-200" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Section {idx + 1}</span>
                    </div>
                    <h4 className="text-xl font-black truncate group-hover:text-blue-600 transition-colors text-neutral-900 dark:text-neutral-50 uppercase tracking-tight">{lesson.title}</h4>
                  </div>

                  <div className="shrink-0 flex items-center gap-4">
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-neutral-50 dark:bg-neutral-800 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <CheckCircle size={20} className="text-neutral-200 group-hover:text-current" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {lessons.length === 0 && (
              <div className="text-center py-24 bg-neutral-50 dark:bg-neutral-900/50 rounded-[3rem] border border-dashed border-neutral-200 dark:border-neutral-800">
                <BookOpen className="mx-auto text-neutral-300 mb-6" size={64} />
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">No modules yet</h3>
                <p className="text-neutral-500 font-medium">Content will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
