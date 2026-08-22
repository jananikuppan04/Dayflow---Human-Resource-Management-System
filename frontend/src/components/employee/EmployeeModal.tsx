import React, { useEffect } from 'react';
import type { Employee } from '../../types';
import { X, Mail, Phone, MapPin, Building2, UserCircle } from 'lucide-react';

interface EmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <img 
              src={employee.profilePicture} 
              alt={employee.firstName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover"
            />
            <div className="mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {employee.loginId}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="text-primary-600 font-medium text-lg">{employee.designation}</p>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Contact & Work Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm truncate" title={employee.email}>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-medium text-slate-700 truncate">{employee.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm truncate">
                  <div className="text-xs text-slate-400">Mobile</div>
                  <div className="font-medium text-slate-700">{employee.mobile}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm truncate">
                  <div className="text-xs text-slate-400">Department</div>
                  <div className="font-medium text-slate-700">{employee.department}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm truncate">
                  <div className="text-xs text-slate-400">Manager</div>
                  <div className="font-medium text-slate-700">{employee.manager}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600 sm:col-span-2">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm truncate">
                  <div className="text-xs text-slate-400">Location</div>
                  <div className="font-medium text-slate-700">{employee.location}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
