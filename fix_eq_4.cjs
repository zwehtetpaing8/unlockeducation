const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

text = text.replace(
/(\$\$ 3\(1-t\) \+ t\(-3\) \+ \(-2\)\(4\) = 0 \$\$)[\s\S]*?(\$\$ t = -\\frac\{5\}\{6\}\. \$\$)/,
'$$ 3(1-t) + t(-3) + (-2)(4) = 0 \\implies 3 - 6t - 8 = 0 \\implies 6t = -5 \\implies t = -\\frac{5}{6}. $$'
);

text = text.replace(
/(\$\$ \\vec\{r\} \\cdot \\vec\{s\} = \\begin\{pmatrix\} t \\\\\\\\ t\+2 \\end\{pmatrix\} \\cdot \\begin\{pmatrix\} t \\\\\\\\ -4 \\end\{pmatrix\} = t\^2 \+ \(t\+2\)\(-4\)\. \$\$)[\s\S]*?(\$\$ t = 2 \\pm 2\\sqrt\{3\}\. \$\$)/,
'$$ \\vec{r} \\cdot \\vec{s} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} t \\\\ -4 \\end{pmatrix} = t^2 - 4t - 8 = 0 \\implies t = 2 \\pm 2\\sqrt{3}. $$'
);

text = text.replace(
/(\$\$ t\(-4\) - t\(t\+2\) = 0\. \$\$)[\s\S]*?(\$\$ t = 0 \\quad \\text\{or\} \\quad t = -6\. \$\$)/,
'$$ -4t - t(t+2) = -t(t+6) = 0 \\implies t = 0 \\quad \\text{or} \\quad t = -6. $$'
);

text = text.replace(
/(\$\$ \\vec\{a\} \\cdot \\vec\{b\} = \\begin\{pmatrix\} 0 \\\\\\\\ t\+2 \\end\{pmatrix\} \\cdot \\begin\{pmatrix\} 2-3t \\\\\\\\ t \\end\{pmatrix\} = 0\(2-3t\) \+ \(t\+2\)t\. \$\$)[\s\S]*?(\$\$ t = 0 \\quad \\text\{or\} \\quad t = -2\. \$\$)/,
'$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix} = t(t+2) = 0 \\implies t = 0 \\quad \\text{or} \\quad t = -2. $$'
);

text = text.replace(
/(\$\$ 0\(t\) - \(t\+2\)\(2-3t\) = 0\. \$\$)[\s\S]*?(\$\$ t = -2 \\quad \\text\{or\} \\quad t = \\frac\{2\}\{3\}\. \$\$)/,
'$$ -(t+2)(2-3t) = 0 \\implies t = -2 \\quad \\text{or} \\quad t = \\frac{2}{3}. $$'
);

fs.writeFileSync('src/data/chapter4_content.ts', text);
