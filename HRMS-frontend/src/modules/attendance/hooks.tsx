import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AttendanceQueryKeysEnum } from './keys';
import { TAttendanceSchema } from './schema';

export const useGetMyTodayAttendance = (enabled = true) => {
  return useQuery({
    queryKey: [AttendanceQueryKeysEnum.getMyTodayAttendance],
    queryFn: async () => {
      const res = await axiosInstance.get<TAttendanceSchema['GetMyTodayAttendanceResponse']>(
        endpoints.attendance.myTodayAttendance
      );
      return res.data;
    },
    enabled,
  });
};

export const useClockIn = () => {
  return useMutation({
    mutationKey: [AttendanceQueryKeysEnum.clockIn],
    mutationFn: async (payload: TAttendanceSchema['ClockInPayload']) => {
      const res = await axiosInstance.post<TAttendanceSchema['ClockInResponse']>(
        endpoints.attendance.clockIn,
        payload
      );
      return res.data;
    },
  });
};

export const useClockOut = () => {
  return useMutation({
    mutationKey: [AttendanceQueryKeysEnum.clockIn],
    mutationFn: async (payload: TAttendanceSchema['ClockInPayload']) => {
      const res = await axiosInstance.post<TAttendanceSchema['ClockInResponse']>(
        endpoints.attendance.clockOut,
        payload
      );
      return res.data;
    },
  });
};
