import React from 'react';
import Latex from './Latex';

export function TestSVG() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200">
      <foreignObject x="50" y="50" width="50" height="50">
        <div className="flex items-center justify-center w-full h-full text-yellow-600">
          <Latex text="$\vec{a}$" />
        </div>
      </foreignObject>
    </svg>
  );
}
