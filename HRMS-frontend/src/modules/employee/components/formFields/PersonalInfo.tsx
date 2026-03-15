import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Controller, useFormContext } from 'react-hook-form';

import DatePicker from '@/components/date-picker/date-picker';
import PhoneInput from '@/components/phone-input';
import { Input } from '@/components/ui/input';
import MultiSelect2 from '@/components/ui/multi-select2';
import { GenderEnum, GenderEnumViewMap } from '../../schema';
import { employeeFormSchemaType } from '../EmployeeCreateUpdateForm';

const genderEnumOptions = Object.values(GenderEnum)?.map(value => ({
  label: GenderEnumViewMap[value],
  value,
}));

const PersonalInfo = () => {
  const { control } = useFormContext<employeeFormSchemaType>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name='personalInfo.firstName'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input placeholder='Enter First Name' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name='personalInfo.lastName'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input placeholder='Enter Last Name' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name='personalInfo.phone'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <PhoneInput placeholder='Enter Phone' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='personalInfo.dob'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>DOB</FieldLabel>
                <DatePicker {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='personalInfo.gender'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Gender</FieldLabel>
                <MultiSelect2
                  options={genderEnumOptions}
                  singleSelect
                  onChange={value => {
                    if (value?.length) {
                      field?.onChange(value?.[0]?.value);
                    } else {
                      field?.onChange('');
                    }
                  }}
                  value={field.value ? [field.value] : []}
                  clear={() => field?.onChange('')}
                />
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

export default PersonalInfo;
