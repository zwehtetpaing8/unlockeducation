const fs = require('fs');
const p = 'src/components/Latex.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  "  const lines = text.split('\\n');",
  `  // Protect newlines inside $$...$$ blocks
  const protectedText = text.replace(/\\$\\$([\\s\\S]*?)\\$\\$/g, (match) => {
    return match.replace(/\\n/g, '__LATEX_NEWLINE__');
  });
  const lines = protectedText.split('\\n');`
);

c = c.replace(
  "function renderMathText(text: string): React.ReactNode {",
  `function renderMathText(text: string): React.ReactNode {
  text = text.replace(/__LATEX_NEWLINE__/g, '\\n');`
);

fs.writeFileSync(p, c);
