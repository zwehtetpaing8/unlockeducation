import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  Mail, Lock, User, ArrowRight, Loader2, Info, 
  Eye, EyeOff, BookOpen, GraduationCap, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';
import { Profile as ProfileType } from '../types';

const Auth: React.FC = () => {
  const { user, setAuthSession, isDemo } = useAuth();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('12');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // If already logged in, send them home
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (!isLogin && !fullName.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isDemo) {
        // --- DEMO MODE SIGN IN / SIGN UP ---
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate api call latency

        const computedUserId = `demo-user-${email.toLowerCase().replace(/[^a-z0-9]/g, '') || 'guest'}`;
        const mockUser: SupabaseUser = {
          id: computedUserId,
          email: email,
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as SupabaseUser;

        const mockProfile: ProfileType = {
          id: computedUserId,
          email: email,
          full_name: isLogin ? (email.split('@')[0].toUpperCase() || 'Demo Student') : fullName,
          role: isLogin ? (email.includes('admin') ? 'admin' : email.includes('teacher') ? 'teacher' : 'student') : role,
          grade_level: isLogin ? 12 : parseInt(gradeLevel),
          avatar_url: null,
          created_at: new Date().toISOString(),
        };

        const mockSession: SupabaseSession = {
          access_token: 'demo-token-12345',
          token_type: 'bearer',
          expires_in: 3600,
          refresh_token: 'demo-refresh-token',
          user: mockUser,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        } as SupabaseSession;

        if (setAuthSession) {
          setAuthSession(mockUser, mockProfile, mockSession);
        }
        setSuccess('Logged in successfully in offline Demo Mode!');
        setTimeout(() => navigate('/'), 1000);

      } else {
        // --- REAL PRODUCTION SUPABASE FLOW ---
        if (isLogin) {
          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) throw signInError;
          setSuccess('Successfully signed in!');
          setTimeout(() => navigate('/'), 1000);
        } else {
          // Sign Up
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (signUpError) throw signUpError;

          if (signUpData?.user) {
            // Upsert profile
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: signUpData.user.id,
                email,
                full_name: fullName,
                role: role,
                grade_level: parseInt(gradeLevel),
                avatar_url: null,
                created_at: new Date().toISOString()
              });

            if (profileError) {
              console.error('Error creating profile database entry:', profileError);
              setError(`Account created, but database profile creation failed: ${profileError.message}`);
            } else {
              setSuccess('Account created successfully! Please check your email inbox if verification is enabled.');
              // If immediately logged in (e.g. email confirmation disabled in sandbox):
              if (signUpData.session) {
                setTimeout(() => navigate('/'), 1200);
              }
            }
          } else {
            setSuccess('Registration triggered!');
          }
        }
      }
    } catch (err: any) {
      console.error('Auth handler error:', err);
      setError(err?.message || 'An unexpected error occurred during auth.');
    } finally {
      setLoading(false);
    }
  };

  const loadQuickDemoUser = (demoType: 'student' | 'teacher' | 'admin') => {
    let targetEmail = '';
    let targetFullName = '';
    
    if (demoType === 'student') {
      targetEmail = 'student@unlockedu.com';
      targetFullName = 'Aung Aung (Demo)';
    } else if (demoType === 'teacher') {
      targetEmail = 'teacher@unlockedu.com';
      targetFullName = 'U Ba (Math Teacher)';
    } else {
      targetEmail = 'admin@unlockedu.com';
      targetFullName = 'Admin Root';
    }

    setEmail(targetEmail);
    setPassword('password123');
    setFullName(targetFullName);
    setIsLogin(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 relative">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-72 h-72 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/10 mb-2">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            Unlock<span className="text-blue-600">.Edu</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Myanmar High School Mathematics Mastery Portal
          </p>
        </div>

        {/* Demo Mode Notice */}
        {isDemo && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-3"
          >
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase text-[10px] tracking-wider text-amber-700 block mb-1">
                  💡 Sandbox Demo Mode Active
                </span>
                Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not set in your variables. You can log in instantly with any simulated credentials below!
              </div>
            </div>
            
            <div className="pt-2 border-t border-amber-200/50 flex flex-wrap gap-2 items-center">
              <span className="font-bold text-[9px] uppercase tracking-wider text-amber-800">Quick Log In:</span>
              <button 
                type="button"
                onClick={() => loadQuickDemoUser('student')}
                className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold tracking-tight transition-colors text-[10px]"
              >
                🎓 Student
              </button>
              <button 
                type="button"
                onClick={() => loadQuickDemoUser('teacher')}
                className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold tracking-tight transition-colors text-[10px]"
              >
                🏫 Teacher
              </button>
              <button 
                type="button"
                onClick={() => loadQuickDemoUser('admin')}
                className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold tracking-tight transition-colors text-[10px]"
              >
                ⚙️ Admin
              </button>
            </div>
          </motion.div>
        )}

        {/* Auth Card */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl p-8 md:p-10 relative overflow-hidden">
          {/* Progress loader overlays */}
          {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="text-xs font-black uppercase text-slate-500 tracking-widest">
                Processing Secure Request
              </span>
            </div>
          )}

          {/* Form Tabs */}
          <div className="flex bg-slate-50 p-1 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError(null);
                setSuccess(null);
              }}
              className={cn(
                "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all",
                isLogin 
                  ? "bg-white text-blue-600 shadow-md" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError(null);
                setSuccess(null);
              }}
              className={cn(
                "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all",
                !isLogin 
                  ? "bg-white text-blue-600 shadow-md" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              Register
            </button>
          </div>

          {/* Toast Alert Systems */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-800 text-xs font-semibold leading-relaxed flex items-start gap-2 overflow-hidden"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold leading-relaxed flex items-start gap-2 overflow-hidden"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name (Sign Up only) */}
            {!isLogin && (
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Mg Aung Kyaw"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-semibold tracking-tight transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-semibold tracking-tight transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-semibold tracking-tight transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Register Extra Fields */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                {/* Grade Level */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Grade Level
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full pl-10 pr-3 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl text-xs font-bold tracking-tight transition-all outline-none appearance-none"
                    >
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                </div>

                {/* Role selection */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Who Are You?
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full pl-10 pr-3 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl text-xs font-bold tracking-tight transition-all outline-none appearance-none"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full group py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="uppercase text-xs tracking-widest font-black">
                {isLogin ? 'Sign In' : 'Create Profile'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
