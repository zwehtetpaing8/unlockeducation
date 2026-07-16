const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Replace form-feed + rac with \\frac
text = text.replace(/\x0Crac/g, '\\\\frac');

// Replace single backslash + frac with \\frac. 
// Note: if there is already a double backslash, we should skip it.
// We can use regex lookbehind, or just replace \\frac with \\\\frac if it's only one.
// Actually, `\frac` in JS string evaluates to `\\frac` for regex if we mean literal backslash.
text = text.replace(/(?<!\\)\\frac/g, '\\\\frac');

// Oh wait, also need to handle \n (newline)? No, \n in latex is \\\\, which is fine.
// What about \r, \t?
// LaTeX commands starting with these: \theta, \tau, \tan, \text (starts with \t -> tab)
// \right (\r -> carriage return)
// \cos (\c -> nothing special)
// \sin (\s -> nothing special)
// \log (\l -> nothing special)
// \neq (\n -> newline!)

text = text.replace(/\x09heta/g, '\\\\theta');
text = text.replace(/\x09an/g, '\\\\tan');
text = text.replace(/\x09au/g, '\\\\tau');
text = text.replace(/\x09ext/g, '\\\\text');
text = text.replace(/\x0Dight/g, '\\\\right');
text = text.replace(/\x0Aeq/g, '\\\\neq');

// Same for single backslash in source:
text = text.replace(/(?<!\\)\\theta/g, '\\\\theta');
text = text.replace(/(?<!\\)\\tan/g, '\\\\tan');
text = text.replace(/(?<!\\)\\tau/g, '\\\\tau');
text = text.replace(/(?<!\\)\\text/g, '\\\\text');
text = text.replace(/(?<!\\)\\right/g, '\\\\right');
text = text.replace(/(?<!\\)\\neq/g, '\\\\neq');
text = text.replace(/(?<!\\)\\nu/g, '\\\\nu');

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
