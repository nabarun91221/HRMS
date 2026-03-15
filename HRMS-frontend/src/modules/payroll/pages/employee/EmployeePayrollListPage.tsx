"use client";

import ConfirmModal, { ConfirmActionsType } from "@/components/ConfirmDialog";
import PageHeader from "@/components/page-header";
import TableSortFilter from "@/components/tanstack-table/filters/table-sort-filter";
import { TanstackDataTable } from "@/components/tanstack-table/tanstack-table";
import TanstackTableHeader from "@/components/tanstack-table/tanstack-table-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SortEnum } from "@/modules/core/constants";
import { TCommonSchema } from "@/modules/core/schema";
import { Icon } from "@iconify-icon/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";
import { useDownloadMyPayroll, useGetAllMyPayroll } from "../../hooks";
import { TPayrollSchema } from "../../schema";

export default function EmployeePayrollListPage() {
  const [payload, setPayload] = useState<TCommonSchema["BaseGetAllPayload"]>({
    sort: SortEnum.Descending,
  });

  const { data: getAllPayrollResData, isPending } = useGetAllMyPayroll(payload);

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const payrollList = getAllPayrollResData?.data ?? [];

  const { mutate: downloadPayroll } = useDownloadMyPayroll();

  const handleDownloadPayroll = (payrollId: string) => {
    downloadPayroll(payrollId);
  };

  const columnDef = useMemo(
    () =>
      [
        {
          header: "Net Salary (INR)",
          accessorKey: "netSalary",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.netSalary}
            </div>
          ),
        },

        {
          header: "Earnings (INR)",
          accessorKey: "earnings",
          cell: ({ row }) => (
            <div className="min-w-[300px] max-h-[150px] overflow-y-auto space-y-2  text-wrap wrap-anywhere">
              {row?.original?.earnings?.map((earning) => (
                <div key={earning?._id}>
                  {earning?.name} : {earning?.amount}
                </div>
              ))}
            </div>
          ),
        },
        {
          header: "Deductions (INR)",
          accessorKey: "deductions",
          cell: ({ row }) => (
            <div className="min-w-[300px] max-h-[150px] overflow-y-auto space-y-2  text-wrap wrap-anywhere">
              {row?.original?.deductions?.map((deduction) => (
                <div key={deduction?._id}>
                  {deduction?.name} : {deduction?.amount}
                </div>
              ))}
            </div>
          ),
        },
        {
          header: "Status",
          accessorKey: "status",
          enableSorting: false,
          cell: ({ row }) => {
            return <Badge>{row?.original?.status}</Badge>;
          },
        },
        {
          header: "Action",
          accessorKey: "action",
          enableSorting: false,
          cell: ({ row }) => {
            return (
              <div className="min-w-[200px] flex justify-center">
                <Button
                  onClick={() => handleDownloadPayroll(row?.original?._id)}
                  size={"sm"}
                  variant={"outline"}
                >
                  <Icon icon="lucide:download" />
                  Download
                </Button>
              </div>
            );
          },
        },
      ] as ColumnDef<TPayrollSchema["Doc"]>[],
    [],
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Payrolls" />

      <Card>
        <CardHeader>
          <TanstackTableHeader
            showSearch={false}
            filters={[
              {
                id: "sort",
                Component: () => (
                  <TableSortFilter
                    value={payload.sort}
                    onChange={(value) => {
                      setPayload((prev) => ({
                        ...prev,
                        sort: value,
                      }));
                    }}
                    clear={() =>
                      setPayload((prev) => ({
                        ...prev,
                        sort: undefined,
                      }))
                    }
                  />
                ),
              },
            ]}
          />
        </CardHeader>
        <CardContent>
          <TanstackDataTable<TPayrollSchema["Doc"]>
            columns={columnDef}
            data={payrollList}
            isLoading={isPending}
            isPaginated={false}
          />
        </CardContent>
      </Card>

      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}
