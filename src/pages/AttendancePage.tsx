import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import type { AttendanceRowData } from '../components/attendance/AttendanceTable';
import { AttendanceSummaryCards } from '../components/attendance/AttendanceSummaryCards';
import { ChevronLeft, ChevronRight, Search, Loader2, Filter } from 'lucide-react';

export const AttendancePage = () => {
  const { user } = useAuth();
  
  // State for Admin View
  const [adminDate, setAdminDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('All');
  const [adminData, setAdminData] = useState<AttendanceRowData[]>([]);
  
  // State for Employee View
  const [empMonth, setEmpMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [empData, setEmpData] = useState<AttendanceRowData[]>([]);
  const [empStats, setEmpStats] = useState({ present: 0, leaves: 0, total: 0 });
  
  const [loading, setLoading] = useState(true);

  const statusFilters = ['All', 'Present', 'Leave', 'Absent'];

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
      const q = adminSearch.toLowerCase();
      const n = `${row.employee?.firstName} ${row.employee?.lastName}`.toLowerCase();
      const matchesSearch = !adminSearch || n.includes(q) || row.employee?.loginId.toLowerCase().includes(q);
      const matchesStatus = adminStatusFilter === 'All' || (row.record && row.record.status.toLowerCase() === adminStatusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Attendance Logs & Registers</h1>
            <p className="text-xs text-slate-500 mt-1">Review daily employee check-ins, leaves, and work duration entries.</p>
          </div>
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by employee name or ID..." 
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Date Selector & Status Filter Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <button onClick={() => changeAdminDate(-1)} className="p-2.5 hover:bg-slate-50 border-r border-slate-200 text-slate-600 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => changeAdminDate(1)} className="p-2.5 hover:bg-slate-50 border-r border-slate-200 text-slate-600 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 font-bold text-xs text-slate-700 bg-slate-50 flex items-center min-w-[140px] justify-center">
                {new Date(adminDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="px-4 py-2 font-semibold text-xs text-slate-500 border-l border-slate-200 flex items-center bg-white">
                {new Date(adminDate).toLocaleDateString(undefined, { weekday: 'long' })}
              </div>
            </div>
          </div>

          {/* Status Filter Pills including 'All' */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Status:
            </span>
            {statusFilters.map((st) => (
              <button
                key={st}
                onClick={() => setAdminStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  adminStatusFilter === st
                    ? 'bg-[#714B67] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#714B67]" /></div>
        ) : (
          <AttendanceTable viewType="admin" data={filteredAdminData} />
        )}
      </div>
    );
  }

  // --- EMPLOYEE VIEW ---
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Attendance History</h1>
          <p className="text-xs text-slate-500 mt-1">Detailed monthly log of your daily check-in, check-out, and break times.</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <button onClick={() => changeEmpMonth(-1)} className="p-2.5 hover:bg-slate-50 border-r border-slate-200 text-slate-600 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => changeEmpMonth(1)} className="p-2.5 hover:bg-slate-50 border-r border-slate-200 text-slate-600 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="px-6 py-2 font-bold text-xs text-slate-700 bg-slate-50 flex items-center min-w-[140px] justify-center">
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
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#714B67]" /></div>
        ) : (
          <AttendanceTable viewType="employee" data={empData} />
        )}
      </div>
    </div>
  );
};
