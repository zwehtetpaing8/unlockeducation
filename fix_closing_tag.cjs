const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

// There are multiple </div>s. We only want the one matching our previous replacement.
// Let's use a regex that matches the opening tag, the inner content up to </div>, and replaces it.
// Actually, earlier I replaced the opening tag to <DraggableScroll ...> but not the closing tag.
const oldContent = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const regex = /<DraggableScroll className="flex gap-2 min-h-\[40px\] pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">([\s\S]*?\}<\/button>\s*\);\s*\})\s*<\/div>/;

if (regex.test(oldContent)) {
  const newContent = oldContent.replace(regex, '<DraggableScroll className="flex gap-2 min-h-[40px] pb-1 -mx-4 px-4 scrollbar-none snap-x scroll-smooth">$1</DraggableScroll>');
  fs.writeFileSync('src/components/ChapterDetails.tsx', newContent);
}

