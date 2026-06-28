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
  const defaultUser = {
    id: 'guest-student-john-doe',
    email: 'guest@example.com',
    user_metadata: {
      full_name: 'MM-Maths Student',
      role: 'student',
      grade_level: 12
    },
    aud: 'authenticated',
    created_at: new Date().toISOString()
  } as any;

  const defaultProfile = {
    id: 'guest-student-john-doe',
    email: 'guest@example.com',
    full_name: 'MM-Maths Student',
    role: 'student',
    grade_level: 12,
    avatar_url: null,
    created_at: new Date().toISOString()
  } as any;

  const defaultSession = {
    access_token: 'mock-access-token-999',
    token_type: 'bearer',
    user: defaultUser
  } as any;

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [forceDemo, setForceDemo] = useState(true);

  const hasSupabaseKeys = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

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
      // Offline / Demo Mode: Look for a saved session in localStorage
      const savedMockSession = localStorage.getItem('unlockedu_mock_session');
      if (savedMockSession) {
        try {
          const parsed = JSON.parse(savedMockSession);
          setUser(parsed.user || null);
          setProfile(parsed.profile || null);
          setSession(parsed.session || null);
        } catch (e) {
          console.error('Error parsing saved mock session', e);
          setUser(null);
          setProfile(null);
          setSession(null);
        }
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    }).catch(err => {
      console.error('Supabase session fetch error', err);
      setUser(null);
      setProfile(null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, [hasSupabaseKeys]);

  const fetchProfile = async (userId: string, currentUser?: User) => {
    if (!hasSupabaseKeys) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (data) {
        let profileData = { ...data };
        const userEmail = profileData.email?.toLowerCase() || currentUser?.email?.toLowerCase() || '';
        if (userEmail === 'unlockedntube@gmail.com' || userEmail.includes('unlockedntube') || userEmail.includes('admin')) {
          profileData.role = 'admin';
          if (data.role !== 'admin') {
            await supabase.from('profiles').update({ role: 'admin' }).eq('id', userId);
          }
        }
        setProfile(profileData);
      } else {
        // If data is null or query has an error, we check if we can reconstruct the profile
        // using the user's metadata stored in Auth
        const activeUser = currentUser || user;
        if (activeUser) {
          const meta = activeUser.user_metadata || {};
          const nameVal = meta.full_name || activeUser.email?.split('@')[0] || 'Student';
          const userEmail = activeUser.email?.toLowerCase() || '';
          let roleVal = meta.role || 'student';
          
          if (userEmail === 'unlockedntube@gmail.com' || userEmail.includes('unlockedntube') || userEmail.includes('admin')) {
            roleVal = 'admin';
          }
          
          const gradeVal = meta.grade_level ? parseInt(meta.grade_level) : 12;

          // Attempt to create the missing profile row
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .upsert({
              id: userId,
              email: activeUser.email,
              full_name: nameVal,
              role: roleVal,
              grade_level: gradeVal,
              avatar_url: null,
              created_at: new Date().toISOString()
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error auto-creating user profile in database:', insertError.message);
          } else if (newProfile) {
            setProfile(newProfile);
          }
        }
      }
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
    } else {
      localStorage.removeItem('unlockedu_mock_session');
    }
    // Set to null so the user is completely signed out
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
