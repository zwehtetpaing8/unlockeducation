const fs = require('fs');
['src/components/ChapterDetails.tsx', 'src/components/Latex.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('import DraggableScroll')) {
    content = 'import DraggableScroll from "./DraggableScroll";\n' + content;
    fs.writeFileSync(file, content);
  }
});
