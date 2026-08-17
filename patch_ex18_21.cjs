const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Example 18
const ex18_mp_line = `<line x1="130" y1="160" x2="188" y2="84" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber-ex18)" className="stroke-amber-600 dark:stroke-amber-400" />`;
const ex18_mp_replacement = `<line x1="130" y1="160" x2="188" y2="84" stroke="#d97706" strokeWidth="2.5" className="stroke-amber-600 dark:stroke-amber-400" />\n          <polygon points="188.0,84.0 183.9,96.0 177.5,91.1" className="fill-amber-600 dark:fill-amber-400 stroke-none" />`;
content = content.replace(ex18_mp_line, ex18_mp_replacement);

const ex18_mn_line = `<line x1="130" y1="160" x2="295" y2="160" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber-ex18)" className="stroke-amber-600 dark:stroke-amber-400" />`;
const ex18_mn_replacement = `<line x1="130" y1="160" x2="295" y2="160" stroke="#d97706" strokeWidth="2.5" className="stroke-amber-600 dark:stroke-amber-400" />\n          <polygon points="295.0,160.0 283.0,164.0 283.0,156.0" className="fill-amber-600 dark:fill-amber-400 stroke-none" />`;
content = content.replace(ex18_mn_line, ex18_mn_replacement);

const ex18_om_line = `<line x1="80" y1="240" x2="127" y2="165" stroke="currentColor" strokeWidth="2.5" markerEnd="url(#arrow-slate-ex18)" className="text-slate-800 dark:text-slate-100" />`;
const ex18_om_replacement = `<line x1="80" y1="240" x2="127" y2="165" stroke="currentColor" strokeWidth="2.5" className="text-slate-800 dark:text-slate-100" />\n          <polygon points="127.0,165.0 124.0,177.3 117.2,173.0" className="fill-slate-800 dark:fill-slate-100 stroke-none" />`;
content = content.replace(ex18_om_line, ex18_om_replacement);


// Example 21
const ex21_l_line = `<line x1="200" y1="180" x2="400" y2="130" stroke="#d97706" strokeWidth="1.5" className="stroke-amber-600 dark:stroke-amber-400" />`;
const ex21_l_replacement = `<line x1="200" y1="180" x2="400" y2="130" stroke="#d97706" strokeWidth="1.5" className="stroke-amber-600 dark:stroke-amber-400" />\n          {/* Arrows for infinite line */}
          <polygon points="200.0,180.0 210.7,173.2 212.6,181.0" className="fill-amber-600 dark:fill-amber-400 stroke-none" />
          <polygon points="400.0,130.0 389.3,136.8 387.4,129.0" className="fill-amber-600 dark:fill-amber-400 stroke-none" />`;
content = content.replace(ex21_l_line, ex21_l_replacement);

const ex21_d1_line = `<line x1="260" y1="165" x2="330" y2="147.5" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber-ex21)" className="stroke-amber-600 dark:stroke-amber-400" />`;
const ex21_d1_replacement = `<line x1="260" y1="165" x2="330" y2="147.5" stroke="#d97706" strokeWidth="2.5" className="stroke-amber-600 dark:stroke-amber-400" />\n          <polygon points="330.0,147.5 319.3,154.3 317.4,146.5" className="fill-amber-600 dark:fill-amber-400 stroke-none" />`;
content = content.replace(ex21_d1_line, ex21_d1_replacement);

const ex21_d2_line = `<line x1="150" y1="110" x2="255" y2="162" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber-ex21)" className="stroke-amber-600 dark:stroke-amber-400" />`;
const ex21_d2_replacement = `<line x1="150" y1="110" x2="255" y2="162" stroke="#d97706" strokeWidth="2.5" className="stroke-amber-600 dark:stroke-amber-400" />\n          <polygon points="255.0,162.0 242.5,160.3 246.0,153.1" className="fill-amber-600 dark:fill-amber-400 stroke-none" />`;
content = content.replace(ex21_d2_line, ex21_d2_replacement);

const ex21_oa_line = `<line x1="130" y1="280" x2="148" y2="117" stroke="currentColor" strokeWidth="2.5" markerEnd="url(#arrow-slate-ex21)" strokeDasharray="5 4" className="text-slate-800 dark:text-slate-100" />`;
const ex21_oa_replacement = `<line x1="130" y1="280" x2="148" y2="117" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 4" className="text-slate-800 dark:text-slate-100" />\n          <polygon points="148.0,117.0 150.7,129.4 142.7,128.5" className="fill-slate-800 dark:fill-slate-100 stroke-none" />`;
content = content.replace(ex21_oa_line, ex21_oa_replacement);

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Replaced successfully!");
