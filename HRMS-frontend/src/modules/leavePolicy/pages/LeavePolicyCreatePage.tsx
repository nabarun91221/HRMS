'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import LeavePolicyCreateUpdateForm, {
  leavePolicyFormSchemaType,
} from '../components/LeavePolicyCreateUpdateForm';
import { useCreateLeavePolicy } from '../hooks';

const LeavePolicyCreatePage = () => {
  const router = useRouter();
  const { mutate: createLeavePolicy, isPending } = useCreateLeavePolicy();

  const onSubmit = (values: leavePolicyFormSchemaType) => {
    createLeavePolicy(
      {
        name: values?.name,
        daysPerYear: Number(values?.daysPerYear),
        carryForward: values?.carryForward,
        maxCarryForwardDays: Number(values?.maxCarryForwardDays),
        isPaid: values?.isPaid,
      },
      {
        onSuccess: () => {
          toast.success('Leave Policy created successfully');
          router.push(ROUTES.admin.dashboard.leavePolicy.list);
        },
      }
    );
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create Leave Policy'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.leavePolicy.list)}
      />
      <LeavePolicyCreateUpdateForm isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default LeavePolicyCreatePage;
