import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, BookOpen, GraduationCap, FileText, 
  Search, User, LogOut, Sun, Moon, Home as HomeIcon,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Grade 10', path: '/grade/10', icon: GraduationCap },
    { name: 'Grade 11', path: '/grade/11', icon: GraduationCap },
    { name: 'Grade 12', path: '/grade/12', icon: GraduationCap },
    { name: 'Past Papers', path: '/past-papers', icon: FileText },
  ];

  const isAdmin = profile?.role === 'admin' || profile?.role === 'teacher';

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900")}>
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
                aria-label="Toggle Menu"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  <BookOpen className="text-white" size={20} />
                </div>
                <span className="font-black text-xl tracking-tighter text-neutral-900 dark:text-neutral-50">UNLOCK</span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-bold tracking-tight transition-all relative py-1",
                    location.pathname === item.path 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                  )}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 md:gap-5">
              <button 
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
                aria-label="Toggle Color Theme"
              >
                {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
              </button>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900 shadow-sm flex items-center justify-center text-xs font-black overflow-hidden group-hover:border-blue-500 transition-all">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={18} />
                      )}
                    </div>
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 px-5 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-neutral-900/10 dark:shadow-none"
                >
                  Join
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-neutral-900 z-[101] p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <Link to="/" className="flex items-center gap-2.5" onClick={toggleSidebar}>
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <span className="font-black text-xl tracking-tighter">UNLOCK</span>
                </Link>
                <button onClick={toggleSidebar} className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-1.5">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold",
                      location.pathname === item.path 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    <item.icon size={22} className={cn(location.pathname === item.path ? "text-white" : "text-neutral-400")} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {isAdmin && (
                <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                   <Link
                      to="/admin"
                      onClick={toggleSidebar}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all font-bold"
                    >
                      <ShieldCheck size={22} />
                      <span>Admin Dashboard</span>
                    </Link>
                </div>
              )}

              <div className="absolute bottom-8 left-6 right-6">
                {user ? (
                   <button 
                    onClick={() => {
                      signOut();
                      toggleSidebar();
                    }}
                    className="flex w-full items-center justify-center gap-3 p-4 rounded-2xl font-bold bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <Link 
                    to="/auth" 
                    onClick={toggleSidebar}
                    className="flex items-center justify-center p-4 rounded-2xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  >
                    Start Learning
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 pb-safe-area-inset-bottom">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {[
            { id: 'home', icon: HomeIcon, path: '/', label: 'Home' },
            { id: 'grade12', icon: GraduationCap, path: '/grade/12', label: 'Maths' },
            { id: 'papers', icon: FileText, path: '/past-papers', label: 'Papers' },
            { id: 'profile', icon: User, path: '/profile', label: 'Me' }
          ].map((item) => (
            <Link 
              key={item.id} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                location.pathname === item.path ? "text-blue-600 dark:text-blue-400 scale-110" : "text-neutral-400"
              )}
            >
              <item.icon size={22} className={cn(location.pathname === item.path ? "fill-blue-600/10" : "")} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-blue-600" size={24} />
                <span className="font-bold text-xl">Unlock Education</span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-sm">
                Empowering Myanmar high school students with quality mathematics education. 
                Learn chapter by chapter, practice with quizzes, and master past papers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li><Link to="/grade/10" className="hover:text-blue-600">Grade 10 Curriculum</Link></li>
                <li><Link to="/grade/11" className="hover:text-blue-600">Grade 11 Curriculum</Link></li>
                <li><Link to="/grade/12" className="hover:text-blue-600">Grade 12 Curriculum</Link></li>
                <li><Link to="/past-papers" className="hover:text-blue-600">Matriculation Papers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li><Link to="/help" className="hover:text-blue-600">Help Center</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-100 dark:border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
            <p>© 2024 Unlock Education. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Made with ❤️ for students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
