import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, BookOpen, GraduationCap, FileText, 
  Search, User, LogOut, Home as HomeIcon,
  ShieldCheck, Facebook, Twitter, Github, Youtube, Heart, Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Grade 10', path: '/lessons/10', icon: GraduationCap },
    { name: 'Grade 11', path: '/lessons/11', icon: GraduationCap },
    { name: 'Grade 12', path: '/lessons/12', icon: GraduationCap },
    { name: 'Past Papers', path: '/past-papers', icon: FileText },
  ];

  const isAdmin = false; // Intentionally disabled to hide any Admin menus/controls as requested
  const logoUrl = import.meta.env.VITE_APP_LOGO_URL || '/unlockedu.png';

  const Logo = ({ className }: { className?: string }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <Link to="/" className={cn("flex items-center gap-3 transition-all hover:scale-105 active:scale-95", className)}>
        {!imageError ? (
          <img 
            src={logoUrl} 
            alt="Unlock Education" 
            className="h-10 md:h-14 lg:h-16 w-auto object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-black text-2xl md:text-3xl tracking-tighter text-slate-900 uppercase leading-none">
            UNLOCK<span className="text-blue-600">.EDU</span>
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50/30 text-neutral-900 overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden sm:block hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors lg:hidden active:scale-95"
                aria-label="Toggle Menu"
              >
                {isSidebarOpen ? <X size={24} className="text-slate-600" /> : <Menu size={24} className="text-slate-600" />}
              </button>
              <Logo />
            </div>

            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-semibold tracking-tight transition-all relative py-2",
                    location.pathname === item.path 
                      ? "text-blue-600" 
                      : "text-slate-500 hover:text-blue-600"
                  )}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Profile link intentionally removed */}
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[101] p-6 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <button onClick={toggleSidebar} className="p-2.5 rounded-full bg-slate-100 text-slate-500 active:scale-90">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-4">Navigation</div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold",
                      location.pathname === item.path 
                        ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                        : "text-slate-600 hover:bg-slate-50 active:scale-[0.98]"
                    )}
                  >
                    <item.icon size={22} className={cn(location.pathname === item.path ? "text-white" : "text-slate-400")} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {isAdmin && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                   <Link
                      to="/admin"
                      onClick={toggleSidebar}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-amber-600 bg-amber-50/50 hover:bg-amber-50 transition-all font-bold"
                    >
                      <ShieldCheck size={22} />
                      <span>Admin Control</span>
                    </Link>
                </div>
              )}

               <div className="mt-auto pt-6">
                 {/* Sidebar bottom profile info card intentionally removed to hide auto-authenticated guest status */}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-8 pb-12 md:pb-16 relative">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-3 pb-safe">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {[
            { id: 'home', icon: HomeIcon, path: '/', label: 'Home' },
            { id: 'grade12', icon: GraduationCap, path: '/lessons/12', label: 'Lessons' },
            { id: 'papers', icon: FileText, path: '/past-papers', label: 'Papers' },
          ].map((item) => (
            <Link 
              key={item.id} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 transition-all active:scale-90",
                location.pathname === item.path ? "text-blue-600" : "text-slate-400"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                location.pathname === item.path ? "bg-blue-50" : ""
              )}>
                <item.icon size={20} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-6 md:mt-12 shrink-0 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />
        
        {/* Colorful accent top line */}
        <div className="h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 w-full" />

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
            {/* Logo and Brand Summary */}
            <div className="md:col-span-5 space-y-5">
              <Logo />
              <p className="text-slate-500 max-w-sm leading-relaxed text-xs sm:text-sm">
                Empowering Myanmar high school students with world-class mathematics education. 
                Premium curriculum content, interactive learning, and structured exam mastery.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-400 hover:text-sky-500 border border-slate-100 hover:border-sky-200 transition-all duration-300 hover:shadow-md hover:shadow-sky-100/50 hover:-translate-y-0.5"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-100 hover:border-slate-800 transition-all duration-300 hover:shadow-md hover:shadow-slate-200/50 hover:-translate-y-0.5"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-100 hover:border-red-200 transition-all duration-300 hover:shadow-md hover:shadow-red-100/50 hover:-translate-y-0.5"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Curriculum Column */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[11px] md:text-xs min-h-[16px] flex items-center">
                <span>Curriculum</span>
              </h4>
              <ul className="space-y-3 text-xs md:text-sm font-medium text-slate-500">
                {['Grade 10', 'Grade 11', 'Grade 12'].map((grade, index) => (
                  <li key={grade}>
                    <Link 
                      to={`/lessons/${10 + index}`} 
                      className="group flex items-center gap-1.5 hover:text-blue-600 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-200" />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{grade}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/past-papers" 
                    className="group flex items-center gap-1.5 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Past Papers</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Column */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[11px] md:text-xs min-h-[16px] flex items-center">
                <span>Platform</span>
              </h4>
              <ul className="space-y-3 text-xs md:text-sm font-medium text-slate-500">
                <li>
                  <Link 
                    to="/terms" 
                    className="group flex items-center gap-1.5 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="group flex items-center gap-1.5 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="mailto:support@unlockedu.my" 
                    className="group flex items-center gap-1.5 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Contact Support</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Inspiration Column */}
            <div className="md:col-span-3">
              <div className="bg-slate-50/70 backdrop-blur-sm rounded-2xl p-4 border border-slate-100/80 shadow-sm shadow-slate-100/50 hover:shadow-md hover:shadow-slate-100/80 hover:border-slate-200/60 transition-all duration-300 group">
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Math Inspiration</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed italic mb-2.5">
                  "The study of mathematics, like the Nile, begins in minuteness but ends in magnificence."
                </p>
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
                  <span>— Charles Caleb Colton</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[8px] uppercase tracking-normal">Premium Learning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Block */}
          <div className="border-t border-slate-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-1">
              <span>© 2026 Unlock Education. All Right Reserved.</span>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 text-[10px] sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-500 tracking-wider uppercase text-[9px] sm:text-[10px]">
                Platform Status: <span className="text-emerald-600 font-bold">Operational</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
};
