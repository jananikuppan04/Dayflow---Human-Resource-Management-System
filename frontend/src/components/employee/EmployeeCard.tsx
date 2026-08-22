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
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center cursor-pointer transition-all hover:shadow-md hover:border-primary-200 group relative"
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        {status === 'loading' && (
          <div className="w-3 h-3 rounded-full bg-slate-200 animate-pulse" />
        )}
        {status === 'present' && (
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" title="Present" />
        )}
        {status === 'absent' && (
          <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" title="Absent" />
        )}
        {status === 'leave' && (
          <Plane className="w-3.5 h-3.5" fill="currentColor" />
        )}
      </div>

      {/* Avatar */}
      <div className="relative mb-4">
        <img 
          src={employee.profilePicture} 
          alt={`${employee.firstName} ${employee.lastName}`} 
          className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm group-hover:border-primary-100 transition-colors"
        />
      </div>

      {/* Info */}
      <div className="text-center w-full">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">
          {employee.firstName} {employee.lastName}
        </h3>
        <p className="text-sm text-slate-500 font-medium mt-1">{employee.designation}</p>
        
        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-400">
          <Building2 className="w-3 h-3" />
          <span>{employee.department}</span>
        </div>

        <div className="mt-4 inline-flex items-center justify-center px-3 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-semibold tracking-wide border border-slate-100">
          {employee.loginId}
        </div>
      </div>
    </div>
  );
};
