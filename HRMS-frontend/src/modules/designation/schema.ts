import { TCommonSchema } from '@/modules/core/schema';

export type TDesignationSchema = {
  Doc: {
    _id: string;
    name: string;
    departmentId: {
      _id: string;
      name: string;
    };
    status: string;
  };

  CreateDesignationPayload: {
    name: string;
    departmentId: string;
  };

  UpdateDesignationPayload: TDesignationSchema['CreateDesignationPayload'];

  CreateDesignationResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDesignationSchema['Doc'];
  };

  UpdateDesignationResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDesignationSchema['Doc'];
  };

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAllDesignationResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDesignationSchema['Doc'][];
  };

  GetDesignationResponse: TCommonSchema['BaseApiResponse'] & {
    data: TDesignationSchema['Doc'];
  };
};
