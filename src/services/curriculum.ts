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
          title: 'Basic Operations and Properties',
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
        title: 'Basic Operations and Properties',
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

const chapter1IntroContent = `# 📘 Introduction to Complex Numbers — A Journey Through Time

Complex Numbers ဆိုသည်မှာ သင်္ချာလောက၏ စိတ်လှုပ်ရှားစရာ အကောင်းဆုံးနှင့် အဆန်းကြယ်ဆုံး စိတ်ကူးစိတ်သန်းများထဲမှ တစ်ခုဖြစ်ပါသည်။ အစပိုင်းတွင် ထူးဆန်းသည်ဟု ထင်ရသော်လည်း၊ ၎င်းတို့၏ စွမ်းအားမှာ သိပ္ပံနှင့် နည်းပညာလောကအတွက် မရှိမဖြစ်လိုအပ်လှပါသည်။ ဤသင်ခန်းစာတွင် ကျွန်ုပ်တို့သည် သာမန် Real Numbers များ၏ နယ်ပယ်မှကျော်လွန်၍ အနှုတ်ကိန်းများ၏ Square Root တန်ဖိုးများကိုပါ အဓိပ္ပာယ်ဖွင့်ဆိုနိုင်မည့် ပိုမိုကျယ်ပြန့်သော Universe သစ်ဆီသို့ အတူတကွ ခရီးစတင်ကြပါမည်။

သင်္ချာပညာရှင်များသည် Complex Numbers များကို အပျော်သက်သက် တီထွင်ခဲ့ကြခြင်းမဟုတ်ဘဲ၊ လက်တွေ့ဘဝတွင် ကြုံတွေ့ရသော Algebra ဆိုင်ရာ ပြဿနာများကို ဖြေရှင်းရန် ကြိုးပမ်းရာမှ သဘာဝအလျောက် ပေါ်ထွက်လာခဲ့ခြင်းဖြစ်ပါသည်။ ဤရှာဖွေတွေ့ရှိမှုက သင်္ချာနယ်ပယ်တစ်ခုလုံးကို ပုံသဏ္ဌာန်သစ်ဖြင့် ပြန်လည်အသက်သွင်းစေခဲ့ပါသည်။

---

### 🌍 Why Did Complex Numbers Arise?

၁၅၀၀ ပြည့်နှစ်များအတွင်း သင်္ချာပညာရှင်များသည် Polynomial Equations များ၊ အထူးသဖြင့် Cubic Equations များကို ဖြေရှင်းရန် အလွန်ခက်ခဲစွာ ကြိုးပမ်းခဲ့ကြရပါသည်။ Real Numbers များသည် ပြဿနာအတော်များများအတွက် အဆင်ပြေသော်လည်း၊ အချို့သော Algebraic Formulas များကို တွက်ချက်ရာတွင် Traditional Number Line ပေါ်တွင် အဓိပ္ပာယ်မရှိသော $\sqrt{-1}$ ကဲ့သို့သော Expression များ ပေါ်ထွက်လာခဲ့ပါသည်။

Algebra ကို အပြည့်အစုံ ခြုံငုံဖြေရှင်းနိုင်ရန်နှင့် Equations များကို တစ်သမတ်တည်း တွက်ချက်နိုင်ရန်အတွက် သင်္ချာပညာရှင်များသည် ဤ "Imaginary Quantities" များကို လက်ခံအသုံးပြုရန် ဖိအားပေးခြင်း ခံခဲ့ရပါသည်။ ဤသို့ဖြင့် Complex Number ဟူသော တော်လှန်ရေးအယူအဆတစ်ခု မွေးဖွားလာခဲ့ပါသည်။

---

### 🕰️ Timeline: The Development of Complex Numbers

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
  "content": "$$i = \\sqrt{-1}$$ \n\nဤ $i$ သင်္ကေတကို **Imaginary Unit** ဟု ခေါ်ဆိုပြီး ၎င်းသည် ကိန်းထွေများ၏ အခြေခံအုတ်မြစ် ဖြစ်သည်။ $i$ ၏ အဓိကဂုဏ်သတ္တိမှာ $i^2 = -1$ ဖြစ်သည်။"
}
\`\`\`

## 📐 1. The Standard Form

Complex Number တစ်ခုကို ပုံမှန်အားဖြင့် အောက်ပါ Form ဖြင့် ရေးသားနိုင်ပါသည် -

$$z = a + bi$$

### Definitions:
* **a (Real Part):** ကိန်းစစ်အပိုင်း ဖြစ်ပြီး $Re(z)$ ဟု ရေးသားသည်။
* **b (Imaginary Part):** စိတ်ကူးယဉ်အပိုင်း ဖြစ်ပြီး $Im(z)$ ဟု ရေးသားသည်။

ဥပမာ - $z = 3 + 4i$ တွင် Real Part မှာ 3 ဖြစ်ပြီး Imaginary Part မှာ 4 ဖြစ်သည်။

\`\`\`complex-plane
{
  "points": [
    { "x": 3, "y": 4, "label": "z = 3 + 4i", "color": "#2563eb" },
    { "x": -2, "y": 2, "label": "w = -2 + 2i", "color": "#10b981" },
    { "x": 0, "y": -3, "label": "-3i", "color": "#8b5cf6" }
  ]
}
\`\`\`

---

## ⚡ 2. Powers of $i$ (Cycle Pattern)

$i$ ကို အထပ်ထပ်မြှောက်သွားလျှင် အောက်ပါအတိုင်း Cycle တစ်ခု ရရှိပါလိမ့်မည် -

*   **$i^1 = i$**
*   **$i^2 = -1$**
*   **$i^3 = -i$**
*   **$i^4 = 1$**

\`\`\`note
{
  "type": "tip",
  "title": "Quick Trick",
  "content": "မည်သည့် $i^n$ ကိုမဆို ရှာလိုလျှင် $n$ ကို 4 နှင့်စား၍ အကြွင်းကိုကြည့်ပါ။ \n- အကြွင်း 1 ဆိုလျှင် $i$ \n- အကြွင်း 2 ဆိုလျှင် $-1$ \n- အကြွင်း 3 ဆိုလျှင် $-i$ \n- အကြွင်း 0 ဆိုလျှင် $1$ ဖြစ်သည်။"
}
\`\`\`

---

## 🌐 3. The Complex Plane (Argand Diagram)

ကိန်းစစ် (Real numbers) များသည် ကိန်းမျဉ်း (Number line) ပေါ်တွင်သာ ရှိသော်လည်း ကိန်းထွေများမှာမူ **Complex Plane** ဟုခေါ်သော ပြင်ညီတစ်ခုပေါ်တွင် တည်ရှိကြသည်။

*   **Horizontal Axis:** Real Axis (ကိန်းစစ်ဝင်ရိုး)
*   **Vertical Axis:** Imaginary Axis (စိတ်ကူးယဉ်ဝင်ရိုး)

---

### 🚀 4. Why Are Complex Numbers Important?

\`\`\`features
[
  {
    "title": "Electrical Engineering",
    "description": "AC Circuits များတွင် Voltage နှင့် Current များကို တိကျစွာ ကိုယ်စားပြု တွက်ချက်ရာ၌ အသုံးပြုသည်။",
    "iconName": "Zap",
    "color": "amber"
  },
  {
    "title": "Quantum Mechanics",
    "description": "အက်တမ်နှင့် အက်တမ်အောက်အမှုန်များ၏ ရူပဗေဒ ဖြစ်စဉ်များကို နားလည်ရန် မရှိမဖြစ် လိုအပ်သည်။",
    "iconName": "Atom",
    "color": "blue"
  },
  {
    "title": "Computer Science",
    "description": "Computer Graphics နှင့် Algorithms များတွင် ရှုပ်ထွေးသော လှည့်ပတ်မှုများကို တွက်ချက်ရန် အသုံးပြုသည်။",
    "iconName": "Monitor",
    "color": "emerald"
  },
  {
    "title": "Signal Processing",
    "description": "အချက်ပြ လှိုင်းများကို ခွဲခြမ်းစိတ်ဖြာရာတွင် အဓိက လက်နက်တစ်ခု ဖြစ်သည်။",
    "iconName": "Radio",
    "color": "rose"
  }
]
\`\`\`

---

### 📚 5. Topics in this Chapter

* Pure Imaginary Unit နှင့် ၎င်း၏ ဂုဏ်သတ္တိများ
* Complex Numbers များ၏ ပေါင်း၊ နှုတ်၊ မြှောက်၊ စားခြင်း
* Trigonometric Form (Polar Form) သို့ ပြောင်းလဲခြင်း
* ကိန်းထွေများ၏ နှစ်ထပ်ကိန်းရင်းနှင့် အထပ်ကိန်းရင်းများ ရှာဖွေခြင်း

---

**$$x^2 = -1$$**
မဖြစ်နိုင်ရာမှ... အစစ်အမှန် ဖြစ်လာခြင်း။`;

const chapter1BasicContent = `# 🛠️ Basic Operations and Properties

Complex Numbers များကို Real Numbers များကဲ့သို့ပင် ပေါင်းခြင်း၊ နှုတ်ခြင်း၊ မြှောက်ခြင်းနှင့် စားခြင်းတို့ကို ဆောင်ရွက်နိုင်ပါသည်။ သို့သော် အချို့သော နည်းဥပဒေများကို သတိပြုရန် လိုအပ်ပါသည်။

## 1. Addition and Subtraction

Complex numbers နှစ်ခုကို ပေါင်းလျှင် (သို့) နှုတ်လျှင် Real parts အချင်းချင်းနှင့် Imaginary parts အချင်းချင်းကို သီးခြားစီ ဆောင်ရွက်ရပါမည်။

**Formula:**
$$(a + bi) \\pm (c + di) = (a \\pm c) + (b \\pm d)i$$

\`\`\`note
{
  "type": "info",
  "title": "Example",
  "content": "If $z = 3 + 2i$ and $w = 1 + 5i$, then \n\n$z + w = (3+1) + (2+5)i = 4 + 7i$"
}
\`\`\`

---

## 2. Multiplication

Complex numbers နှစ်ခုကို မြှောက်ရာတွင် Polynomial များမြှောက်သကဲ့သို့ (FOIL method) အသုံးပြုနိုင်ပါသည်။ သို့သော် $i^2 = -1$ ဖြစ်သည်ကို မမေ့ပါနှင့်။

**Formula:**
$$(a + bi)(c + di) = ac + adi + bci + bdi^2$$
$$= (ac - bd) + (ad + bc)i$$

---

## 3. Conjugate of a Complex Number

ကိန်းထွေ $z = a + bi$ ၏ **Conjugate** မှာ $\\bar{z} = a - bi$ ဖြစ်သည်။ ၎င်းသည် Complex plane ပေါ်တွင် Real axis ကို အခြေခံ၍ Mirror image (မှန်ပြန်ပုံရိပ်) ဖြစ်သည်။

\`\`\`complex-plane
{
  "points": [
    { "x": 2, "y": 3, "label": "z = 2 + 3i", "color": "#2563eb" },
    { "x": 2, "y": -3, "label": "z̄ = 2 - 3i", "color": "#f43f5e" }
  ]
}
\`\`\`

---

## 4. Division

Complex numbers များကို စားရာတွင် ပိုင်းခြေ (denominator) ရှိ $i$ ကို ဖျောက်ရန်အတွက် ပိုင်းခြေ၏ Conjugate နှင့် အပေါ်အောက် မြှောက်ပေးရပါမည်။

---

\`\`\`note
{
  "type": "warning",
  "title": "Important Property",
  "content": "$$z \\cdot \\bar{z} = (a + bi)(a - bi) = a^2 + b^2$$ \n\nဤရလဒ်သည် အမြဲတမ်း 'Real Number' ဖြစ်ပြီး Non-negative ဖြစ်သည်။"
}
\`\`\`
`;
