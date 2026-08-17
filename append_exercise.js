const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const exerciseText = `\n\n### Exercise 4.4

**1. Question**
Find the vector equation of the line:
(a) parallel to $\\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}$ and through the point $(1, 3, -7)$;
(b) through $(0, 1, 2)$ and with direction vector $\\hat{i} + \\hat{j} - 2\\hat{k}$;
(c) parallel to the $x$-axis and through the point $(-2, 2, 2)$.

> **စဉ်းစားပုံ**
> 1. ပေးထားသောအမှတ်၏ position vector ကို $\\vec{a}$၊ မျဉ်း၏ direction vector ကို $\\vec{b}$ ဟုယူပြီး $\\vec{r} = \\vec{a} + t\\vec{b}$ တွင် အစားထိုးပါ။

**Solution**
The vector equation of a line through a point with position vector $\\vec{a}$ and parallel to a direction vector $\\vec{b}$ is
$$ \\vec{r} = \\vec{a} + t\\vec{b}, \\quad t \\in \\mathbb{R}. $$

(a) The line passes through $(1, 3, -7)$ and is parallel to $\\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}$. Therefore,
$$ \\vec{r} = \\begin{pmatrix} 1 \\\\ 3 \\\\ -7 \\end{pmatrix} + t \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}, \\quad t \\in \\mathbb{R}. $$

(b) The direction vector is
$$ \\hat{i} + \\hat{j} - 2\\hat{k} = \\begin{pmatrix} 1 \\\\ 1 \\\\ -2 \\end{pmatrix}. $$
Since the line passes through $(0, 1, 2)$,
$$ \\vec{r} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 2 \\end{pmatrix} + t \\begin{pmatrix} 1 \\\\ 1 \\\\ -2 \\end{pmatrix}, \\quad t \\in \\mathbb{R}. $$

(c) A direction vector parallel to the $x$-axis is
$$ \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}. $$
Since the line passes through $(-2, 2, 2)$,
$$ \\vec{r} = \\begin{pmatrix} -2 \\\\ 2 \\\\ 2 \\end{pmatrix} + t \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\quad t \\in \\mathbb{R}. $$

**2. Question**
(a) Find the Cartesian equation of the line with parametric equations
$$ x = 3t + 1, \\quad y = 4 - 2t, \\quad z = 3t - 1. $$
(b) Find the unit vector in the direction of the line.

> **စဉ်းစားပုံ**
> 1. ညီမျှခြင်းတစ်ခုစီမှ $t$ ကို ရှာ၍ Cartesian equation ကို ရေးပါ။ Direction vector ကို $\\vec{b}$ ဟုယူပြီး $\\frac{\\vec{b}}{|\\vec{b}|}$ ဖြင့် unit vector ကို ရှာပါ။

**Solution**
(a) The parametric equations of the line are
$$ x = 3t + 1, \\quad y = 4 - 2t, \\quad z = 3t - 1. $$
$$ t = \\frac{x - 1}{3}, \\quad t = \\frac{y - 4}{-2}, \\quad t = \\frac{z + 1}{3}. $$
Therefore, the Cartesian equation of the line is
$$ \\frac{x - 1}{3} = \\frac{y - 4}{-2} = \\frac{z + 1}{3}. $$

(b) From the parametric equations, the vector equation of the line is
$$ \\vec{r} = \\vec{a} + t\\vec{b}. $$
$$ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 4 \\\\ -1 \\end{pmatrix} + t \\begin{pmatrix} 3 \\\\ -2 \\\\ 3 \\end{pmatrix}. $$
The direction vector of the line is
$$ \\vec{b} = \\begin{pmatrix} 3 \\\\ -2 \\\\ 3 \\end{pmatrix}. $$
Its magnitude is
$$ |\\vec{b}| = \\sqrt{3^2 + (-2)^2 + 3^2} = \\sqrt{22}. $$
Hence, the unit vector in the direction of the line is
$$ \\hat{b} = \\frac{\\vec{b}}{|\\vec{b}|} = \\frac{1}{\\sqrt{22}} \\begin{pmatrix} 3 \\\\ -2 \\\\ 3 \\end{pmatrix}. $$

**3. Question**
Find the equation of the plane:
(a) with normal vector $\\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix}$ and which passes through $(-1, 2, 4)$;
(b) perpendicular to the line joining the points $A(2, 3, 1)$ and $B(5, 7, 2)$ and which passes through $A$;
(c) containing $A(3, 2, 1)$ and the line
$$ x = 1 + t, \\quad y = 2 - t, \\quad z = 3 + 2t. $$

> **စဉ်းစားပုံ**
> 1. (a) တွင် ပေးထားသောအမှတ်၏ position vector ကို $\\vec{a} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 4 \\end{pmatrix}$ နှင့် normal vector ကို $\\vec{n} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix}$ ဟုယူပြီး $\\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}$ တွင် အစားထိုးပါ။
> 2. (b) တွင် $\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}$ ဖြင့် မျဉ်း၏ direction vector ကို ရှာပါ။ မျက်နှာပြင်သည် မျဉ်းနှင့် ထောင့်မှန်ကျသောကြောင့် $\\overrightarrow{AB}$ ကို normal vector အဖြစ်ယူပြီး $\\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}$ တွင် အစားထိုးပါ။
> 3. (c) တွင် ပေးထားသော မျဉ်းကို vector equation အဖြစ်ရေး၍ $\\vec{d}_1 = \\begin{pmatrix} 1 \\\\ -1 \\\\ 2 \\end{pmatrix}$ ဟုထားပါ။ မျဉ်းပေါ်ရှိ $B(1, 2, 3)$ ကိုယူပြီး $\\vec{d}_2 = \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}$ ကို ရှာပါ။ ထို့နောက် $\\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2$ တွင် အစားထိုး၍ ရရှိသော component equations သုံးကြောင်းမှ $t_1$ နှင့် $t_2$ ကို eliminate လုပ်ပြီး Cartesian equation ကို ရေးပါ။

**Solution**
(a) Let
$$ \\vec{a} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 4 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix}. $$
The normal vector form of the plane is
$$ \\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}. $$
$$ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix} = 8. $$
Therefore, the Cartesian equation of the plane is
$$ 2x - y + 3z = 8. $$

(b) For $A(2, 3, 1)$ and $B(5, 7, 2)$, let
$$ \\overrightarrow{OA} = \\vec{a} = \\begin{pmatrix} 2 \\\\ 3 \\\\ 1 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\vec{b} = \\begin{pmatrix} 5 \\\\ 7 \\\\ 2 \\end{pmatrix}. $$
Then the direction vector of the line $AB$ is
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 5 \\\\ 7 \\\\ 2 \\end{pmatrix} - \\begin{pmatrix} 2 \\\\ 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 4 \\\\ 1 \\end{pmatrix}. $$

[DIAGRAM:Chap4_4_4_Ex4_4_3b_Diag]

Since the plane is perpendicular to the line,
$$ \\vec{n} = \\begin{pmatrix} 3 \\\\ 4 \\\\ 1 \\end{pmatrix}. $$
The normal vector form of the plane is
$$ \\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}. $$
$$ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\cdot \\begin{pmatrix} 3 \\\\ 4 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 3 \\\\ 1 \\end{pmatrix} \\cdot \\begin{pmatrix} 3 \\\\ 4 \\\\ 1 \\end{pmatrix} = 19. $$
Therefore, the Cartesian equation of the plane is
$$ 3x + 4y + z = 19. $$

(c) The given parametric equations are
$$ x = 1 + t, \\quad y = 2 - t, \\quad z = 3 + 2t. $$
Therefore, the vector equation of the line is
$$ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + t \\begin{pmatrix} 1 \\\\ -1 \\\\ 2 \\end{pmatrix}. $$
Since the plane contains the given line, the direction vector of the line lies in the plane. Taking $A(3, 2, 1)$ as the fixed point, let
$$ \\vec{a} = \\overrightarrow{OA} = \\begin{pmatrix} 3 \\\\ 2 \\\\ 1 \\end{pmatrix}, \\quad \\vec{d}_1 = \\begin{pmatrix} 1 \\\\ -1 \\\\ 2 \\end{pmatrix}. $$
The point $B(1, 2, 3)$, obtained by taking $t = 0$, lies on the line and hence on the plane. Let
$$ \\overrightarrow{OB} = \\vec{b} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}. $$
Then
$$ \\begin{aligned} \\vec{d}_2 &= \\overrightarrow{AB} \\\\ &= \\overrightarrow{OB} - \\overrightarrow{OA} \\\\ &= \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ 2 \\\\ 1 \\end{pmatrix} \\\\ &= \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix}. \\end{aligned} $$
The vector equation of the plane is
$$ \\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2. $$
Therefore,
$$ \\vec{r} = \\begin{pmatrix} 3 \\\\ 2 \\\\ 1 \\end{pmatrix} + t_1 \\begin{pmatrix} 1 \\\\ -1 \\\\ 2 \\end{pmatrix} + t_2 \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix}. $$
Equating the corresponding components gives
$$ x = 3 + t_1 - 2t_2, \\quad (1) $$
$$ y = 2 - t_1, \\quad (2) $$
$$ z = 1 + 2t_1 + 2t_2. \\quad (3) $$
Adding equations (1) and (3),
$$ x + z = 4 + 3t_1. \\quad (4) $$
Multiplying equation (2) by 3,
$$ 3y = 6 - 3t_1. \\quad (5) $$
Adding equations (4) and (5),
$$ x + z + 3y = (4 + 3t_1) + (6 - 3t_1). $$
Therefore, the Cartesian equation of the plane is
$$ x + 3y + z = 10. $$

**4. Question**
Find the equation of the plane through $A(-1, 2, 1)$, $B(4, 1, 1)$ and $C(2, 0, 3)$:
(a) in vector form;
(b) in Cartesian form.

> **စဉ်းစားပုံ**
> 1. (a) တွင် $A$ ၏ position vector ကို $\\vec{a}$ ဟုယူပြီး $\\vec{d}_1 = \\overrightarrow{AB} = \\vec{b} - \\vec{a}$ နှင့် $\\vec{d}_2 = \\overrightarrow{AC} = \\vec{c} - \\vec{a}$ ကို ရှာပါ။ ထို့နောက် $\\vec{r} = \\vec{a} + t_1\\vec{d}_1 + t_2\\vec{d}_2$ တွင် အစားထိုးပါ။
> 2. (b) တွင် $\\vec{n} = \\vec{d}_1 \\times \\vec{d}_2$ ဖြင့် normal vector ကို ရှာပါ။ ထို့နောက် $\\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}$ တွင် အစားထိုး၍ Cartesian equation ကို ရေးပါ။

**Solution**
For $A(-1, 2, 1)$, $B(4, 1, 1)$ and $C(2, 0, 3)$, let
$$ \\overrightarrow{OA} = \\vec{a} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 1 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\vec{b} = \\begin{pmatrix} 4 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad \\overrightarrow{OC} = \\vec{c} = \\begin{pmatrix} 2 \\\\ 0 \\\\ 3 \\end{pmatrix}. $$
Then
$$ \\vec{d}_1 = \\overrightarrow{AB} = \\vec{b} - \\vec{a} = \\begin{pmatrix} 5 \\\\ -1 \\\\ 0 \\end{pmatrix}, $$
$$ \\vec{d}_2 = \\overrightarrow{AC} = \\vec{c} - \\vec{a} = \\begin{pmatrix} 3 \\\\ -2 \\\\ 2 \\end{pmatrix}. $$
(a) The vector equation of the plane is
$$ \\vec{r} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 1 \\end{pmatrix} + t_1 \\begin{pmatrix} 5 \\\\ -1 \\\\ 0 \\end{pmatrix} + t_2 \\begin{pmatrix} 3 \\\\ -2 \\\\ 2 \\end{pmatrix}, \\quad t_1, t_2 \\in \\mathbb{R}. $$
(b) A normal vector to the plane is
$$ \\begin{aligned} \\vec{n} &= \\vec{d}_1 \\times \\vec{d}_2 \\\\ &= \\begin{pmatrix} 5 \\\\ -1 \\\\ 0 \\end{pmatrix} \\times \\begin{pmatrix} 3 \\\\ -2 \\\\ 2 \\end{pmatrix} \\\\ &= \\begin{pmatrix} -2 \\\\ -10 \\\\ -7 \\end{pmatrix}. \\end{aligned} $$
The normal vector form of the plane is
$$ \\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}. $$
$$ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -10 \\\\ -7 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 1 \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -10 \\\\ -7 \\end{pmatrix} = -25. $$
Therefore, the Cartesian equation of the plane is
$$ -2x - 10y - 7z = -25. $$

**5. Question**
Find the Cartesian equation of the plane with vector equation
$$ \\vec{r} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + t_1 \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} + t_2 \\begin{pmatrix} 2 \\\\ -1 \\\\ 5 \\end{pmatrix}. $$

> **စဉ်းစားပုံ**
> 1. Non-parallel direction vectors နှစ်ခုကို $\\vec{d}_1$ နှင့် $\\vec{d}_2$ ဟုယူပြီး $\\vec{n} = \\vec{d}_1 \\times \\vec{d}_2$ ဖြင့် normal vector ကို ရှာပါ။ ထို့နောက် $\\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}$ တွင် အစားထိုး၍ Cartesian equation ကို ရေးပါ။

**Solution**
The vector equation of the plane is
$$ \\vec{r} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + t_1 \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} + t_2 \\begin{pmatrix} 2 \\\\ -1 \\\\ 5 \\end{pmatrix}. $$
Let
$$ \\vec{a} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\quad \\vec{d}_1 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}, \\quad \\vec{d}_2 = \\begin{pmatrix} 2 \\\\ -1 \\\\ 5 \\end{pmatrix}. $$
A normal vector to the plane is
$$ \\begin{aligned} \\vec{n} &= \\vec{d}_1 \\times \\vec{d}_2 \\\\ &= \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} \\times \\begin{pmatrix} 2 \\\\ -1 \\\\ 5 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 7 \\\\ -1 \\\\ -3 \\end{pmatrix}. \\end{aligned} $$
The normal vector form of the plane is
$$ \\vec{r} \\cdot \\vec{n} = \\vec{a} \\cdot \\vec{n}. $$
$$ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\cdot \\begin{pmatrix} 7 \\\\ -1 \\\\ -3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 7 \\\\ -1 \\\\ -3 \\end{pmatrix} = -4. $$
Therefore, the Cartesian equation of the plane is
$$ 7x - y - 3z = -4. $$
\`;

content = content.replace('x + 2y - z = -11. $$`;', 'x + 2y - z = -11. $$' + exerciseText + '`;');
fs.writeFileSync('src/data/chapter4_content.ts', content);
console.log('Appended successfully');
