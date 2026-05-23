import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Brain, ArrowLeft, Target, 
  CheckCircle2, Info, ChevronDown, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { NoteCard } from '../components/ui/NoteCard';
import { cn } from '../lib/utils';

const TouchingPlaneDiagram: React.FC<{ centerLabel?: string, equation?: string }> = ({ centerLabel, equation }) => {
  return (
    <div className="my-12 flex flex-col items-center gap-6 bg-slate-50/30 p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm overflow-visible">
      <svg width="480" height="360" viewBox="0 0 480 360" className="max-w-full overflow-visible drop-shadow-2xl">
        <defs>
          <radialGradient id="sphereBall" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FAFAFF" />
            <stop offset="100%" stopColor="#283593" stopOpacity={0.2} />
          </radialGradient>
          <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a237e" />
            <stop offset="100%" stopColor="#5c6bc0" />
          </linearGradient>
          <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
        </defs>

        {/* Global Ground Shadow */}
        <ellipse cx="240" cy="280" rx="140" ry="25" fill="black" opacity="0.08" filter="url(#shadowBlur)" />
        
        {/* Plane Shadow */}
        <path d="M 65 265 L 385 265 L 445 225 L 125 225 Z" fill="black" opacity="0.12" transform="translate(4, 4)" />
        
        {/* The Plane (Prism Blue) */}
        <path d="M 60 260 L 380 260 L 440 220 L 120 220 Z" fill="url(#planeGrad)" stroke="#1a237e" strokeWidth="1.5" />
        
        {/* Highlight on front edge of plane */}
        <line x1="60" y1="260" x2="380" y2="260" stroke="white" strokeWidth="1" strokeOpacity="0.3" />

        {/* Touching Area Highlight (Gold) */}
        <ellipse cx="240" cy="240" rx="45" ry="12" fill="#F9A825" opacity="0.15" />

        {/* Sphere Body */}
        <circle cx="240" cy="115" r="125" fill="url(#sphereBall)" stroke="#283593" strokeWidth="2.5" />
        
        {/* Latitude/Longitude dashed lines */}
        <ellipse cx="240" cy="115" rx="125" ry="38" fill="none" stroke="#283593" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.25" />
        <ellipse cx="240" cy="115" rx="38" ry="125" fill="none" stroke="#283593" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.2" />

        {/* Radius (Prism Gold) */}
        <line x1="240" y1="115" x2="240" y2="240" stroke="#F9A825" strokeWidth="5" strokeLinecap="round" />
        
        {/* Labels Box for r ⊥ Plane */}
        <g transform="translate(60, 185)">
          <rect x="0" y="0" width="85" height="22" rx="6" fill="white" stroke="#F9A825" strokeWidth="1.5" />
          <text x="42.5" y="14" textAnchor="middle" className="text-[9px] font-black tracking-tighter" fill="#F9A825">r ⊥ Plane</text>
        </g>
        
        {/* Right Angle Symbol */}
        <path d="M 240 215 H 265 V 240" fill="none" stroke="#F9A825" strokeWidth="1.5" opacity="0.8" />

        {/* Center Point */}
        <circle cx="240" cy="115" r="5" fill="#283593" />
        {centerLabel && (
          <text x="240" y="100" textAnchor="middle" className="text-[13px] font-black" fill="#1e293b">C({centerLabel})</text>
        )}

        {/* Touching Point */}
        <circle cx="240" cy="240" r="5" fill="#F9A825" />
        <text x="250" y="255" className="text-[10px] font-black tracking-[0.2em] uppercase" fill="#F9A825">TOUCHING POINT</text>
        
        {/* Equation on plane */}
        {equation && (
          <text x="175" y="240" textAnchor="middle" fill="white" className="text-[10px] font-black italic tracking-wide" opacity="0.95">{equation}</text>
        )}
      </svg>
    </div>
  );
};

import { QuestionCard } from '../components/ui/QuestionCard';
import { SECTION_D_QUESTIONS } from '../data/questions';

const SectionDMaster: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'All' | '2025' | '2024'>('All');

  const filteredQuestions = SECTION_D_QUESTIONS.filter(q => 
    selectedYear === 'All' || q.title.includes(selectedYear)
  );

  return (
    <div className="max-w-screen-2xl mx-auto pb-12 px-4 sm:px-6">
      {/* Header */}
      <header className="mb-12 space-y-6">
        <Link 
          to="/past-papers"
          className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Exam Center
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100">
               <Target size={14} /> Ultimate Collection
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tight leading-[0.9]">
              Section D <br />
              <span className="text-amber-500">Mastery</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium">
              All Section D questions (2024-2025) consolidated into one professional review experience. 
            </p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {(['All', '2025', '2024'] as const).map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedYear === year 
                    ? "bg-white text-slate-900 shadow-xl" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {year === 'All' ? 'Complete Set' : year}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Questions Stack */}
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {filteredQuestions.map((q, index) => (
              <QuestionCard 
                key={q.id} 
                question={{ ...q, id: index + 1 }} 
                diagramRenderer={(data) => (
                  <TouchingPlaneDiagram 
                    centerLabel={data.center} 
                    equation={data.equation} 
                  />
                )}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Nav */}
      <footer className="mt-20 text-center">
        <Link 
          to="/past-papers"
          className="inline-flex items-center gap-3 px-12 py-6 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
        >
          Explore More Papers <ArrowLeft size={16} className="rotate-180" />
        </Link>
      </footer>
    </div>
  );
};

export default SectionDMaster;
