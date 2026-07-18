const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const desktopRegex = /<div className="text-xs font-semibold leading-tight tracking-tight">\s*\{ch\.title\}\s*<\/div>/;
const mobileRegex = /<div className="text-xs font-semibold leading-tight tracking-tight">\s*\{ch\.title\}\s*<\/div>/g;

const replacement = `<div className="text-xs font-semibold leading-tight tracking-tight flex items-center justify-between">
                          <span>{ch.title}</span>
                          {completedChapters.includes(ch.id) && (
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          )}
                        </div>`;

content = content.replace(mobileRegex, replacement);

fs.writeFileSync('src/App.tsx', content);
