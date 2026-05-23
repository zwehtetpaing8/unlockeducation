import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Loader2, 
  LayoutList, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  Award,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { curriculumService } from '../services/curriculum';
import { Chapter, Lesson } from '../types';
import { cn } from '../lib/utils';

const Lessons: React.FC = () => {
  const { level = '12' } = useParams<{ level: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [level]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [chapterData, lessonData] = await Promise.all([
        curriculumService.getChaptersByGrade(level),
        curriculumService.getAllLessonsByGrade(level)
      ]);
      
      setChapters(chapterData);
      setLessons(lessonData);
    } catch (error) {
      console.error('Error fetching lessons data:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filtered list of lessons
   */
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesChapter = selectedChapter === 'All' || lesson.chapter_id === selectedChapter;
      const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesChapter && matchesSearch;
    });
  }, [lessons, selectedChapter, searchQuery]);

  /**
   * Grouped lessons by chapter when 'All' is selected
   */
  const groupedLessons = useMemo(() => {
    const groups: { [key: string]: Lesson[] } = {};
    filteredLessons.forEach(lesson => {
      if (!groups[lesson.chapter_id]) groups[lesson.chapter_id] = [];
      groups[lesson.chapter_id].push(lesson);
    });
    return groups;
  }, [filteredLessons]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-12">
        {/* 1. Header Section */}
      <header className="space-y-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Matriculation <br />
              <span className="text-blue-600">Lessons</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl">
              Professional theory and practical exercises for Grade {level}. 
              Master every core module with step-by-step guidance.
            </p>
          </div>
          
          {/* Quick Filter Info */}
          <div className="hidden lg:flex gap-4">
            <div className="px-6 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Modules</p>
              <p className="text-2xl font-black text-slate-900">{lessons.length}</p>
            </div>
            <div className="px-6 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Chapters</p>
              <p className="text-2xl font-black text-blue-600">{chapters.length}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Interactive Controls */}
      <section className="space-y-6 sticky top-24 z-20 bg-slate-50/80 backdrop-blur-xl py-4 -mx-4 px-4 rounded-3xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Chapter Selector */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex items-center gap-2 md:bg-white md:p-1 md:rounded-2xl md:border md:border-slate-100 shadow-sm">
              <div className="hidden md:flex items-center px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-widest border-r border-slate-50">
                <LayoutList size={14} className="mr-2" /> Chapter
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedChapter('All')}
                  className={cn(
                    "px-6 py-3 rounded-full md:rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                    selectedChapter === 'All' 
                      ? "bg-slate-900 text-white shadow-lg" 
                      : "bg-white text-slate-500 border border-slate-100 md:border-none"
                  )}
                >
                  All Chapters
                </button>
                {chapters.map(chapter => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter.id)}
                    className={cn(
                      "px-6 py-3 rounded-full md:rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                      selectedChapter === chapter.id
                        ? "bg-blue-600 text-white shadow-lg" 
                        : "bg-white text-slate-500 border border-slate-100 md:border-none hidden md:block" // Desktop dropdown or scroll on mobile
                    )}
                  >
                    CH {chapter.chapter_number}: {chapter.title}
                  </button>
                ))}
              </div>

              {/* Mobile Chapter Dropdown fallback if too many chapters */}
              <div className="hidden md:block">
                 <select 
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-transparent text-sm font-black uppercase tracking-widest text-slate-700 outline-none cursor-pointer appearance-none md:hidden"
                  >
                    <option value="All">All Chapters</option>
                    {chapters.map(c => <option key={c.id} value={c.id}>Ch {c.chapter_number}: {c.title}</option>)}
                  </select>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-blue-600 shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* 3. Lesson Content Area */}
      <section className="min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <Loader2 className="animate-spin text-blue-600" size={48} />
             <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Loading Module Index...</p>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
             <BookOpen className="mx-auto text-slate-200 mb-6" size={64} />
             <h3 className="text-xl font-black text-slate-900 uppercase">No Lessons Found</h3>
             <p className="text-slate-500 font-medium">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {chapters
              .filter(c => selectedChapter === 'All' || c.id === selectedChapter)
              .map(chapter => {
                const chapterLessons = groupedLessons[chapter.id] || [];
                if (chapterLessons.length === 0) return null;

                return (
                  <div key={chapter.id} className="space-y-8">
                    {/* Chapter Heading */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                        {chapter.chapter_number}
                      </div>
                      <div className="space-y-0.5">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                          {chapter.title}
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          Chapter {chapter.chapter_number} • {chapterLessons.length} Modules
                        </p>
                      </div>
                    </div>

                    {/* Lesson Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {chapterLessons.map((lesson, idx) => (
                        <Link 
                          key={lesson.id}
                          to={`/grade/${level}/chapter/${chapter.id}/lesson/${lesson.id}`}
                          className="group flex flex-col p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-200 hover:shadow-2xl transition-all h-full active:scale-[0.98] shadow-sm hover:-translate-y-1"
                        >
                          <div className="flex items-start justify-between mb-10">
                            <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110",
                              lesson.type === 'theory' ? "bg-blue-50 text-blue-600" :
                              lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600" :
                              "bg-purple-50 text-purple-600"
                            )}>
                              {lesson.type === 'theory' ? <PlayCircle size={24} /> : 
                               lesson.type === 'exercise' ? <FileText size={24} /> : 
                               <Award size={24} />}
                            </div>
                            <div className="w-10 h-10 rounded-full border border-slate-50 flex items-center justify-center text-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <ChevronRight size={20} />
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                               <span className={cn(
                                 "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
                                 lesson.type === 'theory' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                 lesson.type === 'exercise' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                 "bg-purple-50 text-purple-600 border-purple-100"
                               )}>{lesson.type}</span>
                               <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Module {idx + 1}</span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight line-clamp-2">{lesson.title}</h3>
                          </div>

                          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Master Topic</span>
                             <span className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">Study</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  </div>
  );
};

export default Lessons;
