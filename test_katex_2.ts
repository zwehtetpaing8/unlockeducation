import { chapters } from './src/data/chapters';
const chap3 = chapters[2];
const lines = chap3.content.split('\n');
const line = lines.find(l => l.includes('3 + k') && l.includes('7}{2}'));
console.log('LINE:', line);
console.log('CHARS:', [...line].map(c => c.charCodeAt(0)));
