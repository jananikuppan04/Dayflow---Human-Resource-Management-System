import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Shield, UserCheck, ChevronDown, Check, User, LogOut } from 'lucide-react';
import { UserRole } from '../../types/salaryTypes';

interface NavbarProps {
  currentRole: UserRole;
  onRoleToggle: (newRole: UserRole) => void;
  onOpenMobileSidebar?: () => void;
  activePageTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleToggle,
  onOpenMobileSidebar,
  activePageTitle = 'Dashboard',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{activePageTitle}</h2>
      </div>

      {/* Right side: User Profile Dropdown with Role Switcher & Notifications */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Header Pill with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-expanded={isDropdownOpen}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-sm ring-2 ring-blue-100 shadow-xs">
                JD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>

            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-slate-800 leading-tight">Janani Devi</div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span>Software Engineer</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-100">
                  {currentRole}
                </span>
              </div>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </button>

          {/* User Profile Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Profile Overview Header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">Janani Devi</p>
                <p className="text-xs text-slate-500 truncate">janani.dev@email.com</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Active Role: <strong>{currentRole === 'ADMIN' ? 'Administrator' : 'Employee'}</strong></span>
                </div>
              </div>

              {/* Role Switcher Menu Section */}
              <div className="px-2 py-2">
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Access Mode
                </div>

                {/* Admin Role Button */}
                <button
                  onClick={() => {
                    onRoleToggle('ADMIN');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentRole === 'ADMIN'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${currentRole === 'ADMIN' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <div>Admin Mode</div>
                      <div className="text-[10px] text-slate-400 font-normal">Full edit & configuration rights</div>
                    </div>
                  </div>
                  {currentRole === 'ADMIN' && <Check className="w-4 h-4 text-blue-600" />}
                </button>

                {/* Employee Role Button */}
                <button
                  onClick={() => {
                    onRoleToggle('EMPLOYEE');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentRole === 'EMPLOYEE'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${currentRole === 'EMPLOYEE' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <div>Employee Mode</div>
                      <div className="text-[10px] text-slate-400 font-normal">Read-only salary visibility</div>
                    </div>
                  </div>
                  {currentRole === 'EMPLOYEE' && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              </div>

              <div className="border-t border-slate-100 my-1" />

              {/* Menu Links */}
              <div className="px-2 py-1">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Account Settings</span>
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
