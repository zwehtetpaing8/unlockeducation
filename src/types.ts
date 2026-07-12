export interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
}

export interface Question {
  id: string;
  questionText: string; // supports LaTeX in $...$
  options: string[]; // supports LaTeX in $...$
  correctAnswerIndex: number;
  explanation: string; // supports LaTeX in $...$
}

export interface Chapter {
  id: number;
  title: string;
  tagline: string;
  description: string;
  content: string; // detailed reading material supporting LaTeX
  formulas: Formula[];
  quiz: Question[];
  visualizerType?: 'complex-plane' | 'induction-steps' | 'solid-geometry' | 'vector-calc' | 'perm-comb' | 'conic-explorer' | 'trig-wave' | 'log-exp' | 'derivative-tangent' | 'integration-area';
}
