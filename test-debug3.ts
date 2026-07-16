import { chapters } from './src/data/chapters';
const chapter = chapters.find(c => c.id === "c3");
const lines = chapter.content.split('\n');
console.log("LINE 2363 in content:");
console.log(lines.find(l => l.includes("9}{2")));
