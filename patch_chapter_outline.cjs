const fs = require('fs');

let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

content = content.replace(
  /<div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">/g,
  '<DraggableScroll className="flex gap-2 min-h-[40px] pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">'
);
content = content.replace(
  /                                setIsMobileOutlineOpen\(false\);\n                              \}\}\n                              className=\{\`snap-start/g,
  '                                setIsMobileOutlineOpen(false);\n                              }}\n                              className={`snap-start'
);

// wait, the closing tag of the div needs to be updated.
// Let's just use string replacement.
