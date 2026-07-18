const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<ChapterDetails \s*\n\s*chapter=\{selectedChapter\} \s*\n\s*onNavigateHome=\{\(\) => setActiveView\('home'\)\}\s*\n\s*onSelectChapter=\{\(id\) => setSelectedChapterId\(id\)\}\s*\n\s*\/>/;

const replacement = `<ChapterDetails 
                  chapter={selectedChapter}
                  onNavigateHome={() => setActiveView('home')}
                  onSelectChapter={(id) => {
                    setSelectedChapterId(id);
                    setActiveView('syllabus');
                  }}
                  isCompleted={completedChapters.includes(selectedChapterId)}
                  onToggleComplete={handleToggleComplete}
                />`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', content);
