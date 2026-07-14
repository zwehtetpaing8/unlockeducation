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

ဒါကြောင့် မြို့ A ကနေ မြို့ C ကို မြို့ B ဖြတ်ပြီး သွားနိုင်တဲ့ နည်းလမ်းစုစုပေါင်းက 24 နည်းဖြစ်ပါတယ်။`;
