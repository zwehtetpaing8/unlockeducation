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

သွေးအမျိုးအစားက $\text{A, B, AB, O}$ ဆိုပြီး $4$ မျိုးရှိသည်။ ပြီးတော့ သွေးမှာ $\text{Rh positive (+)}$ နဲ့ $\text{Rh negative (-)}$ ဆိုပြီး ခွဲခြားချက်နှစ်မျိုး ရှိသေးသည်။ သွေးအလှူရှင်ကိုလည်း $\text{male}$ ဒါမှမဟုတ် $\text{female}$ လို့ ခွဲထားမည်။ ဒီအချက်တွေကို အခြေခံပြီး သွေးကို $\text{label}$ တပ်နိုင်တဲ့ နည်းလမ်းစုစုပေါင်းကို ရှာရမှာဖြစ်ပါတယ်။

[DIAGRAM: BloodLabelDiagram]

**Solution:**

A person's blood classification consists of three steps:
1. Identifying the blood group (A, B, AB, or O) — $4$ ways.
2. Identifying the Rh factor ($+$ or $-$) — $2$ ways.
3. Identifying the donor's gender (male or female) — $2$ ways.

By the Multiplication Principle, the total number of ways to classify a person's blood is:
$$\text{Total labels} = 4 \times 2 \times 2 = 16$$

ဒါကြောင့် သွေးအလှူရှင်တစ်ဦးရဲ့ သွေးကို label တပ်နိုင်တဲ့ နည်းလမ်းစုစုပေါင်းက $16$ နည်းလမ်းဖြစ်ပါတယ်။

---

#### Example 3

**Problem:** There are 3 picture nails on a wall. If there are 5 different pictures and each nail can hold only one picture, in how many different ways can the pictures be hung on all the nails?

နံရံပေါ်မှာ ပုံချိတ်ဖို့ သံချောင်း 3 ချောင်းရှိတယ်။ မတူညီတဲ့ ပုံ 5 ပုံရှိပြီး သံချောင်းတစ်ချောင်းမှာ ပုံတစ်ပုံပဲ ချိတ်နိုင်တယ်ဆိုရင် သံချောင်းအားလုံးမှာ ပုံတွေကို ဘယ်နှစ်နည်းနဲ့ ချိတ်နိုင်မလဲ ရှာရမှာဖြစ်ပါတယ်။

[DIAGRAM: PictureNailsDiagram]

**Solution:**

ပထမသံချောင်းအတွက် ပုံ 5 ပုံထဲက တစ်ပုံကို ရွေးချယ်နိုင်ပါတယ်။ ပုံတစ်ပုံကို ချိတ်ပြီးသွားရင် အဲဒီပုံကို ထပ်မသုံးနိုင်တော့လို့ ဒုတိယသံချောင်းအတွက် ပုံ 4 ပုံပဲ ကျန်ပါတယ်။ ထို့နောက် တတိယသံချောင်းအတွက် ပုံ 3 ပုံ ကျန်ပါမယ်။

နောက်အဆင့်ရဲ့ ရွေးစရာအရေအတွက်က အရင်အဆင့် ရွေးပြီးသားအပေါ် မူတည်သော်လည်း အဆင့်တိုင်းအတွက် ရွေးချယ်မှုတွေကို ဆက်တိုက်လုပ်မှသာ သံချောင်း ၃ ချောင်းမှာ ပုံ ၃ ပုံ ချိတ်ဆွဲပြီးမှာဖြစ်တဲ့အတွက် Multiplication Principle ကို သုံးရမှာဖြစ်ပါတယ်။

* Number of choices for the first nail $= 5$,
* Number of choices for the second nail $= 4$,
* Number of choices for the third nail $= 3$,
* Number of ways to hang the pictures $= 5 \times 4 \times 3 = 60$.

ဒါကြောင့် ပုံတွေကို သံချောင်း 3 ချောင်းပေါ်မှာ ချိတ်နိုင်တဲ့ နည်းလမ်းစုစုပေါင်းက 60 ဖြစ်ပါတယ်။

---

### 5.1 Counting Principles - Addition Principle

#### Addition Principle

**The Addition Principle**

Suppose a task can be performed in $m$ ways, and a second task can be performed in $n$ ways, and the two tasks cannot be performed at the same time (disjoint cases). Then there are $m + n$ ways to perform either of these tasks.

အလုပ်တစ်ခုကို $m$ နည်းလမ်းဖြင့် လုပ်ဆောင်နိုင်ပြီး၊ အခြားအလုပ်တစ်ခုကို $n$ နည်းလမ်းဖြင့် လုပ်ဆောင်နိုင်ကာ ၎င်းအလုပ်နှစ်ခုကို တစ်ပြိုင်တည်းလုပ်ဆောင်နိုင်ခြင်းမရှိလျှင် (မထပ်သော disjoint cases ဖြစ်လျှင်)၊ ထိုအလုပ်နှစ်ခုအနက် တစ်ခုကို လုပ်ဆောင်နိုင်သော စုစုပေါင်းနည်းလမ်းသည် $m + n$ နည်းလမ်းဖြစ်ပါတယ်။

---

#### Choosing the Right Counting Principle

[DIAGRAM: AndOrFlowchart]

---

#### Example 4

**Problem:** How many different numbers can be formed using the digits $3, 5, 6, 8$ and $9$ in such a way that the numbers contain two or three digits without any repetition?

ပေးထားသော ဂဏန်းများမှာ $3, 5, 6, 8, 9$ ဖြစ်သည်။ ဂဏန်းများကို ထပ်မသုံးဘဲ two-digit (နှစ်လုံးတွဲကိန်း) သို့မဟုတ် three-digit (သုံးလုံးတွဲကိန်း) များ ဖန်တီးရမည်။

[DIAGRAM: Example4Diagram]

**Solution:**

ကျွန်ုပ်တို့သည် နှစ်လုံးတွဲကိန်း (two-digit numbers) **သို့မဟုတ်** သုံးလုံးတွဲကိန်း (three-digit numbers) များကို ဖန်တီးလိုခြင်း ဖြစ်သည်။ ကိန်းတစ်ခုသည် တစ်ချိန်တည်းတွင် နှစ်လုံးတွဲကော သုံးလုံးတွဲပါ မဖြစ်နိုင်သဖြင့် ၎င်းတို့သည် မထပ်သော disjoint cases များ ဖြစ်ကြသည်။ ထို့ကြောင့် Case တစ်ခုချင်းစီကို သီးခြားစီ တွက်ချက်ပြီး Addition Principle အရ ပေါင်းရပါမည်။

**Case 1: Two-digit numbers (နှစ်လုံးတွဲကိန်းများ)**
* ရွေးချယ်နိုင်သော ဂဏန်း $5$ လုံးရှိသည်။
* ဆယ်ဂဏန်းနေရာ ($T$) အတွက် ရွေးချယ်နိုင်သော နည်းလမ်း $= 5$ နည်း။
* ခုဂဏန်းနေရာ ($U$) အတွက် ရွေးချယ်နိုင်သော နည်းလမ်း $= 4$ နည်း (ဂဏန်းများကို ထပ်မသုံးရသဖြင့်)။
* Multiplication Principle အရ ဖန်တီးနိုင်သော နှစ်လုံးတွဲကိန်း $= 5 \times 4 = 20$ နည်း။

**Case 2: Three-digit numbers (သုံးလုံးတွဲကိန်းများ)**
* ရာဂဏန်းနေရာ ($H$) အတွက် ရွေးချယ်နိုင်သော နည်းလမ်း $= 5$ နည်း။
* ဆယ်ဂဏန်းနေရာ ($T$) အတွက် ရွေးချယ်နိုင်သော နည်းလမ်း $= 4$ နည်း။
* ခုဂဏန်းနေရာ ($U$) အတွက် ရွေးချယ်နိုင်သော နည်းလမ်း $= 3$ နည်း။
* Multiplication Principle အရ ဖန်တီးနိုင်သော သုံးလုံးတွဲကိန်း $= 5 \times 4 \times 3 = 60$ နည်း။

By the Addition Principle, the total number of possible numbers is:
$$\text{Total possible numbers} = 20 + 60 = 80$$

ဒါကြောင့် ဖန်တီးနိုင်သော ကိန်းစုစုပေါင်းမှာ $80$ ခု ဖြစ်သည်။

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
    * ထို့ကြောင့် ဆယ်ဂဏန်းနေရာတွင် $5$ တစ်ကြိမ်သာ ပါသော ကိန်း $= 1 \times 9 = 9$ ခု (၎င်းတို့မှာ 50, 51, 52, 53, 54, 56, 57, 58, 59 တို့ ဖြစ်သည်)။
  * **ခုဂဏန်းနေရာတွင် $5$ ရှိပြီး ဆယ်ဂဏန်းနေရာတွင် $5$ မဟုတ်သော ကိန်းများ (Units digit 5 only):**
    * ခုဂဏန်းနေရာ ($U$) တွင် $5$ ကိုသာ ထားရမည်ဖြစ်သဖြင့် $= 1$ နည်း။
    * ဆယ်ဂဏန်းနေရာ ($T$) တွင် $5$ မဟုတ်သည့်အပြင် နှစ်လုံးတွဲကိန်း ဖြစ်ရန်အတွက် $0$ လည်း မဖြစ်ရပါ (အကယ်၍ ဆယ်ဂဏန်းနေရာ $0$ ဖြစ်ပါက တစ်လုံးတည်းသော ကိန်း ဖြစ်သွားမည်ဖြစ်သည်)။ ထို့ကြောင့် ဆယ်ဂဏန်းနေရာတွင် $0$ နှင့် $5$ မှတစ်ပါး ကျန်ဂဏန်း $8$ လုံး ($1, 2, 3, 4, 6, 7, 8, 9$) ထဲမှ ကြိုက်ရာတစ်ခု ထားနိုင်သဖြင့် $= 8$ နည်း။
    * ထို့ကြောင့် ခုဂဏန်းနေရာတွင် $5$ တစ်ကြိမ်သာ ပါသော ကိန်း $= 8 \times 1 = 8$ ခု (၎င်းတို့မှာ 15, 25, 35, 45, 65, 75, 85, 95 တို့ ဖြစ်သည်)။

  * ထို့ကြောင့် နှစ်လုံးတွဲ ကိန်းစုစုပေါင်း $= 9 + 8 = 17$ ခု။

By the Addition Principle, the total number of integers is:
$$\text{Total number of integers} = 1 + 17 = 18$$

ဒါကြောင့် $0$ နှင့် $100$ ကြားတွင် ဂဏန်း $5$ တစ်ကြိမ်တည်းသာ ပါသော ကိန်းပြည့်စုစုပေါင်းမှာ $18$ ခု ဖြစ်သည်။

---

### Factorial Notation

counting examples တွေမှာ ရွေးချယ်မှုတစ်ခုလုပ်ပြီးတိုင်း ရွေးစရာအရေအတွက်တစ်ခုစီလျော့သွားသော အခြေအနေများကို တွေ့ခဲ့ပြီးဖြစ်သည်။ ဥပမာ Example 4 တွင် ဂဏန်းများကို ထပ်မသုံးဘဲ three-digit ကိန်းဖွဲ့ရာ၌ $5 \times 4 \times 3$ ဟု တွက်ခဲ့သည်။ ဒီလို $5, 4, 3$ ကဲ့သို့ ဆက်တိုက်လျော့သွားသော ကိန်းများကို မြှောက်သောပုံစံကို အတိုချုံးရေးရန် **factorial notation** ကို အသုံးပြုနိုင်သည်။

#### Definition

If $n$ is a positive integer, then
$$n! = n(n - 1)(n - 2) \cdots 3 \cdot 2 \cdot 1$$

ဤတွင် $n!$ ကို **$n$ factorial** ဟု ဖတ်သည်။ ဥပမာအားဖြင့်:
$$5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$$
$$4! = 4 \times 3 \times 2 \times 1 = 24$$
$$3! = 3 \times 2 \times 1 = 6$$

#### Special Case: $0!$

ဒီသတ်မှတ်ချက်ကို သုံးထားရခြင်းမှာ factorial pattern ဆက်ပြီး မှန်ကန်နေစေရန် ဖြစ်သည်။
$$4! = 4 \times 3!$$
$$3! = 3 \times 2!$$
$$2! = 2 \times 1!$$
$$1! = 1 \times 0!$$

သို့သော် $1! = 1$ ဖြစ်သောကြောင့်:
$$1 = 1 \times 0! \implies 0! = 1$$

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

မတူညီသော အရာဝတ္ထု $n$ ခုထဲမှ $r$ ခုကို ရွေးယူပြီး အစီအစဉ်တကျစီခြင်းကို permutation ဟုခေါ်သည်။ ဤနေရာတွင် ရွေးထားသော အရာများ၏ အစီအစဉ်သည် အရေးကြီးသည်။

$$^nP_r \quad \text{or} \quad P(n, r)$$

သည် **"** $n$ **ခုထဲမှ** $r$ **ခုကို အစီအစဉ်တကျ စီနိုင်သည့် စုစုပေါင်း နည်းလမ်း အရေအတွက်** ဖြစ်သည်။`;
