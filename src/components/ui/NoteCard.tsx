import React from 'react';
import { motion } from 'motion/react';
import { Info, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NoteCardProps {
  type?: 'info' | 'tip' | 'warning' | 'definition';
  title: string;
  children: React.ReactNode;
}

export const NoteCard: React.FC<NoteCardProps> = ({ type = 'info', title, children }) => {
  const configs = {
    info: {
      icon: Info,
      bg: 'bg-blue-50/75 shadow-sm hover:shadow-md border-blue-100',
      text: 'text-blue-900',
      iconBg: 'bg-blue-100/50',
      iconColor: 'text-blue-600'
    },
    tip: {
      icon: Lightbulb,
      bg: 'bg-amber-50/75 shadow-sm hover:shadow-md border-amber-100',
      text: 'text-amber-900',
      iconBg: 'bg-amber-100/50',
      iconColor: 'text-amber-600'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-rose-50/75 shadow-sm hover:shadow-md border-rose-100',
      text: 'text-rose-900',
      iconBg: 'bg-rose-100/50',
      iconColor: 'text-rose-600'
    },
    definition: {
      icon: BookOpen,
      bg: 'bg-emerald-50/80 shadow-sm hover:shadow-md border-emerald-100/80',
      text: 'text-emerald-950',
      iconBg: 'bg-emerald-100/50',
      iconColor: 'text-emerald-700'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`my-6 p-5 md:p-6 rounded-[2rem] border ${config.bg} flex gap-4 md:gap-5 items-start transition-all duration-300 relative overflow-hidden`}
    >
      <div className={`w-10 h-10 rounded-2xl ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0 shadow-sm border border-black/5`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-2.5 ${config.text} opacity-75`}>{title}</h5>
        <div className={`text-[15px] md:text-base font-semibold leading-[1.6] ${config.text} break-words`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
