import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { curriculumService } from '../services/curriculum';
import { bookmarkService } from '../services/bookmarkService';
import { Lesson, Chapter } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
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
  const [siblings, setSiblings] = useState<Lesson[]>([]);
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
        // Fetch sibling lessons in the same chapter to provide previous / next buttons
        const lessonsData = await curriculumService.getLessonsByChapter(data.chapter_id);
        const sortedSiblings = [...lessonsData].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
        setSiblings(sortedSiblings);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!lesson) return <div className="p-8 text-center text-slate-500 font-bold">Lesson not found</div>;

  const currentIndex = siblings.findIndex(s => s.id === lesson.id);
  const prevLesson = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextLesson = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto pb-12 px-4 sm:px-6 pt-8">
        {/* Breadcrumbs Navigation */}
        <nav className="mb-6 flex items-center justify-between">
          <Link 
            to={chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : "/"}
            className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Chapter
          </Link>
          {chapter && (
            <div className="text-xs font-bold text-slate-400 tracking-wide">
              Grade {chapter.grade_id} • Chapter {chapter.chapter_number}
            </div>
          )}
        </nav>

        {/* Main Clean Lesson Content Area (Overflow-visible is key to protect KaTeX equations) */}
        <article className="bg-white border border-slate-100 p-6 sm:p-12 md:p-16 rounded-[2rem] shadow-sm relative overflow-visible text-left">
          
          {/* Lesson Header Area */}
          <div className="mb-10 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={cn(
                "px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border shadow-xs flex items-center gap-2",
                lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
                lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                "bg-purple-50 text-purple-600 border-purple-100"
              )}>
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                  lesson.type === 'theory' ? "bg-blue-600" :
                  lesson.type === 'exercise' ? "bg-emerald-600" :
                  "bg-purple-600"
                )} />
                {lesson.type}
              </span>
            </div>
            
            {/* Main Title - No uppercase, natural elegant casing */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4 break-words">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
              >
                {lesson.title}
              </ReactMarkdown>
            </h1>
            
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-4" />
          </div>

          {/* Core Body Container */}
          <div className="markdown-body relative z-10 text-slate-800 pb-2">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={{
                pre: ({ children }) => <>{children}</>,
                code(props) {
                  const { className, children } = props;
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
                        return <pre className={className}>{children}</pre>;
                      }
                    }

                    if (lang === 'timeline') {
                      try {
                        const events = JSON.parse(rawContent);
                        return <Timeline events={events} />;
                      } catch (e) {
                        return <pre className={className}>{children}</pre>;
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
                        return <pre className={className}>{children}</pre>;
                      }
                    }

                    if (lang === 'note') {
                      try {
                        let data;
                        try {
                          data = JSON.parse(rawContent);
                        } catch (err) {
                          // Pre-process rawContent to safely escape LaTeX backslashes if native JSON parsing fails
                          const fixedContent = rawContent.replace(/\\(?![n"\\\/bfrtu])/g, '\\\\');
                          data = JSON.parse(fixedContent);
                        }
                        
                        // Definition and callout styling config
                        const noteTypeStyles: Record<string, {
                          bg: string;
                          border: string;
                          text: string;
                          titleColor: string;
                          badgeBg: string;
                          badgeText: string;
                          icon: string;
                        }> = {
                          definition: {
                            bg: "bg-emerald-50/65 border-emerald-200",
                            border: "border-l-4 border-emerald-500",
                            text: "text-slate-850",
                            titleColor: "text-emerald-950",
                            badgeBg: "bg-emerald-100/80",
                            badgeText: "text-emerald-800",
                            icon: "📖"
                          },
                          tip: {
                            bg: "bg-amber-50/65 border-amber-200",
                            border: "border-l-4 border-amber-500",
                            text: "text-slate-850",
                            titleColor: "text-amber-950",
                            badgeBg: "bg-amber-100/80",
                            badgeText: "text-amber-800",
                            icon: "💡"
                          },
                          warning: {
                            bg: "bg-rose-50/65 border-rose-200",
                            border: "border-l-4 border-rose-500",
                            text: "text-slate-850",
                            titleColor: "text-rose-950",
                            badgeBg: "bg-rose-100/80",
                            badgeText: "text-rose-800",
                            icon: "⚠️"
                          },
                          info: {
                            bg: "bg-blue-50/65 border-blue-200",
                            border: "border-l-4 border-blue-500",
                            text: "text-slate-850",
                            titleColor: "text-blue-950",
                            badgeBg: "bg-blue-100/80",
                            badgeText: "text-blue-800",
                            icon: "ℹ️"
                          }
                        };

                        const selectedStyle = noteTypeStyles[data.type] || noteTypeStyles.info;

                        return (
                          <div className={cn(
                            "w-full max-w-full min-w-0 p-5 md:p-6 rounded-r-2xl border-y border-r shadow-xs my-8 transition-all flex flex-col gap-3 overflow-hidden md:overflow-visible",
                            selectedStyle.bg,
                            selectedStyle.border
                          )}>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xl shrink-0">{selectedStyle.icon}</span>
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shrink-0",
                                selectedStyle.badgeBg,
                                selectedStyle.badgeText
                              )}>
                                {data.type || 'NOTE'}
                              </span>
                              <h4 className={cn("font-extrabold text-sm md:text-base leading-snug", selectedStyle.titleColor)}>
                                {data.title}
                              </h4>
                            </div>
                            <div className="text-slate-800 text-[15px] md:text-base overflow-visible overflow-wrap-anywhere break-words whitespace-normal">
                              <ReactMarkdown 
                                remarkPlugins={[remarkMath]} 
                                rehypePlugins={[rehypeRaw, rehypeKatex]}
                                components={{
                                  p: ({ children }) => <p className="mb-2 leading-relaxed overflow-wrap-anywhere break-words">{children}</p>
                                }}
                              >
                                {data.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        );
                      } catch (e) {
                        return <pre className={className}>{children}</pre>;
                      }
                    }
                  }
                  
                  return <code className={className}>{children}</code>;
                },
                // Un-forced capitalization in elements
                h1: ({ children }) => <h2 className="text-lg md:text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight leading-snug">{children}</h2>,
                h2: ({ children }) => <h3 className="text-base md:text-2xl font-black text-slate-800 mt-8 mb-3 tracking-tight leading-snug">{children}</h3>,
                hr: () => <hr className="my-8 border-slate-100" />
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Sibling Navigation Deck */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-stretch justify-between relative z-10">
            {prevLesson ? (
              <Link 
                to={`/lesson/${prevLesson.id}`}
                className="flex-1 group p-5 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/20 hover:bg-slate-50/50 transition-all text-left flex items-center gap-4 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-xs group-hover:-translate-x-1 transition-transform">
                  <ChevronLeft className="text-slate-400 group-hover:text-slate-600" size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Previous Lesson</p>
                  <h4 className="font-bold text-sm text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {prevLesson.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div className="flex-1 hidden sm:block" />
            )}

            {nextLesson ? (
              <Link 
                to={`/lesson/${nextLesson.id}`}
                className="flex-1 group p-5 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/20 hover:bg-slate-50/50 transition-all text-right flex items-center justify-end gap-4 cursor-pointer"
              >
                <div className="min-w-0 text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Next Lesson</p>
                  <h4 className="font-bold text-sm text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {nextLesson.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="text-slate-400 group-hover:text-slate-600" size={18} />
                </div>
              </Link>
            ) : chapter ? (
              <Link 
                to={`/grade/${chapter.grade_id}/chapter/${chapter.id}`}
                className="flex-1 group p-5 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/20 hover:bg-slate-50/50 transition-all text-right flex items-center justify-end gap-4 cursor-pointer"
              >
                <div className="min-w-0 text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">End of Chapter</p>
                  <h4 className="font-bold text-sm text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    Return to Chapter Modules
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-1 transition-transform">
                  <ArrowLeft className="rotate-180 text-slate-450 group-hover:text-slate-600" size={16} />
                </div>
              </Link>
            ) : (
              <div className="flex-1 hidden sm:block" />
            )}
          </div>

          {/* Floating background gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </article>
      </div>
    </div>
  );
};

export default LessonDetail;
