const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
  "$\\angle QPR$ is the angle between $\\overrightarrow{PQ}$ and $\\overrightarrow{PR}$.",
  "[DIAGRAM:Chap4_Ex9]\n\n$\\angle QPR$ is the angle between $\\overrightarrow{PQ}$ and $\\overrightarrow{PR}$."
);

content = content.replace(
  "(a) Express $\\overrightarrow{AC}$ and $\\overrightarrow{BD}$ in terms of $\\vec{a}$ and $\\vec{b}$.",
  "[DIAGRAM:Chap4_Ex4_2_Q6]\n\n(a) Express $\\overrightarrow{AC}$ and $\\overrightarrow{BD}$ in terms of $\\vec{a}$ and $\\vec{b}$."
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
