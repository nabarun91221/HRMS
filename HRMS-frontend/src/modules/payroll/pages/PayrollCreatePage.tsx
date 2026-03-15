'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import PayrollCreateUpdateForm, {
  payrollFormSchemaType,
} from '../components/PayrollCreateUpdateForm';
import { useCreatePayroll } from '../hooks';

const PayrollCreatePage = () => {
  const router = useRouter();
  const { mutate: createPayroll, isPending } = useCreatePayroll();

  const onSubmit = (values: payrollFormSchemaType) => {
    createPayroll(
      {
        employeeId: values?.employeeId,
        month: Number(values?.month),
        year: Number(values?.year),
      },
      {
        onSuccess: () => {
          toast.success('Payroll created successfully');
          router.push(ROUTES.admin.dashboard.payroll.list);
        },
      }
    );
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create Payroll'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.payroll.list)}
      />
      <PayrollCreateUpdateForm isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default PayrollCreatePage;
