export const chapter5Content = String.raw`### Introduction

In this chapter, we study how to count the number of ways to choose, arrange, and place objects, people, letters, and digits under given conditions. Instead of listing every possible outcome one by one, we will use counting principles to count systematically and efficiently. We begin with the multiplication principle for tasks completed in stages. Then we distinguish between permutations, where order matters, and combinations, where only selection matters. Through worked examples and exercises, we will learn how to solve problems involving repeated letters, restricted digit arrangements, objects that must stay together or apart, and letter arrangements with distance conditions.

---

### 5.1 Counting Principles - Multiplication Principle

#### Toward the Multiplication Principle

**Case 1:** Suppose a coffee shop offers 2 choices of drinks (Tea and Coffee) and 3 choices of snacks (Cake, Doughnut and Sandwich). How many different choices are possible if one drink and one snack are chosen?

ဒီမေးခွန်းမှာ သောက်စရာတစ်မျိုးနဲ့ အဆာပြေမုန့်တစ်မျိုးကို တွဲရွေးရမှာဖြစ်ပါတယ်။ သောက်စရာတစ်မျိုးတည်း သို့မဟုတ် အဆာပြေမုန့်တစ်မျိုးတည်း ရွေးပြီး ရပ်ထားလို့မရပါဘူး။

နှစ်မျိုးလုံးပါအောင် ရွေးရမှာဖြစ်တဲ့အတွက် အရင်ဆုံး သောက်စရာကို ရွေးလိုက်မယ်၊ ပြီးမှ အဆာပြေမုန့်တစ်မျိုးကို ဆက်ရွေးကြမယ်။

သောက်စရာတစ်မျိုး ရွေးပြီးတိုင်းမှာ အဆာပြေမုန့် 3 မျိုးထဲက တစ်မျိုးကို ထပ်ရွေးစရာ ရှိနေပါတယ်။

ဖြစ်နိုင်တဲ့တွဲဖက်ရွေးချယ်မှုတွေကို ပိုမြင်သာအောင် tree diagram နဲ့ လေ့လာကြည့်လိုက်ရအောင်။

[DIAGRAM:DrinksSnacksTree]

အပေါ်က tree diagram ကို ကြည့်ရင် သောက်စရာတစ်မျိုးစီတိုင်းအတွက် အဆာပြေမုန့်ရွေးစရာ 3 ခုစီ ရှိတာကို တွေ့ရပါလိမ့်မယ်။ ဒါကြောင့် သောက်စရာ 2 မျိုးနဲ့ အဆာပြေမုန့် 3 မျိုးကို တွဲရွေးတဲ့အခါ စုစုပေါင်း 6 နည်း ရလာပါတယ်။

တကယ်တော့ စုစုပေါင်းနည်းလမ်းကို သောက်စရာအရေအတွက် 2 နဲ့ အဆာပြေမုန့်အရေအတွက် 3 ကို တိုက်ရိုက်မြှောက်ပြီးလည်း တွက်လို့ရပါတယ်။ ဒါကြောင့်

**Counting by Multiplication**

Number of ways to choose a drink $= 2$,
Number of ways to choose a snack $= 3$,
Number of ways to choose a drink and a snack $= 2 \times 3 = 6$.

---

**Case 2:** Suppose a list of 5 topics is given in an essay contest. A student must select one topic from the list for a short essay and then select a different topic from the same list for a long essay. How many ways can the topics be chosen for the two essays?

ဒီမေးခွန်းမှာတော့ စာစီစာကုံးပြိုင်ပွဲအတွက် ခေါင်းစဉ် 5 ခု ပေးထားပါတယ်။ ကျောင်းသားက အရင်ဆုံး short essay အတွက် ခေါင်းစဉ်တစ်ခု ရွေးရမယ်။ ပြီးရင် long essay အတွက် ပထမခေါင်းစဉ်နဲ့ မတူတဲ့ ခေါင်းစဉ်တစ်ခုကို ထပ်ရွေးရမယ်။ ရွေးချယ်မှုတွေကို ဆက်တိုက်လုပ်ဆောင်ရမှာဖြစ်ပါတယ်။

ပထမအဆင့်မှာ short essay အတွက် ခေါင်းစဉ်ရွေးစရာ 5 ခုရှိတယ်။ တစ်ခု ရွေးပြီးသွားရင် long essay အတွက် ပထမခေါင်းစဉ်ကို ရွေးခွင့်မရှိတော့တာကြောင့် ကျန်တဲ့ ခေါင်းစဉ် 4 ခုထဲက တစ်ခုကို ဆက်ရွေးရမှာဖြစ်တဲ့အတွက် ရွေးစရာနည်းလမ်း 4 နည်းကျန်မှာ ဖြစ်ပါတယ်။

**Counting by Multiplication**

Number of ways to choose a short essay topic $= 5$,
Number of ways to choose a different long essay topic $= 4$,
Number of ways to choose the two topics $= 5 \times 4 = 20$.

ဒါကြောင့် short essay နဲ့ long essay အတွက် မတူတဲ့ ခေါင်းစဉ်နှစ်ခုကို ရွေးနိုင်တဲ့ နည်းလမ်းစုစုပေါင်းက 20 ဖြစ်ပါတယ်။

အပေါ်က ဥပမာနှစ်ခုကို ကြည့်ရင် ရွေးချယ်မှုတွေကို တစ်ခုပြီးတစ်ခု ဆက်တိုက်စဉ်းစားထားတာကို တွေ့ရမှာဖြစ်ပါတယ်။ အဆင့်တိုင်းမှာ ရွေးနိုင်တဲ့ နည်းလမ်းအရေအတွက်ကို သိထားရင် အဲဒီအရေအတွက်တွေကို မြှောက်လိုက်တာနဲ့ စုစုပေါင်းနည်းလမ်း ထွက်လာပါတယ်။

ဥပမာ Case 2 မှာ short essay အတွက် ဘယ်ခေါင်းစဉ်ကို ရွေးရွေး long essay အတွက် ကျန်ခေါင်းစဉ် 4 ခု အမြဲရှိနေပါတယ်။ ဒါကြောင့် စုစုပေါင်းနည်းလမ်းကို ရဖို့ $5 \times 4$ လို့ တွက်နိုင်ပါတယ်။

ဒီအယူအဆကို **Multiplication Principle** လို့ ခေါ်ပါတယ်။

---

#### Multiplication Principle

**The Multiplication Principle**

Suppose a task consists of two successive choices or stages. If the first choice can be made in $m$ ways and, for each first choice, the second choice can be made in $n$ ways, then the whole task can be done in $m \times n$ ways.

အလုပ်တစ်ခုမှာ ဆက်တိုက်လုပ်ရတဲ့ ရွေးချယ်မှု သို့မဟုတ် အဆင့် 2 ခုရှိတယ်ဆိုပါစို့။ ပထမရွေးချယ်မှုကို $m$ နည်းလမ်းနဲ့ ရွေးနိုင်ပြီး၊ ပထမရွေးချယ်မှုတစ်ခုစီအတွက် ဒုတိယရွေးချယ်မှုကို $n$ နည်းလမ်းနဲ့ ရွေးနိုင်ရင်၊ အလုပ်တစ်ခုလုံးအတွက် စုစုပေါင်းနည်းလမ်းက $m \times n$ နည်းလမ်းဖြစ်ပါတယ်။

In general, for several successive choices or stages, multiply the number of ways at each stage to find the total number of ways.

အလားတူပဲ ဆက်တိုက်ဖြစ်တဲ့ ရွေးချယ်မှုအဆင့်တွေ အများကြီးရှိရင်လည်း တစ်ဆင့်ချင်းစီရဲ့ နည်းလမ်းအရေအတွက်တွေကို မြှောက်ပေးလိုက်ရုံပါပဲ။

---

#### Example 1

**Problem:** Suppose that there are 6 roads between town A and town B, and 4 roads between town B and town C. Find the number of ways a person can drive from A to C by passing through B.

မြို့ A မှ မြို့ B သို့ သွားနိုင်သော လမ်း 6 လမ်းရှိပြီး၊ မြို့ B မှ မြို့ C သို့ သွားနိုင်သော လမ်း 4 လမ်းရှိသည်။ လူတစ်ဦးသည် မြို့ A မှ မြို့ C သို့ မြို့ B ကို ဖြတ်၍ သွားမည်ဆိုပါက သွားနိုင်သော နည်းလမ်းအရေအတွက်ကို ရှာပါ။

[DIAGRAM:AtoBtoCRoads]

**Why Multiplication Principle?**

ဒီခရီးမှာ အရင်ဆုံး မြို့ A ကနေ မြို့ B ကို သွားမယ့် လမ်းတစ်လမ်းကို ရွေးရမှာဖြစ်ပါတယ်။ ပြီးမှ မြို့ B ကနေ မြို့ C ကို ဆက်သွားမယ့် လမ်းတစ်လမ်းကို ထပ်ရွေးရတယ်။ ဒါကြောင့် ဒီခရီးကို အဆင့်နှစ်ဆင့်အဖြစ် ခွဲစဉ်းစားလို့ရတယ်။

ပထမအဆင့်မှာ မြို့ A ကနေ မြို့ B ကို သွားနိုင်တဲ့ လမ်း 6 လမ်းထဲက တစ်လမ်းကို ရွေးရမယ်။ ဒုတိယအဆင့်မှာတော့ မြို့ B ကနေ မြို့ C ကို သွားနိုင်တဲ့ လမ်း 4 လမ်းထဲက တစ်လမ်းကို ဆက်ရွေးရမယ်။ ရွေးချယ်မှုတွေကို ဆက်တိုက်လုပ်ဆောင်ရမှာဖြစ်တဲ့အတွက် Multiplication Principle ကို သုံးလိုက်ရုံပါပဲ။

**Solution:**

Number of ways from A to B $= 6$,
Number of ways from B to C $= 4$,
Number of ways from A to C through B $= 6 \times 4 = 24$.

ဒါကြောင့် မြို့ A ကနေ မြို့ C ကို မြို့ B ဖြတ်ပြီး သွားနိုင်တဲ့ နည်းလမ်းစုစုပေါင်းက 24 နည်းဖြစ်ပါတယ်။

---

#### Example 2

**Problem:** There are four blood types, namely A, B, AB, and O. Blood can also be Rh positive $(+)$ or Rh negative $(-)$. A blood donor can be classified as either male or female. How many different possible ways can a donor have his or her blood labeled?

သွေးအမျိုးအစားက $\text{A, B, AB, O}$ ဆိုပြီး $4$ မျိုးရှိသည်။ ပြီးတော့ သွေးမှာ $\text{Rh positive (+)}$ နဲ့ $\text{Rh negative (-)}$ ဆိုပြီး ခွဲခြားချက်နှစ်မျိုး ရှိသေးသည်။ သွေးလှူရှင်တစ်ဦးကို ယောက်ျား (male) သို့မဟုတ် မိန်းမ (female) ဆိုပြီး ထပ်ခွဲခြားနိုင်သေးတယ်။ ဒီတော့ ရွေးချယ်မှုအဆင့် $3$ ခုရှိတာကို တွေ့ရမယ်။
* သွေးအမျိုးအစား (Blood type) ရွေးချယ်ရန် နည်းလမ်း $= 4$ မျိုး
* Rh factor ရွေးချယ်ရန် နည်းလမ်း $= 2$ မျိုး
* လိင်အမျိုးအစား (Gender) ရွေးချယ်ရန် နည်းလမ်း $= 2$ မျိုး

**Counting by Multiplication:**
$\text{Total number of ways} = 4 \times 2 \times 2 = 16 \text{ ways}$

---

#### Example 3
**Problem:** There are 3 nails on a wall. In how many ways can 3 out of 5 distinct pictures be hung on these nails?
နံရံတစ်ခုပေါ်တွင် သံမှို $3$ ချောင်းရှိသည်။ မတူညီသော ပုံ $5$ ပုံထဲမှ $3$ ပုံကို ရွေးချယ်၍ အဆိုပါ သံမှိုများပေါ်တွင် ချိတ်ဆွဲမည်ဆိုပါက မည်မျှနည်းလမ်းရှိမည်နည်း။
[DIAGRAM: PictureNailsDiagram]

**Solution:**
ဤပြဿနာတွင် ပုံများကို တစ်ခုပြီးတစ်ခု ဆက်တိုက်ချိတ်ဆွဲမည်ဟု စဉ်းစားနိုင်သည်။
* ပထမသံမှိုတွင် ချိတ်ဆွဲရန် ပုံ $5$ ပုံထဲမှ တစ်ပုံကို ရွေးချယ်ရမည်ဖြစ်သဖြင့် ရွေးချယ်နိုင်သော နည်းလမ်း $= 5$ နည်း။
* ဒုတိယသံမှိုတွင် ချိတ်ဆွဲရန် ကျန်ရှိသော ပုံ $4$ ပုံထဲမှ တစ်ပုံကို ရွေးချယ်ရမည်ဖြစ်သဖြင့် ရွေးချယ်နိုင်သော နည်းလမ်း $= 4$ နည်း။
* တတိယသံမှိုတွင် ချိတ်ဆွဲရန် ကျန်ရှိသော ပုံ $3$ ပုံထဲမှ တစ်ပုံကို ရွေးချယ်ရမည်ဖြစ်သဖြင့် ရွေးချယ်နိုင်သော နည်းလမ်း $= 3$ နည်း။

Multiplication Principle အရ စုစုပေါင်း ချိတ်ဆွဲနိုင်သော နည်းလမ်းမှာ:
$\text{Total ways} = 5 \times 4 \times 3 = 60 \text{ ways}$

---

#### Example 4
**Problem:** In a class of 20 students, a president, a vice-president, and a secretary are to be chosen. In how many ways can this be done if no student can hold more than one office?
ကျောင်းသား $20$ ယောက်ရှိသော အတန်းတစ်တန်းတွင် ဥက္ကဋ္ဌ၊ ဒုတိယဥက္ကဋ္ဌနှင့် အတွင်းရေးမှူး တစ်ဦးစီကို ရွေးချယ်ရမည်။ ကျောင်းသားတစ်ဦးလျှင် ရာထူးတစ်ခုထက်ပို၍ မယူနိုင်ပါက မည်မျှနည်းလမ်းများဖြင့် ရွေးချယ်နိုင်မည်နည်း။
[DIAGRAM: Example4Diagram]

**Solution:**
ရာထူးတစ်ခုစီအတွက် ကျောင်းသားတစ်ဦးစီကို အဆင့်လိုက် ရွေးချယ်ပါမည်။
* ဥက္ကဋ္ဌ နေရာအတွက် ရွေးချယ်နိုင်သော ကျောင်းသားအရေအတွက် $= 20$ ယောက် ($20$ နည်း)
* ဒုတိယဥက္ကဋ္ဌ နေရာအတွက် (ဥက္ကဋ္ဌအဖြစ် ရွေးချယ်ခံရသူကို ဖယ်ထုတ်၍) ရွေးချယ်နိုင်သော ကျောင်းသားအရေအတွက် $= 19$ ယောက် ($19$ နည်း)
* အတွင်းရေးမှူး နေရာအတွက် (ရွေးချယ်ပြီးသူ နှစ်ဦးကို ဖယ်ထုတ်၍) ရွေးချယ်နိုင်သော ကျောင်းသားအရေအတွက် $= 18$ ယောက် ($18$ နည်း)

Multiplication Principle အရ:
$\text{Number of ways} = 20 \times 19 \times 18 = 6840 \text{ ways}$

---

#### Example 5
**Problem:** How many integers, having digit $5$ only once, are there between $0$ and $100$?
ဒီမေးခွန်းမှာ $0$ နှင့် $100$ ကြားရှိ ကိန်းပြည့်များထဲမှ ဂဏန်း $5$ တစ်ကြိမ်တည်းသာ ပါသော ကိန်းများကို ရေတွက်ရမည်။
[DIAGRAM: Example5Diagram]

**Solution:**
ဒီမေးခွန်းကို တစ်လုံးတည်းသော ကိန်းများနှင့် နှစ်လုံးတွဲ ကိန်းများဟူ၍ သီးခြားစီ ခွဲခြားစဉ်းစားပါမည်။ ၎င်းတို့သည် မထပ်သော disjoint cases များ ဖြစ်သဖြင့် စဉ်းစားရရှိလာသော နည်းလမ်းများကို Addition Principle အရ ပေါင်းရပါမည်။

* **Case 1: One-digit integers (တစ်လုံးတည်းသော ကိန်းများ)**
  * $0$ မှ $9$ အတွင်း ဂဏန်း $5$ တစ်ခုတည်းသာ ပါသော ကိန်းမှာ $5$ တစ်လုံးတည်းသာ ရှိသည်။
  * ထို့ကြောင့် တစ်လုံးတည်းသော ကိန်း $= 1$ ခု။

* **Case 2: Two-digit integers (နှစ်လုံးတွဲ ကိန်းများ)**
  ဂဏန်း $5$ သည် ဆယ်ဂဏန်းနေရာ သို့မဟုတ် ခုဂဏန်းနေရာတွင် တစ်ကြိမ်သာ ပါဝင်နိုင်သည်။
  * **ဆယ်ဂဏန်းနေရာတွင် $5$ ရှိပြီး ခုဂဏန်းနေရာတွင် $5$ မဟုတ်သော ကိန်းများ (Tens digit 5 only):**
    * ဆယ်ဂဏန်းနေရာ ($T$) တွင် $5$ ကိုသာ ထားရမည်ဖြစ်သဖြင့် $= 1$ နည်း။
    * ခုဂဏန်းနေရာ ($U$) တွင် $5$ မှတစ်ပါး ကျန်ဂဏန်း $9$ လုံး ($0, 1, 2, 3, 4, 6, 7, 8, 9$) ထဲမှ ကြိုက်ရာတစ်ခု ထားနိုင်သဖြင့် $= 9$ နည်း။
    * ထို့ကြောင့် ဆယ်ဂဏန်းနေရာတွင် $5$ တစ်ကြိမ်တည်းပါဝင်သော ကိန်းစုစုပေါင်း $= 1 \times 9 = 9$ ခု။

  * **ခုဂဏန်းနေရာတွင် $5$ ရှိပြီး ဆယ်ဂဏန်းနေရာတွင် $5$ မဟုတ်သော ကိန်းများ (Units digit 5 only):**
    * ခုဂဏန်းနေရာ ($U$) တွင် $5$ ကိုသာ ထားရမည်ဖြစ်သဖြင့် $= 1$ နည်း။
    * ဆယ်ဂဏန်းနေရာ ($T$) တွင် $5$ မဖြစ်ရုံသာမက သုည ($0$) လည်း မဖြစ်နိုင်ပါ (သုညဖြစ်လျှင် ဂဏန်းတစ်လုံးတည်းဖြစ်သွားမည်)။ ထို့ကြောင့် ဆယ်ဂဏန်းနေရာအတွက် ရွေးချယ်စရာ $8$ လုံး ($1, 2, 3, 4, 6, 7, 8, 9$) ရှိသဖြင့် $= 8$ နည်း။
    * ထို့ကြောင့် ခုဂဏန်းနေရာတွင် $5$ တစ်ကြိမ်တည်းပါဝင်သော ကိန်းစုစုပေါင်း $= 8 \times 1 = 8$ ခု။

Addition Principle အရ နှစ်လုံးတွဲကိန်းများထဲတွင် ဂဏန်း $5$ တစ်ကြိမ်သာပါဝင်သော ကိန်းစုစုပေါင်း $= 9 + 8 = 17$ ခု။

By the Addition Principle, the total number of required integers is:
$\text{Total required integers} = 1 + 17 = 18$

(Note: $0$ and $100$ do not contain the digit $5$ exactly once, so we only consider $1$ to $99$.)

---

### Factorial Notation

**Factorial Notation:**
The product of the first $n$ natural numbers is denoted by $n!$ (read as "$n$ factorial").

$n! = 1 \times 2 \times 3 \times \dots \times n$
Or, more commonly written in descending order:
$n! = n \times (n - 1) \times (n - 2) \times \dots \times 3 \times 2 \times 1$

By definition, we state that:
$0! = 1$
This is a mathematical convention which makes the formulas for permutations and combinations consistent (e.g., $1! = 1 \times 0! \implies 0! = 1$).

#### Useful Facts about Factorials

1. **Recursive form:**
   For a positive integer $n$,
   $$n! = n \times (n - 1)!$$
   ဥပမာ: $6! = 6 \times 5! = 6 \times 120 = 720$.

2. **Cancellation:**
   Factorials ပါသော အပိုင်းကိန်းများကို ဆက်တိုက်မြှောက်ကိန်းများအဖြစ် ဖြန့်ရေး၍ ချုံ့နိုင်သည်။
   $$\frac{7!}{5!} = \frac{7 \times 6 \times 5!}{5!} = 7 \times 6 = 42$$

3. **Order matters:**
   $n!$ သည် အရာ $n$ ခုအားလုံးကို အစီအစဉ်ကျအောင် စီနိုင်သော နည်းလမ်းအရေအတွက်ဖြစ်သည်။
   ဥပမာ: $A, B, C$ သုံးလုံးကို စီနိုင်သော နည်းလမ်းမှာ $3! = 6$ နည်းဖြစ်သည်။ ဒီသဘောတရားကို Permutations အပိုင်းမှာ ဆက်လက်လေ့လာရမှာဖြစ်ပါတယ်။

4. **Factorials grow quickly:**
   $6! = 720$, $7! = 5040$, $8! = 40320$.

---

#### Example 6

**Problem:** Evaluate:
(a) $\frac{7!}{4!3!}$
(b) $\frac{6! + 5! - 4!}{4!}$

**Solution:**

**(a) Evaluate $\frac{7!}{4!3!}$:**
$$\begin{aligned}
\frac{7!}{4!3!} &= \frac{7 \times 6 \times 5 \times 4!}{4! \times 3 \times 2 \times 1} \\
&= \frac{7 \times 6 \times 5}{3 \times 2 \times 1} \\
&= 35
\end{aligned}$$

**(b) Evaluate $\frac{6! + 5! - 4!}{4!}$:**
$$\begin{aligned}
\frac{6! + 5! - 4!}{4!} &= \frac{720 + 120 - 24}{24} \\
&= \frac{816}{24} \\
&= 34
\end{aligned}$$

**Another way:**
$$\begin{aligned}
\frac{6! + 5! - 4!}{4!} &= \frac{6 \times 5 \times 4! + 5 \times 4! - 4!}{4!} \\
&= \frac{4!(6 \times 5 + 5 - 1)}{4!} \\
&= 30 + 5 - 1 \\
&= 34
\end{aligned}$$

---

### Exercise 5.1

#### Questions

1. A store sells men’s wear. It has $6$ kinds of shirts, $4$ kinds of pants and $3$ kinds of coats. If a man wants to buy a shirt, a pant and a coat, in how many ways can this be done? (Assume that any choice meets his requirement.)

2. A television news director wishes to use three of the $7$ news stories on an evening show. How many possible ways can the program be set up, if the three stories are to be classified as the lead story, the second story and the closing story?

3. If a garage door opener has a $10$-digit keypad, containing $0, 1, 2, \dots, 9$, and the code to open the door must be a $4$-digit code, how many codes are possible to create?

4. There are $3$ restaurants $X, Y$ and $Z$ we can go for lunch in a certain area. Suppose that no two restaurants have the same menu, and the numbers of choices for appetizer, main dish and dessert available are shown in the table. Find the number of ways to have a lunch consisting of an appetizer, a main dish and a dessert.

| Restaurants | No. of Appetizers | No. of Main dishes | No. of Desserts |
| :---: | :---: | :---: | :---: |
| **X** | 4 | 10 | 2 |
| **Y** | 3 | 8 | 5 |
| **Z** | 5 | 12 | 3 |

5. A registration code consists of two of the $12$ different capital letters $A, B, C, \dots, L$, followed by one of the ten digits $0, 1, 2, \dots, 9$, for example ID5. How many codes are possible to generate:
   (a) if the repetition of the letters is allowed?
   (b) if the repetition of the letters is not allowed?
   (c) if two letters in the codes must be the same?
   (d) if two letters are different, but must be both vowels or both consonants?

6. (a) Express $\frac{1}{5 \cdot 4 \cdot 3}$ in factorial form.
   (b) Evaluate $2 \cdot 9! + 82 \cdot 8!$.

7. Prove that:
   $$\frac{1}{5!} + \frac{1}{6!} + \frac{1}{7!} = \frac{50}{7!}$$

---

#### Solutions

1. **Solution:**
   **Question:** A store sells men’s wear. It has $6$ kinds of shirts, $4$ kinds of pants and $3$ kinds of coats. If a man wants to buy a shirt, a pant and a coat, in how many ways can this be done? (Assume that any choice meets his requirement.)

   အင်္ကျီ၊ ဘောင်းဘီ၊ အပေါ်ထပ်ဝတ်တို့ကို တစ်မျိုးစီ ရွေးရမည်ဖြစ်သည်။ ရွေးချယ်မှုများသည် ဆက်တိုက်ဖြစ်သောကြောင့် Multiplication Principle အရ:
   $$\text{Number of ways} = 6 \times 4 \times 3 = 72 \text{ ways}$$

   [DIAGRAM:Exercise51Question1]

2. **Solution:**
   **Question:** A television news director wishes to use three of the $7$ news stories on an evening show. How many possible ways can the program be set up, if the three stories are to be classified as the lead story, the second story and the closing story?

   စုစုပေါင်းသတင်း $7$ ပုဒ်ထဲမှ $3$ ပုဒ်ကို ရွေးချယ်ကာ lead, second, closing ဟူ၍ အစီအစဉ်တကျ ထားရမည်ဖြစ်သည်။ ပထမတစ်ပုဒ်ရွေးပြီးလျှင် ထပ်မသုံးတော့သောကြောင့် ရွေးစရာအဆင့်ဆင့် လျော့သွားမည်ဖြစ်သဖြင့်:
   $$\text{Number of programs} = 7 \times 6 \times 5 = 210 \text{ programs}$$

   [DIAGRAM:Exercise51Question2]

3. **Solution:**
   **Question:** If a garage door opener has a $10$-digit keypad, containing $0, 1, 2, \dots, 9$, and the code to open the door must be a $4$-digit code, how many codes are possible to create?

   ဂဏန်း $4$ လုံးပါသော ကုဒ်တစ်ခုဖြစ်ပြီး ဂဏန်းများကို ထပ်ခါတလဲလဲ အသုံးပြုနိုင်သည် (ထပ်မသုံးရဟု ကန့်သတ်မထားသောကြောင့်)။ နေရာတစ်ခုစီတိုင်းအတွက် ရွေးချယ်နိုင်သော ဂဏန်း $10$ လုံးစီ ရှိသဖြင့်:
   $$\text{Number of codes} = 10 \times 10 \times 10 \times 10 = 10^4 = 10000 \text{ codes}$$

   [DIAGRAM:Exercise51Question3]

4. **Solution:**
   **Question:** There are $3$ restaurants $X, Y$ and $Z$ we can go for lunch in a certain area. Suppose that no two restaurants have the same menu, and the numbers of choices for appetizer, main dish and dessert available are shown in the table. Find the number of ways to have a lunch consisting of an appetizer, a main dish and a dessert.

   | Restaurants | No. of Appetizers | No. of Main dishes | No. of Desserts |
   | :---: | :---: | :---: | :---: |
   | **X** | 4 | 10 | 2 |
   | **Y** | 3 | 8 | 5 |
   | **Z** | 5 | 12 | 3 |

   စားသောက်ဆိုင်တစ်ဆိုင်ချင်းစီအတွက် appetizer, main dish, dessert ရွေးချယ်မှုများကို ဆက်တိုက်လုပ်ရမည်ဖြစ်သောကြောင့် Multiplication Principle သုံးရမည်။ ထို့နောက် ဆိုင်တစ်ဆိုင်စီသည် သီးခြားစီရွေးချယ်ရသော disjoint cases များဖြစ်သဖြင့် Addition Principle အရ ပေါင်းရမည်။
   * **Restaurant X:** $4 \times 10 \times 2 = 80$ နည်း
   * **Restaurant Y:** $3 \times 8 \times 5 = 120$ နည်း
   * **Restaurant Z:** $5 \times 12 \times 3 = 180$ နည်း
   $$\text{Total number of lunches} = 80 + 120 + 180 = 380 \text{ ways}$$

5. **Solution:**
   **Question:** A registration code consists of two of the $12$ different capital letters $A, B, C, \dots, L$, followed by one of the ten digits $0, 1, 2, \dots, 9$, for example ID5. How many codes are possible to generate:
   (a) if the repetition of the letters is allowed?
   (b) if the repetition of the letters is not allowed?
   (c) if two letters in the codes must be the same?
   (d) if two letters are different, but must be both vowels or both consonants?

   စုစုပေါင်း အက္ခရာ $12$ လုံး ($A$ မှ $L$) နှင့် ဂဏန်း $10$ လုံး ($0$ မှ $9$) ရှိသည်။
   * **(a) Repetition of letters is allowed (အက္ခရာထပ်ခွင့်ရှိလျှင်):**
  $$\text{Number of codes} = 12 \times 12 \times 10 = 1440$$
   * **(b) Repetition of letters is not allowed (အက္ခရာမထပ်ရလျှင်):**
  $$\text{Number of codes} = 12 \times 11 \times 10 = 1320$$
   * **(c) Two letters must be the same (အက္ခရာနှစ်လုံးတူရမည်ဆိုလျှင်):**
  $$\text{Number of codes} = 12 \times 1 \times 10 = 120$$
   * **(d) Two letters are different, but must be both vowels or both consonants (အက္ခရာမတူသော်လည်း အုပ်စုတူရမည်):**
  Vowels (သရ) မှာ $\{A, E, I\}$ စုစုပေါင်း $3$ လုံးရှိပြီး Consonants (ဗျည်း) မှာ ကျန် $9$ လုံးရှိသည်။
  * Case 1: Two different vowels $\rightarrow 3 \times 2 \times 10 = 60$
  * Case 2: Two different consonants $\rightarrow 9 \times 8 \times 10 = 720$
  $$\text{Total number of codes} = 60 + 720 = 780$$

   [DIAGRAM:Exercise51Question5]

6. **Solution:**
   **Question:**
   (a) Express $\frac{1}{5 \cdot 4 \cdot 3}$ in factorial form.
   (b) Evaluate $2 \cdot 9! + 82 \cdot 8!$.

   * **(a) Express $\frac{1}{5 \cdot 4 \cdot 3}$ in factorial form:**
  $$\frac{1}{5 \cdot 4 \cdot 3} = \frac{1}{5 \cdot 4 \cdot 3} \times \frac{2!}{2!} = \frac{2!}{5!}$$
   * **(b) Evaluate $2 \cdot 9! + 82 \cdot 8!$:**
  $$\begin{aligned}
  2 \cdot 9! + 82 \cdot 8! &= 2 \cdot (9 \times 8!) + 82 \cdot 8! \\
  &= 18 \cdot 8! + 82 \cdot 8! \\
  &= (18 + 82) \cdot 8! \\
  &= 100 \cdot 8! \\
  &= 100 \times 40320 \\
  &= 4032000
  \end{aligned}$$

7. **Proof:**
   **Question:** Prove that:
   $$\frac{1}{5!} + \frac{1}{6!} + \frac{1}{7!} = \frac{50}{7!}$$

   $$\begin{aligned}
   \text{L.H.S.} &= \frac{1}{5!} + \frac{1}{6!} + \frac{1}{7!} \\
   &= \frac{7 \cdot 6}{7!} + \frac{7}{7!} + \frac{1}{7!} \\
   &= \frac{42 + 7 + 1}{7!} \\
   &= \frac{50}{7!} \\
   &= \text{R.H.S. (Proved)}
   \end{aligned}$$

---

### 5.2 Permutations

#### Permutations အကြောင်းမိတ်ဆက်

Permutation ကို **Example 3** ထဲက ပုံချိတ်တဲ့ ပုစ္ဆာနဲ့ ပြန်စဉ်းစားကြည့်ရအောင်။ နံရံပေါ်မှာ သံမှို $3$ ချောင်းရှိပြီး မတူညီသော ပုံ $5$ ပုံထဲမှ $3$ ပုံကို ရွေးကာ သံမှို $3$ ချောင်းပေါ်မှာ ချိတ်ရမည်။

**Question:** There are 3 picture nails on a wall. If there are 5 different pictures and each nail can hold only one picture, in how many different ways can the pictures be hung on all the nails?

ဒီနေရာမှာ ပုံကိုရွေးရုံတင်မက ဘယ်ပုံကို ဘယ်သံမှိုမှာ ချိတ်မလဲဆိုတဲ့ **နေရာအစီအစဉ် (order)** ကိုပါ ထည့်သွင်းစဉ်းစားရမှာ ဖြစ်ပါတယ်။

အဘယ်ကြောင့်ဆိုသော် ပုံ $A$ ကို Nail 1 မှာ၊ ပုံ $B$ ကို Nail 2 မှာ ချိတ်ခြင်းနှင့် ပုံ $B$ ကို Nail 1 မှာ၊ ပုံ $A$ ကို Nail 2 မှာ ချိတ်ခြင်းတို့သည် နေရာကွဲပြားသောကြောင့် မတူညီသောနည်းလမ်းများ ဖြစ်ကြပါတယ်။

$$(A, B) \neq (B, A)$$

[DIAGRAM: PictureNailsDiagram]

* **5 different pictures:** $A, B, C, D, E$
* **3 ordered nail positions:**
  * Nail 1: $5$ choices
  * Nail 2: $4$ choices
  * Nail 3: $3$ choices
  *(choices decrease after each picture is used)*

---

#### Permutations without Repetitions

A permutation is an arrangement of $r$ objects selected from $n$ distinct objects, where the order of the selected objects is important.

မတူညီသော အရာဝတ္ထု $n$ ခုထဲမှ $r$ ခုကို ရွေးယူပြီး အစီအစဉ်တကျ စီခြင်းကို permutation ဟုခေါ်သည်။ ဤနေရာတွင် ရွေးထားသော အရာများ၏ အစီအစဉ်သည် အရေးကြီးသည်။

$$ {}^nP_r \quad \text{or} \quad P(n, r) $$

**From permutation to combination:**

ကျောင်းသား ၃ ယောက်ထဲမှ ၂ ယောက်ကို ရွေးချယ်သည့် ဥပမာကို ပြန်လည်ကြည့်ကြပါစို့။ အကယ်၍ Permutation စနစ်ဖြင့် အစီအစဉ်တကျ စီမည်ဆိုပါက $ {}^3P_2 = 3 \times 2 = 6$ နည်း ရရှိမည်။

ထို ၆ နည်းနှင့် Combination ဖွဲ့စည်းပုံကို ယှဉ်ကြည့်ပါက:

| No. | Permutation | Same Team | Combination Selection |
| :---: | :---: | :---: | :---: |
| 1 | $(A, B)$ | $(A, B) = (B, A)$ | $\{A, B\}$ |
| 2 | $(B, A)$ | $(A, B) = (B, A)$ | $\{A, B\}$ |
| 3 | $(A, C)$ | $(A, C) = (C, A)$ | $\{A, C\}$ |
| 4 | $(C, A)$ | $(A, C) = (C, A)$ | $\{A, C\}$ |
| 5 | $(B, C)$ | $(B, C) = (C, B)$ | $\{B, C\}$ |
| 6 | $(C, B)$ | $(B, C) = (C, B)$ | $\{B, C\}$ |

ဇယားအရ $(A, B)$ နှင့် $(B, A)$ တို့သည် အဖွဲ့တူသောကြောင့် Combination တွင် တစ်နည်းတည်းသာ ဖြစ်သည်။ ထို့ကြောင့် Permutation အရရရှိသော နည်းလမ်းပေါင်း ၆ ခုကို ရွေးချယ်ထားသော အရာဝတ္ထုအရေအတွက် ၂ ခု၏ အစီအစဉ်ဖြစ်နိုင်ခြေ $2!$ နှင့် ပြန်လည်စားပေးခြင်းဖြင့် Combination နည်းလမ်းကို ရရှိစေသည်။

$$ {}^3C_2 = \frac{ {}^3P_2}{2!} = \frac{6}{2} = 3 \text{ နည်း}$$

ယေဘုယျအားဖြင့် $n$ ခုထဲမှ $r$ ခုကို ရွေးချယ်ပြီး အစီအစဉ်တကျစီပါက $ {}^nP_r$ နည်းရှိသော်လည်း၊ Combination တွင် ရွေးချယ်ထားသော $r$ ခုချင်းစီ၏ အစီအစဉ်ပြောင်းလဲခြင်း $r!$ ခုစီသည် အဖွဲ့တူတစ်နည်းတည်းသာ ဖြစ်သောကြောင့် $r!$ ဖြင့် စားပေးရန်လိုအပ်သည်။

$$ {}^nC_r = \frac{ {}^nP_r}{r!}$$

---

**Permutation viewpoint:**

အခြားတစ်ဖက်မှ ကြည့်မည်ဆိုပါက $n$ ခုထဲမှ $r$ ခုကို အစီအစဉ်တကျ စီရန်အတွက် အရင်ဆုံး အရာဝတ္ထု $r$ ခုကို ရွေးချယ်ရမည်ဖြစ်ပြီး ($ {}^nC_r$ နည်း)၊ ထို့နောက် ရွေးချယ်ပြီးသော $r$ ခုကို အချင်းချင်းနေရာချစီစဉ်ရမည် ($r!$ နည်း) ဖြစ်သောကြောင့်:��ှေ့မှာ $1$ ခု သုံးပြီးသားဖြစ်သောကြောင့် $n-1$ နည်းကျန်သည်။ တတိယနေရာရောက်သောအခါ အရှေ့မှာ $2$ ခု သုံးပြီးသားဖြစ်သောကြောင့် $n-2$ နည်းကျန်သည်။

| Position | 1 | 2 | 3 | $\dots$ | $r$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Used before** | 0 | 1 | 2 | $\dots$ | $r - 1$ |
| **Choices left** | $n$ | $n-1$ | $n-2$ | $\dots$ | $n - (r-1)$ |

ထို့ကြောင့် နောက်ဆုံးဖြစ်သည့် $r$-th နေရာရောက်ရှိချိန်တွင် အရှေ့က နေရာ $r-1$ ခုတွင် အရာဝတ္ထု $r-1$ ခုကို သုံးပြီး ဖြစ်သည်။ ထို့ကြောင့် ကျန်နေသောရွေးချယ်စရာအရေအတွက်မှာ
$$n - (r-1) = n - r + 1$$
ဖြစ်သည်။ ထို့ကြောင့် factor form ၏ နောက်ဆုံး factor သည် $n-r+1$ ဖြစ်လာသည်။

##### Using factorial notation:

အထက်ပါ factor form ကို factorial form အဖြစ် ပြောင်းလဲကြည့်မည်။
$$\begin{aligned}
{}^nP_r &= n(n-1)(n-2)\cdots(n-r+1) \\
&= \frac{n(n-1)(n-2)\cdots(n-r+1)(n-r)(n-r-1)\cdots 3 \cdot 2 \cdot 1}{(n-r)(n-r-1)\cdots 3 \cdot 2 \cdot 1} \\
&= \frac{n!}{(n-r)!}
\end{aligned}$$

$$ {}^nP_r = \frac{n!}{(n-r)!} \quad (0 \le r \le n) $$

ဒီပုံသေနည်းတွင် $0 \le r \le n$ ဟု သတ်မှတ်ခြင်းမှာ $r$ သည် ရွေးချယ်ပြီး စီမည့် အရာဝတ္ထုအရေအတွက်ဖြစ်သောကြောင့် ဖြစ်သည်။ အရာဝတ္ထု အရေအတွက် ရွေးချယ်ရမည်ဖြစ်၍ $r \ge 0$ ဖြစ်ရမည်။ ထို့အပြင် စုစုပေါင်းရှိသော အရာဝတ္ထု $n$ ခုထက် ပို၍ ရွေးပြီး စီလို့မရသဖြင့် $r \le n$ ဖြစ်ရမည်။ ထို့ကြောင့် $0 \le r \le n$ ဖြစ်ရမည်။

---

#### Using the Permutation Formula

မိတ်ဆက်ပုစ္ဆာတွင် စုစုပေါင်း ပုံ $5$ ပုံထဲမှ $3$ ပုံကို ရွေးပြီး သံမှို $3$ ချောင်းပေါ်တွင် အစီအစဉ်တကျ ချိတ်ရမည်။ ထို့ကြောင့် $n = 5$ နှင့် $r = 3$ ဖြစ်သည်။
$$\begin{aligned}
{}^5P_3 &= \frac{5!}{(5-3)!} \\
&= \frac{5!}{2!} \\
&= 5 \times 4 \times 3 \\
&= 60
\end{aligned}$$

ဒါကြောင့် ပုံ $5$ ပုံထဲမှ $3$ ပုံကို သံမှို $3$ ချောင်းပေါ်တွင် အစီအစဉ်တကျ ချိတ်နိုင်သော နည်းလမ်းအရေအတွက်မှာ $60$ နည်း ဖြစ်သည်။

##### Special Cases (ထူးခြားသောအခြေအနေများ)

* **အရာဝတ္ထု $n$ ခုလုံးကို စီမည်ဆိုလျှင် $r = n$ ဖြစ်သည်။**
  $$ {}^nP_n = \frac{n!}{(n-n)!} = \frac{n!}{0!} = \frac{n!}{1} = n! $$
  ဒါကြောင့် အရာဝတ္ထု $n$ ခုလုံးကို စီမည်ဆိုပါက စီနိုင်သောနည်းလမ်းအရေအတွက်မှာ $n!$ ဖြစ်သည်။
  
* **တစ်ခုမှ မရွေး၊ မစီလျှင် $r = 0$ ဖြစ်သည်။**
  ဘာမှမရွေးမစီဟူသော နည်းလမ်းတစ်နည်းသာ ရှိသည်။ ထို့ကြောင့်:
  $$ {}^nP_0 = \frac{n!}{(n-0)!} = \frac{n!}{n!} = 1 $$
  
* **တစ်ခုသာ ရွေးပြီးစီလျှင် $r = 1$ ဖြစ်သည်။**
  $n$ ခုထဲမှ တစ်ခုခုကိုရွေးရန် နည်းလမ်း $n$ နည်းရှိသည်။ တစ်ခုတည်းသာဖြစ်သဖြင့် အစီအစဉ်ပြောင်းစရာမရှိဘဲ ရွေးချယ်နိုင်သောနည်းလမ်းစီစဉ်နည်းမှာလည်း $n$ နည်းပင်ဖြစ်သည်။ ယေဘုယျအားဖြင့်:
  $$ {}^nP_1 = \frac{n!}{(n-1)!} = n $$

---

#### မဖြစ်မနေသိရမည့်အချက်များ (Key Points to Remember)

1. Permutation တွင် အစီအစဉ် (order) အရေးကြီးသည်။
2. **arrange** (စီပါ), **place** (နေရာချပါ), **rank** (အဆင့်သတ်မှတ်ပါ), **make a code** (code ဖန်တီးပါ), **choose officers** (ရာထူးနေရာများအတွက် ရွေးပါ) စသော စကားလုံးများပါလျှင် permutationဖြစ်သဖြင့် permutation formula ကို အသုံးပြုရမည်။
3. ထပ်မံသုံးရန် ရွေးချယ်နိုင်သောလမ်းများရွေးချယ်နည်းသည် $n, n-1, n-2, \dots$ ဟု လျော့သွားသည်။
4. အရာဝတ္ထုအားလုံးကို စီလျှင် $n!$ ကို အသုံးပြုသည်။
5. အရာဝတ္ထု $n$ ထဲမှ $r$ ခုကို ရွေးပြီးစီလျှင် $ {}^nP_r = \frac{n!}{(n-r)!} $ ကို အသုံးပြုသည်။
6. ထပ်ဆင့်ခွင့်ရှိလျှင် permutation formula ကို တိုက်ရိုက်သုံး၍မရဘဲ Multiplication Principle ဖြင့် စဉ်းစားရမည်။

---

#### Example 8

**Problem:** Evaluate $ {}^{10}P_5 + {}^{10}P_0$.

**Solution:**
$$\begin{aligned}
{}^{10}P_5 + {}^{10}P_0 &= (10 \times 9 \times 8 \times 7 \times 6) + 1 \\
&= 30240 + 1 \\
&= 30241
\end{aligned}$$

---

#### Example 9

**Problem:** Solve the equations for $n$:
(a) $ {}^nP_2 = 9n$
(b) $ {}^nP_3 = 12 \cdot {}^nP_2$

**Solution:**

**(a) Solve $ {}^nP_2 = 9n$**

ပုံသေနည်းအရ $ {}^nP_2 = n(n-1)$ ဖြစ်သည်။ ထို့ပြင် $n \ge 2$ ဖြစ်ရမည်။
$$\begin{aligned}
n(n-1) &= 9n \\
n^2 - n &= 9n \\
n^2 - 10n &= 0 \\
n(n - 10) &= 0
\end{aligned}$$
ထို့ကြောင့် $n = 0$ သို့မဟုတ် $n = 10$ ရရှိသည်။ သို့သော် $n \ge 2$ ဖြစ်ရမည်ဖြစ်သောကြောင့် $n = 0$ ကို ပယ်ပြီး $n = 10$ ဖြစ်သည်။

**(b) Solve $ {}^nP_3 = 12 \cdot {}^nP_2$**

ပုံသေနည်းအရ $ {}^nP_3 = n(n-1)(n-2)$ နှင့် $ {}^nP_2 = n(n-1)$ ဖြစ်သည်။ ထို့ပြင် $n \ge 3$ ဖြစ်ရမည်။
$$n(n-1)(n-2) = 12n(n-1)$$
$n \ge 3$ ဖြစ်သောကြောင့် $n(n-1) \neq 0$ ဖြစ်သည်။ ညီမျှခြင်း တစ်ဖက်တစ်ချက်စီကို $n(n-1)$ ဖြင့် စားပါက:
$$\begin{aligned}
n-2 &= 12 \\
n &= 14
\end{aligned}$$

---

#### Example 10

**Problem:** In how many ways can a president, a treasurer and a secretary for a committee be selected from a group of 15 people?

**Solution:**

ရာထူး 3 ခုသည် မတူညီသော ရာထူးများဖြစ်သောကြောင့် အစီအစဉ်သည် အရေးကြီးသည်။ ထို့ကြောင့် လူ 15 ယောက်ထဲမှ 3 ယောက်ကို ရွေးပြီး ရာထူးအသီးသီးအတွက် အစီအစဉ်တကျ စီခြင်း (permutation) ဖြစ်သည်။

$$\text{The required number of ways} = {}^{15}P_3 = 15 \times 14 \times 13 = 2730$$

[DIAGRAM:Example10Diagram]

ဒါကြောင့် လူ 15 ယောက်ထဲမှ president, treasurer နှင့် secretary ကို ရွေးချယ်နိုင်သော နည်းလမ်းပေါင်းမှာ 2730 ဖြစ်သည်။

---

#### Example 11

**Problem:** In how many ways can all the letters of the word PENCIL be arranged, without repeating any letter?

**Solution:**

စာလုံး **PENCIL** တွင် မတူညီသောစာလုံး 6 လုံးရှိသည်။ စာလုံးအားလုံးကို ထပ်ခါတလဲလဲမသုံးဘဲ စီရမည်ဖြစ်သောကြောင့် စီနိုင်သောနည်းလမ်းစုစုပေါင်းမှာ $6!$ ဖြစ်သည်။

$$\text{The required number of arrangements} = 6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720$$

[DIAGRAM:Example11Diagram]

ဒါကြောင့် PENCIL စာလုံးပါ စာလုံးအားလုံးကို ထပ်မသုံးဘဲ စီနိုင်သော နည်းလမ်းပေါင်းမှာ 720 ဖြစ်သည်။

---

#### Example 12

**Problem:** There are 2 buses which have 5 and 4 vacant seats respectively, and 4 people at a bus stop. In how many ways can all these people be seated on either of the buses, but not both?

**Solution:**

လူ 4 ယောက်လုံးသည် ဘတ်စ်ကားတစ်စီးပေါ်တွင်သာ ထိုင်ရမည်ဖြစ်ပြီး နှစ်စီးလုံးတွင် တစ်ပြိုင်တည်း မထိုင်နိုင်သောကြောင့် disjoint cases များ ဖြစ်ကြသည်။ ထို့ကြောင့် Case တစ်ခုစီအတွက် တွက်ပြီး Addition Principle အသုံးပြုရမည်။

* **Case 1: First bus (5 vacant seats)**
  လူ 4 ယောက်သည် ပထမဘတ်စ်ကားပေါ်ရှိ လွတ်နေသော ထိုင်ခုံ 5 ခုံပေါ်တွင် ထိုင်ရန် နည်းလမ်းမှာ:
  $$\text{Number of ways} = {}^5P_4 = 5 \times 4 \times 3 \times 2 = 120$$

* **Case 2: Second bus (4 vacant seats)**
  လူ 4 ယောက်သည် ดုတိယဘတ်စ်ကားပေါ်ရှိ လွတ်နေသော ထိုင်ခုံ 4 ခုံပေါ်တွင် ထိုင်ရန် နည်းလမ်းမှာ:
  $$\text{Number of ways} = {}^4P_4 = 4! = 24$$

By the Addition Principle, the total required number of ways is:
$$\text{Total ways} = {}^5P_4 + {}^4P_4 = 120 + 24 = 144$$

[DIAGRAM:Example12Diagram]

ဒါကြောင့် လူ 4 ယောက်ကို ကားတစ်စီးတည်းပေါ်မှာ ထိုင်ခုံနေရာချနိုင်သော နည်းလမ်းစုစုပေါင်းမှာ 144 ဖြစ်သည်။

---

#### Example 13

**Problem:** In how many ways can 6 different books be arranged along a line on a shelf if one of the books is a dictionary and it must be at one end?

**Solution:**

မတူညီသောစာအုပ် 6 အုပ်ရှိပြီး ထိုအထဲမှ တစ်အုပ်သည် dictionary ဖြစ်သည်။ dictionary ကို စင်၏ တစ်ဖက်ဖက် (ဘယ်ဘက်စွန်း သို့မဟုတ် ညာဘက်စွန်း) တွင်သာ ထားရမည်။

* **Case 1: Dictionary is at the left end**
  dictionary ကို ပထမဆုံးနေရာ (ဘယ်ဘက်စွန်း) တွင် ထားရမည်ဖြစ်သဖြင့် 1 နည်းသာ ရှိသည်။ ကျန်သောစာအုပ် 5 အုပ်ကို ကျန်သောနေရာ 5 ခုတွင် စီရန် $5!$ နည်းရှိသည်။
  $$\text{Number of ways} = 1 \times 5! = 120$$

* **Case 2: Dictionary is at the right end**
  dictionary ကို နောက်ဆုံးနေရာ (ညာဘက်စွန်း) တွင် ထားရမည်ဖြစ်သဖြင့် 1 နည်းသာ ရှိသည်။ ကျန်သောစာအုပ် 5 အုပ်ကို ကျန်သောနေရာ 5 ခုတွင် စီရန် $5!$ နည်းရှိသည်။
  $$\text{Number of ways} = 1 \times 5! = 120$$

By the Addition Principle, the total required number of ways is:
$$\text{Total ways} = 120 + 120 = 240$$

[DIAGRAM:Example13Diagram]

ဒါကြောင့် စာအုပ်များကို dictionary ဘေးစွန်းတစ်ဖက်ဖက်တွင် ထားရှိပြီး စီနိုင်သော နည်းလမ်းပေါင်းမှာ 240 ဖြစ်သည်။

---

### Exercise 5.2

#### Questions

1. Solve the equations for $n$:
   (a) $ {}^nP_2 = 42$
   (b) $ {}^nP_3 = 9 \cdot {}^nP_2$

2. A newspaper has 14 reporters available to cover 3 different stories. In how many ways can the reporters be assigned to cover the stories, if no reporter can be assigned to cover more than one story?

3. Suppose we have to make a signal by choosing 4 different flags out of 9 different coloured flags and arranging them in a row. How many different signals can we do?

4. The manager of 4 movie theaters is deciding which of 12 available movies to show. The theaters have different seating capacities. How many ways can he show 4 different movies in the theaters at the same time?

5. A classroom has two rows of eight seats each. There are 10 students, 5 of whom want to sit in the front row, 4 want to sit in the back row and the remaining student can sit in any seat. In how many ways can the students be seated?

---

#### Solutions

1. **Solution:**
   **Question:** Solve the equations for $n$:
   (a) $ {}^nP_2 = 42$
   (b) $ {}^nP_3 = 9 \cdot {}^nP_2$

   **(a) Solve $ {}^nP_2 = 42$ ($n \ge 2$):**
   $$\begin{aligned}
   n(n-1) &= 42 \\
   n^2 - n - 42 &= 0 \\
   (n-7)(n+6) &= 0
   \end{aligned}$$
   ထို့ကြောင့် $n = 7$ သို့မဟုတ် $n = -6$ ရရှိသည်။ သို့သော် $n \ge 2$ ဖြစ်ရမည်ဖြစ်သောကြောင့် $n = 7$ ဖြစ်သည်။

   **(b) Solve $ {}^nP_3 = 9 \cdot {}^nP_2$ ($n \ge 3$):**
   $$n(n-1)(n-2) = 9n(n-1)$$
   $n \ge 3$ ဖြစ်သောကြောင့် $n(n-1) \neq 0$ ဖြစ်သည်။ တစ်ဖက်တစ်ချက်စီကို $n(n-1)$ ဖြင့်စားပါက:
   $$\begin{aligned}
   n-2 &= 9 \\
   n &= 11
   \end{aligned}$$

2. **Solution:**
   **Question:** A newspaper has 14 reporters available to cover 3 different stories. In how many ways can the reporters be assigned to cover the stories, if no reporter can be assigned to cover more than one story?

   သတင်းထောက် 14 ယောက်ရှိပြီး မတူညီသောသတင်း 3 ပုဒ်ကို တာဝန်ပေးရမည်ဖြစ်သည်။ သတင်းထောက်တစ်ယောက်သည် သတင်းတစ်ပုဒ်ထက်ပို၍ တာဝန်မယူနိုင်သောကြောင့် တာဝန်ပေးနိုင်သော နည်းလမ်းအရေအတွက်မှာ:
   $$\text{Number of ways} = {}^{14}P_3 = \frac{14!}{(14-3)!} = \frac{14!}{11!} = 14 \times 13 \times 12 = 2184$$

   [DIAGRAM:Exercise52Question2]

   ဒါကြောင့် သတင်းထောက်များကို တာဝန်ပေးနိုင်သော နည်းလမ်းပေါင်းမှာ 2184 ဖြစ်သည်။

3. **Solution:**
   **Question:** Suppose we have to make a signal by choosing 4 different flags out of 9 different coloured flags and arranging them in a row. How many different signals can we do?

   မတူညီသောအရောင်ရှိသော အလံ 9 ခုထဲမှ 4 ခုကိုရွေးပြီး အစီအစဉ်တကျ တန်းစီရမည်ဖြစ်သည်။ အလံများ၏ အစီအစဉ်နေရာပြောင်းလဲလျှင် အချက်ပြစနစ်လည်း ပြောင်းလဲသွားမည်ဖြစ်သောကြောင့် permutation ကို သုံးရမည်။
   $$\text{Number of signals} = {}^9P_4 = 9 \times 8 \times 7 \times 6 = 3024$$

   [DIAGRAM:Exercise52Question3]

   ဒါကြောင့် ပြုလုပ်နိုင်သော အချက်ပြအချက်ရေ စုစုပေါင်းမှာ 3024 ဖြစ်သည်။

4. **Solution:**
   **Question:** The manager of 4 movie theaters is deciding which of 12 available movies to show. The theaters have different seating capacities. How many ways can he show 4 different movies in the theaters at the same time?

   ရုပ်ရှင်ရုံ 4 ရုံသည် ထိုင်ခုံဆံ့အား မတူညီကြသောကြောင့် ရုပ်ရှင်တစ်ခုချင်းစီကို ရုံတစ်ခုချင်းစီတွင် ပြသခြင်းသည် အစီအစဉ်အရေးကြီးသော permutation ဖြစ်သည်။ ထို့ကြောင့် ရရှိနိုင်သောရုပ်ရှင် 12 ကားထဲမှ 4 ကားကို ရွေးချယ်ပြသနိုင်သော နည်းလမ်းအရေအတွက်မှာ:
   $$\text{Number of ways} = {}^{12}P_4 = 12 \times 11 \times 10 \times 9 = 11880$$

   [DIAGRAM:Exercise52Question4]

   ဒါကြောင့် ပြသနိုင်သော နည်းလမ်းစုစုပေါင်းမှာ 11880 ဖြစ်သည်။

5. **Solution:**
   **Question:** A classroom has two rows of eight seats each. There are 10 students, 5 of whom want to sit in the front row, 4 want to sit in the back row and the remaining student can sit in any seat. In how many ways can the students be seated?

   စာသင်ခန်းတွင် ရှေ့တန်းတွင် 8 ခုံ၊ နောက်တန်းတွင် 8 ခုံ ရှိသည်။ ကျောင်းသား 10 ယောက်ရှိပြီး 5 ယောက်က ရှေ့တန်းတွင်ထိုင်ချင်သည်၊ 4 ယောက်က နောက်တန်းတွင်ထိုင်ချင်ပြီး ကျန် 1 ယောက်က ကြိုက်တဲ့နေရာတွင် ထိုင်နိုင်သည်။

   ဤပြဿနာကို flexible ကျောင်းသား (ကျန် 1 ယောက်) ၏ ထိုင်နိုင်သော နေရာအလိုက် Case နှစ်ခု ခွဲစဉ်းစားပါမည်။

   * **Case 1: Flexible student sits in the front row (ရှေ့တန်းတွင် ထိုင်လျှင်)**
  ရှေ့တန်းတွင် ထိုင်မည့် ကျောင်းသား $5 + 1 = 6$ ယောက် ရှိလာမည်။ ရှေ့တန်းရှိ ခုံ 8 ခုံထဲမှ 6 ခုံကို ရွေးချယ်၍ ၎င်းတို့ကို စီရန်နည်းလမ်းမှာ $ {}^8P_6$ နည်း ဖြစ်သည်။
  နောက်တန်းတွင် ထိုင်မည့် ကျောင်းသား 4 ယောက် ရှိသည်။ နောက်တန်းရှိ ခုံ 8 ခုံထဲမှ 4 ခုံကို ရွေးချယ်၍ ၎င်းတို့ကို စီရန်နည်းလမ်းမှာ $ {}^8P_4$ နည်း ဖြစ်သည်။
  Multiplication Principle အရ နည်းလမ်းပေါင်း $= {}^8P_6 \times {}^8P_4$ နည်း။

   * **Case 2: Flexible student sits in the back row (နောက်တန်းတွင် ထိုင်လျှင်)**
  ရှေ့တန်းတွင် ထိုင်မည့် ကျောင်းသား 5 ယောက် ရှိသည်။ ရှေ့တန်းရှိ ခုံ 8 ခုံထဲမှ 5 ခုံကို ရွေးချယ်၍ ၎င်းတို့ကို စီရန်နည်းလမ်းမှာ $ {}^8P_5$ နည်း ဖြစ်သည်။
  နောက်တန်းတွင် ထိုင်မည့် ကျောင်းသား $4 + 1 = 5$ ယောက် ရှိလာမည်။ နောက်တန်းရှိ ခုံ 8 ခုံထဲမှ 5 ခုံကို ရွေးချယ်၍ ၎င်းတို့ကို စီရန်နည်းလမ်းမှာ $ {}^8P_5$ နည်း ဖြစ်သည်။
  Multiplication Principle အရ နည်းလမ်းပေါင်း $= {}^8P_5 \times {}^8P_5$ နည်း။

   By the Addition Principle, the total required number of ways is:
   $$\begin{aligned}
   \text{Total ways} &= {}^8P_6 \times {}^8P_4 + {}^8P_5 \times {}^8P_5 \\
   &= 20160 \times 1680 + 6720 \times 6720 \\
   &= 33868800 + 45158400 \\
   &= 79027200
   \end{aligned}$$

   [DIAGRAM:Exercise52Question5]

   ဒါကြောင့် ကျောင်းသားများကို နေရာချနိုင်သော နည်းလမ်းစုစုပေါင်းမှာ 79,027,200 ဖြစ်သည်။

---

### 5.3 Combinations

#### Combinations အကြောင်းမိတ်ဆက် (Introduction to Combinations)

ယခင်အပိုင်းများတွင် စီစဉ်ခြင်း (Permutation) အကြောင်းကို လေ့လာခဲ့ပြီး ဖြစ်သည်။ ယခုအခါတွင် အစီအစဉ်အတိုင်း စီစဉ်ခြင်းမဟုတ်ဘဲ အုပ်စုဖွဲ့ ရွေးချယ်ခြင်း (Selection) ကို အဓိကထားလေ့လာကြည့်မည်။

**Situation:** Three students $A, B, C$ are available. The class teacher wants to choose 2 students to represent the class in a quiz team. How many different teams can be formed?

ကျောင်းသား ၃ ယောက် ($A, B, C$) ရှိသည့်အနက်မှ ဉာဏ်စမ်းပဟေဠိပြိုင်ပွဲဝင်ရန် ကျောင်းသား ၂ ယောက်ပါသော အဖွဲ့တစ်ဖွဲ့ကို ရွေးချယ်ရမည် ဖြစ်သည်။

အဖွဲ့ဖွဲ့သည့်နေရာတွင် မည်သူ့ကို အရင်ရွေးသည်၊ မည်သူ့ကို နောက်မှရွေးသည်ဟူသော **ရွေးချယ်မှုအစီအစဉ် (Order) သည် အရေးမကြီးပါ**။ လူ ၂ ယောက် ပါဝင်နေလျှင် တူညီသောအဖွဲ့ပင် ဖြစ်သည်။

ဥပမာ- ကျောင်းသား $A$ နှင့် $B$ ကို ရွေးချယ်ခြင်းသည် $B$ နှင့် $A$ ကို ရွေးချယ်ခြင်းနှင့် အတူတူပင် ဖြစ်သည်။

$$\{A, B\} = \{B, A\}$$

ထို့ကြောင့် Permutation တွင်ကဲ့သို့ $(A, B)$ နှင့် $(B, A)$ ကို မတူညီသော ၂ နည်းအဖြစ် မရေတွက်ရဘဲ၊ အဖွဲ့ဝင်တူညီပါက ၁ နည်းတည်းအဖြစ်သာ သတ်မှတ်ရမည်။

ဖြစ်နိုင်သော အဖွဲ့များကို ရေးသားကြည့်ပါက အောက်ပါအတိုင်း ၃ ဖွဲ့သာ ရရှိမည်ဖြစ်သည်။

| No. | Team | Same selection? |
| :---: | :---: | :---: |
| 1 | $\{A, B\}$ | $AB = BA$ |
| 2 | $\{A, C\}$ | $AC = CA$ |
| 3 | $\{B, C\}$ | $BC = CB$ |

[DIAGRAM:CombinationsIntroDiagram]

ဤကဲ့သို့ အစီအစဉ်အရေးမကြီးသော ရွေးချယ်မှုများကို လေ့လာခြင်းကို **Combination** ဟု ခေါ်ဆိုသည်။

---

#### Definition of Combination

**Definition:** A combination is a selection of $r$ objects from $n$ distinct objects where order does not matter.

Combination ဆိုသည်မှာ မတူညီသော အရာဝတ္ထု $n$ ခုထဲမှ $r$ ခုကို အစီအစဉ် (order) ထည့်သွင်းစဉ်းစားခြင်းမပြုဘဲ ရွေးချယ်ခြင်းပင်ဖြစ်သည်။

သင်္ကေတအားဖြင့် $ {}^nC_r$ သို့မဟုတ် $\binom{n}{r}$ ဖြင့် ဖော်ပြသည်။

$$ {}^nC_r = \binom{n}{r}$$

ဤသင်္ကေတသည် "မတူညီသောအရာ $n$ ခုအနက်မှ $r$ ခုကို Combination စနစ်ဖြင့် ရွေးချယ်ခြင်း" ဟု အဓိပ္ပာယ်ရသည်။

---

#### Combination Formula

**From permutation to combination:**

ကျောင်းသား ၃ ယောက်ထဲမှ ၂ ယောက်ကို ရွေးချယ်သည့် ဥပမာကို ပြန်လည်ကြည့်ကြပါစို့။ အကယ်၍ Permutation စနစ်ဖြင့် အစီအစဉ်တကျ စီမည်ဆိုပါက $ {}^3P_2 = 3 \times 2 = 6$ နည်း ရရှိမည်။

ထို ၆ နည်းနှင့် Combination ဖွဲ့စည်းပုံကို ယှဉ်ကြည့်ပါက:

| No. | Permutation | Same Team | Combination Selection |
| :---: | :---: | :---: | :---: |
| 1 | $(A, B)$ | $(A, B) = (B, A)$ | $\{A, B\}$ |
| 2 | $(B, A)$ | $(A, B) = (B, A)$ | $\{A, B\}$ |
| 3 | $(A, C)$ | $(A, C) = (C, A)$ | $\{A, C\}$ |
| 4 | $(C, A)$ | $(A, C) = (C, A)$ | $\{A, C\}$ |
| 5 | $(B, C)$ | $(B, C) = (C, B)$ | $\{B, C\}$ |
| 6 | $(C, B)$ | $(B, C) = (C, B)$ | $\{B, C\}$ |

ဇယားအရ $(A, B)$ နှင့် $(B, A)$ တို့သည် အဖွဲ့တူသောကြောင့် Combination တွင် တစ်နည်းတည်းသာ ဖြစ်သည်။ ထို့ကြောင့် Permutation အရရရှိသော နည်းလမ်းပေါင်း ၆ ခုကို ရွေးချယ်ထားသော အရာဝတ္ထုအရေအတွက် ၂ ခု၏ အစီအစဉ်ဖြစ်နိုင်ခြေ $2!$ နှင့် ပြန်လည်စားပေးခြင်းဖြင့် Combination နည်းလမ်းကို ရရှိစေသည်။

$$ {}^3C_2 = \frac{{}^3P_2}{2!} = \frac{6}{2} = 3 \text{ နည်း}$$

ယေဘုယျအားဖြင့် $n$ ခုထဲမှ $r$ ခုကို ရွေးချယ်ပြီး အစီအစဉ်တကျစီပါက $ {}^nP_r$ နည်းရှိသော်လည်း၊ Combination တွင် ရွေးချယ်ထားသော $r$ ခုချင်းစီ၏ အစီအစဉ်ပြောင်းလဲခြင်း $r!$ ခုစီသည် အဖွဲ့တူတစ်နည်းတည်းသာ ဖြစ်သောကြောင့် $r!$ ဖြင့် စားပေးရန်လိုအပ်သည်။

$$ {}^nC_r = \frac{{}^nP_r}{r!}$$

---

**Permutation viewpoint:**

အခြားတစ်ဖက်မှ ကြည့်မည်ဆိုပါက $n$ ခုထဲမှ $r$ ခုကို အစီအစဉ်တကျ စီရန်အတွက် အရင်ဆုံး အရာဝတ္ထု $r$ ခုကို ရွေးချယ်ရမည်ဖြစ်ပြီး ($ {}^nC_r$ နည်း)၊ ထို့နောက် ရွေးချယ်ပြီးသော $r$ ခုကို အချင်းချင်းနေရာချစီစဉ်ရမည် ($r!$ နည်း) ဖြစ်သောကြောင့်:

$$ {}^nP_r = {}^nC_r \cdot r! \implies {}^nC_r = \frac{{}^nP_r}{r!}$$

**Using factorial notation:**

Permutation values $ {}^nP_r = \frac{n!}{(n-r)!}$ ကို ထည့်သွင်းတွက်ချက်ပါက:

$$ {}^nC_r = \frac{{}^nP_r}{r!} = \frac{\frac{n!}{(n-r)!}}{r!} = \frac{n!}{r!(n-r)!}$$

**The General Combination Formula:**

$$ {}^nC_r = \binom{n}{r} = \frac{n!}{r!(n-r)!} \quad (0 \le r \le n)$$

[DIAGRAM:CombinationsFormulaView]

---

#### အထူးမှတ်သားရန်အချက်များ (Key Special Cases)

* **တစ်စုံတစ်ရာ မရွေးချယ်လျှင် ($r = 0$):**
  အရာဝတ္ထု $n$ ခုထဲမှ မည်သည့်အရာကိုမျှ မရွေးချယ်သော နည်းလမ်းမှာ ဘာမှမလုပ်ဘဲထားသည့် ၁ နည်းတည်းသာ ရှိသည်။
  $$ {}^nC_0 = \frac{n!}{0!(n-0)!} = \frac{n!}{1 \cdot n!} = 1$$

* **တစ်ခုတည်းသာ ရွေးချယ်လျှင် ($r = 1$):**
  အရာဝတ္ထု $n$ ခုထဲမှ တစ်ခုတည်းကို ရွေးချယ်ရန်အတွက် နည်းလမ်း $n$ သီးခြားစီ ရှိသည်။
  $$ {}^nC_1 = \frac{n!}{1!(n-1)!} = \frac{n \cdot (n-1)!}{1 \cdot (n-1)!} = n$$

* **အားလုံးကို ရွေးချယ်လျှင် ($r = n$):**
  အရာဝတ္ထု $n$ ခုလုံးကို မကျန်အောင် အကုန်ယူရမည်ဖြစ်သဖြင့် ဖြစ်နိုင်ခြေ ၁ နည်းသာ ရှိသည်။
  $$ {}^nC_n = \frac{n!}{n!(n-n)!} = \frac{n!}{n! \cdot 0!} = 1$$

---

#### မဖြစ်မနေသိရမည့်အချက်များ (Important Points)

1. **Combination** တွင် ရွေးချယ်မှုအစီအစဉ် (Order) သည် အရေးမကြီးပါ။
2. **choose** (ရွေးချယ်ပါ), **form a team** (အဖွဲ့ဖွဲ့ပါ), **select a committee** (ကော်မတီရွေးပါ), **make a group** (အုပ်စုခွဲပါ) စသော စကားလုံးများပါဝင်လျှင် Combination စနစ်ကို အသုံးပြုရမည်။
3. တူညီသောအဖွဲ့ဝင်များဖြင့် နေရာပြောင်းလဲစီစဉ်ထားမှုများကို combination တွင် တစ်နည်းတည်းအဖြစ်သာ ရေတွက်ရမည်။
4. အရာဝတ္ထု $n$ ခုထဲမှ $r$ ခုကို ရွေးလျှင် $ {}^nC_r = \frac{n!}{r!(n-r)!}$ ကို အသုံးပြုရမည်။
5. Permutation နှင့် ဆက်စပ်မှုမှာ $ {}^nC_r = \frac{{}^nP_r}{r!}$ ဖြစ်သည်။

---

#### Example 14

**Problem:** In how many ways can a committee of 4 people be selected from a group of 10 people?

**Solution:**

လူ 10 ယောက်ထဲမှ ကော်မတီဝင် 4 ယောက်ကို ရွေးချယ်လိုပါသည်။ ကော်မတီဝင်ရွေးချယ်ရာတွင် ဘယ်သူ့ကို အရင်ရွေးသည်၊ ဘယ်သူ့ကို နောက်မှရွေးသည်ဆိုသော အစီအစဉ်သည် အရေးမကြီးပါ။ ထို့ကြောင့် combination ကို အသုံးပြုရမည်။

The required number of ways:
$$\begin{aligned}
{}^{10}C_4 &= \frac{10 \cdot 9 \cdot 8 \cdot 7}{4 \cdot 3 \cdot 2 \cdot 1} \\
&= 210
\end{aligned}$$

Therefore, the committee can be selected in 210 ways.

[DIAGRAM:Example14Diagram]

---

#### Example 15

**Problem:** Evaluate $ {}^{21}C_1 $, $ {}^{21}C_{21} $, $ {}^{21}C_{19} $ and $ {}^{21}C_2 $.

**Solution:**

$$\begin{aligned}
{}^{21}C_1 &= \frac{21!}{1!(21-1)!} = \frac{21!}{1! \cdot 20!} = 21 \\
{}^{21}C_{21} &= \frac{21!}{21!(21-21)!} = \frac{21!}{21! \cdot 0!} = 1 \\
{}^{21}C_{19} &= \frac{21!}{19!(21-19)!} = \frac{21!}{19! \cdot 2!} = \frac{21 \cdot 20 \cdot 19!}{19! \cdot 2 \cdot 1} = \frac{21 \cdot 20}{2 \cdot 1} = 210 \\
{}^{21}C_2 &= \frac{21!}{2!(21-2)!} = \frac{21!}{2! \cdot 19!} = \frac{21 \cdot 20 \cdot 19!}{2 \cdot 1 \cdot 19!} = \frac{21 \cdot 20}{2 \cdot 1} = 210
\end{aligned}$$

[DIAGRAM:Example15Diagram]

---

#### Note (မှတ်သားရန်အချက်များ)

* **တစ်ခုသာရွေးလျှင် (Choosing 1 item):**
  အရာဝတ္ထု $n$ ခုထဲမှ $1$ ခုကိုသာ ရွေးချယ်လိုပါက ဖြစ်နိုင်ခြေနည်းလမ်းစုစုပေါင်း $n$ နည်း ရှိသည်။
  $$ {}^nC_1 = n $$

* **အားလုံးကိုရွေးလျှင် (Choosing all items):**
  အရာဝတ္ထု $n$ ခုလုံးကို ရွေးချယ်လိုပါက ဖြစ်နိုင်ခြေ $1$ နည်းသာ ရှိသည်။
  $$ {}^nC_n = 1 $$

* **တစ်ခုချန်ပြီး ကျန်အားလုံးကိုရွေးလျှင် (Choosing $n-1$ items):**
  အရာဝတ္ထု $n$ ခုထဲမှ $n - 1$ ခုကို ရွေးချယ်ခြင်းသည် မရွေးဘဲချန်ခဲ့မည့်အရာ တစ်ခုစီကို ရွေးချယ်ခြင်းနှင့် အတူတူပင်ဖြစ်သဖြင့် ဖြစ်နိုင်ခြေ $n$ နည်းရှိသည်။  
  *ဥပမာ* — ခဲတံ ၅ ချောင်းထဲမှ ၄ ချောင်းကို ရွေးချယ်လျှင် ချန်ခဲ့မည့် ခဲတံတစ်ချောင်းစီကို ရွေးချယ်ခြင်းနှင့် အတူတူပင်ဖြစ်သောကြောင့် ရရှိနိုင်သော ခဲတံရွေးချယ်မှုနည်းလမ်းမှာ $ {}^5C_4 = 5 $ နည်း ဖြစ်သည်။
  $$ {}^nC_{n-1} = n $$

* **နှစ်ခုရွေးလျှင် (Choosing 2 items):**
  အရာဝတ္ထု $n$ ခုထဲမှ $2$ ခုကို ရွေးချယ်လိုပါက အောက်ပါအတိုင်း တွက်ချက်နိုင်သည် -
  $$ {}^nC_2 = \frac{n(n-1)}{2} $$

* **ထို့အပြင် $ {}^{21}C_{19} = {}^{21}C_2 $ ဖြစ်သကဲ့သို့ ယေဘုယျအားဖြင့် အောက်ပါအတိုင်း မှတ်သားနိုင်သည် -**
  $$ {}^nC_r = {}^nC_{n-r} $$

---

#### Example 16

**Problem:** A music class consists of 5 piano players, 7 guitarists and 4 violinists. A band of 1 piano player, 3 guitarists and 2 violinists must be chosen to play at a school concert. In how many ways can the band be chosen?

**Solution:**

တီးဝိုင်းတစ်ခုတွင် piano player 1 ယောက်၊ guitarists 3 ယောက်နှင့် violinists 2 ယောက်ကို ရွေးရမည်။ ရွေးချယ်ခြင်းဖြစ်ပြီး အစီအစဉ်မလိုသောကြောင့် combination ကို အသုံးပြုရမည်။

ရွေးချယ်မှုကို အပိုင်းသုံးပိုင်းခွဲစဉ်းစားမည်။

* To choose 1 piano player from 5 piano players: $ {}^5C_1 $ ways.
* To choose 3 guitarists from 7 guitarists: $ {}^7C_3 $ ways.
* To choose 2 violinists from 4 violinists: $ {}^4C_2 $ ways.

ထိုရွေးချယ်မှုသုံးခုလုံးကို တစ်ပြိုင်နက် ပြုလုပ်ရမည်ဖြစ်သောကြောင့် Multiplication Principle ကို အသုံးပြုသည်။

$$\begin{aligned}\text{The required number of ways} &= {}^5C_1 \cdot {}^7C_3 \cdot {}^4C_2 \\&= 5 \cdot \frac{7 \cdot 6 \cdot 5}{3 \cdot 2 \cdot 1} \cdot \frac{4 \cdot 3}{2 \cdot 1} \\&= 5 \cdot 35 \cdot 6 \\&= 1050.\end{aligned}$$

Therefore, the band can be chosen in 1050 ways.

---

#### Example 17

**Problem:** Suppose there are 4 black cars and 7 white cars. If all the cars are distinguishable, in how many ways can 3 cars of the same color be chosen?

**Solution:**

အနက်ရောင်ကား 4 စီးနှင့် အဖြူရောင်ကား 7 စီးရှိသည်ဟု ယူဆရမည်ဖြစ်ပြီး ကားအားလုံးသည် တစ်စီးနှင့်တစ်စီး ခွဲခြားနိုင်သည်။ အရောင်တူကား 3 စီးကို ရွေးချယ်နိုင်မည့်နည်းလမ်းပေါင်းကို ရှာရမည်ဖြစ်သည်။ ရွေးချယ်ရာတွင် အနက်ရောင်ကား 3 စီးရွေးခြင်းနှင့် အဖြူရောင်ကား 3 စီးရွေးခြင်းဟူ၍ ဖြစ်ရပ်နှစ်မျိုးရှိသည်။ 3 စီးတွင် အရောင်တူရန်သာ အရေးကြီးပြီး မည်သည့်ကားကိုမဆို အရင်ရွေးနိုင်သောကြောင့် အစီအစဉ်အရေးမကြီးသော combination ဖြစ်သည်။ ထို့ကြောင့် ဖြစ်နိုင်သောအခြေအနေများမှာ

* Choose 3 black cars from 4 black cars: $ {}^4C_3 $ ways.
* Choose 3 white cars from 7 white cars: $ {}^7C_3 $ ways.

အခြေအနေနှစ်ခုသည် တစ်ပြိုင်နက်ဖြစ်ခြင်းမရှိသောကြောင့် Addition Principle ကို အသုံးပြုရမည်။

$$\begin{aligned}\text{Required ways} &= {}^4C_3 + {}^7C_3 \\&= 4 + \frac{7 \cdot 6 \cdot 5}{3 \cdot 2 \cdot 1} \\&= 4 + 35 \\&= 39.\end{aligned}$$

Therefore, 3 cars of the same color can be chosen in 39 ways.

---

#### Example 18

**Problem:** There are 6 different books. In how many ways can the books be given to 3 children, if the youngest wants to receive 3 books, the elder 1 book and the eldest 2 books respectively?

**Solution:**

မတူသောစာအုပ် 6 အုပ်ရှိသည်။ ကလေးသုံးယောက်တွင် အငယ်ဆုံးက 3 အုပ်၊ အလတ်က 1 အုပ်နှင့် အကြီးဆုံးက 2 အုပ် အသီးသီး ရချင်ကြသည်။ ထိုအတိုင်းရရန် ပေးနိုင်မည့်နည်းလမ်းပေါင်းကို ရှာရမည်ဖြစ်သည်။ စာအုပ်ပေးရာတွင် မည်သည့်စာအုပ်ကို မည်သူ့ကို အရင်ပေးမည်ဆိုသော အစီအစဉ်ကို ထည့်သွင်းစဉ်းစားစရာမလိုဘဲ လိုချင်သောစာအုပ် အရေအတွက်များ ရရှိရန်သာ အရေးကြီးသည်။ ထို့ကြောင့် အစီအစဉ်အရေးမပါသော combination ဖြစ်သည်။

* Choose 3 books for the youngest child: $ {}^6C_3 $ ways.
* Choose 1 book for the elder child from the remaining 3 books: $ {}^3C_1 $ ways.
* Choose 2 books for the eldest child from the remaining 2 books: $ {}^2C_2 $ ways.

ရွေးချယ်မှုများကို ဆက်တိုက်ပြုလုပ်ရသောကြောင့် Multiplication Principle ကို အသုံးပြုရမည်။

$$\begin{aligned}\text{The required number of ways} &= {}^6C_3 \cdot {}^3C_1 \cdot {}^2C_2 \\&= 20 \cdot 3 \cdot 1 \\&= 60.\end{aligned}$$

Therefore, the books can be given to the 3 children in 60 ways.

---

#### Example 19

**Problem:** In how many ways can 4 fruits be selected out of 9 fruits, so as always to:
(a) include the largest fruit? (Assume that such a largest fruit exists.)
(b) exclude the smallest fruit? (Assume that such a smallest fruit exists.)

**Solution:**

အသီး 9 လုံးထဲမှ အသီး 4 လုံးကို ရွေးရမည်ဖြစ်သည်။ အသီး 4 လုံးပြည့်ရန် အစီအစဉ်ကျရောမလိုဘဲ ကြိုက်သလို ရွေးနိုင်သဖြင့် အစီအစဉ်အရေးမကြီးသော ရွေးချယ်ခြင်းဖြစ်သည့်အတွက် combination ဖြစ်သည်။

**(a) Include the largest fruit.**

အကြီးဆုံးအသီးတစ်လုံး မဖြစ်မနေပါရမည်ဖြစ်ပြီး ထိုသို့ရွေးနိုင်ရန် အကြီးဆုံးအသီး 1 လုံးရှိသည်ဟု ယူဆရမည်။ ထို့ကြောင့် ယင်းအကြီးဆုံးအသီးတစ်လုံးကို အရင်ရွေးထားလိုက်မည်ဖြစ်သည်။ ထို့ကြောင့် ထပ်လိုသောအသီး 3 လုံးကို ကျန်အသီး 8 လုံးထဲမှ ရွေးရမည်။

$$\begin{aligned}\text{Required ways} &= {}^8C_3 \\&= \frac{8 \cdot 7 \cdot 6}{3 \cdot 2 \cdot 1} \\&= 56.\end{aligned}$$

**(b) Exclude the smallest fruit.**

အသေးဆုံးအသီးကို မရွေးရသောကြောင့် ရွေးနိုင်သောအသီးမှာ ကျန်အသီး 8 လုံးသာဖြစ်သည်။ ထို့ကြောင့် အသီး 4 လုံးကို ထို 8 လုံးထဲမှ ရွေးရမည်။

$$\begin{aligned}\text{Required ways} &= {}^8C_4 \\&= \frac{8 \cdot 7 \cdot 6 \cdot 5}{4 \cdot 3 \cdot 2 \cdot 1} \\&= 70.\end{aligned}$$

---

### Exercise 5.3

**Questions**

1. Show that $ {}^{12}C_5 \cdot {}^7C_4 = {}^{12}C_4 \cdot {}^8C_5 $.
2. There are 10 candle holders, which are fixed in different locations along a line and each can hold only one candle. In how many ways can 7 identical candles be put in these holders?
3. There are 3 parts in a test. Each of the first two parts contains 5 questions, but the last part only 4. If a student must answer all from the first part, 4 and 3 questions from the second and the last parts respectively, in how many ways can this be done?
4. How many games can be played in a 9-team sport league if each team plays all other teams once?
5. How many lines are determined by 8 points, if no 3 such points are collinear? How many triangles are determined by these points?
6. In how many ways can 4 fruits be selected out of 9 fruits, having different sizes, so as always to include the largest fruit and exclude the smallest fruit?

**Solutions**

**1.** Show that $ {}^{12}C_5 \cdot {}^7C_4 = {}^{12}C_4 \cdot {}^8C_5 $.

$$\begin{aligned}{}^{12}C_5 \cdot {}^7C_4 &= \frac{12 \cdot 11 \cdot 10 \cdot 9 \cdot 8}{5 \cdot 4 \cdot 3 \cdot 2 \cdot 1} \cdot \frac{7 \cdot 6 \cdot 5 \cdot 4}{4 \cdot 3 \cdot 2 \cdot 1} \\&= \frac{12 \cdot 11 \cdot 10 \cdot 9}{4 \cdot 3 \cdot 2 \cdot 1} \cdot \frac{8 \cdot 7 \cdot 6 \cdot 5 \cdot 4}{5 \cdot 4 \cdot 3 \cdot 2 \cdot 1} \\&= {}^{12}C_4 \cdot {}^8C_5\end{aligned}$$

**2.** There are 10 candle holders, which are fixed in different locations along a line and each can hold only one candle. In how many ways can 7 identical candles be put in these holders?

ဖယောင်းတိုင် 7 ချောင်းသည် တစ်ချောင်းနှင့်တစ်ချောင်း မခွဲခြားနိုင်သော identical candles ဖြစ်သည်။ ထို့ကြောင့် မည်သည့်ဖယောင်းတိုင်ကို အရင်ထည့်မည်ဆိုသော အစီအစဉ်မလိုဘဲ ဖယောင်းတိုင်ထည့်မည့် holder 7 ခုကို holder 10 ခုထဲမှ ရွေးရန်ဖြစ်သည်။

[DIAGRAM:Exercise53Question2Diagram]

တူညီသောဖယောင်းတိုင် 7 ချောင်းကို ထည့်ခြင်းသည် မထည့်ဘဲကျန်မည့် holder 3 ခုကို ရွေးခြင်းနှင့်လည်း တူညီသည်။

$$\begin{aligned}\text{The required number of ways} &= {}^{10}C_7 \\&= {}^{10}C_3 \\&= \frac{10 \cdot 9 \cdot 8}{3 \cdot 2 \cdot 1} \\&= 120.\end{aligned}$$

**3.** There are 3 parts in a test. Each of the first two parts contains 5 questions, but the last part only 4. If a student must answer all from the first part, 4 and 3 questions from the second and the last parts respectively, in how many ways can this be done?

စာမေးပွဲတွင် မေးခွန်းများကို ရွေးချယ်ဖြေဆိုရာတွင် မည်သည့်မေးခွန်းကို အရင်ဖြေသည်၊ နောက်မှဖြေသည်ဆိုသော အစီအစဉ်သည် အရေးမကြီးပါ။ ထို့ကြောင့် combination ကို အသုံးပြုရမည်။

[DIAGRAM:Exercise53Question3Diagram]

ထို့အပြင် စာမေးပွဲဖြေရာတွင် ရွေးချယ်ထားသောမေးခွန်းအားလုံးကို ဆက်တိုက်ဖြေဆိုရမည်ဖြစ်သောကြောင့် Multiplication Principle ကို အသုံးပြုရမည်။

* From the first part: all 5 questions must be answered, so there are $ {}^5C_5 $ ways.
* From the second part: 4 questions must be chosen from 5 questions, so there are $ {}^5C_4 $ ways.
* From the last part: 3 questions must be chosen from 4 questions, so there are $ {}^4C_3 $ ways.

$$\begin{aligned}\text{The required number of ways} &= {}^5C_5 \cdot {}^5C_4 \cdot {}^4C_3 \\&= 1 \cdot 5 \cdot 4 \\&= 20.\end{aligned}$$

**4.** How many games can be played in a 9-team sport league if each team plays all other teams once?

အသင်း 9 သင်းရှိပြီး အသင်းတစ်သင်းစီသည် အခြားအသင်းတိုင်းနှင့် တစ်ကြိမ်စီ ကစားရမည်ဖြစ်သည်။ ပွဲတစ်ပွဲဖြစ်ရန် အသင်း 2 သင်းကို ရွေးရမည်။ အသင်း A နှင့် အသင်း B ကစားခြင်းသည် အသင်း B နှင့် အသင်း A ကစားခြင်းနှင့် တူညီသောပွဲတစ်ပွဲတည်းဖြစ်သောကြောင့် အစီအစဉ်အရေးမကြီးပါ။ ထို့ကြောင့် combination ကို အသုံးပြုရမည်။

[DIAGRAM:Exercise53Question4Diagram]

$$\begin{aligned}\text{The required number of games} &= {}^9C_2 \\&= \frac{9 \cdot 8}{2 \cdot 1} \\&= 36.\end{aligned}$$

**5.** How many lines are determined by 8 points, if no 3 such points are collinear? How many triangles are determined by these points?

[DIAGRAM:Exercise53Question5Diagram]

မျဉ်းတစ်ကြောင်းကို သတ်မှတ်ရန် အမှတ် 2 မှတ်လိုအပ်သည်။ အမှတ် 8 မှတ်ထဲမှ မည်သည့်အမှတ် 2 မှတ်ကို ရွေးလိုက်သည်ဖြစ်စေ မျဉ်းတစ်ကြောင်းရမည်။ မည်သည့်အမှတ် 3 မှတ်မှ တစ်ကြောင်းတည်းပေါ်တွင် မရှိသောကြောင့် ရွေးလိုက်သောအမှတ်နှစ်မှတ်တိုင်းသည် တူညီသောမျဉ်းတစ်ကြောင်းစီကို သတ်မှတ်ပေးသည်။ အမှတ်နှစ်မှတ်၏ အစီအစဉ်သည် အရေးမကြီးသောကြောင့် combination ကို အသုံးပြုရမည်။

$$\begin{aligned}\text{Number of lines} &= {}^8C_2 \\&= \frac{8 \cdot 7}{2 \cdot 1} \\&= 28.\end{aligned}$$

တြိဂံတစ်ခုကို သတ်မှတ်ရန် အမှတ် 3 မှတ်လိုအပ်သည်။ မည်သည့်အမှတ် 3 မှတ်မှ တစ်ကြောင်းတည်းပေါ်တွင် မရှိသောကြောင့် အမှတ် 8 မှတ်ထဲမှ ရွေးသောမည်သည့် 3 မှတ်တိတိုင်းသည် တြိဂံတစ်ခုစီ ဖြစ်စေသည်။ အမှတ်သုံးမှတ်ကို ရွေးသည့်အစီအစဉ်သည် အရေးမကြီးသောကြောင့် combination ကို အသုံးပြုရမည်။

$$\begin{aligned}\text{Number of triangles} &= {}^8C_3 \\&= \frac{8 \cdot 7 \cdot 6}{3 \cdot 2 \cdot 1} \\&= 56.\end{aligned}$$

**6.** In how many ways can 4 fruits be selected out of 9 fruits, having different sizes, so as always to include the largest fruit and exclude the smallest fruit?

[DIAGRAM:Exercise53Question6Diagram]

အသီး 9 လုံးထဲမှ အသီး 4 လုံးကို ရွေးရမည်။ အကြီးဆုံးအသီးတစ်လုံးမဖြစ်မနေ ပါရမည်ဖြစ်ပြီး အသေးဆုံးအသီးကို ဖယ်ထားရမည်ဖြစ်သည်။ ထို့ကြောင့် အကြီးဆုံး 1 လုံးကို အရင်ရွေးထားပြီး အသေးဆုံး 1 လုံးကို ရွေးချယ်မှုမှ ဖယ်ထားရမည်။

အကြီးဆုံးအသီးတစ်လုံးကို ရွေးပြီးသားဖြစ်သောကြောင့် ထပ်လိုသောအသီးမှာ 3 လုံး ဖြစ်သည်။ အကြီးဆုံးနှင့် အသေးဆုံးကို ဖယ်ပြီးနောက် ကျန်အသီးမှာ 7 လုံးရှိသောကြောင့် ထို 7 လုံးထဲမှ 3 လုံးရွေးရမည်။ ရွေးချယ်ခြင်းသာဖြစ်ပြီး အစီအစဉ်အရေးမကြီးသောကြောင့် combination ကို အသုံးပြုရမည်။

$$\begin{aligned}\text{The required number of ways} &= {}^7C_3 \\&= \frac{7 \cdot 6 \cdot 5}{3 \cdot 2 \cdot 1} \\&= 35.\end{aligned}$$


---

## 5.4 Techniques for Some Counting Principle

In this section, we explore advanced counting techniques that build upon the basic principles. We will discuss permutations where some objects are identical (Permutations with Repetitions), how to handle overcounting (The Exclusion Principle), and how to count the total number of subsets of a finite set.

### Permutations with Repetitions

အရာဝတ္ထုများကို အစီအစဉ်တကျစီရာတွင် အချို့အရာများသည် တစ်ခုနှင့်တစ်ခု ခွဲခြားမရဘဲ တူညီနေပါက permutations with repetitions ဖြင့် စဉ်းစားရမည်။

ဥပမာ KEENNESS ဆိုသော စာလုံးတွင် K တစ်လုံး၊ E သုံးလုံး၊ N နှစ်လုံးနှင့် S နှစ်လုံးရှိသည်။ ပထမ E နှင့် ဒုတိယ E ကို နေရာချင်းလဲလှယ်သော်လည်း စာလုံးစီပုံအသစ်တစ်ခု မဖြစ်လာပါ။ ထို့အတူ N နှစ်လုံးအတွင်းနှင့် S နှစ်လုံးအတွင်း နေရာချင်းလဲလှယ်ခြင်းများလည်း စာလုံးစီပုံအသစ် မဖြစ်စေပါ။ ထို့ကြောင့် ထပ်နေသောအစီအစဉ်များကို ဖယ်ထုတ်ရန် လိုသည်။

#### Formula for Permutations with Repetitions

အရင်ဆုံး KEENNESS ကို combination နည်းဖြင့် စဉ်းစားကြည့်မယ်။ စာလုံး 8 လုံးထားမည့်နေရာ 8 နေရာရှိသည် ဟု ယူဆပါ။

- ပထမဆုံး K တစ်လုံးထားမည့်နေရာ 1 နေရာကို နေရာ 8 နေရာထဲမှ ရွေးမည်။ နည်းလမ်းအရေအတွက်မှာ $ {}^8C_1 $ ဖြစ်သည်။
- ကျန်နေရာ 7 နေရာထဲမှ E သုံးလုံးထားမည့်နေရာ 3 နေရာကို ရွေးမည်။ နည်းလမ်းအရေအတွက်မှာ $ {}^7C_3 $ ဖြစ်သည်။
- ကျန်နေရာ 4 နေရာထဲမှ N နှစ်လုံးထားမည့်နေရာ 2 နေရာကို ရွေးမည်။ နည်းလမ်းအရေအတွက်မှာ $ {}^4C_2 $ ဖြစ်သည်။
- နောက်ဆုံး ကျန်နေရာ 2 နေရာတွင် S နှစ်လုံးထားရမည်။ နည်းလမ်းအရေအတွက်မှာ $ {}^2C_2 $ ဖြစ်သည်။

ထို့ကြောင့် Multiplication Principle အရ
$$
\begin{aligned}
\text{Number of arrangements of } KEENNESS &= {}^8C_1 \cdot {}^7C_3 \cdot {}^4C_2 \cdot {}^2C_2 \\
&= \frac{8!}{1!7!} \cdot \frac{7!}{3!4!} \cdot \frac{4!}{2!2!} \cdot \frac{2!}{2!0!} \\
&= \frac{8!}{3!2!2!}
\end{aligned}
$$

ဆိုလိုသည်မှာ တူညီသောစာလုံးများ၏ နေရာများကို combination ဖြင့် အဆင့်လိုက် ရွေးသွားလျှင် အဆုံးတွင် ထပ်နေသောအရေးအတွက်များကို စားထားသလိုခံရလာသည်။ ဒီအယူအဆကို ယေဘုယျပြုလျှင် စုစုပေါင်း အရာဝတ္ထု $n$ ခုရှိပြီး ထို $n$ ခုထဲတွင်ပါသည့် တူညီသောအရာများ၏ အရေအတွက်များသည် $n_1, n_2, \dots, n_r$ အထိ ရှိမည်ဆိုပါက စီနိုင်သောနည်းလမ်းအရေအတွက်မှာ
$$ \frac{n!}{n_1! n_2! \dots n_r!} $$
ဖြစ်သည်။

---

##### Example 20
In how many ways can a permutation of all the letters of the word EXCELLENCE be formed?

**Solution**
EXCELLENCE တွင် စုစုပေါင်းစာလုံး 10 လုံးရှိသည်။ ထိုအထဲတွင် E သည် 4 လုံး၊ C သည် 2 လုံး၊ L သည် 2 လုံး၊ X သည် 1 လုံးနှင့် N သည် 1 လုံး ပါသည်။
တူညီသောစာလုံးများပါသောကြောင့် permutations with repetitions ပုံသေနည်းကို အသုံးပြုရမည်။
In the word EXCELLENCE, there are 10 letters consisting of four E's, one X, two C's, two L's and one N. So the number of ways is
$$
\begin{aligned}
\frac{10!}{4! 2! 2! 1! 1!} &= \frac{10 \cdot 9 \cdot 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4!}{4! \cdot (2 \cdot 1) \cdot (2 \cdot 1) \cdot 1} \\
&= \frac{10 \cdot 9 \cdot 8 \cdot 7 \cdot 6 \cdot 5}{1 \cdot 2 \cdot 2 \cdot 1} \\
&= 37800.
\end{aligned}
$$
Therefore, all the letters of EXCELLENCE can be arranged in 37800 different ways.

---

### The Exclusion Principle

**Note** The exclusion principle is a way to count what you are interested in by first counting what you are not interested in. This is often needed for counting where a certain property is prohibited (not allowed).

ဆိုလိုသည်မှာ လိုချင်သောနည်းလမ်း သို့မဟုတ် စိတ်ဝင်စားသောနည်းလမ်းအရေအတွက်ကိုရဖို့ မလိုချင်သောအရာ သို့မဟုတ် မပါစေချင်သောနည်းလမ်းများကို အရင်ရေတွက်ပြီး စုစုပေါင်းနည်းလမ်းထဲမှ ပြန်နုတ်ခြင်းဖြင့် လိုချင်သောနည်းလမ်းအရေအတွက်ကို ရှာခြင်းဖြစ်သည်။

**General Rule** Required number of ways = Total number of ways $ - $ Number of excluded ways.

#### ဥပမာတစ်ခုနဲ့ လေ့လာကြည့်ရအောင်

Consider 5-digit codes containing each of the digits 1, 2, 3, 4, 5 exactly once. Find the number of codes not ending in 25.

**Solution**

ကိန်းဂဏန်း 1, 2, 3, 4, 5 တို့ကို တစ်လုံးစီသာသုံးပြီး 5-digit codes ဖန်တီးရမည်။ လိုချင်သော codes များသည် 25 ဖြင့် မဆုံးရပါ။
ထို့ကြောင့် last digit သည် 5 မဖြစ်သောအခြေအနေနှင့် last digit သည် 5 ဖြစ်ပြီး 4th digit သည် 2 မဖြစ်သောအခြေအနေဟူ၍ case 2 ခုခွဲပြီး စဉ်းစားကြည့်မည်။

###### Case 1: last digit is not 5
[DIAGRAM:ExclusionPrincipleExample1Case1Diagram]

ပထမပုံတွင် ပြထားသကဲ့သို့ Case 1 တွင် last digit သည် 5 မဖြစ်ရသောကြောင့် 1, 2, 3, 4 ထဲမှ ရွေးရန် နည်းလမ်း 4 နည်းရှိသည်။ တစ်လုံးကိုရွေးလိုက်လျှင် 3 လုံးကျန်မည်ဖြစ်ပြီး ဖယ်ထားသော 5 နှင့်ဆိုလျှင် digit 4 လုံးဖြစ်မည်။ ထို့ကြောင့် ထို digit 4 လုံးကို ပထမနေရာ 4 နေရာတွင် စီနိုင်သောနည်းလမ်းမှာ $4!$ ဖြစ်သည်။

$$ \text{Case 1: last digit is not } 5 = 4 \cdot 4! = 96 $$

###### Case 2: last digit is 5, but 4th digit is not 2
[DIAGRAM:ExclusionPrincipleExample1Case2Diagram]

ထို့နောက် Case 2 တွင် last digit ကို 5 ဟုသတ်မှတ်ထားပြီးဖြစ်သည့်အတွက် ရွေးချယ်နိုင်သော နည်းလမ်းမှာ 1 နည်းသာရှိသည်။ 4th digit သည် 2 မဖြစ်ရသောကြောင့် ကျန်သော 1, 3, 4 ထဲမှ တစ်ခုကို ရွေးနိုင်ပြီး နည်းလမ်း 3 နည်းရှိသည်။ တစ်လုံးကို ရွေးလိုက်လျှင် 2 လုံးကျန်မည်ဖြစ်ပြီး ဖယ်ထားသော 2 နှင့်ဆိုလျှင် စုစုပေါင်း 3 လုံးကျန်မည်။ ကျန်နေသော 3 လုံးကို ပထမနေရာ 3 နေရာတွင် စီနိုင်သောနည်းလမ်းမှာ $3!$ ဖြစ်သည်။

$$ \text{Case 2: last digit is 5 and 4th digit is not 2} = 3 \cdot 3! = 18 $$

ဖြစ်ရပ်နှစ်ခုသည် တစ်ခုနှင့်တစ်ခု အဆက်အစပ်မရှိသော သီးခြားဖြစ်ရပ် (disjoint cases) များဖြစ်သောကြောင့် Addition Principle ကိုသုံးပြီး စုစုပေါင်းနည်းလမ်းကို ရှာရမည်။

$$ \text{Required number of codes not ending in } 25 = 96 + 18 = 114 $$

ဒီတစ်ခါတော့ Exclusion Principle ကိုသုံးပြီး တွက်ကြည့်ကြမည်။

$$ \text{Total number of codes} = 5! = 120 $$

လိုချင်သည်မှာ 25 ဖြင့်မဆုံးသော codes များဖြစ်သည့်အတွက် မလိုချင်သော codes များသည် 25 ဖြင့်ဆုံးသော codes များဖြစ်သည်။ နောက်ဆုံးနေရာနှစ်ခုတွင် 2 နှင့် 5 ကို အစဉ်လိုက်အသေထားလျှင် ကျန်နေရာ 3 နေရာတွင် 1, 3, 4 တို့ကို စီရမည်။

###### Excluded codes: ending in 25
[DIAGRAM:ExclusionPrincipleExample1ExcludedDiagram]

$$ \text{Number of codes ending in } 25 = 3! \cdot 1 \cdot 1 = 6 $$

$$
\begin{aligned}
\text{Required number of codes not ending in } 25 &= \text{Total number} - \text{Number ending in } 25 \\
&= 120 - 6 \\
&= 114.
\end{aligned}
$$

ထို့ကြောင့် Exclusion Principle ကိုသုံးလျှင် မလိုချင်သောအခြေအနေကိုသာ နုတ်ပယ်ရသောကြောင့် ပိုတိုပြီး ပိုရှင်းလင်းသည်။
Therefore, the number of codes not ending in 25 is 114.

---

##### Example 21
How many permutations are there of the letters of the word PROGRAM, if they do not end in: (a) 2R's (b) MAP?

**Solution**
PROGRAM တွင် စုစုပေါင်းစာလုံး 7 လုံးရှိပြီး R နှစ်လုံး တူညီနေသည်။
In the word PROGRAM, there are 7 letters consisting of one P, two R's, one O, one G, one A and one M, so the number of permutations of the letters is
$$
\begin{aligned}
\text{Total number of permutations of the letters} &= \frac{7!}{2! \cdot 1! \cdot 1! \cdot 1! \cdot 1! \cdot 1!} \\
&= 2520.
\end{aligned}
$$

**(a) Not ending in 2R's.**
လိုချင်တာက 2R's နဲ့မဆုံးသော permutations များဖြစ်သည်။ ဒါကြောင့် မလိုချင်သော permutations များဖြစ်သည့် 2R's ဖြင့်ဆုံးသော permutations များကို အရင်ရှာပြီး စုစုပေါင်းနည်းလမ်းထဲက နုတ်ရမည်။ နောက်ဆုံးနေရာနှစ်ခုတွင် R နှစ်လုံးကို အသေထားလျှင် ကျန်သော P, O, G, A, M စာလုံး 5 လုံးကို ပထမနေရာ 5 နေရာတွင် စီရမည်။

###### Excluded permutations: ending in 2R's
[DIAGRAM:ProgramExampleDiagramA]

$$ \text{Number of permutations ending in 2R's} = 5! \cdot 1! \cdot 1 = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 \cdot 1 \cdot 1 = 120. $$
$$ \text{Number of permutations not ending in 2R's} = 2520 - 120 = 2400. $$

**(b) Not ending in MAP.**
မလိုချင်သော permutations များသည် နောက်ဆုံးနေရာသုံးခုတွင် MAP ဖြင့်ဆုံးသော permutations များဖြစ်သည်။ နောက်ဆုံးနေရာများတွင် M, A, P ကို အစဉ်လိုက်အသေထားလျှင် ကျန်သော R, O, G, R စာလုံး 4 လုံးကို ပထမနေရာ 4 နေရာတွင် စီရမည်။ ထိုကျန်စာလုံးများတွင် R နှစ်လုံး တူညီနေသည်။

###### Excluded permutations: ending in MAP
[DIAGRAM:ProgramExampleDiagramB]

$$
\begin{aligned}
\text{Number of permutations ending in MAP} &= \frac{4!}{2!} \cdot 1! \cdot 1! \cdot 1! \\
&= \frac{4 \cdot 3 \cdot 2 \cdot 1}{2 \cdot 1} \cdot 1 \cdot 1 \cdot 1 \\
&= 12.
\end{aligned}
$$
$$ \text{Number of permutations not ending in MAP} = 2520 - 12 = 2508. $$

**Note** ကျန်သောစာလုံးများကို စီရာတွင် တူသောစာလုံးများရှိ/မရှိ သတိထားရမည်။ တူသောစာလုံးများရှိပါက ထိုတူသောအရေးအတွက်၏ factorial ဖြင့် ပြန်စားရမည်။ တစ်လုံးတည်းရှိသောစာလုံးများအတွက် $1!$ များကို ပိုင်းခြေတွင် ထည့်တွက်လျှင်လည်း အဖြေမပြောင်းသောကြောင့် ထည့်ရေးလည်းရသည်။

---

### Counting the Subsets of a Finite Set

Consider a set $X = \{a, b, c, d, e\}$. A subset is formed by choosing some elements from $X$. Since the order of chosen elements is not important, counting subsets is a combination problem.

ဥပမာ $X = \{a, b, c, d, e\}$ တွင် အစင် 5 ခုရှိသည်။ subset တစ်ခုလုပ်သည်ဆိုသည်မှာ ထို 5 ခုထဲမှ အချို့ကိုရွေးခြင်းဖြစ်သည်။ ရွေးထားသောအစင်များ၏ အစီအစဉ်မလိုသောကြောင့် combination နည်းဖြင့် ရေတွက်နိုင်သည်။

**Concept Check** အစုဝင် $r$ ခုပါသော subset အရေအတွက်သည် 5 ခုထဲမှ $r$ ခုကို ရွေးသည့်နည်းလမ်းအရေအတွက်ဖြစ်သည်။ ထို့ကြောင့် Number of subsets containing $r$ elements $= {}^5C_r, \quad 0 \le r \le 5$.

For example, there are $ {}^5C_4 = 5 $ subsets containing 4 elements, as listed below.
$$ \{a, b, c, d\}, \quad \{a, b, c, e\}, \quad \{a, b, d, e\}, \quad \{a, c, d, e\}, \quad \{b, c, d, e\}. $$

So, by the Addition Principle, the number of all the subsets of $X$ is given by
$$ {}^5C_0 + {}^5C_1 + {}^5C_2 + \dots + {}^5C_5 = 1 + 5 + 10 + 10 + 5 + 1 = 32. $$

ဒီပေါင်းလဒ်၏ အဓိပ္ပါယ်မှာ subsets အားလုံးကို ပါဝင်သောအစုဝင်အရေအတွက်အလိုက် အုပ်စုခွဲရေတွက်ခြင်းဖြစ်သည်။

- $ {}^5C_0 $ သည် အစုဝင် 0 ခုပါသော subset အရေအတွက်ဖြစ်သည်။
- $ {}^5C_1 $ သည် အစုဝင် 1 ခုပါသော subsets အရေအတွက်ဖြစ်သည်။
- $ {}^5C_2 $ သည် အစုဝင် 2 ခုပါသော subsets အရေအတွက်ဖြစ်သည်။
- $\dots$ သည် အလားတူ အစုဝင် 3 ခု၊ 4 ခုပါသော subsets များကို ဆက်ရေတွက်မည်ဟု ဆိုလိုသည်။
- $ {}^5C_5 $ သည် အစုဝင် 5 ခုလုံးပါသော subset အရေအတွက်ဖြစ်သည်။

အုပ်စုတစ်ခုနှင့်တစ်ခု ဆက်စပ်မှုမရှိသော ရွေးချယ်မှုများဖြစ်သောကြောင့် စုစုပေါင်း subsets အရေအတွက်ကို ရရန် Addition Principle အရ ပေါင်းပေးရမည်။

There is another simple way to count all subsets. For each element of $X$, we only have two choices: include it in the subset or exclude it from the subset.

တစ်နည်းအားဖြင့် subset တစ်ခုကို တည်ဆောက်ရန် အစုဝင်တစ်ခုချင်းစီအတွက် ပါဝင်မလား၊ မပါဝင်ဘူးလားဟု ဆုံးဖြတ်ရမည်။ အစုဝင်တစ်ခုစီအတွက် ရွေးချယ်စရာ 2 မျိုးရှိသည်။

[DIAGRAM:SubsetCountingTable]

Thus, by the Multiplication Principle, the number of all the subsets of $X$ is
$$ 2 \times 2 \times 2 \times 2 \times 2 = 2^5 = 32. $$

Therefore,
$$ {}^5C_0 + {}^5C_1 + {}^5C_2 + \dots + {}^5C_5 = 2^5 = 32. $$

ထို့ကြောင့် $X$ ၏ subsets အားလုံးကို နည်းလမ်းနှစ်မျိုးဖြင့် ရေတွက်နိုင်ပြီး အဖြေတူကြောင်းတွေ့နိုင်သည်။

**General Rule** We can generalize the above results as follows. If a finite set contains $n$ elements, then it has $2^n$ subsets. If $n$ is an integer with $n \ge 0$, then $ {}^nC_0 +  {}^nC_1 +  {}^nC_2 + \dots +  {}^nC_n = 2^n$. အဓိကမှတ်ရန်မှာ အစုဝင် $n$ ခုရှိသော finite set တစ်ခုတွင် အစုဝင်တစ်ခုချင်းစီအတွက် ရွေးချယ်စရာ 2 မျိုးစီရှိခြင်းဖြစ်သည်။ ထို့ကြောင့် subsets စုစုပေါင်းအရေအတွက်သည် $2^n$ ဖြစ်သည်။ အစုဝင် 0 ခုပါသော subset မှ အစုဝင် $n$ ခုလုံးပါသော subset အထိ အုပ်စုခွဲရေတွက်ပြီး ပေါင်းလျှင်လည်း ထိုအရေအတွက်ပင်ဖြစ်သည်။

---

##### Example 22
If $A$ is a set containing 9 distinct elements.
How many subsets of $A$ contain: (a) at most 2 elements? (b) at least 3 elements?

**Solution**
အစု $A$ တွင် မတူညီသော အစုဝင် 9 ခုရှိသည်။ မေးခွန်းအအရ (a) အများဆုံး အစုဝင် 2 ခုပါလျှင်၊ (b) အနည်းဆုံး အစုဝင် 3 ခုပါလျှင် $A$ ၏ အပိုင်းအစုအရေအတွက်ကို ရှာရမည်။

**(a) At most 2 elements.**
အများဆုံး 2 ခုပါသော subsets ဆိုသည်မှာ အစုဝင် 0 ခု၊ 1 ခု၊ သို့မဟုတ် 2 ခုပါသော subsets များဖြစ်သည်။
$$
\begin{aligned}
\text{Number of subsets containing at most 2 elements} &= {}^9C_0 + {}^9C_1 + {}^9C_2 \\
&= 1 + 9 + \frac{9 \cdot 8}{2 \cdot 1} \\
&= 1 + 9 + 36 \\
&= 46.
\end{aligned}
$$
Therefore, the number of subsets of $A$ containing at most 2 elements is 46.

**(b) At least 3 elements.**
အနည်းဆုံး 3 ခုပါသော subsets များကို တိုက်ရိုက်ရေတွက်လျှင် $ {}^9C_3 + {}^9C_4 + \dots + {}^9C_9 $ ကို ပေါင်းရမည်။ ဒါပေမဲ့ စုစုပေါင်း subsets အရေအတွက်ထဲမှ အစုဝင် 0, 1, 2 ခုပါသော subsets များကို နုတ်လျှင် ပိုလွယ်သည်။
The total number of subsets of $A$ is
$$ 2^9 = 512. $$
Hence,
$$
\begin{aligned}
\text{Number of subsets containing at least 3 elements} &= 2^9 - ({}^9C_0 + {}^9C_1 + {}^9C_2) \\
&= 512 - 46 \\
&= 466.
\end{aligned}
$$
Therefore, the number of subsets of $A$ containing at least 3 elements is 466.

**Note** "At most 2" ဆိုသည်မှာ အများဆုံး 2 ခုပါရမည်။ 2 ထက် ပို၍မရပါ။ တစ်ခုမှမပါလည်း ရသည်။ ထို့ကြောင့် 0, 1, 2 ခုပါသော subsets များကို ရေတွက်ရမည်။ "At least 3" ဆိုသည်မှာ အနည်းဆုံး 3 ခုပါရမည်။ 3 ထက်ပို၍ရသည်။ သို့သော် အစု $A$ တွင် စုစုပေါင်း အစုဝင် 9 ခုသာရှိသောကြောင့် 9 ခုထက် ပို၍မရပါ။ ထို့ကြောင့် 3, 4, ..., 9 ခုပါသော subsets များကို ရေတွက်ရမည်။ ထို့ကြောင့် အပိုင်း (b) တွင် complement method ကို သုံး၍ ပိုတိုအောင်တွက်နိုင်သည်။



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

$$ \text{Number of 4-digit even numbers in Case 1} = 1 \times 3 \times 2 \times 1 = 6. $$

**Case 2: If the first digit is 5 and the last digit is 2 or 4.**
ပထမဂဏန်းကို 5 ထားပြီး even number ဖြစ်ရန် နောက်ဆုံးဂဏန်းကို 2 သို့မဟုတ် 4 ထားသောအခြေအနေကို စဉ်းစားမည်။

နောက်ဆုံးဂဏန်းသည် 2 သို့မဟုတ် 4 ထဲမှ တစ်ခုခုဖြစ်မည်ဖြစ်သောကြောင့် ထိုနှစ်လုံးထဲမှ တစ်လုံးကျန်မည်။ ထို့ကြောင့် ဒုတိယဂဏန်းနေရာတွင် ကျန်သော 1, 3 နှင့် 2 သို့မဟုတ် 4 ထဲမှ ကျန်သောတစ်လုံးကို ပေါင်း၍ ရွေးစရာ 3 ခုရှိသည်။

[DIAGRAM:Example23Case2Diagram]

$$ \text{Number of 4-digit even numbers in Case 2} = 1 \times 3 \times 2 \times 2 = 12. $$

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
\begin{aligned}
\text{Number of arrangements} &= 2! \times 4! \times 3! \\
&= 2 \times 24 \times 6 \\
&= 288.
\end{aligned}
$$

Therefore, the books can be arranged in 288 ways.

**(b) Books of the same subjects are together.**
Subject တူသောစာအုပ်များ အတူတကွရှိရမည်ဖြစ်သောကြောင့် Chemistry, Mathematics, Physics ကို block သုံးခုအဖြစ် စဉ်းစားနိုင်သည်။ block သုံးခုကို စီနိုင်သောနည်းလမ်းမှာ $3!$ ဖြစ်သည်။ တစ်ဖန် block တစ်ခုချင်းစီထဲတွင်ရှိသော စာအုပ်အသီးသီးကို စီနိုင်သောနည်းလမ်းမှာ (a) တွင်ရခဲ့သော 288 နည်းဖြစ်သည်။ စီစဉ်

[DIAGRAM:Example24DiagramB]

$$
\begin{aligned}
\text{Number of arrangements} &= 3! \times 288 \\
&= 6 \times 288 \\
&= 1728.
\end{aligned}
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
\begin{aligned}
\text{Number of permutations} &= 5! \times 2! \\
&= 120 \times 2 \\
&= 240.
\end{aligned}
$$

Therefore, there are 240 permutations when the two vowels are placed together.

**Note.** "Place together" ဟုဆိုလျှင် အတူတူထားရမည့် အရာများကို တစ်ခုတည်းဖြစ်သွားပြီဟု သတ်မှတ်ရမည်။ ထို့နောက် အတူတူထားထားသော block အတွင်းတွင် ပြန်စီနိုင်တာ ရှိမရှိ ထပ်စဉ်းစားရမည်။ ပြန်စီနိုင်တာရှိလျှင် ထိုအတွင်းပိုင်း စီနိုင်သောနည်းလမ်းကိုလည်း ထပ်တွက်ရမည်။

---

##### Example 26
Find the number of permutations of all the letters of the word INTERNET in such a way that there are exactly 4 letters between the two T's.

**Solution**
INTERNET တွင် စုစုပေါင်း စာလုံး 8 လုံးရှိသည်။ T နှစ်လုံးကြားတွင် စာလုံး 4 လုံး အတိအကျရှိရမည်ဆိုသည်မှာ $T \_ \_ \_ \_ T$ ပုံစံဖြစ်ရမည်ဟု ဆိုလိုသည်။ ဥပမာ ပထမ T သည် ပထမဆုံးနေရာ တွင်ရှိလျှင် ကြားတွင် နေရာ 2, 3, 4, 5 လေးနေရာရှိပြီး ဒုတိယ T သည် 6 လုံးမြောက်နေရာတွင် ရှိရမည်။ ထို့ကြောင့် T နှစ်လုံး၏ ဖြစ်နိုင်သော နေရာများမှာ

$ (1, 6), (2, 7), (3, 8) $

တို့သာဖြစ်သည်။

[DIAGRAM:Example26Diagram]

ထို့ကြောင့် T နှစ်လုံးကို နေရာချနိုင်သောနည်းလမ်းမှာ 3 နည်းရှိသည်။

ကျန်နေသော စာလုံးများမှာ $I, N, E, R, N, E$ ဖြစ်သည်။ ထိုစာလုံးများထဲတွင် $N$ နှစ်လုံးနှင့် $E$ နှစ်လုံး ထပ်နေသောကြောင့် ကျန် 6 နေရာကို စီနိုင်သောနည်းလမ်းမှာ

$ \frac{6!}{2!2!} = 180 $

နည်းဖြစ်သည်။

$$
\begin{aligned}
\text{Required number of permutations} &= 3 \times \frac{6!}{2!2!} \\
&= 3 \times 180 \\
&= 540.
\end{aligned}
$$

Therefore, the required number of permutations is 540.

---

### Exercise 5.4

#### Questions

1. Find the number of permutations of the letters of each of the following words.
   (i) INFINITY
   (ii) PINEAPPLE
   (iii) ACCEPTABLE
2. Passwords for a mobile payment system are to consist of 6 digits from a set of digits $0, 1, 2, \dots, 9$ and assume that there is no other restriction. How many such passwords have repeated digits?
3. A building has 10 windows in front. What is the number of signals that can be given, by having one or more of the windows open?
4. At a burger shop, 3 different types of buns, 7 types of cheeses and 5 types of vegetables are available. Assume that a burger may contain no cheese or no vegetable. In how many ways can different types of burgers be ordered if a person must have a bun, and may have at most 2 types of cheeses and any number of types of vegetables?
5. How many different 4-digit codes can be formed using the digits $0, 1, 2, 3$ if
   (i) there is no restriction?
   (ii) repetition is not allowed?
   (iii) repetition is not allowed, and 0 is either the first or the last digit?
6. Using the letters of the word EQUATION without repetitions, how many 4-letter codes can be formed:
   (i) starting with $T$ and ending with $N$?
   (ii) starting and ending with a consonant?
   (iii) with vowels only?
   (iv) if it contains 3 consonants?
7. Three brothers and three sisters are lining up to be photographed. How many arrangements are there
   (i) with 3 sisters standing together?
   (ii) if brothers and sisters are in alternating positions?
8. How many permutations of the letters $H, E, X, A, G, O, N$ are there if
   (i) the 3 vowels are placed together?
   (ii) the 3 vowels are not placed together?
   (iii) consonants and vowels do not appear alternately?
9. Find the number of permutations of all the letters of the word PENGUIN in such a way that there are exactly 3 letters between 2 $N$'s.
10. Find the number of permutations of all the letters of the word STRESSLESS in such a way that there are exactly 5 letters between:
  (i) 2 $E$'s.
  (ii) 2 $S$'s.

#### Solutions

**1. Find the number of permutations of the letters of each of the following words.**

**(i) INFINITY**

INFINITY တွင် စုစုပေါင်းစာလုံး 8 လုံးရှိပြီး I သုံးလုံးနှင့် N နှစ်လုံး တူညီနေသည်။

In the word INFINITY, there are 8 letters consisting of three I's, two N's, one F, one T and one Y, so the number of permutations of the letters is

$$
\begin{aligned}
\text{Number of permutations of the letters} &= \frac{8!}{3! \cdot 2! \cdot 1! \cdot 1! \cdot 1!} \\
&= \frac{8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}{(3 \cdot 2 \cdot 1)(2 \cdot 1)(1)(1)(1)} \\
&= 3360.
\end{aligned}
$$

**(ii) PINEAPPLE**

PINEAPPLE တွင် စုစုပေါင်းစာလုံး 9 လုံးရှိပြီး P သုံးလုံးနှင့် E နှစ်လုံး တူညီနေသည်။

In the word PINEAPPLE, there are 9 letters consisting of one I, one N, one A, three P's, one L and two E's, so the number of permutations of the letters is

$$
\begin{aligned}
\text{Number of permutations of the letters} &= \frac{9!}{1! \cdot 1! \cdot 1! \cdot 3! \cdot 1! \cdot 2!} \\
&= \frac{9 \cdot 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}{(1)(1)(1)(3 \cdot 2 \cdot 1)(1)(2 \cdot 1)} \\
&= 30240.
\end{aligned}
$$

**(iii) ACCEPTABLE**

ACCEPTABLE တွင် စုစုပေါင်းစာလုံး 10 လုံးရှိပြီး A နှစ်လုံး၊ C နှစ်လုံးနှင့် E နှစ်လုံး တူညီနေသည်။

In the word ACCEPTABLE, there are 10 letters consisting of two A's, two C's, two E's, one P, one T, one B and one L, so the number of permutations of the letters is

$$
\begin{aligned}
\text{Number of permutations of the letters} &= \frac{10!}{2! \cdot 2! \cdot 1! \cdot 1! \cdot 1! \cdot 1!} \\
&= \frac{10 \cdot 9 \cdot 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1}{(2 \cdot 1)(2 \cdot 1)(2 \cdot 1)(1)(1)(1)(1)} \\
&= 453600.
\end{aligned}
$$

**2. Passwords for a mobile payment system are to consist of 6 digits from a set of digits $0, 1, 2, \dots, 9$ and assume that there is no other restriction. How many such passwords have repeated digits?**

လိုချင်တာက repeated digits ပါသော passwords အရေအတွက်ဖြစ်ပါတယ်။ ထို့ကြောင့် အရင်ဆုံး password အားလုံး၏ အရေအတွက်ကိုရှာပြီး repeated digit မပါသော password အရေအတွက်ကို နုတ်ရမည်။

Since there is no restriction, each of the 6 positions can be filled by any one of the 10 digits $0, 1, 2, \dots, 9$.

ဒီစုစုပေါင်းအရေအတွက်ထဲတွင် repeated digits ပါသော passwords များရော၊ repeated digit မပါသော passwords များရော အားလုံးပါဝင်သည်။ ဥပမာ ပထမ digit ကို 2 ဟုရွေးထားလျှင် ဒုတိယ digit သည် 2 ဖြစ်နိုင်သလို 2 မဟုတ်သော $0, 1, 3, \dots, 9$ တို့လည်း ဖြစ်နိုင်သည်။ ထို့ကြောင့် စုစုပေါင်းရေတွက်ရာတွင် ထပ်သော အခြေအနေရော မထပ်သောအခြေအနေရော ပါနေသည်။

$$
\begin{aligned}
\text{Total number of passwords} &= 10 \cdot 10 \cdot 10 \cdot 10 \cdot 10 \cdot 10 \\
&= 10^6 \\
&= 1000000.
\end{aligned}
$$

ယခု repeated digit မပါသော passwords ကိုရှာမည်။ ထိုအခါ digit များထပ်မရသောကြောင့် ပထမနေရာတွင် 10 နည်း၊ ဒုတိယနေရာတွင် 9 နည်း၊ တတိယနေရာတွင် 8 နည်း စသဖြင့် ရွေးရမည်။

$$
\begin{aligned}
\text{Number of passwords with no repeated digits} &= {}^{10}P_6 \\
&= 10 \cdot 9 \cdot 8 \cdot 7 \cdot 6 \cdot 5 \\
&= 151200.
\end{aligned}
$$

ထို့ကြောင့် repeated digits ပါသော passwords အရေအတွက်မှာ

$$
\begin{aligned}
\text{Required number of passwords} &= \text{Total number} - \text{Number with no repeated digits} \\
&= 1000000 - 151200 \\
&= 848800.
\end{aligned}
$$

**3. A building has 10 windows in front. What is the number of signals that can be given, by having one or more of the windows open?**

ပြတင်းပေါက် 10 ပေါက်ရှိသည်။ signal တစ်ခုတွင် ပြတင်းပေါက်တစ်ပေါက်စီသည် ပွင့်ထားနိုင်သလို ပိတ်ထားနိုင်သည်။

For each window, there are 2 choices: open or closed.

ပြတင်းပေါက် 10 ပေါက်အတွက် ဖြစ်နိုင်သော အခြေအနေအားလုံးမှာ တစ်ပေါက်မှ ပွင့်မထားသော အခြေအနေမှ 10 ပေါက်လုံး ပွင့်ထားသော အခြေအနေအထိ ပါဝင်သည်။

$$
\begin{aligned}
\text{The number of signals for all possible cases} &= {}^{10}C_0 + {}^{10}C_1 + {}^{10}C_2 + \dots + {}^{10}C_{10} \\
&= 2^{10} \\
&= 1024.
\end{aligned}
$$

သို့သော် မေးခွန်းတွင် one or more of the windows open ဟုဆိုထားသောကြောင့် ပြတင်းပေါက်တစ်ပေါက်မှ မပွင့်ထားသော အခြေအနေ $ {}^{10}C_0 $ ကို ဖယ်ရမည်။

$$
\begin{aligned}
\text{Required number of signals} &= 2^{10} - 1 \\
&= 1024 - 1 \\
&= 1023.
\end{aligned}
$$

Therefore, the number of signals that can be given is 1023.

မှတ်ချက်။ one or more ဆိုသည်မှာ အနည်းဆုံးတစ်ခုတော့ ရှိရမည်ဟု ဆိုလိုသည်။ တစ်ခုထက်ပိုလျှင်လည်း ဖြစ်နိုင်သော်လည်း စုစုပေါင်းရှိသော အရေအတွက်ထက်တော့ ကျော်လွန်နိုင်မည်မဟုတ်။ ဤမေးခွန်းတွင် ပြတင်းပေါက် 10 ပေါက်ရှိသောကြောင့် ပွင့်ထားသော ပြတင်းပေါက်အရေအတွက်သည် 1 ပေါက်မှ 10 ပေါက်အထိ ဖြစ်နိုင်သည်။

**4. At a burger shop, 3 different types of buns, 7 types of cheeses and 5 types of vegetables are available. Assume that a burger may contain no cheese or no vegetable. In how many ways can different types of burgers be ordered if a person must have a bun, and may have at most 2 types of cheeses and any number of types of vegetables?**

ဘာဂါဆိုင်တစ်ဆိုင်မှာ bun အမျိုးအစား 3 မျိုး၊ cheese အမျိုးအစား 7 မျိုးနှင့် vegetables အမျိုးအစား 5 မျိုးရှိသည်။ မေးခွန်းထဲရှိ "a burger may contain no cheese or no vegetable" ဆိုသည်မှာ ဘာဂါတစ်ခုမှာ cheese မပါလည်းရသလို vegetable မပါလည်းရသည်ဟု ဆိုလိုသည်။ ထို့ကြောင့် cheese ရွေးရာတွင် 0 မျိုးရွေးခြင်းကိုပါ ထည့်ရမည်။ vegetables ရွေးရာတွင်လည်း 0 မျိုးရွေးခြင်းကိုပါ ထည့်ရမည်။ ဘာဂါတစ်ခုမှာ bun ကိုတော့ မဖြစ်မနေ ထည့်ရမည်။ ထိုအခြေအနေများအတိုင်း မတူညီသော ဘာဂါအမျိုးအစား ဘယ်နှစ်မျိုး မှာယူနိုင်မလဲကို ရှာရမည်။

First, choose the bun. Since there are 3 different types of buns, the number of choices for the bun is 3.

ထို့နောက် cheese ရွေးမည်။ cheese ကို 0 မျိုး၊ 1 မျိုး၊ သို့မဟုတ် 2 မျိုး ရွေးနိုင်သည်။

$$
\begin{aligned}
\text{Number of choices for cheeses} &= {}^7C_0 + {}^7C_1 + {}^7C_2 \\
&= 1 + 7 + 21 \\
&= 29.
\end{aligned}
$$

နောက်ဆုံး vegetables ရွေးမည်။ ဟင်းသီးဟင်းရွက်တစ်မျိုးစီအတွက် ထည့်မလား၊ မထည့်ဘူးလားဆိုသော ရွေးချယ်စရာ 2 ခုစီရှိသည်။ ထို့ကြောင့် 5 မျိုးအတွက် ရွေးချယ်နိုင်သော နည်းလမ်းအရေအတွက်မှာ

$$
\begin{aligned}
\text{Number of choices for vegetables} &= 2^5 \\
&= 32.
\end{aligned}
$$

ထို့ကြောင့် multiplication principle အရ မတူညီသော ဘာဂါအမျိုးအစား အရေအတွက်မှာ

$$
\begin{aligned}
\text{Required number of burgers} &= 3 \left( {}^7C_0 + {}^7C_1 + {}^7C_2 \right) 2^5 \\
&= 3(29)(32) \\
&= 2784.
\end{aligned}
$$

Therefore, 2784 different types of burgers can be ordered.

မှတ်ချက်။ at most 2 types ဆိုသည်မှာ အများဆုံး 2 မျိုးပဲ ဖြစ်ရမည်ဟု ဆိုလိုသည်။ 2 မျိုးထက်ပို၍ မရပါ။ ထို့ပြင် cheese မပါလည်းရသောကြောင့် cheese ရွေးရာတွင် တစ်မျိုးမှမပါတာ၊ တစ်မျိုးပါတာ၊ နှစ်မျိုးပါတာ ဆိုပြီး အခြေအနေ 3 ခုရှိသည်။ ထို့ကြောင့် cheese အတွက် $ {}^7C_0 + {}^7C_1 + {}^7C_2 $ ဟု ရေတွက်ရသည်။ အလားတူ vegetables ကိုလည်း 0 မျိုး ရွေးနိုင်သောကြောင့် $2^5$ ထဲတွင် ဘာမှမရွေးသော အခြေအနေကိုပါ ထည့်တွက်ထားသည်။

**5. How many different 4-digit codes can be formed using the digits $0, 1, 2, 3$ if**
**(a) there is no restriction?**
**(b) repetition is not allowed?**
**(c) repetition is not allowed, and 0 is either the first or the last digit?**

မေးခွန်းတွင် 4-digit codes များကို $0,1,2,3$ ဟူသော digits များမှ ဖွဲ့ရမည်။ code ဖြစ်သောကြောင့် ပထမနေရာတွင် 0 လာလည်း ရသည်။ ထို့ကြောင့် နေရာတစ်ခုနေရာစီတွင် မည်သည့် digit များ ရွေးနိုင်သလဲဆိုတာကို အခြေအနေအလိုက် ရေတွက်မည်။

**(i) There is no restriction.**
ကန့်သတ်ချက်မရှိသောကြောင့် နေရာတိုင်းတွင် $0,1,2,3$ ထဲမှ တစ်ခုခုကို ရွေးနိုင်သည်။ ထို့ကြောင့် နေရာတစ်နေရာစီအတွက် ရွေးချယ်စရာ 4 ခုစီရှိသည်။

$$
\begin{aligned}
\text{Number of codes} &= 4 \cdot 4 \cdot 4 \cdot 4 \\
&= 4^4 \\
&= 256.
\end{aligned}
$$

**(ii) Repetition is not allowed.**
ထပ်မရသောကြောင့် ပထမနေရာတွင် 4 နည်း၊ ဒုတိယနေရာတွင် 3 နည်း၊ တတိယနေရာတွင် 2 နည်း၊ စတုတ္ထနေရာတွင် 1 နည်း ရွေးနိုင်သည်။

$$
\begin{aligned}
\text{Number of codes} &= 4 \cdot 3 \cdot 2 \cdot 1 \\
&= 4! \\
&= 24.
\end{aligned}
$$

**(iii) Repetition is not allowed, and 0 is either the first or the last digit.**
ထပ်မရဘဲ 0 သည် ပထမနေရာ သို့မဟုတ် နောက်ဆုံးနေရာတွင် ရှိရမည်။

ပထမနေရာတွင် 0 ရှိလျှင် 0 အတွက်နေရာကို သတ်မှတ်ပြီးသားဖြစ်သောကြောင့် ရွေးချယ်စရာ 1 မျိုးရှိသည်။ ကျန် 3 နေရာတွင် 1,2,3 ကို စီရသောကြောင့် 3! နည်းရှိသည်။ ထို့ကြောင့် $1 \cdot 3!$ နည်း ရှိသည်။ 
နောက်ဆုံးနေရာတွင် 0 ရှိလျှင်လည်း ကျန် 3 နေရာတွင် 1,2,3 ကို စီရပြီး 0 အတွက် နောက်ဆုံးနေရာသည် သတ်မှတ်ပြီးသားဖြစ်သောကြောင့် ရွေးချယ်စရာ 1 မျိုးပဲရှိသည်။ ထို့ကြောင့် $3! \cdot 1$ နည်း ရှိသည်။

$$
\begin{aligned}
\text{Number of codes} &= 1 \cdot 3! + 3! \cdot 1 \\
&= 1 \cdot 6 + 6 \cdot 1 \\
&= 12.
\end{aligned}
$$

**6. Using the letters of the word EQUATION without repetitions, how many 4-letter codes can be formed:**
**(a) starting with $T$ and ending with $N$?**
**(b) starting and ending with a consonant?**
**(c) with vowels only?**
**(d) if it contains 3 consonants?**

မေးခွန်းတွင် EQUATION ဟူသော စာလုံးမှ ထပ်မသုံးဘဲ 4-letter codes များ ဖွဲ့ရမည်။ EQUATION တွင် စုစုပေါင်း စာလုံး 8 လုံးရှိပြီး vowels များမှာ E,U,A,I,O ဖြစ်သောကြောင့် 5 လုံး၊ consonants များမှာ Q,T,N ဖြစ်သောကြောင့် 3 လုံးရှိသည်။

**(i) Starting with $T$ and ending with $N$.**
ပထမနေရာတွင် T နှင့် နောက်ဆုံးနေရာတွင် N သတ်မှတ်ပြီးသားဖြစ်သည်။ ထို့ကြောင့် ထိုနေရာနှစ်ခုအတွက် ရွေးချယ်စရာ 1 မျိုးစီသာရှိသည်။ အလယ်ရှိနေရာ 2 နေရာကို ကျန်စာလုံး 6 လုံးထဲမှ ထပ်မသုံးဘဲ စီရမည်။

[DIAGRAM: Ex5_4_Q6_i_Diag]

$$
\begin{aligned}
\text{Number of codes} &= 1 \cdot {}^6P_2 \cdot 1 \\
&= 1 \cdot (6 \cdot 5) \cdot 1 \\
&= 30.
\end{aligned}
$$

**(ii) Starting and ending with a consonant.**
ပထမနှင့် နောက်ဆုံးနေရာများတွင် consonants များထားရမည်။ consonants 3 လုံးထဲမှ ပထမနှင့် နောက်ဆုံးနေရာအတွက် ထပ်မသုံးဘဲ စီရသောကြောင့် $ {}^3P_2 $ နည်းရှိသည်။ ကျန်အလယ် 2 နေရာအတွက်တော့ ကျန်စာလုံး 6 လုံးထဲမှ ထပ်မသုံးဘဲ စီရမည်။

[DIAGRAM: Ex5_4_Q6_ii_Diag]

$$
\begin{aligned}
\text{Number of codes} &= {}^3P_2 \cdot {}^6P_2 \\
&= (3 \cdot 2)(6 \cdot 5) \\
&= 180.
\end{aligned}
$$

**(iii) With vowels only.**
vowels များသာ သုံးရမည်ဖြစ်သောကြောင့် E,U,A,I,O ဟူသော vowels 5 လုံးထဲမှ 4 လုံးကို ထပ်မသုံးဘဲ စီရမည်။

[DIAGRAM: Ex5_4_Q6_iii_Diag]

$$
\begin{aligned}
\text{Number of codes} &= {}^5P_4 \\
&= 5 \cdot 4 \cdot 3 \cdot 2 \\
&= 120.
\end{aligned}
$$

**(iv) If it contains 3 consonants.**
consonants စုစုပေါင်း 3 လုံးသာရှိသောကြောင့် 3 consonants ပါရမည်ဆိုလျှင် Q,T,N အားလုံး ပါရမည်။ 4-letter code ဖြစ်ရန် ကျန် 1 နေရာအတွက် vowels 5 လုံးထဲမှ 1 လုံး ရွေးရမည်။ ထို့ကြောင့် ပုံစံကို C,C,C,V ဟု မြင်နိုင်သည်။

[DIAGRAM: Ex5_4_Q6_iv_Diag_1]

ဆိုလိုသည်မှာ အရင်ဆုံး vowels 5 လုံးထဲမှ vowel တစ်လုံးကို ရွေးမည်။ ထိုအခါ ရွေးထားသော vowel တစ်လုံးနှင့် Q,T,N ဟူသော consonants 3 လုံး ရလာမည်။ V ထားနိုင်သော နေရာပုံစံမှာ VCCC, CVCC, CCVC, CCCV ဟူ၍ 4 မျိုးရှိသည်။ သို့သော် ပုံစံတစ်မျိုးစီတွင် Q,T,N ကို C နေရာ 3 နေရာတွင် 3! နည်းဖြင့် စီနိုင်သည်။

[DIAGRAM: Ex5_4_Q6_iv_Diag_2]

$$
\begin{aligned}
\text{Number of codes} &= {}^5C_1 \cdot 4 \cdot 3! \\
&= 5 \cdot 4 \cdot 6 \\
&= 120.
\end{aligned}
$$

နောက်တစ်နည်း။ consonants 3 လုံးဖြစ်သော Q,T,N ကို C နေရာ 3 နေရာတွင် အရင်စီလျှင် $ {}^3P_3 $ နည်းရှိသည်။ vowels 5 လုံးထဲမှ vowel တစ်လုံးရွေးရန် $ {}^5C_1 $ နည်းရှိသည်။ ထို V ကို စာလုံး 4 နေရာထဲမှ တစ်နေရာတွင် ထည့်နိုင်သောကြောင့် 4 နည်းရှိသည်။ ထို့ကြောင့် multiplication principle အရ

$$
\begin{aligned}
\text{Number of codes} &= {}^3P_3 \cdot {}^5C_1 \cdot 4 \\
&= 6 \cdot 5 \cdot 4 \\
&= 120.
\end{aligned}
$$

မှတ်ချက်။ $ {}^5C_1 \cdot 4! $ ဟုတွက်လည်း အတူတူပင်ဖြစ်သည်။ ဤနည်းတွင် vowel တစ်လုံးရွေးပြီးနောက် Q,T,N နှင့် ထို vowel စုစုပေါင်း စာလုံး 4 လုံးကို တစ်ခါတည်း 4! နည်းဖြင့် စီခြင်းဖြစ်သည်။ ထို့ကြောင့် $ {}^3P_3 $ ကို ထပ်မြှောက်ရန် မလိုပါ။

**7. Three brothers and three sisters are lining up to be photographed. How many arrangements are there**
**(a) with 3 sisters standing together?**
**(b) if brothers and sisters are in alternating positions?**

ညီအစ်ကို 3 ယောက်နှင့် ညီအစ်မ 3 ယောက် စုစုပေါင်း 6 ယောက်ကို ဓာတ်ပုံရိုက်ရန် တန်းစီမည်။ တန်းစီခြင်းဖြစ်သောကြောင့် အစီအစဉ်အရေးကြီးပြီး လူတစ်ယောက်ကို နေရာတစ်နေရာစီတွင်သာ ထားနိုင်သည်။

**(i) With 3 sisters standing together.**
ညီအစ်မ 3 ယောက် အတူတူ ရပ်ရမည်ဖြစ်သောကြောင့် သူတို့ကို block တစ်ခုအဖြစ် ယူမည်။ ထို့ကြောင့် စီရမည့်အရာများမှာ ညီအစ်မ block တစ်ခုနှင့် ညီအစ်ကို 3 ယောက်၊ စုစုပေါင်း 4 ခု ဖြစ်သည်။ ထို 4 ခုကို 4! နည်းဖြင့် စီနိုင်သည်။ ထို့ပြင် block အတွင်းရှိ ညီအစ်မ 3 ယောက်ကိုလည်း 3! နည်းဖြင့် စီနိုင်သည်။

[DIAGRAM: Ex5_4_Q7_i_Diag]

$$
\begin{aligned}
\text{Number of arrangements} &= 4! \cdot 3! \\
&= 24 \cdot 6 \\
&= 144.
\end{aligned}
$$

**(ii) If brothers and sisters are in alternating positions.**
ညီအစ်ကိုနှင့် ညီအစ်မများ အလှည့်ကျ ရပ်ရမည်။ အစတွင် ညီအစ်ကို စမလား၊ ညီအစ်မ စမလား ဟူ၍ ဖြစ်နိုင်သော pattern နှစ်မျိုးရှိသည်။

[DIAGRAM: Ex5_4_Q7_ii_Diag]

ပုံစံတစ်မျိုးစီတွင် ညီအစ်ကို 3 ယောက်ကို 3! နည်းဖြင့် စီနိုင်ပြီး ညီအစ်မ 3 ယောက်ကိုလည်း 3! နည်းဖြင့် စီနိုင်သည်။ ပုံစံ 2 မျိုးရှိသောကြောင့်

$$
\begin{aligned}
\text{Number of arrangements} &= 2 \cdot 3! \cdot 3! \\
&= 2 \cdot 6 \cdot 6 \\
&= 72.
\end{aligned}
$$

**8. How many permutations of the letters $H, E, X, A, G, O, N$ are there if**
**(a) the 3 vowels are placed together?**
**(b) the 3 vowels are not placed together?**
**(c) consonants and vowels do not appear alternately?**

HEXAGON တွင် စုစုပေါင်းစာလုံး 7 လုံးရှိပြီး စာလုံးအားလုံး မတူကြပါ။ vowels များမှာ E,A,O ဖြစ်သောကြောင့် 3 လုံးရှိပြီး consonants များမှာ H,X,G,N ဖြစ်သောကြောင့် 4 လုံးရှိသည်။

In the word HEXAGON, there are 7 letters consisting of 3 vowels $(E, A, O)$ and 4 consonants $(H, X, G, N)$.

**(i) The 3 vowels are placed together.**
သရစာလုံး 3 လုံးကို အတူတူထားရမည်ဖြစ်သောကြောင့် vowel block တစ်ခုအဖြစ် ယူမည်။ ထို့ကြောင့် စီရမည့်အရာများမှာ vowel block တစ်ခုနှင့် consonants 4 လုံး၊ စုစုပေါင်း 5 ခု ဖြစ်သည်။ ထို 5 ခုကို 5! နည်းဖြင့် စီနိုင်ပြီး vowel block အတွင်းရှိ E,A,O ကို 3! နည်းဖြင့် စီနိုင်သည်။

[DIAGRAM: Ex5_4_Q8_i_Diag]

$$
\begin{aligned}
\text{Number of permutations} &= 5! \cdot 3! \\
&= 120 \cdot 6 \\
&= 720.
\end{aligned}
$$

**(ii) The 3 vowels are not placed together.**
ဤနေရာတွင် သရစာလုံး 3 လုံးသည် အားလုံးတစ်ဆက်တည်း block အဖြစ် မရှိရခြင်းကို ဆိုလိုသည်။ ထို့ကြောင့် စုစုပေါင်းဖြစ်နိုင်ခြေထဲမှ သရစာလုံး 3 လုံး အတူတူရှိသော ဖြစ်နိုင်ခြေကို နုတ်ရမည်။

$$
\begin{aligned}
\text{Total permutations} &= 7! \\
&= 5040,
\end{aligned}
$$

If the 3 vowels are placed together $= 5! \cdot 3!$
$$
\begin{aligned}
&= 120 \cdot 6 \\
&= 720.
\end{aligned}
$$

If the 3 vowels are not placed together, the number of permutations $= 7! - 5! \cdot 3!$
$$
\begin{aligned}
&= 5040 - 720 \\
&= 4320.
\end{aligned}
$$

**(iii) Consonants and vowels do not appear alternately.**
အရင်ဆုံး အလှည့်ကျဖြစ်သော ဖြစ်နိုင်ခြေကို ရေတွက်မည်။ consonants က 4 လုံး၊ vowels က 3 လုံးရှိသောကြောင့် အလှည့်ကျဖြစ်ရန် ဖြစ်နိုင်သော pattern မှာ CVCVCVC တစ်မျိုးသာရှိသည်။

[DIAGRAM: Ex5_4_Q8_iii_Diag]

ထိုပုံစံတွင် consonants 4 လုံးကို 4! နည်းဖြင့် စီနိုင်ပြီး vowels 3 လုံးကို 3! နည်းဖြင့် စီနိုင်သည်။

$$
\begin{aligned}
\text{Alternating permutations} &= 4! \cdot 3! \\
&= 24 \cdot 6 \\
&= 144.
\end{aligned}
$$

မေးထားသည်မှာ အလှည့်ကျမဟုတ်သော permutations ဖြစ်သောကြောင့် စုစုပေါင်း permutations ထဲမှ အလှည့်ကျဖြစ်သော permutations ကို နုတ်ရမည်။

$$
\begin{aligned}
\text{Required number of permutations} &= 7! - 4! \cdot 3! \\
&= 5040 - 144 \\
&= 4896.
\end{aligned}
$$

**9. Find the number of permutations of all the letters of the word PENGUIN in such a way that there are exactly 3 letters between 2 $N$'s.**

PENGUIN တွင် စုစုပေါင်းစာလုံး 7 လုံးရှိပြီး N နှစ်လုံး ပါသည်။ ကျန်စာလုံးများမှာ P,E,G,U,I ဖြစ်ပြီး အားလုံး မတူကြပါ။

In the word PENGUIN, there are 7 letters with two N's and five other distinct letters $(P, E, G, U, I)$.

N နှစ်လုံးကြားတွင် စာလုံး 3 လုံး အတိအကျရှိရမည်ဆိုသည်မှာ N နှစ်လုံး၏နေရာအကွာအဝေးသည် 4 နေရာ ဖြစ်ရမည်။ ထို့ကြောင့် N နှစ်လုံးထားနိုင်သော နေရာပုံစံမှာ $(1,5), (2,6), (3,7)$ ဟူ၍ 3 မျိုးရှိသည်။

[DIAGRAM: Ex5_4_Q9_Diag]

ပုံစံတစ်မျိုးစီတွင် ကျန်နေရာ 5 နေရာကို P,E,G,U,I ဟူသော မတူညီသော စာလုံး 5 လုံးဖြင့် 5! နည်း စီနိုင်သည်။

$$
\begin{aligned}
\text{Required number of permutations} &= 3 \cdot 5! \\
&= 3 \cdot 120 \\
&= 360.
\end{aligned}
$$

**10. Find the number of permutations of all the letters of the word STRESSLESS in such a way that there are exactly 5 letters between:**
**(a) 2 $E$'s.**
**(b) 2 $S$'s.**

STRESSLESS တွင် စုစုပေါင်းစာလုံး 10 လုံးရှိသည်။ S ငါးလုံး၊ E နှစ်လုံး၊ T, R, L တစ်လုံးစီ ပါသည်။

In the word STRESSLESS, there are 10 letters: five S's, two E's, and one each of T, R, L.

**(i) Exactly 5 letters between the 2 $E$'s.**
E နှစ်လုံးကြားတွင် စာလုံး 5 လုံး အတိအကျရှိရန် E နှစ်လုံး၏နေရာအကွာအဝေးသည် 6 နေရာဖြစ်ရမည်။ ထို့ကြောင့် E နှစ်လုံးထားနိုင်သော နေရာတွဲများမှာ
နေရာ 1 နှင့် 7, နေရာ 2 နှင့် 8, နေရာ 3 နှင့် 9, နေရာ 4 နှင့် 10 ဟူ၍ 4 မျိုးရှိသည်။ ကျန် 8 နေရာတွင် S,S,S,S,S,T,R,L ကို စီရမည်။

[DIAGRAM: Ex5_4_Q10_i_Diag]

$$
\begin{aligned}
\text{Required number of permutations} &= 4 \cdot \frac{8!}{5!} \\
&= 4 \cdot (8 \cdot 7 \cdot 6) \\
&= 1344.
\end{aligned}
$$

**(ii) Exactly 5 letters between 2 $S$'s.**
S သည် 5 လုံးရှိသောကြောင့် S နှစ်လုံးကို အရင်ရွေးပြီး ရေတွက်လျှင် ထပ်ရေတွက်မိနိုင်မည်။ ထို့ကြောင့် အခြေအနေများကို $A_1, A_2, A_3, A_4$ ဖြင့် သတ်မှတ်ပြီး ထပ်ရေတွက်မိခြင်းကို ပြန်နုတ်မည်။
ပုစ္ဆာထဲက အခြေအနေကို ကိုက်ညီရန်အတွက် S နှစ်လုံးကြားတွင် စာလုံး 5 လုံး အတိအကျရှိရန် S နှစ်လုံး၏ နေရာအကွာအဝေးသည် 6 ဖြစ်ရမည်။ ထို့ကြောင့် ဖြစ်နိုင်သော $S, S$ နေရာတွဲများမှာ
$(1, 7), \quad (2, 8), \quad (3, 9), \quad (4, 10)$
ဟူ၍ 4 စုံသာရှိသည်။ အနည်းဆုံး အတွဲတစ်တွဲသည် $S, S$ ဖြစ်ရမည်။

$A_1 = (1, 7), \quad A_2 = (2, 8), \quad A_3 = (3, 9), \quad A_4 = (4, 10)$
ဟု သတ်မှတ်မည်။ ဥပမာ $A_1$ ဆိုသည်မှာ နေရာ 1 နှင့် 7 နှစ်ခုလုံးတွင် S ရှိသောအခြေအနေဖြစ်သည်။

အတွဲလေးစုံကို ပုံဖော်ကြည့်လျှင်

[DIAGRAM: Ex5_4_Q10_ii_Diag1]

အရင်ဆုံး အတွဲတစ်စုံကို S, S အဖြစ် သတ်မှတ်ပြီး ရေတွက်မည်။ ဥပမာ $A_1$ ဖြစ်လျှင် နေရာ 1 နှင့် 7 တွင် S နှစ်လုံးထားပြီးသားဖြစ်သည်။

ဥပမာ $A_1$ တစ်တွဲကို သတ်မှတ်လျှင်

[DIAGRAM: Ex5_4_Q10_ii_Diag2]

သတ်မှတ်ပြီး S 2 လုံး၊ ကျန်နေရာ 8 နေရာထဲမှ S 3 လုံး ထပ်ရွေး $\Rightarrow {}^8C_3$
ထို့ကြောင့် အတွဲတစ်စုံစီအတွက် $ {}^8C_3 $ နည်းရှိသည်။ အတွဲ 4 စုံရှိသောကြောင့် အရင်ရေတွက်လျှင်
$4 \cdot {}^8C_3 = 4 \cdot 56 = 224$ နည်းရမည်။

သို့သော် ဒီ 224 ထဲတွင် ထပ်ရေတွက်မိတာရှိသည်။ ဆိုလိုသည်မှာ $A_1$ အတွက် ရေတွက်သောအစာရင်းတွင်လည်း ဝင်ပြီး၊ $A_2$ အတွက် ရေတွက်သောစာရင်းတွင်လည်း ထပ်ဝင်နေသော နေရာရွေးချယ်ပုံစံများ ရှိနိုင်သည်ဟု ဆိုလိုသည်။
ဥပမာ S ကို နေရာ $\{1, 2, 7, 8, 9\}$ တွင်ထားသော ပုံစံကို ကြည့်ပါ။ ဤပုံစံတွင် $(1, 7)$ လည်း S အတူရှိသော S, S အတွဲဖြစ်သဖြင့် $A_1$ စာရင်းထဲဝင်သည်။ ထိုအပြင် $(2, 8)$ လည်း S အတူရှိသော S, S အတွဲဖြစ်သဖြင့် $A_2$ စာရင်းထဲလည်း ဝင်သည်။ ထို့ကြောင့် ဒီနေရာပုံစံသည် $A_1$ ကို ရေတွက်သောအခါ တစ်ခါပါပြီး $A_2$ ကို ရေတွက်သောအခါ နောက်တစ်ခါ ထပ်ပါသွားသည်။ ထို့ကြောင့် နှစ်ခါရေတွက်မိခြင်းဖြစ်သည်။

ထပ်ရေတွက်မိသော ပုံစံ ဥပမာ $A_1 \cap A_2$

[DIAGRAM: Ex5_4_Q10_ii_Diag3]

သတ်မှတ်ပြီး S 4 လုံး၊ ကျန်နေရာ 6 နေရာထဲမှ S 1 လုံး ထပ်ရွေး $\Rightarrow {}^6C_1$

အတွဲနှစ်စုံ တစ်ပြိုင်နက်ဖြစ်သော အခြေအနေကို ရေတွက်မည်။ $A_1, A_2, A_3, A_4$ ထဲမှ အတွဲနှစ်စုံရွေးရန် $ {}^4C_2 $ နည်းရှိသည်။ အတွဲနှစ်စုံ သတ်မှတ်ပြီးလျှင် S 4 လုံးထားပြီးဖြစ်သောကြောင့် ကျန် S 1 လုံးကို ကျန်နေရာ 6 နေရာထဲမှ ရွေးရန် $ {}^6C_1 $ နည်းရှိသည်။
$ {}^4C_2 \cdot {}^6C_1 = 6 \cdot 6 = 36$

ဒီ 36 ခုသည် အပေါ်က 224 ထဲတွင် နှစ်ခါစီ ရေတွက်ထားမိသော အခြေအနေများဖြစ်သဖြင့် တစ်ခါပြန်နုတ်ရမည်။ အတွဲသုံးစုံ တစ်ပြိုင်နက်ဖြစ်ရန်ဆိုတော့ S အနည်းဆုံး 6 လုံးလိုပြီး တကယ်တွင် S 5 လုံးသာရှိသောကြောင့် မဖြစ်နိုင်ပါ။

$$
\begin{aligned}
\text{Number of possible positions for the five S's} &= 4 \cdot {}^8C_3 - {}^4C_2 \cdot {}^6C_1 \\
&= 224 - 36 \\
&= 188.
\end{aligned}
$$

ထို့နောက် ကျန် 5 နေရာတွင် E,E,T,R,L ကို $\frac{5!}{2!}$ နည်းဖြင့် စီနိုင်သည်။

$$
\begin{aligned}
\text{Required number of permutations} &= 188 \cdot \frac{5!}{2!} \\
&= 188 \cdot 60 \\
&= 11280.
\end{aligned}
$$

The two $S$'s must be 6 positions apart, so the possible pairs are
$(1, 7), \quad (2, 8), \quad (3, 9), \quad (4, 10)$.

[DIAGRAM: Ex5_4_Q10_ii_Diag4]

For one fixed pair, choose the remaining 3 $S$'s from the other 8 positions. Thus
$$
4 \cdot {}^8C_3 = 4 \cdot 56 = 224.
$$

If two pairs occur together, choose the two pairs and then choose the last $S$ from the remaining 6 positions:

[DIAGRAM: Ex5_4_Q10_ii_Diag5]

$$
{}^4C_2 \cdot {}^6C_1 = 6 \cdot 6 = 36.
$$

No three pairs can occur together, since this would require at least 6 $S$'s.

$$
\begin{aligned}
\text{Number of positions for the five S's} &= 224 - 36 \\
&= 188.
\end{aligned}
$$

The remaining letters are $E, E, T, R, L$, so they can be arranged in $\frac{5!}{2!}$ ways.

$$
\begin{aligned}
\text{Required number of permutations} &= 188 \cdot \frac{5!}{2!} \\
&= 188 \cdot 60 \\
&= 11280.
\end{aligned}
$$


`;
