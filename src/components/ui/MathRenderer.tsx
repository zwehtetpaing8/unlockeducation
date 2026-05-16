import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  formula: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ formula, block = false }) => {
  if (block) {
    return <BlockMath math={formula} />;
  }
  return <InlineMath math={formula} />;
};
