const babel = require('@babel/core');
const code = `
  const regex = /(\\$\\$(.*?)\\$\\$)|(\\$(.*?)\\$)/g;
  const match = regex.exec(text);
  console.log(match[4]);
`;
const fullCode = `const text = <Latex text="$\\overrightarrow{AC}$" />;` + code;
console.log(fullCode);
