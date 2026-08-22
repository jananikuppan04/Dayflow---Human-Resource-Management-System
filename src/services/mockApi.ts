import type { Employee, AttendanceRecord, TimeOffRecord, User } from '../types';

// TEMPORARY: Isolated mock data
const mockAuthUsers: User[] = [
  { id: 'u-admin', email: 'admin@dayflow.com', role: 'admin', employeeId: 'e-admin' },
  { id: 'u-john', email: 'john.doe@example.com', role: 'employee', employeeId: 'e1' },
  { id: 'u-sarah', email: 'sarah.smith@example.com', role: 'employee', employeeId: 'e2' }
];

export const mockEmployees: Employee[] = [
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
    firstName: 'Arun',
    lastName: 'Kumar',
    email: 'arun.kumar@dayflow.com',
    mobile: '+91 98765 43210',
    department: 'Engineering',
    designation: 'Software Engineer',
    company: 'Dayflow Inc.',
    manager: 'Janani Devi',
    location: 'Bangalore Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e1',
  },
  {
    id: 'e2',
    loginId: 'EMP0013',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@dayflow.com',
    mobile: '+91 98765 43211',
    department: 'Design',
    designation: 'Product Designer',
    company: 'Dayflow Inc.',
    manager: 'Janani Devi',
    location: 'Bangalore Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e2',
  },
  {
    id: 'e3',
    loginId: 'EMP0014',
    firstName: 'Rahul',
    lastName: 'Mehta',
    email: 'rahul.mehta@dayflow.com',
    mobile: '+91 98765 43212',
    department: 'Human Resources',
    designation: 'HR Executive',
    company: 'Dayflow Inc.',
    manager: 'Janani Devi',
    location: 'Mumbai Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e3',
  },
  {
    id: 'e4',
    loginId: 'EMP0015',
    firstName: 'Sneha',
    lastName: 'Patel',
    email: 'sneha.patel@dayflow.com',
    mobile: '+91 98765 43213',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    company: 'Dayflow Inc.',
    manager: 'Janani Devi',
    location: 'Remote',
    profilePicture: 'https://i.pravatar.cc/150?u=e4',
  },
  {
    id: 'e5',
    loginId: 'EMP0016',
    firstName: 'Vijay',
    lastName: 'Krishnan',
    email: 'vijay.k@dayflow.com',
    mobile: '+91 98765 43214',
    department: 'Engineering',
    designation: 'DevOps Engineer',
    company: 'Dayflow Inc.',
    manager: 'Arun Kumar',
    location: 'Chennai Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e5',
  },
  {
    id: 'e6',
    loginId: 'EMP0017',
    firstName: 'Divya',
    lastName: 'Nair',
    email: 'divya.nair@dayflow.com',
    mobile: '+91 98765 43215',
    department: 'Finance',
    designation: 'Finance Analyst',
    company: 'Dayflow Inc.',
    manager: 'Janani Devi',
    location: 'Bangalore Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e6',
  },
  {
    id: 'e7',
    loginId: 'EMP0018',
    firstName: 'Karthik',
    lastName: 'Rajan',
    email: 'karthik.r@dayflow.com',
    mobile: '+91 98765 43216',
    department: 'Engineering',
    designation: 'Frontend Developer',
    company: 'Dayflow Inc.',
    manager: 'Arun Kumar',
    location: 'Bangalore Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e7',
  },
  {
    id: 'e8',
    loginId: 'EMP0019',
    firstName: 'Meena',
    lastName: 'Subramaniam',
    email: 'meena.s@dayflow.com',
    mobile: '+91 98765 43217',
    department: 'Operations',
    designation: 'Operations Manager',
    company: 'Dayflow Inc.',
    manager: 'Janani Devi',
    location: 'Hyderabad Office',
    profilePicture: 'https://i.pravatar.cc/150?u=e8',
  },
];

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0];
const threeDaysAgo = new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0];
const fourDaysAgo = new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0];

const makeTime = (daysAgo: number, h: number, m: number) => {
  const d = new Date(Date.now() - 86400000 * daysAgo);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const mockTimeOffs: TimeOffRecord[] = [
  {
    id: 't1',
    employeeId: 'e2',
    startDate: today,
    endDate: today,
    status: 'approved',
  },
  {
    id: 't2',
    employeeId: 'e6',
    startDate: today,
    endDate: today,
    status: 'approved',
  },
  {
    id: 't3',
    employeeId: 'e1',
    startDate: fourDaysAgo,
    endDate: fourDaysAgo,
    status: 'approved',
  },
];

export let mockAttendanceRecords: AttendanceRecord[] = [
  // TODAY records
  { id: 'a1', employeeId: 'e1', date: today, checkIn: makeTime(0, 10, 2), checkOut: null, status: 'present', workHours: '0h 00m', extraHours: '0h 00m', remarks: '' },
  { id: 'a3', employeeId: 'e3', date: today, checkIn: makeTime(0, 10, 45), checkOut: makeTime(0, 14, 30), status: 'half_day', workHours: '03h 45m', extraHours: '0h 00m', remarks: 'Left early for personal reason' },
  { id: 'a4', employeeId: 'e4', date: today, checkIn: makeTime(0, 11, 15), checkOut: null, status: 'late', workHours: '0h 00m', extraHours: '0h 00m', remarks: 'Traffic delay' },
  { id: 'a5', employeeId: 'e5', date: today, checkIn: makeTime(0, 10, 0), checkOut: makeTime(0, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'a7', employeeId: 'e7', date: today, checkIn: makeTime(0, 10, 5), checkOut: makeTime(0, 19, 5), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'a8', employeeId: 'e8', date: today, checkIn: makeTime(0, 10, 0), checkOut: makeTime(0, 15, 0), status: 'half_day', workHours: '05h 00m', extraHours: '0h 00m', remarks: 'Medical appointment' },

  // YESTERDAY records
  { id: 'b1', employeeId: 'e1', date: yesterday, checkIn: makeTime(1, 10, 0), checkOut: makeTime(1, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'b2', employeeId: 'e2', date: yesterday, checkIn: makeTime(1, 10, 5), checkOut: makeTime(1, 19, 5), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'b3', employeeId: 'e3', date: yesterday, checkIn: makeTime(1, 10, 0), checkOut: makeTime(1, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'b4', employeeId: 'e4', date: yesterday, checkIn: makeTime(1, 11, 30), checkOut: makeTime(1, 19, 30), status: 'late', workHours: '08h 00m', extraHours: '00h 00m', remarks: 'Arrived late' },
  { id: 'b5', employeeId: 'e5', date: yesterday, checkIn: makeTime(1, 10, 0), checkOut: makeTime(1, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'b6', employeeId: 'e7', date: yesterday, checkIn: makeTime(1, 10, 0), checkOut: makeTime(1, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'b7', employeeId: 'e8', date: yesterday, checkIn: makeTime(1, 10, 0), checkOut: makeTime(1, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },

  // TWO DAYS AGO
  { id: 'c1', employeeId: 'e1', date: twoDaysAgo, checkIn: makeTime(2, 10, 5), checkOut: makeTime(2, 19, 10), status: 'present', workHours: '09h 05m', extraHours: '01h 05m', remarks: '' },
  { id: 'c2', employeeId: 'e2', date: twoDaysAgo, checkIn: makeTime(2, 10, 0), checkOut: makeTime(2, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'c3', employeeId: 'e3', date: twoDaysAgo, checkIn: makeTime(2, 10, 0), checkOut: makeTime(2, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'c5', employeeId: 'e5', date: twoDaysAgo, checkIn: makeTime(2, 10, 0), checkOut: makeTime(2, 21, 0), status: 'present', workHours: '11h 00m', extraHours: '03h 00m', remarks: 'Deployment day' },
  { id: 'c7', employeeId: 'e7', date: twoDaysAgo, checkIn: makeTime(2, 10, 0), checkOut: makeTime(2, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },

  // THREE DAYS AGO
  { id: 'd1', employeeId: 'e1', date: threeDaysAgo, checkIn: makeTime(3, 10, 0), checkOut: makeTime(3, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'd2', employeeId: 'e2', date: threeDaysAgo, checkIn: makeTime(3, 11, 0), checkOut: makeTime(3, 19, 0), status: 'late', workHours: '08h 00m', extraHours: '00h 00m', remarks: '' },
  { id: 'd3', employeeId: 'e3', date: threeDaysAgo, checkIn: makeTime(3, 10, 0), checkOut: makeTime(3, 14, 0), status: 'half_day', workHours: '04h 00m', extraHours: '00h 00m', remarks: '' },
  { id: 'd5', employeeId: 'e5', date: threeDaysAgo, checkIn: makeTime(3, 10, 0), checkOut: makeTime(3, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
  { id: 'd7', employeeId: 'e7', date: threeDaysAgo, checkIn: makeTime(3, 10, 0), checkOut: makeTime(3, 19, 0), status: 'present', workHours: '09h 00m', extraHours: '01h 00m', remarks: '' },
];

// Helper to generate analytics data for an employee over N days
function generateWeeklyAnalytics(employeeId: string) {
  const result: { date: string; label: string; workHours: number; extraHours: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - 86400000 * i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const record = mockAttendanceRecords.find(a => a.employeeId === employeeId && a.date === dateStr);
    let work = 0;
    let extra = 0;
    if (record?.workHours) {
      const match = record.workHours.match(/(\d+)h\s*(\d+)m/);
      if (match) work = parseInt(match[1]) + parseInt(match[2]) / 60;
    }
    if (record?.extraHours) {
      const match = record.extraHours.match(/(\d+)h\s*(\d+)m/);
      if (match) extra = parseInt(match[1]) + parseInt(match[2]) / 60;
    }
    result.push({ date: dateStr, label: dayLabel, workHours: parseFloat(work.toFixed(1)), extraHours: parseFloat(extra.toFixed(1)) });
  }
  return result;
}

export const mockApi = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockAuthUsers.find(u => u.email === email);
        if (user && password === 'password123') {
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  getCurrentEmployee: async (employeeId: string): Promise<Employee> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const emp = mockEmployees.find(e => e.id === employeeId);
        if (emp) resolve(emp);
        else reject(new Error('Employee not found'));
      }, 300);
    });
  },

  getEmployees: async (): Promise<Employee[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockEmployees), 500));
  },

  getAttendanceStatus: async (employeeIds: string[], date: string) => {
    return new Promise<Record<string, 'present' | 'leave' | 'absent' | 'half_day' | 'late'>>((resolve) => {
      setTimeout(() => {
        const statuses: Record<string, 'present' | 'leave' | 'absent' | 'half_day' | 'late'> = {};
        employeeIds.forEach(empId => {
          const hasLeave = mockTimeOffs.some(
            t => t.employeeId === empId && t.status === 'approved' && t.startDate <= date && t.endDate >= date
          );
          if (hasLeave) { statuses[empId] = 'leave'; return; }
          const record = mockAttendanceRecords.find(a => a.employeeId === empId && a.date === date);
          if (record) { statuses[empId] = record.status; return; }
          const isPastOrToday = date <= new Date().toISOString().split('T')[0];
          statuses[empId] = isPastOrToday ? 'absent' : 'present';
        });
        resolve(statuses);
      }, 500);
    });
  },

  getTodayAttendance: async (employeeId: string) => {
    return new Promise<AttendanceRecord | null>((resolve) => {
      setTimeout(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        const record = mockAttendanceRecords.find(a => a.employeeId === employeeId && a.date === todayDate);
        resolve(record || null);
      }, 300);
    });
  },

  getDailyAttendanceList: async (date: string) => {
    return new Promise<{ record: AttendanceRecord | null; employee: Employee }[]>((resolve) => {
      setTimeout(() => {
        const results = mockEmployees.map(emp => {
          let record = mockAttendanceRecords.find(a => a.employeeId === emp.id && a.date === date) || null;
          if (!record) {
            const hasLeave = mockTimeOffs.some(
              t => t.employeeId === emp.id && t.status === 'approved' && t.startDate <= date && t.endDate >= date
            );
            const isPastOrToday = date <= new Date().toISOString().split('T')[0];
            if (isPastOrToday) {
              record = {
                id: `mock-${hasLeave ? 'leave' : 'absent'}-${emp.id}`,
                employeeId: emp.id,
                date,
                checkIn: null,
                checkOut: null,
                status: hasLeave ? 'leave' : 'absent',
                workHours: '0h 00m',
                extraHours: '0h 00m',
              };
            }
          }
          return { employee: emp, record };
        });
        resolve(results);
      }, 500);
    });
  },

  getEmployeeAttendanceHistory: async (employeeId: string, monthPrefix: string) => {
    return new Promise<{
      records: AttendanceRecord[];
      stats: { present: number; leaves: number; halfDays: number; late: number; total: number; workingHours: string };
    }>((resolve) => {
      setTimeout(() => {
        const records = mockAttendanceRecords.filter(a => a.employeeId === employeeId && a.date.startsWith(monthPrefix));
        records.sort((a, b) => b.date.localeCompare(a.date));
        const leaves = mockTimeOffs.filter(t => t.employeeId === employeeId && t.status === 'approved' && t.startDate.startsWith(monthPrefix)).length;
        const present = records.filter(r => r.status === 'present').length;
        const halfDays = records.filter(r => r.status === 'half_day').length;
        const late = records.filter(r => r.status === 'late').length;
        const totalHours = records.reduce((sum, r) => {
          if (!r.workHours) return sum;
          const match = r.workHours.match(/(\d+)h\s*(\d+)m/);
          return match ? sum + parseInt(match[1]) + parseInt(match[2]) / 60 : sum;
        }, 0);
        resolve({
          records,
          stats: {
            present,
            leaves,
            halfDays,
            late,
            total: present + leaves + halfDays + late,
            workingHours: `${Math.floor(totalHours)}h ${Math.round((totalHours % 1) * 60)}m`,
          },
        });
      }, 500);
    });
  },

  getWeeklyAnalytics: async (employeeId: string) => {
    return new Promise<{ date: string; label: string; workHours: number; extraHours: number }[]>((resolve) => {
      setTimeout(() => resolve(generateWeeklyAnalytics(employeeId)), 300);
    });
  },

  getDailySummary: async (date: string) => {
    return new Promise<{ present: number; absent: number; leave: number; late: number; halfDay: number }>((resolve) => {
      setTimeout(() => {
        let present = 0, absent = 0, leave = 0, late = 0, halfDay = 0;
        mockEmployees.forEach(emp => {
          const record = mockAttendanceRecords.find(a => a.employeeId === emp.id && a.date === date);
          const hasLeave = mockTimeOffs.some(t => t.employeeId === emp.id && t.status === 'approved' && t.startDate <= date && t.endDate >= date);
          if (hasLeave) { leave++; return; }
          if (!record) { absent++; return; }
          if (record.status === 'present') present++;
          else if (record.status === 'late') late++;
          else if (record.status === 'half_day') halfDay++;
          else if (record.status === 'absent') absent++;
          else if (record.status === 'leave') leave++;
        });
        resolve({ present, absent, leave, late, halfDay });
      }, 300);
    });
  },

  editAttendance: async (recordId: string, updates: Partial<Pick<AttendanceRecord, 'checkIn' | 'checkOut' | 'status' | 'remarks'>>) => {
    return new Promise<AttendanceRecord>((resolve, reject) => {
      setTimeout(() => {
        const idx = mockAttendanceRecords.findIndex(r => r.id === recordId);
        if (idx === -1) { reject(new Error('Record not found')); return; }
        mockAttendanceRecords[idx] = { ...mockAttendanceRecords[idx], ...updates };
        resolve(mockAttendanceRecords[idx]);
      }, 600);
    });
  },

  checkIn: async (employeeId: string) => {
    return new Promise<AttendanceRecord>((resolve, reject) => {
      setTimeout(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        const hasLeave = mockTimeOffs.some(
          t => t.employeeId === employeeId && t.status === 'approved' && t.startDate <= todayDate && t.endDate >= todayDate
        );
        if (hasLeave) { reject(new Error('Cannot check in while on approved leave.')); return; }
        const existing = mockAttendanceRecords.find(a => a.employeeId === employeeId && a.date === todayDate);
        if (existing?.checkIn) { reject(new Error('Already checked in today.')); return; }
        const now = new Date();
        const cutoff = new Date(); cutoff.setHours(10, 30, 0, 0);
        const status: AttendanceRecord['status'] = now > cutoff ? 'late' : 'present';
        const newRecord: AttendanceRecord = {
          id: `a${Date.now()}`,
          employeeId,
          date: todayDate,
          checkIn: now.toISOString(),
          checkOut: null,
          status,
          workHours: '0h 00m',
          extraHours: '0h 00m',
          remarks: '',
        };
        mockAttendanceRecords.push(newRecord);
        resolve(newRecord);
      }, 500);
    });
  },

  checkOut: async (employeeId: string) => {
    return new Promise<AttendanceRecord>((resolve, reject) => {
      setTimeout(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        const idx = mockAttendanceRecords.findIndex(a => a.employeeId === employeeId && a.date === todayDate);
        if (idx === -1 || !mockAttendanceRecords[idx].checkIn) { reject(new Error('Cannot check out without checking in first.')); return; }
        if (mockAttendanceRecords[idx].checkOut) { reject(new Error('Already checked out.')); return; }
        const checkOutTime = new Date();
        const checkInTime = new Date(mockAttendanceRecords[idx].checkIn!);
        const diffMs = checkOutTime.getTime() - checkInTime.getTime();
        const diffH = Math.floor(diffMs / 3600000);
        const diffM = Math.floor((diffMs % 3600000) / 60000);
        const stdHours = 8;
        const totalH = diffH + diffM / 60;
        const extraH = Math.max(0, totalH - stdHours);
        const extraHours = `${Math.floor(extraH)}h ${Math.round((extraH % 1) * 60)}m`;
        mockAttendanceRecords[idx] = {
          ...mockAttendanceRecords[idx],
          checkOut: checkOutTime.toISOString(),
          workHours: `${diffH.toString().padStart(2, '0')}h ${diffM.toString().padStart(2, '0')}m`,
          extraHours,
        };
        resolve(mockAttendanceRecords[idx]);
      }, 500);
    });
  },
};
