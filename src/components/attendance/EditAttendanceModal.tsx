import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import type { AttendanceRecord, Employee } from '../../types';
import { StatusBadge } from './StatusBadge';
import type { AttendanceStatus } from '../../types';

interface EditAttendanceModalProps {
  open: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
  employee: Employee | null;
  onSave: (recordId: string, updates: Partial<Pick<AttendanceRecord, 'checkIn' | 'checkOut' | 'status' | 'remarks'>>) => Promise<void>;
}

const statusOptions: { value: AttendanceStatus; label: string }[] = [
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
  { value: 'late', label: 'Late' },
  { value: 'half_day', label: 'Half Day' },
  { value: 'leave', label: 'Leave' },
];

function toTimeInput(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function timeToISO(date: string, time: string) {
  if (!time) return null;
  return new Date(`${date}T${time}:00`).toISOString();
}

export const EditAttendanceModal: React.FC<EditAttendanceModalProps> = ({
  open, onClose, record, employee, onSave
}) => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [status, setStatus] = useState<AttendanceStatus>('present');
  const [remarks, setRemarks] = useState('');
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (record) {
      setCheckInTime(toTimeInput(record.checkIn));
      setCheckOutTime(toTimeInput(record.checkOut));
      setStatus(record.status);
      setRemarks(record.remarks || '');
    }
  }, [record]);

  const handleSave = async () => {
    if (!record) return;
    setSaving(true);
    try {
      await onSave(record.id, {
        checkIn: checkInTime ? timeToISO(record.date, checkInTime) : record.checkIn,
        checkOut: checkOutTime ? timeToISO(record.date, checkOutTime) : record.checkOut,
        status,
        remarks,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-[modalIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Edit Attendance</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Employee Info */}
          {employee && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
              <img src={employee.profilePicture} alt={employee.firstName} className="w-9 h-9 rounded-xl object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div>
                <p className="text-sm font-bold text-slate-800">{employee.firstName} {employee.lastName}</p>
                <p className="text-xs text-slate-400">{employee.loginId} · {employee.department}</p>
              </div>
            </div>
          )}

          {/* Date */}
          {record && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
              <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                {new Date(record.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          )}

          {/* Time inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Check In</label>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Check Out</label>
              <input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full text-sm font-medium border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`transition-all ${status === opt.value ? 'ring-2 ring-blue-500 ring-offset-1 rounded-full' : 'opacity-60 hover:opacity-100'}`}
                >
                  <StatusBadge status={opt.value} />
                </button>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={2}
              placeholder="Add a remark or note..."
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
