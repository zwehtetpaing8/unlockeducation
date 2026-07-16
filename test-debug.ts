import { chapters } from './src/data/chapters';

const chapter = chapters.find(c => c.id === 3);
const lines = chapter.content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('9/2')) {
    console.log("RAW LINE", i, ":", JSON.stringify(lines[i]));
    console.log("TRIMMED:", JSON.stringify(lines[i].trim()));
  }
}
