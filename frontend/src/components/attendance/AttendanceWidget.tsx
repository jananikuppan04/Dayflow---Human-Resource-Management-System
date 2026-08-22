import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';
import { mockApi } from '../../services/mockApi';
import type { AttendanceRecord } from '../../types';
import { Clock, CheckCircle2, LogOut, Loader2, AlertCircle, PieChart, ArrowRight, Plane } from 'lucide-react';

export const AttendanceWidget = () => {
  const { user } = useAuth();
  const [record, setRecord] = useState<AttendanceRecord | null>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'idle' | 'present' | 'leave' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.employeeId) {
      loadAttendance();
    }
  }, [user]);

  const loadAttendance = async () => {
    if (!user?.employeeId) return;
    setStatus('loading');
    try {
      const emp = await mockApi.getCurrentEmployee(user.employeeId);
      setEmployee(emp);
      const today = new Date().toISOString().split('T')[0];
      const statuses = await mockApi.getAttendanceStatus([user.employeeId], today);
      
      if (statuses[user.employeeId] === 'leave') {
        setStatus('leave');
        return;
      }
      
      const todayRecord = await mockApi.getTodayAttendance(user.employeeId);
      setRecord(todayRecord);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Failed to load attendance');
    }
  };

  const handleCheckIn = async () => {
    if (!user?.employeeId || isProcessing) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const newRecord = await mockApi.checkIn(user.employeeId);
      setRecord(newRecord);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to check in');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!user?.employeeId || isProcessing) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const updatedRecord = await mockApi.checkOut(user.employeeId);
      setRecord(updatedRecord);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to check out');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (isoString: string | null) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (status === 'loading') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Greeting Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white rounded-[24px] shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-primary-100 p-8 flex items-center gap-6 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-50 z-10">
          <Clock className="w-8 h-8 text-primary-600" />
        </div>
        <div className="z-10">
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Good Morning,<br/>
            <span className="text-primary-700">{employee ? employee.firstName : 'User'}! 👋</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">Let's make today productive.</p>
        </div>
      </div>

      {/* Attendance Action Widget */}
      <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Attendance</h3>
          <button className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
            View My Attendance <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}

        {status === 'leave' ? (
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600">
              <Plane className="w-6 h-6" fill="currentColor" />
            </div>
            <h4 className="font-bold text-blue-900">On Leave</h4>
            <p className="text-blue-700 text-sm mt-1 font-medium">Enjoy your time off!</p>
          </div>
        ) : record?.checkOut ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center">
            <CheckCircle2 className="w-8 h-8 text-slate-400 mb-3" />
            <h4 className="font-bold text-slate-700">Completed</h4>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {formatTime(record.checkIn)} - {formatTime(record.checkOut)}
            </p>
          </div>
        ) : record?.checkIn ? (
          <>
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00c853]" />
                <h4 className="font-bold text-[#166534] text-lg">Checked In</h4>
              </div>
              <p className="text-[#15803d] text-sm mt-2 ml-6 font-medium">Since <span className="font-bold text-slate-900 ml-1">{formatTime(record.checkIn)}</span></p>
            </div>
            <button
              onClick={handleCheckOut}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-primary-500/20"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
              Check Out
            </button>
          </>
        ) : (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <button
              onClick={handleCheckIn}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm shadow-primary-500/20"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check In'}
            </button>
          </div>
        )}
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
              <PieChart className="w-4 h-4" />
            </div>
            <h3 className="font-bold tracking-tight">Today's Summary</h3>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-5 flex border border-slate-100">
          <div className="flex-1 border-r border-slate-200 pr-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Work Hours</span>
            <div className="text-xl font-bold text-slate-900 mt-1">
              {record?.checkOut ? '08h 15m' : record?.checkIn ? '02h 45m' : '00h 00m'}
            </div>
            <span className="text-xs text-slate-400 font-medium mt-1 block">Today</span>
          </div>
          <div className="flex-1 pl-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Break Time</span>
            <div className="text-xl font-bold text-slate-900 mt-1">
              {record?.checkOut ? '01h 00m' : '00h 30m'}
            </div>
            <span className="text-xs text-slate-400 font-medium mt-1 block">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};
