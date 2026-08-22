import React from 'react';
import { CalendarDays, Briefcase, BarChart2 } from 'lucide-react';

interface SummaryCardsProps {
  present: number;
  leaves: number;
  totalWorkingDays: number;
}

export const AttendanceSummaryCards: React.FC<SummaryCardsProps> = ({ present, leaves, totalWorkingDays }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Days Present Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <CalendarDays className="w-7 h-7 text-blue-500" />
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900">{present}</div>
          <div className="text-sm font-medium text-blue-600 mt-1">Days Present</div>
        </div>
      </div>

      {/* Leaves Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-7 h-7 text-purple-500" />
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900">{leaves}</div>
          <div className="text-sm font-medium text-purple-600 mt-1">Leaves</div>
        </div>
      </div>

      {/* Total Working Days Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
          <BarChart2 className="w-7 h-7 text-green-500" />
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900">{totalWorkingDays}</div>
          <div className="text-sm font-medium text-green-600 mt-1">Total Working Days</div>
        </div>
      </div>
    </div>
  );
};
