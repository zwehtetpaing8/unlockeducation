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
          title: 'Pure Imaginary Unit i',
          type: 'theory',
          content: chapter1BasicContent,
          order_index: 2,
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
        title: 'Pure Imaginary Unit i',
        type: 'theory',
        content: chapter1BasicContent,
        order_index: 2,
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
    "description": "ဤကိန်းများကို 'Imaginary' (စိတ်ကူးယဉ်) ဟု အမည်တပ်ခဲ့သူ ဖြစ်သည်။"
  },
  {
    "year": "18th Century",
    "title": "Leonhard Euler",
    "description": "i = √-1 သင်္ကေတနှင့် Euler's Formula ကို မိတ်ဆက်ခဲ့သည်။"
  },
  {
    "year": "19th Century",
    "title": "Gauss & Cauchy",
    "description": "Complex Numbers များကို စနစ်တကျ သင်္ချာဆိုင်ရာ အရာဝတ္ထုများအဖြစ် တည်ဆောက်ခဲ့ကြသည်။"
  }
]
\`\`\`

---

\`\`\`note
{
  "type": "definition",
  "title": "The Imaginary Unit",
  "content": "$$i = \\\\sqrt{-1}$$ \\n\\nဤ $i$ သင်္ကေတကို **Imaginary Unit** ဟု ခေါ်ဆိုပြီး ၎င်းသည် ကိန်းထွေများ၏ အခြေခံအုတ်မြစ် ဖြစ်သည်။ $i$ ၏ အဓိကဂုဏ်သတ္တိမှာ $i^2 = -1$ ဖြစ်သည်။"
}
\`\`\`

## 1. The Standard Form

Complex Number တစ်ခုကို ပုံမှန်အားဖြင့် အောက်ပါ Form ဖြင့် ရေးသားနိုင်ပါသည် -

$$z = a + bi$$

### Definitions:
* **a (Real Part):** ကိန်းစစ်အပိုင်း ဖြစ်ပြီး $Re(z)$ ဟု ရေးသားသည်။
* **b (Imaginary Part):** စိတ်ကူးယဉ်အပိုင်း ဖြစ်ပြီး $Im(z)$ ဟု ရေးသားသည်။

ဥပမာ - $z = 3 + 4i$ တွင် Real Part မှာ 3 ဖြစ်ပြီး Imaginary Part မှာ 4 ဖြစ်သည်။

---

## 2. Powers of $i$ (Cycle Pattern)

$i$ ကို အထပ်ထပ်မြှောက်သွားလျှင် အောက်ပါအတိုင်း Cycle တစ်ခု ရရှိပါလိမ့်မည် -

*   **$i^1 = i$**
*   **$i^2 = -1$**
*   **$i^3 = -i$**
*   **$i^4 = 1$**

\`\`\`note
{
  "type": "tip",
  "title": "Quick Trick",
  "content": "မည်သည့် $i^n$ ကိုမဆို ရှာလိုလျှင် $n$ ကို 4 နှင့်စား၍ အကြွင်းကိုကြည့်ပါ။ \\n- အကြွင်း 1 ဆိုလျှင် $i$ \\n- အကြွင်း 2 ဆိုလျှင် $-1$ \\n- အကြွင်း 3 ဆိုလျှင် $-i$ \\n- အကြွင်း 0 ဆိုလျှင် $1$ ဖြစ်သည်။"
}
\`\`\`

---

## 3. The Complex Plane (Argand Diagram)

ကိန်းစစ် (Real numbers) များသည် ကိန်းမျဉ်း (Number line) ပေါ်တွင်သာ ရှိသော်လည်း ကိန်းထွေများမှာမူ **Complex Plane** ဟုခေါ်သော ပြင်ညီတစ်ခုပေါ်တွင် တည်ရှိကြသည်။

*   **Horizontal Axis:** Real Axis 
*   **Vertical Axis:** Imaginary Axis 
---

### 4. Why Are Complex Numbers Important?

\`\`\`features
[
  {
    "title": "Electrical Engineering",
    "description": "Used in AC Circuits to accurately represent and calculate Voltage and Current.",
    "iconName": "Zap",
    "color": "amber"
  },
  {
    "title": "Quantum Mechanics",
    "description": "Essential for understanding the physical phenomena of atoms and subatomic particles.",
    "iconName": "Atom",
    "color": "blue"
  },
  {
    "title": "Computer Science",
    "description": "Used for calculating complex rotations in Computer Graphics and Algorithms.",
    "iconName": "Monitor",
    "color": "emerald"
  },
  {
    "title": "Signal Processing",
    "description": "A fundamental tool for analyzing and processing signal waveforms.",
    "iconName": "Radio",
    "color": "rose"
  }
]
\`\`\`

---

### 5. Topics in this Chapter

* Pure Imaginary Unit i
* Complex Number
* Operations on Complex Numbers
* Trigonometric Form 
* Roots of Complex Numbers

---`;

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

### 📝 Example 1
Solve:
$$x^2-2x+5=0$$

#### 💡 Perfect Square Method (ပုံစံရှိသော ညီမျှခြင်းကို Perfect Square ပြောင်းနည်း)
\`\`\`note
{
  "type": "tip",
  "title": "$ax^2+bx+c=0$ ပုံစံရှိသော ညီမျှခြင်းကို Perfect Square ပြောင်းနည်း",
  "content": "1. $x^2$ ၏ မြှောက်ဖော်ကိန်း $a$ ကို $1$ ဖြစ်အောင်လုပ်ပါ။\\n2. ကိန်းသေ $c$ ကို R.H.S (ညာဘက်ခြမ်း) သို့ပို့ပါ။\\n3. အလယ်ကိန်း $b$ ၏ မြှောက်ဖော်ကိန်းကို $2$ ဖြင့်စားပါ။\\n4. ရလာသောအဖြေကို $2$ ထပ်တင်ပြီး ညီမျှခြင်းနှစ်ဖက်စလုံးတွင် ပေါင်းပါ။"
}
\`\`\`

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

#### 📊 Check / တွက်ချက်မှု တိုက်ဆိုင်စစ်ဆေးခြင်း:

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

