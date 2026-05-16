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
    <div className="max-w-5xl mx-auto space-y-12">
      <Link 
        to={`/grade/${level}`}
        className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Grade Curriculum</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Chapter Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm sticky top-24">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mb-6">
              {chapter.chapter_number}
            </div>
            <h1 className="text-3xl font-extrabold mb-4 text-neutral-900 dark:text-neutral-50">{chapter.title}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
              {chapter.description}
            </p>

            <button className="w-full mt-8 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-4 rounded-xl font-bold transition-all">
              Mark as Complete
            </button>
          </div>
        </div>

        {/* Right Column: Lessons List */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-8 px-4">
            <LayoutList size={20} className="text-blue-600" />
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Lesson Modules</h2>
          </div>

          <div className="space-y-4">
            {lessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={`/lesson/${lesson.id}`}
                  className="group flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[1.5rem] hover:ring-2 hover:ring-blue-600/20 hover:border-blue-600/30 transition-all shadow-sm"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    lesson.type === 'theory' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
                    lesson.type === 'exercise' ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" :
                    "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
                  )}>
                    {lesson.type === 'theory' ? <PlayCircle size={24} /> : 
                     lesson.type === 'exercise' ? <FileText size={24} /> : 
                     <Award size={24} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{lesson.type}</span>
                    </div>
                    <h4 className="text-lg font-bold truncate group-hover:text-blue-600 transition-colors text-neutral-900 dark:text-neutral-50">{lesson.title}</h4>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-neutral-50 dark:bg-neutral-800">
                      <CheckCircle size={16} className="text-neutral-200" />
                    </div>
                    <ChevronRight size={20} className="text-neutral-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}

            {lessons.length === 0 && (
              <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-[2rem] border border-dashed border-neutral-200 dark:border-neutral-800">
                <BookOpen className="mx-auto text-neutral-300 mb-4" size={40} />
                <h3 className="font-bold">No modules added to this chapter</h3>
                <p className="text-sm text-neutral-400">Content will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
