const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const regex = /<div className="flex gap-2 shrink-0">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/;

const replacement = `<div className="flex flex-wrap gap-2 shrink-0 justify-center sm:justify-start">
                            <button
                              onClick={() => onToggleComplete?.(chapter.id, !isCompleted)}
                              className={\`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-sm transition-colors \${isCompleted ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60 dark:text-emerald-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'}\`}
                            >
                              <Check className="w-4 h-4" />
                              {isCompleted ? 'Completed' : 'Mark as Complete'}
                            </button>
$1</div>
                        </div>
                    </div>`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/components/ChapterDetails.tsx', content);
