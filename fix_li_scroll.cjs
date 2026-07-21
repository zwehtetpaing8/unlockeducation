const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

content = content.replace(
  /<div className="flex-1 leading-relaxed text-xs md:text-sm">/g,
  '<div className="flex-1 leading-relaxed text-xs md:text-sm overflow-x-auto scrollbar-none">'
);

content = content.replace(
  /<div className=\{\`text-xs md:text-sm leading-relaxed \$\{textAccent\}\`\}>/g,
  '<div className={`text-xs md:text-sm leading-relaxed overflow-x-auto scrollbar-none ${textAccent}`}>'
);

fs.writeFileSync('src/components/Latex.tsx', content);
