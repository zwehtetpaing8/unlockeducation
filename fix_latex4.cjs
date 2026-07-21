const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

text = text.replace(/<Latex text="\$(\\\\|\\\\\\\\)([a-zA-Z]+)(.*)\$" \/>/g, (match, p1, p2, p3) => {
  return '<Latex text="$\\' + p2 + p3 + '$" />';
});

fs.writeFileSync('src/components/Latex.tsx', text);
