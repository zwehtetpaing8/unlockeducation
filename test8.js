import { parse } from 'acorn';
import jsx from 'acorn-jsx';
const parser = parse.extend(jsx());
const ast = parser.parse('<Latex text="$\\\\overrightarrow{AC}$" />', { ecmaVersion: 2020 });
console.log(ast.body[0].expression.openingElement.attributes[0].value.value);
