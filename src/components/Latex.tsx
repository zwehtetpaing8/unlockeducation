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
        <text x="193" y="52" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200 font-sans">z = (x, y)</text>
        
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
        
        <text x="162" y="28" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (1, √3)</text>
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
        
        <text x="32" y="58" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-1, 1)</text>
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
        
        <text x="20" y="155" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-√3, -1)</text>
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
        
        <text x="25" y="125" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-1, 0)</text>
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
        
        <text x="162" y="195" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (1, -√3)</text>
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
        
        <text x="25" y="55" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-√2, √2)</text>
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
        
        <text x="25" y="172" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-2, -2)</text>
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
        
        <text x="155" y="175" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (√3, -1)</text>
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
        
        <text x="120" y="45" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (0, 1)</text>
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
        
        <text x="120" y="185" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (0, -3)</text>
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
    { label: "(1, 0)", x: 184, y: 113, align: "start" },
    { label: "(1/2, √3/2)", x: 148, y: 44, align: "start" },
    { label: "(-1/2, √3/2)", x: 72, y: 44, align: "end" },
    { label: "(-1, 0)", x: 36, y: 113, align: "end" },
    { label: "(-1/2, -√3/2)", x: 72, y: 182, align: "end" },
    { label: "(1/2, -√3/2)", x: 148, y: 182, align: "start" }
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
        
        <text x="152" y="38" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (1, √3)</text>
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
        
        <text x="115" y="30" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (0, 1)</text>
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
        
        <text x="30" y="55" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-√3, 1)</text>
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
        
        <text x="50" y="190" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (-1, -√3)</text>
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
        
        <text x="115" y="195" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (0, -1)</text>
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
        
        <text x="155" y="165" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">z = (√3, -1)</text>
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
        <text x="50" y="195" className="text-[10px] font-bold fill-red-500">z = (-2, -2)</text>
        
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

// -----------------------------------------------------------------
// Chapter 3.4 Diagrams
// -----------------------------------------------------------------

export function Chap3_4_PlaneABC() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 350 200" className="w-full max-w-[350px] h-auto overflow-visible font-serif">
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        <polygon points="50,150 250,150 300,50 100,50" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Points & Lines */}
        <circle cx="90" cy="130" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="75" y="125" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">A</text>
        <text x="50" y="145" fontSize="12" className="fill-slate-900 dark:fill-slate-400 font-sans">(x₁, y₁, z₁)</text>

        <circle cx="180" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="185" y="60" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">B</text>

        <circle cx="260" cy="130" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="265" y="135" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">C</text>

        {/* Vectors */}
        <line x1="90" y1="130" x2="175" y2="68" stroke="currentColor" className="text-slate-900 dark:text-slate-300" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="110" y="90" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-sans">⟨l₁, m₁, n₁⟩</text>

        <line x1="90" y1="130" x2="255" y2="130" stroke="currentColor" className="text-slate-900 dark:text-slate-300" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="150" y="145" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-sans">⟨l₂, m₂, n₂⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex9() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 220" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        <polygon points="60,170 230,170 250,90 80,90" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="140" y="140" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">3x - 2y - z = 3</text>
        
        {/* Line */}
        <line x1="120" y1="30" x2="120" y2="145" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        <line x1="120" y1="145" x2="120" y2="180" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Point P */}
        <circle cx="120" cy="145" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="150" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">P</text>
        
        {/* Top point */}
        <circle cx="120" cy="45" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="50" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(-1, 3, 2)</text>

        {/* Direction vector bracket */}
        <path d="M 110 70 L 100 70 L 100 120 L 110 120" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="85" y="95" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 85 95)">⟨3, -2, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 220" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        <polygon points="60,170 230,170 250,90 80,90" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="135" y="140" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">-2x + 3y - z = 4</text>
        
        {/* Line */}
        <line x1="120" y1="30" x2="120" y2="145" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        <line x1="120" y1="145" x2="120" y2="180" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Point P */}
        <circle cx="120" cy="145" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="150" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">P</text>
        
        {/* Top point */}
        <circle cx="120" cy="45" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="50" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(3, -2, -2)</text>

        {/* Direction vector bracket */}
        <path d="M 110 70 L 105 70 L 105 120 L 110 120" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="90" y="95" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 90 95)">⟨-2, 3, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 240" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        {/* Top Plane */}
        <polygon points="50,90 190,90 220,30 80,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="70" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(-1, 3, 2)</text>
        <text x="80" y="70" fontSize="16" className="fill-slate-900 dark:fill-slate-300 font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,180 190,180 220,120 80,120" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="95" y="160" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="120" y1="65" x2="120" y2="150" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Bracket */}
        <path d="M 115 85 L 110 85 L 110 135 L 115 135" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="95" y="110" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 95 110)">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 240" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        {/* Top Plane */}
        <polygon points="50,90 190,90 220,30 80,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="70" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(-1, 3, 2)</text>
        
        {/* Bottom Plane */}
        <polygon points="50,180 190,180 220,120 80,120" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="95" y="160" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="120" y1="10" x2="120" y2="210" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Bracket */}
        <path d="M 115 85 L 110 85 L 110 135 L 115 135" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="95" y="110" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 95 110)">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 240" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        {/* Top Plane */}
        <polygon points="50,90 190,90 220,30 80,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="70" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(2, 3, -1)</text>
        <text x="80" y="70" fontSize="16" className="fill-slate-900 dark:fill-slate-300 font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,180 190,180 220,120 80,120" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="95" y="160" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">-2x + y + 3z = 6</text>
        
        {/* Line */}
        <line x1="120" y1="10" x2="120" y2="210" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Bracket */}
        <path d="M 115 85 L 110 85 L 110 135 L 115 135" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="95" y="110" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 95 110)">⟨-2, 1, 3⟩</text>
      </svg>
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


const DIAGRAM_MAP: Record<string, React.FC> = {
  MathematicianTimeline,
  ArgandPolar,
  ArgandExample5a,
  ArgandExample5b,
  ArgandExample5c,
  ArgandExample5d,
  ArgandEx1_4_1a,
  ArgandEx1_4_1b,
  ArgandEx1_4_1c,
  ArgandEx1_4_1d,
  ArgandEx1_4_1e,
  ArgandEx1_4_1f,
  RootsUnity6,
  ArgandEx1_5_1a,
  ArgandEx1_5_1b,
  ArgandEx1_5_1c,
  ArgandEx1_5_1d,
  ArgandEx1_5_1e,
  ArgandEx1_5_1f,
  RootsEx1_5_3a,
  RootsEx1_5_3b,
  RootsEx1_5_3c,
  RootsEx1_5_3d,
  RootsExample10,
  Solid3DPointDiagram,
  SkewLinesDiagram,
  SpherePlaneTangentDiagram,
  RootsUnity4,
  DrinksSnacksTree,
  PermCombComparison,
  AtoBtoCRoads,
  AndOrFlowchart,
  BloodLabelDiagram,
  PictureNailsDiagram,
  Example4Diagram,
  Example5Diagram,
  Chap3_4_PlaneABC,
  Chap3_4_Ex9,
  Chap3_4_Q2,
  Chap3_4_Ex10_Sol1,
  Chap3_4_Ex10_Sol2,
  Chap3_4_Q3_Sol,
  Ex5_4_Q6_i_Diag,
  Ex5_4_Q6_ii_Diag,
  Ex5_4_Q6_iii_Diag,
  Ex5_4_Q6_iv_Diag_1,
  Ex5_4_Q6_iv_Diag_2,
  Ex5_4_Q7_i_Diag,
  Ex5_4_Q7_ii_Diag,
  Ex5_4_Q8_i_Diag,
  Ex5_4_Q8_iii_Diag,
  Ex5_4_Q9_Diag,
  Ex5_4_Q10_i_Diag,
  Ex5_4_Q10_ii_Diag1,
  Ex5_4_Q10_ii_Diag2,
  Ex5_4_Q10_ii_Diag3,
  Ex5_4_Q10_ii_Diag4,
  Ex5_4_Q10_ii_Diag5
};

export default function Latex({ text, className = '', block = false }: LatexProps) {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  // Match [DIAGRAM: DiagramName]
  const regex = /\[DIAGRAM:\s*([a-zA-Z0-9_]+)\s*\]/g;
  let m;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > currentIndex) {
      parts.push(
        <span key={`text-${currentIndex}`}>
          {renderMathText(text.substring(currentIndex, m.index))}
        </span>
      );
    }
    const diagName = m[1];
    const DiagramComponent = DIAGRAM_MAP[diagName];
    if (DiagramComponent) {
      parts.push(<DiagramComponent key={`diag-${m.index}`} />);
    } else {
      parts.push(
        <span key={`diag-${m.index}`} className="text-red-500 text-xs border border-red-500 p-1">
          [Missing Diagram: {diagName}]
        </span>
      );
    }
    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(
      <span key={`text-${currentIndex}`}>
        {renderMathText(text.substring(currentIndex))}
      </span>
    );
  }

  if (block) {
    return <div className={`my-4 ${className}`}>{parts}</div>;
  }
  return <span className={className}>{parts}</span>;
}
