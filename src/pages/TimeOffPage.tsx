import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, Plus, Filter, MessageSquare, AlertCircle, UserCheck } from 'lucide-react';
import { leaveService } from '../services/leaveService';
import { LeaveRequest, LeaveType, LeaveStatus } from '../types/leaveTypes';
import { ApplyLeaveModal } from '../components/leave/ApplyLeaveModal';
import { UserRole } from '../types/salaryTypes';

interface TimeOffPageProps {
  currentRole?: UserRole;
}

export const TimeOffPage: React.FC<TimeOffPageProps> = ({ currentRole = 'ADMIN' }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    setRequests(leaveService.getRequests());
  };

  const handleApplyLeave = (leaveType: LeaveType, startDate: string, endDate: string, reason: string) => {
    leaveService.applyLeave(
      'EMP-1001',
      'Janani Devi',
      'Engineering',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      leaveType,
      startDate,
      endDate,
      reason
    );
    loadRequests();
  };

  const handleStatusUpdate = (id: string, status: LeaveStatus) => {
    const comment = commentInput[id] || '';
    leaveService.updateRequestStatus(id, status, comment);
    setCommentInput((prev) => ({ ...prev, [id]: '' }));
    loadRequests();
  };

  const filteredRequests = requests.filter((r) => {
    if (filterStatus === 'ALL') return true;
    return r.status.toUpperCase() === filterStatus;
  });

  const pendingRequests = requests.filter((r) => r.status === 'Pending');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-400/20">
              <Clock className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Time Off & Leave Management</h1>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            {currentRole === 'ADMIN'
              ? 'Review, approve, or reject employee leave requests and track organization balances.'
              : 'Submit leave applications, track status, and monitor your available leave balances.'}
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Apply for Leave
        </button>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Paid Leave</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">12</span>
            <span className="text-xs text-slate-400 font-medium">/ 15 Days Available</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '80%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sick Leave</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">9</span>
            <span className="text-xs text-slate-400 font-medium">/ 10 Days Available</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '90%' }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Unpaid Leave</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">5</span>
            <span className="text-xs text-slate-400 font-medium">/ 5 Days Available</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Admin Approval Section (Only in ADMIN Mode) */}
      {currentRole === 'ADMIN' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Leave Approval Workflows</h3>
                <p className="text-xs text-slate-500">
                  {pendingRequests.length} pending leave request(s) awaiting your review
                </p>
              </div>
            </div>
            {pendingRequests.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                {pendingRequests.length} Pending
              </span>
            )}
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">All leave requests reviewed!</p>
              <p className="text-xs text-slate-400 mt-0.5">No pending applications require approval right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-3 hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {req.avatar ? (
                        <img src={req.avatar} alt={req.employeeName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                          {req.employeeName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{req.employeeName}</h4>
                        <span className="text-xs text-slate-400">{req.department}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {req.leaveType} Leave ({req.totalDays} {req.totalDays === 1 ? 'day' : 'days'})
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">
                      {req.startDate} to {req.endDate}
                    </span>
                    <p className="italic text-slate-500">"{req.reason}"</p>
                  </div>

                  {/* Comment Input & Actions */}
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add optional admin remarks..."
                      value={commentInput[req.id] || ''}
                      onChange={(e) => setCommentInput({ ...commentInput, [req.id]: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'Rejected')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'Approved')}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Leave History & Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Leave Requests History</h3>
            <p className="text-xs text-slate-500">Record of all submitted applications and status updates</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date Range</th>
                <th className="py-3 px-4 text-center">Days</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    <div>{req.employeeName}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{req.employeeId}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">{req.leaveType}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {req.startDate} to {req.endDate}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold">{req.totalDays}</td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-500">{req.reason}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        req.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                      {req.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {req.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 italic">
                    {req.adminComment || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <ApplyLeaveModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={handleApplyLeave}
      />
    </div>
  );
};
