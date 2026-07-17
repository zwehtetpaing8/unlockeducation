const fs = require('fs');

let code = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

const regex1 = /\{\/\*\s*Direction Vector Arrow\s*\*\/\}\s*<defs>\s*<marker id="arrow-vec" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">\s*<path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" \/>\s*<\/marker>\s*<\/defs>\s*<line x1="135" y1="60" x2="135" y2="105" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url\(#arrow-vec\)" \/>/g;

code = code.replace(regex1, '');

const regex2 = /\{\/\*\s*Direction Vector Arrow\s*\*\/\}\s*<defs>\s*<marker id="arrow-vec-q2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">\s*<path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" \/>\s*<\/marker>\s*<\/defs>\s*<line x1="135" y1="60" x2="135" y2="105" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url\(#arrow-vec-q2\)" \/>/g;

code = code.replace(regex2, '');


const regex3 = /\{\/\*\s*Direction Vector Arrow\s*\*\/\}\s*<defs>\s*<marker id="arrow-vec-ex10" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">\s*<path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" \/>\s*<\/marker>\s*<\/defs>\s*<line x1="125" y1="115" x2="125" y2="175" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url\(#arrow-vec-ex10\)" \/>/g;

code = code.replace(regex3, '');


const regex4 = /\{\/\*\s*Direction Vector Arrow\s*\*\/\}\s*<defs>\s*<marker id="arrow-vec-q3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">\s*<path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" \/>\s*<\/marker>\s*<\/defs>\s*<line x1="125" y1="115" x2="125" y2="175" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url\(#arrow-vec-q3\)" \/>/g;

code = code.replace(regex4, '');

fs.writeFileSync('src/components/Latex.tsx', code);
