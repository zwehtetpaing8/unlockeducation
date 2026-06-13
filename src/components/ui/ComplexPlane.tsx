import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Minus, Hash, RotateCw, Calculator } from 'lucide-react';

interface ComplexPlaneProps {
  points?: Array<{ x: number, y: number, label: string, color?: string }>;
  showGrid?: boolean;
}

export const ComplexPlane: React.FC<ComplexPlaneProps> = ({ 
  points = [], 
  showGrid = true 
}) => {
  const size = 320;
  const center = size / 2;
  const scale = 32; // 32 pixels per unit on coordinate axis (-5 to +5)

  // Interactive sandbox state
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [sandboxPoint, setSandboxPoint] = useState({ x: 3, y: 2 });
  const [showConjugate, setShowConjugate] = useState(false);
  const [showNegative, setShowNegative] = useState(false);
  const [showModulusArc, setShowModulusArc] = useState(true);

  // Convert SVG client coords to grid units
  const handlePlaneInteraction = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const xPx = clientX - rect.left;
    const yPx = clientY - rect.top;

    // Convert pixels to SVG coordinate scale
    const svgX = (xPx / rect.width) * size;
    const svgY = (yPx / rect.height) * size;

    // Convert SVG coords to grid unit coords (relative to center)
    const rawX = (svgX - center) / scale;
    const rawY = (center - svgY) / scale; // Y is inverted in SVG

    // Snap to nearest 0.5 unit for cleaner learning experience
    const snappedX = Math.round(rawX * 2) / 2;
    const snappedY = Math.round(rawY * 2) / 2;

    // Constrain grid to boundaries [-5, 5]
    const clampedX = Math.max(-5, Math.min(5, snappedX));
    const clampedY = Math.max(-5, Math.min(5, snappedY));

    setSandboxPoint({ x: clampedX, y: clampedY });
  };

  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    handlePlaneInteraction(e);
  };

  // Calculations for Sandbox
  const { x, y } = sandboxPoint;
  const modulus = Math.sqrt(x * x + y * y);
  const argumentRad = Math.atan2(y, x);
  const argumentDeg = (argumentRad * 180) / Math.PI;
  const formattedArg = argumentDeg >= 0 ? argumentDeg.toFixed(1) : (argumentDeg + 360).toFixed(1);

  // Grid coordinates ticks
  const ticks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center my-10 w-full max-w-full">
      <div className="bg-white border border-slate-150 rounded-[2.5rem] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md w-full flex flex-col xl:flex-row gap-8 items-stretch">
        
        {/* SVG Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5 select-none">
            <Sparkles size={14} className="text-blue-500" />
            <span>Click anywhere on the grid to change Z</span>
          </div>

          <div className="relative border border-slate-100 rounded-3xl p-3 bg-slate-50/50">
            <svg 
              ref={svgRef}
              viewBox={`0 0 ${size} ${size}`}
              className="w-full max-w-[280px] xs:max-w-[320px] aspect-square overflow-visible cursor-pointer select-none touch-none"
              onMouseDown={handleSvgMouseDown}
              onTouchStart={handlePlaneInteraction}
              onTouchMove={handlePlaneInteraction}
            >
              {/* Background grid lines */}
              {showGrid && (
                <>
                  {ticks.map((val) => {
                    const posOffset = center + val * scale;
                    return (
                      <g key={`grid-ticks-${val}`}>
                        {/* Vertical Grid Line */}
                        <line
                          x1={posOffset}
                          y1={0}
                          x2={posOffset}
                          y2={size}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                          strokeDasharray="1 3"
                        />
                        {/* Horizontal Grid Line */}
                        <line
                          x1={0}
                          y1={posOffset}
                          x2={size}
                          y2={posOffset}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                          strokeDasharray="1 3"
                        />
                        
                        {/* Tick Mark Number Labels */}
                        <text 
                          x={posOffset} 
                          y={center + 12} 
                          className="text-[9px] font-bold fill-slate-400 text-center"
                          textAnchor="middle"
                        >
                          {val}
                        </text>
                        <text 
                          x={center - 12} 
                          y={posOffset + 3} 
                          className="text-[9px] font-bold fill-slate-400 text-right"
                          textAnchor="end"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Main Axes */}
              <line
                x1={0}
                y1={center}
                x2={size}
                y2={center}
                stroke="#64748b"
                strokeWidth="2"
              />
              <line
                x1={center}
                y1={0}
                x2={center}
                y2={size}
                stroke="#64748b"
                strokeWidth="2"
              />

              {/* Axis Label Tags */}
              <text x={size - 28} y={center - 8} className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Re</text>
              <text x={center + 8} y={18} className="text-[10px] font-black fill-slate-500 uppercase tracking-widest">Im</text>

              {/* Center Origin Dot */}
              <circle cx={center} cy={center} r="3.5" fill="#475569" />

              {/* Active Visual Modulus Reference Arc */}
              {showModulusArc && modulus > 0 && (
                <circle 
                  cx={center} 
                  cy={center} 
                  r={modulus * scale} 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="1" 
                  strokeDasharray="3 3"
                  className="opacity-45"
                />
              )}

              {/* Static points (if any provided by parents) */}
              {points.map((pt, i) => {
                const cx = center + pt.x * scale;
                const cy = center - pt.y * scale;
                const ptColor = pt.color || '#2563eb';
                return (
                  <g key={`provided-pt-${i}`} className="opacity-60">
                    <line x1={center} y1={center} x2={cx} y2={cy} stroke={ptColor} strokeWidth="2" strokeDasharray="2 2" />
                    <circle cx={cx} cy={cy} r="5" fill={ptColor} />
                    <text x={cx + 8} y={cy - 8} className="text-[10px] font-extrabold fill-slate-700">{pt.label}</text>
                  </g>
                );
              })}

              {/* 1. Primary Conjugate Vector (Active display) */}
              {showConjugate && (
                <g>
                  <line 
                    x1={center} 
                    y1={center} 
                    x2={center + x * scale} 
                    y2={center + y * scale} // Y conjugate is conjugate (inverted)
                    stroke="#a855f7" 
                    strokeWidth="2.5" 
                    className="opacity-75"
                  />
                  <circle 
                    cx={center + x * scale} 
                    cy={center + y * scale} 
                    r="5.5" 
                    fill="#a855f7" 
                  />
                  <text 
                    x={center + x * scale + 10} 
                    y={center + y * scale + 14} 
                    className="text-xs font-black fill-purple-700 bg-white"
                  >
                    z̄ = {x} - {y}i
                  </text>
                </g>
              )}

              {/* 2. Negative Vector (Active display) */}
              {showNegative && (
                <g>
                  <line 
                    x1={center} 
                    y1={center} 
                    x2={center - x * scale} 
                    y2={center + y * scale} 
                    stroke="#ef4444" 
                    strokeWidth="2.5" 
                    className="opacity-75"
                  />
                  <circle 
                    cx={center - x * scale} 
                    cy={center + y * scale} 
                    r="5.5" 
                    fill="#ef4444" 
                  />
                  <text 
                    x={center - x * scale - 25} 
                    y={center + y * scale + 14} 
                    className="text-xs font-black fill-red-700"
                  >
                    -z
                  </text>
                </g>
              )}

              {/* 3. Main Target sandboxPoint Vector */}
              <g>
                <line 
                  x1={center} 
                  y1={center} 
                  x2={center + x * scale} 
                  y2={center - y * scale} 
                  stroke="#3b82f6" 
                  strokeWidth="3.5" 
                />
                <circle 
                  cx={center + x * scale} 
                  cy={center - y * scale} 
                  r="7" 
                  fill="#2563eb" 
                  className="shadow-md animate-pulse"
                />
                <text 
                  x={center + x * scale + 10} 
                  y={center - y * scale - 10} 
                  className="text-xs font-black fill-blue-700 bg-white"
                >
                  z = {x >= 0 ? '' : '-'}{Math.abs(x)}{y >= 0 ? ' + ' : ' - '}{Math.abs(y)}i
                </text>
              </g>
            </svg>
          </div>
          <div className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em] select-none">
            Argand Diagram Playground
          </div>
        </div>

        {/* Dashboard Control Panel Side */}
        <div className="flex-1 flex flex-col justify-between border-t xl:border-t-0 xl:border-l border-slate-100 pt-6 xl:pt-0 xl:pl-8">
          <div>
            <div className="flex items-center gap-2.5 mb-5 select-none">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Calculator size={18} />
              </div>
              <h4 className="text-base font-black text-slate-800">Complex Plane Inspector</h4>
            </div>

            {/* Visual Formula breakdown details */}
            <div className="space-y-4">
              {/* Complex coordinates display */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">
                  <span>Standard Cartesian Form</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-black">x + yi</span>
                </div>
                <div className="text-lg font-black text-slate-900 font-mono">
                  z = <span className="text-blue-600">{x}</span> + <span className="text-blue-600">{y}i</span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-1">
                  Real part <span className="font-mono">Re(z) = {x}</span>, Imaginary part <span className="font-mono">Im(z) = {y}</span>
                </div>
              </div>

              {/* Angle argument & Absolute modulus stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Modulus |z|</span>
                  <span className="text-sm font-black text-slate-800 font-mono">
                    {modulus.toFixed(3)}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
                    √({x}² + {y}²)
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Argument θ</span>
                  <span className="text-sm font-black text-slate-800 font-mono">
                    {formattedArg}°
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
                    {argumentRad.toFixed(3)} rad
                  </span>
                </div>
              </div>

              {/* Display checkboxes style options */}
              <div className="space-y-2 mt-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Display Controls</span>
                
                <label className="flex items-center gap-3 px-3 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer select-none transition-colors">
                  <input 
                    type="checkbox" 
                    checked={showConjugate} 
                    onChange={(e) => setShowConjugate(e.target.checked)} 
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-extrabold text-slate-800">Show Conjugate (z̄)</span>
                    <span className="text-[10px] text-purple-600 font-bold">z̄ = {x} - {y}i</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 px-3 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer select-none transition-colors">
                  <input 
                    type="checkbox" 
                    checked={showNegative} 
                    onChange={(e) => setShowNegative(e.target.checked)} 
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-extrabold text-slate-800">Show Negative (-z)</span>
                    <span className="text-[10px] text-red-600 font-bold">-z = {-x} + {-y}i</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 px-3 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer select-none transition-colors">
                  <input 
                    type="checkbox" 
                    checked={showModulusArc} 
                    onChange={(e) => setShowModulusArc(e.target.checked)} 
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-extrabold text-slate-800">Show Modulus Radius Arc</span>
                    <span className="text-[10px] text-slate-400">Highlights distance from origin</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
