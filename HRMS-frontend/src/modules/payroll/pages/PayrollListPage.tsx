"use client";

import ConfirmModal, { ConfirmActionsType } from "@/components/ConfirmDialog";
import PageHeader from "@/components/page-header";
import TableSortFilter from "@/components/tanstack-table/filters/table-sort-filter";
import { TanstackDataTable } from "@/components/tanstack-table/tanstack-table";
import TanstackTableHeader from "@/components/tanstack-table/tanstack-table-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { SortEnum } from "@/modules/core/constants";
import { TCommonSchema } from "@/modules/core/schema";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { payrollDeductionFormSchemaType } from "../components/AddPayrollDeductionFormModal copy";
import {
  default as AddPayrollDeductionFormModal,
  default as AddPayrollEarningFormModal,
  payrollEarningFormSchemaType,
} from "../components/AddPayrollEarningFormModal";
import {
  useAddPayrollDeduction,
  useAddPayrollEarning,
  useApprovePayroll,
  useGetAllPayroll,
  useLockPayroll,
  useReCalculatePayroll,
} from "../hooks";
import { PayloadStatusEnum, TPayrollSchema } from "../schema";

export default function PayrollListPage() {
  const [payload, setPayload] = useState<TCommonSchema["BaseGetAllPayload"]>({
    sort: SortEnum.Descending,
  });

  const { data: getAllPayrollResData, isPending } = useGetAllPayroll(payload);
  const { mutate: approvePayroll } = useApprovePayroll();
  const { mutate: lockPayroll } = useLockPayroll();
  const { mutate: reCalculatePayroll } = useReCalculatePayroll();

  const router = useRouter();

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const payrollList = getAllPayrollResData?.data ?? [];

  const onApproveClick = (id: string) => {
    confirmModalRef.current?.open({
      title: "Approve Payroll",
      contentSlot: "Are you sure you want to approve this Payroll?",
      accept: () => {
        confirmModalRef?.current?.setIsLoading(true);
        approvePayroll(id, {
          onSettled: () => {
            confirmModalRef?.current?.setIsLoading(false);
          },
          onSuccess: () => {
            toast.success("Payroll approved successfully");
            confirmModalRef?.current?.close();
          },
        });
        return;
      },
      reject: () => {
        confirmModalRef?.current?.close();
      },
    });
  };

  const onLockClick = (id: string) => {
    confirmModalRef.current?.open({
      title: "Lock Payroll",
      contentSlot: "Are you sure you want to lock this Payroll?",
      accept: () => {
        confirmModalRef?.current?.setIsLoading(true);
        lockPayroll(id, {
          onSettled: () => {
            confirmModalRef?.current?.setIsLoading(false);
          },
          onSuccess: () => {
            toast.success("Payroll locked successfully");
            confirmModalRef?.current?.close();
          },
        });
        return;
      },
      reject: () => {
        confirmModalRef?.current?.close();
      },
    });
  };

  const onReCalculateClick = (id: string) => {
    confirmModalRef.current?.open({
      title: "Re-Calculate Payroll",
      contentSlot: "Are you sure you want to Re-Calculate this Payroll?",
      accept: () => {
        confirmModalRef?.current?.setIsLoading(true);
        reCalculatePayroll(id, {
          onSettled: () => {
            confirmModalRef?.current?.setIsLoading(false);
          },
          onSuccess: () => {
            toast.success("Payroll Re-Calculate successfully");
            confirmModalRef?.current?.close();
          },
        });
        return;
      },
      reject: () => {
        confirmModalRef?.current?.close();
      },
    });
  };

  const [deductionModalOpen, setDeductionModalOpen] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState<string | null>(
    null,
  );
  const {
    mutateAsync: addPayrollDeduction,
    isPending: isAddPayrollDeductionPending,
  } = useAddPayrollDeduction();

  const handleAddPayrollDeduction = (
    values: payrollDeductionFormSchemaType,
  ) => {
    if (!selectedPayrollId) {
      return;
    }

    addPayrollDeduction(
      {
        payrollId: selectedPayrollId,
        name: values.name,
        amount: Number(values.amount),
      },
      {
        onSuccess: () => {
          toast.success("Payroll deduction added successfully");
          setDeductionModalOpen(false);
        },
      },
    );
  };

  const [earningModalOpen, setEarningModalOpen] = useState(false);

  const {
    mutateAsync: addPayrollEarning,
    isPending: isAddPayrollEarningPending,
  } = useAddPayrollEarning();

  const handleAddPayrollEarning = (values: payrollEarningFormSchemaType) => {
    if (!selectedPayrollId) {
      return;
    }

    addPayrollEarning(
      {
        payrollId: selectedPayrollId,
        name: values.name,
        amount: Number(values.amount),
      },
      {
        onSuccess: () => {
          toast.success("Payroll earning added successfully");
          setEarningModalOpen(false);
        },
      },
    );
  };

  const columnDef = useMemo(
    () =>
      [
        {
          header: "Employee name",
          accessorKey: "employeeName",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.employeeName}
            </div>
          ),
        },
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
          header: "Department",
          accessorKey: "department",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.department}
            </div>
          ),
        },
        {
          header: "Designation",
          accessorKey: "designation",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.designation}
            </div>
          ),
        },
        {
          header: "Earnings (INR)",
          accessorKey: "earnings",
          cell: ({ row }) => (
            <div className="relative ">
              <div className="min-w-[300px] h-[150px]  overflow-y-auto space-y-2  text-wrap wrap-anywhere">
                {row?.original?.earnings?.map((earning) => (
                  <div key={earning?._id}>
                    {earning?.name} : {earning?.amount}
                  </div>
                ))}

                {row?.original?.status === PayloadStatusEnum.DRAFT && (
                  <div className="absolute bottom-2 right-2">
                    <Badge
                      // variant={"link"}
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        setSelectedPayrollId(row?.original?._id);
                        setEarningModalOpen(true);
                      }}
                    >
                      <Icon icon={"lucide:plus"} />
                      Add Earning
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ),
        },
        {
          header: "Deductions (INR)",
          accessorKey: "deductions",
          cell: ({ row }) => (
            <div className="relative ">
              <div className="min-w-[300px] h-[150px]  overflow-y-auto space-y-2  text-wrap wrap-anywhere">
                {row?.original?.deductions?.map((deduction) => (
                  <div key={deduction?._id}>
                    {deduction?.name} : {deduction?.amount}
                  </div>
                ))}

                {row?.original?.status === PayloadStatusEnum.DRAFT && (
                  <div className="absolute bottom-2 right-2">
                    <Badge
                      // variant={"link"}
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        setSelectedPayrollId(row?.original?._id);
                        setDeductionModalOpen(true);
                      }}
                    >
                      <Icon icon={"lucide:plus"} />
                      Add Deduction
                    </Badge>
                  </div>
                )}
              </div>
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
          cell: ({ row }) => {
            if (row?.original?.status !== PayloadStatusEnum.LOCKED) {
              return (
                <div className="min-w-[150px] flex justify-center">
                  {row?.original?.status === PayloadStatusEnum.DRAFT && (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={"outline"}
                        onClick={() => onApproveClick(row?.original?._id)}
                      >
                        <Icon icon={"lucide:check"} />
                        Approve
                      </Button>

                      <Button
                        variant={"outline"}
                        onClick={() => onReCalculateClick(row?.original?._id)}
                      >
                        <Icon icon={"lucide:calculator"} />
                        Re-Calculate
                      </Button>
                    </div>
                  )}

                  {row?.original?.status === PayloadStatusEnum.APPROVED && (
                    <Button
                      variant={"outline"}
                      onClick={() => onLockClick(row?.original?._id)}
                    >
                      <Icon icon={"lucide:lock"} />
                      Lock
                    </Button>
                  )}
                </div>
              );
            }
          },
        },
      ] as ColumnDef<TPayrollSchema["Doc"]>[],
    [
      onApproveClick,
      onReCalculateClick,
      onLockClick,
      setDeductionModalOpen,
      setSelectedPayrollId,
    ],
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Payrolls"
        buttons={[
          {
            id: "add-payroll",
            label: "Generate Payroll",
            onClick: () => router.push(ROUTES.admin.dashboard.payroll.create),
            icon: "lucide:plus",
          },
        ]}
      />

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

      <AddPayrollDeductionFormModal
        open={deductionModalOpen}
        close={() => setDeductionModalOpen(false)}
        onSubmit={handleAddPayrollDeduction}
        isSubmitting={isAddPayrollDeductionPending}
      />

      <AddPayrollEarningFormModal
        open={earningModalOpen}
        close={() => setEarningModalOpen(false)}
        onSubmit={handleAddPayrollEarning}
        isSubmitting={isAddPayrollEarningPending}
      />
    </div>
  );
}
