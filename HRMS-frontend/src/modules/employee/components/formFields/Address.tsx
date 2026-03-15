import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useFormContext } from 'react-hook-form';
import { employeeFormSchemaType } from '../EmployeeCreateUpdateForm';

const Address = () => {
  const { control, setValue, getValues } = useFormContext<employeeFormSchemaType>();

  const onSetSameAsCurrentAddress = () => {
    setValue('address.permanent', getValues('address.current'));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Current</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  control={control}
                  name='address.current.street'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Street</FieldLabel>
                      <Textarea placeholder='Enter Street' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name='address.current.city'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>City</FieldLabel>
                      <Input placeholder='Enter City' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name='address.current.state'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>State</FieldLabel>
                      <Input placeholder='Enter State' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name='address.current.country'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Country</FieldLabel>
                      <Input placeholder='Enter Country' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name='address.current.zip'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Pin Code</FieldLabel>
                      <Input type='number' placeholder='Enter Pin Code' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Permanent
                <Button onClick={onSetSameAsCurrentAddress} variant={'link'}>
                  Same as current
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  control={control}
                  name='address.permanent.street'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Street</FieldLabel>
                      <Textarea placeholder='Enter Street' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name='address.permanent.city'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>City</FieldLabel>
                      <Input placeholder='Enter City' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name='address.permanent.state'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>State</FieldLabel>
                      <Input placeholder='Enter State' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name='address.permanent.country'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Country</FieldLabel>
                      <Input placeholder='Enter Country' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name='address.permanent.zip'
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Pin Code</FieldLabel>
                      <Input type='number' placeholder='Enter Pin Code' {...field} />
                      {fieldState?.invalid && (
                        <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default Address;
