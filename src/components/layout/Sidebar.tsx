import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  User,
  Users,
  Clock,
  Calendar,
  Wallet,
  FileBarChart,
  Settings,
  ChevronDown,
  ChevronUp,
  Layers,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'My Profile',
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close popup menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsUserMenuOpen(false);
    onCloseMobile?.();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  const allNavItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'My Profile', label: 'My Profile', icon: User },
    { id: 'Employees', label: 'Employees', icon: Users, adminOnly: true },
    { id: 'Attendance', label: 'Attendance', icon: Clock },
    { id: 'Time Off', label: 'Time Off', icon: Calendar },
    { id: 'Payroll', label: 'Payroll', icon: Wallet },
    { id: 'Reports', label: 'Reports', icon: FileBarChart },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  const navItems = allNavItems.filter((item) => !item.adminOnly || isAdmin);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 w-64 border-r border-slate-800 select-none relative">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-[#714B67] flex items-center justify-center shadow-lg shadow-purple-900/40 text-white font-bold">
          <span className="text-sm font-black tracking-tighter">odoo</span>
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight leading-none">Dayflow</h1>
          <span className="text-xs text-slate-400 font-medium">HRM System</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate?.(item.id);
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#714B67] text-white shadow-md shadow-purple-950/50 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Sidebar Feature/Illustration Widget */}
      <div className="px-4 py-4 m-4 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#714B67]/10 flex items-center justify-center text-[#714B67]">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Payroll Cycle</h4>
            <p className="text-[11px] text-slate-400">Aug 2026 Payout active</p>
          </div>
        </div>
        <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden mt-2">
          <div className="bg-[#714B67] h-full rounded-full w-3/4"></div>
        </div>
      </div>

      {/* User Footer Profile Card with Sign Out Popup Menu */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#714B67] text-white font-semibold flex items-center justify-center text-sm shadow-sm ring-2 ring-purple-500/30">
              {isAdmin ? 'SA' : 'JD'}
            </div>
            <div className="overflow-hidden text-left">
              <div className="text-sm font-semibold text-white truncate">
                {isAdmin ? 'System Admin' : 'Janani Devi'}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {isAdmin ? 'HR Administrator' : 'Software Engineer'}
              </div>
            </div>
          </div>
          {isUserMenuOpen ? (
            <ChevronUp className="w-4 h-4 text-purple-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* User Popup Menu with Sign Out Option */}
        {isUserMenuOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-2 text-xs space-y-1 animate-in zoom-in-95 duration-150 z-50">
            <div className="px-3 py-2 border-b border-slate-700/80">
              <span className="font-bold text-white block truncate">
                {isAdmin ? 'System Admin' : 'Janani Devi'}
              </span>
              <span className="text-[11px] text-slate-400 block truncate">
                {user?.email || (isAdmin ? 'admin@dayflow.com' : 'john.doe@example.com')}
              </span>
            </div>

            <button
              onClick={() => {
                onNavigate?.('My Profile');
                setIsUserMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-700/70 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                onNavigate?.('Settings');
                setIsUserMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-700/70 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>

            <div className="border-t border-slate-700/80 my-1" />

            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors flex items-center gap-2 font-bold cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
