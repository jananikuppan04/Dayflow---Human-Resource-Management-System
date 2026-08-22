import React, { useState, useEffect } from 'react';
import type { User, TimeOffType } from '../../types';
import { X, Calendar, FileText, Loader2, Paperclip } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

interface TimeOffRequestModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export const TimeOffRequestModal: React.FC<TimeOffRequestModalProps> = ({ user, onClose, onSuccess }) => {
  const [type, setType] = useState<TimeOffType>('Paid Time Off');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate duration, excluding weekends
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end < start) {
        setDuration(0);
        return;
      }
      
      let days = 0;
      let current = new Date(start);
      
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
          days++;
        }
        current.setDate(current.getDate() + 1);
      }
      setDuration(days);
    } else {
      setDuration(0);
    }
  }, [startDate, endDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.employeeId) return;
    
    if (!startDate || !endDate) {
      setError('Start Date and End Date are required.');
      return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
      setError('End Date cannot be before Start Date.');
      return;
    }

    if (duration === 0) {
      setError('Duration must be at least 1 working day.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await mockApi.createTimeOffRequest(user.employeeId, {
        type,
        startDate,
        endDate,
        duration,
        remarks,
        attachmentUrl: undefined // Optional mock field
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit request');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">New Time Off Request</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Time Off Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as TimeOffType)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-700"
              >
                <option value="Paid Time Off">Paid Time Off</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Calculated Duration</span>
              <span className="text-lg font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                {duration} Day{duration !== 1 ? 's' : ''}
              </span>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Remarks (Optional)</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Reason for time off..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-700 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Attachment (Optional)</label>
              <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                <Paperclip className="w-6 h-6 mb-2 text-slate-400" />
                <span className="text-sm font-medium">Click to upload document</span>
                <span className="text-xs text-slate-400 mt-1">Medical certificates, etc.</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-sm shadow-primary-500/20 flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
