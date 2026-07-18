const { chapters } = require('./temp/data/chapters.js');
console.log("CHAP 1", JSON.stringify(chapters[0].content.substring(0, 50)));
console.log("CHAP 4", JSON.stringify(chapters[3].content.substring(0, 50)));
