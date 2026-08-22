import { LeaveRequest, LeaveBalance, LeaveStatus, LeaveType } from '../types/leaveTypes';

const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LR-101',
    employeeId: 'EMP-1001',
    employeeName: 'Janani Devi',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    leaveType: 'Paid',
    startDate: '2026-09-01',
    endDate: '2026-09-03',
    totalDays: 3,
    reason: 'Family vacation and personal errands.',
    status: 'Approved',
    adminComment: 'Approved. Enjoy your time off!',
    appliedOn: '2026-08-20',
  },
  {
    id: 'LR-102',
    employeeId: 'EMP0012',
    employeeName: 'John Doe',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    leaveType: 'Sick',
    startDate: '2026-08-25',
    endDate: '2026-08-26',
    totalDays: 2,
    reason: 'Medical appointment and recovery.',
    status: 'Pending',
    appliedOn: '2026-08-22',
  },
  {
    id: 'LR-103',
    employeeId: 'EMP0013',
    employeeName: 'Sarah Smith',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    leaveType: 'Paid',
    startDate: '2026-08-28',
    endDate: '2026-08-28',
    totalDays: 1,
    reason: 'Personal work at bank.',
    status: 'Pending',
    appliedOn: '2026-08-21',
  },
  {
    id: 'LR-104',
    employeeId: 'EMP-1001',
    employeeName: 'Janani Devi',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    leaveType: 'Sick',
    startDate: '2026-08-10',
    endDate: '2026-08-10',
    totalDays: 1,
    reason: 'Flu and fever.',
    status: 'Approved',
    adminComment: 'Get well soon.',
    appliedOn: '2026-08-09',
  },
];

const INITIAL_BALANCES: Record<string, LeaveBalance> = {
  'EMP-1001': {
    paidLeave: { used: 3, total: 15 },
    sickLeave: { used: 1, total: 10 },
    unpaidLeave: { used: 0, total: 5 },
  },
  'EMP0012': {
    paidLeave: { used: 2, total: 15 },
    sickLeave: { used: 2, total: 10 },
    unpaidLeave: { used: 0, total: 5 },
  },
};

let leaveRequestsStore: LeaveRequest[] = [...INITIAL_LEAVE_REQUESTS];

export const leaveService = {
  getRequests: (): LeaveRequest[] => {
    return [...leaveRequestsStore];
  },

  getRequestsByEmployee: (employeeId: string): LeaveRequest[] => {
    return leaveRequestsStore.filter((r) => r.employeeId === employeeId);
  },

  getPendingRequests: (): LeaveRequest[] => {
    return leaveRequestsStore.filter((r) => r.status === 'Pending');
  },

  applyLeave: (
    employeeId: string,
    employeeName: string,
    department: string,
    avatar: string | undefined,
    leaveType: LeaveType,
    startDate: string,
    endDate: string,
    reason: string
  ): LeaveRequest => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newRequest: LeaveRequest = {
      id: `LR-${Math.floor(100 + Math.random() * 900)}`,
      employeeId,
      employeeName,
      department,
      avatar,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    leaveRequestsStore = [newRequest, ...leaveRequestsStore];
    return newRequest;
  },

  updateRequestStatus: (
    requestId: string,
    status: LeaveStatus,
    adminComment?: string
  ): LeaveRequest | undefined => {
    leaveRequestsStore = leaveRequestsStore.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status,
          adminComment: adminComment || r.adminComment,
        };
      }
      return r;
    });

    return leaveRequestsStore.find((r) => r.id === requestId);
  },

  getLeaveBalance: (employeeId: string): LeaveBalance => {
    return (
      INITIAL_BALANCES[employeeId] || {
        paidLeave: { used: 3, total: 15 },
        sickLeave: { used: 1, total: 10 },
        unpaidLeave: { used: 0, total: 5 },
      }
    );
  },
};
