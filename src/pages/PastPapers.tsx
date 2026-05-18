import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PastPaper } from '../types';
import { 
  FileText, Search, Filter, Download, 
  ExternalLink, Calendar, Star, Loader2,
  ChevronRight, AlertCircle, Award, X, Maximize2,
  CheckCircle2, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { NoteCard } from '../components/ui/NoteCard';
import { ImageCarousel } from '../components/ui/ImageCarousel';
import { ComplexPlane } from '../components/ui/ComplexPlane';
import { Timeline } from '../components/ui/Timeline';
import { FeatureCard, FeatureGrid } from '../components/ui/FeatureGrid';

interface MCQData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

const MultipleChoiceQuestion: React.FC<{ data: MCQData }> = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="my-8 bg-slate-50/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 space-y-6">
      <div className="text-xl font-black text-slate-900 leading-tight">
         <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
           {data.question}
         </ReactMarkdown>
      </div>
      <div className="grid gap-3">
        {data.options.map((opt, i) => {
          const isCorrect = i === data.correctIndex;
          const isSelected = selected === i;
          
          let stateStyles = "border-slate-200 bg-white hover:border-blue-300";
          if (showAnswer) {
            if (isCorrect) stateStyles = "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-100";
            else if (isSelected) stateStyles = "border-red-300 bg-red-50 text-red-600";
          } else if (isSelected) {
            stateStyles = "border-blue-500 bg-blue-50 text-blue-700";
          }

          return (
            <button
              key={i}
              onMouseDown={() => !showAnswer && setSelected(i)}
              className={cn(
                "w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-[0.99]",
                stateStyles
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-colors",
                  isSelected ? "bg-white/50 text-current" : "bg-slate-100 text-slate-400 group-hover:text-blue-500"
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-bold text-lg">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {opt}
                  </ReactMarkdown>
                </span>
              </div>
              <div className="shrink-0">
                {showAnswer && isCorrect && <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20"><CheckCircle2 size={18} /></div>}
                {showAnswer && isSelected && !isCorrect && <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20"><XCircle size={18} /></div>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
          {showAnswer ? "Solution revealed below" : "Select one option to continue"}
        </p>
        {!showAnswer ? (
          <button 
            disabled={selected === null}
            onClick={() => setShowAnswer(true)}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
          >
            Verify Choice
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <div className={cn(
              "text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl border flex items-center gap-2",
              selected === data.correctIndex 
                ? "bg-green-50 text-green-700 border-green-100" 
                : "bg-red-50 text-red-700 border-red-100"
            )}>
              {selected === data.correctIndex ? (
                <>Excellent Performance</>
              ) : (
                <>Critical Review Needed</>
              )}
            </div>
            <button 
              onClick={() => { setShowAnswer(false); setSelected(null); }}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PastPapers: React.FC = () => {
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState<string>('All Years');
  const [filterSection, setFilterSection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);
  
  const years = ['All Years', '2026', '2024', '2023', '2022', '2021', '2020', '2019'];
  const sections = ['All', 'A', 'B', 'C', 'D', 'Full Paper'];

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('past_papers')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) {
        console.warn('Supabase fetch failed, using fallback data:', error);
        setPapers(FALLBACK_PAPERS);
      } else if (data && data.length > 0) {
        setPapers(data);
      } else {
        setPapers(FALLBACK_PAPERS);
      }
    } catch (err) {
      console.error('Error fetching papers:', err);
      setPapers(FALLBACK_PAPERS);
    } finally {
      setLoading(false);
    }
  };

  const filteredPapers = papers.filter(p => {
    const matchYear = filterYear === 'All Years' || p.year.toString() === filterYear;
    const matchSection = filterSection === 'All' || p.section === filterSection;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchYear && matchSection && matchSearch;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <header className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100">
             <Award size={14} /> Exam Prep Center
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 uppercase leading-[0.9]">
            Master <br />
            <span className="text-amber-500 underline decoration-amber-100 underline-offset-8">Matriculation</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            Practice with actual previous years' papers and expert-curated solutions. 
            Optimized for the new 2024 curriculum standards.
          </p>
        </div>
      </header>

      {/* Filters Area */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 shadow-sm outline-none focus:border-blue-600 transition-all"
            />
          </div>
          
          {/* Custom Selects */}
          <div className="flex gap-2">
             <div className="flex-1 lg:w-40 relative">
                <select 
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer focus:border-blue-600 shadow-sm"
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90" />
             </div>
             <div className="flex-1 lg:w-48 relative">
                <select 
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value)}
                  className="w-full appearance-none pl-4 pr-10 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer focus:border-blue-600 shadow-sm"
                >
                  {sections.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sections' : `Section ${s}`}</option>)}
                </select>
                <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-90" />
             </div>
          </div>
        </div>

        {/* Papers Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPapers.map((paper, idx) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="group bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] hover:border-amber-200 transition-all flex flex-col hover:shadow-xl relative overflow-hidden active:scale-[0.98]">
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100 group-hover:scale-110 transition-transform">
                      <Calendar size={24} />
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm",
                      paper.section === 'A' ? "bg-green-50 text-green-600 border-green-100" :
                      paper.section === 'B' ? "bg-blue-50 text-blue-600 border-blue-100" :
                      paper.section === 'C' ? "bg-purple-50 text-purple-600 border-purple-100" :
                      paper.section === 'D' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-slate-50 text-slate-600 border-slate-100"
                    )}>
                      Section {paper.section}
                    </div>
                  </div>

                <div className="flex-1 text-left relative z-10">
                  <h3 className="text-xl md:text-2xl font-black mb-2 group-hover:text-amber-500 transition-colors text-slate-900 uppercase tracking-tight leading-tight">{paper.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-widest">{paper.subject} • Grade {paper.grade_level}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-10 relative z-10">
                  {paper.content ? (
                    <button 
                      onClick={() => setSelectedPaper(paper)}
                      className="col-span-2 flex items-center justify-center gap-2 bg-amber-500 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg active:scale-95"
                    >
                      View Interactive Solution <Maximize2 size={14} />
                    </button>
                  ) : (
                    <>
                      <a 
                        href={paper.pdf_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                      >
                        Question <ExternalLink size={14} />
                      </a>
                      <a 
                        href={paper.answer_pdf_url || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className={cn(
                          "flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95",
                          !paper.answer_pdf_url ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed" : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50 shadow-sm"
                        )}
                      >
                        Answers {paper.answer_pdf_url ? <Download size={14} /> : <AlertCircle size={14} />}
                      </a>
                    </>
                  )}
                </div>
                {/* Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}

          {filteredPapers.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <Star className="mx-auto text-slate-200 mb-4" size={48} />
              <h3 className="text-xl font-black text-slate-400 uppercase tracking-tight">No Papers Found</h3>
              <p className="text-slate-400 text-sm font-medium">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      )}
      </section>

      {/* Modal for Interactive Content */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl h-full rounded-3xl md:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col pt-6 md:pt-10"
            >
              <button 
                onClick={() => setSelectedPaper(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl md:rounded-2xl transition-all z-20"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>

              <div className="flex-1 overflow-y-auto px-4 md:px-16 pb-20 mt-12 md:mt-0 custom-scrollbar text-left">
                <header className="mb-8 md:mb-12">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 mb-4">
                     Paper Review • {selectedPaper.year} • Section {selectedPaper.section}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">{selectedPaper.title}</h2>
                   <div className="h-1.5 w-24 bg-blue-600 rounded-full mt-6" />
                </header>

                <div className="markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      code(props) {
                        const { node, className, children, ...rest } = props;
                        const match = /language-([\w-]+)/.exec(className || '');
                        const isBlock = !!match;
                        
                        if (isBlock) {
                          const lang = match[1];
                          const rawContent = String(children).trim();

                          if (lang === 'carousel') {
                            const images = rawContent.split('\n').map(img => img.trim());
                            return <ImageCarousel images={images} />;
                          }

                          if (lang === 'complex-plane') {
                            try {
                              const data = JSON.parse(rawContent);
                              return <ComplexPlane points={data.points} />;
                            } catch (e) {
                              return <pre className={className}>{children}</pre>;
                            }
                          }

                          if (lang === 'timeline') {
                            try {
                              const events = JSON.parse(rawContent);
                              return <Timeline events={events} />;
                            } catch (e) {
                              return <pre className={className}>{children}</pre>;
                            }
                          }

                          if (lang === 'features') {
                            try {
                              const data = JSON.parse(rawContent);
                              return (
                                <FeatureGrid>
                                  {data.map((item: any, i: number) => (
                                    <FeatureCard key={i} {...item} />
                                  ))}
                                </FeatureGrid>
                              );
                            } catch (e) {
                              return <pre className={className}>{children}</pre>;
                            }
                          }

                          if (lang === 'note') {
                            try {
                              const data = JSON.parse(rawContent);
                              return (
                                <NoteCard type={data.type} title={data.title}>
                                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {data.content}
                                  </ReactMarkdown>
                                </NoteCard>
                              );
                            } catch (e) {
                               return <pre className={className}>{children}</pre>;
                            }
                          }

                          if (lang === 'mcq') {
                            try {
                              const data = JSON.parse(rawContent);
                              return <MultipleChoiceQuestion data={data} />;
                            } catch (e) {
                              return <pre className={className}>{children}</pre>;
                            }
                          }

                          if (lang === 'diagram-q1') {
                            return (
                              <div className="my-8 flex flex-col items-center gap-4 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                                <svg width="400" height="200" viewBox="0 0 400 200" className="max-w-full overflow-visible">
                                  <defs>
                                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orientation="auto" markerUnits="strokeWidth">
                                      <path d="M0,0 L0,6 L9,3 z" fill="#283593" />
                                    </marker>
                                  </defs>
                                  <path d="M 50 150 L 350 150" stroke="#283593" strokeWidth="3" markerEnd="url(#arrow)" />
                                  <text x="360" y="155" fill="#283593" className="text-[12px] font-black italic">l</text>
                                  
                                  <circle cx="100" cy="150" r="4" fill="#283593" />
                                  <text x="100" y="175" textAnchor="middle" className="text-[10px] font-bold" fill="#283593">P(2,5,-1)</text>
                                  
                                  <circle cx="300" cy="150" r="4" fill="#283593" />
                                  <text x="300" y="175" textAnchor="middle" className="text-[10px] font-bold" fill="#283593">Q(1,9,-3)</text>
                                  
                                  <circle cx="210" cy="150" r="4" fill="#283593" />
                                  <text x="215" y="165" className="text-[12px] font-black" fill="#283593">B</text>
                                  
                                  <circle cx="210" cy="50" r="4" fill="#283593" />
                                  <text x="210" y="35" textAnchor="middle" className="text-[12px] font-bold" fill="#283593">A(5,2,2)</text>
                                  
                                  <line x1="210" y1="50" x2="210" y2="150" stroke="#00897B" strokeWidth="3" />
                                  <path d="M 210 130 H 230 V 150" fill="none" stroke="#00897B" strokeWidth="1" />
                                  
                                  <g transform="translate(250, 90)">
                                    <rect x="0" y="0" width="60" height="24" rx="6" fill="#f0fff9" stroke="#00897B" strokeWidth="1" />
                                    <text x="30" y="16" stroke="none" fill="#00897B" textAnchor="middle" className="text-[10px] font-black uppercase tracking-tighter">AB ⊥ l</text>
                                  </g>
                                </svg>
                              </div>
                            );
                          }

                          if (lang === 'diagram-sphere') {
                            try {
                              const data = JSON.parse(rawContent);
                              return (
                                <div className="my-8 flex flex-col items-center gap-4 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                                  <svg width="400" height="250" viewBox="0 0 400 250" className="max-w-full overflow-visible">
                                    <defs>
                                      <radialGradient id="sphereGrad">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="100%" stopColor="#e8eaf6" />
                                      </radialGradient>
                                    </defs>
                                    
                                    {/* Plane */}
                                    <path d="M 50 180 L 300 180 L 360 140 L 110 140 Z" fill="#283593" fillOpacity="0.9" stroke="#1a237e" strokeWidth="2" />
                                    <text x="130" y="165" fill="white" className="text-[10px] font-black tracking-tight">{data.equation}</text>
                                    
                                    {/* Shadow */}
                                    <ellipse cx="235" cy="160" rx="50" ry="12" fill="black" fillOpacity="0.1" />
                                    
                                    {/* Sphere */}
                                    <circle cx="235" cy="80" r="65" fill="url(#sphereGrad)" stroke="#283593" strokeWidth="1.5" />
                                    <ellipse cx="235" cy="80" rx="65" ry="20" fill="none" stroke="#283593" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.3" />
                                    <ellipse cx="235" cy="80" rx="20" ry="65" fill="none" stroke="#283593" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.3" />

                                    {/* Center */}
                                    <circle cx="235" cy="80" r="3" fill="#283593" />
                                    <text x="235" y="70" textAnchor="middle" className="text-[12px] font-black" fill="#283593">C({data.center})</text>
                                    
                                    {/* Radius */}
                                    <line x1="235" y1="80" x2="235" y2="160" stroke="#f9a825" strokeWidth="4" />
                                    <text x="245" y="125" className="text-[14px] font-black italic" fill="#f9a825">r</text>
                                    
                                    {/* Right angle */}
                                    <path d="M 235 145 H 250 V 160" fill="none" stroke="#f9a825" strokeWidth="1.5" />
                                    
                                    {/* Point */}
                                    <circle cx="235" cy="160" r="4" fill="#f9a825" />
                                    <text x="290" y="175" className="text-[10px] font-black uppercase tracking-widest" fill="#f9a825">touching point</text>

                                    <g transform="translate(10, 30)">
                                      <rect x="0" y="0" width="80" height="24" rx="6" fill="#fffbeb" stroke="#f9a825" strokeWidth="1" />
                                      <text x="40" y="16" stroke="none" fill="#f9a825" textAnchor="middle" className="text-[9px] font-black uppercase tracking-tighter">r ⊥ Plane</text>
                                    </g>
                                  </svg>
                                </div>
                              );
                            } catch (e) {
                              return <pre>{children}</pre>;
                            }
                          }
                        }
                        
                        return <code className={className}>{children}</code>;
                      },
                      h1: ({ children }) => <h2 className="text-xl md:text-3xl font-black text-slate-900 mt-8 mb-4 uppercase tracking-tight leading-none">{children}</h2>,
                      h2: ({ children }) => <h3 className="text-lg md:text-2xl font-black text-slate-800 mt-6 mb-3 uppercase tracking-tight leading-none">{children}</h3>,
                      hr: () => <hr className="my-8 border-slate-100" />
                    }}
                  >
                    {selectedPaper.content || ''}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info card */}
      <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
         <div className="shrink-0 w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 shadow-xl shadow-amber-500/10 active:rotate-12 transition-transform">
           <Star size={32} />
         </div>
         <div className="text-center md:text-left space-y-2">
           <h4 className="font-black text-slate-900 uppercase tracking-tight text-xl">Practice Strategy</h4>
           <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
             Expert educators recommend solving at least 5 years of past papers to get a strong sense of the exam pattern. 
             Combine this with the <span className="text-blue-600 font-black">Timed Mock Mode</span> in our Chapter sections for peak results.
           </p>
         </div>
      </div>
    </div>
  );
};

const paper2026SectionA = `
# 2026 Matriculation Exam - Section A
## Chapter 3 • Analytical Solid Geometry

---

\`\`\`mcq
{
  "question": "The equation of the plane that is parallel to the plane $4x-3y+2z=5$ and passing through the point $(5,1,-7)$ is:",
  "options": [
    "$4x-3y+2z=3$",
    "$4x-4y+2z=3$",
    "$4x-3y+2z=-3$",
    "$3x-4y+2z=3$"
  ],
  "correctIndex": 0
}
\`\`\`
`;

const paper2024SectionD = `
# 2024 Matriculation Exam - Section D
## Chapter 3 • Analytical Solid Geometry

---

### Question 1
Point $A$ has coordinates $(5,2,2)$ and the line $l$ passes through the points $(2,5,-1)$ and $(1,9,-3)$. Point $B$ lies on $l$ such that line $AB$ is perpendicular to $l$. Find the distance between points $A$ and $B$.

\`\`\`diagram-q1
\`\`\`

\`\`\`note
{
  "type": "tip",
  "title": "Solution",
  "content": "$A=(5,2,2)$.\\n\\nLet $P$ be the point $(2,5,-1)$ and $Q$ be the point $(1,9,-3)$.\\n$$\\\\langle l\\\\rangle = \\\\langle PQ\\\\rangle = \\\\langle -1,4,-2\\\\rangle.$$\\n\\nSince point $B$ lies on $l$,\\n$B=(x,y,z)=(2-k,5+4k,-1-2k)$ for some real number $k$.\\n\\nTherefore,\\n$\\\\langle AB\\\\rangle=\\\\langle 3+k,-3-4k,3+2k\\\\rangle$.\\n\\nSince $AB \\\\bot l$,\\n$$\\\\begin{aligned} -3-k-12-16k-6-4k&=0\\\\ k&=-1 \\\\end{aligned}$$\\n\\nThe distance between $A$ and $B$ is\\n$$\\\\begin{aligned} AB&=\\\\sqrt{(3+k)^2+(-3-4k)^2+(3+2k)^2}\\\\ &=\\\\sqrt{(3-1)^2+(-3+4)^2+(3-2)^2}\\\\ &=\\\\sqrt{2^2+1^2+1^2}\\\\ &=\\\\sqrt{6}. \\\\end{aligned}$$"
}
\`\`\`

\`\`\`note
{
  "type": "info",
  "title": "Algorithm",
  "content": "1. Since $B$ lies on line $l$, write the coordinates of $B$ using a parameter $k$.\\n2. Find the direction vector of line $l$ from the two given points.\\n3. Find the vector $\\\\langle AB\\\\rangle$ using point $A$ and point $B$.\\n4. Since $AB$ is perpendicular to $l$, use the dot product condition $\\\\langle AB\\\\rangle \\\\cdot \\\\langle l\\\\rangle = 0$.\\n5. Solve for $k$, then substitute it into the distance formula to find $AB$."
}
\`\`\`

---

### Question 2
Find the equation of the sphere with center $(5,-6,-2)$ and touching the plane $3x-y-2z=17$.

\`\`\`diagram-sphere
{
  "center": "5,-6,-2",
  "equation": "3x-y-2z=17"
}
\`\`\`

\`\`\`note
{
  "type": "tip",
  "title": "Solution",
  "content": "Directed values of the line (radius) passes through the center $(5,-6,-2)$ and perpendicular to the plane $3x-y-2z=17$ are\\n$$\\\\langle 3,-1,-2\\\\rangle.$$\\n\\nCoordinates of the points on this line (radius) are\\n$(x,y,z)=(5+3k,-6-k,-2-2k)$ for some real number $k$.\\n\\nIf one of these points is on the plane,\\n$$\\\\begin{aligned} 3(5+3k)-(6-k)-2(2-2k)&=17\\\\ k&=-\\\\frac{4}{7} \\\\end{aligned}$$\\n\\nSo the tangential point of the plane and the sphere is\\n$$\\\\left(\\\\frac{23}{7},-\\\\frac{38}{7},-\\\\frac{6}{7}\\\\right).$$\\n\\nThe radius of the sphere is\\n$$\\\\begin{aligned} r&=\\\\sqrt{\\\\left(5-\\\\frac{23}{7}\\\\right)^2+\\\\left(-6+\\\\frac{38}{7}\\\\right)^2+\\\\left(-2+\\\\frac{6}{7}\\\\right)^2}\\\\ &=\\\\frac{\\\\sqrt{224}}{7}\\\\ &=\\\\frac{4\\\\sqrt{14}}{7}. \\\\end{aligned}$$\\n\\nTherefore, the equation of the sphere is\\n$$(x-5)^2+(y+6)^2+(z+2)^2=\\\\frac{32}{7}.$$"
}
\`\`\`

\`\`\`note
{
  "type": "info",
  "title": "Algorithm",
  "content": "1. Since the sphere touches the plane, the radius is perpendicular to the plane.\\n2. Use the plane normal vector $\\\\langle 3,-1,-2\\\\rangle$ as the radius direction.\\n3. Draw a line from the center $(5,-6,-2)$ in that direction.\\n4. Find where this line meets the plane; this is the touching point.\\n5. The distance from the center to the touching point is the radius."
}
\`\`\`

---

### Question 3
Find the equation of the sphere with center $(1,2,-1)$ and touching the plane $2x+y+z-9=0$.

\`\`\`diagram-sphere
{
  "center": "1,2,-1",
  "equation": "2x+y+z-9=0"
}
\`\`\`

\`\`\`note
{
  "type": "tip",
  "title": "Solution",
  "content": "Directed values of the line (radius) passes through the center $(1,2,-1)$ and perpendicular to the plane $2x+y+z-9=0$ are\\n$$\\\\langle 2,1,1\\\\rangle.$$\\n\\nCoordinates of the points on this line (radius) are\\n$(x,y,z)=(1+2k,2+k,-1+k)$ for some real number $k$.\\n\\nIf one of these points is on the plane,\\n$$\\\\begin{aligned} 2(1+2k)+(2+k)+(-1+k)-9&=0\\\\ 6k-6&=0\\\\ k&=1. \\\\end{aligned}$$\\n\\nSo the tangential point of the plane and the sphere is\\n$(3,3,0)$.\\n\\nThe radius of the sphere is\\n$$\\\\begin{aligned} r&=\\\\sqrt{(3-1)^2+(3-2)^2+(0+1)^2}\\\\ &=\\\\sqrt{2^2+1^2+1^2}\\\\ &=\\\\sqrt{6}. \\\\end{aligned}$$\\n\\nTherefore, the equation of the sphere is\\n$$(x-1)^2+(y-2)^2+(z+1)^2=6.$$"
}
\`\`\`

---

### Question 4
Find the equation of the sphere with center $(0,2,0)$ and touching the plane $2x-4y+4z+10=0$.

\`\`\`diagram-sphere
{
  "center": "0,2,0",
  "equation": "2x-4y+4z+10=0"
}
\`\`\`

\`\`\`note
{
  "type": "tip",
  "title": "Solution",
  "content": "Directed values of the line (radius) passes through the center $(0,2,0)$ and perpendicular to the plane $2x-4y+4z+10=0$ are\\n$$\\\\langle 2,-4,4\\\\rangle.$$\\n\\nCoordinates of the points on this line (radius) are\\n$(x,y,z)=(2k,2-4k,4k)$ for some real number $k$.\\n\\nIf one of these points is on the plane,\\n$$\\\\begin{aligned} 2(2k)-4(2-4k)+4(4k)+10&=0\\\\ 36k+2&=0\\\\ k&=-\\\\frac{1}{18}. \\\\end{aligned}$$\\n\\nSo the tangential point of the plane and the sphere is\\n$$\\\\left(-\\\\frac{1}{9},\\\\frac{20}{9},-\\\\frac{2}{9}\\\\right).$$\\n\\nThe radius of the sphere is\\n$$\\\\begin{aligned} r&=\\\\sqrt{\\\\left(-\\\\frac{1}{9}-0\\\\right)^2+\\\\left(\\\\frac{20}{9}-2\\\\right)^2+\\\\left(-\\\\frac{2}{9}-0\\\\right)^2}\\\\ &=\\\\sqrt{\\\\frac{1}{81}+\\\\frac{4}{81}+\\\\frac{4}{81}}\\\\ &=\\\\frac{1}{3}. \\\\end{aligned}$$\\n\\nTherefore, the equation of the sphere is\\n$$x^2+(y-2)^2+z^2=\\\\frac{1}{9}.$$"
}
\`\`\`

---

### Question 5
Find the equation of the sphere with center $(3,6,-4)$ and touching the plane $2x-2y-z-10=0$.

\`\`\`diagram-sphere
{
  "center": "3,6,-4",
  "equation": "2x-2y-z-10=0"
}
\`\`\`

\`\`\`note
{
  "type": "tip",
  "title": "Solution",
  "content": "Directed values of the line (radius) passes through the center $(3,6,-4)$ and perpendicular to the plane $2x-2y-z-10=0$ are\\n$$\\\\langle 2,-2,-1\\\\rangle.$$\\n\\nCoordinates of the points on this line (radius) are\\n$(x,y,z)=(3+2k,6-2k,-4-k)$ for some real number $k$.\\n\\nIf one of these points is on the plane,\\n$$\\\\begin{aligned} 2(3+2k)-2(6-2k)-(-4-k)-10&=0\\\\ 9k-12&=0\\\\ k&=\\\\frac{4}{3}. \\\\end{aligned}$$\\n\\nSo the tangential point of the plane and the sphere is\\n$$\\\\left(\\\\frac{17}{3},\\\\frac{10}{3},-\\\\frac{16}{3}\\\\right).$$\\n\\nThe radius of the sphere is\\n$$\\\\begin{aligned} r&=\\\\sqrt{\\\\left(\\\\frac{17}{3}-3\\\\right)^2+\\\\left(\\\\frac{10}{3}-6\\\\right)^2+\\\\left(-\\\\frac{16}{3}+4\\\\right)^2}\\\\ &=\\\\sqrt{\\\\left(\\\\frac{8}{3}\\\\right)^2+\\\\left(-\\\\frac{8}{3}\\\\right)^2+\\\\left(-\\\\frac{4}{3}\\\\right)^2}\\\\ &=4. \\\\end{aligned}$$\\n\\nTherefore, the equation of the sphere is\\n$$(x-3)^2+(y-6)^2+(z+4)^2=16.$$"
}
\`\`\`

---

### Question 6
Find the equation of the sphere with center $(1,2,-1)$ and touching the plane $2x+y+z=5$.

\`\`\`diagram-sphere
{
  "center": "1,2,-1",
  "equation": "2x+y+z=5"
}
\`\`\`

\`\`\`note
{
  "type": "tip",
  "title": "Solution",
  "content": "Directed values of the line (radius) passes through the center $(1,2,-1)$ and perpendicular to the plane $2x+y+z=5$ are\\n$$\\\\langle 2,1,1\\\\rangle.$$\\n\\nCoordinates of the points on this line (radius) are\\n$(x,y,z)=(1+2k,2+k,-1+k)$ for some real number $k$.\\n\\nIf one of these points is on the plane,\\n$$\\\\begin{aligned} 2(1+2k)+(2+k)+(-1+k)&=5\\\\ 6k+3&=5\\\\ k&=\\\\frac{1}{3}. \\\\end{aligned}$$\\n\\nSo the tangential point of the plane and the sphere is\\n$$\\\\left(\\\\frac{5}{3},\\\\frac{7}{3},-\\\\frac{2}{3}\\\\right).$$\\n\\nThe radius of the sphere is\\n$$\\\\begin{aligned} r&=\\\\sqrt{\\\\left(\\\\frac{5}{3}-1\\\\right)^2+\\\\left(\\\\frac{7}{3}-2\\\\right)^2+\\\\left(-\\\\frac{2}{3}+1\\\\right)^2}\\\\ &=\\\\sqrt{\\\\left(\\\\frac{2}{3}\\\\right)^2+\\\\left(\\\\frac{1}{3}\\\\right)^2+\\\\left(\\\\frac{1}{3}\\\\right)^2}\\\\ &=\\\\frac{\\\\sqrt{6}}{3}. \\\\end{aligned}$$\\n\\nTherefore, the equation of the sphere is\\n$$(x-1)^2+(y-2)^2+(z+1)^2=\\\\frac{2}{3}.$$"
}
\`\`\`
`;

const FALLBACK_PAPERS: PastPaper[] = [
  {
    id: '2026-math-a',
    year: 2026,
    subject: 'Mathematics',
    grade_level: 12,
    title: 'Section A Multiple Choice',
    pdf_url: '',
    answer_pdf_url: '',
    section: 'A',
    content: paper2026SectionA
  },
  {
    id: '2024-math-d',
    year: 2024,
    subject: 'Mathematics',
    grade_level: 12,
    title: 'Section D Problems (Solved)',
    pdf_url: '',
    answer_pdf_url: '',
    section: 'D',
    content: paper2024SectionD
  },
  {
    id: '2023-math-full',
    year: 2023,
    subject: 'Mathematics',
    grade_level: 12,
    title: 'General Mathematics Full Paper',
    pdf_url: 'https://example.com/2023-math.pdf',
    answer_pdf_url: 'https://example.com/2023-math-ans.pdf',
    section: 'Full Paper'
  }
];

export default PastPapers;

