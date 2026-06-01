import { supabase } from '../lib/supabase';
import { Chapter, Lesson } from '../types';

/**
 * Service for managing curriculum data
 */
export const curriculumService = {
  /**
   * Fetches chapters for a specific grade level
   */
  async getChaptersByGrade(gradeId: string | number): Promise<Chapter[]> {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('grade_id', gradeId)
      .order('chapter_number', { ascending: true });

    let results = data || [];

    if (gradeId.toString() === '12') {
      const mockC1 = {
        id: 'chapter-c1-g12',
        grade_id: 12,
        chapter_number: 1,
        title: 'Complex Numbers',
        description: 'Introduction to numbers that are impossible... or are they?',
        order_index: 1,
        created_at: new Date().toISOString()
      };
      
      const mockC2 = {
        id: 'chapter-c2-g12',
        grade_id: 12,
        chapter_number: 2,
        title: 'Sequence and Series',
        description: 'The beauty of patterns and infinite sums.',
        order_index: 2,
        created_at: new Date().toISOString()
      };

      // Filter out existing Chapter 1 and 2 if they exist to avoid duplicates
      results = results.filter(c => c.chapter_number !== 1 && c.chapter_number !== 2);
      results = [mockC1, mockC2, ...results];
    }

    return results;
  },

  /**
   * Fetches a single chapter by ID
   */
  async getChapterById(chapterId: string): Promise<Chapter | null> {
    if (chapterId === 'chapter-c1-g12') {
      return {
        id: 'chapter-c1-g12',
        grade_id: 12,
        chapter_number: 1,
        title: 'Complex Numbers',
        description: 'Introduction to numbers that are impossible... or are they?',
        order_index: 1,
        created_at: new Date().toISOString()
      };
    }
    if (chapterId === 'chapter-c2-g12') {
      return {
        id: 'chapter-c2-g12',
        grade_id: 12,
        chapter_number: 2,
        title: 'Sequence and Series',
        description: 'The beauty of patterns and infinite sums.',
        order_index: 2,
        created_at: new Date().toISOString()
      };
    }
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', chapterId)
      .single();

    if (error) {
      console.error('Error fetching chapter:', error);
      return null;
    }

    return data;
  },

  /**
   * Fetches all lessons for all chapters in a specific grade level
   */
  async getAllLessonsByGrade(gradeId: string | number): Promise<Lesson[]> {
    // 1. Get all chapters for this grade
    const chapters = await this.getChaptersByGrade(gradeId);
    const chapterIds = chapters.map(c => c.id);

    if (chapterIds.length === 0) return [];

    // 2. Fetch all lessons belonging to these chapters
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .in('chapter_id', chapterIds)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching all lessons:', error);
      return [];
    }

    let lessons = data || [];

    // 3. Handle Mock Data for Grade 12
    if (gradeId.toString() === '12') {
      const mockLessonsC1 = await this.getLessonsByChapter('chapter-c1-g12');
      // Merge and ensure no duplicates if they already exist in DB
      const existingIds = new Set(lessons.map(l => l.id));
      const filteredMock = mockLessonsC1.filter(l => !existingIds.has(l.id));
      lessons = [...filteredMock, ...lessons];
    }

    return lessons;
  },

  /**
   * Fetches lessons for a specific chapter
   */
  async getLessonsByChapter(chapterId: string): Promise<Lesson[]> {
    // Specifically handle our mock chapter
    if (chapterId === 'chapter-c1-g12') {
      return [
        {
          id: 'lesson-c1-intro',
          chapter_id: chapterId,
          title: 'Introduction',
          type: 'theory',
          content: chapter1IntroContent,
          order_index: 1,
          created_at: new Date().toISOString()
        },
        {
          id: 'lesson-c1-basic',
          chapter_id: chapterId,
          title: 'Pure Imaginary Unit 𝑖',
          type: 'theory',
          content: chapter1BasicContent,
          order_index: 2,
          created_at: new Date().toISOString()
        },
        {
          id: 'lesson-c1-complex',
          chapter_id: chapterId,
          title: 'Complex Numbers',
          type: 'theory',
          content: chapter1ComplexContent,
          order_index: 3,
          created_at: new Date().toISOString()
        }
      ];
    }

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }

    return data || [];
  },

  /**
   * Fetches a single lesson by ID
   */
  async getLessonById(lessonId: string): Promise<Lesson | null> {
    if (lessonId === 'lesson-c1-intro') {
      return {
        id: 'lesson-c1-intro',
        chapter_id: 'chapter-c1-g12',
        title: 'Introduction',
        type: 'theory',
        content: chapter1IntroContent,
        order_index: 1,
        created_at: new Date().toISOString()
      };
    }
    if (lessonId === 'lesson-c1-basic') {
      return {
        id: 'lesson-c1-basic',
        chapter_id: 'chapter-c1-g12',
        title: 'Pure Imaginary Unit 𝑖',
        type: 'theory',
        content: chapter1BasicContent,
        order_index: 2,
        created_at: new Date().toISOString()
      };
    }
    if (lessonId === 'lesson-c1-complex') {
      return {
        id: 'lesson-c1-complex',
        chapter_id: 'chapter-c1-g12',
        title: 'Complex Numbers',
        type: 'theory',
        content: chapter1ComplexContent,
        order_index: 3,
        created_at: new Date().toISOString()
      };
    }
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single();

    if (error) {
      console.error('Error fetching lesson:', error);
      return null;
    }

    // Force Burmese content if this is the first lesson of Grade 12 Chapter 1 from DB
    if (data && data.order_index === 1) {
      // Check if it belongs to chapter 1
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
  },
};

const chapter1IntroContent = `# Introduction to Complex Numbers — A Journey Through Time

Complex Numbers ဆိုသည်မှာ သင်္ချာလောက၏ စိတ်လှုပ်ရှားစရာ အကောင်းဆုံးနှင့် အဆန်းကြယ်ဆုံး စိတ်ကူးစိတ်သန်းများထဲမှ တစ်ခုဖြစ်ပါသည်။ အစပိုင်းတွင် ထူးဆန်းသည်ဟု ထင်ရသော်လည်း၊ ၎င်းတို့၏ စွမ်းအားမှာ သိပ္ပံနှင့် နည်းပညာလောကအတွက် မရှိမဖြစ်လိုအပ်လှပါသည်။ ဤသင်ခန်းစာတွင် ကျွန်ုပ်တို့သည် သာမန် Real Numbers များ၏ နယ်ပယ်မှကျော်လွန်၍ အနှုတ်ကိန်းများ၏ Square Root တန်ဖိုးများကိုပါ အဓိပ္ပာယ်ဖွင့်ဆိုနိုင်မည့် ပိုမိုကျယ်ပြန့်သော Universe သစ်ဆီသို့ အတူတကွ ခရီးစတင်ကြပါမည်။

သင်္ချာပညာရှင်များသည် Complex Numbers များကို အပျော်သက်သက် တီထွင်ခဲ့ကြခြင်းမဟုတ်ဘဲ၊ လက်တွေ့ဘဝတွင် ကြုံတွေ့ရသော Algebra ဆိုင်ရာ ပြဿနာများကို ဖြေရှင်းရန် ကြိုးပမ်းရာမှ သဘာဝအလျောက် ပေါ်ထွက်လာခဲ့ခြင်းဖြစ်ပါသည်။ ဤရှာဖွေတွေ့ရှိမှုက သင်္ချာနယ်ပယ်တစ်ခုလုံးကို ပုံသဏ္ဌာန်သစ်ဖြင့် ပြန်လည်အသက်သွင်းစေခဲ့ပါသည်။

---

### Why Did Complex Numbers Arise?

၁၅၀၀ ပြည့်နှစ်များအတွင်း သင်္ချာပညာရှင်များသည် Polynomial Equations များ၊ အထူးသဖြင့် Cubic Equations များကို ဖြေရှင်းရန် အလွန်ခက်ခဲစွာ ကြိုးပမ်းခဲ့ကြရပါသည်။ Real Numbers များသည် ပြဿနာအတော်များများအတွက် အဆင်ပြေသော်လည်း၊ အချို့သော Algebraic Formulas များကို တွက်ချက်ရာတွင် Traditional Number Line ပေါ်တွင် အဓိပ္ပာယ်မရှိသော $\\sqrt{-1}$ ကဲ့သို့သော Expression များ ပေါ်ထွက်လာခဲ့ပါသည်။
Cubic Equation ဖြေရှင်းမှု ပုံသေနည်း (Cardano's Formula) ကို အသုံးပြုသည့်အခါ အနှုတ်ကိန်းများ၏ Square Root ကို ရှောင်လွှဲ၍မရ ဖြစ်လာခဲ့ပါသည်။ ဤသို့ဖြင့် Real Numbers စနစ်တစ်ခုတည်းနှင့် မလုံလောက်တော့ဘဲ၊ သင်္ချာနယ်ပယ်တိုးတက်ရန် $\\sqrt{-1}$ ကို တရားဝင် တည်ဆောက်သတ်မှတ်ရန် လိုအပ်လာခဲ့သည်။

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

const chapter1ComplexContent = `# Complex Numbers (ကိန်းထွေများ)

Placeholder for the lesson content to be provided.
`;

/* const _ignoredTrash = `

Placeholder for the lesson content to be provided.
`;��ုင်း)** ဟုခေါ်ပြီး $Re(z)$ သို့မဟုတ် $Re\ z$ ဟုရေးသားသည်။
* **$b$** ကို $z$ ၏ **Imaginary Part (စိတ်ကူးယဉ်အပိုင်း)** ဟုခေါ်ပြီး $Im(z)$ သို့မဟုတ် $Im\ z$ ဟုရေးသားသည်။

\`\`\`note
{
  "type": "definition",
  "title": "Complex Number Definition",
  "content": "$$z = a + bi$$ \\n- $a$ is the **Real Part** ($Re\\ z = a$) \\n- $b$ is the **Imaginary Part** ($Im\\ z = b$)"
}
\`\`\`

---

### 🔍 Examples:
1. $z = 3 + 2i$:
   * $Re(z) = 3$
   * $Im(z) = 2$
2. $z = -5 - \sqrt{7}i$:
   * $Re(z) = -5$
   * $Im(z) = -\sqrt{7}$
3. $z = 4i$ (Pure Imaginary Number, since $Re(z) = 0$):
   * $Re(z) = 0$
   * $Im(z) = 4$
4. $z = 7$ (Pure Real Number, since $Im(z) = 0$):
   * $Re(z) = 7$
   * $Im(z) = 0$

---

### ⚖️ Equality of Complex Numbers (ညီမျှခြင်းနှစ်ဖက်စလုံး ညီမျှခြင်း)

Two complex numbers $z_1 = a + bi$ and $z_2 = c + di$ are equal if and only if their real parts are equal and their imaginary parts are equal:

$$a + bi = c + di \iff a = c \quad \text{and} \quad b = d$$

#### 📝 Example:
Find $x$ and $y$ if $(x+2) + (y-3)i = 5 + 4i$.

**Solution:**
Equating the real parts & imaginary parts:
$$
\begin{aligned}
  x + 2 &= 5 \implies x = 3 \\
  y - 3 &= 4 \implies y = 7
\end{aligned}
$$

---

### ➕ Basic Operations (အခြေခံတွက်နည်းများ)

#### 1. Addition & Subtraction (ပေါင်းခြင်းနှင့် နှုတ်ခြင်း)
Real parts ချင်းပေါင်း/နှုတ်ပြီး၊ Imaginary parts ချင်းပေါင်း/နှုတ်ရပါမည်။
$$(a+bi) + (c+di) = (a+c) + (b+d)i$$
$$(a+bi) - (c+di) = (a-c) + (b-d)i$$

#### 📝 Example:
Let $z_1 = 3 + 4i$ and $z_2 = 1 - 2i$.
$$
\begin{aligned}
  z_1 + z_2 &= (3+1) + (4-2)i = 4 + 2i \\
  z_1 - z_2 &= (3-1) + (4 - (-2))i = 2 + 6i
\end{aligned}
$$

#### 2. Multiplication (မြှောက်ခြင်း)
Algebraic binomials မြှောက်သကဲ့သို့ ဖြန့်မြှောက်ပြီး $i^2 = -1$ ကို အစားထိုးရပါမည်။
$$(a+bi)(c+di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i$$

#### 📝 Example:
$$(2+3i)(4-i) = 2(4) - 2(i) + 3i(4) - 3i^2 = 8 - 2i + 12i + 3 = 11 + 10i$$

---

### 💫 Complex Conjugate (ကိန်းထွေပေါင်းဖက်)

The **complex conjugate** of $z = a + bi$ is denoted by $\bar{z}$ and is defined as:

$$\bar{z} = a - bi$$

(Imaginary Part ၏ လက္ခဏာကို ပြောင်းလဲပေးခြင်း ဖြစ်သည်။)

#### Properties of Conjugate:
* $z \cdot \bar{z} = (a+bi)(a-bi) = a^2 - b^2i^2 = a^2 + b^2$ (ရလဒ်သည် အမြဲတမ်း positive real number ဖြစ်သည်။)

#### 📝 Example:
If $z = 3+4i$, then $\bar{z} = 3-4i$.
$$z\bar{z} = 3^2 + 4^2 = 9 + 16 = 25$$

---

### ➗ Division of Complex Numbers (စားခြင်း)

Complex numbers နှစ်ခုကို စားရန်အတွက် ပိုင်းခြေ (denominator) ၏ complex conjugate ဖြင့် ပိုင်းဝေ (numerator) နှင့် ပိုင်းခြေ (denominator) နှစ်ခုလုံးကို မြှောက်ပေးရပါမည်။

$$\frac{a+bi}{c+di} = \frac{(a+bi)(c-di)}{(c+di)(c-di)} = \frac{(ac+bd) + (bc-ad)i}{c^2+d^2}$$

#### 📝 Example:
Simplify $\frac{2+5i}{1+2i}$.

**Solution:**
Multiply numerator and denominator by conjugate of $(1+2i)$, which is $(1-2i)$:
$$
\begin{aligned}
  \frac{2+5i}{1+2i} &= \frac{(2+5i)(1-2i)}{(1+2i)(1-2i)} \\
  &= \frac{2 - 4i + 5i - 10i^2}{1^2 + 2^2} \\
  &= \frac{2 + i + 10}{1 + 4} \\
  &= \frac{12 + i}{5} \\
  &= \frac{12}{5} + \frac{1}{5}i
\end{aligned}
$$

---

### ✏️ Exercise 1.2

\`\`\`note
{
  "type": "info",
  "title": "Exercise 1.2 Questions",
  "content": "**1. Identify the real and imaginary parts of:**\n* (a) $3 - 7i$\n* (b) $\\sqrt{5}i$\n* (c) $-12$\n\n**2. Find real numbers $x$ and $y$ such that:**\n* (a) $3x + (5y)i = -9 + 15i$\n* (b) $(2x-1) + (y+4)i = 3 - 2i$\n\n**3. Let $z_1 = 2-i$ and $z_2 = 3+4i$. Compute:**\n* (a) $z_1 + z_2$\n* (b) $z_1 z_2$\n* (c) $\\frac{z_1}{z_2}$"
}
\`\`\`

---

### 🗝️ Solutions to Exercise 1.2

<details class="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 cursor-pointer">
<summary class="font-extrabold text-blue-600 select-none">Show/Hide Solutions for Exercise 1.2</summary>

<div class="mt-4 space-y-6">

**1. Real and Imaginary Parts**
* **(a)** $3 - 7i \implies Re = 3, Im = -7$
* **(b)** $\sqrt{5}i \implies Re = 0, Im = \sqrt{5}$
* **(c)** $-12 \implies Re = -12, Im = 0$

**2. Solving for $x$ and $y$**
* **(a)** $3x = -9 \implies x = -3$ and $5y = 15 \implies y = 3$
* **(b)** $2x-1 = 3 \implies 2x=4 \implies x=2$ and $y+4 = -2 \implies y = -6$

**3. Computations with $z_1 = 2-i$, $z_2 = 3+4i$**
* **(a)** $z_1 + z_2 = (2+3) + (-1+4)i = 5 + 3i$
* **(b)** $z_1 z_2 = (2-i)(3+4i) = 6 + 8i - 3i - 4i^2 = 10 + 5i$
* **(c)** Division:
$$
\begin{aligned}
  \frac{2-i}{3+4i} &= \frac{(2-i)(3-4i)}{(3+4i)(3-4i)} \\
  &= \frac{6 - 8i - 3i + 4i^2}{3^2+4^2} \\
  &= \frac{2 - 11i}{25} \\
  &= \frac{2}{25} - \frac{11}{25}i
\end{aligned}
$$

</div>
</details>
`; */

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

<details class="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 cursor-pointer">
<summary class="font-extrabold text-blue-600 select-none">Show/Hide Solutions for Q1</summary>

<div class="mt-4 space-y-6">

**1. Solve the following equations.**

**(a)** $x^2-6x+10=0$
$$
\\begin{aligned}
  x^2-6x &= -10\\\\
  x^2-6x+9 &= -10+9\\\\
  (x-3)^2 &= -1\\\\
  x-3 &= \\pm i\\\\
  x &= 3\\pm i
\\end{aligned}
$$

**(b)** $-2x^2+4x-3=0$
$$
\\begin{aligned}
  x^2-2x+\\frac{3}{2} &= 0\\\\
  x^2-2x &= -\\frac{3}{2}\\\\
  x^2-2x+1 &= -\\frac{3}{2}+1\\\\
  (x-1)^2 &= -\\frac{1}{2}\\\\
  x &= 1\\pm\\frac{\\sqrt{2}}{2}i
\\end{aligned}
$$

**(c)** $5x^2-2x+1=0$
$$
\\begin{aligned}
  x^2-\\frac{2}{5}x &= -\\frac{1}{5}\\\\
  x^2-\\frac{2}{5}x+\\frac{1}{25} &= -\\frac{1}{5}+\\frac{1}{25}\\\\
  \\left(x-\\frac{1}{5}\\right)^2 &= -\\frac{4}{25}\\\\
  x-\\frac{1}{5} &= \\pm\\frac{2}{5}i\\\\
  x &= \\frac{1}{5}\\pm \\frac{2}{5}i
\\end{aligned}
$$

**(d)** $3x^2+7x+5=0$
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

<details class="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 cursor-pointer">
<summary class="font-extrabold text-blue-600 select-none">Show/Hide Solutions for Q2 (With Checks)</summary>

<div class="mt-4 space-y-6">

**2. Solve the following equations and check your answers.**

**(a)** $x^2-2x+4=0$
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
For $1+\\sqrt{3}\\,i$:
$$
(1+\\sqrt{3}\\,i)^2-2(1+\\sqrt{3}\\,i)+4 = (1+2\\sqrt{3}\\,i-3)-2-2\\sqrt{3}\\,i+4 = 0
$$
For $1-\\sqrt{3}\\,i$:
$$
(1-\\sqrt{3}\\,i)^2-2(1-\\sqrt{3}\\,i)+4 = (1-2\\sqrt{3}\\,i-3)-2+2\\sqrt{3}\\,i+4 = 0
$$

**(b)** $x^2-4x+5=0$
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
For $2+i$:
$$
(2+i)^2-4(2+i)+5 = (4+4i-1)-8-4i+5 = 0
$$
For $2-i$:
$$
(2-i)^2-4(2-i)+5 = (4-4i-1)-8+4i+5 = 0
$$

</div>
</details>

<details class="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 cursor-pointer">
<summary class="font-extrabold text-blue-600 select-none">Show/Hide Solutions for Q3 (Powers of i)</summary>

<div class="mt-4 space-y-4">

**3. Find the value of $i^n$ for every positive integer $n$.**

**Solution:**
$$i^0 = 1$$

$$
\\begin{alignedat}{2}
  i^1 &= i \\qquad\\qquad & i^5 &= i^4i = i \\\\
  i^2 &= -1 \\qquad\\qquad & i^6 &= i^4i^2 = -1 \\\\
  i^3 &= i^2i = -i \\qquad\\qquad & i^7 &= i^4i^3 = -i \\\\
  i^4 &= i^2i^2 = 1 \\qquad\\qquad & i^8 &= i^4i^4 = 1
\\end{alignedat}
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
  "content": "Any four consecutive powers of $i$ always have a sum of $0$. \\n\\nFor example:\\n* $i^0+i^1+i^2+i^3 = 1+i-1-i = 0$\\n* $i^1+i^2+i^3+i^4 = i-1-i+1 = 0$\\n* $i^2+i^3+i^4+i^5 = -1-i+1+i = 0$"
}
\`\`\`
`;

