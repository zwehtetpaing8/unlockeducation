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
import { 
  ArrowLeft, ChevronLeft, ChevronRight, 
  Bookmark, BookmarkCheck, Share2, 
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonId) {
      fetchLessonData(lessonId);
    }
  }, [lessonId]);

  useEffect(() => {
    if (user && lessonId) {
      checkBookmarkStatus(user.id, lessonId);
    } else {
      setIsBookmarked(false);
    }
  }, [lessonId, user]);

  const fetchLessonData = async (id: string) => {
    setLoading(true);
    try {
      // We still use supabase directly for simple joins or use the service
      // To strictly follow the refactor, we can update service to fetch both
      // But for now, using the basic service is fine.
      const data = await curriculumService.getLessonById(id);
      if (data) {
        setLesson(data);
        // Chapter info might be needed for back link
        const chapterData = await curriculumService.getChapterById(data.chapter_id);
        setChapter(chapterData);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkBookmarkStatus = async (userId: string, id: string) => {
    const bookmarked = await bookmarkService.isBookmarked(userId, id);
    setIsBookmarked(bookmarked);
  };

  const toggleBookmark = async () => {
    if (!user || !lessonId) return;
    try {
      const newState = await bookmarkService.toggleBookmark(user.id, lessonId);
      setIsBookmarked(newState);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
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
      <div className="flex items-center justify-between mb-10 sticky top-20 z-30 py-4 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md px-2">
        <Link 
          to={chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : '/'}
          className="inline-flex items-center gap-3 text-sm font-black text-neutral-400 hover:text-blue-600 transition-all group uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Chapter Overview</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleBookmark}
            className={cn(
              "w-11 h-11 flex items-center justify-center rounded-2xl border transition-all",
              isBookmarked 
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30" 
                : "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-900"
            )}
            title="Bookmark lesson"
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
          <button className="w-11 h-11 flex items-center justify-center bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-900 transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Lesson Content Area */}
      <article className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-6 md:p-16 border border-neutral-100 dark:border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="mb-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
              lesson.type === 'theory' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" :
              lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" :
              "bg-purple-50 text-purple-600 dark:bg-purple-900/20"
            )}>
              {lesson.type}
            </div>
            <div className="w-1 h-1 rounded-full bg-neutral-200" />
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Section Active</div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-neutral-900 dark:text-neutral-50 uppercase leading-none">
            {lesson.title}
          </h1>
          
          <div className="h-1.5 w-24 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30" />
        </div>

        <div className="markdown-body relative z-10">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>

        {/* Floating background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </article>

      {/* Next / Previous Lesson Controls */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:gap-8">
        <button className="flex items-center gap-5 p-6 md:p-10 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-900 transition-all text-left group overflow-hidden">
          <div className="w-12 h-12 shrink-0 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center rounded-2xl group-hover:-translate-x-1 transition-transform">
            <ChevronLeft size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Previous Lesson</p>
            <p className="font-black text-lg text-neutral-900 dark:text-neutral-50 truncate uppercase tracking-tight">Main Concepts</p>
          </div>
        </button>
        
        <button className="flex items-center justify-end text-right gap-5 p-6 md:p-10 rounded-[2.5rem] bg-neutral-950 dark:bg-neutral-900 text-white hover:bg-neutral-900 dark:hover:bg-neutral-800 transition-all group overflow-hidden shadow-2xl">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Up Next</p>
            <p className="font-black text-lg truncate uppercase tracking-tight">Advanced Practice</p>
          </div>
          <div className="w-12 h-12 shrink-0 bg-neutral-800 dark:bg-neutral-800 flex items-center justify-center rounded-2xl group-hover:translate-x-1 transition-transform">
            <ChevronRight size={24} />
          </div>
        </button>
      </div>

      {/* Bottom Floating Progress/Controls for Mobile */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl py-3 px-8 shadow-2xl z-40 gap-6 backdrop-blur-md">
        <button className="p-1 hover:text-blue-600 transition-colors">
          <Settings size={20} />
        </button>
        <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase text-neutral-400 mb-1 leading-none">Lesson Progress</span>
            <div className="w-24 h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-2/3" />
            </div>
        </div>
        <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
        <button className="p-1 hover:text-blue-600 transition-colors">
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
