const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const scrollHelper = `
  const handleSubheaderClick = (e: React.MouseEvent, idx: number, id: string) => {
    e.stopPropagation();
    setActiveSectionIndex(idx);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleSectionClick
`;

content = content.replace('  const handleSectionClick', scrollHelper);

const renderLogic = `
                      {sections.map((section, idx) => {
                        const isActive = idx === activeSectionIndex;
                        const innerHeaders = extractInnerHeaders(section.content).filter(h => h.level === 4 || h.level === 5);
                        return (
                          <div key={idx} className="flex flex-col">
                            <button
                              onClick={() => handleSectionClick(idx)}
                              className={\`w-full text-left p-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border \${
                                isActive
                                  ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800/60 border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                              }\`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span
                                  className={\`text-[9px] font-mono px-1.5 py-0.5 rounded \${
                                    isActive
                                      ? "bg-indigo-600 text-white"
                                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                  }\`}
                                >
                                  {idx + 1}
                                </span>
                                <span className="leading-tight flex-1">
                                  <Latex text={section.title} />
                                </span>
                              </div>
                            </button>
                            {(isActive || viewMode === "full") && innerHeaders.length > 0 && (
                              <div className="flex flex-col ml-6 mt-1 mb-2 border-l-2 border-slate-100 dark:border-slate-800 pl-2 space-y-1">
                                {innerHeaders.map((header, hIdx) => (
                                  <button
                                    key={hIdx}
                                    onClick={(e) => handleSubheaderClick(e, idx, header.id)}
                                    className="text-left text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-1 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
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

const regex = /\{sections\.map\(\(section, idx\) => \{[\s\S]*?\}\)\}/;
content = content.replace(regex, renderLogic);

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
