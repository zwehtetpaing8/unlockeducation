const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const oldFig = `export function Chap4_Fig15() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[320px] aspect-[320/120]">
        <svg viewBox="0 0 320 120" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="40" y1="90" x2="280" y2="30" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="60" y1="85" x2="138.1" y2="65.5" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="140.0,65.0 132.8,72.0 130.4,62.2" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="90" y="45" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\overrightarrow{AB}$" />
            </div>
          </foreignObject>
          <line x1="60" y1="85" x2="258.1" y2="35.5" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="260.0,35.0 252.8,42.0 250.4,32.2" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="160" y="10" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\overrightarrow{AC}$" />
            </div>
          </foreignObject>
          
          <circle cx="60" cy="85" r="2.5" className="fill-[#ca8a04] stroke-none" />
          <circle cx="140" cy="65" r="2.5" className="fill-[#ca8a04] stroke-none" />
          <circle cx="260" cy="35" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          
          <text x="55" y="105" className="fill-[#ca8a04] text-[12px] font-serif italic stroke-none">A</text>
          <text x="135" y="85" className="fill-[#ca8a04] text-[12px] font-serif italic stroke-none">B</text>
          <text x="255" y="55" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">C</text>
        </svg>
      </div>
    </div>
  );
}`;

const newFig = `export function Chap4_Fig15() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[320px] aspect-[320/120]">
        <svg viewBox="0 0 320 120" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="40" y1="90" x2="280" y2="30" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4,4" />
          
          {/* Vector AB shifted slightly down and right */}
          <line x1="62" y1="87" x2="140.1" y2="67.5" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="142.0,67.0 134.8,74.0 132.4,64.2" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="90" y="70" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\overrightarrow{AB}$" />
            </div>
          </foreignObject>

          {/* Vector AC shifted slightly up and left */}
          <line x1="58" y1="83" x2="256.1" y2="33.5" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="258.0,33.0 250.8,40.0 248.4,30.2" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="160" y="15" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\overrightarrow{AC}$" />
            </div>
          </foreignObject>
          
          <circle cx="60" cy="85" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          <circle cx="140" cy="65" r="2.5" className="fill-[#ca8a04] stroke-none" />
          <circle cx="260" cy="35" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          
          <text x="50" y="105" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">A</text>
          <text x="135" y="55" className="fill-[#ca8a04] text-[12px] font-serif italic stroke-none">B</text>
          <text x="265" y="35" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">C</text>
        </svg>
      </div>
    </div>
  );
}`;

if (text.includes(oldFig)) {
  text = text.replace(oldFig, newFig);
  fs.writeFileSync('src/components/Latex.tsx', text);
  console.log("Replaced successfully");
} else {
  console.log("NOT FOUND, check the exact string");
}
