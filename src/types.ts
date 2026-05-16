export type UserRole = 'student' | 'teacher' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  grade_level: number | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Grade {
  id: number;
  level: number; // 10, 11, 12
  title: string;
  description: string;
}

export interface Chapter {
  id: string;
  grade_id: number;
  chapter_number: number;
  title: string;
  description: string;
  order_index: number;
  created_at?: string;
}

export interface Section {
  id: string;
  chapter_id: string;
  title: string;
  content: string; // Markdown supported
  order_index: number;
}

export interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  type: 'theory' | 'exercise' | 'summary' | 'formula';
  content: string;
  order_index: number;
  created_at?: string;
}

export interface Quiz {
  id: string;
  chapter_id: string;
  title: string;
  description: string;
  time_limit_minutes: number;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
  explanation: string | null;
}

export interface PastPaper {
  id: string;
  year: number;
  subject: string;
  grade_level: number;
  title: string;
  pdf_url: string;
  answer_pdf_url: string | null;
  section: 'A' | 'B' | 'C' | 'D' | 'Full Paper';
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string | null;
  quiz_id: string | null;
  score: number | null;
  completed_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  lesson_id: string;
  created_at: string;
}
