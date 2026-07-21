const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');

// I will evaluate a small part of the bundle to see what a string evaluates to.
const match = code.match(/`([^`]*?\\parallel[^`]*?)`/);
if (match) {
  // we found the template literal in the bundle!
  const evaluated = eval("`" + match[1] + "`");
  console.log("EVALUATED STRING:");
  console.log(evaluated.substring(evaluated.indexOf('collinear'), evaluated.indexOf('collinear') + 200));
}
