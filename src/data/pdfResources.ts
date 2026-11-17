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
    fileName: 'G12 Ch1 Past Papers Section A to D (Questions only)',
    description: 'Chapter 1: Complex Numbers — Past Papers Section A to D (Questions Only)',
    pdfUrl: '/papers/ch1/G12%20Ch1%20Past%20Papers%20Section%20A%20to%20D%20(Questions%20only).pdf',
    downloadName: 'G12 Ch1 Past Papers Section A to D (Questions only).pdf',
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
    fileName: 'G12 Ch1 Past Papers Section A (Solutions)',
    description: 'Chapter 1: Complex Numbers — Past Papers Section A (Solutions)',
    pdfUrl: '/papers/ch1/G12%20Ch1%20Past%20Papers%20Section%20A%20(Solutions).pdf',
    downloadName: 'G12 Ch1 Past Papers Section A (Solutions).pdf',
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
  {
    id: 'ch2-past-paper',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    category: 'questions',
    fileName: 'G12 Ch2 Past Papers Section C and D (Questions only)',
    description: 'Chapter 2: Mathematical Induction — Past Papers Section C and D (Questions Only)',
    pdfUrl: '/papers/ch2/G12%20Ch2%20Past%20Papers%20Section%20C%20and%20D%20(Questions%20only).pdf',
    downloadName: 'G12 Ch2 Past Papers Section C and D (Questions only).pdf',
    pageCount: 4,
    pages: [
      '/papers/ch2/page-1.png',
      '/papers/ch2/page-2.png',
      '/papers/ch2/page-3.png',
      '/papers/ch2/page-4.png',
    ],
    available: true,
  },
];
