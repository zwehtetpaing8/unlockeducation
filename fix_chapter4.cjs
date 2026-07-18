const fs = require('fs');

let content = fs.readFileSync('src/data/chapters.ts', 'utf-8');

// Add import if not present
if (!content.includes('chapter4Content')) {
  content = content.replace(
    "import { chapter5Content } from './chapter5_content';",
    "import { chapter4Content } from './chapter4_content';\nimport { chapter5Content } from './chapter5_content';"
  );
}

// Find chapter 4 in the array
const regex = /\{\s*id:\s*4,\s*title:\s*"Vector Algebra",\s*tagline:[\s\S]*?content:\s*`[\s\S]*?`,\s*formulas:/;

const match = content.match(regex);
if (match) {
  const replacement = match[0].replace(/content:\s*`[\s\S]*?`,/, "content: chapter4Content,");
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/data/chapters.ts', content);
  console.log("Updated chapter 4 successfully.");
} else {
  console.log("Could not find chapter 4 matching the regex.");
}
