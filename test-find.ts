import { chapters } from './src/data/chapters';

for (const chapter of chapters) {
  const lines = chapter.content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('$$') && (!line.endsWith('$$') || line === '$$')) {
       console.log("MATCH:", line);
    }
  }
}
