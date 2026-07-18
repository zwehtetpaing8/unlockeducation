const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const replacement = `
      {/* Floating Notes Widget */}
      <div className="print:hidden fixed bottom-6 left-6 z-50 flex flex-col items-start pointer-events-none">
        <AnimatePresence>
          {isNotesOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-72 md:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-bold font-display">Chapter Notes</span>
                </div>
                <button
                  onClick={() => setIsNotesOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <textarea
                  value={chapterNotes}
                  onChange={handleNotesChange}
                  placeholder="Jot down formulas, ideas, or questions here..."
                  className="w-full h-48 resize-none bg-transparent border-none focus:ring-0 p-0 text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
              <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[10px] text-slate-400 font-medium flex items-center justify-between">
                <span>{chapterNotes.length} chars</span>
                <span className="flex items-center gap-1">
                  {isSavingNotes ? (
                    <span className="animate-pulse">Saving...</span>
                  ) : (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      Saved
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsNotesOpen(!isNotesOpen)}
          className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          title="Chapter Notes"
        >
          <FileText className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
`;

content = content.replace('    </div>\n  );\n}', replacement);
fs.writeFileSync('src/components/ChapterDetails.tsx', content);
