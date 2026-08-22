import React from 'react';
import type { EmployeeProfile } from '../../types/salaryTypes';

interface AdditionalInfoCardProps {
  employee: EmployeeProfile;
}

export const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({ employee }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <h3 className="text-sm font-semibold text-slate-800 mb-4 tracking-tight">Additional Information</h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Pay Grade</span>
          <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {employee.payGrade}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Employee Type</span>
          <span className="font-semibold text-slate-700">{employee.employmentType}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Effective From</span>
          <span className="font-semibold text-slate-700">{employee.effectiveFrom}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400 font-medium">Last Updated</span>
          <span className="font-semibold text-slate-700">{employee.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};
