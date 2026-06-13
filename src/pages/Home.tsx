import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, BookOpen, PlayCircle, Award, 
  Target, Zap, Sparkles, GraduationCap, FileText, ChevronRight, Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { curriculumService, MOCK_LESSONS } from '../services/curriculum';
import { Chapter } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const { completedLessons, bookmarkedLessons } = useProgress();

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const data = await curriculumService.getChaptersByGrade('12');
      setChapters(data);
    } catch (e) {
      console.error('Error fetching chapters for home dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  const totalG12Lessons = MOCK_LESSONS.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalG12Lessons > 0 ? Math.min(100, Math.round((completedCount / totalG12Lessons) * 100)) : 0;
  const savedLessons = MOCK_LESSONS.filter(l => bookmarkedLessons.includes(l.id));

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Mobile-First Greeting & Sparkle Banner */}
      <div className="flex flex-col gap-4 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] w-fit font-black uppercase tracking-wider">
          <Sparkles size={12} className="animate-pulse" />
          <span>LMS Portal Active • Grade 12 သင်ရိုး</span>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
            မင်္ဂလာပါ — Hello, Learner! 👋
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            မင်းရဲ့ သင်္ချာပညာရေး တိုးတက်မှုအတွက် အဆင့်မြင့် LMS မှ ကြိုဆိုပါသည်။
          </p>
        </div>
      </div>

      {/* 2. Hero Progress Cockpit (Continuous Learning) */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
          <div className="space-y-4 max-w-lg flex-1">
            <span className="px-3 py-1 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/20 text-[9px] font-black tracking-widest uppercase">
              Current Academic Course
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Grade 12 Mathematics သင်္ချာ
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              ဆယ်တန်းစာမေးပွဲ အောင်မြင်ရန် theory များနှင့် ပုစ္ဆာများကို အလွယ်ကူဆုံး လေ့လာနိုင်ရန် ပြုစုထားသော စနစ်ဖြစ်ပါသည်။
            </p>
            
            {/* Real progress track bar */}
            <div className="space-y-2 pt-2 max-w-md">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                <span>Course Progress • {progressPercent}%</span>
                <span>{completedCount} / {totalG12Lessons} Lessons Completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 border border-slate-705/80 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-700 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-blue-500" />
                <span>{totalG12Lessons} Lectures</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-500" />
                <span>Theory & Practice Set</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link 
              to="/grade/12"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-sm tracking-wide transition-all shadow-lg shadow-blue-600/20 active:scale-95 btn-premium"
            >
              CONTINUE STUDY
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Mobile-Optimized Grid Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
        <Link 
          to="/grade/12"
          className="p-5 sm:p-6 bg-white border border-slate-100 rounded-[1.8rem] hover:border-blue-200 transition-all hover:shadow-lg flex flex-col justify-between h-36 active:scale-95 group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <GraduationCap size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-xs sm:text-sm mb-1">
              Curriculum Theory
            </h4>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">
              သင်္ချာသီအိုရီများ
            </p>
          </div>
        </Link>

        <Link 
          to="/past-papers"
          className="p-5 sm:p-6 bg-white border border-slate-100 rounded-[1.8rem] hover:border-blue-200 transition-all hover:shadow-lg flex flex-col justify-between h-36 active:scale-95 group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-xs sm:text-sm mb-1">
              Past Papers
            </h4>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">
              မေးခွန်းဟောင်းများ
            </p>
          </div>
        </Link>

        <Link 
          to="/lessons/12"
          className="col-span-2 md:col-span-1 p-5 sm:p-6 bg-white border border-slate-100 rounded-[1.8rem] hover:border-blue-200 transition-all hover:shadow-lg flex flex-col justify-between h-36 active:scale-95 group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-650 flex items-center justify-center transition-transform group-hover:scale-110">
            <Target size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors uppercase text-xs sm:text-sm mb-1">
              Interactive Search
            </h4>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">
              ရှာဖွေလေ့လာရန်
            </p>
          </div>
        </Link>
      </div>

      {/* 4. Mini Learning Insights Block */}
      <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Award size={18} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-tight">Active Enrollment</p>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Unlock Free Course Progress Tracker</p>
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
          <span>Daily recommendation: Chapter 1 Complex Numbers</span>
          <ArrowRight size={14} className="text-amber-500" />
        </div>
      </div>

      {/* Conditionally Rendered Saved Lessons Section */}
      {savedLessons.length > 0 && (
        <div className="space-y-4 text-left pt-2">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-amber-500 rounded-full" />
            Saved Lessons for Review ({savedLessons.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedLessons.map((item) => (
              <Link 
                key={item.id}
                to={`/grade/12/chapter/${item.chapter_id}/lesson/${item.id}`}
                className="p-4 bg-amber-500/5 border border-amber-500/10 hover:border-amber-500/20 hover:bg-amber-500/10 transition-all rounded-2xl flex items-center justify-between gap-3 group active:scale-95"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Bookmark size={15} fill="currentColor" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-wider text-amber-600">Saved Module</p>
                    <h4 className="font-extrabold text-slate-900 truncate text-xs sm:text-sm group-hover:text-amber-700 transition-colors uppercase leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400 group-hover:text-slate-600 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. Mobile-First Chapter List Dashboard */}
      <div className="space-y-4 text-left pt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-600 rounded-full" />
            Chapter Modules Index
          </h3>
          <Link 
            to="/grade/12"
            className="text-[10px] sm:text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-1 active:scale-95"
          >
            See Full Index
            <ChevronRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-600 animate-spin" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Modules...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {chapters.slice(0, 4).map((chapter, idx) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={`/grade/12/chapter/${chapter.id}`}
                  className="group flex items-center justify-between p-4 sm:p-5 bg-white border border-slate-100 hover:border-blue-200 rounded-2xl sm:rounded-3xl hover:shadow-md transition-all active:scale-[0.99] gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 text-sm sm:text-base">
                      {chapter.chapter_number}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Chapter {chapter.chapter_number}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors truncate text-sm uppercase leading-tight">
                        {chapter.title}
                      </h4>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
