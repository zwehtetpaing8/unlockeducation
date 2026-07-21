const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace all marker definitions to have overflow="visible" 
// We will just add overflow="visible" if it doesn't exist
content = content.replace(/<marker([^>]*)>/g, (match, attrs) => {
    if (!attrs.includes('overflow=')) {
        return `<marker${attrs} overflow="visible">`;
    }
    return match;
});

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Added overflow=visible to all markers!");
