const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// The first one is Chapter 1, restore it
content = content.replace('title: "Complex Numbers",\n    tagline: "Extending the real number system to solve equations with negative roots.",\n    description: "In this chapter, you will learn about the imaginary unit $i = \\\\sqrt{-1}$, Cartesian and coordinate forms, division rules, trigonometric (polar) representation, De Moivre\'s formula, and finding complex roots.",\n    content: `### Introduction', 'title: "Complex Numbers",\n    tagline: "Extending the real number system to solve equations with negative roots.",\n    description: "In this chapter, you will learn about the imaginary unit $i = \\\\sqrt{-1}$, Cartesian and coordinate forms, division rules, trigonometric (polar) representation, De Moivre\'s formula, and finding complex roots.",\n    content: `### Introduction: Why do we need complex numbers?');

fs.writeFileSync('src/data/chapters.ts', content);
