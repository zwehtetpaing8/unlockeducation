const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('test20_src.jsx', 'utf8');
const result = esbuild.transformSync(code, { loader: 'jsx' });
fs.writeFileSync('test20_compiled.js', `const React = { createElement: (type, props) => ({ props }) }; const Latex = 'Latex';\n` + result.code);
