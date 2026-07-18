const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<h3 className="text-\[10px\] font-bold text-slate-400 uppercase tracking-wider">\s*Course syllabus\s*<\/h3>\s*<p className="text-xs text-slate-500 dark:text-slate-400 font-medium">\s*11 Core Learning Chapters\s*<\/p>/;

const replacement = `<h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Course syllabus
              </h3>
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {completedChapters.length} of 11 Completed
                </p>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{Math.round((completedChapters.length / 11) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: \`\${(completedChapters.length / 11) * 100}%\` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full"
                />
              </div>`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', content);
