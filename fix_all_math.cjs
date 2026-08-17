const fs = require('fs');

const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Fix lines ending in ". $" (which should be ". $$")
  line = line.replace(/\. \$$/, '. $$');
  
  // Fix lines ending in ", $" (which should be ", $$")
  line = line.replace(/, \$$/, ', $$');

  // Fix lines ending in " $`" (which should be " $$`" - wait, let's just do exactly what's broken)
  if (line.match(/^\(.*?\) \$\$/) && line.endsWith('. $')) {
     line = line.substring(0, line.length - 3) + '. $$';
  }
  
  if (line.match(/^\(.*?\) \$\$/) && line.endsWith('. $')) {
     line = line.substring(0, line.length - 3) + '. $$';
  }
  
  // Specific fix for "eq 0." and "eq 2." which were probably "\neq 0." split across lines?
  // Let's check lines 1395-1396 and 1438-1439
  
  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
