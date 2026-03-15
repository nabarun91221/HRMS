export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;
export const baseUrlMedia = process.env.NEXT_PUBLIC_BASE_URL;

const endpoints = {
  auth: {
    login: "login",
    forgot: "auth/forgot-password",
    forgotPasswordVerifyOtp: "auth/verify-otp",
    reset: "auth/reset-password",
    refresh: "auth/refresh",
    profileDetails: "me",
    updateProfileDetails: "users/admin/profile-update",
    changePassword: "auth/change-password",
    logout: "logout",
  },
  profile: {
    uploadDocument: "employees/me/update",
  },
  dashboard: {
    employeeMonthlyMetrics: "analytics/me/monthly",
    employeeCalendar: "analytics/me/calendar",
    adminTodayMetrics: "analytics/admin/today",
    adminMonthlyMetrics: "analytics/admin/monthly",
    employeeRanking: "analytics/admin/ranking",
  },

  department: {
    getAll: "departments",
    create: "departments",
    update: (id: string) => `departments/${id}`,
    delete: (id: string) => `departments/${id}`,
    get: (id: string) => `departments/${id}`,
  },
  designation: {
    getAll: "designations",
    create: (departmentId: string) => `designations/${departmentId}`,
    update: (id: string) => `designations/${id}`,
    delete: (id: string) => `designations/${id}`,
    get: (id: string) => `designations/${id}`,
  },

  employee: {
    getAll: "employees",
    create: "employees",
    update: (id: string) => `employees/${id}`,
    delete: (id: string) => `employees/${id}`,
    get: (id: string) => `employees/${id}`,

    sendEmailOpt: (email: string) => `otp/${email}`,
    verifyEmailOpt: (email: string) => `verify/otp/${email}`,
  },

  fileHandle: {
    upload: "file/pdf/upload",
    delete: "file/delete",
  },

  attendance: {
    myTodayAttendance: "attendance/getMyTodayAttendance",
    clockIn: "clockIn",
    clockOut: "clockOut",
  },

  payroll: {
    getAll: "payroll",
    myPayroll: "payroll-me",
    downloadPayroll: (payrollId: string) => `payroll/download/${payrollId}`,
    approve: (payrollId: string) => `payroll-approve/${payrollId}`,
    lock: (payrollId: string) => `payroll-lock/${payrollId}`,
    reCalculate: (payrollId: string) => `recalculate-payroll/${payrollId}`,
    create: "generate-payroll",
    addDeduction: (payrollId: string) => `payroll/add/deduction/${payrollId}`,
    addEarning: (payrollId: string) => `payroll/add/earning/${payrollId}`,
  },

  leavePolicy: {
    getAll: "leave-policy",
    create: "leave-policy",
    update: (id: string) => `leave-policy/${id}`,
    delete: (id: string) => `leave-policy/${id}`,
    get: (id: string) => `leave-policy/${id}`,
  },
  leaveApplication: {
    getAll: "leave-applications",
    myLeaveApplications: "leave-application",
    approve: (id: string) => `leave-approve/${id}`,
    reject: (id: string) => `leave-reject/${id}`,
    cancel: (id: string) => `leave-cancel/${id}`,
    create: "leave-application",
  },

  // successStory: {
  //   getAll: 'admin/success-stories',
  //   create: 'admin/success-stories',
  //   update: (id: string) => `admin/success-stories/${id}`,
  //   delete: (id: string) => `admin/success-stories/${id}`,
  //   status: (id: string) => `admin/success-stories/status-update/${id}`,
  //   get: (id: string) => `admin/success-stories/${id}`,
  // },
};

export default endpoints;
