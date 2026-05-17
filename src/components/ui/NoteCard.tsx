import React from 'react';
import { motion } from 'motion/react';
import { Info, Lightbulb, AlertTriangle, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NoteCardProps {
  type?: 'info' | 'tip' | 'warning' | 'definition';
  title: string;
  children: React.ReactNode;
}

export const NoteCard: React.FC<NoteCardProps> = ({ type = 'info', title, children }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [shouldShowToggle, setShouldShowToggle] = React.useState(false);

  React.useEffect(() => {
    if (contentRef.current) {
      // If content is higher than 100px, show toggle
      setShouldShowToggle(contentRef.current.scrollHeight > 120);
    }
  }, [children]);

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
      className={`my-8 p-4 md:p-6 rounded-[2rem] border ${config.bg} ${config.border} flex gap-4 md:gap-6 items-start shadow-sm transition-all duration-300`}
    >
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0 shadow-inner`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-3 ${config.text} break-words`}>{title}</h5>
        <div 
          ref={contentRef}
          className={cn(
            `text-[14px] md:text-[15px] font-medium leading-[1.6] ${config.text} opacity-90 break-words overflow-wrap-anywhere transition-all duration-300`,
            !isExpanded && shouldShowToggle && "max-h-[100px] overflow-hidden relative"
          )}
        >
          {children}
          {!isExpanded && shouldShowToggle && (
            <div className={`absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-${type === 'info' ? 'blue' : type === 'tip' ? 'amber' : type === 'warning' ? 'rose' : 'emerald'}-50 to-transparent pointer-events-none`} />
          )}
        </div>
        {shouldShowToggle && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-3 text-[10px] font-black uppercase tracking-widest ${config.text} hover:opacity-100 opacity-60 transition-all flex items-center gap-1 group`}
          >
            {isExpanded ? 'Show Less' : 'Read Full Description'}
            <ChevronRight size={12} className={cn("transition-transform", isExpanded ? "-rotate-90" : "rotate-90 group-hover:translate-y-0.5")} />
          </button>
        )}
      </div>
    </motion.div>
  );
};
