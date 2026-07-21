const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const regex = /<div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">([\s\S]*?)<\/div>/;

if (regex.test(content)) {
  const match = content.match(regex);
  content = content.replace(regex, '<DraggableScroll className="flex gap-2 min-h-[40px] pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">$1</DraggableScroll>');
  fs.writeFileSync('src/components/ChapterDetails.tsx', content);
  console.log("Success");
} else {
  console.log("Not found");
}
