const katex = require('katex');
const textObj = <Latex text="$\overrightarrow{AC}$" />;
const text = textObj.props.text;
const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
const match = regex.exec(text);
try {
  console.log(katex.renderToString(match[4]));
} catch(e) {
  console.log("ERROR", e.message);
}
