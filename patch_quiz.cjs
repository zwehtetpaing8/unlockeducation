const fs = require('fs');
let content = fs.readFileSync('src/components/PracticeQuiz.tsx', 'utf8');

const regexProps = /interface PracticeQuizProps \{\s*chapterId: number;\s*questions: Question\[\];\s*chapterTitle: string;\s*\}/;
const replacementProps = `interface PracticeQuizProps {
  chapterId: number;
  questions: Question[];
  chapterTitle: string;
  chapterContent: string;
}`;

content = content.replace(regexProps, replacementProps);

fs.writeFileSync('src/components/PracticeQuiz.tsx', content);
