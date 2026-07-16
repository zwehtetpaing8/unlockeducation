import React from 'react';
import katex from 'katex';
import { 
  HelpCircle, 
  AlertCircle, 
  Info, 
  Star, 
  BookOpen, 
  GraduationCap, 
  ChevronRight, 
  Activity, 
  Sparkles, 
  Compass, 
  CheckCircle2,
  Calendar,
  Layers,
  Check,
  Users,
  User,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface LatexProps {
  text: string;
  block?: boolean;
}

// -----------------------------------------------------------------
// Beautiful inline vector diagrams matching Chapter 1 book visuals
// -----------------------------------------------------------------

function MathematicianTimeline() {
  const timeline = [
    { year: "1545", name: "Cardano", desc: "Negative square roots appeared while solving cubic equations." },
    { year: "1572", name: "Bombelli", desc: "He wrote practical rules for calculating with these strange quantities." },
    { year: "1637", name: "Descartes", desc: "He used the word 'imaginary' because such roots looked impossible." },
    { year: "1748", name: "Euler", desc: "He made i powerful by connecting complex numbers with trigonometry." },
    { year: "1806", name: "Argand", desc: "He drew complex numbers as points on a plane." },
    { year: "1831", name: "Gauss", desc: "He helped make the notation a + bi standard and accepted." }
  ];

  return (
    <div className="my-6 p-3.5 sm:p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-1.5 font-display">
        <Activity className="w-4 h-4 text-indigo-500" /> Historical Timeline of Complex Numbers
      </h4>
      <div className="relative pl-6 border-l-2 border-indigo-100 dark:border-indigo-900/60 space-y-5">
        {timeline.map((t, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-900 shadow-sm group-hover:scale-110 transition-transform" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100/40 dark:border-indigo-900/20">{t.year}</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm font-display">{t.name}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArgandPolar() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="240" height="240" className="overflow-visible" viewBox="0 0 240 240">
        {/* Grid lines */}
        <line x1="20" y1="120" x2="220" y2="120" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" className="dark:stroke-slate-700" />
        <line x1="120" y1="20" x2="120" y2="220" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" className="dark:stroke-slate-700" />
        {/* Axes */}
        <line x1="10" y1="120" x2="230" y2="120" stroke="#64748b" strokeWidth="1.5" markerStart="url(#arrow-p)" markerEnd="url(#arrow-p)" className="dark:stroke-slate-400" />
        <line x1="120" y1="230" x2="120" y2="10" stroke="#64748b" strokeWidth="1.5" markerStart="url(#arrow-p)" markerEnd="url(#arrow-p)" className="dark:stroke-slate-400" />
        {/* Axis Labels */}
        <text x="235" y="124" className="text-[10px] font-mono fill-slate-500 dark:fill-slate-400 font-bold">Re</text>
        <text x="120" y="5" className="text-[10px] font-mono fill-slate-500 dark:fill-slate-400 font-bold" textAnchor="middle">Im</text>
        
        {/* Vector line to P(x,y) */}
        <line x1="120" y1="120" x2="185" y2="55" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrow-vector)" />
        {/* Dashed drop-downs */}
        <line x1="185" y1="55" x2="185" y2="120" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="185" y1="55" x2="120" y2="55" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Angle Arc */}
        <path d="M 140 120 A 20 20 0 0 0 134 106" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber-polar)" />
        <text x="144" y="112" className="text-xs font-serif italic fill-amber-500 font-bold">θ</text>

        {/* Origin Label */}
        <text x="104" y="134" className="text-xs fill-slate-500 italic font-serif">O</text>

        {/* Labels for coordinates */}
        <text x="185" y="132" className="text-[10px] fill-slate-500 font-mono" textAnchor="middle">x</text>
        <text x="110" y="59" className="text-[10px] fill-slate-500 font-mono" textAnchor="middle">y</text>

        {/* Radial line label */}
        <text x="146" y="82" className="text-xs fill-indigo-500 font-bold italic font-serif">r</text>

        {/* Plot Point P(x, y) */}
        <circle cx="185" cy="55" r="5" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
        <text x="193" y="52" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200 font-sans">z = x + yi = r(cos θ + i sin θ)</text>
        
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b" />
          </marker>
          <marker id="arrow-vector" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-polar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 italic font-sans">Geometric representation of the Polar / Trigonometric form z = r(cos θ + i sin θ)</span>
    </div>
  );
}

function ArgandExample5a() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (a) z = 1 + √3i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5a)" markerEnd="url(#arrow-axis-5a)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5a)" markerEnd="url(#arrow-axis-5a)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="155" y2="32" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-5a)" />
        <circle cx="155" cy="32" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 120 93" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-5a)" />
        <text x="136" y="100" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="162" y="28" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = 1 + √3i</text>
        <text x="140" y="76" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-5a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-5a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandExample5b() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (b) z = -1 + i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5b)" markerEnd="url(#arrow-axis-5b)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5b)" markerEnd="url(#arrow-axis-5b)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="65" y2="65" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-5b)" />
        <circle cx="65" cy="65" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 96 96" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-5b)" />
        <text x="115" y="82" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="32" y="58" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -1 + i</text>
        <text x="90" y="72" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-5b" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-5b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-5b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandExample5c() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (c) z = -√3 - i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5c)" markerEnd="url(#arrow-axis-5c)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5c)" markerEnd="url(#arrow-axis-5c)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="65" y2="135" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-5c)" />
        <circle cx="65" cy="135" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 93 120" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-5c)" />
        <text x="118" y="142" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="20" y="155" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -√3 - i</text>
        <text x="78" y="122" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-5c" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-5c" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-5c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandExample5d() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (d) z = -1</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5d)" markerEnd="url(#arrow-axis-5d)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-5d)" markerEnd="url(#arrow-axis-5d)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="50" y2="110" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrow-vector-5d)" />
        <circle cx="50" cy="110" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 90 110" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-5d)" />
        <text x="102" y="80" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="25" y="125" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -1</text>
        <text x="80" y="130" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-5d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-5d" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-5d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_4_1a() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (a) z = 1 - √3i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1a)" markerEnd="url(#arrow-axis-1a)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1a)" markerEnd="url(#arrow-axis-1a)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="155" y2="188" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1a)" />
        <circle cx="155" cy="188" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 120 127" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1a)" />
        <text x="142" y="123" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="162" y="195" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = 1 - √3i</text>
        <text x="148" y="145" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_4_1b() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (b) z = -√2 + √2i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1b)" markerEnd="url(#arrow-axis-1b)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1b)" markerEnd="url(#arrow-axis-1b)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="65" y2="65" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1b)" />
        <circle cx="65" cy="65" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 96 96" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1b)" />
        <text x="126" y="85" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="25" y="55" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -√2 + √2i</text>
        <text x="95" y="75" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1b" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_4_1c() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (c) z = -2 - 2i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1c)" markerEnd="url(#arrow-axis-1c)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1c)" markerEnd="url(#arrow-axis-1c)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="65" y2="155" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1c)" />
        <circle cx="65" cy="155" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 96 124" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1c)" />
        <text x="125" y="135" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="25" y="172" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -2 - 2i</text>
        <text x="72" y="128" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1c" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1c" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_4_1d() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (d) z = √3 - i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1d)" markerEnd="url(#arrow-axis-1d)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1d)" markerEnd="url(#arrow-axis-1d)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="188" y2="155" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1d)" />
        <circle cx="188" cy="155" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 127 120" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1d)" />
        <text x="142" y="120" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="155" y="175" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = √3 - i</text>
        <text x="140" y="142" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1d" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_4_1e() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (e) z = i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1e)" markerEnd="url(#arrow-axis-1e)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1e)" markerEnd="url(#arrow-axis-1e)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="110" y2="50" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1e)" />
        <circle cx="110" cy="50" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 110 90" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1e)" />
        <text x="126" y="85" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="120" y="45" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = i</text>
        <text x="92" y="75" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1e" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1e" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_4_1f() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for (f) z = -3i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1f)" markerEnd="url(#arrow-axis-1f)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1f)" markerEnd="url(#arrow-axis-1f)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="110" y2="180" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1f)" />
        <circle cx="110" cy="180" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 110 130" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1f)" />
        <text x="126" y="142" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="120" y="185" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -3i</text>
        <text x="92" y="140" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1f" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1f" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function RootsUnity6() {
  const angles = [0, 60, 120, 180, 240, 300];
  const coordinates = [
    { label: "w₀ = 1", x: 184, y: 113, align: "start" },
    { label: "w₁ = 1/2 + i√3/2", x: 148, y: 44, align: "start" },
    { label: "w₂ = -1/2 + i√3/2", x: 72, y: 44, align: "end" },
    { label: "w₃ = -1", x: 36, y: 113, align: "end" },
    { label: "w₄ = -1/2 - i√3/2", x: 72, y: 182, align: "end" },
    { label: "w₅ = 1/2 - i√3/2", x: 148, y: 182, align: "start" }
  ];

  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Example 11: 6th Roots of Unity on the Coordinate Plane</h5>
      <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible">
        {/* Axes */}
        <line x1="20" y1="110" x2="200" y2="110" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="110" y1="20" x2="110" y2="200" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Unit Circle */}
        <circle cx="110" cy="110" r="70" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Hexagon shape lines */}
        <polygon points="180,110 145,49.4 75,49.4 40,110 75,170.6 145,170.6" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1.5" />
        
        {/* Roots points */}
        {angles.map((ang, i) => {
          const rad = (ang * Math.PI) / 180;
          const cx = 110 + 70 * Math.cos(rad);
          const cy = 110 - 70 * Math.sin(rad);
          return (
            <g key={i}>
              <line x1="110" y1="110" x2={cx} y2={cy} stroke="#a5b4fc" strokeWidth="1" />
              <circle cx={cx} cy={cy} r="4" className="fill-indigo-600 stroke-white" strokeWidth="1" />
            </g>
          );
        })}

        {/* Labels */}
        {coordinates.map((coord, i) => (
          <text 
            key={i} 
            x={coord.x} 
            y={coord.y} 
            className="text-[9px] font-semibold font-mono fill-slate-700 dark:fill-slate-300"
            textAnchor={coord.align === "start" ? "start" : "end"}
          >
            {coord.label}
          </text>
        ))}

        <text x="205" y="114" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="110" y="15" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">Im</text>
        <text x="100" y="120" className="text-[9px] fill-slate-400">O</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 italic font-sans text-center">Symmetric distribution of the 6 roots of z^6 = 1 on the complex unit circle forming a regular hexagon.</span>
    </div>
  );
}

function ArgandEx1_5_1a() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for 1.(a) z = 1 + √3i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5a)" markerEnd="url(#arrow-axis-1_5a)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5a)" markerEnd="url(#arrow-axis-1_5a)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="147.5" y2="45" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1_5a)" />
        <circle cx="147.5" cy="45" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 120 92.7" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1_5a)" />
        <text x="126" y="95" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="152" y="38" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = 1 + √3i</text>
        <text x="136" y="85" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1_5a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1_5a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1_5a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_5_1b() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for 1.(b) z = i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5b)" markerEnd="url(#arrow-axis-1_5b)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5b)" markerEnd="url(#arrow-axis-1_5b)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="110" y2="40" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1_5b)" />
        <circle cx="110" cy="40" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 110 90" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1_5b)" />
        <text x="126" y="95" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="115" y="30" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = i</text>
        <text x="118" y="75" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1_5b" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1_5b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1_5b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_5_1c() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for 1.(c) z = -√3 + i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5c)" markerEnd="url(#arrow-axis-1_5c)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5c)" markerEnd="url(#arrow-axis-1_5c)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="45" y2="72.5" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1_5c)" />
        <circle cx="45" cy="72.5" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 0 92.7 100" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1_5c)" />
        <text x="115" y="85" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="30" y="55" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -√3 + i</text>
        <text x="80" y="80" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="124" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1_5c" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1_5c" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1_5c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_5_1d() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for 1.(d) z = -1 - √3i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5d)" markerEnd="url(#arrow-axis-1_5d)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5d)" markerEnd="url(#arrow-axis-1_5d)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="72.5" y2="175" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1_5d)" />
        <circle cx="72.5" cy="175" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 100 127.3" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1_5d)" />
        <text x="112" y="142" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="50" y="190" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -1 - √3i</text>
        <text x="85" y="145" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="116" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1_5d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1_5d" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1_5d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_5_1e() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for 1.(e) z = -i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5e)" markerEnd="url(#arrow-axis-1_5e)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5e)" markerEnd="url(#arrow-axis-1_5e)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="110" y2="180" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1_5e)" />
        <circle cx="110" cy="180" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 110 130" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1_5e)" />
        <text x="126" y="125" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="115" y="195" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = -i</text>
        <text x="118" y="145" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1_5e" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1_5e" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1_5e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ArgandEx1_5_1f() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Argand Diagram for 1.(f) z = √3 - i</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="10" y1="110" x2="210" y2="110" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5f)" markerEnd="url(#arrow-axis-1_5f)" />
        <line x1="110" y1="210" x2="110" y2="10" stroke="#94a3b8" strokeWidth="1.2" markerStart="url(#arrow-axis-1_5f)" markerEnd="url(#arrow-axis-1_5f)" />
        
        {/* Draw Vector */}
        <line x1="110" y1="110" x2="175" y2="147.5" stroke="#6366f1" strokeWidth="2.2" markerEnd="url(#arrow-vector-1_5f)" />
        <circle cx="175" cy="147.5" r="4.5" className="fill-indigo-500 stroke-white" strokeWidth="1.5" />
        
        {/* Labeled angles */}
        <path d="M 130 110 A 20 20 0 0 1 127.3 120" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber-1_5f)" />
        <text x="142" y="120" className="text-xs font-semibold fill-amber-500 font-mono">θ</text>
        
        <text x="155" y="165" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = √3 - i</text>
        <text x="140" y="142" className="text-xs fill-indigo-500 font-bold font-mono">r</text>
        
        <text x="210" y="118" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="115" y="15" className="text-[9px] font-mono fill-slate-400">Im</text>
        <text x="98" y="102" className="text-[10px] fill-slate-400">O</text>
        
        <defs>
          <marker id="arrow-axis-1_5f" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-vector-1_5f" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber-1_5f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#f59e0b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function RootsEx1_5_3a() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Equation z⁴ = -i Roots (distributed at 90° intervals)</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="15" y1="110" x2="205" y2="110" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="110" y1="15" x2="110" y2="205" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Circle of radius 60px */}
        <circle cx="110" cy="110" r="60" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Draw square vertex roots (rotated by -22.5 deg) */}
        <polygon points="165.4,133 133,54.6 54.6,87 87,165.4" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1.5" />

        <circle cx="165.4" cy="133" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="133" cy="54.6" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="54.6" cy="87" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="87" cy="165.4" r="4" className="fill-indigo-600 stroke-white" />

        {/* Labels for roots */}
        <text x="172" y="136" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₀</text>
        <text x="138" y="48" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₁</text>
        <text x="46" y="83" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₂</text>
        <text x="78" y="172" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₃</text>

        <text x="210" y="114" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="110" y="12" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Four roots of z⁴ = -i forming a square rotated by -22.5° on the complex unit circle.</span>
    </div>
  );
}

function RootsEx1_5_3b() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Equation z⁴ = -1 Roots</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="15" y1="110" x2="205" y2="110" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="110" y1="15" x2="110" y2="205" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Circle of radius 60px */}
        <circle cx="110" cy="110" r="60" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Draw square vertex roots (rotated by 45 deg) */}
        <polygon points="152.4,67.6 67.6,67.6 67.6,152.4 152.4,152.4" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1.5" />

        <circle cx="152.4" cy="67.6" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="67.6" cy="67.6" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="67.6" cy="152.4" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="152.4" cy="152.4" r="4" className="fill-indigo-600 stroke-white" />

        {/* Labels for roots with Cartesian coordinates */}
        <text x="158" y="63" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₀ (√2/2, √2/2)</text>
        <text x="62" y="63" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₁ (-√2/2, √2/2)</text>
        <text x="62" y="162" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₂ (-√2/2, -√2/2)</text>
        <text x="158" y="162" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₃ (√2/2, -√2/2)</text>

        <text x="210" y="114" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="110" y="12" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Four roots of z⁴ = -1 forming an inscribed square rotated by 45° on the unit circle.</span>
    </div>
  );
}

function RootsEx1_5_3c() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Equation z⁴ = -8 - 8√3i Roots</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="15" y1="110" x2="205" y2="110" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="110" y1="15" x2="110" y2="205" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Circle of radius 60px */}
        <circle cx="110" cy="110" r="60" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Draw square vertex roots (rotated by -30 deg) */}
        <polygon points="162,140 140,58 58,80 80,162" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1.5" />

        <circle cx="162" cy="140" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="140" cy="58" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="58" cy="80" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="80" cy="162" r="4" className="fill-indigo-600 stroke-white" />

        {/* Labels for roots with exact values */}
        <text x="168" y="145" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₀ (√3, -1)</text>
        <text x="144" y="52" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₁ (1, √3)</text>
        <text x="50" y="75" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₂ (-√3, 1)</text>
        <text x="74" y="172" className="text-[9px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₃ (-1, -√3)</text>

        <text x="210" y="114" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="110" y="12" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Four roots of z⁴ = -8 - 8√3i on a circle of radius r = 2.</span>
    </div>
  );
}

function RootsEx1_5_3d() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Equation z⁶ = -1 Roots</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="15" y1="110" x2="205" y2="110" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="110" y1="15" x2="110" y2="205" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Circle of radius 60px */}
        <circle cx="110" cy="110" r="60" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Draw hexagon vertex roots (rotated by 30 deg) */}
        <polygon points="162,80 110,50 58,80 58,140 110,170 162,140" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1.5" />

        <circle cx="162" cy="80" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="110" cy="50" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="58" cy="80" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="58" cy="140" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="110" cy="170" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="162" cy="140" r="4" className="fill-indigo-600 stroke-white" />

        {/* Labels for roots */}
        <text x="168" y="75" className="text-[8px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₀ (√3/2, 1/2)</text>
        <text x="110" y="42" className="text-[8px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="middle">w₁ (0, 1)</text>
        <text x="52" y="75" className="text-[8px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₂ (-√3/2, 1/2)</text>
        <text x="52" y="145" className="text-[8px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₃ (-√3/2, -1/2)</text>
        <text x="110" y="181" className="text-[8px] font-mono font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="middle">w₄ (0, -1)</text>
        <text x="168" y="145" className="text-[8px] font-mono font-semibold fill-slate-700 dark:fill-slate-300">w₅ (√3/2, -1/2)</text>

        <text x="210" y="114" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="110" y="12" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">Im</text>
        <text x="98" y="124" className="text-[10px] fill-slate-400">O</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Six roots of z⁶ = -1 forming an inscribed regular hexagon rotated by 30° on the unit circle.</span>
    </div>
  );
}

function RootsExample10() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Example 10: Cube Roots of z = -2 - 2i</h5>
      <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible">
        <line x1="20" y1="120" x2="220" y2="120" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="120" y1="20" x2="120" y2="220" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Draw original point z = -2-2i */}
        <line x1="120" y1="120" x2="60" y2="180" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="60" cy="180" r="5" className="fill-red-500 stroke-white" strokeWidth="1.5" />
        <text x="50" y="195" className="text-[10px] font-bold fill-red-500">z = -2 - 2i</text>
        
        {/* Circle of radius √2 ~ 42px */}
        <circle cx="120" cy="120" r="42" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Root 0: 1 - i  (x=30px, y=-30px from origin) -> cx=150, cy=150 */}
        <line x1="120" y1="120" x2="150" y2="150" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="4" className="fill-indigo-600 stroke-white" strokeWidth="1" />
        <text x="156" y="154" className="text-[10px] font-semibold fill-slate-700 dark:fill-slate-300">w₀ = 1 - i</text>

        {/* Root 1: (√3-1)/2 + i(√3+1)/2 -> cx=131, cy=78 */}
        <line x1="120" y1="120" x2="131" y2="78" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="131" cy="78" r="4" className="fill-indigo-600 stroke-white" strokeWidth="1" />
        <text x="135" y="71" className="text-[10px] font-semibold fill-slate-700 dark:fill-slate-300">w₁ = (√3-1)/2 + i(√3+1)/2</text>

        {/* Root 2: -(√3+1)/2 - i(√3-1)/2 -> cx=78, cy=131 */}
        <line x1="120" y1="120" x2="78" y2="131" stroke="#6366f1" strokeWidth="1.5" />
        <circle cx="78" cy="131" r="4" className="fill-indigo-600 stroke-white" strokeWidth="1" />
        <text x="68" y="132" className="text-[10px] font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="end">w₂ = -(√3+1)/2 - i(√3-1)/2</text>

        <text x="225" y="124" className="text-[9px] font-mono fill-slate-400">Re</text>
        <text x="120" y="15" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">Im</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Three cube roots symmetrically located at 120° intervals on a circle of radius √2.</span>
    </div>
  );
}

function Solid3DPointDiagram() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">3D Point Coordinate Projections</h5>
      <svg width="240" height="200" viewBox="0 0 240 200" className="overflow-visible">
        {/* Origin O */}
        <circle cx="100" cy="130" r="3" fill="#64748b" />
        <text x="90" y="142" className="text-[10px] fill-slate-500 font-mono">O(0,0,0)</text>

        {/* Axes */}
        {/* X-axis: down-left */}
        <line x1="100" y1="130" x2="40" y2="160" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-axis-solid)" />
        <text x="32" y="165" className="text-[10px] font-bold fill-red-500">X</text>

        {/* Y-axis: down-right */}
        <line x1="100" y1="130" x2="180" y2="160" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-axis-solid)" />
        <text x="185" y="165" className="text-[10px] font-bold fill-emerald-500">Y</text>

        {/* Z-axis: vertical up */}
        <line x1="100" y1="130" x2="100" y2="40" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-axis-solid)" />
        <text x="98" y="32" className="text-[10px] font-bold fill-blue-500">Z</text>

        {/* Projection Box for Point P(x, y, z) */}
        <polygon points="100,130 70,145 122,165 152,150" fill="rgba(203, 213, 225, 0.2)" />

        {/* Dotted lines */}
        <g stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-slate-700">
          <line x1="100" y1="130" x2="70" y2="145" /> {/* O to A */}
          <line x1="70" y1="145" x2="122" y2="165" /> {/* A to B */}
          <line x1="122" y1="165" x2="152" y2="150" /> {/* B to C */}
          <line x1="152" y1="150" x2="100" y2="130" /> {/* C to O */}

          <line x1="100" y1="70" x2="70" y2="85" /> {/* D to E */}
          <line x1="70" y1="85" x2="122" y2="105" /> {/* E to F */}
          <line x1="122" y1="105" x2="152" y2="90" /> {/* F to G */}
          <line x1="152" y1="90" x2="100" y2="70" /> {/* G to D */}

          {/* Verticals */}
          <line x1="100" y1="130" x2="100" y2="70" /> {/* O to D */}
          <line x1="70" y1="145" x2="70" y2="85" /> {/* A to E */}
          <line x1="152" y1="150" x2="152" y2="90" /> {/* C to G */}
          <line x1="122" y1="165" x2="122" y2="105" /> {/* B to F */}
        </g>

        {/* Radial line from origin */}
        <line x1="100" y1="130" x2="122" y2="105" stroke="#c084fc" strokeWidth="2" />

        {/* Labeled Point P */}
        <circle cx="122" cy="105" r="5" fill="#8b5cf6" stroke="white" strokeWidth="1.5" />
        <text x="130" y="103" className="text-[10px] font-bold fill-indigo-950 dark:fill-indigo-200">P(x, y, z)</text>

        {/* Distance label */}
        <text x="105" y="115" className="text-[9px] fill-purple-600 font-mono font-bold" transform="rotate(-48 105 115)">OP</text>

        <defs>
          <marker id="arrow-axis-solid" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#64748b" />
          </marker>
        </defs>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Projection box in 3D space illustrating coordinates x, y, and z of Point P</span>
    </div>
  );
}

function SkewLinesDiagram() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Skew Lines in a 3D Prism</h5>
      <svg width="240" height="180" viewBox="0 0 240 180" className="overflow-visible">
        {/* Draw 3D Box (prism) wireframe */}
        {/* Back face */}
        <rect x="70" y="30" width="100" height="80" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-slate-700" />
        {/* Connecting dashed lines */}
        <line x1="30" y1="70" x2="70" y2="30" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-slate-700" />
        <line x1="30" y1="150" x2="70" y2="110" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-slate-700" />
        
        {/* Solid front and outer lines */}
        <rect x="30" y="70" width="100" height="80" fill="none" stroke="#64748b" strokeWidth="1.2" className="dark:stroke-slate-400" />
        <line x1="130" y1="70" x2="170" y2="30" stroke="#64748b" strokeWidth="1.2" className="dark:stroke-slate-400" />
        <line x1="130" y1="150" x2="170" y2="110" stroke="#64748b" strokeWidth="1.2" className="dark:stroke-slate-400" />
        <line x1="170" y1="30" x2="170" y2="110" stroke="#64748b" strokeWidth="1.2" className="dark:stroke-slate-400" />
        <line x1="70" y1="110" x2="170" y2="110" stroke="#64748b" strokeWidth="1.2" className="dark:stroke-slate-400" />

        {/* Skew Line 1 */}
        <line x1="15" y1="165" x2="185" y2="95" stroke="#ef4444" strokeWidth="2.5" />
        <text x="190" y="95" className="text-xs font-bold fill-red-500 font-mono">Line L₁</text>

        {/* Skew Line 2 */}
        <line x1="85" y1="15" x2="115" y2="165" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="120" y="168" className="text-xs font-bold fill-amber-500 font-mono">Line L₂</text>

        {/* Label skew lines definition */}
        <text x="120" y="175" className="text-[9px] fill-slate-400 text-center animate-pulse" textAnchor="middle">L₁ and L₂ are non-intersecting and non-parallel</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 italic font-sans text-center">Lines L₁ and L₂ never meet and lie in different planes, showing Skew relation</span>
    </div>
  );
}

function SpherePlaneTangentDiagram() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Sphere with Tangent Plane</h5>
      <svg width="240" height="180" viewBox="0 0 240 180" className="overflow-visible">
        {/* Draw 3D Sphere outline */}
        <circle cx="120" cy="95" r="50" fill="rgba(109, 40, 217, 0.03)" stroke="#6d28d9" strokeWidth="1.5" />
        {/* Equatorial Hoop dashed/solid */}
        <ellipse cx="120" cy="95" rx="50" ry="15" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Center Point C */}
        <circle cx="120" cy="95" r="4" fill="#6d28d9" />
        <text x="110" y="108" className="text-[10px] fill-indigo-800 dark:fill-indigo-400 font-semibold font-mono">C(x₁,y₁,z₁)</text>

        {/* Tangent point on top-right of sphere surface */}
        <circle cx="155" cy="60" r="4" fill="#ef4444" />
        <text x="162" y="58" className="text-[10px] fill-red-600 font-bold font-sans">P(3, 2, -2)</text>

        {/* Normal radius vector line from C to P */}
        <line x1="120" y1="95" x2="155" y2="60" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="130" y="75" className="text-[9px] fill-red-500 font-mono italic">Radius r</text>

        {/* Tangent Plane patch */}
        <polygon points="120,30 180,20 195,90 135,100" fill="rgba(13, 148, 136, 0.18)" stroke="#0d9488" strokeWidth="1.5" />
        <text x="175" y="92" className="text-[9px] fill-teal-700 font-bold">Tangent Plane</text>
        <text x="175" y="101" className="text-[8px] fill-teal-600 font-mono">5x + y + z = 15</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Radius vector CP is always perpendicular to the Tangent Plane at point P</span>
    </div>
  );
}

function RootsUnity4() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-2">Equation z⁴ = -i Roots (distributed at 45° intervals)</h5>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <line x1="15" y1="110" x2="205" y2="110" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="110" y1="15" x2="110" y2="205" stroke="#cbd5e1" strokeWidth="1" />
        
        {/* Circle of radius 50px */}
        <circle cx="110" cy="110" r="50" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Draw square vertex roots */}
        <polygon points="145,145 75,145 75,75 145,75" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="1.2" />

        <circle cx="145" cy="145" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="75" cy="145" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="75" cy="75" r="4" className="fill-indigo-600 stroke-white" />
        <circle cx="145" cy="75" r="4" className="fill-indigo-600 stroke-white" />

        <text x="152" y="152" className="text-[8px] font-mono fill-slate-500">k=0</text>
        <text x="63" y="152" className="text-[8px] font-mono fill-slate-500">k=1</text>
        <text x="63" y="72" className="text-[8px] font-mono fill-slate-500">k=2</text>
        <text x="152" y="72" className="text-[8px] font-mono fill-slate-500">k=3</text>
      </svg>
    </div>
  );
}

function DrinksSnacksTree() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 font-sans uppercase tracking-wider">Multiplication Principle: Drinks & Snacks Tree</h5>
      <svg width="100%" height="240" viewBox="0 0 500 240" className="overflow-visible max-w-full">
        {/* Start Node */}
        <circle cx="30" cy="120" r="20" className="fill-indigo-500/10 stroke-indigo-500 dark:stroke-indigo-400" strokeWidth="2" />
        <text x="30" y="123" className="text-[9px] font-bold fill-indigo-600 dark:fill-indigo-400 font-sans" textAnchor="middle">START</text>

        {/* Level 1: Drinks (Tea & Coffee) */}
        {/* Connection lines from Start to Level 1 */}
        <path d="M 50 120 Q 90 70 120 70" fill="none" stroke="#6366f1" strokeWidth="2" className="opacity-60" />
        <path d="M 50 120 Q 90 170 120 170" fill="none" stroke="#6366f1" strokeWidth="2" className="opacity-60" />

        {/* Tea Node */}
        <rect x="120" y="50" width="65" height="40" rx="8" className="fill-emerald-500/10 stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="1.5" />
        <text x="152.5" y="74" className="text-xs font-bold fill-emerald-700 dark:fill-emerald-400 font-sans" textAnchor="middle">Tea</text>
        <text x="152.5" y="103" className="text-[9px] fill-slate-400 italic" textAnchor="middle">(2 choices)</text>

        {/* Coffee Node */}
        <rect x="120" y="150" width="65" height="40" rx="8" className="fill-amber-500/10 stroke-amber-500 dark:stroke-amber-400" strokeWidth="1.5" />
        <text x="152.5" y="174" className="text-xs font-bold fill-amber-700 dark:fill-amber-400 font-sans" textAnchor="middle">Coffee</text>
        <text x="152.5" y="203" className="text-[9px] fill-slate-400 italic" textAnchor="middle">(2 choices)</text>

        {/* Level 2: Snacks (Cake, Doughnut, Sandwich) */}
        {/* Tea Branches */}
        <path d="M 185 70 Q 225 30 265 30" fill="none" stroke="#10b981" strokeWidth="1.5" className="opacity-50" />
        <path d="M 185 70 L 265 70" fill="none" stroke="#10b981" strokeWidth="1.5" className="opacity-50" />
        <path d="M 185 70 Q 225 110 265 110" fill="none" stroke="#10b981" strokeWidth="1.5" className="opacity-50" />

        {/* Coffee Branches */}
        <path d="M 185 170 Q 225 130 265 130" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="opacity-50" />
        <path d="M 185 170 L 265 170" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="opacity-50" />
        <path d="M 185 170 Q 225 210 265 210" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="opacity-50" />

        {/* Tea Snack Nodes & Labels */}
        <circle cx="265" cy="30" r="4" className="fill-emerald-500" />
        <text x="275" y="34" className="text-[11px] font-medium fill-slate-700 dark:fill-slate-300">Cake</text>
        <text x="350" y="34" className="text-[10px] font-mono fill-slate-400">→ (Tea, Cake)</text>

        <circle cx="265" cy="70" r="4" className="fill-emerald-500" />
        <text x="275" y="74" className="text-[11px] font-medium fill-slate-700 dark:fill-slate-300">Doughnut</text>
        <text x="350" y="74" className="text-[10px] font-mono fill-slate-400">→ (Tea, Doughnut)</text>

        <circle cx="265" cy="110" r="4" className="fill-emerald-500" />
        <text x="275" y="114" className="text-[11px] font-medium fill-slate-700 dark:fill-slate-300">Sandwich</text>
        <text x="350" y="114" className="text-[10px] font-mono fill-slate-400">→ (Tea, Sandwich)</text>

        {/* Coffee Snack Nodes & Labels */}
        <circle cx="265" cy="130" r="4" className="fill-amber-500" />
        <text x="275" y="134" className="text-[11px] font-medium fill-slate-700 dark:fill-slate-300">Cake</text>
        <text x="350" y="134" className="text-[10px] font-mono fill-slate-400">→ (Coffee, Cake)</text>

        <circle cx="265" cy="170" r="4" className="fill-amber-500" />
        <text x="275" y="174" className="text-[11px] font-medium fill-slate-700 dark:fill-slate-300">Doughnut</text>
        <text x="350" y="174" className="text-[10px] font-mono fill-slate-400">→ (Coffee, Doughnut)</text>

        <circle cx="265" cy="210" r="4" className="fill-amber-500" />
        <text x="275" y="214" className="text-[11px] font-medium fill-slate-700 dark:fill-slate-300">Sandwich</text>
        <text x="350" y="214" className="text-[10px] font-mono fill-slate-400">→ (Coffee, Sandwich)</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Tree diagram showing 2 drinks × 3 snacks = 6 total outcome paths of the Multiplication Principle.</span>
    </div>
  );
}

function PermCombComparison() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 font-sans uppercase tracking-wider">Permutation vs Combination Comparison</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        {/* Permutations (Order Matters) */}
        <div className="p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl flex flex-col items-center space-y-3">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-950/50">
            Permutations: Order Matters!
          </span>
          <span className="text-[11px] text-slate-400 font-sans text-center">Arranging 2 objects from {"{A, B, C}"}</span>
          
          <svg width="180" height="90" className="overflow-visible">
            {/* Draw Box 1 */}
            <rect x="10" y="10" width="70" height="40" rx="6" className="fill-indigo-500/5 stroke-indigo-500" strokeWidth="1.5" />
            <text x="45" y="34" className="text-xs font-bold fill-indigo-600 dark:fill-indigo-400 font-mono" textAnchor="middle">A, B</text>
            <text x="45" y="65" className="text-[10px] font-sans fill-slate-500" textAnchor="middle">1st Choice</text>
            
            {/* Draw Box 2 */}
            <rect x="100" y="10" width="70" height="40" rx="6" className="fill-indigo-500/5 stroke-indigo-500" strokeWidth="1.5" />
            <text x="135" y="34" className="text-xs font-bold fill-indigo-600 dark:fill-indigo-400 font-mono" textAnchor="middle">B, A</text>
            <text x="135" y="65" className="text-[10px] font-sans fill-slate-500" textAnchor="middle">2nd Choice</text>

            <line x1="80" y1="30" x2="100" y2="30" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="90" y="24" className="text-[9px] font-bold fill-rose-500" textAnchor="middle">≠</text>
          </svg>
          <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-2">
            (A, B) &amp; (B, A) are 2 ways
          </p>
        </div>

        {/* Combinations (Order Doesn't Matter) */}
        <div className="p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl flex flex-col items-center space-y-3">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950/50">
            Combinations: Order Doesn't Matter!
          </span>
          <span className="text-[11px] text-slate-400 font-sans text-center">Selecting 2 objects from {"{A, B, C}"}</span>
          
          <svg width="180" height="90" className="overflow-visible">
            {/* Draw Grouping Bag */}
            <rect x="30" y="5" width="120" height="50" rx="20" className="fill-emerald-500/5 stroke-emerald-500" strokeWidth="2" strokeDasharray="2 2" />
            <text x="90" y="34" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400 font-mono" textAnchor="middle">{"{A, B}"}</text>
            <text x="90" y="70" className="text-[10px] font-sans fill-slate-500" textAnchor="middle">Same Group</text>
          </svg>
          <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-2">
            {"{A, B}"} &amp; {"{B, A}"} are the 1 same way
          </p>
        </div>
      </div>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 italic font-sans text-center">Permutations create distinct ordered sequences (tuples), while Combinations focus on identical, unordered sets.</span>
    </div>
  );
}

function AtoBtoCRoads() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 font-sans uppercase tracking-wider">Example 1: Roads from Town A to B to C</h5>
      <svg width="100%" height="180" viewBox="0 0 400 180" className="overflow-visible max-w-full">
        {/* Label: 6 roads on top with bracket */}
        <path d="M 90 22 L 135 22 L 180 22" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 90 20 L 90 25" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M 180 20 L 180 25" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="110" y="10" width="50" height="20" rx="4" className="fill-amber-500" />
        <text x="135" y="24" className="text-[10px] font-bold fill-white font-sans" textAnchor="middle">6 roads</text>

        {/* Label: 4 roads on top with bracket */}
        <path d="M 240 22 L 285 22 L 330 22" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 240 20 L 240 25" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <path d="M 330 20 L 330 25" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <rect x="260" y="10" width="50" height="20" rx="4" className="fill-blue-500" />
        <text x="285" y="24" className="text-[10px] font-bold fill-white font-sans" textAnchor="middle">4 roads</text>

        {/* Town Nodes */}
        <circle cx="50" cy="90" r="20" className="fill-indigo-500/10 stroke-indigo-500 dark:stroke-indigo-400" strokeWidth="2" />
        <text x="50" y="94" className="text-sm font-bold fill-indigo-700 dark:fill-indigo-300 font-sans" textAnchor="middle">A</text>

        <circle cx="200" cy="90" r="20" className="fill-emerald-500/10 stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="2" />
        <text x="200" y="94" className="text-sm font-bold fill-emerald-700 dark:fill-emerald-300 font-sans" textAnchor="middle">B</text>

        <circle cx="350" cy="90" r="20" className="fill-amber-500/10 stroke-amber-500 dark:stroke-amber-400" strokeWidth="2" />
        <text x="350" y="94" className="text-sm font-bold fill-amber-700 dark:fill-amber-300 font-sans" textAnchor="middle">C</text>

        {/* Curved Roads from A to B (6 roads) */}
        <path d="M 70 90 Q 135 25 180 90" fill="none" stroke="#6366f1" strokeWidth="1.5" className="opacity-70" />
        <path d="M 70 90 Q 135 45 180 90" fill="none" stroke="#6366f1" strokeWidth="1.5" className="opacity-70" />
        <path d="M 70 90 Q 135 65 180 90" fill="none" stroke="#6366f1" strokeWidth="1.2" className="opacity-50" />
        <path d="M 70 90 Q 135 115 180 90" fill="none" stroke="#6366f1" strokeWidth="1.2" className="opacity-50" />
        <path d="M 70 90 Q 135 135 180 90" fill="none" stroke="#6366f1" strokeWidth="1.5" className="opacity-70" />
        <path d="M 70 90 Q 135 155 180 90" fill="none" stroke="#6366f1" strokeWidth="1.5" className="opacity-70" />

        {/* Curved Roads from B to C (4 roads) */}
        <path d="M 220 90 Q 285 40 330 90" fill="none" stroke="#10b981" strokeWidth="1.5" className="opacity-70" />
        <path d="M 220 90 Q 285 70 330 90" fill="none" stroke="#10b981" strokeWidth="1.2" className="opacity-50" />
        <path d="M 220 90 Q 285 110 330 90" fill="none" stroke="#10b981" strokeWidth="1.2" className="opacity-50" />
        <path d="M 220 90 Q 285 140 330 90" fill="none" stroke="#10b981" strokeWidth="1.5" className="opacity-70" />

        {/* Bottom Text: A -> B -> C */}
        <text x="200" y="170" className="text-xs font-semibold fill-slate-500 dark:fill-slate-400 font-sans" textAnchor="middle">A → B → C</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Multiplication Principle visual: 6 roads (A → B) × 4 roads (B → C) = 24 total driving routes.</span>
    </div>
  );
}

function AndOrFlowchart() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 font-sans uppercase tracking-wider">Choosing the Right Counting Principle</h5>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg">
        {/* AND block */}
        <div className="flex-1 p-4 bg-white dark:bg-slate-950 border border-indigo-100 dark:border-indigo-950/50 rounded-xl shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center border border-indigo-200 dark:border-indigo-900 mb-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">&amp;</span>
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">AND</span>
          <span className="text-[11px] text-slate-400 mt-1 font-sans">Successive steps</span>
          <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-900 my-2.5" />
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">Multiply</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">m × n × ...</span>
        </div>

        {/* Divider arrow/text */}
        <div className="hidden sm:flex text-slate-300 font-bold">OR</div>

        {/* OR block */}
        <div className="flex-1 p-4 bg-white dark:bg-slate-950 border border-emerald-100 dark:border-emerald-950/50 rounded-xl shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center border border-emerald-200 dark:border-emerald-900 mb-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">|</span>
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">OR</span>
          <span className="text-[11px] text-slate-400 mt-1 font-sans">Disjoint cases</span>
          <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-900 my-2.5" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">Add</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">m + n + ...</span>
        </div>
      </div>
    </div>
  );
}

function BloodLabelDiagram() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 font-sans uppercase tracking-wider">Example 2: Blood Classification Flow</h5>
      <svg width="100%" height="160" viewBox="0 0 540 160" className="overflow-visible max-w-full">
        {/* Stage 1 Box: Blood Type */}
        <rect x="10" y="30" width="105" height="60" rx="8" className="fill-indigo-500/5 stroke-indigo-500 dark:stroke-indigo-400" strokeWidth="1.5" />
        <text x="62.5" y="50" className="text-[10px] font-bold fill-indigo-700 dark:fill-indigo-400 font-sans" textAnchor="middle">Blood Type</text>
        <text x="62.5" y="68" className="text-[11px] font-mono fill-slate-600 dark:fill-slate-300" textAnchor="middle">A, B, AB, O</text>
        <text x="62.5" y="82" className="text-[9px] font-semibold fill-amber-600 dark:fill-amber-400" textAnchor="middle">4 choices</text>

        {/* Arrow 1 */}
        <path d="M 125 60 L 145 60" fill="none" stroke="#6366f1" strokeWidth="2" />

        {/* Stage 2 Box: Rh Factor */}
        <rect x="155" y="30" width="105" height="60" rx="8" className="fill-emerald-500/5 stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="1.5" />
        <text x="207.5" y="50" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-400 font-sans" textAnchor="middle">Rh Factor</text>
        <text x="207.5" y="68" className="text-[11px] font-mono fill-slate-600 dark:fill-slate-300" textAnchor="middle">+ or -</text>
        <text x="207.5" y="82" className="text-[9px] font-semibold fill-amber-600 dark:fill-amber-400" textAnchor="middle">2 choices</text>

        {/* Arrow 2 */}
        <path d="M 270 60 L 290 60" fill="none" stroke="#10b981" strokeWidth="2" />

        {/* Stage 3 Box: Donor Gender */}
        <rect x="300" y="30" width="105" height="60" rx="8" className="fill-blue-500/5 stroke-blue-500 dark:stroke-blue-400" strokeWidth="1.5" />
        <text x="352.5" y="50" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-400 font-sans" textAnchor="middle">Donor Gender</text>
        <text x="352.5" y="68" className="text-[11px] font-mono fill-slate-600 dark:fill-slate-300" textAnchor="middle">Male, Female</text>
        <text x="352.5" y="82" className="text-[9px] font-semibold fill-amber-600 dark:fill-amber-400" textAnchor="middle">2 choices</text>

        {/* Arrow 3 */}
        <path d="M 415 60 L 435 60" fill="none" stroke="#3b82f6" strokeWidth="2" />

        {/* Stage 4 Box: Total Labels */}
        <rect x="445" y="30" width="85" height="60" rx="8" className="fill-amber-500/10 stroke-amber-500" strokeWidth="2" />
        <text x="487.5" y="50" className="text-[10px] font-bold fill-amber-800 dark:fill-amber-400 font-sans" textAnchor="middle">Total Labels</text>
        <text x="487.5" y="68" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300" textAnchor="middle">4 × 2 × 2</text>
        <text x="487.5" y="82" className="text-xs font-black fill-amber-600" textAnchor="middle">= 16 ways</text>

        {/* Multiplication Principle label under arrows */}
        <text x="135" y="115" className="text-[10px] fill-slate-400 dark:fill-slate-500 font-serif" textAnchor="middle">Step 1</text>
        <text x="135" y="130" className="text-[12px] font-bold fill-indigo-500" textAnchor="middle">×</text>
        
        <text x="280" y="115" className="text-[10px] fill-slate-400 dark:fill-slate-500 font-serif" textAnchor="middle">Step 2</text>
        <text x="280" y="130" className="text-[12px] font-bold fill-emerald-500" textAnchor="middle">×</text>

        <text x="425" y="115" className="text-[10px] fill-slate-400 dark:fill-slate-500 font-serif" textAnchor="middle">Step 3</text>
        <text x="425" y="130" className="text-[12px] font-bold fill-blue-500" textAnchor="middle">=</text>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Multiplication Principle: Each choice has independent subsequent options, creating 16 total labeled paths.</span>
    </div>
  );
}

function PictureNailsDiagram() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 font-sans uppercase tracking-wider">Example 3: Pictures on Nails Diagram</h5>
      <svg width="100%" height="160" viewBox="0 0 460 160" className="overflow-visible max-w-full">
        {/* Nail 1 */}
        <g transform="translate(10, 20)">
          {/* Nail head & stem */}
          <line x1="50" y1="10" x2="50" y2="40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="10" r="6" className="fill-slate-500 dark:fill-slate-400" />
          {/* Picture Box */}
          <rect x="15" y="45" width="70" height="50" rx="4" className="fill-indigo-500/5 stroke-indigo-500 dark:stroke-indigo-400" strokeWidth="1.5" />
          {/* Picture details */}
          <circle cx="50" cy="65" r="8" className="fill-indigo-500/20 stroke-indigo-500" strokeWidth="1" />
          <text x="50" y="112" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200" textAnchor="middle">Nail 1</text>
          <rect x="15" y="122" width="70" height="18" rx="4" className="fill-amber-500" />
          <text x="50" y="134" className="text-[9px] font-bold fill-white" textAnchor="middle">5 choices</text>
        </g>

        {/* Multiplication Cross 1 */}
        <text x="115" y="95" className="text-lg font-black fill-slate-400 dark:fill-slate-500" textAnchor="middle">×</text>

        {/* Nail 2 */}
        <g transform="translate(130, 20)">
          {/* Nail head & stem */}
          <line x1="50" y1="10" x2="50" y2="40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="10" r="6" className="fill-slate-500 dark:fill-slate-400" />
          {/* Picture Box */}
          <rect x="15" y="45" width="70" height="50" rx="4" className="fill-emerald-500/5 stroke-emerald-500 dark:stroke-emerald-400" strokeWidth="1.5" />
          {/* Picture details */}
          <polygon points="50,58 38,74 62,74" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1" />
          <text x="50" y="112" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200" textAnchor="middle">Nail 2</text>
          <rect x="15" y="122" width="70" height="18" rx="4" className="fill-amber-500" />
          <text x="50" y="134" className="text-[9px] font-bold fill-white" textAnchor="middle">4 choices</text>
        </g>

        {/* Multiplication Cross 2 */}
        <text x="235" y="95" className="text-lg font-black fill-slate-400 dark:fill-slate-500" textAnchor="middle">×</text>

        {/* Nail 3 */}
        <g transform="translate(250, 20)">
          {/* Nail head & stem */}
          <line x1="50" y1="10" x2="50" y2="40" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="10" r="6" className="fill-slate-500 dark:fill-slate-400" />
          {/* Picture Box */}
          <rect x="15" y="45" width="70" height="50" rx="4" className="fill-blue-500/5 stroke-blue-500 dark:stroke-blue-400" strokeWidth="1.5" />
          {/* Picture details */}
          <rect x="40" y="58" width="20" height="14" className="fill-blue-500/20 stroke-blue-500" strokeWidth="1" />
          <text x="50" y="112" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200" textAnchor="middle">Nail 3</text>
          <rect x="15" y="122" width="70" height="18" rx="4" className="fill-amber-500" />
          <text x="50" y="134" className="text-[9px] font-bold fill-white" textAnchor="middle">3 choices</text>
        </g>

        {/* Equal Sign */}
        <text x="355" y="95" className="text-lg font-black fill-slate-400 dark:fill-slate-500" textAnchor="middle">=</text>

        {/* Total Box */}
        <g transform="translate(370, 45)">
          <rect x="0" y="0" width="80" height="70" rx="8" className="fill-amber-500/10 stroke-amber-500" strokeWidth="2" />
          <text x="40" y="24" className="text-[10px] font-bold fill-amber-800 dark:fill-amber-400 font-sans" textAnchor="middle">Total Ways</text>
          <text x="40" y="42" className="text-[10px] font-mono fill-slate-600 dark:fill-slate-300" textAnchor="middle">5 × 4 × 3</text>
          <text x="40" y="58" className="text-xs font-black fill-amber-600" textAnchor="middle">= 60 ways</text>
        </g>
      </svg>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic font-sans text-center">Since each picture can only be used once, the available choices decrease by 1 at each successive nail stage.</span>
    </div>
  );
}

function Example4Diagram() {
  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Example 4: 2-Digit or 3-Digit Numbers Visual</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Case 1 */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">Case 1: 2-Digit Numbers</span>
          <div className="flex gap-2 mb-2">
            <div className="w-12 h-12 flex flex-col items-center justify-center border-2 border-indigo-500 rounded-lg bg-indigo-50/10">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">Tens</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">5</span>
            </div>
            <div className="w-12 h-12 flex flex-col items-center justify-center border-2 border-indigo-500 rounded-lg bg-indigo-50/10">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">Units</span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">4</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">5 × 4 = 20 ways</span>
        </div>

        {/* Case 2 */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">Case 2: 3-Digit Numbers</span>
          <div className="flex gap-2 mb-2">
            <div className="w-12 h-12 flex flex-col items-center justify-center border-2 border-emerald-500 rounded-lg bg-emerald-50/10">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">Hund</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">5</span>
            </div>
            <div className="w-12 h-12 flex flex-col items-center justify-center border-2 border-emerald-500 rounded-lg bg-emerald-50/10">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">Tens</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">4</span>
            </div>
            <div className="w-12 h-12 flex flex-col items-center justify-center border-2 border-emerald-500 rounded-lg bg-emerald-50/10">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">Units</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">3</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">5 × 4 × 3 = 60 ways</span>
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center gap-2 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-sans">Disjoint Cases (Addition):</span>
        <span className="font-mono font-black text-sm text-amber-600 dark:text-amber-400">20 + 60 = 80 total numbers</span>
      </div>
    </div>
  );
}

function Example5Diagram() {
  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Example 5: Integers with digit 5 only once (between 0 and 100)</h5>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Case 1: One-Digit */}
        <div className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100/50 dark:border-indigo-950/40 justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1 block text-center font-sans">Case 1: One-Digit Integers (တစ်လုံးတည်းသောကိန်း)</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 text-center block mb-4">Numbers between 0 and 9 with exactly one '5'</span>
            
            <div className="flex justify-center items-center gap-3 mb-4">
              {/* Only 5 */}
              <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-indigo-500 rounded-xl bg-indigo-500/10 p-1">
                <span className="text-[9px] font-mono text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider">Value</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 my-0.5">5</span>
                <span className="text-[8px] text-indigo-500 font-semibold">(1 number)</span>
              </div>
            </div>
          </div>
          
          <div className="p-2.5 bg-indigo-500/5 rounded-lg border border-indigo-100 dark:border-indigo-950/50 text-center">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">1 integer: {"{5}"}</span>
          </div>
        </div>

        {/* Case 2: Two-Digits */}
        <div className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100/50 dark:border-emerald-950/40">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 block text-center font-sans">Case 2: Two-Digit Integers (နှစ်လုံးတွဲကိန်းများ)</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 text-center block mb-3">Numbers 10 to 99 with exactly one '5'</span>
          
          <div className="space-y-4">
            {/* Tens place is 5 */}
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-lg border border-emerald-100/40">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-2 text-center font-sans">Tens place is 5 (5_ but not 55)</span>
              <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
                {/* Tens place */}
                <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-emerald-500 rounded-xl bg-emerald-500/15 p-1 text-center">
                  <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase tracking-wider">Tens (T)</span>
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-300 my-0.5">5</span>
                  <span className="text-[8px] text-emerald-500 font-semibold">(1 way)</span>
                </div>
                {/* Units place */}
                <div className="w-20 h-20 flex flex-col items-center justify-center border border-emerald-300 dark:border-emerald-800 rounded-xl bg-emerald-500/5 p-1 text-center">
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Units (U)</span>
                  <span className="text-xl font-black text-slate-700 dark:text-slate-300 my-0.5">≠5</span>
                  <span className="text-[8px] text-slate-500 font-semibold">(9 ways)</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                  1 × 9 = 9 numbers
                </div>
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono text-center mt-1">
                {"{50, 51, 52, 53, 54, 56, 57, 58, 59}"}
              </div>
            </div>

            {/* Units place is 5 */}
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-lg border border-emerald-100/40">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-2 text-center font-sans">Units place is 5 (_5 but not 05, 55)</span>
              <div className="flex flex-wrap justify-center items-center gap-3 mb-2">
                {/* Tens place */}
                <div className="w-20 h-20 flex flex-col items-center justify-center border border-emerald-300 dark:border-emerald-800 rounded-xl bg-emerald-500/5 p-1 text-center">
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Tens (T)</span>
                  <span className="text-xl font-black text-slate-700 dark:text-slate-300 my-0.5">≠0,5</span>
                  <span className="text-[8px] text-slate-500 font-semibold">(8 ways)</span>
                </div>
                {/* Units place */}
                <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-emerald-500 rounded-xl bg-emerald-500/15 p-1 text-center">
                  <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase tracking-wider">Units (U)</span>
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-300 my-0.5">5</span>
                  <span className="text-[8px] text-emerald-500 font-semibold">(1 way)</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                  8 × 1 = 8 numbers
                </div>
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono text-center mt-1">
                {"{15, 25, 35, 45, 65, 75, 85, 95}"}
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-center">
            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">9 + 8 = 17 numbers</span>
          </div>
        </div>
      </div>

      {/* Sum Card */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-sans">Total Integers (Addition Principle):</span>
        <span className="font-mono font-black text-base text-amber-600 dark:text-amber-400">
          Case 1 + Case 2 = 1 + 17 = 18 integers
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// Core Latex Parsing and Formatting logic
// -----------------------------------------------------------------

function renderTextWithStyles(text: string, keyPrefix: string): React.ReactNode {
  const boldParts = text.split('**');
  return (
    <>
      {boldParts.map((boldPart, bIdx) => {
        const isBold = bIdx % 2 !== 0;
        const italicParts = boldPart.split('*');
        const renderedItalic = italicParts.map((italicPart, iIdx) => {
          const isItalic = iIdx % 2 !== 0;
          if (isItalic) {
            return (
              <em key={`${keyPrefix}-b${bIdx}-i${iIdx}`} className="italic font-serif">
                {italicPart}
              </em>
            );
          }
          return <span key={`${keyPrefix}-b${bIdx}-i${iIdx}`}>{italicPart}</span>;
        });

        if (isBold) {
          return (
            <strong key={`${keyPrefix}-bold-${bIdx}`} className="font-bold text-slate-900 dark:text-white">
              {renderedItalic}
            </strong>
          );
        }
        return <span key={`${keyPrefix}-norm-${bIdx}`}>{renderedItalic}</span>;
      })}
    </>
  );
}

function renderMathText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Match $$...$$ (block) or $...$ (inline)
  const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const matchIndex = match.index;

    // Add normal text preceding math match
    if (currentIndex < matchIndex) {
      parts.push(
        <span key={`text-${currentIndex}`}>
          {renderTextWithStyles(text.slice(currentIndex, matchIndex), `text-${currentIndex}`)}
        </span>
      );
    }

    const isBlock = match[1] !== undefined;
    const formula = isBlock ? match[2] : match[4];

    try {
      const html = katex.renderToString(formula, {
        displayMode: isBlock,
        throwOnError: false,
      });

      if (isBlock) {
        parts.push(
          <div
            key={`math-${matchIndex}`}
            className="katex-block my-3 overflow-x-auto py-1 w-full font-serif text-slate-800 dark:text-slate-200"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } else {
        parts.push(
          <span
            key={`math-${matchIndex}`}
            className="katex-inline inline-block px-0.5 font-serif text-slate-800 dark:text-slate-200"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    } catch (e) {
      console.error(e);
      parts.push(
        <code key={`math-error-${matchIndex}`} className="px-1 text-red-500 font-mono bg-red-50 rounded text-xs">
          {isBlock ? `$$${formula}$$` : `$${formula}$`}
        </code>
      );
    }

    currentIndex = regex.lastIndex;
  }

  // Add remaining normal text
  if (currentIndex < text.length) {
    parts.push(
      <span key={`text-${currentIndex}`}>
        {renderTextWithStyles(text.slice(currentIndex), `text-${currentIndex}`)}
      </span>
    );
  }

  return <>{parts}</>;
}

export default function Latex({ text, block = false }: LatexProps) {
  // 1. Render pure block formula if explicitly requested via props
  if (block) {
    try {
      const html = katex.renderToString(text, {
        displayMode: true,
        throwOnError: false,
      });
      return <div className="katex-block my-3 overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
      console.error(e);
      return <pre className="p-2 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 font-mono text-xs rounded">{text}</pre>;
    }
  }

  // 2. Format custom content line-by-line to preserve structure and style headings/cards
  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="space-y-1.5 my-3 pl-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Table processing
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList(i);
      const tableLines: string[] = [lines[i]];
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith('|') && lines[j].trim().endsWith('|')) {
        tableLines.push(lines[j]);
        j++;
      }
      i = j - 1; // skip forward

      if (tableLines.length >= 2) {
        // Find if we have a separator line (contains at least one dash/colon sequence)
        let separatorIndex = -1;
        for (let t = 0; t < tableLines.length; t++) {
          const l = tableLines[t].trim();
          if (l.includes('-') && /^[|:\s-]+$/.test(l)) {
            separatorIndex = t;
            break;
          }
        }

        const headers: string[] = [];
        const rows: string[][] = [];

        for (let t = 0; t < tableLines.length; t++) {
          if (t === separatorIndex) continue;
          
          const rawParts = tableLines[t].split('|');
          const rowParts = rawParts.slice(1, rawParts.length - 1).map(p => p.trim());
          
          if (t < (separatorIndex !== -1 ? separatorIndex : 1)) {
            headers.push(...rowParts);
          } else {
            rows.push(rowParts);
          }
        }

        renderedElements.push(
          <div key={`table-wrapper-${i}`} className="my-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 shadow-sm">
            <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
              {headers.length > 0 && (
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
                    {headers.map((h, hIdx) => (
                      <th key={`th-${hIdx}`} className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                        {renderMathText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr 
                    key={`tr-${rIdx}`} 
                    className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    {row.map((cell, cIdx) => (
                      <td key={`td-${cIdx}`} className="p-3 text-slate-600 dark:text-slate-400">
                        {renderMathText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Skip empty lines, but close list if open
    if (line === '') {
      flushList(i);
      renderedElements.push(<div key={`empty-${i}`} className="h-2" />);
      continue;
    }

    // Blockquote handling (lines starting with >)
    if (line.startsWith('>')) {
      flushList(i);
      const quoteLines: string[] = [];
      let j = i;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith('>')) {
          let content = nextLine.slice(1);
          if (content.startsWith(' ')) {
            content = content.slice(1);
          }
          quoteLines.push(content);
          j++;
        } else {
          break;
        }
      }
      i = j - 1; // skip forward to the end of the blockquote

      renderedElements.push(
        <blockquote key={`quote-${i}`} className="border-l-4 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/10 p-4 rounded-r-xl my-4 text-slate-700 dark:text-slate-300">
          <Latex text={quoteLines.join('\n')} />
        </blockquote>
      );
      continue;
    }

    // Check for multi-line block math starting with $$
    if (line.startsWith('$$') && (!line.endsWith('$$') || line === '$$')) {
      flushList(i);
      let mathBlock = line;
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        mathBlock += '\n' + nextLine;
        if (nextLine.trim().endsWith('$$')) {
          break;
        }
        j++;
      }
      i = j; // skip forward

      // Remove leading and trailing $$
      const formula = mathBlock.replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
      try {
        const html = katex.renderToString(formula, {
          displayMode: true,
          throwOnError: false,
        });
        renderedElements.push(
          <div
            key={`math-block-${i}`}
            className="katex-block my-3 overflow-x-auto py-1 w-full font-serif text-slate-800 dark:text-slate-200"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (e) {
        console.error(e);
        renderedElements.push(
          <pre key={`math-block-error-${i}`} className="p-2 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 font-mono text-xs rounded my-3">
            {mathBlock}
          </pre>
        );
      }
      continue;
    }

    // Horizontal divider
    if (line === '---' || line === '***') {
      flushList(i);
      renderedElements.push(<hr key={`hr-${i}`} className="my-6 border-slate-100 dark:border-slate-800/80" />);
      continue;
    }

    // Inline Diagram placeholders
    if (line.startsWith('[DIAGRAM:')) {
      flushList(i);
      const diagName = line.replace('[DIAGRAM:', '').replace(']', '').trim();
      
      switch (diagName) {
        case 'MathematicianTimeline':
          renderedElements.push(<MathematicianTimeline key={`diag-${i}`} />);
          break;
        case 'ArgandPolar':
          renderedElements.push(<ArgandPolar key={`diag-${i}`} />);
          break;
        case 'ArgandExample5a':
          renderedElements.push(<ArgandExample5a key={`diag-${i}`} />);
          break;
        case 'ArgandExample5b':
          renderedElements.push(<ArgandExample5b key={`diag-${i}`} />);
          break;
        case 'ArgandExample5c':
          renderedElements.push(<ArgandExample5c key={`diag-${i}`} />);
          break;
        case 'ArgandExample5d':
          renderedElements.push(<ArgandExample5d key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_4_1a':
          renderedElements.push(<ArgandEx1_4_1a key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_4_1b':
          renderedElements.push(<ArgandEx1_4_1b key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_4_1c':
          renderedElements.push(<ArgandEx1_4_1c key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_4_1d':
          renderedElements.push(<ArgandEx1_4_1d key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_4_1e':
          renderedElements.push(<ArgandEx1_4_1e key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_4_1f':
          renderedElements.push(<ArgandEx1_4_1f key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_5_1a':
          renderedElements.push(<ArgandEx1_5_1a key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_5_1b':
          renderedElements.push(<ArgandEx1_5_1b key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_5_1c':
          renderedElements.push(<ArgandEx1_5_1c key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_5_1d':
          renderedElements.push(<ArgandEx1_5_1d key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_5_1e':
          renderedElements.push(<ArgandEx1_5_1e key={`diag-${i}`} />);
          break;
        case 'ArgandEx1_5_1f':
          renderedElements.push(<ArgandEx1_5_1f key={`diag-${i}`} />);
          break;
        case 'RootsUnity6':
          renderedElements.push(<RootsUnity6 key={`diag-${i}`} />);
          break;
        case 'RootsUnity4':
          renderedElements.push(<RootsUnity4 key={`diag-${i}`} />);
          break;
        case 'RootsEx1_5_3a':
          renderedElements.push(<RootsEx1_5_3a key={`diag-${i}`} />);
          break;
        case 'RootsEx1_5_3b':
          renderedElements.push(<RootsEx1_5_3b key={`diag-${i}`} />);
          break;
        case 'RootsEx1_5_3c':
          renderedElements.push(<RootsEx1_5_3c key={`diag-${i}`} />);
          break;
        case 'RootsEx1_5_3d':
          renderedElements.push(<RootsEx1_5_3d key={`diag-${i}`} />);
          break;
        case 'RootsExample10':
          renderedElements.push(<RootsExample10 key={`diag-${i}`} />);
          break;
        case 'Solid3DPointDiagram':
          renderedElements.push(<Solid3DPointDiagram key={`diag-${i}`} />);
          break;
        case 'SkewLinesDiagram':
          renderedElements.push(<SkewLinesDiagram key={`diag-${i}`} />);
          break;
        case 'SpherePlaneTangentDiagram':
          renderedElements.push(<SpherePlaneTangentDiagram key={`diag-${i}`} />);
          break;
        case 'DrinksSnacksTree':
          renderedElements.push(<DrinksSnacksTree key={`diag-${i}`} />);
          break;
        case 'BloodLabelDiagram':
          renderedElements.push(<BloodLabelDiagram key={`diag-${i}`} />);
          break;
        case 'PictureNailsDiagram':
          renderedElements.push(<PictureNailsDiagram key={`diag-${i}`} />);
          break;
        case 'Example4Diagram':
          renderedElements.push(<Example4Diagram key={`diag-${i}`} />);
          break;
        case 'Example5Diagram':
          renderedElements.push(<Example5Diagram key={`diag-${i}`} />);
          break;
        case 'Example10Diagram':
          renderedElements.push(<Example10Diagram key={`diag-${i}`} />);
          break;
        case 'Example11Diagram':
          renderedElements.push(<Example11Diagram key={`diag-${i}`} />);
          break;
        case 'Example12Diagram':
          renderedElements.push(<Example12Diagram key={`diag-${i}`} />);
          break;
        case 'Example13Diagram':
          renderedElements.push(<Example13Diagram key={`diag-${i}`} />);
          break;
        case 'Example14Diagram':
          renderedElements.push(<Example14Diagram key={`diag-${i}`} />);
          break;
        case 'Example15Diagram':
          renderedElements.push(<Example15Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise51Question1':
          renderedElements.push(<Ex51Q1Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise51Question2':
          renderedElements.push(<Ex51Q2Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise51Question3':
          renderedElements.push(<Ex51Q3Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise51Question5':
          renderedElements.push(<Ex51Q5Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise52Question2':
          renderedElements.push(<Ex52Q2Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise52Question3':
          renderedElements.push(<Ex52Q3Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise52Question4':
          renderedElements.push(<Ex52Q4Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise52Question5':
          renderedElements.push(<Ex52Q5Diagram key={`diag-${i}`} />);
          break;
        case 'PermCombComparison':
          renderedElements.push(<PermCombComparison key={`diag-${i}`} />);
          break;
        case 'AtoBtoCRoads':
          renderedElements.push(<AtoBtoCRoads key={`diag-${i}`} />);
          break;
        case 'AndOrFlowchart':
          renderedElements.push(<AndOrFlowchart key={`diag-${i}`} />);
          break;
        case 'CombinationsIntroDiagram':
          renderedElements.push(<CombinationsIntroDiagram key={`diag-${i}`} />);
          break;
        case 'CombinationsFormulaView':
          renderedElements.push(<CombinationsFormulaView key={`diag-${i}`} />);
          break;
        case 'Exercise53Question2Diagram':
          renderedElements.push(<Exercise53Question2Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise53Question3Diagram':
          renderedElements.push(<Exercise53Question3Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise53Question4Diagram':
          renderedElements.push(<Exercise53Question4Diagram key={`diag-${i}`} />);
          break;
        case 'Exercise53Question5Diagram':
          renderedElements.push(<Exercise53Question5Diagram key={`diag-${i}`} />);
          break;
        case 'ExclusionPrincipleExample1Case1Diagram':
          renderedElements.push(<ExclusionPrincipleExample1Case1Diagram key={`diag-${i}`} />);
          break;
        case 'ExclusionPrincipleExample1Case2Diagram':
          renderedElements.push(<ExclusionPrincipleExample1Case2Diagram key={`diag-${i}`} />);
          break;
        case 'ExclusionPrincipleExample1ExcludedDiagram':
          renderedElements.push(<ExclusionPrincipleExample1ExcludedDiagram key={`diag-${i}`} />);
          break;
        case 'ProgramExampleDiagramA':
          renderedElements.push(<ProgramExampleDiagramA key={`diag-${i}`} />);
          break;
        case 'ProgramExampleDiagramB':
          renderedElements.push(<ProgramExampleDiagramB key={`diag-${i}`} />);
          break;
        case 'SubsetCountingTable':
          renderedElements.push(<SubsetCountingTable key={`diag-${i}`} />);
          break;
        case 'Exercise53Question6Diagram':
          renderedElements.push(<Exercise53Question6Diagram key={`diag-${i}`} />);
          break;
        
        case 'Example23Case1Diagram':
          renderedElements.push(<Example23Case1Diagram key={`diag-${i}`} />);
          break;
        case 'Example23Case2Diagram':
          renderedElements.push(<Example23Case2Diagram key={`diag-${i}`} />);
          break;
        case 'Example24DiagramA':
          renderedElements.push(<Example24DiagramA key={`diag-${i}`} />);
          break;
        case 'Example24DiagramB':
          renderedElements.push(<Example24DiagramB key={`diag-${i}`} />);
          break;
        case 'Example25Diagram':
          renderedElements.push(<Example25Diagram key={`diag-${i}`} />);
          break;
        case 'Example26Diagram':
          renderedElements.push(<Example26Diagram key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q6_i_Diag':
          renderedElements.push(<Ex5_4_Q6_i_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q6_ii_Diag':
          renderedElements.push(<Ex5_4_Q6_ii_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q6_iii_Diag':
          renderedElements.push(<Ex5_4_Q6_iii_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q6_iv_Diag_1':
          renderedElements.push(<Ex5_4_Q6_iv_Diag_1 key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q6_iv_Diag_2':
          renderedElements.push(<Ex5_4_Q6_iv_Diag_2 key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q7_i_Diag':
          renderedElements.push(<Ex5_4_Q7_i_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q7_ii_Diag':
          renderedElements.push(<Ex5_4_Q7_ii_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q8_i_Diag':
          renderedElements.push(<Ex5_4_Q8_i_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q8_iii_Diag':
          renderedElements.push(<Ex5_4_Q8_iii_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q9_Diag':
          renderedElements.push(<Ex5_4_Q9_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q10_i_Diag':
          renderedElements.push(<Ex5_4_Q10_i_Diag key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q10_ii_Diag1':
          renderedElements.push(<Ex5_4_Q10_ii_Diag1 key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q10_ii_Diag2':
          renderedElements.push(<Ex5_4_Q10_ii_Diag2 key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q10_ii_Diag3':
          renderedElements.push(<Ex5_4_Q10_ii_Diag3 key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q10_ii_Diag4':
          renderedElements.push(<Ex5_4_Q10_ii_Diag4 key={`diag-${i}`} />);
          break;
        case 'Ex5_4_Q10_ii_Diag5':
          renderedElements.push(<Ex5_4_Q10_ii_Diag5 key={`diag-${i}`} />);
          break;
        default:
          renderedElements.push(
            <div key={`diag-err-${i}`} className="p-3 bg-amber-50 text-amber-700 rounded text-xs">
              Placeholder for diagram: {diagName}
            </div>
          );
      }
      continue;
    }

    // Custom headers
    if (line.startsWith('###### ')) {
      flushList(i);
      renderedElements.push(
        <h6 key={`h6-${i}`} className="font-display font-bold text-slate-900 dark:text-slate-100 mt-4 mb-2 text-xs md:text-sm flex items-center gap-1.5 border-b border-dashed border-slate-100 dark:border-slate-800 pb-1 w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
          <span>{renderMathText(line.slice(7))}</span>
        </h6>
      );
      continue;
    }

    if (line.startsWith('##### ')) {
      flushList(i);
      renderedElements.push(
        <h5 key={`h5-${i}`} className="font-display font-semibold text-indigo-600 dark:text-indigo-400 mt-5 mb-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>{renderMathText(line.slice(6))}</span>
        </h5>
      );
      continue;
    }

    if (line.startsWith('#### ')) {
      flushList(i);
      renderedElements.push(
        <h4 key={`h4-${i}`} className="font-display font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2 text-xs md:text-sm flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>{renderMathText(line.slice(5))}</span>
        </h4>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      flushList(i);
      renderedElements.push(
        <h3 key={`h3-${i}`} className="font-display font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3 text-sm md:text-base border-b border-slate-100 dark:border-slate-800/60 pb-1.5 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-500" />
          <span>{renderMathText(line.slice(4))}</span>
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushList(i);
      renderedElements.push(
        <h2 key={`h2-${i}`} className="font-display font-bold text-slate-950 dark:text-white mt-8 mb-4 text-base md:text-lg border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>{renderMathText(line.slice(3))}</span>
        </h2>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      flushList(i);
      renderedElements.push(
        <h1 key={`h1-${i}`} className="font-display font-extrabold text-slate-950 dark:text-white mt-10 mb-6 text-lg md:text-xl border-b-2 border-indigo-100 dark:border-indigo-900 pb-3 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <span>{renderMathText(line.slice(2))}</span>
        </h1>
      );
      continue;
    }

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(
        <li key={`li-${i}-${listItems.length}`} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
          <span className="text-indigo-500 dark:text-indigo-400 mt-1.5 shrink-0 text-sm leading-none">•</span>
          <div className="flex-1 leading-relaxed text-xs md:text-sm">
            {renderMathText(line.substring(2))}
          </div>
        </li>
      );
      continue;
    }

    // Ordered numerical items (e.g. 1. or 2.)
    const numberedRegex = /^(\d+)\.\s(.*)/;
    if (numberedRegex.test(line)) {
      flushList(i);
      const match = line.match(numberedRegex);
      if (match) {
        const num = match[1];
        const content = match[2];
        renderedElements.push(
          <div key={`ol-${i}`} className="flex items-start gap-3 my-2.5 text-slate-700 dark:text-slate-300">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100/40 dark:border-indigo-900/10 mt-0.5">
              {num}
            </span>
            <div className="flex-1 leading-relaxed text-xs md:text-sm">
              {renderMathText(content)}
            </div>
          </div>
        );
        continue;
      }
    }

    // Colored Presentation Cards depending on mathematical category keyword
    const cardRegex = /^\*\*(Definition|Concept check|Concept Check|Motivation|General [rR]ule|Checking|Check|Note|Solution|Method \d+)\.?\*\*(.*)/i;
    if (cardRegex.test(line)) {
      flushList(i);
      const match = line.match(cardRegex);
      if (match) {
        const category = match[1];
        const remainder = match[2];

        let bgStyle = "bg-slate-50/70 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/60";
        let textAccent = "text-slate-700 dark:text-slate-300";
        let icon = <Info className="w-4 h-4 text-slate-500" />;
        let titleColor = "text-slate-900 dark:text-white";

        if (category.toLowerCase().includes("definition")) {
          bgStyle = "bg-amber-50/40 dark:bg-amber-950/10 border-amber-200/50 dark:border-amber-900/20 border-l-4 border-l-amber-500";
          textAccent = "text-slate-700 dark:text-slate-300";
          icon = <BookOpen className="w-4 h-4 text-amber-500" />;
          titleColor = "text-amber-800 dark:text-amber-400 font-bold";
        } else if (category.toLowerCase().includes("concept check") || category.toLowerCase().includes("motivation")) {
          bgStyle = "bg-indigo-50/40 dark:bg-indigo-950/10 border-indigo-200/50 dark:border-indigo-900/20 border-l-4 border-l-indigo-500";
          textAccent = "text-slate-700 dark:text-slate-300";
          icon = <Compass className="w-4 h-4 text-indigo-500" />;
          titleColor = "text-indigo-800 dark:text-indigo-400 font-bold";
        } else if (category.toLowerCase().includes("rule")) {
          bgStyle = "bg-violet-50/40 dark:bg-violet-950/10 border-violet-200/50 dark:border-violet-900/20 border-l-4 border-l-violet-500";
          textAccent = "text-slate-700 dark:text-slate-300";
          icon = <Star className="w-4 h-4 text-violet-500" />;
          titleColor = "text-violet-800 dark:text-violet-400 font-bold";
        } else if (category.toLowerCase().includes("check")) {
          bgStyle = "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/20 border-l-4 border-l-emerald-500";
          textAccent = "text-slate-700 dark:text-slate-300";
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
          titleColor = "text-emerald-800 dark:text-emerald-400 font-bold";
        } else if (category.toLowerCase().includes("solution") || category.toLowerCase().includes("method")) {
          bgStyle = "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 p-4 border-l-4 border-l-indigo-400";
          textAccent = "text-slate-700 dark:text-slate-300";
          icon = <Sparkles className="w-4 h-4 text-indigo-400" />;
          titleColor = "text-indigo-600 dark:text-indigo-400 font-bold";
        }

        renderedElements.push(
          <div key={`card-${i}`} className={`p-4 rounded-xl border my-4 shadow-sm ${bgStyle}`}>
            <div className="flex items-center gap-2 mb-2">
              {icon}
              <span className={`text-xs uppercase tracking-wider font-display font-bold ${titleColor}`}>
                {category}
              </span>
            </div>
            <div className={`text-xs md:text-sm leading-relaxed ${textAccent}`}>
              {renderMathText(remainder)}
            </div>
          </div>
        );
        continue;
      }
    }

    // Default: regular text lines parsed with KaTeX
    flushList(i);
    renderedElements.push(
      <div key={`p-${i}`} className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm my-2">
        {renderMathText(line)}
      </div>
    );
  }

  // Flush any lingering list items at end of loop
  flushList(lines.length);

  return (
    <div className="space-y-1 select-text">
      {renderedElements}
    </div>
  );
}

function Ex51Q1Diagram() {
  return (
    <div className="my-6 p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Outfit Combinations Visualizer</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        
        {/* Shirt Box */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3 font-sans">1. Shirts</span>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="w-9 h-9 flex items-center justify-center border border-indigo-100 dark:border-indigo-950 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/10">
                <span className="text-[10px] font-mono font-bold text-indigo-500">S{i}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
            6 choices
          </span>
        </div>

        {/* Pant Box */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3 font-sans">2. Pants</span>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-9 h-9 flex items-center justify-center border border-emerald-100 dark:border-emerald-950 rounded-lg bg-emerald-50/20 dark:bg-emerald-950/10">
                <span className="text-[10px] font-mono font-bold text-emerald-500">P{i}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            4 choices
          </span>
        </div>

        {/* Coat Box */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-3 font-sans">3. Coats</span>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-9 h-9 flex items-center justify-center border border-amber-100 dark:border-amber-950 rounded-lg bg-amber-50/20 dark:bg-amber-950/10">
                <span className="text-[10px] font-mono font-bold text-amber-500">C{i}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
            3 choices
          </span>
        </div>

      </div>
      <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Multiplication Principle:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">6</span>
          <span className="text-slate-400">×</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">4</span>
          <span className="text-slate-400">×</span>
          <span className="text-amber-600 dark:text-amber-400 font-black">3</span>
          <span className="text-slate-400">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-2 py-0.5 rounded">72 ways</span>
        </div>
      </div>
    </div>
  );
}

function Ex51Q2Diagram() {
  return (
    <div className="my-6 p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Evening News Story Slots</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Lead Story */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wide mb-1 font-sans">Slot 1</span>
          <span className="text-xs font-black text-slate-850 dark:text-slate-200 mb-3 font-sans">Lead Story</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-500/10 mb-2">
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">7</span>
          </div>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 text-center font-mono">stories available</span>
        </div>

        {/* Second Story */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wide mb-1 font-sans">Slot 2</span>
          <span className="text-xs font-black text-slate-850 dark:text-slate-200 mb-3 font-sans">Second Story</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10 mb-2">
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">6</span>
          </div>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 text-center font-mono">stories remaining</span>
        </div>

        {/* Closing Story */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide mb-1 font-sans">Slot 3</span>
          <span className="text-xs font-black text-slate-850 dark:text-slate-200 mb-3 font-sans">Closing Story</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500/10 mb-2">
            <span className="text-lg font-black text-amber-600 dark:text-amber-400">5</span>
          </div>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 text-center font-mono">stories remaining</span>
        </div>

      </div>
      <div className="mt-5 flex justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Permutations:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">7</span>
          <span className="text-slate-400">×</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">6</span>
          <span className="text-slate-400">×</span>
          <span className="text-amber-600 dark:text-amber-400 font-black">5</span>
          <span className="text-slate-400">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-2 py-0.5 rounded">210 ways</span>
        </div>
      </div>
    </div>
  );
}

function Ex51Q3Diagram() {
  return (
    <div className="my-6 p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">4-Digit Garage Door Opener Code</h5>
      
      <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
        {[1, 2, 3, 4].map(idx => (
          <div key={idx} className="w-16 h-20 flex flex-col items-center justify-center p-2 bg-white dark:bg-slate-900 border-2 border-indigo-500/20 rounded-xl shadow-sm hover:border-indigo-500/60 transition-colors">
            <span className="text-[8px] font-mono font-bold text-indigo-500 mb-1 uppercase tracking-wider">Digit {idx}</span>
            <div className="text-xl font-black text-slate-800 dark:text-slate-100">10</div>
            <span className="text-[7px] text-slate-400 dark:text-slate-500 font-semibold">(0 to 9)</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1.5 max-w-[200px] mx-auto p-2 bg-slate-200/30 dark:bg-slate-950/40 rounded-xl mb-4 border border-slate-200/50 dark:border-slate-800/50">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
          <div key={n} className="aspect-square flex items-center justify-center font-mono font-bold text-[10px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 rounded shadow-sm select-none">
            {n}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center max-w-sm mx-auto">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Total Codes:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="font-black text-indigo-500">10</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-indigo-500">10</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-indigo-500">10</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-indigo-500">10</span>
          <span className="text-slate-400">=</span>
          <span className="font-black text-indigo-600 dark:text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded">10,000</span>
        </div>
      </div>
    </div>
  );
}

function Ex51Q5Diagram() {
  const [activeTab, setActiveTab] = React.useState<'a' | 'b' | 'c' | 'd'>('a');

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Registration Codes (A-L + 0-9)</h5>
      
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-1 justify-center mb-4 bg-slate-200/40 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-200/30 dark:border-slate-800/30">
        {[
          { id: 'a', label: 'Allowed' },
          { id: 'b', label: 'No Repeat' },
          { id: 'c', label: 'Identical' },
          { id: 'd', label: 'Grouped' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
        {activeTab === 'a' && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center">Letters can repeat (e.g., AA5, BB9, KL2)</span>
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-indigo-500/20 rounded-xl bg-indigo-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-indigo-500 uppercase tracking-wider">Letter 1</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">12</span>
                <span className="text-[6px] text-slate-400">(A-L)</span>
              </div>
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-indigo-500/20 rounded-xl bg-indigo-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-indigo-500 uppercase tracking-wider">Letter 2</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">12</span>
                <span className="text-[6px] text-slate-400">(A-L)</span>
              </div>
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-emerald-500/20 rounded-xl bg-emerald-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-emerald-500 uppercase tracking-wider">Digit</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">10</span>
                <span className="text-[6px] text-slate-400">(0-9)</span>
              </div>
            </div>
            <div className="font-mono text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              12 × 12 × 10 = 1,440 codes
            </div>
          </div>
        )}

        {activeTab === 'b' && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center">Letters must be different (no repetition, e.g., AB5, CK9)</span>
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-indigo-500/20 rounded-xl bg-indigo-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-indigo-500 uppercase tracking-wider">Letter 1</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">12</span>
                <span className="text-[6px] text-slate-400">(A-L)</span>
              </div>
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-indigo-500/20 rounded-xl bg-indigo-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-indigo-500 uppercase tracking-wider">Letter 2</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">11</span>
                <span className="text-[6px] text-slate-400">(remaining)</span>
              </div>
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-emerald-500/20 rounded-xl bg-emerald-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-emerald-500 uppercase tracking-wider">Digit</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">10</span>
                <span className="text-[6px] text-slate-400">(0-9)</span>
              </div>
            </div>
            <div className="font-mono text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              12 × 11 × 10 = 1,320 codes
            </div>
          </div>
        )}

        {activeTab === 'c' && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center">Two letters must be the same (e.g., AA5, BB9, LL2)</span>
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-indigo-500/20 rounded-xl bg-indigo-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-indigo-500 uppercase tracking-wider">Letter 1</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">12</span>
                <span className="text-[6px] text-slate-400">(A-L)</span>
              </div>
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-indigo-500/20 rounded-xl bg-indigo-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-indigo-500 uppercase tracking-wider">Letter 2</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">1</span>
                <span className="text-[6px] text-slate-400">(same as L1)</span>
              </div>
              <div className="w-14 h-14 flex flex-col items-center justify-center border-2 border-emerald-500/20 rounded-xl bg-emerald-500/5 text-center p-1">
                <span className="text-[7px] font-mono font-bold text-emerald-500 uppercase tracking-wider">Digit</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-200">10</span>
                <span className="text-[6px] text-slate-400">(0-9)</span>
              </div>
            </div>
            <div className="font-mono text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              12 × 1 × 10 = 120 codes
            </div>
          </div>
        )}

        {activeTab === 'd' && (
          <div className="flex flex-col items-center w-full">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center">Different letters, but both Vowels (A,E,I) or both Consonants</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-4">
              {/* Vowels */}
              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-2">Case 1: Both Vowels (3 choices)</span>
                <div className="flex gap-1.5 mb-2">
                  <div className="w-10 h-10 flex flex-col items-center justify-center border border-indigo-200 rounded-lg bg-indigo-50/5">
                    <span className="text-[7px] font-mono text-slate-400">L1</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">3</span>
                  </div>
                  <div className="w-10 h-10 flex flex-col items-center justify-center border border-indigo-200 rounded-lg bg-indigo-50/5">
                    <span className="text-[7px] font-mono text-slate-400">L2</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">2</span>
                  </div>
                  <div className="w-10 h-10 flex flex-col items-center justify-center border border-emerald-200 rounded-lg bg-emerald-50/5">
                    <span className="text-[7px] font-mono text-slate-400">Dig</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">10</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">3 × 2 × 10 = 60</span>
              </div>

              {/* Consonants */}
              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">Case 2: Both Consonants (9 choices)</span>
                <div className="flex gap-1.5 mb-2">
                  <div className="w-10 h-10 flex flex-col items-center justify-center border border-indigo-200 rounded-lg bg-indigo-50/5">
                    <span className="text-[7px] font-mono text-slate-400">L1</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">9</span>
                  </div>
                  <div className="w-10 h-10 flex flex-col items-center justify-center border border-indigo-200 rounded-lg bg-indigo-50/5">
                    <span className="text-[7px] font-mono text-slate-400">L2</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">8</span>
                  </div>
                  <div className="w-10 h-10 flex flex-col items-center justify-center border border-emerald-200 rounded-lg bg-emerald-50/5">
                    <span className="text-[7px] font-mono text-slate-400">Dig</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">10</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">9 × 8 × 10 = 720</span>
              </div>
            </div>

            <div className="font-mono text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              Total: 60 + 720 = 780 codes
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Ex52Q2Diagram() {
  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Newspaper Reporter Assignment Visualizer</h5>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Story 1 */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wide mb-1">Story 1</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3 text-center">First Topic Assignment</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-500/10 mb-2">
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">14</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">Available Reporters</span>
        </div>

        {/* Story 2 */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wide mb-1">Story 2</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3 text-center">Second Topic Assignment</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10 mb-2">
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">13</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">Remaining Reporters</span>
        </div>

        {/* Story 3 */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide mb-1">Story 3</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3 text-center">Third Topic Assignment</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500/10 mb-2">
            <span className="text-lg font-black text-amber-600 dark:text-amber-400">12</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">Remaining Reporters</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Permutation Calculation:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">14</span>
          <span className="text-slate-400">×</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">13</span>
          <span className="text-slate-400">×</span>
          <span className="text-amber-600 dark:text-amber-400 font-black">12</span>
          <span className="text-slate-400">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-2.5 py-1 rounded font-sans inline-flex items-center gap-0.5">
            <sup>14</sup>P<sub>3</sub> = 2,184 ways
          </span>
        </div>
      </div>
    </div>
  );
}

function Ex52Q3Diagram() {
  const flags = [
    { label: '1st Flag Position', count: 9, color: 'bg-rose-500 border-rose-600' },
    { label: '2nd Flag Position', count: 8, color: 'bg-sky-500 border-sky-600' },
    { label: '3rd Flag Position', count: 7, color: 'bg-emerald-500 border-emerald-600' },
    { label: '4th Flag Position', count: 6, color: 'bg-amber-500 border-amber-600' },
  ];

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">4-Flag Signal Sequences (From 9 Flags)</h5>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {flags.map((flag, idx) => (
          <div key={idx} className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">{flag.label}</span>
            
            {/* Wavy Flag Icon */}
            <div className="relative w-12 h-14 flex items-start mb-3">
              {/* Flagpole */}
              <div className="w-1.5 h-14 bg-slate-400 dark:bg-slate-600 rounded-full mr-1" />
              {/* Flag Cloth */}
              <div className={`w-8 h-6 rounded-r shadow-sm border text-white ${flag.color} flex items-center justify-center`}>
                <span className="text-[9px] font-bold">#{idx+1}</span>
              </div>
            </div>

            <div className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{flag.count}</div>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 text-center uppercase tracking-wider font-mono">choices</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center max-w-md mx-auto">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Signals:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="font-black text-rose-500">9</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-sky-500">8</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-emerald-500">7</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-amber-500">6</span>
          <span className="text-slate-400">=</span>
          <span className="font-black text-indigo-600 dark:text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded font-sans inline-flex items-center gap-0.5">
            <sup>9</sup>P<sub>4</sub> = 3,024
          </span>
        </div>
      </div>
    </div>
  );
}

function Ex52Q4Diagram() {
  const theaters = [
    { name: 'Theater A', cap: 'Largest Cap', choices: 12, border: 'border-violet-200 dark:border-violet-950', ring: 'ring-violet-500/20', bg: 'bg-violet-500/10', color: 'text-violet-600 dark:text-violet-400' },
    { name: 'Theater B', cap: 'Medium-Large Cap', choices: 11, border: 'border-fuchsia-200 dark:border-fuchsia-950', ring: 'ring-fuchsia-500/20', bg: 'bg-fuchsia-500/10', color: 'text-fuchsia-600 dark:text-fuchsia-400' },
    { name: 'Theater C', cap: 'Medium Cap', choices: 10, border: 'border-pink-200 dark:border-pink-950', ring: 'ring-pink-500/20', bg: 'bg-pink-500/10', color: 'text-pink-600 dark:text-pink-400' },
    { name: 'Theater D', cap: 'Smallest Cap', choices: 9, border: 'border-rose-200 dark:border-rose-950', ring: 'ring-rose-500/20', bg: 'bg-rose-500/10', color: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Movie-to-Theater Allocations Visualizer</h5>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {theaters.map((th, idx) => (
          <div key={idx} className={`flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border ${th.border} shadow-sm items-center relative overflow-hidden`}>
            {/* Screen Line representing Cinema Screen */}
            <div className="w-16 h-1.5 bg-slate-700 dark:bg-slate-400 rounded-full mb-3 shadow-inner" />
            
            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 mb-0.5">{th.name}</span>
            <span className="text-[8px] text-slate-400 dark:text-slate-500 mb-3 font-mono font-bold uppercase tracking-wider">{th.cap}</span>
            
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${th.bg} border-2 border-dashed ${th.border} mb-3`}>
              <span className={`text-xl font-black ${th.color}`}>{th.choices}</span>
            </div>
            
            <span className="text-[9px] text-slate-400 dark:text-slate-500 text-center">Movie Choices Available</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center max-w-md mx-auto">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Total Ways:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="font-black text-violet-500">12</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-fuchsia-500">11</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-pink-500">10</span>
          <span className="text-slate-400">×</span>
          <span className="font-black text-rose-500">9</span>
          <span className="text-slate-400">=</span>
          <span className="font-black text-indigo-600 dark:text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded font-sans inline-flex items-center gap-0.5">
            <sup>12</sup>P<sub>4</sub> = 11,880
          </span>
        </div>
      </div>
    </div>
  );
}

function Ex52Q5Diagram() {
  const [activeCase, setActiveCase] = React.useState<'case1' | 'case2'>('case1');

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Classroom Seating Diagram (8 Seats per Row)</h5>
      
      {/* Selector Tabs */}
      <div className="flex gap-2 justify-center mb-5 bg-slate-200/40 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-200/30 dark:border-slate-800/30 max-w-sm mx-auto">
        <button
          onClick={() => setActiveCase('case1')}
          className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
            activeCase === 'case1'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Case 1: Flexible sits Front
        </button>
        <button
          onClick={() => setActiveCase('case2')}
          className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
            activeCase === 'case2'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Case 2: Flexible sits Back
        </button>
      </div>

      {/* Classroom Desk Layout */}
      <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-inner mb-5">
        <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase mb-4">Board / Front of Class</div>
        
        {/* Front Row (8 Seats) */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 mb-2 gap-1 sm:gap-0">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">Front Row (8 seats)</span>
            <span className="text-[9px] font-sans bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
              {activeCase === 'case1' ? (
                <>6 Students occupied (<sup>8</sup>P<sub>6</sub>)</>
              ) : (
                <>5 Students occupied (<sup>8</sup>P<sub>5</sub>)</>
              )}
            </span>
          </div>
          <div className="grid grid-cols-8 gap-1.5 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
              const isOccupied = activeCase === 'case1' ? s <= 6 : s <= 5;
              const isFlexibleStudent = activeCase === 'case1' && s === 6;
              return (
                <div
                  key={`front-${s}`}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                    isFlexibleStudent
                      ? 'bg-amber-500/10 border-amber-500 text-amber-500 ring-2 ring-amber-500/20'
                      : isOccupied
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500'
                      : 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 border-dashed'
                  }`}
                >
                  <span className="text-[9px] font-bold">{isFlexibleStudent ? 'Flex' : isOccupied ? `S` : ''}</span>
                  <span className="text-[7px] opacity-70 leading-none">{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back Row (8 Seats) */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1 mb-2 gap-1 sm:gap-0">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Back Row (8 seats)</span>
            <span className="text-[9px] font-sans bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
              {activeCase === 'case1' ? (
                <>4 Students occupied (<sup>8</sup>P<sub>4</sub>)</>
              ) : (
                <>5 Students occupied (<sup>8</sup>P<sub>5</sub>)</>
              )}
            </span>
          </div>
          <div className="grid grid-cols-8 gap-1.5 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => {
              const isOccupied = activeCase === 'case1' ? s <= 4 : s <= 5;
              const isFlexibleStudent = activeCase === 'case2' && s === 5;
              return (
                <div
                  key={`back-${s}`}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                    isFlexibleStudent
                      ? 'bg-amber-500/10 border-amber-500 text-amber-500 ring-2 ring-amber-500/20'
                      : isOccupied
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 border-dashed'
                  }`}
                >
                  <span className="text-[9px] font-bold">{isFlexibleStudent ? 'Flex' : isOccupied ? `S` : ''}</span>
                  <span className="text-[7px] opacity-70 leading-none">{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Details and Calculations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className={`p-4 rounded-xl border transition-all ${
          activeCase === 'case1'
            ? 'bg-indigo-500/5 border-indigo-500/30'
            : 'bg-slate-100/30 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800'
        }`}>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 block font-sans">Case 1: Flexible student in Front Row</span>
          <ul className="text-[10px] text-slate-600 dark:text-slate-400 space-y-2 sm:space-y-1 mb-2 leading-relaxed">
            <li>• Front Row Occupied: <strong className="text-indigo-500">5 + 1 = 6 students</strong></li>
            <li>• Front Ways: <strong className="font-sans font-bold inline-flex flex-wrap items-center gap-0.5"><sup>8</sup>P<sub>6</sub> = 20,160</strong></li>
            <li>• Back Row Occupied: <strong className="text-emerald-500">4 students</strong></li>
            <li>• Back Ways: <strong className="font-sans font-bold inline-flex flex-wrap items-center gap-0.5"><sup>8</sup>P<sub>4</sub> = 1,680</strong></li>
          </ul>
          <div className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 p-1.5 rounded text-center">
            20,160 × 1,680 = 33,868,800 ways
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          activeCase === 'case2'
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : 'bg-slate-100/30 dark:bg-slate-950/20 border-slate-100 dark:border-slate-800'
        }`}>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 block font-sans">Case 2: Flexible student in Back Row</span>
          <ul className="text-[10px] text-slate-600 dark:text-slate-400 space-y-2 sm:space-y-1 mb-2 leading-relaxed">
            <li>• Front Row Occupied: <strong className="text-indigo-500">5 students</strong></li>
            <li>• Front Ways: <strong className="font-sans font-bold inline-flex flex-wrap items-center gap-0.5"><sup>8</sup>P<sub>5</sub> = 6,720</strong></li>
            <li>• Back Row Occupied: <strong className="text-emerald-500">4 + 1 = 5 students</strong></li>
            <li>• Back Ways: <strong className="font-sans font-bold inline-flex flex-wrap items-center gap-0.5"><sup>8</sup>P<sub>5</sub> = 6,720</strong></li>
          </ul>
          <div className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 p-1.5 rounded text-center">
            6,720 × 6,720 = 45,158,400 ways
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Addition Principle (Sum of Both Disjoint Cases):</span>
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">33,868,800</span>
          <span className="text-slate-400 font-bold">+</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">45,158,400</span>
          <span className="text-slate-400 font-bold">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-3 py-1 rounded">
            79,027,200 total ways
          </span>
        </div>
      </div>
    </div>
  );
}

function Example10Diagram() {
  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Committee Selection (3 Roles from 15 Candidates)</h5>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* President */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wide mb-1">Role 1</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3 text-center">President Selection</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-indigo-500 bg-indigo-500/10 mb-2">
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">15</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">Candidates Available</span>
        </div>

        {/* Treasurer */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wide mb-1">Role 2</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3 text-center">Treasurer Selection</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10 mb-2">
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">14</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">Candidates Remaining</span>
        </div>

        {/* Secretary */}
        <div className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-950 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide mb-1">Role 3</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200 mb-3 text-center">Secretary Selection</span>
          <div className="w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500/10 mb-2">
            <span className="text-lg font-black text-amber-600 dark:text-amber-400">13</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center">Candidates Remaining</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Permutation Calculation:</span>
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">15</span>
          <span className="text-slate-400">×</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">14</span>
          <span className="text-slate-400">×</span>
          <span className="text-amber-600 dark:text-amber-400 font-black">13</span>
          <span className="text-slate-400">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-2.5 py-1 rounded font-sans inline-flex items-center gap-0.5">
            <sup>15</sup>P<sub>3</sub> = 2,730 ways
          </span>
        </div>
      </div>
    </div>
  );
}

function Example11Diagram() {
  const letters = [
    { name: 'P', color: 'border-rose-100 dark:border-rose-950/40 bg-rose-500/5 text-rose-500', choices: 6, position: '1st Box' },
    { name: 'E', color: 'border-sky-100 dark:border-sky-950/40 bg-sky-500/5 text-sky-500', choices: 5, position: '2nd Box' },
    { name: 'N', color: 'border-emerald-100 dark:border-emerald-950/40 bg-emerald-500/5 text-emerald-500', choices: 4, position: '3rd Box' },
    { name: 'C', color: 'border-amber-100 dark:border-amber-950/40 bg-amber-500/5 text-amber-500', choices: 3, position: '4th Box' },
    { name: 'I', color: 'border-fuchsia-100 dark:border-fuchsia-950/40 bg-fuchsia-500/5 text-fuchsia-500', choices: 2, position: '5th Box' },
    { name: 'L', color: 'border-indigo-100 dark:border-indigo-950/40 bg-indigo-500/5 text-indigo-500', choices: 1, position: '6th Box' },
  ];

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Arranging All 6 Letters of "PENCIL"</h5>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
        {letters.map((letObj, idx) => (
          <div key={idx} className={`flex flex-col p-3 bg-white dark:bg-slate-900 rounded-xl border ${letObj.color.split(' ')[0]} shadow-sm items-center`}>
            <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-2">{letObj.position}</span>
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 ${letObj.color.split(' ').slice(1).join(' ')} font-black text-sm mb-2`}>
              {letObj.name}
            </div>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">{letObj.choices}</span>
            <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">ways</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Factorial Permutation:</span>
        <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-xs md:text-sm">
          <span className="text-rose-500 font-bold">6</span>
          <span className="text-slate-400">×</span>
          <span className="text-sky-500 font-bold">5</span>
          <span className="text-slate-400">×</span>
          <span className="text-emerald-500 font-bold">4</span>
          <span className="text-slate-400">×</span>
          <span className="text-amber-500 font-bold">3</span>
          <span className="text-slate-400">×</span>
          <span className="text-fuchsia-500 font-bold">2</span>
          <span className="text-slate-400">×</span>
          <span className="text-indigo-500 font-bold">1</span>
          <span className="text-slate-400">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-2.5 py-0.5 rounded font-sans inline-flex items-center gap-0.5 ml-1">
            6! = 720 ways
          </span>
        </div>
      </div>
    </div>
  );
}

function Example12Diagram() {
  const [activeBus, setActiveBus] = React.useState<'both' | 'busA' | 'busB'>('both');

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">4 People Seating on Either Bus A or Bus B</h5>
      
      {/* Bus Toggle Selector */}
      <div className="flex gap-2 justify-center mb-5 bg-slate-200/40 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-200/30 dark:border-slate-800/30 max-w-sm mx-auto">
        <button
          onClick={() => setActiveBus('both')}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeBus === 'both'
              ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Show Both Buses
        </button>
        <button
          onClick={() => setActiveBus('busA')}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeBus === 'busA'
              ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Bus A Only
        </button>
        <button
          onClick={() => setActiveBus('busB')}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeBus === 'busB'
              ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Bus B Only
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Bus A */}
        {(activeBus === 'both' || activeBus === 'busA') && (
          <div className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-sans">Bus A (5 Vacant Seats)</span>
              <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md">
                Case 1
              </span>
            </div>
            
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">4 people seated in 5 available seats (order matters):</p>
            
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={`seatA-${s}`} className="w-10 h-10 rounded-lg border-2 border-indigo-200 dark:border-indigo-950 bg-indigo-500/5 flex flex-col items-center justify-center">
                  <span className="text-[7px] text-indigo-400 uppercase font-black tracking-widest">Seat {s}</span>
                  <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400">{s <= 4 ? `P${s}` : 'Empty'}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-indigo-500/5 rounded-lg border border-indigo-100 dark:border-indigo-950/50 text-center font-sans text-xs">
              <sup>5</sup>P<sub>4</sub> = 5 × 4 × 3 × 2 = <strong className="text-indigo-600 dark:text-indigo-400 font-bold">120 ways</strong>
            </div>
          </div>
        )}

        {/* Bus B */}
        {(activeBus === 'both' || activeBus === 'busB') && (
          <div className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-950 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-sans">Bus B (4 Vacant Seats)</span>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                Case 2
              </span>
            </div>
            
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4">4 people seated in 4 available seats (all filled):</p>
            
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={`seatB-${s}`} className="w-10 h-10 rounded-lg border-2 border-emerald-200 dark:border-emerald-950 bg-emerald-500/5 flex flex-col items-center justify-center">
                  <span className="text-[7px] text-emerald-400 uppercase font-black tracking-widest">Seat {s}</span>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 font-bold">P{s}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-emerald-500/5 rounded-lg border border-emerald-100 dark:border-emerald-950/50 text-center font-sans text-xs">
              <sup>4</sup>P<sub>4</sub> = 4! = 4 × 3 × 2 × 1 = <strong className="text-emerald-600 dark:text-emerald-400 font-bold">24 ways</strong>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-sans">Addition Principle (Disjoint Cases):</span>
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">120 ways (Bus A)</span>
          <span className="text-slate-400 font-bold">+</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">24 ways (Bus B)</span>
          <span className="text-slate-400 font-bold">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-3 py-1 rounded">
            144 total ways
          </span>
        </div>
      </div>
    </div>
  );
}

function Example13Diagram() {
  const [activeCase, setActiveCase] = React.useState<'both' | 'left' | 'right'>('both');

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">6 Books Arranged with Dictionary at one End</h5>
      
      {/* Case Toggle Selector */}
      <div className="flex gap-2 justify-center mb-5 bg-slate-200/40 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-200/30 dark:border-slate-800/30 max-w-sm mx-auto">
        <button
          onClick={() => setActiveCase('both')}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeCase === 'both'
              ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Show Both Cases
        </button>
        <button
          onClick={() => setActiveCase('left')}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeCase === 'left'
              ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Left End Only
        </button>
        <button
          onClick={() => setActiveCase('right')}
          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            activeCase === 'right'
              ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Right End Only
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 font-sans">
        {/* Case 1: Left End */}
        {(activeCase === 'both' || activeCase === 'left') && (
          <div className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200">Case 1: Dictionary at Left End</span>
              <span className="text-[10px] font-bold bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-sans">
                1 × 5! = 120
              </span>
            </div>
            
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-6">Dictionary fixed on the far left. The remaining 5 books are permuted on the remaining 5 spaces.</p>
            
            {/* Shelf visualization */}
            <div className="flex items-end justify-center gap-1.5 sm:gap-4 bg-slate-100/50 dark:bg-slate-950/30 p-2 sm:p-4 rounded-xl border border-slate-200/20 mb-3 h-32 sm:h-36 relative">
              <div className="absolute bottom-1 w-[90%] h-1 bg-amber-800 dark:bg-amber-900/50 rounded-full" />
              
              {/* Slot 1: Dictionary Group */}
              <div className="flex flex-col items-center gap-1 sm:gap-2 pb-1 z-10">
                <span className="text-[7px] sm:text-[9px] font-bold text-rose-500 dark:text-rose-400 bg-rose-500/10 px-1 sm:px-1.5 py-0.5 rounded border border-rose-500/20 whitespace-nowrap">
                  1 way
                </span>
                <div className="w-7 sm:w-9 h-16 sm:h-20 bg-rose-500 dark:bg-rose-600 border border-rose-600 dark:border-rose-700 rounded-md flex flex-col items-center justify-center text-white font-black shadow-sm">
                  <span className="text-[5px] sm:text-[6px] uppercase tracking-widest leading-none font-bold text-rose-100">Dict</span>
                  <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">D</span>
                </div>
              </div>

              {/* Slot 2-6: Books Group */}
              <div className="flex flex-col items-center gap-1 sm:gap-2 pb-1 z-10">
                <span className="text-[7px] sm:text-[9px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1 sm:px-1.5 py-0.5 rounded border border-sky-500/20 whitespace-nowrap">
                  5 Books (5! = 120 ways)
                </span>
                <div className="flex items-end gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <div key={`bookL-${b}`} className="w-5 sm:w-7 h-12 sm:h-16 bg-sky-500 dark:bg-sky-600 border border-sky-600 dark:border-sky-700 rounded-md flex flex-col items-center justify-center text-white font-black shadow-sm">
                      <span className="text-[5px] sm:text-[6px] uppercase font-bold text-sky-100">Book</span>
                      <span className="text-[8px] sm:text-[10px]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case 2: Right End */}
        {(activeCase === 'both' || activeCase === 'right') && (
          <div className="flex flex-col p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-950 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 font-sans">Case 2: Dictionary at Right End</span>
              <span className="text-[10px] font-bold bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-indigo-900 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-sans">
                1 × 5! = 120
              </span>
            </div>
            
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-6">Dictionary fixed on the far right. The remaining 5 books are permuted on the remaining 5 spaces.</p>
            
            {/* Shelf visualization */}
            <div className="flex items-end justify-center gap-1.5 sm:gap-4 bg-slate-100/50 dark:bg-slate-950/30 p-2 sm:p-4 rounded-xl border border-slate-200/20 mb-3 h-32 sm:h-36 relative">
              <div className="absolute bottom-1 w-[90%] h-1 bg-amber-800 dark:bg-amber-900/50 rounded-full" />
              
              {/* Slot 1-5: Books Group */}
              <div className="flex flex-col items-center gap-1 sm:gap-2 pb-1 z-10">
                <span className="text-[7px] sm:text-[9px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1 sm:px-1.5 py-0.5 rounded border border-sky-500/20 whitespace-nowrap">
                  5 Books (5! = 120 ways)
                </span>
                <div className="flex items-end gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((b) => (
                    <div key={`bookR-${b}`} className="w-5 sm:w-7 h-12 sm:h-16 bg-sky-500 dark:bg-sky-600 border border-sky-600 dark:border-sky-700 rounded-md flex flex-col items-center justify-center text-white font-black shadow-sm">
                      <span className="text-[5px] sm:text-[6px] uppercase font-bold text-sky-100">Book</span>
                      <span className="text-[8px] sm:text-[10px]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slot 6: Dictionary Group */}
              <div className="flex flex-col items-center gap-1 sm:gap-2 pb-1 z-10">
                <span className="text-[7px] sm:text-[9px] font-bold text-rose-500 dark:text-rose-400 bg-rose-500/10 px-1 sm:px-1.5 py-0.5 rounded border border-rose-500/20 whitespace-nowrap">
                  1 way
                </span>
                <div className="w-7 sm:w-9 h-16 sm:h-20 bg-rose-500 dark:bg-rose-600 border border-rose-600 dark:border-rose-700 rounded-md flex flex-col items-center justify-center text-white font-black shadow-sm">
                  <span className="text-[5px] sm:text-[6px] uppercase tracking-widest leading-none font-bold text-rose-100">Dict</span>
                  <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">D</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center font-sans">
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Addition Principle (Disjoint End Cases):</span>
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs md:text-sm">
          <span className="text-indigo-600 dark:text-indigo-400 font-black">120 ways (Left End)</span>
          <span className="text-slate-400 font-bold">+</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">120 ways (Right End)</span>
          <span className="text-slate-400 font-bold">=</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-black bg-indigo-500/20 px-3 py-1 rounded">
            240 total ways
          </span>
        </div>
      </div>
    </div>
  );
}

function CombinationsIntroDiagram() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (student: string) => {
    if (selected.includes(student)) {
      setSelected(selected.filter((s) => s !== student));
    } else {
      if (selected.length < 2) {
        setSelected([...selected, student]);
      } else {
        // Replace the second one or shift
        setSelected([selected[1], student]);
      }
    }
  };

  const getTeamName = () => {
    if (selected.length < 2) return '';
    const sorted = [...selected].sort();
    return `{${sorted[0]}, ${sorted[1]}}`;
  };

  const getPermutations = () => {
    if (selected.length < 2) return [];
    return [`(${selected[0]}, ${selected[1]})`, `(${selected[1]}, ${selected[0]})`];
  };

  const resetSelection = () => {
    setSelected([]);
  };

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Interactive: Form a Quiz Team (2 Students from 3)</h5>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-5 max-w-lg mx-auto">
        ကျောင်းသား 3 ယောက်ထဲမှ 2 ယောက်ပါသော အဖွဲ့တစ်ဖွဲ့ကို ရွေးချယ်ကြည့်ပါ။ ရွေးချယ်မှုအစီအစဉ် ပြောင်းလဲသော်လည်း အဖွဲ့တူပုံကို လေ့လာပါ။
      </p>

      {/* Available Students Grid */}
      <div className="flex justify-center gap-4 sm:gap-8 mb-6">
        {[
          { id: 'A', name: 'Student A', color: 'bg-blue-500 border-blue-600 dark:border-blue-400 text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
          { id: 'B', name: 'Student B', color: 'bg-emerald-500 border-emerald-600 dark:border-emerald-400 text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
          { id: 'C', name: 'Student C', color: 'bg-purple-500 border-purple-600 dark:border-purple-400 text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' },
        ].map((s) => {
          const isSelected = selected.includes(s.id);
          const orderIndex = selected.indexOf(s.id);
          return (
            <button
              key={s.id}
              onClick={() => handleToggle(s.id)}
              className={`relative flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all w-20 sm:w-24 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/30 shadow-md scale-105'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-200 bg-white dark:bg-slate-900'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl border-2 ${
                isSelected ? 'bg-indigo-500 text-white border-indigo-600' : `${s.bg} ${s.color} border-slate-200 dark:border-slate-700`
              }`}>
                {s.id}
              </div>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mt-2">{s.name}</span>
              
              {/* Selection Badge / Order Number */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow border border-white dark:border-slate-900">
                  {orderIndex + 1}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Results Display */}
      <div className="min-h-[140px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl p-4 sm:p-5 shadow-inner">
        {selected.length === 0 ? (
          <div className="text-slate-400 dark:text-slate-500 text-center text-xs">
            <span className="block font-bold mb-1">Select 2 students above</span>
            အထက်ပါ ကျောင်းသားများထဲမှ ၂ ယောက်ကို နှိပ်၍ ရွေးချယ်ပါ။
          </div>
        ) : selected.length === 1 ? (
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-indigo-500">Selected {selected[0]}</span>. Need 1 more student to complete the team.
            <div className="mt-2 text-[10px] text-slate-400">အဖွဲ့ပြည့်ရန် ကျောင်းသား ၁ ယောက် ထပ်ရွေးပါ။</div>
          </div>
        ) : (
          <div className="w-full max-w-md flex flex-col gap-4">
            {/* Selection Order */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3 gap-2">
              <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-wider">Selection Order:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-bold text-slate-700 dark:text-slate-300">
                  1st: {selected[0]}
                </span>
                <span className="text-slate-300 font-bold">→</span>
                <span className="font-mono text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-bold text-slate-700 dark:text-slate-300">
                  2nd: {selected[1]}
                </span>
              </div>
            </div>

            {/* Permutation vs Combination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Permutation Section */}
              <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                <div className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1.5">Permutation (Order Matters)</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                  အစီအစဉ်အရေးကြီးလျှင် နေရာမတူသောကြောင့် <strong>2 နည်း</strong> ဖြစ်သည်။
                </div>
                <div className="flex gap-1.5 font-mono text-[10px] font-bold">
                  {getPermutations().map((p, idx) => (
                    <span key={idx} className="bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Combination Section */}
              <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                <div className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1.5">Combination (Selection Only)</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                  အဖွဲ့ဖွဲ့ခြင်းဖြစ်၍ အစီအစဉ်မလိုဘဲ <strong>1 နည်းသာ</strong> ဖြစ်သည်။
                </div>
                <div className="font-mono text-[10px] font-bold inline-block">
                  <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                    {getTeamName()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-indigo-500/5 p-2.5 rounded-lg border border-indigo-500/10 text-[10px] text-slate-500 dark:text-slate-400 font-medium gap-2">
              <span className="text-center sm:text-left">
                {`Therefore, {${selected[0]}, ${selected[1]}} = {${selected[1]}, ${selected[0]}} results in the same team!`}
              </span>
              <button
                onClick={resetSelection}
                className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shrink-0"
              >
                Reset Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CombinationsFormulaView() {
  const [n, setN] = React.useState<number>(5);
  const [r, setR] = React.useState<number>(2);

  // Maintain r <= n
  const handleNChange = (val: number) => {
    setN(val);
    if (r > val) {
      setR(val);
    }
  };

  const handleRChange = (val: number) => {
    if (val <= n) {
      setR(val);
    }
  };

  // Calculations
  const getFactorial = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const getPermutation = (nVal: number, rVal: number): number => {
    let res = 1;
    for (let i = 0; i < rVal; i++) {
      res *= (nVal - i);
    }
    return res;
  };

  const getCombination = (nVal: number, rVal: number): number => {
    return getPermutation(nVal, rVal) / getFactorial(rVal);
  };

  const permVal = getPermutation(n, r);
  const factR = getFactorial(r);
  const combVal = getCombination(n, r);

  // Render step multiplier representation e.g. 5 * 4 * 3
  const getNumeratorSteps = () => {
    if (r === 0) return '1';
    const steps = [];
    for (let i = 0; i < r; i++) {
      steps.push(n - i);
    }
    return steps.join(' \\times ');
  };

  const getDenominatorSteps = () => {
    if (r === 0) return '1';
    const steps = [];
    for (let i = r; i >= 1; i--) {
      steps.push(i);
    }
    return steps.join(' \\times ');
  };

  return (
    <div className="my-6 p-3.5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Interactive Combination Formula Explorer</h5>

      {/* Input Controls */}
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
        {/* N input */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-150 dark:border-slate-800/80">
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-2">n (Total Items)</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNChange(Math.max(1, n - 1))}
              disabled={n <= 1}
              className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors flex items-center justify-center disabled:opacity-40 text-sm"
            >
              -
            </button>
            <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono w-4 text-center">{n}</span>
            <button
              onClick={() => handleNChange(Math.min(10, n + 1))}
              disabled={n >= 10}
              className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors flex items-center justify-center disabled:opacity-40 text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* R input */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-150 dark:border-slate-800/80">
          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-2">r (Choose Items)</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleRChange(Math.max(0, r - 1))}
              disabled={r <= 0}
              className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors flex items-center justify-center disabled:opacity-40 text-sm"
            >
              -
            </button>
            <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono w-4 text-center">{r}</span>
            <button
              onClick={() => handleRChange(Math.min(n, r + 1))}
              disabled={r >= n}
              className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors flex items-center justify-center disabled:opacity-40 text-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-[10px] uppercase font-bold text-slate-400 mb-2">Visualizing Selection ({r} items highlighted out of {n})</span>
        <div className="flex flex-wrap justify-center gap-2 max-w-md bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-inner w-full">
          {Array.from({ length: n }).map((_, idx) => {
            const isChosen = idx < r;
            return (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all shadow-sm ${
                  isChosen
                    ? 'bg-indigo-500 border-indigo-600 text-white scale-105 shadow-indigo-500/25 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-250 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                }`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Formula Output Block */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col items-center shadow-sm w-full overflow-hidden">
        <div className="text-[10px] uppercase font-black text-indigo-500 tracking-wider mb-3">Formula Derivation & Value</div>
        
        {/* Dynamic LaTex calculation formula */}
        <div className="w-full overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800/60">
          {renderMathText(`$$ \\binom{${n}}{${r}} = \\frac{{}^{${n}}P_{${r}}}{${r}!} = \\frac{${getNumeratorSteps()}}{${getDenominatorSteps()}} = \\frac{${permVal}}{${factR}} = ${combVal} $$`)}
        </div>

        {/* Explain the parts */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 text-[10px] text-slate-500 dark:text-slate-400 pt-3">
          <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 mb-0.5 flex items-center gap-1">
              Permutation {renderMathText(`$^{${n}}P_{${r}}$`)}:
            </span>
            <span>အစီအစဉ်စီလျှင် {permVal} နည်းရှိသည်။</span>
          </div>
          <div className="text-center flex flex-col items-center justify-center">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 mb-0.5 flex items-center gap-1">
              Duplicates Divider {renderMathText(`$${r}!$`)}:
            </span>
            <span>အုပ်စုတစ်ခုစီအတွင်း နေရာပြောင်းလဲနိုင်သော ထပ်နေသည့်နည်းလမ်း {factR} နည်းဖြင့် စားပေးရသည်။</span>
          </div>
          <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 mb-0.5 flex items-center gap-1">
              Combination {renderMathText(`$\\binom{${n}}{${r}}$`)}:
            </span>
            <span>အစီအစဉ်မလိုသော သီးသန့်အဖွဲ့ပေါင်း {combVal} အဖွဲ့ ရရှိသည်။</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const POOL_OF_PEOPLE = [
  { id: 'A', name: 'Aung Aung', color: 'bg-rose-500/10 border-rose-500/30 dark:border-rose-500/20 text-rose-600 dark:text-rose-400' },
  { id: 'B', name: 'Bo Bo', color: 'bg-amber-500/10 border-amber-500/30 dark:border-amber-500/20 text-amber-600 dark:text-amber-400' },
  { id: 'C', name: 'Chit Chit', color: 'bg-emerald-500/10 border-emerald-500/30 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
  { id: 'D', name: 'Daw Daw', color: 'bg-teal-500/10 border-teal-500/30 dark:border-teal-500/20 text-teal-600 dark:text-teal-400' },
  { id: 'E', name: 'Ei Ei', color: 'bg-blue-500/10 border-blue-500/30 dark:border-blue-500/20 text-blue-600 dark:text-blue-400' },
  { id: 'F', name: 'Hla Hla', color: 'bg-indigo-500/10 border-indigo-500/30 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400' },
  { id: 'G', name: 'Kyaw Kyaw', color: 'bg-violet-500/10 border-violet-500/30 dark:border-violet-500/20 text-violet-700 dark:text-violet-400' },
  { id: 'H', name: 'Mya Mya', color: 'bg-purple-500/10 border-purple-500/30 dark:border-purple-500/20 text-purple-600 dark:text-purple-400' },
  { id: 'I', name: 'Nyi Nyi', color: 'bg-fuchsia-500/10 border-fuchsia-500/30 dark:border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400' },
  { id: 'J', name: 'Tun Tun', color: 'bg-pink-500/10 border-pink-500/30 dark:border-pink-500/20 text-pink-600 dark:text-pink-400' }
];

function Example14Diagram() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(['A', 'B', 'C', 'D']);
  const [shuffledIds, setShuffledIds] = React.useState<string[]>(['A', 'B', 'C', 'D']);

  React.useEffect(() => {
    setShuffledIds([...selectedIds]);
  }, [selectedIds]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace first element to maintain size 4 if clicked on a new one
        setSelectedIds([...selectedIds.slice(1), id]);
      }
    }
  };

  const selectRandomFour = () => {
    const shuffled = [...POOL_OF_PEOPLE].sort(() => 0.5 - Math.random());
    const randomFour = shuffled.slice(0, 4).map(p => p.id);
    setSelectedIds(randomFour);
  };

  const shuffleOrder = () => {
    if (selectedIds.length === 4) {
      setShuffledIds([...selectedIds].sort(() => 0.5 - Math.random()));
    }
  };

  const resetSelection = () => {
    setSelectedIds([]);
  };

  const selectedPeople = POOL_OF_PEOPLE.filter(p => selectedIds.includes(p.id));
  const shuffledPeople = shuffledIds.map(id => POOL_OF_PEOPLE.find(p => p.id === id)).filter(Boolean) as typeof POOL_OF_PEOPLE;

  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Interactive: Select a Committee of 4 from 10 People</h5>
      
      {/* Pool of 10 People */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
          <span className="text-[11px] uppercase font-black text-slate-500 dark:text-slate-400">Available Pool (10 People)</span>
          <div className="flex gap-2">
            <button
              onClick={selectRandomFour}
              className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded transition-colors"
            >
              Select Random 4
            </button>
            <button
              onClick={resetSelection}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {POOL_OF_PEOPLE.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm scale-[1.02]'
                    : 'bg-white/50 dark:bg-slate-900/30 border-slate-150 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${p.color}`}>
                  {p.id}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">{p.name}</p>
                  <p className="text-[8px] text-slate-400 dark:text-slate-500 leading-none mt-0.5">
                    {isSelected ? 'Selected' : 'Click to add'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Committee Display */}
      <div className="p-4 bg-white dark:bg-slate-955 rounded-xl border border-slate-150 dark:border-slate-800 shadow-inner mb-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            Selected Committee ({selectedIds.length}/4)
          </span>
          {selectedIds.length === 4 && (
            <button
              onClick={shuffleOrder}
              className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 px-2 py-1 rounded flex items-center gap-1 transition-all"
              title="Change selection order to see if committee changes"
            >
              <RefreshCw className="w-3 h-3" />
              Shuffle Selection Order
            </button>
          )}
        </div>

        {selectedIds.length < 4 ? (
          <div className="flex flex-col items-center justify-center py-6 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            <Users className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs text-center px-4">ကော်မတီဖွဲ့ရန် လူ {4 - selectedIds.length} ယောက် ထပ်မံရွေးချယ်ပါဦး။</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visual list showing selected order */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                <span className="text-xs font-mono text-slate-400 font-bold">Committee = </span>
                <span className="text-xl font-bold text-indigo-500 font-mono">{"{"}</span>
                {shuffledPeople.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <div className="flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1.5 rounded-lg animate-in fade-in zoom-in duration-200">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center font-bold text-[8px] ${p.color}`}>
                        {p.id}
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.name}</span>
                    </div>
                    {idx < 3 && <span className="text-slate-400 text-xs font-bold font-mono">,</span>}
                  </React.Fragment>
                ))}
                <span className="text-xl font-bold text-indigo-500 font-mono">{"}"}</span>
              </div>
            </div>

            {/* Note on Order */}
            <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/15 text-xs text-indigo-800 dark:text-indigo-300">
              <p className="leading-relaxed">
                💡 <strong>Shuffle Order ကိုနှိပ်ကြည့်ပါ-</strong> အုပ်စုဝင်များကို မည်သို့ပင် အစီအစဉ်ပြောင်းလဲပါစေ ဖွဲ့စည်းထားသော ကော်မတီအဖွဲ့ဝင် ၄ ဦးမှာ အတူတူပင်ဖြစ်သောကြောင့် <strong>တစ်ခုတည်းသော ကော်မတီနည်းလမ်း (Combination)</strong> သာ ဖြစ်သည်။
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Calculations Block */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col shadow-sm">
        <div className="text-[10px] uppercase font-black text-indigo-500 tracking-wider mb-2.5 text-center md:text-left">
          Mathematics & Verification
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800/60">
          {/* Left: Combination */}
          <div className="pb-3 md:pb-0 md:pr-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                Combination Formula:
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                အစီအစဉ်မလိုဘဲ လူ ၁၀ ယောက်ထဲမှ ၄ ယောက် ရွေးယူသည့်နည်းလမ်းစုစုပေါင်း:
              </p>
            </div>
            
            <div className="w-full p-3 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 overflow-x-auto">
              <div className="text-sm select-none text-slate-800 dark:text-slate-100 w-full">
                {renderMathText(`$$ {}^{10}C_4 = \\binom{10}{4} = \\frac{10 \\cdot 9 \\cdot 8 \\cdot 7}{4 \\cdot 3 \\cdot 2 \\cdot 1} = 210 \\text{ နည်း} $$`)}
              </div>
            </div>
          </div>

          {/* Right: Permutation Relationship */}
          <div className="pt-3 md:pt-0 md:pl-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                Permutation Viewpoint:
              </span>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3 flex flex-wrap items-center gap-1">
                <span>ရွေးထားသော ကော်မတီဝင် ၄ ယောက်ကို အစီအစဉ်တကျ ပြန်စီနိုင်သော နည်းလမ်းမှာ</span>
                {renderMathText(`$ 4! = 24 $`)}
                <span>နည်း ဖြစ်သည်။ ထို့ကြောင့် Combination နည်းလမ်း</span>
                {renderMathText(`$ 210 $`)}
                <span>ကို</span>
                {renderMathText(`$ 4! $`)}
                <span>ဖြင့် မြှောက်လျှင် Permutation အရေအတွက်ကို ရရှိသည်-</span>
              </div>
            </div>

            <div className="w-full p-3 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 overflow-x-auto">
              <div className="text-sm select-none text-slate-800 dark:text-slate-100 w-full">
                {renderMathText(`$$ 210 \\cdot 4! = {}^{10}P_4 = 5040 \\text{ နည်း} $$`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Example15Diagram() {
  const [n, setN] = React.useState<number>(21);
  const [r, setR] = React.useState<number>(19);

  const presets = [
    { label: '^{21}C_1', n: 21, r: 1, desc: 'တစ်ခုတည်းသာ ရွေးချယ်ခြင်း' },
    { label: '^{21}C_{21}', n: 21, r: 21, desc: 'အားလုံးကို ရွေးချယ်ခြင်း' },
    { label: '^{21}C_{19}', n: 21, r: 19, desc: 'တစ်ခုချန်ပြီး ကျန်အားလုံးရွေးခြင်း' },
    { label: '^{21}C_2', n: 21, r: 2, desc: '၂ ခုကို ရွေးချယ်ခြင်း' }
  ];

  // Helper to calculate factorial safely
  const getFact = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  // Helper to calculate combinations safely
  const getComb = (nVal: number, rVal: number): number => {
    if (rVal < 0 || rVal > nVal) return 0;
    if (rVal === 0 || rVal === nVal) return 1;
    let num = 1;
    for (let i = 0; i < rVal; i++) {
      num *= (nVal - i);
    }
    return Math.round(num / getFact(rVal));
  };

  const combVal = getComb(n, r);

  // Generate cancellation steps
  const renderFormulaSteps = () => {
    if (r < 0 || r > n) return null;

    if (r === 0) {
      return (
        <div className="space-y-3 ">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-150 dark:border-slate-800">
            <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1">
              Formula:
            </span>
            {renderMathText(`$$ \\binom{${n}}{0} = 1 $$`)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            မည်သည့်အရာမှ မရွေးချယ်သောနည်းလမ်းမှာ မရွေးဘဲအလွတ်ထားသည့် <strong>၁ နည်း</strong> သာ ရှိသည်။
          </p>
        </div>
      );
    }

    if (r === n) {
      return (
        <div className="space-y-3 ">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-150 dark:border-slate-800">
            <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1">
              Formula:
            </span>
            {renderMathText(`$$ \\binom{${n}}{${n}} = \\frac{${n}!}{${n}! \\cdot 0!} = 1 $$`)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            အရာအားလုံးကို ရွေးချယ်သောနည်းလမ်းမှာ အားလုံးပါဝင်သည့် <strong>၁ နည်း</strong> သာ ရှိသည်။ (မှတ်ချက်: $0! = 1$ ဖြစ်သည်)
          </p>
        </div>
      );
    }

    const nMinusR = n - r;
    const maxD = Math.max(r, nMinusR);
    const minD = Math.min(r, nMinusR);

    // Build numerator expansion text
    const numExpandParts: string[] = [];
    for (let i = n; i > maxD; i--) {
      numExpandParts.push(i.toString());
    }
    const numExpandStr = numExpandParts.join(' \\cdot ');

    // Build denominator expansion text
    const denExpandParts: string[] = [];
    for (let i = minD; i >= 1; i--) {
      denExpandParts.push(i.toString());
    }
    const denExpandStr = denExpandParts.join(' \\cdot ');

    const step1LaTex = `\\binom{${n}}{${r}} = \\frac{${n}!}{${r}! \\cdot (${n} - ${r})!} = \\frac{${n}!}{${r}! \\cdot ${nMinusR}!}`;
    
    // Step 2: Show expansion with cancellation of maxD!
    const step2LaTex = `\\frac{${numExpandStr} \\cdot ${maxD}!}{${maxD}! \\cdot ${denExpandStr}} = \\frac{${numExpandStr}}{${denExpandStr}}`;

    // Numerator and denominator values after cancellation
    const numValAfterCancel = numExpandParts.reduce((acc, x) => acc * parseInt(x, 10), 1);
    const denValAfterCancel = getFact(minD);

    const step3LaTex = `\\frac{${numValAfterCancel}}{${denValAfterCancel}} = ${combVal}`;

    // Dynamic expansion text for the paragraph explanation
    let expansionExplanationText = '';
    if (n - maxD === 0) {
      expansionExplanationText = `$${n}!$ ကို ဖြန့်စရာမလိုဘဲ`;
    } else if (n - maxD === 1) {
      expansionExplanationText = `$${n}!$ ကို $${n} \\cdot ${maxD}!$ ဟု ဖြန့်ရေးပြီး`;
    } else if (n - maxD === 2) {
      expansionExplanationText = `$${n}!$ ကို $${n} \\cdot ${n - 1} \\cdot ${maxD}!$ ဟု ဖြန့်ရေးပြီး`;
    } else {
      expansionExplanationText = `$${n}!$ ကို $${n} \\cdot ${n - 1} \\cdots ${maxD + 1} \\cdot ${maxD}!$ ဟု ဖြန့်ရေးပြီး`;
    }

    return (
      <div className="space-y-4">
        {/* Step 1: Substitution */}
        <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800/80">
          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1.5">
            အဆင့် ၁ - Formula တွင် အစားသွင်းခြင်း:
          </span>
          <div className="overflow-x-auto w-full py-1">
            {renderMathText(`$$ ${step1LaTex} $$`)}
          </div>
        </div>

        {/* Step 2: Cancellation */}
        <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800/80">
          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1.5">
            {renderMathText(`အဆင့် ၂ - တွက်ချက်ရလွယ်ကူစေရန် အကြီးဆုံး Factorial ($${maxD}!$) ကို ချေဖျက်ခြင်း:`)}
          </span>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
            {renderMathText(`${expansionExplanationText} ပိုင်းခြေမှ $${maxD}!$ နှင့် အပေါ်အောက် ချေလိုက်ပါသည် -`)}
          </div>
          <div className="overflow-x-auto w-full py-1">
            {renderMathText(`$$ ${step2LaTex} $$`)}
          </div>
        </div>

        {/* Step 3: Final Multiplication & Division */}
        <div className="p-3.5 bg-indigo-50/20 dark:bg-indigo-950/5 rounded-xl border border-indigo-100/40 dark:border-indigo-900/30">
          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1.5">
            အဆင့် ၃ - မြှောက်ခြင်းနှင့် စားခြင်းကို ပြီးမြောက်အောင် တွက်ချက်ခြင်း:
          </span>
          <div className="overflow-x-auto w-full py-1">
            {renderMathText(`$$ ${step3LaTex} $$`)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 w-full font-sans shadow-sm">
      <h5 className="text-xs font-bold text-indigo-500 mb-4 uppercase tracking-wider text-center">Interactive: Example 15 Calculator & Step Solver</h5>
      
      {/* Presets Grid */}
      <div className="mb-6">
        <span className="text-[11px] uppercase font-black text-slate-500 dark:text-slate-400 block mb-3">Example 15 Presets (စာအုပ်ပါ မေးခွန်းများ)</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {presets.map((p, idx) => {
            const isSelected = n === p.n && r === p.r;
            return (
              <button
                key={idx}
                onClick={() => {
                  setN(p.n);
                  setR(p.r);
                }}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm scale-[1.02]'
                    : 'bg-white/50 dark:bg-slate-900/30 border-slate-150 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 select-none mb-1">
                  {renderMathText(`$ {}^{${p.n}}C_{${p.r}} $`)}
                </div>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Sliders */}
      <div className="mb-6 p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-800">
        <span className="text-[11px] uppercase font-black text-slate-500 dark:text-slate-400 block mb-3">Custom Combination Evaluator</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Slider N */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-600 dark:text-slate-300">Total Items ({renderMathText('$n$')}):</span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{n}</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={n}
              onChange={(e) => {
                const newN = parseInt(e.target.value, 10);
                setN(newN);
                if (r > newN) setR(newN);
              }}
              className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Slider R */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-600 dark:text-slate-300">Choose Items ({renderMathText('$r$')}):</span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{r}</span>
            </div>
            <input
              type="range"
              min="0"
              max={n}
              value={r}
              onChange={(e) => setR(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Step-by-Step Solution Display */}
      <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-800 shadow-inner mb-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              တွက်ချက်မှုအဆင့်ဆင့် (Solution Steps) -
            </span>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
              {renderMathText(`$ {}^{${n}}C_{${r}} = ${combVal} $`)}
            </div>
          </div>
        </div>

        {renderFormulaSteps()}
      </div>

      {/* Visual Representation of Symmetry & Choosing */}
      {n <= 25 && (
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-black text-indigo-500 tracking-wider block mb-3 text-center md:text-left">
            Symmetry & Complementary Selection Visualization
          </span>
          
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Grid of items */}
            <div className="flex flex-wrap gap-1.5 justify-center max-w-lg">
              {Array.from({ length: n }).map((_, idx) => {
                const isSelected = idx < r;
                return (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-bold transition-all duration-300 ${
                      isSelected
                        ? 'bg-indigo-500 text-white shadow-sm ring-2 ring-indigo-500/20 scale-[1.05]'
                        : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                    }`}
                    title={isSelected ? `Selected item ${idx + 1}` : `Leftover item ${idx + 1}`}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>

            {/* Symmetry Rule explanation */}
            <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/15 text-xs text-indigo-800 dark:text-indigo-300 w-full text-center">
              <p className="leading-relaxed font-bold">
                💡 ရွေးချယ်မှု၏ အချိုးညီသဘောတရား (Symmetry Rule):
              </p>
              <div className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">
                အရာဝတ္ထု {n} ခုထဲက <strong>{r}</strong> ခုကို ရွေးတာဟာ ချန်ထားခဲ့မည့် <strong>{n - r}</strong> ခုကို ရွေးတာနဲ့ ထပ်တူညီသည်။ <br className="hidden sm:inline" />
                ထို့ကြောင့် {renderMathText(`$ {}^{${n}}C_{${r}} $`)} ၏ တန်ဖိုးသည် {renderMathText(`$ {}^{${n}}C_{${n - r}} $`)} ၏ တန်ဖိုးနှင့် အမြဲတူညီပါသည်-
              </div>
              <div className="mt-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {renderMathText(`$$ {}^{${n}}C_{${r}} = {}^{${n}}C_{${n - r}} = ${combVal} $$`)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Exercise53Question2Diagram() {
  const candles = [1, 1, 1, 0, 1, 1, 0, 1, 1, 0]; // 7 candles, 3 empty
  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 relative z-10 w-full max-w-2xl mx-auto">
        {candles.map((hasCandle, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Flame container - fixed height so holders align */}
            <div className="h-6 w-full flex justify-center items-end mb-0.5">
              {hasCandle ? (
                <div className="w-2.5 h-4 bg-orange-400 rounded-t-full rounded-b-sm animate-pulse" style={{ boxShadow: '0 0 8px 1px rgba(251, 146, 60, 0.6)' }} />
              ) : null}
            </div>
            {/* Candle Body */}
            <div className={`h-8 w-4 rounded-t-sm flex justify-center items-start shadow-inner relative z-10 ${hasCandle ? 'bg-amber-100 dark:bg-amber-50' : 'bg-transparent'}`}>
              {hasCandle ? (
                <div className="w-0.5 h-1.5 bg-slate-800 dark:bg-slate-700" /> /* Wick */
              ) : null}
            </div>
            {/* Candle Holder */}
            <div className="w-8 h-6 border-b-2 border-l-2 border-r-2 border-slate-400 dark:border-slate-500 rounded-b-md shadow-sm -mt-2 bg-gradient-to-b from-transparent to-slate-200 dark:to-slate-800 z-0">
            </div>
            {/* Holder number */}
            <div className="mt-2 text-[10px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{i + 1}</div>
          </div>
        ))}
      </div>
      
      {/* Explanation Label */}
      <div className="text-center bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 w-full max-w-sm mt-2">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Choose any <span className="font-bold text-indigo-600 dark:text-indigo-400">7</span> holders from <span className="font-bold text-slate-800 dark:text-slate-200">10</span> fixed holders
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          (Order of candles does not matter as they are identical)
        </p>
      </div>
    </div>
  );
}

function Exercise53Question3Diagram() {
  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto">
        {/* Part 1 */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-full md:w-1/3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Part 1</span>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {[1, 2, 3, 4, 5].map(q => (
              <div key={q} className="w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono font-bold bg-indigo-500 text-white shadow-sm">{q}</div>
            ))}
          </div>
          <div className="text-[10px] text-slate-500 text-center">
            Answer all <span className="font-bold text-indigo-500">5</span> questions
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Latex text="$ {}^{5}C_{5} $" />
          </div>
        </div>

        <div className="text-xl text-slate-400 font-bold hidden md:block">×</div>

        {/* Part 2 */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-full md:w-1/3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Part 2</span>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {[1, 2, 3, 4].map(q => (
              <div key={q} className="w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono font-bold bg-indigo-500 text-white shadow-sm">{q}</div>
            ))}
            <div className="w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-400 border border-slate-200 border-dashed dark:bg-slate-700 dark:border-slate-600">5</div>
          </div>
          <div className="text-[10px] text-slate-500 text-center">
            Choose <span className="font-bold text-indigo-500">4</span> from 5
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Latex text="$ {}^{5}C_{4} $" />
          </div>
        </div>

        <div className="text-xl text-slate-400 font-bold hidden md:block">×</div>

        {/* Part 3 */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm w-full md:w-1/3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Part 3</span>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {[1, 2, 3].map(q => (
              <div key={q} className="w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono font-bold bg-indigo-500 text-white shadow-sm">{q}</div>
            ))}
            <div className="w-6 h-6 flex items-center justify-center rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-400 border border-slate-200 border-dashed dark:bg-slate-700 dark:border-slate-600">4</div>
          </div>
          <div className="text-[10px] text-slate-500 text-center">
            Choose <span className="font-bold text-indigo-500">3</span> from 4
          </div>
          <div className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Latex text="$ {}^{4}C_{3} $" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Exercise53Question4Diagram() {
  const n = 9;
  const r = 40;
  const points = Array.from({ length: n }).map((_, i) => {
    const angle = (i * 360) / n - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + r * Math.cos(rad),
      y: 50 + r * Math.sin(rad)
    };
  });

  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col items-center">
      <div className="relative w-48 h-48 mx-auto mb-4">
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="1" strokeDasharray="2,2"/>
          {points.map((pt, i) => {
            if (i === 0) return null;
            return <line key={`line-0-${i}`} x1={points[0].x} y1={points[0].y} x2={pt.x} y2={pt.y} stroke="currentColor" className="text-indigo-300 dark:text-indigo-500/30" strokeWidth="1"/>
          })}
          <line x1={points[1].x} y1={points[1].y} x2={points[2].x} y2={points[2].y} stroke="currentColor" className="text-amber-300 dark:text-amber-500/50" strokeWidth="1"/>
          <line x1={points[1].x} y1={points[1].y} x2={points[3].x} y2={points[3].y} stroke="currentColor" className="text-amber-300 dark:text-amber-500/50" strokeWidth="1"/>
        </svg>
        
        {points.map((pt, i) => {
          return (
            <div 
              key={i}
              className="absolute w-6 h-6 -ml-3 -mt-3 bg-white dark:bg-slate-800 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm z-10"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center w-full max-w-sm">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
          9 Teams total
        </p>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
          Each game requires choosing <span className="font-bold text-indigo-500">2</span> teams: <span className="font-semibold text-indigo-600 dark:text-indigo-400"><Latex text="$ {}^{9}C_{2} $" /></span>
        </div>
      </div>
    </div>
  );
}

function Exercise53Question5Diagram() {
  const r = 35;
  const points = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 360) / 8 - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + r * Math.cos(rad),
      y: 50 + r * Math.sin(rad)
    };
  });

  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col items-center">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 w-full max-w-2xl">
        
        {/* Lines Diagram */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100">
              <line x1={points[2].x} y1={points[2].y} x2={points[6].x} y2={points[6].y} stroke="currentColor" className="text-indigo-500" strokeWidth="2"/>
            </svg>
            {points.map((pt, i) => {
              const isSelected = i === 2 || i === 6;
              return (
                <div 
                  key={i}
                  className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full z-10 ${isSelected ? 'bg-indigo-500 ring-4 ring-indigo-500/20' : 'bg-slate-300 dark:bg-slate-600'}`}
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                />
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Determining a Line</p>
            <div className="text-[10px] text-slate-500 mt-1">Choose 2 points from 8: <span className="font-bold text-indigo-500"><Latex text="$ {}^{8}C_{2} $" /></span></div>
          </div>
        </div>

        <div className="h-20 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        {/* Triangles Diagram */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100">
              <polygon points={`${points[0].x},${points[0].y} ${points[3].x},${points[3].y} ${points[5].x},${points[5].y}`} fill="currentColor" className="text-amber-500/20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" style={{color: '#f59e0b'}}/>
            </svg>
            {points.map((pt, i) => {
              const isSelected = i === 0 || i === 3 || i === 5;
              return (
                <div 
                  key={i}
                  className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full z-10 ${isSelected ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-slate-300 dark:bg-slate-600'}`}
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                />
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Determining a Triangle</p>
            <div className="text-[10px] text-slate-500 mt-1">Choose 3 points from 8: <span className="font-bold text-amber-500"><Latex text="$ {}^{8}C_{3} $" /></span></div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Exercise53Question6Diagram() {
  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-end justify-center gap-x-2 sm:gap-x-4 gap-y-8 min-h-[120px] py-2">
          {Array.from({ length: 9 }).map((_, i) => {
            const size = 16 + (i * 4); 
            const isSmallest = i === 0;
            const isLargest = i === 8;
            const isSelected = i === 2 || i === 4 || i === 6 || isLargest;
            
            return (
              <div key={i} className="flex flex-col items-center justify-end relative group w-10 sm:w-14">
                <div className="h-8 flex items-end justify-center mb-2">
                  {isLargest && (
                    <div className="text-[9px] font-bold text-indigo-500 uppercase tracking-tight whitespace-nowrap bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/30">
                      Include
                    </div>
                  )}
                  {isSmallest && (
                    <div className="text-[9px] font-bold text-red-500 uppercase tracking-tight whitespace-nowrap bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-500/30">
                      Exclude
                    </div>
                  )}
                  {(!isSmallest && !isLargest && isSelected) && (
                    <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-tight whitespace-nowrap">
                      Selected
                    </div>
                  )}
                </div>
                
                <div className="relative flex items-center justify-center" style={{ height: '50px' }}>
                  {isSmallest && (
                    <div className="absolute w-full h-full flex items-center justify-center z-20">
                      <div className="w-6 h-0.5 bg-red-500 rotate-45 rounded-full"></div>
                      <div className="absolute w-6 h-0.5 bg-red-500 -rotate-45 rounded-full"></div>
                    </div>
                  )}
                  <div 
                    className={`rounded-full shadow-sm transition-all ${
                      isSmallest ? 'bg-slate-200 dark:bg-slate-700 opacity-50 grayscale' : 
                      isLargest ? 'bg-indigo-500 ring-4 ring-indigo-500/20' :
                      isSelected ? 'bg-amber-400 dark:bg-amber-500 ring-4 ring-amber-500/40' : 
                      'bg-amber-400 dark:bg-amber-500 opacity-50'
                    }`}
                    style={{ width: `${size}px`, height: `${size}px` }}
                  >
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Remaining 7 fruits to choose from. Need 3 more to make 4 fruits total.
        </p>        
        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">
          <Latex text="$ {}^{7}C_{3} $" /> ways
        </div>
      </div>
    </div>
  );
}



function ExclusionPrincipleExample1Case1Diagram() {
  return (
    <div className="flex justify-center gap-2 my-4 text-sm sm:text-base">
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">4</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">3</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">2</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">1</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-indigo-500 font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30">4</div>
    </div>
  );
}

function ExclusionPrincipleExample1Case2Diagram() {
  return (
    <div className="flex justify-center gap-2 my-4 text-sm sm:text-base">
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">3</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">2</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">1</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-emerald-500 font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30">3</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800">1</div>
    </div>
  );
}

function ExclusionPrincipleExample1ExcludedDiagram() {
  return (
    <div className="flex justify-center gap-2 my-4 text-sm sm:text-base">
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">3</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">2</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">1</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
      <div className="w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
    </div>
  );
}

function ProgramExampleDiagramA() {
  return (
    <div className="flex justify-center gap-2 my-4 text-sm sm:text-base overflow-x-auto pb-2">
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">5</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">4</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">3</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">2</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">1</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
    </div>
  );
}

function ProgramExampleDiagramB() {
  return (
    <div className="flex justify-center gap-2 my-4 text-sm sm:text-base overflow-x-auto pb-2">
      <div className="min-w-8 w-10 h-12 flex flex-col items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">
        <span>4</span>
      </div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">3</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">2</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-slate-400 font-mono font-bold text-slate-800 dark:text-slate-200">1</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
      <div className="min-w-8 w-10 h-12 flex items-center justify-center border-b-2 border-rose-500 font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30">1</div>
    </div>
  );
}

function SubsetCountingTable() {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 shadow-sm">
      <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
            <th className="p-3 font-semibold text-slate-800 dark:text-slate-200">Element</th>
            <th className="p-3 font-semibold text-slate-800 dark:text-slate-200">Choice 1</th>
            <th className="p-3 font-semibold text-slate-800 dark:text-slate-200">Choice 2</th>
            <th className="p-3 font-semibold text-slate-800 dark:text-slate-200 text-right">No. of Choices</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">a</td>
            <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Include</td>
            <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Exclude</td>
            <td className="p-3 font-bold text-slate-800 dark:text-slate-200 text-right">2</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">b</td>
            <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Include</td>
            <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Exclude</td>
            <td className="p-3 font-bold text-slate-800 dark:text-slate-200 text-right">2</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">c</td>
            <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Include</td>
            <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Exclude</td>
            <td className="p-3 font-bold text-slate-800 dark:text-slate-200 text-right">2</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">d</td>
            <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Include</td>
            <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Exclude</td>
            <td className="p-3 font-bold text-slate-800 dark:text-slate-200 text-right">2</td>
          </tr>
          <tr>
            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">e</td>
            <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Include</td>
            <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Exclude</td>
            <td className="p-3 font-bold text-slate-800 dark:text-slate-200 text-right">2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function Example23Case1Diagram() {
  return (
    <div className="my-6 w-full rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-x-auto">
      <div className="p-4 min-w-full w-max flex flex-col items-center">
      <div className="flex gap-2 sm:gap-6 mb-3 ">
        {[
          { label: "First\ndigit", val: "4", ways: "1 way" },
          { label: "Second\ndigit", val: "", ways: "3 ways" },
          { label: "Third\ndigit", val: "any one of\nremaining two", ways: "2 ways" },
          { label: "Last\ndigit", val: "2", ways: "1 way" }
        ].map((col, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center whitespace-pre-line">{col.label}</span>
            <div className="p-2 w-[110px] h-24 sm:w-32 sm:h-28 bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-100 dark:border-indigo-900/50 rounded-xl flex items-center justify-center mb-2">
              <span className="font-display font-bold text-indigo-700 dark:text-indigo-400 whitespace-pre-line text-center text-[11px] sm:text-sm">{col.val || "1, 3, or 5"}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">{col.ways}</span>
          </div>
                ))}
      </div>
    </div>
  </div>
  );
}
function Example23Case2Diagram() {
  return (
    <div className="my-6 w-full rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-x-auto">
      <div className="p-4 min-w-full w-max flex flex-col items-center">
      <div className="flex gap-2 sm:gap-6 mb-3 ">
        {[
          { label: "First\ndigit", val: "5", ways: "1 way" },
          { label: "Second\ndigit", val: "any one of the three digits\n1 or 3 or (2 or 4)", ways: "3 ways" },
          { label: "Third\ndigit", val: "any one of\nremaining two", ways: "2 ways" },
          { label: "Last\ndigit", val: "2 or 4", ways: "2 ways" }
        ].map((col, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center whitespace-pre-line">{col.label}</span>
            <div className="p-2 w-[110px] h-[110px] sm:w-32 sm:h-28 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-100 dark:border-emerald-900/50 rounded-xl flex items-center justify-center mb-2 text-center">
              <span className="font-display font-bold text-[10px] sm:text-xs text-emerald-700 dark:text-emerald-400 whitespace-pre-line leading-tight">{col.val}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">{col.ways}</span>
          </div>
                ))}
      </div>
    </div>
  </div>
  );
}
function Example24DiagramA() {
  return (
    <div className="my-6 w-full rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-x-auto">
      <div className="p-4 min-w-full w-max flex flex-col items-center">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex gap-1 border-b-2 border-rose-400 pb-2 mb-1 px-2">
              {['C1', 'C2'].map(b => (
                <div key={b} className="w-8 h-12 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex justify-center items-center rounded text-xs font-bold text-rose-700 dark:text-rose-400">{b}</div>
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase text-rose-500 text-center">Left<br/>Chemistry: 2!</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 border-b-2 border-blue-400 pb-2 mb-1 px-2">
              {['M1', 'M2', 'M3', 'M4'].map(b => (
                <div key={b} className="w-8 h-12 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex justify-center items-center rounded text-xs font-bold text-blue-700 dark:text-blue-400">{b}</div>
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase text-blue-500 text-center">Middle<br/>Mathematics: 4!</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 border-b-2 border-emerald-400 pb-2 mb-1 px-2">
              {['P1', 'P2', 'P3'].map(b => (
                <div key={b} className="w-8 h-12 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex justify-center items-center rounded text-xs font-bold text-emerald-700 dark:text-emerald-400">{b}</div>
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase text-emerald-500 text-center">Right<br/>Physics: 3!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function Example24DiagramB() {
  return (
    <div className="my-6 w-full rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-50 dark:bg-slate-800/50 overflow-x-auto">
      <div className="p-4 sm:p-6 min-w-full w-max flex flex-col items-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider text-center">Arrange the three subject blocks: 3! ways</span>
        <div className="flex items-center gap-3 mb-6">
          <div className="px-3 py-2 bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 font-bold text-xs rounded border border-rose-300 dark:border-rose-800 text-center">Chemistry<br/>block</div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-3 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-bold text-xs rounded border border-blue-300 dark:border-blue-800 text-center">Mathematics<br/>block</div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-3 py-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-bold text-xs rounded border border-emerald-300 dark:border-emerald-800 text-center">Physics<br/>block</div>
        </div>
        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 text-center">
          Inside the blocks: <span className="font-mono text-indigo-600 dark:text-indigo-400">2! × 4! × 3! = 288</span> ways<br/>
          <span className="mt-2 inline-block">Total: <span className="font-mono text-indigo-600 dark:text-indigo-400">3! × 288</span></span>
        </div>
      </div>
    </div>
  );
}
function Example25Diagram() {
  return (
    <div className="my-6 w-full rounded-2xl border border-amber-100 dark:border-amber-900/40 shadow-sm bg-amber-50/50 dark:bg-amber-950/20 overflow-x-auto">
      <div className="p-4 sm:p-6 min-w-full w-max flex flex-col items-center">
        <span className="text-[10px] font-bold text-amber-600/80 uppercase tracking-wider mb-3 whitespace-nowrap">Treat the two vowels as one block</span>
        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold rounded-lg shadow-sm">S</div>
          <div className="flex flex-col items-center">
            <div className="flex px-1 py-0.5 bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-800 rounded-lg shadow-sm gap-1">
              <div className="w-8 h-8 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center font-bold rounded text-amber-700 dark:text-amber-400">U</div>
              <div className="w-8 h-8 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center font-bold rounded text-amber-700 dark:text-amber-400">A</div>
            </div>
          </div>
          <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold rounded-lg shadow-sm">N</div>
          <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold rounded-lg shadow-sm">D</div>
          <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold rounded-lg shadow-sm">Y</div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <span className="text-indigo-600 dark:text-indigo-400">5!</span> ways to arrange the five objects
          </div>
          <div className="text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wide">
            Inside the vowel block: 2! ways
          </div>
        </div>
      </div>
    </div>
  );
}
function Example26Diagram() {
  const options = [
    { t1: 0, t2: 5, label: "(1, 6)" },
    { t1: 1, t2: 6, label: "(2, 7)" },
    { t1: 2, t2: 7, label: "(3, 8)" },
  ];
  
  return (
    <div className="my-6 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-4">Possible positions for the two T's</span>
      <div className="space-y-3">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {Array.from({ length: 8 }).map((_, j) => {
                const isT = j === opt.t1 || j === opt.t2;
                return (
                  <div key={j} className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold rounded border ${isT ? 'bg-indigo-100 border-indigo-300 text-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-700 dark:text-indigo-300' : 'bg-white border-slate-300 text-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-600'}`}>
                    {isT ? 'T' : ''}
                  </div>
                );
              })}
            </div>
            <span className="font-mono text-sm font-bold text-slate-600 dark:text-slate-400">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Ex5_4_Q6_i_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex gap-2">
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">T</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">1</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 h-[41px]"></div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">6</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 h-[41px]"></div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">5</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">N</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">1</div>
        </div>
      </div>
    </div>
  );
}

export function Ex5_4_Q6_ii_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex gap-2">
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">C</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">3</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 h-[41px]"></div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">6</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 h-[41px]"></div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">5</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">C</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">2</div>
        </div>
      </div>
    </div>
  );
}

export function Ex5_4_Q6_iii_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center gap-2">
      {[5, 4, 3, 2].map(n => (
         <div key={n} className="w-12 h-12 flex items-center justify-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-mono text-lg font-semibold">
           {n}
         </div>
      ))}
    </div>
  )
}

export function Ex5_4_Q6_iv_Diag_1() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex gap-2">
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">C</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">Q</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">C</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">T</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">C</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">N</div>
        </div>
        <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden">
          <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">V</div>
          <div className="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-mono">5</div>
        </div>
      </div>
    </div>
  );
}

export function Ex5_4_Q6_iv_Diag_2() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center items-center gap-4">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">Choose V</span>
        <div className="w-16 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-mono bg-white dark:bg-slate-900">5</div>
      </div>
      <span className="text-slate-400 font-bold">&times;</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">Place V</span>
        <div className="w-16 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-mono bg-white dark:bg-slate-900">4</div>
      </div>
      <span className="text-slate-400 font-bold">&times;</span>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">Arrange C</span>
        <div className="w-16 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-mono bg-white dark:bg-slate-900">3!</div>
      </div>
    </div>
  );
}

export function Ex5_4_Q7_i_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center items-center gap-3">
      <div className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded p-2 bg-slate-50 dark:bg-slate-800">
        <div className="font-bold flex gap-2 text-slate-800 dark:text-slate-200">
          <span>S<sub>1</sub></span><span>S<sub>2</sub></span><span>S<sub>3</sub></span>
        </div>
        <span className="text-[10px] text-slate-500 mt-1">block</span>
      </div>
      <div className="w-12 h-12 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        B<sub>1</sub>
      </div>
      <div className="w-12 h-12 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        B<sub>2</sub>
      </div>
      <div className="w-12 h-12 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        B<sub>3</sub>
      </div>
    </div>
  );
}

export function Ex5_4_Q7_ii_Diag() {
  const row1 = ['B', 'S', 'B', 'S', 'B', 'S'];
  const row2 = ['S', 'B', 'S', 'B', 'S', 'B'];
  return (
    <div className="my-6 w-full overflow-x-auto flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {row1.map((l, i) => (
           <div key={i} className={`w-10 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 ${l === 'B' ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>{l}</div>
        ))}
      </div>
      <div className="flex gap-2">
        {row2.map((l, i) => (
           <div key={i} className={`w-10 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 ${l === 'B' ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>{l}</div>
        ))}
      </div>
    </div>
  )
}

export function Ex5_4_Q8_i_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center items-center gap-2">
      <div className="border border-slate-300 dark:border-slate-600 rounded p-2 px-3 bg-slate-50 dark:bg-slate-800 flex items-center font-bold text-sm text-slate-700 dark:text-slate-300 h-10">
        Vowel block <span className="text-indigo-600 dark:text-indigo-400 ml-2 font-mono">(E, A, O)</span>
      </div>
      {['H', 'X', 'G', 'N'].map(l => (
        <div key={l} className="w-10 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">{l}</div>
      ))}
    </div>
  )
}

export function Ex5_4_Q8_iii_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center items-center gap-2">
      {['C', 'V', 'C', 'V', 'C', 'V', 'C'].map((l, i) => (
        <div key={i} className={`w-10 h-10 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center font-bold bg-white dark:bg-slate-900 ${l === 'C' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{l}</div>
      ))}
    </div>
  )
}

export function Ex5_4_Q9_Diag() {
  const rows = [
    [ {t: 'N', b: '1'}, {t: '', b: '2'}, {t: '', b: '3'}, {t: '', b: '4'}, {t: 'N', b: '5'}, {t: '', b: '6'}, {t: '', b: '7'} ],
    [ {t: '', b: '1'}, {t: 'N', b: '2'}, {t: '', b: '3'}, {t: '', b: '4'}, {t: '', b: '5'}, {t: 'N', b: '6'}, {t: '', b: '7'} ],
    [ {t: '', b: '1'}, {t: '', b: '2'}, {t: 'N', b: '3'}, {t: '', b: '4'}, {t: '', b: '5'}, {t: '', b: '6'}, {t: 'N', b: '7'} ],
  ];
  return (
    <div className="my-6 w-full overflow-x-auto flex flex-col items-center gap-4">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((cell, j) => (
            <div key={j} className="flex flex-col items-center border border-slate-300 dark:border-slate-600 rounded overflow-hidden w-10">
              <div className="h-8 w-full border-b border-slate-300 dark:border-slate-600 font-bold bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-rose-600 dark:text-rose-400">{cell.t}</div>
              <div className="h-8 w-full flex items-center justify-center text-slate-500 font-mono text-xs bg-white dark:bg-slate-900">{cell.b}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Ex5_4_Q10_i_Diag() {
  return (
    <div className="my-6 w-full overflow-x-auto flex flex-col items-center gap-2">
      {Array.from({length: 4}).map((_, row) => (
        <div key={row} className="flex gap-1">
          {Array.from({length: 10}).map((_, col) => {
            const isE = col === row || col === row + 6;
            return (
              <div key={col} className={`w-8 h-8 border flex items-center justify-center font-bold text-sm ${isE ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700'}`}>
                {isE ? 'E' : ''}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function Ex5_4_Q10_ii_Diag1() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex flex-col gap-2">
        {Array.from({length: 4}).map((_, row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="font-mono text-sm w-8 text-slate-600 dark:text-slate-400">A<sub>{row+1}</sub> :</span>
            <div className="flex gap-1">
              {Array.from({length: 10}).map((_, col) => {
                const isS = col === row || col === row + 6;
                return (
                  <div key={col} className={`w-8 h-8 border flex items-center justify-center font-bold text-sm ${isS ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700'}`}>
                    {isS ? 'S' : ''}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Ex5_4_Q10_ii_Diag2() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex gap-1">
        {Array.from({length: 10}).map((_, col) => {
          const isS = col === 0 || col === 6;
          return (
            <div key={col} className={`w-8 h-8 border flex items-center justify-center font-bold text-sm ${isS ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700'}`}>
              {isS ? 'S' : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Ex5_4_Q10_ii_Diag3() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex gap-1">
        {Array.from({length: 10}).map((_, col) => {
          const isS = col === 0 || col === 1 || col === 6 || col === 7;
          return (
            <div key={col} className={`w-8 h-8 border flex items-center justify-center font-bold text-sm ${isS ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700'}`}>
              {isS ? 'S' : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Ex5_4_Q10_ii_Diag4() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex flex-col gap-2">
        {Array.from({length: 4}).map((_, row) => (
          <div key={row} className="flex items-center gap-3">
            <span className="font-mono text-sm w-16 text-slate-600 dark:text-slate-400">({row+1}, {row+7}) :</span>
            <div className="flex gap-1">
              {Array.from({length: 10}).map((_, col) => {
                const isS = col === row || col === row + 6;
                return (
                  <div key={col} className={`w-8 h-8 border flex items-center justify-center font-bold text-sm ${isS ? 'border-amber-300 bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700'}`}>
                    {isS ? 'S' : ''}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Ex5_4_Q10_ii_Diag5() {
  return (
    <div className="my-6 w-full overflow-x-auto flex justify-center">
      <div className="flex gap-1">
        {Array.from({length: 10}).map((_, col) => {
          const isS = col === 0 || col === 1 || col === 6 || col === 7;
          return (
            <div key={col} className={`w-8 h-8 border flex items-center justify-center font-bold text-sm ${isS ? 'border-amber-300 bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700'}`}>
              {isS ? 'S' : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}
