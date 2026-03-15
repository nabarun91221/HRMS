export const page = ({ camelCaseName, pascalCaseName, normalCaseName }) => {
  return `
'use client';
import PageHeader from '@/components/page-header';
import Loading from '@/components/Loading';
import { toast } from 'sonner';

import ${pascalCaseName}CmsUpdateForm, {
  ${camelCaseName}FormSchemaType,
} from '../components/${pascalCaseName}CmsUpdateForm';
import { useGet${pascalCaseName}, useUpdate${pascalCaseName} } from '../hooks';

const ${pascalCaseName}CmsPage = () => {
  const { data, isFetching } = useGet${pascalCaseName}();

  const ${camelCaseName}Data = data?.data;

  const { mutate: update${pascalCaseName}, isPending } = useUpdate${pascalCaseName}();

  const onSubmit = (values: ${camelCaseName}FormSchemaType) => {
    const formdata = new FormData();

    if (values?.image instanceof File) formdata.append('image', values?.image);
    formdata.append('name', values?.name);

    update${pascalCaseName}(formdata,{
        onSuccess: () => {
          toast.success('${normalCaseName} updated successfully');
        
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'${normalCaseName} CMS'}
    
      />
      <${pascalCaseName}CmsUpdateForm
        initialData={${camelCaseName}Data}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ${pascalCaseName}CmsPage;


        `;
};

export default page;
