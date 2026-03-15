"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import MultiSelect2 from "@/components/ui/multi-select2";
import { Spinner } from "@/components/ui/spinner";
import { MonthOptions, YearOptions } from "@/lib/constants";
import { useGetAllEmployee } from "@/modules/employee/hooks";
import { stringSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { TPayrollSchema } from "../schema";

type TComponentProps = {
  onSubmit: (values: payrollFormSchemaType) => void;
  initialData?: TPayrollSchema["Doc"];
  isSubmitting: boolean;
};

const currentMonthIndex = new Date().getMonth() + 1;

const payrollFormSchema = z.object({
  employeeId: stringSchema("Employee"),
  month: stringSchema("Month"),
  year: stringSchema("Year"),
});

export type payrollFormSchemaType = z.infer<typeof payrollFormSchema>;

const PayrollCreateUpdateForm = ({
  onSubmit,
  isSubmitting,
}: TComponentProps) => {
  const form = useForm<payrollFormSchemaType>({
    resolver: zodResolver(payrollFormSchema),
  });

  const { handleSubmit, control, reset } = form;

  const { data: employeeData, isLoading: isEmployeeLoading } =
    useGetAllEmployee();

  const employeeOptions = (employeeData?.data || [])?.map((employee) => ({
    label: `${employee?.personalInfo?.firstName} ${employee?.personalInfo?.lastName}`,
    value: employee?._id,
  }));

  const handleReset = () => {
    reset();
  };

  return (
    <Card>
      <CardContent className="space-y-4 max-w-[500px]">
        <FieldGroup>
          <Controller
            control={control}
            name="employeeId"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Employee</FieldLabel>
                <MultiSelect2
                  options={employeeOptions}
                  loading={isEmployeeLoading}
                  disabled={isEmployeeLoading}
                  singleSelect
                  onChange={(value) => {
                    if (value?.length) {
                      field?.onChange(value?.[0]?.value);
                    } else {
                      field?.onChange("");
                    }
                  }}
                  value={field.value ? [field.value] : []}
                  clear={() => field?.onChange("")}
                />
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="month"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Month</FieldLabel>
                <MultiSelect2
                  options={MonthOptions.filter((month) => {
                    const monthValue = Number(month.value);
                    return (currentMonthIndex - monthValue + 12) % 12 <= 2;
                  })}
                  singleSelect
                  onChange={(value) => {
                    if (value?.length) {
                      field?.onChange(value?.[0]?.value);
                    } else {
                      field?.onChange("");
                    }
                  }}
                  value={field.value ? [field.value] : []}
                  clear={() => field?.onChange("")}
                />
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="year"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Year</FieldLabel>
                <MultiSelect2
                  options={YearOptions}
                  singleSelect
                  onChange={(value) => {
                    if (value?.length) {
                      field?.onChange(value?.[0]?.value);
                    } else {
                      field?.onChange("");
                    }
                  }}
                  value={field.value ? [field.value] : []}
                  clear={() => field?.onChange("")}
                />
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {isSubmitting && <Spinner />}
          Submit
        </Button>

        <Button
          variant={"outline"}
          disabled={isSubmitting}
          onClick={handleReset}
        >
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayrollCreateUpdateForm;
