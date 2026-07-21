const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace all marker definitions for arrow-amber to have overflow="visible" and standard size
content = content.replace(/<marker id="(arrow-amber[^"]*)"([^>]*)>/g, (match, id, rest) => {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto" overflow="visible">`;
});

// While we're at it, let's do this for all markers to be safe, especially arrow-vector, arrow-axis etc.
// But let's just stick to arrow-amber first to solve the angle arrows.

fs.writeFileSync('src/components/Latex.tsx', content);
