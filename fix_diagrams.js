const fs = require('fs');
let code = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace Ex5_4_Q6_iv_Diag_1
const q6_1_start = code.indexOf('export function Ex5_4_Q6_iv_Diag_1() {');
const q6_1_end = code.indexOf('export function Ex5_4_Q6_iv_Diag_2() {');
if (q6_1_start !== -1 && q6_1_end !== -1) {
  code = code.substring(0, q6_1_start) + `export function Ex5_4_Q6_iv_Diag_1() {
  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex gap-4 items-center">
        <div className="flex gap-2">
          {['C', 'C', 'C', 'V'].map((l, i) => (
            <div key={i} className={\`w-10 h-10 flex items-center justify-center border \${l === 'V' ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'} rounded font-bold\`}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

` + code.substring(q6_1_end);
}

const fs2 = require('fs');
fs2.writeFileSync('src/components/Latex.tsx', code);
