import { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { chapters } from '../data/chapters';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  HelpCircle,
  Hash,
  Activity,
  Award,
  Zap,
  Layers,
  ChevronRight,
  Brain,
  Facebook,
  Send,
  PlayCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import Latex from './Latex';

interface HomeViewProps {
  onSelectChapter: (id: number) => void;
  onNavigateToFormulas: () => void;
}

export default function HomeView({ onSelectChapter, onNavigateToFormulas }: HomeViewProps) {
  // Retrieve last accessed chapter
  const [lastAccessedChapterId] = useState<number | null>(() => {
    const saved = localStorage.getItem('unlock_edu_selectedChapterId');
    return saved ? parseInt(saved, 10) : null;
  });

  const lastChapter = lastAccessedChapterId ? chapters.find(ch => ch.id === lastAccessedChapterId) : null;

  // Retrieve recent quizzes
  const [recentQuizzes, setRecentQuizzes] = useState<{chapterId: number, chapterTitle: string, score: number, total: number, date: string}[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('unlock_edu_recentQuizzes');
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | undefined;
    
    import('../lib/firebase').then(({ auth, db }) => {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        import('firebase/firestore').then(({ collection, query, where, orderBy, limit, onSnapshot }) => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const q = query(
                collection(db, "quizHistory"),
                where("userId", "==", user.uid),
                orderBy("date", "desc"),
                limit(3)
              );
              unsubscribeFirestore = onSnapshot(q, (snapshot) => {
                const quizzes = snapshot.docs.map(doc => {
                  const data = doc.data();
                  return {
                    chapterId: data.chapterId,
                    chapterTitle: data.chapterTitle,
                    score: data.score,
                    total: data.total,
                    date: data.date
                  };
                });
                if (quizzes.length > 0) {
                  setRecentQuizzes(quizzes);
                }
              });
            } else {
              if (unsubscribeFirestore) {
                unsubscribeFirestore();
              }
              try {
                const saved = localStorage.getItem('unlock_edu_recentQuizzes');
                if (saved) setRecentQuizzes(JSON.parse(saved));
              } catch (e) {}
            }
          });
        });
      });
    });

    return () => {
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  // Solver widget state
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-2);
  const [c, setC] = useState<number>(5);

  // Calculate roots step-by-step
  const calculateQuadraticSteps = () => {
    if (a === 0) {
      if (b === 0) {
        return {
          equation: `0 = ${c}`,
          status: 'invalid',
          steps: `If $a = 0$ and $b = 0$, the equation $0x^2 + 0x + ${c} = 0$ is invalid or has no variables.`
        };
      }
      const root = -c / b;
      return {
        equation: `${b}x + ${c} = 0`,
        status: 'linear',
        steps: `This is a linear equation because $a = 0$.\n\n**Step 1:** Rearrange the equation:\n$$${b}x = -${c}$$\n\n**Step 2:** Divide both sides by $b = ${b}$:\n$$x = \\frac{-${c}}{${b}} = ${root.toFixed(3)}$$\n\nRoot: $x = ${root.toFixed(3)}$`
      };
    }

    const D = b * b - 4 * a * c;
    const absD = Math.abs(D);
    const sqrtAbsD = Math.sqrt(absD);
    const realPart = -b / (2 * a);

    const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    const eqStr = `${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b === 0 ? '' : bSign + 'x'} ${c === 0 ? '' : cSign} = 0`;

    let steps = `**Step 1: Identify coefficients**\n- $a = ${a}$\n- $b = ${b}$\n- $c = ${c}$\n\n`;
    steps += `**Step 2: Calculate the discriminant $D$**\n$$D = b^2 - 4ac = (${b})^2 - 4(${a})(${c})$$\n$$D = ${b * b} - ${4 * a * c} = ${D}$$\n\n`;

    if (D > 0) {
      const r1 = (-b + Math.sqrt(D)) / (2 * a);
      const r2 = (-b - Math.sqrt(D)) / (2 * a);
      steps += `Since $D > 0$, the equation has **two distinct real roots**.\n\n`;
      steps += `**Step 3: Apply the quadratic formula**\n$$x = \\frac{-b \\pm \\sqrt{D}}{2a}$$\n$$x = \\frac{-(${b}) \\pm \\sqrt{${D}}}{2(${a})}$$\n$$x = \\frac{${-b} \\pm ${sqrtAbsD.toFixed(3)}}{${2 * a}}$$\n\n`;
      steps += `Therefore, the solutions are:\n- $x_1 = \\frac{${-b} + ${sqrtAbsD.toFixed(3)}}{${2 * a}} = ${r1.toFixed(3)}$\n- $x_2 = \\frac{${-b} - ${sqrtAbsD.toFixed(3)}}{${2 * a}} = ${r2.toFixed(3)}$`;
    } else if (D === 0) {
      steps += `Since $D = 0$, the equation has **one repeated real root** (double root).\n\n`;
      steps += `**Step 3: Apply the quadratic formula**\n$$x = \\frac{-b}{2a}$$\n$$x = \\frac{-(${b})}{2(${a})} = ${realPart.toFixed(3)}$$\n\n`;
      steps += `Therefore, the root is:\n- $x = ${realPart.toFixed(3)}$`;
    } else {
      const imagPart = sqrtAbsD / (2 * a);
      steps += `Since $D < 0$, the equation has **two complex conjugate roots**.\n\n`;
      steps += `**Step 3: Introduce the imaginary unit $i = \\sqrt{-1}$**\n$$x = \\frac{-b \\pm \\sqrt{${D}}}{2a} = \\frac{-b \\pm \\sqrt{${absD}}i}{2a}$$\n$$x = \\frac{-(${b}) \\pm ${sqrtAbsD.toFixed(3)}i}{2(${a})}$$\n\n`;
      steps += `Therefore, the complex solutions are:\n- $x_1 = ${realPart.toFixed(3)} + ${Math.abs(imagPart).toFixed(3)}i$\n- $x_2 = ${realPart.toFixed(3)} - ${Math.abs(imagPart).toFixed(3)}i$`;
    }

    return {
      equation: eqStr,
      status: D >= 0 ? 'real' : 'complex',
      steps
    };
  };

  const solverResult = calculateQuadraticSteps();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-16"
    >
      {/* 1. Hero Welcoming Banner with Elegant Design */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white p-6 md:p-10 shadow-xl shadow-indigo-500/10"
      >
        {/* Abstract decoration graphics */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-12 w-48 h-48 rounded-full bg-indigo-500/15 blur-xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-indigo-100 border border-white/10 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            Unlock Education Learning Portal
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-none">
              Explore the Beauty of Mathematics
            </h1>
            <p className="text-sm md:text-base text-indigo-100/90 leading-relaxed font-sans max-w-2xl">
              An immersive academic study guide built specifically for Unlock Education students. Master 11 core chapters with beautifully typeset LaTeX formula sheets, interactive practice quizzes, and real-time visualization tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => onSelectChapter(1)}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-indigo-700 px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <BookOpen className="w-4 h-4" />
              Start Studying Syllabus
            </button>
            <button
              onClick={onNavigateToFormulas}
              className="flex items-center justify-center gap-2 bg-indigo-600/50 hover:bg-indigo-600/70 border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all cursor-pointer backdrop-blur-sm"
            >
              <Calculator className="w-4 h-4" />
              Formula Registry
            </button>
          </div>
        </div>
      </motion.div>

      {/* Continue Learning Section (Dynamic) */}
      {lastChapter && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/60 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl text-indigo-600 dark:text-indigo-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                Continue Learning
              </div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                Chapter {lastChapter.id}: {lastChapter.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => onSelectChapter(lastChapter.id)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
          >
            <PlayCircle className="w-4 h-4" />
            Resume Chapter
          </button>
        </motion.div>
      )}

      {/* Recent Activity Section */}
      {recentQuizzes.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Recent Activity
            </h2>
            <p className="text-xs text-slate-500 font-medium">Your last {recentQuizzes.length} quiz scores</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentQuizzes.map((quiz, idx) => (
              <div
                key={idx}
                onClick={() => onSelectChapter(quiz.chapterId)}
                className="group bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1 mb-4">
                  <div className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/10 w-fit">
                    MODULE {quiz.chapterId}
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {quiz.chapterTitle}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Score: {quiz.score}/{quiz.total}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    {new Date(quiz.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. Platform Interactive Statistics Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">11</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Core Chapters</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">100+</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">LaTeX Formulas</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-amber-600 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">110+</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Quiz Challenges</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl text-violet-600 dark:text-violet-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold font-display text-slate-950 dark:text-white">10</div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">Live Visualizers</div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Interactive Section: Quadratic Solver & Feature Highlight */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left column: Feature Spotlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              Portal Highlights
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Why study math with this interactive portal?
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900/40 p-4.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex gap-3 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-950/40 transition">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                i
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Beautiful Math Formula Sheets</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Every mathematical definition and proof is styled using real KaTeX code. You can copy the LaTeX text of any formula for your assignments!
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 p-4.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex gap-3 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-950/40 transition">
              <div className="p-2.5 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center font-bold">
                f(x)
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Active Mathematical Visualizers</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Interactive graphs, vector coordinate additions, Argand diagram grids, and conic section plots respond directly to your variables.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 p-4.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/30 flex gap-3 shadow-sm hover:border-indigo-100 dark:hover:border-indigo-950/40 transition">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Interactive Assessment Quizzes</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Practice questions compiled directly from textbook chapters. Enter answers to get immediate marks, scores, and step-by-step mathematical solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Complex Quadratic Equation Solver */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 p-5 rounded-3xl shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-950 dark:text-white">Interactive Learning Tool</h3>
                <p className="text-[10px] text-slate-400 font-medium">Complex & Real Quadratic Roots Solver</p>
              </div>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              solverResult.status === 'complex' 
                ? 'bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400'
                : 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
            }`}>
              {solverResult.status.toUpperCase()} ROOTS
            </span>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] text-slate-500 leading-relaxed font-sans">
              <Latex text="Enter real numbers for coefficients $a, b, c$ to solve the quadratic equation $ax^2 + bx + c = 0$. See how imaginary unit $i$ is introduced when the discriminant $D < 0$!" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <Latex text="Coeff $a$" />
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold font-mono focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <Latex text="Coeff $b$" />
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold font-mono focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  <Latex text="Coeff $c$" />
                </label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold font-mono focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-center font-serif text-sm md:text-base font-bold text-indigo-700 dark:text-indigo-400">
              <Latex text={`$$${solverResult.equation}$$`} block={false} />
            </div>

            {/* Display solution steps */}
            <div className="p-4 bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/30 dark:border-indigo-900/10 rounded-2xl max-h-[220px] overflow-y-auto custom-scroll shadow-inner">
              <Latex text={solverResult.steps} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Complete 11 Chapter Syllabus Grid Navigator */}
      <motion.div
        variants={containerVariants}
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Unlock Education Learning modules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Click any core chapter card below to jump directly to its textbook, interactive visualizer, formulas, and quizzes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map((ch, idx) => (
            <motion.button
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 p-5 rounded-2xl text-left hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px]"
            >
              {/* Card top elements */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/10">
                    MODULE {ch.id}
                  </span>
                  
                  {/* Subtle index tag or dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-500 transition-colors" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xs md:text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                    {ch.title}
                  </h3>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 leading-tight">
                    {ch.tagline.replace(/\$/g, '')}
                  </p>
                </div>
              </div>

              {/* Card bottom footer */}
              <div className="pt-3 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors w-full">
                <span className="uppercase tracking-wide font-medium flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {ch.quiz.length} QUIZ QUESTIONS
                </span>
                <span className="flex items-center gap-1">
                  Learn Module
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 5. Community & Updates Section */}
      <motion.div
        variants={itemVariants}
        className="space-y-4 pt-4"
      >
        <div className="space-y-1">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Our Community Updates
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Stay connected with Unlock Education for the latest announcements, updates, and learning tips.
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 flex justify-center shadow-sm">
          <div className="w-full max-w-[500px] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 overflow-hidden">
            {/* Facebook Card Header Cover */}
            <div className="h-24 md:h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>
            
            {/* Facebook Card Content */}
            <div className="px-6 pb-6 pt-3 relative">
              {/* Profile Picture & Title */}
              <div className="flex flex-col items-center -mt-12 md:-mt-16 mb-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-900 rounded-full p-1.5 shadow-md relative z-10">
                  <div className="w-full h-full bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <GraduationCap className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white mt-3">
                  Unlock Education
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">@UnlockEducation25</p>
              </div>
              
              <p className="text-sm text-center text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Join our Facebook community for daily study materials, tips, and live Q&A sessions for Grade 12 students.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://www.facebook.com/UnlockEducation25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-500/20"
                >
                  <Facebook className="w-4 h-4" />
                  Follow Page
                </a>
                <a 
                  href="https://t.me/UnlockEducation25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
