import React from 'react';
import { FileBarChart, Download, TrendingUp, Users, Calendar, Wallet } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-400/20">
              <FileBarChart className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">HR Analytics & Reports</h1>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            Generate and export organizational summaries for attendance, leave trends, headcount, and payroll.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting master HR report...')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export Master Report
        </button>
      </div>

      {/* Reports Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">96.4%</span>
            <span className="text-xs font-bold text-emerald-600">+2.1% this month</span>
          </div>
          <p className="text-xs text-slate-500">Average daily check-in rate across all engineering & design teams.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Headcount Growth</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">42</span>
            <span className="text-xs font-bold text-blue-600">+5 new hires</span>
          </div>
          <p className="text-xs text-slate-500">Active full-time employees onboarded in Q3 2026.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Payroll</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Wallet className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-800">₹23.5 L</span>
            <span className="text-xs text-slate-400 font-medium">Disbursed</span>
          </div>
          <p className="text-xs text-slate-500">Total gross payroll and statutory contributions for August 2026.</p>
        </div>
      </div>

      {/* Available Report Downloads */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">
          Downloadable HR Documents & Statements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Monthly Attendance Summary</h4>
                <p className="text-[11px] text-slate-400">PDF • Detailed daily log of all employees</p>
              </div>
            </div>
            <button
              onClick={() => alert('Downloading Attendance Summary PDF...')}
              className="p-2 rounded-xl text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between hover:border-purple-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs">Payroll & Tax Statements</h4>
                <p className="text-[11px] text-slate-400">CSV • Itemized component breakdown & TDS logs</p>
              </div>
            </div>
            <button
              onClick={() => alert('Downloading Payroll & Tax CSV...')}
              className="p-2 rounded-xl text-purple-600 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
