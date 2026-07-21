const fs = require('fs');
let code = fs.readFileSync('src/components/Latex.tsx', 'utf8');
code = code.replace(
  'function renderMathText(text: string): React.ReactNode {',
  'function renderMathText(text: string): React.ReactNode {\n  if (text.includes("overrightarrow")) console.log("RENDERMATH TEXT:", JSON.stringify(text));'
);
fs.writeFileSync('src/components/Latex.tsx', code);
