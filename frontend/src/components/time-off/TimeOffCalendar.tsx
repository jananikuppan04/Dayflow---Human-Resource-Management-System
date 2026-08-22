import React, { useState } from 'react';
import type { TimeOffRecord } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeOffCalendarProps {
  requests: TimeOffRecord[];
}

export const TimeOffCalendar: React.FC<TimeOffCalendarProps> = ({ requests }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Create array of days to render
  const calendarDays = [];
  
  // Empty slots before first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: null, dateStr: null });
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({ day: i, dateStr });
  }

  // Determine status of a specific date based on requests
  const getStatusForDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    
    // Find if date falls within any request's start/end dates
    for (const req of requests) {
      if (req.startDate <= dateStr && req.endDate >= dateStr) {
        return req.status;
      }
    }
    return null;
  };

  const getStatusClasses = (status: string | null) => {
    switch (status) {
      case 'approved':
        return 'bg-[#f0fdf4] text-[#166534] border border-[#dcfce7] shadow-[inset_0_2px_4px_rgba(22,101,52,0.05)]';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border border-orange-100';
      case 'rejected':
        return 'bg-red-50 text-red-700 border border-red-100 line-through opacity-70';
      default:
        return 'bg-white text-slate-700 border border-slate-100 hover:border-primary-200 transition-colors';
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 text-lg">Leave Calendar</h3>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-50 rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 border-r border-slate-200 text-slate-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 py-1.5 font-bold text-slate-700 min-w-[140px] text-center text-sm">
              {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 border-l border-slate-200 text-slate-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((item, idx) => {
          const status = getStatusForDate(item.dateStr);
          const isWeekend = idx % 7 === 0 || idx % 7 === 6; // Sunday or Saturday
          const isToday = item.dateStr === new Date().toISOString().split('T')[0];
          
          if (!item.day) {
            return <div key={`empty-${idx}`} className="h-12 sm:h-16 rounded-xl bg-slate-50/50 border border-slate-100/50"></div>;
          }

          let classes = getStatusClasses(status);
          
          if (!status && isWeekend) {
             classes = 'bg-slate-50 text-slate-400 border border-slate-100';
          }

          return (
            <div 
              key={`day-${idx}`} 
              className={`h-12 sm:h-16 rounded-xl flex flex-col items-center justify-center relative ${classes}`}
            >
              <span className={`font-semibold ${isToday && !status ? 'text-primary-600' : ''}`}>
                {item.day}
              </span>
              {isToday && !status && <div className="absolute bottom-2 w-1 h-1 bg-primary-500 rounded-full"></div>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#f0fdf4] border border-[#dcfce7]"></div>
          Approved
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-50 border border-orange-100"></div>
          Pending
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-50 border border-red-100"></div>
          Rejected
        </div>
      </div>
    </div>
  );
};
