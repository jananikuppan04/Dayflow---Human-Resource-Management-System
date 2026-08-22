import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import type { Employee } from '../types';
import { EmployeeCard } from '../components/employee/EmployeeCard';
import { EmployeeModal } from '../components/employee/EmployeeModal';
import { AttendanceWidget } from '../components/attendance/AttendanceWidget';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export const EmployeesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [statuses, setStatuses] = useState<Record<string, 'present' | 'leave' | 'absent'>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // If not admin, do not allow access (Role protection)
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const emps = await mockApi.getEmployees();
      setEmployees(emps);
      
      const today = new Date().toISOString().split('T')[0];
      const empIds = emps.map(e => e.id);
      const stats = await mockApi.getAttendanceStatus(empIds, today);
      setStatuses(stats);
    } catch (error) {
      console.error("Failed to load employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const q = searchQuery.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(q) ||
      emp.lastName.toLowerCase().includes(q) ||
      emp.loginId.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/employees/new')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-primary-500/20 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            New Employee
          </button>
          
          <div className="relative w-full sm:w-[380px] text-slate-500">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-12 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Employee Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
            <p className="text-slate-500 text-lg">No employees found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEmployees.map(emp => (
              <EmployeeCard 
                key={emp.id}
                employee={emp}
                status={statuses[emp.id] || 'loading'}
                onClick={setSelectedEmployee}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0">
        <AttendanceWidget />
      </div>

      {/* Modals */}
      {selectedEmployee && (
        <EmployeeModal 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};
