import React from 'react';
import { motion } from 'motion/react';

interface ComplexPlaneProps {
  points?: Array<{ x: number, y: number, label: string, color?: string }>;
  showGrid?: boolean;
}

export const ComplexPlane: React.FC<ComplexPlaneProps> = ({ 
  points = [], 
  showGrid = true 
}) => {
  const size = 300;
  const center = size / 2;
  const scale = 40; // Pixels per unit

  return (
    <div className="flex flex-col items-center my-12 group w-full max-w-full">
      <div className="relative bg-white border border-slate-200 rounded-[2rem] p-4 md:p-8 shadow-xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-blue-200 w-full flex flex-col items-center">
        <div className="w-full max-w-[300px] aspect-square relative">
            <svg 
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full overflow-visible"
            >
          {/* Grid lines */}
          {showGrid && (
            <>
              {[...Array(9)].map((_, i) => (
                <line
                  key={`grid-v-${i}`}
                  x1={center + (i - 4) * scale}
                  y1={0}
                  x2={center + (i - 4) * scale}
                  y2={size}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}
              {[...Array(9)].map((_, i) => (
                <line
                  key={`grid-h-${i}`}
                  x1={0}
                  y1={center + (i - 4) * scale}
                  x2={size}
                  y2={center + (i - 4) * scale}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}
            </>
          )}

          {/* Axes */}
          <line
            x1={0}
            y1={center}
            x2={size}
            y2={center}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <line
            x1={center}
            y1={0}
            x2={center}
            y2={size}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Labels */}
          <text x={size - 25} y={center - 10} className="text-[10px] font-black fill-slate-400 uppercase tracking-widest">Real</text>
          <text x={center + 10} y={20} className="text-[10px] font-black fill-slate-400 uppercase tracking-widest">Imaginary</text>

          {/* Origin */}
          <circle cx={center} cy={center} r="3" fill="#cbd5e1" />

          {/* Points */}
          {points.map((pt, i) => {
            const cx = center + pt.x * scale;
            const cy = center - pt.y * scale; // SVG y is inverted
            const color = pt.color || '#2563eb';

            return (
              <g key={i}>
                <motion.line
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  x1={center}
                  y1={center}
                  x2={cx}
                  y2={cy}
                  stroke={color}
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 1 + i * 0.1 }}
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill={color}
                  className="shadow-lg"
                />
                <motion.text
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  x={cx + 10}
                  y={cy - 10}
                  className="text-xs font-bold fill-slate-900"
                >
                  {pt.label}
                </motion.text>
              </g>
            );
          })}
        </svg>
        </div>

        {/* Legend/Info Badge */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3 justify-center">
            {points.map((pt, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pt.color || '#2563eb' }} />
                    <span className="text-[10px] font-bold text-slate-600 tracking-tight">{pt.label}: {pt.x >= 0 ? '+' : ''}{pt.x} {pt.y >= 0 ? '+' : ''}{pt.y}i</span>
                </div>
            ))}
        </div>
      </div>
      <p className="mt-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Interactive Complex Plane Visualization</p>
    </div>
  );
};
