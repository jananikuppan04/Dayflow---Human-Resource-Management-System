import React from 'react';
import { ClipboardList, RefreshCw } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { AttendanceRecord, Employee } from '../../types';

export interface AttendanceRowData {
  record: AttendanceRecord | null;
  employee?: Employee;
  date?: string;
}

interface AttendanceTableProps {
  viewType: 'admin' | 'employee';
  data: AttendanceRowData[];
  onRowClick?: (row: AttendanceRowData) => void;
  emptyLabel?: string;
}

function formatTime(iso: string | null | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getInitials(emp: Employee) {
  return `${emp.firstName[0]}${emp.lastName[0]}`;
}

const avatarColors = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-rose-500'
];
function getAvatarColor(id: string) {
  let hash = 0;
  for (const c of id) hash = (hash * 31 + c.charCodeAt(0)) % avatarColors.length;
  return avatarColors[hash];
}

// Skeleton loader row
const SkeletonRow = ({ cols }: { cols: number }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-slate-100 rounded animate-pulse" style={{ width: i === 0 ? '80%' : '60%' }} />
      </td>
    ))}
  </tr>
);

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ viewType, data, onRowClick, emptyLabel }) => {
  const isAdmin = viewType === 'admin';

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center py-20 px-6">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-base font-bold text-slate-700 mb-1">No attendance records</h3>
        <p className="text-sm text-slate-400 text-center mb-5">{emptyLabel || 'Attendance records will appear here once employees check in.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {isAdmin && (
                <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">Employee</th>
              )}
              <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5">Date</th>
              <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5">Check In</th>
              <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5">Check Out</th>
              <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5">Work Hrs</th>
              <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5">Extra Hrs</th>
              <th className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => {
              const rec = row.record;
              const emp = row.employee;
              const dateStr = rec?.date || row.date || '';

              return (
                <tr
                  key={rec?.id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors duration-100 ${onRowClick ? 'cursor-pointer hover:bg-blue-50/50 group' : ''}`}
                >
                  {isAdmin && emp && (
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          {emp.profilePicture ? (
                            <img
                              src={emp.profilePicture}
                              alt={emp.firstName}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-100 shadow-sm"
                              onError={(e) => {
                                const el = e.target as HTMLImageElement;
                                el.style.display = 'none';
                                (el.nextSibling as HTMLElement)?.style && ((el.nextSibling as HTMLElement).style.display = 'flex');
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-9 h-9 rounded-xl ${getAvatarColor(emp.id)} text-white flex items-center justify-center text-xs font-bold`}
                            style={{ display: emp.profilePicture ? 'none' : 'flex' }}
                          >
                            {getInitials(emp)}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                            {emp.firstName} {emp.lastName}
                          </p>
                          <p className="text-xs text-slate-400">{emp.loginId} · {emp.department}</p>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-3.5">
                    <span className="text-sm text-slate-600 font-medium">{dateStr ? formatDate(dateStr) : '—'}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-semibold ${rec?.checkIn ? 'text-emerald-700' : 'text-slate-300'}`}>
                      {formatTime(rec?.checkIn)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-semibold ${rec?.checkOut ? 'text-slate-700' : 'text-slate-300'}`}>
                      {formatTime(rec?.checkOut)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-semibold text-slate-700">{rec?.workHours || '—'}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-medium ${rec?.extraHours && rec.extraHours !== '0h 00m' && rec.extraHours !== '00h 00m' ? 'text-violet-600' : 'text-slate-300'}`}>
                      {rec?.extraHours || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {rec ? <StatusBadge status={rec.status} /> : <span className="text-slate-300 text-sm">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
