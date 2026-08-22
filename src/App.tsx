import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider, useAuth } from './store/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { SalaryInfoPage } from './components/profile/SalaryInfoPage';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { EmployeesPage } from './pages/EmployeesPage';
import { AttendancePage } from './pages/AttendancePage';
import { TimeOffPage } from './pages/TimeOffPage';
import { PayrollPage } from './pages/PayrollPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { UserRole } from './types/salaryTypes';

function MainAppLayout() {
  const { user } = useAuth();
  // Derive currentRole from the authenticated user — no more hardcoded 'ADMIN'
  const currentRole: UserRole = user?.role === 'admin' ? 'ADMIN' : 'EMPLOYEE';
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active nav item from path
  const getActiveNavItem = (pathname: string) => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/profile')) return 'My Profile';
    if (pathname.startsWith('/employees')) return 'Employees';
    if (pathname.startsWith('/attendance')) return 'Attendance';
    if (pathname.startsWith('/time-off')) return 'Time Off';
    if (pathname.startsWith('/payroll')) return 'Payroll';
    if (pathname.startsWith('/reports')) return 'Reports';
    if (pathname.startsWith('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const activeNav = getActiveNavItem(location.pathname);

  const handleNavigate = (item: string) => {
    const routeMap: Record<string, string> = {
      Dashboard: '/dashboard',
      'My Profile': '/profile',
      Employees: '/employees',
      Attendance: '/attendance',
      'Time Off': '/time-off',
      Payroll: '/payroll',
      Reports: '/reports',
      Settings: '/settings',
    };
    navigate(routeMap[item] || '/dashboard');
  };

  // Auth guard: redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Navigation Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onNavigate={handleNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <Navbar
          currentRole={currentRole}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<EmployeeDashboard currentRole={currentRole} />} />
            <Route path="/profile" element={<SalaryInfoPage currentRole={currentRole} />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/time-off" element={<TimeOffPage currentRole={currentRole} />} />
            <Route path="/payroll" element={<PayrollPage currentRole={currentRole} />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Navigate to="/login" replace />} />
        <Route path="/*" element={<MainAppLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
