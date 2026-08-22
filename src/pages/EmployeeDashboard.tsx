import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { AttendanceWidget } from '../components/attendance/AttendanceWidget';
import { mockApi } from '../services/mockApi';
import type { Employee } from '../types';
import {
  Calendar,
  Clock,
  User as UserIcon,
  Users,
  CheckCircle2,
  Wallet,
  ArrowRight,
  UserCheck,
  Shield,
  Building2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../types/salaryTypes';

interface EmployeeDashboardProps {
  currentRole?: UserRole;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ currentRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  // Determine effective role
  const isAdmin = user?.role === 'admin' || currentRole === 'ADMIN';
  const role: UserRole = isAdmin ? 'ADMIN' : 'EMPLOYEE';

  useEffect(() => {
    if (isAdmin) {
      loadEmployees();
    }
  }, [isAdmin]);

  const loadEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const emps = await mockApi.getEmployees();
      setEmployees(emps);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const adminQuickLinks = [
    { name: 'Employee Directory', icon: Users, path: '/employees', color: 'bg-purple-100 text-[#714B67]' },
    { name: 'Attendance Logs', icon: Clock, path: '/attendance', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Leave Approvals', icon: Calendar, path: '/time-off', color: 'bg-amber-100 text-amber-600' },
    { name: 'Payroll & Salary', icon: Wallet, path: '/payroll', color: 'bg-blue-100 text-blue-600' },
  ];

  const employeeQuickLinks = [
    { name: 'My Profile', icon: UserIcon, path: '/profile', color: 'bg-blue-100 text-blue-600' },
    { name: 'Attendance History', icon: Calendar, path: '/attendance', color: 'bg-purple-100 text-purple-600' },
    { name: 'Request Time Off', icon: Clock, path: '/time-off', color: 'bg-amber-100 text-amber-600' },
    { name: 'Salary & Payslips', icon: Wallet, path: '/payroll', color: 'bg-emerald-100 text-emerald-600' },
  ];

  const quickLinks = isAdmin ? adminQuickLinks : employeeQuickLinks;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Greeting Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#714B67]/30 text-[#c7a9c1] text-xs font-bold uppercase tracking-wider border border-purple-400/20 inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {isAdmin ? 'HR Administrator Workspace' : 'Employee Portal'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Welcome back, {isAdmin ? 'System Admin' : 'Janani Devi'}! 👋
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {isAdmin
              ? "Here's an overview of workforce activity, attendance, pending leave approvals, and employee records."
              : "Here's a quick summary of your profile, attendance history, and time-off balance."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <button
              onClick={() => navigate('/employees')}
              className="bg-[#714B67] hover:bg-[#5f3e56] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Manage Employee Details
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/time-off')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-white/20 transition-all cursor-pointer"
              >
                Apply for Leave
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="bg-[#714B67] hover:bg-[#5f3e56] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                View My Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Admin Quick Metrics Cards */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => navigate('/employees')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-purple-300 transition-colors"
          >
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Workforce</span>
              <span className="text-2xl font-extrabold text-slate-800">{employees.length || 5}</span>
              <span className="text-[11px] text-purple-600 font-semibold block mt-1">Maintain Employee Details →</span>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-[#714B67] rounded-2xl flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div
            onClick={() => navigate('/attendance')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors"
          >
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
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
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
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col items-center text-center gap-3 group cursor-pointer"
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

          {/* ADMIN ROLE ONLY: Workforce Maintenance & Other Employee Details Section */}
          {isAdmin && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#714B67]" />
                    Employee Workforce Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Maintain profile details, designations, and departments for all personnel.</p>
                </div>
                <button
                  onClick={() => navigate('/employees')}
                  className="text-xs font-bold text-[#714B67] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Employees
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {employees.slice(0, 4).map((emp) => (
                  <div key={emp.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.profilePicture || 'https://i.pravatar.cc/150'}
                        alt={`${emp.firstName} ${emp.lastName}`}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {emp.firstName} {emp.lastName}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {emp.loginId || emp.id}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            {emp.department}
                          </span>
                          <span>•</span>
                          <span>{emp.designation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-xs text-slate-500 hidden md:inline">{emp.email}</span>
                      <button
                        onClick={() => navigate('/employees')}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-[#714B67] hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
                      >
                        Maintain Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMPLOYEE ROLE ONLY: My Leave Balance Summary */}
          {!isAdmin && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  My Time Off Balances
                </h2>
                <button
                  onClick={() => navigate('/time-off')}
                  className="text-xs font-bold text-[#714B67] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View Time Off Log →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <span className="font-bold text-purple-900 block">Paid Leave</span>
                  <span className="text-2xl font-black text-purple-700 mt-1 block">12 Days</span>
                  <span className="text-purple-600 text-[11px] block mt-0.5">Remaining this year</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <span className="font-bold text-amber-900 block">Casual Leave</span>
                  <span className="text-2xl font-black text-amber-700 mt-1 block">5 Days</span>
                  <span className="text-amber-600 text-[11px] block mt-0.5">Remaining this year</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="font-bold text-emerald-900 block">Sick Leave</span>
                  <span className="text-2xl font-black text-emerald-700 mt-1 block">7 Days</span>
                  <span className="text-emerald-600 text-[11px] block mt-0.5">Remaining this year</span>
                </div>
              </div>
            </div>
          )}

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
