import React from 'react';
import { Menu, Bell, Shield, UserCheck, ChevronDown } from 'lucide-react';
import { UserRole } from '../../types/salaryTypes';

interface NavbarProps {
  currentRole: UserRole;
  onRoleToggle: (newRole: UserRole) => void;
  onOpenMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleToggle,
  onOpenMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">My Profile</h2>
      </div>

      {/* Right side: Role Switcher Demo Control & User Menu */}
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Interactive Role Switcher Toggle for Demo Evaluation */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
          <span className="hidden sm:inline px-2 text-slate-500 font-semibold">Access Mode:</span>
          <button
            onClick={() => onRoleToggle('ADMIN')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'ADMIN'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            title="Switch to Admin role to configure salary"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
          <button
            onClick={() => onRoleToggle('EMPLOYEE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'EMPLOYEE'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            title="Switch to Employee role for read-only view"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Employee</span>
          </button>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Logged in User Profile Header Pill */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-sm ring-2 ring-blue-100">
            JD
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-semibold text-slate-800 leading-tight">Janani Devi</div>
            <div className="text-xs text-slate-500 font-medium">Software Engineer</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
};
