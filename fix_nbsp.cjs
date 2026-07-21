const fs = require('fs');

const files = ['src/data/chapter4_content.ts', 'src/data/chapter5_content.ts'];
for (const file of files) {
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/&nbsp;&nbsp;&nbsp;/g, '\\u2003\\u2003');
    text = text.replace(/&nbsp;/g, '\\u00A0');
    fs.writeFileSync(file, text);
}
