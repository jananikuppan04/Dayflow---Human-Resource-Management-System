import React from 'react';
import { Calendar, CreditCard } from 'lucide-react';
import { SalaryStructure } from '../../types/salaryTypes';

interface SalaryOverviewCardProps {
  salary: SalaryStructure;
}

export const SalaryOverviewCard: React.FC<SalaryOverviewCardProps> = ({ salary }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <h3 className="text-sm font-semibold text-slate-800 mb-4 tracking-tight">Salary Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-slate-100">
        {/* Monthly Wage */}
        <div className="md:pr-6">
          <span className="text-xs text-slate-500 font-medium block mb-1">Monthly Wage</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">₹ {formatCurrency(salary.monthlyWage)}</span>
            <span className="text-xs text-slate-400 font-medium">/ month</span>
          </div>
        </div>

        {/* Yearly Wage */}
        <div className="md:px-6">
          <span className="text-xs text-slate-500 font-medium block mb-1">Yearly Wage</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900">₹ {formatCurrency(salary.yearlyWage)}</span>
            <span className="text-xs text-slate-400 font-medium">/ year</span>
          </div>
        </div>

        {/* Next Payout */}
        <div className="md:px-6">
          <span className="text-xs text-slate-500 font-medium block mb-1">Next Payout</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-800">{salary.nextPayoutDate}</div>
              <span className="text-[11px] text-slate-400 block font-medium">Monthly</span>
            </div>
          </div>
        </div>

        {/* Payment Mode */}
        <div className="md:pl-6">
          <span className="text-xs text-slate-500 font-medium block mb-1">Payment Mode</span>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-800">{salary.paymentMode}</div>
              <span className="text-[11px] text-slate-400 block font-medium">{salary.bankName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
