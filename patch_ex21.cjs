const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const target = `          {/* Labels */}
          <foreignObject x="110" y="280" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$$O$$" /></div>
          </foreignObject>
          <foreignObject x="80" y="70" width="120" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text="$A \\text{ (fixed point)}$" /></div>
          </foreignObject>
          <foreignObject x="240" y="175" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$B$" /></div>
          </foreignObject>
          <foreignObject x="80" y="200" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={"$$\\\\vec{a} = \\\\overrightarrow{OA}$$"} /></div>
          </foreignObject>
          
          <foreignObject x="210" y="110" width="90" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$$\\\\vec{d}_2 = \\\\overrightarrow{AB}$$"} /></div>
          </foreignObject>
          
          <foreignObject x="270" y="165" width="40" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$$\\\\vec{d}_1$$"} /></div>
          </foreignObject>`;

const replacement = `          {/* Labels */}
          <foreignObject x="110" y="285" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$$O$$" /></div>
          </foreignObject>
          <foreignObject x="75" y="75" width="120" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text="$A \\text{ (fixed point)}$" /></div>
          </foreignObject>
          <foreignObject x="235" y="170" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$B$" /></div>
          </foreignObject>
          <foreignObject x="65" y="195" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={"$$\\\\vec{a} = \\\\overrightarrow{OA}$$"} /></div>
          </foreignObject>
          
          <foreignObject x="160" y="135" width="90" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$$\\\\vec{d}_2 = \\\\overrightarrow{AB}$$"} /></div>
          </foreignObject>
          
          <foreignObject x="280" y="115" width="40" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$$\\\\vec{d}_1$$"} /></div>
          </foreignObject>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/Latex.tsx', content);
    console.log("Successfully replaced the Ex 21 labels.");
} else {
    console.log("Target not found. Doing a softer replace.");
    // let's do targeted replacements
    content = content.replace(/<foreignObject x="210" y="110"/g, '<foreignObject x="160" y="135"');
    content = content.replace(/<foreignObject x="270" y="165"/g, '<foreignObject x="280" y="115"');
    content = content.replace(/<foreignObject x="110" y="280"/g, '<foreignObject x="110" y="285"');
    content = content.replace(/<foreignObject x="80" y="70"/g, '<foreignObject x="75" y="75"');
    content = content.replace(/<foreignObject x="240" y="175"/g, '<foreignObject x="235" y="170"');
    content = content.replace(/<foreignObject x="80" y="200"/g, '<foreignObject x="65" y="195"');
    fs.writeFileSync('src/components/Latex.tsx', content);
}
