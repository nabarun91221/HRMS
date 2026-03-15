import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useQuery } from '@tanstack/react-query';
import { analyticsQueryEnum } from './keys';
import { TAnalyticsSchema } from './schema';

export const useGetEmployeeMonthlyMetrics = ({ month, year }: { month: number; year: number }) => {
  return useQuery({
    queryKey: [analyticsQueryEnum.employeeMonthlyMetrics, month, year],
    queryFn: async () => {
      const res = await axiosInstance.get<TAnalyticsSchema['GetEmployeeMonthlyMetricsResponse']>(
        endpoints.dashboard.employeeMonthlyMetrics,
        {
          params: {
            month,
            year,
          },
        }
      );
      return res?.data;
    },
  });
};

export const useGetEmployeeAttendanceCalendar = (payload?: { from: string; to: string }) => {
  return useQuery({
    queryKey: [analyticsQueryEnum.employeeAttendanceCalendar, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.get<
        TAnalyticsSchema['GetEmployeeAttendanceCalendarResponse']
      >(endpoints.dashboard.employeeCalendar, {
        params: payload,
      });
      return res?.data;
    },
    enabled: !!payload,
  });
};

export const useGetAdminTodayMetrics = () => {
  return useQuery({
    queryKey: [analyticsQueryEnum.adminTodayMetrics],
    queryFn: async () => {
      const res = await axiosInstance.get<TAnalyticsSchema['GetAdminTodayMetricsResponse']>(
        endpoints.dashboard.adminTodayMetrics
      );
      return res?.data;
    },
  });
};

export const useGetAdminMonthlyMetrics = ({ month, year }: { month: number; year: number }) => {
  return useQuery({
    queryKey: [analyticsQueryEnum.adminMonthlyMetrics, month, year],
    queryFn: async () => {
      const res = await axiosInstance.get<TAnalyticsSchema['GetAdminMonthlyMetricsResponse']>(
        endpoints.dashboard.adminMonthlyMetrics,
        {
          params: {
            month,
            year,
          },
        }
      );
      return res?.data;
    },
  });
};

export const useGetAdminEmployeeRanking = ({ month, year }: { month: number; year: number }) => {
  return useQuery({
    queryKey: [analyticsQueryEnum.employeeRanking, month, year],
    queryFn: async () => {
      const res = await axiosInstance.get<TAnalyticsSchema['GetEmployeeRankingResponse']>(
        endpoints.dashboard.employeeRanking,
        {
          params: {
            month,
            year,
          },
        }
      );
      return res?.data;
    },
  });
};
