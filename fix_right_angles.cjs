const fs = require('fs');
let code = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

// For Ex9 and Q2:
code = code.replaceAll('d="M 100 125 L 108 123 L 108 133"', 'd="M 100 125 L 108 125 L 108 135"');

// For Ex10_Sol1:
// Top plane:
code = code.replace('d="M 140 55 L 148 53 L 148 63"', 'd="M 140 55 L 148 55 L 148 65"');
// Bottom plane:
code = code.replace('d="M 140 125 L 148 123 L 148 133"', 'd="M 140 125 L 148 125 L 148 135"');

// For Ex10_Sol2 and Q3_Sol:
// Top plane:
code = code.replaceAll('d="M 120 45 L 128 43 L 128 53"', 'd="M 120 45 L 128 45 L 128 55"');
// Bottom plane:
code = code.replaceAll('d="M 120 115 L 128 113 L 128 123"', 'd="M 120 115 L 128 115 L 128 125"');

fs.writeFileSync('src/components/Latex.tsx', code);
