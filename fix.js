const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace inline (a) ... (b) ... etc with <br/>
  // Match space + (b), space + (c), etc.
  content = content.replace(/,\s+\*\*\(\b\)\*\*/g, '<br/>**(b)**');
  
  // Replace " (b) " with "<br/>(b) "
  content = content.replace(/ \((b|c|d|e)\) /g, '<br/>($1) ');
  
  // Also fix cases like " (b) " but at the end or before punctuation
  content = content.replace(/ \((b|c|d|e)\)/g, '<br/>($1)');

  fs.writeFileSync(file, content);
}

fixFile('src/data/chapters.ts');
fixFile('src/data/chapter4_content.ts');
fixFile('src/data/chapter5_content.ts');

