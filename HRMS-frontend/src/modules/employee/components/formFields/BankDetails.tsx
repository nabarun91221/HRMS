import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Controller, useFormContext } from 'react-hook-form';
import { employeeFormSchemaType } from '../EmployeeCreateUpdateForm';

const BankDetails = () => {
  const { control } = useFormContext<employeeFormSchemaType>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bank Details</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name='bankDetails.accountNumber'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Account Number</FieldLabel>
                <Input type='number' placeholder='Enter Account Number' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='bankDetails.ifsc'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>IFSC</FieldLabel>
                <Input type='text' placeholder='Enter IFSC' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='bankDetails.bankName'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Bank Name</FieldLabel>
                <Input type='text' placeholder='Enter Bank Name' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default BankDetails;
