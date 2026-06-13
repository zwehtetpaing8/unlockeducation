import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, RotateCw, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, 
  BookOpen, HelpCircle, RefreshCw, Star, Info, GraduationCap, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Flashcard {
  id: string;
  category: string;
  title: string;
  titleMy: string;
  front: string;
  frontDesc: string;
  back: string;
  backEx: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const FLASHCARDS: Flashcard[] = [
  // 1. Complex Numbers
  {
    id: 'c1',
    category: 'Complex Numbers',
    title: 'Imaginary Unit i',
    titleMy: 'သတ်မှတ်ချက် i',
    front: 'What is the definition and value of i?',
    frontDesc: 'ကိန်းကಲ್ಪယူနစ် i ၏ သတ်မှတ်ချက်တန်ဖိုးမှာ အဘယ်နည်း။',
    back: 'i = √(-1)\nand therefore\ni² = -1',
    backEx: 'Example: √(-16) = 4i',
    difficulty: 'easy'
  },
  {
    id: 'c2',
    category: 'Complex Numbers',
    title: 'Polar Form of a Complex Number',
    titleMy: 'ပိုလာပုံစံ',
    front: 'How do you represent a complex number z = a + bi in Polar Form?',
    frontDesc: 'z = a + bi ကို ပိုလာပုံစံဖြင့် မည်သို့ဖော်ပြသနည်း။',
    back: 'z = r(cos θ + i sin θ)',
    backEx: 'where r = |z| = √(a² + b²) and tan θ = b/a',
    difficulty: 'medium'
  },
  {
    id: 'c3',
    category: 'Complex Numbers',
    title: "De Moivre's Theorem",
    titleMy: "ဒီမွိုင်ဗာ သီအိုရမ်",
    front: "What is De Moivre's Theorem for raising a complex number to a power n?",
    frontDesc: "ကိန်းရှုပ်တစ်ခုကို ထပ်ညွှန်း n တင်ခြင်းအတွက် သီအိုရမ်မှာ မည်သို့ရှိသနည်း။",
    back: '[r(cos θ + i sin θ)]ⁿ = rⁿ (cos nθ + i sin nθ)',
    backEx: 'Used to find powers and roots of complex numbers easily.',
    difficulty: 'hard'
  },
  {
    id: 'c4',
    category: 'Complex Numbers',
    title: "Euler's Formula",
    titleMy: "ယူလာ စည်းမျဉ်း",
    front: "What is Euler's elegant identity connecting complex numbers with exponentials?",
    frontDesc: "ထပ်ညွှန်းကိန်းဖြင့် ကိန်းရှုပ်ကို ချိတ်ဆက်ပေးသော ယူလာပုံသေနည်းမှာ အဘယ်နည်း။",
    back: 'e^(iθ) = cos θ + i sin θ',
    backEx: 'Hence Euler\'s Identity: e^(iπ) + 1 = 0',
    difficulty: 'hard'
  },
  
  // 2. Calculus & Limits
  {
    id: 'l1',
    category: 'Calculus & Limits',
    title: 'Derivative of log(x) / ln(x)',
    titleMy: 'ln(x) ၏ can derivative',
    front: 'What is the derivative of f(x) = ln(x) with respect to x?',
    frontDesc: 'f(x) = ln(x) ၏ x အလိုက် ပထမဆင့်ဒစ်ဖရန်ရှီယေးရှင်းမှာ ဘာရသနည်း။',
    back: 'd/dx (ln x) = 1/x',
    backEx: 'Note: x must be greater than 0.',
    difficulty: 'easy'
  },
  {
    id: 'l2',
    category: 'Calculus & Limits',
    title: 'Product Rule for Derivatives',
    titleMy: 'မြှောက်လဒ်စည်းမျဉ်း (Product Rule)',
    front: 'What is the derivative of the product of two functions d/dx [u(x) · v(x)]?',
    frontDesc: 'ဖန်ရှင်နှစ်ခု မြှောက်ထားခြင်းကို ဒစ်ဖရန်ရှီယေးရှင်းလုပ်ရန် ပုံသေနည်း။',
    back: 'd/dx (u · v) = u · (dv/dx) + v · (du/dx)',
    backEx: 'Commonly written as: (uv)′ = u′v + uv′',
    difficulty: 'medium'
  },
  {
    id: 'l3',
    category: 'Calculus & Limits',
    title: 'Quotient Rule for Derivatives',
    titleMy: 'စားလဒ်စည်းမျဉ်း (Quotient Rule)',
    front: 'What is the formula to differentiate a fraction d/dx [u(x) / v(x)]?',
    frontDesc: 'ဖန်ရှင်နှစ်ခုစားထားသော ပုံစံကို ဒစ်ဖရန်ရှီယေးရှင်းလုပ်ရန် ပုံသေနည်း။',
    back: 'd/dx (u / v) = [v · (du/dx) - u · (dv/dx)] / v²',
    backEx: 'Commonly remembered as: "Low d-high minus high d-low over square of what\'s below"',
    difficulty: 'hard'
  },
  {
    id: 'l4',
    category: 'Calculus & Limits',
    title: 'Derivative of Trigonometric Functions',
    titleMy: 'ထရီဂိုဒစ်ဖရန်ရှီယေးရှင်း',
    front: 'What are the derivatives of sin(x) and cos(x)?',
    frontDesc: 'sin(x) နှင့် cos(x) တို့၏ ပထမဆင့်ရှိပုံသေနည်းများမှာ အဘယ်နည်း။',
    back: 'd/dx (sin x) = cos x\nd/dx (cos x) = -sin x',
    backEx: 'Note the negative sign for the derivative of cos(x)!',
    difficulty: 'easy'
  },

  // 3. Sequences & Series
  {
    id: 's1',
    category: 'Sequences & Series',
    title: 'n-th term of an Arithmetic Progression',
    titleMy: 'A.P. ၏ n ကြိမ်မြောက် ကိန်း',
    front: 'What is the formula for the n-th term (t_n) of an Arithmetic Progression with common difference d?',
    frontDesc: 'ဒီဂရီတူခြားနားခြင်း d ရှိသော A.P. ၏ n-th term ပုံသေနည်း။',
    back: 't_n = a + (n - 1)d',
    backEx: 'where a is the first term and d is the common difference.',
    difficulty: 'easy'
  },
  {
    id: 's2',
    category: 'Sequences & Series',
    title: 'Sum of n terms of a GP',
    titleMy: 'G.P. ၏ ပထမ n ကိန်းလုံးပေါင်းလဒ်',
    front: 'What is the sum of the first n terms (S_n) of a Geometric Progression?',
    frontDesc: 'အချိုးတူခြားနားခြင်း r ရှိသော G.P. ၏ S_n ပုံသေနည်း။',
    back: 'S_n = a(1 - rⁿ) / (1 - r)  [when r < 1]\nor\nS_n = a(rⁿ - 1) / (r - 1)  [when r > 1]',
    backEx: 'where a is the first term and r is the common ratio (r ≠ 1)',
    difficulty: 'medium'
  },
  {
    id: 's3',
    category: 'Sequences & Series',
    title: 'Sum to Infinity of Geometric Series',
    titleMy: 'G.P. အနန္တပေါင်းလဒ်',
    front: 'Under what condition does an infinite Geometric Series converge, and what is its sum S_∞?',
    frontDesc: 'ဘယ်လိုအခြေအနေမှာ အနန္တပေါင်းလဒ် ရှာနိုင်ပြီး ပုံသေနည်းမှာ မည်သို့ရှိသနည်း။',
    back: 'S_∞ = a / (1 - r)',
    backEx: 'Only converges when the common ratio satisfies |r| < 1.',
    difficulty: 'medium'
  },

  // 4. Trigonometry
  {
    id: 't1',
    category: 'Trigonometry',
    title: 'Double Angle: sin(2θ)',
    titleMy: 'နှစ်ဆထောင့် sin ပုံသေနည်း',
    front: 'What is the double angle formula for sin(2θ)?',
    frontDesc: 'ထောင့်နှစ်ဆ sin(2θ) ၏ ဖြန့်နည်းပုံသေနည်းမှာ အဘယ်နည်း။',
    back: 'sin(2θ) = 2 sin θ cos θ',
    backEx: 'Example: if sin θ = 3/5, cos θ = 4/5, then sin(2θ) = 24/25',
    difficulty: 'easy'
  },
  {
    id: 't2',
    category: 'Trigonometry',
    title: 'Double Angle: cos(2θ)',
    titleMy: 'နှစ်ဆထောင့် cos ပုံသေနည်း',
    front: 'What are the three main forms of the double angle formula for cos(2θ)?',
    frontDesc: 'cos(2θ) အတွက် အသုံးအများဆုံး ပုံသေနည်း ၃ ခုမှာ မည်သို့ရှိသနည်း။',
    back: '1. cos² θ - sin² θ\n2. 2 cos² θ - 1\n3. 1 - 2 sin² θ',
    backEx: 'Extremely useful in calculus integrations!',
    difficulty: 'medium'
  }
];

const CATEGORIES = ['All Topics', 'Complex Numbers', 'Calculus & Limits', 'Sequences & Series', 'Trigonometry'];

interface CardProgressState {
  [cardId: string]: 'mastered' | 'practice' | null;
}

const Flashcards: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardStates, setCardStates] = useState<CardProgressState>({});
  
  // Filter flashcards base on selected category
  const filteredCards = selectedCategory === 'All Topics' 
    ? FLASHCARDS 
    : FLASHCARDS.filter(card => card.category === selectedCategory);

  // Normalize index in case length changes
  const activeIndex = currentIndex >= filteredCards.length ? 0 : currentIndex;
  const currentCard = filteredCards[activeIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const markCard = (id: string, status: 'mastered' | 'practice') => {
    setCardStates(prev => ({
      ...prev,
      [id]: status
    }));
    // Auto advance after short delay
    setTimeout(() => {
      handleNext();
    }, 800);
  };

  const resetAllProgress = () => {
    setCardStates({});
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Stats calculation
  const masteredCount = Object.values(cardStates).filter(s => s === 'mastered').length;
  const practiceCount = Object.values(cardStates).filter(s => s === 'practice').length;
  const progressPercent = FLASHCARDS.length > 0 
    ? Math.round((Object.keys(cardStates).length / FLASHCARDS.length) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 text-left selection:bg-blue-100 selection:text-blue-900">
      
      {/* Back button & title */}
      <div className="flex flex-col gap-3">
        <Link 
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-all group w-fit"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Home Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={11} className="animate-pulse" />
              <span>Interactive Formula Study Deck</span>
            </div>
            <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none uppercase">
              MATH FLASHCARDS • ပုံသေနည်းကတ်များ
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Grade 12 သင်္ချာ၏ အဓိကသီအိုရီများနှင့် ပုံသေနည်းများကို တစ်ခုချင်းစီ အလွတ်ကျက်မှတ်လေ့ကျင့်ရန်။
            </p>
          </div>

          <button
            onClick={resetAllProgress}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95 cursor-pointer selection:bg-transparent"
          >
            <RefreshCw size={13} />
            Reset Progress
          </button>
        </div>
      </div>

      {/* Progress Monitor Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            {progressPercent}%
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Mastery Progress</p>
            <p className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">
              {Object.keys(cardStates).length} of {FLASHCARDS.length} Cards Played
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Mastered (Got it!)</p>
            <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-tight">
              {masteredCount} Formulas
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <AlertCircle size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Need Practice</p>
            <p className="text-xs font-extrabold text-amber-600 uppercase tracking-tight">
              {practiceCount} Formulas
            </p>
          </div>
        </div>
      </div>

      {/* Categories Scroller Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-black tracking-wide shrink-0 transition-all cursor-pointer box-border",
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard Arena */}
      {filteredCards.length > 0 ? (
        <div className="space-y-6">
          
          {/* Card Wrapper with 3D perspective */}
          <div className="relative w-full max-w-xl mx-auto h-72 sm:h-80 perspective select-none">
            
            {/* Inner Flip Body */}
            <motion.div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-full cursor-pointer relative preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              
              {/* Card FRONT representation */}
              <div 
                className={cn(
                  "absolute w-full h-full backface-hidden bg-white border border-slate-150/80 rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow",
                  cardStates[currentCard.id] === 'mastered' ? "border-emerald-250 ring-1 ring-emerald-50" :
                  cardStates[currentCard.id] === 'practice' ? "border-amber-250 ring-1 ring-amber-50" : ""
                )}
              >
                {/* Header indicators */}
                <div className="flex justify-between items-center text-[10px] font-extrabold tracking-wider uppercase">
                  <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{currentCard.category}</span>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Star size={11} className={cn(
                      currentCard.difficulty === 'easy' ? "text-slate-300" :
                      currentCard.difficulty === 'medium' ? "text-amber-500 fill-amber-500" : "text-red-500 fill-red-500"
                    )} />
                    <span className="text-[9px] font-black uppercase text-slate-400">{currentCard.difficulty}</span>
                  </div>
                </div>

                {/* Core Query */}
                <div className="my-auto space-y-3">
                  <span className="text-[9px] font-black tracking-widest text-slate-300/90 uppercase block">FORMULA PROMPT</span>
                  <p className="text-slate-400 font-bold text-xs sm:text-xs tracking-wide">{currentCard.titleMy}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug font-sans tracking-tight">
                    {currentCard.front}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-xs italic leading-relaxed">
                    "{currentCard.frontDesc}"
                  </p>
                </div>

                {/* Tip bar */}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400/90 border-t border-slate-50 pt-4">
                  <span className="inline-flex items-center gap-1">
                    <Info size={11} className="text-blue-500" />
                    နားလည်မှုစမ်းရန် နှိပ်ပါ။
                  </span>
                  <span>Tap to reveal solution • Card {activeIndex + 1}/{filteredCards.length}</span>
                </div>
              </div>

              {/* Card BACK representation (flipped) */}
              <div 
                className="absolute w-full h-full backface-hidden bg-slate-900 text-white border border-slate-850 rounded-[2rem] p-6 sm:p-10 flex flex-col justify-between shadow-2xl rotate-y-180"
              >
                {/* Header back */}
                <div className="flex justify-between items-center text-[10px] font-black tracking-wider uppercase text-slate-400">
                  <span className="text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded-md">{currentCard.title}</span>
                  <span>REVEALED FORMULA</span>
                </div>

                {/* Core Answer content */}
                <div className="my-auto space-y-4 text-center">
                  <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800/80 inline-block w-full">
                    <pre className="font-mono text-base sm:text-xl text-blue-400 font-extrabold tracking-tight whitespace-pre-wrap break-words leading-relaxed animate-pulse">
                      {currentCard.back}
                    </pre>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {currentCard.backEx}
                  </p>
                </div>

                {/* Footer back */}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 border-t border-slate-800/60 pt-4">
                  <span>Tap anywhere to study prompt again</span>
                  <div className="flex items-center gap-1 uppercase tracking-wider text-[9px]">
                    <RotateCw size={10} className="text-blue-400 rotate-180" />
                    <span>Double angle formula representation</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Selector Self Evaluation actions */}
          <div className="max-w-xl mx-auto space-y-4 pt-2">
            
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                className="p-3 bg-white border border-slate-100 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer select-none active:scale-90"
                title="Previous Card"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex-1 flex gap-2">
                <button
                  onClick={() => markCard(currentCard.id, 'practice')}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide cursor-pointer transition-all active:scale-[0.98] select-none text-slate-800 border bg-white",
                    cardStates[currentCard.id] === 'practice' 
                      ? "border-amber-300 bg-amber-500/10 text-amber-700" 
                      : "hover:bg-slate-50 border-slate-150"
                  )}
                >
                  <AlertCircle size={14} className="text-amber-500" />
                  Need Practice 🔄
                </button>

                <button
                  onClick={() => markCard(currentCard.id, 'mastered')}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide cursor-pointer transition-all active:scale-[0.98] select-none text-slate-800 border bg-white",
                    cardStates[currentCard.id] === 'mastered' 
                      ? "border-emerald-300 bg-emerald-500/15 text-emerald-700" 
                      : "hover:bg-slate-50 border-slate-150"
                  )}
                >
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Got It! 😄
                </button>
              </div>

              <button
                onClick={handleNext}
                className="p-3 bg-white border border-slate-100 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer select-none active:scale-90"
                title="Next Card"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Hint alert block */}
            <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-50 text-slate-700 flex gap-3 text-xs sm:text-xs leading-relaxed items-center">
              <span className="p-1 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                <GraduationCap size={15} />
              </span>
              <span>
                <strong>Study Hint:</strong> Try to write down the formula values or definitions on a piece of paper before clicking the card to flip and verify. Practice makes perfect mathematics!
              </span>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-12 text-center rounded-[2.5rem] border-2 border-dashed border-slate-100 bg-slate-50/20 max-w-xl mx-auto">
          <BookOpen className="text-slate-200 mx-auto mb-4" size={48} />
          <h3 className="font-extrabold text-slate-700 uppercase">No active cards found</h3>
          <p className="text-xs text-slate-400 font-medium">Try choosing a different topic filter above.</p>
        </div>
      )}

      {/* Adding CSS helper for perspective directly in-page so there are no raw external dependency issues */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

    </div>
  );
};

export default Flashcards;
