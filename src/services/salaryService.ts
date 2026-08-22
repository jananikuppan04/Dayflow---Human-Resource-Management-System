import {
  SalaryStructure,
  SalaryComponentConfig,
  EmployeeProfile,
  DeductionsConfig,
  WorkingScheduleConfig,
  UserRole,
} from '../types/salaryTypes';

// Initial default employee profile matching Dayflow design reference
export const DEFAULT_EMPLOYEE_PROFILE: EmployeeProfile = {
  id: 'emp_1001',
  employeeId: 'EMP-1001',
  name: 'Janani Devi',
  designation: 'Software Engineer',
  email: 'janani.dev@email.com',
  phone: '+91 98765 43210',
  company: 'Dayflow Solutions Pvt. Ltd.',
  department: 'Engineering',
  manager: 'Rohit Sharma',
  location: 'Bangalore, India',
  payGrade: 'SG-2',
  employmentType: 'Full Time',
  effectiveFrom: '01 Jan 2026',
  lastUpdated: '01 Aug 2026',
};

// Initial component templates based on hand-drawn sketch requirements & reference UI
const DEFAULT_COMPONENT_TEMPLATES: SalaryComponentConfig[] = [
  {
    id: 'comp_basic',
    name: 'Basic Salary',
    description: 'Basic salary from company cost component based on monthly wages.',
    calcType: 'PERCENTAGE_WAGE',
    value: 50, // 50% of Wage = ₹25,000
    amount: 25000,
    percentageOfWage: 50,
    enabled: true,
  },
  {
    id: 'comp_hra',
    name: 'House Rent Allowance (HRA)',
    description: 'HRA provided to employees based on configured percentage of basic salary.',
    calcType: 'PERCENTAGE_BASIC',
    value: 50, // 50% of Basic = ₹12,500
    amount: 12500,
    percentageOfWage: 25,
    enabled: true,
  },
  {
    id: 'comp_standard',
    name: 'Standard Allowance',
    description: 'A standard allowance is a predetermined fixed amount provided to employees as part of salary.',
    calcType: 'PERCENTAGE_WAGE',
    value: 16.0, // 16% of Wage = ₹8,000 or fixed allowance
    amount: 8000,
    percentageOfWage: 16,
    enabled: true,
  },
  {
    id: 'comp_bonus',
    name: 'Performance Bonus',
    description: 'Variable component defined by company and calculated based on basic salary.',
    calcType: 'PERCENTAGE_BASIC',
    value: 10, // 10% of Basic = ₹2,500
    amount: 2500,
    percentageOfWage: 5,
    enabled: true,
  },
  {
    id: 'comp_lta',
    name: 'Leave Travel Allowance',
    description: 'LTA paid by company to employees to cover travel expenses.',
    calcType: 'PERCENTAGE_BASIC',
    value: 8, // 8% of Basic = ₹2,000
    amount: 2000,
    percentageOfWage: 4,
    enabled: true,
  },
];

export const DEFAULT_WORKING_SCHEDULE: WorkingScheduleConfig = {
  workingDaysPerWeek: 5,
  breakTimeHoursPerDay: 1,
};

export const DEFAULT_DEDUCTIONS_CONFIG: DeductionsConfig = {
  pfEmployeeRate: 12, // 12% of basic = 3000
  pfEmployerRate: 12, // 12% of basic = 3000
  pfEmployeeAmount: 3000,
  pfEmployerAmount: 3000,
  professionalTax: 200,
  incomeTaxTds: 4500,
  totalDeductions: 7700,
};

/**
 * Pure calculation function to recalculate full salary structure from inputs.
 */
export function calculateSalaryStructure(
  monthlyWage: number,
  componentsConfig: SalaryComponentConfig[],
  deductionsInput: Partial<DeductionsConfig>,
  scheduleInput: Partial<WorkingScheduleConfig> = DEFAULT_WORKING_SCHEDULE
): SalaryStructure {
  const safeWage = Math.max(0, monthlyWage);
  const yearlyWage = safeWage * 12;

  // 1. Calculate Basic Salary first (used as base for HRA/PF/Bonus/LTA)
  const basicComp = componentsConfig.find((c) => c.id === 'comp_basic');
  let basicAmount = 0;
  if (basicComp && basicComp.enabled) {
    if (basicComp.calcType === 'PERCENTAGE_WAGE') {
      basicAmount = (safeWage * basicComp.value) / 100;
    } else {
      basicAmount = basicComp.value;
    }
  }

  // 2. Compute each active component amount
  let totalExplicitComponents = 0;
  const recalculatedComponents: SalaryComponentConfig[] = componentsConfig.map((c) => {
    if (!c.enabled) {
      return { ...c, amount: 0, percentageOfWage: 0 };
    }

    let compAmount = 0;
    if (c.calcType === 'PERCENTAGE_WAGE') {
      compAmount = (safeWage * c.value) / 100;
    } else if (c.calcType === 'PERCENTAGE_BASIC') {
      compAmount = (basicAmount * c.value) / 100;
    } else if (c.calcType === 'FIXED') {
      compAmount = c.value;
    }

    // round to 2 decimals
    compAmount = Math.round(compAmount * 100) / 100;
    totalExplicitComponents += compAmount;

    const percentageOfWage = safeWage > 0 ? Math.round((compAmount / safeWage) * 10000) / 100 : 0;

    return {
      ...c,
      amount: compAmount,
      percentageOfWage,
    };
  });

  // 3. Compute Gross Salary
  const grossSalary = Math.round(totalExplicitComponents * 100) / 100;

  // 4. Calculate PF & Tax Deductions
  const pfEmpRate = deductionsInput.pfEmployeeRate ?? 12;
  const pfEmployerRate = deductionsInput.pfEmployerRate ?? 12;
  const pfEmployeeAmount = Math.round(((basicAmount * pfEmpRate) / 100) * 100) / 100;
  const pfEmployerAmount = Math.round(((basicAmount * pfEmployerRate) / 100) * 100) / 100;
  const profTax = deductionsInput.professionalTax ?? 200;
  const incomeTaxTds = deductionsInput.incomeTaxTds ?? 4500;

  const totalDeductions = Math.round((pfEmployeeAmount + profTax + incomeTaxTds) * 100) / 100;

  // 5. Calculate Take-Home Salary (Net Pay)
  const takeHomeSalary = Math.max(0, Math.round((grossSalary - totalDeductions) * 100) / 100);

  return {
    monthlyWage: safeWage,
    yearlyWage,
    nextPayoutDate: '30 Aug, 2026',
    paymentMode: 'Bank Transfer',
    bankName: 'HDFC Bank',
    workingSchedule: {
      workingDaysPerWeek: scheduleInput.workingDaysPerWeek ?? 5,
      breakTimeHoursPerDay: scheduleInput.breakTimeHoursPerDay ?? 1,
    },
    components: recalculatedComponents,
    deductions: {
      pfEmployeeRate: pfEmpRate,
      pfEmployerRate,
      pfEmployeeAmount,
      pfEmployerAmount,
      professionalTax: profTax,
      incomeTaxTds,
      totalDeductions,
    },
    grossSalary,
    takeHomeSalary,
  };
}

/**
 * Validates that component total does not exceed defined monthly wage.
 */
export function validateSalaryComponents(
  monthlyWage: number,
  components: SalaryComponentConfig[]
): { valid: boolean; total: number; errorMsg?: string } {
  let basicAmount = 0;
  const basicComp = components.find((c) => c.id === 'comp_basic');
  if (basicComp && basicComp.enabled) {
    basicAmount = basicComp.calcType === 'PERCENTAGE_WAGE' ? (monthlyWage * basicComp.value) / 100 : basicComp.value;
  }

  let total = 0;
  components.forEach((c) => {
    if (!c.enabled) return;
    if (c.calcType === 'PERCENTAGE_WAGE') {
      total += (monthlyWage * c.value) / 100;
    } else if (c.calcType === 'PERCENTAGE_BASIC') {
      total += (basicAmount * c.value) / 100;
    } else if (c.calcType === 'FIXED') {
      total += c.value;
    }
  });

  total = Math.round(total * 100) / 100;

  if (total > monthlyWage) {
    return {
      valid: false,
      total,
      errorMsg: `Total salary components (₹${total.toLocaleString('en-IN')}) exceed the defined monthly wage of ₹${monthlyWage.toLocaleString('en-IN')}.`,
    };
  }

  return { valid: true, total };
}

const STORAGE_KEY = 'dayflow_salary_data';

export const salaryService = {
  /**
   * Fetch employee profile and salary structure
   */
  async getSalaryData(employeeId: string = 'EMP-1001'): Promise<{ employee: EmployeeProfile; salary: SalaryStructure }> {
    const saved = localStorage.getItem(`${STORAGE_KEY}_${employeeId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Recompute to guarantee consistency
        const recalculated = calculateSalaryStructure(
          parsed.salary.monthlyWage,
          parsed.salary.components,
          parsed.salary.deductions,
          parsed.salary.workingSchedule
        );
        return {
          employee: parsed.employee,
          salary: recalculated,
        };
      } catch (e) {
        console.error('Failed to parse saved salary data, reverting to defaults', e);
      }
    }

    // Default structure matching requirement ₹50,000 wage -> ₹42,300 net
    const defaultSalary = calculateSalaryStructure(
      50000,
      DEFAULT_COMPONENT_TEMPLATES,
      DEFAULT_DEDUCTIONS_CONFIG,
      DEFAULT_WORKING_SCHEDULE
    );

    return {
      employee: DEFAULT_EMPLOYEE_PROFILE,
      salary: defaultSalary,
    };
  },

  /**
   * Save updated salary structure (Admin only)
   */
  async updateSalaryData(
    employeeId: string,
    salaryData: SalaryStructure,
    userRole: UserRole
  ): Promise<{ success: boolean; data?: SalaryStructure; error?: string }> {
    if (userRole !== 'ADMIN') {
      return {
        success: false,
        error: 'Unauthorized: Only administrators are permitted to configure salary structures.',
      };
    }

    const validation = validateSalaryComponents(salaryData.monthlyWage, salaryData.components);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.errorMsg,
      };
    }

    const updatedSalary = calculateSalaryStructure(
      salaryData.monthlyWage,
      salaryData.components,
      salaryData.deductions,
      salaryData.workingSchedule
    );

    const payload = {
      employee: DEFAULT_EMPLOYEE_PROFILE,
      salary: updatedSalary,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(`${STORAGE_KEY}_${employeeId}`, JSON.stringify(payload));

    return {
      success: true,
      data: updatedSalary,
    };
  },
};
