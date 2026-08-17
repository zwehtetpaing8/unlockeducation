import re

with open('src/data/chapter4_content.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target = r"""<div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 my-6">\n  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Note: Choosing the Form of a Plane Equation</h3>\n  <ol className="list-decimal pl-5 space-y-4 text-slate-700 dark:text-slate-300">\n    <li>\n      Plane ပေါ်ရှိ အမှတ်တစ်ခု၏ position vector $\\vec{a}$ နှင့် အချင်းချင်း parallel မဖြစ်သော direction vectors $\\vec{d}_1, \\vec{d}_2$ တို့ကို ပေးထားလျှင်\n      $$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2 $$\n      ကို သုံးနိုင်သည်။\n    </li>\n    <li>\n      Plane ပေါ်ရှိ အမှတ်တစ်ခု၏ position vector $\\vec{a}$ နှင့် normal vector $\\vec{n}$ ကို ပေးထားလျှင်\n      $$ \\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n} $$\n      ကို သုံးနိုင်သည်။\n    </li>\n    <li>\n      Normal vector ၏ components $a, b, c$ နှင့် plane ပေါ်ရှိ အမှတ် $(x_0, y_0, z_0)$ ကို ပေးထားလျှင်\n      $$ ax + by + cz = d, \\quad d = ax_0 + by_0 + cz_0 $$\n      ဖြစ်သော Cartesian form ကို သုံးနိုင်သည်။\n    </li>\n  </ol>\n</div>"""

replacement = r"""> **Note: Choosing the Form of a Plane Equation**\n> 1. Plane ပေါ်ရှိ အမှတ်တစ်ခု၏ position vector $\\vec{a}$ နှင့် အချင်းချင်း parallel မဖြစ်သော direction vectors $\\vec{d}_1, \\vec{d}_2$ တို့ကို ပေးထားလျှင်\n>    $$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2 $$\n>    ကို သုံးနိုင်သည်။\n> 2. Plane ပေါ်ရှိ အမှတ်တစ်ခု၏ position vector $\\vec{a}$ နှင့် normal vector $\\vec{n}$ ကို ပေးထားလျှင်\n>    $$ \\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n} $$\n>    ကို သုံးနိုင်သည်။\n> 3. Normal vector ၏ components $a, b, c$ နှင့် plane ပေါ်ရှိ အမှတ် $(x_0, y_0, z_0)$ ကို ပေးထားလျှင်\n>    $$ ax + by + cz = d, \\quad d = ax_0 + by_0 + cz_0 $$\n>    ဖြစ်သော Cartesian form ကို သုံးနိုင်သည်။"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/data/chapter4_content.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Target not found. Doing a softer regex replace.")
    content = re.sub(r'<div className="bg-white.*?</div>', replacement, content, flags=re.DOTALL)
    with open('src/data/chapter4_content.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Regex replace attempted.")

