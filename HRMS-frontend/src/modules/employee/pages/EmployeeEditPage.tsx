'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useParams, useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { toast } from 'sonner';
import EmployeeCreateUpdateForm, {
  employeeFormSchemaType,
} from '../components/EmployeeCreateUpdateForm';
import { useGetEmployee, useUpdateEmployee } from '../hooks';
import { TEmployeeSchema } from '../schema';

const EmployeeEditPage = () => {
  const router = useRouter();
  const id = useParams()?.id as string;

  const { data, isFetching } = useGetEmployee(id);

  const employeeData = data?.data;

  const { mutate: updateEmployee, isPending } = useUpdateEmployee();

  const onSubmit = (values: employeeFormSchemaType) => {
    if (values.type !== 'update') return;
    const payload: TEmployeeSchema['UpdateEmployeePayload'] = {
      address: values?.address,
      bankDetails: values.bankDetails,
      documents: values.documents,
      personalInfo: values.personalInfo,
      employment: {
        ...values.employment,
        designationId: values.employment.designation.id,
        departmentId: values.employment.department.id,
      },
      employeeCode: values.employeeCode,
    };

    updateEmployee(
      {
        id,
        payload,
      },
      {
        onSuccess: () => {
          toast.success('Employee updated successfully');
          router.push(ROUTES.admin.dashboard.employee.list);
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Update Employee'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.employee.list)}
      />
      <EmployeeCreateUpdateForm
        initialData={employeeData}
        isSubmitting={isPending}
        onSubmit={onSubmit}
        type='update'
      />
    </div>
  );
};

export default EmployeeEditPage;
