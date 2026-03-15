'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { stringSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { TDepartmentSchema } from '../schema';

type TComponentProps = {
  onSubmit: (values: departmentFormSchemaType) => void;
  initialData?: TDepartmentSchema['Doc'];
  isSubmitting: boolean;
};

const departmentFormSchema = z.object({
  name: stringSchema('Name'),
});

export type departmentFormSchemaType = z.infer<typeof departmentFormSchema>;

const DepartmentCreateUpdateForm = ({ onSubmit, isSubmitting, initialData }: TComponentProps) => {
  const form = useForm<departmentFormSchemaType>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: '',
      ...initialData,
    },
  });

  const { handleSubmit, control, reset } = form;

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

export default DepartmentCreateUpdateForm;
