# Unlock Education 🇲🇲

A comprehensive, mobile-first learning platform for Myanmar High School students (Grade 10-12).

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS 4
- **Backend**: Supabase (Database & Auth)
- **Math Rendering**: KaTeX + React-KaTeX
- **Animations**: Motion (Framer Motion)

## Features
- **Curriculum-based learning**: Grade 10, 11, and 12 chapter-wise modules.
- **Math-ready content**: Full LaTeX support for equations and formulas.
- **Past Papers Center**: Dedicated matriculation exam archive with yearly papers.
- **Interactive Quizzes**: MCQ-based practice with instant feedback and scoring.
- **Teacher Dashboard**: Admin interface for creating and managing lesson content.
- **Personalized Profile**: Tracking bookmarks and learning progress.

## Getting Started

### 1. Supabase Setup
You need to create a project on [Supabase](https://supabase.com/) and follow these steps:

1.  **Environment Variables**: Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Secrets panel in AI Studio.
2.  **Database Tables**: Open the **SQL Editor** in Supabase and run the content of `src/database_setup.sql`. This will create:
    - Tables (profiles, grades, chapters, lessons, quizzes, questions, past_papers, etc.)
    - Row Level Security (RLS) policies to protect student data.
3.  **Authentication**: Ensure **Google Login** or **Email Login** is enabled in the Supabase Auth settings.

### 2. Admin Access
To access the Admin Dashboard:
1.  Sign up as a user.
2.  Go to your Supabase Dashboard > Table Editor > `profiles`.
3.  Change your `role` from `'student'` to `'admin'`.
4.  You will now see the **Admin Dashboard** in the navigation menu.

## Content Creation Tips
- **Mathematics**: Use `$...$` for inline math and `$$...$$` for block equations in the admin editor.
- **Markdown**: The editor supports standard Markdown (headings, lists, bold, etc.).
- **Hierarchy**: Create a **Grade** first, then a **Chapter**, and finally **Lessons** inside it.

---

Made for the future of Myanmar education. 🚀
