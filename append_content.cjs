const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.trim();

const newContent = "\n\n> **စဉ်းစားပုံ (Method 2: Vector Equation Method)**\n" +
"> 1. $\\overrightarrow{AB}$ နှင့် $\\overrightarrow{AC}$ တို့သည် parallel မဖြစ်သောကြောင့် $A, B, C$ တို့က unique plane တစ်ခုကို သတ်မှတ်ပေးသည်။\n" +
"> 2. $A$ ကို fixed point အဖြစ်ရွေးပြီး $\\vec{a} = \\overrightarrow{OA}$, $\\vec{d}_1 = \\overrightarrow{AB}$ နှင့် $\\vec{d}_2 = \\overrightarrow{AC}$ ဟုထားကာ \n" +
">    $$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2 $$\n" +
">    ကို ရေးပါ။\n" +
"> 3. $D$ သည် ထို plane ပေါ်တွင်ရှိလျှင် $\\vec{r} = \\overrightarrow{OD}$ ဖြစ်ရမည်။ ထို့ကြောင့် $\\overrightarrow{OD}$ ကို vector equation တွင် အစားထိုး၍ corresponding components များကို ညီမျှပါ။ ညီမျှခြင်းအားလုံးကို ပြေလည်စေသော $t_1, t_2$ တန်ဖိုးများရှိလျှင် $D$ သည် plane ပေါ်တွင်ရှိပြီး၊ မရှိလျှင် plane ပေါ်တွင် မရှိပါ။\n\n" +
"**Method 2: Vector Equation Method**\n\n" +
"Since $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are not parallel, the points $A, B$ and $C$ determine a unique plane. Let\n" +
"$$ \\vec{a} = \\overrightarrow{OA} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 4 \\end{pmatrix}, \\quad \\vec{d}_1 = \\overrightarrow{AB} = \\begin{pmatrix} -1 \\\\ 2 \\\\ -3 \\end{pmatrix}, \\quad \\vec{d}_2 = \\overrightarrow{AC} = \\begin{pmatrix} 1 \\\\ 4 \\\\ -3 \\end{pmatrix}. $$\n\n" +
"Therefore, the vector equation of the plane containing $A, B$ and $C$ is\n" +
"$$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2, $$\n" +
"that is,\n" +
"$$ \\vec{r} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 4 \\end{pmatrix} + t_1 \\begin{pmatrix} -1 \\\\ 2 \\\\ -3 \\end{pmatrix} + t_2 \\begin{pmatrix} 1 \\\\ 4 \\\\ -3 \\end{pmatrix}, \\quad t_1, t_2 \\in \\mathbb{R}. $$\n\n" +
"If $D$ lies on this plane, then\n" +
"$$ \\vec{r} = \\overrightarrow{OD} = \\begin{pmatrix} -3 \\\\ 1 \\\\ 4 \\end{pmatrix}. $$\n\n" +
"Therefore,\n" +
"$$ \\begin{pmatrix} -3 \\\\ 1 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 4 \\end{pmatrix} + t_1 \\begin{pmatrix} -1 \\\\ 2 \\\\ -3 \\end{pmatrix} + t_2 \\begin{pmatrix} 1 \\\\ 4 \\\\ -3 \\end{pmatrix}. $$\n\n" +
"Equating the corresponding components gives\n" +
"$$ -3 = 3 - t_1 + t_2, $$\n" +
"$$ -t_1 + t_2 = -6, \\quad (1) $$\n" +
"$$ 1 = -1 + 2t_1 + 4t_2, $$\n" +
"$$ 2t_1 + 4t_2 = 2, \\quad (2) $$\n" +
"$$ 4 = 4 - 3t_1 - 3t_2, $$\n" +
"$$ t_1 + t_2 = 0. \\quad (3) $$\n\n" +
"Adding equations (1) and (3) gives\n" +
"$$ 2t_2 = -6, \\quad t_2 = -3. $$\n\n" +
"Hence,\n" +
"$$ t_1 = 3. $$\n\n" +
"Substituting $t_1 = 3$ and $t_2 = -3$ into equation (2),\n" +
"$$ 2(3) + 4(-3) = -6 \\neq 2. $$\n\n" +
"Thus, equation (2) is not satisfied.\n" +
"Hence, there are no values of $t_1$ and $t_2$ that satisfy all three equations.\n" +
"Therefore, $D$ does not lie on the plane containing $A, B$ and $C$.\n" +
"Thus, the points $A, B, C$ and $D$ do not lie in the same plane.\n\n" +
"###### Example 21\n" +
"Find a vector equation of the plane containing the line\n" +
"$$ \\vec{r} = \\begin{pmatrix} -2 \\\\ 1 \\\\ 2 \\end{pmatrix} + t \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad t \\in \\mathbb{R}, $$\n" +
"and the point $A(3, -1, 2)$.\n\n" +
"[DIAGRAM:Chap4_4_4_Ex21_Diag]\n\n" +
"> **စဉ်းစားပုံ**\n" +
"> 1. $A$ ကို fixed point အဖြစ်ရွေးပြီး \n" +
">    $$ \\vec{a} = \\overrightarrow{OA} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 2 \\end{pmatrix} $$\n" +
">    ဟုထားပါ။\n" +
"> 2. ပေးထားသော မျဉ်း၏ vector equation တွင် ပထမ vector သည် မျဉ်းပေါ်ရှိ အမှတ်တစ်ခု၏ position vector ဖြစ်သည်။ ထိုအမှတ်ကို $B$ ဟုထားလျှင် \n" +
">    $$ \\overrightarrow{OB} = \\begin{pmatrix} -2 \\\\ 1 \\\\ 2 \\end{pmatrix} $$\n" +
">    ဖြစ်သည်။ မျဉ်း၏ direction vector သည် \n" +
">    $$ \\vec{d}_1 = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} $$\n" +
">    ဖြစ်သည်။\n" +
"> 3. $A$ မှ $B$ သို့ direction vector \n" +
">    $$ \\vec{d}_2 = \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} $$ \n" +
">    ကို ရှာပါ။\n" +
"> 4. $\\vec{d}_1$ နှင့် $\\vec{d}_2$ တို့သည် parallel မဖြစ်သောကြောင့် မျဉ်းနှင့် $A$ ကို ဖြတ်သန်းသော unique plane တစ်ခုကို သတ်မှတ်နိုင်သည်။ ထို့နောက် \n" +
">    $$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2 $$\n" +
">    တွင် အစားထိုးပါ။\n\n" +
"**Solution**\n" +
"Choose $A$ as the fixed point. Then\n" +
"$$ \\vec{a} = \\overrightarrow{OA} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 2 \\end{pmatrix}. $$\n\n" +
"The vector\n" +
"$$ \\vec{d}_1 = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} $$\n" +
"is a direction vector lying in the plane.\n\n" +
"From the given line equation, the position vector of a point $B$ on the line is\n" +
"$$ \\overrightarrow{OB} = \\begin{pmatrix} -2 \\\\ 1 \\\\ 2 \\end{pmatrix}. $$\n\n" +
"Also,\n" +
"$$ \\begin{aligned} \\vec{d}_2 &= \\overrightarrow{AB} \\\\ &= \\overrightarrow{OB} - \\overrightarrow{OA} \\\\ &= \\begin{pmatrix} -2 \\\\ 1 \\\\ 2 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -1 \\\\ 2 \\end{pmatrix} \\\\ &= \\begin{pmatrix} -5 \\\\ 2 \\\\ 0 \\end{pmatrix}. \\end{aligned} $$\n\n" +
"Since $\\vec{d}_1$ and $\\vec{d}_2$ are not parallel, the vector equation of the plane is\n" +
"$$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2. $$\n\n" +
"Therefore,\n" +
"$$ \\vec{r} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 2 \\end{pmatrix} + t_1 \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + t_2 \\begin{pmatrix} -5 \\\\ 2 \\\\ 0 \\end{pmatrix}, \\quad t_1, t_2 \\in \\mathbb{R}. $$\n\n" +
"###### Example 22\n" +
"The vector\n" +
"$$ \\vec{n} = \\begin{pmatrix} 2 \\\\ 4 \\\\ -2 \\end{pmatrix} $$\n" +
"is perpendicular to a plane containing the point $A(1, -5, 2)$.\n\n" +
"(a) Write an equation of the plane in the form $\\vec{r} \\cdot \\vec{n} = d$.\n\n" +
"(b) Find the Cartesian equation of the plane.\n\n" +
"> **စဉ်းစားပုံ**\n" +
"> 1. $\\vec{n}$ သည် plane နှင့် ထောင့်မှန်ကျသောကြောင့် $\\vec{n}$ ကို normal vector အဖြစ်ယူပါ။\n" +
"> 2. $A$ ၏ position vector ကို $\\vec{a} = \\overrightarrow{OA}$ ဟုထားပြီး \n" +
">    $$ d = \\vec{a} \\cdot \\vec{n} $$\n" +
">    ကို ရှာပါ။ ထို့နောက် $\\vec{r} \\cdot \\vec{n} = d$ တွင် အစားထိုးပါ။\n" +
"> 3. $\\vec{r} = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}$ ဟုထားပြီး dot product ကို ဖြန့်ရေးကာ Cartesian equation ကို ရှာပါ။\n\n" +
"**Solution**\n\n" +
"(a) Let\n" +
"$$ \\vec{a} = \\overrightarrow{OA} = \\begin{pmatrix} 1 \\\\ -5 \\\\ 2 \\end{pmatrix}. $$\n\n" +
"Using the normal vector form of the plane,\n" +
"$$ \\begin{aligned} \\vec{r} \\cdot \\vec{n} &= \\vec{a} \\cdot \\vec{n} \\\\ &= \\begin{pmatrix} 1 \\\\ -5 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 4 \\\\ -2 \\end{pmatrix} \\\\ &= (1)(2) + (-5)(4) + (2)(-2) \\\\ &= 2 - 20 - 4 \\\\ &= -22. \\end{aligned} $$\n\n" +
"Hence, an equation of the plane is\n" +
"$$ \\vec{r} \\cdot \\vec{n} = -22. $$\n\n" +
"(b) Let\n" +
"$$ \\vec{r} = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}. $$\n\n" +
"Then\n" +
"$$ \\begin{aligned} \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 4 \\\\ -2 \\end{pmatrix} &= -22, \\\\ 2x + 4y - 2z &= -22, \\\\ x + 2y - z &= -11. \\end{aligned} $$\n\n" +
"Therefore, the Cartesian equation of the plane is\n" +
"$$ x + 2y - z = -11. $$\n";

fs.writeFileSync('src/data/chapter4_content.ts', content + newContent);
console.log('Appended content correctly');
