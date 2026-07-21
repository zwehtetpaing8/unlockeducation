const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('test21_src.jsx', 'utf8');
const result = esbuild.transformSync(code, { loader: 'jsx' });
fs.writeFileSync('test21_compiled.cjs', `const React = { createElement: (type, props) => ({ props }) }; const Latex = 'Latex';\n` + result.code);
