"use client";

import ConfirmModal, { ConfirmActionsType } from "@/components/ConfirmDialog";
import PageHeader from "@/components/page-header";
import { TanstackDataTable } from "@/components/tanstack-table/tanstack-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { convertDateStringToReadableFormat } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import { toast } from "sonner";
import { useCancelLeaveApplication, useMyLeaveApplication } from "../../hooks";
import { LeaveApplicationViewMap, TLeaveApplicationSchema } from "../../schema";

export default function EmployeeLeaveApplicationListPage() {
  const { data: getAllLeaveApplicationResData, isPending } =
    useMyLeaveApplication();

  const { mutateAsync: cancelLeaveApplication } = useCancelLeaveApplication();

  const leaveApplicationList = getAllLeaveApplicationResData?.data ?? [];

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const router = useRouter();

  const onCancelClick = (id: string) => {
    confirmModalRef.current?.open({
      title: "Cancel Leave",
      contentSlot: "Are you sure you want to cancel this Leave?",
      accept: () => {
        confirmModalRef?.current?.setIsLoading(true);
        cancelLeaveApplication(id, {
          onSettled: () => {
            confirmModalRef?.current?.setIsLoading(false);
          },
          onSuccess: () => {
            toast.success("Leave rejected successfully");
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

  const columnDef = useMemo(
    () =>
      [
        {
          header: "From Date",
          accessorKey: "fromDate",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {convertDateStringToReadableFormat(row?.original?.fromDate)}
            </div>
          ),
        },
        {
          header: "To Date",
          accessorKey: "toDate",
          cell: ({ row }) => (
            <div className="min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {convertDateStringToReadableFormat(row?.original?.toDate)}
            </div>
          ),
        },
        {
          header: "Total Days",
          accessorKey: "totalDays",
          cell: ({ row }) => (
            <div className="min-w-[100px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.totalDays}
            </div>
          ),
        },

        {
          header: "Reason",
          accessorKey: "reason",
          cell: ({ row }) => (
            <div className="min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              {row?.original?.reason}
            </div>
          ),
        },
        {
          header: "Status",
          accessorKey: "status",
          cell: ({ row }) => (
            <div className="min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere">
              <Badge>{LeaveApplicationViewMap[row?.original?.status]}</Badge>
            </div>
          ),
        },

        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => {
            return (
              <div>
                {row?.original?.status === "PENDING" && (
                  <div className="flex gap-2">
                    <Button
                      variant={"outline"}
                      onClick={() => onCancelClick(row?.original?._id)}
                    >
                      <Icon icon={"lucide:x"} />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            );
          },
        },
      ] as ColumnDef<TLeaveApplicationSchema["Doc"]>[],
    [onCancelClick],
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Leave Applications"
        buttons={[
          {
            id: "add-leave-application",
            label: "Create Leave Application",
            onClick: () =>
              router.push(ROUTES.employee.dashboard.leaveApplication.create),
            icon: "lucide:plus",
          },
        ]}
      />

      <Card>
        <CardContent>
          <TanstackDataTable<TLeaveApplicationSchema["Doc"]>
            columns={columnDef}
            data={leaveApplicationList}
            isLoading={isPending}
            isPaginated={false}
          />
        </CardContent>
      </Card>
      <ConfirmModal ref={confirmModalRef} />
    </div>
  );
}
