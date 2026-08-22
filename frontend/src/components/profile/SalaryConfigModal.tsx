import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Save, Check, RefreshCw } from 'lucide-react';
import type {
  SalaryStructure,
  SalaryComponentConfig,
  DeductionsConfig,
  WorkingScheduleConfig,
} from '../../types/salaryTypes';
import {
  calculateSalaryStructure,
  validateSalaryComponents,
} from '../../services/salaryService';

interface SalaryConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  salaryData: SalaryStructure;
  onSave: (updatedSalary: SalaryStructure) => Promise<void>;
}

export const SalaryConfigModal: React.FC<SalaryConfigModalProps> = ({
  isOpen,
  onClose,
  salaryData,
  onSave,
}) => {
  const [monthlyWage, setMonthlyWage] = useState<number>(salaryData.monthlyWage);
  const [components, setComponents] = useState<SalaryComponentConfig[]>(salaryData.components);
  const [deductions, setDeductions] = useState<DeductionsConfig>(salaryData.deductions);
  const [workingSchedule, setWorkingSchedule] = useState<WorkingScheduleConfig>(
    salaryData.workingSchedule
  );

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMonthlyWage(salaryData.monthlyWage);
      setComponents(JSON.parse(JSON.stringify(salaryData.components)));
      setDeductions({ ...salaryData.deductions });
      setWorkingSchedule({ ...salaryData.workingSchedule });
      setSaveSuccess(false);
      setErrorMsg(null);
    }
  }, [isOpen, salaryData]);

  if (!isOpen) return null;

  // Real-time calculation preview
  const livePreview = calculateSalaryStructure(
    monthlyWage,
    components,
    deductions,
    workingSchedule
  );
  const validation = validateSalaryComponents(monthlyWage, components);

  const handleComponentValueChange = (id: string, newValue: number) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: Math.max(0, newValue) } : c))
    );
  };

  const handleComponentToggle = (id: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleSave = async () => {
    if (!validation.valid) {
      setErrorMsg(validation.errorMsg || 'Component sum exceeds wage.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);
    try {
      await onSave(livePreview);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save salary configuration');
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Configure Salary Structure</h2>
            <p className="text-xs text-slate-500 font-medium">
              Administrator privileges active • Update wage, components & tax settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          {/* Validation Warning Alert */}
          {!validation.valid && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-900">
                  Validation Error
                </h4>
                <p className="text-xs mt-0.5">{validation.errorMsg}</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Base Wages & Working Schedule */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              1. Base Compensation & Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Monthly Wage (₹)
                </label>
                <input
                  type="number"
                  value={monthlyWage}
                  onChange={(e) => setMonthlyWage(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Calculated Yearly Wage (Derived)
                </label>
                <div className="w-full px-3.5 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl font-bold text-slate-700 text-sm">
                  ₹ {formatCurrency(livePreview.yearlyWage)} / year
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Working Days per Week
                </label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={workingSchedule.workingDaysPerWeek}
                  onChange={(e) =>
                    setWorkingSchedule({
                      ...workingSchedule,
                      workingDaysPerWeek: Number(e.target.value),
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Break Time (Hours / Day)
                </label>
                <input
                  type="number"
                  min={0}
                  max={4}
                  step={0.5}
                  value={workingSchedule.breakTimeHoursPerDay}
                  onChange={(e) =>
                    setWorkingSchedule({
                      ...workingSchedule,
                      breakTimeHoursPerDay: Number(e.target.value),
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Salary Component Percentages & Values */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                2. Salary Components Configuration
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Component Total: ₹ {formatCurrency(validation.total)} / ₹ {formatCurrency(monthlyWage)}
              </span>
            </div>

            <div className="space-y-3">
              {components.map((comp) => {
                const liveComp = livePreview.components.find((c) => c.id === comp.id);
                return (
                  <div
                    key={comp.id}
                    className={`p-4 rounded-xl border transition-all ${
                      comp.enabled
                        ? 'bg-slate-50/50 border-slate-200'
                        : 'bg-slate-100/40 border-slate-200/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={comp.enabled}
                          onChange={() => handleComponentToggle(comp.id)}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-sm font-semibold text-slate-900">{comp.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-500 font-medium">
                          {comp.calcType === 'PERCENTAGE_WAGE'
                            ? '% of Wage:'
                            : comp.calcType === 'PERCENTAGE_BASIC'
                            ? '% of Basic:'
                            : 'Fixed Amount (₹):'}
                        </label>
                        <input
                          type="number"
                          value={comp.value}
                          disabled={!comp.enabled}
                          onChange={(e) =>
                            handleComponentValueChange(comp.id, Number(e.target.value))
                          }
                          className="w-24 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-right text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pl-7">
                      <span className="truncate max-w-xs">{comp.description}</span>
                      <span className="font-bold text-slate-800">
                        = ₹ {formatCurrency(liveComp?.amount || 0)} / mo
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Deductions & Taxes */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              3. Deductions & Tax Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Employee PF Contribution Rate (% of Basic)
                </label>
                <input
                  type="number"
                  value={deductions.pfEmployeeRate}
                  onChange={(e) =>
                    setDeductions({ ...deductions, pfEmployeeRate: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Calculated PF: ₹ {formatCurrency(livePreview.deductions.pfEmployeeAmount)} / mo
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Professional Tax (₹ / Month)
                </label>
                <input
                  type="number"
                  value={deductions.professionalTax}
                  onChange={(e) =>
                    setDeductions({ ...deductions, professionalTax: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Income Tax / TDS (₹ / Month)
                </label>
                <input
                  type="number"
                  value={deductions.incomeTaxTds}
                  onChange={(e) =>
                    setDeductions({ ...deductions, incomeTaxTds: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Total Deductions (Calculated)
                </label>
                <div className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 text-sm">
                  ₹ {formatCurrency(livePreview.deductions.totalDeductions)} / mo
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Live Net Salary Summary */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                Estimated Net Take-Home Salary
              </span>
              <span className="text-xs text-emerald-700">Gross Salary - Total Deductions</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-700">
                ₹ {formatCurrency(livePreview.takeHomeSalary)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 ml-1">/ month</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving || !validation.valid}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all ${
              !validation.valid
                ? 'bg-slate-300 cursor-not-allowed shadow-none'
                : saveSuccess
                ? 'bg-emerald-600'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Successfully</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Salary Configuration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
