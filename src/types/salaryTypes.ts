export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  manager: string;
  location: string;
  avatarUrl?: string;
  payGrade: string;
  employmentType: string;
  effectiveFrom: string;
  lastUpdated: string;
}

export type ComponentCalculationType = 'PERCENTAGE_WAGE' | 'PERCENTAGE_BASIC' | 'FIXED' | 'RESIDUAL';

export interface SalaryComponentConfig {
  id: string;
  name: string;
  description: string;
  calcType: ComponentCalculationType;
  value: number; // percentage (e.g., 50) or fixed amount
  amount: number; // calculated monthly amount
  percentageOfWage: number; // calculated % of monthly wage
  enabled: boolean;
}

export interface DeductionsConfig {
  pfEmployeeRate: number; // percentage of basic, default 12%
  pfEmployerRate: number; // percentage of basic, default 12%
  pfEmployeeAmount: number;
  pfEmployerAmount: number;
  professionalTax: number; // fixed amount, default 200
  incomeTaxTds: number; // fixed or calculated monthly TDS, default 4500
  totalDeductions: number;
}

export interface WorkingScheduleConfig {
  workingDaysPerWeek: number; // e.g. 5
  breakTimeHoursPerDay: number; // e.g. 1
}

export interface SalaryStructure {
  monthlyWage: number;
  yearlyWage: number;
  nextPayoutDate: string;
  paymentMode: string;
  bankName: string;
  workingSchedule: WorkingScheduleConfig;
  components: SalaryComponentConfig[];
  deductions: DeductionsConfig;
  grossSalary: number;
  takeHomeSalary: number;
}

export interface SalaryProfileResponse {
  employee: EmployeeProfile;
  salary: SalaryStructure;
}
