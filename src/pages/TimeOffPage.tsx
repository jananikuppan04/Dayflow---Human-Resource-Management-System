import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, Plus, Filter, MessageSquare, AlertCircle, CalendarDays, Check, X } from 'lucide-react';
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
  const [selectedMonth, setSelectedMonth] = useState<number>(7); // August (0-indexed: 7)
  const [selectedYear, setSelectedYear] = useState<number>(2026);

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
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
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

  // --- CALENDAR GRID GENERATION (August 2026) ---
  const daysInMonth = 31;
  const startDayOfWeek = 6; // August 1, 2026 is Saturday (0=Sun, 1=Mon, ..., 6=Sat)

  const calendarDays: (number | null)[] = (
    Array.from({ length: startDayOfWeek }, () => null) as (number | null)[]
  ).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  // Check if a day has leave requests
  const getLeaveForDay = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return requests.find((r) => {
      if (r.status === 'Rejected') return false;
      return dateStr >= r.startDate && dateStr <= r.endDate;
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 bg-[#714B67]/20 text-[#c7a9c1] rounded-xl border border-purple-400/20">
              <CalendarIcon className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Time Off & Leave Directory</h1>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            {currentRole === 'ADMIN'
              ? 'HR Approvals Dashboard: review pending leave requests, check workforce coverage calendar, and manage approvals.'
              : 'Employee Leave Dashboard: apply for leaves, track approval statuses, and review your leave balance.'}
          </p>
        </div>

        {/* Apply Leave Button (Only for Employee role to satisfy logical separation) */}
        {currentRole !== 'ADMIN' && (
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="bg-[#714B67] hover:bg-[#5f3e56] text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Main Grid: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Calendar & Workflows */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Visual Interactive Month Calendar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-5 h-5 text-[#714B67]" />
                <h3 className="font-bold text-slate-800 text-base">August 2026 workforce Coverage</h3>
              </div>
              <span className="text-xs font-bold text-[#714B67] bg-purple-50 px-3 py-1 rounded-full">
                Active Calendar Month
              </span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold mb-2 text-slate-400 uppercase tracking-wider">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-14 bg-slate-50/50 rounded-xl" />;
                }

                const leave = getLeaveForDay(day);
                let dayStyle = 'bg-slate-50 text-slate-800 border border-slate-100';
                if (leave) {
                  if (leave.status === 'Approved') {
                    dayStyle = 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20';
                  } else if (leave.status === 'Pending') {
                    dayStyle = 'bg-amber-500 text-white shadow-md shadow-amber-500/20 animate-pulse';
                  }
                }

                return (
                  <div
                    key={`day-${day}`}
                    className={`h-14 rounded-xl flex flex-col justify-between p-1.5 transition-all relative group cursor-pointer ${dayStyle}`}
                    title={leave ? `${leave.employeeName} - ${leave.leaveType} (${leave.status})` : 'Available'}
                  >
                    <span className="font-bold text-[11px]">{day}</span>
                    {leave && (
                      <span className="text-[9px] font-medium truncate block leading-none max-w-full">
                        {leave.employeeName.split(' ')[0]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 mt-4 border-t border-slate-100 pt-3 justify-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Approved Leave</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Pending Approval</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span>Working Day</span>
              </div>
            </div>
          </div>

          {/* Admin Workflow: Leave Approval Queue */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-slate-50/80 rounded-xl border border-slate-200 p-4 space-y-3 hover:border-purple-200 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {req.avatar ? (
                            <img src={req.avatar} alt={req.employeeName} className="w-9 h-9 rounded-full object-cover" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                              {req.employeeName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-slate-800 text-xs">{req.employeeName}</h4>
                            <p className="text-[10px] text-slate-400">{req.department}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded">
                          {req.leaveType}
                        </span>
                      </div>

                      <div className="bg-white rounded-lg p-2.5 border border-slate-100 text-[11px] text-slate-600">
                        <div className="flex justify-between font-bold text-slate-700">
                          <span>Period: {req.startDate} to {req.endDate}</span>
                          <span className="text-[#714B67]">{req.totalDays} Days</span>
                        </div>
                        <p className="mt-1 font-medium text-slate-500 italic">" {req.reason} "</p>
                      </div>

                      {/* Comment Input */}
                      <input
                        type="text"
                        placeholder="Add admin review comment..."
                        value={commentInput[req.id] || ''}
                        onChange={(e) => setCommentInput((prev) => ({ ...prev, [req.id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(req.id, 'Approved')}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(req.id, 'Rejected')}
                          className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Leave Balances & Sidebar Details */}
        <div className="space-y-6">
          {/* Employee Personal Leave Balance (Only for Employee role to satisfy logic) */}
          {currentRole !== 'ADMIN' ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
                Your Leave Balances
              </h3>

              <div className="space-y-4 text-xs">
                {/* Paid Leave */}
                <div>
                  <div className="flex justify-between text-slate-500 font-bold mb-1">
                    <span>Paid Leave</span>
                    <span className="text-slate-800">12 / 15 Days</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#714B67] h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                {/* Sick Leave */}
                <div>
                  <div className="flex justify-between text-slate-500 font-bold mb-1">
                    <span>Sick Leave</span>
                    <span className="text-slate-800">9 / 10 Days</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                {/* Unpaid Leave */}
                <div>
                  <div className="flex justify-between text-slate-500 font-bold mb-1">
                    <span>Unpaid Leave</span>
                    <span className="text-slate-800">2 / 5 Days Used</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Admin Workspace Quick Stats */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
                Workforce Coverage Metrics
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="font-semibold text-slate-600">Total Workforce Active</span>
                  <span className="font-bold text-slate-800 text-sm">42 Employees</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="font-semibold text-slate-600">On Leave (Today)</span>
                  <span className="font-bold text-[#714B67] text-sm">2 Employees</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="font-semibold text-slate-600">Pending Review approvals</span>
                  <span className="font-bold text-amber-600 text-sm">{pendingRequests.length} Requests</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">End Date</th>
                <th className="py-3 px-4 text-center">Days</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Admin Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400">{req.employeeId}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{req.employeeName}</td>
                  <td className="py-3.5 px-4 font-semibold">{req.leaveType}</td>
                  <td className="py-3.5 px-4 text-slate-500">{req.startDate}</td>
                  <td className="py-3.5 px-4 text-slate-500">{req.endDate}</td>
                  <td className="py-3.5 px-4 text-center font-bold">{req.totalDays}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-[180px] truncate" title={req.reason}>
                    {req.reason}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        req.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : req.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {req.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                      {req.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {req.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 italic max-w-[150px] truncate" title={req.adminComment}>
                    {req.adminComment || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <ApplyLeaveModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleApplyLeave}
        />
      )}
    </div>
  );
};
