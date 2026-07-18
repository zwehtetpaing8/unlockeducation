const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

// Replace {viewMode === "full" ? ( with <div className={`space-y-6 ${viewMode === "full" ? "block" : "hidden print:block"}`}>
content = content.replace(
  '{viewMode === "full" ? (\n                      <div className="space-y-6">',
  '                    <div className={`space-y-6 ${viewMode === "full" ? "block" : "hidden print:block"}`}>'
);

// Replace ) : ( with </div><div className={`bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6 ${viewMode === "sections" ? "block print:hidden" : "hidden"}`}>
content = content.replace(
  '                      </div>\n                    ) : (\n                      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6">',
  '                    </div>\n                    <div className={`bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-6 ${viewMode === "sections" ? "block print:hidden" : "hidden"}`}>'
);

// Replace final )} with </div>
// But we need to be careful with the last )}
// It is around line 718.
const parts = content.split('                        </div>\n                      </div>\n                    )}');
if(parts.length === 2) {
  content = parts[0] + '                        </div>\n                      </div>\n                    </div>' + parts[1];
} else {
  console.log("Could not find the end of viewMode toggle", parts.length);
}

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
