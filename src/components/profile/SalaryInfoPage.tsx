import React, { useState, useEffect } from 'react';
import { Settings, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import { UserRole, SalaryStructure, EmployeeProfile } from '../../types/salaryTypes';
import { salaryService } from '../../services/salaryService';

import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './ProfileTabs';
import { SalaryOverviewCard } from './SalaryOverviewCard';
import { SalaryComponentsCard } from './SalaryComponentsCard';
import { DeductionsCard } from './DeductionsCard';
import { TakeHomeSalaryCard } from './TakeHomeSalaryCard';
import { AdditionalInfoCard } from './AdditionalInfoCard';
import { SalaryHelpBanner } from './SalaryHelpBanner';
import { SalaryConfigModal } from './SalaryConfigModal';
import { UnauthorizedState } from './UnauthorizedState';

import { PersonalInfoTab } from './PersonalInfoTab';
import { PrivateInfoTab } from './PrivateInfoTab';
import { DocumentsTab } from './DocumentsTab';

interface SalaryInfoPageProps {
  currentRole: UserRole;
}

export const SalaryInfoPage: React.FC<SalaryInfoPageProps> = ({ currentRole }) => {
  const [activeTab, setActiveTab] = useState<string>('salary');
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [salary, setSalary] = useState<SalaryStructure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showPermissionAlert, setShowPermissionAlert] = useState<boolean>(false);

  // Load data on mount
  useEffect(() => {
    loadSalaryData();
  }, []);

  const loadSalaryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await salaryService.getSalaryData('EMP-1001');
      setEmployee(data.employee);
      setSalary(data.salary);
    } catch (err: any) {
      setError(err.message || 'Failed to load employee salary information.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConfig = () => {
    if (currentRole !== 'ADMIN') {
      setShowPermissionAlert(true);
      return;
    }
    setIsModalOpen(true);
  };

  const handleSaveSalary = async (updatedSalary: SalaryStructure) => {
    if (!employee) return;
    const res = await salaryService.updateSalaryData(employee.employeeId, updatedSalary, currentRole);
    if (!res.success) {
      throw new Error(res.error || 'Failed to save configuration');
    }
    if (res.data) {
      setSalary(res.data);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="text-xs font-semibold text-slate-500">Loading profile information...</span>
      </div>
    );
  }

  if (error || !employee || !salary) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800">Error Loading Data</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">{error || 'Salary information unavailable'}</p>
        <button
          onClick={loadSalaryData}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Employee Profile Header */}
      <ProfileHeader employee={employee} />

      {/* 2. Profile Tabs (Personal, Private, Salary, Documents) */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Render selected tab content */}
      {activeTab === 'personal' && <PersonalInfoTab />}
      {activeTab === 'private' && <PrivateInfoTab />}
      {activeTab === 'documents' && <DocumentsTab />}

      {activeTab === 'salary' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Permission restriction warning banner if non-admin attempted edit */}
          {showPermissionAlert && (
            <UnauthorizedState
              message="Only administrators have permission to configure employee salary structures."
              onDismiss={() => setShowPermissionAlert(false)}
            />
          )}

          {/* 3. Salary Information Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Salary Information</h2>
              <p className="text-xs text-slate-500 font-medium">
                View your compensation details and salary breakdown
              </p>
            </div>

            {/* Admin Configuration Button */}
            {currentRole === 'ADMIN' ? (
              <button
                onClick={handleOpenConfig}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Configure Salary</span>
              </button>
            ) : (
              <div
                onClick={handleOpenConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-400 font-medium cursor-not-allowed select-none"
                title="Configuration restricted to Admin role"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Read-Only View</span>
              </div>
            )}
          </div>

          {/* 4. Main 2-Column Responsive Layout matching Dayflow design reference */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 cols wide on desktop): Overview + Components */}
            <div className="lg:col-span-2 space-y-6">
              <SalaryOverviewCard salary={salary} />
              <SalaryComponentsCard salary={salary} />
            </div>

            {/* Right Column (1 col wide on desktop): Deductions + Take-Home + Additional Info */}
            <div className="lg:col-span-1 space-y-6">
              <DeductionsCard deductions={salary.deductions} />
              <TakeHomeSalaryCard takeHomeSalary={salary.takeHomeSalary} />
              <AdditionalInfoCard employee={employee} />
            </div>
          </div>

          {/* 5. Bottom Informational Help Section */}
          <SalaryHelpBanner />

          {/* 6. Admin Configuration Drawer/Modal */}
          <SalaryConfigModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            salaryData={salary}
            onSave={handleSaveSalary}
          />
        </div>
      )}
    </div>
  );
};
