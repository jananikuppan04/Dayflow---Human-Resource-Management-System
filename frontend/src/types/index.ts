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
}

export interface TimeOffRecord {
  id: string;
  employeeId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: 'pending' | 'approved' | 'rejected';
}
