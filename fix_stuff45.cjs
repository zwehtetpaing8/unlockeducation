const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '$$') {
    if (lines[i+1] && lines[i+1].startsWith('\\begin{aligned')) {
      lines[i] = '$$ ' + lines[i+1];
      lines.splice(i+1, 1);
    } else if (lines[i-1] && lines[i-1].endsWith('\\end{aligned}')) {
      lines[i-1] = lines[i-1] + ' $$';
      lines.splice(i, 1);
      i--;
    } else if (lines[i-1] && lines[i-1].endsWith('\\end{alignedat}')) {
      lines[i-1] = lines[i-1] + ' $$';
      lines.splice(i, 1);
      i--;
    }
  }
}

// Fix trailing \ instead of empty space
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('\\end{aligned} $') && !lines[i].includes('$$')) {
    lines[i] = lines[i].replace('\\end{aligned} $', '\\end{aligned} $$');
  }
  if (lines[i].includes('\\end{alignedat} $') && !lines[i].includes('$$')) {
    lines[i] = lines[i].replace('\\end{alignedat} $', '\\end{alignedat} $$');
  }
  if (lines[i].startsWith('$ \\begin{aligned}')) {
    lines[i] = lines[i].replace('$ \\begin{aligned}', '$$ \\begin{aligned}');
  }
  if (lines[i].startsWith('$\\begin{aligned}')) {
    lines[i] = lines[i].replace('$\\begin{aligned}', '$$ \\begin{aligned}');
  }
  if (lines[i].startsWith('$\\begin{alignedat}')) {
    lines[i] = lines[i].replace('$\\begin{alignedat}', '$$ \\begin{alignedat}');
  }
}

fs.writeFileSync('src/data/chapter4_content.ts', lines.join('\n'));
