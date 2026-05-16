import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { curriculumService } from '../services/curriculum';
import { bookmarkService } from '../services/bookmarkService';
import { Lesson, Chapter } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { MathRenderer } from '../components/ui/MathRenderer';
import { ImageCarousel } from '../components/ui/ImageCarousel';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, 
  Settings, Maximize, PlayCircle, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import 'katex/dist/katex.min.css';

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonId) {
      fetchLessonData(lessonId);
    }
  }, [lessonId]);

  const fetchLessonData = async (id: string) => {
    setLoading(true);
    try {
      const data = await curriculumService.getLessonById(id);
      if (data) {
        setLesson(data);
        const chapterData = await curriculumService.getChapterById(data.chapter_id);
        setChapter(chapterData);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="max-w-4xl mx-auto pb-32">
      {/* Lesson Header Navigation */}
      <div className="flex items-center justify-between mb-10 sticky top-16 md:top-20 z-30 py-4 bg-white/60 backdrop-blur-md px-4 border-b border-white/20 shadow-sm rounded-b-2xl">
        <Link 
          to={chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : '/'}
          className="inline-flex items-center gap-3 text-sm font-black text-neutral-400 hover:text-blue-600 transition-all group uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-left">Chapter Overview</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>

      {/* Lesson Content Area */}
      <article className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-16 border border-white shadow-2xl relative overflow-hidden text-left">
        <div className="mb-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
              lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
              lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
              "bg-purple-50 text-purple-600 border-purple-100"
            )}>
              {lesson.type}
            </div>
            <div className="w-1 h-1 rounded-full bg-neutral-200" />
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Section Active</div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 text-neutral-900 uppercase leading-tight">
            {lesson.title}
          </h1>
          
          <div className="h-1.5 w-24 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30" />
        </div>

        <div className="markdown-body relative z-10 text-neutral-800 font-medium pb-20 leading-relaxed md:leading-loose">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code(props) {
                const { node, className, children, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                const isBlock = !!match;
                
                if (isBlock && match[1] === 'carousel') {
                  const images = String(children).trim().split('\n').map(img => img.trim());
                  return <ImageCarousel images={images} />;
                }
                return <code className={className} {...rest}>{children}</code>;
              },
              // Customize headers for better consistency
              h1: ({ children }) => <h2 className="text-3xl font-black text-neutral-900 mt-12 mb-6 uppercase tracking-tight border-l-4 border-blue-600 pl-4">{children}</h2>,
              h2: ({ children }) => <h3 className="text-2xl font-black text-neutral-800 mt-10 mb-4 uppercase tracking-tighter">{children}</h3>,
              hr: () => <hr className="my-12 border-neutral-100" />
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>

        {/* Floating background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </article>

      {/* Bottom Floating Progress/Controls for Mobile */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center bg-white/80 backdrop-blur-xl border border-white rounded-3xl py-3 px-8 shadow-2xl z-40 gap-6">
        <button className="p-1 hover:text-blue-600 transition-colors text-neutral-400">
          <Settings size={20} />
        </button>
        <div className="h-4 w-px bg-neutral-100" />
        <button className="p-1 hover:text-blue-600 transition-colors text-neutral-400">
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
