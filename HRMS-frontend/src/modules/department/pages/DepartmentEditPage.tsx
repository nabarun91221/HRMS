'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { toast } from 'sonner';
import DepartmentCreateUpdateForm, {
  departmentFormSchemaType,
} from '../components/DepartmentCreateUpdateForm';
import { useGetDepartment, useUpdateDepartment } from '../hooks';

const DepartmentEditPage = () => {
  const router = useRouter();
  const id = useParams()?.id as string;

  const { data, isFetching } = useGetDepartment(id);

  const departmentData = data?.data;

  const { mutate: updateDepartment, isPending } = useUpdateDepartment();

  const onSubmit = (values: departmentFormSchemaType) => {
    updateDepartment(
      {
        id,
        payload: values,
      },
      {
        onSuccess: () => {
          toast.success('Department updated successfully');
          router.push(ROUTES.admin.dashboard.department.list);
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Update Department'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.department.list)}
      />
      <DepartmentCreateUpdateForm
        initialData={departmentData}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default DepartmentEditPage;
