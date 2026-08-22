import type { Employee, AttendanceRecord, TimeOffRecord, User, LeaveBalance } from '../types';

// TEMPORARY: Isolated mock data
const mockAuthUsers: User[] = [
  { id: 'u-admin', email: 'admin@dayflow.com', role: 'admin', employeeId: 'e-admin' },
  { id: 'u-john', email: 'john.doe@example.com', role: 'employee', employeeId: 'e1' },
  { id: 'u-sarah', email: 'sarah.smith@example.com', role: 'employee', employeeId: 'e2' }
];

// Map of email -> password for mock authentication
const mockPasswords: Record<string, string> = {
  'admin@dayflow.com': 'password123',
  'john.doe@example.com': 'password123',
  'sarah.smith@example.com': 'password123'
};

const mockPasswordChanged: Record<string, boolean> = {
  'admin@dayflow.com': true, // admin doesn't need to change
  'john.doe@example.com': true,
  'sarah.smith@example.com': true
};

const mockEmployees: Employee[] = [
  {
    id: 'e-admin',
    loginId: 'ADMIN001',
    firstName: 'System',
    lastName: 'Admin',
    email: 'admin@dayflow.com',
    mobile: '+1 800 000 0000',
    department: 'Administration',
    designation: 'HR Admin',
    company: 'Dayflow Inc.',
    manager: 'CEO',
    location: 'Headquarters',
    profilePicture: 'https://i.pravatar.cc/150?u=eadmin',
  },
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

let mockTimeOffs: TimeOffRecord[] = [
  {
    id: 't1',
    employeeId: 'e2', // Sarah is on leave today
    employeeName: 'Sarah Smith',
    type: 'Paid Time Off',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    duration: 1,
    status: 'approved',
    remarks: 'Pre-planned vacation day'
  }
];

let mockLeaveBalances: LeaveBalance[] = [
  { employeeId: 'e1', paidAvailable: 24, sickAvailable: 7, unpaidAvailable: 0 },
  { employeeId: 'e2', paidAvailable: 23, sickAvailable: 7, unpaidAvailable: 0 },
  { employeeId: 'e3', paidAvailable: 24, sickAvailable: 7, unpaidAvailable: 0 },
  { employeeId: 'e4', paidAvailable: 24, sickAvailable: 7, unpaidAvailable: 0 },
  { employeeId: 'e-admin', paidAvailable: 24, sickAvailable: 7, unpaidAvailable: 0 },
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
    workHours: '02h 00m',
    extraHours: '00h 00m'
  },
  {
    id: 'a4',
    employeeId: 'e4',
    date: new Date().toISOString().split('T')[0],
    checkIn: twoHoursAgo.toISOString(),
    checkOut: null,
    status: 'present',
    workHours: '02h 00m',
    extraHours: '00h 00m'
  },
  // Historical data for testing Employee view (assuming today is in October 2025 like the wireframe, but using dynamic relative dates)
  {
    id: 'a5',
    employeeId: 'e1',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    checkIn: new Date(Date.now() - 86400000).setHours(10, 0, 0, 0).toString(),
    checkOut: new Date(Date.now() - 86400000).setHours(19, 0, 0, 0).toString(),
    status: 'present',
    workHours: '09h 00m',
    extraHours: '01h 00m'
  },
  {
    id: 'a6',
    employeeId: 'e1',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // Day before yesterday
    checkIn: new Date(Date.now() - 86400000 * 2).setHours(10, 5, 0, 0).toString(),
    checkOut: new Date(Date.now() - 86400000 * 2).setHours(19, 10, 0, 0).toString(),
    status: 'present',
    workHours: '09h 05m',
    extraHours: '01h 05m'
  }
];

export const mockApi = {
  // REQUIRES BACKEND: Replace with POST /api/auth/login
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockAuthUsers.find(u => u.email === email);
        const validPassword = mockPasswords[email];
        
        if (user && validPassword && password === validPassword) {
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  isFirstLogin: async (email: string): Promise<boolean> => {
    return !mockPasswordChanged[email];
  },

  changePassword: async (email: string, newPassword: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPasswords[email] = newPassword;
        mockPasswordChanged[email] = true;
        resolve();
      }, 1000);
    });
  },

  // REQUIRES BACKEND: Replace with POST /api/employees
  createEmployee: async (employeeData: Partial<Employee>, tempPassword: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEmployeeId = `e-${Date.now()}`;
        const newUserId = `u-${Date.now()}`;
        
        const newEmployee: Employee = {
          id: newEmployeeId,
          loginId: employeeData.loginId || 'EMP0000',
          firstName: employeeData.firstName || '',
          lastName: employeeData.lastName || '',
          email: employeeData.email || '',
          mobile: employeeData.mobile || '',
          department: 'General',
          designation: 'Employee',
          company: 'Dayflow Inc.',
          manager: 'N/A',
          location: 'Headquarters',
          profilePicture: `https://i.pravatar.cc/150?u=${newEmployeeId}`,
        };
        
        const newUser: User = {
          id: newUserId,
          email: newEmployee.email,
          role: 'employee',
          employeeId: newEmployeeId
        };

        const newBalance: LeaveBalance = {
          employeeId: newEmployeeId,
          paidAvailable: 24,
          sickAvailable: 7,
          unpaidAvailable: 0
        };

        mockEmployees.push(newEmployee);
        mockAuthUsers.push(newUser);
        mockLeaveBalances.push(newBalance);
        mockPasswords[newEmployee.email] = tempPassword;

        resolve(newUser);
      }, 1500);
    });
  },

  // REQUIRES BACKEND: Replace with GET /api/employees/:id
  getCurrentEmployee: async (employeeId: string): Promise<Employee> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const emp = mockEmployees.find(e => e.id === employeeId);
        if (emp) resolve(emp);
        else reject(new Error('Employee not found'));
      }, 300);
    });
  },
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

  // REQUIRES BACKEND: Replace with GET /api/attendance/daily?date=YYYY-MM-DD
  getDailyAttendanceList: async (date: string) => {
    return new Promise<{record: AttendanceRecord | null, employee: Employee}[]>((resolve) => {
      setTimeout(() => {
        const results = mockEmployees.map(emp => {
          const record = mockAttendanceRecords.find(a => a.employeeId === emp.id && a.date === date);
          
          let effectiveRecord = record || null;
          
          // If no record, check if they are on leave
          if (!effectiveRecord) {
            const hasLeave = mockTimeOffs.some(
              t => t.employeeId === emp.id && t.status === 'approved' && t.startDate <= date && t.endDate >= date
            );
            if (hasLeave) {
              effectiveRecord = {
                id: `mock-leave-${emp.id}`,
                employeeId: emp.id,
                date: date,
                checkIn: null,
                checkOut: null,
                status: 'leave'
              };
            } else {
               // Default to absent if past or today
               const isPastOrToday = date <= new Date().toISOString().split('T')[0];
               if (isPastOrToday) {
                 effectiveRecord = {
                   id: `mock-absent-${emp.id}`,
                   employeeId: emp.id,
                   date: date,
                   checkIn: null,
                   checkOut: null,
                   status: 'absent'
                 };
               }
            }
          }
          
          return {
            employee: emp,
            record: effectiveRecord
          };
        });
        resolve(results);
      }, 500);
    });
  },

  // REQUIRES BACKEND: Replace with GET /api/attendance/history?employeeId=X&month=YYYY-MM
  getEmployeeAttendanceHistory: async (employeeId: string, monthPrefix: string) => {
    return new Promise<{ records: AttendanceRecord[], stats: { present: number, leaves: number, total: number } }>((resolve) => {
      setTimeout(() => {
        const year = parseInt(monthPrefix.split('-')[0]);
        const month = parseInt(monthPrefix.split('-')[1]) - 1; // 0-indexed
        
        const records = mockAttendanceRecords.filter(a => a.employeeId === employeeId && a.date.startsWith(monthPrefix));
        const leaves = mockTimeOffs.filter(t => t.employeeId === employeeId && t.status === 'approved' && (t.startDate.startsWith(monthPrefix) || t.endDate.startsWith(monthPrefix)));
        
        const finalRecords: AttendanceRecord[] = [];
        let presentCount = 0;
        let leaveCount = 0;
        let totalWorkingDays = 0;
        
        const todayStr = new Date().toISOString().split('T')[0];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
          const currentDate = new Date(year, month, day);
          const dayOfWeek = currentDate.getDay();
          
          // Skip weekends (0 = Sunday, 6 = Saturday)
          if (dayOfWeek === 0 || dayOfWeek === 6) continue;
          
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Only count working days up to today
          if (dateStr <= todayStr) {
             totalWorkingDays++;
          }
          
          const existingRecord = records.find(r => r.date === dateStr);
          if (existingRecord) {
             finalRecords.push(existingRecord);
             if (existingRecord.status === 'present') presentCount++;
             continue;
          }
          
          const hasLeave = leaves.some(l => l.startDate <= dateStr && l.endDate >= dateStr);
          if (hasLeave) {
             finalRecords.push({
               id: `leave-${dateStr}`,
               employeeId,
               date: dateStr,
               checkIn: null,
               checkOut: null,
               status: 'leave'
             });
             leaveCount++;
             continue;
          }
          
          // If past date and no record and no leave, mark as absent
          if (dateStr < todayStr) {
             finalRecords.push({
               id: `absent-${dateStr}`,
               employeeId,
               date: dateStr,
               checkIn: null,
               checkOut: null,
               status: 'absent'
             });
          }
        }
        
        // Sort descending by date
        finalRecords.sort((a, b) => b.date.localeCompare(a.date));

        resolve({
          records: finalRecords,
          stats: {
            present: presentCount,
            leaves: leaveCount,
            total: totalWorkingDays
          }
        });
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

        const checkInTime = new Date(mockAttendanceRecords[recordIndex].checkIn!).getTime();
        const checkOutTime = new Date().getTime();
        const diffMinutes = Math.floor((checkOutTime - checkInTime) / 60000);
        
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        const workHoursStr = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`;
        
        // Extra hours if > 8 hours
        let extraHoursStr = '00h 00m';
        if (diffMinutes > 480) { // 8 * 60 = 480
           const extraMins = diffMinutes - 480;
           const eHours = Math.floor(extraMins / 60);
           const eMins = extraMins % 60;
           extraHoursStr = `${String(eHours).padStart(2, '0')}h ${String(eMins).padStart(2, '0')}m`;
        }

        mockAttendanceRecords[recordIndex] = {
          ...mockAttendanceRecords[recordIndex],
          checkOut: new Date(checkOutTime).toISOString(),
          workHours: workHoursStr,
          extraHours: extraHoursStr
        };
        resolve(mockAttendanceRecords[recordIndex]);
      }, 500);
    });
  },

  // TIME OFF MODULE ENDPOINTS
  
  getLeaveBalance: async (employeeId: string): Promise<LeaveBalance> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const balance = mockLeaveBalances.find(b => b.employeeId === employeeId);
        resolve(balance || { employeeId, paidAvailable: 24, sickAvailable: 7, unpaidAvailable: 0 });
      }, 500);
    });
  },

  getTimeOffRequests: async (employeeId?: string): Promise<TimeOffRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let requests = [...mockTimeOffs];
        if (employeeId) {
          requests = requests.filter(r => r.employeeId === employeeId);
        }
        // Sort newest first based on ID creation timestamp roughly or just return reversed
        resolve(requests.reverse());
      }, 500);
    });
  },

  createTimeOffRequest: async (
    employeeId: string, 
    data: Omit<TimeOffRecord, 'id' | 'employeeId' | 'employeeName' | 'status'>
  ): Promise<TimeOffRecord> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const emp = mockEmployees.find(e => e.id === employeeId);
        if (!emp) {
          return reject(new Error('Employee not found'));
        }

        const balance = mockLeaveBalances.find(b => b.employeeId === employeeId);
        if (balance) {
          if (data.type === 'Paid Time Off' && balance.paidAvailable < data.duration) {
            return reject(new Error('Insufficient Paid Time Off balance.'));
          }
          if (data.type === 'Sick Leave' && balance.sickAvailable < data.duration) {
            return reject(new Error('Insufficient Sick Leave balance.'));
          }
        }

        const newRecord: TimeOffRecord = {
          id: `t${Date.now()}`,
          employeeId,
          employeeName: `${emp.firstName} ${emp.lastName}`,
          status: 'pending',
          ...data
        };
        
        mockTimeOffs.unshift(newRecord);
        resolve(newRecord);
      }, 800);
    });
  },

  updateTimeOffStatus: async (requestId: string, status: 'approved' | 'rejected'): Promise<TimeOffRecord> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockTimeOffs.findIndex(r => r.id === requestId);
        if (index === -1) return reject(new Error('Request not found'));

        const record = mockTimeOffs[index];
        
        // Deduct balance if approved
        if (status === 'approved' && record.status !== 'approved') {
          const balIndex = mockLeaveBalances.findIndex(b => b.employeeId === record.employeeId);
          if (balIndex !== -1) {
            if (record.type === 'Paid Time Off') {
              mockLeaveBalances[balIndex].paidAvailable -= record.duration;
            } else if (record.type === 'Sick Leave') {
              mockLeaveBalances[balIndex].sickAvailable -= record.duration;
            }
          }
        }

        // Restore balance if changing from approved to rejected
        if (status === 'rejected' && record.status === 'approved') {
          const balIndex = mockLeaveBalances.findIndex(b => b.employeeId === record.employeeId);
          if (balIndex !== -1) {
            if (record.type === 'Paid Time Off') {
              mockLeaveBalances[balIndex].paidAvailable += record.duration;
            } else if (record.type === 'Sick Leave') {
              mockLeaveBalances[balIndex].sickAvailable += record.duration;
            }
          }
        }

        mockTimeOffs[index].status = status;
        resolve(mockTimeOffs[index]);
      }, 800);
    });
  }
};
