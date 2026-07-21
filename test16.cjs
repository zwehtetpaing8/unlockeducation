const babel = require('@babel/core');
const code1 = 'const a = <Latex text="$\\overrightarrow{AC}$" />'; // one backslash
const code2 = 'const a = <Latex text="$\\\\overrightarrow{AC}$" />'; // two backslashes
const res1 = babel.transformSync(code1, { presets: ['@babel/preset-react'] });
const res2 = babel.transformSync(code2, { presets: ['@babel/preset-react'] });
console.log("code1:", res1.code);
console.log("code2:", res2.code);
