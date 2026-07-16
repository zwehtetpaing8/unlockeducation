const fs = require('fs');
const content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = content.indexOf('### 1.4 Trigonometric Form');
const endIdx = content.indexOf('### 1.5 Geometry of Complex Numbers');

if (startIdx !== -1 && endIdx !== -1) {
  console.log("Start and End found. Length of section:", endIdx - startIdx);
  fs.writeFileSync('section_1_4.md', content.slice(startIdx, endIdx));
} else {
  console.log("Not found.");
}
