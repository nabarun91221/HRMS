import { TCommonSchema } from '@/modules/core/schema';

export type TLeavePolicySchema = {
  Doc: {
    _id: string;
    name: string;
    daysPerYear: number;
    carryForward: boolean;
    maxCarryForwardDays: number;
    isPaid: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    code: string;
  };

  CreateLeavePolicyPayload: {
    name: string;
    daysPerYear: number;
    carryForward: boolean;
    maxCarryForwardDays: number;
    isPaid: boolean;
  };

  UpdateLeavePolicyPayload: TLeavePolicySchema['CreateLeavePolicyPayload'];

  CreateLeavePolicyResponse: TCommonSchema['BaseApiResponse'] & {
    data: TLeavePolicySchema['Doc'];
  };

  UpdateLeavePolicyResponse: TCommonSchema['BaseApiResponse'] & {
    data: TLeavePolicySchema['Doc'];
  };

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAllLeavePolicyResponse: TCommonSchema['BaseApiResponse'] & {
    data: TLeavePolicySchema['Doc'][];
  };

  GetLeavePolicyResponse: TCommonSchema['BaseApiResponse'] & {
    data: TLeavePolicySchema['Doc'];
  };
};
