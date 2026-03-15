import { axiosInstance } from "@/lib/axiosInstance";
import endpoints from "@/lib/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCommonSchema } from "../core/schema";
import { PayrollQueryKeysEnum } from "./keys";
import { TPayrollSchema } from "./schema";

export const useGetAllPayroll = (
  payload?: TCommonSchema["BaseGetAllPayload"],
) => {
  return useQuery({
    queryKey: [PayrollQueryKeysEnum.getAllPayroll, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.get<
        TPayrollSchema["GetAllPayrollResponse"]
      >(endpoints.payroll.getAll, {
        params: payload,
      });
      return res?.data;
    },
  });
};

export const useGetAllMyPayroll = (
  payload?: TCommonSchema["BaseGetAllPayload"],
) => {
  return useQuery({
    queryKey: [PayrollQueryKeysEnum.getAllPayroll, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.get<
        TPayrollSchema["GetAllPayrollResponse"]
      >(endpoints.payroll.myPayroll, {
        params: payload,
      });
      return res?.data;
    },
  });
};

export const useAddPayrollDeduction = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.addPayrollDeduction],
    mutationFn: async (
      payload: TPayrollSchema["AddPayrollDeductionPayload"],
    ) => {
      const res = await axiosInstance.put(
        endpoints.payroll.addDeduction(payload.payrollId),
        {
          name: payload.name,
          amount: payload.amount,
        },
      );
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [PayrollQueryKeysEnum.getAllPayroll],
      });
    },
  });
};

export const useAddPayrollEarning = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.addPayrollEarning],
    mutationFn: async (payload: TPayrollSchema["AddPayrollEarningPayload"]) => {
      const res = await axiosInstance.put(
        endpoints.payroll.addEarning(payload.payrollId),
        {
          name: payload.name,
          amount: payload.amount,
        },
      );
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [PayrollQueryKeysEnum.getAllPayroll],
      });
    },
  });
};

export const useCreatePayroll = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.createPayroll],
    mutationFn: async (payload: TPayrollSchema["CreatePayrollPayload"]) => {
      const res = await axiosInstance.post<
        TPayrollSchema["CreatePayrollResponse"]
      >(endpoints.payroll.create, payload);

      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [PayrollQueryKeysEnum.getAllPayroll],
      });
    },
  });
};

export const useApprovePayroll = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.approvePayroll],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(endpoints.payroll.approve(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [PayrollQueryKeysEnum.getAllPayroll],
      });
    },
  });
};

export const useLockPayroll = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.lockPayroll],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(endpoints.payroll.lock(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [PayrollQueryKeysEnum.getAllPayroll],
      });
    },
  });
};

export const useReCalculatePayroll = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.reCalculatePayroll],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(endpoints.payroll.reCalculate(id));
      return res?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [PayrollQueryKeysEnum.getAllPayroll],
      });
    },
  });
};

export const useDownloadMyPayroll = () => {
  return useMutation({
    mutationKey: [PayrollQueryKeysEnum.downloadMyPayroll],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.get(
        endpoints.payroll.downloadPayroll(id),
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });

      let fileName = "payroll.pdf";
      const disposition = res.headers["content-disposition"];

      if (disposition && disposition.includes("filename=")) {
        fileName = disposition.split("filename=")[1];
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return res?.data;
    },
  });
};
