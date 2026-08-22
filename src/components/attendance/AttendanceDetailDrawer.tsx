import React from 'react';
import { X, LogIn, LogOut, Clock, Timer, User, Briefcase, Hash, MapPin, Edit2, History } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { AttendanceRecord, Employee } from '../../types';

interface AttendanceDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
  employee: Employee | null;
  onEdit: () => void;
}

function formatTime(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

export const AttendanceDetailDrawer: React.FC<AttendanceDetailDrawerProps> = ({
  open, onClose, record, employee, onEdit
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Attendance Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {record && employee ? (
          <div className="flex-1 overflow-y-auto">
            {/* Employee Profile */}
            <div className="px-6 py-5 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={employee.profilePicture}
                    alt={employee.firstName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                    <StatusBadge status={record.status} size="sm" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{employee.firstName} {employee.lastName}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <Hash className="w-3 h-3" />{employee.loginId}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Briefcase className="w-3 h-3" />{employee.designation}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3 h-3" />{employee.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Info */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Date</p>
                <p className="text-sm font-semibold text-slate-800">{formatDate(record.date)}</p>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Check In</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{formatTime(record.checkIn)}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3.5 border border-red-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[11px] font-bold text-red-500 uppercase tracking-wide">Check Out</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{formatTime(record.checkOut)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">Work Hours</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{record.workHours || '—'}</p>
                </div>
                <div className="bg-violet-50 rounded-xl p-3.5 border border-violet-100">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Timer className="w-3.5 h-3.5 text-violet-600" />
                    <span className="text-[11px] font-bold text-violet-600 uppercase tracking-wide">Extra Hrs</span>
                  </div>
                  <p className="text-lg font-bold text-slate-800">{record.extraHours || '0h 00m'}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status</p>
                <StatusBadge status={record.status} />
              </div>

              {record.remarks && (
                <>
                  <div className="h-px bg-slate-100" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Remarks</p>
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">{record.remarks}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <User className="w-8 h-8" />
          </div>
        )}

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <Edit2 className="w-4 h-4" />
            Edit Attendance
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 text-slate-600 font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-slate-100 transition-all border border-slate-200"
          >
            <History className="w-4 h-4" />
            Close
          </button>
        </div>
      </div>
    </>
  );
};
