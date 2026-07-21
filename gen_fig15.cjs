const fs = require('fs');

const fig15 = `export function Chap4_Fig15() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[320px] aspect-[320/120]">
        <svg viewBox="0 0 320 120" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="40" y1="90" x2="280" y2="30" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4,4" />
          
          {/* Curved arrow for AB */}
          <path d="M 60 85 Q 100 95 138 68" className="stroke-[#ca8a04]" strokeWidth="2" fill="none" />
          <polygon points="140.0,65.0 132.0,72.0 137.0,75.0" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="90" y="80" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\overrightarrow{AB}$" />
            </div>
          </foreignObject>

          {/* Curved arrow for AC */}
          <path d="M 60 85 Q 160 30 258 34" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" fill="none" />
          <polygon points="260.0,35.0 250.0,32.0 255.0,29.0" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="150" y="10" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\overrightarrow{AC}$" />
            </div>
          </foreignObject>
          
          <circle cx="60" cy="85" r="3" className="fill-[#ca8a04] stroke-none" />
          <circle cx="140" cy="65" r="3" className="fill-[#ca8a04] stroke-none" />
          <circle cx="260" cy="35" r="3" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          
          <text x="50" y="105" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">A</text>
          <text x="145" y="85" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">B</text>
          <text x="265" y="55" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">C</text>
        </svg>
      </div>
    </div>
  );
}`

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// replace everything from export function Chap4_Fig15 to the end of the function
text = text.replace(/export function Chap4_Fig15\(\) \{[\s\S]*?\}\s*\}/, fig15);

fs.writeFileSync('src/components/Latex.tsx', text);
