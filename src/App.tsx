import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { SalaryInfoPage } from './components/profile/SalaryInfoPage';
import { UserRole } from './types/salaryTypes';

function MainAppLayout() {
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');
  const [activeNav, setActiveNav] = useState<string>('My Profile');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Navigation Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onNavigate={(item) => {
          setActiveNav(item);
          if (item === 'My Profile') {
            navigate('/profile');
          }
        }}
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
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeNav === 'My Profile' ? (
            <SalaryInfoPage currentRole={currentRole} />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
              <h3 className="text-lg font-bold text-slate-800">{activeNav} View</h3>
              <p className="text-xs text-slate-500 mt-2">
                This section is active in the Dayflow environment. Click{' '}
                <button
                  onClick={() => {
                    setActiveNav('My Profile');
                    navigate('/profile');
                  }}
                  className="text-blue-600 font-semibold underline cursor-pointer"
                >
                  My Profile
                </button>{' '}
                to view the complete Profile & Salary Information module.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<MainAppLayout />} />
      <Route path="/dashboard" element={<MainAppLayout />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
}

export default App;
