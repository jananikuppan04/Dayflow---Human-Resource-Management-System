import React from 'react';
import { useAuth } from '../store/AuthContext';
import { AttendanceWidget } from '../components/attendance/AttendanceWidget';
import { Calendar, Clock, FileText, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmployeeDashboard = () => {
  const { user } = useAuth();

  const quickLinks = [
    { name: 'My Profile', icon: UserIcon, path: '/profile', color: 'bg-blue-100 text-blue-600' },
    { name: 'Attendance History', icon: Calendar, path: '/attendance', color: 'bg-purple-100 text-purple-600' },
    { name: 'Request Time Off', icon: Clock, path: '/time-off', color: 'bg-orange-100 text-orange-600' },
    { name: 'Company Policies', icon: FileText, path: '/dashboard', color: 'bg-green-100 text-green-600' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Dayflow</h1>
          <p className="text-slate-500">Here's an overview of your activities and quick actions.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col items-center text-center gap-3 group"
                >
                  <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-slate-700">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Announcements Placeholder */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Company Announcements</h2>
            <span className="text-xs font-medium bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full">New</span>
          </div>
          <div className="p-6">
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-slate-900">Upcoming Public Holiday</h4>
                <p className="text-sm text-slate-500 mt-1">Please note that the office will be closed next Monday. Ensure all timesheets are submitted by Friday.</p>
                <span className="text-xs text-slate-400 mt-2 block">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Attendance Widget */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <AttendanceWidget />
      </div>
    </div>
  );
};
