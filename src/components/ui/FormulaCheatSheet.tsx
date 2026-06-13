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
  category: 'complex' | 'induction' | 'general';
}

const FORMULAS: FormulaItem[] = [
  // Complex Numbers
  {
    id: 'c-standard',
    name: 'Cartesian / Standard Form',
    formula: 'z = x + yi',
    explanation: 'Where x is the real part Re(z) and y is the imaginary part Im(z), with x, y ∈ ℝ and i² = -1.',
    category: 'complex'
  },
  {
    id: 'c-powers',
    name: 'Powers of Imaginary Unit i',
    formula: 'i^1 = i, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1',
    explanation: 'The values of iⁿ repeat in a 4-step cycle. For any integer n, solve using remainder of n ÷ 4.',
    category: 'complex'
  },
  {
    id: 'c-conjugate',
    name: 'Complex Conjugate',
    formula: '\\bar{z} = x - yi',
    explanation: 'Formed by changing the sign of the imaginary part. Properties: z · z̄ = |z|² = x² + y².',
    category: 'complex'
  },
  {
    id: 'c-modulus',
    name: 'Modulus / Absolute Value',
    formula: '|z| = \\sqrt{x^2 + y^2}',
    explanation: 'Represents the distance of the complex number from the origin (0,0) in the complex plane.',
    category: 'complex'
  },
  {
    id: 'c-polar',
    name: 'Polar / Trigonometric Form',
    formula: 'z = r(\\cos\\theta + i\\sin\\theta)',
    explanation: 'Where r = |z| is the modulus, and θ = arctan(y/x) is the principal argument (in radians or degrees).',
    category: 'complex'
  },
  {
    id: 'c-demoivre',
    name: "De Moivre's Theorem",
    formula: 'z^n = [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)',
    explanation: 'Crucial for raising complex numbers to integer powers and finding roots of complex equations.',
    category: 'complex'
  },
  // Mathematical Induction
  {
    id: 'ind-sum-n',
    name: 'Sum of First n Integers',
    formula: '\\sum_{r=1}^n r = 1 + 2 + 3 + ... + n = \\frac{n(n+1)}{2}',
    explanation: 'Formula for the sum of the first n positive consecutive integers.',
    category: 'induction'
  },
  {
    id: 'ind-sum-n2',
    name: 'Sum of First n Squares',
    formula: '\\sum_{r=1}^n r^2 = 1^2 + 2^2 + 3^2 + ... + n^2 = \\frac{n(n+1)(2n+1)}{6}',
    explanation: 'Formula for the sum of squares of the first n positive consecutive integers.',
    category: 'induction'
  },
  {
    id: 'ind-sum-n3',
    name: 'Sum of First n Cubes',
    formula: '\\sum_{r=1}^n r^3 = 1^3 + 2^3 + 3^3 + ... + n^3 = \\frac{n^2(n+1)^2}{4} = \\left[\\frac{n(n+1)}{2}\\right]^2',
    explanation: 'The sum of the cubes of the first n integers is exactly the square of their sum.',
    category: 'induction'
  }
];

export const FormulaCheatSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'complex' | 'induction'>('all');
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
                    { id: 'complex', label: 'Complex Numbers' },
                    { id: 'induction', label: 'Induction' }
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
                        {f.category === 'complex' ? 'Chapter 1' : 'Chapter 2'} • Formula Card
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
