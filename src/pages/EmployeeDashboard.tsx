import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { AttendanceWidget } from '../components/attendance/AttendanceWidget';
import { Calendar, Clock, FileText, User as UserIcon, Users, CheckCircle2, AlertCircle, ArrowUpRight, Wallet, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../types/salaryTypes';

interface EmployeeDashboardProps {
  currentRole?: UserRole;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ currentRole = 'ADMIN' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'My Profile', icon: UserIcon, path: '/profile', color: 'bg-blue-100 text-blue-600' },
    { name: 'Attendance History', icon: Calendar, path: '/attendance', color: 'bg-purple-100 text-purple-600' },
    { name: 'Request Time Off', icon: Clock, path: '/time-off', color: 'bg-amber-100 text-amber-600' },
    { name: 'Salary & Payslips', icon: Wallet, path: '/payroll', color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Greeting Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
            <span className="px-3 py-1 rounded-full bg-[#714B67]/20 text-[#c7a9c1] text-xs font-bold uppercase tracking-wider border border-purple-400/20">
            {currentRole === 'ADMIN' ? 'HR Administrator Workspace' : 'Employee Portal'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Welcome back, Janani Devi! 👋
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {currentRole === 'ADMIN'
              ? "Here's an overview of today's attendance, workforce activity, and pending approvals."
              : "Here's a quick summary of your profile, attendance history, and time-off requests."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentRole !== 'ADMIN' && (
            <button
              onClick={() => navigate('/time-off')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              Apply for Leave
            </button>
          )}
          <button
            onClick={() => navigate('/profile')}
            className="bg-[#714B67] hover:bg-[#5f3e56] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            View My Profile
          </button>
        </div>
      </div>

      {/* Admin Quick Metrics (Only visible in ADMIN mode) */}
      {currentRole === 'ADMIN' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Workforce</span>
              <span className="text-2xl font-extrabold text-slate-800">42</span>
              <span className="text-[11px] text-slate-400 block mt-1">Active Employees</span>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-[#714B67] rounded-2xl flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Today's Attendance</span>
              <span className="text-2xl font-extrabold text-emerald-600">96%</span>
              <span className="text-[11px] text-slate-400 block mt-1">38 Checked-In</span>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div
            onClick={() => navigate('/time-off')}
            className="bg-white rounded-2xl border border-amber-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-amber-300 transition-colors"
          >
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">Pending Approvals</span>
              <span className="text-2xl font-extrabold text-amber-600">2</span>
              <span className="text-[11px] font-bold text-amber-600 block mt-1">Leave Requests</span>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div
            onClick={() => navigate('/payroll')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors"
          >
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Monthly Payroll</span>
              <span className="text-2xl font-extrabold text-slate-800">₹23.5 L</span>
              <span className="text-[11px] text-slate-400 block mt-1">August Status: Active</span>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Main Content */}
        <div className="flex-1 space-y-8">
          {/* Quick Links Section */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center gap-3 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-700 text-xs">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Company Announcements & Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 text-sm">Company Announcements</h2>
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">New Update</span>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="flex gap-4">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Upcoming Public Holiday — Labor Day</h4>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    Please note that the office will remain closed next Monday. Ensure all pending timesheets and leave applications are submitted by Friday evening.
                  </p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-medium">Posted 2 hours ago by HR Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Attendance Widget */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <AttendanceWidget />
        </div>
      </div>
    </div>
  );
};
