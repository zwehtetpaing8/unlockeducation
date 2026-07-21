const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newFigs = fs.readFileSync('new_figs.txt', 'utf8');

const placeholder13 = 'export function Chap4_Fig13() { return <div className="text-center italic text-slate-500">Figure 13 (missing)</div>; }\n';
const placeholder14 = 'export function Chap4_Fig14() { return <div className="text-center italic text-slate-500">Figure 14 (missing)</div>; }\n';
const placeholder15 = 'export function Chap4_Fig15() { return <div className="text-center italic text-slate-500">Figure 15 (missing)</div>; }\n';

text = text.replace(placeholder13, '');
text = text.replace(placeholder14, '');
text = text.replace(placeholder15, newFigs);

fs.writeFileSync('src/components/Latex.tsx', text);
