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

“အနှုတ်ကိန်းတစ်ခု၏ နှစ်ထပ်ကိန်းရင်းကို ကျွန်ုပ်တို့ အမှန်တကယ် ရှာဖွေနိုင်ပါသလား?”

ရာစုနှစ်ပေါင်းများစွာတိုင်အောင် သင်္ချာပညာရှင်များသည် အချို့သော ပုစ္ဆာများကို ဖြေရှင်းရန် လုံးဝမဖြစ်နိုင်ဟု ယုံကြည်ခဲ့ကြသည်။ ထိုသို့ မဖြစ်နိုင်ဟု ထင်ရသော ပုစ္ဆာများထဲမှ တစ်ခုမှာ အောက်ပါအတိုင်း ဖြစ်သည် -

$$x^2 = -1$$

ဤအချက်ကို သေချာစွာ စဉ်းစားကြည့်ပါ။
- မည်သည့် အပေါင်းကိန်းကိုမဆို နှစ်ထပ်တင်လျှင် အပေါင်းကိန်းသာ ရရှိသည်။
- မည်သည့် အနှုတ်ကိန်းကိုမဆို နှစ်ထပ်တင်လျှင်လည်း အပေါင်းကိန်းသာ ရရှိပြန်သည်။

သို့ဆိုလျှင် ကိန်းတစ်ခုကို ၎င်းကိုယ်တိုင်နှင့် ပြန်လည်မြှောက်ပါက မည်သို့သော နည်းလမ်းဖြင့် $-1$ ရရှိနိုင်ပါမည်နည်း။
အစပိုင်းတွင် ဤအချက်သည် ယုတ္တိမတန်သလို၊ မဖြစ်နိုင်သလို၊ အဓိပ္ပာယ်ပင် မရှိဟု ထင်ရသည်။ သို့သော် ဤနက်နဲသော ညီမျှခြင်းတစ်ခုတည်းကပင် သင်္ချာလောက၏ အလှပဆုံးနှင့် အစွမ်းထက်ဆုံး စိတ်ကူးစိတ်သန်းတစ်ခုဖြစ်သည့် ကိန်းထွေများ (Complex Numbers) ဆီသို့ တံခါးဖွင့်ပေးခဲ့ပါသည်။

---

# A Mathematical Mystery That Changed the World

\`\`\`carousel
image7.jpg
image8.jpg
image9.jpg
image10.jpg
image11.jpg
\`\`\`

၁၆ ရာစုအတွင်း သင်္ချာပညာရှင်များသည် ခက်ခဲသော အက္ခရာသင်္ချာ ညီမျှခြင်းများကို ဖြေရှင်းရန် ကြိုးပမ်းနေကြသည်။ ထိုပုစ္ဆာများကို ဖြေရှင်းရင်း Gerolamo Cardano သည် ထူးဆန်းသော အရာတစ်ခုနှင့် ကြုံတွေ့ခဲ့ရသည် — ၎င်းမှာ အနှုတ်ကိန်းများ၏ နှစ်ထပ်ကိန်းရင်းများ ပါဝင်နေခြင်းပင် ဖြစ်သည်။

အစပိုင်းတွင် ထိုကိန်းများကို သင်္ချာလောက၏ "တစ္ဆေများ" ကဲ့သို့ သတ်မှတ်ခဲ့ကြသည်။ လက်တွေ့တွင် တည်ရှိနေပုံမရသောကြောင့် လူတို့က ၎င်းတို့ကို “စိတ်ကူးယဉ်ကိန်းများ” (Imaginary Numbers) ဟု ခေါ်ဆိုခဲ့ကြသည်။ နောက်ပိုင်းတွင် Leonhard Euler နှင့် Carl Friedrich Gauss ကဲ့သို့သော ထူးချွန်သည့် သင်္ချာပညာရှင်များသည် ဤနက်နဲသော ကိန်းများကို ပိုမိုနက်ရှိုင်းစွာ စူးစမ်းလေ့လာခဲ့ကြသည်။ ၎င်းတို့ ရှာဖွေတွေ့ရှိခဲ့သည့် အချက်မှာ သင်္ချာလောကကို ထာဝရ ပြောင်းလဲစေခဲ့သည်။

ဤကိန်းများသည် အသုံးမဝင်သော စိတ်ကူးယဉ်အရာဝတ္ထုများ မဟုတ်ဘဲ အောက်ပါကဏ္ဍများကို ဖော်ပြရန်အတွက် အလွန်အရေးပါကြောင်း တွေ့ရှိခဲ့ရသည် -

- [x] လျှပ်စစ်ဓာတ်အား (Electricity)
- [x] အသံလှိုင်းများ (Sound waves)
- [x] ကွမ်တမ် ရူပဗေဒ (Quantum physics)
- [x] လှိုင်းအချက်ပြ စီမံဆောင်ရွက်မှု (Signal processing)
- [x] ကွန်ပျူတာ ဂရပ်ဖစ် (Computer graphics)
- [x] ခေတ်သစ် အင်ဂျင်နီယာပညာ (Modern engineering)

ယနေ့ခေတ် နည်းပညာအများစုသည် ကိန်းထွေများအပေါ်တွင် တိတ်တဆိတ် မှီခိုအားထားနေရပါသည်။

---

# The Birth of the Imaginary Unit

မဖြစ်နိုင်ဟု ထင်ရသော ညီမျှခြင်းကို ဖြေရှင်းရန်အတွက် သင်္ချာပညာရှင်များသည် သင်္ကေတအသစ်တစ်ခုကို တီထွင်ခဲ့ကြသည် -

$$i = \\sqrt{-1}$$

Imaginary Unit ဟု ခေါ်ဆိုသော ဤသင်္ကေတသည် ကိန်းထွေးများ၏ အခြေခံအုတ်မြစ် ဖြစ်လာခဲ့သည်။ သင်္ချာပညာရှင်များက ဤစိတ်ကူးသစ်ကို လက်ခံလိုက်သည်နှင့် တစ်ပြိုင်နက် သင်္ချာဆိုင်ရာ စကြဝဠာအသစ်တစ်ခု ပေါ်ပေါက်လာခဲ့သည်။
ကိန်းထွေတစ်ခုကို အောက်ပါအတိုင်း ရေးသားနိုင်သည် -

$$z = a + bi$$

ဤတွင်:
- **a** is the Real Part, denoted by $Re(z)$.
- **b** is the Imaginary Part, denoted by $Im(z)$.

**Example:** In $z = -2 + 7i$, $Re(z) = -2$ and $Im(z) = 7$.

ပထမကြည့်လျှင် ဤအချက်သည် ထူးဆန်းနေနိုင်သော်လည်း အံ့ဩစရာကောင်းသည်မှာ ကိန်းထွေများသည် လှပပြီး စနစ်တကျ ရှိနေခြင်းပင် ဖြစ်သည်။ ၎င်းတို့ကို ပေါင်းခြင်း၊ မြှောက်ခြင်း၊ ဂရပ်ဖစ်ဖော်ပြခြင်း၊ လှည့်ပတ်ခြင်းတို့ ပြုလုပ်နိုင်သည့်အပြင် သဘာဝဖြစ်စဉ်များကို ဖော်ပြရာတွင်လည်း အသုံးပြုနိုင်ပါသည်။

---

# Powers of $i$

$$i = \\sqrt{-1}$$

$i$ ကို အထပ်ထပ်မြှောက်သွားလျှင် ၄ ခုမြောက်တိုင်းမှာ တစ်ပတ်ပြန်လည်နေတဲ့ Pattern ကို တွေ့ရပါလိမ့်မည်။

$$i^1 = i$$
$$i^2 = -1$$
$$i^3 = -i$$
$$i^4 = 1$$
$$i^5 = i^4 \\cdot i = 1 \\cdot i = i$$
$$i^6 = i^4 \\cdot i^2 = 1 \\cdot (-1) = -1$$
$$i^7 = i^4 \\cdot i^3 = 1 \\cdot (-i) = -i$$
$$i^8 = i^4 \\cdot i^4 = 1 \\cdot 1 = 1$$

---

# Seeing Numbers in a New Dimension

\`\`\`carousel
image12.jpg
image13.jpg
image14.jpg
image15.jpg
image16.jpg
image17.jpg
\`\`\`

Real numbers များသည် ကိန်းမျဉ်း (Number line) တစ်ခုပေါ်တွင်သာ တည်ရှိကြသည်။ သို့သော် ကိန်းထွေးများမှာမူ **Complex Plane** ဟုခေါ်သော လုံးဝခြားနားသည့် ကမ္ဘာတစ်ခုတွင် တည်ရှိကြသည်။

ကိန်းဂဏန်းများသည် ဘယ်နှင့် ညာသို့သာ ရွေ့လျားနိုင်ခြင်း မဟုတ်တော့ဘဲ အောက်ပါအတိုင်း ရွေ့လျားနိုင်လာသည် -
- **အလျားလိုက် (Horizontally)** $\\rightarrow$ Real Axis
- **ဒေါင်လိုက် (Vertically)** $\\rightarrow$ Imaginary Axis

![Complex Plane Diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Complex_number_illustration.svg/1200px-Complex_number_illustration.svg.png)

ရုတ်တရက်ဆိုသလိုပင် ကိန်းဂဏန်းများသည် ဂျီသြမေတြီသဘောတရားများ ဖြစ်လာကြသည်။ အက္ခရာသင်္ချာသည် ရုပ်ပုံကားချပ်များအဖြစ် ပြောင်းလဲသွားပြီး၊ ညီမျှခြင်းများသည် ပုံသဏ္ဌာန်များနှင့် လှုပ်ရှားမှုများ ဖြစ်လာကြသည်။ ဤအချက်သည် ကိန်းထွေများကို သင်္ချာလောက၏ အလှပဆုံးသော ဘာသာရပ်တစ်ခုအဖြစ် သတ်မှတ်ရခြင်း၏ အကြောင်းရင်းတစ်ခုပင် ဖြစ်သည်။

---

# Why Complex Numbers Matter Today

\`\`\`carousel
image18.jpg
image19.jpg
image20.jpg
image21.jpg
image22.jpg
\`\`\`

ကိန်းထွေးများသည် စာသင်ခန်းထဲမှ သီအိုရီသက်သက်သာ မဟုတ်ပါ။ ၎င်းတို့ကို အောက်ပါကဏ္ဍများတွင် လက်တွေ့အသုံးပြုနေကြသည် -
- **လျှပ်စစ်အင်ဂျင်နီယာဘာသာရပ်:** AC circuits များကို ကိန်းထွေများအသုံးပြု၍ ခွဲခြမ်းစိတ်ဖြာသည်။
- **Signal Processing:** အသံ၊ ရေဒီယိုနှင့် ဒစ်ဂျစ်တယ်ဆက်သွယ်ရေး လုပ်ငန်းစဉ်များသည် ၎င်းတို့အပေါ်တွင် များစွာမှီခိုနေရသည်။
- **ကွမ်တမ်ရူပဗေဒ:** ကွမ်တမ်မက္ကင်းနစ်၏ သင်္ချာဖော်ပြချက်များကို ကိန်းထွေတန်ဖိုးရှိသော ညီမျှခြင်းများဖြင့် တည်ဆောက်ထားသည်။
- **Computer Graphics and Animation:** အရာဝတ္ထုများကို လှည့်ပတ်ခြင်းနှင့် ပုံသဏ္ဌာန်ပြောင်းလဲခြင်း (Transformations) တို့တွင် ကိန်းထွေးသဘောတရားများကို မကြာခဏ အသုံးပြုသည်။

ကိန်းထွေများသာ မရှိခဲ့ပါက ကျွန်ုပ်တို့ နေ့စဉ်အသုံးပြုနေသော နည်းပညာအတော်များများမှာ တည်ရှိလာနိုင်မည် မဟုတ်ပါ။

---

# What You Will Learn in This Chapter

ဤအခန်းတွင် ကျွန်ုပ်တို့သည် အောက်ပါတို့ကို စူးစမ်းလေ့လာသွားပါမည် -
- [x] Pure Imaginary Unit
- [x] Complex Numbers
- [x] Operations with Complex Numbers
- [x] Trigonometric Form or Polar Form
- [x] Roots of Complex Numbers

ဤအခန်းတွင်ပါဝင်သော ခေါင်းစဉ်များကို အဆင့်ဆင့် လေ့လာသွားခြင်းဖြင့် ကိန်းထွေများသည် သာမန်အဓိပ္ပာယ်အရ "စိတ်ကူးယဉ်" သက်သက်မဟုတ်ကြောင်း တွေ့ရှိလာပါလိမ့်မည်။ အမှန်စင်စစ် ၎င်းတို့သည် သင်္ချာလောကတွင် ဖန်တီးခဲ့သမျှ စိတ်ကူးစိတ်သန်းများထဲ၌ အစစ်အမှန်ဆုံးနှင့် အသုံးဝင်ဆုံးသော အရာများပင် ဖြစ်သည်။

---

# Final Thought

သင်္ချာဘာသာရပ်သည် မဖြစ်နိုင်သောအရာများကို ရဲဝံ့စွာ စူးစမ်းလေ့လာသည့်အခါတွင် အမှန်တကယ်ပင် စိတ်လှုပ်ရှားဖွယ် ကောင်းလှသည်။ ကိန်းထွေးများကို ထူးဆန်းပြီး သဘာဝမကျဟု ထင်ရသောကြောင့် တစ်ချိန်က ငြင်းပယ်ခဲ့ကြဖူးသည်။ သို့သော် ယနေ့တွင်မူ ၎င်းတို့သည် ခေတ်သစ်ကမ္ဘာကြီးကို လည်ပတ်စေရန် ကူညီပေးနေပါသည်။

ဤအရာအားလုံးသည် မဖြစ်နိုင်ဟု ထင်ရသော မေးခွန်းတစ်ခုမှ စတင်ခဲ့ခြင်း ဖြစ်သည် -
$$x^2 = -1$$
သင်္ချာလောက၏ အကြီးကျယ်ဆုံးသော ရှာဖွေတွေ့ရှိမှုများသည် သာမန်အတွေးအခေါ်များ ရပ်တန့်သွားသည့် နေရာမှပင် စတင်လေ့ရှိပါသည်။`;
