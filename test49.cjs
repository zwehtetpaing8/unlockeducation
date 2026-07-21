const esbuild = require('esbuild');
const code = 'const a = <Latex text="$\\overrightarrow{AC}$" />';
const res = esbuild.transformSync(code, { loader: 'jsx' });
console.log(res.code);
