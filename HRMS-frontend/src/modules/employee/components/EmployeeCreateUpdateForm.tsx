"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { TEmployeeSchema } from "../schema";
// import Address from './formFields/Address';
// import Employment from './formFields/Employment';
import { employeeFormSchema } from "../zod";
import Address from "./formFields/Address";
import BankDetails from "./formFields/BankDetails";
import Documents from "./formFields/Documents";
import Employment from "./formFields/Employment";
import PersonalInfo from "./formFields/PersonalInfo";
import UserCredentials from "./formFields/UserCredentials";

type TComponentProps = {
  onSubmit: (values: employeeFormSchemaType) => void;
  initialData?: TEmployeeSchema["Employee"];
  isSubmitting: boolean;
  type: "create" | "update";
};

export type employeeFormSchemaType = z.infer<typeof employeeFormSchema>;

const EmployeeCreateUpdateForm = ({
  onSubmit,
  isSubmitting,
  initialData,
  type,
}: TComponentProps) => {
  const form = useForm<employeeFormSchemaType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      type,

      address: initialData?.address,
      bankDetails: initialData?.bankDetails,
      documents: initialData?.documents,
      employeeCode: initialData?.employeeCode,
      employment: {
        ...initialData?.employment,
        designation: initialData?.employment?.designationId
          ? {
              id: initialData?.employment?.designationId?._id,
              name: initialData?.employment?.designationId?.name,
            }
          : undefined,
        department: initialData?.employment?.departmentId
          ? {
              id: initialData?.employment?.departmentId?._id,
              name: initialData?.employment?.departmentId?.name,
            }
          : undefined,
      },
      personalInfo: initialData?.personalInfo,
    },
  });

  const { handleSubmit, reset } = form;

  const handleReset = () => {
    reset();
  };

  return (
    <Card>
      <CardContent className="space-y-4 ">
        <FormProvider {...form}>
          <FieldGroup>
            <PersonalInfo />
            <Address />
            <Employment type={type} />
            <BankDetails />
            <Documents />
            {type === "create" && <UserCredentials />}
          </FieldGroup>
        </FormProvider>
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

export default EmployeeCreateUpdateForm;
