import { Employee, AttendanceRecord, TimeOffRecord, User } from '../types';

// TEMPORARY: Isolated mock data
const mockEmployees: Employee[] = [
  {
    id: 'e1',
    loginId: 'EMP0012',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '+1 234 567 8900',
    department: 'Engineering',
    designation: 'Software Engineer',
    company: 'Dayflow Inc.',
    manager: 'Tech Lead',
    location: 'New York Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e1',
  },
  {
    id: 'e2',
    loginId: 'EMP0013',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah.smith@example.com',
    mobile: '+1 234 567 8901',
    department: 'Design',
    designation: 'Product Designer',
    company: 'Dayflow Inc.',
    manager: 'Design Lead',
    location: 'San Francisco Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e2',
  },
  {
    id: 'e3',
    loginId: 'EMP0014',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    mobile: '+1 234 567 8902',
    department: 'Human Resources',
    designation: 'HR Executive',
    company: 'Dayflow Inc.',
    manager: 'HR Manager',
    location: 'Chicago Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e3',
  },
  {
    id: 'e4',
    loginId: 'EMP0015',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@example.com',
    mobile: '+1 234 567 8903',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    company: 'Dayflow Inc.',
    manager: 'CMO',
    location: 'Remote',
    profilePicture: 'https://i.pravatar.cc/150?u=e4',
  },
];

const mockTimeOffs: TimeOffRecord[] = [
  {
    id: 't1',
    employeeId: 'e2', // Sarah is on leave today
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    status: 'approved',
  }
];

// Let's assume John checked in 2 hours ago
const twoHoursAgo = new Date();
twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

let mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'a1',
    employeeId: 'e1',
    date: new Date().toISOString().split('T')[0],
    checkIn: twoHoursAgo.toISOString(),
    checkOut: null,
    status: 'present',
  },
  {
    id: 'a4',
    employeeId: 'e4',
    date: new Date().toISOString().split('T')[0],
    checkIn: twoHoursAgo.toISOString(),
    checkOut: null,
    status: 'present',
  }
];

export const mockApi = {
  // REQUIRES BACKEND: Replace with GET /api/employees
  getEmployees: async (): Promise<Employee[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockEmployees), 500));
  },

  // REQUIRES BACKEND: Replace with GET /api/attendance/status
  getAttendanceStatus: async (employeeIds: string[], date: string) => {
    return new Promise<Record<string, 'present' | 'leave' | 'absent'>>((resolve) => {
      setTimeout(() => {
        const statuses: Record<string, 'present' | 'leave' | 'absent'> = {};
        
        employeeIds.forEach(empId => {
          // Check if on leave
          const hasLeave = mockTimeOffs.some(
            t => t.employeeId === empId && t.status === 'approved' && t.startDate <= date && t.endDate >= date
          );
          
          if (hasLeave) {
            statuses[empId] = 'leave';
            return;
          }

          // Check if checked in
          const hasAttendance = mockAttendanceRecords.some(
            a => a.employeeId === empId && a.date === date && a.checkIn !== null
          );

          if (hasAttendance) {
            statuses[empId] = 'present';
            return;
          }

          statuses[empId] = 'absent';
        });

        resolve(statuses);
      }, 500);
    });
  },

  // REQUIRES BACKEND: Replace with GET /api/attendance/today
  getTodayAttendance: async (employeeId: string) => {
    return new Promise<AttendanceRecord | null>((resolve) => {
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        const record = mockAttendanceRecords.find(a => a.employeeId === employeeId && a.date === today);
        resolve(record || null);
      }, 500);
    });
  },

  // REQUIRES BACKEND: Replace with POST /api/attendance/check-in
  checkIn: async (employeeId: string) => {
    return new Promise<AttendanceRecord>((resolve, reject) => {
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        
        // Check if on approved leave
        const hasLeave = mockTimeOffs.some(
          t => t.employeeId === employeeId && t.status === 'approved' && t.startDate <= today && t.endDate >= today
        );
        
        if (hasLeave) {
          reject(new Error('Cannot check in while on approved leave.'));
          return;
        }

        // Check if already checked in
        const existingRecord = mockAttendanceRecords.find(a => a.employeeId === employeeId && a.date === today);
        if (existingRecord && existingRecord.checkIn) {
          reject(new Error('Already checked in today.'));
          return;
        }

        const newRecord: AttendanceRecord = {
          id: `a${Date.now()}`,
          employeeId,
          date: today,
          checkIn: new Date().toISOString(),
          checkOut: null,
          status: 'present'
        };
        mockAttendanceRecords.push(newRecord);
        resolve(newRecord);
      }, 500);
    });
  },

  // REQUIRES BACKEND: Replace with POST /api/attendance/check-out
  checkOut: async (employeeId: string) => {
    return new Promise<AttendanceRecord>((resolve, reject) => {
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        const recordIndex = mockAttendanceRecords.findIndex(a => a.employeeId === employeeId && a.date === today);
        
        if (recordIndex === -1 || !mockAttendanceRecords[recordIndex].checkIn) {
          reject(new Error('Cannot check out without checking in first.'));
          return;
        }

        if (mockAttendanceRecords[recordIndex].checkOut) {
          reject(new Error('Already checked out.'));
          return;
        }

        mockAttendanceRecords[recordIndex] = {
          ...mockAttendanceRecords[recordIndex],
          checkOut: new Date().toISOString(),
        };
        resolve(mockAttendanceRecords[recordIndex]);
      }, 500);
    });
  }
};
