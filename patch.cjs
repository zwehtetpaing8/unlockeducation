const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Add Maximize, Minimize to imports
  content = content.replace('X,\n} from "lucide-react";', 'X,\n  Maximize,\n  Minimize,\n} from "lucide-react";');
  
  // Add to props
  content = content.replace('onToggleComplete?: (id: number, completed: boolean) => void;\n}', 'onToggleComplete?: (id: number, completed: boolean) => void;\n  isReadingMode?: boolean;\n  onToggleReadingMode?: () => void;\n}');
  
  // Add the button
  const buttonHtml = `          </div>
          
          <div className="flex shrink-0">
            {onToggleReadingMode && (
              <button
                onClick={onToggleReadingMode}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700/50 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
              >
                {isReadingMode ? (
                  <>
                    <Minimize className="w-4 h-4" />
                    <span>Exit Reading Mode</span>
                  </>
                ) : (
                  <>
                    <Maximize className="w-4 h-4" />
                    <span>Reading Mode</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>`;
  
  content = content.replace(/<div className="text-xs md:text-sm text-slate-300\/95 max-w-2xl leading-relaxed italic">\s*<Latex text=\{chapter\.tagline\} \/>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, 
  `<div className="text-xs md:text-sm text-slate-300/95 max-w-2xl leading-relaxed italic">
              <Latex text={chapter.tagline} />
            </div>\n` + buttonHtml);

  fs.writeFileSync(file, content);
}

fixFile('src/components/ChapterDetails.tsx');
