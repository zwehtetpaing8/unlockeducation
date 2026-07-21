const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('test45_src.jsx', 'utf8');
const res = esbuild.transformSync(code, { loader: 'jsx' });
console.log(res.code);
