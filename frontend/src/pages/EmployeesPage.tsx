import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import { Employee } from '../types';
import { EmployeeCard } from '../components/employee/EmployeeCard';
import { EmployeeModal } from '../components/employee/EmployeeModal';
import { AttendanceWidget } from '../components/attendance/AttendanceWidget';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const EmployeesPage = () => {
  const { user } = useAuth();
  
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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            New Employee
          </button>
          
          <div className="relative w-full sm:w-80 text-slate-500">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
            />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      <div className="w-full lg:w-80 flex-shrink-0">
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
