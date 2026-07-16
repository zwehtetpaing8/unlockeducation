const fs = require('fs');
const lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');

for (let i = 2490; i < 2650; i++) {
  // Let's replace single backslashes that are followed by a word character (like \frac, \cos, etc) 
  // with double backslashes if they are not already double.
  // Wait, in JS, readFileSync gives the literal characters in the file.
  // So if the file contains `\frac`, it is exactly two chars: '\' and 'f'.
  // We want to replace '\' with '\\' if it's not already '\\'.
  lines[i] = lines[i].replace(/(?<!\\)\\(?![\\`])/g, '\\\\');
}

fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
