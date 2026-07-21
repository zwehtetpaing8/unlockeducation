const babel = require('@babel/core');
const code = 'const a = <Latex text="$\\overrightarrow{AC}$" />';
const result = babel.transformSync(code, {
  presets: ['@babel/preset-react']
});
console.log(result.code);
