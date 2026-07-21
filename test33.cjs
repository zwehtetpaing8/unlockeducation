const esbuild = require('esbuild');
const code = "const str = `$\\\\overrightarrow{AB}`";
const res = esbuild.transformSync(code, { loader: 'ts' });
console.log(res.code);
