const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(/\\frac\{x - x_1\}/g, '\\\\frac{x - x_1}');
text = text.replace(/\\frac\{y - y_1\}/g, '\\\\frac{y - y_1}');
text = text.replace(/\\frac\{z - z_1\}/g, '\\\\frac{z - z_1}');
text = text.replace(/\\frac\{l_1 l_2/g, '\\\\frac{l_1 l_2');
text = text.replace(/quad \(l \\neq/g, '\\\\quad (l \\\\neq');

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
