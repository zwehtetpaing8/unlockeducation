const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// For Chap4_Fig6 to Chap4_Fig15, we want to remove the specific <g> blocks that contain vector arrows
// They usually look like:
// <g className="fill-slate-800 dark:fill-slate-200">
//   <path ... />
//   ...
// </g>

// Let's just use regex to remove these <g> blocks from Chap4_Fig6 onwards.
const parts = content.split('export function Chap4_Fig6() {');
if (parts.length > 1) {
  let chap4 = parts[1];
  
  // Replace <g className="fill-slate-800 dark:fill-slate-200">\n  <path ... </g>
  chap4 = chap4.replace(/<g className="fill-slate-800 dark:fill-slate-200">[\s\S]*?<\/g>/g, function(match) {
    if (match.includes('<path')) {
      return ''; // remove it
    }
    return match;
  });

  content = parts[0] + 'export function Chap4_Fig6() {' + chap4;
  fs.writeFileSync('src/components/Latex.tsx', content);
}
