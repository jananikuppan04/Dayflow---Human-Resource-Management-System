import React from 'react';
import type { AttendanceStatus } from '../../types';

interface StatusBadgeProps {
  status: AttendanceStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<AttendanceStatus, { label: string; dot: string; bg: string; text: string; border: string }> = {
  present:  { label: 'Present',  dot: 'bg-emerald-500', bg: 'bg-emerald-50',  text: 'text-emerald-700',  border: 'border-emerald-200' },
  absent:   { label: 'Absent',   dot: 'bg-red-500',     bg: 'bg-red-50',      text: 'text-red-700',      border: 'border-red-200'     },
  leave:    { label: 'Leave',    dot: 'bg-blue-500',    bg: 'bg-blue-50',     text: 'text-blue-700',     border: 'border-blue-200'    },
  late:     { label: 'Late',     dot: 'bg-amber-500',   bg: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200'   },
  half_day: { label: 'Half Day', dot: 'bg-orange-500',  bg: 'bg-orange-50',   text: 'text-orange-700',   border: 'border-orange-200'  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const cfg = statusConfig[status];
  const sizeClass = size === 'sm'
    ? 'text-[11px] px-2 py-0.5 gap-1.5'
    : 'text-xs px-2.5 py-1 gap-2';
  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};
