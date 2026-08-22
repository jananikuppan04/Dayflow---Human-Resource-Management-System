import React from 'react';
import type { AttendanceRecord, Employee } from '../../types';

export type TableViewType = 'admin' | 'employee';

export interface AttendanceRowData {
  record: AttendanceRecord | null;
  employee?: Employee; // Only used in admin view
  date?: string;       // Only used in employee view (record date or empty date if missing)
}

interface AttendanceTableProps {
  viewType: TableViewType;
  data: AttendanceRowData[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ viewType, data }) => {
  const formatTime = (isoString?: string | null) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '--/--/----';
    const d = new Date(isoString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const renderStatus = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'present':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Present
          </div>
        );
      case 'absent':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold border border-yellow-100">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            Absent
          </div>
        );
      case 'leave':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Leave
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
            <tr>
              <th className="px-6 py-4">
                {viewType === 'admin' ? 'Employee' : 'Date'}
              </th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Work Hours</th>
              <th className="px-6 py-4">Extra Hours</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const rec = row.record;
                const key = rec ? rec.id : `row-${idx}`;
                
                return (
                  <tr key={key} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      {viewType === 'admin' && row.employee ? (
                        <div className="flex items-center gap-3">
                          <img 
                            src={row.employee.profilePicture} 
                            alt={row.employee.firstName} 
                            className="w-8 h-8 rounded-full bg-slate-200 object-cover"
                          />
                          <div>
                            <div className="font-semibold text-slate-900">
                              {row.employee.firstName} {row.employee.lastName}
                            </div>
                            <div className="text-xs text-slate-500">{row.employee.designation}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="font-medium text-slate-700">
                          {formatDate(row.date || rec?.date)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {formatTime(rec?.checkIn)}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {rec?.status === 'present' && !rec.checkOut ? <span className="text-primary-600 text-xs font-semibold bg-primary-50 px-2 py-1 rounded">In Progress</span> : formatTime(rec?.checkOut)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {rec?.workHours || (rec?.status === 'present' && !rec.checkOut ? <span className="text-xs text-slate-400 font-medium">Tracking...</span> : '--h --m')}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {rec?.extraHours || '--h --m'}
                    </td>
                    <td className="px-6 py-4">
                      {renderStatus(rec?.status)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination Placeholder */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
        <span className="text-sm text-slate-500">
          Showing 1 to {data.length} of {data.length} records
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded text-slate-400 hover:bg-slate-200 disabled:opacity-50" disabled>
            &lt;
          </button>
          <button className="w-8 h-8 rounded bg-primary-600 text-white font-medium text-sm">
            1
          </button>
          <button className="p-1 rounded text-slate-400 hover:bg-slate-200 disabled:opacity-50" disabled>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
