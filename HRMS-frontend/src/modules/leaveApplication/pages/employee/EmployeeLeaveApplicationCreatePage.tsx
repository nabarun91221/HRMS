'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import EmployeeLeaveApplicationCreateForm, {
  leaveApplicationFormSchemaType,
} from '../../components/EmployeeLeaveApplicationCreateForm';
import { useCreateLeaveApplication } from '../../hooks';

const EmployeeLeaveApplicationCreatePage = () => {
  const router = useRouter();
  const { mutate: createLeaveApplication, isPending } = useCreateLeaveApplication();

  const onSubmit = (values: leaveApplicationFormSchemaType) => {
    createLeaveApplication(values, {
      onSuccess: () => {
        toast.success('Leave Application created successfully');
        router.push(ROUTES.employee.dashboard.leaveApplication.list);
      },
    });
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create Leave Application'}
        backButton
        onBackClick={() => router.push(ROUTES.employee.dashboard.leaveApplication.list)}
      />
      <EmployeeLeaveApplicationCreateForm isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default EmployeeLeaveApplicationCreatePage;
