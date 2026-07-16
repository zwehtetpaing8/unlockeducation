import { chapters } from './src/data/chapters';
const chapter = chapters[2]; // Chapter 3
const lines = chapter.content.split('\n');
console.log(lines.find(l => l.includes("9}{2")));
