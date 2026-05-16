-- 1. Create Chapters Table
CREATE TABLE chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  grade_id INTEGER NOT NULL, -- 10, 11, or 12
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Lessons Table
CREATE TABLE lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('theory', 'exercise', 'summary', 'formula')) DEFAULT 'theory',
  content TEXT, -- Supports Markdown/LaTeX
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Bookmarks Table (Optional)
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Read Access: Everyone can read chapters and lessons
CREATE POLICY "Allow public read chapters" ON chapters FOR SELECT USING (true);
CREATE POLICY "Allow public read lessons" ON lessons FOR SELECT USING (true);

-- Bookmark Access: Users can only see/edit their own bookmarks
CREATE POLICY "Users can manage their own bookmarks" ON bookmarks 
  FOR ALL USING (auth.uid() = user_id);

-- 4. Seed some data for Grade 12
INSERT INTO chapters (grade_id, chapter_number, title, description, order_index)
VALUES 
(12, 1, 'Complex Numbers', 'Introduction to imaginary numbers and the complex plane.', 1),
(12, 2, 'Mathematical Induction', 'Proving statements for all natural numbers.', 2),
(12, 3, 'Analytical Solid Geometry', 'The geometry of three-dimensional figures.', 3),
(12, 4, 'Vector Algebra', 'Operations and applications of vectors.', 4),
(12, 5, 'Permutations and Combinations', 'Counting principles and arrangements.', 5),
(12, 6, 'Conic Sections', 'Circles, ellipses, parabolas, and hyperbolas.', 6),
(12, 7, 'Trigonometric Functions', 'Advanced trigonometric identities and graphs.', 7),
(12, 8, 'Logarithmic and Exponential Functions', 'Properties and equations of log and exp.', 8),
(12, 9, 'Application of Differentiation', 'Using derivatives for real-world problems.', 9),
(12, 10, 'Method of Integration', 'Techniques for finding integrals.', 10),
(12, 11, 'Application of Integration', 'Using integrals to find areas and volumes.', 11);

-- Add a sample lesson for Chapter 1 (Complex Numbers)
INSERT INTO lessons (chapter_id, title, type, content, order_index)
SELECT id, 'Introduction', 'theory', '# Introduction\n\nThe number $i$ is defined as $\\sqrt{-1}$...', 1
FROM chapters WHERE grade_id = 12 AND chapter_number = 1 LIMIT 1;
