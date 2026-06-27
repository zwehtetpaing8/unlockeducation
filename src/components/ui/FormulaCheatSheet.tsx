import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlockMath } from 'react-katex';
import { 
  X, BookOpen, Sigma, Copy, Check, Search, Sparkles, Code 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  explanation: string;
  category: 'complex' | 'induction' | 'others';
}

const FORMULAS: FormulaItem[] = [
  // Grade 10 - Sets
  {
    id: 'sets-union',
    name: 'Union of Sets (အစုပေါင်း)',
    formula: 'A \\cup B = \\{x \\mid x \\in A \\text{ or } x \\in B\\}',
    explanation: 'A ∪ B သည် အစု A နှင့် အစု B နှစ်ခုလုံးရှိ အစုဝင်အားလုံး စုစည်းမှုဖြစ်သည်။ (Grade 10 • Chapter 1)',
    category: 'others'
  },
  {
    id: 'sets-intersection',
    name: 'Intersection of Sets (အစုဘုံ)',
    formula: 'A \\cap B = \\{x \\mid x \\in A \\text{ and } x \\in B\\}',
    explanation: 'A ∩ B သည် အစု A နှင့် အစု B နှစ်ခုလုံးတွင် ဘုံတူညီစွာပါဝင်သော အစုဝင်များဖြစ်သည်။ (Grade 10 • Chapter 1)',
    category: 'others'
  },
  // Grade 11 - Sequence and Series
  {
    id: 'ap-n-term',
    name: 'n-th Term of AP (Arithmetic Progression)',
    formula: 'a_n = a + (n-1)d',
    explanation: 'AP ၏ n-th term တွက်ချက်ပုံဖြစ်ပြီး a သည် ပထမကိန်း (first term)၊ d သည် ကွာခြားချက်ဘုံ (common difference) ဖြစ်သည်။ (Grade 11 • Chapter 2)',
    category: 'others'
  },
  // Grade 12 - Chapter 1 - Complex Numbers
  {
    id: 'c-standard',
    name: 'Cartesian / Standard Form (ကတ်တေးရှန်းပုံစံ)',
    formula: 'z = x + yi',
    explanation: 'ကိန်းရှုပ်တစ်ခု၏ အခြေခံပုံစံဖြစ်ပြီး x သည် Real Part Re(z) နှင့် y သည် Imaginary Part Im(z) ဖြစ်သည်။ (i² = -1) (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  {
    id: 'c-powers',
    name: 'Powers of Imaginary Unit i (i ၏ ထပ်ညွှန်းများ)',
    formula: 'i^1 = i, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1',
    explanation: 'i ၏ တန်ဖိုးများသည် ၄ ကြိမ်လျှင် တစ်ပတ်လည်ပြီး ထပ်တလဲလဲ ဖြစ်ပေါ်သည်။ n ထပ်ကိန်းကို ၄ နှင့်စား၍ အကြွင်းရှာကာ တွက်ချက်နိုင်သည်။ (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  {
    id: 'c-conjugate',
    name: 'Complex Conjugate (Conjugate ကိန်းစပ်)',
    formula: '\\bar{z} = x - yi',
    explanation: 'ကိန်းရှုပ်တစ်ခု၏ imaginary part ၏ လက္ခဏာကို ပြောင်းလဲခြင်းဖြစ်ပြီး z · z̄ = x² + y² ဖြစ်သည်။ (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  {
    id: 'c-modulus',
    name: 'Modulus / Absolute Value (ကိန်းရှုပ်တစ်ခု၏ ပမာဏ)',
    formula: '|z| = \\sqrt{x^2 + y^2}',
    explanation: 'Complex Plane ပေါ်ရှိ အမှတ်မှ ကနဦးအမှတ် (origin) သို့ ကွာဝေးသော အကွာအဝေး ဖြစ်သည်။ (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  {
    id: 'c-ordered-pair-mult',
    name: 'Multiplication in Ordered Pairs (အစဉ်လိုက်ရံတွဲ မြှောက်ခြင်း)',
    formula: '(a, b)(c, d) = (ac - bd, ad + bc)',
    explanation: 'ကိန်းရှုပ်နှစ်ခုကို အစဉ်လိုက်ရံတွဲ (ordered pairs) ပုံစံဖြင့် မြှောက်ခြင်း ပုံသေနည်း ဖြစ်သည်။ (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  {
    id: 'c-reciprocal',
    name: 'Reciprocal of a Complex Number (ကိန်းရှုပ်၏ ပြောင်းပြန်)',
    formula: 'z^{-1} = \\frac{\\bar{z}}{|z|^2} = \\frac{x - yi}{x^2 + y^2}',
    explanation: 'ကိန်းရှုပ် z = x + yi (z ≠ 0) ၏ မြှောက်ဖော်ကိန်း ပြောင်းပြန် ဖြစ်သည်။ (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  {
    id: 'c-division',
    name: 'Division of Complex Numbers (ကိန်းရှုပ်များ စားခြင်း)',
    formula: '\\frac{z_1}{z_2} = \\frac{z_1\\bar{z}_2}{z_2\\bar{z}_2} = \\frac{(x_1x_2 + y_1y_2) + (y_1x_2 - x_1y_2)i}{x_2^2 + y_2^2}',
    explanation: 'ပိုင်းခြေ၏ conjugate နှင့် ပိုင်းဝေ/ပိုင်းခြေ နှစ်ခုလုံးကို မြှောက်ကာ တွက်ချက်ရယူသည်။ (Grade 12 • Chapter 1)',
    category: 'complex'
  },
  // Grade 12 - Chapter 2 - Mathematical Induction
  {
    id: 'ind-principle',
    name: 'Principle of Mathematical Induction (သက်သေပြခြင်း အခြေခံဥပဒေသ)',
    formula: '\\text{Base Step: } P(1) \\quad \\text{and} \\quad \\text{Inductive Step: } P(k) \\implies P(k+1)',
    explanation: 'Base step တွင် P(1) မှန်ကန်ကြောင်း ပြသပြီး၊ Inductive step တွင် P(k) မှန်ကန်က P(k+1) လည်း မှန်ကန်ကြောင်း ပြသသည်။ (Grade 12 • Chapter 2)',
    category: 'induction'
  }
];

export const FormulaCheatSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'complex' | 'induction' | 'others'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = FORMULAS.filter(f => {
    const matchesCategory = activeTab === 'all' || f.category === activeTab;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-[150]">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-4 md:px-5 md:py-3.5 shadow-xl shadow-blue-500/20 active:scale-95 transition-all outline-none border border-blue-500/30 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sigma size={20} className="text-white" />
          <span className="hidden md:inline font-black text-xs uppercase tracking-wider">Formula Book</span>
        </motion.button>
      </div>

      {/* Slide-out Panel Overlay & Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[200]"
            />

            {/* Slide drawer container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] bg-white shadow-2xl z-[201] flex flex-col border-l border-slate-100"
            >
              {/* Header Container */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-105 text-blue-600 border border-blue-100 shadow-xs">
                    <BookOpen size={18} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-800 text-sm md:text-base leading-tight uppercase tracking-tight">Formulas Guide</h3>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Grade 12 Quick Cheat Sheet</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors active:scale-90"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Toolbar Area */}
              <div className="p-5 border-b border-slate-100 bg-white space-y-3">
                {/* Search Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search formula names, descriptions..."
                    className="w-full text-xs font-medium pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-150 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-405"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-500 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Tab select row */}
                <div className="flex bg-slate-50 border border-slate-100 rounded-xl p-1 justify-stretch">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'complex', label: 'Complex' },
                    { id: 'induction', label: 'Induction' },
                    { id: 'others', label: 'Others' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex-1 text-[10px] font-black uppercase py-1.5 rounded-lg transition-all outline-none select-none cursor-pointer",
                        activeTab === tab.id 
                          ? "bg-white text-blue-600 shadow-xs border border-slate-150/50" 
                          : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scroller Content Area */}
              <div className="flex-grow overflow-y-auto p-5 space-y-5 bg-slate-50/40">
                {filteredFormulas.length === 0 ? (
                  <div className="h-44 flex flex-col items-center justify-center text-slate-400 gap-1">
                    <Sparkles size={24} className="text-slate-350" />
                    <span className="text-xs font-bold mt-2">No formulas matched your search</span>
                    <span className="text-[10px]">Try searching standard keywords</span>
                  </div>
                ) : (
                  filteredFormulas.map((f) => (
                    <div 
                      key={f.id} 
                      className="bg-white border border-slate-150 rounded-2xl p-4.5 shadow-xs hover:shadow-sm transition-all text-left flex flex-col relative group"
                    >
                      {/* Copy LaTeX trigger */}
                      <button
                        onClick={() => handleCopy(f.formula, f.id)}
                        className={cn(
                          "absolute top-3.5 right-3.5 p-2 rounded-lg border text-[10px] items-center gap-1.5 font-bold transition-all flex",
                          copiedId === f.id 
                            ? "bg-emerald-50 border-emerald-250 text-emerald-600 pointer-events-none" 
                            : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 active:scale-95"
                        )}
                        title="Copy LaTeX formula code"
                      >
                        {copiedId === f.id ? <Check size={12} strokeWidth={3} /> : <Copy size={12} />}
                        <span className="sr-only">Copy</span>
                      </button>

                      {/* Header title */}
                      <span className="text-[9px] font-black uppercase text-blue-500 tracking-wider">
                        {f.category === 'complex' ? 'Grade 12 • Chapter 1' : f.category === 'induction' ? 'Grade 12 • Chapter 2' : 'Grade 10/11 • Core'} • Formula Card
                      </span>
                      <h4 className="font-extrabold text-[13px] md:text-sm text-slate-800 leading-tight mt-1">
                        {f.name}
                      </h4>

                      {/* LaTeX Block Math Area */}
                      <div className="my-3.5 p-3 sm:p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center justify-center overflow-x-auto select-all max-w-full">
                        <div className="text-sm md:text-base text-slate-900 select-all outline-none">
                          <BlockMath math={f.formula} />
                        </div>
                      </div>

                      {/* Explanations */}
                      <div className="space-y-1.5 border-t border-slate-100 pt-3 mt-1 text-[11px] md:text-xs">
                        <p className="text-slate-600 leading-relaxed">
                          📌 <span className="font-medium">{f.explanation}</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Status */}
              <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between text-[10px] font-bold text-slate-400 select-none">
                <div className="flex items-center gap-1.5">
                  <Code size={12} className="text-slate-350" />
                  <span>Standard LaTeX Compliant</span>
                </div>
                <span>Total formula count: {FORMULAS.length}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
