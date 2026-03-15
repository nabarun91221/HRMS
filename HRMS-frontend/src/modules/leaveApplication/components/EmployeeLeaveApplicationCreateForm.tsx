'use client';
import DatePicker from '@/components/date-picker/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import MultiSelect2 from '@/components/ui/multi-select2';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllLeavePolicy } from '@/modules/leavePolicy/hooks';
import { longStringSchema, stringSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

type TComponentProps = {
  onSubmit: (values: leaveApplicationFormSchemaType) => void;

  isSubmitting: boolean;
};

const leaveApplicationFormSchema = z
  .object({
    reason: longStringSchema('Reason', 2000, 5),
    leavePolicyId: stringSchema('Policy'),
    fromDate: stringSchema('From Date'),
    toDate: stringSchema('To Date'),
  })
  .refine(data => moment(data.toDate).isAfter(moment(data.fromDate)), {
    message: 'To Date must be after From Date',
    path: ['toDate'],
  });

export type leaveApplicationFormSchemaType = z.infer<typeof leaveApplicationFormSchema>;

const EmployeeLeaveApplicationCreateForm = ({ onSubmit, isSubmitting }: TComponentProps) => {
  const form = useForm<leaveApplicationFormSchemaType>({
    resolver: zodResolver(leaveApplicationFormSchema),
  });

  const { data: leavePolicyData, isLoading: isLeavePolicyLoading } = useGetAllLeavePolicy();

  const leavePolicyOptions = (leavePolicyData?.data || [])?.map(policy => {
    return {
      label: policy?.name,
      value: policy?._id,
    };
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
            name='fromDate'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>From Date</FieldLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Select From Date'
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='toDate'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>To Date</FieldLabel>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Select From Date'
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name='reason'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Reason</FieldLabel>
                <Textarea placeholder='Enter Reason' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={control}
            name='leavePolicyId'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Policy</FieldLabel>
                <MultiSelect2
                  singleSelect
                  loading={isLeavePolicyLoading}
                  options={leavePolicyOptions}
                  value={field.value ? [field?.value] : []}
                  clear={() => field.onChange('')}
                  onChange={value => {
                    if (value?.[0]) {
                      field.onChange(value?.[0]?.value);
                    } else {
                      field.onChange('');
                    }
                  }}
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

export default EmployeeLeaveApplicationCreateForm;
