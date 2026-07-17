const fs = require('fs');

let code = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

// For Chap3_4_Ex9
code = code.replace(
  '{/* Bracket and Vector */}\n        <path d="M 140 60 L 135 60 L 135 105 L 140 105" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />',
  `{/* Direction Vector Arrow */}
        <defs>
          <marker id="arrow-vec" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        <line x1="135" y1="60" x2="135" y2="105" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url(#arrow-vec)" />`
);

// For Chap3_4_Q2
code = code.replace(
  '{/* Bracket and Vector */}\n        <path d="M 140 60 L 135 60 L 135 105 L 140 105" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />',
  `{/* Direction Vector Arrow */}
        <defs>
          <marker id="arrow-vec-q2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        <line x1="135" y1="60" x2="135" y2="105" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url(#arrow-vec-q2)" />`
);

// For Chap3_4_Ex10_Sol1
code = code.replace(
  '{/* Bracket and Vector */}\n        <path d="M 130 115 L 125 115 L 125 175 L 130 175" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />',
  `{/* Direction Vector Arrow */}
        <defs>
          <marker id="arrow-vec-ex10" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        <line x1="125" y1="115" x2="125" y2="175" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url(#arrow-vec-ex10)" />`
);

// For Chap3_4_Q3_Sol
code = code.replace(
  '{/* Bracket and Vector */}\n        <path d="M 130 115 L 125 115 L 125 175 L 130 175" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />',
  `{/* Direction Vector Arrow */}
        <defs>
          <marker id="arrow-vec-q3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        <line x1="125" y1="115" x2="125" y2="175" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" markerEnd="url(#arrow-vec-q3)" />`
);

fs.writeFileSync('src/components/Latex.tsx', code);
