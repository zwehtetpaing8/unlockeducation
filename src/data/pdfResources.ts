export type PdfCategory = 'questions' | 'solutions';

export interface PdfResource {
  id: string;
  chapterId: number;
  chapterTitle: string;
  category: PdfCategory;
  fileName: string;
  description: string;
  pdfUrl: string;
  downloadName: string;
  pageCount: number;
  pages: string[];
  available: boolean;
}

export const pdfChapters = [
  { id: 1, title: 'Complex Numbers' },
  { id: 2, title: 'Mathematical Induction' },
  { id: 3, title: 'Analytical Solid Geometry' },
  { id: 4, title: 'Vector Algebra' },
  { id: 5, title: 'Permutations and Combinations' },
  { id: 6, title: 'Conic Sections' },
  { id: 7, title: 'Trigonometric Functions' },
  { id: 8, title: 'Logarithmic & Exponential Functions' },
  { id: 9, title: 'Application of Differentiation' },
  { id: 10, title: 'Method of Integration' },
  { id: 11, title: 'Application of Integration' },
];

export const pdfResources: PdfResource[] = [
  {
    id: 'ch1-past-paper',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    category: 'questions',
    fileName: 'G12_Ch1_Past_Papers_Section_A_to_D (Questions only)',
    description: 'Chapter 1: Complex Numbers — Past Papers Section A to D (Questions Only)',
    pdfUrl: '/papers/ch1/G12_Ch1_Past_Papers_Section_A_to_D%20(Questions%20only).pdf',
    downloadName: 'G12_Ch1_Past_Papers_Section_A_to_D (Questions only).pdf',
    pageCount: 7,
    pages: [
      '/papers/ch1/page-1.png',
      '/papers/ch1/page-2.png',
      '/papers/ch1/page-3.png',
      '/papers/ch1/page-4.png',
      '/papers/ch1/page-5.png',
      '/papers/ch1/page-6.png',
      '/papers/ch1/page-7.png',
    ],
    available: true,
  },
  {
    id: 'ch1-sec-a-solutions',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    category: 'solutions',
    fileName: 'G12_Ch1_Past_Papers_Section_A (Solutions)',
    description: 'Chapter 1: Complex Numbers — Past Papers Section A (Solutions)',
    pdfUrl: '/papers/ch1/G12_Ch1_Past_Papers_Section_A%20(Solutions).pdf',
    downloadName: 'G12_Ch1_Past_Papers_Section_A (Solutions).pdf',
    pageCount: 7,
    pages: [
      '/papers/ch1/sec-a-sol/page-1.png',
      '/papers/ch1/sec-a-sol/page-2.png',
      '/papers/ch1/sec-a-sol/page-3.png',
      '/papers/ch1/sec-a-sol/page-4.png',
      '/papers/ch1/sec-a-sol/page-5.png',
      '/papers/ch1/sec-a-sol/page-6.png',
      '/papers/ch1/sec-a-sol/page-7.png',
    ],
    available: true,
  },
];
