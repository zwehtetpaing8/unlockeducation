import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  formula: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ formula, block = false }) => {
  if (block) {
    return (
      <div className="katex-display-wrapper">
        <BlockMath math={formula} />
      </div>
    );
  }
  return <InlineMath math={formula} />;
};
