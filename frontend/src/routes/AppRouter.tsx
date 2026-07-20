import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { InvestmentsPage } from '../pages/InvestmentsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

export const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      
      <Route path="*" element={<div className="p-12 text-center text-gray-500">404 - Page Not Found</div>} />
    </Routes>
  );
};
