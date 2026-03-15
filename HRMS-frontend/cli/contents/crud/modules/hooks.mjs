export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TCommonSchema } from '../core/schema';
import { ${pascalCaseName}QueryKeysEnum } from './keys';
import { T${pascalCaseName}Schema } from './schema';

export const useGetAll${pascalCaseName} = (paginationPayload: TCommonSchema['PaginationPayload']) => {
  return useQuery({
    queryKey: [${pascalCaseName}QueryKeysEnum.getAll${pascalCaseName}, JSON.stringify(paginationPayload)],
    queryFn: async () => {
      const res = await axiosInstance.get<T${pascalCaseName}Schema['GetAll${pascalCaseName}Response']>(
        endpoints.${camelCaseName}.getAll,
        {
          params: paginationPayload,
        }
      );
      return res?.data;
    },
  });
};

export const useCreate${pascalCaseName} = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [${pascalCaseName}QueryKeysEnum.create${pascalCaseName}],
    mutationFn: async (payload: T${pascalCaseName}Schema['Create${pascalCaseName}Payload']) => {
      const res = await axiosInstance.post<T${pascalCaseName}Schema['Create${pascalCaseName}Response']>(
        endpoints.${camelCaseName}.create,
        payload
      );

      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [${pascalCaseName}QueryKeysEnum.getAll${pascalCaseName}],
      });
    },
  });
};

export const use${pascalCaseName}StatusChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [${pascalCaseName}QueryKeysEnum.changeStatus],
    mutationFn: async (payload: T${pascalCaseName}Schema['ChangeStatusPayload']) => {
      const res = await axiosInstance.patch(endpoints.${camelCaseName}.status(payload.id), {
        status: payload.status,
      });

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [${pascalCaseName}QueryKeysEnum.getAll${pascalCaseName}],
      });
    },
  });
};

export const useGet${pascalCaseName} = (id: string) => {
  return useQuery({
    queryKey: [${pascalCaseName}QueryKeysEnum.get${pascalCaseName}, id],
    queryFn: async () => {
      const res = await axiosInstance.get<T${pascalCaseName}Schema['Get${pascalCaseName}Response']>(
        endpoints.${camelCaseName}.get(id)
      );
      return res?.data;
    },
  });
};

export const useUpdate${pascalCaseName} = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [${pascalCaseName}QueryKeysEnum.update${pascalCaseName}],
    mutationFn: async (data: {
      id: string;
      payload: T${pascalCaseName}Schema['Update${pascalCaseName}Payload'];
    }) => {
      const res = await axiosInstance.patch<T${pascalCaseName}Schema['Update${pascalCaseName}Response']>(
        endpoints.${camelCaseName}.update(data?.id),
        data?.payload
      );

      return res?.data;
    },
    onSuccess: (_, { id }) => {
      query.invalidateQueries({
        queryKey: [${pascalCaseName}QueryKeysEnum.getAll${pascalCaseName}],
      });

      query.invalidateQueries({
        queryKey: [${pascalCaseName}QueryKeysEnum.get${pascalCaseName}, id],
      });
    },
  });
};

export const useDelete${pascalCaseName} = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [${pascalCaseName}QueryKeysEnum.delete${pascalCaseName}],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(endpoints.${camelCaseName}.delete(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [${pascalCaseName}QueryKeysEnum.getAll${pascalCaseName}],
      });
    },
  });
};

        `;
};

export default page;
