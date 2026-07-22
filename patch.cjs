const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace the defs and arcs
const oldArcs = `<defs>
            <marker id="cyclic-arrow-v2" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="10" markerHeight="10" orient="auto">
              <path d="M 0 2 L 10 6 L 0 10 L 3 6 z" fill="#f59e0b" stroke="none" />
            </marker>
            <marker id="cyclic-arrow-v2-dark" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="10" markerHeight="10" orient="auto">
              <path d="M 0 2 L 10 6 L 0 10 L 3 6 z" fill="#fbbf24" stroke="none" />
            </marker>
          </defs>

          {/* Curved Arrow 1: i -> j (top to bottom-left) */}
          <path
            d="M 118 44 A 65 65 0 0 0 76 116"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            fill="none"
            
          />

          {/* Curved Arrow 2: j -> k (bottom-left to bottom-right) */}
          <path
            d="M 98 155 A 65 65 0 0 0 182 155"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            fill="none"
            
          />

          {/* Curved Arrow 3: k -> i (bottom-right to top) */}
          <path
            d="M 204 116 A 65 65 0 0 0 162 44"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            fill="none"
            
          />`;

const newArcs = `{/* Curved Arrow 1: i -> j (top to bottom-left) */}
          <path
            d="M 118 44 A 65 65 0 0 0 76 116"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 0 L -12 6 L -9 0 L -12 -6 z"
            className="fill-amber-500 dark:fill-amber-400"
            stroke="none"
            transform="translate(76, 116) rotate(80)"
          />

          {/* Curved Arrow 2: j -> k (bottom-left to bottom-right) */}
          <path
            d="M 98 155 A 65 65 0 0 0 182 155"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 0 L -12 6 L -9 0 L -12 -6 z"
            className="fill-amber-500 dark:fill-amber-400"
            stroke="none"
            transform="translate(182, 155) rotate(-40)"
          />

          {/* Curved Arrow 3: k -> i (bottom-right to top) */}
          <path
            d="M 204 116 A 65 65 0 0 0 162 44"
            className="stroke-amber-500 dark:stroke-amber-400"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 0 L -12 6 L -9 0 L -12 -6 z"
            className="fill-amber-500 dark:fill-amber-400"
            stroke="none"
            transform="translate(162, 44) rotate(200)"
          />`;

if (content.includes(oldArcs)) {
  content = content.replace(oldArcs, newArcs);
  fs.writeFileSync('src/components/Latex.tsx', content);
  console.log("Successfully replaced arcs!");
} else {
  console.log("Could not find the exact old string to replace. Attempting fallback...");
  // Fallback search
  let modified = content;
  modified = modified.replace(/<defs>[\s\S]*?<\/defs>/, '');
  modified = modified.replace(/style=\{\{ markerEnd: 'var\(--cyclic-arrow-url\)' \}\}/g, '');
  // Just rewrite Chap4_UnitVectorCyclicDiag
  const parts = modified.split(/export function Chap4_UnitVectorCyclicDiag\(\) \{/);
  if (parts.length === 2) {
     const endIdx = parts[1].indexOf('export function Chap4_Fig12()');
     if (endIdx > -1) {
         console.log("Manual fallback available.");
     }
  }
}
