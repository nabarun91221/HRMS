export const page = ({ pascalCaseName }) => {
  return `
import { TCommonSchema } from '@/modules/core/schema';

export type T${pascalCaseName}Schema = {
  Doc: {
    _id: string;
    image: string;
    name: string;
    status: string;
  };

  Create${pascalCaseName}Payload: FormData;

  Update${pascalCaseName}Payload: T${pascalCaseName}Schema['Create${pascalCaseName}Payload'];

  Create${pascalCaseName}Response: TCommonSchema['BaseApiResponse'] & {
    data: T${pascalCaseName}Schema['Doc'];
  };

  Update${pascalCaseName}Response: TCommonSchema['BaseApiResponse'] & {
    data: T${pascalCaseName}Schema['Doc'];
  };

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAll${pascalCaseName}Response: TCommonSchema['BaseApiResponse'] & {
    data: {
      docs: T${pascalCaseName}Schema['Doc'][];
      meta: TCommonSchema['PaginatedMetaResponse'];
    };
  };

  Get${pascalCaseName}Response: TCommonSchema['BaseApiResponse'] & {
    data: T${pascalCaseName}Schema['Doc'];
  };
};

        `;
};

export default page;
