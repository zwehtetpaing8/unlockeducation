import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl opacity-50" />
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 relative z-10">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-900/20 active:rotate-12 transition-transform">
            <Lock size={36} />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.9] text-slate-900 mb-2">
              Privacy <br /><span className="text-purple-600">Protection</span>
            </h1>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              ကိုယ်ရေးအချက်အလက် လုံခြုံမှုမူဝါဒ
            </p>
          </div>
        </div>

        <div className="space-y-16 relative z-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
              ၁။ အချက်အလက် စုဆောင်းခြင်း
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
              ကျွန်ုပ်တို့သည် ဝန်ဆောင်မှုပေးရန် လိုအပ်သော အခြေခံအချက်အလက်များ (ဥပမာ - အမည်၊ အီးမေးလ်) ကို စုဆောင်းနိုင်ပါသည်။ အဆိုပါ အချက်အလက်များကို သင်ယူမှု အတွေ့အကြုံ တိုးတက်စေရန်အတွက်သာ အသုံးပြုပါသည်။
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
               <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
               ၂။ အချက်အလက် အသုံးပြုခြင်း
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
              စုဆောင်းထားသော အချက်အလက်များကို အသုံးပြုသူ၏ သင်ယူမှု တိုးတက်မှုကို ခြေရာခံရန်၊ လိုအပ်သော အကြောင်းကြားစာများ ပေးပို့ရန်နှင့် ဝန်ဆောင်မှု အရည်အသွေး မြှင့်တင်ရန်အတွက်သာ အသုံးပြုပါမည်။
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
               <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
               ၃။ လုံခြုံစွာ ထိန်းသိမ်းခြင်း
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
              သင်၏ ကိုယ်ရေးအချက်အလက်များကို ခွင့်ပြုချက်မရှိဘဲ ဝင်ရောက်ကြည့်ရှုခြင်း သို့မဟုတ် ပေါက်ကြားခြင်း မရှိစေရန် ခေတ်မီနည်းပညာများ အသုံးပြု၍ လုံခြုံစွာ ထိန်းသိမ်းထားပါသည်။
            </p>
          </section>

          <div className="pt-12 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <span>Last Updated: May 2024</span>
            <span className="flex items-center gap-2">
               <Lock size={14} className="text-purple-600" /> AES-256 Encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
