import React, { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  color?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, iconName, color = "blue" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      className="bg-white border border-slate-100 p-5 sm:p-6 md:p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group h-full flex flex-col min-w-0 w-full"
    >
      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${theme.bg} ${theme.text} rounded-3xl flex items-center justify-center mb-5 sm:mb-6 group-hover:rotate-12 transition-transform duration-500 shrink-0`}>
        <Icon size={24} className="md:w-7 md:h-7" />
      </div>
      <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight break-words whitespace-normal leading-tight min-w-0">{title}</h4>
      
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-xs sm:text-[13px] md:text-sm text-slate-500 font-medium leading-[1.6] break-words whitespace-normal transition-all duration-300 min-w-0",
          !isExpanded && "line-clamp-4"
        )}>
          {description}
        </p>
        
        {description.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-4 text-[10px] font-black uppercase tracking-widest ${theme.text} hover:opacity-80 transition-all flex items-center gap-1`}
          >
            {isExpanded ? 'Show Less' : 'Full Text'}
            <Icons.ChevronRight size={12} className={cn("transition-transform", isExpanded ? "-rotate-90" : "rotate-90")} />
          </button>
        )}
      </div>
      
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
