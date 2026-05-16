import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left min-h-screen">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-blue-600 mb-12 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-8 md:p-16 shadow-xl relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none text-neutral-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              ဝန်ဆောင်မှုဆိုင်ရာ စည်းကမ်းသတ်မှတ်ချက်များ
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-blue-600 pl-4">
              ၁။ မိတ်ဆက် (Introduction)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              ကျွန်ုပ်တို့၏ Unlock Education ဝန်ဆောင်မှုကို အသုံးပြုသည့်အတွက် ကျေးဇူးတင်ပါသည်။ ဤစည်းကမ်းချက်များသည် သင်နှင့် Unlock Education တို့အကြား သဘောတူညီချက်များ ဖြစ်ပါသည်။ ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုကို အသုံးပြုခြင်းဖြင့် သင်သည် ဤစည်းကမ်းချက်များကို လိုက်နာရန် သဘောတူညီပြီး ဖြစ်ပါသည်။
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-blue-600 pl-4">
              ၂။ အသုံးပြုသူ၏ ဝတ္တရားများ (User Obligations)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              အသုံးပြုသူများသည် ဝန်ဆောင်မှုကို အသုံးပြုရာတွင် တည်ဆဲဥပဒေများကို လိုက်နာရမည်ဖြစ်ပြီး အခြားသူများ၏ အခွင့်အရေးကို ထိခိုက်စေသော လုပ်ရပ်များ၊ ဝန်ဆောင်မှုကို အနှောင့်အယှက်ဖြစ်စေသော လုပ်ရပ်များကို ရှောင်ကြဉ်ရပါမည်။
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-blue-600 pl-4">
              ၃။ အကြောင်းအရာများ အသုံးပြုခြင်း (Content Usage)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              ဤဝဘ်ဆိုဒ်တွင် ဖော်ပြထားသော သင်ခန်းစာများ၊ စာမေးပွဲများနှင့် အခြားသော အချက်အလက်များသည် ပညာရေးအတွက်သာ ရည်ရွယ်ပါသည်။ ခွင့်ပြုချက်မရှိဘဲ စီးပွားဖြစ် ကူးယူအသုံးပြုခြင်းကို တားမြစ်ထားပါသည်။
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-blue-600 pl-4">
              ၄။ ပြင်ဆင်ပြောင်းလဲခြင်း (Modifications)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              ကျွန်ုပ်တို့သည် လိုအပ်ပါက ဤစည်းကမ်းချက်များကို အချိန်မရွေး ပြင်ဆင်ပြောင်းလဲနိုင်ခွင့် ရှိပါသည်။ ပြင်ဆင်ချက်များကို ဝဘ်ဆိုဒ်တွင် ဖော်ပြပေးသွားမည် ဖြစ်ပါသည်။
            </p>
          </section>

          <section className="pt-10 border-t border-neutral-100 italic text-neutral-400 text-sm">
            နောက်ဆုံးပြင်ဆင်သည့်ရက်စွဲ - မေလ၊ ၂၀၂၄ ခုနှစ်
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
