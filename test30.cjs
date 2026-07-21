const text = "$\\overrightarrow{AC}$"; // this is what the browser sees (one backslash)
const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
let match = regex.exec(text);
console.log("match[4]:", match[4]);
console.log("match[4] raw chars:", Array.from(match[4]).map(c => c === '\\' ? 'SLASH' : c).join(' '));
