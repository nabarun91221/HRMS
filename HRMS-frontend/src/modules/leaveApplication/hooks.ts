import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LeaveApplicationQueryKeysEnum } from './keys';
import { TLeaveApplicationSchema } from './schema';

export const useGetAllLeaveApplication = () => {
  return useQuery({
    queryKey: [LeaveApplicationQueryKeysEnum.getAllLeaveApplication],
    queryFn: async () => {
      const res = await axiosInstance.get<
        TLeaveApplicationSchema['GetAllLeaveApplicationResponse']
      >(endpoints.leaveApplication.getAll);
      return res?.data;
    },
  });
};

export const useMyLeaveApplication = () => {
  return useQuery({
    queryKey: [LeaveApplicationQueryKeysEnum.getMyLeaveApplication],
    queryFn: async () => {
      const res = await axiosInstance.get<TLeaveApplicationSchema['GetMyLeaveApplicationResponse']>(
        endpoints.leaveApplication.myLeaveApplications
      );
      return res?.data;
    },
  });
};

export const useCreateLeaveApplication = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [LeaveApplicationQueryKeysEnum.createLeaveApplication],
    mutationFn: async (data: TLeaveApplicationSchema['CreateLeaveApplicationPayload']) => {
      const res = await axiosInstance.post(endpoints.leaveApplication.create, data);
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [LeaveApplicationQueryKeysEnum.getMyLeaveApplication],
      });
    },
  });
};

export const useApproveLeaveApplication = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [LeaveApplicationQueryKeysEnum.approveLeaveApplication],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(endpoints.leaveApplication.approve(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [LeaveApplicationQueryKeysEnum.getAllLeaveApplication],
      });
    },
  });
};

export const useCancelLeaveApplication = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [LeaveApplicationQueryKeysEnum.cancelLeaveApplication],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(endpoints.leaveApplication.cancel(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [LeaveApplicationQueryKeysEnum.getMyLeaveApplication],
      });
    },
  });
};

export const useRejectLeaveApplication = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [LeaveApplicationQueryKeysEnum.rejectLeaveApplication],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(endpoints.leaveApplication.reject(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [LeaveApplicationQueryKeysEnum.getAllLeaveApplication],
      });
    },
  });
};
