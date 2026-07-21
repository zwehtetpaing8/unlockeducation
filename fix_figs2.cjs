const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

text = text.replace(
  /<foreignObject x="140" y="30" width="60" height="30" overflow="visible">\s*<div className="flex items-center justify-center w-full h-full text-\\[#ca8a04\\]">\s*<Latex text="\\$\\vec\{a\}\\$" \/>\s*<\/div>\s*<\/foreignObject>/g,
  '<foreignObject x="150" y="65" width="40" height="30" overflow="visible"><div className="flex items-center justify-center w-full h-full text-[#ca8a04]"><Latex text="$\\vec{a}$" /></div></foreignObject>'
);

text = text.replace(
  /<foreignObject x="70" y="40" width="60" height="30" overflow="visible">\s*<div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">\s*<Latex text="\\$\\hat\{\\mathbf\{a\}\}\\$" \/>\s*<\/div>\s*<\/foreignObject>/g,
  '<foreignObject x="65" y="45" width="40" height="30" overflow="visible"><div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100"><Latex text="$\\hat{\\mathbf{a}}$" /></div></foreignObject>'
);

// Fig14
text = text.replace(
  /<foreignObject x="70" y="10" width="60" height="30" overflow="visible">\s*<div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100">\s*<Latex text="\\$\\hat\{\\mathbf\{a\}\}\\$" \/>\s*<\/div>\s*<\/foreignObject>/g,
  '<foreignObject x="70" y="15" width="40" height="30" overflow="visible"><div className="flex items-center justify-center w-full h-full text-slate-900 dark:text-slate-100"><Latex text="$\\hat{\\mathbf{a}}$" /></div></foreignObject>'
);

text = text.replace(
  /<foreignObject x="140" y="40" width="60" height="30" overflow="visible">\s*<div className="flex items-center justify-center w-full h-full text-\\[#ca8a04\\]">\s*<Latex text="\\$\\vec\{b\} = 5\\hat\{\\mathbf\{a\}\}\\$" \/>\s*<\/div>\s*<\/foreignObject>/g,
  '<foreignObject x="110" y="40" width="100" height="30" overflow="visible"><div className="flex items-center justify-center w-full h-full text-[#ca8a04]"><Latex text="$\\vec{b} = 5\\hat{\\mathbf{a}}$" /></div></foreignObject>'
);

text = text.replace(
  /<foreignObject x="140" y="110" width="60" height="30" overflow="visible">\s*<div className="flex items-center justify-center w-full h-full text-\\[#d97706\\]">\s*<Latex text="\\$\\vec\{b\} = -5\\hat\{\\mathbf\{a\}\}\\$" \/>\s*<\/div>\s*<\/foreignObject>/g,
  '<foreignObject x="110" y="150" width="100" height="30" overflow="visible"><div className="flex items-center justify-center w-full h-full text-[#d97706]"><Latex text="$\\vec{b} = -5\\hat{\\mathbf{a}}$" /></div></foreignObject>'
);

// fix arrow polygon points in fig 14
text = text.replace('points="60.0,160.0 67.5,153.4 69.5,163.2"', 'points="60.0,160.0 67.5,163.4 69.5,153.6"');

fs.writeFileSync('src/components/Latex.tsx', text);
