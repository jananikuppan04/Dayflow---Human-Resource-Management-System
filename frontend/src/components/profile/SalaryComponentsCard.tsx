import React from 'react';
import type { SalaryStructure } from '../../types/salaryTypes';

interface SalaryComponentsCardProps {
  salary: SalaryStructure;
}

export const SalaryComponentsCard: React.FC<SalaryComponentsCardProps> = ({ salary }) => {
  const formatAmount = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-4 tracking-tight">Salary Components</h3>

        {/* Itemized component list */}
        <div className="divide-y divide-slate-100">
          {salary.components.map((comp) => {
            if (!comp.enabled) return null;
            return (
              <div key={comp.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <span>{comp.name}</span>
                    {comp.percentageOfWage > 0 && (
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {comp.percentageOfWage}% of wage
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 max-w-md">{comp.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-bold text-slate-900">₹ {formatAmount(comp.amount)}</span>
                  <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Gross Salary Banner matching Dayflow design reference */}
      <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100/80 flex items-center justify-between">
        <span className="text-sm font-bold text-blue-900">Total Gross Salary</span>
        <div className="text-right">
          <span className="text-lg font-bold text-blue-600">₹ {formatAmount(salary.grossSalary)}</span>
          <span className="text-xs font-semibold text-blue-600/80 ml-1">/ month</span>
        </div>
      </div>
    </div>
  );
};
