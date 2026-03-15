export const page = ({ camelCaseName, pascalCaseName, normalCaseName }) => {
  return `
'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import ${pascalCaseName}CreateUpdateForm, {
  ${camelCaseName}FormSchemaType,
} from '../components/${pascalCaseName}CreateUpdateForm';
import { useCreate${pascalCaseName} } from '../hooks';

const ${pascalCaseName}CreatePage = () => {
  const router = useRouter();
  const { mutate: create${pascalCaseName}, isPending } = useCreate${pascalCaseName}();

  const onSubmit = (values: ${camelCaseName}FormSchemaType) => {
    const formdata = new FormData();

    if (values?.image instanceof File) formdata.append('image', values?.image);
    formdata.append('name', values?.name);

    create${pascalCaseName}(formdata, {
      onSuccess: () => {
        toast.success('${normalCaseName} created successfully');
        router.push(ROUTES.dashboard.${camelCaseName}.list);
      },
    });
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create ${normalCaseName}'}
        backButton
        onBackClick={() => router.push(ROUTES.dashboard.${camelCaseName}.list)}
      />
      <${pascalCaseName}CreateUpdateForm isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default ${pascalCaseName}CreatePage;


        `;
};

export default page;
