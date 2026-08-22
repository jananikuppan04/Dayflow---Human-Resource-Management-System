import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';
import { mockApi } from '../../services/mockApi';
import type { AttendanceRecord } from '../../types';
import { Clock, CheckCircle2, LogOut, Loader2, AlertCircle } from 'lucide-react';

export const AttendanceWidget = () => {
  const { user } = useAuth();
  const [record, setRecord] = useState<AttendanceRecord | null>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'idle' | 'present' | 'leave' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, [user]);

  const loadAttendance = async () => {
    const empId = user?.employeeId || (user?.role === 'admin' ? 'e-admin' : 'e1');
    setStatus('loading');
    try {
      const emp = await mockApi.getCurrentEmployee(empId);
      setEmployee(emp);
      const today = new Date().toISOString().split('T')[0];
      const statuses = await mockApi.getAttendanceStatus([empId], today);
      
      if (statuses[empId] === 'leave' || (emp?.id && statuses[emp.id] === 'leave')) {
        setStatus('leave');
        return;
      }
      
      const todayRecord = await mockApi.getTodayAttendance(empId);
      setRecord(todayRecord);
      setStatus('idle');
    } catch (err: any) {
      console.error('Error loading attendance:', err);
      setStatus('error');
      setErrorMsg(err?.message || 'Failed to load attendance');
    }
  };

  const handleCheckIn = async () => {
    const empId = user?.employeeId || (user?.role === 'admin' ? 'e-admin' : 'e1');
    if (isProcessing) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const newRecord = await mockApi.checkIn(empId);
      setRecord(newRecord);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to check in');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    const empId = user?.employeeId || (user?.role === 'admin' ? 'e-admin' : 'e1');
    if (isProcessing) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const updatedRecord = await mockApi.checkOut(empId);
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-12 h-12 text-primary-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Good Morning, <span className="text-primary-600">{employee ? employee.firstName : 'User'}!</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">Let's make today productive.</p>
      </div>

      {/* Attendance Action Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Attendance</h3>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {status === 'leave' ? (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-xl">🌴</span>
            </div>
            <h4 className="font-semibold text-blue-900">On Leave</h4>
            <p className="text-blue-700 text-sm mt-1">Enjoy your time off!</p>
          </div>
        ) : record?.checkOut ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center">
            <CheckCircle2 className="w-8 h-8 text-slate-400 mb-2" />
            <h4 className="font-semibold text-slate-700">Completed</h4>
            <p className="text-slate-500 text-sm mt-1">
              {formatTime(record.checkIn)} - {formatTime(record.checkOut)}
            </p>
          </div>
        ) : record?.checkIn ? (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">Checked In</h4>
                <p className="text-green-700 text-sm">Since {formatTime(record.checkIn)}</p>
              </div>
            </div>
            <button
              onClick={handleCheckOut}
              disabled={isProcessing}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
              Check Out
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <button
              onClick={handleCheckIn}
              disabled={isProcessing}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check In'}
            </button>
          </div>
        )}
      </div>

      {/* Today's Summary (Mocked for now as per requirements) */}
      <div className="bg-primary-50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-primary-900">
          <Clock className="w-5 h-5" />
          <h3 className="font-semibold">Today's Summary</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-primary-700">Work Hours</span>
            <span className="font-medium text-primary-900">
              {record?.checkOut ? '8h 15m' : record?.checkIn ? '2h 45m' : '0h 0m'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-primary-700">Break Time</span>
            <span className="font-medium text-primary-900">0h 30m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
