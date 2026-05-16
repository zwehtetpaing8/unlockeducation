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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

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
      <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <BookOpen className="text-white" size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight">Unlock Education</span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium hover:text-blue-600 transition-colors",
                    location.pathname === item.path ? "text-blue-600" : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-bold overflow-hidden border border-neutral-300 dark:border-neutral-600">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile?.full_name?.[0] || 'U'
                      )}
                    </div>
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-red-500"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-900 z-50 p-6 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={toggleSidebar}>
                  <BookOpen className="text-blue-600" size={24} />
                  <span className="font-bold text-xl">Unlock Education</span>
                </Link>
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      location.pathname === item.path 
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" 
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              {isAdmin && (
                <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                   <Link
                      to="/admin"
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all"
                    >
                      <ShieldCheck size={20} />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

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
