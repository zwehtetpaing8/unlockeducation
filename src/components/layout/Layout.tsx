import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, BookOpen, GraduationCap, FileText, 
  Search, User, LogOut, Home as HomeIcon,
  ShieldCheck
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

  const isAdmin = profile?.role === 'admin' || profile?.role === 'teacher';
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
    <div className="min-h-screen transition-colors duration-300 bg-slate-50/30 text-neutral-900 overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-900">
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

            <div className="flex items-center gap-2">
              <Link 
                to="/profile"
                className={cn(
                  "p-2.5 rounded-full transition-all active:scale-95",
                  location.pathname === '/profile' ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <User size={22} />
              </Link>
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
                <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{profile?.full_name || 'Student'}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => signOut()} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12 pb-32 relative">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-3 pb-safe">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {[
            { id: 'home', icon: HomeIcon, path: '/', label: 'Home' },
            { id: 'grade12', icon: GraduationCap, path: '/lessons/12', label: 'Lessons' },
            { id: 'papers', icon: FileText, path: '/past-papers', label: 'Papers' },
            { id: 'profile', icon: User, path: '/profile', label: 'Account' },
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
      <footer className="bg-white border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Logo />
              <p className="text-slate-500 max-w-sm leading-relaxed">
                Empowering Myanmar high school students with world-class mathematics education. 
                Premium content, interactive learning, and exam mastery.
              </p>
              <div className="flex gap-4">
                {/* Social links placeholder */}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Curriculum</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><Link to="/lessons/10" className="hover:text-blue-600 transition-colors">Grade 10</Link></li>
                <li><Link to="/lessons/11" className="hover:text-blue-600 transition-colors">Grade 11</Link></li>
                <li><Link to="/lessons/12" className="hover:text-blue-600 transition-colors">Grade 12</Link></li>
                <li><Link to="/past-papers" className="hover:text-blue-600 transition-colors">Past Papers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><Link to="/profile" className="hover:text-blue-600 transition-colors">My Profile</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:support@unlockedu.my" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            <p>© 2024 Unlock Education. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platform Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
};
