import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DepartmentQueryKeysEnum } from './keys';
import { TDepartmentSchema } from './schema';

export const useGetAllDepartment = () => {
  return useQuery({
    queryKey: [DepartmentQueryKeysEnum.getAllDepartment],
    queryFn: async () => {
      const res = await axiosInstance.get<TDepartmentSchema['GetAllDepartmentResponse']>(
        endpoints.department.getAll
      );
      return res?.data;
    },
  });
};

export const useCreateDepartment = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [DepartmentQueryKeysEnum.createDepartment],
    mutationFn: async (payload: TDepartmentSchema['CreateDepartmentPayload']) => {
      const res = await axiosInstance.post<TDepartmentSchema['CreateDepartmentResponse']>(
        endpoints.department.create,
        payload
      );

      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [DepartmentQueryKeysEnum.getAllDepartment],
      });
    },
  });
};

export const useGetDepartment = (id: string) => {
  return useQuery({
    queryKey: [DepartmentQueryKeysEnum.getDepartment, id],
    queryFn: async () => {
      const res = await axiosInstance.get<TDepartmentSchema['GetDepartmentResponse']>(
        endpoints.department.get(id)
      );
      return res?.data;
    },
  });
};

export const useUpdateDepartment = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [DepartmentQueryKeysEnum.updateDepartment],
    mutationFn: async (data: {
      id: string;
      payload: TDepartmentSchema['UpdateDepartmentPayload'];
    }) => {
      const res = await axiosInstance.put<TDepartmentSchema['UpdateDepartmentResponse']>(
        endpoints.department.update(data?.id),
        data?.payload
      );

      return res?.data;
    },
    onSuccess: (_, { id }) => {
      query.invalidateQueries({
        queryKey: [DepartmentQueryKeysEnum.getAllDepartment],
      });

      query.invalidateQueries({
        queryKey: [DepartmentQueryKeysEnum.getDepartment, id],
      });
    },
  });
};

export const useDeleteDepartment = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [DepartmentQueryKeysEnum.deleteDepartment],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(endpoints.department.delete(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [DepartmentQueryKeysEnum.getAllDepartment],
      });
    },
  });
};
