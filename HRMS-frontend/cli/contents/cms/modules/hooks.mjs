export const page = ({ camelCaseName, pascalCaseName }) => {
  return `
  
import { axiosInstance } from '@/lib/axiosInstance';
import endpoints from '@/lib/endpoints';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ${pascalCaseName}QueryKeysEnum } from './keys';
import { T${pascalCaseName}Schema } from './schema';

export const useGet${pascalCaseName} = () => {
  return useQuery({
    queryKey: [${pascalCaseName}QueryKeysEnum.get${pascalCaseName}],
    queryFn: async () => {
      const res = await axiosInstance.get<T${pascalCaseName}Schema['Get${pascalCaseName}Response']>(endpoints.${camelCaseName}.get);

      return res?.data;
    },
  });
};

export const useUpdate${pascalCaseName} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [${pascalCaseName}QueryKeysEnum.update${pascalCaseName}],
    mutationFn: async (payload: T${pascalCaseName}Schema['${pascalCaseName}UpdatePayload']) => {
      const res = await axiosInstance.post<T${pascalCaseName}Schema['Get${pascalCaseName}Response']>(
        endpoints.${camelCaseName}.update,
        payload
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [${pascalCaseName}QueryKeysEnum.get${pascalCaseName}],
      });
    },
  });
};


        `;
};

export default page;
