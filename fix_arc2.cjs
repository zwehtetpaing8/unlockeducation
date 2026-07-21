const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newCode = `        {/* Angle arc */}
        <path d="M 59.2 192.2 A 40 40 0 0 0 44.9 168.6" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
        <polygon points="43.3,167.5 49.9,168.6 46.4,173.4" fill="#ca8a04" />
        <text x="56" y="172" fontSize="14" fill="#ca8a04" className="font-serif font-italic">θ</text>`;

content = content.replace(/\{\/\* Angle arc \*\/\}\s*<path d="M 60 192 A 40 40 0 0 0 45 152" fill="none" stroke="#ca8a04" strokeWidth="1.5" \/>\s*<polygon points="45,152 48,158 52,154" fill="#ca8a04" \/>\s*<text x="65" y="175"[^>]*>θ<\/text>/g, newCode);

fs.writeFileSync('src/components/Latex.tsx', content);
