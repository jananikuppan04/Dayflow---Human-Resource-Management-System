import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import type { TimeOffRecord, LeaveBalance } from '../types';
import { TimeOffBalance } from '../components/time-off/TimeOffBalance';
import { TimeOffList } from '../components/time-off/TimeOffList';
import { TimeOffCalendar } from '../components/time-off/TimeOffCalendar';
import { TimeOffRequestModal } from '../components/time-off/TimeOffRequestModal';
import { Plus, Loader2 } from 'lucide-react';

export const TimeOffPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<TimeOffRecord[]>([]);
  const [balance, setBalance] = useState<LeaveBalance | null>(null);
  const [holidays, setHolidays] = useState<{date: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);

  const isAdmin = user?.role === 'admin';

  const loadData = async () => {
    if (!user?.employeeId) return;
    setLoading(true);
    try {
      if (isAdmin) {
        // Admin sees all requests
        const reqs = await mockApi.getTimeOffRequests();
        setRequests(reqs);
      } else {
        // Employee sees own requests, balance, and holidays
        const [reqs, bal, hols] = await Promise.all([
          mockApi.getTimeOffRequests(user.employeeId),
          mockApi.getLeaveBalance(user.employeeId),
          mockApi.getPublicHolidays()
        ]);
        setRequests(reqs);
        setBalance(bal);
        setHolidays(hols);
      }
    } catch (error) {
      console.error("Failed to load time off data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  if (!user) return null;

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto bg-slate-50 min-h-[calc(100vh-64px)]">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight">Time Off</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            {isAdmin ? 'Manage employee time off requests and allocations.' : 'View your leave balances and submit time off requests.'}
          </p>
        </div>
        
        {!isAdmin && (
          <button 
            onClick={() => setShowNewModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all shadow-sm shadow-primary-500/10 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            New Time Off
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100">
          <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
        </div>
      ) : (
        <>
          {!isAdmin && balance && <TimeOffBalance balance={balance} />}
          {!isAdmin && <TimeOffCalendar requests={requests} holidays={holidays} />}
          <TimeOffList 
            requests={requests} 
            user={user} 
            onStatusChanged={loadData} 
          />
        </>
      )}

      {showNewModal && (
        <TimeOffRequestModal 
          user={user}
          onClose={() => setShowNewModal(false)}
          onSuccess={() => {
            setShowNewModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
};
