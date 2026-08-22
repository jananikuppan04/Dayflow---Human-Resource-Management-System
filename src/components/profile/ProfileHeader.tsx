import React from 'react';
import { Camera, Lock, Mail, Phone, Building, Briefcase, UserCheck, MapPin } from 'lucide-react';
import { EmployeeProfile } from '../../types/salaryTypes';

interface ProfileHeaderProps {
  employee: EmployeeProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ employee }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs transition-shadow hover:shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Avatar & Basic Information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with Edit Camera Badge */}
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-200 via-pink-100 to-indigo-100 border-2 border-white shadow-md flex items-center justify-center text-slate-800 font-bold text-2xl tracking-wider">
              JD
            </div>
            <button
              className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-slate-200 text-slate-600 hover:text-[#714B67] transition-colors"
              title="Change Profile Picture"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Identity details */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{employee.name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#714B67] border border-purple-100">
                {employee.designation}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.employeeId}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${employee.email}`} className="hover:text-[#714B67] transition-colors">
                  {employee.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Organizational Context Metadata */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-xs pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block font-normal">Company</span>
              <span className="font-semibold text-slate-700">{employee.company}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block font-normal">Department</span>
              <span className="font-semibold text-slate-700">{employee.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block font-normal">Manager</span>
              <span className="font-semibold text-slate-700">{employee.manager}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-slate-400 block font-normal">Location</span>
              <span className="font-semibold text-slate-700">{employee.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
