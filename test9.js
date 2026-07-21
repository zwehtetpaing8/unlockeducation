import { parse } from '@babel/parser';
const ast = parse('const a = <Latex text="\\\\overrightarrow{AC}" />', { plugins: ['jsx'] });
console.log(ast.program.body[0].declarations[0].init.openingElement.attributes[0].value.value);
