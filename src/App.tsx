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

// Helper for protected routes
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50/10">
        <Loader2 className="animate-spin text-blue-600" size={36} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && profile?.role !== 'admin' && profile?.role !== 'teacher') {
    return <Navigate to="/" replace />;
  }

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
            <Route path="/auth" element={<Auth />} />
            
            {/* Student Routes */}
            <Route path="/grade/:level" element={<GradeDetail />} />
            <Route path="/lessons/:level" element={<Lessons />} />
            <Route path="/grade/:level/chapter/:chapterId" element={<ChapterDetail />} />
            <Route path="/grade/:level/chapter/:chapterId/lesson/:lessonId" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
            <Route path="/lesson/:lessonId" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
            <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/past-papers" element={<PastPapers />} />
            <Route path="/section-d" element={<SectionDMaster />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
