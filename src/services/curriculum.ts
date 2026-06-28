import { supabase } from '../lib/supabase';
import { Chapter, Lesson } from '../types';

const hasKeys = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
let useDatabase = hasKeys;

function getMockChapterId(gradeId: string | number, chapterNumber: number): string {
  const g = Number(gradeId);
  if (g === 10) return `ch-g10-${chapterNumber}`;
  if (g === 11) return `ch-g11-${chapterNumber}`;
  if (g === 12) return `chapter-c${chapterNumber}-g12`;
  return '';
}

/**
 * Service for managing curriculum data
 */
export const curriculumService = {
  /**
   * Fetches chapters for a specific grade level
   */
  async getChaptersByGrade(gradeId: string | number): Promise<Chapter[]> {
    if (useDatabase) {
      try {
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .eq('grade_id', gradeId)
          .order('chapter_number', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase chapter fetch failed or table is empty. Falling back to offline curriculum mock data.', err);
        useDatabase = false; // Disable database queries dynamically to prevent further errors
      }
    }

    // Fallback to mock chapters
    return MOCK_CHAPTERS.filter(c => c.grade_id.toString() === gradeId.toString());
  },

  /**
   * Fetches a single chapter by ID
   */
  async getChapterById(chapterId: string): Promise<Chapter | null> {
    if (useDatabase) {
      try {
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .eq('id', chapterId)
          .single();

        if (error) throw error;
        if (data) return data;
      } catch (error) {
        console.warn('Supabase fetch failed for chapter. Falling back to offline mock.', error);
        useDatabase = false;
      }
    }

    return MOCK_CHAPTERS.find(c => c.id === chapterId) || null;
  },

  /**
   * Fetches all lessons for all chapters in a specific grade level
   */
  async getAllLessonsByGrade(gradeId: string | number): Promise<Lesson[]> {
    const chapters = await this.getChaptersByGrade(gradeId);
    
    let dbLessons: Lesson[] = [];

    if (useDatabase) {
      try {
        const chapterIds = chapters.map(c => c.id);
        if (chapterIds.length > 0) {
          const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .in('chapter_id', chapterIds)
            .order('order_index', { ascending: true });

          if (error) throw error;
          dbLessons = (data || []).filter(l => l.title !== 'Introduction to i');
        }
      } catch (error) {
        console.warn('Supabase fetch failed for lessons. Falling back to offline mock.', error);
        useDatabase = false;
      }
    }

    const lessonsToReturn: Lesson[] = [];

    // Map mock chapter IDs (e.g. 'chapter-c1-g12') to DB chapter UUIDs
    const mockToDbIdMap = new Map<string, string>();
    chapters.forEach(c => {
      const mockId = getMockChapterId(c.grade_id, c.chapter_number);
      if (mockId) {
        mockToDbIdMap.set(mockId, c.id);
      }
    });

    // 1. Add DB lessons
    dbLessons.forEach(l => {
      lessonsToReturn.push(l);
    });

    // 2. Add mock lessons, mapping their chapter_id to the DB chapter UUID so they are linked correctly
    const existingTitlesByChapter = new Set(dbLessons.map(l => `${l.chapter_id}::${l.title.toLowerCase()}`));

    MOCK_LESSONS.forEach(l => {
      const dbChapterId = mockToDbIdMap.get(l.chapter_id);
      if (dbChapterId) {
        const uniqueKey = `${dbChapterId}::${l.title.toLowerCase()}`;
        if (!existingTitlesByChapter.has(uniqueKey)) {
          lessonsToReturn.push({
            ...l,
            chapter_id: dbChapterId
          });
        }
      }
    });

    lessonsToReturn.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    return lessonsToReturn;
  },

  /**
   * Fetches lessons for a specific chapter
   */
  async getLessonsByChapter(chapterId: string): Promise<Lesson[]> {
    let dbLessons: Lesson[] = [];
    let currentChapter: Chapter | null = null;

    if (useDatabase) {
      try {
        // Fetch current chapter info to map to mock lessons
        const { data: chData } = await supabase
          .from('chapters')
          .select('*')
          .eq('id', chapterId)
          .single();
        if (chData) {
          currentChapter = chData;
        }

        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('chapter_id', chapterId)
          .order('order_index', { ascending: true });

        if (error) throw error;
        dbLessons = (data || []).filter(l => l.title !== 'Introduction to i');
      } catch (error) {
        console.warn('Supabase fetch failed for chapter lessons. Falling back to offline mock.', error);
        useDatabase = false;
      }
    }

    if (!currentChapter) {
      currentChapter = MOCK_CHAPTERS.find(c => c.id === chapterId) || null;
    }

    const lessonsToReturn: Lesson[] = [...dbLessons];
    const existingTitles = new Set(dbLessons.map(l => l.title.toLowerCase()));

    if (currentChapter) {
      const mockChId = getMockChapterId(currentChapter.grade_id, currentChapter.chapter_number);
      if (mockChId) {
        const mockLessons = MOCK_LESSONS.filter(l => l.chapter_id === mockChId);
        mockLessons.forEach(l => {
          if (!existingTitles.has(l.title.toLowerCase())) {
            lessonsToReturn.push({
              ...l,
              chapter_id: chapterId
            });
          }
        });
      }
    }

    lessonsToReturn.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    return lessonsToReturn;
  },

  /**
   * Fetches a single lesson by ID
   */
  async getLessonById(lessonId: string): Promise<Lesson | null> {
    if (useDatabase) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

        if (error) throw error;
        if (data) {
          if (data.title === 'Introduction to i') {
            return null;
          }
          return data;
        }
      } catch (error) {
        console.warn('Supabase fetch failed for lesson. Falling back to offline mock.', error);
        useDatabase = false;
      }
    }

    const mockLesson = MOCK_LESSONS.find(l => l.id === lessonId);
    if (mockLesson) {
      if (hasKeys) {
        try {
          const mockCh = MOCK_CHAPTERS.find(c => c.id === mockLesson.chapter_id);
          if (mockCh) {
            const { data: dbCh } = await supabase
              .from('chapters')
              .select('id')
              .eq('grade_id', mockCh.grade_id)
              .eq('chapter_number', mockCh.chapter_number)
              .single();
            if (dbCh) {
              return {
                ...mockLesson,
                chapter_id: dbCh.id
              };
            }
          }
        } catch (e) {
          console.error("Error mapping mock lesson's chapter_id to DB UUID:", e);
        }
      }
      return mockLesson;
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
  \\text{Therefore, } x &= 5, \\\quad y=2
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
  \\text{Therefore, } x &= 5, \\\quad y=2
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
  "title": "Pure Imaginary Unit i",
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
  x &= 1+\\sqrt{3}\\,i \\\quad \\text{or} \\\quad x=1-\\sqrt{3}\\,i
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
  x &= 2+i \\\quad \\text{or} \\\quad x=2-i
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
  "content": "Any four consecutive powers of $i$ always have a sum of $0$.\\n\\nFor example:\\n* $i^0+i^1+i^2+i^3 = 1+i-1-i = 0$\\n* $i^1+i^2+i^3+i^4 = i-1-i+1 = 0$\\n* $i^2+i^3+i^4+i^5 = -1-i+1+i = 0$"
}
\`\`\`
`;

const chapter1OperationsContent = `## 1.3 Operations on Complex Numbers

\`\`\`note
{
  "type": "info",
  "title": "Division of Complex Numbers",
  "content": "Addition, subtraction, and multiplication have already been studied. In this section, we only focus on the **division** of complex numbers.\\n\\nTo divide by a complex number, multiply both the numerator and the denominator by the **conjugate** of the denominator."
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
\\end{aligned}
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

const chapter1TrigonometricContent = `## 1.4 Trigonometric Form

<div class="flex flex-col md:flex-row gap-6 items-center my-8 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
  <div class="flex-1 text-slate-700">
    <h4 class="text-sm font-black uppercase text-blue-600 tracking-wider mb-2">From Cartesian Form to Trigonometric Form</h4>
    <p class="text-sm leading-relaxed mb-4">
      A non-zero complex number $z = x + yi$ can be represented by a point $P(x, y)$ on the complex plane. 
      Let $r$ be the distance from the origin $O$ to $P$ and let $\\theta$ be the angle made with the positive real axis. Then:
    </p>
    $$
    \\begin{aligned}
      r &= |z| = \\sqrt{x^2 + y^2}, \\\\
      \\cos\\theta &= \\frac{x}{r} \\quad \\text{and} \\quad \\sin\\theta = \\frac{y}{r}.
    \\end{aligned}
    $$
    <p class="text-sm leading-relaxed mt-4 mb-4">
      Since $x = r\\cos\\theta$ and $y = r\\sin\\theta$, we get:
    </p>
    <div class="p-3 bg-white border border-slate-200 rounded-xl text-center font-bold text-lg my-3">
      $$z = x + yi = r(\\cos\\theta + i\\sin\\theta)$$
    </div>
    <p class="text-xs text-slate-500 mt-2">
      This is called the <strong>trigonometric form</strong> or <strong>polar form</strong> of $z$.
    </p>
  </div>
  <div class="w-full max-w-[280px] aspect-square bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-center shadow-xs">
    <svg viewBox="0 0 240 240" class="w-full h-full overflow-visible">
      <line x1="20" y1="180" x2="220" y2="180" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"></line>
      <line x1="60" y1="20" x2="60" y2="220" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"></line>
      <line x1="10" y1="180" x2="230" y2="180" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"></line>
      <line x1="60" y1="230" x2="60" y2="15" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"></line>
      <line x1="60" y1="180" x2="180" y2="60" stroke="#2563eb" stroke-width="2.5" marker-end="url(#blue-arrow)"></line>
      <line x1="180" y1="60" x2="180" y2="180" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"></line>
      <line x1="60" y1="60" x2="180" y2="60" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"></line>
      <path d="M 85 180 A 25 25 0 0 0 77.7 162.3" fill="none" stroke="#f59e0b" stroke-width="2"></path>
      <circle cx="180" cy="60" r="5" fill="#2563eb"></circle>
      <text x="225" y="195" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end">Re (x)</text>
      <text x="75" y="25" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b">Im (y)</text>
      <text x="185" y="52" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e293b">P(x, y)</text>
      <text x="110" y="112" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">r</text>
      <text x="92" y="172" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f59e0b">\\theta</text>
      <text x="120" y="195" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">x = r cos \\theta</text>
      <text x="48" y="120" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="end" transform="rotate(-90 48 120)">y = r sin \\theta</text>
      <text x="48" y="195" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end">O</text>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b"></path>
        </marker>
        <marker id="blue-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"></path>
        </marker>
      </defs>
    </svg>
  </div>
</div>

<div class="my-6 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
  <h4 class="font-bold text-blue-800 mb-2">Modulus and Argument</h4>
  <p class="text-sm text-slate-700 leading-relaxed">
    In $z = r(\\cos\\theta + i\\sin\\theta)$:
  </p>
  <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
    <li><strong>Modulus:</strong> $r = |z|$ is the absolute value or modulus of $z$.</li>
    <li><strong>Argument:</strong> $\\theta$ is an argument of $z$.</li>
    <li><strong>Principal Argument:</strong> For the principal argument, we restrict $\\theta$ such that $-\\pi < \\theta \\le \\pi$.</li>
  </ul>
  <p class="text-xs text-slate-500 mt-2 font-mono">
    Note: All angles $\\theta + 2\\pi k$ where $k \\in \\mathbb{Z}$ represent the same complex number.
  </p>
</div>

### Example 5
Find the trigonometric form of the following complex numbers with $-\\pi < \\theta \\le \\pi$:
(a) $z = 1 + \\sqrt{3}i$
(b) $z = -1 + i$
(c) $z = -\\sqrt{3} - i$
(d) $z = -1$

#### Solution

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">

  <!-- (a) -->
  <div class="p-5 bg-white border border-slate-150 rounded-2xl flex flex-col justify-between">
    <div>
      <h5 class="font-bold text-slate-800 mb-2">(a) $z = 1 + \\sqrt{3}i$</h5>
      <p class="text-sm text-slate-600 mb-3">
        The point is $(1, \\sqrt{3})$ in <strong>Quadrant I</strong>:
      </p>
      $$
      \\begin{aligned}
        r &= \\sqrt{1^2 + (\\sqrt{3})^2} = 2 \\\\
        \\cos\\theta &= \\frac{1}{2}, \\\quad \\sin\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3}
      \\end{aligned}
      $$
      <p class="text-sm text-slate-600 mt-3">
        Trigonometric Form:
      </p>
      <p class="font-mono text-blue-600 text-sm font-bold bg-blue-50 p-2 rounded-lg text-center my-2">
        $z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$
      </p>
    </div>
    <div class="aspect-square w-32 self-center mt-4">
      <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
        <line x1="10" y1="100" x2="110" y2="100" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="30" y1="110" x2="30" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="30" y1="100" x2="80" y2="30" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
        <circle cx="80" cy="30" r="2.5" fill="#2563eb"></circle>
        <path d="M 45 100 A 15 15 0 0 0 37.5 87" fill="none" stroke="#f59e0b" stroke-width="1"></path>
        <text x="112" y="103" font-size="7" font-weight="bold" fill="#64748b">Re</text>
        <text x="34" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
        <text x="84" y="27" font-size="7" font-weight="bold" fill="#1e293b">P(1, √3)</text>
        <text x="44" y="93" font-size="7" font-weight="bold" fill="#f59e0b">\\pi/3</text>
      </svg>
    </div>
  </div>

  <!-- (b) -->
  <div class="p-5 bg-white border border-slate-150 rounded-2xl flex flex-col justify-between">
    <div>
      <h5 class="font-bold text-slate-800 mb-2">(b) $z = -1 + i$</h5>
      <p class="text-sm text-slate-600 mb-3">
        The point is $(-1, 1)$ in <strong>Quadrant II</strong>:
      </p>
      $$
      \\begin{aligned}
        r &= \\sqrt{(-1)^2 + 1^2} = \\sqrt{2} \\\\
        \\cos\\theta &= -\\frac{\\sqrt{2}}{2}, \\\quad \\sin\\theta = \\frac{\\sqrt{2}}{2} \\implies \\theta = \\frac{3\\pi}{4}
      \\end{aligned}
      $$
      <p class="text-sm text-slate-600 mt-3">
        Trigonometric Form:
      </p>
      <p class="font-mono text-blue-600 text-sm font-bold bg-blue-50 p-2 rounded-lg text-center my-2">
        $z = \\sqrt{2}\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$
      </p>
    </div>
    <div class="aspect-square w-32 self-center mt-4">
      <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
        <line x1="10" y1="100" x2="110" y2="100" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="70" y1="110" x2="70" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="70" y1="100" x2="35" y2="65" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
        <circle cx="35" cy="65" r="2.5" fill="#2563eb"></circle>
        <path d="M 85 100 A 15 15 0 0 0 59.4 89.4" fill="none" stroke="#f59e0b" stroke-width="1"></path>
        <text x="112" y="103" font-size="7" font-weight="bold" fill="#64748b">Re</text>
        <text x="74" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
        <text x="12" y="61" font-size="7" font-weight="bold" fill="#1e293b">P(-1, 1)</text>
        <text x="76" y="90" font-size="7" font-weight="bold" fill="#f59e0b">3\\pi/4</text>
      </svg>
    </div>
  </div>

  <!-- (c) -->
  <div class="p-5 bg-white border border-slate-150 rounded-2xl flex flex-col justify-between">
    <div>
      <h5 class="font-bold text-slate-800 mb-2">(c) $z = -\\sqrt{3} - i$</h5>
      <p class="text-sm text-slate-600 mb-3">
        The point is $(-\\sqrt{3}, -1)$ in <strong>Quadrant III</strong>:
      </p>
      $$
      \\begin{aligned}
        r &= \\sqrt{(-\\sqrt{3})^2 + (-1)^2} = 2 \\\\
        \\cos\\theta &= -\\frac{\\sqrt{3}}{2}, \\\quad \\sin\\theta = -\\frac{1}{2} \\implies \\theta = -\\frac{5\\pi}{6}
      \\end{aligned}
      $$
      <p class="text-sm text-slate-600 mt-3">
        Trigonometric Form:
      </p>
      <p class="font-mono text-blue-600 text-sm font-bold bg-blue-50 p-2 rounded-lg text-center my-2">
        $z = 2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i\\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)$
      </p>
    </div>
    <div class="aspect-square w-32 self-center mt-4">
      <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
        <line x1="10" y1="50" x2="110" y2="50" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="80" y1="110" x2="80" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="80" y1="50" x2="30" y2="79" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
        <circle cx="30" cy="79" r="2.5" fill="#2563eb"></circle>
        <path d="M 95 50 A 15 15 0 0 1 67 57.5" fill="none" stroke="#f59e0b" stroke-width="1"></path>
        <text x="112" y="53" font-size="7" font-weight="bold" fill="#64748b">Re</text>
        <text x="84" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
        <text x="10" y="88" font-size="7" font-weight="bold" fill="#1e293b">P(-√3, -1)</text>
        <text x="85" y="65" font-size="7" font-weight="bold" fill="#f59e0b">-5\\pi/6</text>
      </svg>
    </div>
  </div>

  <!-- (d) -->
  <div class="p-5 bg-white border border-slate-150 rounded-2xl flex flex-col justify-between">
    <div>
      <h5 class="font-bold text-slate-800 mb-2">(d) $z = -1$</h5>
      <p class="text-sm text-slate-600 mb-3">
        The point is $(-1, 0)$ on the <strong>Negative Real Axis</strong>:
      </p>
      $$
      \\begin{aligned}
        r &= \\sqrt{(-1)^2 + 0^2} = 1 \\\\
        \\cos\\theta &= -1, \\\quad \\sin\\theta = 0 \\implies \\theta = \\pi
      \\end{aligned}
      $$
      <p class="text-sm text-slate-600 mt-3">
        Trigonometric Form:
      </p>
      <p class="font-mono text-blue-600 text-sm font-bold bg-blue-50 p-2 rounded-lg text-center my-2">
        $z = 1(\\cos\\pi + i\\sin\\pi)$
      </p>
    </div>
    <div class="aspect-square w-32 self-center mt-4">
      <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
        <line x1="10" y1="60" x2="110" y2="60" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="80" y1="110" x2="80" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
        <line x1="80" y1="60" x2="30" y2="60" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
        <circle cx="30" cy="60" r="2.5" fill="#2563eb"></circle>
        <path d="M 95 60 A 15 15 0 0 0 65 60" fill="none" stroke="#f59e0b" stroke-width="1"></path>
        <text x="112" y="63" font-size="7" font-weight="bold" fill="#64748b">Re</text>
        <text x="84" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
        <text x="12" y="52" font-size="7" font-weight="bold" fill="#1e293b">P(-1, 0)</text>
        <text x="65" y="50" font-size="7" font-weight="bold" fill="#f59e0b">\\pi</text>
        <defs>
          <marker id="arrow-small" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b"></path>
          </marker>
          <marker id="blue-arrow-small" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"></path>
          </marker>
        </defs>
      </svg>
    </div>
  </div>

</div>

---

### Product in Trigonometric Form

<div class="my-6 p-5 bg-emerald-50 border border-emerald-150 rounded-2xl">
  <h4 class="font-bold text-emerald-800 mb-2">Product Rule</h4>
  <p class="text-sm text-slate-700 leading-relaxed mb-3">
    Let $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$ and $z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$. Then:
  </p>
  $$
  \\begin{aligned}
    z_1z_2 &= r_1(\\cos\\theta_1 + i\\sin\\theta_1) \\cdot r_2(\\cos\\theta_2 + i\\sin\\theta_2) \\\\
    &= r_1r_2 \\bigl[ (\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2) + i(\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2) \\bigr] \\\\
    &= r_1r_2 \\bigl[ \\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2) \\bigr]
  \\end{aligned}
  $$
  <p class="text-sm text-slate-700 leading-relaxed mt-3 font-semibold">
    Multiplying two complex numbers in polar form multiplies their moduli and adds their arguments:
  </p>
  <div class="p-3 bg-white border border-emerald-100 rounded-xl text-center font-bold text-base my-2">
    $$z_1z_2 = r_1r_2 \\bigl[ \\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2) \\bigr]$$
  </div>
</div>

### Example 6
Given $z_1 = 1 + \\sqrt{3}i$ and $z_2 = -1 + i$, find $z_1z_2$ using trigonometric forms. Check your answer by direct multiplication.

#### Solution
From Example 5, we have:
$$z_1 = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right), \\\quad z_2 = \\sqrt{2}\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$$

Applying the product rule:
$$
\\begin{aligned}
  z_1z_2 &= 2\\sqrt{2} \\left[ \\cos\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right) + i\\sin\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right) \\right] \\\\
  &= 2\\sqrt{2} \\left[ \\cos\\frac{13\\pi}{12} + i\\sin\\frac{13\\pi}{12} \\right]
\\end{aligned}
$$

Since $\\frac{13\\pi}{12} > \\pi$, we write the principal argument as $\\frac{13\\pi}{12} - 2\\pi = -\\frac{11\\pi}{12}$:
$$z_1z_2 = 2\\sqrt{2} \\left[ \\cos\\left(-\\frac{11\\pi}{12}\\right) + i\\sin\\left(-\\frac{11\\pi}{12}\\right) \\right]$$

To convert back to cartesian form, we note that:
$$
\\cos\\left(-\\frac{11\\pi}{12}\\right) = -\\frac{\\sqrt{6}+\\sqrt{2}}{4}, \\\quad \\sin\\left(-\\frac{11\\pi}{12}\\right) = \\frac{\\sqrt{2}-\\sqrt{6}}{4}
$$
$$
\\begin{aligned}
  z_1z_2 &= 2\\sqrt{2} \\left( -\\frac{\\sqrt{6}+\\sqrt{2}}{4} + i \\frac{\\sqrt{2}-\\sqrt{6}}{4} \\right) \\\\
  &= -(1+\\sqrt{3}) + (1-\\sqrt{3})i
\\end{aligned}
$$

**Check by Direct Multiplication:**
$$
\\begin{aligned}
  z_1z_2 &= (1 + \\sqrt{3}i)(-1 + i) \\\\
  &= -1 + i - \\sqrt{3}i + \\sqrt{3}i^2 \\\\
  &= -(1+\\sqrt{3}) + (1-\\sqrt{3})i \\\quad \\checkmark
\\end{aligned}
$$

---

### Multiplicative Inverse in Trigonometric Form

<div class="my-6 p-5 bg-amber-50 border border-amber-150 rounded-2xl">
  <h4 class="font-bold text-amber-800 mb-2">Multiplicative Inverse Rule</h4>
  <p class="text-sm text-slate-700 leading-relaxed mb-3">
    Let $z = x+yi \\ne 0$ be represented as $z = r(\\cos\\theta + i\\sin\\theta)$. Since $z^{-1} = \\frac{1}{x^2+y^2}(x-yi)$:
  </p>
  $$
  \\begin{aligned}
    z^{-1} &= \\frac{1}{r^2}(r\\cos\\theta - ir\\sin\\theta) \\\\
    &= \\frac{1}{r}(\\cos\\theta - i\\sin\\theta) \\\\
    &= \\frac{1}{r}\\bigl( \\cos(-\\theta) + i\\sin(-\\theta) \\bigr)
  \\end{aligned}
  $$
  <div class="p-3 bg-white border border-amber-100 rounded-xl text-center font-bold text-base my-2">
    $$z^{-1} = \\frac{1}{r}\\bigl( \\cos(-\\theta) + i\\sin(-\\theta) \\bigr)$$
  </div>
</div>

### Example 7
Given $z = -\\sqrt{3} - i$, using the trigonometric form of $z$, find $z^{-1}$. Check your answer by showing that $zz^{-1} = 1$.

#### Solution
From Example 5, we have:
$$z = 2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i\\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)$$

Applying the multiplicative inverse rule:
$$
\\begin{aligned}
  z^{-1} &= \\frac{1}{2} \\left[ \\cos\\left(-\\left(-\frac{5\\pi}{6}\\right)\\right) + i\\sin\\left(-\\left(-\frac{5\\pi}{6}\\right)\\right) \\right] \\\\
  &= \\frac{1}{2} \\left[ \\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6} \\right] \\\\
  &= \\frac{1}{2} \\left( -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i \\right) = -\\frac{\\sqrt{3}}{4} + \\frac{1}{4}i
\\end{aligned}
$$

**Check:**
$$
\\begin{aligned}
  zz^{-1} &= (-\\sqrt{3} - i)\\left(-\\frac{\\sqrt{3}}{4} + \\frac{1}{4}i\\right) \\\\
  &= \\frac{3}{4} - \\frac{\\sqrt{3}}{4}i + \\frac{\\sqrt{3}}{4}i - \\frac{1}{4}i^2 \\\\
  &= \\frac{3}{4} + \\frac{1}{4} = 1 \\\quad \\checkmark
\\end{aligned}
$$
<p class="text-xs text-slate-500 italic mt-1">
  Since $zz^{-1} = 1$, the multiplicative inverse of $z$ is $z^{-1}$. ($zz^{-1} = 1$ ဖြစ်သောကြောင့် $z$ ၏ multiplicative inverse သည် $z^{-1}$ ဖြစ်သည်။)
</p>

---

### Division in Trigonometric Form

<div class="my-6 p-5 bg-cyan-50 border border-cyan-150 rounded-2xl">
  <h4 class="font-bold text-cyan-800 mb-2">Division Rule</h4>
  <p class="text-sm text-slate-700 leading-relaxed mb-3">
    Let $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$ and $z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$ where $z_2 \\ne 0$. Then:
  </p>
  $$
  \\begin{aligned}
    \\frac{z_1}{z_2} &= z_1 z_2^{-1} \\\\
    &= r_1(\\cos\\theta_1 + i\\sin\\theta_1) \\cdot \\frac{1}{r_2}\\bigl[ \\cos(-\\theta_2) + i\\sin(-\\theta_2) \\bigr] \\\\
    &= \\frac{r_1}{r_2}\\bigl[ \\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2) \\bigr]
  \\end{aligned}
  $$
  <div class="p-3 bg-white border border-cyan-100 rounded-xl text-center font-bold text-base my-2">
    $$\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\bigl[ \\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2) \\bigr], \\\quad z_2 \\ne 0$$
  </div>
</div>

### Example 8
Given $z_1 = 1 + \\sqrt{3}i$ and $z_2 = -1 + i$, find $\\frac{z_1}{z_2}$ using trigonometric forms. Check your answer by direct calculation.

#### Solution
Applying the division rule:
$$
\\begin{aligned}
  \\frac{z_1}{z_2} &= \\frac{2}{\\sqrt{2}}\\left[ \\cos\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\right) + i\\sin\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\right) \\right] \\\\
  &= \\sqrt{2}\\left[ \\cos\\left(-\\frac{5\\pi}{12}\\right) + i\\sin\\left(-\\frac{5\\pi}{12}\\right) \\right]
\\end{aligned}
$$

Using trigonometric identities:
$$
\\cos\\left(-\\frac{5\\pi}{12}\\right) = \\frac{\\sqrt{6}-\\sqrt{2}}{4}, \\quad \\sin\\left(-\\frac{5\\pi}{12}\\right) = -\\frac{\\sqrt{6}+\\sqrt{2}}{4}
$$
$$
\\begin{aligned}
  \\frac{z_1}{z_2} &= \\sqrt{2}\\left( \\frac{\\sqrt{6}-\\sqrt{2}}{4} - i \\frac{\\sqrt{6}+\\sqrt{2}}{4} \\right) \\\\
  &= \\frac{\\sqrt{3}-1}{2} - \\frac{\\sqrt{3}+1}{2}i
\\end{aligned}
$$

**Check by Direct Calculation:**
$$
\\begin{aligned}
  \\frac{z_1}{z_2} &= \\frac{1 + \\sqrt{3}i}{-1 + i} = \\frac{(1 + \\sqrt{3}i)(-1 - i)}{(-1 + i)(-1 - i)} \\\\
  &= \\frac{-1 - i - \\sqrt{3}i + \\sqrt{3}}{2} \\\\
  &= \\frac{\\sqrt{3}-1}{2} - \\frac{\\sqrt{3}+1}{2}i \\\quad \\checkmark
\\end{aligned}
$$

---

### Powers of Complex Numbers (De Moivre's Formula)

<div class="my-6 p-5 bg-indigo-50 border border-indigo-150 rounded-2xl">
  <h4 class="font-bold text-indigo-800 mb-2">De Moivre's Theorem</h4>
  <p class="text-sm text-slate-700 leading-relaxed mb-3">
    Let $z = r(\\cos\\theta + i\\sin\\theta)$. For any positive integer $n$:
  </p>
  <div class="p-3 bg-white border border-indigo-100 rounded-xl text-center font-bold text-base my-2">
    $$z^n = r^n(\\cos n\\theta + i\\sin n\\theta), \\quad n \\in \\mathbb{N}$$
  </div>
  <p class="text-sm text-slate-700 leading-relaxed mt-2">
    The modulus is raised to the $n$-th power and the argument is multiplied by $n$.
  </p>
</div>

### Example 9
Given $z = 1 + \\sqrt{3}i$, find (a) $z^{10}$ and (b) $z^{-10}$.

#### Solution
Trigonometric form of $z$: $z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$.

**(a) $z^{10}$:**
$$
\\begin{aligned}
  z^{10} &= 2^{10}\\left( \\cos\\frac{10\\pi}{3} + i\\sin\\frac{10\\pi}{3} \\right)
\\end{aligned}
$$
Since $\\frac{10\\pi}{3} = 2\\pi + \\frac{4\\pi}{3} \\equiv \\frac{4\\pi}{3} \\equiv -\\frac{2\\pi}{3}$:
$$
\\begin{aligned}
  z^{10} &= 1024\\left( \\cos\\left(-\\frac{2\\pi}{3}\\right) + i\\sin\\left(-\\frac{2\\pi}{3}\\right)\\right) \\\\
  &= 1024\\left( -\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i \\right) \\\\
  &= -512 - 512\\sqrt{3}i
\\end{aligned}
$$

**(b) $z^{-10}$:**
$$
\\begin{aligned}
  z^{-10} &= 2^{-10}\\left( \\cos\\left(-\\frac{10\\pi}{3}\\right) + i\\sin\\left(-\\frac{10\\pi}{3}\\right) \\right) \\\\
  &= \\frac{1}{1024}\\left( \\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3} \\right) \\\\
  &= \\frac{1}{1024}\\left( -\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i \\right) \\\\
  &= -\\frac{1}{2048} + \\frac{\\sqrt{3}}{2048}i
\\end{aligned}
$$

---

<div class="my-8 p-6 bg-slate-100 border border-slate-200 rounded-3xl">
  <h3 class="text-xl font-extrabold text-slate-800 mb-4">Exercise 1.4</h3>
  
  <div class="space-y-4">
    <div>
      <p class="font-bold text-slate-700">1. Find the trigonometric form with $-\\pi < \\theta \\le \\pi$ of:</p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3 pl-4 mt-2 font-mono text-sm text-slate-800">
        <div>(a) $z = 1 - \\sqrt{3}i$</div>
        <div>(b) $z = -\\sqrt{2} + \\sqrt{2}i$</div>
        <div>(c) $z = -2 - 2i$</div>
        <div>(d) $z = \\sqrt{3} - i$</div>
        <div>(e) $z = i$</div>
        <div>(f) $z = -3i$</div>
      </div>
    </div>

    <div>
      <p class="font-bold text-slate-700">2. Given $z_1 = 2 - 2\\sqrt{3}i$ and $z_2 = -1 - i$, find the following using trigonometric forms. Check your answers by direct calculation.</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pl-4 mt-2 font-mono text-sm text-slate-800">
        <div>(a) $z_1z_2$</div>
        <div>(b) $z_1^{-1}$</div>
        <div>(c) $\\dfrac{z_1}{z_2}$</div>
        <div>(d) $\\dfrac{z_2}{z_1}$</div>
      </div>
    </div>

    <div>
      <p class="font-bold text-slate-700">3. Given $z = -2\\sqrt{3} - 2i$, find:</p>
      <div class="grid grid-cols-2 gap-3 pl-4 mt-2 font-mono text-sm text-slate-800">
        <div>(a) $z^5$</div>
        <div>(b) $z^{-5}$</div>
      </div>
    </div>
  </div>
</div>

### Detailed Solutions and Visualizations

<details class="group bg-white border border-slate-200 rounded-2xl p-5 my-4">
  <summary class="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none">
    <span>Solutions to Exercise 1.4 - Question 1 (Trigonometric Forms with Plots)</span>
    <span class="transition-transform group-open:rotate-180">
      <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </summary>
  <div class="mt-4 space-y-8 divide-y divide-slate-100 text-slate-700">

    <!-- 1(a) -->
    <div class="pt-4 flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h5 class="font-bold text-slate-800 mb-2">(a) $z = 1 - \\sqrt{3}i$</h5>
        <p class="text-sm text-slate-600 mb-2">
          The point is $(1, -\\sqrt{3})$ in <strong>Quadrant IV</strong>:
        </p>
        $$
        \\begin{aligned}
          r &= \\sqrt{1^2 + (-\\sqrt{3})^2} = 2 \\\\
          \\cos\\theta &= \\frac{1}{2}, \\\quad \\sin\\theta = -\\frac{\\sqrt{3}}{2} \\implies \\theta = -\\frac{\\pi}{3}
        \\end{aligned}
        $$
        <p class="text-sm font-semibold mt-2 text-blue-600">
          $z = 2\\left[\\cos\\left(-\\frac{\\pi}{3}\\right) + i\\sin\\left(-\\frac{\\pi}{3}\\right)\\right]$
        </p>
      </div>
      <div class="w-32 aspect-square flex items-center justify-center bg-slate-50 rounded-xl p-2">
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <line x1="10" y1="40" x2="110" y2="40" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="40" y1="110" x2="40" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="40" y1="40" x2="80" y2="100" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
          <circle cx="80" cy="100" r="2.5" fill="#2563eb"></circle>
          <path d="M 55 40 A 15 15 0 0 1 47.5 53" fill="none" stroke="#f59e0b" stroke-width="1"></path>
          <text x="112" y="43" font-size="7" font-weight="bold" fill="#64748b">Re</text>
          <text x="44" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
          <text x="84" y="103" font-size="7" font-weight="bold" fill="#1e293b">(1, -√3)</text>
          <text x="49" y="52" font-size="7" font-weight="bold" fill="#f59e0b">-\\pi/3</text>
        </svg>
      </div>
    </div>

    <!-- 1(b) -->
    <div class="pt-6 flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h5 class="font-bold text-slate-800 mb-2">(b) $z = -\\sqrt{2} + \\sqrt{2}i$</h5>
        <p class="text-sm text-slate-600 mb-2">
          The point is $(-\\sqrt{2}, \\sqrt{2})$ in <strong>Quadrant II</strong>:
        </p>
        $$
        \\begin{aligned}
          r &= \\sqrt{(-\\sqrt{2})^2 + (\\sqrt{2})^2} = 2 \\\\
          \\cos\\theta &= -\\frac{\\sqrt{2}}{2}, \\\quad \\sin\\theta = \\frac{\\sqrt{2}}{2} \\implies \\theta = \\frac{3\\pi}{4}
        \\end{aligned}
        $$
        <p class="text-sm font-semibold mt-2 text-blue-600">
          $z = 2\\left[\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right]$
        </p>
      </div>
      <div class="w-32 aspect-square flex items-center justify-center bg-slate-50 rounded-xl p-2">
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <line x1="10" y1="80" x2="110" y2="80" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="80" y1="110" x2="80" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="80" y1="80" x2="38" y2="38" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
          <circle cx="38" cy="38" r="2.5" fill="#2563eb"></circle>
          <path d="M 95 80 A 15 15 0 0 0 69.4 69.4" fill="none" stroke="#f59e0b" stroke-width="1"></path>
          <text x="112" y="83" font-size="7" font-weight="bold" fill="#64748b">Re</text>
          <text x="84" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
          <text x="15" y="34" font-size="7" font-weight="bold" fill="#1e293b">(-√2, √2)</text>
          <text x="86" y="70" font-size="7" font-weight="bold" fill="#f59e0b">3\\pi/4</text>
        </svg>
      </div>
    </div>

    <!-- 1(c) -->
    <div class="pt-6 flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h5 class="font-bold text-slate-800 mb-2">(c) $z = -2 - 2i$</h5>
        <p class="text-sm text-slate-600 mb-2">
          The point is $(-2, -2)$ in <strong>Quadrant III</strong>:
        </p>
        $$
        \\begin{aligned}
          r &= \\sqrt{(-2)^2 + (-2)^2} = 2\\sqrt{2} \\\\
          \\cos\\theta &= -\\frac{\\sqrt{2}}{2}, \\\quad \\sin\\theta = -\\frac{\\sqrt{2}}{2} \\implies \\theta = -\\frac{3\\pi}{4}
        \\end{aligned}
        $$
        <p class="text-sm font-semibold mt-2 text-blue-600">
          $z = 2\\sqrt{2}\\left[\\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right)\\right]$
        </p>
      </div>
      <div class="w-32 aspect-square flex items-center justify-center bg-slate-50 rounded-xl p-2">
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <line x1="10" y1="40" x2="110" y2="40" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="80" y1="110" x2="80" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="80" y1="40" x2="38" y2="82" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
          <circle cx="38" cy="82" r="2.5" fill="#2563eb"></circle>
          <path d="M 95 40 A 15 15 0 0 1 69.4 50.6" fill="none" stroke="#f59e0b" stroke-width="1"></path>
          <text x="112" y="43" font-size="7" font-weight="bold" fill="#64748b">Re</text>
          <text x="84" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
          <text x="15" y="92" font-size="7" font-weight="bold" fill="#1e293b">(-2, -2)</text>
          <text x="86" y="55" font-size="7" font-weight="bold" fill="#f59e0b">-3\\pi/4</text>
        </svg>
      </div>
    </div>

    <!-- 1(d) -->
    <div class="pt-6 flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h5 class="font-bold text-slate-800 mb-2">(d) $z = \\sqrt{3} - i$</h5>
        <p class="text-sm text-slate-600 mb-2">
          The point is $(\\sqrt{3}, -1)$ in <strong>Quadrant IV</strong>:
        </p>
        $$
        \\begin{aligned}
          r &= \\sqrt{(\\sqrt{3})^2 + (-1)^2} = 2 \\\\
          \\cos\\theta &= \\frac{\\sqrt{3}}{2}, \\\quad \\sin\\theta = -\\frac{1}{2} \\implies \\theta = -\\frac{\\pi}{6}
        \\end{aligned}
        $$
        <p class="text-sm font-semibold mt-2 text-blue-600">
          $z = 2\\left[\\cos\\left(-\\frac{\\pi}{6}\\right) + i\\sin\\left(-\\frac{\\pi}{6}\\right)\\right]$
        </p>
      </div>
      <div class="w-32 aspect-square flex items-center justify-center bg-slate-50 rounded-xl p-2">
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <line x1="10" y1="40" x2="110" y2="40" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="40" y1="110" x2="40" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="40" y1="40" x2="90" y2="69" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
          <circle cx="90" cy="69" r="2.5" fill="#2563eb"></circle>
          <path d="M 55 40 A 15 15 0 0 1 53 47.5" fill="none" stroke="#f59e0b" stroke-width="1"></path>
          <text x="112" y="43" font-size="7" font-weight="bold" fill="#64748b">Re</text>
          <text x="44" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
          <text x="94" y="73" font-size="7" font-weight="bold" fill="#1e293b">(√3, -1)</text>
          <text x="54" y="49" font-size="7" font-weight="bold" fill="#f59e0b">-\\pi/6</text>
        </svg>
      </div>
    </div>

    <!-- 1(e) -->
    <div class="pt-6 flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h5 class="font-bold text-slate-800 mb-2">(e) $z = i$</h5>
        <p class="text-sm text-slate-600 mb-2">
          The point is $(0, 1)$ on the <strong>Positive Imaginary Axis</strong>:
        </p>
        $$
        \\begin{aligned}
          r &= \\sqrt{0^2 + 1^2} = 1 \\\\
          \\cos\\theta &= 0, \\\quad \\sin\\theta = 1 \\implies \\theta = \\frac{\\pi}{2}
        \\end{aligned}
        $$
        <p class="text-sm font-semibold mt-2 text-blue-600">
          $z = 1\\left[\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\\right]$
        </p>
      </div>
      <div class="w-32 aspect-square flex items-center justify-center bg-slate-50 rounded-xl p-2">
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <line x1="10" y1="80" x2="110" y2="80" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="60" y1="110" x2="60" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="60" y1="80" x2="60" y2="38" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
          <circle cx="60" cy="38" r="2.5" fill="#2563eb"></circle>
          <path d="M 75 80 A 15 15 0 0 0 60 65" fill="none" stroke="#f59e0b" stroke-width="1"></path>
          <text x="112" y="83" font-size="7" font-weight="bold" fill="#64748b">Re</text>
          <text x="64" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
          <text x="64" y="34" font-size="7" font-weight="bold" fill="#1e293b">(0, 1)</text>
          <text x="64" y="74" font-size="7" font-weight="bold" fill="#f59e0b">\\pi/2</text>
        </svg>
      </div>
    </div>

    <!-- 1(f) -->
    <div class="pt-6 flex flex-col md:flex-row gap-6 items-center">
      <div class="flex-1">
        <h5 class="font-bold text-slate-800 mb-2">(f) $z = -3i$</h5>
        <p class="text-sm text-slate-600 mb-2">
          The point is $(0, -3)$ on the <strong>Negative Imaginary Axis</strong>:
        </p>
        $$
        \\begin{aligned}
          r &= \\sqrt{0^2 + (-3)^2} = 3 \\\\
          \\cos\\theta &= 0, \\\quad \\sin\\theta = -1 \\implies \\theta = -\\frac{\\pi}{2}
        \\end{aligned}
        $$
        <p class="text-sm font-semibold mt-2 text-blue-600">
          $z = 3\\left[\\cos\\left(-\\frac{\\pi}{2}\\right) + i\\sin\\left(-\\frac{\\pi}{2}\\right)\\right]$
        </p>
      </div>
      <div class="w-32 aspect-square flex items-center justify-center bg-slate-50 rounded-xl p-2">
        <svg viewBox="0 0 120 120" class="w-full h-full overflow-visible">
          <line x1="10" y1="40" x2="110" y2="40" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="60" y1="110" x2="60" y2="10" stroke="#64748b" stroke-width="1" marker-end="url(#arrow-small)"></line>
          <line x1="60" y1="40" x2="60" y2="100" stroke="#2563eb" stroke-width="1.5" marker-end="url(#blue-arrow-small)"></line>
          <circle cx="60" cy="100" r="2.5" fill="#2563eb"></circle>
          <path d="M 75 40 A 15 15 0 0 1 60 55" fill="none" stroke="#f59e0b" stroke-width="1"></path>
          <text x="112" y="43" font-size="7" font-weight="bold" fill="#64748b">Re</text>
          <text x="64" y="14" font-size="7" font-weight="bold" fill="#64748b">Im</text>
          <text x="64" y="104" font-size="7" font-weight="bold" fill="#1e293b">(0, -3)</text>
          <text x="64" y="52" font-size="7" font-weight="bold" fill="#f59e0b">-\\pi/2</text>
        </svg>
      </div>
    </div>

  </div>
</details>

<details class="group bg-white border border-slate-200 rounded-2xl p-5 my-4">
  <summary class="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none">
    <span>Solutions to Exercise 1.4 - Question 2 (Operations and Direct Verification)</span>
    <span class="transition-transform group-open:rotate-180">
      <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </summary>
  <div class="mt-4 space-y-6 text-slate-700 divide-y divide-slate-100">

    <div class="pb-4">
      <p class="text-sm text-slate-600 mb-2">
        First, we find the trigonometric forms of $z_1 = 2 - 2\\sqrt{3}i$ and $z_2 = -1 - i$:
      </p>
      $$
      \\begin{aligned}
        z_1 &= 4\\left[ \\cos\\left(-\\frac{\\pi}{3}\\right) + i\\sin\\left(-\\frac{\\pi}{3}\\right) \\right] \\\\
        z_2 &= \\sqrt{2}\\left[ \\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right) \\right]
      \\end{aligned}
      $$
    </div>

    <!-- 2(a) -->
    <div class="pt-4">
      <h5 class="font-bold text-slate-800 mb-2">(a) $z_1z_2$</h5>
      <p class="text-sm mb-2 font-semibold text-slate-700">Using Trigonometric Form:</p>
      $$
      \\begin{aligned}
        z_1z_2 &= 4\\sqrt{2}\\left[ \\cos\\left(-\\frac{\\pi}{3} + \\left(-\\frac{3\\pi}{4}\\right)\\right) + i\\sin\\left(-\\frac{\\pi}{3} + \\left(-\\frac{3\\pi}{4}\\right)\\right) \\right] \\\\
        &= 4\\sqrt{2}\\left[ \\cos\\left(-\\frac{13\\pi}{12}\\right) + i\\sin\\left(-\\frac{13\\pi}{12}\\right) \\right]
      \\end{aligned}
      $$
      Since $-\\frac{13\\pi}{12} < -\\pi$, we add $2\\pi$ to get the principal argument in $(-\\pi, \\pi]$:
      $$
      -\\frac{13\\pi}{12} + 2\\pi = \\frac{11\\pi}{12}
      $$
      $$
      z_1z_2 = 4\\sqrt{2}\\left( \\cos\\frac{11\\pi}{12} + i\\sin\\frac{11\\pi}{12} \right) = -(2+2\\sqrt{3}) + (2\\sqrt{3}-2)i
      $$

      <p class="text-sm mt-3 font-semibold text-slate-700">Direct Multiplication Verification:</p>
      $$
      \\begin{aligned}
        z_1z_2 &= (2 - 2\\sqrt{3}i)(-1 - i) \\\\
        &= -2 - 2i + 2\\sqrt{3}i + 2\\sqrt{3}i^2 \\\\
        &= -(2+2\\sqrt{3}) + (2\\sqrt{3}-2)i \\\quad \\checkmark
      \\end{aligned}
      $$
    </div>

    <!-- 2(b) -->
    <div class="pt-4">
      <h5 class="font-bold text-slate-800 mb-2">(b) $z_1^{-1}$</h5>
      <p class="text-sm mb-2 font-semibold text-slate-700">Using Trigonometric Form:</p>
      $$
      \\begin{aligned}
        z_1^{-1} &= \\frac{1}{4}\\left[ \\cos\\left(-\\left(-\\frac{\\pi}{3}\\right)\\right) + i\\sin\\left(-\\left(-\frac{\\pi}{3}\\right)\\right) \\right] \\\\
        &= \\frac{1}{4}\\left( \\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3} \\right) \\\\
        &= \\frac{1}{4}\\left( \\frac{1}{2} + \\frac{\\sqrt{3}}{2}i \\right) = \\frac{1}{8} + \\frac{\\sqrt{3}}{8}i
      \\end{aligned}
      $$

      <p class="text-sm mt-3 font-semibold text-slate-700">Direct Verification:</p>
      $$
      \\begin{aligned}
        z_1^{-1} &= \\frac{1}{2-2\\sqrt{3}i} \\cdot \\frac{2+2\\sqrt{3}i}{2+2\\sqrt{3}i} \\\\
        &= \\frac{2+2\\sqrt{3}i}{4 + 12} = \\frac{2+2\\sqrt{3}i}{16} = \\frac{1}{8} + \\frac{\\sqrt{3}}{8}i \\\quad \\checkmark
      \\end{aligned}
      $$
    </div>

    <!-- 2(c) -->
    <div class="pt-4">
      <h5 class="font-bold text-slate-800 mb-2">(c) $\\dfrac{z_1}{z_2}$</h5>
      <p class="text-sm mb-2 font-semibold text-slate-700">Using Trigonometric Form:</p>
      $$
      \\begin{aligned}
        \\frac{z_1}{z_2} &= \\frac{4}{\\sqrt{2}}\\left[ \\cos\\left(-\\frac{\\pi}{3} - \\left(-\\frac{3\\pi}{4}\\right)\\right) + i\\sin\\left(-\\frac{\\pi}{3} - \\left(-\\frac{3\\pi}{4}\\right)\\right) \\right] \\\\
        &= 2\\sqrt{2}\\left[ \\cos\\frac{5\\pi}{12} + i\\sin\\frac{5\\pi}{12} \\right] \\\\
        &= \\sqrt{3}-1 + (\\sqrt{3}+1)i
      \\end{aligned}
      $$

      <p class="text-sm mt-3 font-semibold text-slate-700">Direct Verification:</p>
      $$
      \\begin{aligned}
        \\frac{z_1}{z_2} &= \\frac{2-2\\sqrt{3}i}{-1-i} \\cdot \\frac{-1+i}{-1+i} \\\\
        &= \\frac{(2-2\\sqrt{3}i)(-1+i)}{1 + 1} \\\\
        &= \\frac{-2 + 2i + 2\\sqrt{3}i - 2\\sqrt{3}i^2}{2} \\\\
        &= \\frac{(2\\sqrt{3}-2) + (2\\sqrt{3}+2)i}{2} = \\sqrt{3}-1 + (\\sqrt{3}+1)i \\\quad \\checkmark
      \\end{aligned}
      $$
    </div>

    <!-- 2(d) -->
    <div class="pt-4">
      <h5 class="font-bold text-slate-800 mb-2">(d) $\\dfrac{z_2}{z_1}$</h5>
      <p class="text-sm mb-2 font-semibold text-slate-700">Using Trigonometric Form:</p>
      $$
      \\begin{aligned}
        \\frac{z_2}{z_1} &= \\frac{\\sqrt{2}}{4}\\left[ \\cos\\left(-\\frac{3\\pi}{4} - \\left(-\\frac{\\pi}{3}\\right)\\right) + i\\sin\\left(-\\frac{3\\pi}{4} - \\left(-\\frac{\\pi}{3}\\right)\\right) \\right] \\\\
        &= \\frac{\\sqrt{2}}{4}\\left[ \\cos\\left(-\\frac{5\\pi}{12}\\right) + i\\sin\\left(-\\frac{5\\pi}{12}\\right) \\right] \\\\
        &= \\frac{\\sqrt{3}-1}{8} - \\frac{\\sqrt{3}+1}{8}i
      \\end{aligned}
      $$

      <p class="text-sm mt-3 font-semibold text-slate-700">Direct Verification:</p>
      $$
      \\begin{aligned}
        \\frac{z_2}{z_1} &= \\frac{-1-i}{2-2\\sqrt{3}i} \\cdot \\frac{2+2\\sqrt{3}i}{2+2\\sqrt{3}i} \\\\
        &= \\frac{(-1-i)(2+2\\sqrt{3}i)}{4 + 12} \\\\
        &= \\frac{-2 - 2\\sqrt{3}i - 2i - 2\\sqrt{3}i^2}{16} \\\\
        &= \\frac{(2\\sqrt{3}-2) - (2\\sqrt{3}+2)i}{16} = \\frac{\\sqrt{3}-1}{8} - \\frac{\\sqrt{3}+1}{8}i \\\quad \\checkmark
      \\end{aligned}
      $$
    </div>

  </div>
</details>

<details class="group bg-white border border-slate-200 rounded-2xl p-5 my-4">
  <summary class="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none">
    <span>Solutions to Exercise 1.4 - Question 3 (Powers of Complex Numbers)</span>
    <span class="transition-transform group-open:rotate-180">
      <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </summary>
  <div class="mt-4 space-y-6 text-slate-700 divide-y divide-slate-100">

    <div class="pb-4">
      <p class="text-sm text-slate-600 mb-2">
        Given $z = -2\\sqrt{3} - 2i = (-2\\sqrt{3}, -2)$ in <strong>Quadrant III</strong>:
      </p>
      $$
      \\begin{aligned}
        r &= \\sqrt{(-2\\sqrt{3})^2 + (-2)^2} = \\sqrt{12+4} = 4 \\\\
        \\cos\\theta &= -\\frac{\\sqrt{3}}{2}, \\\quad \\sin\\theta = -\\frac{1}{2} \\implies \\theta = -\\frac{5\\pi}{6}
      \\end{aligned}
      $$
      $$z = 4\\left[ \\cos\\left(-\\frac{5\\pi}{6}\\right) + i\\sin\\left(-\\frac{5\\pi}{6}\\right) \\right]$$
    </div>

    <!-- 3(a) -->
    <div class="pt-4">
      <h5 class="font-bold text-slate-800 mb-2">(a) $z^5$</h5>
      Applying De Moivre's Formula:
      $$
      \\begin{aligned}
        z^5 &= 4^5 \\left[ \\cos\\left(5 \\cdot \\left(-\\frac{5\\pi}{6}\right)\\right) + i\\sin\\left(5 \\cdot \\left(-\\frac{5\\pi}{6}\right)\\right) \\right] \\\\
        &= 1024 \\left[ \\cos\\left(-\\frac{25\\pi}{6}\right) + i\\sin\\left(-\\frac{25\\pi}{6}\right)\\right]
      \\end{aligned}
      $$
      Since $-\\frac{25\\pi}{6} = -4\\pi - \\frac{\\pi}{6} \\equiv -\\frac{\\pi}{6}$:
      $$
      \\begin{aligned}
        z^5 &= 1024 \\left[ \\cos\\left(-\\frac{\\pi}{6}\right) + i\\sin\\left(-\\frac{\\pi}{6}\right) \\right] \\\\
        &= 1024 \\left( \\frac{\\sqrt{3}}{2} - \\frac{1}{2}i \\right) \\\\
        &= 512\\sqrt{3} - 512i
      \\end{aligned}
      $$
    </div>

    <!-- 3(b) -->
    <div class="pt-4">
      <h5 class="font-bold text-slate-800 mb-2">(b) $z^{-5}$</h5>
      Applying De Moivre's Formula:
      $$
      \\begin{aligned}
        z^{-5} &= 4^{-5} \\left[ \\cos\\left(-5 \\cdot \\left(-\\frac{5\\pi}{6}\right)\\right) + i\\sin\\left(-5 \\cdot \\left(-\\frac{5\\pi}{6}\right)\\right) \\right] \\\\
        &= \\frac{1}{1024} \\left[ \\cos\\frac{25\\pi}{6} + i\\sin\\frac{25\\pi}{6} \\right]
      \\end{aligned}
      $$
      Since $\\frac{25\\pi}{6} = 4\\pi + \\frac{\\pi}{6} \\equiv \\frac{\\pi}{6}$:
      $$
      \\begin{aligned}
        z^{-5} &= \\frac{1}{1024} \\left( \\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6} \\right) \\\\
        &= \\frac{1}{1024} \\left( \\frac{\\sqrt{3}}{2} + \\frac{1}{2}i \\right) \\\\
        &= \\frac{\\sqrt{3}}{2048} + \\frac{1}{2048}i
      \\end{aligned}
      $$
    </div>

  </div>
</details>
`;

const OLD_chapter1TrigonometricContent = "";
/*
const REDUNDANT_chapter1TrigonometricContent = `## 1.4 Trigonometric Form

<div class="flex flex-col md:flex-row gap-6 items-center my-8 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
  <div class="flex-1 text-slate-700">
    <h4 class="text-sm font-black uppercase text-blue-600 tracking-wider mb-2">Geometric Representation</h4>
    <p class="text-sm leading-relaxed mb-4">
      A non-zero complex number <strong>z = x + yi</strong> can be represented by a point <strong>P(x, y)</strong> on the complex plane (Argand diagram).
    </p>
    <p class="text-sm leading-relaxed">
      Let:
      <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
        <li><strong>r = |z| = √(x² + y²)</strong> be the modulus (distance of the point from the origin).</li>
        <li><strong>θ (theta)</strong> be the argument (angle made with the positive real axis).</li>
      </ul>
    </p>
  </div>
  <div class="w-full max-w-[280px] aspect-square bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-center shadow-xs">
    <svg viewBox="0 0 240 240" class="w-full h-full overflow-visible">
      <!-- Grid lines -->
      <line x1="20" y1="180" x2="220" y2="180" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"></line>
      <line x1="60" y1="20" x2="60" y2="220" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"></line>
      
      <!-- Axes -->
      <line x1="10" y1="180" x2="230" y2="180" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"></line>
      <line x1="60" y1="230" x2="60" y2="15" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"></line>
      
      <!-- Vector OP -->
      <line x1="60" y1="180" x2="180" y2="60" stroke="#2563eb" stroke-width="2.5" marker-end="url(#blue-arrow)"></line>
      
      <!-- Dashed lines to axes -->
      <line x1="180" y1="60" x2="180" y2="180" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"></line>
      <line x1="60" y1="60" x2="180" y2="60" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"></line>
      
      <!-- Angle Arc for theta -->
      <path d="M 85 180 A 25 25 0 0 0 77.7 162.3" fill="none" stroke="#f59e0b" stroke-width="2"></path>
      
      <!-- Point P -->
      <circle cx="180" cy="60" r="5" fill="#2563eb"></circle>
      
      <!-- Labels -->
      <text x="225" y="195" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end">Re (x)</text>
      <text x="75" y="25" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b">Im (y)</text>
      <text x="185" y="52" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e293b">P(x, y)</text>
      <text x="110" y="112" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">r</text>
      <text x="92" y="172" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f59e0b">θ</text>
      
      <text x="120" y="195" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">x = r cos θ</text>
      <text x="48" y="120" font-family="sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="end" transform="rotate(-90 48 120)">y = r sin θ</text>
      <text x="48" y="195" font-family="sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="end">O</text>
      
      <!-- Definitions -->
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b"></path>
        </marker>
        <marker id="blue-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"></path>
        </marker>
      </defs>
    </svg>
  </div>
</div>

Let $r$ be the distance from the origin to $P(x, y)$ and let $\\theta$ be the angle made with the positive real axis. Then:

$$r = |z| = \\sqrt{x^2+y^2}$$
$$\\cos\\theta = \\frac{x}{r} \\\quad\\text{and}\\\quad \\sin\\theta = \\frac{y}{r}$$

Since $x=r\\cos\\theta$ and $y=r\\sin\\theta$, we can write:

\`\`\`note
{
  "type": "definition",
  "title": "Trigonometric (Polar) Form",
  "content": "$$z = x + yi = r(\\\\cos\\\\theta + i\\\\sin\\\\theta)$$\\n\\nThis is called the **trigonometric form** or **polar form** of the complex number $z$."
}
\`\`\`

### Modulus and Argument

In the form $z=r(\\cos\\theta+i\\sin\\theta)$:
* $r=|z|$ is the **modulus** of $z$.
* $\\theta$ is an **argument** of $z$.
* For the **principal argument**, we choose $-\\pi < \\theta \\le \\pi$.

All angles $\\theta + 2\\pi k$ (where $k \\in \\mathbb{Z}$) represent the same complex number on the plane.

---

### Example 5
Find the trigonometric form of the following complex numbers with $-\\pi < \\theta \\le \\pi$:
* **(a)** $z = 1 + \\sqrt{3}i$
* **(b)** $z = -1 + i$
* **(c)** $z = -\\sqrt{3} - i$
* **(d)** $z = -1$

<details>
<summary>Click to view solution</summary>
<div>

#### (a) $z = 1 + \\sqrt{3}i$

<div class="flex flex-col md:flex-row gap-6 items-center my-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
  <div class="flex-1">
    <p class="text-sm leading-relaxed mb-3">
      The point is <strong>(1, √3)</strong> in Quadrant I:
    </p>
    $$
    \\begin{aligned}
    r &= \\sqrt{1^2 + (\\sqrt{3})^2} = 2 \\\\
    \\cos\\theta &= \\frac{1}{2}, \\\quad \\sin\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3}
    \\end{aligned}
    $$
    <p class="text-sm leading-relaxed mt-3">
      Thus, the trigonometric form is:
    </p>
    $$z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$$
  </div>
  <div class="w-full max-w-[180px] aspect-square flex items-center justify-center bg-white border border-slate-100 rounded-xl p-2 shadow-xs">
    <svg viewBox="0 0 200 200" class="w-full h-full overflow-visible">
      <!-- Grid/Ticks -->
      <line x1="50" y1="150" x2="150" y2="150" stroke="#f1f5f9" stroke-width="1"></line>
      <line x1="50" y1="50" x2="50" y2="150" stroke="#f1f5f9" stroke-width="1"></line>
      
      <!-- Axes -->
      <line x1="15" y1="150" x2="185" y2="150" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow-sol)"></line>
      <line x1="50" y1="185" x2="50" y2="15" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow-sol)"></line>
      
      <!-- Vector OP -->
      <line x1="50" y1="150" x2="110" y2="46" stroke="#2563eb" stroke-width="2" marker-end="url(#blue-arrow-sol)"></line>
      
      <!-- Dashed projection lines -->
      <line x1="110" y1="46" x2="110" y2="150" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"></line>
      
      <!-- Angle Arc -->
      <path d="M 75 150 A 25 25 0 0 0 62.5 128.4" fill="none" stroke="#f59e0b" stroke-width="1.5"></path>
      
      <!-- Point P -->
      <circle cx="110" cy="46" r="4" fill="#2563eb"></circle>
      
      <!-- Labels -->
      <text x="180" y="165" font-family="sans-serif" font-size="9" font-weight="bold" fill="#64748b">Re</text>
      <text x="35" y="20" font-family="sans-serif" font-size="9" font-weight="bold" fill="#64748b">Im</text>
      <text x="115" y="42" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b">z = (1, √3)</text>
      <text x="70" y="142" font-family="sans-serif" font-size="10" font-weight="bold" fill="#f59e0b">θ</text>
      <text x="40" y="162" font-family="sans-serif" font-size="9" font-weight="bold" fill="#64748b">O</text>
      
      <defs>
        <marker id="arrow-sol" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b"></path>
        </marker>
        <marker id="blue-arrow-sol" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"></path>
        </marker>
      </defs>
    </svg>
  </div>
</div>

#### (b) $z = -1 + i$

<div class="flex flex-col md:flex-row gap-6 items-center my-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
  <div class="flex-1">
    <p class="text-sm leading-relaxed mb-3">
      The point is <strong>(-1, 1)</strong> in Quadrant II:
    </p>
    $$
    \\begin{aligned}
    r &= \\sqrt{(-1)^2 + 1^2} = \\sqrt{2} \\\\
    \\cos\\theta &= -\\frac{\\sqrt{2}}{2}, \\\quad \\sin\\theta = \\frac{\\sqrt{2}}{2} \\implies \\theta = \\frac{3\\pi}{4}
    \\end{aligned}
    $$
    <p class="text-sm leading-relaxed mt-3">
      Thus, the trigonometric form is:
    </p>
    $$z = \\sqrt{2}\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$$
  </div>
  <div class="w-full max-w-[180px] aspect-square flex items-center justify-center bg-white border border-slate-100 rounded-xl p-2 shadow-xs">
    <svg viewBox="0 0 200 200" class="w-full h-full overflow-visible">
      <!-- Axes -->
      <line x1="15" y1="140" x2="185" y2="140" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow-sol-2)"></line>
      <line x1="120" y1="185" x2="120" y2="15" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow-sol-2)"></line>
      
      <!-- Vector -->
      <line x1="120" y1="140" x2="70" y2="90" stroke="#2563eb" stroke-width="2" marker-end="url(#blue-arrow-sol-2)"></line>
      
      <!-- Dashed line -->
      <line x1="70" y1="90" x2="70" y2="140" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"></line>
      
      <!-- Arc for theta -->
      <path d="M 145 140 A 25 25 0 0 0 102.3 122.3" fill="none" stroke="#f59e0b" stroke-width="1.5"></path>
      
      <!-- Point z -->
      <circle cx="70" cy="90" r="4" fill="#2563eb"></circle>
      
      <!-- Labels -->
      <text x="180" y="155" font-family="sans-serif" font-size="9" font-weight="bold" fill="#64748b">Re</text>
      <text x="105" y="20" font-family="sans-serif" font-size="9" font-weight="bold" fill="#64748b">Im</text>
      <text x="40" y="82" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e293b">z = (-1, 1)</text>
      <text x="110" y="112" font-family="sans-serif" font-size="10" font-weight="bold" fill="#f59e0b">θ</text>
      <text x="124" y="152" font-family="sans-serif" font-size="9" font-weight="bold" fill="#64748b">O</text>
      
      <defs>
        <marker id="arrow-sol-2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b"></path>
        </marker>
        <marker id="blue-arrow-sol-2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"></path>
        </marker>
      </defs>
    </svg>
  </div>
</div>

#### (c) $z = -\\sqrt{3} - i$
The point is $(-\\sqrt{3}, -1)$ in Quadrant III:
$$
\\begin{aligned}
r &= \\sqrt{(-\\sqrt{3})^2 + (-1)^2} = 2 \\\\
\\cos\\theta &= -\\frac{\\sqrt{3}}{2}, \\\quad \\sin\\theta = -\\frac{1}{2} \\implies \\theta = -\\frac{5\\pi}{6}
\\end{aligned}
$$
Thus, the trigonometric form is:
$$z = 2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i\\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)$$

#### (d) $z = -1$
The point is $(-1, 0)$ on the negative real axis:
$$
\\begin{aligned}
r &= \\sqrt{(-1)^2} = 1 \\\\
\\cos\\theta &= -1, \\\quad \\sin\\theta = 0 \\implies \\theta = \\pi
\\end{aligned}
$$
Thus, the trigonometric form is:
$$z = 1(\\cos\\pi + i\\sin\\pi)$$

</div>
</details>

---

### Product in Trigonometric Form

Let $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$ and $z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$. Then:

\`\`\`note
{
  "type": "info",
  "title": "Product Formula",
  "content": "$$z_1 z_2 = r_1 r_2 \\\\bigl(\\\\cos(\\\\theta_1 + \\\\theta_2) + i\\\\sin(\\\\theta_1 + \\\\theta_2)\\\\bigr)$$"
}
\`\`\`

#### Example 6
Given $z_1 = 1 + \\sqrt{3}i$ and $z_2 = -1 + i$, find $z_1 z_2$ using trigonometric forms. Check by direct multiplication.

<details>
<summary>Click to view solution</summary>
<div>

We have:
$$z_1 = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right), \\\quad z_2 = \\sqrt{2}\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$$

Using the formula:
$$
\\begin{aligned}
z_1 z_2 &= 2\\sqrt{2}\\left(\\cos\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right) + i\\sin\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right)\\right) \\\\
&= 2\\sqrt{2}\\left(\\cos\\frac{13\\pi}{12} + i\\sin\\frac{13\\pi}{12}\\right) \\\\
&= 2\\sqrt{2}\\left(\\cos\\left(-\\frac{11\\pi}{12}\right) + i\\sin\\left(-\\frac{11\\pi}{12}\right)\\right) \\\\
&= -(1 + \\sqrt{3}) + (1 - \\sqrt{3})i
\\end{aligned}
$$

Direct multiplication:
$$
\\begin{aligned}
z_1 z_2 &= (1 + \\sqrt{3}i)(-1 + i) \\\\
&= -1 + i - \\sqrt{3}i + \\sqrt{3}i^2 \\\\
&= -(1 + \\sqrt{3}) + (1 - \\sqrt{3})i
\\end{aligned}
$$
The results match.

</div>
</details>

---

### Multiplicative Inverse in Trigonometric Form

Let $z = r(\\cos\\theta + i\\sin\\theta)$ with $z \\neq 0$. Then:

\`\`\`note
{
  "type": "info",
  "title": "Multiplicative Inverse",
  "content": "$$z^{-1} = \\\\frac{1}{r}\\\\bigl(\\\\cos(-\\\\theta) + i\\\\sin(-\\\\theta)\\\\bigr)$$"
}
\`\`\`

#### Example 7
Given $z = -\\sqrt{3} - i$, find $z^{-1}$ using its trigonometric form. Check by showing $z z^{-1} = 1$.

<details>
<summary>Click to view solution</summary>
<div>

Trigonometric form:
$$z = 2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i\\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)$$

Inverse:
$$
\\begin{aligned}
z^{-1} &= \\frac{1}{2}\\left(\\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6}\\right) \\\\
&= \\frac{1}{2}\\left(-\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i\\right) \\\\
&= -\\frac{\\sqrt{3}}{4} + \\frac{1}{4}i
\\end{aligned}
$$

Check:
$$
\\begin{aligned}
z z^{-1} &= (-\\sqrt{3} - i)\\left(-\\frac{\\sqrt{3}}{4} + \\frac{1}{4}i\\right) \\\\
&= \\frac{3}{4} - \\frac{\\sqrt{3}}{4}i + \\frac{\\sqrt{3}}{4}i - \\frac{1}{4}i^2 = 1
\\end{aligned}
$$
Since $z z^{-1} = 1$, the multiplicative inverse of $z$ is indeed $z^{-1}$.

</div>
</details>

---

### Division in Trigonometric Form

Let $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$ and $z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$, where $z_2 \\neq 0$. Then:

\`\`\`note
{
  "type": "info",
  "title": "Division Formula",
  "content": "$$\\\\frac{z_1}{z_2} = \\\\frac{r_1}{r_2}\\\\bigl(\\\\cos(\\\\theta_1 - \\\\theta_2) + i\\\\sin(\\\\theta_1 - \\\\theta_2)\\\\bigr)$$"
}
\`\`\`

#### Example 8
Given $z_1 = 1 + \\sqrt{3}i$ and $z_2 = -1 + i$, find $\\frac{z_1}{z_2}$ using trigonometric forms. Check by direct calculation.

<details>
<summary>Click to view solution</summary>
<div>

We have:
$$z_1 = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right), \\\quad z_2 = \\sqrt{2}\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$$

Using the division formula:
$$
\\begin{aligned}
\\frac{z_1}{z_2} &= \\frac{2}{\\sqrt{2}}\\left(\\cos\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\\right) + i\\sin\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\\right)\\right) \\\\
&= \\sqrt{2}\\left(\\cos\\left(-\\frac{5\\pi}{12}\right) + i\\sin\\left(-\\frac{5\\pi}{12}\right)\\right) \\\\
&= \\sqrt{2}\\left(\\frac{\\sqrt{6} - \\sqrt{2}}{4} - \\frac{\\sqrt{6} + \\sqrt{2}}{4}i\\right) \\\\
&= \\frac{\\sqrt{3} - 1}{2} - \\frac{\\sqrt{3} + 1}{2}i
\\end{aligned}
$$

Direct calculation:
$$
\\begin{aligned}
\\frac{z_1}{z_2} &= \\frac{1 + \\sqrt{3}i}{-1 + i} \\\\
&= \\frac{(1 + \\sqrt{3}i)(-1 - i)}{(-1 + i)(-1 - i)} \\\\
&= \\frac{(\\sqrt{3} - 1) - (1 + \\sqrt{3})i}{2} \\\\
&= \\frac{\\sqrt{3} - 1}{2} - \\frac{\\sqrt{3} + 1}{2}i
\\end{aligned}
$$
The results match.

</div>
</details>

---

### Powers of Complex Numbers (De Moivre's Theorem)

Let $z = r(\\cos\\theta + i\\sin\\theta)$. For any positive integer $n$, the $n$-th power of $z$ is:

\`\`\`note
{
  "type": "definition",
  "title": "De Moivre's Theorem",
  "content": "$$z^n = r^n (\\\\cos n\\\\theta + i\\\\sin n\\\\theta)$$\\n\\nThus, the modulus is raised to the $n$-th power, and the argument is multiplied by $n$."
}
\`\`\`

#### Example 9
Given $z = 1 + \\sqrt{3}i$, find:
* **(a)** $z^{10}$
* **(b)** $z^{-10}$

<details>
<summary>Click to view solution</summary>
<div>

Trigonometric form:
$$z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$$

##### (a) $z^{10}$
$$
\\begin{aligned}
z^{10} &= 2^{10}\\left(\\cos\\frac{10\\pi}{3} + i\\sin\\frac{10\\pi}{3}\right) \\\\
&= 1024\\left(-\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i\\right) \\\\
&= -512 - 512\\sqrt{3}i
\\end{aligned}
$$

##### (b) $z^{-10}$
$$
\\begin{aligned}
z^{-10} &= 2^{-10}\\left(\\cos\\left(-\\frac{10\\pi}{3}\right) + i\\sin\\left(-\\frac{10\\pi}{3}\right)\\right) \\\\
&= \\frac{1}{1024}\\left(-\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i\\right) \\\\
&= -\\frac{1}{2048} + \\frac{\\sqrt{3}}{2048}i
\\end{aligned}
$$

</div>
</details>

---

### Exercise 1.4

**1. Find the trigonometric form with $-\\pi < \\theta \\le \\pi$ for:**
* **(a)** $z = 1 - \\sqrt{3}i$
* **(b)** $z = -\\sqrt{2} + \\sqrt{2}i$
* **(c)** $z = -2 - 2i$
* **(d)** $z = \\sqrt{3} - i$
* **(e)** $z = i$
* **(f)** $z = -3i$

**2. Given $z_1 = 2 - 2\\sqrt{3}i$ and $z_2 = -1 - i$, find the following using trigonometric forms. Check by direct calculation:**
* **(a)** $z_1 z_2$
* **(b)** $z_1^{-1}$
* **(c)** $\\frac{z_1}{z_2}$
* **(d)** $\\frac{z_2}{z_1}$

**3. Given $z = -2\\sqrt{3} - 2i$, find:**
* **(a)** $z^5$
* **(b)** $z^{-5}$

<details>
<summary>Click to view solutions</summary>
<div>

#### Answers to Q1:
* **(a)** $z = 2\\left(\\cos\\left(-\\frac{\\pi}{3}\right) + i\\sin\\left(-\\frac{\\pi}{3}\right)\\right)$
* **(b)** $z = 2\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$
* **(c)** $z = 2\\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\right) + i\\sin\\left(-\\frac{3\\pi}{4}\right)\\right)$
* **(d)** $z = 2\\left(\\cos\\left(-\\frac{\\pi}{6}\right) + i\\sin\\left(-\\frac{\\pi}{6}\right)\\right)$
* **(e)** $z = 1\\left(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\right)$
* **(f)** $z = 3\\left(\\cos\\left(-\\frac{\\pi}{2}\right) + i\\sin\\left(-\\frac{\\pi}{2}\right)\\right)$

#### Answers to Q2:
Using:
$$z_1 = 4\\left(\\cos\\left(-\\frac{\\pi}{3}\right) + i\\sin\\left(-\\frac{\\pi}{3}\right)\\right)$$
$$z_2 = \\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\right) + i\\sin\\left(-\\frac{3\\pi}{4}\right)\\right)$$

* **(a)** $z_1 z_2 = -(2 + 2\\sqrt{3}) + (2\\sqrt{3} - 2)i$
* **(b)** $z_1^{-1} = \\frac{1}{8} + \\frac{\\sqrt{3}}{8}i$
* **(c)** $\\frac{z_1}{z_2} = \\sqrt{3} - 1 + (\\sqrt{3} + 1)i$
* **(d)** $\\frac{z_2}{z_1} = \\frac{\\sqrt{3} - 1}{8} - \\frac{\\sqrt{3} + 1}{8}i$

#### Answers to Q3:
Using:
$$z = 4\\left(\\cos\\left(-\\frac{5\\pi}{6}\right) + i\\sin\\left(-\\frac{5\\pi}{6}\right)\\right)$$

* **(a)** $z^5 = 1024\\left(\\cos\\left(-\\frac{\\pi}{6}\right) + i\\sin\\left(-\\frac{\\pi}{6}\right)\\right) = 512\\sqrt{3} - 512i$
* **(b)** $z^{-5} = \\frac{1}{1024}\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\right) = \\frac{\\sqrt{3}}{2048} + \\frac{1}{2048}i$

</div>
</details>
`;

*/

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
    title: 'Pure Imaginary Unit i',
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
  {
    id: 'lesson-c1-trig',
    chapter_id: 'chapter-c1-g12',
    title: 'Trigonometric Form',
    type: 'theory',
    content: chapter1TrigonometricContent,
    order_index: 5,
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
