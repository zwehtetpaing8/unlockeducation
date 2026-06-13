import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, RotateCw, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, 
  BookOpen, RefreshCw, Star, Info, GraduationCap, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface Flashcard {
  id: string;
  category: string;
  title: string;
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
    title: 'Imaginary Unit $i$',
    front: 'What is the definition and value of the imaginary unit $i$?',
    frontDesc: 'Identify the key properties of the basic imaginary unit and its squared value.',
    back: '$$i = \\sqrt{-1}$$\n\n$$\\text{therefore } i^2 = -1$$',
    backEx: 'Example: $\\sqrt{-16} = \\sqrt{16} \\cdot \\sqrt{-1} = 4i$',
    difficulty: 'easy'
  },
  {
    id: 'c2',
    category: 'Complex Numbers',
    title: 'Polar Form of a Complex Number',
    front: 'How do you represent a complex number $z = a + bi$ in Polar Form?',
    frontDesc: 'Express utilizing modulus $r$ and argument$\\theta$.',
    back: '$$z = r(\\cos \\theta + i \\sin \\theta)$$',
    backEx: 'where $r = |z| = \\sqrt{a^2 + b^2}$ and $\\tan \\theta = \\frac{b}{a}$',
    difficulty: 'medium'
  },
  {
    id: 'c3',
    category: 'Complex Numbers',
    title: "De Moivre's Theorem",
    front: "What is De Moivre's Theorem for raising a complex number to a power $n$?",
    frontDesc: 'State the relation for raising a polar form complex number to an integer power $n$.',
    back: '$$[r(\\cos \\theta + i \\sin \\theta)]^n = r^n (\\cos n\\theta + i \\sin n\\theta)$$',
    backEx: 'This theorem makes finding exponents and roots of complex coordinates simple.',
    difficulty: 'hard'
  },
  {
    id: 'c4',
    category: 'Complex Numbers',
    title: "Euler's Formula",
    front: "What is Euler's formula connecting complex exponential representation with trigonometric functions?",
    frontDesc: 'Express the trigonometric relationship of $e^{i\\theta}$.',
    back: '$$e^{i\\theta} = \\cos \\theta + i \\sin \\theta$$',
    backEx: "Euler's Identity is derived by substituting $\\theta = \\pi$: $e^{i\\pi} + 1 = 0$.",
    difficulty: 'hard'
  },
  
  // 2. Calculus & Limits
  {
    id: 'l1',
    category: 'Calculus & Limits',
    title: 'Derivative of $\\ln(x)$',
    front: 'What is the derivative of $f(x) = \\ln(x)$ with respect to $x$?',
    frontDesc: 'Find the rate of change of the natural logarithmic function.',
    back: '$$\\frac{d}{dx}(\\ln x) = \\frac{1}{x}$$',
    backEx: 'Note: the formula requires the domain constraint of $x > 0$.',
    difficulty: 'easy'
  },
  {
    id: 'l2',
    category: 'Calculus & Limits',
    title: 'Product Rule for Derivatives',
    front: 'What is the derivative of the product of two functions, $\\frac{d}{dx}[u(x) \\cdot v(x)]$?',
    frontDesc: 'State the differentiation method for multiplied differentiable functions.',
    back: '$$\\frac{d}{dx}(u \\cdot v) = u \\frac{dv}{dx} + v \\frac{du}{dx}$$',
    backEx: 'Often written briefly in prime notation: $(uv)\' = u\'v + uv\'$',
    difficulty: 'medium'
  },
  {
    id: 'l3',
    category: 'Calculus & Limits',
    title: 'Quotient Rule for Derivatives',
    front: 'What is the formula to differentiate a division of two functions $\\frac{d}{dx} \\left[\\frac{u(x)}{v(x)}\\right]$?',
    frontDesc: 'Express the differentiation formula for quotients with a non-zero denominator $v(x)$.',
    back: '$$\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v \\frac{du}{dx} - u \\frac{dv}{dx}}{v^2}$$',
    backEx: 'Mnemonic: "Low d-high minus high d-low over the square of what\'s below"',
    difficulty: 'hard'
  },
  {
    id: 'l4',
    category: 'Calculus & Limits',
    title: 'Derivative of Trigonometric Functions',
    front: 'What are the derivatives of $\\sin(x)$ and $\\cos(x)$?',
    frontDesc: 'Recall the basic rate of change formulas for sine and cosine.',
    back: '$$\\frac{d}{dx}(\\sin x) = \\cos x$$\n\n$$\\frac{d}{dx}(\\cos x) = -\\sin x$$',
    backEx: 'Crucial: Observe the negative sign when differentiating the cosine function.',
    difficulty: 'easy'
  },

  // 3. Sequences & Series
  {
    id: 's1',
    category: 'Sequences & Series',
    title: 'n-th term of an Arithmetic Progression ($AP$)',
    front: 'What is the formula for the $n$-th term ($t_n$) of an Arithmetic Progression?',
    frontDesc: 'State the formula using first term $a$ and common difference $d$.',
    back: '$$t_n = a + (n - 1)d$$',
    backEx: 'where $a$ is the initiating value and $d$ is the constant difference.',
    difficulty: 'easy'
  },
  {
    id: 's2',
    category: 'Sequences & Series',
    title: 'Sum of n terms of a GP',
    front: 'What is the sum of the first $n$ terms ($S_n$) of a Geometric Progression?',
    frontDesc: 'Express the summations for conditions where ratio $r < 1$ or $r > 1$.',
    back: '$$S_n = \\frac{a(1 - r^n)}{1 - r} \\quad [\\text{when } |r| < 1]$$\n\n$$\\text{or}$$\n\n$$S_n = \\frac{a(r^n - 1)}{r - 1} \\quad [\\text{when } |r| > 1]$$',
    backEx: 'where $a$ is the first term and $r$ is the constant ratio ($r \\neq 1$).',
    difficulty: 'medium'
  },
  {
    id: 's3',
    category: 'Sequences & Series',
    title: 'Sum to Infinity of a Geometric Series',
    front: 'Under what condition does an infinite Geometric Series converge, and what is its sum $S_\\infty$?',
    frontDesc: 'State the limiting value equation as the index approaches infinity.',
    back: '$$S_\\infty = \\frac{a}{1 - r}$$',
    backEx: 'The infinite sum exists if and only if the absolute common ratio matches $|r| < 1$.',
    difficulty: 'medium'
  },

  // 4. Trigonometry
  {
    id: 't1',
    category: 'Trigonometry',
    title: 'Double Angle Identity: $\\sin(2\\theta)$',
    front: 'What is the double angle trigonometric expansion for $\\sin(2\\theta)$?',
    frontDesc: 'Represent the identity using product expressions of single angles.',
    back: '$$\\sin(2\\theta) = 2 \\sin \\theta \\cos \\theta$$',
    backEx: 'Example: if $\\sin \\theta = \\frac{3}{5}$ and $\\cos \\theta = \\frac{4}{5}$, then $\\sin(2\\theta) = \\frac{24}{25}$',
    difficulty: 'easy'
  },
  {
    id: 't2',
    category: 'Trigonometry',
    title: 'Double Angle Identity: $\\cos(2\\theta)$',
    front: 'What are the three common variations of the double angle formula for $\\cos(2\\theta)$?',
    frontDesc: 'List the variations in terms of cosine, sine, and both combined.',
    back: '$$\\cos(2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta$$\n\n$$\\cos(2\\theta) = 2\\cos^2 \\theta - 1$$\n\n$$\\cos(2\\theta) = 1 - 2\\sin^2 \\theta$$',
    backEx: 'Extremely useful for rewriting integrals and solving equations in Calculus.',
    difficulty: 'medium'
  }
];

const CATEGORIES = ['All Topics', 'Complex Numbers', 'Calculus & Limits', 'Sequences & Series', 'Trigonometry'];

interface CardProgressState {
  [cardId: string]: 'mastered' | 'practice' | null;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.9,
    rotateY: dir > 0 ? 45 : -45,
    z: -100
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    z: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 26 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
      rotateY: { type: "spring" as const, stiffness: 280, damping: 24 }
    }
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -320 : 320,
    opacity: 0,
    scale: 0.9,
    rotateY: dir > 0 ? -45 : 45,
    z: -100,
    transition: {
      x: { type: "spring" as const, stiffness: 320, damping: 26 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
      rotateY: { type: "spring" as const, stiffness: 280, damping: 24 }
    }
  })
};

const MarkdownRenderer: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  return (
    <div className={cn("markdown-body overflow-visible", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeRaw, [rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const Flashcards: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardStates, setCardStates] = useState<CardProgressState>({});
  const [direction, setDirection] = useState<number>(1); // 1 = right/next, -1 = left/prev
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Filter flashcards based on selected category
  const filteredCards = selectedCategory === 'All Topics' 
    ? FLASHCARDS 
    : FLASHCARDS.filter(card => card.category === selectedCategory);

  // Normalize index in case length changes
  const activeIndex = currentIndex >= filteredCards.length ? 0 : currentIndex;
  const currentCard = filteredCards[activeIndex];

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setTilt({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setTilt({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const markCard = (id: string, status: 'mastered' | 'practice') => {
    setCardStates(prev => ({
      ...prev,
      [id]: status
    }));
    // Auto advance after short delay
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const resetAllProgress = () => {
    setCardStates({});
    setCurrentIndex(0);
    setIsFlipped(false);
    setDirection(1);
    setTilt({ x: 0, y: 0 });
  };

  // interactive mouse-move depth tilt tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    if (isFlipped) {
      // Offset tilt calculations when flipped to match the flipped perspective properly
      const rotateY = -((x - xc) / xc) * 8;
      const rotateX = -((y - yc) / yc) * 8;
      setTilt({ x: rotateX, y: rotateY });
    } else {
      const rotateY = ((x - xc) / xc) * 8;
      const rotateX = -((y - yc) / yc) * 8;
      setTilt({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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
              MATH FLASHCARDS • STUDY DECKS
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Review and Master core theoretical principles, key formulas, and identities of Grade 12 Advanced Mathematics.
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
              setDirection(1);
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
          <div className="relative w-full max-w-xl mx-auto h-[23rem] sm:h-[26rem] perspective select-none">
            
            {/* Visual Depth Card Stack Layers underneath the active card */}
            <div className="absolute inset-x-8 bottom-0 h-4 bg-slate-300/30 rounded-b-[2.2rem] pointer-events-none transform translate-y-3.5 scale-[0.93] border-b border-r border-l border-slate-350/20 shadow-xs transition-transform duration-300 ease-out blur-[0.2px] -z-20 transform-gpu" />
            <div className="absolute inset-x-4 bottom-0 h-4 bg-slate-200/50 rounded-b-[2.2rem] pointer-events-none transform translate-y-2 scale-[0.965] border-b border-r border-l border-slate-250/30 shadow-xs transition-transform duration-300 ease-out blur-[0.1px] -z-10 transform-gpu" />

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentCard.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={(e, info) => {
                  const swipeThreshold = 80;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing preserve-3d touch-pan-y"
              >
                {/* 3D Flip & Interactive Hover Tilt Inner Card Element */}
                <motion.div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => {
                    // Check if clicked element or its parent is a button/link/interactive asset
                    const target = e.target as HTMLElement;
                    if (target.closest('button') || target.closest('a') || target.closest('.markdown-body select-all')) {
                      return;
                    }
                    setIsFlipped(!isFlipped);
                  }}
                  className="w-full h-full relative preserve-3d transition-shadow duration-300 rounded-[2.2rem]"
                  animate={{ 
                    rotateY: isFlipped ? 180 + tilt.y : tilt.y,
                    rotateX: tilt.x
                  }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                    mass: 0.8
                  }}
                >
                  
                  {/* Card FRONT representation (Mathematical Query) */}
                  <div 
                    className={cn(
                      "absolute inset-0 w-full h-full backface-hidden bg-white border border-slate-200 rounded-[2.2rem] p-6 sm:p-10 flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform-gpu",
                      cardStates[currentCard.id] === 'mastered' ? "border-emerald-300 ring-1 ring-emerald-100 bg-emerald-50/5" :
                      cardStates[currentCard.id] === 'practice' ? "border-amber-300 ring-1 ring-amber-100 bg-amber-50/5" : ""
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
                    <div className="my-auto space-y-4 overflow-y-auto max-h-[14rem] sm:max-h-[16rem] pr-2 custom-scrollbar">
                      <span className="text-[9px] font-black tracking-widest text-slate-300/90 uppercase block font-mono">FORMULA PROMPT</span>
                      <div className="text-slate-400 font-extrabold text-sm sm:text-base tracking-tight">
                        <MarkdownRenderer content={currentCard.title} />
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-slate-800 leading-snug tracking-tight">
                        <MarkdownRenderer content={currentCard.front} />
                      </div>
                      <div className="text-slate-500 text-xs sm:text-xs italic leading-relaxed">
                        <MarkdownRenderer content={`"${currentCard.frontDesc}"`} />
                      </div>
                    </div>

                    {/* Tip bar */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400/90 border-t border-slate-50 pt-4 shrink-0">
                      <span className="inline-flex items-center gap-1">
                        <Info size={11} className="text-blue-500" />
                        Tap card or press Space to reveal.
                      </span>
                      <span>Card {activeIndex + 1}/{filteredCards.length}</span>
                    </div>
                  </div>

                  {/* Card BACK representation (Answer / Mathematical Formula) */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden bg-slate-900 text-white border border-slate-800 rounded-[2.2rem] p-6 sm:p-10 flex flex-col justify-between shadow-2xl rotate-y-180 transform-gpu"
                  >
                    {/* Header back */}
                    <div className="flex justify-between items-center text-[10px] font-black tracking-wider uppercase text-slate-400 shrink-0">
                      <span className="text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded-md">
                        <MarkdownRenderer content={currentCard.title} className="inline !text-blue-400 text-[10px] [&_p]:m-0" />
                      </span>
                      <span>REVEALED FORMULA</span>
                    </div>

                    {/* Core Answer content */}
                    <div className="my-auto space-y-4 text-center overflow-y-auto max-h-[14rem] sm:max-h-[16rem] pr-2 custom-scrollbar">
                      <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800/80 inline-block w-full">
                        <div className="text-base sm:text-xl text-blue-400 font-extrabold tracking-tight leading-relaxed">
                          <MarkdownRenderer content={currentCard.back} className="!text-blue-400 select-all" />
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 font-bold bg-slate-950/40 border border-slate-800/50 p-2.5 rounded-xl text-left">
                        <MarkdownRenderer content={currentCard.backEx} className="!text-slate-400" />
                      </div>
                    </div>

                    {/* Footer back */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 border-t border-slate-800/60 pt-4 shrink-0">
                      <span>Click anywhere to show question</span>
                      <div className="flex items-center gap-1 uppercase tracking-wider text-[9px]">
                        <RotateCw size={10} className="text-blue-400 rotate-180 animate-pulse" />
                        <span>Active Review</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            </AnimatePresence>
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
                      ? "border-emerald-300 bg-emerald-50/15 text-emerald-700" 
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
                <strong>Study Hint:</strong> Drag cards left/right to swipe fast! Try to draft the formula on a scratchpad or solve it in your head before flipping the card.
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
          perspective: 1500px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: rotateX(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>

    </div>
  );
};

export default Flashcards;
