const fs = require('fs');

let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

if (!content.includes('DraggableScroll')) {
  const importStatement = `import DraggableScroll from "./DraggableScroll";\n`;
  content = content.replace(/(import .* from ['"].*['"];\n)(?!import)/, `$1${importStatement}`);
}

const target = `<div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl overflow-x-auto min-h-[50px] w-full">
                      <Latex text={\`$$$\{f.latex}$$\`} />
                    </div>`;
const replace = `<DraggableScroll className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl min-h-[50px] w-full">
                      <Latex text={\`$$$\{f.latex}$$\`} />
                    </DraggableScroll>`;

content = content.replace(target, replace);
fs.writeFileSync('src/components/ChapterDetails.tsx', content);
