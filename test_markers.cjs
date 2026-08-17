const fs = require('fs');
const content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const match18 = content.match(/<marker id="arrow-amber-ex18".*?<\/marker>/s);
const match21 = content.match(/<marker id="arrow-amber-ex21".*?<\/marker>/s);
console.log("Ex18:", match18 ? match18[0] : "Not found");
console.log("Ex21:", match21 ? match21[0] : "Not found");
