import { useAuth } from "@/components/auth-handler";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertDateStringToReadableFormat } from "@/lib/utils";
import { UserRoleEnum } from "@/modules/auth/schema";
import { EmployeeStatusEnumViewMap } from "@/modules/employee/schema";
import {
  BriefcaseIcon,
  CalendarIcon,
  IdCardIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

// ── helper ────────────────────────────────────────────────────────────────────

function getInitials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-foreground">
          {value ?? <span className="text-muted-foreground/60">—</span>}
        </p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="divide-y divide-border px-4 pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const ProfilePage = () => {
  const { loggedInUser } = useAuth();

  const isEmployee = loggedInUser?.role === UserRoleEnum.EMPLOYEE;
  const employee = isEmployee ? loggedInUser?.employeeId : undefined;
  const personal = employee?.personalInfo;
  const address = employee?.address;
  const employment = employee?.employment;
  const bank = employee?.bankDetails;

  const roleLabel = isEmployee ? "Employee" : "Company Admin";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── Hero card ─────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-transparent">
        {/* <div className="h-24 " /> */}
        <CardContent className="py-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-6">
            <Avatar className="size-20 border-4 border-background shadow-md text-2xl">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xl">
                {getInitials(loggedInUser?.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col gap-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold leading-none">
                  {loggedInUser?.name ?? "—"}
                </h1>
                <Badge variant="secondary">{roleLabel}</Badge>
                {employee?.employeeCode && (
                  <Badge variant="outline">{employee.employeeCode}</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {loggedInUser?.email}
              </p>
              {employment?.designationId?.name && (
                <p className="text-sm font-medium text-foreground/80">
                  {employment.designationId.name}
                  {employment.departmentId?.name && (
                    <span className="text-muted-foreground">
                      {" "}
                      · {employment.departmentId.name}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Account info (always visible) ─────────────────────────────────── */}
      {!isEmployee && (
        <SectionCard title="Account Information">
          <InfoRow
            icon={UserIcon}
            label="Full Name"
            value={loggedInUser?.name}
          />
          <InfoRow icon={MailIcon} label="Email" value={loggedInUser?.email} />
        </SectionCard>
      )}

      {/* ── Employee sections (tabs) ───────────────────────────────────────── */}
      {isEmployee && (
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
          </TabsList>

          {/* Personal ──────────────────────────────────────────────────────── */}
          <TabsContent value="personal" className="space-y-4">
            <SectionCard title="Basic Info">
              <InfoRow
                icon={UserIcon}
                label="Full Name"
                value={loggedInUser?.name}
              />
              <InfoRow
                icon={MailIcon}
                label="Email"
                value={loggedInUser?.email}
              />
              <InfoRow
                icon={IdCardIcon}
                label="Employee Code"
                value={employee?.employeeCode}
              />
            </SectionCard>

            <SectionCard title="Personal Details">
              <InfoRow
                icon={UserIcon}
                label="First Name"
                value={personal?.firstName}
              />
              <InfoRow
                icon={UserIcon}
                label="Last Name"
                value={personal?.lastName}
              />
              <InfoRow icon={PhoneIcon} label="Phone" value={personal?.phone} />
              <InfoRow
                icon={CalendarIcon}
                label="Date of Birth"
                value={
                  personal?.dob
                    ? convertDateStringToReadableFormat(personal.dob)
                    : ""
                }
              />
              <InfoRow
                icon={UserIcon}
                label="Gender"
                value={personal?.gender}
              />
            </SectionCard>
          </TabsContent>

          {/* Employment ────────────────────────────────────────────────────── */}
          <TabsContent value="employment" className="space-y-4">
            {employment && (
              <SectionCard title="Employment Details">
                <InfoRow
                  icon={BriefcaseIcon}
                  label="Designation"
                  value={employment?.designationId?.name}
                />
                <InfoRow
                  icon={BriefcaseIcon}
                  label="Department"
                  value={employment?.departmentId?.name}
                />
                <InfoRow
                  icon={BriefcaseIcon}
                  label="Employment Type"
                  value={employment?.employmentType}
                />
                <InfoRow
                  icon={CalendarIcon}
                  label="Joining Date"
                  value={convertDateStringToReadableFormat(
                    employment?.joiningDate,
                  )}
                />
                <InfoRow
                  icon={CalendarIcon}
                  label="Confirmation Date"
                  value={convertDateStringToReadableFormat(
                    employment.confirmationDate,
                  )}
                />
                <InfoRow
                  icon={IdCardIcon}
                  label="Status"
                  value={EmployeeStatusEnumViewMap[employment?.status]}
                />
              </SectionCard>
            )}
          </TabsContent>

          {/* Address ───────────────────────────────────────────────────────── */}
          <TabsContent value="address" className="space-y-4">
            <SectionCard title="Current Address">
              <InfoRow
                icon={MapPinIcon}
                label="Street"
                value={address?.current?.street}
              />
              <InfoRow
                icon={MapPinIcon}
                label="City"
                value={address?.current?.city}
              />
              <InfoRow
                icon={MapPinIcon}
                label="State"
                value={address?.current?.state}
              />
              <InfoRow
                icon={MapPinIcon}
                label="ZIP"
                value={address?.current?.zip}
              />
              <InfoRow
                icon={MapPinIcon}
                label="Country"
                value={address?.current?.country}
              />
            </SectionCard>

            <SectionCard title="Permanent Address">
              <InfoRow
                icon={MapPinIcon}
                label="Street"
                value={address?.permanent?.street}
              />
              <InfoRow
                icon={MapPinIcon}
                label="City"
                value={address?.permanent?.city}
              />
              <InfoRow
                icon={MapPinIcon}
                label="State"
                value={address?.permanent?.state}
              />
              <InfoRow
                icon={MapPinIcon}
                label="ZIP"
                value={address?.permanent?.zip}
              />
              <InfoRow
                icon={MapPinIcon}
                label="Country"
                value={address?.permanent?.country}
              />
            </SectionCard>
          </TabsContent>

          {/* Bank ──────────────────────────────────────────────────────────── */}
          <TabsContent value="bank" className="space-y-4">
            <SectionCard title="Bank Details">
              <InfoRow
                icon={BriefcaseIcon}
                label="Bank Name"
                value={bank?.bankName}
              />
              <InfoRow
                icon={IdCardIcon}
                label="Account Number"
                value={bank?.accountNumber}
              />
              <InfoRow icon={IdCardIcon} label="IFSC Code" value={bank?.ifsc} />
            </SectionCard>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProfilePage;
