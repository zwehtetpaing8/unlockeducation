const fs = require("fs");
let file = fs.readFileSync("src/components/Latex.tsx", "utf8");

const headers = `
function Chapter2Header() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-slate-900/60 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm text-center overflow-x-auto">
      <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200 mb-2">Chapter 2: Mathematical Induction (သင်္ချာနည်းကျ အနုမာန်ပုံမှန်နည်း)</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">The Principle of Mathematical Induction (Domino Chain Effect)</p>
      <svg className="mx-auto" width="450" height="150" viewBox="0 0 450 150">
        <g transform="translate(30, 20)">
          <rect x="0" y="20" width="70" height="90" rx="8" fill="#10b981" />
          <text x="35" y="60" fontSize="16" fill="#ffffff" fontWeight="bold" textAnchor="middle">P(1)</text>
          <text x="35" y="80" fontSize="10" fill="#ecfdf5" textAnchor="middle">Base Step</text>
          <text x="35" y="125" fontSize="11" fill="#047857" fontWeight="bold" textAnchor="middle">n = 1 True</text>
        </g>
        <path d="M 115 65 L 145 65" stroke="#10b981" strokeWidth="3" />
        <text x="130" y="55" fontSize="18" fill="#10b981" textAnchor="middle">➔</text>
        <g transform="translate(160, 20)">
          <rect x="0" y="20" width="80" height="90" rx="8" fill="#059669" />
          <text x="40" y="60" fontSize="16" fill="#ffffff" fontWeight="bold" textAnchor="middle">P(k)</text>
          <text x="40" y="80" fontSize="10" fill="#ecfdf5" textAnchor="middle">Inductive Hyp.</text>
          <text x="40" y="125" fontSize="11" fill="#047857" fontWeight="bold" textAnchor="middle">Assume True</text>
        </g>
        <path d="M 255 65 L 285 65" stroke="#059669" strokeWidth="3" />
        <text x="270" y="55" fontSize="18" fill="#059669" textAnchor="middle">➔</text>
        <g transform="translate(300, 20)">
          <rect x="0" y="20" width="110" height="90" rx="8" fill="#047857" />
          <text x="55" y="55" fontSize="16" fill="#ffffff" fontWeight="bold" textAnchor="middle">P(k + 1)</text>
          <text x="55" y="75" fontSize="10" fill="#ecfdf5" textAnchor="middle">Inductive Step</text>
          <text x="55" y="93" fontSize="10" fill="#a7f3d0" fontWeight="bold" textAnchor="middle">P(k) ➔ P(k+1)</text>
          <text x="55" y="125" fontSize="11" fill="#065f46" fontWeight="bold" textAnchor="middle">True for all n ∈ ℕ</text>
        </g>
      </svg>
    </div>
  );
}

function Chapter3Header() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/40 dark:to-slate-900/60 rounded-2xl border border-amber-100 dark:border-amber-900/50 shadow-sm text-center overflow-x-auto">
      <h4 className="text-base font-bold text-amber-900 dark:text-amber-200 mb-2">Chapter 3: Analytical Solid Geometry (သုံးဖက်တိုင်း ဂျီဩမေတြီ)</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">3D Rectangular Coordinate System & Point P(x, y, z)</p>
      <svg className="mx-auto" width="440" height="210" viewBox="0 0 440 210">
        <g transform="translate(200, 120)">
          <line x1="0" y1="0" x2="0" y2="-100" stroke="#d97706" strokeWidth="2.5" />
          <text x="10" y="-95" fontSize="13" fill="#b45309" fontStyle="italic" fontWeight="bold">Z axis</text>
          <line x1="0" y1="0" x2="160" y2="0" stroke="#d97706" strokeWidth="2.5" />
          <text x="165" y="5" fontSize="13" fill="#b45309" fontStyle="italic" fontWeight="bold">Y axis</text>
          <line x1="0" y1="0" x2="-120" y2="70" stroke="#d97706" strokeWidth="2.5" />
          <text x="-140" y="80" fontSize="13" fill="#b45309" fontStyle="italic" fontWeight="bold">X axis</text>
          <circle cx="0" cy="0" r="4" fill="#b45309" />
          <text x="8" y="18" fontSize="12" fill="#78350f" fontWeight="bold">O(0,0,0)</text>
          <line x1="-70" y1="41" x2="50" y2="41" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="120" y1="0" x2="50" y2="41" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50" y1="41" x2="50" y2="-40" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="0" y1="-81" x2="50" y2="-40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="120" y1="-81" x2="50" y2="-40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="0" y1="0" x2="50" y2="-40" stroke="#ea580c" strokeWidth="2.5" />
          <circle cx="50" cy="-40" r="6" fill="#ea580c" />
          <text x="60" y="-45" fontSize="14" fill="#c2410c" fontWeight="bold">P(x, y, z)</text>
          <text x="60" y="-28" fontSize="11" fill="#78350f" fontWeight="bold">OP = √(x² + y² + z²)</text>
        </g>
      </svg>
    </div>
  );
}

function Chapter4Header() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/40 dark:to-slate-900/60 rounded-2xl border border-purple-100 dark:border-purple-900/50 shadow-sm text-center overflow-x-auto">
      <h4 className="text-base font-bold text-purple-900 dark:text-purple-200 mb-2">Chapter 4: Vector Algebra (ဗက်တာ အက္ခရာသင်္ချာ)</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Vector Addition & Position Vectors in 3D Space</p>
      <svg className="mx-auto" width="440" height="190" viewBox="0 0 440 190">
        <g transform="translate(30, 20)">
          <text x="90" y="15" fontSize="13" fill="#7e22ce" fontWeight="bold" textAnchor="middle">Triangle Law of Vector Addition</text>
          <line x1="10" y1="130" x2="110" y2="130" stroke="#a855f7" strokeWidth="3" />
          <path d="M 110 130 L 100 124 L 100 136 Z" fill="#a855f7" />
          <text x="60" y="150" fontSize="13" fill="#7e22ce" fontWeight="bold">a = AB</text>
          <line x1="110" y1="130" x2="170" y2="40" stroke="#ec4899" strokeWidth="3" />
          <path d="M 170 40 L 158 48 L 166 58 Z" fill="#ec4899" />
          <text x="150" y="95" fontSize="13" fill="#be185d" fontWeight="bold">b = BC</text>
          <line x1="10" y1="130" x2="170" y2="40" stroke="#6b21a8" strokeWidth="3.5" strokeDasharray="5 3" />
          <path d="M 170 40 L 155 46 L 163 56 Z" fill="#6b21a8" />
          <text x="65" y="70" fontSize="13" fill="#581c87" fontWeight="bold">a + b = AC</text>
        </g>
        <g transform="translate(260, 35)">
          <rect x="0" y="0" width="165" height="125" rx="10" fill="#ffffff" stroke="#e9d5ff" strokeWidth="2" className="dark:fill-slate-800 dark:stroke-purple-800" />
          <text x="82" y="30" fontSize="13" fill="#7e22ce" fontWeight="bold" textAnchor="middle">Vector Notation</text>
          <text x="82" y="58" fontSize="13" fill="#3b0764" fontWeight="bold" textAnchor="middle" className="dark:fill-purple-200">v = a i + b j + c k</text>
          <text x="82" y="85" fontSize="12" fill="#6b21a8" textAnchor="middle">|v| = √(a² + b² + c²)</text>
          <text x="82" y="108" fontSize="11" fill="#be185d" fontStyle="italic" textAnchor="middle">Dot & Cross Products</text>
        </g>
      </svg>
    </div>
  );
}

function Chapter5Header() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-slate-900/60 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm text-center overflow-x-auto">
      <h4 className="text-base font-bold text-blue-900 dark:text-blue-200 mb-2">Chapter 5: Permutations and Combinations (စီခြင်းနှင့် ရွေးခြင်း)</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">Permutation (Order Matters) vs Combination (Order Doesn't Matter)</p>
      <svg className="mx-auto" width="460" height="160" viewBox="0 0 460 160">
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="200" height="120" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" className="dark:fill-slate-800 dark:stroke-blue-500" />
          <text x="100" y="28" fontSize="14" fill="#1d4ed8" fontWeight="bold" textAnchor="middle">Permutations nPr</text>
          <text x="100" y="48" fontSize="11" fill="#2563eb" fontWeight="500" textAnchor="middle">Arrangement (Order Matters)</text>
          <path d="M 20 60 H 180" stroke="#bfdbfe" strokeWidth="1" />
          <text x="100" y="78" fontSize="13" fill="#1e40af" fontWeight="bold" textAnchor="middle">nPr = n! / (n - r)!</text>
          <text x="100" y="100" fontSize="11" fill="#475569" textAnchor="middle" className="dark:fill-slate-300">e.g. Code (1, 2) ≠ (2, 1)</text>
        </g>
        <circle cx="230" cy="80" r="16" fill="#3b82f6" />
        <text x="230" y="85" fontSize="12" fill="#ffffff" fontWeight="bold" textAnchor="middle">VS</text>
        <g transform="translate(240, 20)">
          <rect x="0" y="0" width="200" height="120" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" className="dark:fill-slate-800 dark:stroke-green-500" />
          <text x="100" y="28" fontSize="14" fill="#15803d" fontWeight="bold" textAnchor="middle">Combinations nCr</text>
          <text x="100" y="48" fontSize="11" fill="#16a34a" fontWeight="500" textAnchor="middle">Selection (Order Doesn't Matter)</text>
          <path d="M 20 60 H 180" stroke="#bbf7d0" strokeWidth="1" />
          <text x="100" y="78" fontSize="13" fill="#166534" fontWeight="bold" textAnchor="middle">nCr = n! / [r! (n - r)!]</text>
          <text x="100" y="100" fontSize="11" fill="#475569" textAnchor="middle" className="dark:fill-slate-300">e.g. Team {"{A, B}"} = {"{B, A}"}</text>
        </g>
      </svg>
    </div>
  );
}
`;

if (!file.includes("function Chapter2Header")) {
  file = file.replace(/function Chapter1Header\(\) \{/, headers + "\nfunction Chapter1Header() {");
}

const switchCases = `
        case "Chapter2Header":
          renderedElements.push(<Chapter2Header key={"diag-" + i} />);
          break;
        case "Chapter3Header":
          renderedElements.push(<Chapter3Header key={"diag-" + i} />);
          break;
        case "Chapter4Header":
          renderedElements.push(<Chapter4Header key={"diag-" + i} />);
          break;
        case "Chapter5Header":
          renderedElements.push(<Chapter5Header key={"diag-" + i} />);
          break;
`;

if (!file.includes(`case "Chapter2Header":`)) {
  file = file.replace(/(case "Chapter1Header":[\s\S]*?break;)/, `$1\n${switchCases}`);
}

fs.writeFileSync("src/components/Latex.tsx", file, "utf8");
console.log("Updated Latex.tsx with Chapter 2 to 5 Headers");
