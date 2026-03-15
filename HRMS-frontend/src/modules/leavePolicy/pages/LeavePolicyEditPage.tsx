'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { toast } from 'sonner';
import LeavePolicyCreateUpdateForm, {
  leavePolicyFormSchemaType,
} from '../components/LeavePolicyCreateUpdateForm';
import { useGetLeavePolicy, useUpdateLeavePolicy } from '../hooks';

const LeavePolicyEditPage = () => {
  const router = useRouter();
  const id = useParams()?.id as string;

  const { data, isFetching } = useGetLeavePolicy(id);

  const leavePolicyData = data?.data;

  const { mutate: updateLeavePolicy, isPending } = useUpdateLeavePolicy();

  const onSubmit = (values: leavePolicyFormSchemaType) => {
    updateLeavePolicy(
      {
        id,
        payload: {
          name: values?.name,
          daysPerYear: Number(values?.daysPerYear),
          carryForward: values?.carryForward,
          maxCarryForwardDays: Number(values?.maxCarryForwardDays),
          isPaid: values?.isPaid,
        },
      },
      {
        onSuccess: () => {
          toast.success('Leave Policy updated successfully');
          router.push(ROUTES.admin.dashboard.leavePolicy.list);
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Update Leave Policy'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.leavePolicy.list)}
      />
      <LeavePolicyCreateUpdateForm
        initialData={leavePolicyData}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default LeavePolicyEditPage;
