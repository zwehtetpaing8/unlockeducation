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
          <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white shadow-xl sticky top-24">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-600/30 flex items-center justify-center text-white font-black text-4xl mb-8">
              {chapter.chapter_number}
            </div>
            <h1 className="text-3xl font-black mb-4 text-neutral-900 tracking-tighter uppercase leading-none text-left">{chapter.title}</h1>
            <p className="text-neutral-500 mb-10 leading-relaxed font-bold text-left">
              {chapter.description}
            </p>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                <Clock size={14} />
                <span>Chapter Overview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lessons List */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-10 px-4">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <LayoutList size={18} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-neutral-900">Lesson Modules</h2>
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
                  className="group flex items-center gap-6 p-6 md:p-8 bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] hover:shadow-2xl hover:border-blue-300 transition-all relative overflow-hidden shadow-sm"
                >
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
                  
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shadow-sm",
                         lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
                         lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         "bg-purple-50 text-purple-600 border-purple-100"
                       )}>{lesson.type}</span>
                       <span className="w-1 h-1 rounded-full bg-neutral-200" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Section {idx + 1}</span>
                    </div>
                    <h4 className="text-xl font-black truncate group-hover:text-blue-600 transition-colors text-neutral-900 uppercase tracking-tight">{lesson.title}</h4>
                  </div>

                  <div className="shrink-0 flex items-center gap-4">
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:text-blue-600 transition-colors border border-neutral-100 shadow-sm">
                      <CheckCircle size={20} className="text-neutral-200 group-hover:text-current" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-neutral-400 shadow-sm">
                      <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {lessons.length === 0 && (
              <div className="text-center py-24 bg-white/40 backdrop-blur-md rounded-[3rem] border border-dashed border-neutral-200">
                <BookOpen className="mx-auto text-neutral-300 mb-6" size={64} />
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-neutral-400">No modules yet</h3>
                <p className="text-neutral-400 font-bold font-sans">Content will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
