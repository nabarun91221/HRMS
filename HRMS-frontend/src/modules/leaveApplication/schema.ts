import { TCommonSchema } from "@/modules/core/schema";

export enum LeaveApplicationStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export const LeaveApplicationViewMap = {
  [LeaveApplicationStatusEnum.PENDING]: "Pending",
  [LeaveApplicationStatusEnum.APPROVED]: "Approved",
  [LeaveApplicationStatusEnum.REJECTED]: "Rejected",
  [LeaveApplicationStatusEnum.CANCELLED]: "Cancelled",
};

export type TLeaveApplicationSchema = {
  Doc: {
    _id: string;
    employeeId: {
      personalInfo: {
        firstName: string;
        lastName: string;
      };
      _id: string;
      userId: {
        _id: string;
        email: string;
      };
    };
    leavePolicyId: {
      _id: string;
      name: string;
    };
    fromDate: string;
    toDate: string;
    totalDays: number;
    reason: string;
    status: LeaveApplicationStatusEnum;
    createdAt: string;
    updatedAt: string;
  };

  CreateLeaveApplicationPayload: {
    leavePolicyId: string;
    fromDate: string;
    toDate: string;
    reason: string;
  };

  UpdateLeaveApplicationPayload: TLeaveApplicationSchema["CreateLeaveApplicationPayload"];

  CreateLeaveApplicationResponse: TCommonSchema["BaseApiResponse"] & {
    data: TLeaveApplicationSchema["Doc"];
  };

  UpdateLeaveApplicationResponse: TCommonSchema["BaseApiResponse"] & {
    data: TLeaveApplicationSchema["Doc"];
  };

  ChangeStatusPayload: {
    id: string;
    status: string;
  };

  GetAllLeaveApplicationResponse: TCommonSchema["BaseApiResponse"] & {
    data: TLeaveApplicationSchema["Doc"][];
  };

  GetMyLeaveApplicationResponse: TCommonSchema["BaseApiResponse"] & {
    data: TLeaveApplicationSchema["Doc"][];
  };

  GetLeaveApplicationResponse: TCommonSchema["BaseApiResponse"] & {
    data: TLeaveApplicationSchema["Doc"];
  };
};
