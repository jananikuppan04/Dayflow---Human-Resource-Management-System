import React from 'react';
import { Info } from 'lucide-react';

export const SalaryHelpBanner: React.FC = () => {
  return (
    <div className="rounded-xl bg-blue-50/80 border border-blue-100 p-4 flex items-center gap-3 text-xs text-blue-800 font-medium">
      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
        <Info className="w-3.5 h-3.5" />
      </div>
      <span>For any salary related queries, please contact your HR or Finance team.</span>
    </div>
  );
};
