import React from 'react';
import { DeductionsConfig } from '../../types/salaryTypes';

interface DeductionsCardProps {
  deductions: DeductionsConfig;
}

export const DeductionsCard: React.FC<DeductionsCardProps> = ({ deductions }) => {
  const formatAmount = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-4 tracking-tight">Deductions</h3>

        <div className="space-y-3.5">
          {/* Provident Fund */}
          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-slate-600 font-medium">Provident Fund (PF)</span>
            <div>
              <span className="font-bold text-slate-800">₹ {formatAmount(deductions.pfEmployeeAmount)}</span>
              <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
            </div>
          </div>

          {/* Professional Tax */}
          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-slate-600 font-medium">Professional Tax</span>
            <div>
              <span className="font-bold text-slate-800">₹ {formatAmount(deductions.professionalTax)}</span>
              <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
            </div>
          </div>

          {/* Income Tax (TDS) */}
          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-slate-600 font-medium">Income Tax (TDS)</span>
            <div>
              <span className="font-bold text-slate-800">₹ {formatAmount(deductions.incomeTaxTds)}</span>
              <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Deductions Banner matching Dayflow reference */}
      <div className="mt-6 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100/80 flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-900">Total Deductions</span>
        <div>
          <span className="text-base font-bold text-blue-600">₹ {formatAmount(deductions.totalDeductions)}</span>
          <span className="text-xs font-semibold text-blue-600/80 ml-1">/ month</span>
        </div>
      </div>
    </div>
  );
};
