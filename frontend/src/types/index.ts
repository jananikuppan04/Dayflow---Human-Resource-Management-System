export type Role = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  role: Role;
  employeeId?: string;
}

export interface Employee {
  id: string; // The UUID
  loginId: string; // EMP0012 etc
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  department: string;
  designation: string; // Job title
  company: string;
  manager: string;
  location: string;
  profilePicture: string;
}

export type AttendanceStatus = 'present' | 'leave' | 'absent';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  checkIn: string | null; // ISO string
  checkOut: string | null; // ISO string
  status: AttendanceStatus;
  workHours?: string;
  extraHours?: string;
}

export type TimeOffType = 'Paid Time Off' | 'Sick Leave' | 'Unpaid Leave';

export interface TimeOffRecord {
  id: string;
  employeeId: string;
  employeeName?: string;
  type: TimeOffType;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  duration: number; // in days
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
  attachmentUrl?: string;
}

export interface LeaveBalance {
  employeeId: string;
  paidAvailable: number;
  sickAvailable: number;
  unpaidAvailable: number;
}
