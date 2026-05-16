-- MM-Maths Academy Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Profiles Table (Extends Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  grade_level INTEGER,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Grades Table
CREATE TABLE grades (
  id INTEGER PRIMARY KEY,
  level INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT
);

-- 3. Chapters Table
CREATE TABLE chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  grade_id INTEGER REFERENCES grades(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(grade_id, chapter_number)
);

-- 4. Lessons Table
CREATE TABLE lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'theory' CHECK (type IN ('theory', 'exercise', 'summary', 'formula')),
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Past Papers
CREATE TABLE past_papers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  subject TEXT NOT NULL,
  grade_level INTEGER NOT NULL,
  title TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  answer_pdf_url TEXT,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Quizzes
CREATE TABLE quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Questions
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_option_index INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Progress Tracking
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Bookmarks
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- --- RLS POLICIES ---

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see/edit their own profile
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Curriculum: Everyone can read, only Admins/Teachers can write
CREATE POLICY "Curriculum is readable by everyone" ON grades FOR SELECT USING (true);
CREATE POLICY "Curriculum is readable by everyone" ON chapters FOR SELECT USING (true);
CREATE POLICY "Curriculum is readable by everyone" ON lessons FOR SELECT USING (true);
CREATE POLICY "Curriculum is readable by everyone" ON past_papers FOR SELECT USING (true);

-- Admin restrictions (Assume profile.role check)
-- NOTE: In production, you'd use a service role or a more complex RPC check for role-based writes
CREATE POLICY "Admins can manage curriculum" ON grades FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'teacher'))
);
CREATE POLICY "Admins can manage curriculum" ON chapters FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'teacher'))
);
CREATE POLICY "Admins can manage curriculum" ON lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'teacher'))
);

-- Bookmarks: Users only see/manage their own
CREATE POLICY "Users manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- --- INITIAL DATA ---
INSERT INTO grades (id, level, title, description) VALUES
(10, 10, 'Grade 10', 'Foundational Maths'),
(11, 11, 'Grade 11', 'Intermediate Maths'),
(12, 12, 'Grade 12', 'Matriculation Final');

-- Sample Grade 12 Chapters
INSERT INTO chapters (grade_id, chapter_number, title, description) VALUES
(12, 1, 'Complex Numbers', 'Introduction to imaginary numbers and complex planes.'),
(12, 2, 'Mathematical Induction', 'Proving mathematical statements for all natural numbers.'),
(12, 3, 'Analytical Solid Geometry', 'Three-dimensional geometry of points, lines and planes.'),
(12, 4, 'Vector Algebra', 'Operations with vectors in 3D space.'),
(12, 5, 'Permutations and Combinations', 'Principles of counting and arrangements.'),
(12, 6, 'Conic Sections', 'Study of circles, parabolas, ellipses, and hyperbolas.'),
(12, 7, 'Trigonometric Functions', 'Advanced identities and trigonometric equations.'),
(12, 8, 'Logarithmic and Exponential Functions', 'Properties and applications of logs and e.'),
(12, 9, 'Application of Differentiation', 'Using derivatives for rates of change and optimization.'),
(12, 10, 'Method of Integration', 'Techniques for finding integrals.'),
(12, 11, 'Application of Integration', 'Calculating areas and volumes using integrals.');
