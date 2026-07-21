const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
let added = `
export function Chap4_Fig6() { return <div className="text-center italic text-slate-500">Figure 6 (missing)</div>; }
export function Chap4_Fig7() { return <div className="text-center italic text-slate-500">Figure 7 (missing)</div>; }
export function Chap4_Fig8() { return <div className="text-center italic text-slate-500">Figure 8 (missing)</div>; }
export function Chap4_Fig9() { return <div className="text-center italic text-slate-500">Figure 9 (missing)</div>; }
export function Chap4_Fig10() { return <div className="text-center italic text-slate-500">Figure 10 (missing)</div>; }
export function Chap4_Fig11() { return <div className="text-center italic text-slate-500">Figure 11 (missing)</div>; }
export function Chap4_Fig12() { return <div className="text-center italic text-slate-500">Figure 12 (missing)</div>; }
export function Chap4_Fig13() { return <div className="text-center italic text-slate-500">Figure 13 (missing)</div>; }
export function Chap4_Fig14() { return <div className="text-center italic text-slate-500">Figure 14 (missing)</div>; }
export function Chap4_Fig15() { return <div className="text-center italic text-slate-500">Figure 15 (missing)</div>; }
`;
// Let's insert it before export function Ex5_4_Q6_i_Diag
let target = 'export function Ex5_4_Q6_i_Diag';
content = content.replace(target, added + '\n' + target);
fs.writeFileSync('src/components/Latex.tsx', content);
