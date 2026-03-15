'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import MultiSelect2 from '@/components/ui/multi-select2';
import { Spinner } from '@/components/ui/spinner';
import { useGetAllDepartment } from '@/modules/department/hooks';
import { stringSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { TDesignationSchema } from '../schema';

type TComponentProps = {
  onSubmit: (values: designationFormSchemaType) => void;
  initialData?: TDesignationSchema['Doc'];
  isSubmitting: boolean;
};

const designationFormSchema = z.object({
  name: stringSchema('Name'),
  department: z.object(
    {
      id: z.string(),
      name: z.string(),
    },
    'Department is required'
  ),
});

export type designationFormSchemaType = z.infer<typeof designationFormSchema>;

const DesignationCreateUpdateForm = ({ onSubmit, isSubmitting, initialData }: TComponentProps) => {
  const form = useForm<designationFormSchemaType>({
    resolver: zodResolver(designationFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      department: initialData?.departmentId
        ? {
            id: initialData?.departmentId?._id,
            name: initialData?.departmentId?.name,
          }
        : undefined,
    },
  });

  const { handleSubmit, control, reset } = form;

  const { data: getAllDepartmentResData } = useGetAllDepartment();

  const departmentOptions = (getAllDepartmentResData?.data || [])?.map(department => ({
    value: department?._id,
    label: department?.name,
  }));

  const handleReset = () => {
    reset();
  };

  return (
    <Card>
      <CardContent className='space-y-4 max-w-[500px]'>
        <FieldGroup>
          <Controller
            control={control}
            name='name'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input placeholder='Enter Name' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='department'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Department</FieldLabel>
                <MultiSelect2
                  value={field.value ? [field.value?.id] : []}
                  options={departmentOptions}
                  singleSelect
                  onChange={value => {
                    if (value?.length) {
                      field.onChange({
                        id: value[0].value,
                        name: value[0].label,
                      });
                    } else {
                      field.onChange(null);
                    }
                  }}
                  clear={() => field.onChange(null)}
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {isSubmitting && <Spinner />}
          Submit
        </Button>

        <Button variant={'outline'} disabled={isSubmitting} onClick={handleReset}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DesignationCreateUpdateForm;
