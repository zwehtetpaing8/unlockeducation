const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const targetStr = `<div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">
                        {sections.map((sec, idx) => {
                          const isActive = idx === activeSectionIndex;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                handleSectionClick(idx);
                                setIsMobileOutlineOpen(false);
                              }}
                              className={\`snap-start shrink-0 text-left p-3 rounded-2xl border transition-all cursor-pointer min-w-[130px] max-w-[180px] flex flex-col justify-between h-20 \${
                                isActive
                                  ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-sm shadow-indigo-600/10"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                              }\`}
                            >
                              <span
                                className={\`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md self-start \${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                }\`}
                              >
                                Section {idx + 1}
                              </span>
                              <span className="text-[10px] font-semibold line-clamp-2 leading-tight mt-1">
                                {sec.title.replace(/\\$/g, "")}
                              </span>
                            </button>
                          );
                        })}
                      </div>`;

const replaceStr = `<DraggableScroll className="flex gap-2 min-h-[40px] pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">
                        {sections.map((sec, idx) => {
                          const isActive = idx === activeSectionIndex;
                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                handleSectionClick(idx);
                                setIsMobileOutlineOpen(false);
                              }}
                              className={\`snap-start shrink-0 text-left p-3 rounded-2xl border transition-all cursor-pointer min-w-[130px] max-w-[180px] flex flex-col justify-between h-20 \${
                                isActive
                                  ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-sm shadow-indigo-600/10"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                              }\`}
                            >
                              <span
                                className={\`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-md self-start \${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                }\`}
                              >
                                Section {idx + 1}
                              </span>
                              <span className="text-[10px] font-semibold line-clamp-2 leading-tight mt-1">
                                {sec.title.replace(/\\$/g, "")}
                              </span>
                            </button>
                          );
                        })}
                      </DraggableScroll>`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
