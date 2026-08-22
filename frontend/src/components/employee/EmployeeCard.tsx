import React from 'react';
import type { Employee } from '../../types';
import { Building2, Plane } from 'lucide-react';
import { clsx } from 'clsx';

interface EmployeeCardProps {
  employee: Employee;
  status: 'present' | 'leave' | 'absent' | 'loading';
  onClick: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, status, onClick }) => {
  return (
    <div 
      onClick={() => onClick(employee)}
      className="bg-white rounded-[24px] shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-8 flex flex-col items-center cursor-pointer transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 relative group"
    >
      {/* Status Indicator */}
      <div className="absolute top-5 right-5">
        {status === 'loading' && (
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200 animate-pulse border-2 border-white shadow-sm" />
        )}
        {status === 'present' && (
          <div className="w-4 h-4 rounded-full bg-[#00c853] border-2 border-white shadow-sm" title="Present" />
        )}
        {status === 'absent' && (
          <div className="w-4 h-4 rounded-full bg-[#ffb300] border-2 border-white shadow-sm" title="Absent" />
        )}
        {status === 'leave' && (
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-sm flex items-center justify-center" title="On Leave">
            <Plane className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="relative mb-5">
        <img 
          src={employee.profilePicture} 
          alt={`${employee.firstName} ${employee.lastName}`} 
          className="w-24 h-24 rounded-full object-cover bg-slate-50"
        />
      </div>

      {/* Info */}
      <div className="text-center w-full">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className={`text-sm font-medium ${employee.designation.includes('Admin') ? 'text-primary-600' : 'text-slate-500'}`}>
          {employee.designation}
        </p>
        
        <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-400 font-medium">
          <Building2 className="w-3.5 h-3.5" />
          <span>{employee.department}</span>
        </div>

        <div className="mt-5 inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold tracking-wide">
          {employee.loginId}
        </div>
      </div>
    </div>
  );
};
