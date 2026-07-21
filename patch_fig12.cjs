const fs = require('fs');

const latexCode = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newFig = `
export function Chap4_Fig12() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-[340px] h-40">
        <svg viewBox="0 0 320 150" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="50" y1="100" x2="250" y2="50" className="stroke-[#ca8a04] opacity-50" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="130" y1="50" x2="170" y2="100" className="stroke-[#ca8a04] opacity-50" strokeWidth="1" strokeDasharray="5,5" />
          
          <line x1="50" y1="100" x2="121.9" y2="55.1" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="130.0,50.0 123.8,60.3 118.0,51.0" className="fill-[#ca8a04] stroke-none" />
          <g className="fill-[#ca8a04] stroke-[#ca8a04]">
            <text x="75" y="70" textAnchor="middle" className="stroke-none font-serif italic text-sm">AB</text>
            <line x1="69" y1="58" x2="81" y2="58" strokeWidth="1" />
            <polygon points="83,58 79,56 79,60" className="stroke-none" />
          </g>
          
          <line x1="130" y1="50" x2="240.4" y2="50.0" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="250.0,50.0 239.3,55.4 239.3,44.6" className="fill-[#ca8a04] stroke-none" />
          <g className="fill-[#ca8a04] stroke-[#ca8a04]">
            <text x="190" y="40" textAnchor="middle" className="stroke-none font-serif italic text-sm">BC</text>
            <line x1="184" y1="28" x2="196" y2="28" strokeWidth="1" />
            <polygon points="198,28 194,26 194,30" className="stroke-none" />
          </g>
          
          <line x1="50" y1="100" x2="160.4" y2="100.0" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="170.0,100.0 159.3,105.4 159.3,94.6" className="fill-[#ca8a04] stroke-none" />
          <g className="fill-[#ca8a04] stroke-[#ca8a04]">
            <text x="110" y="125" textAnchor="middle" className="stroke-none font-serif italic text-sm">AD</text>
            <line x1="104" y1="113" x2="116" y2="113" strokeWidth="1" />
            <polygon points="118,113 114,111 114,115" className="stroke-none" />
          </g>
          
          <line x1="170" y1="100" x2="241.9" y2="55.1" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="250.0,50.0 243.8,60.3 238.0,51.0" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <g className="fill-slate-900 dark:fill-slate-100 stroke-slate-900 dark:stroke-slate-100">
            <text x="225" y="90" textAnchor="middle" className="stroke-none font-serif italic text-sm">DC</text>
            <line x1="219" y1="78" x2="231" y2="78" strokeWidth="1" />
            <polygon points="233,78 229,76 229,80" className="stroke-none" />
          </g>
          
          <circle cx="50" cy="100" r="2.5" className="fill-[#ca8a04] stroke-none" />
          <circle cx="130" cy="50" r="2.5" className="fill-[#ca8a04] stroke-none" />
          <circle cx="250" cy="50" r="2.5" className="fill-[#ca8a04] stroke-none" />
          <circle cx="170" cy="100" r="2.5" className="fill-[#ca8a04] stroke-none" />
          
          <text x="18" y="118" className="fill-[#ca8a04] text-[10px] stroke-none">
            <tspan className="font-serif italic text-[11px]">A</tspan>
            <tspan>(-1, 1, 1)</tspan>
          </text>
          <text x="100" y="40" className="fill-[#ca8a04] text-[10px] stroke-none">
            <tspan className="font-serif italic text-[11px]">B</tspan>
            <tspan>(2, 0, -2)</tspan>
          </text>
          <text x="260" y="40" className="fill-[#ca8a04] text-[10px] stroke-none">
            <tspan className="font-serif italic text-[11px]">C</tspan>
            <tspan>(x, y, z)</tspan>
          </text>
          <text x="168" y="118" className="fill-[#ca8a04] text-[10px] stroke-none">
            <tspan className="font-serif italic text-[11px]">D</tspan>
            <tspan>(3, 1, 4)</tspan>
          </text>
        </svg>
      </div>
    </div>
  );
}
`;

const index = latexCode.indexOf('export function Chap4_Fig11');
if (index === -1) {
  console.log("Could not find Chap4_Fig11");
  process.exit(1);
}

// Find end of Chap4_Fig11
let endIndex = latexCode.indexOf('export function', index + 10);
if (endIndex === -1) {
  endIndex = latexCode.length;
}

const modified = latexCode.slice(0, endIndex) + newFig + latexCode.slice(endIndex);
fs.writeFileSync('src/components/Latex.tsx', modified);
console.log("Added Chap4_Fig12");
