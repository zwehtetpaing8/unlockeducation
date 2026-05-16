import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile as ProfileType, Bookmark, Lesson } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Bookmark as BookmarksIcon, History, Settings, 
  ChevronRight, Award, Trash2, 
  GraduationCap, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Profile: React.FC = () => {
  const { profile, user } = useAuth();
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
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Profile Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-8 md:p-12 border border-neutral-100 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/20 border-4 border-white dark:border-neutral-800 shadow-xl overflow-hidden flex items-center justify-center text-5xl font-black text-blue-600">
            {profile?.full_name?.[0] || 'U'}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold mb-2">{profile?.full_name}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">{profile?.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-blue-600 text-sm font-bold flex items-center gap-2">
                <GraduationCap size={16} />
                Student Profile
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl text-amber-600 text-sm font-bold flex items-center gap-2">
                <Award size={16} />
                Bronze Learner
              </div>
            </div>
          </div>
          <button className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 transition-all opacity-40 cursor-not-allowed">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bookmarks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <BookmarksIcon size={24} className="text-blue-600" />
              Saved Lessons
            </h2>
            <span className="text-xs font-black px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">{bookmarks.length}</span>
          </div>

          <div className="space-y-4">
            {bookmarks.map((bookmark, idx) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <Link 
                  to={`/lesson/${bookmark.lesson_id}`}
                  className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-blue-600">
                    <History size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate group-hover:text-blue-600 transition-colors">{bookmark.lesson.title}</p>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">
                      {new Date(bookmark.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <button 
                  onClick={() => removeBookmark(bookmark.id)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-neutral-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}

            {bookmarks.length === 0 && (
              <div className="p-12 text-center rounded-[2rem] border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-400">
                <p className="text-sm">No saved lessons yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Analytics / Progress */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold px-4">Learning Path</h2>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-[2rem] p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <History size={32} className="text-blue-600 opacity-20" />
            </div>
            <h4 className="font-bold mb-2">Detailed Analytics Coming Soon</h4>
            <p className="text-sm text-neutral-500 max-w-xs">
              We're building a deeper way to track your accuracy, speed, and mastery across every chapter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
