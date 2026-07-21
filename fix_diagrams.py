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

q6_1_rep = """export function Ex5_4_Q6_iv_Diag_1() {
  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex gap-4 items-center">
        <div className="flex gap-2">
          {['C', 'C', 'C', 'V'].map((l, i) => (
            <div key={i} className={`w-10 h-10 flex items-center justify-center border ${l === 'V' ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'} rounded font-bold`}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"""

q6_2_rep = """export function Ex5_4_Q6_iv_Diag_2() {
  const layouts = [
    ['V', 'C', 'C', 'C'],
    ['C', 'V', 'C', 'C'],
    ['C', 'C', 'V', 'C'],
    ['C', 'C', 'C', 'V'],
  ];

  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex flex-col gap-3">
        {layouts.map((layout, idx) => (
          <div key={idx} className="flex gap-2">
            {layout.map((l, i) => (
              <div key={i} className={`w-10 h-10 flex items-center justify-center border ${l === 'V' ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'} rounded font-bold`}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

"""

q7_i_rep = """export function Ex5_4_Q7_i_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex items-center gap-3">
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Brother 1</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Brother 2</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">Brother 3</div>
        </div>
        <div className="flex flex-col items-center border-2 border-indigo-400 rounded overflow-hidden bg-indigo-50/50 dark:bg-indigo-900/20">
          <div className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-800 font-bold text-indigo-800 dark:text-indigo-200">Sisters Block</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm">S1, S2, S3</div>
        </div>
      </div>
    </div>
  );
}

"""

q7_ii_rep = """export function Ex5_4_Q7_ii_Diag() {
  const layouts = [
    ['B', 'S', 'B', 'S', 'B', 'S'],
    ['S', 'B', 'S', 'B', 'S', 'B'],
  ];

  return (
    <div className="my-6 w-full overflow-x-auto pb-4">
      <div className="w-max mx-auto flex flex-col gap-3">
        {layouts.map((layout, idx) => (
          <div key={idx} className="flex gap-2">
            {layout.map((l, i) => (
              <div key={i} className={`w-10 h-10 flex items-center justify-center border ${l === 'B' ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'border-pink-300 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400'} rounded font-bold`}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

"""

replace_between('export function Ex5_4_Q6_iv_Diag_1() {', 'export function Ex5_4_Q6_iv_Diag_2() {', q6_1_rep)
replace_between('export function Ex5_4_Q6_iv_Diag_2() {', 'export function Ex5_4_Q7_i_Diag() {', q6_2_rep)
replace_between('export function Ex5_4_Q7_i_Diag() {', 'export function Ex5_4_Q7_ii_Diag() {', q7_i_rep)
replace_between('export function Ex5_4_Q7_ii_Diag() {', 'export function Ex5_4_Q8_i_Diag() {', q7_ii_rep)

with open('src/components/Latex.tsx', 'w') as f:
    f.write(code)
