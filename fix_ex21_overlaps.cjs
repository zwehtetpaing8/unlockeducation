const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const target = `          {/* Labels */}
          <foreignObject x="110" y="285" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$O$" /></div>
          </foreignObject>
          <foreignObject x="75" y="75" width="120" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text="$A \\text{ (fixed point)}$" /></div>
          </foreignObject>
          <foreignObject x="235" y="170" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$B$" /></div>
          </foreignObject>
          <foreignObject x="65" y="195" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={"$\\\\vec{a} = \\\\overrightarrow{OA}$"} /></div>
          </foreignObject>
          
          <foreignObject x="160" y="135" width="90" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$\\\\vec{d}_2 = \\\\overrightarrow{AB}$"} /></div>
          </foreignObject>
          
          <foreignObject x="280" y="115" width="40" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$\\\\vec{d}_1$"} /></div>
          </foreignObject>`;

const replacement = `          {/* Labels */}
          <foreignObject x="110" y="285" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$O$" /></div>
          </foreignObject>
          <foreignObject x="40" y="70" width="120" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text="$A \\text{ (fixed point)}$" /></div>
          </foreignObject>
          <foreignObject x="245" y="175" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$B$" /></div>
          </foreignObject>
          <foreignObject x="20" y="180" width="100" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={"$\\\\vec{a} = \\\\overrightarrow{OA}$"} /></div>
          </foreignObject>
          
          <foreignObject x="180" y="95" width="90" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$\\\\vec{d}_2 = \\\\overrightarrow{AB}$"} /></div>
          </foreignObject>
          
          <foreignObject x="280" y="110" width="40" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$\\\\vec{d}_1$"} /></div>
          </foreignObject>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('src/components/Latex.tsx', content);
    console.log("Successfully replaced labels in Ex 21.");
} else {
    console.log("Target not found. Doing softer replacement.");
    
    // Softer replace using String.raw regex or manual match if it was changed
    content = content.replace(/<foreignObject x="75" y="75" width="120"/, '<foreignObject x="40" y="70" width="120"');
    content = content.replace(/<foreignObject x="235" y="170" width="30"/, '<foreignObject x="245" y="175" width="30"');
    content = content.replace(/<foreignObject x="65" y="195" width="80"/, '<foreignObject x="20" y="180" width="100"');
    content = content.replace(/<foreignObject x="160" y="135" width="90"/, '<foreignObject x="180" y="95" width="90"');
    content = content.replace(/<foreignObject x="280" y="115" width="40"/, '<foreignObject x="280" y="110" width="40"');
    fs.writeFileSync('src/components/Latex.tsx', content);
}
