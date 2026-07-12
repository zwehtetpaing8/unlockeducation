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
  Check
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
    <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
        <text x="110" y="132" className="text-xs fill-slate-500 italic font-serif">O</text>

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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
        <text x="100" y="122" className="text-[10px] fill-slate-400">O</text>
        
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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
        <text x="100" y="122" className="text-[10px] fill-slate-400">O</text>
        
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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
        <text x="100" y="122" className="text-[10px] fill-slate-400">O</text>
        
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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
        <text x="100" y="122" className="text-[10px] fill-slate-400">O</text>
        
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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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

function RootsExample10() {
  return (
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
    <div className="my-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
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
            className="katex-block my-3 overflow-x-auto py-1 w-full text-center font-serif text-slate-800 dark:text-slate-200"
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

    // Skip empty lines, but close list if open
    if (line === '') {
      flushList(i);
      renderedElements.push(<div key={`empty-${i}`} className="h-2" />);
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
            className="katex-block my-3 overflow-x-auto py-1 w-full text-center font-serif text-slate-800 dark:text-slate-200"
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
        case 'RootsUnity6':
          renderedElements.push(<RootsUnity6 key={`diag-${i}`} />);
          break;
        case 'RootsUnity4':
          renderedElements.push(<RootsUnity4 key={`diag-${i}`} />);
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
