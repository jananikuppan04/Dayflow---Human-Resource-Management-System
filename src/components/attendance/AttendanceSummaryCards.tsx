import React from 'react';
import { Users, UserX, Calendar, AlarmClock, Briefcase, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';

interface AdminSummaryCardsProps {
  present: number;
  absent: number;
  leave: number;
  late: number;
  total: number;
}

interface EmployeeSummaryCardsProps {
  workingDays: number;
  present: number;
  leaves: number;
  totalWorkingHours: string;
}

const GradientCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  gradBg: string;
  badge?: string;
  badgeColor?: string;
}> = ({ icon: Icon, label, value, sub, iconBg, iconColor, borderColor, gradBg, badge, badgeColor }) => (
  <div className={`relative bg-white rounded-2xl border ${borderColor} p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group`}>
    {/* Subtle gradient background */}
    <div className={`absolute inset-0 ${gradBg} opacity-40 group-hover:opacity-60 transition-opacity duration-200`} />
    <div className="relative">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {badge && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
        )}
      </div>
      <div className="text-3xl font-bold text-slate-900 tracking-tight leading-none mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
    </div>
  </div>
);

export const AdminSummaryCards: React.FC<AdminSummaryCardsProps> = ({ present, absent, leave, late, total }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <GradientCard
      icon={CheckCircle2}
      label="Present Today"
      value={present}
      sub={`Out of ${total} employees`}
      iconBg="bg-emerald-100"
      iconColor="text-emerald-600"
      borderColor="border-emerald-100"
      gradBg="bg-gradient-to-br from-emerald-50 to-transparent"
      badge="● Live"
      badgeColor="bg-emerald-100 text-emerald-600"
    />
    <GradientCard
      icon={UserX}
      label="Absent Today"
      value={absent}
      sub="No check-in recorded"
      iconBg="bg-red-100"
      iconColor="text-red-600"
      borderColor="border-red-100"
      gradBg="bg-gradient-to-br from-red-50 to-transparent"
    />
    <GradientCard
      icon={Calendar}
      label="On Leave"
      value={leave}
      sub="Approved leave"
      iconBg="bg-blue-100"
      iconColor="text-blue-600"
      borderColor="border-blue-100"
      gradBg="bg-gradient-to-br from-blue-50 to-transparent"
    />
    <GradientCard
      icon={AlarmClock}
      label="Late Arrivals"
      value={late}
      sub="Arrived after 10:30 AM"
      iconBg="bg-amber-100"
      iconColor="text-amber-600"
      borderColor="border-amber-100"
      gradBg="bg-gradient-to-br from-amber-50 to-transparent"
    />
  </div>
);

export const EmployeeSummaryCards: React.FC<EmployeeSummaryCardsProps> = ({ workingDays, present, leaves, totalWorkingHours }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <GradientCard
      icon={Briefcase}
      label="Working Days"
      value={workingDays}
      sub="This month"
      iconBg="bg-violet-100"
      iconColor="text-violet-600"
      borderColor="border-violet-100"
      gradBg="bg-gradient-to-br from-violet-50 to-transparent"
    />
    <GradientCard
      icon={Users}
      label="Present"
      value={present}
      sub="Days present"
      iconBg="bg-emerald-100"
      iconColor="text-emerald-600"
      borderColor="border-emerald-100"
      gradBg="bg-gradient-to-br from-emerald-50 to-transparent"
    />
    <GradientCard
      icon={Calendar}
      label="Leave"
      value={leaves}
      sub="Approved leave"
      iconBg="bg-blue-100"
      iconColor="text-blue-600"
      borderColor="border-blue-100"
      gradBg="bg-gradient-to-br from-blue-50 to-transparent"
    />
    <GradientCard
      icon={Clock}
      label="Total Hours"
      value={totalWorkingHours}
      sub="This month"
      iconBg="bg-amber-100"
      iconColor="text-amber-600"
      borderColor="border-amber-100"
      gradBg="bg-gradient-to-br from-amber-50 to-transparent"
    />
  </div>
);
