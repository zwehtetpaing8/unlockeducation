const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const defsBlock = `
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
`;

const fnsToFix = ['Chap3_4_Ex9', 'Chap3_4_Q2', 'Chap3_4_Ex10_Sol1', 'Chap3_4_Ex10_Sol2', 'Chap3_4_Q3_Sol'];

fnsToFix.forEach(fn => {
  const searchStr = `export function ${fn}() {\n  return (\n    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">\n      <svg viewBox="0 0 250`;
  const insertIndex = content.indexOf('<polygon points="60,170', content.indexOf(fn));
  if (insertIndex > -1) {
      content = content.substring(0, insertIndex) + defsBlock + '        ' + content.substring(insertIndex);
  } else {
      const insertIndex2 = content.indexOf('{/* Top Plane */}', content.indexOf(fn));
      if (insertIndex2 > -1) {
          content = content.substring(0, insertIndex2) + defsBlock + '        ' + content.substring(insertIndex2);
      }
  }
});

fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
