const { transformSync } = require('@babel/core');
const code = 'const a = <Latex text="$\\overrightarrow{AC}$" />';
const res = transformSync(code, { presets: ['@babel/preset-react'] });
console.log(res.code);
