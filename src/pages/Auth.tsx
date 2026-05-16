import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ArrowRight, Loader2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  
  // Authentication is temporarily disabled
  React.useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Auth;
