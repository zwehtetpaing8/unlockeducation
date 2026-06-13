import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile as ProfileType, Lesson } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { MOCK_LESSONS } from '../services/curriculum';
import { 
  User, Bookmark as BookmarksIcon, History, Settings, 
  ChevronRight, Award, Trash2, 
  GraduationCap, Loader2, LogOut, CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const Profile: React.FC = () => {
  const { profile, user } = useAuth();
  const { completedLessons, bookmarkedLessons, toggleBookmark } = useProgress();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Filter lessons that the student saved locally
  const savedLessons = MOCK_LESSONS.filter(lesson => bookmarkedLessons.includes(lesson.id));
  
  // Calculate analytics
  const totalLessons = MOCK_LESSONS.length;
  const completedCount = completedLessons.length;
  const completionRate = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 105) : 0; // scaled slightly or capped at 100
  const realProgressPercent = totalLessons > 0 ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  let scholarBadge = "Beginner Learner";
  let badgeColor = "bg-slate-50 text-slate-500 border-slate-100";
  if (completedCount >= 8) {
    scholarBadge = "Level 12 Mathematical Master";
    badgeColor = "bg-amber-50 text-amber-600 border-amber-100 animate-pulse";
  } else if (completedCount >= 4) {
    scholarBadge = "Dedicated Scholar";
    badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
  } else if (completedCount >= 1) {
    scholarBadge = "Active Student";
    badgeColor = "bg-blue-50 text-blue-600 border-blue-100";
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 text-left px-4 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Profile Header Block */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-900 text-white flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg shadow-slate-900/10">
            {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'S'}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md border border-indigo-150">
                Grade 12 Level
              </span>
            </div>
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none uppercase">
              {profile?.full_name || 'သင်ယူသူ (Learner)'}
            </h1>
            <p className="text-slate-400 font-bold tracking-wide text-xs">{profile?.email || user?.email || 'Anonymous Scholar'}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <div className="bg-emerald-50 px-3 py-1.5 rounded-lg text-emerald-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-emerald-100">
                <CheckCircle size={12} />
                <span>LMS Account Active</span>
              </div>
              <div className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border transition-all", badgeColor)}>
                <Award size={12} />
                <span>{scholarBadge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Bookmarks Section */}
        <div className="md:col-span-12 lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full" />
              Saved Lectures • မှတ်တမ်းတင်ထားရာများ
            </h2>
            <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-wider">
              {savedLessons.length} Saved
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {savedLessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <Link 
                  to={`/grade/12/chapter/${lesson.chapter_id}/lesson/${lesson.id}`}
                  className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <BookmarksIcon size={18} fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-500">
                      Module {lesson.type}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold truncate group-hover:text-blue-600 transition-colors text-slate-900 uppercase tracking-tight leading-tight">
                      {lesson.title}
                    </h4>
                  </div>
                  <ChevronRight size={14} className="text-slate-350 shrink-0" />
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBookmark(lesson.id);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                  title="Remove bookmark"
                >
                  <Trash2 size={15} />
                </button>
              </motion.div>
            ))}

            {savedLessons.length === 0 && (
              <div className="p-12 text-center rounded-3xl border border-dashed border-slate-150 bg-slate-50/20">
                <BookmarksIcon className="mx-auto text-slate-200 mb-2.5" size={32} />
                <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">No Saved Lectures yet.</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Bookmark math formulas or chapters to review them here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Learning Analytics Cockpit */}
        <div className="md:col-span-12 lg:col-span-5 space-y-6">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
             <span className="w-1.5 h-5 bg-indigo-600 rounded-full" />
             LMS Progress Overview
          </h2>
          
          <div className="bg-slate-950 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-900">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
             <div className="relative z-10 space-y-6">
               <div className="flex justify-between items-start">
                 <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                   <Award size={24} />
                 </div>
                 <div className="text-right">
                   <p className="text-2xl sm:text-3xl font-black text-blue-400 leading-none">{realProgressPercent}%</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Course Finished</p>
                 </div>
               </div>

               <div className="space-y-1">
                 <h4 className="font-extrabold text-sm uppercase tracking-tight">Grade 12 Syllabus Track</h4>
                 <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                   သင်္ချာစနစ်တစ်ခုလုံး၏ သင်ယူပြီးမြောက်မှု အခြေအနေဖြစ်ပါသည်။ Chapter တစ်ခုချင်းစီကို စနစ်တကျလေ့လာပါ။
                 </p>
               </div>

               <div className="space-y-4 pt-2 border-t border-white/5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Milestones Completed</span>
                      <span className="text-blue-400 font-bold">{completedCount} / {totalLessons} Modules</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-500 rounded-full" 
                        style={{ width: `${realProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1 text-center">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-lg font-black text-white leading-none">{completedCount}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">Completed</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-lg font-black text-white leading-none">{totalLessons - completedCount}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-1">Remaining</p>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
