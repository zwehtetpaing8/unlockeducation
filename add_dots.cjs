const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const searchPoints = '{/* Points */}\n          <circle cx="80" cy="50" r="2" className="fill-slate-800 dark:fill-slate-200" />';

const replacePoints = '{/* Points */}\n          <circle cx="80" cy="50" r="2" className="fill-slate-800 dark:fill-slate-200" />\n          <circle cx="20" cy="120" r="1.5" className="fill-slate-800 dark:fill-slate-200" />\n          <circle cx="110" cy="100" r="1.5" className="fill-slate-800 dark:fill-slate-200" />\n          <circle cx="50" cy="30" r="1.5" className="fill-slate-800 dark:fill-slate-200" />';

if (latex.includes(searchPoints)) {
  latex = latex.replace(searchPoints, replacePoints);
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added dots');
} else {
  console.log('Could not find points');
}
