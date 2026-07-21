const React = { createElement: (type, props) => ({ props }) }; const Latex = 'Latex';
const katex = require("katex");
const textObj = /* @__PURE__ */ React.createElement(Latex, { text: "$\\overrightarrow{AC}$" });
const text = textObj.props.text;
const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
const match = regex.exec(text);
try {
  console.log(katex.renderToString(match[4]));
} catch (e) {
  console.log("ERROR", e.message);
}
