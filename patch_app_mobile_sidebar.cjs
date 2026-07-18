const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<p className="text-\[10px\] text-slate-400">11 Mathematics Chapters<\/p>/;

const replacement = `<p className="text-[10px] text-slate-400">11 Mathematics Chapters</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 pb-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {completedChapters.length} of 11 Completed
                  </p>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{Math.round((completedChapters.length / 11) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: \`\${(completedChapters.length / 11) * 100}%\` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full"
                  />
                </div>
              </div>`;

// Wait, the regex needs to match exactly what is there. 
// I'll use a more precise regex.
const exactRegex = /<p className="text-\[10px\] text-slate-400">11 Mathematics Chapters<\/p>\s*<\/div>\s*<button\s*onClick=\{\(\) => setMobileMenuOpen\(false\)\}\s*className="p-1\.5 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg transition"\s*>\s*<X className="w-4 h-4" \/>\s*<\/button>\s*<\/div>/;

content = content.replace(exactRegex, replacement);

fs.writeFileSync('src/App.tsx', content);
