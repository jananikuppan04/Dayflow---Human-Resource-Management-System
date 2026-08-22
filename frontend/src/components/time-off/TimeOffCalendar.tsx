import React, { useState } from 'react';
import type { TimeOffRecord } from '../../types';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface TimeOffCalendarProps {
  requests: TimeOffRecord[];
  holidays: {date: string, name: string}[];
}

export const TimeOffCalendar: React.FC<TimeOffCalendarProps> = ({ requests, holidays }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: null, dateStr: null });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({ day: i, dateStr });
  }

  const getStatusForDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    for (const req of requests) {
      if (req.startDate <= dateStr && req.endDate >= dateStr) {
        return req.status;
      }
    }
    return null;
  };

  const getHolidayForDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return holidays.find(h => h.date === dateStr);
  };

  const getStatusClasses = (status: string | null) => {
    switch (status) {
      case 'approved':
        return 'bg-[#f0fdf4] text-[#166534] border border-[#dcfce7]';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border border-orange-100';
      case 'rejected':
        return 'bg-purple-50 text-purple-700 border border-purple-100';
      default:
        return 'bg-white text-slate-700 border border-slate-100 hover:border-primary-200 transition-colors';
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDateString = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-8 items-start">
      {/* Calendar Area */}
      <div className="flex-1 w-full bg-white rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm">
              <button onClick={prevMonth} className="p-1.5 hover:bg-slate-50 border-r border-slate-200 text-slate-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-1.5 hover:bg-slate-50 text-slate-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold text-slate-900 text-base tracking-tight">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button className="px-3 py-1.5 bg-primary-600 text-white text-[13px] font-medium rounded-md shadow-sm transition-all active:scale-95 hover:bg-primary-700">Month</button>
            <button className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 text-[13px] font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors">List</button>
            <button className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 text-[13px] font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors">My Requests</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-1.5">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider py-1.5">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {calendarDays.map((item, idx) => {
            const status = getStatusForDate(item.dateStr);
            const holiday = getHolidayForDate(item.dateStr);
            const isWeekend = idx % 7 === 0 || idx % 7 === 6;
            const isToday = item.dateStr === new Date().toISOString().split('T')[0];
            
            if (!item.day) {
              return <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-md bg-slate-50 border border-slate-100/50"></div>;
            }

            let classes = getStatusClasses(status);
            if (!status && isWeekend) {
              classes = 'bg-slate-50/50 text-slate-400 border border-slate-100/50';
            }

            return (
              <div 
                key={`day-${idx}`} 
                className={`h-14 sm:h-16 rounded-md flex flex-col relative overflow-hidden transition-all ${classes}`}
              >
                <div className="p-2 w-full">
                  <span className={`text-[13px] font-medium ${isToday && !status ? 'text-primary-600 font-bold' : ''}`}>
                    {item.day}
                  </span>
                  {holiday && (
                    <div className="text-[9px] sm:text-[10px] font-semibold text-primary-500 leading-tight mt-0.5 truncate max-w-full">
                      {holiday.name}
                    </div>
                  )}
                </div>
                
                {status && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-current opacity-30"></div>
                )}
                {isToday && !status && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-500 rounded-full"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="w-full lg:w-[260px] xl:w-[280px] flex flex-col gap-4">
        
        {/* Legend */}
        <div className="bg-white rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 text-[15px] mb-4 tracking-tight">Legend</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-[#f0fdf4] border border-[#dcfce7] flex-shrink-0 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]"></div>
              </div>
              <div className="mt-0.5">
                <div className="font-semibold text-slate-800 text-[13px] leading-none">Validated</div>
                <div className="text-[12px] text-slate-500 mt-1">Approved</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-orange-50 border border-orange-100 flex-shrink-0 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-sm bg-orange-400"></div>
              </div>
              <div className="mt-0.5">
                <div className="font-semibold text-slate-800 text-[13px] leading-none">To Approve</div>
                <div className="text-[12px] text-slate-500 mt-1">Pending approval</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100 flex-shrink-0 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-sm bg-purple-400"></div>
              </div>
              <div className="mt-0.5">
                <div className="font-semibold text-slate-800 text-[13px] leading-none">Refused</div>
                <div className="text-[12px] text-slate-500 mt-1">Rejected time off</div>
              </div>
            </div>
          </div>
        </div>

        {/* Public Holidays */}
        <div className="bg-white rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-900 text-[15px] mb-4 tracking-tight">Upcoming Holidays</h3>
          <div className="space-y-3">
            {holidays
              .filter(h => h.date >= new Date().toISOString().split('T')[0])
              .map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-800 text-[13px] tracking-tight block leading-none mb-1">{formatDateString(h.date)}</span>
                  <span className="text-slate-500 text-[12px] block leading-none">{h.name}</span>
                </div>
              </div>
            ))}
            
            {holidays.filter(h => h.date >= new Date().toISOString().split('T')[0]).length === 0 && (
              <div className="text-[13px] text-slate-500 font-medium">No upcoming public holidays.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
