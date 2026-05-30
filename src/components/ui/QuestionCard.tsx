import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { NoteCard } from './NoteCard';
import { cn } from '../../lib/utils';

export interface Question {
  id: number | string;
  title: string;
  tag?: string;
  question: string;
  solution: string;
  algorithm?: string[];
  diagramData?: { center: string, equation: string };
}

interface QuestionCardProps {
  question: Question;
  diagramRenderer?: (data: any) => React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, diagramRenderer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <article 
      className="bg-white border-y md:border border-slate-100 px-4 py-8 sm:p-10 md:p-12 lg:p-16 md:rounded-[2.5rem] shadow-sm relative overflow-hidden text-left my-8"
    >
      {/* Index Badge */}
      <div className="absolute top-0 right-0 p-6 md:p-8">
        <span className="text-6xl md:text-8xl font-black text-slate-50 select-none leading-none">
          {typeof question.id === 'number' ? String(question.id).padStart(2, '0') : question.id}
        </span>
      </div>

      <div className="relative z-10 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2 bg-slate-900 text-white border-slate-900">
               <Brain size={12} /> Question {question.id}
            </div>
            {question.tag && (
              <div className="px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm flex items-center gap-2 bg-blue-50 text-blue-600 border-blue-100">
                 {question.tag}
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full sm:w-auto px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest",
              isOpen ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {isOpen ? "Hide Solutions" : "Reveal Solutions"}
            <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Question Text */}
          <div className={cn(
            "p-6 md:p-8 rounded-[2rem] border transition-all duration-500",
            isOpen ? "bg-slate-50/50 border-slate-100" : "bg-slate-900 border-slate-800"
          )}>
            <h3 className={cn("text-xs font-black uppercase tracking-widest mb-4", isOpen ? "text-slate-400" : "text-amber-500")}>
              The Challenge
            </h3>
            <div className={cn("markdown-body", !isOpen && "text-white")}>
              <ReactMarkdown 
                remarkPlugins={[remarkMath]} 
                rehypePlugins={[rehypeRaw, [rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
              >
                {question.question}
              </ReactMarkdown>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="overflow-hidden space-y-8 pt-4"
              >
                {/* Diagram if applicable */}
                {question.diagramData && diagramRenderer && diagramRenderer(question.diagramData)}

                <div className="space-y-12">
                  {/* Solution Area */}
                  <div className="space-y-6">
                    <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
                      <div className="h-px flex-1 bg-slate-100" />
                      Detailed Solution
                      <div className="h-px flex-1 bg-slate-100" />
                    </h4>
                    
                    <div className="markdown-body solution-text !text-slate-900 text-lg md:text-2xl leading-relaxed">
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]} 
                        rehypePlugins={[rehypeRaw, [rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
                      >
                        {question.solution}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Algorithm / Strategic Map */}
                  {question.algorithm && (
                    <div className="space-y-6 pt-8 border-t border-slate-50">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-6">Logical Strategy</h4>
                      <div className="space-y-4">
                        {question.algorithm.map((step, i) => (
                          <div key={i} className="flex gap-6 pb-6 border-b border-slate-50 last:border-0">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-blue-200">
                              {i + 1}
                            </span>
                            <div className="text-[15px] md:text-[17px] font-semibold text-slate-700 leading-relaxed pt-1">
                              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                {step}
                              </ReactMarkdown>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
};
