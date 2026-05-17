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

import { ComplexPlane } from '../components/ui/ComplexPlane';
import { Timeline } from '../components/ui/Timeline';
import { FeatureCard, FeatureGrid } from '../components/ui/FeatureGrid';
import { NoteCard } from '../components/ui/NoteCard';

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
    <div className="max-w-4xl mx-auto pb-40">
      {/* Breadcrumbs */}
      <nav className="mb-4 px-4 flex items-center justify-between">
         <Link 
            to={chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : "/"}
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all group"
         >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Module List
         </Link>
         {chapter && (
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">
               Grade {chapter.grade_id} • Chapter {chapter.chapter_number}
            </div>
         )}
      </nav>

      {/* Lesson Content Area */}
      <article className="bg-white border border-slate-100 rounded-[2.5rem] p-4 md:p-10 md:pt-12 shadow-xl relative overflow-hidden text-left">
        <div className="mb-8 relative z-10 px-2 md:px-0">
          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2",
              lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
              lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
              "bg-purple-50 text-purple-600 border-purple-100"
            )}>
              <div className={cn("w-1.5 h-1.5 rounded-full", 
                lesson.type === 'theory' ? "bg-blue-600" :
                lesson.type === 'exercise' ? "bg-emerald-600" :
                "bg-purple-600"
              )} />
              {lesson.type}
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 text-slate-900 uppercase leading-[0.95] break-words">
            <ReactMarkdown 
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {lesson.title}
            </ReactMarkdown>
          </h1>
          
          <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
        </div>

        <div className="markdown-body relative z-10 text-slate-800 pb-10">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code(props) {
                const { node, className, children, ...rest } = props;
                const match = /language-([\w-]+)/.exec(className || '');
                const isBlock = !!match;
                
                if (isBlock) {
                  const lang = match[1];
                  const rawContent = String(children).trim();

                  if (lang === 'carousel') {
                    const images = rawContent.split('\n').map(img => img.trim());
                    return <ImageCarousel images={images} />;
                  }

                  if (lang === 'complex-plane') {
                    try {
                      const data = JSON.parse(rawContent);
                      return <ComplexPlane points={data.points} />;
                    } catch (e) {
                      return <pre className={className} {...rest}>{children}</pre>;
                    }
                  }

                  if (lang === 'timeline') {
                    try {
                      const events = JSON.parse(rawContent);
                      return <Timeline events={events} />;
                    } catch (e) {
                      return <pre className={className} {...rest}>{children}</pre>;
                    }
                  }

                  if (lang === 'features') {
                    try {
                      const data = JSON.parse(rawContent);
                      return (
                        <FeatureGrid>
                          {data.map((item: any, i: number) => (
                            <FeatureCard key={i} {...item} />
                          ))}
                        </FeatureGrid>
                      );
                    } catch (e) {
                      return <pre className={className} {...rest}>{children}</pre>;
                    }
                  }

                  if (lang === 'note') {
                    try {
                      const data = JSON.parse(rawContent);
                      return (
                        <NoteCard type={data.type} title={data.title}>
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {data.content}
                          </ReactMarkdown>
                        </NoteCard>
                      );
                    } catch (e) {
                      return <pre className={className} {...rest}>{children}</pre>;
                    }
                  }
                }
                
                return <code className={className} {...rest}>{children}</code>;
              },
              h1: ({ children }) => <h2 className="text-xl md:text-4xl font-black text-slate-900 mt-8 mb-4 uppercase tracking-tight leading-none">{children}</h2>,
              h2: ({ children }) => <h3 className="text-lg md:text-3xl font-black text-slate-800 mt-6 mb-3 uppercase tracking-tight leading-none">{children}</h3>,
              hr: () => <hr className="my-8 border-slate-100" />
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>

        {/* Floating background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </article>

      {/* Bottom Floating Progress/Controls for Mobile */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-[2rem] py-3 px-6 shadow-2xl z-50 gap-6 text-white translate-y-0 hover:-translate-y-1 transition-all">
        <button 
          onClick={() => navigate(chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : '/')}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors shrink-0 flex items-center gap-2 group"
          title="Back to Chapter"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Module List</span>
        </button>
        
        <div className="h-4 w-px bg-slate-800 shrink-0" />
        
        <div className="flex items-center gap-2 px-2 shrink-0">
           <PlayCircle size={18} className="text-blue-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lesson Mode</span>
        </div>
        
        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors shrink-0">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
