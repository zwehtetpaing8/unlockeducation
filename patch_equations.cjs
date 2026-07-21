const fs = require('fs');

let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// The issue was backslashes being parsed by JS template strings / string literals, and the actual content having double backslashes.

content = content.replace(/\(a\) \$(3\\\\vec\{a\}.*)\$/g, '(a) $$ $1 $$');
content = content.replace(/\(b\) \$(4\\\\vec\{b\}.*)\$/g, '(b) $$ $1 $$');
content = content.replace(/\(c\) \$(\\\\vec\{a\} - \\\\vec\{b\}.*)\$/g, '(c) $$ $1 $$');
content = content.replace(/\(d\) \$(\\\\vec\{b\} \+ \\\\vec\{c\}.*)\$/g, '(d) $$ $1 $$');
content = content.replace(/\(e\) \$(2\\\\vec\{b\} \+ \\\\vec\{c\}.*)\$/g, '(e) $$ $1 $$');
content = content.replace(/\(f\) \$(\\\\vec\{a\} - 2\\\\vec\{b\}.*)\$/g, '(f) $$ $1 $$');
content = content.replace(/\(g\) \$(\\\\vec\{a\} \+ \\\\vec\{b\} - 2\\\\vec\{c\}.*)\$/g, '(g) $$ $1 $$');
content = content.replace(/\(h\) \$(3\\\\vec\{a\} - \\\\vec\{b\} \+ \\\\vec\{c\}.*)\$/g, '(h) $$ $1 $$');

fs.writeFileSync('src/data/chapter4_content.ts', content);
