const textObj = <Latex text="$\overrightarrow{AC}$" />;
const text = textObj.props.text;
const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
const match = regex.exec(text);
console.log(JSON.stringify(match[4]));
