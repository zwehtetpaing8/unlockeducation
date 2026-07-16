import { chapters } from './src/data/chapters';
const chapter = chapters[2]; // Chapter 3
const lines = chapter.content.split('\n');
const line = lines.find(l => l.includes("9}{2"));
console.log(line);
for (let i = 0; i < line.length; i++) {
  console.log(line[i], line.charCodeAt(i));
}
