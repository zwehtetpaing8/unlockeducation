import katex from 'katex';
const formula = String.raw`\frac{7}{2} = 3 + k \qquad 2 = -1 + 6k`;
console.log('CHARS:', [...formula].map(c => c.charCodeAt(0)));
try {
  katex.renderToString(formula, { throwOnError: true });
  console.log('SUCCESS');
} catch (e) {
  console.log('ERROR:', e.message);
}
