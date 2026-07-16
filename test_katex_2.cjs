const { chapters } = require('./src/data/chapters.ts');
const str = chapters[2].content;
const idx = str.indexOf('rac{x - x_1}');
console.log(str.charCodeAt(idx - 1), str.charCodeAt(idx));
