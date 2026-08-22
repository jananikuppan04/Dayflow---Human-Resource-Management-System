import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, Shield, Clock, Power, Play, Square } from 'lucide-react';
import { UserRole } from '../../types/salaryTypes';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../services/mockApi';

interface NavbarProps {
  currentRole?: UserRole;
  onRoleToggle?: (newRole: UserRole) => void;
  onOpenMobileSidebar?: () => void;
}

export const OdooLogo: React.FC<{ className?: string }> = ({ className = 'h-6' }) => (
  <div className={`flex items-center gap-1 select-none ${className}`}>
    <span className="text-[#714B67] text-2xl font-black tracking-tighter" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      odoo
    </span>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentRole = 'ADMIN',
  onOpenMobileSidebar,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSystrayOpen, setIsSystrayOpen] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const systrayRef = useRef<HTMLDivElement>(null);

  // Determine user role badge & info
  const isAdmin = user?.role === 'admin' || currentRole === 'ADMIN';
  const roleBadgeText = isAdmin ? 'Admin' : 'Employee';
  const userName = user?.email?.includes('admin') ? 'HR Administrator' : 'Janani Devi';
  const userEmail = user?.email || 'janani.dev@email.com';
  const userDesignation = isAdmin ? 'HR Manager' : 'Software Engineer';

  // Load attendance state on mount & listen to updates
  useEffect(() => {
    loadAttendanceState();

    const handleUpdate = () => loadAttendanceState();
    window.addEventListener('attendance-changed', handleUpdate);
    return () => window.removeEventListener('attendance-changed', handleUpdate);
  }, [user]);

  const loadAttendanceState = async () => {
    if (!user?.employeeId) return;
    try {
      const todayRecord = await mockApi.getTodayAttendance(user.employeeId);
      if (todayRecord && todayRecord.checkIn && !todayRecord.checkOut) {
        setIsCheckedIn(true);
        setCheckInTime(new Date(todayRecord.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        setIsCheckedIn(false);
        setCheckInTime(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (systrayRef.current && !systrayRef.current.contains(event.target as Node)) {
        setIsSystrayOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSystrayCheckIn = async () => {
    if (!user?.employeeId) return;
    try {
      await mockApi.checkIn(user.employeeId);
      setIsCheckedIn(true);
      window.dispatchEvent(new Event('attendance-changed'));
      setIsSystrayOpen(false);
    } catch (e) {
      alert('Failed to Check In');
    }
  };

  const handleSystrayCheckOut = async () => {
    if (!user?.employeeId) return;
    try {
      await mockApi.checkOut(user.employeeId);
      setIsCheckedIn(false);
      window.dispatchEvent(new Event('attendance-changed'));
      setIsSystrayOpen(false);
    } catch (e) {
      alert('Failed to Check Out');
    }
  };

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger, Logo & Workspace Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
          <OdooLogo />
        </div>
        <h2 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight pl-1">HRMS Workspace</h2>
      </div>

      {/* Right side: Systray Check-In/Out, Notifications & Dropdown */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Attendance Check-in Dot Systray (Sketch 2) */}
        {user?.employeeId && (
          <div className="relative" ref={systrayRef}>
            <button
              onClick={() => setIsSystrayOpen(!isSystrayOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer outline-none"
              title={isCheckedIn ? 'Checked In' : 'Checked Out'}
            >
              <span className={`w-3 h-3 rounded-full ${isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                {isCheckedIn ? `Checked In (${checkInTime})` : 'Checked Out'}
              </span>
            </button>

            {/* Systray Dropdown Box */}
            {isSystrayOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-4">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${isCheckedIn ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {isCheckedIn ? 'You are Checked In' : 'You are Checked Out'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {isCheckedIn ? `Checked in since ${checkInTime}` : 'Click below to start your workday.'}
                  </p>
                </div>

                {isCheckedIn ? (
                  <button
                    onClick={handleSystrayCheckOut}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/10"
                  >
                    <Square className="w-3.5 h-3.5" />
                    Check Out
                  </button>
                ) : (
                  <button
                    onClick={handleSystrayCheckIn}
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#714B67] hover:bg-[#5f3e56] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/10"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Check IN
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Header Pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-expanded={isDropdownOpen}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#714B67] text-white font-bold flex items-center justify-center text-sm ring-2 ring-purple-100 shadow-xs">
                {userName.charAt(0)}
              </div>
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${isCheckedIn ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            </div>

            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-slate-800 leading-tight">{userName}</div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span>{userDesignation}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-100">
                  {roleBadgeText}
                </span>
              </div>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180 text-purple-600' : ''
              }`}
            />
          </button>

          {/* Clean User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Profile Header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">{userName}</p>
                <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Role: <strong>{roleBadgeText}</strong></span>
                </div>
              </div>

              {/* Menu Links */}
              <div className="px-2 py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer font-bold"
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
