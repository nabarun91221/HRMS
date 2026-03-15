import { TCommonSchema } from "../core/schema";
import { EmployeeStatusEnum } from "../employee/schema";

export enum UserRoleEnum {
  COMPANY_ADMIN = "COMPANY_ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export type TAuthSchema = {
  LoginPayload: {
    email: string;
    password: string;
  };

  ResetPassPayload: {
    password: string;
    verificationToken: string;
  };

  ForgotPassPayload: {
    phone: string;
  };

  ForgotPassVerifyOtpPayload: {
    otp: string;
    purpose: string;
    identifier: string;
  };

  ForgotPassVerifyOtpResponse: TCommonSchema["BaseApiResponse"] & {
    data: { verificationToken: string };
  };

  RefreshTokenPayload: {
    refreshToken: string;
    accessToken: string;
  };

  GetLoggedInResponse: TCommonSchema["BaseApiResponse"] & {
    user: TAuthSchema["ProfileResponse"];
  };

  Role: {
    _id: string;
    role: string;
    roleDisplayName: string;
  };

  ProfileResponse: {
    id: string;
    name: string;
    email: string;
  } & (
    | {
        role: UserRoleEnum.COMPANY_ADMIN;
      }
    | {
        role: UserRoleEnum.EMPLOYEE;
        employeeId: {
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
            employmentType: string;
            joiningDate: string;
            confirmationDate: string;
            status: EmployeeStatusEnum;
            designationId: {
              _id: string;
              name: string;
            };
            departmentId: {
              _id: string;
              name: string;
            };
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
            _id: string;
            uploadedAt: string;
          }[];
        };
      }
  );
  TokenRefreshResponse: TCommonSchema["BaseApiResponse"] & {
    data: {
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
    };
  };

  ChangePasswordPayload: {
    newPassword: string;
    oldPassword: string;
  };

  ProfileUpdatePayload: FormData;

  ProfileUpdateResponse: TCommonSchema & {
    data: TAuthSchema["ProfileResponse"];
  };

  GetProfileDetailsResponse: TCommonSchema["BaseApiResponse"] & {
    data: { user: TAuthSchema["ProfileResponse"] };
  };
};
