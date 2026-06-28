import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlockMath } from 'react-katex';
import { 
  X, BookOpen, Sigma, Copy, Check, Search, Sparkles, Code 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_LESSONS } from '../../services/curriculum';

interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  explanation: string;
  category: 'complex' | 'induction' | 'others';
  lessonId: string;
}

const ALL_FORMULAS_MAP: FormulaItem[] = [
  // Grade 10 - Sets
  {
    id: 'sets-union',
    name: 'Union of Sets',
    formula: 'A \\cup B = \\{x \\mid x \\in A \\text{ or } x \\in B\\}',
    explanation: 'The set containing all elements that are in A, in B, or in both. (Grade 10 • Chapter 1)',
    category: 'others',
    lessonId: 'lesson-g10-c1-1'
  },
  {
    id: 'sets-intersection',
    name: 'Intersection of Sets',
    formula: 'A \\cap B = \\{x \\mid x \\in A \\text{ and } x \\in B\\}',
    explanation: 'The set containing all elements that are simultaneously in both A and B. (Grade 10 • Chapter 1)',
    category: 'others',
    lessonId: 'lesson-g10-c1-1'
  },
  // Grade 11 - Sequence and Series
  {
    id: 'ap-n-term',
    name: 'n-th Term of Arithmetic Progression (AP)',
    formula: 'a_n = a + (n-1)d',
    explanation: 'Calculates the n-th term of an AP, where a is the first term and d is the common difference. (Grade 11 • Chapter 2)',
    category: 'others',
    lessonId: 'lesson-g11-c2-1'
  },
  // Grade 12 - Chapter 1 - Complex Numbers
  {
    id: 'c-standard',
    name: 'Cartesian / Standard Form',
    formula: 'z = x + yi',
    explanation: 'The standard representation of a complex number, where x is the real part Re(z) and y is the imaginary part Im(z) with i² = -1. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-complex'
  },
  {
    id: 'c-powers',
    name: 'Powers of Imaginary Unit i',
    formula: 'i^1 = i, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1',
    explanation: 'Powers of i repeat in a cycle of 4. Find the remainder of n divided by 4 to compute i^n easily. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-basic'
  },
  {
    id: 'c-conjugate',
    name: 'Complex Conjugate',
    formula: '\\bar{z} = x - yi',
    explanation: 'Formed by changing the sign of the imaginary part. Multiplying a complex number by its conjugate yields a real number: z · z̄ = x² + y². (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-operations'
  },
  {
    id: 'c-modulus',
    name: 'Modulus of a Complex Number',
    formula: '|z| = \\sqrt{x^2 + y^2}',
    explanation: 'Represents the distance of the point P(x, y) from the origin on the complex plane. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-operations'
  },
  {
    id: 'c-ordered-pair-mult',
    name: 'Multiplication in Ordered Pairs',
    formula: '(a, b)(c, d) = (ac - bd, ad + bc)',
    explanation: 'The formula for multiplying two complex numbers represented as ordered pairs. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-complex'
  },
  {
    id: 'c-reciprocal',
    name: 'Reciprocal of a Complex Number',
    formula: 'z^{-1} = \\frac{\\bar{z}}{|z|^2} = \\frac{x - yi}{x^2 + y^2}',
    explanation: 'The multiplicative inverse of a non-zero complex number z = x + yi. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-operations'
  },
  {
    id: 'c-division',
    name: 'Division of Complex Numbers',
    formula: '\\frac{z_1}{z_2} = \\frac{z_1\\bar{z}_2}{z_2\\bar{z}_2} = \\frac{(x_1x_2 + y_1y_2) + (y_1x_2 - x_1y_2)i}{x_2^2 + y_2^2}',
    explanation: 'Obtained by multiplying the numerator and denominator by the conjugate of the denominator. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-operations'
  },
  // Grade 12 - Chapter 1 - Section 1.4 Trigonometric Form
  {
    id: 'c-trig-form',
    name: 'Trigonometric / Polar Form',
    formula: 'z = r(\\cos\\theta + i\\sin\\theta)',
    explanation: 'The polar representation of a non-zero complex number z, where r is the modulus and θ is the argument. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-trig'
  },
  {
    id: 'c-trig-product',
    name: 'Product in Trigonometric Form',
    formula: 'z_1z_2 = r_1r_2\\bigl(\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\bigr)',
    explanation: 'Multiplying two complex numbers in polar form multiplies their moduli and adds their arguments. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-trig'
  },
  {
    id: 'c-trig-inverse',
    name: 'Multiplicative Inverse in Polar Form',
    formula: 'z^{-1} = \\frac{1}{r}\\bigl(\\cos(-\\theta) + i\\sin(-\\theta)\\bigr)',
    explanation: 'The reciprocal of a complex number in polar form divides the modulus by 1 and negates the argument. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-trig'
  },
  {
    id: 'c-trig-division',
    name: 'Division in Trigonometric Form',
    formula: '\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\bigl(\\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2)\\bigr)',
    explanation: 'Dividing two complex numbers in polar form divides their moduli and subtracts their arguments. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-trig'
  },
  {
    id: 'c-de-moivre',
    name: 'De Moivre\'s Theorem',
    formula: 'z^n = r^n(\\cos n\\theta + i\\sin n\\theta)',
    explanation: 'The general formula for finding the n-th power of a complex number in trigonometric form. (Grade 12 • Chapter 1)',
    category: 'complex',
    lessonId: 'lesson-c1-trig'
  },
  // Grade 12 - Chapter 2 - Mathematical Induction
  {
    id: 'ind-principle',
    name: 'Principle of Mathematical Induction',
    formula: '\\text{Base Step: } P(1) \\quad \\text{and} \\quad \\text{Inductive Step: } P(k) \\implies P(k+1)',
    explanation: 'Proves a statement for all natural numbers: verify for n = 1, assume for n = k, and prove for n = k + 1. (Grade 12 • Chapter 2)',
    category: 'induction',
    lessonId: 'lesson-g12-c2-1'
  }
];

export const FormulaCheatSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'complex' | 'induction' | 'others'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activeLessonIds = new Set(MOCK_LESSONS.map(l => l.id));
  const FORMULAS = ALL_FORMULAS_MAP.filter(f => activeLessonIds.has(f.lessonId));

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
