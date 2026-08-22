import React, { useState, useEffect } from 'react';
import { Wallet, Download, Printer, ShieldCheck, CheckCircle2, ChevronRight, FileText, Lock, Building, Calendar } from 'lucide-react';
import { salaryService } from '../services/salaryService';
import { SalaryStructure, UserRole } from '../types/salaryTypes';

interface PayrollPageProps {
  currentRole?: UserRole;
}

export const PayrollPage: React.FC<PayrollPageProps> = ({ currentRole = 'ADMIN' }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August 2026');
  const [showPayslipModal, setShowPayslipModal] = useState<boolean>(false);
  const [salaryData, setSalaryData] = useState<SalaryStructure | null>(null);

  useEffect(() => {
    salaryService.getSalaryData('EMP-1001').then((res) => {
      setSalaryData(res.salary);
    });
  }, []);

  const employeesPayroll = [
    { id: 'OIJODO20220001', name: 'Janani Devi', role: 'Software Engineer', dept: 'Engineering', wage: 50000, net: 42300, status: 'Processed' },
    { id: 'OIMABR20260002', name: 'Michael Brown', role: 'HR Executive', dept: 'Human Resources', wage: 45000, net: 38100, status: 'Processed' },
  ];

  if (!salaryData) return null;

  const basic = salaryData.components.find((c) => c.id === 'comp_basic')?.amount || 25000;
  const hra = salaryData.components.find((c) => c.id === 'comp_hra')?.amount || 12500;
  const std = salaryData.components.find((c) => c.id === 'comp_standard')?.amount || 4167.5;
  const bonus = salaryData.components.find((c) => c.id === 'comp_bonus')?.amount || 2082.5;
  const lta = salaryData.components.find((c) => c.id === 'comp_lta')?.amount || 2082.5;
  const fixed = salaryData.components.find((c) => c.id === 'comp_fixed')?.amount || 2917.5;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 bg-[#714B67]/20 text-[#c7a9c1] rounded-xl border border-purple-400/20">
              <Wallet className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Payroll & Salary Management</h1>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm">
            {currentRole === 'ADMIN'
              ? 'Manage organization payroll, review component accuracy, and disburse monthly payslips.'
              : 'Read-only access to your official monthly salary structure, deductions, and downloadable payslips.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#714B67] cursor-pointer"
          >
            <option value="August 2026" className="bg-slate-900">August 2026</option>
            <option value="July 2026" className="bg-slate-900">July 2026</option>
            <option value="June 2026" className="bg-slate-900">June 2026</option>
          </select>

          <button
            onClick={() => setShowPayslipModal(true)}
            className="bg-[#714B67] hover:bg-[#5f3e56] text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Payslip PDF
          </button>
        </div>
      </div>

      {/* Salary Overview Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Monthly Gross Wage</span>
          <span className="text-2xl font-extrabold text-slate-800">₹{salaryData.monthlyWage.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-slate-400 block mt-1">₹{salaryData.yearlyWage.toLocaleString('en-IN')} / year</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Deductions</span>
          <span className="text-2xl font-extrabold text-red-600">₹{salaryData.deductions.totalDeductions.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-slate-400 block mt-1">PF (₹3k) + PT (₹200) + TDS (₹4.5k)</span>
        </div>

        <div className="bg-gradient-to-br from-[#714B67] to-[#5f3e56] rounded-2xl p-5 text-white shadow-lg shadow-purple-600/20">
          <span className="text-xs font-bold text-purple-100 uppercase tracking-wider block mb-1">Net Take-Home Pay</span>
          <span className="text-2xl font-extrabold font-mono">₹{salaryData.takeHomeSalary.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-purple-100 block mt-1">Disbursed on 30th of each month</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Payroll Status</span>
          <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-lg mt-1">
            <ShieldCheck className="w-5 h-5" />
            <span>Active & Approved</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">{selectedMonth} Disbursement</span>
        </div>
      </div>

      {/* Admin View: Organization Payroll Directory */}
      {currentRole === 'ADMIN' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Organization Payroll Register</h3>
              <p className="text-xs text-slate-500">Employee monthly wage disbursements and processing status</p>
            </div>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
              {employeesPayroll.length} / {employeesPayroll.length} Employees Processed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Employee ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4 text-right">Gross Wage</th>
                  <th className="py-3 px-4 text-right">Net Salary</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {employeesPayroll.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-500">{emp.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{emp.name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{emp.dept}</td>
                    <td className="py-3.5 px-4 text-right font-bold">₹{emp.wage.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-[#714B67]">₹{emp.net.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setShowPayslipModal(true)}
                        className="text-[#714B67] font-bold hover:underline cursor-pointer"
                      >
                        View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Salary Component Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Components */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Itemized Salary Earnings</span>
            <span className="text-xs text-[#714B67] font-bold">₹{salaryData.grossSalary.toLocaleString('en-IN')} / mo</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-700">Basic Salary (50.00% of wage)</span>
              <span className="font-mono font-bold text-slate-900">₹{basic.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-700">House Rent Allowance - HRA (50.00% of Basic)</span>
              <span className="font-mono font-bold text-slate-900">₹{hra.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-700">Standard Allowance (16.67% of Basic)</span>
              <span className="font-mono font-bold text-slate-900">₹{std.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-700">Performance Bonus (8.33% of Basic)</span>
              <span className="font-mono font-bold text-slate-900">₹{bonus.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-700">Leave Travel Allowance - LTA (8.33% of Basic)</span>
              <span className="font-mono font-bold text-slate-900">₹{lta.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-700">Fixed Allowance (Residual / 11.67% of Basic)</span>
              <span className="font-mono font-bold text-slate-900">₹{fixed.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Deductions Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Statutory Deductions</span>
            <span className="text-xs text-red-600 font-bold">₹{salaryData.deductions.totalDeductions.toLocaleString('en-IN')} / mo</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-red-50/50">
              <span className="font-semibold text-slate-700">Provident Fund - PF (12% of Basic)</span>
              <span className="font-mono font-bold text-red-600">₹{salaryData.deductions.pfEmployeeAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-red-50/50">
              <span className="font-semibold text-slate-700">Professional Tax (PT)</span>
              <span className="font-mono font-bold text-red-600">₹{salaryData.deductions.professionalTax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-red-50/50">
              <span className="font-semibold text-slate-700">Tax Deducted at Source (TDS)</span>
              <span className="font-mono font-bold text-red-600">₹{salaryData.deductions.incomeTaxTds.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-[11px] text-purple-700 mt-2">
              <span className="font-bold block mb-0.5">Employer PF Contribution:</span>
              Employer contributes an additional ₹{salaryData.deductions.pfEmployerAmount.toLocaleString('en-IN')} towards your PF account monthly.
            </div>
          </div>
        </div>
      </div>

      {/* Printable Payslip Modal */}
      {showPayslipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden p-8 space-y-6 animate-in zoom-in-95">
            {/* Company Branding Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Odoo India Solutions Pvt. Ltd.</h2>
                <p className="text-xs text-slate-500">Official Salary Slip for the month of {selectedMonth}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">CONFIDENTIAL</span>
              </div>
            </div>

            {/* Employee Particulars */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">Employee Name:</span>
                <span className="font-bold text-slate-800 text-sm">Janani Devi</span>
              </div>
              <div>
                <span className="text-slate-400 block">Designation / Role:</span>
                <span className="font-bold text-slate-800 text-sm">Software Engineer</span>
              </div>
              <div>
                <span className="text-slate-400 block">Employee ID:</span>
                <span className="font-mono font-bold text-slate-700">OIJODO20220001</span>
              </div>
              <div>
                <span className="text-slate-400 block">Bank Account:</span>
                <span className="font-mono font-bold text-slate-700">HDFC Bank ••••• 4829</span>
              </div>
            </div>

            {/* Earnings & Deductions Table */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1">Earnings</h4>
                <div className="flex justify-between"><span>Basic Salary</span><span>₹{basic.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>HRA</span><span>₹{hra.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Standard Allowance</span><span>₹{std.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Performance Bonus</span><span>₹{bonus.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Leave Travel Allowance</span><span>₹{lta.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Fixed Allowance</span><span>₹{fixed.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between font-bold border-t pt-1"><span>Total Gross</span><span>₹{salaryData.grossSalary.toLocaleString('en-IN')}</span></div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1">Deductions</h4>
                <div className="flex justify-between"><span>Provident Fund (PF)</span><span>₹{salaryData.deductions.pfEmployeeAmount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Professional Tax</span><span>₹{salaryData.deductions.professionalTax.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>TDS / Income Tax</span><span>₹{salaryData.deductions.incomeTaxTds.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between font-bold border-t pt-1 text-red-600"><span>Total Deductions</span><span>₹{salaryData.deductions.totalDeductions.toLocaleString('en-IN')}</span></div>
              </div>
            </div>

            {/* Net Pay Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-sm">NET AMOUNT PAYABLE:</span>
              <span className="font-extrabold text-emerald-700 text-xl">₹{salaryData.takeHomeSalary.toLocaleString('en-IN')}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPayslipModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#714B67] text-white hover:bg-[#5f3e56] flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
