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

const formatErrorMessage = (err: any): string => {
  if (!err) return 'An unexpected error occurred during auth.';
  if (typeof err === 'string') return err;

  // Handle specific Supabase AuthRetryableFetchError or 504 with "{}" as the message
  if (
    err.name === 'AuthRetryableFetchError' || 
    err.status === 504 || 
    err._status === 504 ||
    err.message === '{}' ||
    (err.message && String(err.message).trim() === '{}')
  ) {
    return 'Email delivery timeout (504). This happens when Supabase is unable to connect to your SMTP/Outlook server or when the email rate limit is exceeded. Please verify your SMTP config in the Supabase Dashboard, or go to your Supabase Project -> Auth Settings -> "Providers" / "Email" and disable "Confirm email" to register and log in instantly without verification email.';
  }

  if (err.message && typeof err.message === 'string' && err.message !== '{}') return err.message;
  if (err.error_description && typeof err.error_description === 'string') return err.error_description;
  if (err.error && typeof err.error === 'string') return err.error;
  if (err.error && typeof err.error === 'object' && err.error.message) return String(err.error.message);
  
  const str = String(err);
  if (str && str !== '[object Object]') return str;
  
  try {
    const json = JSON.stringify(err);
    if (json && json !== '{}') return json;
  } catch (_) {}
  
  return 'An unexpected error occurred during auth.';
};

const Auth: React.FC = () => {
  const { user, setAuthSession, isDemo, enableDemoMode, disableDemoMode } = useAuth();
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
  const [isConnectionError, setIsConnectionError] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pastedUrl, setPastedUrl] = useState('');
  const [showPastedInput, setShowPastedInput] = useState(false);

  // Checks for password recovery link redirection (contains token/type)
  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    if (
      (hash && (hash.includes('type=recovery') || hash.includes('access_token='))) ||
      urlParams.get('recovery') === 'true'
    ) {
      setIsRecoveryMode(true);
    }
  }, []);

  // If already logged in AND NOT currently in recovery mode, send them home
  useEffect(() => {
    if (user && !isRecoveryMode) {
      navigate('/profile');
    }
  }, [user, isRecoveryMode, navigate]);

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
    setIsConnectionError(false);

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
            options: {
              data: {
                full_name: fullName,
                role: role,
                grade_level: parseInt(gradeLevel),
              },
            },
          });

          if (signUpError) throw signUpError;

          if (signUpData?.user) {
            if (signUpData.session) {
              // Upsert profile immediately since we have an active session (auto-confirmation)
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
                setError(`Account created, but database profile creation failed: ${formatErrorMessage(profileError)}`);
              } else {
                setSuccess('Account created and logged in successfully!');
                setTimeout(() => navigate('/'), 1200);
              }
            } else {
              // Wait for email verification
              setSuccess('Account created successfully! Please check your email inbox to verify your email and activate your profile.');
            }
          } else {
            setSuccess('Registration triggered! Please check your email inbox.');
          }
        }
      }
    } catch (err: any) {
      console.error('Auth handler error:', err);
      const errMsg = formatErrorMessage(err);
      setError(errMsg);
      
      const lowerMsg = errMsg.toLowerCase();
      if (lowerMsg.includes('failed to fetch') || lowerMsg.includes('networkerror') || lowerMsg.includes('network error') || lowerMsg.includes('database connection') || lowerMsg.includes('invalid url')) {
        setIsConnectionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsConnectionError(false);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      if (isDemo) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSuccess(`[DEMO SIMULATION] A temporary password reset link has been simulated for ${email}. In a production environment, Supabase would dispatch a secure email reset token.`);
      } else {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?recovery=true`,
        });
        if (resetError) throw resetError;
        setSuccess('A secure password configuration link has been successfully dispatched to your email address. Please inspect your inbox.');
      }
    } catch (err: any) {
      console.error('Password recovery error:', err);
      const errMsg = err?.message || 'An error occurred during password recovery request.';
      setError(errMsg);
      const lowerMsg = errMsg.toLowerCase();
      if (lowerMsg.includes('failed to fetch') || lowerMsg.includes('networkerror') || lowerMsg.includes('network error') || lowerMsg.includes('database connection')) {
        setIsConnectionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasteRecoveryUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!pastedUrl) {
      setError('Please paste the complete url or token fragment.');
      return;
    }

    setLoading(true);
    try {
      const cleanUrl = pastedUrl.trim();
      let hashContent = '';
      if (cleanUrl.includes('#')) {
        hashContent = cleanUrl.substring(cleanUrl.indexOf('#') + 1);
      } else if (cleanUrl.includes('?')) {
        hashContent = cleanUrl.substring(cleanUrl.indexOf('?') + 1);
      } else {
        hashContent = cleanUrl;
      }

      const params = new URLSearchParams(hashContent);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        if (isDemo) {
          setSuccess('Demo mode: Recovery URL token parsed successfully. Please set your new password.');
          setIsForgotPassword(false);
          setIsRecoveryMode(true);
        } else {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) throw sessionError;
          setSuccess('Your recovery session has been successfully activated! Setup your new password below.');
          setIsForgotPassword(false);
          setIsRecoveryMode(true);
        }
      } else {
        throw new Error('Could not find both active access_token and refresh_token in the pasted string. Check that you copied the complete redirect URL.');
      }
    } catch (err: any) {
      console.error('Manual recovery parser error:', err);
      setError(err?.message || 'Failed to parse recovery URL. Ensure the complete URL from the address bar is pasted.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (isDemo) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSuccess('Successfully changed mock account password! Redirecting you into home page now.');
        setTimeout(() => {
          setIsRecoveryMode(false);
          setNewPassword('');
          setConfirmPassword('');
          navigate('/');
        }, 1500);
      } else {
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (updateError) throw updateError;
        setSuccess('Password updated successfully! Authenticated session established.');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err: any) {
      console.error('Password change error:', err);
      setError(err?.message || 'An error occurred while updating the password.');
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
                {localStorage.getItem('unlockedu_force_demo') === 'true' ? (
                  <span>
                    You have bypassed the database to use offline Demo Mode. Real database saves are paused but you can explore all features seamlessly!{' '}
                    <button 
                      type="button" 
                      onClick={() => {
                        if (disableDemoMode) {
                          disableDemoMode();
                          window.location.reload();
                        }
                      }}
                      className="underline font-bold text-blue-600 hover:text-blue-800 transition-colors inline-block"
                    >
                      Disable Demo & Try Reconnecting
                    </button>
                  </span>
                ) : (
                  <span>
                    Supabase credentials (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not set in your variables. You can log in instantly with any simulated credentials below!
                  </span>
                )}
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

          {/* Form Tabs or Stage Header */}
          {isRecoveryMode ? (
            <div className="mb-8 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Secure Session
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-800">
                Setup New Password
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Choose a strong secure password to update your registration credentials.
              </p>
            </div>
          ) : isForgotPassword ? (
            <div className="mb-8 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Security recovery
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-800">
                Forgot Password?
              </h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Enter your registered Email to request a password configuration link.
              </p>
            </div>
          ) : (
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
          )}

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

          {isConnectionError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-3xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-3 text-left animate-pulse-subtle"
            >
              <div className="flex items-start gap-2.5">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-[10px] tracking-wider text-amber-700 block mb-1">
                    💡 Database Connection Issue
                  </span>
                  The Supabase database provider is unreachable (Failed to fetch). We recommend switching to our offline Sandbox Demo Mode to test all features instantly!
                </div>
              </div>
              <div className="pt-2 border-t border-amber-200/50 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (enableDemoMode) {
                      enableDemoMode();
                      setError(null);
                      setIsConnectionError(false);
                      setSuccess('Sandbox Demo Mode activated! Select an account to start instantly.');
                    }
                  }}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold tracking-tight rounded-xl text-[10px] uppercase transition-colors shadow-sm shadow-amber-600/15"
                >
                  Enable Sandbox Demo Mode
                </button>
              </div>
            </motion.div>
          )}

          {/* Form */}
          {isRecoveryMode ? (
            <form onSubmit={handleUpdatePasswordSubmit} className="space-y-5">
              {/* New Password */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              {/* Confirm New Password */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl text-sm font-semibold tracking-tight transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit Update Password */}
              <button
                type="submit"
                className="w-full group py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="uppercase text-xs tracking-widest font-black">
                  Update Password
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecoveryMode(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          ) : isForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
              {/* Recovery Email */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Registered Email Address
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

              {/* Submit Recovery Link */}
              <button
                type="submit"
                className="w-full group py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="uppercase text-xs tracking-widest font-black">
                  Send Recovery Link
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Sandbox Redirect Troubleshooting Help */}
              <div className="pt-4 border-t border-slate-100">
                {!showPastedInput ? (
                  <button
                    type="button"
                    onClick={() => setShowPastedInput(true)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5 mx-auto"
                  >
                    <span>💡 Clicked your email link but got a localhost error?</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-left space-y-3.5">
                    <div className="flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <div>
                        <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                          Web Sandbox Reset Helper
                        </h4>
                        <p className="text-[11px] text-blue-800 leading-relaxed mt-0.5">
                          Since this is an online sandbox environment, clicking Supabase's email link will redirect you to <code className="bg-blue-100 px-1 py-0.5 rounded font-mono text-[10px]">localhost:3000</code> by default (which won't load).
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-blue-900">
                        How to proceed instantly:
                      </p>
                      <ol className="list-decimal pl-4 text-[10px] text-blue-800 leading-relaxed space-y-1">
                        <li>Open the verification email and click the confirmation button.</li>
                        <li>When the new tab fails to load (e.g. "This site can't be reached" at <strong>localhost:3000</strong>), <strong>copy that entire URL</strong> from your address bar.</li>
                        <li>Paste that exact URL in the field below to launch recovery mode!</li>
                      </ol>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-blue-100">
                      <label className="text-[9px] font-black uppercase tracking-wider text-blue-900 block">
                        Paste the broken localhost URL here:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pastedUrl}
                          onChange={(e) => setPastedUrl(e.target.value)}
                          placeholder="http://localhost:3000/#access_token=..."
                          className="flex-1 px-3 py-2 bg-white border border-blue-200 focus:border-blue-500 rounded-xl text-xs font-mono outline-none"
                        />
                        <button
                          type="button"
                          onClick={handlePasteRecoveryUrl}
                          className="px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                        >
                          Verify Link
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1 text-[10px]">
                      <span className="text-slate-400 font-medium">To fix permanently:</span>
                      <a 
                        href="https://supabase.com/dashboard" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline font-bold"
                      >
                        Set redirect URLs in Supabase
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          ) : (
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

              {/* Forgot Password Link Trigger */}
              {isLogin && (
                <div className="flex justify-end -mt-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

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
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
