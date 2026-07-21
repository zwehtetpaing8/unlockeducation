const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"$$ |\\\\vec{b} - \\\\vec{a}|^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 $$\n$$ = x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) $$\n$$ = |\\\\vec{a}|^2 + |\\\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\\\quad (2) $$",
"$$ \\\\begin{aligned} |\\\\vec{b} - \\\\vec{a}|^2 &= (x_2 - x_1)^2 + (y_2 - y_1)^2 \\\\\\\\ &= x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) \\\\\\\\ &= |\\\\vec{a}|^2 + |\\\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\\\quad (2) \\\\end{aligned} $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
