'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { toast } from 'sonner';
import DesignationCreateUpdateForm, {
  designationFormSchemaType,
} from '../components/DesignationCreateUpdateForm';
import { useGetDesignation, useUpdateDesignation } from '../hooks';

const DesignationEditPage = () => {
  const router = useRouter();
  const id = useParams()?.id as string;

  const { data, isFetching } = useGetDesignation(id);

  const designationData = data?.data;

  const { mutate: updateDesignation, isPending } = useUpdateDesignation();

  const onSubmit = (values: designationFormSchemaType) => {
    updateDesignation(
      {
        id,
        payload: {
          name: values?.name,
          departmentId: values?.department?.id,
        },
      },
      {
        onSuccess: () => {
          toast.success('Designation updated successfully');
          router.push(ROUTES.admin.dashboard.designation.list);
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Update Designation'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.designation.list)}
      />
      <DesignationCreateUpdateForm
        initialData={designationData}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default DesignationEditPage;
