import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import type { AttendanceRowData } from '../components/attendance/AttendanceTable';
import { AttendanceSummaryCards } from '../components/attendance/AttendanceSummaryCards';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';

export const AttendancePage = () => {
  const { user } = useAuth();
  
  // State for Admin View
  const [adminDate, setAdminDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminData, setAdminData] = useState<AttendanceRowData[]>([]);
  
  // State for Employee View
  const [empMonth, setEmpMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [empData, setEmpData] = useState<AttendanceRowData[]>([]);
  const [empStats, setEmpStats] = useState({ present: 0, leaves: 0, total: 0 });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    if (user.role === 'admin') {
      loadAdminData();
    } else {
      loadEmployeeData();
    }
  }, [user, adminDate, empMonth]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const results = await mockApi.getDailyAttendanceList(adminDate);
      const mapped: AttendanceRowData[] = results.map(r => ({
        record: r.record,
        employee: r.employee
      }));
      setAdminData(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployeeData = async () => {
    if (!user?.employeeId) return;
    setLoading(true);
    try {
      const result = await mockApi.getEmployeeAttendanceHistory(user.employeeId, empMonth);
      const mapped: AttendanceRowData[] = result.records.map(r => ({
        record: r,
        date: r.date
      }));
      setEmpData(mapped);
      setEmpStats(result.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const changeAdminDate = (days: number) => {
    const d = new Date(adminDate);
    d.setDate(d.getDate() + days);
    setAdminDate(d.toISOString().split('T')[0]);
  };

  const changeEmpMonth = (months: number) => {
    const d = new Date(empMonth + '-01');
    d.setMonth(d.getMonth() + months);
    setEmpMonth(d.toISOString().slice(0, 7));
  };

  if (!user) return null;

  // --- ADMIN VIEW ---
  if (user.role === 'admin') {
    const filteredAdminData = adminData.filter(row => {
      if (!adminSearch) return true;
      const q = adminSearch.toLowerCase();
      const n = `${row.employee?.firstName} ${row.employee?.lastName}`.toLowerCase();
      return n.includes(q) || row.employee?.loginId.toLowerCase().includes(q);
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
          
          <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <button onClick={() => changeAdminDate(-1)} className="p-2 hover:bg-slate-50 border-r border-slate-200 text-slate-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => changeAdminDate(1)} className="p-2 hover:bg-slate-50 border-r border-slate-200 text-slate-600">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 font-medium text-slate-700 bg-slate-50 flex items-center min-w-[140px] justify-center">
              {new Date(adminDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="px-4 py-2 font-medium text-slate-500 border-l border-slate-200 flex items-center bg-white">
              {new Date(adminDate).toLocaleDateString(undefined, { weekday: 'long' })}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
        ) : (
          <AttendanceTable viewType="admin" data={filteredAdminData} />
        )}
      </div>
    );
  }

  // --- EMPLOYEE VIEW ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <button onClick={() => changeEmpMonth(-1)} className="p-2 hover:bg-slate-50 border-r border-slate-200 text-slate-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => changeEmpMonth(1)} className="p-2 hover:bg-slate-50 border-r border-slate-200 text-slate-600">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="px-6 py-2 font-medium text-slate-700 bg-slate-50 flex items-center min-w-[140px] justify-center">
            {new Date(empMonth + '-01').toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>

      <AttendanceSummaryCards 
        present={empStats.present} 
        leaves={empStats.leaves} 
        totalWorkingDays={empStats.total} 
      />

      <div className="pt-2">
        <h2 className="text-lg font-bold text-slate-800 text-center mb-6">
          {new Date(empMonth + '-01').toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
        ) : (
          <AttendanceTable viewType="employee" data={empData} />
        )}
      </div>
    </div>
  );
};
