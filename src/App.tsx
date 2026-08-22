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
import { UserRole } from './types/salaryTypes';
import { Clock, Wallet, FileBarChart, Settings as SettingsIcon } from 'lucide-react';

function MainAppLayout() {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState<UserRole>(user?.role === 'admin' ? 'ADMIN' : 'EMPLOYEE');
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
    return 'My Profile';
  };

  const activeNav = getActiveNavItem(location.pathname);

  // Human-readable page title for the navbar header
  const pageTitleMap: Record<string, string> = {
    Dashboard: 'Dashboard',
    'My Profile': 'My Profile',
    Employees: 'Employees',
    Attendance: 'Attendance',
    'Time Off': 'Time Off',
    Payroll: 'Payroll',
    Reports: 'Reports',
    Settings: 'Settings',
  };
  const activePageTitle = pageTitleMap[activeNav] || activeNav;

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
    navigate(routeMap[item] || '/profile');
  };

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
          onRoleToggle={setCurrentRole}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          activePageTitle={activePageTitle}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/profile" element={<SalaryInfoPage currentRole={currentRole} />} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />

            {/* Workplace module views */}
            <Route
              path="/time-off"
              element={
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Time Off & Leave Requests</h2>
                      <p className="text-xs text-slate-500">Apply for leave, check balance & review team requests</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center py-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 font-medium block">Casual Leave</span>
                      <span className="text-xl font-bold text-slate-800">12 / 14 Days</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 font-medium block">Sick Leave</span>
                      <span className="text-xl font-bold text-slate-800">7 / 10 Days</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 font-medium block">Earned Leave</span>
                      <span className="text-xl font-bold text-slate-800">15 / 18 Days</span>
                    </div>
                  </div>
                </div>
              }
            />

            <Route
              path="/payroll"
              element={
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Payroll Management</h2>
                      <p className="text-xs text-slate-500">Overview of organization payroll, payslips, and disbursements</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Access company payroll schedules, payslips, and tax statements. View your comprehensive salary breakdown under{' '}
                    <button
                      onClick={() => navigate('/profile')}
                      className="text-blue-600 font-semibold underline cursor-pointer"
                    >
                      My Profile
                    </button>.
                  </p>
                </div>
              }
            />

            <Route
              path="/reports"
              element={
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <FileBarChart className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">HR Analytics & Reports</h2>
                      <p className="text-xs text-slate-500">Attendance trends, headcount growth, and payroll summaries</p>
                    </div>
                  </div>
                </div>
              }
            />

            <Route
              path="/settings"
              element={
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                      <SettingsIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">System Settings</h2>
                      <p className="text-xs text-slate-500">Configure organization settings, roles, and integrations</p>
                    </div>
                  </div>
                </div>
              }
            />

            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/*" element={user ? <MainAppLayout /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
