import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-left min-h-screen pb-24">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-blue-600 mb-12 transition-all group uppercase tracking-[0.2em]"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Return Home
      </Link>

      <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl opacity-50" />
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 relative z-10">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-900/20 active:rotate-12 transition-transform">
            <Shield size={36} />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9] text-slate-900 mb-2">
              Terms & <br /><span className="text-blue-600">Conditions</span>
            </h1>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              ဝန်ဆောင်မှုဆိုင်ရာ စည်းကမ်းသတ်မှတ်ချက်များ
            </p>
          </div>
        </div>

        <div className="space-y-16 relative z-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              ၁။ မိတ်ဆက် (Introduction)
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
              ကျွန်ုပ်တို့၏ Unlock Education ဝန်ဆောင်မှုကို အသုံးပြုသည့်အတွက် ကျေးဇူးတင်ပါသည်။ ဤစည်းကမ်းချက်များသည် သင်နှင့် Unlock Education တို့အကြား သဘောတူညီချက်များ ဖြစ်ပါသည်။ ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုကို အသုံးပြုခြင်းဖြင့် သင်သည် ဤစည်းကမ်းချက်များကို လိုက်နာရန် သဘောတူညီပြီး ဖြစ်ပါသည်။
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
               <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
               ၂။ အသုံးပြုသူ၏ ဝတ္တရားများ
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
              အသုံးပြုသူများသည် ဝန်ဆောင်မှုကို အသုံးပြုရာတွင် တည်ဆဲဥပဒေများကို လိုက်နာရမည်ဖြစ်ပြီး အခြားသူများ၏ အခွင့်အရေးကို ထိခိုက်စေသော လုပ်ရပ်များ၊ ဝန်ဆောင်မှုကို အနှောင့်အယှက်ဖြစ်စေသော လုပ်ရပ်များကို ရှောင်ကြဉ်ရပါမည်။
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
               <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
               ၃။ အကြောင်းအရာများ အသုံးပြုခြင်း
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
              ဤဝဘ်ဆိုဒ်တွင် ဖော်ပြထားသော သင်ခန်းစာများ၊ စာမေးပွဲများနှင့် အချက်အလက်များသည် ပညာရေးအတွက်သာ ရည်ရွယ်ပါသည်။ ခွင့်ပြုချက်မရှိဘဲ စီးပွားဖြစ် ကူးယူအသုံးပြုခြင်းကို တင်တောင်းစွာ တားမြစ်ထားပါသည်။
            </p>
          </section>

          <div className="pt-12 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <span>Last Updated: May 2024</span>
            <span className="flex items-center gap-2">
               <Shield size={14} className="text-blue-600" /> Secure Protocol v1.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
