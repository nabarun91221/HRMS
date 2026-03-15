"use client";

import Loading from "@/components/Loading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { convertDateStringToReadableFormat, downloadFile } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";
import { useParams, useRouter } from "next/navigation";
import { useGetEmployee } from "../hooks";
import {
  EmployeeStatusEnum,
  EmployeeStatusEnumViewMap,
  EmploymentTypeEnumViewMap,
  GenderEnumViewMap,
} from "../schema";

// ── helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", { dateStyle: "medium" })
    : "—";

const statusVariant = (
  status: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case EmployeeStatusEnum.ACTIVE:
      return "default";
    case EmployeeStatusEnum.PROBATION:
      return "secondary";
    case EmployeeStatusEnum.RESIGNED:
    case EmployeeStatusEnum.TERMINATED:
      return "destructive";
    default:
      return "outline";
  }
};

// ── sub-components ────────────────────────────────────────────────────────────

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    <span className="text-sm font-medium text-foreground">{value ?? "—"}</span>
  </div>
);

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-base">
        <Icon icon={icon} className="text-primary text-lg" />
        {title}
      </CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </CardContent>
  </Card>
);

// ── page ─────────────────────────────────────────────────────────────────────

const EmployeeViewPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data, isLoading } = useGetEmployee(id);
  const employeeDetails = data?.data;

  if (isLoading) return <Loading />;

  if (!employeeDetails) {
    return (
      <div className="h-full w-full gap-2 flex justify-center items-center">
        <Icon icon={"lucide:alert-circle"} className="text-2xl text-red-500" />
        Employee not found
      </div>
    );
  }

  const {
    personalInfo,
    employment,
    address,
    bankDetails,
    documents,
    employeeCode,
  } = employeeDetails;

  const fullName =
    `${personalInfo?.firstName ?? ""} ${personalInfo?.lastName ?? ""}`.trim();
  const initials =
    `${personalInfo?.firstName?.[0] ?? ""}${personalInfo?.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Employee Details"
        backButton
        onBackClick={() => router.back()}
      />

      {/* Identity banner */}
      <Card>
        <CardContent className="flex items-center gap-4 py-5">
          <Avatar className="h-14 w-14 text-lg">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold truncate">{fullName || "—"}</p>
            <p className="text-sm text-muted-foreground">
              {employment?.designationId?.name ?? "—"} ·{" "}
              {employment?.departmentId?.name ?? "—"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge variant={statusVariant(employment?.status)}>
              {EmployeeStatusEnumViewMap[
                employment?.status as EmployeeStatusEnum
              ] ??
                employment?.status ??
                "—"}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              #{employeeCode ?? "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Personal Information */}
        <SectionCard title="Personal Information" icon="lucide:user">
          <DetailRow label="First Name" value={personalInfo?.firstName} />
          <DetailRow label="Last Name" value={personalInfo?.lastName} />
          <DetailRow label="Phone" value={personalInfo?.phone} />
          <DetailRow
            label="Date of Birth"
            value={convertDateStringToReadableFormat(personalInfo?.dob)}
          />
          <DetailRow
            label="Gender"
            value={
              personalInfo?.gender
                ? ((GenderEnumViewMap as Record<string, string>)[
                    personalInfo.gender
                  ] ?? personalInfo.gender)
                : undefined
            }
          />
        </SectionCard>

        {/* Employment Details */}
        <SectionCard title="Employment Details" icon="lucide:briefcase">
          <DetailRow label="Employee Code" value={employeeCode} />
          <DetailRow
            label="Department"
            value={employment?.departmentId?.name}
          />
          <DetailRow
            label="Designation"
            value={employment?.designationId?.name}
          />
          <DetailRow
            label="Employment Type"
            value={
              employment?.employmentType
                ? ((EmploymentTypeEnumViewMap as Record<string, string>)[
                    employment.employmentType
                  ] ?? employment.employmentType)
                : undefined
            }
          />
          <DetailRow
            label="Joining Date"
            value={convertDateStringToReadableFormat(employment?.joiningDate)}
          />
          <DetailRow
            label="Confirmation Date"
            value={convertDateStringToReadableFormat(
              employment?.confirmationDate,
            )}
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </span>
            <Badge
              variant={statusVariant(employment?.status)}
              className="w-fit"
            >
              {EmployeeStatusEnumViewMap[
                employment?.status as EmployeeStatusEnum
              ] ??
                employment?.status ??
                "—"}
            </Badge>
          </div>
        </SectionCard>

        {/* Current Address */}
        <SectionCard title="Current Address" icon="lucide:map-pin">
          <DetailRow label="Street" value={address?.current?.street} />
          <DetailRow label="City" value={address?.current?.city} />
          <DetailRow label="State" value={address?.current?.state} />
          <DetailRow label="ZIP" value={address?.current?.zip} />
          <DetailRow label="Country" value={address?.current?.country} />
        </SectionCard>

        {/* Permanent Address */}
        <SectionCard title="Permanent Address" icon="lucide:home">
          <DetailRow label="Street" value={address?.permanent?.street} />
          <DetailRow label="City" value={address?.permanent?.city} />
          <DetailRow label="State" value={address?.permanent?.state} />
          <DetailRow label="ZIP" value={address?.permanent?.zip} />
          <DetailRow label="Country" value={address?.permanent?.country} />
        </SectionCard>

        {/* Bank Details */}
        <SectionCard title="Bank Details" icon="lucide:landmark">
          <DetailRow label="Bank Name" value={bankDetails?.bankName} />
          <DetailRow
            label="Account Number"
            value={bankDetails?.accountNumber}
          />
          <DetailRow label="IFSC Code" value={bankDetails?.ifsc} />
        </SectionCard>

        {/* Documents */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Icon icon="lucide:file-text" className="text-primary text-lg" />
              Documents
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            {documents?.length ? (
              <ul className="space-y-2">
                {documents.map((doc, idx) => (
                  <li key={idx}>
                    <Button
                      variant={"link"}
                      onClick={() => downloadFile(doc.fileUrl, doc.name)}
                    >
                      <Icon
                        icon="lucide:paperclip"
                        className="text-base shrink-0"
                      />
                      {doc.name || `Document ${idx + 1}`}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents uploaded.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeViewPage;
