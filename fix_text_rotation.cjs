const fs = require('fs');

let code = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

// For Chap3_4_Ex9
code = code.replace(
  '<text x="125" y="82.5" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 125 82.5)" textAnchor="middle">⟨3, -2, -1⟩</text>',
  '<text x="110" y="86" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">d = ⟨3, -2, -1⟩</text>'
);

// For Chap3_4_Q2
code = code.replace(
  '<text x="125" y="82.5" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 125 82.5)" textAnchor="middle">⟨-2, 3, -1⟩</text>',
  '<text x="110" y="86" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">d = ⟨-2, 3, -1⟩</text>'
);

// For Chap3_4_Ex10_Sol1
code = code.replace(
  '<text x="115" y="145" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 115 145)" textAnchor="middle">⟨3, -2, -3⟩</text>',
  '<text x="115" y="148" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">d = ⟨3, -2, -3⟩</text>'
);

// For Chap3_4_Q3_Sol
code = code.replace(
  '<text x="115" y="145" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 115 145)" textAnchor="middle">⟨-2, 1, 3⟩</text>',
  '<text x="115" y="148" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">d = ⟨-2, 1, 3⟩</text>'
);

fs.writeFileSync('src/components/Latex.tsx', code);
