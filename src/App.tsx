import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import './config/i18n'; // Initialize i18n

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ModuleOverview from './pages/Module/ModuleOverview';
import LessonPageNew from './pages/Lesson/LessonPageNew';
import SettingsPage from './pages/SettingsPage';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
          <p className="text-senior-base text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/module/:moduleId"
              element={
                <ProtectedRoute>
                  <ModuleOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lesson/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonPageNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;

