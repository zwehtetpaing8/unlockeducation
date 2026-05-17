import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  color?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, iconName, color = "blue" }) => {
  const Icon = (Icons as any)[iconName] || Icons.Zap;
  
  const colors: Record<string, { bg: string, text: string, border: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
  };

  const theme = colors[color] || colors.blue;

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group"
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 ${theme.bg} ${theme.text} rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
        <Icon size={28} />
      </div>
      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 uppercase tracking-tight break-words">{title}</h4>
      <p className="text-sm text-slate-500 font-bold leading-[1.6] break-words overflow-wrap-anywhere">{description}</p>
      
      {/* Decorative pulse */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${theme.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
    </motion.div>
  );
};

export const FeatureGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
    {children}
  </div>
);
