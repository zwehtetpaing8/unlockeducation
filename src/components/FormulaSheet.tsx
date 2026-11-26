import { useState } from 'react';
import { chapters } from '../data/chapters';
import Latex from './Latex';
import { Search, Copy, Check, Hash, X } from 'lucide-react';
import DraggableScroll from "./DraggableScroll";

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
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-3.5">
        {/* Search Input bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search formulas, symbols, definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 ${searchQuery ? 'pr-9' : 'pr-4'} min-h-[42px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear formula search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Chapter Filter Strip */}
        <DraggableScroll className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-1.5 pb-1">
          <button
            type="button"
            onClick={() => setSelectedChapterId('all')}
            className={`snap-start shrink-0 text-left px-3.5 min-h-[36px] rounded-xl transition-all cursor-pointer whitespace-nowrap text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
              selectedChapterId === 'all'
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800"
            }`}
          >
            All Chapters
          </button>
          {chapters.map((ch) => {
            const isActive = selectedChapterId === ch.id;
            return (
              <button
                type="button"
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`snap-start shrink-0 text-left px-3.5 min-h-[36px] rounded-xl transition-all cursor-pointer whitespace-nowrap text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                }`}
              >
                Ch {ch.id}. {ch.title}
              </button>
            );
          })}
        </DraggableScroll>

        {/* Quick Suggest tags & Result Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-[11px] text-slate-400 mr-0.5">Quick topics:</span>
            {(['Euler', 'De Moivre', 'Sum', 'Volume'] as const).map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => { setSearchQuery(term); setSelectedChapterId('all'); }}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
              >
                {term === 'Sum' ? 'Summations' : term === 'Volume' ? 'Volumes' : term}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
            {filteredFormulas.length} {filteredFormulas.length === 1 ? 'formula' : 'formulas'}
          </span>
        </div>
      </div>

      {/* Formulas Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((formula) => (
            <div
              key={formula.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                    Ch {formula.chapterId}. {formula.chapterTitle}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyLatex(formula.latex, formula.id)}
                    aria-label={`Copy LaTeX for ${formula.name}`}
                    className="inline-flex items-center gap-1 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg text-[11px] font-medium transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 cursor-pointer shrink-0"
                    title="Copy LaTeX source"
                  >
                    {copiedId === formula.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>LaTeX</span>
                      </>
                    )}
                  </button>
                </div>

                <h4 className="font-display font-bold text-slate-900 dark:text-slate-100 text-sm mb-1.5">
                  {formula.name}
                </h4>

                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  <Latex text={formula.description} />
                </div>
              </div>

              {/* Centered LaTeX expression equation card */}
              <div className="px-3 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 rounded-xl min-h-[56px] w-full flex items-center justify-center overflow-hidden">
                <Latex block={true} text={formula.latex} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            <Hash className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No formula matches found</p>
            <p className="text-xs text-slate-400 mt-0.5">Try altering your search keywords or chapter filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
