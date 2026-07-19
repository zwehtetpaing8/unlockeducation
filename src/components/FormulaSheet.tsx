import { useState } from 'react';
import { chapters } from '../data/chapters';
import Latex from './Latex';
import { Search, Filter, Copy, Check, Hash } from 'lucide-react';

export default function FormulaSheet() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Flatten all formulas together with their parent chapter titles
  const allFormulas = chapters.flatMap((ch) =>
    ch.formulas.map((f) => ({
      ...f,
      chapterId: ch.id,
      chapterTitle: ch.title,
    }))
  );

  // Filter based on selected chapter and search text
  const filteredFormulas = allFormulas.filter((f) => {
    const matchesChapter = selectedChapterId === 'all' || f.chapterId === selectedChapterId;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  const handleCopyLatex = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters panel */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search formulas, symbols, definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Chapter Filter Select dropdown */}
          <div className="relative md:w-64">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedChapterId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedChapterId(val === 'all' ? 'all' : parseInt(val));
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="all">Filter by Chapter: All</option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  Ch {ch.id}. {ch.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Suggest tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <span className="text-[9px] uppercase tracking-wider text-slate-400">Quick Filters:</span>
          <button
            onClick={() => { setSearchQuery('Euler'); setSelectedChapterId('all'); }}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition"
          >
            Euler
          </button>
          <button
            onClick={() => { setSearchQuery('De Moivre'); setSelectedChapterId('all'); }}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition"
          >
            De Moivre
          </button>
          <button
            onClick={() => { setSearchQuery('Sum'); setSelectedChapterId('all'); }}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition"
          >
            Summations
          </button>
          <button
            onClick={() => { setSearchQuery('Volume'); setSelectedChapterId('all'); }}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition"
          >
            Volumes
          </button>
        </div>
      </div>

      {/* Formulas Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((formula) => (
            <div
              key={formula.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
                    Ch {formula.chapterId}. {formula.chapterTitle}
                  </span>
                  <button
                    onClick={() => handleCopyLatex(formula.latex, formula.id)}
                    className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Copy LaTeX source"
                  >
                    {copiedId === formula.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <h4 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">
                  {formula.name}
                </h4>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  <Latex text={formula.description} />
                </div>
              </div>

              {/* Centered LaTeX expression equation card */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl overflow-x-auto min-h-[56px] w-full">
                <Latex block={true} text={formula.latex} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <Hash className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No formula matches found</p>
            <p className="text-xs text-slate-400 mt-0.5">Try altering your search keywords or chapter filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
