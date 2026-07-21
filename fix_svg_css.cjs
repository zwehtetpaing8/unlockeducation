const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* Ensure SVGs are responsive */
svg {
  max-width: 100%;
  height: auto;
}
`;

fs.writeFileSync('src/index.css', css);
