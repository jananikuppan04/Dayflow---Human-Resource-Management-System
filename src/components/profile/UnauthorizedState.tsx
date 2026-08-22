import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

interface UnauthorizedStateProps {
  message?: string;
  onDismiss?: () => void;
}

export const UnauthorizedState: React.FC<UnauthorizedStateProps> = ({
  message = 'Salary configuration controls are restricted to authorized administrators.',
  onDismiss,
}) => {
  return (
    <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 text-amber-900 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>Admin Authorization Required</span>
          </h4>
          <p className="text-xs text-amber-700 mt-0.5">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="px-3.5 py-1.5 rounded-lg bg-amber-200/60 hover:bg-amber-200 text-xs font-semibold text-amber-900 transition-colors"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
