const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('test22_src.jsx', 'utf8');
const result = esbuild.transformSync(code, { loader: 'jsx' });
fs.writeFileSync('test22_compiled.cjs', `const React = { createElement: (type, props) => ({ props }) }; const Latex = 'Latex';\n` + result.code);
