import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import { Layout } from './components/layout/Layout';
import { EmployeesPage } from './pages/EmployeesPage';

// Placeholder Pages
const DashboardPlaceholder = () => (
  <div className="flex justify-center items-center h-64 text-slate-500 bg-white rounded-xl shadow-sm">
    <h2 className="text-xl">Employee Dashboard (Coming Soon)</h2>
  </div>
);

import { AttendancePage } from './pages/AttendancePage';

const TimeOffPlaceholder = () => (
  <div className="flex justify-center items-center h-64 text-slate-500 bg-white rounded-xl shadow-sm">
    <h2 className="text-xl">Time Off Module (Coming Soon)</h2>
  </div>
);

const ProfilePlaceholder = () => (
  <div className="flex justify-center items-center h-64 text-slate-500 bg-white rounded-xl shadow-sm">
    <h2 className="text-xl">My Profile (Coming Soon)</h2>
  </div>
);

const LoginPlaceholder = () => {
  const { login } = useAuth();
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <button 
          onClick={() => login({ id: 'u1', email: 'admin@dayflow.com', role: 'admin', employeeId: 'e1' })}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg"
        >
          Login as Admin (Test)
        </button>
      </div>
    </div>
  );
};

// Route Guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPlaceholder />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/employees" replace />} />
            <Route path="dashboard" element={<DashboardPlaceholder />} />
            <Route path="employees" element={<EmployeesPage />} />
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
