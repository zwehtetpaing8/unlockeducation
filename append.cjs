const fs = require('fs');
const text = `
---

### Miscellaneous Counting Principle

##### Example 23
How many 4-digit even numbers, greater than 4000, can be formed using the digits 1, 2, 3, 4 and 5 without repeating any digit?

**Solution**
ဂဏန်းများမှာ 1, 2, 3, 4, 5 ဖြစ်ပြီး ဂဏန်းတစ်လုံးကို တစ်ကြိမ်ထက်ပို မသုံးရပါ။ 4-digit ကိန်းဖြစ်ပြီး 4000 ထက်ကြီးရမည်၊ ထို့ပြင် even number ဖြစ်ရမည်။

မေးခွန်းအရ 1, 2, 3, 4, 5 ဂဏန်းများကို အသုံးပြု၍ ဂဏန်းမထပ်ဘဲ 4000 ထက်ကြီးသော 4-digit even numbers အရေအတွက်ကို ရှာရမည်။

Since the numbers are greater than 4000, the first digit must be 4 or 5.
ကိန်းများသည် 4000 ထက်ကြီးရမည်ဖြစ်သောကြောင့် ပထမဂဏန်းသည် 4 သို့မဟုတ် 5 ဖြစ်ရမည်။

**Case 1: If the first digit is 4 and the last digit is 2.**
ပထမဂဏန်းကို 4 ထားပြီး even number ဖြစ်ရန် နောက်ဆုံးဂဏန်းကို 2 ထားသောအခြေအနေကို စဉ်းစားမည်။

[DIAGRAM:Example23Case1Diagram]

$$ \\text{Number of 4-digit even numbers in Case 1} = 1 \\times 3 \\times 2 \\times 1 = 6. $$

**Case 2: If the first digit is 5 and the last digit is 2 or 4.**
ပထမဂဏန်းကို 5 ထားပြီး even number ဖြစ်ရန် နောက်ဆုံးဂဏန်းကို 2 သို့မဟုတ် 4 ထားသောအခြေအနေကို စဉ်းစားမည်။

နောက်ဆုံးဂဏန်းသည် 2 သို့မဟုတ် 4 ထဲမှ တစ်ခုခုဖြစ်မည်ဖြစ်သောကြောင့် ထိုနှစ်လုံးထဲမှ တစ်လုံးကျန်မည်။ ထို့ကြောင့် ဒုတိယဂဏန်းနေရာတွင် ကျန်သော 1, 3 နှင့် 2 သို့မဟုတ် 4 ထဲမှ ကျန်သောတစ်လုံးကို ပေါင်း၍ ရွေးစရာ 3 ခုရှိသည်။

[DIAGRAM:Example23Case2Diagram]

$$ \\text{Number of 4-digit even numbers in Case 2} = 1 \\times 3 \\times 2 \\times 2 = 12. $$

Thererfore, the number of 4-digit even number greater than $4000 = 6 + 12 = 18$.

---

##### Example 24
In how many ways can 2 different chemistry books, 4 different mathematics books and 3 different physics books be arranged in a line on a shelf:
(a) the 2 chemistry books are to be placed on the left, the 4 mathematics books in the middle and the 3 physics books on the right?
(b) books of the same subjects are together?

**Solution**
စာအုပ်အားလုံးသည် မတူညီသောစာအုပ်များဖြစ်သည်။ ထို့ကြောင့် Chemistry စာအုပ်နှစ်အုပ်ပင်ဖြစ်စေဦးတော့ နေရာလဲလျှင် အစီအစဉ်ပြောင်းသွားမည်ကို သတိပြုမိရန်လိုသည်။

**(a) Chemistry on the left, Mathematics in the middle and Physics on the right.**
ဤအပိုင်းတွင် subject အုပ်စုများ၏နေရာသည် သတ်မှတ်ပြီးသားဖြစ်သည်။ ထို့ကြောင့် subject တစ်ခုချင်းအတွင်းရှိ စာအုပ်များကိုသာ စီရမည်။

[DIAGRAM:Example24DiagramA]

The number of ways to place the 2 chemistry books in the left part $= 2! = 2$.
The number of ways to place the 4 mathematics books in the middle part $= 4! = 24$.
The number of ways to place the 3 physics books in the right part $= 3! = 6$.

$$
\\begin{aligned}
\\text{Number of arrangements} &= 2! \\times 4! \\times 3! \\\\
&= 2 \\times 24 \\times 6 \\\\
&= 288.
\\end{aligned}
$$

Therefore, the books can be arranged in 288 ways.

**(b) Books of the same subjects are together.**
Subject တူသောစာအုပ်များ အတူတကွရှိရမည်ဖြစ်သောကြောင့် Chemistry, Mathematics, Physics ကို block သုံးခုအဖြစ် စဉ်းစားနိုင်သည်။ block သုံးခုကို စီနိုင်သောနည်းလမ်းမှာ $3!$ ဖြစ်သည်။ တစ်ဖန် block တစ်ခုချင်းစီထဲတွင်ရှိသော စာအုပ်အသီးသီးကို စီနိုင်သောနည်းလမ်းမှာ (a) တွင်ရခဲ့သော 288 နည်းဖြစ်သည်။ စီစဉ်

[DIAGRAM:Example24DiagramB]

$$
\\begin{aligned}
\\text{Number of arrangements} &= 3! \\times 288 \\\\
&= 6 \\times 288 \\\\
&= 1728.
\\end{aligned}
$$

Therefore, the books can be arranged in 1728 ways when books of the same subjects are together.

**Key difference.** (a) နှင့် (b) ၏ အဓိက ကွာခြားချက်မှာ (a) တွင် Chemistry ကို ဘယ်ဘက်၊ Mathematics ကို အလယ်၊ Physics ကို ညာဘက်ဟု နေရာသတ်မှတ်ပြီးသားဖြစ်သည်။ ထို့ကြောင့် subject အုပ်စုသုံးခုကို ထပ်စီရန် မလိုပါ။ (b) တွင်မူ subject တူသောစာအုပ်များ အတူတကွရှိရမည်ဟုသာ သတ်မှတ်ထားသောကြောင့် Chemistry, Mathematics, Physics ဖြစ်သော block သုံးခုကို $3!$ နည်းဖြင့် စီရသည်။

---

##### Example 25
How many permutations of the letters $S, U, N, D, A, Y$ are there if the two vowels are placed together?

**Solution**
ပေးထားသော စာလုံးများမှာ $S, U, N, D, A, Y$ ဖြစ်ပြီး စာလုံးအားလုံး မတူညီကြပါ။ Vowels နှစ်လုံးမှာ $U$ နှင့် $A$ ဖြစ်သည်။ ထို vowels နှစ်လုံး အတူတကွရှိရမည်ဖြစ်သောကြောင့် $(UA)$ ကို block တစ်ခုအဖြစ် စဉ်းစားနိုင်သည်။

[DIAGRAM:Example25Diagram]

ယခုအခါ စီရမည့် အရာများမှာ $(UA), S, N, D, Y$ ဟူ၍ 5 ခုဖြစ်သည်။ ထို့ကြောင့် ထို 5 ခုကို စီနိုင်သောနည်းလမ်းမှာ $5!$ ဖြစ်သည်။
ထို့ပြင် vowel block အတွင်းရှိ $U$ နှင့် $A$ ကိုလည်း $UA$ သို့မဟုတ် $AU$ ဟု စီနိုင်သောကြောင့် $2!$ နည်းရှိသည်။

$$
\\begin{aligned}
\\text{Number of permutations} &= 5! \\times 2! \\\\
&= 120 \\times 2 \\\\
&= 240.
\\end{aligned}
$$

Therefore, there are 240 permutations when the two vowels are placed together.

**Note.** "Place together" ဟုဆိုလျှင် အတူတူထားရမည့် အရာများကို တစ်ခုတည်းဖြစ်သွားပြီဟု သတ်မှတ်ရမည်။ ထို့နောက် အတူတူထားထားသော block အတွင်းတွင် ပြန်စီနိုင်တာ ရှိမရှိ ထပ်စဉ်းစားရမည်။ ပြန်စီနိုင်တာရှိလျှင် ထိုအတွင်းပိုင်း စီနိုင်သောနည်းလမ်းကိုလည်း ထပ်တွက်ရမည်။

---

##### Example 26
Find the number of permutations of all the letters of the word INTERNET in such a way that there are exactly 4 letters between the two T's.

**Solution**
INTERNET တွင် စုစုပေါင်း စာလုံး 8 လုံးရှိသည်။ T နှစ်လုံးကြားတွင် စာလုံး 4 လုံး အတိအကျရှိရမည်ဆိုသည်မှာ $T \\_ \\_ \\_ \\_ T$ ပုံစံဖြစ်ရမည်ဟု ဆိုလိုသည်။ ဥပမာ ပထမ T သည် ပထမဆုံးနေရာ တွင်ရှိလျှင် ကြားတွင် နေရာ 2, 3, 4, 5 လေးနေရာရှိပြီး ဒုတိယ T သည် 6 လုံးမြောက်နေရာတွင် ရှိရမည်။ ထို့ကြောင့် T နှစ်လုံး၏ ဖြစ်နိုင်သော နေရာများမှာ

$$ (1, 6), (2, 7), (3, 8) $$

တို့သာဖြစ်သည်။

[DIAGRAM:Example26Diagram]

ထို့ကြောင့် T နှစ်လုံးကို နေရာချနိုင်သောနည်းလမ်းမှာ 3 နည်းရှိသည်။

ကျန်နေသော စာလုံးများမှာ $I, N, E, R, N, E$ ဖြစ်သည်။ ထိုစာလုံးများထဲတွင် $N$ နှစ်လုံးနှင့် $E$ နှစ်လုံး ထပ်နေသောကြောင့် ကျန် 6 နေရာကို စီနိုင်သောနည်းလမ်းမှာ

$$ \\frac{6!}{2!2!} = 180 $$

နည်းဖြစ်သည်။

$$
\\begin{aligned}
\\text{Required number of permutations} &= 3 \\times \\frac{6!}{2!2!} \\\\
&= 3 \\times 180 \\\\
&= 540.
\\end{aligned}
$$

Therefore, the required number of permutations is 540.
`

let current = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

// We need to insert this right before "## 5.4 Techniques for Some Counting Principle"
let target = '## 5.4 Techniques for Some Counting Principle';
if (current.includes(target)) {
  current = current.replace(target, text + '\n\n' + target);
  fs.writeFileSync('src/data/chapter5_content.ts', current);
  console.log("Appended successfully");
} else {
  console.log("Could not find the target string!");
}
