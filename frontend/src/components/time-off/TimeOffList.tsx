import React, { useState } from 'react';
import type { TimeOffRecord, User } from '../../types';
import { Calendar, CheckCircle2, XCircle, Clock, FileText, Search, Loader2 } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

interface TimeOffListProps {
  requests: TimeOffRecord[];
  user: User;
  onStatusChanged: () => void;
}

export const TimeOffList: React.FC<TimeOffListProps> = ({ requests, user, onStatusChanged }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const isAdmin = user.role === 'admin';

  const filteredRequests = requests.filter(req => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      req.employeeName?.toLowerCase().includes(q) ||
      req.type.toLowerCase().includes(q) ||
      req.status.toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    if (!isAdmin) return;
    setProcessingId(id);
    try {
      await mockApi.updateTimeOffStatus(id, newStatus);
      onStatusChanged();
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    } finally {
      setProcessingId(null);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0fdf4] text-[#166534] rounded-full text-xs font-bold uppercase tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-wide">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wide">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {isAdmin && (
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-lg">All Time Off Requests</h3>
          <div className="relative w-full sm:w-[320px] text-slate-500">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, type, or status..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm bg-white text-sm"
            />
          </div>
        </div>
      )}

      {filteredRequests.length === 0 ? (
        <div className="p-12 text-center text-slate-500">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-lg font-medium">No Time Off requests found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isAdmin && <th className="p-4 pl-6">Employee</th>}
                <th className="p-4">Type</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Status</th>
                {isAdmin && <th className="p-4 pr-6 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  {isAdmin && (
                    <td className="p-4 pl-6">
                      <div className="font-bold text-slate-900">{req.employeeName || 'Unknown'}</div>
                      <div className="text-xs text-slate-500">{req.employeeId}</div>
                    </td>
                  )}
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{req.type}</div>
                    {req.remarks && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <FileText className="w-3 h-3" />
                        <span className="truncate max-w-[150px] inline-block" title={req.remarks}>{req.remarks}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {req.startDate} <span className="text-slate-400 mx-1">→</span> {req.endDate}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900">
                    {req.duration} Day{req.duration !== 1 ? 's' : ''}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={req.status} />
                  </td>
                  {isAdmin && (
                    <td className="p-4 pr-6 text-right">
                      {req.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusChange(req.id, 'rejected')}
                            disabled={processingId !== null}
                            className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleStatusChange(req.id, 'approved')}
                            disabled={processingId !== null}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-[#00c853] hover:bg-[#00e676] shadow-sm rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1"
                          >
                            {processingId === req.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Approve'}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">Reviewed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
