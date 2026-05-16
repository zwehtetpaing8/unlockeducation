import React from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center shadow-inner">
            <Lock size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none text-neutral-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
              ကိုယ်ရေးအချက်အလက် လုံခြုံမှုမူဝါဒ
            </p>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-purple-600 pl-4">
              ၁။ အချက်အလက် စုဆောင်းခြင်း (Information Collection)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              ကျွန်ုပ်တို့သည် ဝန်ဆောင်မှုပေးရန် လိုအပ်သော အခြေခံအချက်အလက်များ (ဥပမာ - အမည်၊ အီးမေးလ်) ကို စုဆောင်းနိုင်ပါသည်။ အဆိုပါ အချက်အလက်များကို သင်ယူမှု အတွေ့အကြုံ တိုးတက်စေရန်အတွက်သာ အသုံးပြုပါသည်။
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-purple-600 pl-4">
              ၂။ အချက်အလက် အသုံးပြုခြင်း (Information Usage)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              စုဆောင်းထားသော အချက်အလက်များကို အသုံးပြုသူ၏ သင်ယူမှု တိုးတက်မှုကို ခြေရာခံရန်၊ လိုအပ်သော အကြောင်းကြားစာများ ပေးပို့ရန်နှင့် ဝန်ဆောင်မှု အရည်အသွေး မြှင့်တင်ရန်အတွက်သာ အသုံးပြုပါမည်။
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-purple-600 pl-4">
              ၃။ လုံခြုံစွာ ထိန်းသိမ်းခြင်း (Data Safety)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              သင်၏ ကိုယ်ရေးအချက်အလက်များကို ခွင့်ပြုချက်မရှိဘဲ ဝင်ရောက်ကြည့်ရှုခြင်း သို့မဟုတ် ပေါက်ကြားခြင်း မရှိစေရန် ခေတ်မီနည်းပညာများ အသုံးပြု၍ လုံခြုံစွာ ထိန်းသိမ်းထားပါသည်။
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-4 border-l-4 border-purple-600 pl-4">
              ၄။ တတိယအဖွဲ့အစည်းများနှင့် မျှဝေခြင်း (Third-party Sharing)
            </h2>
            <p className="text-neutral-600 leading-relaxed font-medium">
              ကျွန်ုပ်တို့သည် အသုံးပြုသူ၏ သဘောတူညီချက် မရှိဘဲ သင်၏ ကိုယ်ရေးအချက်အလက်များကို မည်သည့် တတိယအဖွဲ့အစည်းကိုမျှ ရောင်းချခြင်း သို့မဟုတ် မျှဝေခြင်း ပြုလုပ်မည် မဟုတ်ပါ။
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

export default PrivacyPolicy;
