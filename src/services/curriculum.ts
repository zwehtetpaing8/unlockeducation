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
          title: 'The Mysterious World of Complex Numbers',
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
          content: '# Basic Operations\n\nContent coming soon...',
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
        title: 'The Mysterious World of Complex Numbers',
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
        content: '# Basic Operations\n\nContent coming soon...',
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
          title: 'The Mysterious World of Complex Numbers',
          content: chapter1IntroContent
        };
      }
    }

    return data;
  },
};

const chapter1IntroContent = `# The Mysterious World of Complex Numbers

\`\`\`carousel
image1.jpg
image2.jpg
image3.jpg
image4.jpg
image5.jpg
image6.jpg
\`\`\`

### ပဟေဠိဆန်သော မေးခွန်းတစ်ခု
“အနှုတ်ကိန်းတစ်ခု၏ နှစ်ထပ်ကိန်းရင်းကို ကျွန်ုပ်တို့ အမှန်တကယ် ရှာဖွေနိုင်ပါသလား?”

ရာစုနှစ်ပေါင်းများစွာတိုင်အောင် သင်္ချာပညာရှင်များသည် အချို့သော ပုစ္ဆာများကို ဖြေရှင်းရန် လုံးဝမဖြစ်နိုင်ဟု ယုံကြည်ခဲ့ကြသည်။ ထိုသို့ မဖြစ်နိုင်ဟု ထင်ရသော ပုစ္ဆာများထဲမှ တစ်ခုမှာ အောက်ပါအတိုင်း ဖြစ်သည် -

$$x^2 = -1$$

ဤအချက်ကို သေချာစွာ စဉ်းစားကြည့်ပါ။
* မည်သည့် အပေါင်းကိန်းကိုမဆို နှစ်ထပ်တင်လျှင် အပေါင်းကိန်းသာ ရရှိသည်။
* မည်သည့် အနှုတ်ကိန်းကိုမဆို နှစ်ထပ်တင်လျှင်လည်း အပေါင်းကိန်းသာ ရရှိပြန်သည်။

သို့ဆိုလျှင် ကိန်းတစ်ခုကို ၎င်းကိုယ်တိုင်နှင့် ပြန်လည်မြှောက်ပါက မည်သို့သော နည်းလမ်းဖြင့် $-1$ ရရှိနိုင်ပါမည်နည်း။ အစပိုင်းတွင် ဤအချက်သည် ယုတ္တိမတန်သလို၊ မဖြစ်နိုင်သလို၊ အဓိပ္ပာယ်ပင် မရှိဟု ထင်ရသည်။ သို့သော် ဤနက်နဲသော ညီမျှခြင်းတစ်ခုတည်းကပင် သင်္ချာလောက၏ အလှပဆုံးနှင့် အစွမ်းထက်ဆုံး စိတ်ကူးစိတ်သန်းတစ်ခုဖြစ်သည့် **ကိန်းထွေများ (Complex Numbers)** ဆီသို့ တံခါးဖွင့်ပေးခဲ့ပါသည်။

---

## ၁။ သင်္ချာလောကကို ပြောင်းလဲစေခဲ့သော လျှို့ဝှက်ချက်

\`\`\`carousel
image7.jpg
image8.jpg
image9.jpg
image10.jpg
image11.jpg
\`\`\`

၁၆ ရာစုအတွင်း သင်္ချာပညာရှင်များသည် ခက်ခဲသော အက္ခရာသင်္ချာ ညီမျှခြင်းများကို ဖြေရှင်းရန် ကြိုးပမ်းနေကြသည်။ ထိုစဉ်က Gerolamo Cardano သည် အနှုတ်ကိန်းများ၏ နှစ်ထပ်ကိန်းရင်းများ ပါဝင်နေသော ထူးဆန်းသော ရလဒ်များကို စတင်တွေ့ရှိခဲ့သည်။

အစပိုင်းတွင် ထိုကိန်းများကို သင်္ချာလောက၏ "တစ္ဆေများ" ကဲ့သို့ သတ်မှတ်ခဲ့ကြပြီး လက်တွေ့တွင် တည်ရှိနေပုံမရသောကြောင့် “စိတ်ကူးယဉ်ကိန်းများ” (Imaginary Numbers) ဟု ခေါ်ဆိုခဲ့ကြသည်။ နောက်ပိုင်းတွင် Leonhard Euler နှင့် Carl Friedrich Gauss ကဲ့သို့သော ပညာရှင်များသည် ဤကိန်းများ၏ အရေးပါပုံကို သက်သေပြခဲ့ကြသည်။

### လက်တွေ့နယ်ပယ်မှ အသုံးချမှုများ
ဤကိန်းများသည် စိတ်ကူးယဉ်သက်သက် မဟုတ်ဘဲ အောက်ပါကဏ္ဍများတွင် အဓိကမဏ္ဍိုင် ဖြစ်လာခဲ့သည် -
* **လျှပ်စစ်ဓာတ်အား (Electricity):** Alternating current (AC) များကို တွက်ချက်ခြင်း။
* **အသံနှင့် လှိုင်းများ (Sound & Waves):** အသံလှိုင်းနှင့် လှိုင်းအချက်ပြမှုများကို စီမံခြင်း။
* **ကွမ်တမ် ရူပဗေဒ (Quantum Physics):** အက်တမ်အဆင့်ရှိ ဖြစ်စဉ်များကို ရှင်းပြခြင်း။
* **ခေတ်သစ် အင်ဂျင်နီယာပညာ:** လေယာဉ်ဒီဇိုင်းမှအစ ကွန်ပျူတာ ဂရပ်ဖစ်အထိ။

---

## ၂။ Imaginary Unit ၏ အစပြုခြင်း

မဖြစ်နိုင်ဟု ထင်ရသော ညီမျှခြင်းကို ဖြေရှင်းရန်အတွက် သင်္ချာပညာရှင်များသည် သင်္ကေတအသစ်တစ်ခုကို သတ်မှတ်ခဲ့ကြသည် -

$$i = \sqrt{-1}$$

ဤ $i$ သင်္ကေတကို **Imaginary Unit** ဟု ခေါ်ဆိုပြီး ၎င်းသည် ကိန်းထွေများ၏ အခြေခံအုတ်မြစ် ဖြစ်သည်။

### ကိန်းထွေများ၏ တည်ဆောက်ပုံ (General Form)
ကိန်းထွေတစ်ခုကို ပုံမှန်အားဖြင့် အောက်ပါအတိုင်း ဖော်ပြလေ့ရှိသည် -

$$z = a + bi$$

**အဓိပ္ပာယ်ဖွင့်ဆိုချက်များ:**
* **$a$ (Real Part):** ကိန်းစစ်အပိုင်း ဖြစ်ပြီး $Re(z)$ ဟု ရေးသားသည်။
* **$b$ (Imaginary Part):** စိတ်ကူးယဉ်အပိုင်း ဖြစ်ပြီး $Im(z)$ ဟု ရေးသားသည်။

*ဥပမာ - $z = 3 + 4i$ တွင် Real Part မှာ $3$ ဖြစ်ပြီး Imaginary Part မှာ $4$ ဖြစ်သည်။*

---

## ၃။ $i$ ၏ တန်ဖိုးများနှင့် Cycle pattern

$i$ ကို အထပ်ထပ်မြှောက်သွားလျှင် မြန်မာစာသင်ခန်းများတွင် အလွန်အရေးကြီးသော ပုံသေနည်း (၄) မျိုး ရရှိပါလိမ့်မည် -

*   **$i^1 = i$**
*   **$i^2 = -1$**
*   **$i^3 = -i$**
*   **$i^4 = 1$**

ဤရလဒ်သည် ၄ ကြိမ်တိုင်းတွင် တစ်ပတ်ပြန်လည်နေသဖြင့် မည်သည့် $i^n$ တန်ဖိုးကိုမဆို လွယ်ကူစွာ ရှာဖွေနိုင်မည် ဖြစ်သည်။

---

## ၄။ ကိန်းဂဏန်းများကို အတိုင်းအတာသစ်မှ ကြည့်မြင်ခြင်း

\`\`\`carousel
image12.jpg
image13.jpg
image14.jpg
image15.jpg
image16.jpg
image17.jpg
\`\`\`

ကိန်းစစ် (Real numbers) များသည် ကိန်းမျဉ်း (Number line) ပေါ်တွင်သာ ရှိသော်လည်း ကိန်းထွေများမှာမူ **Complex Plane** ဟုခေါ်သော ပြင်ညီတစ်ခုပေါ်တွင် တည်ရှိကြသည်။

*   **အလျားလိုက်ဝင်ရိုး (Horizontal Axis):** Real Axis
*   **ဒေါင်လိုက်ဝင်ရိုး (Vertical Axis):** Imaginary Axis

![Complex Plane Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Complex_number_illustration.svg/1200px-Complex_number_illustration.svg.png)

ဤစနစ်သစ်ကြောင့် အက္ခရာသင်္ချာသည် ဂျီသြမေတြီနှင့် ပေါင်းစပ်သွားပြီး ညီမျှခြင်းများသည် လှပသော ပုံသဏ္ဌာန်များနှင့် လှုပ်ရှားမှုများအဖြစ်သို့ ပြောင်းလဲသွားသည်။

---

## ၅။ ဤအခန်းတွင် ကျွန်ုပ်တို့ လေ့လာမည့် ခေါင်းစဉ်များ

သင်္ချာဘာသာရပ်၏ ဤအခန်းကဏ္ဍတွင် အောက်ပါအခြေခံမှ အဆင့်မြင့်သင်ခန်းစာများကို အဆင့်ဆင့် လေ့လာသွားမည် ဖြစ်သည် -
* Pure Imaginary Unit နှင့် ၎င်း၏ ဂုဏ်သတ္တိများ
* Complex Numbers များ၏ ပေါင်း၊ နှုတ်၊ မြှောက်၊ စားခြင်း
* Trigonometric Form (Polar Form) သို့ ပြောင်းလဲခြင်း
* ကိန်းထွေများ၏ နှစ်ထပ်ကိန်းရင်းနှင့် အထပ်ကိန်းရင်းများ ရှာဖွေခြင်း

### နိဂုံးချုပ်အတွေး
သင်္ချာလောက၏ အကြီးကျယ်ဆုံးသော ရှာဖွေတွေ့ရှိမှုများသည် သာမန်အတွေးအခေါ်များ ရပ်တန့်သွားသည့် နေရာမှပင် စတင်လေ့ရှိပါသည်။ ဤအခန်းသည် သင့်အား ကိန်းဂဏန်းများ၏ ကမ္ဘာသစ်တစ်ခုဆီသို့ ခေါ်ဆောင်သွားမည်ဟု မျှော်လင့်ပါသည်။

---

**$$x^2 = -1$$**
*မဖြစ်နိုင်ရာမှ... အစစ်အမှန် ဖြစ်လာခြင်း။*`;
