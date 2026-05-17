import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="my-16 relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2 hidden md:block" />
      
      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`relative flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            {/* Dot on line */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full -translate-x-1/2 z-10 hidden md:block" />
            
            {/* Content */}
            <div className="w-full md:w-[45%] pl-8 md:pl-0">
              <div className={`bg-white border border-slate-100 p-5 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Clock size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{event.year}</span>
                </div>
                <h4 className="text-lg md:text-xl font-black text-slate-900 mb-2 uppercase tracking-tight break-words">{event.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium break-words overflow-wrap-anywhere whitespace-normal">
                  {event.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
