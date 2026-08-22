import React, { useState, useEffect, useRef } from 'react';
import { LogIn, LogOut, Clock, Timer, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AttendanceRecord } from '../../types';

interface TodayAttendanceCardProps {
  record: AttendanceRecord | null;
  employeeId: string;
  onCheckIn: () => Promise<void>;
  onCheckOut: () => Promise<void>;
  loading: boolean;
}

function formatTime(iso: string | null) {
  if (!iso) return '--:-- --';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function useLiveTimer(checkIn: string | null, checkOut: string | null) {
  const [elapsed, setElapsed] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!checkIn) { setElapsed(''); return; }
    const update = () => {
      const end = checkOut ? new Date(checkOut) : new Date();
      const start = new Date(checkIn);
      const diff = Math.max(0, end.getTime() - start.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (checkOut) {
        setElapsed(`${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`);
      } else {
        setElapsed(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    };
    update();
    if (!checkOut) intervalRef.current = setInterval(update, 1000);
    return () => clearInterval(intervalRef.current);
  }, [checkIn, checkOut]);

  return elapsed;
}

export const TodayAttendanceCard: React.FC<TodayAttendanceCardProps> = ({
  record, onCheckIn, onCheckOut, loading
}) => {
  const elapsed = useLiveTimer(record?.checkIn ?? null, record?.checkOut ?? null);
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const hasCheckedIn = !!record?.checkIn;
  const hasCheckedOut = !!record?.checkOut;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-base">Today's Attendance</h3>
          <p className="text-blue-100 text-xs mt-0.5">{dateStr}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${hasCheckedIn && !hasCheckedOut ? 'bg-emerald-400/30 text-emerald-100 border border-emerald-400/40' : hasCheckedOut ? 'bg-white/20 text-white' : 'bg-white/10 text-blue-200'}`}>
          {hasCheckedIn && !hasCheckedOut ? '● Checked In' : hasCheckedOut ? '✓ Completed' : 'Not Checked In'}
        </div>
      </div>

      <div className="p-6">
        {!hasCheckedIn ? (
          /* Not checked in yet */
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-slate-700 font-semibold text-sm mb-1">You haven't checked in yet</p>
            <p className="text-slate-400 text-xs mb-5">Mark your attendance by checking in</p>
            <button
              onClick={onCheckIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shadow-md shadow-blue-200"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Check In
            </button>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <LogIn className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Check In</span>
                </div>
                <div className="text-base font-bold text-slate-800">{formatTime(record?.checkIn ?? null)}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Check Out</span>
                </div>
                <div className="text-base font-bold text-slate-800">{hasCheckedOut ? formatTime(record?.checkOut ?? null) : '--:-- --'}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
                      {hasCheckedOut ? 'Work Hours' : 'Live Timer'}
                    </span>
                  </div>
                  {!hasCheckedOut && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-blue-700 mt-1 font-mono">{elapsed || '00:00:00'}</div>
              </div>
            </div>

            {/* Action Button */}
            {!hasCheckedOut ? (
              <button
                onClick={onCheckOut}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shadow-md shadow-red-100"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                Check Out
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-xs text-emerald-700 font-medium">Attendance marked successfully for today.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
