import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { curriculumService } from '../services/curriculum';
import { bookmarkService } from '../services/bookmarkService';
import { Lesson, Chapter } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { MathRenderer } from '../components/ui/MathRenderer';
import { ImageCarousel } from '../components/ui/ImageCarousel';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, ChevronDown,
  Settings, Maximize, PlayCircle, Loader2, Bookmark, CheckCircle2, Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { cn } from '../lib/utils';

import { ComplexPlane } from '../components/ui/ComplexPlane';
import { Timeline } from '../components/ui/Timeline';
import { FeatureCard, FeatureGrid } from '../components/ui/FeatureGrid';
import { NoteCard } from '../components/ui/NoteCard';

interface ContentChunk {
  type: 'markdown' | 'collapsible';
  title?: string;
  content: string;
}

const parseCollapsibleBlocks = (text: string): ContentChunk[] => {
  const result: ContentChunk[] = [];
  const detailsRegex = /<details[^>]*?>([\s\S]*?)<\/details>/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = detailsRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const body = match[1];
    
    if (matchIndex > lastIndex) {
      result.push({
        type: 'markdown',
        content: text.substring(lastIndex, matchIndex)
      });
    }
    
    const summaryRegex = /<summary[^>]*?>([\s\S]*?)<\/summary>/;
    const summaryMatch = body.match(summaryRegex);
    const title = summaryMatch ? summaryMatch[1].replace(/<\/?[^>]+(>|$)/g, "").trim() : "Show/Hide Solutions";
    
    let innerContent = body.replace(summaryRegex, '').trim();
    innerContent = innerContent.replace(/^<div[^>]*?>/, '').replace(/<\/div>$/, '').trim();
    
    result.push({
      type: 'collapsible',
      title,
      content: innerContent
    });
    
    lastIndex = detailsRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    result.push({
      type: 'markdown',
      content: text.substring(lastIndex)
    });
  }
  
  return result;
};

// Reusable Markdown Renderer that contains original code blocks and formatting
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
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
                  const fixedContent = rawContent.replace(/\\(?![n"\\\/bfrtu])/g, '\\\\');
                  data = JSON.parse(fixedContent);
                }
                
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
                        remarkPlugins={[remarkMath, remarkGfm]} 
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
        h1: ({ children }) => <h2 className="text-lg md:text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight leading-snug">{children}</h2>,
        h2: ({ children }) => <h3 className="text-base md:text-2xl font-black text-slate-800 mt-8 mb-3 tracking-tight leading-snug">{children}</h3>,
        hr: () => <hr className="my-8 border-slate-100" />
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const CollapsibleSolution: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 sm:p-8 my-8 transition-all hover:bg-slate-50/80 shadow-xs">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-black text-blue-600 text-[16px] sm:text-lg text-left select-none outline-none group gap-4"
      >
        <span>{title}</span>
        <ChevronDown size={20} className={cn("transition-transform duration-300 shrink-0 text-slate-400 group-hover:text-blue-600", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="mt-6 pt-6 border-t border-slate-150 text-slate-800 transition-all">
          <MarkdownRenderer content={content} />
        </div>
      )}
    </div>
  );
};

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [siblings, setSiblings] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark } = useProgress();
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
        <nav className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link 
              to={chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : "/"}
              className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Chapter
            </Link>
            
            {/* Mobile bookmark icon */}
            <button 
              onClick={() => toggleBookmark(lesson.id)}
              className={cn(
                "sm:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-all border cursor-pointer",
                isBookmarked(lesson.id) 
                  ? "bg-amber-50 border-amber-200 text-amber-500 shadow-xs" 
                  : "bg-white border-slate-100 text-slate-400 hover:text-slate-600"
              )}
              title="Bookmark lesson"
            >
              <Bookmark size={15} fill={isBookmarked(lesson.id) ? "currentColor" : "none"} />
            </button>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {chapter && (
              <div className="text-xs font-bold text-slate-400 tracking-wide">
                Grade {chapter.grade_id} • Chapter {chapter.chapter_number}
              </div>
            )}
            
            {/* Desktop bookmark button */}
            <button 
              onClick={() => toggleBookmark(lesson.id)}
              className={cn(
                "hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer select-none",
                isBookmarked(lesson.id)
                  ? "bg-amber-50 hover:bg-amber-100/85 border-amber-200 text-amber-600 shadow-xs" 
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-500"
              )}
            >
              <Bookmark size={14} fill={isBookmarked(lesson.id) ? "currentColor" : "none"} />
              <span>{isBookmarked(lesson.id) ? 'Saved' : 'Save Lesson'}</span>
            </button>
          </div>
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
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
              >
                {lesson.title}
              </ReactMarkdown>
            </h1>
            
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-4" />
          </div>

          {/* Core Body Container */}
          <div className="markdown-body relative z-10 text-slate-800 pb-2 space-y-4">
            {parseCollapsibleBlocks(lesson.content).map((chunk, idx) => {
              if (chunk.type === 'collapsible') {
                return (
                  <CollapsibleSolution 
                    key={idx} 
                    title={chunk.title || "Show/Hide Solutions"} 
                    content={chunk.content} 
                  />
                );
              }
              return <MarkdownRenderer key={idx} content={chunk.content} />;
            })}
          </div>

          {/* Mobile-optimized completion toggle & navigation deck */}
          <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Mark as Completed */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  toggleComplete(lesson.id);
                }}
                className={cn(
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-black text-sm tracking-wide transition-all cursor-pointer shadow-sm select-none",
                  isCompleted(lesson.id)
                    ? "bg-emerald-500 text-white shadow-emerald-500/10 hover:bg-emerald-600"
                    : "bg-slate-100 hover:bg-slate-205 text-slate-800"
                )}
              >
                {isCompleted(lesson.id) ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    <span>Lesson Completed</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>
              
              {isCompleted(lesson.id) && (
                <span className="text-[10px] sm:text-xs font-black uppercase text-emerald-600 tracking-wider animate-pulse flex items-center gap-1.5">
                  ✨ Excellent Work!
                </span>
              )}
            </div>

            {/* Sibling Navigation Links */}
            <div className="w-full md:w-auto flex items-center gap-3">
              {prevLesson && (
                <Link
                  to={`/grade/12/chapter/${chapter?.id}/lesson/${prevLesson.id}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4.5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 text-xs tracking-wider uppercase transition-all"
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </Link>
              )}
              {nextLesson && (
                <Link
                  to={`/grade/12/chapter/${chapter?.id}/lesson/${nextLesson.id}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-3.5 bg-blue-600 rounded-xl font-extrabold text-white hover:bg-blue-700 text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/10"
                >
                  <span>Next Lesson</span>
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Floating background gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </article>
      </div>
    </div>
  );
};

export default LessonDetail;
