import { TCommonSchema } from '@/modules/core/schema';

export type TDepartmentSchema = {
  Doc: {
    _id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    code: string;
    name: string;
  };

  CreateDepartmentPayload: {
    name: string;
  };

  UpdateDepartmentPayload: TDepartmentSchema['CreateDepartmentPayload'];

  CreateDepartmentResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDepartmentSchema['Doc'];
  };

  UpdateDepartmentResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDepartmentSchema['Doc'];
  };

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAllDepartmentResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDepartmentSchema['Doc'][];
  };

  GetDepartmentResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDepartmentSchema['Doc'];
  };
};
