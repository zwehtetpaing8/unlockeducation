const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<ChapterDetails \n\s*chapter=\{selectedChapter\}\n\s*onNavigateHome=\{.*\}\n\s*onSelectChapter=\{.*\}\n\s*\/>/;

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
