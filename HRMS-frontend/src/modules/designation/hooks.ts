import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DesignationQueryKeysEnum } from './keys';
import { TDesignationSchema } from './schema';

export const useGetAllDesignation = () => {
  return useQuery({
    queryKey: [DesignationQueryKeysEnum.getAllDesignation],
    queryFn: async () => {
      const res = await axiosInstance.get<TDesignationSchema['GetAllDesignationResponse']>(
        endpoints.designation.getAll
      );
      return res?.data;
    },
  });
};

export const useCreateDesignation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [DesignationQueryKeysEnum.createDesignation],
    mutationFn: async (payload: TDesignationSchema['CreateDesignationPayload']) => {
      const res = await axiosInstance.post<TDesignationSchema['CreateDesignationResponse']>(
        endpoints.designation.create(payload?.departmentId),
        {
          name: payload?.name,
        }
      );

      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [DesignationQueryKeysEnum.getAllDesignation],
      });
    },
  });
};

export const useGetDesignation = (id: string) => {
  return useQuery({
    queryKey: [DesignationQueryKeysEnum.getDesignation, id],
    queryFn: async () => {
      const res = await axiosInstance.get<TDesignationSchema['GetDesignationResponse']>(
        endpoints.designation.get(id)
      );
      return res?.data;
    },
  });
};

export const useUpdateDesignation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [DesignationQueryKeysEnum.updateDesignation],
    mutationFn: async (data: {
      id: string;
      payload: TDesignationSchema['UpdateDesignationPayload'];
    }) => {
      const res = await axiosInstance.put<TDesignationSchema['UpdateDesignationResponse']>(
        endpoints.designation.update(data?.id),
        data?.payload
      );

      return res?.data;
    },
    onSuccess: (_, { id }) => {
      query.invalidateQueries({
        queryKey: [DesignationQueryKeysEnum.getAllDesignation],
      });

      query.invalidateQueries({
        queryKey: [DesignationQueryKeysEnum.getDesignation, id],
      });
    },
  });
};

export const useDeleteDesignation = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [DesignationQueryKeysEnum.deleteDesignation],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(endpoints.designation.delete(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [DesignationQueryKeysEnum.getAllDesignation],
      });
    },
  });
};
