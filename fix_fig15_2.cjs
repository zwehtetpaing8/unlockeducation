const fs = require('fs');
let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const s1 = `<line x1="60" y1="85" x2="138.1" y2="65.5" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="140.0,65.0 132.8,72.0 130.4,62.2" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="90" y="45" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\overrightarrow{AB}$" />
            </div>
          </foreignObject>`;

const r1 = `<path d="M 60 85 Q 100 85 138 67" fill="none" className="stroke-[#ca8a04]" strokeWidth="2" />
          <polygon points="140.0,65.0 132.8,72.0 130.4,62.2" className="fill-[#ca8a04] stroke-none" />
          <foreignObject x="90" y="80" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-[#ca8a04]">
              <Latex text="$\\overrightarrow{AB}$" />
            </div>
          </foreignObject>`;

text = text.replace(s1, r1);

const s2 = `<line x1="60" y1="85" x2="258.1" y2="35.5" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="260.0,35.0 252.8,42.0 250.4,32.2" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="160" y="10" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\overrightarrow{AC}$" />
            </div>
          </foreignObject>`;

const r2 = `<path d="M 60 85 Q 160 30 258 34" fill="none" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />
          <polygon points="260.0,35.0 252.8,42.0 250.4,32.2" className="fill-slate-900 dark:fill-slate-100 stroke-none" />
          <foreignObject x="150" y="10" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">
              <Latex text="$\\overrightarrow{AC}$" />
            </div>
          </foreignObject>`;

text = text.replace(s2, r2);

fs.writeFileSync('src/components/Latex.tsx', text);
console.log('done');
