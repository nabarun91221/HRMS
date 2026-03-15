import { AttendanceStatusEnum } from '../attendance/schema';
import { TCommonSchema } from '../core/schema';
import { EmploymentTypeEnum, GenderEnum } from '../employee/schema';

export type TAnalyticsSchema = {
  GetEmployeeMonthlyMetricsResponse: TCommonSchema['BaseApiResponse'] & {
    data: {
      presentDays: number;
      absentDays: number;
      leaveDays: number;
      halfDays: number;
      totalWorkingHours: number;
      totalOvertimeHours: number;
    };
  };
  EmployeeAttendance: {
    _id: string;
    date: string;
    clockIn: string;
    status: AttendanceStatusEnum;
    clockOut: string;
    totalWorkingHours: number;
  };

  GetAdminMonthlyMetricsResponse: TCommonSchema['BaseApiResponse'] & {
    data: {
      present: number;
      absent: number;
      leave: number;
      halfDay: number;
      totalOvertime: number;
    };
  };

  EmployeeRankingDoc: {
    _id: string;
    totalHours: number;
    overtime: number;
    employee: {
      _id: string;
      userId: string;
      employeeCode: string;
      personalInfo: {
        firstName: string;
        lastName: string;
        phone: string;
        dob: string;
        gender: GenderEnum;
      };
      employment: {
        designationId: string;
        departmentId: string;
        managerId: string;
        joiningDate: string;
        confirmationDate: string;
        employmentType: EmploymentTypeEnum;
      };
    };
  };

  GetEmployeeRankingResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAnalyticsSchema['EmployeeRankingDoc'][];
  };

  GetAdminTodayMetricsResponse: TCommonSchema['BaseApiResponse'] & {
    data: {
      present: number;
      absent: number;
      leave: number;
      halfDay: number;
      totalOvertime: number;
    };
  };

  GetEmployeeAttendanceCalendarResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAnalyticsSchema['EmployeeAttendance'][];
  };
};
