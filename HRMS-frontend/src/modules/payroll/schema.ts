import { TCommonSchema } from "@/modules/core/schema";

export enum PayloadStatusEnum {
  DRAFT = "DRAFT",
  APPROVED = "APPROVED",
  LOCKED = "LOCKED",
}

export type TPayrollSchema = {
  Doc: {
    _id: string;
    month: number;
    year: number;
    earnings: {
      name: string;
      amount: number;
      _id: string;
    }[];
    deductions: {
      name: string;
      amount: number;
      _id: string;
    }[];
    netSalary: number;
    status: PayloadStatusEnum;
    employeeId: string;
    employeeName: string;
    department: string;
    designation: string;
  };

  CreatePayrollPayload: {
    employeeId: string;
    month: number;
    year: number;
  };

  UpdatePayrollPayload: TPayrollSchema["CreatePayrollPayload"];

  CreatePayrollResponse: TCommonSchema["BaseApiResponse"] & {
    data: TPayrollSchema["Doc"];
  };

  UpdatePayrollResponse: TCommonSchema["BaseApiResponse"] & {
    data: TPayrollSchema["Doc"];
  };

  AddPayrollDeductionPayload: {
    name: string;
    amount: number;
    payrollId: string;
  };

  AddPayrollEarningPayload: TPayrollSchema["AddPayrollDeductionPayload"];

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAllPayrollResponse: TCommonSchema["BaseApiResponse"] & {
    data: TPayrollSchema["Doc"][];
  };

  GetPayrollResponse: TCommonSchema["BaseApiResponse"] & {
    data: TPayrollSchema["Doc"];
  };
};
