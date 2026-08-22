import React, { useState } from 'react';
import { X, Calendar, FileText, Send, AlertCircle } from 'lucide-react';
import { LeaveType } from '../../types/leaveTypes';

interface ApplyLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leaveType: LeaveType, startDate: string, endDate: string, reason: string) => void;
}

export const ApplyLeaveModal: React.FC<ApplyLeaveModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [leaveType, setLeaveType] = useState<LeaveType>('Paid');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return -1;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const daysCount = calculateDays();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Please select start and end dates.');
      return;
    }
    if (daysCount <= 0) {
      setError('End date must be on or after start date.');
      return;
    }
    if (!reason.trim()) {
      setError('Please enter a reason for leave.');
      return;
    }

    setError('');
    onSubmit(leaveType, startDate, endDate, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5" />
            <h3 className="font-bold text-lg">Apply for Leave</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Leave Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Leave Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Paid', 'Sick', 'Unpaid'] as LeaveType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setLeaveType(type)}
                  className={`py-2.5 px-3 rounded-xl font-medium text-xs border transition-all ${
                    leaveType === type
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {type} Leave
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Calculated Duration Banner */}
          {daysCount > 0 && (
            <div className="px-4 py-2.5 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center justify-between text-xs text-blue-700">
              <span className="font-medium">Calculated Leave Duration:</span>
              <span className="font-bold text-sm bg-blue-600 text-white px-2.5 py-0.5 rounded-full">
                {daysCount} {daysCount === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          )}

          {/* Reason / Remarks */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Reason / Remarks
            </label>
            <textarea
              rows={3}
              placeholder="Provide brief details regarding your leave request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
