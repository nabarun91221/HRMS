export const page = ({ pascalCaseName }) => {
  return `
  
import { TCommonSchema } from '@/modules/core/schema';

export type T${pascalCaseName}Schema = {
  ${pascalCaseName}UpdatePayload: FormData;

  ${pascalCaseName}Response: {
    name: string;
    image: string;
  };
  Get${pascalCaseName}Response: TCommonSchema['BaseApiResponse'] & {
    data: T${pascalCaseName}Schema['${pascalCaseName}Response'];
  };
};

        `;
};

export default page;
