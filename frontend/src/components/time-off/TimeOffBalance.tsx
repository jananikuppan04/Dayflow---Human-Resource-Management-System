import React from 'react';
import type { LeaveBalance } from '../../types';
import { Calendar, Briefcase, Plane } from 'lucide-react';

interface TimeOffBalanceProps {
  balance: LeaveBalance;
}

export const TimeOffBalance: React.FC<TimeOffBalanceProps> = ({ balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Paid Time Off */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-slate-600 mb-0.5">Paid Time Off</h3>
          <div className="text-2xl font-bold text-slate-900 leading-none tracking-tight">
            {balance.paidAvailable} <span className="text-[13px] font-medium text-slate-500 ml-1">Days Available</span>
          </div>
        </div>
      </div>

      {/* Sick Leave */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-slate-600 mb-0.5">Sick Leave</h3>
          <div className="text-2xl font-bold text-slate-900 leading-none tracking-tight">
            {balance.sickAvailable} <span className="text-[13px] font-medium text-slate-500 ml-1">Days Available</span>
          </div>
        </div>
      </div>

      {/* Unpaid Leave */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center flex-shrink-0">
          <Plane className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-slate-600 mb-0.5">Unpaid Leave</h3>
          <div className="text-2xl font-bold text-slate-900 leading-none tracking-tight">
            {balance.unpaidAvailable} <span className="text-[13px] font-medium text-slate-500 ml-1">Days Used</span>
          </div>
        </div>
      </div>
    </div>
  );
};
