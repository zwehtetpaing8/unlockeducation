const fs = require('fs');

let code = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace relative w-XX h-YY with responsive alternatives
code = code.replace(/<div className="relative w-64 h-32">/g, '<div className="relative w-full max-w-[256px] aspect-[256/128]">');
code = code.replace(/<div className="relative w-64 h-48">/g, '<div className="relative w-full max-w-[256px] aspect-[256/192]">');
code = code.replace(/<div className="relative w-72 h-40">/g, '<div className="relative w-full max-w-[288px] aspect-[288/160]">');
code = code.replace(/<div className="relative w-80 h-32">/g, '<div className="relative w-full max-w-[320px] aspect-[320/128]">');
code = code.replace(/<div className="relative w-80 h-36">/g, '<div className="relative w-full max-w-[320px] aspect-[320/144]">');

fs.writeFileSync('src/components/Latex.tsx', code);
console.log("Fixed other SVGs");
