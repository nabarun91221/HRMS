export const page = ({ camelCaseName, pascalCaseName, normalCaseName }) => {
  return `
'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { toast } from 'sonner';
import ${pascalCaseName}CreateUpdateForm, {
  ${camelCaseName}FormSchemaType,
} from '../components/${pascalCaseName}CreateUpdateForm';
import { useGet${pascalCaseName}, useUpdate${pascalCaseName} } from '../hooks';

const ${pascalCaseName}EditPage = () => {
  const router = useRouter();
  const id = useParams()?.id as string;

  const { data, isFetching } = useGet${pascalCaseName}(id);

  const ${camelCaseName}Data = data?.data;

  const { mutate: update${pascalCaseName}, isPending } = useUpdate${pascalCaseName}();

  const onSubmit = (values: ${camelCaseName}FormSchemaType) => {
    const formdata = new FormData();

    if (values?.image instanceof File) formdata.append('image', values?.image);
    formdata.append('name', values?.name);

    update${pascalCaseName}(
      {
        id,
        payload: formdata,
      },
      {
        onSuccess: () => {
          toast.success('${normalCaseName} updated successfully');
          router.push(ROUTES.dashboard.${camelCaseName}.list);
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Update ${normalCaseName}'}
        backButton
        onBackClick={() => router.push(ROUTES.dashboard.${camelCaseName}.list)}
      />
      <${pascalCaseName}CreateUpdateForm
        initialData={${camelCaseName}Data}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ${pascalCaseName}EditPage;


        `;
};

export default page;
