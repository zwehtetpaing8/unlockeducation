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
      <div className="pt-8">
        <Link 
          to={`/grade/${level}`}
          className="inline-flex items-center gap-3 text-sm font-black text-neutral-400 hover:text-blue-600 transition-all group uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Curriculum
        </Link>
      </div>

      <div className="space-y-10">
        <div className="flex items-center gap-3 px-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 leading-none">Lesson Modules</h2>
          <div className="h-px flex-1 bg-neutral-100 ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                to={`/lesson/${lesson.id}`}
                className="group flex flex-col p-8 bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] hover:shadow-2xl hover:border-blue-300 transition-all relative overflow-hidden shadow-sm h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 shadow-sm",
                    lesson.type === 'theory' ? "bg-blue-50 text-blue-600" :
                    lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600" :
                    "bg-purple-50 text-purple-600"
                  )}>
                    {lesson.type === 'theory' ? <PlayCircle size={24} /> : 
                     lesson.type === 'exercise' ? <FileText size={24} /> : 
                     <Award size={24} />}
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-blue-600 group-hover:text-white transition-all text-neutral-400 border border-neutral-50">
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                <div className="text-left space-y-3">
                  <div className="flex items-center gap-2">
                     <span className={cn(
                       "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                       lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
                       lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                       "bg-purple-50 text-purple-600 border-purple-100"
                     )}>{lesson.type}</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Section {idx + 1}</span>
                  </div>
                  <h4 className="text-2xl font-black group-hover:text-blue-600 transition-colors text-neutral-900 uppercase tracking-tight leading-tight">{lesson.title}</h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-24 bg-white/40 backdrop-blur-md rounded-[3rem] border border-dashed border-neutral-200">
            <BookOpen className="mx-auto text-neutral-300 mb-6" size={64} />
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-neutral-400">No modules yet</h3>
            <p className="text-neutral-400 font-bold font-sans">Content will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterDetail;
