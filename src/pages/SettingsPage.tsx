import React, { useState } from 'react';
import { Settings, Shield, Bell, Building, Check, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('Dayflow Solutions Pvt. Ltd.');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoLeaveApprove, setAutoLeaveApprove] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 bg-slate-700/50 text-slate-300 rounded-xl border border-slate-600/30">
              <Settings className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System & HR Settings</h1>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            Manage organization profile, email notifications, security policies, and HR defaults.
          </p>
        </div>

        {saved && (
          <div className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            Settings Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Building className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800 text-base">Organization Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Company Legal Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Primary Contact Email
              </label>
              <input
                type="email"
                defaultValue="hr@dayflow.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Workflows */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Bell className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-800 text-base">Notifications & Workflows</h3>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Email Alerts & Notifications</span>
                <span className="text-slate-400">Send email updates for leave approvals and attendance reminders</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Automatic Sick Leave Approval</span>
                <span className="text-slate-400">Automatically approve single-day sick leave requests</span>
              </div>
              <input
                type="checkbox"
                checked={autoLeaveApprove}
                onChange={(e) => setAutoLeaveApprove(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
};
