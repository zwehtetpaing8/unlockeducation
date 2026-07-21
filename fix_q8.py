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

q8_iii_rep = """export function Ex5_4_Q8_iii_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex gap-2">
        {['C', 'V', 'C', 'V', 'C', 'V', 'C'].map((l, i) => (
          <div key={i} className={`w-10 h-10 flex items-center justify-center border ${l === 'V' ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'} rounded font-bold`}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

"""

replace_between('export function Ex5_4_Q8_iii_Diag() {', 'export function Ex5_4_Q9_Diag() {', q8_iii_rep)

with open('src/components/Latex.tsx', 'w') as f:
    f.write(code)
