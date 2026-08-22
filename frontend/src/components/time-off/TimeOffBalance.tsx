import React from 'react';
import type { LeaveBalance } from '../../types';
import { Calendar, Briefcase, Plane } from 'lucide-react';

interface TimeOffBalanceProps {
  balance: LeaveBalance;
}

export const TimeOffBalance: React.FC<TimeOffBalanceProps> = ({ balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Paid Time Off */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Paid Time Off</h3>
          <div className="text-3xl font-bold text-slate-900 leading-none">
            {balance.paidAvailable} <span className="text-sm font-medium text-slate-400 normal-case tracking-normal">Days Available</span>
          </div>
        </div>
      </div>

      {/* Sick Leave */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Sick Leave</h3>
          <div className="text-3xl font-bold text-slate-900 leading-none">
            {balance.sickAvailable} <span className="text-sm font-medium text-slate-400 normal-case tracking-normal">Days Available</span>
          </div>
        </div>
      </div>

      {/* Unpaid Leave */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
          <Plane className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Unpaid Leave</h3>
          <div className="text-3xl font-bold text-slate-900 leading-none">
            {balance.unpaidAvailable} <span className="text-sm font-medium text-slate-400 normal-case tracking-normal">Days Used</span>
          </div>
        </div>
      </div>
    </div>
  );
};
