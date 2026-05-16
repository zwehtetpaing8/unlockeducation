import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PastPaper } from '../types';
import { 
  FileText, Search, Filter, Download, 
  ExternalLink, Calendar, Star, Loader2,
  ChevronRight, AlertCircle
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
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="bg-neutral-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
             Exam Prep Center
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Level Up with <br />
            <span className="text-amber-500">Past Exam Papers</span>
          </h1>
          <p className="text-neutral-400 text-lg">
            Master the Myanmar Matriculation Exams by practicing with actual 
            previous years' papers and expert solutions.
          </p>
        </div>
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-10 hidden lg:block">
           <FileText size={300} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-8 bg-white/60 backdrop-blur-xl border border-white rounded-3xl shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-xl text-neutral-500">
            <Filter size={18} />
            <span className="text-xs font-bold uppercase">Filter By:</span>
          </div>
          <select 
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="bg-transparent font-black text-sm outline-none cursor-pointer text-neutral-700"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <div className="w-px h-4 bg-neutral-200" />
          <select 
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="bg-transparent font-black text-sm outline-none cursor-pointer capitalize text-neutral-700"
          >
            {sections.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sections' : `Section ${s}`}</option>)}
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input 
            type="text" 
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-100 bg-white rounded-xl text-sm font-bold text-neutral-700 placeholder:text-neutral-300 shadow-sm outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      {/* Papers Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, idx) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="h-full bg-white/60 backdrop-blur-xl border border-white p-8 rounded-[2rem] hover:ring-2 hover:ring-amber-500/20 transition-all flex flex-col shadow-sm hover:shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
                    <Calendar size={24} />
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                    paper.section === 'A' ? "bg-green-50 text-green-600 border-green-100" :
                    paper.section === 'B' ? "bg-blue-50 text-blue-600 border-blue-100" :
                    paper.section === 'C' ? "bg-purple-50 text-purple-600 border-purple-100" :
                    paper.section === 'D' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-neutral-50 text-neutral-600 border-neutral-100"
                  )}>
                    Section {paper.section}
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-xl font-extrabold mb-2 group-hover:text-amber-500 transition-colors text-neutral-900 uppercase tracking-tight">{paper.title}</h3>
                  <p className="text-neutral-500 text-sm mb-6 font-medium">{paper.subject} • Grade {paper.grade_level}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <a 
                    href={paper.pdf_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-neutral-900 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                  >
                    Question <ExternalLink size={14} />
                  </a>
                  <a 
                    href={paper.answer_pdf_url || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-neutral-100 transition-all shadow-sm bg-white",
                      !paper.answer_pdf_url ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-50 text-neutral-600"
                    )}
                  >
                    Answers {paper.answer_pdf_url ? <Download size={14} /> : <AlertCircle size={14} />}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredPapers.length === 0 && (
            <div className="col-span-full py-20 text-center bg-neutral-50 dark:bg-neutral-900 rounded-[3rem] border border-dashed border-neutral-200 dark:border-neutral-800">
              <Star className="mx-auto text-neutral-300 mb-4" size={48} />
              <h3 className="text-xl font-bold">No papers found matching criteria</h3>
              <p className="text-neutral-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      )}

      {/* Info card */}
      <div className="bg-amber-50/60 backdrop-blur-xl border border-amber-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
         <div className="hidden sm:flex shrink-0 w-16 h-16 bg-white rounded-full items-center justify-center shadow-md border border-amber-50">
           <Star className="text-amber-500" />
         </div>
         <div className="text-left">
           <h4 className="font-black text-amber-900 uppercase tracking-tight">Practice Makes Perfect</h4>
           <p className="text-sm text-amber-800/70 font-medium leading-relaxed">
             Experts recommend solving at least 5 years of past papers to get a strong sense of the exam pattern 
             and timing. Use the timed mock mode in your individual chapter sections for better results.
           </p>
         </div>
      </div>
    </div>
  );
};

export default PastPapers;
