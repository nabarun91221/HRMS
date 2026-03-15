'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import DepartmentCreateUpdateForm, {
  departmentFormSchemaType,
} from '../components/DepartmentCreateUpdateForm';
import { useCreateDepartment } from '../hooks';

const DepartmentCreatePage = () => {
  const router = useRouter();
  const { mutate: createDepartment, isPending } = useCreateDepartment();

  const onSubmit = (values: departmentFormSchemaType) => {
    const formdata = new FormData();

    createDepartment(values, {
      onSuccess: () => {
        toast.success('Department created successfully');
        router.push(ROUTES.admin.dashboard.department.list);
      },
    });
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create Department'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.department.list)}
      />
      <DepartmentCreateUpdateForm isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default DepartmentCreatePage;
