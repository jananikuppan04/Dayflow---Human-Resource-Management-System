import React from 'react';
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
  Layers,
} from 'lucide-react';

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
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'My Profile', label: 'My Profile', icon: User },
    { id: 'Employees', label: 'Employees', icon: Users },
    { id: 'Attendance', label: 'Attendance', icon: Clock },
    { id: 'Time Off', label: 'Time Off', icon: Calendar },
    { id: 'Payroll', label: 'Payroll', icon: Wallet },
    { id: 'Reports', label: 'Reports', icon: FileBarChart },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 w-64 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold">
          <Layers className="w-5 h-5" />
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Payroll Cycle</h4>
            <p className="text-[11px] text-slate-400">Aug 2026 Payout active</p>
          </div>
        </div>
        <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden mt-2">
          <div className="bg-blue-500 h-full rounded-full w-3/4"></div>
        </div>
      </div>

      {/* User Footer Profile Card */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
            JD
          </div>
          <div className="overflow-hidden text-left">
            <div className="text-sm font-medium text-white truncate">Janani Devi</div>
            <div className="text-xs text-slate-400 truncate">Software Engineer</div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400" />
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
