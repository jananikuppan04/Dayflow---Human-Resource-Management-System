import React from 'react';
import { Info } from 'lucide-react';

interface TakeHomeSalaryCardProps {
  takeHomeSalary: number;
}

export const TakeHomeSalaryCard: React.FC<TakeHomeSalaryCardProps> = ({ takeHomeSalary }) => {
  const formatAmount = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <h3 className="text-sm font-semibold text-slate-800 mb-1 tracking-tight">Take Home Salary</h3>
      <span className="text-xs text-slate-400 font-medium block mb-4">Net Pay (After Deductions)</span>

      <div className="flex items-baseline gap-1.5 mb-4">
        <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">
          ₹ {formatAmount(takeHomeSalary)}
        </span>
        <span className="text-xs font-semibold text-slate-400">/ month</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <span>This is your estimated take home salary after all deductions</span>
      </div>
    </div>
  );
};
