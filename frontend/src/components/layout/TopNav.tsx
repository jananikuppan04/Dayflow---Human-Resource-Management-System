import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { Users, Calendar, Clock, LogOut, User as UserIcon, LayoutDashboard, ChevronDown } from 'lucide-react';

export const TopNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Employees', path: '/employees', icon: Users, adminOnly: true },
    { name: 'Attendance', path: '/attendance', icon: Calendar, adminOnly: false },
    { name: 'Time Off', path: '/time-off', icon: Clock, adminOnly: false },
  ].filter(item => !item.adminOnly || user?.role === 'admin');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 hidden sm:block">Dayflow</span>
            </div>

            {/* Main Navigation */}
            <div className="hidden sm:ml-12 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `inline-flex items-center px-2 py-5 text-sm font-semibold transition-all border-b-2 ${
                        isActive
                          ? 'border-primary-600 text-primary-600'
                          : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Right side - Avatar & Dropdown */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-6" ref={dropdownRef}>
                <div className="relative">
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0 border-2 border-white"></div>
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 bg-white rounded-full focus:outline-none transition-all group"
                  >
                    <img
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                      src={`https://i.pravatar.cc/150?u=${user.employeeId}`}
                      alt="User avatar"
                    />
                    <div className="hidden md:flex flex-col items-start text-left">
                      <span className="text-sm font-bold text-slate-900 leading-tight">
                        {user.email === 'admin@dayflow.com' ? 'System Admin' : 'User'}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{user.role === 'admin' ? 'HR Admin' : 'Employee'}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors ml-1 hidden md:block" />
                  </button>

                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 bg-white border border-slate-100 focus:outline-none transition-all">
                    <button
                      onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                      className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors mb-1"
                    >
                      <UserIcon className="w-4 h-4 mr-3 text-slate-400" />
                      My Profile
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-500" />
                      Log Out
                    </button>
                  </div>
                )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile menu (simplified) */}
      <div className="sm:hidden border-t border-slate-200">
        <div className="flex flex-row justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 rounded-md text-xs font-medium ${
                    isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-500'
                  }`
                }
              >
                <Icon className="w-5 h-5 mb-1" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
