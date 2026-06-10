import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setAuthSession?: (user: User | null, profile: Profile | null, session: Session | null) => void;
  isDemo: boolean;
  enableDemoMode?: () => void;
  disableDemoMode?: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [forceDemo, setForceDemo] = useState(() => localStorage.getItem('unlockedu_force_demo') === 'true');

  const hasSupabaseKeys = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) && !forceDemo;

  const enableDemoMode = () => {
    localStorage.setItem('unlockedu_force_demo', 'true');
    setForceDemo(true);
  };

  const disableDemoMode = () => {
    localStorage.removeItem('unlockedu_force_demo');
    setForceDemo(false);
  };

  useEffect(() => {
    if (!hasSupabaseKeys) {
      try {
        const stored = localStorage.getItem('unlockedu_mock_session');
        if (stored) {
          const { user: mockUser, profile: mockProfile, session: mockSession } = JSON.parse(stored);
          setUser(mockUser);
          setProfile(mockProfile);
          setSession(mockSession);
        }
      } catch (e) {
        console.error('Failed to parse mock session', e);
      } finally {
        setLoading(false);
      }
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    }).catch(err => {
      console.error('Supabase session fetch error', err);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, [hasSupabaseKeys]);

  const fetchProfile = async (userId: string) => {
    if (!hasSupabaseKeys) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) setProfile(data);
      if (error) console.warn('Error fetching profile:', error.message);
    } catch (e) {
      console.error('Profile fetch failed', e);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (hasSupabaseKeys) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Error signing out of Supabase:', e);
      }
    }
    localStorage.removeItem('unlockedu_mock_session');
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const setAuthSession = (newUser: User | null, newProfile: Profile | null, newSession: Session | null) => {
    setUser(newUser);
    setProfile(newProfile);
    setSession(newSession);
    if (!hasSupabaseKeys && newUser) {
      localStorage.setItem('unlockedu_mock_session', JSON.stringify({
        user: newUser,
        profile: newProfile,
        session: newSession
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      session, 
      loading, 
      signOut, 
      setAuthSession, 
      isDemo: !hasSupabaseKeys,
      enableDemoMode,
      disableDemoMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
