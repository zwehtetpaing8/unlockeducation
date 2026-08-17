import fs from 'fs';
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

let errors = [];

// check if there's any single $ at the end of a line where it shouldn't be
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith('$$') || l.startsWith('> $$')) {
        if (l.endsWith('$') && !l.endsWith('$$')) {
            errors.push(`Line ${i+1}: ${l}`);
        }
    }
}
console.log(errors);
