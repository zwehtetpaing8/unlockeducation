import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile as ProfileType, Bookmark, Lesson } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Bookmark as BookmarksIcon, History, Settings, 
  ChevronRight, Award, Trash2, 
  GraduationCap, Loader2, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<(Bookmark & { lesson: Lesson })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*, lesson:lessons(*)')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (data) setBookmarks(data);
    setLoading(false);
  };

  const removeBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id);
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Profile Header */}
      <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-5xl md:text-7xl font-black text-white shadow-2xl shadow-blue-600/20 active:rotate-3 transition-transform">
            {profile?.full_name?.[0] || 'U'}
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase leading-none">{profile?.full_name || 'Student'}</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{profile?.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="bg-blue-50 px-4 py-2 rounded-xl text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-blue-100">
                <GraduationCap size={14} />
                Platinum Member
              </div>
              <div className="bg-amber-50 px-4 py-2 rounded-xl text-amber-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-amber-100">
                <Award size={14} />
                Advanced Learner
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            {/* Log Out button intentionally removed to avoid showing a login page barrier */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Bookmarks Section */}
        <div className="md:col-span-12 lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              Saved Lessons
            </h2>
            <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-widest">{bookmarks.length} Total</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {bookmarks.map((bookmark, idx) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <Link 
                  to={`/lesson/${bookmark.lesson.id}`}
                  className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <History size={24} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-sm md:text-base font-black truncate group-hover:text-blue-600 transition-colors text-slate-900 uppercase tracking-tight leading-tight">{bookmark.lesson.title}</h4>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">
                      Saved {new Date(bookmark.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeBookmark(bookmark.id);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-200 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}

            {bookmarks.length === 0 && (
              <div className="p-16 text-center rounded-[2.5rem] border-2 border-dashed border-slate-100 bg-slate-50/30">
                <BookmarksIcon className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-xs font-black uppercase text-slate-400 tracking-widest">No saved lessons.</p>
              </div>
            )}
          </div>
        </div>

        {/* Learning Analytics */}
        <div className="md:col-span-12 lg:col-span-5 space-y-8">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
             <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
             Performance
          </h2>
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
             <div className="relative z-10 space-y-8">
               <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                 <Award size={32} />
               </div>
               <div className="space-y-2">
                 <h4 className="font-black text-xl uppercase tracking-tight leading-none">Smart Analytics</h4>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed">
                   We are building a deeper way to track your accuracy, speed, and mastery across every chapter.
                 </p>
               </div>
               <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Mastery</span>
                    <span className="text-[10px] font-black text-blue-400">65%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
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
