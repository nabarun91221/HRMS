'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { numberSchema, numberSchemaOptional, stringSchema } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { TLeavePolicySchema } from '../schema';

type TComponentProps = {
  onSubmit: (values: leavePolicyFormSchemaType) => void;
  initialData?: TLeavePolicySchema['Doc'];
  isSubmitting: boolean;
};

const leavePolicyFormSchema = z
  .object({
    name: stringSchema('Name'),
    daysPerYear: numberSchema('Days per year'),
    carryForward: z.boolean(),
    maxCarryForwardDays: numberSchemaOptional('Max carry forward days'),
    isPaid: z.boolean(),
  })
  .refine(data => {
    if (data.carryForward && !data.maxCarryForwardDays) {
      return {
        message: 'Max carry forward days is required',
        path: ['maxCarryForwardDays'],
      };
    }
    return true;
  });

export type leavePolicyFormSchemaType = z.infer<typeof leavePolicyFormSchema>;

const LeavePolicyCreateUpdateForm = ({ onSubmit, isSubmitting, initialData }: TComponentProps) => {
  const form = useForm<leavePolicyFormSchemaType>({
    resolver: zodResolver(leavePolicyFormSchema),
    defaultValues: {
      name: '',
      carryForward: false,
      isPaid: false,
      daysPerYear: '',
      maxCarryForwardDays: '',
      ...initialData,
    },
  });

  const { handleSubmit, control, reset, watch } = form;

  const isCarryForward = watch('carryForward');

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
            name='daysPerYear'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Days per year</FieldLabel>
                <Input type='number' placeholder='Enter Days per year' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='carryForward'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Carry forward</FieldLabel>
                <FieldContent>
                  <Switch checked={field?.value} onCheckedChange={field?.onChange} />
                </FieldContent>
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          {isCarryForward && (
            <Controller
              control={control}
              name='maxCarryForwardDays'
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Max carry forward days</FieldLabel>
                  <Input type='number' placeholder='Enter Max carry forward days' {...field} />
                  {fieldState?.invalid && (
                    <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                  )}
                </Field>
              )}
            />
          )}

          <Controller
            control={control}
            name='isPaid'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Is paid</FieldLabel>
                <FieldContent>
                  <Switch checked={field?.value} onCheckedChange={field?.onChange} />
                </FieldContent>

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

export default LeavePolicyCreateUpdateForm;
