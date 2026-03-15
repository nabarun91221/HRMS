'use client';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/lib/routes';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import EmployeeCreateUpdateForm, {
  employeeFormSchemaType,
} from '../components/EmployeeCreateUpdateForm';
import { useCreateEmployee } from '../hooks';
import { TEmployeeSchema } from '../schema';

const EmployeeCreatePage = () => {
  const router = useRouter();
  const { mutate: createEmployee, isPending } = useCreateEmployee();

  const onSubmit = (values: employeeFormSchemaType) => {
    if (values.type != 'create') return;
    const payload: TEmployeeSchema['CreateEmployeePayload'] = {
      address: values?.address,
      employeeCode: values?.employeeCode,
      bankDetails: values?.bankDetails,
      documents: values?.documents,
      employment: {
        ...values?.employment,
        baseSalary: Number(values?.employment?.baseSalary),
        departmentId: values?.employment?.department?.id,
        designationId: values?.employment?.designation?.id,
      },
      personalInfo: values?.personalInfo,
      assignedTo: { email: values?.personalEmail },
      userCredentials: values?.userCredentials,
    };

    createEmployee(payload, {
      onSuccess: () => {
        toast.success('Employee created successfully');
        router.push(ROUTES.admin.dashboard.employee.list);
      },
    });
  };

  return (
    <div className='space-y-4'>
      <PageHeader
        title={'Create Employee'}
        backButton
        onBackClick={() => router.push(ROUTES.admin.dashboard.employee.list)}
      />
      <EmployeeCreateUpdateForm type='create' isSubmitting={isPending} onSubmit={onSubmit} />
    </div>
  );
};

export default EmployeeCreatePage;
