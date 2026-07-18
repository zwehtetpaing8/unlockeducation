const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const replacement = `
                            {sections.map((sec, idx) => {
                              const isActive = idx === activeSectionIndex;
                              const innerHeaders = extractInnerHeaders(sec.content).filter(h => h.level === 4 || h.level === 5);
                              return (
                                <div key={idx} className="flex flex-col">
                                  <button
                                    onClick={() => {
                                      handleSectionClick(idx);
                                      setIsMobileOutlineOpen(false);
                                    }}
                                    className={\`w-full text-left p-2.5 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center justify-between \${
                                      isActive
                                        ? "bg-indigo-50/80 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 font-bold"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                    }\`}
                                  >
                                    <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                                      <span
                                        className={\`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded \${
                                          isActive
                                            ? "bg-indigo-600 text-white"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                        }\`}
                                      >
                                        {idx + 1}
                                      </span>
                                      <span className="truncate">
                                        {sec.title.replace(/\\$/g, "")}
                                      </span>
                                    </div>
                                    {isActive && (
                                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                    )}
                                  </button>
                                  {(isActive || viewMode === "full") && innerHeaders.length > 0 && (
                                    <div className="flex flex-col ml-8 mt-1 mb-2 border-l-2 border-slate-100 dark:border-slate-800 pl-2 space-y-1">
                                      {innerHeaders.map((header, hIdx) => (
                                        <button
                                          key={hIdx}
                                          onClick={(e) => {
                                            handleSubheaderClick(e, idx, header.id);
                                            setIsMobileOutlineOpen(false);
                                          }}
                                          className="text-left text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                          {header.text.replace(/\\$/g, "")}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
`;

const regex = /\{sections\.map\(\(sec, idx\) => \{[\s\S]*?return \([\s\S]*?<button[\s\S]*?<\/button>\s*\);\s*\}\)\}/g;
// Match all three occurrences but we only want the SECOND ONE for the dropdown (index 1 of match array if we run matchAll)
const matches = [...content.matchAll(regex)];
if (matches.length >= 2) {
  content = content.replace(matches[1][0], replacement);
}

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
