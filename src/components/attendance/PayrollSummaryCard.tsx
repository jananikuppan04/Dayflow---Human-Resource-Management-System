import React from 'react';
import { Wallet, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PayrollSummaryCardProps {
  totalWorkingDays: number;
  presentDays: number;
  paidLeave: number;
  unpaidLeave: number;
  missingAttendance: number;
}

export const PayrollSummaryCard: React.FC<PayrollSummaryCardProps> = ({
  totalWorkingDays,
  presentDays,
  paidLeave,
  unpaidLeave,
  missingAttendance,
}) => {
  const payableDays = presentDays + paidLeave;
  const hasMissing = missingAttendance > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-1">
        <Wallet className="w-4 h-4 text-indigo-600" />
        <h3 className="text-sm font-bold text-slate-800">Attendance → Payroll</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">Attendance records contribute to payroll calculation.</p>

      {hasMissing && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 font-medium">⚠ Missing attendance may reduce payable days.</p>
        </div>
      )}

      <div className="space-y-2.5">
        {[
          { label: 'Total Working Days', value: totalWorkingDays, color: 'text-slate-700' },
          { label: 'Present Days', value: presentDays, color: 'text-emerald-700' },
          { label: 'Paid Leave', value: paidLeave, color: 'text-blue-700' },
          { label: 'Unpaid Leave', value: unpaidLeave, color: 'text-orange-600' },
          { label: 'Missing Attendance', value: missingAttendance, color: hasMissing ? 'text-red-600' : 'text-slate-400' },
        ].map(row => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-xs text-slate-500">{row.label}</span>
            <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
          </div>
        ))}

        <div className="h-px bg-slate-100 my-1" />

        <div className="flex items-center justify-between bg-indigo-50 rounded-xl px-3 py-2.5 border border-indigo-100">
          <span className="text-xs font-bold text-indigo-700">Payable Days</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-base font-extrabold text-indigo-700">{payableDays}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
