const fs = require('fs');

const content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const targetStr = `      {/* Chapter Navigation Tabs menu */}`;
const replaceStr = `      {![1, 2, 3, 5].includes(chapter.id) ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 text-center animate-pulse">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 tracking-tight">Coming Soon</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            We are currently preparing the interactive content, visualizers, and exercises for <strong className="font-semibold text-slate-700 dark:text-slate-300">{chapter.title}</strong>. Please check back later!
          </p>
        </div>
      ) : (
        <>
      {/* Chapter Navigation Tabs menu */}`;

const targetEndStr = `    </div>
  );
}`;
const replaceEndStr = `        </>
      )}
    </div>
  );
}`;

let newContent = content.replace(targetStr, replaceStr);
// We need to find the last </div>\n  );\n}
const lastIndex = newContent.lastIndexOf(`    </div>\n  );\n}`);
if (lastIndex !== -1) {
  newContent = newContent.substring(0, lastIndex) + replaceEndStr + newContent.substring(lastIndex + targetEndStr.length);
  fs.writeFileSync('src/components/ChapterDetails.tsx', newContent, 'utf8');
  console.log("Success");
} else {
  console.log("Failed to find end str");
}
