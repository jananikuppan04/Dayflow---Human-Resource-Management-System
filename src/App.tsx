import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { SalaryInfoPage } from './components/profile/SalaryInfoPage';
import { UserRole } from './types/salaryTypes';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');
  const [activeNav, setActiveNav] = useState<string>('My Profile');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Navigation Sidebar */}
      <Sidebar
        activeItem={activeNav}
        onNavigate={setActiveNav}
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
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-12">
              <h3 className="text-lg font-bold text-slate-800">{activeNav} Page</h3>
              <p className="text-xs text-slate-500 mt-2">
                This page belongs to another team member's workspace. Switch back to{' '}
                <button
                  onClick={() => setActiveNav('My Profile')}
                  className="text-blue-600 font-semibold underline"
                >
                  My Profile
                </button>{' '}
                to inspect the Salary Information module.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
