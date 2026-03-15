import {
  emailSchema,
  longStringSchema,
  numberSchema,
  phoneNumberSchema,
  pinCodeSchema,
  stringSchema,
} from "@/utils/zod";
import z from "zod";

const employmentSchema = z.object({
  designation: z.object({
    id: z.string(),
    name: z.string(),
  }),
  department: z.object({
    id: z.string(),
    name: z.string(),
  }),
  employmentType: stringSchema("Employment Type"),
  baseSalary: numberSchema("Base Salary"),
  joiningDate: stringSchema("Joining Date"),
  confirmationDate: stringSchema("Confirmation Date"),
  status: stringSchema("Status"),
});

const baseSchema = z.object({
  personalInfo: z.object({
    firstName: stringSchema("First Name"),
    lastName: stringSchema("Last Name"),
    phone: phoneNumberSchema,
    dob: stringSchema("Date of Birth"),
    gender: stringSchema("Gender"),
  }),
  address: z.object({
    current: z.object({
      street: longStringSchema("Street"),
      city: stringSchema("City"),
      state: stringSchema("State"),
      zip: pinCodeSchema,
      country: stringSchema("Country"),
    }),
    permanent: z.object({
      street: longStringSchema("Street"),
      city: stringSchema("City"),
      state: stringSchema("State"),
      zip: pinCodeSchema,
      country: stringSchema("Country"),
    }),
  }),

  employeeCode: stringSchema("Employee Code"),

  bankDetails: z.object({
    accountNumber: stringSchema("Account Number"),
    ifsc: stringSchema("IFSC"),
    bankName: stringSchema("Bank Name"),
  }),

  documents: z.array(
    z.object({
      name: stringSchema("Document Name"),
      fileUrl: z.string(),
      publicId: z.string(),
    }),
  ),
});

const createSchema = baseSchema
  .extend({
    type: z.literal("create"),

    userCredentials: z.object({
      name: stringSchema("Name"),
      email: emailSchema,
    }),
    personalEmail: emailSchema,
    isEmailVerified: z.boolean(),
    employment: employmentSchema,
  })
  .superRefine((data, ctx) => {
    if (!data.isEmailVerified) {
      ctx.addIssue({
        code: "custom",
        message: "Email is not verified",
        path: ["personalEmail"],
      });
    }
  });

const updateSchema = baseSchema.extend({
  type: z.literal("update"),
  employment: employmentSchema.omit({ baseSalary: true }),
});

export const employeeFormSchema = z.discriminatedUnion("type", [
  createSchema,
  updateSchema,
]);
