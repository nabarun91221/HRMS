import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LeavePolicyQueryKeysEnum } from './keys';
import { TLeavePolicySchema } from './schema';

export const useGetAllLeavePolicy = () => {
  return useQuery({
    queryKey: [LeavePolicyQueryKeysEnum.getAllLeavePolicy],
    queryFn: async () => {
      const res = await axiosInstance.get<TLeavePolicySchema['GetAllLeavePolicyResponse']>(
        endpoints.leavePolicy.getAll
      );
      return res?.data;
    },
  });
};

export const useCreateLeavePolicy = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [LeavePolicyQueryKeysEnum.createLeavePolicy],
    mutationFn: async (payload: TLeavePolicySchema['CreateLeavePolicyPayload']) => {
      const res = await axiosInstance.post<TLeavePolicySchema['CreateLeavePolicyResponse']>(
        endpoints.leavePolicy.create,
        payload
      );

      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [LeavePolicyQueryKeysEnum.getAllLeavePolicy],
      });
    },
  });
};

export const useGetLeavePolicy = (id: string) => {
  return useQuery({
    queryKey: [LeavePolicyQueryKeysEnum.getLeavePolicy, id],
    queryFn: async () => {
      const res = await axiosInstance.get<TLeavePolicySchema['GetLeavePolicyResponse']>(
        endpoints.leavePolicy.get(id)
      );
      return res?.data;
    },
  });
};

export const useUpdateLeavePolicy = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [LeavePolicyQueryKeysEnum.updateLeavePolicy],
    mutationFn: async (data: {
      id: string;
      payload: TLeavePolicySchema['UpdateLeavePolicyPayload'];
    }) => {
      const res = await axiosInstance.patch<TLeavePolicySchema['UpdateLeavePolicyResponse']>(
        endpoints.leavePolicy.update(data?.id),
        data?.payload
      );

      return res?.data;
    },
    onSuccess: (_, { id }) => {
      query.invalidateQueries({
        queryKey: [LeavePolicyQueryKeysEnum.getAllLeavePolicy],
      });

      query.invalidateQueries({
        queryKey: [LeavePolicyQueryKeysEnum.getLeavePolicy, id],
      });
    },
  });
};

export const useDeleteLeavePolicy = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [LeavePolicyQueryKeysEnum.deleteLeavePolicy],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(endpoints.leavePolicy.delete(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [LeavePolicyQueryKeysEnum.getAllLeavePolicy],
      });
    },
  });
};
