import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  formula: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ formula, block = false }) => {
  if (block) {
    return (
      <div className="overflow-x-auto overflow-y-hidden my-4 py-2 custom-scrollbar">
        <BlockMath math={formula} />
      </div>
    );
  }
  return <InlineMath math={formula} />;
};
