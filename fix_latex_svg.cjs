const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// We want to replace <Latex text="XXX" /> with <Latex text="$XXX$" />
// but ONLY if XXX does not contain '$' and it is inside our foreignObjects.
text = text.replace(/<Latex text="([^$"]+)" \/>/g, (match, p1) => {
  // if it's already got $, ignore
  if (p1.includes('$')) return match;
  // some might be just text, let's see. The ones we want to wrap usually have \ or math.
  // Actually, all these ones are math formulas! 
  // Let's just wrap it.
  return `<Latex text="$${p1}$" />`;
});

fs.writeFileSync('src/components/Latex.tsx', text);
console.log('done');
