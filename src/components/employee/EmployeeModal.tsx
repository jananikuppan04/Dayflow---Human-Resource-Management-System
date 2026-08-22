import React, { useState, useEffect } from 'react';
import { X, UserPlus, Upload, Building, Mail, Phone, Calendar, Lock, Info, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import type { Employee } from '../../types';

interface EmployeeModalProps {
  isOpen?: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave?: (newEmployeeData: Partial<Employee>) => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen = true, employee, onClose, onSave }) => {
  const [companyName, setCompanyName] = useState<string>('Dayflow Solutions Pvt. Ltd.');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [yearOfJoining, setYearOfJoining] = useState<string>('2026');
  const [password, setPassword] = useState<string>('Dayflow@2026');
  const [confirmPassword, setConfirmPassword] = useState<string>('Dayflow@2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [department, setDepartment] = useState<string>('Engineering');
  const [role, setRole] = useState<'admin' | 'employee'>('employee');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (employee) {
      setEmployeeName(`${employee.firstName} ${employee.lastName}`);
      setEmail(employee.email || '');
      setPhone(employee.phone || employee.mobile || '');
      setDepartment(employee.department || 'Engineering');
    }
  }, [employee]);

  if (!isOpen && !employee) return null;

  // Auto-generate Login ID preview e.g. OIJODO20220001
  const generateLoginId = () => {
    const cleanComp = companyName.trim().replace(/[^a-zA-Z\s]/g, '');
    const compWords = cleanComp.split(/\s+/).filter(Boolean);
    const compCode = compWords.length >= 2 
      ? (compWords[0][0] + compWords[1][0]).toUpperCase()
      : (cleanComp.slice(0, 2).toUpperCase() || 'OI');

    const cleanName = employeeName.trim().replace(/[^a-zA-Z\s]/g, '');
    const nameParts = cleanName.split(/\s+/).filter(Boolean);
    const nameCode = nameParts.length >= 2
      ? (nameParts[0].slice(0, 2) + nameParts[nameParts.length - 1].slice(0, 2)).toUpperCase()
      : (cleanName.slice(0, 4).toUpperCase() || 'JODO');

    return `${compCode}${nameCode}${yearOfJoining}0001`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName.trim() || !email.trim()) {
      setError('Please fill in all required fields marked with *');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const [firstName, ...rest] = employeeName.trim().split(' ');
    const lastName = rest.join(' ') || 'Employee';

    if (onSave) {
      onSave({
        firstName,
        lastName,
        email,
        phone,
        department,
        loginId: generateLoginId(),
        role,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Create Employee Account</h3>
              <p className="text-xs text-slate-500">Fill in the details to create a new employee account</p>
            </div>
          </div>

          {/* Upload Logo / Avatar Placeholder */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-100/50 transition-colors">
              <Upload className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-[9px] font-bold text-slate-400 mt-1">Upload Photo</span>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Company Name */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Employee Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Employee Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter employee full name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Phone & Year of Joining */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Year of Joining <span className="text-red-500">*</span>
              </label>
              <select
                value={yearOfJoining}
                onChange={(e) => setYearOfJoining(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Login ID Auto-Generation Info Banner */}
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              Login ID preview: <strong className="font-mono">{generateLoginId()}</strong> (Generated automatically).
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
