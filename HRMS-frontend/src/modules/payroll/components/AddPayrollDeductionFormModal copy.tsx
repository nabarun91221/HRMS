"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { numberSchema, stringSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type TComponentProps = {
  open: boolean;
  close: () => void;
  onSubmit: (values: payrollDeductionFormSchemaType) => void;
  isSubmitting: boolean;
};

const payrollDeductionFormSchema = z.object({
  name: stringSchema("Name"),
  amount: numberSchema("Amount"),
});

export type payrollDeductionFormSchemaType = z.infer<
  typeof payrollDeductionFormSchema
>;

const AddPayrollDeductionFormModal = ({
  close,
  open,
  onSubmit,
  isSubmitting,
}: TComponentProps) => {
  const form = useForm<payrollDeductionFormSchemaType>({
    resolver: zodResolver(payrollDeductionFormSchema),
  });

  const { handleSubmit, control, reset } = form;

  const handleReset = () => {
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Deduction</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input {...field} placeholder="Name" />
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
            name="amount"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Amount</FieldLabel>
                <Input type="number" {...field} placeholder="Amount" />
                {fieldState?.invalid && (
                  <FieldError
                    errors={[fieldState?.error, fieldState?.error?.root]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => {
              handleReset();
              close?.();
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting && <Spinner />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayrollDeductionFormModal;
