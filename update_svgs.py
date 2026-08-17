content = ""
with open('src/components/Latex.tsx', 'r') as f:
    content = f.read()

def replace_between(text, start_marker, end_marker, replacement):
    start_idx = text.find(start_marker)
    if start_idx == -1:
        print(f"Failed to find {start_marker}")
        return text
    end_idx = text.find(end_marker, start_idx)
    if end_idx == -1:
        print(f"Failed to find {end_marker}")
        return text
    
    return text[:start_idx] + start_marker + replacement + text[end_idx:]

diag1 = """ {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative" style={{ width: '400px', height: '300px' }}>
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <marker id="arrow-head-slate-1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
            <marker id="arrow-head-yellow-1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
            </marker>
          </defs>
          
          {/* Grid */}
          <g stroke="#fde68a" strokeWidth="1.5" className="dark:stroke-amber-900/40">
            {[100, 140, 180, 220, 260, 300].map(x => (
              <line key={"v"+x} x1={x} y1="60" x2={x} y2="220" />
            ))}
            {[60, 100, 140, 180].map(y => (
              <line key={"h"+y} x1="60" y1={y} x2="300" y2={y} />
            ))}
          </g>
          
          {/* Axes */}
          <line x1="60" y1="220" x2="330" y2="220" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-1)" />
          <line x1="60" y1="220" x2="60" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-1)" />
          <circle cx="60" cy="220" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          
          {/* Vectors */}
          <line x1="60" y1="220" x2="100" y2="220" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-1)" />
          <foreignObject x="65" y="225" width="20" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-[13px] text-amber-600 dark:text-amber-500"><Latex text={String.raw`$\hat{i}$`} /></div>
          </foreignObject>
          
          <line x1="60" y1="220" x2="60" y2="180" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-1)" />
          <foreignObject x="35" y="185" width="20" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-[13px] text-amber-600 dark:text-amber-500"><Latex text={String.raw`$\hat{j}$`} /></div>
          </foreignObject>

          <line x1="60" y1="220" x2="180" y2="140" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow-1)" />
          <foreignObject x="110" y="145" width="60" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-[13px] text-amber-600 dark:text-amber-500"><Latex text={String.raw`$3\hat{i} + 2\hat{j}$`} /></div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

"""

diag2 = """ {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative" style={{ width: '450px', height: '300px' }}>
        <svg viewBox="0 0 450 300" className="w-full h-full">
          <defs>
            <marker id="arrow-head-slate-2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="currentColor" />
            </marker>
            <marker id="arrow-head-yellow-2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
            </marker>
          </defs>
          
          {/* Skewed Grid */}
          <g stroke="#fde68a" strokeWidth="1.5" className="dark:stroke-amber-900/40">
            {/* Horizontal-ish lines */}
            {[0, 1, 2, 3, 4].map(i => {
              const startX = 80 + i * 25;
              const startY = 240 - i * 35;
              const endX = startX + 6 * 40;
              const endY = startY;
              return <line key={"h"+i} x1={startX} y1={startY} x2={endX} y2={endY} />;
            })}
            {/* Slanted lines */}
            {[0, 1, 2, 3, 4, 5, 6].map(i => {
              const startX = 80 + i * 40;
              const startY = 240;
              const endX = startX + 4 * 25;
              const endY = 240 - 4 * 35;
              return <line key={"v"+i} x1={startX} y1={startY} x2={endX} y2={endY} />;
            })}
          </g>

          {/* Axes */}
          <line x1="80" y1="240" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate-2)" />
          <line x1="80" y1="240" x2="380" y2="240" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" />
          <circle cx="80" cy="240" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          
          {/* Basis Vectors */}
          <line x1="80" y1="240" x2="120" y2="240" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-2)" />
          <foreignObject x="90" y="245" width="20" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-[13px] text-amber-600 dark:text-amber-500"><Latex text={String.raw`$\vec{d}_1$`} /></div>
          </foreignObject>

          <line x1="80" y1="240" x2="105" y2="205" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-2)" />
          <foreignObject x="50" y="200" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-[13px] text-amber-600 dark:text-amber-500"><Latex text={String.raw`$\vec{d}_2$`} /></div>
          </foreignObject>

          {/* Resultant Vector: 2d1 + 2d2 */}
          <line x1="80" y1="240" x2={80 + 2*40 + 2*25} y2={240 - 2*35} stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-head-yellow-2)" />
          <foreignObject x="110" y="170" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-[13px] text-amber-600 dark:text-amber-500"><Latex text={String.raw`$2\vec{d}_1 + 2\vec{d}_2$`} /></div>
          </foreignObject>
          
        </svg>
      </div>
    </div>
  );
}

"""

content = replace_between(content, "export function Chap4_4_4_PlaneEq_Diag1()", "export function Chap4_4_4_PlaneEq_Diag2()", diag1)
content = replace_between(content, "export function Chap4_4_4_PlaneEq_Diag2()", "export function Chap4_4_4_PlaneEq_Diag3()", diag2)

with open('src/components/Latex.tsx', 'w') as f:
    f.write(content)

print("Replaced!")
