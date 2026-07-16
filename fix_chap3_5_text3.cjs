const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(
  '[DIAGRAM:SpherePlaneTangentDiagram]',
  '[DIAGRAM:Chap3_5_Ex11_Sphere]'
);

text = text.replace(
  '    $$5x + y + z = 15$$**\n\n###### **Example 12**',
  '    $$5x + y + z = 15$$**\n\n[DIAGRAM:Chap3_5_Q4_Sphere]\n\n###### **Example 12**'
);

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
