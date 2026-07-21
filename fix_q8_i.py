import re

with open('src/components/Latex.tsx', 'r') as f:
    code = f.read()

def replace_between(start_str, end_str, replacement):
    global code
    start = code.find(start_str)
    end = code.find(end_str, start)
    if start != -1 and end != -1:
        code = code[:start] + replacement + code[end:]
    else:
        print("Could not find", start_str)

q8_i_rep = """export function Ex5_4_Q8_i_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex items-center gap-3">
        <div className="flex gap-2">
          {['C', 'C', 'C', 'C'].map((l, i) => (
            <div key={i} className="w-12 h-12 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold">
              {l}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center border-2 border-indigo-400 rounded overflow-hidden bg-indigo-50/50 dark:bg-indigo-900/20">
          <div className="px-4 py-1 border-b border-indigo-200 dark:border-indigo-800 font-bold text-indigo-800 dark:text-indigo-200 text-sm">Vowel Block</div>
          <div className="px-4 py-1 text-indigo-600 dark:text-indigo-400 font-mono text-xs">E, A, O</div>
        </div>
      </div>
    </div>
  );
}

"""

replace_between('export function Ex5_4_Q8_i_Diag() {', 'export function Ex5_4_Q8_iii_Diag() {', q8_i_rep)

with open('src/components/Latex.tsx', 'w') as f:
    f.write(code)
