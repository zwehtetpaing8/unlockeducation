const fs = require('fs');
const content = fs.readFileSync('src/data/chapters.ts', 'utf8');
const lines = content.split('\n');
const start = 1369;
const end = 2221;
for (let i = start - 1; i < end; i++) {
  const line = lines[i];
  if (line && line.trim().startsWith('#')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
