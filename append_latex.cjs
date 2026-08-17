const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newComponents = `
export function Chap4_4_4_PlaneEq_Diag1() {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative" style={{ width: '400px', height: '350px' }}>
        <svg viewBox="0 0 400 350" className="w-full h-full">
          <defs>
            <marker id="arrow-head-slate-1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
            <marker id="arrow-head-yellow-1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
            </marker>
          </defs>
          
          <g stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700">
            {[50, 100, 150, 200, 250, 300].map(x => (
              <line key={"v"+x} x1={x + 50} y1="50" x2={x + 50} y2="300" />
            ))}
            {[50, 100, 150, 200, 250].map(y => (
              <line key={"h"+y} x1="50" y1={y} x2="350" y2={y} />
            ))}
          </g>
          
          <line x1="50" y1="300" x2="380" y2="300" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-1)" />
          <line x1="100" y1="320" x2="100" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-1)" />
          
          <circle cx="100" cy="300" r="4" fill="currentColor" className="text-slate-900 dark:text-white" />
          
          <line x1="100" y1="300" x2="150" y2="300" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-1)" />
          <foreignObject x="120" y="305" width="30" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\hat{i}$\`} /></div>
          </foreignObject>
          
          <line x1="100" y1="300" x2="100" y2="250" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-1)" />
          <foreignObject x="65" y="260" width="30" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\hat{j}$\`} /></div>
          </foreignObject>

          <line x1="100" y1="300" x2="250" y2="200" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-1)" />
          <foreignObject x="180" y="210" width="80" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$3\\hat{i} + 2\\hat{j}$\`} /></div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

export function Chap4_4_4_PlaneEq_Diag2() {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative" style={{ width: '400px', height: '350px' }}>
        <svg viewBox="0 0 400 350" className="w-full h-full">
          <defs>
            <marker id="arrow-head-slate-2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
            <marker id="arrow-head-yellow-2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
            </marker>
          </defs>
          
          <line x1="150" y1="280" x2="150" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-2)" />
          <line x1="150" y1="280" x2="350" y2="280" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-2)" />
          <line x1="150" y1="280" x2="110" y2="330" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-2)" />
          
          <circle cx="150" cy="280" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          
          <polygon points="150,280 230,280 300,180 220,180" fill="#fef3c7" fillOpacity="0.3" stroke="#d97706" strokeWidth="1" className="dark:fill-amber-900/30" />
          
          <line x1="190" y1="230" x2="270" y2="230" stroke="#fcd34d" strokeWidth="1" className="dark:stroke-amber-700" />
          <line x1="185" y1="230" x2="260" y2="130" stroke="#fcd34d" strokeWidth="1" className="dark:stroke-amber-700" />
          <polygon points="150,280 310,280 380,120 220,120" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.5" />
          <polygon points="190,280 260,120" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.5" />
          <polygon points="230,280 300,120" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.5" />
          <polygon points="270,280 340,120" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.5" />
          <polygon points="173,226 333,226" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.5" />
          <polygon points="196,173 356,173" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.5" />
          
          <line x1="150" y1="280" x2="190" y2="280" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-2)" />
          <foreignObject x="165" y="285" width="30" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\vec{d}_1$\`} /></div>
          </foreignObject>
          
          <line x1="150" y1="280" x2="173" y2="226" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-2)" />
          <foreignObject x="125" y="220" width="30" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\vec{d}_2$\`} /></div>
          </foreignObject>

          <line x1="150" y1="280" x2="266" y2="200" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-2)" />
          <foreignObject x="190" y="180" width="80" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$2\\vec{d}_1 + 2\\vec{d}_2$\`} /></div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

export function Chap4_4_4_PlaneEq_Diag3() {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative" style={{ width: '450px', height: '350px' }}>
        <svg viewBox="0 0 450 350" className="w-full h-full">
          <defs>
            <marker id="arrow-head-slate-3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
            <marker id="arrow-head-yellow-3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
            </marker>
          </defs>
          
          <circle cx="150" cy="300" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="135" y="300" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$O$\`} /></div>
          </foreignObject>

          <polygon points="200,200 400,200 350,100 150,100" fill="none" stroke="#d97706" strokeWidth="1" />
          <foreignObject x="270" y="80" width="60" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600">plane</div>
          </foreignObject>

          <circle cx="210" cy="180" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="195" y="150" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$A$\`} /></div>
          </foreignObject>
          
          <line x1="150" y1="300" x2="210" y2="180" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-3)" />
          <foreignObject x="110" y="220" width="60" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$\\vec{a} = \\overrightarrow{OA}$\`} /></div>
          </foreignObject>

          <polygon points="210,180 300,180 360,110 270,110" fill="#fef3c7" fillOpacity="0.4" stroke="#d97706" strokeWidth="1" strokeDasharray="4 2" className="dark:fill-amber-900/40" />

          <circle cx="300" cy="180" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="305" y="180" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$B$\`} /></div>
          </foreignObject>

          <circle cx="270" cy="110" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="250" y="90" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$C$\`} /></div>
          </foreignObject>

          <circle cx="360" cy="110" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="365" y="90" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$R$\`} /></div>
          </foreignObject>

          <line x1="210" y1="180" x2="360" y2="110" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-3)" />
          
          <line x1="150" y1="300" x2="360" y2="110" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-3)" />
          <foreignObject x="220" y="210" width="80" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\vec{r} = \\overrightarrow{OR}$\`} /></div>
          </foreignObject>

          <foreignObject x="260" y="185" width="40" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$t_1\\vec{d}_1$\`} /></div>
          </foreignObject>
          <foreignObject x="200" y="125" width="40" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$t_2\\vec{d}_2$\`} /></div>
          </foreignObject>

        </svg>
      </div>
    </div>
  );
}

export function Chap4_4_4_PlaneEq_Diag4() {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative" style={{ width: '450px', height: '350px' }}>
        <svg viewBox="0 0 450 350" className="w-full h-full">
          <defs>
            <marker id="arrow-head-slate-4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
            <marker id="arrow-head-yellow-4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
            </marker>
          </defs>
          
          <circle cx="150" cy="300" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="135" y="300" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$O$\`} /></div>
          </foreignObject>

          <polygon points="200,200 420,200 370,140 150,140" fill="none" stroke="#d97706" strokeWidth="1" />
          <foreignObject x="290" y="115" width="60" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600">plane</div>
          </foreignObject>

          <circle cx="230" cy="180" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="205" y="180" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$A$\`} /></div>
          </foreignObject>
          
          <line x1="150" y1="300" x2="230" y2="180" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-4)" />
          <foreignObject x="160" y="240" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$\\vec{a}$\`} /></div>
          </foreignObject>

          <line x1="230" y1="180" x2="230" y2="80" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-4)" />
          <foreignObject x="205" y="100" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\vec{n}$\`} /></div>
          </foreignObject>
          <polyline points="230,170 240,170 240,180" fill="none" stroke="#d97706" strokeWidth="1" />

          <circle cx="360" cy="160" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <foreignObject x="340" y="130" width="70" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white"><Latex text={String.raw\`$R(x, y, z)$\`} /></div>
          </foreignObject>

          <line x1="230" y1="180" x2="360" y2="160" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-4)" />
          <foreignObject x="270" y="145" width="40" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\overrightarrow{AR}$\`} /></div>
          </foreignObject>

          <line x1="150" y1="300" x2="360" y2="160" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-head-yellow-4)" />
          <foreignObject x="270" y="240" width="20" height="30" overflow="visible">
             <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600"><Latex text={String.raw\`$\\vec{r}$\`} /></div>
          </foreignObject>

        </svg>
      </div>
    </div>
  );
}
`;

content = content + newComponents;

fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
