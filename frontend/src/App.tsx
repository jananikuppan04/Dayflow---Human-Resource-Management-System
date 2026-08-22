import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import { Layout } from './components/layout/Layout';
import { EmployeesPage } from './pages/EmployeesPage';

import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { AttendancePage } from './pages/AttendancePage';
import { TimeOffPage } from './pages/TimeOffPage';
import { ProfilePage } from './components/profile/ProfilePage';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Route Guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Route Guard for Admin Only
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/employees/new" element={
            <ProtectedRoute>
              <AdminRoute>
                <SignupPage />
              </AdminRoute>
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="employees" element={<AdminRoute><EmployeesPage /></AdminRoute>} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="time-off" element={<TimeOffPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
