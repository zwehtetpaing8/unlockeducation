const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const propsReplacement = `interface ChapterDetailsProps {
  chapter: Chapter;
  onNavigateHome?: () => void;
  onSelectChapter?: (id: number) => void;
  isCompleted?: boolean;
  onToggleComplete?: (id: number, completed: boolean) => void;
}`;

content = content.replace('interface ChapterDetailsProps {', 'REPLACEME');
content = content.replace(/REPLACEME[\s\S]*?\}/, propsReplacement);

const signatureRegex = /export default function ChapterDetails\(\{[\s\S]*?\}\: ChapterDetailsProps\) \{/;
const signatureReplacement = `export default function ChapterDetails({
  chapter,
  onNavigateHome,
  onSelectChapter,
  isCompleted = false,
  onToggleComplete,
}: ChapterDetailsProps) {`;

content = content.replace(signatureRegex, signatureReplacement);

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
