import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ArrowRight, Loader2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: 'student',
            },
          },
        });
        if (error) throw error;
        if (data.user) {
          setError('Success! Please check your email for confirmation.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 md:mt-24 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
            <Lock size={28} />
          </div>
          <h1 className="text-4xl font-black mb-3 text-neutral-900 tracking-tighter uppercase leading-none">
            {isLogin ? 'Hello Again' : 'Join Elite'}
          </h1>
          <p className="text-neutral-500 font-medium text-sm max-w-[240px] mx-auto leading-relaxed">
            {isLogin 
              ? 'Access your lessons and track your global rank.' 
              : 'Unlock the complete mathematics curriculum today.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6 relative z-10 text-left">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-neutral-400">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="Burmese Student"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-neutral-100 focus:ring-2 focus:ring-blue-600 transition-all outline-none font-bold text-neutral-900 placeholder:text-neutral-300 shadow-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-neutral-100 focus:ring-2 focus:ring-blue-600 transition-all outline-none font-bold text-neutral-900 placeholder:text-neutral-300 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-neutral-400">Security Key</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-neutral-100 focus:ring-2 focus:ring-blue-600 transition-all outline-none font-bold text-neutral-900 placeholder:text-neutral-300 shadow-sm"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "p-4 rounded-2xl text-xs font-bold flex items-start gap-4 shadow-sm",
                error.includes('Success') 
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                  : "bg-red-50 text-red-600 border border-red-100"
              )}
            >
              <p className="leading-relaxed">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Enter Workspace' : 'Initialize Account')}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center relative z-10">
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-tighter">
            {isLogin ? "NEW TO THE ACADEMY?" : "ALREADY ENROLLED?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-3 text-blue-600 uppercase tracking-widest font-black hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default Auth;
