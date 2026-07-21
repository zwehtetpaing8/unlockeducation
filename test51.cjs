const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const res = esbuild.transformSync(code, { loader: 'ts' });
fs.writeFileSync('test51_compiled.cjs', res.code + '\nconsole.log(chapter4Content.substring(chapter4Content.indexOf("parallel That is,") + 18, chapter4Content.indexOf("parallel That is,") + 100));\n');
