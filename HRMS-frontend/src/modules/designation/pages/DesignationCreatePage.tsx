'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import DesignationCreateUpdateForm, {
  designationFormSchemaType,
} from '../components/DesignationCreateUpdateForm';
import { useCreateDesignation } from '../hooks';

const DesignationCreatePage = () => {
  const router = useRouter();
  const { mutate: createDesignation, isPending } = useCreateDesignation();

  const onSubmit = (values: designationFormSchemaType) => {
    createDesignation(
      {
        name: values?.name,
        departmentId: values?.department?.id,
      },
      {
        onSuccess: () => {
          toast.success('Designation created successfully');
          router.push(ROUTES.admin.dashboard.designation.list);
        },
      }
    );
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create Designation'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.designation.list)}
      />
      <DesignationCreateUpdateForm isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default DesignationCreatePage;
