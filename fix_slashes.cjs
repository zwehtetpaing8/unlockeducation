const fs = require('fs');

let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');

function fixLine(line) {
  // We need to replace single backslash followed by a letter or symbol with double backslashes.
  // Wait, if it has single backslash, in JS string it's just a backslash character if read from file.
  // So replacing `\` with `\\` where it is followed by specific latex commands.
  return line
    .replace(/\\quad/g, '\\\\quad')
    .replace(/\\qquad/g, '\\\\qquad')
    .replace(/\\text/g, '\\\\text')
    .replace(/\\sqrt/g, '\\\\sqrt')
    .replace(/\\frac/g, '\\\\frac')
    .replace(/\\,/g, '\\\\,')
    .replace(/\\implies/g, '\\\\implies')
    .replace(/\\langle/g, '\\\\langle')
    .replace(/\\rangle/g, '\\\\rangle')
    .replace(/\\left/g, '\\\\left')
    .replace(/\\right/g, '\\\\right')
    .replace(/\\cdot/g, '\\\\cdot');
}

for (let i = 2260; i <= 2510; i++) {
  if (lines[i]) {
    lines[i] = fixLine(lines[i]);
  }
}

fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
