import React from 'react';
import { motion } from 'motion/react';
import { Info, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';

interface NoteCardProps {
  type?: 'info' | 'tip' | 'warning' | 'definition';
  title: string;
  children: React.ReactNode;
}

export const NoteCard: React.FC<NoteCardProps> = ({ type = 'info', title, children }) => {
  const configs = {
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    tip: {
      icon: Lightbulb,
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      text: 'text-amber-700',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      text: 'text-rose-700',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600'
    },
    definition: {
      icon: BookOpen,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`my-8 p-4 md:p-6 rounded-[2rem] border ${config.bg} ${config.border} flex gap-4 md:gap-6 items-start shadow-sm`}
    >
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <h5 className={`text-xs md:text-sm font-black uppercase tracking-widest mb-2 ${config.text} break-words`}>{title}</h5>
        <div className={`text-[14px] md:text-[15px] font-medium leading-[1.6] ${config.text} opacity-90 break-words overflow-wrap-anywhere`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
