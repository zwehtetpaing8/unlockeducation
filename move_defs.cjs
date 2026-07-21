const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// The regex matches <svg ...> followed by some stuff, then <defs>...</defs>, then </svg>
// But <svg> can have multiple lines.
// It's easier to just do it per function or using a generic regex.
// Let's replace the whole svg block:
content = content.replace(/(<svg[^>]*>)([\s\S]*?)(<defs>[\s\S]*?<\/defs>)([\s\S]*?)(<\/svg>)/g, (match, svgStart, beforeDefs, defsBlock, afterDefs, svgEnd) => {
    return svgStart + '\n' + defsBlock + beforeDefs + afterDefs + svgEnd;
});

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Moved defs!");
