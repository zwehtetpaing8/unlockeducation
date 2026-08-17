const fs = require('fs');
const content = fs.readFileSync('src/components/Latex.tsx', 'utf-8');
if(content.includes('Chap4_4_4_Ex18_Diag')) {
  console.log("Component successfully inserted.");
}
