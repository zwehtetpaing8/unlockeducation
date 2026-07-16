import { chapters } from './src/data/chapters';

for (let i = 0; i < chapters.length; i++) {
  const chapter = chapters[i];
  console.log("Chapter index", i, "id:", JSON.stringify(chapter.id));
  const lines = chapter.content.split('\n');
  for (let j = 0; j < lines.length; j++) {
    if (lines[j].includes('9/2')) {
      console.log("RAW LINE", j, ":", JSON.stringify(lines[j]));
    }
  }
}
