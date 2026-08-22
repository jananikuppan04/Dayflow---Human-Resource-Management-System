import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import { Layout } from './components/layout/Layout';
import { EmployeesPage } from './pages/EmployeesPage';

import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { AttendancePage } from './pages/AttendancePage';

const TimeOffPlaceholder = () => (
  <div className="flex justify-center items-center h-64 text-slate-500 bg-white rounded-xl shadow-sm">
    <h2 className="text-xl">Time Off Module (Coming Soon)</h2>
  </div>
);

import { useEffect, useState } from 'react';
import { mockApi } from './services/mockApi';

const ProfilePlaceholder = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    if (user?.employeeId) {
      mockApi.getCurrentEmployee(user.employeeId).then(setEmployee).catch(console.error);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-64 text-slate-500 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl">
        {employee ? `${employee.firstName} ${employee.lastName}'s Profile (Coming Soon)` : 'My Profile (Coming Soon)'}
      </h2>
    </div>
  );
};

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
          <Route path="/signup" element={<SignupPage />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="employees" element={<AdminRoute><EmployeesPage /></AdminRoute>} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="time-off" element={<TimeOffPlaceholder />} />
            <Route path="profile" element={<ProfilePlaceholder />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
