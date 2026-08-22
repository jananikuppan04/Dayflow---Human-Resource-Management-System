import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import { mockApi } from '../services/mockApi';
import type { Employee } from '../types';
import { EmployeeCard } from '../components/employee/EmployeeCard';
import { EmployeeModal } from '../components/employee/EmployeeModal';
import { AttendanceWidget } from '../components/attendance/AttendanceWidget';
import { Search, Plus, Loader2, UserPlus, Filter } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const EmployeesPage = () => {
  const { user } = useAuth();
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [statuses, setStatuses] = useState<Record<string, 'present' | 'leave' | 'absent'>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const departments = ['All', 'Engineering', 'Design', 'Human Resources', 'Marketing'];

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

  const handleSaveNewEmployee = (newEmployeeData: Partial<Employee>) => {
    const newEmp: Employee = {
      id: `emp_${Date.now()}`,
      firstName: newEmployeeData.firstName || 'New',
      lastName: newEmployeeData.lastName || 'Employee',
      email: newEmployeeData.email || 'employee@dayflow.com',
      mobile: newEmployeeData.phone || '+91 98765 00000',
      phone: newEmployeeData.phone || '+91 98765 00000',
      loginId: newEmployeeData.loginId || `EMP-${Date.now().toString().slice(-4)}`,
      role: newEmployeeData.role || 'employee',
      department: newEmployeeData.department || 'Engineering',
      designation: 'Software Engineer',
      company: 'Dayflow Solutions Pvt. Ltd.',
      manager: 'Rohit Sharma',
      location: 'Bangalore, India',
      profilePicture: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
    };

    setEmployees((prev) => [newEmp, ...prev]);
    setIsCreateModalOpen(false);
  };

  const filteredEmployees = employees.filter(emp => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = (
      emp.firstName.toLowerCase().includes(q) ||
      emp.lastName.toLowerCase().includes(q) ||
      emp.loginId.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q)
    );

    const matchesDept = selectedDept === 'All' || emp.department.toLowerCase().includes(selectedDept.toLowerCase());

    return matchesSearch && matchesDept;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Employee Directory</h1>
            <p className="text-xs text-slate-500 mt-1">Manage organization personnel, department assignments, and account creation.</p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Create Employee Account
          </button>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Department Filter Pills including 'All' */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Dept:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedDept === dept
                    ? 'bg-[#714B67] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative text-slate-500 w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Employee Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
            <p className="text-slate-500 text-sm">No employees found matching filter "{selectedDept}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEmployees.map(emp => (
              <EmployeeCard 
                key={emp.id}
                employee={emp}
                status={statuses[emp.id] || 'present'}
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

      {/* Admin Employee Account Creation Modal */}
      {isCreateModalOpen && (
        <EmployeeModal
          isOpen={true}
          employee={null}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSaveNewEmployee}
        />
      )}

      {/* Edit/View Modal */}
      {selectedEmployee && (
        <EmployeeModal 
          isOpen={true}
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};
