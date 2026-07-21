const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('test17_src.jsx', 'utf8');
const result = esbuild.transformSync(code, { loader: 'jsx' });
console.log(result.code);
