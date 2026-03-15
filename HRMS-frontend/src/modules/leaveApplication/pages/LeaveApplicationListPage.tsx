'use client';

import ConfirmModal, { ConfirmActionsType } from '@/components/ConfirmDialog';
import PageHeader from '@/components/page-header';
import { TanstackDataTable } from '@/components/tanstack-table/tanstack-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { convertDateStringToReadableFormat } from '@/lib/utils';
import { Icon } from '@iconify-icon/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useRef } from 'react';
import { toast } from 'sonner';
import {
  useApproveLeaveApplication,
  useGetAllLeaveApplication,
  useRejectLeaveApplication,
} from '../hooks';
import { TLeaveApplicationSchema } from '../schema';

export default function LeaveApplicationListPage() {
  const { data: getAllLeaveApplicationResData, isPending } = useGetAllLeaveApplication();
  const { mutateAsync: approveLeaveApplication } = useApproveLeaveApplication();
  const { mutateAsync: rejectLeaveApplication } = useRejectLeaveApplication();

  const leaveApplicationList = getAllLeaveApplicationResData?.data ?? [];

  const confirmModalRef = useRef<ConfirmActionsType | null>(null);

  const onApproveClick = (id: string) => {
    confirmModalRef.current?.open({
      title: 'Approve Leave',
      contentSlot: 'Are you sure you want to approve this Leave?',
      accept: () => {
        confirmModalRef?.current?.setIsLoading(true);
        approveLeaveApplication(id, {
          onSettled: () => {
            confirmModalRef?.current?.setIsLoading(false);
          },
          onSuccess: () => {
            toast.success('Leave approved successfully');
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

  const onRejectClick = (id: string) => {
    confirmModalRef.current?.open({
      title: 'Reject Leave',
      contentSlot: 'Are you sure you want to reject this Leave?',
      accept: () => {
        confirmModalRef?.current?.setIsLoading(true);
        rejectLeaveApplication(id, {
          onSettled: () => {
            confirmModalRef?.current?.setIsLoading(false);
          },
          onSuccess: () => {
            toast.success('Leave rejected successfully');
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
          header: 'Name',
          accessorKey: 'employeeId.personalInfo.firstName',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {`${row?.original?.employeeId?.personalInfo?.firstName} ${row?.original?.employeeId?.personalInfo?.lastName}`}
            </div>
          ),
        },
        {
          header: 'Email',
          accessorKey: 'employeeId.userId.email',
          cell: ({ row }) => (
            <div className='min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.employeeId?.userId?.email}
            </div>
          ),
        },
        {
          header: 'From Date',
          accessorKey: 'fromDate',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {convertDateStringToReadableFormat(row?.original?.fromDate)}
            </div>
          ),
        },
        {
          header: 'To Date',
          accessorKey: 'toDate',
          cell: ({ row }) => (
            <div className='min-w-[150px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {convertDateStringToReadableFormat(row?.original?.toDate)}
            </div>
          ),
        },
        {
          header: 'Total Days',
          accessorKey: 'totalDays',
          cell: ({ row }) => (
            <div className='min-w-[100px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.totalDays}
            </div>
          ),
        },

        {
          header: 'Reason',
          accessorKey: 'reason',
          cell: ({ row }) => (
            <div className='min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              {row?.original?.reason}
            </div>
          ),
        },
        {
          header: 'Status',
          accessorKey: 'status',
          cell: ({ row }) => (
            <div className='min-w-[300px] max-h-[150px] overflow-y-auto  text-wrap wrap-anywhere'>
              <Badge>{row?.original?.status}</Badge>
            </div>
          ),
        },

        {
          header: 'Action',
          accessorKey: 'action',
          cell: ({ row }) => {
            return (
              <div>
                {row?.original?.status === 'PENDING' && (
                  <div className='flex gap-2'>
                    <Button variant={'outline'} onClick={() => onApproveClick(row?.original?._id)}>
                      <Icon icon={'lucide:check'} />
                      Approve
                    </Button>

                    <Button variant={'outline'} onClick={() => onRejectClick(row?.original?._id)}>
                      <Icon icon={'lucide:x'} />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            );
          },
        },
      ] as ColumnDef<TLeaveApplicationSchema['Doc']>[],
    [onApproveClick, onRejectClick]
  );

  return (
    <div className='space-y-4'>
      <PageHeader title='Leave Applications' />

      <Card>
        <CardContent>
          <TanstackDataTable<TLeaveApplicationSchema['Doc']>
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
