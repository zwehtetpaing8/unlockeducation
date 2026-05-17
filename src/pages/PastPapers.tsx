import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PastPaper } from '../types';
import { 
  FileText, Search, Filter, Download, 
  ExternalLink, Calendar, Star, Loader2,
  ChevronRight, AlertCircle, Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const PastPapers: React.FC = () => {
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState<string>('All Years');
  const [filterSection, setFilterSection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const years = ['All Years', '2023', '2022', '2021', '2020', '2019'];
  const sections = ['All', 'A', 'B', 'C', 'D', 'Full Paper'];

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('past_papers')
      .select('*')
      .order('year', { ascending: false });
    
    if (data) setPapers(data);
    setLoading(false);
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

export default PastPapers;
