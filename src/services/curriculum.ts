import { supabase } from '../lib/supabase';
import { Chapter, Lesson } from '../types';

const hasKeys = false; // Intentionally disabled to bypass Supabase database empty/mismatched tables and load all high-quality mock curriculum instantly

/**
 * Service for managing curriculum data
 */
export const curriculumService = {
  /**
   * Fetches chapters for a specific grade level
   */
  async getChaptersByGrade(gradeId: string | number): Promise<Chapter[]> {
    if (hasKeys) {
      try {
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .eq('grade_id', gradeId)
          .order('chapter_number', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          // If we are looking for grade 12, make sure we append the detailed mock chapters 1 and 2
          if (gradeId.toString() === '12') {
            const mockC1 = MOCK_CHAPTERS.find(c => c.id === 'chapter-c1-g12')!;
            const mockC2 = MOCK_CHAPTERS.find(c => c.id === 'chapter-c2-g12')!;
            
            let results = data.filter(c => c.chapter_number !== 1 && c.chapter_number !== 2);
            return [mockC1, mockC2, ...results];
          }
          return data;
        }
      } catch (err) {
        console.error('Error fetching chapters from Supabase:', err);
      }
    }

    // Fallback to mock chapters
    return MOCK_CHAPTERS.filter(c => c.grade_id.toString() === gradeId.toString());
  },

  /**
   * Fetches a single chapter by ID
   */
  async getChapterById(chapterId: string): Promise<Chapter | null> {
    const mockCh = MOCK_CHAPTERS.find(c => c.id === chapterId);
    if (mockCh) return mockCh;

    if (hasKeys) {
      try {
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .eq('id', chapterId)
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    }

    return null;
  },

  /**
   * Fetches all lessons for all chapters in a specific grade level
   */
  async getAllLessonsByGrade(gradeId: string | number): Promise<Lesson[]> {
    const chapters = await this.getChaptersByGrade(gradeId);
    const chapterIds = chapters.map(c => c.id);

    if (chapterIds.length === 0) return [];

    let lessons: Lesson[] = [];

    if (hasKeys) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .in('chapter_id', chapterIds)
          .order('order_index', { ascending: true });

        if (error) throw error;
        lessons = data || [];
      } catch (error) {
        console.error('Error fetching all lessons:', error);
      }
    }

    // Merge in mock lessons for any mock chapters we matched/returned
    const mockLessons = MOCK_LESSONS.filter(l => chapterIds.includes(l.chapter_id));
    const existingIds = new Set(lessons.map(l => l.id));
    const filteredMock = mockLessons.filter(l => !existingIds.has(l.id));
    lessons = [...filteredMock, ...lessons];

    return lessons;
  },

  /**
   * Fetches lessons for a specific chapter
   */
  async getLessonsByChapter(chapterId: string): Promise<Lesson[]> {
    const mockLessons = MOCK_LESSONS.filter(l => l.chapter_id === chapterId);
    if (mockLessons.length > 0) return mockLessons;

    if (hasKeys) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('chapter_id', chapterId)
          .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    }

    return [];
  },

  /**
   * Fetches a single lesson by ID
   */
  async getLessonById(lessonId: string): Promise<Lesson | null> {
    const mockLes = MOCK_LESSONS.find(l => l.id === lessonId);
    if (mockLes) return mockLes;

    if (hasKeys) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

        if (error) throw error;

        // Force Burmese content if this is the first lesson of Grade 12 Chapter 1 from DB
        if (data && data.order_index === 1) {
          const { data: chapterData } = await supabase
            .from('chapters')
            .select('*')
            .eq('id', data.chapter_id)
            .single();
          
          if (chapterData && chapterData.grade_id.toString() === '12' && chapterData.chapter_number === 1) {
            return {
              ...data,
              title: 'Introduction',
              content: chapter1IntroContent
            };
          }
        }

        return data;
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    }

    return null;
  },
};

const chapter1IntroContent = `## 1.1 Introduction to Complex Numbers — A Journey Through Time

\`\`\`note
{
  "type": "info",
  "title": "Welcome to Complex Numbers",
  "content": "Complex Numbers (ကိန်းရှုပ်များ) ဆိုသည်မှာ သင်္ချာလောက၏ စိတ်လှုပ်ရှားစရာ အကောင်းဆုံးနှင့် အဆန်းကြယ်ဆုံး စိတ်ကူးစိတ်သန်းများထဲမှ တစ်ခုဖြစ်ပါသည်။ အစပိုင်းတွင် ထူးဆန်းသည်ဟု ထင်ရသော်လည်း, ၎င်းတို့၏ စွမ်းအားမှာ သိပ္ပံနှင့် နည်းပညာလောကအတွက် မရှိမဖြစ်လိုအပ်လှပါသည်။\\n\\nဤသင်ခန်းစာတွင် ကျွန်ုပ်တို့သည် သာမန် Real Numbers များ၏ နယ်ပယ်မှကျော်လွန်၍ အနှုတ်ကိန်းများ၏ Square Root တန်ဖိုးများကိုပါ အဓိပ္ပာယ်ဖွင့်ဆိုနိုင်မည့် ပိုမိုကျယ်ပြန့်သော Universe သစ်ဆီသို့ အတူတကွ ခရီးစတင်ကြပါမည်।"
}
\`\`\`

### Why Did Complex Numbers Arise?

သင်္ချာပညာရှင်များသည် Complex Numbers များကို အပျော်သက်သက် တီထွင်ခဲ့ကြခြင်းမဟုတ်ဘဲ, လက်တွေ့ဘဝတွင် ကြုံတွေ့ရသော Algebra ဆိုင်ရာ ပြဿနာများကို ဖြေရှင်းရန် ကြိုးပမ်းရာမှ သဘာဝအလျောက် ပေါ်ထွက်လာခဲ့ခြင်းဖြစ်ပါသည်။ ဤသို့ရှိသော ရှာဖွေတွေ့ရှိမှုက သင်္ချာနယ်ပယ်တစ်ခုလုံးကို ပုံသဏ္ဌာန်သစ်ဖြင့် ပြန်လည်အသက်သွင်းစေခဲ့ပါသည်။

၁၅၀၀ ပြည့်နှစ်များအတွင်း သင်္ချာပညာရှင်များသည် Polynomial Equations များ, အထူးသဖြင့် Cubic Equations များကို ဖြေရှင်းရန် အလွန်ခက်ခဲစွာ ကြိုးပမ်းခဲ့ကြရပါသည်။ Real Numbers များသည် ပြဿနာအတော်များများအတွက် အဆင်ပြေသော်လည်း, အချို့သော Algebraic Formulas များကို တွက်ချက်ရာတွင် Traditional Number Line ပေါ်တွင် အဓိပ္ပာယ်မရှိသော $\\sqrt{-1}$ ကဲ့သို့သော Expression များ ပေါ်ထွက်လာခဲ့ပါသည်။
Cubic Equation ဖြေရှင်းမှု ပုံသေနည်း (Cardano's Formula) ကို အသုံးပြုသည့်အခါ အနှုတ်ကိန်းများ၏ Square Root ကို ရှောင်လွှဲ၍မရ ဖြစ်လာခဲ့ပါသည်။ ဤသို့ဖြင့် Real Numbers စနစ်တစ်ခုတည်းနှင့် မလုံလောက်တော့ဘဲ, သင်္ချာနယ်ပယ်တိုးတက်ရန် $\\sqrt{-1}$ ကို တရားဝင် တည်ဆောက်သတ်မှတ်ရန် လိုအပ်လာခဲ့သည်။

Algebra ကို အပြည့်အစုံ ခြုံငုံဖြေရှင်းနိုင်ရန်နှင့် Equations များကို တစ်သမတ်တည်း တွက်ချက်နိုင်ရန်အတွက် သင်္ချာပညာရှင်များသည် ဤ "Imaginary Quantities" များကို လက်ခံအသုံးပြုရန် ဖိအားပေးခြင်း ခံခဲ့ရပါသည်။ ဤသို့ဖြင့် Complex Number ဟူသော တော်လှန်ရေးအယူအဆတစ်ခု မွေးဖွားလာခဲ့ပါသည်။

---

### Timeline: The Development of Complex Numbers

Complex Numbers များ၏ သမိုင်းကြောင်းမှာ အလွန်ပင် စိတ်ဝင်စားဖွယ်ရာ ကောင်းလှပါသည်။

\`\`\`timeline
[
  {
    "year": "1st Century CE",
    "title": "Heron of Alexandria",
    "description": "Geometric Problem တစ်ခုကို တွက်ချက်စဉ် Square root of negative number ကို စတင်ရင်ဆိုင်ခဲ့ရသည်။"
  },
  {
    "year": "1545",
    "title": "Gerolamo Cardano",
    "description": "Cubic Equation များဖြေရှင်းရာတွင် i ပါဝင်သည့် Expressions များကို စတင်ကိုင်တွယ်ခဲ့သည်။"
  },
  {
    "year": "1637",
    "title": "René Descartes",
    "description": "Real နှင့် Imaginary Parts သတ်မှတ်ချက်ကို စတင်အသုံးပြုခဲ့ပြီး i အယူအဆကို ပိုမိုဖွံ့ဖြိုးစေခဲ့သည်။"
  },
  {
    "year": "1777",
    "title": "Leonhard Euler",
    "description": "Imaginary unit အတွက် i ဟူသော သင်္ကေတကို စတင်မိတ်ဆက်ပေးခဲ့သည်။"
  }
]
\`\`\`
`;

const chapter1ComplexContent = `## 1.2 Complex Numbers

### Cartesian or Regular Form of Complex Numbers \`(x + yi)\`

A complex number is formed by adding a **real number** and an **imaginary number**.

$$
\\text{Complex number} = \\text{Real number} + \\text{Imaginary number}
$$

The Cartesian or regular form of a complex number is

$$
z=x+yi \\qquad (x,y\\in\\mathbb{R})
$$

---

### Parts of $z=x+yi$

In $z=x+yi$, both $x$ and $y$ are real numbers.

- The **real number** is $x$.
- The **imaginary number** is $yi$.
- The **real part** is $x$; we write $\\operatorname{Re}(z)=x$.
- The **imaginary term** is $yi$, and the **imaginary part** is its coefficient $y$; we write $\\operatorname{Im}(z)=y$.

---

### Imaginary Numbers and the Pure Imaginary Unit

An imaginary number is a real number multiplied by the pure imaginary unit $i$.

$$
\\text{Imaginary number} = \\text{Real number}\\times i
$$

The symbol $i$ is called the **pure imaginary unit**, where

$$
i^2=-1
$$

#### Examples

$$
4i,\\qquad 7i,\\qquad \\sqrt{8}\\,i
$$

In these examples, $4$, $7$, and $\\sqrt{8}$ are real numbers, and $i$ is the pure imaginary unit.

---

## Rules and Examples

Let
$$
z_1=x_1+y_1i,\\qquad z_2=x_2+y_2i \\qquad (x_1,y_1,x_2,y_2\\in\\mathbb{R})
$$

### 1. Equality Rule

$$
z_1=z_2 \\Longleftrightarrow x_1=x_2 \\text{ and } y_1=y_2
$$

#### Example

If $x+2i=5+yi$, find $x$ and $y$.

**Solution:**
$$
\\begin{aligned}
  x+2i &= 5+yi \\\\
  \\text{Therefore, } x &= 5, \\quad y=2
\\end{aligned}
$$

### 2. Sum Rule

$$
z_1+z_2=(x_1+x_2)+(y_1+y_2)i
$$

#### Example

Find $(3+2i)+(5-7i)$.

**Solution:**
$$
(3+2i)+(5-7i)=8-5i
$$

### 3. Subtraction Rule

$$
z_1-z_2=(x_1-x_2)+(y_1-y_2)i
$$

#### Example

Find $(4-3i)-(1+6i)$.

**Solution:**
$$
(4-3i)-(1+6i)=3-9i
$$

### 4. Product Rule

$$
(x_1+y_1i)(x_2+y_2i) = (x_1x_2-y_1y_2)+(x_1y_2+x_2y_1)i
$$

#### Example

Find $(2+3i)(4-i)$.

**Solution:**
$$
\\begin{aligned}
  (2+3i)(4-i) &= 2(4-i) + 3i(4-i) \\\\
  &= 8 - 2i + 12i - 3i^2 \\\\
  &= 8 + 10i - 3(-1) \\\\
  &= 11+10i
\\end{aligned}
$$

---

## Coordinate Form of Complex Numbers \`(x, y)\`

Any complex number $z = x + yi$ can also be written in an ordered pair coordinate form:
$$
\\text{Complex number} = (\\text{Real Part}, \\text{Imaginary Part}) = (x, y)
$$

#### Examples

$$
(3,4),\\qquad (2,\\sqrt{6}),\\qquad (5,9)
$$

---

### 🎮 Interactive Argand Diagram Playground

A **Complex Number** $z = x + yi$ can be matched uniquely with a coordinate point $(x, y)$ on a two-dimensional graph called the **Complex Plane** (or **Argand Diagram**). 

The horizontal axis represents the **Real Axis** ($Re$) and the vertical axis represents the **Imaginary Axis** ($Im$).

Use the interactive playground below to plot, explore conjugates, find absolute sizes, and inspect complex numbers in real time!

\`\`\`complex-plane
{
  "points": []
}
\`\`\`

---

## Rules and Examples

Let
$$
z_1=(x_1,y_1),\\qquad z_2=(x_2,y_2)
$$

### 1. Equality Rule

$$
(x_1,y_1)=(x_2,y_2) \\Longleftrightarrow x_1=x_2 \\text{ and } y_1=y_2
$$

#### Example

Solve for $x$ and $y$ if $(x,2)=(5,y)$.

**Solution:**
$$
\\begin{aligned}
  (x,2) &= (5,y) \\\\
  \\text{Therefore, } x &= 5, \\quad y=2
\\end{aligned}
$$

### 2. Sum Rule

$$
(x_1,y_1)+(x_2,y_2)=(x_1+x_2,y_1+y_2)
$$

#### Example

Find $(3,2)+(5,-7)$.

**Solution:**
$$
(3,2)+(5,-7)=(8,-5)
$$

### 3. Subtraction Rule

$$
(x_1,y_1)-(x_2,y_2)=(x_1-x_2,y_1-y_2)
$$

#### Example

Find $(4,-3)-(1,6)$.

**Solution:**
$$
(4,-3)-(1,6)=(3,-9)
$$

### 4. Product Rule

$$
(x_1,y_1)(x_2,y_2) = (x_1x_2-y_1y_2,\\ x_1y_2+x_2y_1)
$$

#### Example

Find $(2,3)(4,-1)$.

**Solution:**
$$
(2,3)(4,-1)=(11,10)
$$

---

## Real Numbers as Complex Numbers

All real numbers can be considered as complex numbers.

| Real Numbers | Complex Numbers |
|---|---|
| $x$ | $(x,0)$ |
| $y$ | $(y,0)$ |
| $x+y$ | $(x,0)+(y,0)$ |
| $xy$ | $(x,0)(y,0)$ |

Since $(0,1)(0,1)=(0-1,0+0)=(-1,0)=-1$ and $i^2=-1$, we have:
$$
\\begin{aligned}
  i &= (0,1) = 0+i \\\\
  i^2 &= i\\cdot i=(0,1)(0,1)=-1
\\end{aligned}
$$

Also,

$$
\\begin{aligned}
(x+yi)&=(x,0)+(y,0)(0,1)\\\\
&=(x,0)+(0,y)\\\\
&=(x,y)
\\end{aligned}
$$

Therefore,

$$
x+yi=(x,y)
$$

---

## Example 3

Compute

$$
(-2,3)(1,-2)+(1,1)(0,1)
$$

### Solution

#### Method 1: Coordinate Form

$$
\\begin{aligned}
(-2,3)(1,-2)+(1,1)(0,1)
&=(-2-(-6),\\ 4+3)+(0-1,\\ 1+0)\\\\
&=(4,7)+(-1,1)\\\\
&=(3,8)
\\end{aligned}
$$

#### Method 2: Cartesian Form

$$
\\begin{aligned}
(-2+3i)(1-2i)+(1+i)i
&=(-2+4i+3i-6i^2)+(i+i^2)\\\\
&=-2+8i-5i^2\\\\\
&=-2+8i+5\\\\
&=3+8i
\\end{aligned}
$$

Therefore,

$$
(-2,3)(1,-2)+(1,1)(0,1)=(3,8)
$$

---

## Exercise 1.2

### ✏️ Exercise 1.2

\`\`\`note
{
  "type": "info",
  "title": "Exercise 1.2 Questions",
  "content": "**1. Compute.**\\n* (a) $(2,0)(2,5)+(3,-2)(0,1)$\\n* (b) $(2,-5)(-1,0)+(1,0)(5,1)$\\n* (c) $(-3,-2)(-2,-3)+(-2,-3)(-3,-2)$\\n* (d) $(1,0)(0,1)+(0,1)(1,0)$\\n\\n**2. Compute.**\\n* (a) $(3+2i)(3-2i)+(-5+7i)(-1-i)$\\n* (b) $(-1+i)(1-i)+(2+3i)$\\n* (c) $(1+i)(1-i)+(-2+i)(-2+i)$\\n* (d) $(3+2i)+(7-i)(-3+3i)$"
}
\`\`\`

---

### 🗝️ Solutions to Exercise 1.2

### Questions & Step-by-Step Solutions

#### **1. Compute.**

##### (a) $(2,0)(2,5)+(3,-2)(0,1)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(2,0)(2,5)+(3,-2)(0,1)
&=(4-0,\\ 10+0)+(0-(-2),\\ 3+0)\\\\
&=(4,10)+(2,3)\\\\
&=(6,13)
\\end{aligned}
$$

</div>
</details>

##### (b) $(2,-5)(-1,0)+(1,0)(5,1)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(2,-5)(-1,0)+(1,0)(5,1)
&=(-2-0,\\ 0+5)+(5-0,\\ 1+0)\\\\
&=(-2,5)+(5,1)\\\\
&=(3,6)
\\end{aligned}
$$

</div>
</details>

##### (c) $(-3,-2)(-2,-3)+(-2,-3)(-3,-2)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(-3,-2)(-2,-3)+(-2,-3)(-3,-2)
&=(6-6,\\ 9+4)+(6-6,\\ 4+9)\\\\
&=(0,13)+(0,13)\\\\
&=(0,26)
\\end{aligned}
$$

</div>
</details>

##### (d) $(1,0)(0,1)+(0,1)(1,0)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(1,0)(0,1)+(0,1)(1,0)
&=(0-0,\\ 1+0)+(0-0,\\ 0+1)\\\\
&=(0,1)+(0,1)\\\\
&=(0,2)
\\end{aligned}
$$

</div>
</details>

---

#### **2. Compute.**

##### (a) $(3+2i)(3-2i)+(-5+7i)(-1-i)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(3+2i)(3-2i)+(-5+7i)(-1-i)
&=(9-6i+6i-4i^2)+(5+5i-7i-7i^2)\\\\
&=13+(12-2i)\\\\
&=25-2i
\\end{aligned}
$$

</div>
</details>

##### (b) $(-1+i)(1-i)+(2+3i)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(-1+i)(1-i)+(2+3i)
&=-1+i+i-i^2+2+3i\\\\
&=2i+2+3i\\\\
&=2+5i
\\end{aligned}
$$

</div>
</details>

##### (c) $(1+i)(1-i)+(-2+i)(-2+i)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(1+i)(1-i)+(-2+i)(-2+i)
&=(1-i+i-i^2)+(4-2i-2i+i^2)\\\\
&=2+(3-4i)\\\\
&=5-4i
\\end{aligned}
$$

</div>
</details>

##### (d) $(3+2i)+(7-i)(-3+3i)$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
(3+2i)+(7-i)(-3+3i)
&=3+2i+(-21+21i+3i-3i^2)\\\\
&=3+2i+(-18+24i)\\\\
&=-15+26i
\\end{aligned}
$$

</div>
</details>

`;

const chapter1BasicContent = `# Pure Imaginary Unit $i$

### 💡 Motivation
Consider the equation:
$$x^2+4=0$$

It is equivalent to:
$$x^2=-4$$

In the real number system this equation has **no solution**, since the square of a real number cannot be negative.

---

\`\`\`note
{
  "type": "definition",
  "title": "Pure Imaginary Unit $i$",
  "content": "The **pure imaginary unit** is denoted by $i$ and is defined by:\\n\\n$$i=\\\\sqrt{-1}, \\\\qquad i^2=-1$$\\n\\nThis new symbol allows us to work with square roots of negative numbers."
}
\`\`\`

---

### 🔍 Concept Check
Solve the equation $x^2 + 4 = 0$.

**Solution:**
From $x^2 + 4 = 0$, we get:
$$
\\begin{aligned}
  x^2 &= -4 \\\\
      &= 4(-1) \\\\
      &= 4i^2 \\\\
      &= (\\pm \\sqrt{4}\\,i)^2
\\end{aligned}
$$

Therefore,
$$\\boxed{x=\\pm 2i}$$

---

### 📊 Pattern Recognition
The same idea can be used for other negative numbers:

$$
\\begin{aligned}
  x^2 = -9 &\\implies x^2 = (\\pm\\sqrt{9}\\,i)^2 \\implies x=\\pm3i \\\\
  x^2 = -16 &\\implies x^2 = (\\pm\\sqrt{16}\\,i)^2 \\implies x=\\pm4i \\\\
  x^2 = -81 &\\implies x^2 = (\\pm\\sqrt{81}\\,i)^2 \\implies x=\\pm9i \\\\
  x^2 = -7 &\\implies x^2 = (\\pm\\sqrt{7}\\,i)^2 \\implies x=\\pm\\sqrt{7}\\,i
\\end{aligned}
$$

---

\`\`\`note
{
  "type": "info",
  "title": "General Rule",
  "content": "For any positive real number $n$:\\n\\n$$-n=n(-1)=ni^2=(\\\\pm\\\\sqrt{n}\\\\,i)^2$$\\n\\nTherefore, if $x^2=-n$, then:\\n\\n$$\\\\boxed{x=\\\\pm\\\\sqrt{n}\\\\,i}$$"
}
\`\`\`

---

### 💡 $ax^2+bx+c$ ပုံစံညီမျှခြင်းကို Perfect Square ပြောင်းနည်း
\`\`\`note
{
  "type": "tip",
  "title": "Perfect Square ပြောင်းနည်း",
  "content": "1. $x^2$ ၏ မြှောက်ဖော်ကိန်း $a$ ကို $1$ ဖြစ်အောင်လုပ်ပါ။\\n2. ကိန်းသေ $c$ ကို R.H.S (ညာဘက်ခြမ်း) သို့ပို့ပါ။\\n3. အလယ်ကိန်း $b$ ၏ မြှောက်ဖော်ကိန်းကို $2$ ဖြင့်စားပါ။\\n4. ရလာသောအဖြေကို $2$ ထပ်တင်ပြီး ညီမျှခြင်းနှစ်ဖက်စလုံးတွင် ပေါင်းပါ။"
}
\`\`\`

---

### 📝 Example 1
Solve:
$$x^2-2x+5=0$$

#### 🔍 Solution:
$$
\\begin{aligned}
  x^2-2x &= -5 \\\\
  x^2-2x+1 &= -5+1 \\\\
  (x-1)^2 &= -4 \\\\
  x-1 &= \\pm2i \\\\
  x &= 1\\pm2i
\\end{aligned}
$$

---

### 📝 Example 2
Solve $x^2+2x+3=0$ and check your answer.

#### 🔍 Solution:
$$
\\begin{aligned}
  x^2+2x &= -3 \\\\
  x^2+2x+1 &= -3+1 \\\\
  (x+1)^2 &= -2 \\\\
  x+1 &= \\pm\\sqrt{2}\\,i \\\\
  x &= -1\\pm\\sqrt{2}\\,i
\\end{aligned}
$$

#### 📊 Check:

For $x=-1+\\sqrt{2}\\,i$:
$$
\\begin{aligned}
  x^2+2x+3
  &=(-1+\\sqrt{2}\\,i)^2+2(-1+\\sqrt{2}\\,i)+3\\\\
  &=(1-2\\sqrt{2}\\,i-2)-2+2\\sqrt{2}\\,i+3\\\\
  &=0
\\end{aligned}
$$

For $x=-1-\\sqrt{2}\\,i$:
$$
\\begin{aligned}
  x^2+2x+3
  &=(-1-\\sqrt{2}\\,i)^2+2(-1-\\sqrt{2}\\,i)+3\\\\
  &=(1+2\\sqrt{2}\\,i-2)-2-2\\sqrt{2}\\,i+3\\\\
  &=0
\\end{aligned}
$$

---

### ✏️ Exercise 1.1

\`\`\`note
{
  "type": "info",
  "title": "Exercise 1.1 Questions",
  "content": "**1. Solve the following equations.**\\n* (a) $x^2-6x+10=0$\\n* (b) $-2x^2+4x-3=0$\\n* (c) $5x^2-2x+1=0$\\n* (d) $3x^2+7x+5=0$\\n\\n**2. Solve the following equations and check your answers.**\\n* (a) $x^2-2x+4=0$\\n* (b) $x^2-4x+5=0$\\n\\n**3. Find the value of $i^n$ for every positive integer $n$, where $i^2=-1$, $i^3=i^2i$, $i^4=i^2i^2$, etc.**"
}
\`\`\`

---

### 🗝️ Solutions to Exercise 1.1

### Questions & Step-by-Step Solutions

#### **1. Solve the following equations.**

##### (a) $x^2-6x+10=0$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
  x^2-6x &= -10\\\\
  x^2-6x+9 &= -10+9\\\\
  (x-3)^2 &= -1\\\\
  x-3 &= \\pm i\\\\
  x &= 3\\pm i
\\end{aligned}
$$

</div>
</details>

##### (b) $-2x^2+4x-3=0$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
  x^2-2x+\\frac{3}{2} &= 0\\\\
  x^2-2x &= -\\frac{3}{2}\\\\
  x^2-2x+1 &= -\\frac{3}{2}+1\\\\
  (x-1)^2 &= -\\frac{1}{2}\\\\
  x &= 1\\pm\\frac{\\sqrt{2}}{2}i
\\end{aligned}
$$

</div>
</details>

##### (c) $5x^2-2x+1=0$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
  x^2-\\frac{2}{5}x &= -\\frac{1}{5}\\\\
  x^2-\\frac{2}{5}x+\\frac{1}{25} &= -\\frac{1}{5}+\\frac{1}{25}\\\\
  \\left(x-\\frac{1}{5}\\right)^2 &= -\\frac{4}{25}\\\\
  x-\\frac{1}{5} &= \\pm\\frac{2}{5}i\\\\
  x &= \\frac{1}{5}\\pm \\frac{2}{5}i
\\end{aligned}
$$

</div>
</details>

##### (d) $3x^2+7x+5=0$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
  x^2+\\frac{7}{3}x &= -\\frac{5}{3}\\\\
  x^2+\\frac{7}{3}x+\\frac{49}{36} &= -\\frac{5}{3}+\\frac{49}{36}\\\\
  \\left(x+\\frac{7}{6}\\right)^2 &= -\\frac{11}{36}\\\\
  x+\\frac{7}{6} &= \\pm\\frac{\\sqrt{11}}{6}i\\\\
  x &= -\\frac{7}{6}\\pm \\frac{\\sqrt{11}}{6}i
\\end{aligned}
$$

</div>
</details>

---

#### **2. Solve the following equations and check your answers.**

##### (a) $x^2-2x+4=0$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
  x^2-2x &= -4\\\\
  x^2-2x+1 &= -4+1\\\\
  (x-1)^2 &= -3\\\\
  x-1 &= \\pm\\sqrt{3}\\,i\\\\
  x &= 1+\\sqrt{3}\\,i \\quad \\text{or} \\quad x=1-\\sqrt{3}\\,i
\\end{aligned}
$$

**Check:**
* For $1+\\sqrt{3}\\,i$:
$$
(1+\\sqrt{3}\\,i)^2-2(1+\\sqrt{3}\\,i)+4 = (1+2\\sqrt{3}\\,i-3)-2-2\\sqrt{3}\\,i+4 = 0
$$
* For $1-\\sqrt{3}\\,i$:
$$
(1-\\sqrt{3}\\,i)^2-2(1-\\sqrt{3}\\,i)+4 = (1-2\\sqrt{3}\\,i-3)-2+2\\sqrt{3}\\,i+4 = 0
$$

</div>
</details>

##### (b) $x^2-4x+5=0$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
  x^2-4x &= -5\\\\
  x^2-4x+4 &= -5+4\\\\
  (x-2)^2 &= -1\\\\
  x-2 &= \\pm i\\\\
  x &= 2+i \\quad \\text{or} \\quad x=2-i
\\end{aligned}
$$

**Check:**
* For $2+i$:
$$
(2+i)^2-4(2+i)+5 = (4+4i-1)-8-4i+5 = 0
$$
* For $2-i$:
$$
(2-i)^2-4(2-i)+5 = (4-4i-1)-8+4i+5 = 0
$$

</div>
</details>

---

#### **3. Find the value of $i^n$ for every positive integer $n$.**
<details>
<summary>Click to view solution</summary>
<div>

$$i^0 = 1$$

$$
\\begin{aligned}
  i^1 &= i \\qquad\\qquad & i^5 &= i^4i = i \\\\
  i^2 &= -1 \\qquad\\qquad & i^6 &= i^4i^2 = -1 \\\\
  i^3 &= i^2i = -i \\qquad\\qquad & i^7 &= i^4i^3 = -i \\\\
  i^4 &= i^2i^2 = 1 \\qquad\\qquad & i^8 &= i^4i^4 = 1
\\end{aligned}
$$

**General Pattern Rules:**
* If $n$ is divisible by 4 (remainder = 0) $\\implies i^n=1$
* If $n$ has a remainder of 1 when divided by 4 $\\implies i^n=i$
* If $n$ has a remainder of 2 when divided by 4 $\\implies i^n=-1$
* If $n$ has a remainder of 3 when divided by 4 $\\implies i^n=-i$

</div>
</details>

---

\`\`\`note
{
  "type": "tip",
  "title": "Note: Sum of Four Consecutive Powers",
  "content": "Any four consecutive powers of $i$ always have a sum of $0$. \\\\n\\\\nFor example:\\\\n* $i^0+i^1+i^2+i^3 = 1+i-1-i = 0$\\\\n* $i^1+i^2+i^3+i^4 = i-1-i+1 = 0$\\\\n* $i^2+i^3+i^4+i^5 = -1-i+1+i = 0$"
}
\`\`\`
`;

const chapter1OperationsContent = `## 1.3 Operations on Complex Numbers

\`\`\`note
{
  "type": "info",
  "title": "Division of Complex Numbers",
  "content": "Addition, subtraction, and multiplication have already been studied. In this section, we only focus on the **division** of complex numbers.\\\\n\\\\nTo divide by a complex number, multiply both the numerator and the denominator by the **conjugate** of the denominator."
}
\`\`\`

### Conjugate of a Complex Number ($\\bar{z}$)

If $z = x + yi$, then the **conjugate** of $z$ is written as $\\bar{z}$ (pronounced "z-bar"), where:

$$
\\bar{z} = x - yi
$$

An important property of the conjugate is that the product of $z$ and $\\bar{z}$ is always a real number:

$$
z\\bar{z} = (x + yi)(x - yi) = x^2 + y^2
$$

This algebraic property is what allows us to eliminate the imaginary unit $i$ from the denominator.

---

### The Division Rule

Let $z_1 = x_1 + y_1i$ and $z_2 = x_2 + y_2i$, where $z_2 \\neq 0$. The conjugate of the denominator is $\\bar{z}_2 = x_2 - y_2i$.

To find $\\frac{z_1}{z_2}$, we multiply the numerator and the denominator by $\\bar{z}_2$:

$$
\\begin{aligned}
\\frac{z_1}{z_2} &= \\frac{z_1}{z_2} \\cdot \\frac{\\bar{z}_2}{\\bar{z}_2} \\\\
&= \\frac{(x_1 + y_1i)(x_2 - y_2i)}{(x_2 + y_2i)(x_2 - y_2i)} \\\\
&= \\frac{(x_1x_2 + y_1y_2) + (x_2y_1 - x_1y_2)i}{x_2^2 + y_2^2} \\\\
&= \\frac{x_1x_2 + y_1y_2}{x_2^2 + y_2^2} + \\left(\\frac{x_2y_1 - x_1y_2}{x_2^2 + y_2^2}\\right)i
\\end{aligned}
$$

---

## Example 4

Calculate $\\dfrac{2+3i}{3+i}$.

### Solution

$$
\\begin{aligned}
\\frac{2+3i}{3+i} &= \\frac{(2+3i)(3-i)}{(3+i)(3-i)} \\\\
&= \\frac{6-2i+9i-3i^2}{9-i^2} \\\\
&= \\frac{6+7i-3(-1)}{9-(-1)} \\\\
&= \\frac{9+7i}{10} \\\\
&= \\frac{9}{10} + \\frac{7}{10}i
\\end{aligned}
$$

---

### Reciprocal of a Complex Number

Let $z = x + yi$ and $z \\neq 0$. Since $z \\neq 0$, $x$ and $y$ are not both zero; therefore, $x^2 + y^2 \\neq 0$.

#### Finding $\\dfrac{1}{z}$

To find the reciprocal, we multiply the numerator and denominator by the conjugate of the denominator, which is $\\bar{z} = x - yi$:

$$
\\begin{aligned}
\\frac{1}{z} &= \\frac{1}{x+yi} \\\\
&= \\frac{1}{x+yi} \\cdot \\frac{x-yi}{x-yi} \\\\
&= \\frac{x-yi}{(x+yi)(x-yi)} \\\\
&= \\frac{x-yi}{x^2+y^2} \\\\
&= \\frac{x}{x^2+y^2} - \\frac{y}{x^2+y^2}i
\\end{aligned}
$$

#### Verification

Let us compute the product $z \\left(\\frac{1}{z}\\right)$:

$$
\\begin{aligned}
z\\left(\\frac{1}{z}\\right) &= (x+yi)\\left(\\frac{x-yi}{x^2+y^2}\\right) \\\\
&= \\frac{(x+yi)(x-yi)}{x^2+y^2} \\\\
&= \\frac{x^2+y^2}{x^2+y^2} \\\\
&= 1
\\end{aligned}
$$

Hence, $z\\left(\\frac{1}{z}\\right) = 1$.

Therefore, for any non-zero complex number $z$, $\\frac{1}{z}$ is the **multiplicative inverse** of $z$ and is denoted by $z^{-1}$.

Division of complex numbers can also be defined as:

$$
\\boxed{\\frac{z_1}{z_2} = z_1 z_2^{-1}, \\qquad z_2 \\neq 0}
$$

\`\`\`note
{
  "type": "tip",
  "title": "Practical Note",
  "content": "Using the method shown in **Example 4** (multiplying numerator and denominator directly by the conjugate of the denominator) is usually much easier in practice than using the formula $z_1 z_2^{-1}$. We recommend calculating division using that direct approach!"
}
\`\`\`

---

## Exercise 1.3

Given:
* $z_1 = -2 + 3i$
* $z_2 = 5 + 2i$
* $\\overline{z_1} = -2 - 3i$
* $\\overline{z_2} = 5 - 2i$

---

### Questions & Step-by-Step Solutions

#### (a) $z_1^2 - 2z_1 + 1$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
z_1^2 - 2z_1 + 1 &= (-2 + 3i)^2 - 2(-2 + 3i) + 1 \\\\
&= (4 - 12i + 9i^2) + (4 - 6i) + 1 \\\\
&= (4 - 9 + 4 + 1) + (-12i - 6i) \\\\
&= -18i
\\end{aligned}
$$

</div>
</details>

#### (b) $3z_2^2 + 2z_2 - 1$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
3z_2^2 + 2z_2 - 1 &= 3(5 + 2i)^2 + 2(5 + 2i) - 1 \\\\
&= 3(25 + 20i + 4i^2) + 10 + 4i - 1 \\\\
&= 3(21 + 20i) + 9 + 4i \\\\
&= 63 + 60i + 9 + 4i \\\\
&= 72 + 64i
\\end{aligned}
$$

</div>
</details>

#### (c) $z_1 \\overline{z_2} + z_2 \\overline{z_1}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
z_1 \\bar{z}_2 + z_2 \\bar{z}_1 &= (-2 + 3i)(5 - 2i) + (5 + 2i)(-2 - 3i) \\\\
&= (-10 + 4i + 15i - 6i^2) + (-10 - 15i - 4i + 6i^2) \\\\
&= (-4 + 19i) + (-4 - 19i) \\\\
&= -8
\\end{aligned}
$$

</div>
</details>

#### (d) $\\dfrac{1}{z_1}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{1}{z_1} &= \\frac{1}{-2 + 3i} \\cdot \\frac{-2 - 3i}{-2 - 3i} \\\\
&= \\frac{-2 - 3i}{(-2)^2 + 3^2} \\\\
&= -\\frac{2}{13} - \\frac{3}{13}i
\\end{aligned}
$$

</div>
</details>

#### (e) $\\dfrac{1}{z_2}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{1}{z_2} &= \\frac{1}{5 + 2i} \\cdot \\frac{5 - 2i}{5 - 2i} \\\\
&= \\frac{5 - 2i}{5^2 + 2^2} \\\\
&= \\frac{5}{29} - \\frac{2}{29}i
\\end{aligned}
$$

</div>
</details>

#### (f) $\\dfrac{1}{z_1 z_2}$
<details>
<summary>Click to view solution</summary>
<div>

First find the product $z_1 z_2$:
$$
\\begin{aligned}
z_1 z_2 &= (-2 + 3i)(5 + 2i) \\\\
&= -10 - 4i + 15i + 6i^2 \\\\
&= -16 + 11i
\\end{aligned}
$$

Now compute the reciprocal:
$$
\\begin{aligned}
\\frac{1}{z_1 z_2} &= \\frac{1}{-16 + 11i} \\cdot \\frac{-16 - 11i}{-16 - 11i} \\\\
&= \\frac{-16 - 11i}{(-16)^2 + 11^2} \\\\
&= \\frac{-16 - 11i}{256 + 121} \\\\
&= -\\frac{16}{377} - \\frac{11}{377}i
\\end{aligned}
$$

</div>
</details>

#### (g) $\\dfrac{z_1}{z_2}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{z_1}{z_2} &= \\frac{-2 + 3i}{5 + 2i} \\cdot \\frac{5 - 2i}{5 - 2i} \\\\
&= \\frac{(-2 + 3i)(5 - 2i)}{5^2 + 2^2} \\\\
&= \\frac{-10 + 4i + 15i - 6i^2}{29} \\\\
&= \\frac{-4 + 19i}{29} \\\\
&= -\\frac{4}{29} + \\frac{19}{29}i
\\end{aligned}
$$

</div>
</details>

#### (h) $\\dfrac{\\overline{z_1}}{\\overline{z_2}}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{\\bar{z}_1}{\\bar{z}_2} &= \\frac{-2 - 3i}{5 - 2i} \\cdot \\frac{5 + 2i}{5 + 2i} \\\\
&= \\frac{(-2 - 3i)(5 + 2i)}{5^2 + 2^2} \\\\
&= \\frac{-10 - 4i - 15i - 6i^2}{29} \\\\
&= \\frac{-4 - 19i}{29} \\\\
&= -\\frac{4}{29} - \\frac{19}{29}i
\\end{aligned}
$$

</div>
</details>

#### (i) $\\dfrac{z_2}{z_1}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{z_2}{z_1} &= \\frac{5 + 2i}{-2 + 3i} \\cdot \\frac{-2 - 3i}{-2 - 3i} \\\\
&= \\frac{(5 + 2i)(-2 - 3i)}{(-2)^2 + 3^2} \\\\
&= \\frac{-10 - 15i - 4i - 6i^2}{13} \\\\
&= \\frac{-4 - 19i}{13} \\\\
&= -\\frac{4}{13} - \\frac{19}{13}i
\\end{aligned}
$$

</div>
</details>

#### (j) $\\overline{\\left(\\dfrac{z_2}{z_1}\\right)}$
<details>
<summary>Click to view solution</summary>
<div>

Using the value of $\\frac{z_2}{z_1}$ from **(i)**:
$$
\\begin{aligned}
\\overline{\\left(\\frac{z_2}{z_1}\\right)} &= \\overline{\\left(-\\frac{4}{13} - \\frac{19}{13}i\\right)} \\\\
&= -\\frac{4}{13} + \\frac{19}{13}i
\\end{aligned}
$$

</div>
</details>

#### (k) $\\dfrac{\\overline{z_1} z_2}{z_1 \\overline{z_2}}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{\\bar{z}_1 z_2}{z_1 \\bar{z}_2} &= \\frac{(-2 - 3i)(5 + 2i)}{(-2 + 3i)(5 - 2i)} \\\\
&= \\frac{-4 - 19i}{-4 + 19i} \\cdot \\frac{-4 - 19i}{-4 - 19i} \\\\
&= \\frac{(-4 - 19i)^2}{(-4)^2 + 19^2} \\\\
&= \\frac{16 + 152i + 361i^2}{16 + 361} \\\\
&= \\frac{-345 + 152i}{377} \\\\
&= -\\frac{345}{377} + \\frac{152}{377}i
\\end{aligned}
$$

</div>
</details>

#### (l) $\\dfrac{z_2}{\\overline{z_1}} + \\dfrac{z_1}{\\overline{z_2}}$
<details>
<summary>Click to view solution</summary>
<div>

$$
\\begin{aligned}
\\frac{z_2}{\\bar{z}_1} + \\frac{z_1}{\\bar{z}_2} &= \\frac{5 + 2i}{-2 - 3i} + \\frac{-2 + 3i}{5 - 2i} \\\\
&= \\frac{(5 + 2i)(-2 + 3i)}{13} + \\frac{(-2 + 3i)(5 + 2i)}{29} \\\\
&= \\frac{-16 + 11i}{13} + \\frac{-16 + 11i}{29} \\\\
&= \\left(-\\frac{16}{13} - \\frac{16}{29}\\right) + \\left(\\frac{11}{13} + \\frac{11}{29}\\right)i \\\\
&= -\\frac{672}{377} + \\frac{462}{377}i
\\end{aligned}
$$

</div>
</details>

---

### Proof Questions

#### 2. Let $z_1 = 3 - 2i$ and $z_2 = -1 + 4i$. Show that:

##### (a) $\\overline{(z_1 + z_2)} = \\overline{z_1} + \\overline{z_2}$
<details>
<summary>Click to view proof</summary>
<div>

Given $z_1 = 3 - 2i$ and $z_2 = -1 + 4i$.
We have $\\overline{z_1} = 3 + 2i$ and $\\overline{z_2} = -1 - 4i$.

**Left-Hand Side (LHS):**
$$
\\begin{aligned}
z_1 + z_2 &= (3 - 2i) + (-1 + 4i) \\\\
&= 2 + 2i \\\\
\\overline{(z_1 + z_2)} &= \\overline{2 + 2i} = 2 - 2i
\\end{aligned}
$$

**Right-Hand Side (RHS):**
$$
\\begin{aligned}
\\overline{z_1} + \\overline{z_2} &= (3 + 2i) + (-1 - 4i) \\\\
&= 2 - 2i
\end{aligned}
$$

Since LHS = RHS, we have shown that $\\overline{(z_1 + z_2)} = \\overline{z_1} + \\overline{z_2}$.

</div>
</details>

##### (b) $\\overline{z_1 z_2} = \\overline{z_1} \\, \\overline{z_2}$
<details>
<summary>Click to view proof</summary>
<div>

**Left-Hand Side (LHS):**
$$
\\begin{aligned}
z_1 z_2 &= (3 - 2i)(-1 + 4i) \\\\
&= -3 + 12i + 2i - 8i^2 \\\\
&= 5 + 14i \\\\
\\overline{z_1 z_2} &= \\overline{5 + 14i} = 5 - 14i
\\end{aligned}
$$

**Right-Hand Side (RHS):**
$$
\\begin{aligned}
\\overline{z_1} \\, \\overline{z_2} &= (3 + 2i)(-1 - 4i) \\\\
&= -3 - 12i - 2i - 8i^2 \\\\
&= 5 - 14i
\\end{aligned}
$$

Since LHS = RHS, we have shown that $\\overline{z_1 z_2} = \\overline{z_1} \\, \\overline{z_2}$.

</div>
</details>

##### (c) $\\overline{\\left(\\dfrac{z_1}{z_2}\\right)} = \\dfrac{\\overline{z_1}}{\\overline{z_2}}$
<details>
<summary>Click to view proof</summary>
<div>

**Left-Hand Side (LHS):**
First calculate $\\frac{z_1}{z_2}$:
$$
\\begin{aligned}
\\frac{z_1}{z_2} &= \\frac{3 - 2i}{-1 + 4i} \\cdot \\frac{-1 - 4i}{-1 - 4i} \\\\
&= \\frac{(3 - 2i)(-1 - 4i)}{(-1)^2 + 4^2} \\\\
&= \\frac{-3 - 12i + 2i + 8i^2}{1 + 16} \\\\
&= \\frac{-11 - 10i}{17} \\\\
&= -\\frac{11}{17} - \\frac{10}{17}i
\\end{aligned}
$$

Taking the conjugate:
$$
\\overline{\\left(\\frac{z_1}{z_2}\\right)} = \\overline{-\\frac{11}{17} - \\frac{10}{17}i} = -\\frac{11}{17} + \\frac{10}{17}i
$$

**Right-Hand Side (RHS):**
$$
\\begin{aligned}
\\frac{\\overline{z_1}}{\\overline{z_2}} &= \\frac{3 + 2i}{-1 - 4i} \\cdot \\frac{-1 + 4i}{-1 + 4i} \\\\
&= \\frac{(3 + 2i)(-1 + 4i)}{(-1)^2 + (-4)^2} \\\\
&= \\frac{-3 + 12i - 2i + 8i^2}{1 + 16} \\\\
&= \\frac{-11 + 10i}{17} \\\\
&= -\\frac{11}{17} + \\frac{10}{17}i
\\end{aligned}
$$

Since LHS = RHS, we have shown that $\\overline{\\left(\\dfrac{z_1}{z_2}\\right)} = \\dfrac{\\overline{z_1}}{\\overline{z_2}}$.

</div>
</details>
`;

export const MOCK_CHAPTERS: Chapter[] = [
  // Grade 10
  {
    id: 'ch-g10-1',
    grade_id: 10,
    chapter_number: 1,
    title: 'Sets and Functions',
    description: 'Basic operations on sets, Venn diagrams, and the concept of domain/range.',
    order_index: 1,
  },
  {
    id: 'ch-g10-2',
    grade_id: 10,
    chapter_number: 2,
    title: 'Polynomials',
    description: 'Division algorithm, remainder theorem, and factor theorem.',
    order_index: 2,
  },
  {
    id: 'ch-g10-3',
    grade_id: 10,
    chapter_number: 3,
    title: 'Equations and Inequalities',
    description: 'Solving linear, quadratic, and higher-order equations and inequalities.',
    order_index: 3,
  },
  
  // Grade 11
  {
    id: 'ch-g11-1',
    grade_id: 11,
    chapter_number: 1,
    title: 'Relations and Functions',
    description: 'Mathematical mapping, composition of functions, and inverse functions.',
    order_index: 1,
  },
  {
    id: 'ch-g11-2',
    grade_id: 11,
    chapter_number: 2,
    title: 'Sequence and Series',
    description: 'Arithmetic progressions (AP) and Geometric progressions (GP).',
    order_index: 2,
  },
  
  // Grade 12
  {
    id: 'chapter-c1-g12',
    grade_id: 12,
    chapter_number: 1,
    title: 'Complex Numbers',
    description: 'Introduction to imaginary numbers and the complex plane.',
    order_index: 1,
  },
  {
    id: 'chapter-c2-g12',
    grade_id: 12,
    chapter_number: 2,
    title: 'Mathematical Induction',
    description: 'Proving statements for all natural numbers.',
    order_index: 2,
  },
  {
    id: 'chapter-c3-g12',
    grade_id: 12,
    chapter_number: 3,
    title: 'Analytical Solid Geometry',
    description: 'The geometry of three-dimensional figures.',
    order_index: 3,
  },
  {
    id: 'chapter-c4-g12',
    grade_id: 12,
    chapter_number: 4,
    title: 'Vector Algebra',
    description: 'Operations and applications of vectors.',
    order_index: 4,
  },
  {
    id: 'chapter-c5-g12',
    grade_id: 12,
    chapter_number: 5,
    title: 'Permutations and Combinations',
    description: 'Counting principles and arrangements.',
    order_index: 5,
  }
];

export const MOCK_LESSONS: Lesson[] = [
  // Grade 10 - Sets & Functions (ch-g10-1)
  {
    id: 'lesson-g10-c1-1',
    chapter_id: 'ch-g10-1',
    title: 'Introduction to Sets',
    type: 'theory',
    content: `# Introduction to Sets (အစုများအကြောင်း မိတ်ဆက်)

ကွန်ပျူတာသိပ္ပံနှင့် အဆင့်မြင့်သင်္ချာနယ်ပယ်တွင် အစု (Set) ဟူသော အစုဝင်အယူအဆသည် အလွန်အရေးကြီးပါသည်။ ဂဏန်းများ သို့မဟုတ် အရာဝတ္ထုများကို စနစ်တကျ စုစည်းခြင်းကို အစုဟု ခေါ်သည်။

### 💡 Basic Terminology
- **Element (အစုဝင်)**: အစုတစ်ခုတွင် ပါဝင်သော အရာများကို အစုဝင်ဟု ခေါ်သည်။ $x \in A$ ဟု ရေးသားပါက $x$ သည် အစု $A$ ၏ အစုဝင် တစ်ခု ဖြစ်သည်။
- **Empty Set (ဗလာအစု)**: မည်သည့်အစုဝင်မှ မရှိသော အစုကို ဗလာအစုဟု ခေါ်ပြီး $\varnothing$ သို့မဟုတ် $\{\}$ ဟု သတ်မှတ်သည်။

### ⚖️ Set Operations
1. **Union (အစုပေါင်း)**: $A \cup B$ သည် $A$ နှင့် $B$ နှစ်ခုလုံး၏ အစုဝင်များ အားလုံး စုစည်းမှု ဖြစ်သည်။
2. **Intersection (အစုဘုံ)**: $A \cap B$ သည် $A$ နှင့် $B$ နှစ်ခုလုံးတွင် တူညီစွာ ပါဝင်သော အစုဝင်များ ဖြစ်သည်။`,
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-g10-c1-2',
    chapter_id: 'ch-g10-1',
    title: 'Exercise questions of Sets',
    type: 'exercise',
    content: `# Exercise on Set Operations

ဆရာနှင့် အတူတကွ တွက်ချက်ကြည့်ရအောင်။

### ✏️ Exercise Q1
If $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$, find:
1. $A \cup B$
2. $A \cap B$

#### 🔍 Solution:
1. $A \cup B = \{1, 2, 3, 4, 5, 6\}$
2. $A \cap B = \{3, 4\}$`,
    order_index: 2,
    created_at: new Date().toISOString()
  },

  // Grade 11 - Sequence and Series (ch-g11-2)
  {
    id: 'lesson-g11-c2-1',
    chapter_id: 'ch-g11-2',
    title: 'Arithmetic Progressions (AP)',
    type: 'theory',
    content: `# Arithmetic Progressions (AP)

အစဉ်လိုက်ရှိသော ကိန်းများ တစ်ခုနှင့် တစ်ခုအကြား ကွာခြားချက်သည် အမြဲတစေ တူညီနေပါက ၎င်းကို **Arithmetic Progression (AP)** ဟု ခေါ်သည်။

### formula
တစ်ကြိမ်တည်းနှင့် အလွယ်တကူ မှတ်မိနိုင်ရန်-

$$a_n = a + (n-1)d$$

* $a$ သည် ပထမဆုံးကိန်း (First Term)
* $d$ သည် ကွာခြားချက်ဘုံ (Common Difference)
* $n$ သည် term အရေအတွက်`,
    order_index: 1,
    created_at: new Date().toISOString()
  },

  // Grade 12 - Chapter 1 - Complex Numbers
  {
    id: 'lesson-c1-intro',
    chapter_id: 'chapter-c1-g12',
    title: 'Introduction',
    type: 'theory',
    content: chapter1IntroContent,
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-c1-basic',
    chapter_id: 'chapter-c1-g12',
    title: 'Pure Imaginary Unit 𝑖',
    type: 'theory',
    content: chapter1BasicContent,
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-c1-complex',
    chapter_id: 'chapter-c1-g12',
    title: 'Complex Numbers',
    type: 'theory',
    content: chapter1ComplexContent,
    order_index: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-c1-operations',
    chapter_id: 'chapter-c1-g12',
    title: 'Operations on Complex Numbers',
    type: 'theory',
    content: chapter1OperationsContent,
    order_index: 4,
    created_at: new Date().toISOString()
  },

  // Grade 12 - Chapter 2 - Mathematical Induction
  {
    id: 'lesson-g12-c2-1',
    chapter_id: 'chapter-c2-g12',
    title: 'Introduction to Mathematical Induction',
    type: 'theory',
    content: `# Introduction to Mathematical Induction

**Mathematical Induction (သင်္ချာစနစ်တကျ သက်သေပြခြင်း)** သည် သဘာဝကိန်းများ $n$ အားလုံးအတွက် ဖော်ပြချက်တစ်ခု မှန်ကန်ကြောင်း သက်သေပြရာတွင် သုံးသော အားကောင်းသည့် စနစ်တစ်ခု ဖြစ်သည်။

### 💡 The Domino Effect (ဒိုမီနို အကျိုးသက်ရောက်မှု)
၁။ ပထမဆုံး ဒိုမီနိုပြား လဲကျသည် ($n = 1$ အတွက် မှန်သည်)။
၂။ ပြားတစ်ခု လဲကျပါက နောက်တစ်ပြားလည်း လဲကျမည်ဖြစ်ကြောင်း သက်သေပြသည် ($k$ အတွက်မှန်က $k+1$ အတွက်လည်း မှန်သည်)။

 can be broken down into two main steps:
- **Base Step**: $P(1)$ မှန်ကန်ကြောင်း ပြသပါမည်။
- **Inductive Step**: $P(k)$ မှန်ပါက $P(k+1)$ လည်း မှန်ကန်ကြောင်း ဆက်လက်ပြသပါမည်။`,
    order_index: 1,
    created_at: new Date().toISOString()
  }
];
