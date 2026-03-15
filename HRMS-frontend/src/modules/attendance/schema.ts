import { TCommonSchema } from '../core/schema';

export enum AttendanceStatusEnum {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  HALF_DAY = 'HALF_DAY',
  ON_LEAVE = 'ON_LEAVE',
}

export const AttendanceStatusEnumViewMap = {
  [AttendanceStatusEnum.PRESENT]: 'Present',
  [AttendanceStatusEnum.ABSENT]: 'Absent',
  [AttendanceStatusEnum.HALF_DAY]: 'Half Day',
  [AttendanceStatusEnum.ON_LEAVE]: 'On Leave',
};

export const AttendanceStatusEnumColorMap = {
  [AttendanceStatusEnum.PRESENT]: 'green',
  [AttendanceStatusEnum.ABSENT]: 'red',
  [AttendanceStatusEnum.HALF_DAY]: 'yellow',
  [AttendanceStatusEnum.ON_LEAVE]: 'blue',
};

export type TAttendanceSchema = {
  Doc: {
    _id: string;
    employeeId: string;
    date: string;
    clockIn: string;
    clockOut: string | null;
    totalWorkingHours: number;
    overtimeHours: number;
    status: AttendanceStatusEnum;
  };

  ClockInPayload: {
    latitude: number;
    longitude: number;
  };
  ClockOutPayload: TAttendanceSchema['ClockInResponse'];

  ClockInResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAttendanceSchema['Doc'];
  };

  ClockOutResponse: TAttendanceSchema['ClockInResponse'];

  GetMyTodayAttendanceResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAttendanceSchema['Doc'] | null;
  };
};
