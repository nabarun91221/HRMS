import { useGetAllDepartment } from '@/modules/department/hooks';
import { useGetAllDesignation } from '@/modules/designation/hooks';
import { Controller, useFormContext } from 'react-hook-form';
import { employeeFormSchemaType } from '../EmployeeCreateUpdateForm';

import DatePicker from '@/components/date-picker/date-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import MultiSelect2 from '@/components/ui/multi-select2';
import { useMemo } from 'react';
import {
  EmployeeStatusEnum,
  EmployeeStatusEnumViewMap,
  EmploymentTypeEnum,
  EmploymentTypeEnumViewMap,
} from '../../schema';

const employmentTypeOptions = Object.values(EmploymentTypeEnum).map(value => ({
  label: EmploymentTypeEnumViewMap[value],
  value,
}));

const statusOptions = Object.values(EmployeeStatusEnum).map(value => ({
  label: EmployeeStatusEnumViewMap[value],
  value,
}));

const Employment = ({ type }: { type: 'create' | 'update' }) => {
  const { control, watch, setValue } = useFormContext<employeeFormSchemaType>();

  const selectedDepartment = watch('employment.department');

  const { data: departmentData, isLoading: isLoadingDepartment } = useGetAllDepartment();
  const departmentOptions = useMemo(
    () =>
      (departmentData?.data || [])?.map(department => {
        return {
          value: department._id,
          label: department.name,
        };
      }),
    [departmentData]
  );

  const { data: designationData, isLoading: isLoadingDesignation } = useGetAllDesignation();
  const designationOptions = useMemo(() => {
    if (!selectedDepartment) {
      return [];
    }
    return (designationData?.data || [])
      ?.filter(designation => designation.departmentId?._id === selectedDepartment?.id)
      ?.map(designation => {
        return {
          value: designation._id,
          label: designation.name,
        };
      });
  }, [designationData, selectedDepartment]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={control}
            name='employeeCode'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Employee Code</FieldLabel>
                <Input type='text' placeholder='Enter Employee Code' {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name='employment.department'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Department</FieldLabel>
                <MultiSelect2
                  options={departmentOptions}
                  loading={isLoadingDepartment}
                  singleSelect
                  onChange={value => {
                    if (value?.length) {
                      field?.onChange({
                        id: value?.[0]?.value,
                        name: value?.[0]?.label,
                      });
                    } else {
                      field?.onChange('');
                    }

                    setValue(
                      'employment.designation',
                      null as unknown as employeeFormSchemaType['employment']['designation']
                    );
                  }}
                  value={field.value?.id ? [field.value?.id] : []}
                  clear={() => field?.onChange('')}
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='employment.designation'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Designation</FieldLabel>
                <MultiSelect2
                  options={designationOptions}
                  loading={isLoadingDesignation}
                  disabled={!selectedDepartment}
                  singleSelect
                  onChange={value => {
                    if (value?.length) {
                      field?.onChange({
                        id: value?.[0]?.value,
                        name: value?.[0]?.label,
                      });
                    } else {
                      field?.onChange('');
                    }
                  }}
                  value={field.value?.id ? [field.value?.id] : []}
                  clear={() => field?.onChange('')}
                />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          {type === 'create' && (
            <Controller
              control={control}
              name='employment.baseSalary'
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Base Salary</FieldLabel>
                  <Input type='number' placeholder='Enter Base Salary' {...field} />
                  {fieldState?.invalid && (
                    <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                  )}
                </Field>
              )}
            />
          )}

          <Controller
            control={control}
            name='employment.joiningDate'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Joining Date</FieldLabel>
                <DatePicker {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='employment.confirmationDate'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Confirmation Date</FieldLabel>
                <DatePicker {...field} />
                {fieldState?.invalid && (
                  <FieldError errors={[fieldState?.error, fieldState?.error?.root]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name='employment.employmentType'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Employment Type</FieldLabel>
                <MultiSelect2
                  options={employmentTypeOptions}
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

          <Controller
            control={control}
            name='employment.status'
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Status</FieldLabel>
                <MultiSelect2
                  options={statusOptions}
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

export default Employment;
