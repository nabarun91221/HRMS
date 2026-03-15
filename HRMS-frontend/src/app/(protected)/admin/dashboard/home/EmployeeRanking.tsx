import Dropdown from "@/components/dropdown";
import PageHeader from "@/components/page-header";
import { TanstackDataTable } from "@/components/tanstack-table/tanstack-table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { MonthOptions, YearOptions } from "@/lib/constants";
import { useGetAdminEmployeeRanking } from "@/modules/analytics/hooks";
import { TAnalyticsSchema } from "@/modules/analytics/schema";
import { EmploymentTypeEnumViewMap } from "@/modules/employee/schema";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const columnDef: ColumnDef<TAnalyticsSchema["EmployeeRankingDoc"]>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
        {row?.original?.employee?.personalInfo?.firstName +
          " " +
          row?.original?.employee?.personalInfo?.lastName}
      </div>
    ),
  },

  {
    header: "Total Hours",
    accessorKey: "totalHours",
    cell: ({ row }) => (
      <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
        {Math.round(row?.original?.totalHours)}
      </div>
    ),
  },

  {
    header: "Overtime",
    accessorKey: "overtime",
    cell: ({ row }) => (
      <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
        {Math.round(row?.original?.overtime)}
      </div>
    ),
  },

  {
    header: "Employment Type",
    accessorKey: "employmentType",
    cell: ({ row }) => (
      <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
        <Badge>
          {
            EmploymentTypeEnumViewMap[
              row?.original?.employee?.employment?.employmentType
            ]
          }
        </Badge>
      </div>
    ),
  },
];

const currentYear = new Date().getFullYear();
const monthIndex = new Date().getMonth() + 1;

const EmployeeRanking = () => {
  const [analyticsQueryParams, setAnalyticsQueryParams] = useState({
    month: monthIndex,
    year: currentYear,
  });
  const {
    data: employeeRankingData,
    isLoading: isLoadingAdminEmployeeRanking,
  } = useGetAdminEmployeeRanking(analyticsQueryParams);

  const employeeRanking = employeeRankingData?.data ?? [];
  return (
    <div className="space-y-4">
      <div className="flex justify-between ">
        <PageHeader title="Employee ranking" />
        <div className="flex gap-2">
          <div className="space-y-2 w-[150px]">
            <Label>Month</Label>
            <Dropdown
              options={MonthOptions}
              value={String(analyticsQueryParams.month)}
              onChange={(value) =>
                setAnalyticsQueryParams((prev) => ({
                  ...prev,
                  month: Number(value),
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Dropdown
              options={YearOptions}
              value={String(analyticsQueryParams.year)}
              onChange={(value) =>
                setAnalyticsQueryParams((prev) => ({
                  ...prev,
                  year: Number(value),
                }))
              }
            />
          </div>
        </div>
      </div>
      <TanstackDataTable<TAnalyticsSchema["EmployeeRankingDoc"]>
        columns={columnDef}
        isPaginated={false}
        data={employeeRanking}
        isLoading={isLoadingAdminEmployeeRanking}
      />
    </div>
  );
};

export default EmployeeRanking;
