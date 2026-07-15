const fs = require('fs');
let content = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

const targetStr = `  * ထို့ကြောင့် ဆယ်ဂဏန်းနေရာတွင် $5$ တစ်ကြိမ\xEF\xBF\xBD$$ {}^nP_r \\quad \\text{or} \\quad P(n, r) $$

**Permutations with Decreasing Choices:**

အရာဝတ္ထုများကို ထပ်ခါတလဲလဲ မသုံးဘဲ (without repetition) နေရာ $r$ ခုတွင် နေရာချစဥ်းစားရာ၌ ပထမဦးဆုံးနေရာတွင် ချထားရန်အတွက် ရွေးချယ်စရာ $n$ ခုရှိသည်။ ဒုတိယနေရာရောက်သောအခါ အရှေ့မှာ $1$ ခု သုံးပြီးသားဖြစ်သောကြောင့် $n-1$ နည်းကျန်သည်။ တတိယနေရာရောက်သောအခါ အရှေ့မှာ $2$ ခု သုံးပြီးသားဖြစ်သောကြောင့် $n-2$ နည်းကျန်သည်။ ဤနည်းအတိုင်း ဆက်သွားပါက နေရာ $r$ ခုအတွက် ကျန်ရှိသော ရွေးချယ်နိုင်ခွင့်များကို အောက်ပါဇယားအတိုင်း တွေ့ရှိနိုင်သည်။es 0! \\implies 0! = 1$$`;

const replacement = `  * ထို့ကြောင့် ဆယ်ဂဏန်းနေရာတွင် $5$ တစ်ကြိမ်တည်းပါဝင်သော ကိန်းစုစုပေါင်း $= 1 \\times 9 = 9$ ခု။
  * **ခုဂဏန်းနေရာတွင် $5$ ရှိပြီး ဆယ်ဂဏန်းနေရာတွင် $5$ မဟုတ်သော ကိန်းများ (Units digit 5 only):**
  * ခုဂဏန်းနေရာ ($U$) တွင် $5$ ကိုသာ ထားရမည်ဖြစ်သဖြင့် $= 1$ နည်း။
  * ဆယ်ဂဏန်းနေရာ ($T$) တွင် $5$ မဖြစ်ရုံသာမက သုည ($0$) လည်း မဖြစ်နိုင်ပါ (သုညဖြစ်လျှင် ဂဏန်းတစ်လုံးတည်းဖြစ်သွားမည်)။ ထို့ကြောင့် ဆယ်ဂဏန်းနေရာအတွက် ရွေးချယ်စရာ $8$ လုံး ($1, 2, 3, 4, 6, 7, 8, 9$) ရှိသဖြင့် $= 8$ နည်း။
  * ထို့ကြောင့် ခုဂဏန်းနေရာတွင် $5$ တစ်ကြိမ်တည်းပါဝင်သော ကိန်းစုစုပေါင်း $= 8 \\times 1 = 8$ ခု။
  * Addition Principle အရ နှစ်လုံးတွဲကိန်းများထဲတွင် ဂဏန်း $5$ တစ်ကြိမ်သာပါဝင်သော ကိန်းစုစုပေါင်း $= 9 + 8 = 17$ ခု။

By the Addition Principle, the total number of required integers is:
$$\\text{Total required integers} = 1 + 17 = 18$$

(Note: $0$ and $100$ do not contain the digit $5$ exactly once, so we only consider $1$ to $99$.)

---

### 2. The Factorial Function and Permutations

**Factorial Notation:**
The product of the first $n$ natural numbers is denoted by $n!$ (read as "$n$ factorial").

$$n! = 1 \\times 2 \\times 3 \\times \\dots \\times n$$
Or, more commonly written in descending order:
$$n! = n \\times (n - 1) \\times (n - 2) \\times \\dots \\times 3 \\times 2 \\times 1$$

By definition, we state that:
$$0! = 1$$
This is a mathematical convention which makes the formulas for permutations and combinations consistent (e.g., $1! = 1 \\times 0! \\implies 0! = 1$$`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync('src/data/chapter5_content.ts', content);
  console.log("Successfully replaced string with exact Unicode matches");
} else {
  console.log("Target string not found. Trying regex...");
  const regex = /  \* ထို့ကြောင့် ဆယ်ဂဏန်းနေရာတွင် \$5\$ တစ်ကြိမ.[\s\S]*?es 0! \\implies 0! = 1\$\$/;
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('src/data/chapter5_content.ts', content);
    console.log("Successfully replaced using regex.");
  } else {
    console.log("Regex also failed.");
  }
}
