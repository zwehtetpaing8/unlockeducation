const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// But wait, the file itself is a JS string. If I look at the source of chapter4_content.ts:
// export const chapter4Content = `...`;
// If the file on disk literally has `\hat`, then when TS compiles it, it becomes `hat`.
// So I should replace `\` with `\\` inside the template string.
// Let's replace all `\` with `\\` except if it's already `\\`.
// Wait, actually I can just do a search and replace for all single `\` to `\\`.

// To avoid double-escaping if some are already escaped, let's just read and replace.
let rawContent = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
// Extract the inner content
const match = rawContent.match(/export const chapter4Content = `([\s\S]*)`;/);
if (match) {
    let text = match[1];
    // Replace all backslashes with double backslashes
    text = text.replace(/\\/g, '\\\\');
    // Save back
    fs.writeFileSync('src/data/chapter4_content.ts', 'export const chapter4Content = `\n' + text + '\n`;\n');
    console.log("Fixed backslashes");
} else {
    console.log("Could not parse");
}
