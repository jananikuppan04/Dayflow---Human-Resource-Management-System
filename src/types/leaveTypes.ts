export type LeaveType = 'Paid' | 'Sick' | 'Unpaid';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  avatar?: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  adminComment?: string;
  appliedOn: string;
}

export interface LeaveBalance {
  paidLeave: { used: number; total: number };
  sickLeave: { used: number; total: number };
  unpaidLeave: { used: number; total: number };
}
