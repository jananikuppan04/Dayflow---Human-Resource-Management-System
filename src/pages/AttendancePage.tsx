import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import type { AttendanceRowData } from '../components/attendance/AttendanceTable';
import { AdminSummaryCards, EmployeeSummaryCards } from '../components/attendance/AttendanceSummaryCards';
import { AttendanceDetailDrawer } from '../components/attendance/AttendanceDetailDrawer';
import { EditAttendanceModal } from '../components/attendance/EditAttendanceModal';
import { TodayAttendanceCard } from '../components/attendance/TodayAttendanceCard';
import { AttendanceCalendar } from '../components/attendance/AttendanceCalendar';
import { WorkingHoursChart } from '../components/attendance/WorkingHoursChart';
import { PayrollSummaryCard } from '../components/attendance/PayrollSummaryCard';
import type { AttendanceRecord, Employee, AttendanceStatus } from '../types';
import {
  ChevronLeft, ChevronRight, Search, Filter, Download,
  Loader2, X, CheckCircle2, XCircle, SlidersHorizontal
} from 'lucide-react';

// ─── Toast ──────────────────────────────────────────────────────────────────
interface ToastMsg { id: number; type: 'success' | 'error'; message: string; sub?: string; }
let toastId = 0;

const Toast: React.FC<{ toasts: ToastMsg[]; onRemove: (id: number) => void }> = ({ toasts, onRemove }) => (
  <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
    {toasts.map(t => (
      <div
        key={t.id}
        className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm min-w-[260px] max-w-[340px] animate-[slideIn_0.3s_ease-out]
          ${t.type === 'success' ? 'bg-white border-emerald-200 border-l-4 border-l-emerald-500' : 'bg-white border-red-200 border-l-4 border-l-red-500'}`}
      >
        {t.type === 'success'
          ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
        <div className="flex-1">
          <p className="font-semibold text-slate-800">{t.message}</p>
          {t.sub && <p className="text-xs text-slate-400 mt-0.5">{t.sub}</p>}
        </div>
        <button onClick={() => onRemove(t.id)} className="text-slate-300 hover:text-slate-500 flex-shrink-0">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ))}
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
export const AttendancePage = () => {
  const { user } = useAuth();

  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const showToast = useCallback((type: 'success' | 'error', message: string, sub?: string) => {
    const id = ++toastId;
    setToasts(p => [...p, { id, type, message, sub }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = useCallback((id: number) => setToasts(p => p.filter(t => t.id !== id)), []);

  // ── Admin State ──
  const [adminDate, setAdminDate] = useState(new Date().toISOString().split('T')[0]);
  const [adminData, setAdminData] = useState<AttendanceRowData[]>([]);
  const [adminSummary, setAdminSummary] = useState({ present: 0, absent: 0, leave: 0, late: 0, halfDay: 0 });
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilter, setAdminFilter] = useState<AttendanceStatus | 'all'>('all');
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminAnalytics, setAdminAnalytics] = useState<{ date: string; label: string; workHours: number; extraHours: number }[]>([]);

  // Drawer / Modal
  const [selectedRow, setSelectedRow] = useState<AttendanceRowData | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // ── Employee State ──
  const [empMonth, setEmpMonth] = useState(new Date().toISOString().slice(0, 7));
  const [empData, setEmpData] = useState<AttendanceRowData[]>([]);
  const [empStats, setEmpStats] = useState({ present: 0, leaves: 0, halfDays: 0, late: 0, total: 0, workingHours: '0h' });
  const [empTodayRecord, setEmpTodayRecord] = useState<AttendanceRecord | null>(null);
  const [empAnalytics, setEmpAnalytics] = useState<{ date: string; label: string; workHours: number; extraHours: number }[]>([]);
  const [empLoading, setEmpLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [selectedCalDate, setSelectedCalDate] = useState(new Date().toISOString().split('T')[0]);
  const [calMonth, setCalMonth] = useState(new Date().toISOString().slice(0, 7));

  const isAdmin = user?.role === 'admin';

  // ── Load Admin Data ──
  const loadAdminData = useCallback(async () => {
    setAdminLoading(true);
    try {
      // Build org-wide weekly analytics by averaging all employees
      const buildAdminAnalytics = async () => {
        const results: { date: string; label: string; workHours: number; extraHours: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - 86400000 * i);
          const dateStr = d.toISOString().split('T')[0];
          const label = d.toLocaleDateString('en-US', { weekday: 'short' });
          const dayList = await mockApi.getDailyAttendanceList(dateStr);
          const presentRecs = dayList.filter(r => r.record?.workHours && r.record.status !== 'absent' && r.record.status !== 'leave');
          let totalWork = 0, totalExtra = 0;
          presentRecs.forEach(r => {
            const wm = r.record?.workHours?.match(/(\d+)h\s*(\d+)m/);
            const em = r.record?.extraHours?.match(/(\d+)h\s*(\d+)m/);
            if (wm) totalWork += parseInt(wm[1]) + parseInt(wm[2]) / 60;
            if (em) totalExtra += parseInt(em[1]) + parseInt(em[2]) / 60;
          });
          const count = presentRecs.length || 1;
          results.push({
            date: dateStr,
            label,
            workHours: parseFloat((totalWork / count).toFixed(1)),
            extraHours: parseFloat((totalExtra / count).toFixed(1)),
          });
        }
        return results;
      };

      const [list, summary, analytics] = await Promise.all([
        mockApi.getDailyAttendanceList(adminDate),
        mockApi.getDailySummary(adminDate),
        buildAdminAnalytics(),
      ]);
      setAdminData(list.map(r => ({ record: r.record, employee: r.employee })));
      setAdminSummary(summary);
      setAdminAnalytics(analytics);
    } catch (e) { console.error(e); }
    finally { setAdminLoading(false); }
  }, [adminDate]);

  // ── Load Employee Data ──
  const loadEmployeeData = useCallback(async () => {
    if (!user?.employeeId) return;
    setEmpLoading(true);
    try {
      const [hist, today, analytics] = await Promise.all([
        mockApi.getEmployeeAttendanceHistory(user.employeeId, empMonth),
        mockApi.getTodayAttendance(user.employeeId),
        mockApi.getWeeklyAnalytics(user.employeeId),
      ]);
      setEmpData(hist.records.map(r => ({ record: r, date: r.date })));
      setEmpStats(hist.stats);
      setEmpTodayRecord(today);
      setEmpAnalytics(analytics);
    } catch (e) { console.error(e); }
    finally { setEmpLoading(false); }
  }, [user?.employeeId, empMonth]);

  useEffect(() => {
    if (!user) return;
    if (isAdmin) loadAdminData();
    else loadEmployeeData();
  }, [user, isAdmin, loadAdminData, loadEmployeeData]);

  // ── Admin helpers ──
  const changeAdminDate = (days: number) => {
    const d = new Date(adminDate);
    d.setDate(d.getDate() + days);
    setAdminDate(d.toISOString().split('T')[0]);
  };

  const handleRowClick = (row: AttendanceRowData) => {
    setSelectedRow(row);
    setSelectedEmployee(row.employee || null);
    setDrawerOpen(true);
  };

  const handleEditSave = async (recordId: string, updates: Partial<Pick<AttendanceRecord, 'checkIn' | 'checkOut' | 'status' | 'remarks'>>) => {
    await mockApi.editAttendance(recordId, updates);
    showToast('success', 'Attendance updated successfully', `Changes saved for ${selectedEmployee?.firstName}`);
    setEditOpen(false);
    loadAdminData();
  };

  // ── Employee helpers ──
  const handleCheckIn = async () => {
    if (!user?.employeeId) return;
    setCheckingIn(true);
    try {
      const rec = await mockApi.checkIn(user.employeeId);
      setEmpTodayRecord(rec);
      showToast('success', 'Attendance marked successfully', `Check-in recorded at ${new Date(rec.checkIn!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`);
    } catch (e: unknown) {
      showToast('error', 'Check-in failed', (e as Error).message);
    } finally { setCheckingIn(false); }
  };

  const handleCheckOut = async () => {
    if (!user?.employeeId) return;
    setCheckingIn(true);
    try {
      const rec = await mockApi.checkOut(user.employeeId);
      setEmpTodayRecord(rec);
      showToast('success', 'Checked out successfully', `Work hours: ${rec.workHours}`);
      loadEmployeeData();
    } catch (e: unknown) {
      showToast('error', 'Check-out failed', (e as Error).message);
    } finally { setCheckingIn(false); }
  };

  const changeEmpMonth = (months: number) => {
    const d = new Date(empMonth + '-01');
    d.setMonth(d.getMonth() + months);
    setEmpMonth(d.toISOString().slice(0, 7));
    setCalMonth(d.toISOString().slice(0, 7));
  };

  const calDayStatuses = empData.map(row => ({
    date: row.record?.date || row.date || '',
    status: row.record?.status || null,
  }));

  const filteredAdminData = adminData.filter(row => {
    const q = adminSearch.toLowerCase();
    const nameMatch = q ? `${row.employee?.firstName} ${row.employee?.lastName}`.toLowerCase().includes(q) || row.employee?.loginId.toLowerCase().includes(q) : true;
    const statusMatch = adminFilter === 'all' ? true : row.record?.status === adminFilter;
    return nameMatch && statusMatch;
  });

  const adminDateLabel = new Date(adminDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
  });

  const filterOptions: { value: AttendanceStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Employees' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'half_day', label: 'Half Day' },
    { value: 'leave', label: 'On Leave' },
  ];

  if (!user) return null;

  // ─────────────────────────────────────────────────────────────────
  // ADMIN VIEW
  // ─────────────────────────────────────────────────────────────────
  if (isAdmin) {
    return (
      <>
        <Toast toasts={toasts} onRemove={removeToast} />

        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance</h1>
              <p className="text-sm text-slate-400 mt-0.5">Monitor employee attendance, working hours, and daily activity.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-200 bg-white px-4 py-2 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          {adminLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 h-32 animate-pulse">
                  <div className="w-11 h-11 bg-slate-100 rounded-xl mb-3" />
                  <div className="h-7 bg-slate-100 rounded w-16 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-24" />
                </div>
              ))}
            </div>
          ) : (
            <AdminSummaryCards
              present={adminSummary.present}
              absent={adminSummary.absent}
              leave={adminSummary.leave}
              late={adminSummary.late}
              total={adminData.length}
            />
          )}

          {/* Filter Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
            {/* Date Navigator */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex-shrink-0">
              <button onClick={() => changeAdminDate(-1)} className="p-2 hover:bg-slate-100 transition-colors border-r border-slate-200">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <span className="px-4 py-2 text-sm font-semibold text-slate-700 min-w-[180px] text-center">{adminDateLabel}</span>
              <button onClick={() => changeAdminDate(1)} className="p-2 hover:bg-slate-100 transition-colors border-l border-slate-200">
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="flex-1 flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[160px] max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-slate-50"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-1.5 text-slate-500 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <select
                    value={adminFilter}
                    onChange={(e) => setAdminFilter(e.target.value as AttendanceStatus | 'all')}
                    className="bg-transparent border-none outline-none text-sm font-medium text-slate-600 cursor-pointer"
                  >
                    {filterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <span className="text-xs text-slate-400 font-medium ml-auto">
                {filteredAdminData.length} record{filteredAdminData.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Attendance Table Card */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-slate-800">Employee Attendance</h2>
                <p className="text-xs text-slate-400">Daily attendance records for all employees</p>
              </div>
            </div>

            {adminLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-12 bg-slate-50 border-b border-slate-100 animate-pulse" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-slate-100 rounded animate-pulse w-36" />
                      <div className="h-2.5 bg-slate-100 rounded animate-pulse w-24" />
                    </div>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="h-3.5 bg-slate-100 rounded animate-pulse w-16" />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <AttendanceTable
                viewType="admin"
                data={filteredAdminData}
                onRowClick={handleRowClick}
              />
            )}
          </div>

          {/* Bottom: Working Hours Chart + Payroll Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              {adminLoading ? (
                <div className="bg-white rounded-2xl border border-slate-200 h-56 animate-pulse" />
              ) : (
                <WorkingHoursChart data={adminAnalytics} />
              )}
            </div>
            <PayrollSummaryCard
              totalWorkingDays={22}
              presentDays={adminSummary.present}
              paidLeave={adminSummary.leave}
              unpaidLeave={0}
              missingAttendance={adminSummary.absent}
            />
          </div>
        </div>

        {/* Detail Drawer */}
        <AttendanceDetailDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          record={selectedRow?.record ?? null}
          employee={selectedEmployee}
          onEdit={() => { setDrawerOpen(false); setEditOpen(true); }}
        />

        {/* Edit Modal */}
        <EditAttendanceModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          record={selectedRow?.record ?? null}
          employee={selectedEmployee}
          onSave={handleEditSave}
        />
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // EMPLOYEE VIEW
  // ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Attendance</h1>
            <p className="text-sm text-slate-400 mt-0.5">Track your working hours and attendance history.</p>
          </div>
        </div>

        {/* Summary Cards */}
        {empLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 h-32 animate-pulse">
                <div className="w-11 h-11 bg-slate-100 rounded-xl mb-3" />
                <div className="h-7 bg-slate-100 rounded w-16 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-24" />
              </div>
            ))}
          </div>
        ) : (
          <EmployeeSummaryCards
            workingDays={empStats.total || 22}
            present={empStats.present}
            leaves={empStats.leaves}
            totalWorkingHours={empStats.workingHours}
          />
        )}

        {/* Main grid: Today Card + Calendar | Analytics + History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="space-y-5">
            <TodayAttendanceCard
              record={empTodayRecord}
              employeeId={user.employeeId || ''}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              loading={checkingIn}
            />
            <AttendanceCalendar
              month={calMonth}
              onPrev={() => {
                const d = new Date(calMonth + '-01');
                d.setMonth(d.getMonth() - 1);
                setCalMonth(d.toISOString().slice(0, 7));
              }}
              onNext={() => {
                const d = new Date(calMonth + '-01');
                d.setMonth(d.getMonth() + 1);
                setCalMonth(d.toISOString().slice(0, 7));
              }}
              dayStatuses={calDayStatuses}
              selectedDate={selectedCalDate}
              onSelectDate={setSelectedCalDate}
            />
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Working Hours Chart */}
            {empLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 h-48 animate-pulse" />
            ) : (
              <WorkingHoursChart data={empAnalytics} />
            )}

            {/* Payroll Summary */}
            <PayrollSummaryCard
              totalWorkingDays={22}
              presentDays={empStats.present}
              paidLeave={empStats.leaves}
              unpaidLeave={0}
              missingAttendance={Math.max(0, 22 - empStats.total)}
            />
          </div>
        </div>

        {/* Attendance History */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">Attendance History</h2>
              <p className="text-xs text-slate-400">Your attendance records for the selected month</p>
            </div>
            {/* Month Navigation */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
              <button onClick={() => changeEmpMonth(-1)} className="p-2 hover:bg-slate-50 transition-colors border-r border-slate-200">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <span className="px-5 py-2 text-sm font-semibold text-slate-700 min-w-[130px] text-center">
                {new Date(empMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => changeEmpMonth(1)} className="p-2 hover:bg-slate-50 transition-colors border-l border-slate-200">
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {empLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-12 bg-slate-50 border-b border-slate-100 animate-pulse" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="h-3.5 bg-slate-100 rounded animate-pulse flex-1" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <AttendanceTable
              viewType="employee"
              data={empData}
              emptyLabel="No attendance records found for this month."
            />
          )}
        </div>
      </div>
    </>
  );
};
