import { TCommonSchema } from "@/modules/core/schema";

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export const GenderEnumViewMap = {
  [GenderEnum.MALE]: "Male",
  [GenderEnum.FEMALE]: "Female",
  [GenderEnum.OTHER]: "Other",
};

export enum EmploymentTypeEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERN = "INTERN",
}

export const EmploymentTypeEnumViewMap = {
  [EmploymentTypeEnum.FULL_TIME]: "Full Time",
  [EmploymentTypeEnum.PART_TIME]: "Part Time",
  [EmploymentTypeEnum.CONTRACT]: "Contract",
  [EmploymentTypeEnum.INTERN]: "Intern",
};

export const EmploymentTypeOptions = Object.entries(
  EmploymentTypeEnumViewMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));

export enum EmployeeStatusEnum {
  ACTIVE = "ACTIVE",
  PROBATION = "PROBATION",
  RESIGNED = "RESIGNED",
  TERMINATED = "TERMINATED",
}

export const EmployeeStatusEnumViewMap = {
  [EmployeeStatusEnum.ACTIVE]: "Active",
  [EmployeeStatusEnum.PROBATION]: "Probation",
  [EmployeeStatusEnum.RESIGNED]: "Resigned",
  [EmployeeStatusEnum.TERMINATED]: "Terminated",
};

export type TEmployeeSchema = {
  Doc: {
    personalInfo: {
      firstName: string;
      lastName: string;
      phone: string;
      dob: string;
      gender: GenderEnum;
    };
    employment: {
      designationId: {
        _id: string;
        name: string;
      };
      departmentId: {
        _id: string;
        name: string;
      };

      employmentType: EmploymentTypeEnum;
      joiningDate: string;
      confirmationDate: string;
      status: EmployeeStatusEnum;
    };
    _id: string;
    employeeCode: string;
  };

  CreateEmployeePayload: {
    personalInfo: {
      firstName: string;
      lastName: string;
      phone: string;
      dob: string;
      gender: string;
    };
    employeeCode: string;
    address: {
      current: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      };
      permanent: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      };
    };
    employment: {
      designationId: string;
      departmentId: string;
      employmentType: string;
      baseSalary: number;
      joiningDate: string;
      confirmationDate: string;
      status: string;
    };
    bankDetails: {
      accountNumber: string;
      ifsc: string;
      bankName: string;
    };
    documents: {
      name: string;
      fileUrl: string;
      publicId: string;
    }[];
    userCredentials: {
      name: string;
      email: string;
    };
    assignedTo: {
      email: string;
    };
  };

  UpdateEmployeePayload: Omit<
    TEmployeeSchema["CreateEmployeePayload"],
    "userCredentials" | "assignedTo" | "employment"
  > & {
    employment: Omit<
      TEmployeeSchema["CreateEmployeePayload"]["employment"],
      "baseSalary"
    >;
  };

  CreateEmployeeResponse: TCommonSchema["BaseApiResponse"] & {
    data: TEmployeeSchema["Doc"];
  };

  UpdateEmployeeResponse: TCommonSchema["BaseApiResponse"] & {
    data: TEmployeeSchema["Doc"];
  };

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAllEmployeePayload: TCommonSchema["BaseGetAllPayload"] & {
    employmentType?: EmploymentTypeEnum;
    name?: string;
    departmentId?: string;
    designationId?: string;
    employeeCode?: string;
  };

  GetAllEmployeeResponse: TCommonSchema["BaseApiResponse"] & {
    data: TEmployeeSchema["Doc"][];
  };

  SendPersonalEmailOptPayload: {
    email: string;
  };

  VerifyPersonalEmailOptPayload: {
    email: string;
    otp: number;
  };

  Employee: {
    personalInfo: {
      firstName: string;
      lastName: string;
      phone: string;
      dob: string;
      gender: string;
    };
    address: {
      current: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
      };
      permanent: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
      };
    };
    employment: {
      designationId: {
        _id: string;
        name: string;
      };
      departmentId: {
        _id: string;
        name: string;
      };
      employmentType: string;
      joiningDate: string;
      confirmationDate: string;
      status: string;
    };
    bankDetails: {
      accountNumber: string;
      ifsc: string;
      bankName: string;
    };
    _id: string;
    userId: string;
    employeeCode: string;
    documents: {
      name: string;
      fileUrl: string;
      publicId: string;
    }[];
  };

  GetEmployeeResponse: TCommonSchema["BaseApiResponse"] & {
    data: TEmployeeSchema["Employee"];
  };
};
