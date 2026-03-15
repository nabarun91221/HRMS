import { axiosInstance } from "@/lib/axiosInstance";
import endpoints from "@/lib/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCommonSchema } from "../core/schema";
import { EmployeeQueryKeysEnum } from "./keys";
import { TEmployeeSchema } from "./schema";

export const useGetAllEmployee = (
  payload?: TEmployeeSchema["GetAllEmployeePayload"],
) => {
  return useQuery({
    queryKey: [EmployeeQueryKeysEnum.getAllEmployee, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.get<
        TEmployeeSchema["GetAllEmployeeResponse"]
      >(endpoints.employee.getAll, { params: payload });
      return res?.data;
    },
  });
};

export const useCreateEmployee = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [EmployeeQueryKeysEnum.createEmployee],
    mutationFn: async (payload: TEmployeeSchema["CreateEmployeePayload"]) => {
      const res = await axiosInstance.post<
        TEmployeeSchema["CreateEmployeeResponse"]
      >(endpoints.employee.create, payload);

      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [EmployeeQueryKeysEnum.getAllEmployee],
      });
    },
  });
};

export const useGetEmployee = (id: string) => {
  return useQuery({
    queryKey: [EmployeeQueryKeysEnum.getEmployee, id],
    queryFn: async () => {
      const res = await axiosInstance.get<
        TEmployeeSchema["GetEmployeeResponse"]
      >(endpoints.employee.get(id));
      return res?.data;
    },
  });
};

export const useUpdateEmployee = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [EmployeeQueryKeysEnum.updateEmployee],
    mutationFn: async (data: {
      id: string;
      payload: TEmployeeSchema["UpdateEmployeePayload"];
    }) => {
      const res = await axiosInstance.put<
        TEmployeeSchema["UpdateEmployeeResponse"]
      >(endpoints.employee.update(data?.id), data?.payload);

      return res?.data;
    },
    onSuccess: (_, { id }) => {
      query.invalidateQueries({
        queryKey: [EmployeeQueryKeysEnum.getAllEmployee],
      });

      query.invalidateQueries({
        queryKey: [EmployeeQueryKeysEnum.getEmployee, id],
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [EmployeeQueryKeysEnum.deleteEmployee],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(endpoints.employee.delete(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [EmployeeQueryKeysEnum.getAllEmployee],
      });
    },
  });
};

export const useSendPersonalEmailOpt = () => {
  return useMutation({
    mutationKey: [EmployeeQueryKeysEnum.sendOpt],
    mutationFn: async (
      payload: TEmployeeSchema["SendPersonalEmailOptPayload"],
    ) => {
      const res = await axiosInstance.post<
        TCommonSchema["BaseApiResponse"] & {
          data: { isVerified: boolean };
        }
      >(endpoints.employee.sendEmailOpt(payload?.email));

      return res?.data;
    },
  });
};

export const useVerifyPersonalEmailOpt = () => {
  return useMutation({
    mutationKey: [EmployeeQueryKeysEnum.verifyOpt],
    mutationFn: async (
      payload: TEmployeeSchema["VerifyPersonalEmailOptPayload"],
    ) => {
      const res = await axiosInstance.post(
        endpoints.employee.verifyEmailOpt(payload?.email),
        {
          otp: payload?.otp,
        },
      );

      return res?.data;
    },
  });
};
