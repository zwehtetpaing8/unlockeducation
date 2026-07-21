const babel = require('@babel/core');
const fs = require('fs');
const code = fs.readFileSync('test_jsx3.js', 'utf8');
const result = babel.transformSync(code, {
  presets: ['@babel/preset-react']
});
console.log(result.code);
