const esbuild = require('esbuild');
const fs = require('fs');
const code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const res = esbuild.transformSync(code, { loader: 'ts', format: 'cjs' });
fs.writeFileSync('test52_compiled.cjs', res.code + '\nconsole.log(chapter4Content.substring(chapter4Content.indexOf("collinear if the vectors") + 25, chapter4Content.indexOf("collinear if the vectors") + 60));\n');
