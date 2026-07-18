const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('unlock_edu_completedChapters')) {
  // Add state
  const stateRegex = /const \[sidebarSearch, setSidebarSearch\] = useState<string>\(''\);/;
  const stateReplacement = `const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    const saved = localStorage.getItem('unlock_edu_completedChapters');
    return saved ? JSON.parse(saved) : [];
  });
  const [sidebarSearch, setSidebarSearch] = useState<string>('');`;
  
  content = content.replace(stateRegex, stateReplacement);
}

const toggleFunction = `
  const handleToggleComplete = (id: number, completed: boolean) => {
    setCompletedChapters(prev => {
      let updated;
      if (completed) {
        updated = prev.includes(id) ? prev : [...prev, id];
      } else {
        updated = prev.filter(c => c !== id);
      }
      localStorage.setItem('unlock_edu_completedChapters', JSON.stringify(updated));
      return updated;
    });
  };
`;

if (!content.includes('handleToggleComplete')) {
  content = content.replace('const copyEmail = () => {', toggleFunction + '\n  const copyEmail = () => {');
}

fs.writeFileSync('src/App.tsx', content);
