const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const target = `<line x1="150" y1="80" x2="240.8" y2="52.8" className="stroke-slate-900 dark:stroke-slate-100" strokeWidth="2" />`;

if (text.includes(target)) {
  console.log('found target');
} else {
  console.log('not found');
}
