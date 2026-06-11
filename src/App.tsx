/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Auth from './pages/Auth';
import GradeDetail from './pages/GradeDetail';
import Lessons from './pages/Lessons';
import ChapterDetail from './pages/ChapterDetail';
import LessonDetail from './pages/LessonDetail';
import QuizPage from './pages/QuizPage';
import PastPapers from './pages/PastPapers';
import SectionDMaster from './pages/SectionDMaster';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { Loader2 } from 'lucide-react';

// Helper for protected routes (Bypassed temporarily as requested)
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Navigate to="/" replace />} />
            
            {/* Student Routes */}
            <Route path="/grade/:level" element={<GradeDetail />} />
            <Route path="/lessons/:level" element={<Lessons />} />
            <Route path="/grade/:level/chapter/:chapterId" element={<ChapterDetail />} />
            <Route path="/grade/:level/chapter/:chapterId/lesson/:lessonId" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
            <Route path="/lesson/:lessonId" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
            <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/past-papers" element={<PastPapers />} />
            <Route path="/section-d" element={<SectionDMaster />} />
            <Route path="/profile" element={<Navigate to="/" replace />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Admin Routes (Disabled and redirected to home to hide admin control) */}
            <Route path="/admin/*" element={<Navigate to="/" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
