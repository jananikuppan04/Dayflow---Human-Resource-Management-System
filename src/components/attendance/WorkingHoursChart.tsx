import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';

interface DayData {
  date: string;
  label: string;
  workHours: number;
  extraHours: number;
}

interface WorkingHoursChartProps {
  data: DayData[];
}

export const WorkingHoursChart: React.FC<WorkingHoursChartProps> = ({ data }) => {
  const [tooltip, setTooltip] = useState<{ idx: number; x: number; y: number } | null>(null);
  const maxHours = Math.max(...data.map(d => d.workHours), 10);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-1">
        <BarChart2 className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-bold text-slate-800">Working Hours</h3>
      </div>
      <p className="text-xs text-slate-400 mb-5">Daily hours for the past 7 days</p>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
          {[maxHours, Math.round(maxHours * 0.5), 0].map(v => (
            <span key={v} className="text-[10px] text-slate-300 font-medium">{v}h</span>
          ))}
        </div>

        {/* Bars */}
        <div className="ml-7 flex items-end gap-2 h-36">
          {data.map((d, i) => {
            const barPct = maxHours > 0 ? (d.workHours / maxHours) * 100 : 0;
            const extraPct = maxHours > 0 ? (d.extraHours / maxHours) * 100 : 0;
            const isHovered = tooltip?.idx === i;

            return (
              <div
                key={d.date}
                className="flex-1 flex flex-col items-center group"
                onMouseEnter={(e) => setTooltip({ idx: i, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTooltip(null)}
              >
                <div className="w-full flex-1 flex flex-col justify-end gap-0.5">
                  {/* Extra hours bar (stacked on top) */}
                  {extraPct > 0 && (
                    <div
                      className="w-full rounded-t-sm bg-violet-400/60 transition-all duration-300"
                      style={{ height: `${extraPct}%` }}
                    />
                  )}
                  {/* Main work hours bar */}
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      d.workHours === 0 ? 'bg-slate-100' :
                      d.workHours >= 9 ? 'bg-gradient-to-t from-blue-600 to-indigo-500' :
                      d.workHours >= 7 ? 'bg-gradient-to-t from-blue-400 to-blue-300' :
                      'bg-gradient-to-t from-amber-400 to-amber-300'
                    } ${isHovered ? 'opacity-80' : ''}`}
                    style={{ height: `${Math.max(barPct, d.workHours > 0 ? 4 : 0)}%` }}
                  />
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-medium rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap z-20 pointer-events-none">
                    <p className="font-bold">{new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                    <p>Work: {d.workHours}h</p>
                    {d.extraHours > 0 && <p>Extra: {d.extraHours}h</p>}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* X-axis */}
        <div className="ml-7 flex gap-2 mt-1">
          {data.map(d => (
            <div key={d.date} className="flex-1 text-center text-[10px] font-semibold text-slate-400">{d.label}</div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-600 to-indigo-500" />
          <span className="text-[11px] text-slate-400">Work Hours</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-violet-400/60" />
          <span className="text-[11px] text-slate-400">Extra Hours</span>
        </div>
      </div>
    </div>
  );
};
