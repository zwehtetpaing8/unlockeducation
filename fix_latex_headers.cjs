const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

if (!content.includes('function slugify')) {
  // Add slugify helper at top
  content = content.replace('export default function Latex', 
`function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function Latex`);
}

// Replace headers to add IDs
content = content.replace(
  /<h6 key=\{`h6-\$\{i\}`\}/g,
  '<h6 key={`h6-${i}`} id={slugify(line.slice(7))}'
).replace(
  /<h5 key=\{`h5-\$\{i\}`\}/g,
  '<h5 key={`h5-${i}`} id={slugify(line.slice(6))}'
).replace(
  /<h4 key=\{`h4-\$\{i\}`\}/g,
  '<h4 key={`h4-${i}`} id={slugify(line.slice(5))}'
).replace(
  /<h3 key=\{`h3-\$\{i\}`\}/g,
  '<h3 key={`h3-${i}`} id={slugify(line.slice(4))}'
).replace(
  /<h2 key=\{`h2-\$\{i\}`\}/g,
  '<h2 key={`h2-${i}`} id={slugify(line.slice(3))}'
).replace(
  /<h1 key=\{`h1-\$\{i\}`\}/g,
  '<h1 key={`h1-${i}`} id={slugify(line.slice(2))}'
);

fs.writeFileSync('src/components/Latex.tsx', content);
