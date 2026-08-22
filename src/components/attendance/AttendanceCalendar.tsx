import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AttendanceStatus } from '../../types';

interface DayStatus {
  date: string;
  status: AttendanceStatus | null;
}

interface AttendanceCalendarProps {
  month: string; // YYYY-MM
  onPrev: () => void;
  onNext: () => void;
  dayStatuses: DayStatus[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
}

const statusDotClass: Record<string, string> = {
  present:  'bg-emerald-500',
  absent:   'bg-red-500',
  leave:    'bg-blue-500',
  late:     'bg-amber-500',
  half_day: 'bg-orange-500',
};

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  month, onPrev, onNext, dayStatuses, selectedDate, onSelectDate
}) => {
  const [year, mon] = month.split('-').map(Number);
  const firstDay = new Date(year, mon - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, mon, 0).getDate();
  const monthLabel = new Date(year, mon - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const statusMap: Record<string, AttendanceStatus | null> = {};
  dayStatuses.forEach(d => { statusMap[d.date] = d.status; });

  const today = new Date().toISOString().split('T')[0];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Attendance Calendar</h3>
        <div className="flex items-center gap-1">
          <button onClick={onPrev} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <span className="text-xs font-semibold text-slate-700 px-2 min-w-[110px] text-center">{monthLabel}</span>
          <button onClick={onNext} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = `${year}-${String(mon).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const status = statusMap[dateStr];
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const isFuture = dateStr > today;

          return (
            <button
              key={dateStr}
              onClick={() => !isFuture && onSelectDate?.(dateStr)}
              disabled={isFuture}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-lg transition-all text-xs font-semibold
                ${isSelected ? 'bg-blue-600 text-white' : isToday ? 'bg-blue-50 text-blue-600' : isFuture ? 'text-slate-300 cursor-default' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <span>{day}</span>
              {status && !isFuture && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : statusDotClass[status] || 'bg-slate-300'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        {[
          { color: 'bg-emerald-500', label: 'Present' },
          { color: 'bg-red-500', label: 'Absent' },
          { color: 'bg-blue-500', label: 'Leave' },
          { color: 'bg-amber-500', label: 'Late' },
          { color: 'bg-orange-500', label: 'Half Day' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[10px] text-slate-400 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
