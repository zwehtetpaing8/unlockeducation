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
    <div className="max-w-4xl mx-auto pb-20">
      {/* Lesson Header Navigation */}
      <div className="flex items-center justify-between mb-8 sticky top-20 z-30 py-2 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm">
        <Link 
          to={chapter ? `/grade/${chapter.grade_id}/chapter/${chapter.id}` : '/'}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-2 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-medium">Chapter Overview</span>
        </Link>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleBookmark}
            className={cn(
              "p-2.5 rounded-xl border transition-all",
              isBookmarked 
                ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" 
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-800"
            )}
            title="Bookmark lesson"
          >
            {isBookmarked ? <BookmarkCheck size={20} fill="currentColor" /> : <Bookmark size={20} />}
          </button>
          <button className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Lesson Content Area */}
      <article className="bg-white dark:bg-neutral-900 rounded-[2rem] p-6 md:p-12 border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-2 uppercase tracking-widest">
            <PlayCircle size={14} />
            <span>{lesson.type}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-neutral-50">{lesson.title}</h1>
          <div className="h-1 w-20 bg-blue-600 rounded-full" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-3xl prose-pre:bg-neutral-50 dark:prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-700">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Next / Previous Lesson Controls */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <button className="flex items-center gap-4 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all text-left group overflow-hidden">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg group-hover:-translate-x-1 transition-transform">
            <ChevronLeft size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Previous</p>
            <p className="font-bold truncate">Intro to Fractions</p>
          </div>
        </button>
        
        <button className="flex items-center justify-end text-right gap-4 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all group overflow-hidden">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Next</p>
            <p className="font-bold truncate">Section 2: Rules</p>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg group-hover:translate-x-1 transition-transform">
            <ChevronRight size={20} />
          </div>
        </button>
      </div>

      {/* Bottom Floating controls for mobile */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full py-2 px-6 shadow-2xl z-40 gap-4">
        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
          <Settings size={20} />
        </button>
        <div className="h-6 w-px bg-neutral-200 dark:border-neutral-800" />
        <p className="text-xs font-bold font-mono tracking-tighter opacity-40">PROGRESS: 60%</p>
        <div className="h-6 w-px bg-neutral-200 dark:border-neutral-800" />
        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
          <Maximize size={20} />
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
